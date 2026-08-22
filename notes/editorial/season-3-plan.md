# Local AI Foundry 開発ログ — Season 3 Plan

Status: `CURRENT WORKING PLAN / STRUCTURE NOT FROZEN`

## Season 3：AIに仕事を任せる仕組みを作る — Reference ImplementationからFoundry Coreへ

Local AI Foundryは、Article Productionだけを完成させるProjectから、
異なる業務をReference Implementationとして実証し、
そこから再利用可能なControl Structureを抽出・検証する段階へ進んだ。

Phase 3C Human Adoptionは`TERMINAL / PASS`。
FC-CORE-001〜004はConfirmed Coreとなり、
Foundry Core Extractionは次CandidateのEvidence Assessmentへ継続している。

## Current Reference Implementations

* RI #1 — Article Production
  * `FROZEN / HISTORICAL BENCHMARK`
* RI #2 — Documentation Production
  * `IMPLEMENTATION VERIFIED / CORE CONTRIBUTOR`
  * Live Acceptanceは`PENDING`
* RI #3 — Visual Asset Production
  * `RUNTIME VALIDATED / CORE CONTRIBUTOR`
  * FoundryConsoleはHuman-facing Control Surface / Current Implementationであり、RI #3そのものの名称ではない。
  * Production Acceptanceは`NOT REACHED`
* RI #4 — Research-Grounded Long-form Content Production
  * `ACTIVE VALIDATION / CURRENT FRONTIER`
  * Temporal Entity IntegrityはCurrent Package / Capabilityであり、RI #4そのものの名称ではない。

## Current Vector

```text
Cross-RI Evidence
→
Foundry Core Extraction
→
Next Candidate Evidence Assessment / Human Decision Preparation
```

## Confirmed Foundry Core

### FC-CORE-001 Runtime Capability Calibration

AI Model / Runtime / Hardwareの能力を静的値や推測だけで決めず、
Current Runtimeを観測・測定し、Evidence-backed Effective Capabilityを決定して、
その結果をDownstream ProcessingへBindingする。

### FC-CORE-002 Delegation Contract Binding

委譲する仕事は実行前に、必要成果、制約、責任・権限境界、
Handoff条件、失敗条件を明示した識別可能なContractへBindingする。

### FC-CORE-003 Deterministic Technical Gate

定義されたTechnical Control BoundaryではActual ArtifactまたはRuntime Stateを
Machine-checkableな成立条件で評価し、
FAILした状態をTechnical Successとして後段へ流さない。

### FC-CORE-004 Evidence Traceability

Execution、Artifact、Gate、Review、Human Decisionを再構成できるよう、
Evidence identityとBindingを保存し、
Current / Historical / Candidateの区別を保持する。

## Current Strong Candidate

### Review Binding Integrity

Status: `CANDIDATE — STRONG`

RI #4のReview Binding sub-artifact locator等、
残るEvidence locator gapを解消するまでConfirmed Coreへ先取り昇格しない。

## Season 3の中心命題

**RIを増やすことが目的ではない。共通する制御構造を見つける。**

RIはEvidence Generatorであり、各RI固有の実装をそのままCoreへ持ち込まない。

Season 3をRI #1からRI #4までの単純な開発日誌にはしない。
各RIの具体Evidenceを使いながら、
再利用可能なDelegation / Controlの問いへ到達する構成を優先する。

## 中心となる問い

* 異なる仕事をAIへ委譲したとき、複数のReference Implementationで繰り返し必要になった制御構造のうち、何をEvidence付きでFoundry Coreへ昇格できるのか。
* Confirmed CoreとCore Candidateを何によって分けるのか。
* Humanが全Stepを操作せずとも、Purpose / Judgment / Responsibilityを保持したままAIへ仕事を委譲できるのか。
* Runtime / Adapter / UI / Domain ImplementationとFoundry Coreをどう分離するのか。

## Current Operating Evidence

* HumanはPurpose、Judgment、Responsibility、Authorization、Acceptanceを保持する。
* Human + ChatGPTはArchitecture、Design、Prototype、Runtime Proof、Review、Core Candidate整理を進める。
* CODEXはActual Repository上のFormal Implementation、Verification、Currentization、Internal Canonical Sourceに基づくPublic Projection等を担う実行主体として利用する。
* Human + ChatGPTからCODEXへのHandoff / Instruction、CODEXからのTerminal Reportという同期経路は実運用で成立している。
* Public Recovery Bridgeにより、Formal CurrentからChatGPTへCurrentを復元できる。
* NOTEや公式HP等のPublic-native Artifactと、Internal Canonical Sourceから派生するPublic Projectionの責務を混同しない。
* この役割分担自体を、自動的にConfirmed Foundry Coreとして扱わない。

