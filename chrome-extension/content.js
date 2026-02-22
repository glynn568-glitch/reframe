// Content script - adds subtle hover indicator on images
// and sends selected image URL to background script

let overlay = null;

document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG' && e.target.src) {
    chrome.runtime.sendMessage({
      type: 'IMAGE_SELECTED',
      url: e.target.src,
    });
  }
});
