// ── Config ──
const SUPABASE_URL = 'https://dortsabzmcxdjgtoxaeh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcnRzYWJ6bWN4ZGpndG94YWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NDM4MTAsImV4cCI6MjA4NzMxOTgxMH0.jGuddJ9qREwVlcKIdBS0_jAjJasyY8WViYiJfZgZolA';
const FREE_LIMIT = 5;
const PRICING_URL = 'https://reframe-mauve.vercel.app/pricing';

const PLATFORMS = [
  { id: "ig-post", name: "IG Post", w: 1080, h: 1080, ratio: "1:1" },
  { id: "ig-story", name: "IG Story", w: 1080, h: 1920, ratio: "9:16" },
  { id: "ig-portrait", name: "IG Portrait", w: 1080, h: 1350, ratio: "4:5" },
  { id: "fb-post", name: "FB Post", w: 1200, h: 630, ratio: "1.91:1" },
  { id: "x-post", name: "X Post", w: 1200, h: 675, ratio: "16:9" },
  { id: "linkedin", name: "LinkedIn", w: 1200, h: 627, ratio: "1.91:1" },
  { id: "tiktok", name: "TikTok", w: 1080, h: 1920, ratio: "9:16" },
  { id: "pinterest", name: "Pinterest", w: 1000, h: 1500, ratio: "2:3" },
  { id: "threads", name: "Threads", w: 1080, h: 1080, ratio: "1:1" },
];

// ── State ──
let session = null;   // { access_token, refresh_token, user }
let profile = null;   // { id, subscription_status, daily_exports, last_export_date }
let currentImg = null;
let selectedFormats = new Set();

// ── Supabase REST helpers (no SDK needed) ──

async function sbAuth(endpoint, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || data.message || 'Auth failed');
  return data;
}

async function sbGet(table, query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${session.access_token}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

async function sbPatch(table, query, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

// ── Auth ──

async function loadSession() {
  const stored = await chrome.storage.local.get('rf_session');
  if (!stored.rf_session) return false;
  session = stored.rf_session;
  // Try to refresh the token
  try {
    const data = await sbAuth('token?grant_type=refresh_token', {
      refresh_token: session.refresh_token,
    });
    session = { access_token: data.access_token, refresh_token: data.refresh_token, user: data.user };
    await chrome.storage.local.set({ rf_session: session });
    return true;
  } catch {
    // Token expired / invalid, clear it
    session = null;
    await chrome.storage.local.remove('rf_session');
    return false;
  }
}

async function signIn(email, password) {
  const data = await sbAuth('token?grant_type=password', { email, password });
  session = { access_token: data.access_token, refresh_token: data.refresh_token, user: data.user };
  await chrome.storage.local.set({ rf_session: session });
}

async function signUp(email, password) {
  const data = await sbAuth('signup', { email, password });
  if (!data.session) {
    // Email confirmation required
    return { needsConfirmation: true };
  }
  session = { access_token: data.session.access_token, refresh_token: data.session.refresh_token, user: data.user };
  await chrome.storage.local.set({ rf_session: session });
  return { needsConfirmation: false };
}

async function signOut() {
  session = null;
  profile = null;
  await chrome.storage.local.remove('rf_session');
  renderHeader();
  renderUsage();
}

async function fetchProfile() {
  if (!session) return;
  const rows = await sbGet('profiles', `id=eq.${session.user.id}&select=*`);
  if (rows && rows.length > 0) profile = rows[0];
}

// ── Export tracking ──

function getLocalCount() {
  try {
    const raw = localStorage.getItem('rf_exports');
    if (!raw) return 0;
    const data = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    return data.date === today ? data.count : 0;
  } catch { return 0; }
}

function incrementLocalCount() {
  const today = new Date().toISOString().split('T')[0];
  const current = getLocalCount();
  const next = current + 1;
  localStorage.setItem('rf_exports', JSON.stringify({ date: today, count: next }));
  return next;
}

function isPro() {
  return profile && profile.subscription_status === 'pro';
}

function getDailyCount() {
  if (!session || !profile) return getLocalCount();
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_export_date !== today) return 0;
  return profile.daily_exports || 0;
}

async function tryExport() {
  if (isPro()) return true;

  if (session && profile) {
    // Server-side tracking
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = profile.last_export_date !== today;
    const count = isNewDay ? 0 : (profile.daily_exports || 0);
    if (count >= FREE_LIMIT) return false;
    const newCount = count + 1;
    const ok = await sbPatch('profiles', `id=eq.${session.user.id}`, {
      daily_exports: newCount,
      last_export_date: today,
    });
    if (!ok) return false;
    profile.daily_exports = newCount;
    profile.last_export_date = today;
    renderUsage();
    return true;
  }

  // Local tracking for anonymous users
  const count = getLocalCount();
  if (count >= FREE_LIMIT) return false;
  incrementLocalCount();
  renderUsage();
  return true;
}

// ── Image processing ──

function cropAndResize(img, tw, th) {
  const canvas = document.createElement("canvas");
  canvas.width = tw; canvas.height = th;
  const ctx = canvas.getContext("2d");
  const ir = img.naturalWidth / img.naturalHeight;
  const tr = tw / th;
  let sx, sy, sw, sh;
  if (ir > tr) { sh = img.naturalHeight; sw = sh * tr; sx = (img.naturalWidth - sw) / 2; sy = 0; }
  else { sw = img.naturalWidth; sh = sw / tr; sx = 0; sy = (img.naturalHeight - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th);
  return canvas;
}

function loadImage(src) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    currentImg = img;
    document.getElementById("upload-section").style.display = "none";
    document.getElementById("resize-section").style.display = "block";
    document.getElementById("preview").src = src;
    document.getElementById("source-info").textContent = `${img.naturalWidth} × ${img.naturalHeight}px`;
    renderFormats();
    updateDownloadBtn();
  };
  img.onerror = () => {
    document.getElementById("upload-section").style.display = "block";
    document.getElementById("resize-section").style.display = "none";
  };
  img.src = src;
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = (e) => loadImage(e.target.result);
  reader.readAsDataURL(file);
}

