document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();
  
  if (query) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    
    chrome.tabs.create({ url: searchUrl });
    
    // Close the popup after opening the search
    window.close();
  }
});

// Allow pressing Enter to submit
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
  }
});
