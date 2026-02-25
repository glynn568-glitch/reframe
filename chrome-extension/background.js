// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "reframe-resize",
    title: "Resize with Reframe",
    contexts: ["image"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "reframe-resize" && info.srcUrl) {
    // Block on YouTube to avoid any copyrighted content concerns
    const url = tab?.url || "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return;

    // Store the image URL and open popup
    chrome.storage.local.set({ pendingImage: info.srcUrl }, () => {
      chrome.action.openPopup();
    });
  }
});
