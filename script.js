/* Local AI Foundry S13 — FIXED Human-approved projects section */
(() => {
  const current = document.getElementById('projects');
  if (!current) return;
  const style = document.createElement('style');
  style.id = 'lf-s13-projects-fixed';
  style.textContent = `.s13-dashboard{--bg:#020713;--bg2:#041020;--panel:#061426;--panel2:#071a31;--line:rgba(87,146,214,.22);--text:#eef7ff;--muted:#8297ae;--cyan:#21e7ff;--cyan2:#58a6ff;--green:#55f2b5;--violet:#8f6cff;--pink:#ff4ba5;--orange:#ff785a;--amber:#ffc743;--shell:min(1520px,calc(100% - 54px));--header:70px;--ease:cubic-bezier(.16,1,.3,1)}.s13-dashboard *{box-sizing:border-box}.s13-dashboard{scroll-behavior:smooth;scroll-padding-top:84px}.s13-dashboard{margin:0;background:radial-gradient(circle at 55% 38%,#07152b 0,#020713 44%,#01040b 100%);color:var(--text);font-family:Inter,"Noto Sans JP","Yu Gothic UI",Meiryo,sans-serif;line-height:1.55;overflow-x:clip;overflow-y:visible}.s13-dashboard button,.s13-dashboard a{font:inherit}.s13-dashboard button{color:inherit}.s13-dashboard .skip-link{position:fixed;left:12px;top:-70px;z-index:9999;padding:10px 14px;background:#fff;color:#000}.s13-dashboard .skip-link:focus{top:12px}.s13-dashboard .shell{width:var(--shell);margin:auto}.s13-dashboard .ambient{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}.s13-dashboard .ambient i{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--cyan);box-shadow:0 0 14px var(--cyan);animation:float 8s ease-in-out infinite}.s13-dashboard .ambient i:nth-child(1){left:8%;top:35%}.s13-dashboard .ambient i:nth-child(2){left:61%;top:18%;animation-delay:-3s}.s13-dashboard .ambient i:nth-child(3){right:7%;top:68%;animation-delay:-5s}.s13-dashboard .site-header{height:var(--header);position:sticky;top:0;z-index:100;background:rgba(2,7,19,.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(85,146,218,.20)}.s13-dashboard .header-shell{height:100%;width:min(1600px,calc(100% - 48px));margin:auto;display:flex;align-items:center;gap:30px}.s13-dashboard .brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:white;white-space:nowrap}.s13-dashboard .brand strong{font-size:20px}.s13-dashboard .brand-mark{width:34px;height:34px;position:relative;display:grid;place-content:center;border:1px solid var(--cyan);transform:rotate(30deg);box-shadow:0 0 18px rgba(33,231,255,.22)}.s13-dashboard .brand-mark:before,.s13-dashboard .brand-mark:after,.s13-dashboard .brand-mark i,.s13-dashboard .brand-mark b{content:"";position:absolute;inset:6px;border:1px solid #297db7}.s13-dashboard .brand-mark:after{inset:11px;border-color:var(--cyan)}.s13-dashboard .brand-mark i,.s13-dashboard .brand-mark b{inset:auto;width:25px;height:1px;background:#2d8fc7;border:0;left:4px;top:16px}.s13-dashboard .brand-mark i{transform:rotate(60deg)}.s13-dashboard .brand-mark b{transform:rotate(-60deg)}.s13-dashboard .nav{margin-left:auto;display:flex;align-items:center;gap:28px}.s13-dashboard .nav a{font-size:13px;font-weight:800;color:#abbacc;text-decoration:none;position:relative}.s13-dashboard .nav a.active,.s13-dashboard .nav a:hover{color:var(--cyan)}.s13-dashboard .nav a.active:after{content:"";position:absolute;left:0;right:0;bottom:-24px;height:2px;background:linear-gradient(90deg,transparent,var(--cyan),var(--violet),transparent);box-shadow:0 0 10px var(--cyan)}.s13-dashboard .console-button{margin-left:auto;border:1px solid rgba(143,108,255,.75);border-radius:999px;background:rgba(143,108,255,.07);padding:8px 18px;min-height:42px;color:white;font-weight:800;letter-spacing:.02em;box-shadow:0 0 18px rgba(143,108,255,.12);cursor:pointer}.s13-dashboard .console-button span{color:var(--cyan);margin-left:14px}.s13-dashboard .console-button:hover,.s13-dashboard .console-button:focus-visible{border-color:var(--cyan);box-shadow:0 0 28px rgba(33,231,255,.22)}.s13-dashboard .ri-section{position:relative;padding:28px 0 54px;min-height:100vh}.s13-dashboard .circuit-bg{position:absolute;inset:0;pointer-events:none;opacity:.25;background-image:linear-gradient(rgba(36,109,180,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(36,109,180,.06) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,#000,transparent 88%)}.s13-dashboard .hero-row{display:grid;grid-template-columns:minmax(0,1fr) 700px;gap:32px;align-items:start}.s13-dashboard .foundry-pulse{width:700px;max-width:100%;justify-self:end}.s13-dashboard .section-title{display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center}.s13-dashboard .section-number{font-size:72px;line-height:1;font-weight:950;color:#9d79ff;text-shadow:0 0 24px rgba(143,108,255,.30);letter-spacing:.04em}.s13-dashboard .section-number span{font-size:.65em;color:#55cfff;font-weight:300}.s13-dashboard .section-title h1{font-size:clamp(36px,4.5vw,58px);margin:0;letter-spacing:.02em}.s13-dashboard .section-en{margin:4px 0 0;color:#7dafff;font-size:12px;font-weight:900;letter-spacing:.42em}.s13-dashboard .section-copy{margin:8px 0 0;color:#b9c7d7;font-size:14px}.s13-dashboard .foundry-pulse{min-height:116px;padding:14px 18px 14px 16px;display:grid;grid-template-columns:minmax(132px,1.5fr) minmax(58px,.62fr) minmax(74px,.75fr) minmax(48px,.5fr) minmax(62px,.62fr) minmax(82px,.82fr) minmax(54px,.56fr) 50px;gap:7px;align-items:center;border:1px solid rgba(33,231,255,.28);background:linear-gradient(180deg,rgba(4,18,35,.82),rgba(2,10,22,.75));border-radius:12px;box-shadow:inset 0 0 30px rgba(33,231,255,.025);overflow:hidden}.s13-dashboard .pulse-left>span{color:var(--cyan);font-size:12px;font-weight:900;letter-spacing:.07em}.s13-dashboard .pulse-left svg{display:block;width:100%;height:44px}.s13-dashboard .pulse-shadow,.s13-dashboard .pulse-line{fill:none;stroke-linejoin:round;stroke-linecap:round}.s13-dashboard .pulse-shadow{stroke:rgba(33,231,255,.15);stroke-width:5}.s13-dashboard .pulse-line{stroke:var(--cyan);stroke-width:1.7;stroke-dasharray:900;stroke-dashoffset:900;filter:drop-shadow(0 0 5px rgba(33,231,255,.55));animation:drawPulse 2.8s linear infinite}.s13-dashboard .pulse-metric{min-width:0;padding-left:10px;border-left:1px solid rgba(106,139,178,.14)}.s13-dashboard .pulse-metric small,.s13-dashboard .pulse-metric strong{display:block}.s13-dashboard .pulse-metric small{font-size:11px;color:#7f93aa;white-space:nowrap}.s13-dashboard .pulse-metric strong{margin-top:3px;font-size:14px;color:#62d7ff;line-height:1.25;overflow-wrap:anywhere}.s13-dashboard .pulse-metric strong.warn{color:var(--amber)}.s13-dashboard .pulse-metric strong.hot{color:#ff916c}.s13-dashboard .pulse-metric strong.ok{color:var(--green)}.s13-dashboard .pulse-metric strong.pending{color:var(--amber)}.s13-dashboard .pulse-metric strong.rv{color:#b99dff}.s13-dashboard .pulse-metric.compact{padding-left:7px}.s13-dashboard .pulse-metric.compact small{font-size:11px;letter-spacing:0;white-space:nowrap}.s13-dashboard .pulse-metric.compact strong{font-size:14px;line-height:1.25;white-space:nowrap}.s13-dashboard .radar{width:50px;height:50px;position:relative;justify-self:center;border:1px solid rgba(33,231,255,.35);border-radius:50%;box-shadow:0 0 18px rgba(33,231,255,.12),inset 0 0 25px rgba(55,86,255,.12);margin:0}.s13-dashboard .radar:before,.s13-dashboard .radar:after{content:"";position:absolute;border:1px solid rgba(64,145,227,.3);border-radius:50%;inset:7px}.s13-dashboard .radar:after{inset:16px}.s13-dashboard .radar i{position:absolute;left:50%;top:50%;width:4px;height:4px;background:white;border-radius:50%;box-shadow:0 0 8px white,0 0 18px var(--cyan)}.s13-dashboard .radar b{position:absolute;left:50%;top:4px;width:2px;height:21px;transform-origin:50% 21px;background:linear-gradient(var(--cyan),transparent);animation:radar 4s linear infinite}.s13-dashboard .radar em{position:absolute;width:6px;height:6px;right:8px;top:10px;background:var(--violet);border-radius:50%;box-shadow:0 0 10px var(--violet)}.s13-dashboard .project-cards{display:grid;grid-template-columns:1.03fr 1.22fr 1.08fr .92fr;gap:14px;margin-top:18px}.s13-dashboard .project-card{min-width:0;min-height:92px;border:1px solid rgba(78,123,177,.23);border-radius:12px;background:linear-gradient(180deg,rgba(5,18,35,.88),rgba(2,11,23,.84));display:flex;align-items:center;gap:13px;padding:16px 18px;position:relative;text-align:left}.s13-dashboard .project-card b,.s13-dashboard .project-card small{display:block}.s13-dashboard .project-card b{font-size:15px}.s13-dashboard .project-card small{margin-top:3px;color:#7e92a8;font-size:12px}.s13-dashboard .project-card em{font-style:normal;color:var(--cyan);margin-right:7px}.s13-dashboard .project-card.active-card{cursor:pointer;border-color:rgba(33,231,255,.75);box-shadow:0 0 0 1px rgba(33,231,255,.10),0 0 32px rgba(42,94,255,.20),inset 0 0 22px rgba(33,231,255,.05);overflow:hidden}.s13-dashboard .project-card.active-card:hover,.s13-dashboard .project-card.active-card:focus-visible{box-shadow:0 0 0 1px rgba(33,231,255,.18),0 0 42px rgba(33,231,255,.24),inset 0 0 24px rgba(33,231,255,.08)}.s13-dashboard .project-card mark{margin-left:auto;background:rgba(85,242,181,.10);border:1px solid rgba(85,242,181,.55);border-radius:4px;padding:2px 6px;color:var(--green);font-size:12px;font-weight:900}.s13-dashboard .project-icon{width:34px;height:34px;border:1px solid currentColor;display:grid;place-content:center;border-radius:9px;color:var(--cyan);box-shadow:0 0 14px rgba(33,231,255,.10)}.s13-dashboard .project-icon.green{color:var(--green)}.s13-dashboard .project-icon.violet{color:var(--violet)}.s13-dashboard .project-card.add{border-style:dashed;color:#9aacbf}.s13-dashboard [data-open-ri2] b{white-space:nowrap}.s13-dashboard [data-open-ri2] mark{flex:0 0 auto}.s13-dashboard .visitor-counter{margin:14px 0 0;border-color:rgba(143,108,255,.30);background:linear-gradient(110deg,rgba(5,18,35,.96),rgba(12,15,38,.94));box-shadow:inset 0 0 0 1px rgba(255,255,255,.012),0 16px 42px rgba(0,0,0,.14)}.s13-dashboard .visitor-counter-display{background:rgba(2,11,24,.86)}.s13-dashboard .plus{font-size:28px;color:#6c85a2}.s13-dashboard .card-trace{position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,var(--cyan),#688cff,transparent);transform:translateX(-65%);animation:sweep 2.8s ease-in-out infinite}.s13-dashboard .parallel-board{margin-top:14px;padding:14px 214px 18px 18px;position:relative;border:1px solid rgba(57,123,190,.30);border-radius:16px;background:linear-gradient(180deg,rgba(4,17,33,.88),rgba(2,10,22,.94));box-shadow:0 30px 90px rgba(0,0,0,.18),inset 0 0 35px rgba(33,231,255,.025);overflow:visible}.s13-dashboard .parallel-head{height:36px;display:flex;align-items:flex-start;justify-content:space-between}.s13-dashboard .parallel-head h2{font-size:18px;color:var(--cyan);margin:0}.s13-dashboard .parallel-head p{font-size:12px;color:#71879e;margin:2px 0 0 0}.s13-dashboard .phase-legend{height:30px;margin-left:304px;margin-right:18px;display:grid;grid-template-columns:repeat(5,1fr);align-items:center;text-align:center;color:#71879e;font-size:12px}.s13-dashboard .project-line{position:relative;border:1px solid rgba(67,121,181,.26);border-radius:10px;background:rgba(3,13,26,.72);transition:opacity .35s ease,filter .35s ease,transform .35s ease,border-color .35s ease}.s13-dashboard .ri1-line{z-index:10;border-color:rgba(33,231,255,.42);box-shadow:inset 0 0 20px rgba(33,231,255,.03)}.s13-dashboard .ri1-rail-row{min-height:54px;position:relative;cursor:pointer}.s13-dashboard .line-toggle,.s13-dashboard .line-static{height:54px;display:grid;align-items:center;grid-template-columns:78px minmax(130px,1fr) auto auto;gap:8px;border:0;background:transparent;color:inherit;cursor:pointer;text-align:left;padding:7px 13px;position:relative;z-index:5}.s13-dashboard .line-toggle{width:286px;border:1px solid rgba(33,231,255,.55);background:linear-gradient(110deg,rgba(5,24,45,.98),rgba(4,15,31,.92));clip-path:polygon(0 0,94% 0,100% 50%,94% 100%,0 100%);box-shadow:0 0 20px rgba(33,231,255,.12)}.s13-dashboard .line-toggle:hover,.s13-dashboard .line-toggle:focus-visible,.s13-dashboard .ri1-rail-row:hover .line-toggle,.s13-dashboard .ri1-rail-row:hover .stage-rail,.s13-dashboard .ri1-rail-row:focus-within .line-toggle,.s13-dashboard .ri1-rail-row:focus-within .stage-rail{border-color:#7eefff;box-shadow:0 0 28px rgba(33,231,255,.22),inset 0 0 18px rgba(33,231,255,.05)}.s13-dashboard .line-id{display:flex;align-items:center;gap:7px}.s13-dashboard .line-id i{font-style:normal;color:var(--cyan)}.s13-dashboard .line-id b{color:var(--cyan);font-size:14px}.s13-dashboard .line-name strong,.s13-dashboard .line-name small{display:block}.s13-dashboard .line-name{min-width:0}.s13-dashboard .line-name strong{font-size:12px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.s13-dashboard .line-name small{font-size:10px;line-height:1.15;color:#8397ae;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.s13-dashboard .line-state{font-size:10px;line-height:1;color:var(--amber);font-weight:900;letter-spacing:-.045em;white-space:nowrap;transform:translateX(-3px)}.s13-dashboard .chevron{color:#9ecfff;font-size:15px;transition:transform .35s var(--ease)}.s13-dashboard .parallel-board.ri-open .chevron{transform:rotate(180deg)}.s13-dashboard .stage-rail{position:absolute;left:304px;right:18px;top:0;height:54px;display:grid;grid-template-columns:repeat(5,1fr);gap:10px;align-items:center}.s13-dashboard .rail-segment{height:9px;border:1px solid rgba(84,135,190,.35);border-radius:999px;background:#020813}.s13-dashboard .rail-segment.done{background:linear-gradient(90deg,rgba(85,242,181,.88),rgba(33,231,255,.60));box-shadow:0 0 10px rgba(85,242,181,.18)}.s13-dashboard .rail-segment.current{background:linear-gradient(90deg,#1ac8ff,#8d64ff);box-shadow:0 0 14px rgba(65,135,255,.40)}.s13-dashboard .rail-node{position:absolute;top:18px;width:18px;height:18px;border:1px solid #4a7eac;border-radius:50%;background:#05101f;transform:translateX(-50%);display:grid;place-content:center;z-index:4}.s13-dashboard .rail-node span{width:6px;height:6px;border-radius:50%;background:#476a88}.s13-dashboard .rail-node.done{border-color:var(--green);box-shadow:0 0 10px rgba(85,242,181,.24)}.s13-dashboard .rail-node.done span{background:var(--green)}.s13-dashboard .rail-node.current{width:25px;height:25px;top:14px;border:2px solid white;background:radial-gradient(circle,#fff 0 18%,#43ddff 20% 35%,#3757ff 40%,#05101f 70%);box-shadow:0 0 12px white,0 0 30px var(--cyan),0 0 55px var(--violet);z-index:8;overflow:visible}.s13-dashboard .rail-node.n1{left:10%}.s13-dashboard .rail-node.n2{left:30%}.s13-dashboard .rail-node.n3{left:50%}.s13-dashboard .rail-node.n4{left:70%}.s13-dashboard .rail-node.n5{left:90%}.s13-dashboard .orb{position:absolute!important;left:50%!important;top:50%!important;width:46px!important;height:46px!important;background:transparent!important;border:1px solid rgba(33,231,255,.65);border-radius:50%;box-shadow:0 0 18px rgba(33,231,255,.28);transform:translate(-50%,-50%) scale(.7);transform-origin:center;animation:orbPulse 1.8s ease-out infinite}.s13-dashboard .orb-ring{position:absolute;left:50%;top:50%;width:42px;height:42px;border:1px solid rgba(143,108,255,.42);border-radius:50%;opacity:0;transform:translate(-50%,-50%) scale(.5);transform-origin:center}.s13-dashboard .energy-beam{position:absolute;left:70%;top:38px;width:3px;height:0;transform:translateX(-50%);opacity:0;z-index:2;transition:height .55s var(--ease) .12s,opacity .18s ease .10s}.s13-dashboard .energy-beam i,.s13-dashboard .energy-beam b,.s13-dashboard .energy-beam em{position:absolute;inset:0;background:linear-gradient(to bottom,#fff,var(--cyan) 35%,#7382ff 70%,transparent);box-shadow:0 0 8px white,0 0 18px var(--cyan),0 0 38px #6d5cff}.s13-dashboard .energy-beam b{filter:blur(5px);opacity:.65}.s13-dashboard .energy-beam em{left:-8px;right:-8px;background:linear-gradient(to bottom,rgba(255,255,255,.55),rgba(33,231,255,.13),transparent);filter:blur(8px)}.s13-dashboard .telemetry-reveal{display:grid;grid-template-rows:0fr;opacity:0;transform:translateY(-18px);transition:grid-template-rows .78s var(--ease),opacity .26s ease .08s,transform .78s var(--ease);pointer-events:none}.s13-dashboard .telemetry-reveal-inner{min-height:0;overflow:hidden}.s13-dashboard .telemetry-panel{position:relative;margin:0 0 12px 12px;padding:12px;display:grid;grid-template-columns:280px 1fr;gap:14px;border:1px solid rgba(77,194,255,.62);border-radius:12px;background:linear-gradient(180deg,rgba(4,20,40,.98),rgba(2,10,22,.99));box-shadow:0 0 0 1px rgba(111,99,255,.20),0 0 36px rgba(33,231,255,.12),inset 0 0 50px rgba(33,231,255,.035);overflow:hidden;isolation:isolate}.s13-dashboard .telemetry-panel:before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(90deg,transparent 0 12%,#48eaff 23%,#8268ff 50%,#48eaff 77%,transparent 88%);background-size:260% 100%;opacity:.36;pointer-events:none;animation:borderFlow 5s linear infinite;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;-webkit-mask-composite:xor}.s13-dashboard .panel-grid,.s13-dashboard .panel-noise,.s13-dashboard .panel-scan,.s13-dashboard .edge-trace{position:absolute;inset:0;pointer-events:none}.s13-dashboard .panel-grid{z-index:-2;opacity:.18;background-image:linear-gradient(rgba(33,231,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(33,231,255,.06) 1px,transparent 1px);background-size:32px 32px}.s13-dashboard .panel-noise{z-index:-1;opacity:.16;background:radial-gradient(circle at 88% 10%,rgba(143,108,255,.16),transparent 35%),radial-gradient(circle at 8% 90%,rgba(33,231,255,.12),transparent 34%)}.s13-dashboard .panel-scan{top:-18%;height:16%;z-index:20;background:linear-gradient(to bottom,transparent,rgba(33,231,255,.11),rgba(255,255,255,.09),transparent);mix-blend-mode:screen;opacity:0}.s13-dashboard .edge-trace{z-index:18;opacity:0}.s13-dashboard .trace-a{inset:0 auto auto -30%;width:42%;height:2px;background:linear-gradient(90deg,transparent,#fff,var(--cyan),transparent);filter:drop-shadow(0 0 5px var(--cyan))}.s13-dashboard .trace-b{inset:auto -30% 0 auto;width:42%;height:2px;background:linear-gradient(90deg,transparent,var(--violet),#fff,transparent);filter:drop-shadow(0 0 5px var(--violet))}.s13-dashboard .operator-card{min-height:430px;position:relative;border:1px solid rgba(70,117,187,.34);border-radius:9px;background:linear-gradient(180deg,rgba(4,18,36,.93),rgba(3,12,26,.95));overflow:hidden}.s13-dashboard .operator-label{position:absolute;top:10px;left:12px;z-index:5;font-size:12px;color:#86b9ff;font-weight:900;letter-spacing:.04em}.s13-dashboard .operator-art{position:absolute;inset:28px 0 88px;overflow:hidden;background:radial-gradient(circle at 50% 35%,rgba(33,231,255,.12),transparent 55%)}.s13-dashboard .operator-art:after{content:"";position:absolute;inset:auto 0 0;height:70%;background:linear-gradient(to top,#031020 0,rgba(3,16,32,.2) 55%,transparent)}.s13-dashboard .operator-art img{width:100%;height:100%;object-fit:cover;object-position:center 24%;filter:saturate(.96) contrast(1.02) drop-shadow(0 0 16px rgba(33,231,255,.18))}.s13-dashboard .operator-comment{position:absolute;left:10px;right:10px;bottom:10px;z-index:5;padding:9px 10px;border:1px solid rgba(33,231,255,.30);background:rgba(2,11,24,.90);border-radius:7px}.s13-dashboard .operator-comment small{font-size:12px;color:#72b6ff;font-weight:900}.s13-dashboard .operator-comment p{margin:4px 0 0;color:#d3deeb;font-size:12px}.s13-dashboard .telemetry-main{position:relative;min-width:0}.s13-dashboard .telemetry-head{height:54px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(66,118,182,.17);margin-bottom:10px}.s13-dashboard .telemetry-head p{margin:0;color:var(--cyan);font-size:12px;font-weight:900}.s13-dashboard .telemetry-head h3{margin:1px 0 0;font-size:24px;letter-spacing:.02em}.s13-dashboard .projection-badge{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:12px;color:#7695b7;font-weight:900;letter-spacing:.05em}.s13-dashboard .projection-badge span{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan)}.s13-dashboard .panel-close{width:34px;height:34px;border:1px solid rgba(86,136,194,.35);border-radius:8px;background:#061325;color:#91b9e5;font-size:22px;line-height:1;cursor:pointer}.s13-dashboard .panel-close:hover,.s13-dashboard .panel-close:focus-visible{border-color:var(--cyan);color:#fff;box-shadow:0 0 16px rgba(33,231,255,.18)}.s13-dashboard .status-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.s13-dashboard .status-card{min-height:72px;padding:9px 11px;border:1px solid rgba(85,129,181,.25);border-radius:8px;background:linear-gradient(180deg,rgba(6,21,40,.92),rgba(3,14,28,.94));display:flex;flex-direction:column;justify-content:center}.s13-dashboard .status-card small{font-size:12px;color:#8ea2b9}.s13-dashboard .status-card span{font-size:12px;color:#96aac0}.s13-dashboard .status-card strong{margin-top:2px;font-size:14px}.s13-dashboard .status-card.amber{border-color:rgba(255,199,67,.30)}.s13-dashboard .status-card.amber strong{color:var(--amber)}.s13-dashboard .status-card.green{border-color:rgba(85,242,181,.28)}.s13-dashboard .status-card.green strong{color:var(--green)}.s13-dashboard .status-card.pink{border-color:rgba(255,75,165,.31)}.s13-dashboard .status-card.pink small,.s13-dashboard .status-card.pink strong{color:#ff67b4}.s13-dashboard .status-card.orange{border-color:rgba(255,120,90,.30)}.s13-dashboard .status-card.orange strong{color:#ff8b6d}.s13-dashboard .status-card.purple{border-color:rgba(143,108,255,.33)}.s13-dashboard .status-card.purple strong{color:#ba9cff}.s13-dashboard .status-card.cyan{border-color:rgba(33,231,255,.32)}.s13-dashboard .status-card.cyan strong{color:var(--cyan)}.s13-dashboard .status-card.wide{grid-column:span 2;display:grid;grid-template-columns:1fr auto;align-content:center}.s13-dashboard .status-card.wide small{grid-column:1/-1}.s13-dashboard .status-card.wide span{align-self:end;color:#78c8ff;font-weight:900}.s13-dashboard .pipeline-block{margin-top:10px}.s13-dashboard .micro-title{margin:0 0 5px;color:#78a9d8;font-size:12px;font-weight:900;letter-spacing:.04em}.s13-dashboard .pipeline{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:5px}.s13-dashboard .pipeline span{min-height:40px;border:1px solid rgba(85,126,176,.28);display:flex;align-items:center;justify-content:center;gap:8px;border-radius:6px;background:#041020;color:#6f8194;font-size:12px;font-weight:800}.s13-dashboard .pipeline b{font-weight:400;color:#65829e}.s13-dashboard .pipeline span.ok{border-color:rgba(85,242,181,.55);color:var(--green);background:rgba(85,242,181,.04)}.s13-dashboard .pipeline span.blocked{border-color:rgba(255,75,165,.52);color:#ff67b4;background:rgba(255,75,165,.04)}.s13-dashboard .pipeline span.next{border-color:rgba(33,231,255,.78);color:white;background:linear-gradient(180deg,rgba(19,126,190,.38),rgba(26,74,205,.20));box-shadow:0 0 15px rgba(33,231,255,.20),inset 0 0 15px rgba(33,231,255,.08)}.s13-dashboard .pipeline span.next i{width:16px;height:16px;border:2px solid white;border-radius:50%;display:grid;place-content:center;font-size:12px;box-shadow:0 0 9px var(--cyan)}.s13-dashboard .pipeline span.pending{color:#7b8897}.s13-dashboard .telemetry-lower{display:grid;grid-template-columns:1.08fr .92fr;gap:10px;margin-top:10px}.s13-dashboard .contract-block,.s13-dashboard .evidence-block{min-height:112px;padding:9px 11px;border-top:1px solid rgba(77,136,203,.20);border-bottom:1px solid rgba(77,136,203,.12);background:rgba(1,12,25,.46)}.s13-dashboard .contract-row{display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid rgba(80,116,161,.1);font-size:12px}.s13-dashboard .contract-row:last-child{border:0}.s13-dashboard .contract-row span{color:#8297ae}.s13-dashboard .contract-row strong{color:var(--green);font-size:12px}.s13-dashboard .evidence-block{display:grid;grid-template-columns:1fr 96px;grid-template-rows:auto 1fr;gap:0 8px}.s13-dashboard .evidence-block .micro-title{grid-column:1}.s13-dashboard .evidence-block ul{grid-column:1;grid-row:2;list-style:none;margin:0;padding:0}.s13-dashboard .evidence-block li{display:flex;justify-content:space-between;padding:3px 0;color:#8297ae;font-size:12px}.s13-dashboard .evidence-block li strong{color:#c1d2e3;font-size:12px}.s13-dashboard .evidence-ring{grid-column:2;grid-row:1/3;width:80px;height:80px;align-self:center;justify-self:center;display:grid;place-content:center;border-radius:50%;background:conic-gradient(from 45deg,rgba(143,108,255,.85),rgba(33,231,255,.60),rgba(143,108,255,.20),rgba(143,108,255,.85));box-shadow:0 0 20px rgba(143,108,255,.16);position:relative;animation:ringIdle 4s linear infinite}.s13-dashboard .evidence-ring:before{content:"";position:absolute;inset:7px;border-radius:50%;background:#051021;border:1px solid rgba(91,137,204,.25)}.s13-dashboard .evidence-ring span{position:relative;z-index:2;color:#c9b8ff;font-size:12px;font-weight:900;letter-spacing:.05em}.s13-dashboard .telemetry-foot{display:flex;align-items:center;gap:14px;margin-top:8px;color:#647d99;font-size:12px}.s13-dashboard .telemetry-foot span{color:#7395bb;font-weight:900;letter-spacing:.08em}.s13-dashboard .telemetry-foot p{margin:0}.s13-dashboard .guide-mascot{position:absolute;right:22px;top:44px;bottom:22px;width:168px;pointer-events:none;z-index:12;overflow:visible;transition:filter .35s ease,opacity .35s ease}.s13-dashboard .guide-mascot:before{content:"";position:absolute;z-index:0;inset:0 0 28px;border-radius:24px;background:linear-gradient(180deg,rgba(7,22,42,.92),rgba(4,14,28,.82));border:1px solid rgba(77,194,255,.32);box-shadow:inset 0 0 32px rgba(33,231,255,.05),0 0 24px rgba(0,0,0,.18)}.s13-dashboard .guide-mascot:after{content:"";position:absolute;z-index:1;inset:14px 12px 42px;border-radius:18px;background:linear-gradient(to bottom,rgba(255,255,255,.03),rgba(255,255,255,0) 24%,rgba(4,16,30,.26) 50%,rgba(3,12,24,.88) 100%);border:1px solid rgba(124,145,196,.14)}.s13-dashboard .guide-mascot img{position:absolute;z-index:4;left:50%;bottom:22px;width:238px;height:354px;object-fit:contain;object-position:center bottom;transform:translateX(-50%) scale(1.18);transform-origin:center bottom;clip-path:inset(0 round 18px);filter:drop-shadow(0 0 22px rgba(33,231,255,.18))}.s13-dashboard .guide-orbit{position:absolute;z-index:6;left:50%;bottom:31px;width:122px;height:24px;transform:translateX(-50%);pointer-events:none;border:0;border-radius:50%;overflow:visible;opacity:.95;background:transparent;mix-blend-mode:screen;filter:drop-shadow(0 0 7px rgba(33,231,255,.60)) drop-shadow(0 0 16px rgba(96,123,255,.24));animation:orbitGlow 1.8s ease-in-out infinite alternate}.s13-dashboard .guide-orbit:before{content:"";position:absolute;inset:3px 9px 4px;border-radius:50%;border:1.4px solid rgba(120,247,255,.86);background:radial-gradient(ellipse at center,rgba(33,231,255,.10) 0%,rgba(33,231,255,.035) 50%,rgba(33,231,255,0) 72%);box-shadow:0 0 8px rgba(33,231,255,.80),inset 0 0 7px rgba(33,231,255,.12)}.s13-dashboard .guide-orbit:after{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid rgba(147,107,255,.34);transform:scale(1.06);opacity:.52;box-shadow:0 0 10px rgba(147,107,255,.18)}.s13-dashboard .other-line{min-height:48px;margin-right:0;overflow:hidden}.s13-dashboard .line-static{width:286px;min-height:48px;grid-template-columns:78px 1fr auto;padding:5px 12px;cursor:default}.s13-dashboard .mini-rail{position:absolute;left:304px;right:18px;top:0;height:48px;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-items:center}.s13-dashboard .mini-rail i{height:6px;border:1px solid rgba(85,128,180,.28);border-radius:999px;background:#030a14}.s13-dashboard .mini-rail i.g{background:linear-gradient(90deg,rgba(85,242,181,.7),rgba(33,231,255,.3));box-shadow:0 0 8px rgba(85,242,181,.13)}.s13-dashboard .mini-rail i.c{background:linear-gradient(90deg,#2290bf,#38d8ff);box-shadow:0 0 8px rgba(33,231,255,.16)}.s13-dashboard .mini-rail i.v{background:linear-gradient(90deg,#557df8,#a165ff);box-shadow:0 0 8px rgba(143,108,255,.14)}/* Guide state separation: keep the FIXed v6 closed guide untouched and render a separate open guide. */.s13-dashboard .guide-mascot{opacity:1;visibility:visible;transition:opacity .30s ease .18s,filter .35s ease .18s,visibility 0s linear 0s}.s13-dashboard .guide-open-dock{position:absolute;right:22px;top:146px;width:168px;height:508px;z-index:13;pointer-events:none;overflow:visible;opacity:0;visibility:hidden;transform:translateY(18px) scale(.985);transition:opacity .28s ease 0s,transform .55s var(--ease) 0s,visibility 0s linear .30s}.s13-dashboard .guide-open-dock:before{content:"";position:absolute;z-index:0;inset:0 0 28px;border-radius:24px;background:linear-gradient(180deg,rgba(7,22,42,.96),rgba(4,14,28,.90));border:1px solid rgba(77,194,255,.36);box-shadow:inset 0 0 36px rgba(33,231,255,.06),0 0 28px rgba(0,0,0,.22)}.s13-dashboard .guide-open-dock:after{content:"";position:absolute;z-index:1;inset:14px 12px 42px;border-radius:18px;border:1px solid rgba(124,145,196,.15);background:linear-gradient(180deg,rgba(255,255,255,.025),transparent 28%,rgba(3,12,24,.26) 70%,rgba(3,12,24,.88))}.s13-dashboard .guide-open-label{position:absolute;z-index:5;top:14px;left:18px;color:#73cfff;font-size:11px;font-weight:900;letter-spacing:.10em;text-shadow:0 0 12px rgba(33,231,255,.45)}.s13-dashboard .guide-open-art{position:absolute;z-index:2;left:12px;right:12px;top:42px;height:372px;border-radius:17px;overflow:visible;background:radial-gradient(circle at 50% 28%,rgba(33,231,255,.13),transparent 58%)}.s13-dashboard .guide-open-art:after{content:"";position:absolute;z-index:4;inset:auto 0 0;height:35%;background:linear-gradient(to top,rgba(3,12,24,.92),rgba(3,12,24,.10),transparent);pointer-events:none}.s13-dashboard .guide-open-art img{position:relative;z-index:3;display:block;width:100%;height:100%;object-fit:cover;object-position:center 17%;border-radius:17px;filter:saturate(.95) contrast(1.04) drop-shadow(0 0 20px rgba(33,231,255,.18))}.s13-dashboard .guide-open-status{position:absolute;z-index:5;left:18px;right:18px;bottom:48px;padding:8px 10px;border-radius:9px;border:1px solid rgba(33,231,255,.27);background:rgba(2,11,24,.90);display:flex;align-items:center;justify-content:space-between;gap:8px}.s13-dashboard .guide-open-status small{font-size:10px;color:#7694b3;letter-spacing:.09em}.s13-dashboard .guide-open-status strong{font-size:12px;color:var(--cyan);letter-spacing:.08em}.s13-dashboard .guide-open-orbit{position:absolute;z-index:6;left:50%;bottom:8px;width:132px;height:28px;transform:translateX(-50%);pointer-events:none;border:0;border-radius:50%;overflow:visible;opacity:.96;background:transparent;mix-blend-mode:screen;filter:drop-shadow(0 0 8px rgba(33,231,255,.66)) drop-shadow(0 0 18px rgba(96,123,255,.26));animation:orbitGlow 1.8s ease-in-out infinite alternate}.s13-dashboard .guide-open-orbit:before{content:"";position:absolute;inset:3px 10px 5px;border-radius:50%;border:1.5px solid rgba(122,248,255,.90);background:radial-gradient(ellipse at center,rgba(33,231,255,.12) 0%,rgba(33,231,255,.04) 50%,rgba(33,231,255,0) 74%);box-shadow:0 0 9px rgba(33,231,255,.86),inset 0 0 7px rgba(33,231,255,.12)}.s13-dashboard .guide-open-orbit:after{content:"";position:absolute;inset:0;border-radius:50%;border:1px solid rgba(147,107,255,.34);transform:scale(1.08);opacity:.54;box-shadow:0 0 11px rgba(147,107,255,.18)}.s13-dashboard .parallel-board.ri-open .guide-mascot{opacity:0;visibility:hidden;filter:brightness(.72) saturate(.70);transition-delay:0s}.s13-dashboard .parallel-board.ri-open .guide-open-dock{opacity:1;visibility:visible;transform:none;transition:opacity .34s ease .62s,transform .62s var(--ease) .56s,visibility 0s linear .56s}@media (max-width:1540px){.s13-dashboard .guide-open-dock{display:none}}/* OPEN STATE */.s13-dashboard .parallel-board.ri-open .telemetry-reveal{grid-template-rows:1fr;opacity:1;transform:none;pointer-events:auto}.s13-dashboard .parallel-board.ri-open .energy-beam{height:72px;opacity:1}.s13-dashboard .parallel-board.ri-open .orb-ring{animation:halo .95s var(--ease) both}.s13-dashboard .parallel-board.ri-open .orb-ring.r2{animation-delay:.08s}.s13-dashboard .parallel-board.ri-open .orb-ring.r3{animation-delay:.16s}.s13-dashboard .parallel-board.ri-open .telemetry-panel{animation:consoleBoot .95s var(--ease) both}.s13-dashboard .parallel-board.ri-open .panel-scan{opacity:1;animation:panelScan 2.8s ease-in-out .55s infinite}.s13-dashboard .parallel-board.ri-open .trace-a{opacity:1;animation:traceA 1.1s var(--ease) .18s both}.s13-dashboard .parallel-board.ri-open .trace-b{opacity:1;animation:traceB 1.1s var(--ease) .32s both}.s13-dashboard .parallel-board.ri-open .boot-item{animation:bootItem .48s var(--ease) both;animation-delay:calc(.28s + (var(--boot) * 55ms))}.s13-dashboard .parallel-board.ri-open .operator-art img{animation:operatorIn .85s var(--ease) .25s both}.s13-dashboard .parallel-board.ri-open .other-line{opacity:.34;filter:saturate(.48) brightness(.70);transform:translateY(2px)}.s13-dashboard .parallel-board.ri-open .ri1-line{border-color:rgba(85,221,255,.72);box-shadow:0 0 0 1px rgba(49,127,255,.12),0 0 28px rgba(33,231,255,.12),inset 0 0 24px rgba(33,231,255,.04)}.s13-dashboard .reveal{animation:fadeUp .65s ease both}@keyframes float{0%,100%{transform:translateY(0);opacity:.2}50%{transform:translateY(-30px);opacity:.7}}@keyframes sweep{0%{transform:translateX(-65%)}100%{transform:translateX(65%)}}@keyframes drawPulse{0%{stroke-dashoffset:900;opacity:.18}18%{opacity:1}58%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:.34}}@keyframes radar{to{transform:rotate(360deg)}}@keyframes orbPulse{0%{transform:translate(-50%,-50%) scale(.70);opacity:.95}100%{transform:translate(-50%,-50%) scale(1.45);opacity:0}}@keyframes halo{0%{opacity:0;transform:translate(-50%,-50%) scale(.55)}42%{opacity:.85}100%{opacity:0;transform:translate(-50%,-50%) scale(2.25)}}@keyframes consoleBoot{0%{filter:brightness(2.4);box-shadow:0 0 70px rgba(33,231,255,.55);transform:translateY(-8px) scaleY(.90)}60%{filter:brightness(1.25);transform:translateY(0) scaleY(1.01)}100%{filter:none;transform:none}}@keyframes panelScan{0%{top:-18%;opacity:0}20%{opacity:1}80%{opacity:.8}100%{top:100%;opacity:0}}@keyframes traceA{0%{transform:translateX(0)}100%{transform:translateX(340%)}}@keyframes traceB{0%{transform:translateX(0)}100%{transform:translateX(-340%)}}@keyframes bootItem{from{opacity:0;transform:translateY(12px);filter:brightness(1.8)}to{opacity:1;transform:none;filter:none}}@keyframes operatorIn{from{opacity:0;transform:translateX(-22px) scale(1.035);filter:brightness(1.8) saturate(.55)}to{opacity:1;transform:none;filter:saturate(.96) contrast(1.02) drop-shadow(0 0 16px rgba(33,231,255,.18))}}@keyframes borderFlow{to{background-position:260% 0}}@keyframes ringIdle{to{transform:rotate(360deg)}}@keyframes orbitGlow{from{opacity:.45;transform:translateX(-50%) scale(.88)}to{opacity:1;transform:translateX(-50%) scale(1.08)}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@media (max-width:1540px){.s13-dashboard{--shell:min(1180px,calc(100% - 32px))}.s13-dashboard .nav{gap:20px}.s13-dashboard .hero-row{grid-template-columns:1fr}.s13-dashboard .parallel-board{padding-right:12px}.s13-dashboard .foundry-pulse{width:100%;grid-template-columns:minmax(230px,1.55fr) repeat(6,minmax(76px,.72fr)) 58px;gap:12px;padding-right:22px}.s13-dashboard .radar{width:58px;height:58px}.s13-dashboard .project-cards{grid-template-columns:1fr 1fr}.s13-dashboard .phase-legend{margin-left:255px;margin-right:18px}.s13-dashboard .line-toggle{width:240px}.s13-dashboard .stage-rail{left:255px;right:18px}.s13-dashboard .telemetry-panel{margin-right:0;grid-template-columns:245px 1fr}.s13-dashboard .guide-mascot{display:none}.s13-dashboard .other-line{margin-right:0}.s13-dashboard .line-static{width:240px}.s13-dashboard .mini-rail{left:255px;right:18px}}@media (max-width:900px){.s13-dashboard .header-shell{gap:14px}.s13-dashboard .nav{display:none}.s13-dashboard .console-button{margin-left:auto}.s13-dashboard .hero-row{display:block}.s13-dashboard .section-title{margin-bottom:18px}.s13-dashboard .foundry-pulse{grid-template-columns:1fr 1fr;gap:10px}.s13-dashboard .pulse-left{grid-column:1/-1}.s13-dashboard .radar{display:none}.s13-dashboard .project-cards{grid-template-columns:1fr 1fr}.s13-dashboard .parallel-board{padding:14px 12px}.s13-dashboard .phase-legend{margin:0;padding-left:250px}.s13-dashboard .line-toggle{width:230px}.s13-dashboard .stage-rail{left:240px;right:12px}.s13-dashboard .telemetry-panel{grid-template-columns:1fr;margin:0 0 12px}.s13-dashboard .operator-card{min-height:290px}.s13-dashboard .operator-art{inset:28px 0 48px}.s13-dashboard .operator-art img{object-position:center 24%}.s13-dashboard .status-grid{grid-template-columns:1fr 1fr}.s13-dashboard .pipeline{grid-template-columns:1fr}.s13-dashboard .pipeline b{display:none}.s13-dashboard .telemetry-lower{grid-template-columns:1fr}.s13-dashboard .other-line{margin-right:0}.s13-dashboard .line-static{width:230px}.s13-dashboard .mini-rail{left:245px}}@media (max-width:620px){.s13-dashboard{--shell:calc(100% - 20px);--header:62px}.s13-dashboard .header-shell{width:calc(100% - 20px)}.s13-dashboard .brand strong{font-size:15px}.s13-dashboard .console-button{padding:7px 12px;gap:8px;font-size:12px}.s13-dashboard .section-title{grid-template-columns:1fr;gap:8px;padding-top:12px}.s13-dashboard .section-number{font-size:56px}.s13-dashboard .section-title h1{font-size:38px}.s13-dashboard .section-en{letter-spacing:.22em}.s13-dashboard .foundry-pulse{grid-template-columns:1fr}.s13-dashboard .pulse-left{grid-column:auto}.s13-dashboard .pulse-metric{text-align:left;padding:7px 0;border-top:1px solid rgba(81,126,178,.14)}.s13-dashboard .project-cards{grid-template-columns:1fr}.s13-dashboard .parallel-head{display:block;height:auto}.s13-dashboard .parallel-head p{margin:3px 0 8px}.s13-dashboard .phase-legend{display:none}.s13-dashboard .ri1-rail-row{padding-bottom:4px}.s13-dashboard .line-toggle,.s13-dashboard .line-static{width:100%;clip-path:none;border-radius:10px}.s13-dashboard .stage-rail{position:relative;left:auto;right:auto;top:auto;height:44px;margin:0 12px}.s13-dashboard .rail-node{top:13px}.s13-dashboard .energy-beam{left:70%;top:31px}.s13-dashboard .parallel-board.ri-open .energy-beam{height:46px}.s13-dashboard .telemetry-reveal{transform:translateY(-8px)}.s13-dashboard .telemetry-panel{margin-top:0;padding:9px}.s13-dashboard .status-grid{grid-template-columns:1fr}.s13-dashboard .status-card.wide{grid-column:auto;display:block}.s13-dashboard .status-card.wide span{margin-top:4px}.s13-dashboard .operator-card{min-height:320px}.s13-dashboard .pipeline span{min-height:38px}.s13-dashboard .evidence-block{grid-template-columns:1fr}.s13-dashboard .evidence-ring{display:none}.s13-dashboard .telemetry-foot{display:block}.s13-dashboard .mini-rail{position:relative;left:auto;right:auto;height:34px;margin:0 12px}.s13-dashboard .other-line{padding-bottom:6px}.s13-dashboard .site-footer .shell{display:block}.s13-dashboard .site-footer span{display:block;margin-top:4px}.s13-dashboard .projection-badge{display:none}}@media (prefers-reduced-motion:reduce){.s13-dashboard *,.s13-dashboard *:before,.s13-dashboard *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.s13-dashboard .pulse-line{stroke-dashoffset:0}.s13-dashboard .panel-scan{display:none}.s13-dashboard .telemetry-reveal{transform:none}.s13-dashboard .parallel-board.ri-open .energy-beam{height:72px;opacity:1}}.s13-dashboard .site-footer{padding:22px 0;border-top:1px solid rgba(66,125,194,.14);background:#020713}.s13-dashboard .site-footer .shell{display:flex;justify-content:space-between;color:#70849b;font-size:12px}.s13-dashboard .site-footer strong{color:#b6c7d8}

/* RI#2 document transformation telemetry */
.s13-dashboard .ri2-line{z-index:9;border-color:rgba(143,108,255,.38);box-shadow:inset 0 0 20px rgba(143,108,255,.025);margin-top:0}
.s13-dashboard .ri2-rail-row{min-height:54px;position:relative;cursor:pointer}
.s13-dashboard .ri2-line .line-toggle{border-color:rgba(143,108,255,.58);background:linear-gradient(110deg,rgba(15,19,50,.98),rgba(5,18,38,.94));box-shadow:0 0 20px rgba(143,108,255,.11)}
.s13-dashboard .ri2-line .line-toggle:hover,.s13-dashboard .ri2-line .line-toggle:focus-visible,.s13-dashboard .ri2-rail-row:hover .line-toggle,.s13-dashboard .ri2-rail-row:hover .stage-rail,.s13-dashboard .ri2-rail-row:focus-within .line-toggle,.s13-dashboard .ri2-rail-row:focus-within .stage-rail{border-color:#b7a4ff;box-shadow:0 0 28px rgba(143,108,255,.25),inset 0 0 18px rgba(33,231,255,.04)}
.s13-dashboard .ri2-line .line-state{color:var(--green)}
.s13-dashboard .ri2-line .telemetry-panel{border-color:rgba(143,108,255,.68);box-shadow:0 0 0 1px rgba(33,231,255,.16),0 0 38px rgba(143,108,255,.14),inset 0 0 50px rgba(33,231,255,.028)}
.s13-dashboard .ri2-line .telemetry-panel:before{background:linear-gradient(90deg,transparent 0 12%,#8f6cff 23%,#48eaff 50%,#8f6cff 77%,transparent 88%);background-size:260% 100%}
.s13-dashboard .ri2-line .operator-label,.s13-dashboard .ri2-line .telemetry-head p{color:#b9a7ff}
.s13-dashboard .ri2-line .projection-badge span{background:var(--violet);box-shadow:0 0 12px var(--violet)}
.s13-dashboard .status-card.ready{border-color:rgba(85,242,181,.35)}.s13-dashboard .status-card.ready strong{color:var(--green)}
.s13-dashboard .status-card.locked{border-color:rgba(255,199,67,.32)}.s13-dashboard .status-card.locked strong{color:var(--amber)}
.s13-dashboard .status-card.violet{border-color:rgba(143,108,255,.36)}.s13-dashboard .status-card.violet strong{color:#c2adff}
.s13-dashboard .ri2-contract-row strong{color:#72e6ff}
.s13-dashboard .ri2-stage-rail .rail-segment.done{background:linear-gradient(90deg,rgba(85,242,181,.88),rgba(33,231,255,.60))}
.s13-dashboard .ri2-stage-rail .rail-segment.current{background:linear-gradient(90deg,#557df8,#a165ff)}
.s13-dashboard .ri2-stage-rail .rail-node.current{box-shadow:0 0 12px white,0 0 30px var(--violet),0 0 55px var(--cyan)}
/* Only the selected RI telemetry drawer opens. */
.s13-dashboard .parallel-board.ri-open #ri1-telemetry,.s13-dashboard .parallel-board.ri-open #ri2-telemetry{grid-template-rows:0fr!important;opacity:0!important;transform:translateY(-18px)!important;pointer-events:none!important}
.s13-dashboard .parallel-board.ri1-open #ri1-telemetry,.s13-dashboard .parallel-board.ri2-open #ri2-telemetry{grid-template-rows:1fr!important;opacity:1!important;transform:none!important;pointer-events:auto!important}
.s13-dashboard .parallel-board.ri-open .stage-rail .energy-beam{height:0!important;opacity:0!important}
.s13-dashboard .parallel-board.ri1-open .ri1-line .energy-beam,.s13-dashboard .parallel-board.ri2-open .ri2-line .energy-beam{height:72px!important;opacity:1!important}
.s13-dashboard .parallel-board.ri-open .chevron{transform:none}
.s13-dashboard .parallel-board.ri1-open .ri1-line .chevron,.s13-dashboard .parallel-board.ri2-open .ri2-line .chevron{transform:rotate(180deg)}
.s13-dashboard .parallel-board.ri1-open .ri2-line,.s13-dashboard .parallel-board.ri2-open .ri1-line{opacity:.34;filter:saturate(.48) brightness(.70);transform:translateY(2px)}
.s13-dashboard .parallel-board.ri2-open .ri2-line{border-color:rgba(166,139,255,.78);box-shadow:0 0 0 1px rgba(143,108,255,.15),0 0 30px rgba(143,108,255,.15),inset 0 0 24px rgba(33,231,255,.035)}
.s13-dashboard .parallel-board.ri2-open .ri2-line .telemetry-panel{animation:consoleBoot .95s var(--ease) both}
.s13-dashboard .parallel-board.ri2-open .ri2-line .panel-scan{opacity:1;animation:panelScan 2.8s ease-in-out .55s infinite}
.s13-dashboard .parallel-board.ri2-open .ri2-line .trace-a{opacity:1;animation:traceA 1.1s var(--ease) .18s both}
.s13-dashboard .parallel-board.ri2-open .ri2-line .trace-b{opacity:1;animation:traceB 1.1s var(--ease) .32s both}
.s13-dashboard .parallel-board.ri2-open .ri2-line .boot-item{animation:bootItem .48s var(--ease) both;animation-delay:calc(.28s + (var(--boot) * 55ms))}
.s13-dashboard .parallel-board.ri2-open .ri2-line .operator-art img{animation:operatorIn .85s var(--ease) .25s both}
.s13-dashboard .guide-orbit,.s13-dashboard .guide-open-orbit{display:none!important}
/* S13 production host integration */
.s13-projects-section{padding:56px 0 64px;overflow:clip;background:radial-gradient(circle at 55% 38%,#07152b 0,#020713 44%,#01040b 100%)}
.s13-projects-section>.s13-dashboard{width:100%;height:auto;max-height:none;margin:0;isolation:isolate;overflow-x:clip!important;overflow-y:visible!important}
.s13-dashboard .ri-section{padding:0;min-height:0;background:transparent}
.s13-dashboard .circuit-bg{position:absolute}
.s13-dashboard .shell{width:min(1180px,calc(100% - 48px));margin:auto}
/* Match the official site section-heading rhythm instead of using the standalone giant 04 title. */
.s13-dashboard .hero-row{grid-template-columns:1fr;gap:20px;align-items:start}
.s13-dashboard .section-title.s13-standard-heading{display:block;padding:0;margin:0;max-width:900px}
.s13-dashboard .s13-kicker{margin:0 0 12px;color:var(--cyan);font-size:12px;font-weight:900;letter-spacing:.12em}
.s13-dashboard .s13-kicker span{margin-left:8px;color:#78a9d8;font-weight:900;letter-spacing:.16em}
.s13-dashboard .section-title.s13-standard-heading h1{margin:0;font-size:clamp(34px,4.5vw,60px);line-height:1.14;letter-spacing:-.045em;color:#f5f8fc}
.s13-dashboard .section-title.s13-standard-heading h1>span,.s13-dashboard .section-title.s13-standard-heading h1>strong{display:block}
.s13-dashboard .section-title.s13-standard-heading h1>strong{color:var(--cyan);font-weight:800}
.s13-dashboard .section-title.s13-standard-heading .section-copy{max-width:820px;margin:10px 0 0;color:#92a6bb;font-size:14px}
.s13-dashboard .foundry-pulse{width:100%;max-width:100%;justify-self:stretch}
/* Lock every phase label to the same five grid columns as the rail. This also neutralizes host CSS collisions. */
.s13-dashboard .phase-legend>span{position:static!important;inset:auto!important;transform:none!important;margin:0!important;padding:0!important;width:auto!important;text-align:center!important}
.s13-dashboard .phase-legend>span:nth-child(1){grid-column:1!important}
.s13-dashboard .phase-legend>span:nth-child(2){grid-column:2!important}
.s13-dashboard .phase-legend>span:nth-child(3){grid-column:3!important}
.s13-dashboard .phase-legend>span:nth-child(4){grid-column:4!important}
.s13-dashboard .phase-legend>span:nth-child(5){grid-column:5!important}
@media(max-width:760px){.s13-projects-section{padding:42px 0}.s13-dashboard .shell{width:calc(100% - 20px)}.s13-dashboard .s13-kicker span{display:block;margin:3px 0 0}.s13-dashboard .section-title.s13-standard-heading h1{font-size:clamp(32px,10vw,46px)}}
`;
  document.head.appendChild(style);
  current.outerHTML = `<section class="section projects-section s13-projects-section" id="projects" aria-label="Local AI Foundry 実証プロジェクト">
  <div class="s13-dashboard">

<div aria-hidden="true" class="circuit-bg"></div>
<div class="shell">
<div class="hero-row">
<div class="section-title s13-standard-heading reveal">
<p class="s13-kicker">04 / 実証プロジェクト <span>REFERENCE IMPLEMENTATIONS</span></p>
<h1><span>一つの用途に閉じない。</span><strong>別の仕事でも成立するかを試す。</strong></h1>
<p class="section-copy">LFは一つの巨大システムを作るだけではなく、複数のReference Implementation（RI）を並行して動かし、共通する制御パターンを実証していく。</p>
</div>
<section aria-label="Foundry Pulse" class="foundry-pulse reveal">
<div class="pulse-left"><span>FOUNDRY PULSE</span><svg aria-hidden="true" viewbox="0 0 320 62"><polyline class="pulse-shadow" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline><polyline class="pulse-line" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline></svg></div>
<div class="pulse-metric compact"><small>REPOSITORY</small><strong class="ok" data-repository="">VERIFIED</strong></div>
<div class="pulse-metric"><small>PROJECT STATE</small><strong data-project-state="">Published</strong></div>
<div class="pulse-metric"><small>RI#1</small><strong class="warn" data-overall="">PARTIAL</strong></div>
<div class="pulse-metric compact"><small>ACCEPTANCE</small><strong class="pending" data-acceptance="">PENDING</strong></div>
<div class="pulse-metric"><small>RUNTIME</small><strong class="hot" data-runtime="">NOT EXECUTED</strong></div>
<div class="pulse-metric compact"><small>CURRENT RV</small><strong class="rv" data-formal-rv="">0 / 3</strong></div>
<div aria-hidden="true" class="radar"><i></i><b></b><em></em></div>
</section>
</div>
<div aria-label="Reference Implementation Current一覧" class="project-cards reveal">
<button class="project-card active-card" data-open-ri1="" type="button"><span class="project-icon hex">◇</span><span><b><em>RI#1</em> 記事制作</b><small>Article Production / Current</small></span><mark>ACTIVE</mark><i class="card-trace"></i></button>
<button class="project-card active-card" data-open-ri2="" type="button"><span class="project-icon green">⬡</span><span><b><em>RI#2</em> ドキュメント制作</b><small>Document Transformation /<br>Core Contributor</small></span><mark>VERIFIED</mark><i class="card-trace"></i></button>
<article class="project-card"><span class="project-icon violet">⬢</span><span><b><em>RI#3</em> 画像資産制作</b><small>Visual Asset Production / Runtime Validated</small></span></article>
<article class="project-card add"><span class="plus">＋</span><span><b>新しいラインを追加</b><small>Human Decision（人間判断）で開始</small></span></article>
</div>
<aside class="visitor-counter reveal" aria-labelledby="visitor-counter-title">
<div class="visitor-counter-copy">
<p class="visitor-counter-kicker"><span class="visitor-counter-dot" aria-hidden="true"></span> VISITOR COUNTER</p>
<h3 id="visitor-counter-title">FOUNDRYに来た人。</h3>
<p>公式HPへの来訪を、Foundryの稼働記録みたいに刻む。同一訪問者の同日中の重複アクセスをまとめるUV方式の軽量カウンター。</p>
</div>
<div class="visitor-counter-display" aria-live="polite">
<small>TOTAL VISITORS / 来訪者数</small>
<strong id="busuanzi_site_uv" data-visitor-count>------</strong>
<span data-visitor-note>CONNECTING...</span>
</div>
</aside>
<section aria-labelledby="parallel-title" class="parallel-board reveal" id="ri-console">
<div class="parallel-head"><h2 id="parallel-title">並行プロジェクト</h2><p>%ではなく、現在どの段階にいるかを表示</p></div>
<div aria-hidden="true" class="phase-legend"><span>構想</span><span>設計</span><span>実装</span><span>実証</span><span>確定</span></div>
<article class="project-line ri1-line" id="ri1-line">
<div aria-label="RI#1 記事制作の詳細を開く" class="ri1-rail-row" role="button" tabindex="0">
<button aria-controls="ri1-telemetry" aria-expanded="false" class="line-toggle" id="ri1-toggle" type="button">
<span class="line-id"><i>⬡</i><b>RI#1</b></span><span class="line-name"><strong>記事制作</strong><small>Article Production</small></span><span class="line-state" data-overall="">PARTIAL</span><span aria-hidden="true" class="chevron">⌄</span>
</button>
<div aria-label="RI#1 記事制作: 実証段階" class="stage-rail">
<div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment current"></div><div class="rail-segment"></div>
<div class="rail-node n1 done"><span></span></div><div class="rail-node n2 done"><span></span></div><div class="rail-node n3 done"><span></span></div><div class="rail-node n4 current"><span class="orb"></span><b class="orb-ring r1"></b><b class="orb-ring r2"></b><b class="orb-ring r3"></b></div><div class="rail-node n5"><span></span></div>
<div aria-hidden="true" class="energy-beam"><i></i><b></b><em></em></div>
</div>
</div>
<div aria-hidden="true" aria-labelledby="telemetry-title" class="telemetry-reveal" id="ri1-telemetry" inert="" role="region">
<div class="telemetry-reveal-inner">
<section class="telemetry-panel">
<div aria-hidden="true" class="panel-grid"></div><div aria-hidden="true" class="panel-noise"></div><div aria-hidden="true" class="panel-scan"></div><div aria-hidden="true" class="edge-trace trace-a"></div><div aria-hidden="true" class="edge-trace trace-b"></div>
<aside class="operator-card boot-item" style="--boot:0">
<span class="operator-label">FOUNDRY OPERATOR</span>
<div class="operator-art"><img alt="Foundry Operator" src="assets/ri1-operator.webp"/></div>
<div class="operator-comment"><small>OPERATOR COMMENT</small><p data-operator-comment="">Repository（リポジトリ）は検証済み。Live（実環境）は検証済み。Runtime（実行時）は未実行。</p></div>
</aside>
<div class="telemetry-main">
<header class="telemetry-head boot-item" style="--boot:1"><div><p>RI #1 / ARTICLE PRODUCTION</p><h3 id="telemetry-title">BUILD TELEMETRY</h3></div><div class="projection-badge"><span></span>PUBLIC PROJECTION</div><button aria-label="管制盤を閉じる" class="panel-close" data-close-ri1="" type="button">×</button></header>
<div class="status-grid">
<article class="status-card amber boot-item" style="--boot:2"><small>OVERALL</small><strong data-overall="">PARTIAL</strong></article>
<article class="status-card green boot-item" style="--boot:3"><small>REPOSITORY</small><strong data-repository="">VERIFIED</strong></article>
<article class="status-card pink boot-item" style="--boot:4"><small>PRIMARY BLOCKER</small><span data-primary-layer="">Runtime</span><strong data-primary-state="">NOT EXECUTED</strong></article>
<article class="status-card orange boot-item" style="--boot:5"><small>NEXT REQUIRED</small><span data-next-layer="">Runtime</span><strong data-next-state="">NOT EXECUTED</strong></article>
<article class="status-card purple boot-item" style="--boot:6"><small>CURRENT RV</small><strong data-formal-rv="">0 / 3</strong></article>
<article class="status-card amber boot-item" style="--boot:7"><small>RUNTIME ACCEPTANCE</small><strong data-acceptance="">PENDING</strong></article>
<article class="status-card cyan wide boot-item" style="--boot:8"><small>FRESHNESS</small><strong data-freshness="">CURRENT</strong><span data-freshness-reason="">SOURCE_MANIFEST_MATCH</span></article>
</div>
<div class="pipeline-block boot-item" style="--boot:9"><p class="micro-title">PIPELINE PROGRESSION</p><div class="pipeline"><span class="ok" data-pipeline-stage="design">DESIGN <i>✓</i></span><b>→</b><span class="ok" data-pipeline-stage="repository">REPOSITORY <i>✓</i></span><b>→</b><span class="ok" data-pipeline-stage="live">LIVE <i>✓</i></span><b>→</b><span class="next" data-pipeline-stage="runtime">RUNTIME <i>◎</i></span><b>→</b><span class="pending" data-pipeline-stage="acceptance">ACCEPTANCE</span></div></div>
<div class="telemetry-lower">
<div class="contract-block boot-item" style="--boot:10"><p class="micro-title">AGENT CONTRACTS</p><div class="contract-row"><span>Structured Output</span><strong data-structured="">20 / 20 VERIFIED</strong></div><div class="contract-row"><span>Raw Gate</span><strong data-raw-gate="">20 / 20 VERIFIED</strong></div><div class="contract-row"><span>Formal Capabilities</span><strong data-capabilities="">14</strong></div></div>
<div class="evidence-block boot-item" style="--boot:11"><p class="micro-title">EVIDENCE STATUS</p><div aria-hidden="true" class="evidence-ring"><span data-evidence-binding="">PARTIAL</span></div><ul><li><span>Evidence Binding</span><strong data-evidence-binding="">PARTIAL</strong></li><li><span>Current RV</span><strong data-formal-rv="">0 / 3</strong></li><li><span>Acceptance</span><strong data-acceptance="">PENDING</strong></li></ul></div>
</div>
<footer class="telemetry-foot boot-item" style="--boot:12"><span>PUBLIC BOUNDARY</span><p>公開可能なCurrent Projection（現在地の公開投影）のみ表示。</p></footer>
</div>
</section>
</div>
</div>
</article>
<div aria-label="RI Guide" class="guide-mascot"><img alt="RI Guide" src="assets/ri1-guide.webp"/><div aria-hidden="true" class="guide-orbit"></div></div><div aria-hidden="true" class="guide-open-dock"><span class="guide-open-label" data-guide-label="">RI#1 GUIDE</span><div class="guide-open-art"><img alt="" src="assets/ri1-guide.webp"/><div class="guide-open-orbit"></div></div><div class="guide-open-status"><strong data-current-stage="">RUNTIME</strong></div></div>
<article class="project-line ri2-line" id="ri2-line">
<div aria-label="RI#2 ドキュメント制作の詳細を開く" class="ri2-rail-row" role="button" tabindex="0">
<button aria-controls="ri2-telemetry" aria-expanded="false" class="line-toggle" id="ri2-toggle" type="button">
<span class="line-id"><i>◉</i><b>RI#2</b></span><span class="line-name"><strong>ドキュメント制作</strong><small>Core Contributor</small></span><span class="line-state" data-ri2-overall="">VERIFIED</span><span aria-hidden="true" class="chevron">⌄</span>
</button>
<div aria-label="RI#2 ドキュメント制作: 確定段階" class="stage-rail ri2-stage-rail">
<div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment current"></div>
<div class="rail-node n1 done"><span></span></div><div class="rail-node n2 done"><span></span></div><div class="rail-node n3 done"><span></span></div><div class="rail-node n4 done"><span></span></div><div class="rail-node n5 current"><span class="orb"></span><b class="orb-ring r1"></b><b class="orb-ring r2"></b><b class="orb-ring r3"></b></div>
<div aria-hidden="true" class="energy-beam" style="left:90%"><i></i><b></b><em></em></div>
</div>
</div>
<div aria-hidden="true" aria-labelledby="ri2-telemetry-title" class="telemetry-reveal" id="ri2-telemetry" inert="" role="region">
<div class="telemetry-reveal-inner">
<section class="telemetry-panel ri2-telemetry-panel">
<div aria-hidden="true" class="panel-grid"></div><div aria-hidden="true" class="panel-noise"></div><div aria-hidden="true" class="panel-scan"></div><div aria-hidden="true" class="edge-trace trace-a"></div><div aria-hidden="true" class="edge-trace trace-b"></div>
<aside class="operator-card boot-item" style="--boot:0">
<span class="operator-label">PUBLICATION OPERATOR</span>
<div class="operator-art"><img alt="Foundry Publication Operator" src="assets/ri1-operator.webp"/></div>
<div class="operator-comment"><small>OPERATOR COMMENT</small><p data-ri2-operator-comment="">Source Binding（Sourceひも付け）からSemantic Review（意味レビュー）まで完了。RI#2はCore Contributorとして実装検証済み。Live AcceptanceはPENDING。</p></div>
</aside>
<div class="telemetry-main">
<header class="telemetry-head boot-item" style="--boot:1"><div><p>RI #2 / DOCUMENT TRANSFORMATION</p><h3 id="ri2-telemetry-title">PUBLICATION TELEMETRY</h3></div><div class="projection-badge"><span></span>PUBLIC PROJECTION</div><button aria-label="RI#2管制盤を閉じる" class="panel-close" data-close-ri2="" type="button">×</button></header>
<div class="status-grid">
<article class="status-card ready boot-item" style="--boot:2"><small>OVERALL</small><strong data-ri2-overall="">VERIFIED</strong></article>
<article class="status-card green boot-item" style="--boot:3"><small>WORKFLOW</small><strong data-ri2-workflow="">PASS</strong></article>
<article class="status-card green boot-item" style="--boot:4"><small>ARTIFACT</small><strong data-ri2-artifact="">PASS</strong></article>
<article class="status-card locked boot-item" style="--boot:5"><small>LIVE ACCEPTANCE</small><strong data-ri2-publication="">PENDING</strong></article>
<article class="status-card violet boot-item" style="--boot:6"><small>HUMAN GATE</small><strong data-ri2-human-gate="">PENDING</strong></article>
<article class="status-card cyan boot-item" style="--boot:7"><small>PHASE</small><strong data-ri2-phase="">IMPLEMENTATION VERIFIED</strong></article>
<article class="status-card cyan wide boot-item" style="--boot:8"><small>WORKFLOW MODE</small><strong data-ri2-mode="">SOURCE-PRESERVING</strong><span data-ri2-architecture="">v0.34</span></article>
</div>
<div class="pipeline-block boot-item" style="--boot:9"><p class="micro-title">TRANSFORMATION PROGRESSION</p><div class="pipeline"><span class="ok">SOURCE <i>✓</i></span><b>→</b><span class="ok">PLAN <i>✓</i></span><b>→</b><span class="ok">TRANSFORM <i>✓</i></span><b>→</b><span class="ok">REVIEW <i>✓</i></span><b>→</b><span class="next">LIVE ACCEPTANCE <i>◎</i></span></div></div>
<div class="telemetry-lower">
<div class="contract-block boot-item" style="--boot:10"><p class="micro-title">TRANSFORMATION CONTRACTS</p><div class="contract-row ri2-contract-row"><span>Source Binding</span><strong data-ri2-source-binding="">PASS</strong></div><div class="contract-row ri2-contract-row"><span>Deterministic Validation</span><strong data-ri2-deterministic="">PASS</strong></div><div class="contract-row ri2-contract-row"><span>Semantic Review</span><strong data-ri2-semantic="">PASS</strong></div></div>
<div class="evidence-block boot-item" style="--boot:11"><p class="micro-title">EVIDENCE STATUS</p><div aria-hidden="true" class="evidence-ring"><span data-ri2-evidence-binding="">PASS</span></div><ul><li><span>Gate Pass</span><strong data-ri2-gates="">8 / 8</strong></li><li><span>Evidence Files</span><strong data-ri2-evidence-files="">38 / 38</strong></li><li><span>Artifact</span><strong data-ri2-artifact="">PASS</strong></li></ul></div>
</div>
<footer class="telemetry-foot boot-item" style="--boot:12"><span>PUBLIC BOUNDARY</span><p>公開可能なCurrent結果のみ表示。旧Phase B SnapshotはCurrent表示経路から除外する。</p></footer>
</div>
</section>
</div>
</div>
</article>
<article class="project-line other-line"><div class="line-static"><span class="line-id"><i>▽</i><b>WEB</b></span><span class="line-name"><strong>公式HP</strong><small>Website Presentation</small></span><span class="chevron">⌄</span></div><div class="mini-rail"><i class="g"></i><i class="c"></i><i class="c"></i><i></i><i></i></div></article>
<article class="project-line other-line"><div class="line-static"><span class="line-id"><i>⬡</i><b>CORE</b></span><span class="line-name"><strong>Foundry Core</strong><small>4-Core Confirmed / Extraction Continues</small></span><span class="chevron">⌄</span></div><div class="mini-rail"><i class="g"></i><i class="v"></i><i></i><i></i><i></i></div></article>
<article class="project-line other-line"><div class="line-static"><span class="line-id"><i>✣</i><b>RI#3</b></span><span class="line-name"><strong>画像資産制作</strong><small>Runtime Validated / Core Contributor</small></span><span class="chevron">⌄</span></div><div class="mini-rail"><i class="v"></i><i></i><i></i><i></i><i></i></div></article>
</section>
</div>

  </div>
</section>`;
})();

