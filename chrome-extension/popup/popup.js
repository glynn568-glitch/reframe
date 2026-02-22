const SUPABASE_URL = 'https://dortsabzmcxdjgtoxaeh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcnRzYWJ6bWN4ZGpndG94YWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NDM4MTAsImV4cCI6MjA4NzMxOTgxMH0.jGuddJ9qREwVlcKIdBS0_jAjJasyY8WViYiJfZgZolA'
const FREE_LIMIT = 5

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const PLATFORMS = [
  { id: "ig-post", name: "IG Post", w: 1080, h: 1080, ratio: "1:1" },
  { id: "ig-story", name: "IG Story", w: 1080, h: 1920, ratio: "9:16" },
  { id: "ig-portrait", name: "IG Portrait", w: 1080, h: 1350, ratio: "4:5" },
  { id: "fb-post", name: "FB Post", w: 1200, h: 630, ratio: "1.91:1" },
  { id: "x-post", name: "X Post", w: 1200, h: 675, ratio: "16:9" },
  { id: "linkedin", name: "LinkedIn", w: 1200, h: 627, ratio: "1.91:1" },
  { id: "tiktok", name: "TikTok", w: 1080, h: 1920, ratio: "9:16" },
  { id: "yt-thumb", name: "YT Thumb", w: 1280, h: 720, ratio: "16:9" },
  { id: "pinterest", name: "Pinterest", w: 1000, h: 1500, ratio: "2:3" },
  { id: "threads", name: "Threads", w: 1080, h: 1080, ratio: "1:1" },
]

let currentUser = null
let currentProfile = null
let currentImg = null
let selectedFormats = new Set()
let isSignUpMode = false

// ── Auth ──

async function initAuth() {
  // Try to restore session from chrome.storage
  const stored = await chrome.storage.local.get('sb_session')
  if (stored.sb_session) {
    const { data: { session }, error } = await supabase.auth.setSession(stored.sb_session)
    if (session && !error) {
      currentUser = session.user
      await fetchProfile()
      showApp()
      return
    }
  }

  // Check if there's an active session
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    currentUser = session.user
    await saveSession(session)
    await fetchProfile()
    showApp()
  } else {
    showAuth()
  }
}

async function saveSession(session) {
  await chrome.storage.local.set({
    sb_session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    }
  })
}

async function fetchProfile() {
  if (!currentUser) return
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .single()
  currentProfile = data
}

async function handleAuth() {
  const email = document.getElementById('auth-email').value.trim()
  const password = document.getElementById('auth-password').value
  const errEl = document.getElementById('auth-error')
  const btn = document.getElementById('auth-btn')

  if (!email || !password) { errEl.textContent = 'Fill in both fields.'; errEl.style.display = 'block'; return }

  btn.disabled = true
  btn.textContent = 'Loading...'
  errEl.style.display = 'none'

  try {
    let result
    if (isSignUpMode) {
      result = await supabase.auth.signUp({ email, password })
    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
    }

    if (result.error) throw result.error

    if (isSignUpMode && !result.data.session) {
      // Email confirmation required
      errEl.textContent = 'Check your email for a confirmation link, then log in.'
      errEl.style.display = 'block'
      errEl.style.background = 'rgba(74,222,128,0.1)'
      errEl.style.borderColor = 'rgba(74,222,128,0.2)'
      errEl.style.color = '#4ade80'
      btn.disabled = false
      btn.textContent = isSignUpMode ? 'Sign Up' : 'Log In'
      return
    }

    currentUser = result.data.session.user
    await saveSession(result.data.session)
    await fetchProfile()
    showApp()
  } catch (err) {
    errEl.textContent = err.message
    errEl.style.display = 'block'
  } finally {
    btn.disabled = false
    btn.textContent = isSignUpMode ? 'Sign Up' : 'Log In'
  }
}

async function handleLogout() {
  await supabase.auth.signOut()
  await chrome.storage.local.remove('sb_session')
  currentUser = null
  currentProfile = null
  showAuth()
}

function showAuth() {
  document.getElementById('auth-section').style.display = 'block'
  document.getElementById('app-section').style.display = 'none'
}

function showApp() {
  document.getElementById('auth-section').style.display = 'none'
  document.getElementById('app-section').style.display = 'block'
  document.getElementById('user-email').textContent = currentUser.email
  updateUsageBadge()
}

function updateUsageBadge() {
  const el = document.getElementById('usage-badge')
  if (!currentProfile) { el.textContent = ''; return }
  const isPro = currentProfile.subscription_status === 'pro'
  if (isPro) {
    el.innerHTML = '<span class="pro-badge">PRO</span> Unlimited exports'
  } else {
    const today = new Date().toISOString().split('T')[0]
    const count = currentProfile.last_export_date === today ? (currentProfile.daily_exports || 0) : 0
    el.textContent = `${count}/${FREE_LIMIT} free exports today`
  }
}

// ── Export tracking ──

async function tryExport() {
  if (!currentUser || !currentProfile) return false
  if (currentProfile.subscription_status === 'pro') return true

  const today = new Date().toISOString().split('T')[0]
  const isNewDay = currentProfile.last_export_date !== today
  const count = isNewDay ? 0 : (currentProfile.daily_exports || 0)
  if (count >= FREE_LIMIT) return false

  const newCount = count + 1
  const { error } = await supabase
    .from('profiles')
    .update({ daily_exports: newCount, last_export_date: today })
    .eq('id', currentUser.id)

  if (error) return false
  currentProfile.daily_exports = newCount
  currentProfile.last_export_date = today
  updateUsageBadge()
  return true
}

