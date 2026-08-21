# DM-20260821-003 RI #1 Freeze / Cross-RI Evidence / Foundry Core Transition

## Metadata

* ID：`DM-20260821-003`
* Date：2026-08-21
* Status：Working Model / Transition Note / Not Architecture SSOT
* Classification：Development Model / Cross-RI Evidence / Foundry Core Extraction / Human-AI-CODEX Operating Boundary
* Scope：Local AI Foundry全体
* Related Evidence：
  * `WD-20260821-001`
  * RI #1 Historical Runtime / Freeze Evidence
  * RI #2 Documentation Production Evidence
  * RI #3 Visual Asset Production Evidence
  * RI #4 Research-Grounded Long-form Content Production Evidence
  * Cross-RI Internal Reflection
  * Human + ChatGPT → CODEX Handoff / Formal Reflection / Terminal Report実績
* Related Series：Season 2 Final / Season 3構想

## 1. Purpose

Local AI Foundryは、Article Production（記事制作）を一つのWorkflowとして完成させるProjectから始まった。

その後、Article ProductionをReference Implementation #1（RI #1）として位置付け直し、Documentation Production（文書制作）、Visual Asset Production（ビジュアル制作）、Research-Grounded Long-form Content Production（調査根拠付き長文制作）という異なる業務へAI Delegation（AIへの仕事委譲）を広げてきた。

2026-08-21時点では、ProjectのCurrent Vector（現在の方向）は次へ移っている。

```text
RIを増やす
        ↓
ではない

異なるRIでEvidenceを得る
        ↓
繰り返し必要になるControl Structureを比較する
        ↓
再利用可能なものだけをFoundry Core Candidateとして育てる
        ↓
EvidenceとHuman Decisionが揃ったものをFoundry Coreへ昇格する
```

本メモは、このTransition（移行）をDevelopment Model上のWorking Model（作業仮説）として整理する。

ここで記録する内容は、Current Project Stateの正本でも、採用済みArchitectureの代替でもない。

正式なProject State、RI状態、Core定義、ArchitectureはInternal Documentation / ADR等を正本とし、本メモでは「なぜその方向へ進んだか」「どの考え方が成立しつつあるか」「何をまだ確定していないか」を残す。

---

## 2. Observed Facts

### 2.1 RI #1は完遂ではなくFreezeを選んだ

RI #1 Article Productionは、Fresh Formal RV-01直前のClean Stopまで到達していた。

しかしFresh Formal RV-01は実行しなかった。

Human Decision（人間判断）により、RI #1は

`FROZEN / HISTORICAL BENCHMARK`

として保持された。

この判断では、Runtime Acceptance（実行受入れ）を完了済みに書き換えていない。

Historical Correct-Contract Formal RV-01の`FAILED` Evidenceも削除していない。

Fresh Formal RV-01は`NOT EXECUTED`のまま残す。

したがって、RI #1のFreezeは次のどれでもない。

```text
Freeze
≠
Failed
≠
Deleted
≠
Runtime Accepted
```

RI #1は、Current Mainlineとして追加Runtimeを進めない一方、Cross-RI比較に利用できるHistorical Benchmarkとして残った。

### 2.2 RI #2〜RI #4が具体的な比較Evidenceを持つようになった

2026-08-10の再位置付け時点では、RI #1 Article ProductionとRI #2 Documentation Productionを主な比較対象とし、RI #3はFuture / Undefinedだった。

その後、異なる業務領域で実装・Runtime・Human Review Evidenceが増え、少なくとも次の四つのReference Implementationを比較できる状態になった。

```text
RI #1
Article Production

RI #2
Documentation Production

RI #3
Visual Asset Production

RI #4
Research-Grounded Long-form Content Production
```

重要なのはRI数ではない。

同じFoundry的な制御が、異なるTask Domain（業務領域）でも再び必要になるかを比較できるEvidenceが増えたことである。

### 2.3 最初のConfirmed Foundry Coreが成立した

Cross-RI Evidenceの整理により、

`FC-CORE-001 Runtime Capability Calibration`

が最初のConfirmed Foundry Core Capabilityとなった。

その中心ルールは次である。

```text
Current Runtime Capabilityを観測・測定する
        ↓
Evidence-backed Effective Capabilityを決定する
        ↓
Downstream ProcessingへBindingする
```

AI Model、Runtime、Hardwareの能力を静的Configurationや推測だけで決めない。

Current Runtimeを実測し、そのEvidenceに基づくEffective Capability（実効能力）をDownstreamへ渡す。

