const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('.menu-toggle');
const navWrap=document.querySelector('.nav-wrap');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const syncHeader=()=>header?.classList.toggle('scrolled',window.scrollY>12);
syncHeader();window.addEventListener('scroll',syncHeader,{passive:true});

if(menuButton&&navWrap){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menuButton.querySelector('.sr-only').textContent=open?'メニューを開く':'メニューを閉じる';
    navWrap.classList.toggle('open',!open);
  });
  navWrap.addEventListener('click',e=>{
    if(e.target.closest('a')){
      navWrap.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.querySelector('.sr-only').textContent='メニューを開く';
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&navWrap.classList.contains('open')){
      navWrap.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.focus();
    }
  });
}

const reveals=document.querySelectorAll('.reveal');
if(reduceMotion||!('IntersectionObserver'in window)){reveals.forEach(el=>el.classList.add('visible'))}
else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
  },{threshold:.08,rootMargin:'0px 0px -30px'});
  reveals.forEach(el=>observer.observe(el));
}

const sectionLinks=[...document.querySelectorAll('.main-nav a[href^="#"]')];
const navSections=sectionLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const syncNav=()=>{
  if(!navSections.length)return;
  const current=[...navSections].reverse().find(s=>s.getBoundingClientRect().top<=130)||navSections[0];
  sectionLinks.forEach(a=>{
    if(a.getAttribute('href')===`#${current.id}`)a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
};
syncNav();window.addEventListener('scroll',syncNav,{passive:true});

const demo=document.querySelector('[data-team-demo]');
if(demo){
  const start=demo.querySelector('[data-demo-start]');
  const skip=demo.querySelector('[data-demo-skip]');
  const outcome=demo.querySelector('[data-demo-outcome]');
  const log=demo.querySelector('[data-team-log]');
  const live=demo.querySelector('[data-demo-message]');
  const steps=new Map([...demo.querySelectorAll('[data-demo-step]')].map(el=>[el.dataset.demoStep,el]));
  const delay=reduceMotion?60:620;
  let running=false,skipRequested=false;

  const setStep=(name,text,state='')=>{
    const el=steps.get(name); if(!el)return;
    el.className='';
    if(state)el.classList.add(state);
    el.querySelector('small').textContent=text;
  };
  const report=(role,text)=>{
    const p=document.createElement('p');
    const b=document.createElement('strong'); b.textContent=role;
    const s=document.createElement('span'); s.textContent=text;
    p.append(b,s);log.append(p);
    while(log.children.length>4)log.firstElementChild.remove();
    live.textContent=`${role}: ${text}`;
  };
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const finish=()=>{
    for(const n of ['plan','research','review','image','audit','save'])setStep(n,'完了','done');
    setStep('writing','再試行完了','done');
    outcome.className='demo-outcome complete';
    outcome.textContent='検査を通過しました。検査済みの成果物だけを保存します。';
    report('進行管理','検査済みの成果物を保存しました。');
    start.disabled=false;start.textContent='もう一度見る';skip.hidden=true;running=false;
  };
  const run=async()=>{
    if(running)return; running=true;skipRequested=false;start.disabled=true;skip.hidden=false;
    log.replaceChildren();report('進行管理','AIチームの作業を開始します。');
    outcome.className='demo-outcome';outcome.textContent='制作中です。';
    for(const [n,r,t] of [
      ['plan','構成担当','記事の流れを決めました。'],['research','調査担当','必要な情報を確認しました。'],
      ['writing','執筆担当','本文を作成しました。'],['review','レビュー担当','不足と矛盾を確認しました。'],
      ['image','画像担当','内容に合う画像を用意しました。']]){
      setStep(n,'処理中','active');report(r,t);await wait(delay);if(skipRequested)return;setStep(n,'完了','done');
    }
    setStep('audit','確認中','active');report('最終確認','文章が最後まで完成しているか検査します。');await wait(delay);if(skipRequested)return;
    setStep('audit','問題検出','warning');setStep('writing','再試行','warning');
    outcome.className='demo-outcome warning';outcome.textContent='文章の途中終了を検出。保存せず、執筆工程だけを戻します。';
    report('進行管理','保存を停止し、執筆だけを再試行します。');await wait(delay);if(skipRequested)return;
    setStep('writing','処理中','active');report('執筆担当','不足していた後半を追加します。');await wait(delay);if(skipRequested)return;
    setStep('writing','再試行完了','done');setStep('audit','再検査','active');report('最終確認','修正版を再検査します。');await wait(delay);if(skipRequested)return;
    setStep('save','保存中','active');await wait(delay);if(skipRequested)return;finish();
  };
  start.addEventListener('click',run);
  skip.addEventListener('click',()=>{if(!running)return;skipRequested=true;finish()});
}
