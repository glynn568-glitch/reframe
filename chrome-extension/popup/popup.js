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
];

let currentImg = null;
let selectedFormats = new Set();

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

function loadImage(src) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    currentImg = img;
    document.getElementById("upload-section").style.display = "none";
    document.getElementById("resize-section").style.display = "block";
    document.getElementById("preview").src = src;
    document.getElementById("source-info").textContent = `${img.naturalWidth} × ${img.naturalHeight}px`;
    // Auto-select all formats
    PLATFORMS.forEach(p => selectedFormats.add(p.id));
    renderFormats();
    updateDownloadBtn();
  };
  img.onerror = () => {
    // CORS issue - show upload prompt instead
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

// Download handler
document.getElementById("download-btn").addEventListener("click", async () => {
  if (!currentImg) return;
  const selected = PLATFORMS.filter(p => selectedFormats.has(p.id));
  for (const p of selected) {
    const canvas = cropAndResize(currentImg, p.w, p.h);
    const link = document.createElement("a");
    link.download = `reframe-${p.id}-${p.w}x${p.h}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    await new Promise(r => setTimeout(r, 200));
  }
});

// File input
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

// Check for pending image from context menu
chrome.storage.local.get("pendingImage", (data) => {
  if (data.pendingImage) {
    loadImage(data.pendingImage);
    chrome.storage.local.remove("pendingImage");
  }
});
