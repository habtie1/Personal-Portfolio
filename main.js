// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle.querySelector('i');
    this.body = document.body;
    
    this.init();
  }
  
  init() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    this.body.setAttribute('data-theme', currentTheme);
    this.updateThemeIcon(currentTheme);
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }
  
  toggleTheme() {
    const currentTheme = this.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateThemeIcon(newTheme);
    
    // Add a subtle animation effect
    this.themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.themeToggle.style.transform = 'scale(1)';
    }, 150);
  }
  
  updateThemeIcon(theme) {
    if (theme === 'dark') {
      this.themeIcon.className = 'fas fa-sun';
    } else {
      this.themeIcon.className = 'fas fa-moon';
    }
  }
}

// Mobile Navigation
class MobileNavigation {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    // Toggle mobile menu
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    
    // Close mobile menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Smooth Scrolling
class SmoothScroller {
  constructor() {
    this.init();
  }
  
  init() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleClick(e));
    });
  }
  
  handleClick(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Header Effects
class HeaderEffects {
  constructor() {
    this.header = document.querySelector('.header');
    this.body = document.body;
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Header background opacity based on scroll
    if (scrollY > 100) {
      this.header.style.background = 'rgba(255, 255, 255, 0.98)';
      this.header.style.backdropFilter = 'blur(20px)';
      
      if (this.body.getAttribute('data-theme') === 'dark') {
        this.header.style.background = 'rgba(15, 23, 42, 0.98)';
      }
    } else {
      this.header.style.background = 'rgba(255, 255, 255, 0.95)';
      this.header.style.backdropFilter = 'blur(10px)';
      
      if (this.body.getAttribute('data-theme') === 'dark') {
        this.header.style.background = 'rgba(15, 23, 42, 0.95)';
      }
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }
  
  setupAnimations() {
    // Add animation classes and observe elements
    this.animateElements('.section-title', 'fade-in');
    this.animateElements('.service-card', 'fade-in', 0.1);
    this.animateElements('.project-card', 'fade-in', 0.1);
    this.animateElements('.skill-category', 'fade-in', 0.1);
    
    // Special animations for specific sections
    this.animateElement('.about-image', 'slide-in-left');
    this.animateElement('.about-text', 'slide-in-right');
    this.animateElement('.contact-info', 'slide-in-left');
    this.animateElement('.contact-form', 'slide-in-right');
    this.animateElement('.hero-content', 'slide-in-left');
    this.animateElement('.hero-image', 'slide-in-right');
  }
  
  animateElements(selector, animationClass, delay = 0) {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add(animationClass);
      if (delay > 0) {
        element.style.animationDelay = `${index * delay}s`;
      }
      this.observer.observe(element);
    });
  }
  
  animateElement(selector, animationClass) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add(animationClass);
      this.observer.observe(element);
    }
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }
}

// Active Navigation Highlighting
class ActiveNavigation {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.updateActiveLink());
  }
  
  updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this.form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Validate form
    if (!this.validateForm(name, email, message)) {
      return;
    }
    
    // Simulate form submission
    this.submitForm(name, email, message);
  }
  
  validateForm(name, email, message) {
    if (!name || !email || !message) {
      this.showNotification('Please fill in all fields.', 'error');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return false;
    }
    
    if (message.length < 10) {
      this.showNotification('Message must be at least 10 characters long.', 'error');
      return false;
    }
    
    return true;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  submitForm(name, email, message) {
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      this.showNotification(
        `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`,
        'success'
      );
      
      this.form.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  }
  
  showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Style the notification
    this.styleNotification(notification, type);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => this.removeNotification(notification));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        this.removeNotification(notification);
      }
    }, 5000);
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => notification.classList.add('show'), 10);
  }
  
  styleNotification(notification, type) {
    const baseStyles = `
      position: fixed;
      top: 90px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease, opacity 0.3s ease;
      opacity: 0;
    `;
    
    const typeStyles = {
      success: 'background: #10b981; color: white;',
      error: 'background: #ef4444; color: white;'
    };
    
    notification.style.cssText = baseStyles + typeStyles[type];
  }
  
  removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}

