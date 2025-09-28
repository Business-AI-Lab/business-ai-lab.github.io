(function() {
  'use strict';
  
  // Theme switching functionality
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    if (!themeToggle) return;
    
    // Get current theme from localStorage or default
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = storedTheme || 'light';
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Add click event listener to theme toggle
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
  
  function setTheme(theme) {
    const htmlElement = document.documentElement;
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Set data attribute on html element
    htmlElement.setAttribute('data-theme', theme);
  }
  
  // Mobile navigation functionality
  function initMobileNav() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.contains('active');
      
      if (isOpen) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Partners slider functionality with auto-scroll
  function initPartnersSlider() {
    const slider = document.querySelector('.partners-track');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 300;
    let autoScrollInterval;
    let isUserInteracting = false;
    
    // Manual navigation
    prevBtn.addEventListener('click', function() {
      isUserInteracting = true;
      slider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => isUserInteracting = false, 2000); // Resume auto-scroll after 2s
    });
    
    nextBtn.addEventListener('click', function() {
      isUserInteracting = true;
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => isUserInteracting = false, 2000); // Resume auto-scroll after 2s
    });
    
    // Auto-scroll functionality
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (!isUserInteracting && !document.hidden) {
          const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;
          
          if (isAtEnd) {
            // Reset to beginning smoothly
            slider.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Scroll to next
            slider.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }
      }, 3000); // Auto-scroll every 3 seconds
    }
    
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
    
    // Pause auto-scroll when user hovers over slider
    slider.addEventListener('mouseenter', () => {
      isUserInteracting = true;
    });
    
    slider.addEventListener('mouseleave', () => {
      isUserInteracting = false;
    });
    
    // Pause auto-scroll when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    });
    
    // Update button states based on scroll position
    function updateButtonStates() {
      const isAtStart = slider.scrollLeft <= 0;
      const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth;
      
      prevBtn.style.opacity = isAtStart ? '0.5' : '1';
      nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
      prevBtn.disabled = isAtStart;
      nextBtn.disabled = isAtEnd;
    }
    
    slider.addEventListener('scroll', updateButtonStates);
    updateButtonStates(); // Initial state
    
    // Start auto-scroll
    startAutoScroll();
  }
  
  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Lazy loading for images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });
      
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Stats counter animation
  function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 100; // 100 steps
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 40); // 40ms * 100 = 4 seconds
    };
    
    // Use Intersection Observer to trigger animation when stats come into view
    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count') || entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      statNumbers.forEach(stat => {
        // Store original value
        const originalValue = stat.textContent;
        stat.setAttribute('data-count', originalValue);
        stat.textContent = '0';
        statsObserver.observe(stat);
      });
    }
  }
  
  // Initialize all functionality when DOM is ready
  function init() {
    initThemeToggle();
    initMobileNav();
    initPartnersSlider();
    initSmoothScroll();
    initLazyLoading();
    initStatsAnimation();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();