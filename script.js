const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('.sr-only').textContent = open ? 'メニューを開く' : 'メニューを閉じる';
  nav.classList.toggle('open', !open);
});

nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'メニューを開く';
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(element => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
  reveals.forEach(element => observer.observe(element));
}

const parallax = document.querySelector('[data-parallax]');
if (parallax && !reduceMotion && window.matchMedia('(min-width: 901px)').matches) {
  window.addEventListener('scroll', () => {
    const offset = Math.max(-18, Math.min(18, (window.scrollY - 220) * 0.025));
    parallax.style.translate = `0 ${offset}px`;
  }, { passive: true });
}

const teamDemo = document.querySelector('[data-team-demo]');
if (teamDemo) {
  const startButton = teamDemo.querySelector('[data-demo-start]');
  const message = teamDemo.querySelector('[data-demo-message]');
  const steps = new Map([...teamDemo.querySelectorAll('[data-demo-step]')].map(step => [step.dataset.demoStep, step]));
  const delay = reduceMotion ? 80 : 650;
  let running = false;

  const setStep = (name, status, state) => {
    const step = steps.get(name);
    step.classList.remove('is-active', 'is-complete', 'is-warning');
    if (state) step.classList.add(state);
    step.querySelector('[data-demo-status]').textContent = status;
  };

  const wait = duration => new Promise(resolve => window.setTimeout(resolve, duration));

  const resetDemo = () => {
    steps.forEach((step, name) => setStep(name, '待機中', ''));
    message.textContent = 'AIチームが工程を開始します。';
  };

  const runDemo = async () => {
    if (running) return;
    running = true;
    startButton.disabled = true;
    startButton.textContent = 'デモ実行中…';
    resetDemo();

    for (const [name, label] of [['plan', '構成'], ['research', '調査'], ['writing', '執筆'], ['review', 'レビュー'], ['image', '画像']]) {
      setStep(name, '処理中', 'is-active');
      message.textContent = `${label}の担当が作業しています。`;
      await wait(delay);
      setStep(name, '完了', 'is-complete');
    }

    setStep('audit', '確認中', 'is-active');
    message.textContent = '最終確認が、文章の途中終了を検査しています。';
    await wait(delay);
    setStep('audit', '問題を検出', 'is-warning');
    setStep('writing', '再試行', 'is-warning');
    message.textContent = '問題を検出しました。そのまま保存せず、執筆だけを再試行します。';
    await wait(delay);

    setStep('writing', '処理中', 'is-active');
    message.textContent = '執筆担当が、最後まで完結するように書き直しています。';
    await wait(delay);
    setStep('writing', '再試行完了', 'is-complete');
    setStep('audit', '再検査', 'is-active');
    message.textContent = '修正された文章をもう一度確認しています。';
    await wait(delay);
    setStep('audit', '完了', 'is-complete');

    setStep('save', '処理中', 'is-active');
    message.textContent = '検査に合格した成果物だけを保存しています。';
    await wait(delay);
    setStep('save', '完了', 'is-complete');
    message.textContent = '完成しました。問題を見つけ、必要な工程だけをやり直し、検査後に保存しました。';
    startButton.disabled = false;
    startButton.textContent = 'もう一度見る →';
    running = false;
  };

  startButton.addEventListener('click', runDemo);
}
