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
    if(progress){const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);progress.style.width=`${Math.min(100,(y/max)*100)}%`;}
    let currentId='';
    for(const section of sections){if(section.getBoundingClientRect().top<=130) currentId=section.id;}
    navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${currentId}`));
  }
  menuToggle?.addEventListener('click',()=>{const open=navWrap.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
  navWrap?.addEventListener('click',event=>{if(event.target.closest('a')){navWrap.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');}});
  if(reducedMotion){revealItems.forEach(el=>el.classList.add('visible'));}
  else{const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}},{threshold:.12,rootMargin:'0px 0px -4% 0px'});revealItems.forEach(el=>observer.observe(el));}
  const heroWords=['人間主導のFoundry','契約で制御するFoundry','証拠を残すFoundry','人間主導のFoundry'];let wordIndex=0;
  if(heroWord&&!reducedMotion){setInterval(()=>{wordIndex=(wordIndex+1)%heroWords.length;heroWord.animate([{opacity:1},{opacity:0},{opacity:1}],{duration:420,easing:'ease'});setTimeout(()=>{heroWord.textContent=heroWords[wordIndex];},200);},2800);}
  window.addEventListener('scroll',updateScrollUI,{passive:true});window.addEventListener('resize',updateScrollUI);updateScrollUI();
})();