// Typing Effect
class TypingEffect {
  constructor() {
    this.init();
  }
  
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startTyping());
    } else {
      this.startTyping();
    }
  }
  
  startTyping() {
    const heroRoles = document.querySelector('.hero-roles');
    if (heroRoles) {
      const originalText = heroRoles.textContent;
      heroRoles.textContent = '';
      
      setTimeout(() => {
        this.typeWriter(heroRoles, originalText, 50);
      }, 1500);
    }
  }
  
  typeWriter(element, text, speed = 50) {
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Add blinking cursor effect
        element.innerHTML += '<span class="cursor">|</span>';
        this.addCursorAnimation();
      }
    };
    
    type();
  }
  
  addCursorAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      .cursor {
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.init();
  }
  
  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    progressBar.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(progressBar);
    
    this.progressBar = document.querySelector('.scroll-progress');
  }
  
  init() {
    window.addEventListener('scroll', () => this.updateProgress());
  }
  
  updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  }
}

// CV Download Handler
class CVDownloader {
  constructor() {
    this.downloadButton = document.getElementById('download-cv');
    this.init();
  }
  
  init() {
    if (this.downloadButton) {
      this.downloadButton.addEventListener('click', (e) => this.handleDownload(e));
    }
  }
  
  handleDownload(e) {
    e.preventDefault();
    
    // Show notification since we don't have an actual CV file
    const notification = new ContactForm();
    notification.showNotification(
      'CV download feature is not implemented yet. Please contact me directly for my resume.',
      'error'
    );
    
    // In a real implementation, you would:
    // window.open('path/to/cv.pdf', '_blank');
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Debounce scroll events
    this.debouncedScrollHandler = this.debounce(() => {
      // Custom scroll handling if needed
    }, 10);
    
    window.addEventListener('scroll', this.debouncedScrollHandler);
    
    // Lazy load images when implemented
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadResources();
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  setupLazyLoading() {
    // Implement lazy loading for images when added
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  preloadResources() {
    // Preload critical CSS and fonts
    const criticalResources = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      document.head.appendChild(link);
    });
  }
}

// Loading Animation
class LoadingManager {
  constructor() {
    this.init();
  }
  
  init() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Remove loading overlay if it exists
      const loader = document.querySelector('.loader');
      if (loader) {
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => loader.remove(), 300);
        }, 500);
      }
    });
  }
}

// Accessibility Enhancements
class AccessibilityManager {
  constructor() {
    this.init();
  }
  
  init() {
    // Add skip to content link
    this.addSkipLink();
    
    // Enhance keyboard navigation
    this.enhanceKeyboardNavigation();
    
    // Add ARIA labels where needed
    this.addAriaLabels();
    
    // Handle reduced motion preference
    this.handleReducedMotion();
  }
  
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10001;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  enhanceKeyboardNavigation() {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
    
    // Handle escape key for closing modals/menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close mobile menu
        const mobileNav = new MobileNavigation();
        mobileNav.closeMenu();
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
          notification.remove();
        }
      }
    });
  }
  
  addAriaLabels() {
    // Add aria-labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        const icon = button.querySelector('i');
        if (icon) {
          const iconClass = icon.className;
          if (iconClass.includes('fa-moon')) {
            button.setAttribute('aria-label', 'Switch to dark mode');
          } else if (iconClass.includes('fa-sun')) {
            button.setAttribute('aria-label', 'Switch to light mode');
          }
        }
      }
    });
  }
  
  handleReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable animations for users who prefer reduced motion
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new ThemeManager();
  new MobileNavigation();
  new SmoothScroller();
  new HeaderEffects();
  new ScrollAnimations();
  new ActiveNavigation();
  new ContactForm();
  new TypingEffect();
  new ScrollProgress();
  new CVDownloader();
  
  // Performance and accessibility
  new PerformanceOptimizer();
  new LoadingManager();
  new AccessibilityManager();
  
  console.log('🚀 Habtie Getaye Portfolio loaded successfully!');
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    border-left: 4px solid currentColor;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .notification-message {
    flex: 1;
    line-height: 1.4;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    flex-shrink: 0;
  }
  
  .notification-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    .notification {
      right: 10px;
      left: 10px;
      max-width: none;
    }
  }
`;
document.head.appendChild(notificationStyles);