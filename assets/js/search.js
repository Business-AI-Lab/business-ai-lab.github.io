(function() {
  'use strict';
  
  // Simple search functionality for collection pages
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const allItems = document.querySelectorAll('.card');
    
    if (!searchInput || !searchResults || allItems.length === 0) {
      return;
    }
    
    // Store original content
    const originalContent = document.querySelector('.list-content');
    
    function performSearch(query) {
      const normalizedQuery = query.toLowerCase().trim();
      
      if (normalizedQuery === '') {
        // Show all items
        showAllItems();
        return;
      }
      
      const matches = Array.from(allItems).filter(item => {
        // Search in card title
        const titleElement = item.querySelector('.card-title, .member-name');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        
        // Search in card summary/content
        const summaryElement = item.querySelector('.card-summary, .member-role');
        const summary = summaryElement ? summaryElement.textContent.toLowerCase() : '';
        
        // Search in tags
        const tagElements = item.querySelectorAll('.tag');
        const tags = Array.from(tagElements).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        return title.includes(normalizedQuery) || 
               summary.includes(normalizedQuery) || 
               tags.includes(normalizedQuery);
      });
      
      displayResults(matches, normalizedQuery);
    }
    
    function showAllItems() {
      // Hide search results, show original content
      searchResults.style.display = 'none';
      originalContent.style.display = 'block';
    }
    
    function displayResults(matches, query) {
      // Hide original content, show search results
      originalContent.style.display = 'none';
      searchResults.style.display = 'block';
      
      if (matches.length === 0) {
        searchResults.innerHTML = `
          <div class="search-no-results">
            <h3 data-lang-en="No results found" data-lang-vi="Không tìm thấy kết quả">No results found</h3>
            <p data-lang-en="Try different keywords or browse all items below." data-lang-vi="Thử từ khóa khác hoặc xem tất cả mục bên dưới.">Try different keywords or browse all items below.</p>
          </div>
        `;
      } else {
        // Group results by section if they exist
        const sections = {};
        matches.forEach(item => {
          const section = item.closest('section');
          const sectionTitle = section ? section.querySelector('h2')?.textContent || 'Items' : 'Items';
          
          if (!sections[sectionTitle]) {
            sections[sectionTitle] = [];
          }
          sections[sectionTitle].push(item);
        });
        
        let resultsHTML = `
          <div class="search-results-header">
            <h3 data-lang-en="${matches.length} results for '${query}'" data-lang-vi="${matches.length} kết quả cho '${query}'">${matches.length} results for '${query}'</h3>
          </div>
        `;
        
        Object.entries(sections).forEach(([sectionTitle, items]) => {
          resultsHTML += `
            <section class="search-results-section">
              <h4>${sectionTitle}</h4>
              <div class="members-grid">
                ${items.map(item => item.outerHTML).join('')}
              </div>
            </section>
          `;
        });
        
        searchResults.innerHTML = resultsHTML;
      }
      
      // Update language display for new content
      if (window.updateLanguageDisplay) {
        window.updateLanguageDisplay();
      }
    }
    
    // Debounce search to avoid too many searches
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(this.value);
      }, 300);
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        showAllItems();
      }
    });
  }
  
  // Initialize when DOM is ready
  function init() {
    initSearch();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();