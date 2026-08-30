# Local AI Foundry 開発ログ — Season 3 Plan

Status: `CURRENT WORKING PLAN / STRUCTURE NOT FROZEN`

## Writing / Delivery Gate

Season 3の記事を新規作成・修正する場合は、[`article-style-contract.md`](article-style-contract.md)をCurrent Writing Contractとして先に確認する。

Free / Paid境界、Paid Content候補、Paid Artifactを扱う場合は、
[`paid-content-value-protection-contract.md`](paid-content-value-protection-contract.md)をCurrent Editorial Boundary Contractとして先に確認する。

完成前に次のParagraph Gateを実行し、`PASS`しない記事をHumanへ完成版として渡さない。

```text
python scripts/note_paragraph_lint.py <article.md>
```

Humanへ渡すRepository反映物は、Repository共通Contractの[`HUMAN-CHATGPT-DELIVERY-CONTRACT.md`](../../contracts/HUMAN-CHATGPT-DELIVERY-CONTRACT.md)に従い、GitHub Web Uploadへそのまま投入できる完成済み全文ファイルのWeb Drop-in Packageとする。Installer、Patch適用、手作業Merge、dot / hidden pathを標準Deliveryへ持ち込まない。

## Season 3：AIに仕事を任せる仕組みを作る — Reference ImplementationからFoundry Coreへ

Local AI Foundryは、Article Productionだけを完成させるProjectから、
異なる業務をReference Implementationとして実証し、
そこから再利用可能なControl Structureを抽出・検証する段階へ進んだ。

Phase 3C Human Adoptionは`TERMINAL / PASS`。
FC-CORE-001〜004はConfirmed Coreとなり、
Foundry Core Extractionは次CandidateのEvidence Assessmentへ継続している。

## Free / Paid Editorial Principle

Season 3の有料化は、無料読者から開発物語の結末を取り上げるために行わない。

Canonical Principle：

**結果は無料。再現方法が有料。**

補助原則：

**Story Closureは無料。Implementation Depthは有料。**

無料本文だけで、少なくとも次を理解できる状態を維持する。

* 何を作ろうとしたのか。
* 何が起きたのか。
* どこで壊れたのか。
* 何を発見したのか。
* 何を判断したのか。
* 最終的にどうなったのか。
* 次に何が課題として残ったのか。

有料部分は「結末の続き」ではなく、同じ問題を自分の環境で再現・検証・回避・転用したい読者向けの**Practical Layer（実務層）**として設計する。

Paid候補には、具体Parameter、Threshold、Retry条件、比較条件、Gate条件、Calibration方法、Template、Checklist、Matrix、Sanitized Design Artifact等を含める。

Internal Artifactをそのまま販売しない。
販売用添付資料はPublication Reviewを通した`Paid Public Edition`として作成し、Private情報、Credential、内部識別子、不要なRepository Path、公開不要な未確定情報等を除去する。

## Season 3 Free / Paid Working Map

以下はCurrent Working Planであり、Evidence増加とHuman Editorial Decisionにより変更できる。
`有料主力回`は記事全体を壁の向こうへ置く意味ではなく、**無料のStory Closure + 有料Practical Layer**を強く持つ回を意味する。

| 話 | タイトル | 基本 | Paid Product / Artifact Candidate |
| --- | --- | --- | --- |
| 01 | 記事を作らないなら、何を作るの？ | 無料 | なし |
| 02 | Reference Implementationは完成品ではない | 無料 | なし |
| 03 | 別の仕事でも、同じところで壊れた | 無料 | なし |
| 04 | AIに任せる前に、実行環境を測れ | 無料維持 | 将来のRuntime Calibration実践編を別商品化可能 |
| 05 | Gateを通った。でも、人間はOKを出さなかった | 無料 + 有料 | AIにどこまで任せる？ Human Check Design Pack（販売中 / 1,480円 / 5点セット） |
| 06 | 画面を作ったら、AIの裏側を見なくて済んだ | 無料 + 有料 | AIの裏側を見せない Human-facing Control Surface Design Pack（販売中 / 1,980円 / 5点セット） |
| 07 | 検索できても、正しい記事になるとは限らない | 無料 + 有料 / 有料主力回 | AI検索を鵜呑みにしない Research Quality Design Pack（商品完成 / 2,480円 / 5点セット） |
| 08 | Difyもn8nもComfyUIも、Foundryそのものではない | 無料 | なし。思想を広く見せる |
| 09 | 共通していたものだけをCoreへ持っていく | 無料 + 有料 | Cross-RI Evidence Matrix |
| 10 | AIごとに、得意な仕事を分ければいい | 無料 + 有料 | Model / Role Assignment設計資料 |
| 11 | やり方を決めすぎない。成立条件を決める | 無料 + 有料 / 有料主力回 | Contract / Gate Template Pack |
| 12 | Foundry Coreとは何か | 無料フィナーレ | 詳細BlueprintをSeason 3 Bundle候補とする |

## Season 3 Paid Artifact Working Catalog

Current Candidate / Human-decided Product：

* Runtime Calibration Practice Pack
* AIにどこまで任せる？ Human Check Design Pack（S3-05 / 販売中 / 1,480円 / 5点セット）
* AIの裏側を見せない Human-facing Control Surface Design Pack（S3-06 / 販売中 / 1,980円 / 5点セット）
* AI検索を鵜呑みにしない Research Quality Design Pack（S3-07 / 商品完成 / 2,480円 / 5点セット）
* Cross-RI Evidence Matrix
* AI Delegation / Model Assignment Matrix
* Delegation Contract Starter Kit
* Foundry Core Implementation Blueprint
* Season 3 Design Pack / Bundle

商品名、価格、販売単位、添付FormatはHuman Editorial Decisionで決定する。
Working Candidateを販売確定商品として扱わない。

## Paid Boundary Review

Season 3の記事をHumanへ完成版として渡す前に、Paragraph Gateとは別に次をReviewする。

```text
Fact Accuracy
↓
Publication Boundary
↓
Paid Content Value Protection
↓
Free Story Closure
↓
Free / Paid Boundary Decision
↓
Paid Artifact Candidate Review
↓
Article Style / Paragraph Gate
```

判断の目安：

### FREE

* 開発物語
* 発生した問題
* 結果
* 学び
* 設計原則
* Architecture上の意味
* 次の課題

### PAID CANDIDATE

* 再現可能な具体Parameter
* Threshold
* Retry / Recovery条件
* Context / Runtime tuning
* Gateの具体成立条件
* Before / Afterの詳細比較条件
* 実務Template
* Checklist
* Matrix
* 導入手順
* Sanitized Design Artifact
* 失敗回避の具体Recipe

### NEVER PUBLIC AS-IS

有料ゾーンであっても、Internal Artifactを無加工で公開しない。
Credential、Secret、Private Artifact、公開禁止情報、不要な内部識別子、個人情報、Security-sensitive情報等は販売対象にしない。

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
