(function () {
  var WA = '8801302778420';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------------
     1. Language: visitors in Bangladesh (or with Bangla set on their
        device) get mixed Bangla-English, everyone else gets English.
        The EN / বাং switch overrides this and is remembered.
  --------------------------------------------------------------- */
  var BN = {
    nav_services: 'Services', nav_work: 'কাজ', nav_hire: 'Hire করুন', nav_podcast: 'Podcast', nav_about: 'আমার কথা', nav_contact: 'যোগাযোগ',
    hero_badge: 'Upwork-এ Top Rated · Healthcare specialist',
    hero_title: 'Healthcare brand-এর content,<br><span class="silver">ঠিকভাবে।</span>',
    hero_lede: 'Clinic, practice আর health brand-এর জন্য social media, short video আর WordPress website, যাতে online-এ আপনার brand বিশ্বাসযোগ্য দেখায়।',
    cta_upwork: 'Upwork-এ Hire করুন', cta_whatsapp: 'WhatsApp-এ মেসেজ দিন',
    stat_rated: 'Upwork status', stat_hours: 'ঘণ্টা কাজ Upwork-এ', stat_client: 'ঘণ্টা একটি US healthcare client-এর সাথে', stat_brands: 'health & wellness brand-এর সাথে কাজ',
    svc_kicker: 'Services', svc_title: 'প্রতি সপ্তাহে online-এ<br>active থাকতে যা লাগে, সব।',
    svc1_t: 'Social media management', svc1_d: 'মাসিক content plan, posting আর Facebook, Instagram, LinkedIn ও TikTok-এ reply, সাথে কী কাজ করল তার ছোট report।',
    svc2_t: 'Healthcare content', svc2_d: 'সহজ ভাষায় post আর carousel। তথ্য সঠিক, কোনো hype বা ভিত্তিহীন দাবি নেই।',
    svc3_t: 'Short-form video', svc3_d: 'আপনার raw clip থেকে Reels, TikTok আর Shorts, hook, subtitle আর cover সহ।',
    svc4_t: 'WordPress website', svc4_d: 'Elementor দিয়ে landing page, update, fix আর নিয়মিত maintenance, সাথে basic on-page SEO।',
    work_kicker: 'Selected work', work_title: 'যেসব brand-এর সাথে কাজ করি', work_more: 'Upwork-এ পুরো portfolio ↗',
    case1: 'একটি US healthcare company-র জন্য দীর্ঘমেয়াদি social media management: content plan, post, graphics আর YouTube video। একজন web design partner-এর সাথে তাদের WordPress website-ও বানিয়েছি।',
    case2: 'Instagram আর TikTok-এর জন্য ১৫টি short-form Reel, health topic-কে সহজ, mobile-friendly video-তে রূপ দিয়ে।',
    case3: 'UK-র একটি performance-coaching company-র জন্য social media post, Reels আর YouTube content।',
    hire_kicker: 'একসাথে কাজ', hire_title: 'শুরু করার দুটো সহজ উপায়।',
    path1_k: 'বাংলাদেশের বাইরের client', path1_t: 'Upwork-এ Hire করুন',
    path1_d: 'Payment Upwork সুরক্ষিত রাখে, আর hire করার আগেই আমার Top Rated status, কাজের history আর portfolio দেখে নিতে পারবেন।',
    path1_l1: 'Hourly বা fixed-price', path1_l2: '$25/ঘণ্টা থেকে শুরু', path1_l3: 'বাংলাদেশ থেকে কাজ করি (UTC+6)', path1_cta: 'Upwork profile দেখুন ↗',
    path2_k: 'বাংলাদেশের client', path2_t: 'WhatsApp-এ সরাসরি কথা বলুন',
    path2_d: 'আপনার business আর budget জানান, কাজ শুরুর আগেই একটা সহজ plan আর পরিষ্কার দাম পাঠাব।',
    path2_l1: 'মাসিক package বা এককালীন কাজ', path2_l2: 'বাংলা বা English', path2_l3: 'শুরুতেই পরিষ্কার দাম', path2_cta: 'WhatsApp-এ মেসেজ দিন',
    step1_t: 'ছোট একটা call', step1_d: 'আপনার brand, audience আর লক্ষ্য নিয়ে কথা।',
    step2_t: 'Plan আর দাম', step2_d: 'কাজ শুরুর আগে পরিষ্কার plan, সময় আর দাম।',
    step3_t: 'Delivery আর report', step3_d: 'নিয়মিত update আর মাসিক report।',
    pod_d: 'Founder, professional, freelancer আর creator-দের সাথে career, টাকা, technology আর জীবন নিয়ে বাংলায় লম্বা আলাপ।',
    pod_recent: 'সাম্প্রতিক episode', pod_watch: 'YouTube-এ দেখুন ↗', pod_guest: 'Guest হোন',
    guest_t: 'আপনার কি শেয়ার করার মতো গল্প আছে?',
    guest_d: 'যারা কিছু গড়ে তুলছেন এমন guest খুঁজছি: founder, freelancer, ডাক্তার, creator আর professional, দেশে বা বিদেশে।',
    guest_cta: 'Guest হতে apply করুন →',
    about_kicker: 'আমার কথা', about_t: 'হাই, আমি হৃদয়।',
    about_p1: 'আমি সিলেট, বাংলাদেশের একজন digital professional। শুরু করেছিলাম web design আর WordPress দিয়ে, পরে social media আর content-এ আসি। এখন আমার বেশিরভাগ কাজ healthcare brand-এর জন্য, যার মধ্যে একটি US healthcare company-র সাথে ৮৫০+ ঘণ্টা।',
    about_p2: 'আমি Hridoy Hussain Podcast-ও host করি, যেখানে career আর business গড়ছেন এমন মানুষদের সাথে কথা বলি। দুটো কাজেই একই জিনিস লাগে: মানুষকে বোঝা, তারপর সহজ করে বলা।',
    ct_kicker: 'যোগাযোগ', ct_t: 'চলুন কথা বলি।', ct_d: 'একটা topic বেছে নিন, কয়েকটা প্রশ্নের উত্তর দিন, আপনার মেসেজ WhatsApp-এ তৈরি হয়ে খুলবে।', ct_copy: 'নম্বর copy করুন',
    f_about: 'কী বিষয়ে?', f_t1: 'Project-এর জন্য hire', f_t2: 'Podcast guest', f_t3: 'অন্য কিছু',
    f_name: 'আপনার নাম', f_country: 'দেশ', f_service: 'Service', f_budget: 'মাসিক budget', f_brand: 'Business বা website',
    f_role: 'আপনি কী করেন?', f_idea: 'কোন বিষয়ে কথা বলতে চান?', f_link: 'আপনার কাজ বা profile-এর link', f_msg: 'মেসেজ',
    f_err: 'আপনার নামটা লিখুন, যাতে বুঝি কে লিখছেন।', f_submit: 'WhatsApp মেসেজ তৈরি করুন', f_yours: 'আপনার মেসেজ', f_open: 'WhatsApp-এ খুলুন ↗',
    back_top: 'উপরে যান ↑'
  };
  var EN = {};
  var textNodes = document.querySelectorAll('[data-i18n]');
  var htmlNodes = document.querySelectorAll('[data-i18n-html]');
  textNodes.forEach(function (el) { EN[el.dataset.i18n] = el.textContent; });
  htmlNodes.forEach(function (el) { EN[el.dataset.i18nHtml] = el.innerHTML; });

  function detectLang() {
    try { var saved = localStorage.getItem('hh-lang'); if (saved === 'en' || saved === 'bn') return saved; } catch (e) {}
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (tz === 'Asia/Dhaka' || tz === 'Asia/Dacca') return 'bn';
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) { if (/^bn/i.test(langs[i])) return 'bn'; }
    return 'en';
  }
  function setLang(lang) {
    var dict = lang === 'bn' ? BN : EN;
    textNodes.forEach(function (el) { var k = el.dataset.i18n; el.textContent = dict[k] !== undefined ? dict[k] : EN[k]; });
    htmlNodes.forEach(function (el) { var k = el.dataset.i18nHtml; el.innerHTML = dict[k] !== undefined ? dict[k] : EN[k]; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.setItem('hh-lang', b.dataset.lang); } catch (e) {}
      setLang(b.dataset.lang);
    });
  });
  setLang(detectLang());

  /* ---------------------------------------------------------------
     2. Nav, year, copy number
  --------------------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.getElementById('year').textContent = new Date().getFullYear();

  var copyBtn = document.getElementById('copy-phone');
  var phone = document.getElementById('phone');
  copyBtn.addEventListener('click', function () {
    var label = copyBtn.textContent;
    var fallback = function () {
      var r = document.createRange(); r.selectNodeContents(phone);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = 'Selected, press Ctrl+C';
    };
    try {
      navigator.clipboard.writeText('+8801302778420').then(function () {
        copyBtn.textContent = 'Copied';
        setTimeout(function () { copyBtn.textContent = label; }, 1800);
      }, fallback);
    } catch (e) { fallback(); }
  });

  /* ---------------------------------------------------------------
     3. Scroll reveal + count-up (content is visible without JS)
  --------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // anything already on screen shows immediately
    requestAnimationFrame(function () {
      reveals.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); });
    });

    var counters = document.querySelectorAll('.count');
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, to = +el.dataset.to, t0 = performance.now();
        (function step(now) {
          var p = Math.min(1, (now - t0) / 1400);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------------------------------------------------------
     4. 3D tilt on cards (pointer devices only)
  --------------------------------------------------------------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        el.classList.remove('is-tilting');
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------------------------------------------------------------
     5. 3D silver monogram (three.js). Falls back to the SVG mark.
  --------------------------------------------------------------- */
  (function mark3d() {
    var stage = document.getElementById('stage');
    var canvas = document.getElementById('mark3d');
    if (!window.THREE || !stage || !canvas) return;
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 10, 10000);
    camera.position.set(0, 0, 1500);

    // Chrome look without lights: a painted "matcap" sphere texture
    var mc = document.createElement('canvas'); mc.width = mc.height = 512;
    var g = mc.getContext('2d');
    var grad = g.createRadialGradient(190, 170, 10, 256, 256, 260);
    grad.addColorStop(0, '#ffffff'); grad.addColorStop(.22, '#e9e9e9'); grad.addColorStop(.45, '#9a9a9a');
    grad.addColorStop(.62, '#f2f2f2'); grad.addColorStop(.8, '#5a5a5a'); grad.addColorStop(1, '#151515');
    g.fillStyle = grad; g.fillRect(0, 0, 512, 512);
    var matcap = new THREE.CanvasTexture(mc);
    var mat = new THREE.MeshMatcapMaterial({ matcap: matcap });

    // Shapes in the logo's 580 x 485 grid (y flipped for 3D)
    function P(x, y) { return [x - 290, 242 - y]; }
    function rect(x, y, w, h) {
      var s = new THREE.Shape(), a = P(x, y), b = P(x + w, y + h);
      s.moveTo(a[0], a[1]); s.lineTo(b[0], a[1]); s.lineTo(b[0], b[1]); s.lineTo(a[0], b[1]); s.closePath(); return s;
    }
    var rib = new THREE.Shape();
    var p = P(152, 8); rib.moveTo(p[0], p[1]);
    p = P(272, 8); rib.lineTo(p[0], p[1]);
    p = P(272, 47); rib.lineTo(p[0], p[1]);
    var c1 = P(272, 205), c2 = P(570, 200), e1 = P(570, 375); rib.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], e1[0], e1[1]);
    p = P(570, 473); rib.lineTo(p[0], p[1]);
    p = P(450, 473); rib.lineTo(p[0], p[1]);
    p = P(450, 408); rib.lineTo(p[0], p[1]);
    c1 = P(450, 290); c2 = P(152, 300); e1 = P(152, 150); rib.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], e1[0], e1[1]);
    rib.closePath();
    var dot = new THREE.Shape(); var dc = P(68, 67); dot.absarc(dc[0], dc[1], 58, 0, Math.PI * 2, false);

    var ex = { depth: 46, bevelEnabled: true, bevelThickness: 5, bevelSize: 4, bevelSegments: 4, curveSegments: 48 };
    var group = new THREE.Group();
    [rect(152, 8, 120, 465), rect(450, 8, 120, 465)].forEach(function (s) {
      var m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, ex), mat); group.add(m);
    });
    var ribbon = new THREE.Mesh(new THREE.ExtrudeGeometry(rib, ex), mat); ribbon.position.z = 22; group.add(ribbon);
    var dotM = new THREE.Mesh(new THREE.ExtrudeGeometry(dot, ex), mat); dotM.position.z = 10; group.add(dotM);
    group.children.forEach(function (m) { m.geometry.translate(0, 0, -23); });
    scene.add(group);

    function resize() {
      var w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the mark about 62% of the stage height
      camera.position.z = (485 / 0.62) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.updateProjectionMatrix();
    }
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage); else addEventListener('resize', resize);

    var mx = 0, my = 0, tx = 0, ty = 0, visible = true, t0 = performance.now();
    addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) loop(); }).observe(stage);

    function frame(now) {
      var t = (now - t0) / 1000;
      var rect = stage.getBoundingClientRect();
      var scroll = Math.max(0, Math.min(1, 1 - (rect.bottom / (innerHeight + rect.height))));
      tx += (mx - tx) * 0.06; ty += (my - ty) * 0.06;
      group.rotation.y = (reduceMotion ? -0.35 : Math.sin(t * 0.45) * 0.35 - 0.25) + tx * 0.6 + scroll * 1.2;
      group.rotation.x = 0.08 + ty * 0.35 - scroll * 0.25;
      group.position.y = reduceMotion ? 0 : Math.sin(t * 0.9) * 8;
      renderer.render(scene, camera);
    }
    var running = false;
    function loop() {
      if (running) return; running = true;
      (function tick(now) {
        if (!visible) { running = false; return; }
        frame(now);
        if (reduceMotion) { running = false; return; }
        requestAnimationFrame(tick);
      })(performance.now());
    }
    stage.classList.add('live');
    loop();
  })();

  /* ---------------------------------------------------------------
     6. Contact form -> WhatsApp
  --------------------------------------------------------------- */
  var form = document.getElementById('brief');
  var groups = form.querySelectorAll('.group');
  var result = document.getElementById('result');
  var resultText = document.getElementById('result-text');
  var resultLink = document.getElementById('result-link');
  var error = document.getElementById('brief-error');
  function topic() { return form.querySelector('input[name="topic"]:checked').value; }
  function showGroup() {
    var t = topic();
    groups.forEach(function (g) { g.hidden = g.getAttribute('data-for') !== t; });
    result.hidden = true;
  }
  form.addEventListener('change', function (e) { if (e.target.name === 'topic') showGroup(); });
  document.querySelectorAll('[data-topic]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = document.getElementById('t-' + a.getAttribute('data-topic'));
      if (r) { r.checked = true; showGroup(); }
    });
  });
  function val(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = val('f-name');
    if (!name) { error.hidden = false; document.getElementById('f-name').focus(); return; }
    error.hidden = true;
    var t = topic();
    var lines = ['Hi Hridoy, I\'m ' + name + (val('f-country') ? ' from ' + val('f-country') : '') + '.'];
    if (t === 'project') {
      lines.push('I\'d like to hire you for: ' + val('f-service'));
      lines.push('Monthly budget: ' + val('f-budget'));
      if (val('f-brand')) lines.push('Business/website: ' + val('f-brand'));
    } else if (t === 'guest') {
      lines.push('I\'d like to be a guest on the Hridoy Hussain Podcast.');
      if (val('f-role')) lines.push('What I do: ' + val('f-role'));
      if (val('f-idea')) lines.push('Topic: ' + val('f-idea'));
      if (val('f-link')) lines.push('Link: ' + val('f-link'));
    } else {
      lines.push('I\'d like to get in touch.');
    }
    if (val('f-message')) lines.push('', val('f-message'));
    var text = lines.join('\n');
    resultText.textContent = text;
    resultLink.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
    result.hidden = false;
    resultLink.focus();
  });
})();
