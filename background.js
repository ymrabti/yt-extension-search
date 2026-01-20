// Create context menu items when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Context menu for selected text
  chrome.contextMenus.create({
    id: 'searchYouTube',
    title: 'YouTube IT',
    contexts: ['selection']
  });

  // Context menu for any page (no selection)
  chrome.contextMenus.create({
    id: 'openYouTube',
    title: 'YouTube IT',
    contexts: ['page', 'link', 'image', 'video', 'audio']
  });
});

// Helper function to open URL in new or current tab
async function openUrl(url) {
  const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Check if current tab is a new tab (blank)
  if (currentTab && (currentTab.url === 'chrome://newtab/' || currentTab.url === 'about:blank' || currentTab.pendingUrl === 'chrome://newtab/')) {
    chrome.tabs.update(currentTab.id, { url });
  } else {
    chrome.tabs.create({ url });
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchYouTube' && info.selectionText) {
    // Search selected text on YouTube
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.selectionText)}`;
    openUrl(searchUrl);
  } else if (info.menuItemId === 'openYouTube') {
    // Open YouTube homepage
    openUrl('https://www.youtube.com');
  }
});
