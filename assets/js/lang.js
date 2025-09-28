(function() {
  'use strict';
  
  // Language switching functionality
  function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-button');
    const htmlElement = document.documentElement;
    
    // Get current language from URL param or localStorage or default
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const storedLang = localStorage.getItem('lang');
    let currentLang = langParam || storedLang || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
      const lang = button.getAttribute('data-lang');
      
      // Set active state for current language
      if (lang === currentLang) {
        button.classList.add('active');
      }
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        setLanguage(lang);
        
        // Update URL with language parameter
        const url = new URL(window.location);
        if (lang !== 'en') {
          url.searchParams.set('lang', lang);
        } else {
          url.searchParams.delete('lang');
        }
        window.history.pushState({}, '', url);
      });
    });
  }
  
  function setLanguage(lang) {
    const htmlElement = document.documentElement;
    const langButtons = document.querySelectorAll('.lang-button');
    
    // Store language preference
    localStorage.setItem('lang', lang);
    
    // Set data attribute on html element
    htmlElement.setAttribute('data-lang', lang);
    
    // Update button active states
    langButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      if (buttonLang === lang) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Update all elements with language-specific content
    updateLanguageContent(lang);
  }
  
  function updateLanguageContent(lang) {
    // Update elements with data-lang-* attributes
    const elements = document.querySelectorAll('[data-lang-en], [data-lang-vi]');
    
    elements.forEach(element => {
      const enContent = element.getAttribute('data-lang-en');
      const viContent = element.getAttribute('data-lang-vi');
      
      if (lang === 'vi' && viContent) {
        element.textContent = viContent;
      } else if (lang === 'en' && enContent) {
        element.textContent = enContent;
      }
    });
    
    // Update content areas
    const enContent = document.querySelectorAll('[data-lang-content="en"]');
    const viContent = document.querySelectorAll('[data-lang-content="vi"]');
    
    if (lang === 'vi') {
      enContent.forEach(el => el.style.display = 'none');
      viContent.forEach(el => el.style.display = 'block');
    } else {
      enContent.forEach(el => el.style.display = 'block');
      viContent.forEach(el => el.style.display = 'none');
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }
})();