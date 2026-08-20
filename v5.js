/* Local AI Foundry Official Website v5.0
   Visual Recovery / Layout Integrity Hotfix r1
   Loaded after the v4.2 Human-approved S13 dashboard. */
(() => {
  'use strict';

  const RELEASE = '2026-08-21-v5.0.html';
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const setText = (s, value, r = document) => qsa(s, r).forEach(el => { el.textContent = value; });

  const meta = qs('meta[name="description"]');
  if (meta) meta.content = 'Local AI Foundry v5.0。RI#1〜RI#4の実証Evidenceを横断し、Human Authority・Contract・Gate・Review・Evidenceなどの共通制御構造をFoundry Coreへ抽出する次フェーズへ。';
  document.title = 'Local AI Foundry v5.0 — 複数の実証からFoundry Coreへ';

  /* Header: one new navigation category only. */
  const mainNav = qs('.main-nav');
  if (mainNav && !qs('a[href="#core-vector"]', mainNav)) {
    const projectsLink = qs('a[href="#projects"]', mainNav);
    const link = document.createElement('a');
    link.href = '#core-vector';
    link.textContent = '次のベクトル';
    projectsLink?.insertAdjacentElement('afterend', link);
  }

  /* Hero: v4 composition retained, v5 density corrected. */
  const hero = qs('.hero');
  hero?.classList.add('v5-hero');
  const evolution = qs('.hero-evolution');
  if (evolution) {
    evolution.classList.add('v5-evolution');
    evolution.innerHTML = '<span>記事自動生成</span><i>→</i><span>人間主導のFoundry</span><i>→</i><span>4つの実証</span><i>→</i><strong>Foundry Core</strong>';
    evolution.setAttribute('aria-label', '記事自動生成から人間主導のFoundry、4つの実証、Foundry Coreへの進化');
  }
  const beacon = qs('.version-beacon');
  if (beacon) {
    beacon.classList.add('v5-beacon');
    beacon.href = `releases/${RELEASE}`;
    beacon.setAttribute('aria-label', 'Local AI Foundry v5.0 リリース詳細');
    beacon.innerHTML = '<span>CURRENT VERSION</span><strong>v5.0</strong><em>CROSS-RI CORE EXTRACTION</em><b>詳細 →</b>';
  }
  const eyebrow = qs('.hero-copy .eyebrow em');
  if (eyebrow) eyebrow.textContent = '次のベクトル / CORE EXTRACTION';
  const heroMain = qs('.hero-main');
  if (heroMain) heroMain.innerHTML = '<span class="title-line">複数の実証から、</span><strong class="title-line">Foundry Coreへ。</strong>';
  const heroDescription = qs('.hero-description');
  if (heroDescription) heroDescription.textContent = '記事、ドキュメント、画像、Research-Grounded Long-form。異なる仕事へAIを委譲して得たEvidenceを横断し、業務を越えて再利用できる制御構造を抽出する。LFは次のフェーズへ進む。';
  const heroActions = qs('.hero-actions');
  if (heroActions) heroActions.innerHTML = '<a class="button primary" href="#projects">4つの実証を見る ↓</a><a class="button" href="#core-vector">次のベクトルを見る</a><a class="button" href="#proof">公開資料</a>';
  const heroStates = qs('.hero-state-row');
  if (heroStates) heroStates.innerHTML = '<div class="state-chip"><span>プロジェクト状態</span><strong>Published</strong></div><div class="state-chip accent"><span>現在の公式HP</span><strong>v5.0</strong></div><div class="state-chip v5-vector"><span>CURRENT VECTOR</span><strong>Core Extraction</strong></div>';
  const heroBottom = qs('.hero-bottom-line');
  if (heroBottom) heroBottom.innerHTML = '<span>Reference Implementations</span><i></i><strong>Foundry Coreへ</strong>';

  /* Existing EVOLUTION section: same visual asset, four evidence steps. */
  const evoHeading = qs('#evolution .section-heading');
  if (evoHeading) {
    const h2 = qs('h2', evoHeading);
    const p = qs(':scope > p', evoHeading);
    if (h2) h2.innerHTML = '<span class="title-line">一つのWorkflowから始まった。</span><strong class="title-line">四つの実証が、Coreを見せた。</strong>';
    if (p) p.textContent = 'RI#1だけでは仮説だったControl Patternを、RI#2〜RI#4の異なる業務とRuntimeで比較できるところまで来た。次は共通部分をFoundry Coreとして抽出する。';
  }
  const evoPulse = qs('.evolution-pulse');
  if (evoPulse) evoPulse.innerHTML = '<span>ARTICLE</span><i></i><span>DOCUMENT</span><i></i><span>VISUAL</span><i></i><span>RESEARCH</span><i></i><strong>CORE</strong>';
  const evoTrack = qs('.evolution-track');
  if (evoTrack) {
    evoTrack.classList.add('v5-evolution-track');
    evoTrack.innerHTML = `
      <article class="evolution-step visible"><span class="step-no">01</span><div><small>出発点</small><h3>RI#1 / 記事制作</h3><p>Dify中心のArticle Productionから、Contract・DTO・Gate・Retry・Evidenceの原型を得た。</p></div></article>
      <article class="evolution-step visible"><span class="step-no">02</span><div><small>業務横断</small><h3>RI#2 / 文書制作</h3><p>Python RunnerでSource-preserving TransformationとRuntime Capabilityを実証した。</p></div></article>
      <article class="evolution-step visible"><span class="step-no">03</span><div><small>異種Runtime</small><h3>RI#3 / Visual</h3><p>FoundryConsoleとComfyUIで、Technical GateとHuman Quality Acceptanceの分離を実証した。</p></div></article>
      <article class="evolution-step final visible"><span class="step-no">04</span><div><small>現在地</small><h3>RI#4 → Core</h3><p>Research・Review Integrityまで広げ、複数RIの共通Control PatternをFoundry Coreへ抽出する。</p></div></article>`;
  }
  const big = qs('#evolution .big-statement');
  if (big) big.innerHTML = '<span>RIを増やすことが目的ではない。</span><strong>共通する制御構造を見つける。</strong>';
  const coreLabel = qs('.control-pattern-label');
  if (coreLabel) coreLabel.innerHTML = '<span>CROSS-RI CONTROL PATTERN</span><strong>4つのRIから共通性を検証し、Foundry Coreへ抽出中</strong>';

  /* =======================================================
     PROJECTS: currentize the existing v4.2 S13 dashboard.
     No section replacement. No v4 animation loss.
     ======================================================= */
  const projects = qs('#projects');
  const root = qs('.s13-dashboard', projects || document);
  const board = qs('.parallel-board', root || document);
  const projectCards = qs('.project-cards', root || document);
  const pulse = qs('.foundry-pulse', root || document);

  if (projects) projects.classList.add('v5-projects-current');
  if (root) root.classList.add('v5-dashboard');

  if (root) {
    const heading = qs('.section-title.s13-standard-heading', root);
    if (heading) {
      const kicker = qs('.s13-kicker', heading);
      const title = qs('h1', heading);
      const copy = qs('.section-copy', heading);
      if (kicker) kicker.innerHTML = '04 / 実証プロジェクト <span>REFERENCE IMPLEMENTATIONS / CROSS-RI</span>';
      if (title) title.innerHTML = '<span>RI#1からRI#4へ。</span><strong>4つの実証を、Coreへ束ねる。</strong>';
      if (copy) copy.textContent = 'v4.2までに作り込んだReference Telemetryをそのまま使い、RI#1〜RI#4を同じ管制盤で比較する。RI#1はHistorical Benchmarkへ凍結し、RI#2〜RI#4のEvidenceをFoundry Coreへ接続する。';
    }
  }

  const pulseViews = {
    overview: { title:'OVERVIEW', sub:'FOUNDRY v5 / CROSS-RI', metrics:[['PROJECT STATE','Published','info'],['CURRENT VECTOR','CORE EXTRACTION','core'],['FROZEN','RI#1','frozen'],['CORE CONTRIBUTORS','RI#2 / RI#3','ok'],['CURRENT FRONTIER','RI#4','frontier'],['WEBSITE','v5.0','info']] },
    ri1: { title:'RI#1', sub:'ARTICLE PRODUCTION / HISTORICAL', metrics:[['ROLE','FROZEN','frozen'],['PLATFORM','DIFY-CENTERED','info'],['LEGACY','CONTROL ORIGIN','ok'],['RUNTIME SNAPSHOT','PRESERVED','info'],['NEW EXPANSION','NONE','frozen'],['USE','BENCHMARK','frontier']] },
    ri2: { title:'RI#2', sub:'DOCUMENTATION PRODUCTION', metrics:[['ROLE','CORE CONTRIBUTOR','ok'],['WORKFLOW','VERIFIED','ok'],['CONTROL PLANE','PYTHON','info'],['SOURCE','PRESERVED','ok'],['CORE SIGNAL','RUNTIME CAPABILITY','core'],['STATUS','VERIFIED','ok']] },
    ri3: { title:'RI#3', sub:'VISUAL ASSET PRODUCTION', metrics:[['ROLE','CORE CONTRIBUTOR','ok'],['LIVE','EXECUTED','ok'],['EVIDENCE','21 JOBS','ok'],['BLOCKING GATE','20 / 21','ok'],['CORE SIGNAL','GATE ≠ ACCEPTANCE','frontier'],['STATUS','RUNTIME VALIDATED','ok']] },
    ri4: { title:'RI#4', sub:'RESEARCH-GROUNDED LONG-FORM', metrics:[['ROLE','CURRENT FRONTIER','frontier'],['PIPELINE','BRING-UP LOOP','ok'],['RESEARCH','LIVE','ok'],['REVIEW','INTEGRITY','core'],['TEMPORAL','ENTITY GATE','core'],['STATUS','ACTIVE VALIDATION','frontier']] }
  };

  function renderPulse(view) {
    if (!pulse) return;
    const data = pulseViews[view] || pulseViews.overview;
    const title = qs('[data-v5-pulse-title]', pulse);
    const sub = qs('[data-v5-pulse-sub]', pulse);
    const metrics = qs('[data-v5-pulse-metrics]', pulse);
    if (title) title.textContent = data.title;
    if (sub) sub.textContent = data.sub;
    qsa('[data-v5-pulse-view]', pulse).forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.v5PulseView === view)));
    if (metrics) metrics.innerHTML = data.metrics.map(([label,value,tone]) => `<div class="pulse-metric"><small>${label}</small><strong class="${tone||''}">${value}</strong></div>`).join('');
  }

  if (pulse) {
    pulse.classList.add('lf-pulse-v2');
    pulse.innerHTML = `
      <div class="pulse-left"><span>FOUNDRY PULSE</span><svg aria-hidden="true" viewBox="0 0 320 62"><polyline class="pulse-shadow" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline><polyline class="pulse-line" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline></svg></div>
      <div class="lf-pulse-console">
        <div class="lf-pulse-toolbar">
          <div class="lf-pulse-view-label"><small>VIEW</small><strong data-v5-pulse-title data-pulse-view-title>OVERVIEW</strong><span data-v5-pulse-sub data-pulse-view-sub>FOUNDRY v5 / CROSS-RI</span></div>
          <div class="lf-pulse-tabs" role="tablist" aria-label="Foundry Pulse表示切替">
            <button class="lf-pulse-tab" type="button" role="tab" aria-selected="true" data-v5-pulse-view="overview">OVERVIEW</button>
            <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-v5-pulse-view="ri1">RI#1</button>
            <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-v5-pulse-view="ri2">RI#2</button>
            <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-v5-pulse-view="ri3">RI#3</button>
            <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-v5-pulse-view="ri4">RI#4</button>
          </div>
        </div>
        <div class="lf-pulse-metrics" data-v5-pulse-metrics data-pulse-metrics></div>
      </div>
      <div aria-hidden="true" class="radar"><i></i><b></b><em></em></div>`;
    pulse.addEventListener('click', e => {
      const tab = e.target.closest('[data-v5-pulse-view]');
      if (tab) renderPulse(tab.dataset.v5PulseView);
    });
    pulse.addEventListener('keydown', e => {
      const tab = e.target.closest('[data-v5-pulse-view]');
      if (!tab || !['ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const tabs = qsa('[data-v5-pulse-view]', pulse);
      const i = tabs.indexOf(tab);
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); renderPulse(next.dataset.v5PulseView);
    });
    renderPulse('overview');
  }

  if (projectCards) {
    const ri1Card = qs('[data-open-ri1]', projectCards);
    const ri2Card = qs('[data-open-ri2]', projectCards);
    const ri3Card = qs('[data-open-ri3]', projectCards);
    if (ri1Card) {
      ri1Card.classList.add('v5-frozen-card');
      qs('b', ri1Card).innerHTML = '<em>RI#1</em> 記事制作';
      qs('small', ri1Card).innerHTML = 'Article Production /<br>Historical Benchmark';
      qs('mark', ri1Card).textContent = 'FROZEN';
      ri1Card.addEventListener('click', () => renderPulse('ri1'));
    }
    if (ri2Card) {
      qs('small', ri2Card).innerHTML = 'Document Transformation /<br>Core Contributor';
      qs('mark', ri2Card).textContent = 'VERIFIED';
      ri2Card.addEventListener('click', () => renderPulse('ri2'));
    }
    if (ri3Card) {
      qs('small', ri3Card).innerHTML = 'Visual Asset Production /<br>Runtime Validated';
      qs('mark', ri3Card).textContent = 'VALIDATED';
      ri3Card.addEventListener('click', () => renderPulse('ri3'));
    }
    let ri4Card = qs('[data-open-ri4]', projectCards);
    if (!ri4Card) {
      const add = qs('.project-card.add', projectCards) || projectCards.lastElementChild;
      ri4Card = document.createElement('button');
      ri4Card.type = 'button';
      ri4Card.className = 'project-card active-card v5-frontier-card';
      ri4Card.dataset.openRi4 = '';
      ri4Card.innerHTML = '<span class="project-icon">◎</span><span><b><em>RI#4</em> Research Long-form</b><small>Research-Grounded /<br>Current Frontier</small></span><mark>FRONTIER</mark><i class="card-trace"></i>';
      add?.replaceWith(ri4Card);
    }
    ri4Card?.addEventListener('click', () => renderPulse('ri4'));
  }

  if (board && root) {
    const ri1Line = qs('.ri1-line', board);
    const ri2Line = qs('.ri2-line', board);
    const ri3Line = qs('.ri3-line', board);
    if (ri1Line) {
      ri1Line.classList.add('v5-frozen-line');
      const lineState = qs('.line-state', ri1Line); if (lineState) { lineState.removeAttribute('data-overall'); lineState.textContent = 'FROZEN'; }
      const small = qs('.line-name small', ri1Line); if (small) small.textContent = 'Historical Benchmark';
      const headP = qs('.telemetry-head p', ri1Line); if (headP) headP.textContent = 'RI #1 / ARTICLE PRODUCTION / HISTORICAL';
      const headH = qs('.telemetry-head h3', ri1Line); if (headH) headH.textContent = 'FROZEN TELEMETRY';
      const main = qs('.telemetry-main', ri1Line);
      if (main && !qs('.v5-frozen-banner', main)) main.insertAdjacentHTML('afterbegin','<div class="v5-frozen-banner"><strong>FROZEN / HISTORICAL BENCHMARK</strong> 以下は凍結時点のRuntime / Evidence Snapshot。v5.0以降、RI#1固有開発は拡張しない。</div>');
      qs('#ri1-toggle', ri1Line)?.addEventListener('click', () => renderPulse('ri1'));
    }
    if (ri2Line) {
      const lineState = qs('.line-state', ri2Line); if (lineState) { lineState.removeAttribute('data-ri2-overall'); lineState.textContent = 'VERIFIED'; }
      const small = qs('.line-name small', ri2Line); if (small) small.textContent = 'Core Contributor';
      qs('#ri2-toggle', ri2Line)?.addEventListener('click', () => renderPulse('ri2'));
    }
    if (ri3Line) {
      const lineState = qs('.line-state', ri3Line); if (lineState) lineState.textContent = 'RUNTIME VALIDATED';
      const small = qs('.line-name small', ri3Line); if (small) small.textContent = 'Runtime Validated / Core Contributor';
      qs('#ri3-toggle', ri3Line)?.addEventListener('click', () => renderPulse('ri3'));
      ri2Line?.insertAdjacentElement('afterend', ri3Line);
    }

    /* Add RI#4 as a first-class S13 telemetry rail. */
    if (!qs('.ri4-line', board)) {
      const ri4 = document.createElement('article');
      ri4.className = 'project-line ri4-line';
      ri4.id = 'ri4-line';
      ri4.innerHTML = `
        <div aria-label="RI#4 Research-Grounded Long-formの詳細を開く" class="ri4-rail-row" role="button" tabindex="0">
          <button aria-controls="ri4-telemetry" aria-expanded="false" class="line-toggle" id="ri4-toggle" type="button">
            <span class="line-id"><i>◎</i><b>RI#4</b></span><span class="line-name"><strong>Research Long-form</strong><small>Research-Grounded / Current Frontier</small></span><span class="line-state">ACTIVE</span><span aria-hidden="true" class="chevron">⌄</span>
          </button>
          <div aria-label="RI#4 Research-Grounded Long-form: 実証段階" class="stage-rail ri4-stage-rail">
            <div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment current"></div><div class="rail-segment"></div>
            <div class="rail-node n1 done"><span></span></div><div class="rail-node n2 done"><span></span></div><div class="rail-node n3 done"><span></span></div><div class="rail-node n4 current"><span class="orb"></span><b class="orb-ring r1"></b><b class="orb-ring r2"></b><b class="orb-ring r3"></b></div><div class="rail-node n5"><span></span></div>
            <div aria-hidden="true" class="energy-beam" style="left:70%"><i></i><b></b><em></em></div>
          </div>
        </div>
        <div aria-hidden="true" aria-labelledby="ri4-telemetry-title" class="telemetry-reveal" id="ri4-telemetry" inert role="region">
          <div class="telemetry-reveal-inner"><section class="telemetry-panel ri4-telemetry-panel">
            <div aria-hidden="true" class="panel-grid"></div><div aria-hidden="true" class="panel-noise"></div><div aria-hidden="true" class="panel-scan"></div><div aria-hidden="true" class="edge-trace trace-a"></div><div aria-hidden="true" class="edge-trace trace-b"></div>
            <aside class="operator-card boot-item" style="--boot:0"><span class="operator-label">RESEARCH OPERATOR</span><div class="operator-art"><img alt="Foundry Research Operator" src="assets/ri1-operator.webp"/></div><div class="operator-comment"><small>OPERATOR COMMENT</small><p>Live ResearchからPlanning・Section Writing・Whole Article Review・Evidenceまで自走。Bring-up Sample LoopでQuality FAILを止めずに採取し、Review IntegrityとTemporal Entity Integrityを現在のFrontierとして検証中。</p></div></aside>
            <div class="telemetry-main">
              <header class="telemetry-head boot-item" style="--boot:1"><div><p>RI #4 / RESEARCH-GROUNDED LONG-FORM</p><h3 id="ri4-telemetry-title">RESEARCH TELEMETRY</h3></div><div class="projection-badge"><span></span>HUMAN + CHATGPT CURRENT</div><button aria-label="RI#4管制盤を閉じる" class="panel-close" data-close-ri4 type="button">×</button></header>
              <div class="status-grid">
                <article class="status-card v5-frontier boot-item" style="--boot:2"><small>CURRENT ROLE</small><strong>CURRENT FRONTIER</strong></article>
                <article class="status-card green boot-item" style="--boot:3"><small>PIPELINE</small><strong>END-TO-END</strong></article>
                <article class="status-card green boot-item" style="--boot:4"><small>SAMPLE LOOP</small><strong>ACTIVE</strong></article>
                <article class="status-card v5-frontier boot-item" style="--boot:5"><small>REVIEW INTEGRITY</small><strong>ACTIVE</strong></article>
                <article class="status-card v5-frontier boot-item" style="--boot:6"><small>TEMPORAL ENTITY</small><strong>GATED</strong></article>
                <article class="status-card v5-amber boot-item" style="--boot:7"><small>PRODUCTION ACCEPTANCE</small><strong>PENDING</strong></article>
              </div>
              <div class="pipeline-block boot-item" style="--boot:8"><p class="micro-title">RESEARCH-GROUNDED PROGRESSION</p><div class="pipeline"><span class="ok">SEARCH <i>✓</i></span><b>→</b><span class="ok">PLAN <i>✓</i></span><b>→</b><span class="ok">WRITE <i>✓</i></span><b>→</b><span class="next">REVIEW <i>◎</i></span><b>→</b><span class="pending">ACCEPTANCE</span></div></div>
              <div class="telemetry-lower">
                <div class="contract-block boot-item" style="--boot:9"><p class="micro-title">CURRENT CONTROL CONTRACTS</p><div class="contract-row"><span>Task Fulfillment</span><strong>GATED</strong></div><div class="contract-row"><span>Review Integrity</span><strong>GATED</strong></div><div class="contract-row"><span>Temporal Entity Integrity</span><strong>GATED</strong></div></div>
                <div class="evidence-block boot-item" style="--boot:10"><p class="micro-title">EVIDENCE MODE</p><div aria-hidden="true" class="evidence-ring"><span>LOOP</span></div><ul><li><span>Quality Gate</span><strong>PASS / FAIL VISIBLE</strong></li><li><span>Bring-up</span><strong>NON-BLOCKING</strong></li><li><span>Human Review</span><strong>REQUIRED</strong></li></ul></div>
              </div>
              <footer class="telemetry-foot boot-item" style="--boot:11"><span>CURRENT FRONTIER</span><p>「生成できたか」だけでなく、依頼・Source・時期・Review判定が成立しているかをEvidenceで見る。</p></footer>
            </div>
          </section></div>
        </div>`;
      (ri3Line || ri2Line)?.insertAdjacentElement('afterend', ri4);
    }

    const ri4Line = qs('.ri4-line', board);
    const ri4Row = qs('.ri4-rail-row', ri4Line || board);
    const ri4Toggle = qs('#ri4-toggle', ri4Line || board);
    const ri4Reveal = qs('#ri4-telemetry', ri4Line || board);
    const ri4Close = qs('[data-close-ri4]', ri4Line || board);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ri4Open = false;
    let bootTimer = 0;

    function scrollRi4(){ if (!ri4Row) return; window.scrollTo({top:ri4Row.getBoundingClientRect().top + window.scrollY - 96,behavior:reduce.matches?'auto':'smooth'}); }
    function closeOther(){ if (board.classList.contains('ri1-open')) qs('[data-close-ri1]',root)?.click(); if (board.classList.contains('ri2-open')) qs('[data-close-ri2]',root)?.click(); if (board.classList.contains('ri3-open')) qs('[data-close-ri3]',root)?.click(); }
    function openRi4({scroll=true}={}){
      if (ri4Open){ if(scroll) scrollRi4(); return; }
      closeOther(); clearTimeout(bootTimer); ri4Open=true;
      board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri1-open','ri2-open','ri3-open','ri4-open','ri-open');
      board.classList.add('ri-open','ri4-open','ri-booting');
      ri4Toggle?.setAttribute('aria-expanded','true'); ri4Reveal?.setAttribute('aria-hidden','false'); if(ri4Reveal)ri4Reveal.inert=false;
      setText('[data-guide-label]','RI#4 GUIDE',root); setText('[data-current-stage]','ACTIVE VALIDATION',root);
      requestAnimationFrame(()=>requestAnimationFrame(()=>board.classList.add('ri-energized')));
      bootTimer=window.setTimeout(()=>board.classList.remove('ri-booting'),1250);
      renderPulse('ri4'); document.dispatchEvent(new CustomEvent('lf:ri4-opened'));
      if(scroll)window.setTimeout(scrollRi4,90);
    }
    function closeRi4({focus=true,preserveBoard=false}={}){ if(!ri4Open)return; ri4Open=false; clearTimeout(bootTimer); if(preserveBoard){board.classList.remove('ri4-open');}else{board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri4-open','ri-open');} ri4Toggle?.setAttribute('aria-expanded','false'); ri4Reveal?.setAttribute('aria-hidden','true'); if(ri4Reveal)ri4Reveal.inert=true; if(focus)window.setTimeout(()=>ri4Toggle?.focus({preventScroll:true}),reduce.matches?0:300); }
    ri4Toggle?.addEventListener('click',e=>{e.stopPropagation();ri4Open?closeRi4({focus:false}):openRi4({scroll:true});});
    ri4Row?.addEventListener('click',e=>{if(e.target.closest('#ri4-telemetry'))return;ri4Open?closeRi4({focus:false}):openRi4({scroll:true});});
    ri4Row?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();ri4Open?closeRi4({focus:false}):openRi4({scroll:true});}});
    ri4Close?.addEventListener('click',e=>{e.stopPropagation();closeRi4({focus:true});});
    qsa('[data-open-ri4]',root).forEach(el=>el.addEventListener('click',()=>openRi4({scroll:true})));
    document.addEventListener('lf:ri1-opened',()=>{if(ri4Open)closeRi4({focus:false,preserveBoard:true});renderPulse('ri1');});
    document.addEventListener('lf:ri2-opened',()=>{if(ri4Open)closeRi4({focus:false,preserveBoard:true});renderPulse('ri2');});
    document.addEventListener('lf:ri3-opened',()=>{if(ri4Open)closeRi4({focus:false,preserveBoard:true});renderPulse('ri3');});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ri4Open){e.preventDefault();closeRi4({focus:true});}});

    /* Currentize static WEB / CORE rails while keeping their original presentation. */
    const otherLines = qsa('.project-line.other-line', board);
    const webLine = otherLines.find(el => qs('.line-id b', el)?.textContent.trim() === 'WEB');
    const coreLine = otherLines.find(el => qs('.line-id b', el)?.textContent.trim() === 'CORE');
    if (webLine) { qs('.line-name strong',webLine).textContent='公式HP v5.0'; qs('.line-name small',webLine).textContent='Website / Cross-RI Repositioning'; }
    if (coreLine) { coreLine.classList.add('v5-core-line'); qs('.line-name strong',coreLine).textContent='Foundry Core Extraction'; qs('.line-name small',coreLine).textContent='Current Vector / Cross-RI Evidence'; }
  }

  /* One new category only: a richer console that reuses the existing mascot asset. */
  if (!qs('#core-vector') && projects) {
    const core = document.createElement('section');
    core.id = 'core-vector';
    core.className = 'v5-core-section';
    core.innerHTML = `
      <div class="v5-core-shell">
        <div class="v5-core-head">
          <div><p class="v5-core-kicker">05 / 次のベクトル　FOUNDRY CORE</p><h2>作る対象から、<strong>制御構造へ。</strong></h2></div>
          <p>各RIのDomain固有ロジックをCoreへ混ぜない。複数の業務で再現したHuman Authority・Contract・Deterministic Gate・Runtime Capability・Review Integrity・EvidenceをPlatform-independentなCore Candidateとして抽出する。</p>
        </div>
        <div class="v5-core-console">
          <div class="v5-core-console-head"><div><i class="v5-core-live"></i><strong>CORE EXTRACTION CONSOLE</strong></div><span>CROSS-RI EVIDENCE / CURRENT VECTOR</span></div>
          <div class="v5-core-flow"><div class="v5-core-node"><span>01 / EVIDENCE</span><strong>Reference Implementations</strong><small>記事・文書・画像・Research Long-form。異なるDomainで成功と失敗を採る。</small></div><div class="v5-core-arrow">→</div><div class="v5-core-node"><span>02 / EXTRACTION</span><strong>Common Control Pattern</strong><small>Domainを越えて再現した責務・Gate・Runtime Controlを比較する。</small></div><div class="v5-core-arrow">→</div><div class="v5-core-node target"><span>03 / NEXT</span><strong>Foundry Core Candidate</strong><small>DifyやComfyUIそのものではなく、AIへの任せ方を制御する共通層へ。</small></div></div>
          <div class="v5-core-signals"><span>Human Authority</span><span>Contract</span><span>Deterministic Gate</span><span class="confirmed">Runtime Capability</span><span>Review Integrity</span><span>Evidence</span></div>
          <div class="v5-core-decision"><strong>v5.0 Human Decision:</strong> RI#1固有開発を凍結。RI#1〜RI#4のCross-RI Evidenceを基準にFoundry Core Extractionへ進む。</div>
          <div class="v5-core-guide" aria-hidden="true"><img src="assets/ri-guide.webp" alt=""></div>
        </div>
      </div>`;
    projects.insertAdjacentElement('afterend', core);
  }

  /* Renumber existing later sections, without deleting or rebuilding them. */
  const proofKicker = qs('#proof .kicker'); if (proofKicker) proofKicker.innerHTML = '06 / 実装と公開資料 <span>PROOF OF WORK</span>';
  const currentKicker = qs('#current .kicker'); if (currentKicker) currentKicker.innerHTML = '07 / 現在地 <span>CURRENT STATE</span>';

  /* Existing proof map: same visual map, platform meaning currentized. */
  const map = qs('#proof .system-map');
  if (map) {
    const coreSpan = qs('.system-core span',map); if(coreSpan)coreSpan.textContent='Core Candidate';
    const dify = qs('.n-dify small',map); if(dify)dify.textContent='Adapter / RI#1';
    const n8n = qs('.n-n8n small',map); if(n8n)n8n.textContent='Integration Adapter';
    const ollama = qs('.n-ollama small',map); if(ollama)ollama.textContent='Local LLM Runtime';
    const comfy = qs('.n-comfy small',map); if(comfy)comfy.textContent='Visual Runtime';
    const git = qs('.n-git small',map); if(git)git.textContent='Evidence / Change';
    const human = qs('.n-human small',map); if(human)human.textContent='Decision / Acceptance';
  }

  /* Current state remains compact and uses the existing panel. */
  const current = qs('#current');
  current?.classList.add('v5-current');
  const currentTitle = qs('#current h2'); if(currentTitle)currentTitle.innerHTML='<span class="title-line">v5.0へ。</span><strong class="title-line">4つの実証から、</strong><strong class="title-line">Coreを取り出す。</strong>';
  const currentCopy = qs('#current .current-copy > p:not(.kicker)'); if(currentCopy)currentCopy.textContent='RI#1をHistorical Benchmarkとして凍結し、RI#2〜RI#4で得られたEvidenceを横断する。Websiteの主語も「RI#1の完成」から「Foundry Core Extraction」へ更新した。';
  const actions = qs('#current .current-actions'); if(actions)actions.innerHTML=`<a class="button compact primary" href="releases/${RELEASE}">v5.0更新内容</a><a class="button compact" href="#core-vector">次のベクトル</a><a class="button compact" href="releases/index.html">更新履歴</a>`;
  const status = qs('#current .status-panel'); if(status)status.innerHTML='<article><span>プロジェクト状態</span><strong class="ok">Published</strong></article><article><span>現在の公式HP</span><strong class="accent-text">v5.0</strong></article><article><span>Current Vector</span><strong>Foundry Core Extraction</strong></article><article><span>Current Frontier</span><strong>RI#4 / Active Validation</strong></article>';

  const coreNav = qs('.main-nav a[href="#core-vector"]');
  const coreSection = qs('#core-vector');
  if (coreNav && coreSection) {
    const syncCoreNav = () => {
      const rect = coreSection.getBoundingClientRect();
      const inside = rect.top <= 125 && rect.bottom > 125;
      coreNav.classList.toggle('active', inside);
      if (inside) qsa('.main-nav a[href^="#"]').forEach(link => { if (link !== coreNav) link.classList.remove('active'); });
    };
    window.addEventListener('scroll', syncCoreNav, {passive:true});
    window.addEventListener('resize', syncCoreNav);
    syncCoreNav();
  }
})();
