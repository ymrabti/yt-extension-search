let floatingIcon = null;
let selectedText = '';

// Create the floating YouTube icon
function createFloatingIcon() {
  const icon = document.createElement('div');
  icon.id = 'yt-search-floating-icon';
  icon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  `;
  
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selectedText) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedText)}`;
      window.open(searchUrl, '_blank');
      hideFloatingIcon();
    }
  });
  
  document.body.appendChild(icon);
  return icon;
}

// Show floating icon near the selected text
function showFloatingIcon(x, y) {
  if (!floatingIcon) {
    floatingIcon = createFloatingIcon();
  }
  
  // Position the icon near the cursor
  const iconSize = 40;
  const offset = 10;
  
  // Adjust position to keep icon in viewport
  let left = x + offset;
  let top = y - iconSize - offset;
  
  // Check if icon would go off screen
  if (left + iconSize > window.innerWidth) {
    left = x - iconSize - offset;
  }
  
  if (top < 0) {
    top = y + offset;
  }
  
  floatingIcon.style.left = `${left}px`;
  floatingIcon.style.top = `${top}px`;
  floatingIcon.style.display = 'flex';
  
  // Add animation
  setTimeout(() => {
    floatingIcon.classList.add('show');
  }, 10);
}

// Hide floating icon
function hideFloatingIcon() {
  if (floatingIcon) {
    floatingIcon.classList.remove('show');
    setTimeout(() => {
      if (floatingIcon) {
        floatingIcon.style.display = 'none';
      }
    }, 200);
  }
  selectedText = '';
}

// Handle text selection
document.addEventListener('mouseup', (e) => {
  // Small delay to ensure selection is complete
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0) {
      selectedText = text;
      showFloatingIcon(e.pageX, e.pageY);
    } else {
      hideFloatingIcon();
    }
  }, 10);
});

// Hide icon when clicking outside
document.addEventListener('mousedown', (e) => {
  if (floatingIcon && !floatingIcon.contains(e.target)) {
    hideFloatingIcon();
  }
});

// Hide icon when scrolling
document.addEventListener('scroll', () => {
  hideFloatingIcon();
});

// Hide icon when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideFloatingIcon();
  }
});