(() => {
'use strict';
const root=document.querySelector('.s13-dashboard');
if(!root) return;
const board=root.querySelector('.parallel-board');
const toggle=root.querySelector('#ri1-toggle');
const row=root.querySelector('.ri1-rail-row');
const reveal=root.querySelector('#ri1-telemetry');
const panel=root.querySelector('.telemetry-panel');
const close=root.querySelector('[data-close-ri1]');
const triggers=[...root.querySelectorAll('[data-open-ri1]')];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
let isOpen=false, bootTimer=0, guideTimer=0, ri1CurrentStage='RUNTIME';
const qsa=s=>[...root.querySelectorAll(s)];
function setText(sel,val){qsa(sel).forEach(el=>{el.textContent=String(val)})}
const COMPLETE_STATES=new Set(['VERIFIED','PASS','COMPLETE','ACCEPTED','N/A','NOT REQUIRED']);
const BLOCKING_STATES=new Set(['FAILED','NOT APPLIED','NOT IMPLEMENTED','BLOCKED','UNKNOWN']);
const norm=v=>String(v??'').trim().toUpperCase();
const isComplete=v=>COMPLETE_STATES.has(norm(v));
const isBlocking=v=>BLOCKING_STATES.has(norm(v));
const layerLabel=key=>({repository:'Repository',live:'Live',runtime:'Runtime',acceptance:'Acceptance',complete:'Complete'}[key]||String(key||''));
const stateJa=value=>({
 'VERIFIED':'検証済み','PASS':'合格','COMPLETE':'完了','ACCEPTED':'受入済み',
 'PARTIAL':'一部成立','NOT APPLIED':'未反映','NOT EXECUTED':'未実行',
 'NOT IMPLEMENTED':'未実装','FAILED':'失敗','PENDING':'保留中','UNKNOWN':'不明',
 'N/A':'対象外','NOT REQUIRED':'不要'
}[norm(value)]||String(value??'不明'));
function currentSequence(r){
 return [
  {key:'repository',state:r.repository},
  {key:'live',state:r.live},
  {key:'runtime',state:r.runtime},
  {key:'acceptance',state:r.runtime_acceptance}
 ];
}
function resolvePrimary(r){
 const explicit=r.primary_blocker;
 if(explicit?.layer&&explicit?.state)return{key:String(explicit.layer).toLowerCase(),state:explicit.state};
 return currentSequence(r).find(item=>item.state&&!isComplete(item.state))||{key:'complete',state:'VERIFIED'};
}
function resolveNext(r){
 const explicit=r.next_required;
 if(explicit?.layer&&explicit?.state)return{key:String(explicit.layer).toLowerCase(),state:explicit.state};
 return currentSequence(r).find(item=>item.state&&!isComplete(item.state))||{key:'complete',state:'VERIFIED'};
}
function renderPipeline(r){
 const stages=[
  {key:'design',label:'DESIGN',state:'VERIFIED'},
  {key:'repository',label:'REPOSITORY',state:r.repository},
  {key:'live',label:'LIVE',state:r.live},
  {key:'runtime',label:'RUNTIME',state:r.runtime},
  {key:'acceptance',label:'ACCEPTANCE',state:r.runtime_acceptance}
 ];
 const currentIndex=stages.findIndex(stage=>!isComplete(stage.state));
 qsa('[data-pipeline-stage]').forEach(el=>{
  const index=stages.findIndex(stage=>stage.key===el.dataset.pipelineStage);
  if(index<0)return;
  const stage=stages[index];
  el.classList.remove('ok','blocked','next','pending');
  let tone='pending',icon='';
  if(isComplete(stage.state)){tone='ok';icon='✓'}
  else if(index===currentIndex){
   if(isBlocking(stage.state)){tone='blocked';icon='!'}
   else{tone='next';icon='◎'}
  }
  el.classList.add(tone);
  el.textContent=stage.label;
  if(icon){
   const i=document.createElement('i');
   i.textContent=icon;
   el.append(' ',i);
  }
 });
}
function renderStageRail(r){
 const rail=root.querySelector('.ri1-line .stage-rail');
 if(!rail)return;
 const nodes=[...rail.querySelectorAll('.rail-node')];
 const segments=[...rail.querySelectorAll('.rail-segment')];
 const energy=rail.querySelector('.energy-beam');
 let phaseIndex=2;
 let currentStage='IMPLEMENTATION';
 if(isComplete(r.repository)&&isComplete(r.live)){phaseIndex=3;currentStage='RUNTIME'}
 if(isComplete(r.runtime)){phaseIndex=4;currentStage='ACCEPTANCE'}
 const allComplete=isComplete(r.repository)&&isComplete(r.live)&&isComplete(r.runtime)&&isComplete(r.runtime_acceptance);
 if(allComplete)currentStage='COMPLETE';
 const pulseParts=nodes.flatMap(node=>[...node.querySelectorAll('.orb,.orb-ring')]);
 nodes.forEach((node,index)=>{
  node.classList.toggle('done',allComplete||index<phaseIndex);
  node.classList.toggle('current',!allComplete&&index===phaseIndex);
 });
 segments.forEach((segment,index)=>{
  segment.classList.toggle('done',allComplete||index<phaseIndex);
  segment.classList.toggle('current',!allComplete&&index===phaseIndex);
 });
 if(!allComplete&&nodes[phaseIndex]&&pulseParts.length)nodes[phaseIndex].append(...pulseParts);
 if(energy&&!allComplete)energy.style.left=`${10+(phaseIndex*20)}%`;
 rail.setAttribute('aria-label',`RI#1 記事制作: ${currentStage}`);
 ri1CurrentStage=currentStage;
 setText('[data-current-stage]',currentStage);setText('[data-guide-label]','RI#1 GUIDE');
}
function renderOperatorComment(r){
 const comment=[
  `Repository（リポジトリ）は${stateJa(r.repository)}。`,
  `Live（実環境）は${stateJa(r.live)}。`,
  `Runtime（実行時）は${stateJa(r.runtime)}。`
 ];
 if(isComplete(r.runtime)||norm(r.runtime_acceptance)!=='PENDING'){
  comment.push(`Acceptance（受入れ）は${stateJa(r.runtime_acceptance)}。`);
 }
 setText('[data-operator-comment]',comment.join(''));
}
function bindProjection(DATA){
 const r=DATA?.ri1||{};
 if(DATA?.project_state)setText('[data-project-state]',DATA.project_state);
 if(r.overall)setText('[data-overall]',r.overall);
 if(r.repository)setText('[data-repository]',r.repository);
 if(r.runtime)setText('[data-runtime]',r.runtime);
 if(r.formal_rv)setText('[data-formal-rv]',`${r.formal_rv.passed} / ${r.formal_rv.required}`);
 if(r.runtime_acceptance)setText('[data-acceptance]',r.runtime_acceptance);
 if(r.freshness?.state)setText('[data-freshness]',r.freshness.state);
 if(r.freshness?.reason)setText('[data-freshness-reason]',r.freshness.reason);
 const primary=resolvePrimary(r),next=resolveNext(r);
 setText('[data-primary-layer]',layerLabel(primary.key));
 setText('[data-primary-state]',primary.state);
 setText('[data-next-layer]',layerLabel(next.key));
 setText('[data-next-state]',next.state);
 const evidenceBinding=r.evidence_binding||r.overall;
 if(evidenceBinding)setText('[data-evidence-binding]',evidenceBinding);
 const s=r.agent_contracts?.structured_output,g=r.agent_contracts?.raw_gate;
 if(s)setText('[data-structured]',`${s.verified} / ${s.total} VERIFIED`);
 if(g)setText('[data-raw-gate]',`${g.verified} / ${g.total} VERIFIED`);
 if(Number.isFinite(r.formal_capability_count))setText('[data-capabilities]',r.formal_capability_count);
 renderPipeline(r);
 renderStageRail(r);
 renderOperatorComment(r);
}
async function loadProjection(){
 try{
  const res=await fetch('assets/ri1-build-telemetry.json',{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  bindProjection(await res.json());
 }catch(err){
  console.warn('[LF S13] Public Projection load failed; keeping publication-safe static fallback.',err);
 }
}
function scrollPanel(){const top=row.getBoundingClientRect().top+window.scrollY-96;window.scrollTo({top,behavior:reduce.matches?'auto':'smooth'})}
function openPanel({scroll=true,focusPanel=false}={}){
 if(isOpen){if(scroll)scrollPanel();return}
 clearTimeout(bootTimer);clearTimeout(guideTimer);
 document.dispatchEvent(new CustomEvent('lf:ri1-opened'));
 isOpen=true;
 board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri2-open','ri1-open','ri-open');
 board.classList.add('ri-open','ri1-open','ri-booting');
 setText('[data-guide-label]','RI#1 GUIDE');setText('[data-current-stage]',ri1CurrentStage);
 toggle?.setAttribute('aria-expanded','true');
 reveal?.setAttribute('aria-hidden','false'); if(reveal) reveal.inert=false;
 requestAnimationFrame(()=>requestAnimationFrame(()=>board.classList.add('ri-energized')));
 guideTimer=window.setTimeout(()=>board.classList.add('guide-open-ready'),reduce.matches?0:620);
 bootTimer=window.setTimeout(()=>board.classList.remove('ri-booting'),1250);
 if(scroll) window.setTimeout(scrollPanel,90);
 if(focusPanel) window.setTimeout(()=>panel?.focus?.({preventScroll:true}),250);
}
function closePanel({focusToggle=true}={}){
 if(!isOpen)return;
 isOpen=false;clearTimeout(bootTimer);clearTimeout(guideTimer);
 board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri1-open','ri-open');
 toggle?.setAttribute('aria-expanded','false');
 reveal?.setAttribute('aria-hidden','true'); if(reveal) reveal.inert=true;
 if(focusToggle) window.setTimeout(()=>toggle?.focus({preventScroll:true}),reduce.matches?0:300);
}
toggle?.addEventListener('click',e=>{e.stopPropagation();isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})});
row?.addEventListener('click',e=>{if(e.target.closest('#ri1-telemetry'))return;isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})});
row?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})}});
close?.addEventListener('click',e=>{e.stopPropagation();closePanel({focusToggle:true})});
triggers.forEach(t=>t.addEventListener('click',()=>openPanel({scroll:true})));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen){e.preventDefault();closePanel({focusToggle:true})}});
document.addEventListener('lf:ri2-opened',()=>{if(isOpen)closePanel({focusToggle:false})});
loadProjection();
})();


