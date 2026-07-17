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
  const skipButton = teamDemo.querySelector('[data-demo-skip]');
  const liveMessage = teamDemo.querySelector('[data-demo-message]');
  const teamLog = teamDemo.querySelector('[data-team-log]');
  const phaseLabel = teamDemo.querySelector('[data-demo-phase]');
  const phaseItems = [...teamDemo.querySelectorAll('[data-phase]')];
  const outcome = teamDemo.querySelector('[data-demo-outcome]');
  const completeCta = teamDemo.querySelector('[data-demo-complete]');
  const steps = new Map([...teamDemo.querySelectorAll('[data-demo-step]')].map(step => [step.dataset.demoStep, step]));
  const delay = reduceMotion ? 60 : 650;
  const pendingTimers = new Set();
  let running = false;
  let skipRequested = false;
  let pageLeaving = false;

  const setStep = (name, status, state) => {
    const step = steps.get(name);
    step.classList.remove('is-active', 'is-complete', 'is-warning');
    if (state) step.classList.add(state);
    step.querySelector('[data-demo-status]').textContent = status;
  };

  const wait = duration => new Promise(resolve => {
    const pending = { id: 0, resolve };
    pending.id = window.setTimeout(() => {
      pendingTimers.delete(pending);
      resolve();
    }, duration);
    pendingTimers.add(pending);
  });

  const clearPendingTimers = () => {
    pendingTimers.forEach(pending => {
      window.clearTimeout(pending.id);
      pending.resolve();
    });
    pendingTimers.clear();
  };

  const setPhase = (phase, label) => {
    phaseLabel.textContent = label;
    const currentIndex = phaseItems.findIndex(item => item.dataset.phase === phase);
    phaseItems.forEach((item, index) => {
      item.classList.remove('is-current', 'is-past');
      if (index === currentIndex) item.classList.add('is-current');
      else if (currentIndex >= 0 && index < currentIndex) item.classList.add('is-past');
    });
  };

  const report = (speaker, text) => {
    const entry = document.createElement('p');
    const role = document.createElement('strong');
    const content = document.createElement('span');
    role.textContent = speaker;
    content.textContent = text;
    entry.append(role, content);
    [...teamLog.children].forEach(item => item.classList.remove('is-current'));
    entry.classList.add('is-current');
    teamLog.append(entry);
    while (teamLog.children.length > 3) teamLog.firstElementChild.remove();
    liveMessage.textContent = `${speaker}: ${text}`;
  };

  const setOutcome = (text, state = '') => {
    outcome.className = 'demo-outcome';
    if (state) outcome.classList.add(state);
    outcome.textContent = text;
  };

  const resetDemo = () => {
    steps.forEach((step, name) => setStep(name, '待機中', ''));
    teamLog.replaceChildren();
    report('進行管理', '開始を待っています。');
    setPhase('', '開始前');
    setOutcome('検査前の成果物は保存しません。問題がある工程だけを戻し、再検査後に保存します。');
    completeCta.classList.remove('is-visible');
    completeCta.setAttribute('aria-hidden', 'true');
    completeCta.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
  };

  const finishDemo = () => {
    for (const name of ['plan', 'research', 'review', 'image', 'audit', 'save']) setStep(name, '完了', 'is-complete');
    setStep('writing', '再試行完了', 'is-complete');
    setPhase('complete', '完成');
    setOutcome('検査を通過しました。成果物を保存しました。', 'is-complete');
    report('進行管理', '検査済みの成果物を保存しました。');
    completeCta.classList.add('is-visible');
    completeCta.setAttribute('aria-hidden', 'false');
    completeCta.querySelectorAll('a').forEach(link => link.removeAttribute('tabindex'));
    startButton.disabled = false;
    startButton.textContent = 'AIチームの仕事をもう一度見る';
    skipButton.hidden = true;
    running = false;
  };

  const runDemo = async () => {
    if (running) return;
    running = true;
    skipRequested = false;
    pageLeaving = false;
    startButton.disabled = true;
    startButton.textContent = 'AIチームが作業中…';
    skipButton.hidden = false;
    resetDemo();
    setPhase('production', '第1幕: 制作中');

    const production = [
      ['plan', '構成担当', '記事の流れを決めました。'],
      ['research', '調査担当', '必要な情報を確認しました。'],
      ['writing', '執筆担当', '本文を作成しています。'],
      ['review', 'レビュー担当', '内容の不足と矛盾を確認しました。'],
      ['image', '画像担当', '内容に合う画像を用意しました。']
    ];
    for (const [name, speaker, text] of production) {
      setStep(name, '処理中', 'is-active');
      report(speaker, text);
      await wait(delay);
      if (skipRequested || pageLeaving) return;
      setStep(name, '完了', 'is-complete');
    }

    setPhase('detection', '第2幕: 確認中');
    setStep('audit', '確認中', 'is-active');
    report('最終確認', '文章が最後まで完成しているか検査します。');
    await wait(delay);
    if (skipRequested || pageLeaving) return;
    setStep('audit', '問題を検出', 'is-warning');
    setStep('writing', '再試行', 'is-warning');
    setOutcome('文章の途中終了を検出しました。未完成のため保存せず、執筆工程だけを再試行します。', 'is-warning');
    report('最終確認', '文章が途中で終了しています。');
    report('進行管理', '保存を停止し、執筆工程だけを再試行します。');
    await wait(delay);
    if (skipRequested || pageLeaving) return;

    setPhase('recovery', '第3幕: 修正中');
    setStep('writing', '処理中', 'is-active');
    setOutcome('全部はやり直しません。問題のある執筆工程だけを戻しています。', 'is-recovery');
    report('執筆担当', '不足していた後半を追加しています。');
    await wait(delay);
    if (skipRequested || pageLeaving) return;
    setStep('writing', '再試行完了', 'is-complete');
    report('執筆担当', '不足していた後半を追加しました。');
    setStep('audit', '再検査', 'is-active');
    setOutcome('不足部分を補いました。保存前に再検査を行います。', 'is-recovery');
    report('最終確認', '修正された文章を再検査します。');
    await wait(delay);
    if (skipRequested || pageLeaving) return;
    setStep('audit', '完了', 'is-complete');

    setStep('save', '処理中', 'is-active');
    report('最終確認', '完成条件を満たしました。');
    await wait(delay);
    if (skipRequested || pageLeaving) return;
    finishDemo();
  };

  startButton.addEventListener('click', runDemo);
  skipButton.addEventListener('click', () => {
    if (!running) return;
    skipRequested = true;
    clearPendingTimers();
    finishDemo();
  });
  window.addEventListener('pagehide', () => {
    pageLeaving = true;
    clearPendingTimers();
    running = false;
  });
}