// ── UI rendering ──

function renderHeader() {
  const el = document.getElementById('header-right');
  if (session) {
    el.innerHTML = '';
    if (isPro()) {
      const pill = document.createElement('span');
      pill.className = 'pro-pill';
      pill.textContent = 'PRO';
      el.appendChild(pill);
    }
    const email = document.createElement('span');
    email.className = 'user-email';
    email.textContent = session.user.email;
    el.appendChild(email);
    const logout = document.createElement('button');
    logout.className = 'header-btn';
    logout.textContent = 'Log out';
    logout.addEventListener('click', signOut);
    el.appendChild(logout);
  } else {
    el.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'header-btn';
    btn.textContent = 'Sign in';
    btn.id = 'sign-in-btn';
    btn.addEventListener('click', () => showModal('auth-modal'));
    el.appendChild(btn);
  }
}

function renderUsage() {
  const el = document.getElementById('usage-bar');
  if (isPro()) {
    el.innerHTML = '<span style="color:#4ade80">PRO</span> Unlimited exports';
    return;
  }
  const count = getDailyCount();
  let html = `${count}/${FREE_LIMIT} free exports today`;
  if (count >= FREE_LIMIT - 1) {
    html += ` · <a href="${PRICING_URL}" target="_blank">Upgrade</a>`;
  }
  el.innerHTML = html;
}

function renderFormats() {
  const grid = document.getElementById("formats");
  grid.innerHTML = "";
  PLATFORMS.forEach(p => {
    const btn = document.createElement("button");
    btn.className = `format-btn${selectedFormats.has(p.id) ? " selected" : ""}`;
    btn.innerHTML = `<div class="name">${p.name}</div><div class="size">${p.w}×${p.h} · ${p.ratio}</div>`;
    btn.addEventListener("click", () => {
      if (selectedFormats.has(p.id)) selectedFormats.delete(p.id);
      else selectedFormats.add(p.id);
      renderFormats();
      updateDownloadBtn();
    });
    grid.appendChild(btn);
  });
}

function updateDownloadBtn() {
  const btn = document.getElementById("download-btn");
  const count = selectedFormats.size;
  btn.disabled = count === 0 || !currentImg;
  btn.textContent = count === 0 ? "Select formats to download" : `Download ${count} format${count !== 1 ? "s" : ""} ↓`;
}

function showModal(id) {
  document.getElementById(id).classList.add('active');
}

function hideModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ── Auth modal logic ──

let isSignUpMode = false;

function setupAuthModal() {
  const titleEl = document.getElementById('auth-title');
  const submitBtn = document.getElementById('auth-submit');
  const toggleBtn = document.getElementById('auth-toggle');
  const msgEl = document.getElementById('auth-msg');
  const emailInput = document.getElementById('auth-email');
  const passInput = document.getElementById('auth-password');

  document.getElementById('auth-close').addEventListener('click', () => hideModal('auth-modal'));
  document.getElementById('auth-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideModal('auth-modal');
  });

  toggleBtn.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    titleEl.textContent = isSignUpMode ? 'Create account' : 'Sign in';
    submitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    toggleBtn.textContent = isSignUpMode ? 'Already have an account? Sign in' : "Don't have an account? Sign up";
    msgEl.style.display = 'none';
  });

  async function handleSubmit() {
    const email = emailInput.value.trim();
    const password = passInput.value;
    if (!email || !password) {
      msgEl.textContent = 'Fill in both fields.';
      msgEl.className = 'auth-msg error';
      msgEl.style.display = 'block';
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';
    msgEl.style.display = 'none';

    try {
      if (isSignUpMode) {
        const result = await signUp(email, password);
        if (result.needsConfirmation) {
          msgEl.textContent = 'Check your email for a confirmation link, then sign in.';
          msgEl.className = 'auth-msg success';
          msgEl.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign Up';
          return;
        }
      } else {
        await signIn(email, password);
      }
      await fetchProfile();
      renderHeader();
      renderUsage();
      hideModal('auth-modal');
      emailInput.value = '';
      passInput.value = '';
    } catch (err) {
      msgEl.textContent = err.message;
      msgEl.className = 'auth-msg error';
      msgEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    }
  }

  submitBtn.addEventListener('click', handleSubmit);
  passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSubmit(); });
}

// ── Upgrade modal ──

function setupUpgradeModal() {
  document.getElementById('upgrade-close').addEventListener('click', () => hideModal('upgrade-modal'));
  document.getElementById('upgrade-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideModal('upgrade-modal');
  });

  // Build checkout URL with user_id if signed in
  const link = document.getElementById('upgrade-link');
  if (session) {
    link.href = `${PRICING_URL}`;
  }
}

function showUpgradeModal() {
  const msg = document.getElementById('upgrade-msg');
  if (session) {
    msg.textContent = "You've used all 5 free exports for today. Upgrade to Pro for unlimited resizing.";
  } else {
    msg.textContent = "You've used all 5 free exports for today. Sign in to sync across devices, or upgrade to Pro for unlimited.";
  }
  showModal('upgrade-modal');
}

// ── Download handler ──

document.getElementById("download-btn").addEventListener("click", async () => {
  if (!currentImg) return;
  const selected = PLATFORMS.filter(p => selectedFormats.has(p.id));
  for (const p of selected) {
    const allowed = await tryExport();
    if (!allowed) {
      showUpgradeModal();
      return;
    }
    const canvas = cropAndResize(currentImg, p.w, p.h);
    const link = document.createElement("a");
    link.download = `reframe-${p.id}-${p.w}x${p.h}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    await new Promise(r => setTimeout(r, 200));
  }
});

// ── File input / drag & drop ──

const fileInput = document.getElementById("file-input");
const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));
dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.style.borderColor = "rgba(255,255,255,0.3)"; });
dropZone.addEventListener("dragleave", () => { dropZone.style.borderColor = "rgba(255,255,255,0.08)"; });
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "rgba(255,255,255,0.08)";
  handleFile(e.dataTransfer.files[0]);
});

// ── Pending image from context menu ──

chrome.storage.local.get("pendingImage", (data) => {
  if (data.pendingImage) {
    loadImage(data.pendingImage);
    chrome.storage.local.remove("pendingImage");
  }
});

// ── Init ──

async function init() {
  const hasSession = await loadSession();
  if (hasSession) await fetchProfile();
  renderHeader();
  renderUsage();
  setupAuthModal();
  setupUpgradeModal();

  // Wire up initial sign-in button
  const signInBtn = document.getElementById('sign-in-btn');
  if (signInBtn) signInBtn.addEventListener('click', () => showModal('auth-modal'));
}

init();