このCapabilityはRI #2のContext Capability Calibrationで具体化された。

ここで重要なのは、RI #2の個別実装をそのままCoreへ移したのではなく、

「Runtime能力をEvidenceで確定し、下流処理へBindingする」

という再利用可能なControl Ruleとして抽出したことである。

### 2.4 他の共通PatternはまだCore Candidateである

Cross-RI比較では、他にも共通して見えるPatternが存在する。

例：

* Human Authority Boundary（人間権限境界）
* Contract-driven Delegation（契約駆動の委譲）
* Deterministic Gate Framework（決定論的Gate）
* Technical Gate / Human Acceptance Separation（技術判定と人間受入れの分離）
* Review Integrity / Review Convergence
* Evidence / Observability
* Human-facing Control Surface（人間向け操作面）
* Runtime / Processing Adapter Boundary

しかし、共通して見えることとConfirmed Coreであることは同じではない。

```text
Observed in multiple RIs
        ↓
Core Candidate

Core Candidate
        +
Sufficient Evidence
        +
Human Decision
        ↓
Confirmed Core
```

2026-08-21時点でConfirmed Coreとして扱うのは`FC-CORE-001`だけである。

---

## 3. Working Hypothesis 1 — Reference Implementationは完成品ではなくEvidence Sourceである

### 3.1 Old mental model

Article Production中心だった時期は、一つのWorkflowを完成させることがProjectの前進とほぼ重なっていた。

この見方をそのまま複数RIへ拡張すると、

```text
RI #1を完成
↓
RI #2を完成
↓
RI #3を完成
↓
RI #4を完成
```

という「完成品を増やすProject」になりやすい。

しかし現在のEvidenceでは、それがFoundry Core Extractionの目的とは一致しない。

### 3.2 Current working model

Reference Implementationは、特定業務でAI Delegationを成立させる実装であると同時に、Foundry Controlを検証するEvidence Sourceとして扱う。

```text
Domain Task
        ↓
Reference Implementation
        ↓
Failure / Runtime / Human Review / Evidence
        ↓
Reusable Control Signal
        ↓
Cross-RI Comparison
```

RI固有の実装品質は重要だが、それだけがProject Goalではない。

異なるRIで同じControl Concernが再発するかを観測し、再利用可能性をEvidenceで判断する。

### 3.3 Consequence

この考え方では、RIの価値を「完成したか」だけで評価しない。

例えばRI #1はFresh RVを完遂していない。

それでも、Contract、Binding、Runtime Verification、Human Gate、Publication、Evidence、Freeze Decision等、多数のCross-RI比較材料を残している。

Historical BenchmarkとしてのRI #1は、未完了部分を含んだままFoundry Core Extractionへ価値を持つ。

---

## 4. Working Hypothesis 2 — Core ExtractionはCopyではなくAbstractionである

Foundry Coreは、あるRIで動いたコードやWorkflowをそのまま共通化することではない。

RI固有のMechanism（機構）と、再利用可能なControl Rule（制御規則）を分ける必要がある。

例として`FC-CORE-001`を見る。

RI #2の具体Evidenceには、Local Runtime、Model Context、Allocation Probe、Effective Context等の個別要素が存在した。

しかしCoreとして重要なのは個別値ではない。

```text
Observe / Measure
        ↓
Determine Effective Capability
        ↓
Bind Downstream
```

というControl Structureである。

したがってCore Extractionでは、最低でも次を分ける。

```text
RI-specific Implementation
≠
Reusable Control Rule
≠
Confirmed Foundry Core
```

この分離がないと、Foundry Coreは特定Platform、特定Model、特定UI、特定Workflowの寄せ集めになる。

---

## 5. Working Hypothesis 3 — Technical Gate PASSとHuman Acceptanceは別Capabilityである

RI #3 Visual Asset Productionでは、Technical Gate（技術判定）を通過したArtifactが、そのままHuman Quality Acceptance（人間品質受入れ）へ到達するとは限らないことが明確になった。

これはArticle / Documentation / Research等でも一般化可能性がある。

```text
Technical Gate
- Contract
- Structure
- Required field
- Framing condition
- Runtime completion
        ↓

Human Acceptance
- Purpose fit
- Quality
- Naturalness
- Editorial judgment
- Usefulness
```

Technical GateはHuman Judgmentを代替するものではない。

一方、Human AcceptanceですべてのMechanical Checkを再実施する必要もない。

この分離はCore Candidateとして強いSignalを持つが、本メモではConfirmed Coreへ昇格しない。