/* Local AI Foundry — RI#2 Public Transformation Telemetry */
(() => {
'use strict';
const root=document.querySelector('.s13-dashboard');
if(!root) return;
const board=root.querySelector('.parallel-board');
const toggle=root.querySelector('#ri2-toggle');
const row=root.querySelector('.ri2-rail-row');
const reveal=root.querySelector('#ri2-telemetry');
const panel=root.querySelector('.ri2-telemetry-panel');
const close=root.querySelector('[data-close-ri2]');
const triggers=[...root.querySelectorAll('[data-open-ri2]')];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
let isOpen=false,bootTimer=0,guideTimer=0;
const qsa=s=>[...root.querySelectorAll(s)];
function setText(sel,val){qsa(sel).forEach(el=>{el.textContent=String(val)})}
function resolveRi2CurrentIndex(r){
 const publication=String(r?.publication||'').trim().toUpperCase();
 const humanGate=String(r?.human_gate||'').trim().toUpperCase();
 const artifact=String(r?.artifact||'').trim().toUpperCase();
 const workflow=String(r?.workflow||'').trim().toUpperCase();
 if(publication==='AUTHORIZED'||publication==='PUBLISHED'||publication==='PASS')return 5;
 if(humanGate==='READY'||humanGate==='PENDING'||publication==='NOT AUTHORIZED'||publication==='LIVE ACCEPTANCE PENDING')return 5;
 if(artifact==='PASS')return 4;
 if(workflow==='PASS')return 3;
 return 2;
}
function renderRi2Rail(r){
 const rail=root.querySelector('.ri2-stage-rail');
 if(!rail)return;
 const currentIndex=Math.max(1,Math.min(5,resolveRi2CurrentIndex(r)));
 const segments=[...rail.querySelectorAll('.rail-segment')];
 const nodes=[...rail.querySelectorAll('.rail-node')];
 segments.forEach((seg,idx)=>{
  seg.classList.remove('done','current');
  if(idx<currentIndex-1)seg.classList.add('done');
  else if(idx===currentIndex-1)seg.classList.add('current');
 });
 nodes.forEach((node,idx)=>{
  node.classList.remove('done','current');
  if(idx<currentIndex-1)node.classList.add('done');
  else if(idx===currentIndex-1)node.classList.add('current');
 });
 const beam=rail.querySelector('.energy-beam');
 if(beam)beam.style.left=`${10+((currentIndex-1)*20)}%`;
}
function bindProjection(DATA){
 const r=DATA?.ri2||{};
 if(r.overall)setText('[data-ri2-overall]',r.overall);
 if(r.workflow)setText('[data-ri2-workflow]',r.workflow);
 if(r.artifact)setText('[data-ri2-artifact]',r.artifact);
 if(r.publication)setText('[data-ri2-publication]',r.publication);
 if(r.human_gate)setText('[data-ri2-human-gate]',r.human_gate);
 if(r.phase)setText('[data-ri2-phase]',r.phase);
 if(r.workflow_mode)setText('[data-ri2-mode]',r.workflow_mode);
 if(r.architecture_revision)setText('[data-ri2-architecture]',r.architecture_revision);
 if(r.contracts?.source_binding)setText('[data-ri2-source-binding]',r.contracts.source_binding);
 if(r.contracts?.deterministic_validation)setText('[data-ri2-deterministic]',r.contracts.deterministic_validation);
 if(r.contracts?.semantic_review)setText('[data-ri2-semantic]',r.contracts.semantic_review);
 if(r.evidence?.binding)setText('[data-ri2-evidence-binding]',r.evidence.binding);
 if(r.evidence?.gates)setText('[data-ri2-gates]',`${r.evidence.gates.passed} / ${r.evidence.gates.total}`);
 if(r.evidence?.files)setText('[data-ri2-evidence-files]',`${r.evidence.files.verified} / ${r.evidence.files.total}`);
 const comment=`Source Binding（Sourceひも付け）からSemantic Review（意味レビュー）まで${r.workflow==='PASS'?'完了':'進行'}。Artifact ${r.artifact||'UNKNOWN'}、Current Role ${r.current_role||'CORE CONTRIBUTOR'}。Live Acceptanceは${r.publication||'UNKNOWN'}。`;
 setText('[data-ri2-operator-comment]',comment);
 renderRi2Rail(r);
}
async function loadProjection(){
 try{
  const res=await fetch('assets/ri2-build-telemetry.json',{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  bindProjection(await res.json());
 }catch(err){console.warn('[LF S13] RI#2 Public Projection load failed; keeping publication-safe static fallback.',err)}
}
function scrollPanel(){const top=row.getBoundingClientRect().top+window.scrollY-96;window.scrollTo({top,behavior:reduce.matches?'auto':'smooth'})}
function openPanel({scroll=true,focusPanel=false}={}){
 if(isOpen){if(scroll)scrollPanel();return}
 clearTimeout(bootTimer);clearTimeout(guideTimer);
 document.dispatchEvent(new CustomEvent('lf:ri2-opened'));
 isOpen=true;
 board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri1-open','ri2-open','ri-open');
 board.classList.add('ri-open','ri2-open','ri-booting');
 toggle?.setAttribute('aria-expanded','true');reveal?.setAttribute('aria-hidden','false');if(reveal)reveal.inert=false;
 setText('[data-guide-label]','RI#2 GUIDE');setText('[data-current-stage]','LIVE ACCEPTANCE');
 requestAnimationFrame(()=>requestAnimationFrame(()=>board.classList.add('ri-energized')));
 guideTimer=window.setTimeout(()=>board.classList.add('guide-open-ready'),reduce.matches?0:620);
 bootTimer=window.setTimeout(()=>board.classList.remove('ri-booting'),1250);
 if(scroll)window.setTimeout(scrollPanel,90);
 if(focusPanel)window.setTimeout(()=>panel?.focus?.({preventScroll:true}),250);
}
function closePanel({focusToggle=true}={}){
 if(!isOpen)return;
 isOpen=false;clearTimeout(bootTimer);clearTimeout(guideTimer);
 board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri2-open','ri-open');
 toggle?.setAttribute('aria-expanded','false');reveal?.setAttribute('aria-hidden','true');if(reveal)reveal.inert=true;
 if(focusToggle)window.setTimeout(()=>toggle?.focus({preventScroll:true}),reduce.matches?0:300);
}
toggle?.addEventListener('click',e=>{e.stopPropagation();isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})});
row?.addEventListener('click',e=>{if(e.target.closest('#ri2-telemetry'))return;isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})});
row?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();isOpen?closePanel({focusToggle:false}):openPanel({scroll:true})}});
close?.addEventListener('click',e=>{e.stopPropagation();closePanel({focusToggle:true})});
triggers.forEach(t=>t.addEventListener('click',()=>openPanel({scroll:true})));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen){e.preventDefault();closePanel({focusToggle:true})}});
document.addEventListener('lf:ri1-opened',()=>{if(isOpen)closePanel({focusToggle:false})});
loadProjection();
})();


