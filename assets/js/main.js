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
  let lastFocusedElement = null;

  if (menuToggle && mobileMenuOverlay) {
    const getFocusable = () => Array.from(
      mobileMenuOverlay.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileMenuOverlay.classList.contains('is-active');
      menuToggle.classList.toggle('is-active', isOpen);
      mobileMenuOverlay.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
      mobileMenuOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      if (isOpen) {
        lastFocusedElement = document.activeElement;
        const focusable = getFocusable();
        if (focusable.length) requestAnimationFrame(() => focusable[0].focus());
      } else if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        requestAnimationFrame(() => lastFocusedElement.focus());
      }
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (!mobileMenuOverlay.classList.contains('is-active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) brandLogo.addEventListener('click', () => toggleMenu(false));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023 && mobileMenuOverlay.classList.contains('is-active')) {
        toggleMenu(false);
      }
    }, { passive: true });
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
     04B. SCROLL PROGRESS + ACTIVE SECTION NAVIGATION
     -------------------------------------------------------------------------- */
  const progressFill = document.querySelector('.scroll-progress span');
  const updateProgress = () => {
    if (!progressFill) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressFill.style.width = `${ratio * 100}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const sectionIds = ['about', 'journey', 'work', 'podcast', 'contact'];
  const trackedSections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navItems = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if ('IntersectionObserver' in window && trackedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navItems.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-current', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.01, 0.15] });

    trackedSections.forEach(section => sectionObserver.observe(section));
  }

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


/* ========================================================================== 
   08. DYNAMIC TOPIC FORMS → PRE-FILLED WHATSAPP MESSAGE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('inquiryModal');
  const form = document.getElementById('inquiryForm');
  const fieldsHost = document.getElementById('inquiryFields');
  const typeInput = document.getElementById('inquiryType');
  const title = document.getElementById('inquiryModalTitle');
  const intro = document.getElementById('inquiryModalIntro');
  const kicker = document.getElementById('inquiryModalKicker');
  const triggers = document.querySelectorAll('[data-inquiry-type]');
  const closeControls = document.querySelectorAll('[data-inquiry-close]');
  const whatsappNumber = '8801302778420';
  let lastTrigger = null;

  if (!modal || !form || !fieldsHost || !typeInput || !triggers.length) return;

  const fieldTemplates = {
    business: {
      kicker: '01 — BUSINESS / PROJECT',
      title: 'Tell me about the project.',
      intro: 'A few details will help me understand what you need before we speak.',
      greeting: "Hi Hridoy, I'd like to discuss a business/project with you.",
      fields: `
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessName">Your name</label>
          <input class="inquiry-input" id="businessName" name="name" data-message-label="Name" type="text" autocomplete="name" placeholder="Your full name" required>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessCompany">Company / business <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="businessCompany" name="company" data-message-label="Company / Business" type="text" autocomplete="organization" placeholder="Company or brand name">
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="businessService">What do you need help with?</label>
          <select class="inquiry-select" id="businessService" name="service" data-message-label="Service" required>
            <option value="" selected disabled>Select a service</option>
            <option>Website Design / Development</option>
            <option>SEO</option>
            <option>Digital Marketing</option>
            <option>Branding / Graphic Design</option>
            <option>Website Support / Maintenance</option>
            <option>Other</option>
          </select>
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="businessDetails">Tell me briefly about your project</label>
          <textarea class="inquiry-textarea" id="businessDetails" name="project_details" data-message-label="Project" placeholder="What are you trying to build, improve or solve?" required></textarea>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessWebsite">Existing website <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="businessWebsite" name="website" data-message-label="Existing Website" type="url" inputmode="url" placeholder="https://example.com">
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessBudget">Estimated budget <span class="optional">(optional)</span></label>
          <select class="inquiry-select" id="businessBudget" name="budget" data-message-label="Budget">
            <option value="" selected>Not sure yet</option>
            <option>$300–$600</option>
            <option>$600–$1,000</option>
            <option>$1,000–$2,500</option>
            <option>$2,500–$5,000</option>
            <option>$5,000+</option>
          </select>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessStart">When would you like to start? <span class="optional">(optional)</span></label>
          <select class="inquiry-select" id="businessStart" name="start_time" data-message-label="Start Timeframe">
            <option value="" selected>Flexible / not sure</option>
            <option>As soon as possible</option>
            <option>Within 1–2 weeks</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>Later</option>
          </select>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessDate">Preferred meeting date <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="businessDate" name="preferred_date" data-message-label="Preferred Meeting Date" type="date">
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="businessTime">Preferred meeting time <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="businessTime" name="preferred_time" data-message-label="Preferred Meeting Time" type="time">
        </div>
      `
    },

    podcast: {
      kicker: '02 — PODCAST / COLLABORATION',
      title: 'Let’s explore the collaboration.',
      intro: 'Share the context so I can understand the opportunity before we connect.',
      greeting: "Hi Hridoy, I'd like to discuss a podcast/collaboration with you.",
      fields: `
        <div class="inquiry-field">
          <label class="inquiry-label" for="podcastName">Your name</label>
          <input class="inquiry-input" id="podcastName" name="name" data-message-label="Name" type="text" autocomplete="name" placeholder="Your full name" required>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="podcastOrg">Profession / organisation <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="podcastOrg" name="organisation" data-message-label="Profession / Organisation" type="text" autocomplete="organization" placeholder="Role, company or organisation">
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="podcastIntent">What would you like to discuss?</label>
          <select class="inquiry-select" id="podcastIntent" name="collaboration_type" data-message-label="Collaboration Type" required>
            <option value="" selected disabled>Select an option</option>
            <option>Be a Guest on The Hridoy Hussain Show</option>
            <option>Invite Hridoy to a Podcast / Interview</option>
            <option>Brand Collaboration</option>
            <option>Sponsorship</option>
            <option>Media / Speaking Opportunity</option>
            <option>Other Collaboration</option>
          </select>
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="podcastIdea">Tell me briefly about you / the idea</label>
          <textarea class="inquiry-textarea" id="podcastIdea" name="idea" data-message-label="About / Idea" placeholder="A short introduction and what you would like to explore together." required></textarea>
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="podcastProfile">Website or social profile <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="podcastProfile" name="profile" data-message-label="Website / Social Profile" type="text" inputmode="url" placeholder="Website, LinkedIn, Facebook, YouTube, etc.">
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="podcastDate">Preferred date <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="podcastDate" name="preferred_date" data-message-label="Preferred Date" type="date">
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="podcastTime">Preferred time <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="podcastTime" name="preferred_time" data-message-label="Preferred Time" type="time">
        </div>
      `
    },

    general: {
      kicker: '03 — GENERAL CONVERSATION',
      title: 'What would you like to talk about?',
      intro: 'Keep it simple. A little context helps me prepare for the conversation.',
      greeting: "Hi Hridoy, I'd like to have a general conversation with you.",
      fields: `
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="generalName">Your name</label>
          <input class="inquiry-input" id="generalName" name="name" data-message-label="Name" type="text" autocomplete="name" placeholder="Your full name" required>
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="generalTopic">What would you like to discuss?</label>
          <textarea class="inquiry-textarea" id="generalTopic" name="topic" data-message-label="Topic" placeholder="Tell me briefly what you would like to discuss." required></textarea>
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="generalDate">Preferred date <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="generalDate" name="preferred_date" data-message-label="Preferred Date" type="date">
        </div>
        <div class="inquiry-field">
          <label class="inquiry-label" for="generalTime">Preferred time <span class="optional">(optional)</span></label>
          <input class="inquiry-input" id="generalTime" name="preferred_time" data-message-label="Preferred Time" type="time">
        </div>
        <div class="inquiry-field is-full">
          <label class="inquiry-label" for="generalNotes">Anything I should know before we speak? <span class="optional">(optional)</span></label>
          <textarea class="inquiry-textarea" id="generalNotes" name="notes" data-message-label="Additional Note" placeholder="Any useful context, question or detail."></textarea>
        </div>
      `
    }
  };

  const getFocusable = () => Array.from(modal.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);

  const openModal = (type, trigger) => {
    const config = fieldTemplates[type];
    if (!config) return;

    lastTrigger = trigger || document.activeElement;
    typeInput.value = type;
    kicker.textContent = config.kicker;
    title.textContent = config.title;
    intro.textContent = config.intro;
    fieldsHost.innerHTML = config.fields;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('form-modal-open');

    requestAnimationFrame(() => {
      const firstField = fieldsHost.querySelector('input, select, textarea');
      if (firstField) firstField.focus();
    });
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('form-modal-open');
    form.reset();
    fieldsHost.innerHTML = '';
    typeInput.value = '';

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      requestAnimationFrame(() => lastTrigger.focus());
    }
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.inquiryType, trigger));
  });

  closeControls.forEach(control => control.addEventListener('click', closeModal));

  modal.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const formatDate = value => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length !== 3) return value;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const formatTime = value => {
    if (!value) return '';
    const [hours, minutes] = value.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const type = typeInput.value;
    const config = fieldTemplates[type];
    if (!config) return;

    const lines = [config.greeting, '', 'Here are my details:'];
    const controls = fieldsHost.querySelectorAll('[data-message-label]');

    controls.forEach(control => {
      let value = String(control.value || '').trim();
      if (!value) return;

      if (control.type === 'date') value = formatDate(value);
      if (control.type === 'time') value = formatTime(value);

      lines.push(`${control.dataset.messageLabel}: ${value}`);
    });

    lines.push('', 'Thank you.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = whatsappUrl;
  });
});
