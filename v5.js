/* Local AI Foundry Official Website v5.0
   Cross-RI Core Extraction additive runtime layer.
   Loaded after the existing Human-approved v4.x script. */
(() => {
  'use strict';

  const RELEASE = '2026-08-21-v5.0.html';
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];

  const setText = (sel, text) => {
    const el = qs(sel);
    if (el) el.textContent = text;
    return el;
  };

  const meta = qs('meta[name="description"]');
  if (meta) meta.content = 'Local AI Foundry v5.0。RI#1〜RI#4の実証Evidenceを横断し、Human Authority・Contract・Gate・Review・Evidenceなどの共通制御構造をFoundry Coreへ抽出する次フェーズへ。';
  document.title = 'Local AI Foundry v5.0 — 複数の実証からFoundry Coreへ';

  // Header: one concise navigation addition only.
  const mainNav = qs('.main-nav');
  if (mainNav && !qs('a[href="#core-vector"]', mainNav)) {
    const projectsLink = qs('a[href="#projects"]', mainNav);
    const a = document.createElement('a');
    a.href = '#core-vector';
    a.textContent = '次のベクトル';
    if (projectsLink?.nextSibling) projectsLink.parentNode.insertBefore(a, projectsLink.nextSibling);
    else mainNav.appendChild(a);
  }

  // Hero currentization.
  const evolution = qs('.hero-evolution');
  if (evolution) {
    evolution.classList.add('v5-evolution');
    evolution.innerHTML = '<span>記事自動生成</span><i>→</i><span>人間主導のFoundry</span><i>→</i><span>4つの実証</span><i>→</i><strong>Foundry Core</strong>';
    evolution.setAttribute('aria-label', 'Local AI Foundry v5.0の進化');
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
  setText('.hero-description', '記事、ドキュメント、画像、Research-Grounded Long-form。異なる仕事へAIを委譲して得たEvidenceを横断し、業務を越えて再利用できる制御構造を抽出する。LFは次のフェーズへ進む。');

  const heroActions = qs('.hero-actions');
  if (heroActions) heroActions.innerHTML = '<a class="button primary" href="#projects">4つの実証を見る ↓</a><a class="button" href="#core-vector">次のベクトルを見る</a><a class="button" href="#proof">公開資料</a>';

  const heroStateRow = qs('.hero-state-row');
  if (heroStateRow) heroStateRow.innerHTML = '<div class="state-chip"><span>プロジェクト状態</span><strong>Published</strong></div><div class="state-chip accent"><span>現在の公式HP</span><strong>v5.0</strong></div><div class="state-chip v5-vector"><span>CURRENT VECTOR</span><strong>Core Extraction</strong></div>';
  const heroBottom = qs('.hero-bottom-line');
  if (heroBottom) heroBottom.innerHTML = '<span>Reference Implementations</span><i></i><strong>Foundry Coreへ</strong>';

  // Evolution: same category, higher information density.
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

  // Human × AI wording: keep the successful category, update its state.
  const coreLabel = qs('.control-pattern-label');
  if (coreLabel) coreLabel.innerHTML = '<span>CROSS-RI CONTROL PATTERN</span><strong>4つのRIから共通性を検証し、Foundry Coreへ抽出中</strong>';

  // Capture visitor count before replacing the v4.2 dashboard.
  const existingVisitor = document.getElementById('busuanzi_site_uv');
  const visitorCount = existingVisitor?.textContent?.trim() || '------';

  const projects = document.getElementById('projects');
  if (projects) {
    projects.className = 'section lf-v5-projects';
    projects.innerHTML = `
      <div class="v5-shell">
        <div class="v5-projects-head">
          <div>
            <p class="v5-kicker">04 / 実証プロジェクト　REFERENCE IMPLEMENTATIONS</p>
            <h2>RI#1からRI#4へ。<strong>役割が変わった。</strong></h2>
          </div>
          <p class="v5-projects-copy">RI#1を唯一の本線として完成させるのではなく、異なる業務で得たEvidenceを比較する。RI#1は凍結しHistorical Benchmarkへ。RI#2〜#4の成果をFoundry Coreの材料として扱う。</p>
        </div>

        <div class="v5-pulse" aria-label="Local AI Foundry v5.0 Current Vector">
          <div class="v5-pulse-main"><span>FOUNDRY PULSE / v5.0</span><strong>FROM RI TO FOUNDRY CORE</strong><small>Human-approved vector / 2026.08.21</small></div>
          <article><small>REFERENCE IMPLEMENTATIONS</small><strong>4</strong><span>RI#1 — RI#4</span></article>
          <article class="frozen"><small>FROZEN</small><strong>RI#1</strong><span>Historical Benchmark</span></article>
          <article class="frontier"><small>CURRENT FRONTIER</small><strong>RI#4</strong><span>Active Validation</span></article>
          <article class="core"><small>NEXT VECTOR</small><strong>Core Extraction</strong><span>Cross-RI Evidence</span></article>
        </div>

        <div class="v5-ri-grid" role="tablist" aria-label="Reference Implementations">
          <button class="v5-ri-card frozen" type="button" role="tab" aria-selected="false" data-v5-ri="ri1"><div class="v5-ri-top"><span class="v5-ri-no">RI#1</span><span class="v5-ri-status">FROZEN</span></div><h3>Article Production</h3><p>最初のReference Implementation。Difyを中心にControl Patternの原型を発見。</p><span class="v5-ri-domain">DIFY / OLLAMA / N8N / COMFYUI</span></button>
          <button class="v5-ri-card verified" type="button" role="tab" aria-selected="false" data-v5-ri="ri2"><div class="v5-ri-top"><span class="v5-ri-no">RI#2</span><span class="v5-ri-status">VERIFIED</span></div><h3>Documentation Production</h3><p>Sourceを保ちながら変換し、Python RunnerとHuman Gateで文書制作を実証。</p><span class="v5-ri-domain">PYTHON RUNNER / OLLAMA / HUMAN GATE</span></button>
          <button class="v5-ri-card verified" type="button" role="tab" aria-selected="false" data-v5-ri="ri3"><div class="v5-ri-top"><span class="v5-ri-no">RI#3</span><span class="v5-ri-status">RUNTIME VALIDATED</span></div><h3>Visual Asset Production</h3><p>FoundryConsoleからComfyUIへ。画像生成でも同じControl Patternを検証。</p><span class="v5-ri-domain">FOUNDRYCONSOLE / COMFYUI / HUMAN ACCEPTANCE</span></button>
          <button class="v5-ri-card frontier" type="button" role="tab" aria-selected="true" data-v5-ri="ri4"><div class="v5-ri-top"><span class="v5-ri-no">RI#4</span><span class="v5-ri-status">CURRENT FRONTIER</span></div><h3>Research-Grounded Long-form</h3><p>Live ResearchからTask Fulfillment・Review Integrityまでを自走検証中。</p><span class="v5-ri-domain">SEARCH / OLLAMA / REVIEW / EVIDENCE</span></button>
        </div>

        <div class="v5-ri-detail" aria-live="polite">
          <div class="v5-ri-detail-main" data-v5-detail-main></div>
          <aside class="v5-ri-detail-side" data-v5-detail-side></aside>
        </div>

        <div class="v5-rail-board">
          <div class="v5-rail-head"><strong>Cross-RI Progress</strong><span>完成率ではなく、各RIの現在の役割を表示</span></div>
          <div class="v5-rail"><div class="label"><b>RI#1</b><span>Article Production</span></div><div class="track"><i class="done"></i><i class="done"></i><i class="done"></i><i class="frozen"></i><i></i></div><em>FROZEN / Historical Benchmark</em></div>
          <div class="v5-rail"><div class="label"><b>RI#2</b><span>Documentation</span></div><div class="track"><i class="done"></i><i class="done"></i><i class="done"></i><i class="done"></i><i class="current"></i></div><em>Verified / Core Contributor</em></div>
          <div class="v5-rail"><div class="label"><b>RI#3</b><span>Visual Asset</span></div><div class="track"><i class="done"></i><i class="done"></i><i class="done"></i><i class="done"></i><i class="current"></i></div><em>Human Runtime Validated</em></div>
          <div class="v5-rail"><div class="label"><b>RI#4</b><span>Research Long-form</span></div><div class="track"><i class="done"></i><i class="done"></i><i class="done"></i><i class="current"></i><i></i></div><em>Active Validation / Current Frontier</em></div>
          <div class="v5-rail"><div class="label"><b>CORE</b><span>Foundry Core</span></div><div class="track"><i class="done"></i><i class="current"></i><i></i><i></i><i></i></div><em>Cross-RI Extraction</em></div>
        </div>

        <div class="v5-visitor"><small>VISITOR COUNTER</small><strong id="busuanzi_site_uv">${visitorCount}</strong><span>現行の軽量UVカウンターを維持</span></div>
      </div>`;
  }

  const riData = {
    ri1: {
      kicker: 'RI#1 / ARTICLE PRODUCTION', title: '最初の実証を、Historical Benchmarkへ。',
      copy: 'Dify中心の7-stage Article Productionで、DTO・Contract・Gate・Retry・Evidence・Runtime ProvenanceなどLFの原型を作った。v5.0では追加のRI#1固有開発を凍結し、比較Evidenceとして保存する。',
      tags: ['DTO / Contract', 'Bounded Retry', 'Runtime Provenance', 'Evidence'],
      stats: [['CURRENT ROLE','FROZEN / HISTORICAL BENCHMARK'],['PLATFORM','Dify-centered'],['CORE SIGNAL','Control Pattern origin'],['NEXT','No RI#1-specific expansion']]
    },
    ri2: {
      kicker: 'RI#2 / DOCUMENTATION PRODUCTION', title: 'Difyを外しても、Foundryは成立した。',
      copy: 'Source-Preserving Public TransformationをPython Reference Runnerで実証。Human-facing Stage Visibility、Deterministic Validation、Runtime Capability Calibrationなど、業務を越えて再利用できる要素が明確になった。',
      tags: ['Source Preservation', 'Deterministic Validation', 'Runtime Capability', 'Human Gate'],
      stats: [['CURRENT ROLE','VERIFIED / CORE CONTRIBUTOR'],['CONTROL PLANE','Python Runner'],['CORE SIGNAL','Runtime Capability'],['VALUE','Platform independence']]
    },
    ri3: {
      kicker: 'RI#3 / VISUAL ASSET PRODUCTION', title: '画像生成でも、同じ「任せ方」が必要だった。',
      copy: 'FoundryConsoleをHuman-facing UIとして、Position・Framing・Gate・Retry・Evidenceを制御。Technical Blocking Gateを通ってもHuman Quality Acceptanceが別に必要だという、Foundryの重要な責務分離を実機で確認した。',
      tags: ['FoundryConsole', 'ComfyUI', 'Technical Gate', 'Human Acceptance'],
      stats: [['CURRENT ROLE','HUMAN RUNTIME VALIDATED'],['PROCESSING PLANE','ComfyUI'],['CORE SIGNAL','Gate ≠ Acceptance'],['VALUE','Visual-domain proof']]
    },
    ri4: {
      kicker: 'RI#4 / RESEARCH-GROUNDED LONG-FORM', title: '「書けた」ではなく、「依頼を満たしたか」を見る。',
      copy: 'Live Search、Planning、Structured Schema、Task Fulfillment、Review Integrity、Temporal Entity Integrity、Bring-up Sample LoopまでをFoundryConsole上で可視化。Quality FAILを止めずにEvidenceとして採取する開発方式へ進化している。',
      tags: ['Live Research', 'Task Fulfillment', 'Review Integrity', 'Sample Loop', 'Temporal Entity'],
      stats: [['CURRENT ROLE','ACTIVE VALIDATION / FRONTIER'],['CONTROL PLANE','Python + FoundryConsole'],['CORE SIGNAL','Review Integrity'],['VALUE','Current text-domain frontier']]
    }
  };

  function selectRI(id) {
    const data = riData[id] || riData.ri4;
    qsa('[data-v5-ri]').forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.v5Ri === id)));
    const main = qs('[data-v5-detail-main]');
    const side = qs('[data-v5-detail-side]');
    if (main) main.innerHTML = `<span class="v5-detail-kicker">${data.kicker}</span><h3>${data.title}</h3><p>${data.copy}</p><div class="v5-detail-tags">${data.tags.map(x => `<span>${x}</span>`).join('')}</div>`;
    if (side) side.innerHTML = data.stats.map(([k,v],i) => `<div class="v5-detail-stat"><small>${k}</small><strong class="${i===2?'core':''}">${v}</strong></div>`).join('');
  }
  qsa('[data-v5-ri]').forEach(btn => btn.addEventListener('click', () => selectRI(btn.dataset.v5Ri)));
  selectRI('ri4');

  // Exactly one new category: Foundry Core / Next Vector.
  if (!document.getElementById('core-vector') && projects) {
    const core = document.createElement('section');
    core.className = 'v5-core-section';
    core.id = 'core-vector';
    core.innerHTML = `
      <div class="v5-core-shell">
        <div class="v5-core-head">
          <div><p class="v5-core-kicker">05 / 次のベクトル　FOUNDRY CORE</p><h2>作る対象から、<strong>制御構造へ。</strong></h2></div>
          <p>各RIのDomain固有ロジックをCoreへ混ぜない。複数の業務で再現したHuman Authority・Contract・Deterministic Gate・Review・Evidenceなどを、Platform-independentなFoundry Core Candidateとして抽出する。</p>
        </div>
        <div class="v5-core-flow" aria-label="Foundry Core Extraction Flow">
          <div class="v5-core-node"><span>01 / EVIDENCE</span><strong>Reference Implementations</strong><small>記事・文書・画像・Research Long-form。異なる失敗と成功を集める。</small></div>
          <div class="v5-core-arrow" aria-hidden="true">→</div>
          <div class="v5-core-node"><span>02 / EXTRACTION</span><strong>Common Control Pattern</strong><small>Domainを越えて再現した責務・Gate・Runtime Controlを比較する。</small></div>
          <div class="v5-core-arrow" aria-hidden="true">→</div>
          <div class="v5-core-node target"><span>03 / NEXT</span><strong>Foundry Core Candidate</strong><small>DifyやComfyUIそのものではなく、任せ方を制御する共通層へ。</small></div>
        </div>
        <div class="v5-core-signals" aria-label="Foundry Core Candidate signals">
          <span>Human Authority</span><span>Contract</span><span>Deterministic Gate</span><span class="confirmed">Runtime Capability</span><span>Review Integrity</span><span>Evidence</span>
        </div>
        <div class="v5-core-note"><strong>v5.0 Human Decision:</strong> RI#1固有開発は凍結。RI#1〜RI#4のCross-RI Evidenceを基準に、Foundry Core Extractionを次のProject Vectorとする。</div>
      </div>`;
    projects.insertAdjacentElement('afterend', core);
  }

  // Renumber later categories without deleting/restructuring them.
  const proofKicker = qs('#proof .kicker');
  if (proofKicker) proofKicker.innerHTML = '06 / 実装と公開資料 <span>PROOF OF WORK</span>';
  const currentKicker = qs('#current .kicker');
  if (currentKicker) currentKicker.innerHTML = '07 / 現在地 <span>CURRENT STATE</span>';

  // Current state: keep Project State semantics separate from project vector.
  const current = document.getElementById('current');
  if (current) current.classList.add('v5-current');
  const currentTitle = qs('#current h2');
  if (currentTitle) currentTitle.innerHTML = '<span class="title-line">v5.0へ。</span><strong class="title-line">4つの実証から、</strong><strong class="title-line">Coreを取り出す。</strong>';
  const currentCopy = qs('#current .current-copy > p:not(.kicker)');
  if (currentCopy) currentCopy.textContent = 'RI#1をHistorical Benchmarkとして凍結し、RI#2〜RI#4で得られたEvidenceを横断する。Websiteの主語も「RI#1の完成」から「Foundry Core Extraction」へ更新した。';
  const currentActions = qs('#current .current-actions');
  if (currentActions) currentActions.innerHTML = `<a class="button compact primary" href="releases/${RELEASE}">v5.0更新内容</a><a class="button compact" href="#core-vector">次のベクトル</a><a class="button compact" href="releases/index.html">更新履歴</a>`;
  const statusPanel = qs('#current .status-panel');
  if (statusPanel) statusPanel.innerHTML = '<article><span>プロジェクト状態</span><strong class="ok">Published</strong></article><article><span>現在の公式HP</span><strong class="accent-text">v5.0</strong></article><article><span>Current Vector</span><strong>Foundry Core Extraction</strong></article><article><span>Current Frontier</span><strong>RI#4 / Active Validation</strong></article>';

  // Version references that are safe to currentize globally.
  qsa('[data-pulse-updated]').forEach(el => { if (!el.textContent.trim() || el.textContent.trim() === '--') el.textContent = '2026-08-21'; });
})();