追加Cross-RI EvidenceとHuman Decisionを必要とする。

---

## 6. Working Hypothesis 4 — Human + ChatGPT / CODEX分業は「役職」ではなくAuthorityとExecutionで切る

### 6.1 Observed operating pattern

実運用では、Human、ChatGPT、CODEXの役割が次のように分かれ始めた。

```text
Human
- Purpose
- Judgment
- Responsibility
- Authorization
- Acceptance

Human + ChatGPT
- Architecture / Design
- Analysis
- Prototype
- Runtime Proof
- Review
- Evidence Interpretation
- Editorial / Public-native Artifact Creation

CODEX
- Actual Repository Execution
- Formal Implementation
- Repository Verification
- Internal Currentization
- Internal Canonical Sourceに基づくPublic Projection
- Commit / Push / Closure when Human-authorized
```

この分担は、誰が賢いかという比較ではない。

Authority（権限）、Canonical Source（正本）、Side Effect（外部反映）、Repository Responsibility（リポジトリ責務）で切られている。

### 6.2 Handoff loop is operationally proven

Human + ChatGPT側で作業した内容をCODEXへ渡し、Actual RepositoryへFormal Reflectionして戻すFlowが実運用で成立した。

```text
Human + ChatGPT Work
        ↓
Current Working State整理
        ↓
Structured Handoff / Instruction
        ↓
CODEX Repository Reflection / Verification
        ↓
Terminal Report
        ↓
Human + ChatGPT Review / Currentization
```

このFlowにより、Human + ChatGPT側がPrototypeやCross-RI Evidence収集を進めても、後からActual Repositoryへ同期できる基盤が成立した。

ただし、本メモでは特定Handoff SchemaをArchitectureとして確定しない。

現在確認できているのは、Structured Handoff（構造化引継ぎ）によりSemantic Synchronization（意味同期）が実運用で成立したというEvidenceである。

### 6.3 Public responsibility boundary

Public Artifactについても、実運用上の責務境界が見えている。

```text
Internal Canonical Source
        ↓
Public Projection
→ CODEX execution scope candidate
```

一方、

```text
NOTE
Official Website
Editorial Content
Creative / Presentation Artifact
```

のようにHuman + ChatGPTがPublic向けにゼロから作るPublic-native Artifactは、Human + ChatGPT側で編集し、HumanがCommit / Publishする。

これは「PublicならCODEX」という分類ではない。

Source Responsibilityで分ける。

```text
Internal SourceがあるPublic Projection
≠
Public-native Artifact
```

この区別はCurrent Operating Boundaryとして記録する。

Foundry CoreのConfirmed Ruleとしては扱わない。

---

## 7. Working Hypothesis 5 — PlatformはCoreではなくAdapter / Processing Planeとして再評価する

Local AI Foundryでは、Dify、n8n、Ollama、ComfyUI、Search等を利用してきた。

これらは重要なRuntime / Workflow / Processing Capabilityを提供する。

しかし、利用していることとFoundry Coreであることは同じではない。

```text
Foundry Control
        ↓
Domain / Runtime / Workflow Adapter
        ↓
Dify / n8n / Ollama / ComfyUI / Search / Future Tool
```

という分離が成立する可能性がある。

同様にFoundryConsoleはHuman-facing Control Surfaceとして強いCandidate Signalを持つが、Foundry Core全体そのものではない。

ただし、このAdapter Architectureは2026-08-21時点ではWorking Directionであり、採用済みArchitectureとして確定しない。

必要なのは、Toolを交換しても同じControl Contract / Gate / Evidence / Human Authorityが維持できるかというEvidenceである。

---

## 8. Current Development Model Transition

ここまでのProject evolutionをDevelopment Modelとして並べると、次のように見える。

```text
Season 1
壊れないAI Workflowを設計する
        ↓
Contract / DTO / Normalize / Retry / Runtime / Documentation

Season 2
壊れない仕組みをどう運用し続けるか
        ↓
Configuration / State / Authority / Source / Binding / Runtime
        ↓
止めることも、運用である

Season 3 Working Direction
AIに仕事を任せる仕組みを作る
        ↓
Reference Implementation
        ↓
Cross-RI Evidence
        ↓
Foundry Core Extraction
```

Season 3の中心問いは、

> 異なる仕事をAIへ委譲したとき、複数のReference Implementationで繰り返し必要になったControl Structureのうち、何をEvidence付きでFoundry Coreへ昇格できるのか。

となる。

このTransitionにより、Projectの評価軸も変わる。

