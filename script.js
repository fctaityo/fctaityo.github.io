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

/* Local AI Foundry v4.1.3 — Foundry Pulse / visitor counter */
(() => {
  const STATUS_URL = 'docs/public/status-public.md';
  const LIVE_HOSTS = new Set(['fctaityo.github.io']);

  /*
   * CounterAPI.com official browser embed.
   * The service's current documentation recommends:
   *   <script src="https://counterapi.com/c.js"></script>
   *   <div class="counterapi"></div>
   *
   * We load that official client dynamically only after configuring
   * our existing counter element.
   */
  const COUNTER_LIBRARY = 'https://counterapi.com/c.js?ns=fctaityo.github.io';
  const COUNTER_NAMESPACE = 'fctaityo.github.io';
  const COUNTER_ACTION = 'view';
  const COUNTER_KEY = 'foundry-home';

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

      console.warn('[LF v4.1.3] Public Status sync failed:', error);
    }
  }

  function normalizeCounterText(text) {
    const digits = String(text || '').replace(/[^\d]/g, '');
    if (!digits) return null;

    const value = Number(digits);
    return Number.isFinite(value) ? value : null;
  }

  function syncVisitorCount() {
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

    /*
     * Configure the existing <strong data-visitor-count> as the official
     * CounterAPI widget. noCss/noIcon/noLink keep our visual design intact.
     */
    display.classList.add('counterapi');
    display.setAttribute('ns', COUNTER_NAMESPACE);
    display.setAttribute('action', COUNTER_ACTION);
    display.setAttribute('key', COUNTER_KEY);
    display.setAttribute('noCss', 'true');
    display.setAttribute('noIcon', 'true');
    display.setAttribute('noLink', 'true');
    display.setAttribute('noAnim', 'true');
    display.setAttribute('noFormatting', 'true');

    if (alreadyCounted) {
      display.setAttribute('readOnly', 'true');
    } else {
      display.removeAttribute('readOnly');
    }

    display.textContent = '------';
    if (note) note.textContent = 'CONNECTING...';

    let resolved = false;
    const startedAt = Date.now();

    const finish = (count) => {
      if (resolved) return;
      resolved = true;

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
    };

    const fail = (reason) => {
      if (resolved) return;
      resolved = true;

      display.textContent = '------';
      panel?.classList.remove('live');
      if (note) note.textContent = 'Counter unavailable';

      console.warn('[LF v4.1.3] Visitor counter failed:', reason);
    };

    /*
     * The official client updates the widget asynchronously.
     * Poll only the existing element; no API implementation is duplicated here.
     */
    const timer = setInterval(() => {
      const count = normalizeCounterText(display.textContent);

      if (count !== null) {
        clearInterval(timer);
        finish(count);
        return;
      }

      if (Date.now() - startedAt > 12000) {
        clearInterval(timer);
        fail(new Error('CounterAPI widget timeout'));
      }
    }, 120);

    const library = document.createElement('script');
    library.src = `${COUNTER_LIBRARY}&v=${Date.now()}`;
    library.async = true;

    library.onerror = () => {
      clearInterval(timer);
      fail(new Error('CounterAPI official library failed to load'));
    };

    document.head.appendChild(library);
  }

  syncPublicStatus();
  syncVisitorCount();
})();
