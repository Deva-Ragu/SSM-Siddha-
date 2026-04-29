// ========================================
// SANJEEVI - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMain = document.getElementById('nav-main');
  
  if (mobileToggle && navMain) {
    mobileToggle.addEventListener('click', function() {
      navMain.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMain.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMain.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }
  
  // ========================================
  // Quiz Functionality
  // ========================================
  const quizForm = document.getElementById('hair-quiz');
  
  if (quizForm) {
    const steps = document.querySelectorAll('.quiz-step');
    const progressFill = document.getElementById('progress-fill');
    const currentStepEl = document.getElementById('current-step');
    const progressPercent = document.getElementById('progress-percent');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const quizNav = document.getElementById('quiz-nav');
    
    let currentStep = 1;
    const totalSteps = 5;
    
    // Quiz option selection
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from siblings
        const siblings = this.parentElement.querySelectorAll('.quiz-option');
        siblings.forEach(sib => sib.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Check the radio input
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
        }
      });
    });
    
    // Update progress
    function updateProgress() {
      const percent = (currentStep / totalSteps) * 100;
      progressFill.style.width = percent + '%';
      currentStepEl.textContent = currentStep;
      progressPercent.textContent = Math.round(percent);
      
      // Show/hide prev button
      prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
      
      // Update next button text
      if (currentStep === totalSteps) {
        nextBtn.textContent = 'See Results';
      } else {
        nextBtn.textContent = 'Continue';
      }
    }
    
    // Show step
    function showStep(step) {
      steps.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
      });
      
      const currentStepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
      if (currentStepEl) {
        currentStepEl.classList.add('active');
        currentStepEl.style.display = 'block';
      }
    }
    
    // Show results
    function showResults() {
      steps.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
      });
      
      const resultsStep = document.querySelector('.quiz-step[data-step="results"]');
      if (resultsStep) {
        resultsStep.style.display = 'block';
        resultsStep.classList.add('active');
      }
      
      // Hide navigation
      quizNav.style.display = 'none';
      
      // Update progress to 100%
      progressFill.style.width = '100%';
      progressPercent.textContent = '100';
      currentStepEl.textContent = '5';
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
      // Check if an option is selected
      const currentStepElement = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
      const selectedOption = currentStepElement.querySelector('.quiz-option.selected');
      
      if (!selectedOption) {
        alert('Please select an option to continue.');
        return;
      }
      
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateProgress();
      } else {
        showResults();
      }
    });
    
    // Prev button
    prevBtn.addEventListener('click', function() {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
      }
    });
    
    // Initialize
    showStep(1);
    updateProgress();
  }
  
  // ========================================
  // Form Submissions
  // ========================================
  
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }
      
      alert('Account created successfully! Welcome to Sanjeevi.');
      registerForm.reset();
    });
  }
  
  // ========================================
  // Product Filter (Products Page)
  // ========================================
  const filterButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  
  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update button styles
        filterButtons.forEach(btn => {
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-outline');
        });
        this.classList.remove('btn-outline');
        this.classList.add('btn-primary');
        
        // Filter products
        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ========================================
  // Animation on Scroll (Simple)
  // ========================================
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .ingredient-item, .value-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles for animation
  const animatedElements = document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .ingredient-item, .value-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
});