/* Local AI Foundry v4.2.0 — Current Website / Release synchronization */
(() => {
  const current = document.getElementById('current');
  if (!current) return;

  const titleLead = current.querySelector('.current-editorial-title .title-line');
  if (titleLead) titleLead.textContent = 'v4.2へ。';

  const currentCopy = current.querySelector('.current-copy');
  if (currentCopy) {
    const description = [...currentCopy.children].find(
      el => el.tagName === 'P' && !el.classList.contains('kicker')
    );
    if (description) {
      description.textContent = 'v4.2ではReference Implementationの現在地を、Formal IVM由来のPublic Projection（公開投影）で可視化。RI#1のCurrent NodeからInline Telemetry（直下管制盤）を展開し、公開可能な実装状態・Runtime（実行時）・Evidence（証拠）の境界を動いて見える形へ更新。';
    }
  }

  const releaseLink = current.querySelector('.current-actions a[href*="releases/"]');
  if (releaseLink) {
    releaseLink.href = 'releases/2026-08-13-v4.2.html';
    releaseLink.textContent = 'v4.2更新内容';
  }

  current.querySelectorAll('.status-panel article').forEach(article => {
    const label = article.querySelector('span')?.textContent?.trim();
    const value = article.querySelector('strong');
    if (!value) return;
    if (label === '現在の公式HP') value.textContent = 'v4.2';
    if (label === 'Website Release') value.textContent = '2026.08.13';
  });
})();

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

