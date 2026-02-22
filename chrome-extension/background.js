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
    // Store the image URL and open popup
    chrome.storage.local.set({ pendingImage: info.srcUrl }, () => {
      // Open the extension popup with the image
      chrome.action.openPopup();
    });
  }
});