## Working Theme

* Reference Implementation Model
* Cross-RI Evidence
* Foundry Core Extraction
* Core Candidate / Confirmed Core Boundary
* Runtime Capability Calibration
* Delegation Contract Binding
* Deterministic Technical Gate
* Evidence Traceability
* Review Binding Integrity / Review Convergence
* Human Authority Boundary
* Human Decision Boundary / Mechanical Continuation
* Technical Gate / Human Acceptance Separation
* Deterministic Validation
* Evidence / Observability
* Human-facing Control Surface
* Fixed Decision Binding（Working Name）
* Contract Propagation（Working Name）
* Deterministic Control Boundary（Working Name）
* Contract Closure（Working Name / Not Adopted Architecture）
* Adapter / Processing Plane Boundary
* Dify / n8n / Ollama / ComfyUI / Searchの再配置可能性
* Human + ChatGPT / CODEX Handoff
* Evidenceを基にContract / Governanceを後から育てる
* Automationそのものを目的にしない
* Human-directed ≠ Human-operated

## Working Outline

以下はEvidenceの増加に応じて変更できるWorking Outlineであり、題名・順序は未FIXとする。

```text
01 記事を作らないなら、何を作るの？
02 Reference Implementationは完成品ではない
03 別の仕事でも、同じところで壊れた
04 AIに任せる前に、実行環境を測れ
05 Gateを通った。でも、人間はOKを出さなかった
06 画面を作ったら、AIの裏側を見なくて済んだ
07 検索できても、正しい記事になるとは限らない
08 Difyもn8nもComfyUIも、Foundryそのものではない
09 共通していたものだけをCoreへ持っていく
10 AIごとに、得意な仕事を分ければいい
11 やり方を決めすぎない。成立条件を決める
12 Foundry Coreとは何か
```

## 到達候補

* RI固有Implementationと再利用可能なControl Structureを分離する。
* Technical Gate PASSとHuman Acceptanceを分離する。
* Runtime / Adapter CapabilityとFoundry Coreを分離する。
* Core昇格を「便利そうだから」ではなくCross-RI EvidenceとHuman Decisionで判断する。
* FC-CORE-001〜004がなぜConfirmed Coreになったのかを、Originと再利用可能性を含めて説明できる。
* Dify、n8n、Ollama、ComfyUI、Search等をFoundryそのものと決め打ちせず、交換可能なAdapter / Processing Planeとして扱えるか検証する。
* Humanが全Stepを操作しなくても、Authority Boundaryと成立条件を保ったままAIへ仕事を委譲できるOperating Modelを検証する。

## 昇格・構成更新条件

* Season 2を`止めることも、運用である`まで実Evidenceで閉じる。
* RI #1〜RI #4の比較Evidenceを複数のControl Patternについて整理する。
* Confirmed CoreとCore Candidateの違いをEvidence付きで説明する。
* 一つのRIだけで観測されたPatternをCoreへ先取り昇格しない。
* Human Authority Boundary、Technical Gate / Human Acceptance、Evidence / Observability等が異なる業務でどう現れるか比較する。
* Runtime / Workflow / Integration / Domain AdapterとFoundry Coreの責務差を検証する。
* Human + ChatGPT / CODEXの分業を、会話上の役割名ではなく実際のHandoffとFormal Reflection Evidenceから説明する。
* Development Model比較を一次資料ベースで実施し、独自性を先に宣言しない。

## 関連する長期資料

* [DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap](../development-model/DM-20260808-001-ai-native-development-target-and-capability-gaps.md)
* [DM-20260815-002 Human-Directed FoundryにおけるContract ClosureとDeterministic Control Boundary](../development-model/DM-20260815-002-contract-closure-and-deterministic-control-boundary.md)
* [WD-20260821-001 RI #1を止め、Cross-RI Evidenceへ進んだ](../war-diary/WD-20260821-001-ri1-freeze-cross-ri-foundry-core-transition.md)
* [DM-20260821-003 RI #1 Freeze / Cross-RI Evidence / Foundry Core Transition](../development-model/DM-20260821-003-ri1-freeze-cross-ri-foundry-core-transition.md)
