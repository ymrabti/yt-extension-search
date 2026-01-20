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