```text
Old
一つのWorkflowを完成させる

Current
異なる業務でControl Structureを検証し、
再利用可能なものをEvidence付きで抽出する
```

---

## 9. What is Confirmed / Candidate / Open

### Confirmed

* RI #1は`FROZEN / HISTORICAL BENCHMARK`として保持される。
* Fresh Formal RV-01は`NOT EXECUTED`である。
* RI #2〜RI #4がCross-RI比較Evidenceを提供する。
* Current Vectorは`Cross-RI Evidence → Foundry Core Extraction`である。
* `FC-CORE-001 Runtime Capability Calibration`はConfirmed Foundry Coreである。
* Human + ChatGPT → CODEXのStructured Handoff / Formal Reflection / Terminal Report Flowは実運用で成立した。
* Public-native ArtifactとInternal Source由来Public Projectionは別責務として扱うCurrent Operating Boundaryがある。

### Core Candidate / Working Hypothesis

* Human Authority Boundary
* Contract-driven Delegation
* Deterministic Gate Framework
* Technical Gate / Human Acceptance Separation
* Review Integrity / Review Convergence
* Evidence / Observability
* Human-facing Control Surface
* Adapter / Processing Plane Boundary
* Human + ChatGPT / CODEX role splitの一般化
* Public Projection Control Pattern

### Open Gap

* Core CandidateをConfirmed Coreへ昇格するEvidence Threshold（証拠閾値）の定義。
* Cross-RI ComparisonをMachine-readableに扱うRegistry / Derived Viewの必要性。
* FoundryConsoleを共通Human Interfaceとしてどこまで一般化できるか。
* Dify / n8n / Ollama / ComfyUI / Search等のAdapter責務確定。
* Evaluation / Regression / Continuous Assuranceとの接続。
* Risk-proportional Authorizationの実証。
* Handoff FormatをReusable ContractとしてどこまでFormalizeするか。

---

## 10. Guardrails

このWorking Modelを利用する際は、次を守る。

### 10.1 RI数をKPIにしない

RIを増やすこと自体をProgressとして扱わない。

新しいRIは、異なる業務でControl Structureを検証する意味がある場合に作る。

### 10.2 CandidateをCoreへ先取りしない

複数RIで似たPatternが見えても、自動的にCoreへ昇格しない。

EvidenceとHuman Decisionを必要とする。

### 10.3 Historical Evidenceを書き換えない

Project Purposeが変わっても、過去の`FAILED`、`PENDING`、`NOT EXECUTED`を現在都合で`PASS`へ変換しない。

### 10.4 Current ToolをArchitectureへ固定しない

Dify、n8n、Ollama、ComfyUI、FoundryConsole等、現在利用しているTool / UIをFoundryそのものとして固定しない。

### 10.5 Human-DirectedをHuman-operatedへ戻さない

HumanはMeaning / Risk / Authority / Acceptanceを保持する。

Approved Scope内のMechanical ContinuationまでHuman Gateへ戻し続けない。

### 10.6 CODEXへすべてのPublic Artifactを委譲しない

CODEXのPublic Execution Scopeは、Internal Canonical SourceからPublic ProjectionするArtifactを中心とする。

NOTE、Official Website、Editorial / Creative Artifact等のPublic-native ArtifactはHuman + ChatGPT側で制作・編集し、Humanが反映する。

---

## 11. Season 3へのHandoff

Season 3では、RI #1〜RI #4を単純に順番紹介するだけでは不十分である。

各RIで何を作ったかより、

```text
どの仕事をAIへ任せたか
        ↓
どこで壊れたか
        ↓
どのControlが必要だったか
        ↓
別のRIでも再発したか
        ↓
Core Candidateか
        ↓
Confirmed Coreへ昇格できるか
```

を中心に扱う。

現時点のWorking Outlineは`30-article-incubator.md`を正本とする。

本メモはSeason 3本文の正本ではなく、Season 3を支えるDevelopment Model上のTransition Evidenceとして利用する。

---

## 12. Related Notes

* [WD-20260821-001 RI #1を止め、Cross-RI Evidenceへ進んだ](../war-diary/WD-20260821-001-ri1-freeze-cross-ri-foundry-core-transition.md)
* [DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap](DM-20260808-001-ai-native-development-target-and-capability-gaps.md)
* [DM-20260815-002 Human-Directed FoundryにおけるContract ClosureとDeterministic Control Boundary](DM-20260815-002-contract-closure-and-deterministic-control-boundary.md)
* [NOTE記事インキュベータ](../30-article-incubator.md)
