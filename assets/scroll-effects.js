/**
 * Sia Truong - Silky Smooth Scroll & Motion Engine
 * Crafted with GPU acceleration, Apple-style quintic easing, and diverse reveal mechanics.
 */
(function() {
  'use strict';

  // 1. Inject Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  // 2. Navbar Sticky Glassmorphism
  const nav = document.querySelector('nav');

  // 3. Smooth Scroll Tracking using requestAnimationFrame (120fps / 60fps)
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        // Update Progress Bar
        progressBar.style.width = scrollPercent + '%';

        // Toggle Glass Navbar
        if (nav) {
          if (scrollTop > 25) {
            nav.classList.add('sticky-glass');
          } else {
            nav.classList.remove('sticky-glass');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initialize

  // 5. Intelligent Automatic Assignment of Diverse Animation Styles
  function setupDiverseAnimations() {
    // A. Big section headings get blur-to-focus reveal
    document.querySelectorAll('h1, h2, .section-heading, .solution-heading, .workflow-heading, .pain-heading').forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-blur')) {
        el.classList.add('reveal-blur');
      }
    });

    // B. Hero elements: gentle staggered entrance
    const hero = document.querySelector('.hero, .launch-strip, .header');
    if (hero) {
      const heroChildren = hero.querySelectorAll('h1, p, .button, .signup, .creator-art, .raw-card, .flow-results, .reel-frame, .actions');
      heroChildren.forEach((child, idx) => {
        child.classList.add('reveal');
        child.style.transitionDelay = (idx * 0.12) + 's';
      });
    }

    // C. Grids & Cards: Directional & Staggered Reveal
    document.querySelectorAll('.cards, .pain-cards, .solution-cards, .workflow-cards, .brand-examples, .simple-grid, .inside-list, .gift-next-steps, .personal-videos').forEach(grid => {
      grid.classList.add('stagger-group');
      const items = Array.from(grid.children);
      items.forEach((item, index) => {
        // Diverse directional reveals based on position
        if (items.length >= 3) {
          if (index % 3 === 0) item.classList.add('reveal-left');
          else if (index % 3 === 1) item.classList.add('reveal-up');
          else item.classList.add('reveal-right');
        } else if (items.length === 2) {
          if (index === 0) item.classList.add('reveal-left');
          else item.classList.add('reveal-right');
        } else {
          item.classList.add('reveal-up');
        }
      });
    });

    // D. Quotes and Takeaways get scale reveal
    document.querySelectorAll('.quote, .pain-takeaway, .pricebox, .closing, .gift-workshop-invite, .card, .step-item').forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
        el.classList.add('reveal-scale');
      }
    });

    // E. General sections fallback
    document.querySelectorAll('section, main > div, article').forEach(sec => {
      if (!sec.classList.contains('reveal') && !sec.classList.contains('reveal-scale') && !sec.classList.contains('stagger-group')) {
        sec.classList.add('reveal');
      }
    });
  }

  setupDiverseAnimations();

  // 6. Intersection Observer with Smooth Threshold
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // trigger slightly before fully in view
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, keep it visible smoothly
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-blur, .reveal-left, .reveal-right, .reveal-scale');
    animatedElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.reveal, .reveal-up, .reveal-blur, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('is-visible');
    });
  }
})();
