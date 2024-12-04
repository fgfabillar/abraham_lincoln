// Intersection Observer for Heading Animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  }, observerOptions);

  // Observe all heading elements
  const headings = document.querySelectorAll('.heading-title-one, .heading-title-two, .heading-subtitle');
  headings.forEach(heading => observer.observe(heading));
});

// Header Navigation & Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  let timeoutId;

  // Toggle 'show' class when hamburger menu is clicked
  hamburgerMenu.addEventListener('click', () => {
    console.log('Hamburger clicked'); // Debugging
    navLinks.classList.toggle('show');
  });

  // Handle mouse enter/leave for both elements
  hamburgerMenu.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    navLinks.classList.add('show');
  });

  navLinks.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
  });

  hamburgerMenu.addEventListener('mouseleave', () => {
    handleMouseLeave();
  });

  navLinks.addEventListener('mouseleave', () => {
    handleMouseLeave();
  });

  function handleMouseLeave() {
    timeoutId = setTimeout(() => {
      if (!hamburgerMenu.matches(':hover') && !navLinks.matches(':hover')) {
        navLinks.classList.remove('show');
      }
    }, 300);
  }
});

// Hero Carousel Implementation
function initHeroCarousel() {
  const heroCarousel = document.querySelector('.hero-carousel');
  if (!heroCarousel) return;

  const heroImages = heroCarousel.querySelectorAll('.hero-image');
  const heroDots = heroCarousel.querySelectorAll('.hero-dot');
  let currentHeroIndex = 0;
  let heroInterval;

  function showHeroSlide(index) {
    // Hide all images first
    heroImages.forEach(image => {
      image.style.opacity = '0';
      image.style.zIndex = '0';
    });
    
    // Show selected image
    heroImages[index].style.opacity = '1';
    heroImages[index].style.zIndex = '1';
    
    // Update dots
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextHeroSlide() {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    showHeroSlide(currentHeroIndex);
  }

  // Add click handlers to dots
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentHeroIndex = index;
      showHeroSlide(currentHeroIndex);
      resetHeroInterval();
    });
  });

  function resetHeroInterval() {
    if (heroInterval) {
      clearInterval(heroInterval);
    }
    heroInterval = setInterval(nextHeroSlide, 3000);
  }

  // Initialize first slide and start interval
  showHeroSlide(0);
  resetHeroInterval();
}

// Initialize hero carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
});

// General Carousel Functionality
function initCarousel(carouselElement) {
  const slides = carouselElement.querySelectorAll('.carousel-image, .hero-image');
  const dots = carouselElement.querySelectorAll('.dot, .hero-dot');
  let currentSlide = 0;
  const interval = parseInt(carouselElement.dataset.interval) || 3000;

  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Start automatic slideshow
  setInterval(nextSlide, interval);
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero carousel
  const heroCarousel = document.querySelector('.hero-slides');
  if (heroCarousel) {
    initCarousel(heroCarousel);
  }

  // Initialize all content carousels
  const contentCarousels = document.querySelectorAll('.carousel-slides');
  contentCarousels.forEach(carousel => {
    initCarousel(carousel);
  });
});

// Tab System Implementation
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const isMobile = window.innerWidth <= 768;

  // Set initial active tab
  tabButtons[0].classList.add('active');
  tabContents[0].classList.add('active');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Mobile accordion behavior
      if (isMobile) {
        if (button.classList.contains('active')) {
          button.classList.remove('active');
          document.getElementById(tabId).classList.remove('active');
        } else {
          // Close other tabs
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Open clicked tab
          button.classList.add('active');
          document.getElementById(tabId).classList.add('active');
        }
      } 
      // Desktop tab behavior
      else {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      }

      // Stop all audio players when switching tabs
      document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      location.reload(); // Refresh page to switch between mobile/desktop layouts
    }
  });
});