// ── Image resizing ──

function cropAndResize(img, tw, th) {
  const canvas = document.createElement("canvas")
  canvas.width = tw; canvas.height = th
  const ctx = canvas.getContext("2d")
  const ir = img.naturalWidth / img.naturalHeight
  const tr = tw / th
  let sx, sy, sw, sh
  if (ir > tr) { sh = img.naturalHeight; sw = sh * tr; sx = (img.naturalWidth - sw) / 2; sy = 0 }
  else { sw = img.naturalWidth; sh = sw / tr; sx = 0; sy = (img.naturalHeight - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th)
  return canvas
}

function renderFormats() {
  const grid = document.getElementById("formats")
  grid.innerHTML = ""
  PLATFORMS.forEach(p => {
    const btn = document.createElement("button")
    btn.className = `format-btn${selectedFormats.has(p.id) ? " selected" : ""}`
    btn.innerHTML = `<div class="name">${p.name}</div><div class="size">${p.w}×${p.h} · ${p.ratio}</div>`
    btn.addEventListener("click", () => {
      if (selectedFormats.has(p.id)) selectedFormats.delete(p.id)
      else selectedFormats.add(p.id)
      renderFormats()
      updateDownloadBtn()
    })
    grid.appendChild(btn)
  })
}

function updateDownloadBtn() {
  const btn = document.getElementById("download-btn")
  const count = selectedFormats.size
  btn.disabled = count === 0 || !currentImg
  btn.textContent = count === 0 ? "Select formats to download" : `Download ${count} format${count !== 1 ? "s" : ""} ↓`
}

function loadImage(src) {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.onload = () => {
    currentImg = img
    document.getElementById("upload-section").style.display = "none"
    document.getElementById("resize-section").style.display = "block"
    document.getElementById("preview").src = src
    document.getElementById("source-info").textContent = `${img.naturalWidth} × ${img.naturalHeight}px`
    PLATFORMS.forEach(p => selectedFormats.add(p.id))
    renderFormats()
    updateDownloadBtn()
  }
  img.onerror = () => {
    document.getElementById("upload-section").style.display = "block"
    document.getElementById("resize-section").style.display = "none"
  }
  img.src = src
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) return
  const reader = new FileReader()
  reader.onload = (e) => loadImage(e.target.result)
  reader.readAsDataURL(file)
}

// ── Download ──

document.getElementById("download-btn").addEventListener("click", async () => {
  if (!currentImg) return
  const selected = PLATFORMS.filter(p => selectedFormats.has(p.id))
  for (const p of selected) {
    const allowed = await tryExport()
    if (!allowed) {
      alert(`Free limit reached (${FREE_LIMIT}/day). Upgrade to Pro for unlimited exports.`)
      window.open('https://reframe-mauve.vercel.app/pricing', '_blank')
      return
    }
    const canvas = cropAndResize(currentImg, p.w, p.h)
    const link = document.createElement("a")
    link.download = `reframe-${p.id}-${p.w}x${p.h}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
    await new Promise(r => setTimeout(r, 200))
  }
})

// ── File input / drag & drop ──

const fileInput = document.getElementById("file-input")
const dropZone = document.getElementById("drop-zone")

dropZone.addEventListener("click", () => fileInput.click())
fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]))
dropZone.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.style.borderColor = "rgba(255,255,255,0.3)" })
dropZone.addEventListener("dragleave", () => { dropZone.style.borderColor = "rgba(255,255,255,0.08)" })
dropZone.addEventListener("drop", (e) => {
  e.preventDefault()
  dropZone.style.borderColor = "rgba(255,255,255,0.08)"
  handleFile(e.dataTransfer.files[0])
})

// ── Auth UI bindings ──

document.getElementById('auth-btn').addEventListener('click', handleAuth)
document.getElementById('auth-password').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAuth() })
document.getElementById('logout-btn').addEventListener('click', handleLogout)
document.getElementById('auth-toggle').addEventListener('click', () => {
  isSignUpMode = !isSignUpMode
  document.getElementById('auth-title').textContent = isSignUpMode ? 'Create account' : 'Sign in to resize'
  document.getElementById('auth-btn').textContent = isSignUpMode ? 'Sign Up' : 'Log In'
  document.getElementById('auth-toggle').textContent = isSignUpMode ? 'Already have an account? Log in' : "Don't have an account? Sign up"
  document.getElementById('auth-error').style.display = 'none'
})

// ── Check for pending image from context menu ──

chrome.storage.local.get("pendingImage", (data) => {
  if (data.pendingImage) {
    // Wait for auth to resolve, then load image
    const checkAuth = setInterval(() => {
      if (currentUser) {
        loadImage(data.pendingImage)
        chrome.storage.local.remove("pendingImage")
        clearInterval(checkAuth)
      }
    }, 200)
    // Timeout after 5s
    setTimeout(() => clearInterval(checkAuth), 5000)
  }
})

// ── Init ──
initAuth()