/* Local AI Foundry v4.2.0 — Reference Telemetry Release */
(() => {
  const STATUS_URL = 'docs/public/status-public.md';
  const $ = (selector) => document.querySelector(selector);

  function textMatch(source, regex, fallback = '--') {
    const match = source.match(regex);
    return match?.[1]?.trim() || fallback;
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

      console.warn('[LF v4.2.0] Public Status sync failed:', error);
    }
  }

  function syncVisitorDisplay() {
    const display = document.getElementById('busuanzi_site_uv');
    const note = $('[data-visitor-note]');
    if (!display) return;

    const panel = display.closest('.visitor-counter-display');
    let settled = false;

    const apply = () => {
      if (settled) return true;

      const raw = String(display.textContent || '').replace(/[^\d]/g, '');
      if (!raw) return false;

      const count = Number(raw);
      if (!Number.isFinite(count)) return false;

      settled = true;
      observer.disconnect();

      display.textContent = String(count).padStart(6, '0');
      panel?.classList.add('live');

      if (note) {
        note.textContent = '累計ユニーク訪問者';
      }
      return true;
    };

    const observer = new MutationObserver(() => {
      apply();
    });

    observer.observe(display, {
      childList: true,
      subtree: true,
      characterData: true
    });

    if (apply()) return;

    // Busuanzi is loaded with defer before this script, but network latency can vary.
    // Fail visually only after enough time for the external counter to respond.
    setTimeout(() => {
      if (settled) return;
      observer.disconnect();
      display.textContent = '------';
      panel?.classList.remove('live');
      if (note) note.textContent = 'Counter unavailable';
      console.warn('[LF v4.2.0] Busuanzi visitor counter did not resolve in time.');
    }, 15000);
  }

  syncPublicStatus();
  syncVisitorDisplay();
})();


