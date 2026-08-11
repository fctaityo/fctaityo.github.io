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
    }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });

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

/* Local AI Foundry v4.1.2 — Foundry Pulse / visitor counter */
(() => {
  const STATUS_URL = 'docs/public/status-public.md';

  /*
   * CounterAPI.com public API
   * NOTE: This is counterapi.com, NOT the retired counterapi.dev v1.
   * JSONP is used so the counter does not depend on browser CORS behavior.
   */
  const COUNTER_ENDPOINT =
    'https://counterapi.com/api/fctaityo.github.io/visit/foundry-home';
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

      if (!response.ok) throw new Error(`status ${response.status}`);

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

      if (projectState) projectState.textContent = state;
      if (runtime) runtime.textContent = runtimeValue;
      if (acceptance) acceptance.textContent = `Acceptance: ${acceptanceValue}`;
      if (updated) updated.textContent = updatedValue;

      sync.classList.add('synced');
      sync.classList.remove('fallback');

      const strong = sync.querySelector('strong');
      if (strong) strong.textContent = 'SYNCED';
    } catch (error) {
      sync.classList.add('fallback');
      sync.classList.remove('synced');

      const strong = sync.querySelector('strong');
      if (strong) strong.textContent = 'STATIC FALLBACK';

      console.warn('[LF v4.1.2] Public Status sync failed:', error);
    }
  }

  function jsonpCounter({ readOnly }) {
    return new Promise((resolve, reject) => {
      const callback =
        `__lfCounter_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script');
      const timeoutMs = 10000;

      const cleanup = () => {
        clearTimeout(timer);
        script.remove();
        try { delete window[callback]; } catch (_) { window[callback] = undefined; }
      };

      window[callback] = (payload) => {
        cleanup();
        resolve(payload);
      };

      const params = new URLSearchParams({
        callback,
        noFormatting: 'true'
      });

      if (readOnly) params.set('readOnly', 'true');

      script.src = `${COUNTER_ENDPOINT}?${params.toString()}`;
      script.async = true;

      script.onerror = () => {
        cleanup();
        reject(new Error('CounterAPI JSONP load failed'));
      };

      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('CounterAPI JSONP timeout'));
      }, timeoutMs);

      document.head.appendChild(script);
    });
  }

  function extractCount(payload) {
    const value = payload?.value;
    return Number.isFinite(Number(value)) ? Number(value) : null;
  }

  async function syncVisitorCount() {
    const display = $('[data-visitor-count]');
    const note = $('[data-visitor-note]');
    if (!display) return;

    const panel = display.closest('.visitor-counter-display');

    if (!LIVE_HOSTS.has(location.hostname)) {
      display.textContent = '------';
      if (note) note.textContent = 'LOCAL / COUNTER DISABLED';
      return;
    }

    const today = jstDateKey();
    const storageKey = `lf-visit-counted:jst:${today}`;

    let alreadyCounted = false;
    try {
      alreadyCounted = localStorage.getItem(storageKey) === '1';
    } catch (_) {}

    try {
      const payload = await jsonpCounter({ readOnly: alreadyCounted });
      const count = extractCount(payload);

      if (count === null) {
        throw new Error('CounterAPI value field not found');
      }

      display.textContent = String(count).padStart(6, '0');
      panel?.classList.add('live');

      if (note) {
        note.textContent = alreadyCounted
          ? '本日の訪問は加算済み'
          : '本日の初回訪問を加算';
      }

      if (!alreadyCounted) {
        try {
          localStorage.setItem(storageKey, '1');
        } catch (_) {}
      }
    } catch (error) {
      /*
       * If increment failed, try one read-only request before giving up.
       * This also lets the existing count display if a write is filtered.
       */
      try {
        const payload = await jsonpCounter({ readOnly: true });
        const count = extractCount(payload);

        if (count === null) throw new Error('Fallback count missing');

        display.textContent = String(count).padStart(6, '0');
        panel?.classList.add('live');

        if (note) note.textContent = '現在の来訪数を表示';
      } catch (fallbackError) {
        display.textContent = '------';
        panel?.classList.remove('live');

        if (note) note.textContent = 'Counter unavailable';

        console.warn(
          '[LF v4.1.2] Visitor counter failed:',
          error,
          fallbackError
        );
      }
    }
  }

  syncPublicStatus();
  syncVisitorCount();
})();
