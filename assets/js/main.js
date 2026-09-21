/**
 * HRIDOY HUSSAIN — OFFICIAL PERSONAL BRAND WEBSITE
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     01. HEADER SCROLL EFFECT
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     02. MOBILE MENU DRAWER CONTROLLER
     -------------------------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-cta');

  if (menuToggle && mobileMenuOverlay) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileMenuOverlay.classList.contains('is-active');
      menuToggle.classList.toggle('is-active', isOpen);
      mobileMenuOverlay.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('is-active')) {
        toggleMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     03. INTERSECTION OBSERVER FOR FADE REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const fadeUpElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeUpElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeUpElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* --------------------------------------------------------------------------
     04. ACCESSIBLE SMOOTH SCROLL WITH HEADER OFFSET
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     05. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     06. NUMERICAL COUNTER ANIMATION ENHANCEMENT
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          const suffix = entry.target.getAttribute('data-suffix') || '';
          if (isNaN(target)) return;

          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.innerHTML = Math.floor(current) + `<span class="accent">${suffix}</span>`;
          }, stepTime);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }
});