// Navigation and Tab Integration
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#nav-links a');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Function to stop all audio playback
  function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  // Function to activate tab and update styling
  function activateTab(tabId) {
    // Stop all audio playback
    stopAllAudio();

    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    // For mobile: reset all tab headers background color
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.tab-header').forEach(header => {
        header.style.backgroundColor = '#0097b2';
        header.classList.remove('active');
      });

      // Set active tab header background color
      const activeHeader = document.querySelector(`.tab-header[data-tab="${tabId}"]`);
      if (activeHeader) {
        activeHeader.style.backgroundColor = '#017e94';
        activeHeader.classList.add('active');
      }
    }

    // Add active class to selected tab and show content
    const selectedTab = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(tabId);
    
    if (selectedTab && selectedContent) {
      selectedTab.classList.add('active');
      selectedContent.style.display = 'block';
      selectedContent.classList.add('active');
    }
  }

  // Handle navigation link clicks (including hamburger menu)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.getAttribute('data-tab');
      
      // Stop all audio playback
      stopAllAudio();
      
      // Close hamburger menu if open
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.remove('show');
      
      // Scroll to tabs section
      document.getElementById('tabs-section').scrollIntoView({ behavior: 'smooth' });
      
      // Activate the corresponding tab
      activateTab(tabId);

      // For mobile: scroll to the active tab header
      if (window.innerWidth <= 768) {
        const activeHeader = document.querySelector(`.tab-header[data-tab="${tabId}"]`);
        if (activeHeader) {
          setTimeout(() => {
            activeHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });

  // Handle tab button clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.getAttribute('data-tab');
      
      // Stop all audio playback
      stopAllAudio();
      
      // Scroll to tabs section
      document.getElementById('tabs-section').scrollIntoView({ behavior: 'smooth' });
      
      // Activate the corresponding tab
      activateTab(tabId);
    });
  });

  // Handle URL hash on page load
  if (window.location.hash) {
    const tabId = window.location.hash.substring(1);
    activateTab(tabId);
  } else {
    // Set default tab (About) if no hash
    activateTab('about');
  }
});

// Mobile Tab System Implementation
function initMobileTabs() {
  if (window.innerWidth <= 768) {
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Create and insert tab headers before each content section
    tabContents.forEach(content => {
      const tabId = content.id;
      const tabHeader = document.createElement('button');
      tabHeader.className = 'tab-header';
      tabHeader.textContent = tabId.charAt(0).toUpperCase() + tabId.slice(1);
      tabHeader.setAttribute('data-tab', tabId);
      
      // Set default active state for About tab
      if (tabId === 'about') {
        tabHeader.classList.add('active');
        tabHeader.style.backgroundColor = '#017e94';
        content.classList.add('active');
        content.style.display = 'block';
      } else {
        tabHeader.style.backgroundColor = '#0097b2';
      }
      
      // Insert header before content
      content.parentNode.insertBefore(tabHeader, content);
      
      // Add click handler to header
      tabHeader.addEventListener('click', () => {
        const isActive = content.classList.contains('active');
        
        // Stop all audio playback
        document.querySelectorAll('audio').forEach(audio => {
          audio.pause();
          audio.currentTime = 0;
        });
        
        // Reset all tab headers and contents
        tabContents.forEach(tab => {
          tab.classList.remove('active');
          tab.style.display = 'none';
        });
        document.querySelectorAll('.tab-header').forEach(header => {
          header.classList.remove('active');
          header.style.backgroundColor = '#0097b2'; // Reset all headers to default color
        });
        
        // If clicking a different tab than the active one, open it
        if (!isActive) {
          content.classList.add('active');
          content.style.display = 'block';
          tabHeader.classList.add('active');
          tabHeader.style.backgroundColor = '#017e94'; // Set active header color
          
          // Scroll to the tab header with smooth behavior
          tabHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// Initialize mobile tabs on load and resize
window.addEventListener('load', initMobileTabs);
window.addEventListener('resize', () => {
  // Remove existing headers and reinitialize
  document.querySelectorAll('.tab-header').forEach(header => header.remove());
  initMobileTabs();
});