/* Local AI Foundry v4.2.1 — Hero version synchronization hotfix */
(() => {
  const beacon = document.querySelector('.version-beacon');
  if (beacon) {
    beacon.href = 'releases/2026-08-13-v4.2.html';
    beacon.setAttribute('aria-label', 'Local AI Foundry v4.2 リリース詳細');
    const version = beacon.querySelector('strong');
    const release = beacon.querySelector('em');
    if (version) version.textContent = 'v4.2';
    if (release) release.textContent = 'REFERENCE TELEMETRY RELEASE';
  }

  document.querySelectorAll('.hero-state-row .state-chip').forEach(chip => {
    const label = chip.querySelector('span')?.textContent?.trim();
    const value = chip.querySelector('strong');
    if (!value) return;
    if (label === '現在の公式HP') value.textContent = 'v4.2';
    if (label === 'リリース') value.textContent = '2026.08.13';
  });
})();


/* LF-RI3-DASHBOARD-HOTFIX-BEGIN v1 */
/* Local AI Foundry — Multi-RI Pulse + RI#3 Visual Telemetry Hotfix
   Scope: Website presentation only. No Project State / Runtime / Repository mutation.
   Applied after the existing S13 dashboard scripts. */
(() => {
  'use strict';

  const root = document.querySelector('.s13-dashboard');
  if (!root || root.dataset.multiRiPulse === 'v1') return;
  root.dataset.multiRiPulse = 'v1';

  const board = root.querySelector('.parallel-board');
  const pulse = root.querySelector('.foundry-pulse');
  const projectCards = root.querySelector('.project-cards');
  if (!board || !pulse || !projectCards) return;

  const style = document.createElement('style');
  style.id = 'lf-multi-ri-pulse-ri3-hotfix';
  style.textContent = `
/* ===== Multi-RI Foundry Pulse ===== */
.s13-dashboard .foundry-pulse.lf-pulse-v2{
  width:100%;max-width:100%;min-height:138px;padding:14px 16px;
  display:grid!important;grid-template-columns:minmax(190px,.72fr) minmax(0,2.5fr) 58px!important;
  grid-template-areas:"brand console radar";gap:14px!important;align-items:stretch!important;
  overflow:hidden;
}
.s13-dashboard .lf-pulse-v2 .pulse-left{grid-area:brand;align-self:center;min-width:0}
.s13-dashboard .lf-pulse-v2 .pulse-left>span{display:block;margin-bottom:2px;font-size:12px!important}
.s13-dashboard .lf-pulse-v2 .pulse-left svg{height:52px!important}
.s13-dashboard .lf-pulse-v2 .lf-pulse-console{grid-area:console;min-width:0;display:grid;grid-template-rows:auto 1fr;gap:8px}
.s13-dashboard .lf-pulse-v2 .lf-pulse-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;min-width:0}
.s13-dashboard .lf-pulse-v2 .lf-pulse-view-label{display:flex;align-items:baseline;gap:8px;min-width:0}
.s13-dashboard .lf-pulse-v2 .lf-pulse-view-label small{font-size:12px;color:#71879e;font-weight:900;letter-spacing:.08em}
.s13-dashboard .lf-pulse-v2 .lf-pulse-view-label strong{font-size:13px;color:#eef7ff;white-space:nowrap}
.s13-dashboard .lf-pulse-v2 .lf-pulse-view-label span{font-size:12px;color:#66dfff;white-space:nowrap}
.s13-dashboard .lf-pulse-v2 .lf-pulse-tabs{display:grid;grid-template-columns:repeat(4,auto);gap:5px;flex:0 0 auto}
.s13-dashboard .lf-pulse-v2 .lf-pulse-tab{
  min-height:32px;padding:5px 10px;border:1px solid rgba(92,139,193,.30);border-radius:7px;
  background:rgba(3,14,28,.78);color:#8fa6bc;font-size:12px;font-weight:900;letter-spacing:.02em;
  cursor:pointer;transition:border-color .18s ease,color .18s ease,background .18s ease,box-shadow .18s ease
}
.s13-dashboard .lf-pulse-v2 .lf-pulse-tab:hover,.s13-dashboard .lf-pulse-v2 .lf-pulse-tab:focus-visible{border-color:#69e9ff;color:#fff;outline:none;box-shadow:0 0 14px rgba(33,231,255,.16)}
.s13-dashboard .lf-pulse-v2 .lf-pulse-tab[aria-selected="true"]{border-color:rgba(33,231,255,.78);color:#fff;background:linear-gradient(180deg,rgba(21,98,152,.42),rgba(21,49,109,.30));box-shadow:0 0 18px rgba(33,231,255,.18),inset 0 0 14px rgba(33,231,255,.05)}
.s13-dashboard .lf-pulse-v2 .lf-pulse-metrics{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;min-width:0}
.s13-dashboard .lf-pulse-v2 .pulse-metric{padding:8px 9px!important;border:1px solid rgba(106,139,178,.14)!important;border-radius:8px;background:rgba(2,11,23,.46);min-width:0;text-align:left}
.s13-dashboard .lf-pulse-v2 .pulse-metric small{font-size:11px!important;color:#7f93aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong{font-size:13px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong.ok{color:var(--green)}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong.warn{color:var(--amber)}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong.hot{color:#ff916c}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong.rv{color:#b99dff}
.s13-dashboard .lf-pulse-v2 .pulse-metric strong.info{color:#63dcff}
.s13-dashboard .lf-pulse-v2 .radar{grid-area:radar;align-self:center}

/* ===== RI cards ===== */
.s13-dashboard [data-open-ri1] mark{color:#66e6ff;border-color:rgba(33,231,255,.58);background:rgba(33,231,255,.08)}
.s13-dashboard [data-open-ri3]{border-color:rgba(143,108,255,.72)!important;box-shadow:0 0 0 1px rgba(143,108,255,.09),0 0 30px rgba(143,108,255,.16),inset 0 0 20px rgba(143,108,255,.045)!important}
.s13-dashboard [data-open-ri3] .project-icon{color:var(--violet)}
.s13-dashboard [data-open-ri3] mark{color:#c7b5ff;border-color:rgba(143,108,255,.60);background:rgba(143,108,255,.10)}
.s13-dashboard [data-open-ri3] b{white-space:nowrap}
.s13-dashboard [data-open-ri3] mark{flex:0 0 auto}

/* ===== RI#3 rail / telemetry ===== */
.s13-dashboard .ri3-line{z-index:8;border-color:rgba(143,108,255,.42);box-shadow:inset 0 0 20px rgba(143,108,255,.025);margin-top:0}
.s13-dashboard .ri3-rail-row{min-height:54px;position:relative;cursor:pointer}
.s13-dashboard .ri3-line .line-toggle{border-color:rgba(143,108,255,.62);background:linear-gradient(110deg,rgba(21,16,55,.98),rgba(5,17,38,.94));box-shadow:0 0 20px rgba(143,108,255,.12)}
.s13-dashboard .ri3-line .line-toggle:hover,.s13-dashboard .ri3-line .line-toggle:focus-visible,.s13-dashboard .ri3-rail-row:hover .line-toggle,.s13-dashboard .ri3-rail-row:hover .stage-rail,.s13-dashboard .ri3-rail-row:focus-within .line-toggle,.s13-dashboard .ri3-rail-row:focus-within .stage-rail{border-color:#c5b5ff;box-shadow:0 0 28px rgba(143,108,255,.26),inset 0 0 18px rgba(33,231,255,.04)}
.s13-dashboard .ri3-line .line-state{color:#bfa8ff}
.s13-dashboard .ri3-line .telemetry-panel{border-color:rgba(143,108,255,.70);box-shadow:0 0 0 1px rgba(33,231,255,.13),0 0 38px rgba(143,108,255,.15),inset 0 0 50px rgba(33,231,255,.028)}
.s13-dashboard .ri3-line .telemetry-panel:before{background:linear-gradient(90deg,transparent 0 12%,#8f6cff 23%,#48eaff 50%,#8f6cff 77%,transparent 88%);background-size:260% 100%}
.s13-dashboard .ri3-line .operator-label,.s13-dashboard .ri3-line .telemetry-head p{color:#c1afff}
.s13-dashboard .ri3-line .projection-badge span{background:var(--violet);box-shadow:0 0 12px var(--violet)}
.s13-dashboard .status-card.current{border-color:rgba(143,108,255,.38)}.s13-dashboard .status-card.current strong{color:#c4b0ff}
.s13-dashboard .status-card.disabled{border-color:rgba(255,120,90,.30)}.s13-dashboard .status-card.disabled strong{color:#ff916c}
.s13-dashboard .status-card.waiting{border-color:rgba(255,199,67,.32)}.s13-dashboard .status-card.waiting strong{color:var(--amber)}
.s13-dashboard .ri3-stage-rail .rail-segment.done{background:linear-gradient(90deg,rgba(85,242,181,.84),rgba(33,231,255,.58))}
.s13-dashboard .ri3-stage-rail .rail-segment.current{background:linear-gradient(90deg,#5a7cff,#a665ff)}
.s13-dashboard .ri3-stage-rail .rail-node.current{box-shadow:0 0 12px white,0 0 30px var(--violet),0 0 55px var(--cyan)}
.s13-dashboard .ri3-line .ri3-pipeline{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:5px}
.s13-dashboard .ri3-line .ri3-pipeline span{min-height:40px;border:1px solid rgba(85,126,176,.28);display:flex;align-items:center;justify-content:center;gap:7px;border-radius:6px;background:#041020;color:#6f8194;font-size:12px;font-weight:800;text-align:center}
.s13-dashboard .ri3-line .ri3-pipeline b{font-weight:400;color:#65829e}
.s13-dashboard .ri3-line .ri3-pipeline span.ok{border-color:rgba(85,242,181,.55);color:var(--green);background:rgba(85,242,181,.04)}
.s13-dashboard .ri3-line .ri3-pipeline span.next{border-color:rgba(143,108,255,.80);color:white;background:linear-gradient(180deg,rgba(91,76,190,.38),rgba(25,72,180,.20));box-shadow:0 0 15px rgba(143,108,255,.22),inset 0 0 15px rgba(33,231,255,.06)}
.s13-dashboard .ri3-line .ri3-pipeline span.pending{color:#75879b}

/* Selected drawer rules extended to RI#3. */
.s13-dashboard .parallel-board.ri-open #ri3-telemetry{grid-template-rows:0fr!important;opacity:0!important;transform:translateY(-18px)!important;pointer-events:none!important}
.s13-dashboard .parallel-board.ri3-open #ri3-telemetry{grid-template-rows:1fr!important;opacity:1!important;transform:none!important;pointer-events:auto!important}
.s13-dashboard .parallel-board.ri3-open .ri3-line .energy-beam{height:72px!important;opacity:1!important}
.s13-dashboard .parallel-board.ri3-open .ri3-line .chevron{transform:rotate(180deg)}
.s13-dashboard .parallel-board.ri3-open .ri1-line,.s13-dashboard .parallel-board.ri3-open .ri2-line{opacity:.34;filter:saturate(.48) brightness(.70);transform:translateY(2px)}
.s13-dashboard .parallel-board.ri1-open .ri3-line,.s13-dashboard .parallel-board.ri2-open .ri3-line{opacity:.34;filter:saturate(.48) brightness(.70);transform:translateY(2px)}
.s13-dashboard .parallel-board.ri3-open .ri3-line{border-color:rgba(174,151,255,.80);box-shadow:0 0 0 1px rgba(143,108,255,.15),0 0 30px rgba(143,108,255,.16),inset 0 0 24px rgba(33,231,255,.035)}
.s13-dashboard .parallel-board.ri3-open .ri3-line .telemetry-panel{animation:consoleBoot .95s var(--ease) both}
.s13-dashboard .parallel-board.ri3-open .ri3-line .panel-scan{opacity:1;animation:panelScan 2.8s ease-in-out .55s infinite}
.s13-dashboard .parallel-board.ri3-open .ri3-line .trace-a{opacity:1;animation:traceA 1.1s var(--ease) .18s both}
.s13-dashboard .parallel-board.ri3-open .ri3-line .trace-b{opacity:1;animation:traceB 1.1s var(--ease) .32s both}
.s13-dashboard .parallel-board.ri3-open .ri3-line .boot-item{animation:bootItem .48s var(--ease) both;animation-delay:calc(.28s + (var(--boot) * 55ms))}
.s13-dashboard .parallel-board.ri3-open .ri3-line .operator-art img{animation:operatorIn .85s var(--ease) .25s both}

@media(max-width:1540px){
  .s13-dashboard .foundry-pulse.lf-pulse-v2{grid-template-columns:minmax(170px,.62fr) minmax(0,2.6fr) 58px!important}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-metrics{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media(max-width:900px){
  .s13-dashboard .foundry-pulse.lf-pulse-v2{grid-template-columns:1fr 58px!important;grid-template-areas:"brand radar" "console console"}
  .s13-dashboard .lf-pulse-v2 .pulse-left{align-self:end}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-toolbar{align-items:flex-start}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-tabs{grid-template-columns:repeat(4,1fr);width:min(430px,100%)}
  .s13-dashboard .ri3-line .ri3-pipeline{grid-template-columns:1fr}
  .s13-dashboard .ri3-line .ri3-pipeline b{display:none}
}
@media(max-width:620px){
  .s13-dashboard .foundry-pulse.lf-pulse-v2{grid-template-columns:1fr!important;grid-template-areas:"brand" "console";padding:14px 12px!important}
  .s13-dashboard .lf-pulse-v2 .radar{display:none}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-toolbar{display:grid;grid-template-columns:1fr;gap:8px}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-tabs{grid-template-columns:1fr 1fr;width:100%;gap:6px}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-tab{min-height:38px;font-size:13px}
  .s13-dashboard .lf-pulse-v2 .lf-pulse-metrics{grid-template-columns:1fr 1fr;gap:6px}
  .s13-dashboard .lf-pulse-v2 .pulse-metric{padding:9px 8px!important}
  .s13-dashboard [data-open-ri3] b{white-space:normal}
}
@media(max-width:390px){
  .s13-dashboard .lf-pulse-v2 .pulse-metric strong{font-size:12px!important}
  .s13-dashboard .lf-pulse-v2 .pulse-metric small{font-size:11px!important}
}
`;
  document.head.appendChild(style);

  const pulseViews = {
    overview: {
      title: 'OVERVIEW', sub: 'FOUNDRY CURRENT', metrics: [
        ['PROJECT STATE','Published','info'],['CURRENT VECTOR','CORE EXTRACTION','core'],['PARALLEL CURRENT','RI#3 / RI#4','rv'],
        ['RI#2','VERIFIED','ok'],['CORE','4 CONFIRMED','ok'],['PUBLIC SITE','v5.3','info']
      ]
    },
    ri1: {
      title: 'RI#1', sub: 'ARTICLE PRODUCTION', metrics: [
        ['OVERALL','PARTIAL','warn'],['REPOSITORY','VERIFIED','ok'],['LIVE','VERIFIED','ok'],
        ['RUNTIME','NOT EXECUTED','hot'],['CURRENT RV','0 / 3','rv'],['ACCEPTANCE','PENDING','warn']
      ]
    },
    ri2: {
      title: 'RI#2', sub: 'DOCUMENT TRANSFORMATION', metrics: [
        ['OVERALL','VERIFIED','ok'],['ROLE','CORE CONTRIBUTOR','ok'],['ARTIFACT','PASS','ok'],
        ['LIVE ACCEPTANCE','PENDING','warn'],['HUMAN GATE','PENDING','warn'],['PHASE','IMPLEMENTATION VERIFIED','rv']
      ]
    },
    ri3: {
      title: 'RI#3', sub: 'VISUAL ASSET PRODUCTION', metrics: [
        ['DEVELOPMENT','CURRENT','rv'],['LIVE GENERATION','EXECUTED','ok'],['EVIDENCE','21 JOBS','ok'],
        ['GATE PASS','20 / 21','ok'],['HUMAN REVIEW','ACTIVE','rv'],['ACCEPTANCE','PENDING','warn']
      ]
    }
  };

  pulse.classList.add('lf-pulse-v2');
  pulse.innerHTML = `
    <div class="pulse-left"><span>FOUNDRY PULSE</span><svg aria-hidden="true" viewBox="0 0 320 62"><polyline class="pulse-shadow" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline><polyline class="pulse-line" points="0,35 12,35 20,25 30,47 42,32 52,36 63,20 74,44 86,34 100,34 110,27 120,37 132,35 143,18 152,46 162,32 174,34 185,26 196,40 208,34 218,33 228,20 240,44 253,31 265,35 278,26 289,42 301,34 320,34"></polyline></svg></div>
    <div class="lf-pulse-console">
      <div class="lf-pulse-toolbar">
        <div class="lf-pulse-view-label"><small>VIEW</small><strong data-pulse-view-title>OVERVIEW</strong><span data-pulse-view-sub>FOUNDRY CURRENT</span></div>
        <div class="lf-pulse-tabs" role="tablist" aria-label="Foundry Pulse表示切替">
          <button class="lf-pulse-tab" type="button" role="tab" aria-selected="true" data-pulse-view="overview">OVERVIEW</button>
          <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-pulse-view="ri1">RI#1</button>
          <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-pulse-view="ri2">RI#2</button>
          <button class="lf-pulse-tab" type="button" role="tab" aria-selected="false" data-pulse-view="ri3">RI#3</button>
        </div>
      </div>
      <div class="lf-pulse-metrics" data-pulse-metrics></div>
    </div>
    <div aria-hidden="true" class="radar"><i></i><b></b><em></em></div>`;

  let pulseView = 'overview';
  const pulseMetricBox = pulse.querySelector('[data-pulse-metrics]');
  function renderPulse(view) {
    const data = pulseViews[view] || pulseViews.overview;
    pulseView = view in pulseViews ? view : 'overview';
    pulse.querySelector('[data-pulse-view-title]').textContent = data.title;
    pulse.querySelector('[data-pulse-view-sub]').textContent = data.sub;
    pulse.querySelectorAll('[data-pulse-view]').forEach(btn => {
      btn.setAttribute('aria-selected', String(btn.dataset.pulseView === pulseView));
    });
    pulseMetricBox.innerHTML = data.metrics.map(([label,value,tone]) =>
      `<div class="pulse-metric"><small>${label}</small><strong class="${tone||''}">${value}</strong></div>`
    ).join('');
  }
  pulse.addEventListener('click', event => {
    const tab = event.target.closest('[data-pulse-view]');
    if (tab) renderPulse(tab.dataset.pulseView);
  });
  pulse.addEventListener('keydown', event => {
    const tab = event.target.closest('[data-pulse-view]');
    if (!tab || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...pulse.querySelectorAll('[data-pulse-view]')];
    const index = tabs.indexOf(tab);
    const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    renderPulse(next.dataset.pulseView);
  });
  renderPulse('overview');

  /* Cards: RI#1 is formal mainline; RI#3 is now an active parallel build. */
  const ri1Card = projectCards.querySelector('[data-open-ri1]');
  const ri2Card = projectCards.querySelector('[data-open-ri2]');
  if (ri1Card) {
    const mark = ri1Card.querySelector('mark');
    if (mark) mark.textContent = 'MAINLINE';
    ri1Card.addEventListener('click', () => renderPulse('ri1'));
  }
  if (ri2Card) ri2Card.addEventListener('click', () => renderPulse('ri2'));

  const oldRi3Card = [...projectCards.children].find(el => el.textContent.includes('RI#3'));
  if (oldRi3Card) {
    const ri3Card = document.createElement('button');
    ri3Card.type = 'button';
    ri3Card.className = 'project-card active-card';
    ri3Card.dataset.openRi3 = '';
    ri3Card.innerHTML = `<span class="project-icon violet">⬢</span><span><b><em>RI#3</em> 画像制作</b><small>Visual Asset Production /<br>Human Runtime</small></span><mark>VALIDATING</mark><i class="card-trace"></i>`;
    oldRi3Card.replaceWith(ri3Card);
  }

  /* Replace the old static RI#3 future row with a real rail and telemetry drawer. */
  const oldRi3Line = [...board.querySelectorAll('.project-line')].find(el => el.textContent.includes('RI#3'));
  if (oldRi3Line && !oldRi3Line.classList.contains('ri3-line')) {
    oldRi3Line.outerHTML = `
<article class="project-line ri3-line" id="ri3-line">
  <div aria-label="RI#3 画像制作の詳細を開く" class="ri3-rail-row" role="button" tabindex="0">
    <button aria-controls="ri3-telemetry" aria-expanded="false" class="line-toggle" id="ri3-toggle" type="button">
      <span class="line-id"><i>✣</i><b>RI#3</b></span><span class="line-name"><strong>画像制作</strong><small>Visual Asset Production</small></span><span class="line-state">VALIDATING</span><span aria-hidden="true" class="chevron">⌄</span>
    </button>
    <div aria-label="RI#3 画像制作: 実証段階 / Human Review継続中" class="stage-rail ri3-stage-rail">
      <div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment done"></div><div class="rail-segment current"></div><div class="rail-segment"></div>
      <div class="rail-node n1 done"><span></span></div><div class="rail-node n2 done"><span></span></div><div class="rail-node n3 done"><span></span></div><div class="rail-node n4 current"><span class="orb"></span><b class="orb-ring r1"></b><b class="orb-ring r2"></b><b class="orb-ring r3"></b></div><div class="rail-node n5"><span></span></div>
      <div aria-hidden="true" class="energy-beam" style="left:70%"><i></i><b></b><em></em></div>
    </div>
  </div>
  <div aria-hidden="true" aria-labelledby="ri3-telemetry-title" class="telemetry-reveal" id="ri3-telemetry" inert role="region">
    <div class="telemetry-reveal-inner">
      <section class="telemetry-panel ri3-telemetry-panel">
        <div aria-hidden="true" class="panel-grid"></div><div aria-hidden="true" class="panel-noise"></div><div aria-hidden="true" class="panel-scan"></div><div aria-hidden="true" class="edge-trace trace-a"></div><div aria-hidden="true" class="edge-trace trace-b"></div>
        <aside class="operator-card boot-item" style="--boot:0">
          <span class="operator-label">VISUAL OPERATOR</span>
          <div class="operator-art"><img alt="Foundry Visual Operator" src="assets/ri1-operator.webp"/></div>
          <div class="operator-comment"><small>OPERATOR COMMENT</small><p>Human PC上でLive Generation（実画像生成）とEvidence（証拠）採取まで実施。v0.49を基準にHuman Review（人間レビュー）を継続中。CENTER・腕・FULL BODY・CANVAS FILLの生成品質を次版へ持ち越し、Production Acceptance（本番受入れ）は未成立。</p></div>
        </aside>
        <div class="telemetry-main">
          <header class="telemetry-head boot-item" style="--boot:1"><div><p>RI #3 / VISUAL ASSET PRODUCTION</p><h3 id="ri3-telemetry-title">VISUAL TELEMETRY</h3></div><div class="projection-badge"><span></span>PUBLIC PROJECTION</div><button aria-label="RI#3管制盤を閉じる" class="panel-close" data-close-ri3 type="button">×</button></header>
          <div class="status-grid">
            <article class="status-card current boot-item" style="--boot:2"><small>DEVELOPMENT</small><strong>CURRENT</strong></article>
            <article class="status-card green boot-item" style="--boot:3"><small>LIVE GENERATION</small><strong>EXECUTED</strong></article>
            <article class="status-card green boot-item" style="--boot:4"><small>RUNTIME EVIDENCE</small><strong>CAPTURED</strong></article>
            <article class="status-card green boot-item" style="--boot:5"><small>GATE RESULT</small><strong>20 / 21 PASS</strong></article>
            <article class="status-card current boot-item" style="--boot:6"><small>HUMAN REVIEW</small><strong>ACTIVE</strong></article>
            <article class="status-card waiting boot-item" style="--boot:7"><small>PRODUCTION ACCEPTANCE</small><strong>PENDING</strong></article>
          </div>
          <div class="pipeline-block boot-item" style="--boot:8"><p class="micro-title">VISUAL PRODUCTION PROGRESSION</p><div class="ri3-pipeline"><span class="ok">FOUNDATION ✓</span><b>→</b><span class="ok">LIVE ✓</span><b>→</b><span class="ok">EVIDENCE ✓</span><b>→</b><span class="next">HUMAN REVIEW ◎</span><b>→</b><span class="pending">ACCEPTANCE</span></div></div>
          <div class="telemetry-lower">
            <div class="contract-block boot-item" style="--boot:9"><p class="micro-title">CURRENT GENERATION CONTRACT</p><div class="contract-row"><span>Full-canvas Native</span><strong>ACTIVE</strong></div><div class="contract-row"><span>OpenPose-first</span><strong>ACTIVE</strong></div><div class="contract-row"><span>Composite Path</span><strong>DISABLED</strong></div></div>
            <div class="evidence-block boot-item" style="--boot:10"><p class="micro-title">EVIDENCE STATUS</p><div aria-hidden="true" class="evidence-ring"><span>20 / 21</span></div><ul><li><span>Human PC Runs</span><strong>21</strong></li><li><span>Blocking Gate Pass</span><strong>20 / 21</strong></li><li><span>Acceptance</span><strong>PENDING</strong></li></ul></div>
          </div>
          <footer class="telemetry-foot boot-item" style="--boot:11"><span>PUBLIC BOUNDARY</span><p>公開可能なHuman Runtime / Evidence / Review段階だけを表示。Model・Context・内部ID・環境固有識別子は投影しない。</p></footer>
        </div>
      </section>
    </div>
  </div>
</article>`;
  }

  const ri3Line = board.querySelector('.ri3-line');
  const ri3Row = board.querySelector('.ri3-rail-row');
  const ri3Toggle = board.querySelector('#ri3-toggle');
  const ri3Reveal = board.querySelector('#ri3-telemetry');
  const ri3Panel = board.querySelector('.ri3-telemetry-panel');
  const ri3Close = board.querySelector('[data-close-ri3]');
  const ri3Triggers = [...root.querySelectorAll('[data-open-ri3]')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ri3Open = false;
  let bootTimer = 0;
  let guideTimer = 0;

  function closeExistingRiPanels() {
    if (board.classList.contains('ri1-open')) root.querySelector('[data-close-ri1]')?.click();
    if (board.classList.contains('ri2-open')) root.querySelector('[data-close-ri2]')?.click();
  }
  function scrollRi3() {
    if (!ri3Row) return;
    const top = ri3Row.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: reduce.matches ? 'auto' : 'smooth' });
  }
  function openRi3({scroll=true}={}) {
    if (ri3Open) { if (scroll) scrollRi3(); return; }
    closeExistingRiPanels();
    clearTimeout(bootTimer); clearTimeout(guideTimer);
    ri3Open = true;
    board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri1-open','ri2-open','ri3-open','ri-open');
    board.classList.add('ri-open','ri3-open','ri-booting');
    ri3Toggle?.setAttribute('aria-expanded','true');
    ri3Reveal?.setAttribute('aria-hidden','false'); if (ri3Reveal) ri3Reveal.inert = false;
    root.querySelectorAll('[data-guide-label]').forEach(el => el.textContent = 'RI#3 GUIDE');
    root.querySelectorAll('[data-current-stage]').forEach(el => el.textContent = 'VALIDATION');
    requestAnimationFrame(() => requestAnimationFrame(() => board.classList.add('ri-energized')));
    guideTimer = window.setTimeout(() => board.classList.add('guide-open-ready'), reduce.matches ? 0 : 620);
    bootTimer = window.setTimeout(() => board.classList.remove('ri-booting'), 1250);
    renderPulse('ri3');
    document.dispatchEvent(new CustomEvent('lf:ri3-opened'));
    if (scroll) window.setTimeout(scrollRi3,90);
  }
  function closeRi3({focusToggle=true}={}) {
    if (!ri3Open) return;
    ri3Open = false;
    clearTimeout(bootTimer); clearTimeout(guideTimer);
    board.classList.remove('guide-open-ready','ri-energized','ri-booting','ri3-open','ri-open');
    ri3Toggle?.setAttribute('aria-expanded','false');
    ri3Reveal?.setAttribute('aria-hidden','true'); if (ri3Reveal) ri3Reveal.inert = true;
    if (focusToggle) window.setTimeout(() => ri3Toggle?.focus({preventScroll:true}), reduce.matches ? 0 : 300);
  }

  ri3Toggle?.addEventListener('click', e => { e.stopPropagation(); ri3Open ? closeRi3({focusToggle:false}) : openRi3({scroll:true}); });
  ri3Row?.addEventListener('click', e => { if (e.target.closest('#ri3-telemetry')) return; ri3Open ? closeRi3({focusToggle:false}) : openRi3({scroll:true}); });
  ri3Row?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ri3Open ? closeRi3({focusToggle:false}) : openRi3({scroll:true}); } });
  ri3Close?.addEventListener('click', e => { e.stopPropagation(); closeRi3({focusToggle:true}); });
  ri3Triggers.forEach(t => t.addEventListener('click', () => openRi3({scroll:true})));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && ri3Open) { e.preventDefault(); closeRi3({focusToggle:true}); } });
  document.addEventListener('lf:ri1-opened', () => { if (ri3Open) closeRi3({focusToggle:false}); renderPulse('ri1'); });
  document.addEventListener('lf:ri2-opened', () => { if (ri3Open) closeRi3({focusToggle:false}); renderPulse('ri2'); });

  /* Pulse follows detail-card intent, but Pulse tabs alone never open a drawer. */
  root.querySelectorAll('[data-open-ri1]').forEach(el => el.addEventListener('click', () => renderPulse('ri1')));
  root.querySelectorAll('[data-open-ri2]').forEach(el => el.addEventListener('click', () => renderPulse('ri2')));

  /* Public projection fallback may be replaced later by a generated RI#3 JSON. Until then these are
     deliberately presentation-safe Human+ChatGPT Current facts, not a new SSOT. */
})();

/* LF-RI3-DASHBOARD-HOTFIX-END v1 */
