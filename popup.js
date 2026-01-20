document.getElementById('searchForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();
  
  if (query) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    
    // Get current active tab
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if current tab is a new tab (blank)
    if (currentTab && (currentTab.url === 'chrome://newtab/' || currentTab.url === 'about:blank' || currentTab.pendingUrl === 'chrome://newtab/')) {
      // Use current tab if it's blank
      chrome.tabs.update(currentTab.id, { url: searchUrl });
    } else {
      // Create new tab if current tab has content
      chrome.tabs.create({ url: searchUrl });
    }
    
    // Close the popup after opening the search
    window.close();
  }
});
