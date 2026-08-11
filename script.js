(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navWrap = document.querySelector('[data-nav-wrap]');
  const progress = document.querySelector('[data-scroll-progress]');
  const revealItems = [...document.querySelectorAll('.reveal')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const heroWord = document.querySelector('[data-hero-word]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateScrollUI(){
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('scrolled', y > 16);

    if(progress){
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
    }

    let currentId = '';
    for(const section of sections){
      if(section.getBoundingClientRect().top <= 130) currentId = section.id;
    }

    navLinks.forEach(link =>
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`)
    );
  }

  menuToggle?.addEventListener('click', () => {
    const open = navWrap.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navWrap?.addEventListener('click', event => {
    if(event.target.closest('a')){
      navWrap.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  if(reducedMotion){
    revealItems.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for(const entry of entries){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, {
      threshold: .12,
      rootMargin: '0px 0px -4% 0px'
    });

    revealItems.forEach(el => observer.observe(el));
  }

  const heroWords = [
    '人間主導のFoundry',
    '契約で制御するFoundry',
    '証拠を残すFoundry',
    '人間主導のFoundry'
  ];
  let wordIndex = 0;

  if(heroWord && !reducedMotion){
    setInterval(() => {
      wordIndex = (wordIndex + 1) % heroWords.length;

      heroWord.animate(
        [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
        { duration: 420, easing: 'ease' }
      );

      setTimeout(() => {
        heroWord.textContent = heroWords[wordIndex];
      }, 200);
    }, 2800);
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);
  updateScrollUI();
})();

/* Local AI Foundry v4.1 — Foundry Pulse / visitor counter */
(() => {
  const STATUS_URL = 'docs/public/status-public.md';

  /* Free Visitor Counter:
     - no API key
     - CORS enabled
     - POST /visit records a visit
     - GET /visit?domain=... returns current stats
  */
  const VISITOR_API = 'https://visitor.6developer.com/visit';
  const LIVE_HOSTS = new Set(['fctaityo.github.io']);

  const $ = (selector) => document.querySelector(selector);

  function textMatch(source, regex, fallback = '--') {
    const match = source.match(regex);
    return match?.[1]?.trim() || fallback;
  }

  function jstDateKey(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date);

    const values = Object.fromEntries(
      parts.map(({ type, value }) => [type, value])
    );

    return `${values.year}-${values.month}-${values.day}`;
  }

  async function syncPublicStatus() {
    const sync = $('[data-pulse-sync]');
    const projectState = $('[data-pulse-project-state]');
    const runtime = $('[data-pulse-runtime]');
    const acceptance = $('[data-pulse-acceptance]');
    const updated = $('[data-pulse-updated]');

    if (!sync) return;

    try {
      const response = await fetch(`${STATUS_URL}?v=${Date.now()}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }

      const md = await response.text();

      const state = textMatch(
        md,
        /\|\s*Project State\s*\|\s*`?([^`|\r\n]+)`?\s*\|/i,
        textMatch(md, /Project State:\s*`?([^`<\r\n]+)`?/i, 'Published')
      );

      const runtimeValue = textMatch(
        md,
        /\*\*Runtime Status:\*\*\s*([^\r\n]+)/i,
        'Not Executed'
      );

      const acceptanceValue = textMatch(
        md,
        /\|\s*Runtime Acceptance\s*\|[^|\r\n]*\|\s*`?([^`|\r\n]+)`?\s*\|/i,
        'PENDING'
      );

      const updatedValue = textMatch(
        md,
        /\|\s*Snapshot Updated\s*\|\s*`?([^`|\r\n]+)`?\s*\|/i,
        '--'
      );

      if(projectState) projectState.textContent = state;
      if(runtime) runtime.textContent = runtimeValue;
      if(acceptance) acceptance.textContent = `Acceptance: ${acceptanceValue}`;
      if(updated) updated.textContent = updatedValue;

      sync.classList.add('synced');
      sync.classList.remove('fallback');

      const strong = sync.querySelector('strong');
      if(strong) strong.textContent = 'SYNCED';
    } catch(error) {
      sync.classList.add('fallback');
      sync.classList.remove('synced');

      const strong = sync.querySelector('strong');
      if(strong) strong.textContent = 'STATIC FALLBACK';

      console.warn('[LF v4.1] Public Status sync failed:', error);
    }
  }

  function extractVisitorCount(payload) {
    const value = payload?.totalCount;
    return Number.isFinite(Number(value)) ? Number(value) : null;
  }

  async function fetchVisitorStats(domain) {
    const response = await fetch(
      `${VISITOR_API}?domain=${encodeURIComponent(domain)}&v=${Date.now()}`,
      {
        method: 'GET',
        cache: 'no-store',
        mode: 'cors'
      }
    );

    if(!response.ok){
      throw new Error(`visitor stats ${response.status}`);
    }

    return response.json();
  }

  async function recordVisitor(domain) {
    const response = await fetch(VISITOR_API, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain,
        timezone: 'Asia/Tokyo',
        page_path: location.pathname
      })
    });

    if(!response.ok){
      throw new Error(`visitor record ${response.status}`);
    }

    return response.json();
  }

  async function syncVisitorCount() {
    const display = $('[data-visitor-count]');
    const note = $('[data-visitor-note]');

    if(!display) return;

    const panel = display.closest('.visitor-counter-display');

    if(!LIVE_HOSTS.has(location.hostname)){
      display.textContent = '------';
      if(note) note.textContent = 'LOCAL / COUNTER DISABLED';
      return;
    }

    const domain = location.hostname;
    const today = jstDateKey();
    const storageKey = `lf-visit-counted:jst:${today}`;

    let alreadyCounted = false;

    try {
      alreadyCounted = localStorage.getItem(storageKey) === '1';
    } catch(_) {}

    try {
      let payload;

      if(alreadyCounted){
        payload = await fetchVisitorStats(domain);
      } else {
        payload = await recordVisitor(domain);
      }

      const count = extractVisitorCount(payload);

      if(count === null){
        throw new Error('totalCount field not found');
      }

      display.textContent = String(count).padStart(6, '0');
      panel?.classList.add('live');

      if(note){
        note.textContent = alreadyCounted
          ? '本日の訪問は加算済み'
          : '本日の初回訪問を加算';
      }

      if(!alreadyCounted){
        try {
          localStorage.setItem(storageKey, '1');
        } catch(_) {}
      }
    } catch(error) {
      /* One fallback attempt: if POST failed after the visit may already have been
         recorded, GET the current total before declaring the counter unavailable. */
      try {
        const payload = await fetchVisitorStats(domain);
        const count = extractVisitorCount(payload);

        if(count === null){
          throw new Error('fallback totalCount field not found');
        }

        display.textContent = String(count).padStart(6, '0');
        panel?.classList.add('live');

        if(note){
          note.textContent = '現在の来訪数を表示';
        }
      } catch(fallbackError) {
        display.textContent = '------';
        panel?.classList.remove('live');

        if(note){
          note.textContent = 'Counter unavailable';
        }

        console.warn(
          '[LF v4.1] Visitor counter failed:',
          error,
          fallbackError
        );
      }
    }
  }

  syncPublicStatus();
  syncVisitorCount();
})();
