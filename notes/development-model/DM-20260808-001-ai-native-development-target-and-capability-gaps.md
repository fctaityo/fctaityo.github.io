# DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap

## Metadata

* ID：`DM-20260808-001`
* Date：2026-08-08
* Status：Working Model / Not Adopted Architecture
* Classification：Development Model / Long-range Direction / Capability Gap Analysis
* Scope：Local AI Foundry全体
* Related Series：Season 1 / Season 2 / Season 3構想 / Season 4構想

## 1. Purpose

Season 1とSeason 2の構成を整理した結果、Local AI Foundryは個別Workflowの改善だけでなく、
**AIを前提とした開発そのもののOperating Model**へ論点が拡張し始めている。

本メモは、この時点で観測できる長期到達像を仮説として固定し、
そこへ到達するために不足しているCapabilityを明示するために作成する。

ここで定義する内容は、採用済みArchitectureでも独自開発手法の宣言でもない。
現時点のProject Evidence、既存notes、外部Best Practiceを突き合わせたWorking Modelであり、
今後の実Runtime、Evaluation、運用事故、復旧、Security検証等のEvidenceにより更新される。

---

## 2. Current Observation

### 2.1 Season 1で成立したもの

Season 1では、AI Workflowを壊れにくくするための設計責務が整理された。

主な要素は次のとおり。

* Contract
* DTO Boundary
* Normalize
* Retry
* Artifact Integrity
* Runtime Review
* Documentation

中心命題は、AIの賢さへ期待するのではなく、
**意味を扱う領域と構造を固定する領域を分け、責任境界を設計すること**だった。

### 2.2 Season 2で成立しつつあるもの

Season 2では、WorkflowそのものからProject全体のControl Planeへ対象が広がった。

主な要素は次のとおり。

* Configuration Management
* Configuration Registration
* Configuration Audit
* Project State
* Project State Current Snapshot
* Active Work Current Snapshot
* Active Baseline
* Human Authorization
* Publication Governance
* Canonical Source
* Repository Reflection
* Published State Verification
* Runtime Verification
* Platform Drift

ここまででLocal AI Foundryは、
「何を作ったか」だけでなく、
「現在どの状態を採用しているか」「何が変わったか」「誰が進めると判断するか」「正本へ反映されたか」
をEvidence付きで扱う方向へ進んでいる。

### 2.3 Current Strength

現時点のLocal AI Foundryは、相対的に**Control Planeが強い**。

特に次の能力は継続的に強化されている。

* Contractによる構造制御
* Configurationの識別と追跡
* Expected / Actual / Driftの分離
* Current StateとWork Recoveryの分離
* Candidate / Activeの分離
* AIによるEvidence準備とHuman Decisionの分離
* Canonical Source保護
* Repository ReflectionとVerify
* Public / Internal / Private責務分離

一方で、Controlできることと、成果として良いことを継続的に証明できることは同じではない。
この差が、次の長期課題として現れている。

---

## 3. Long-range Target

### 3.1 Target Statement

Local AI Foundryの最終到達像は、独自のSDLCを先に宣言することではない。

現時点では、次のような**AI前提のDevelopment Profile / Operating Model**として捉えるのが最も妥当である。

> 人間が目的、責任、Risk Acceptance、採用基準を保持し、AIが実行、検証、Evidence生成を担う。  
> すべての変更が再現可能、測定可能、承認可能、復旧可能であり、AIが自律的に動いても人間が目的・Risk・Evidence・採用状態を支配できる開発環境を作る。

重要な到達条件は次の4つである。

1. Reproducible — 同じ状態を説明・再構成できる。
2. Measurable — 良し悪しを評価できる。
3. Authorizable — 誰が何を承認したかが明確である。
4. Recoverable — 壊れた場合に既知の良好状態へ戻せる。

### 3.2 Target Operating Loop

```text
Purpose / User Need
        ↓
Risk / Acceptance Criteria
        ↓
Contract / Specification
        ↓
Human → AI Work Instruction
        ↓
Agent / Workflow Execution
        ↓
Deterministic Gate
        ↓
Evaluation / TEVV
        ↓
Evidence
        ↓
Risk-based Human Authorization
        ↓
Repository Reflection
        ↓
Deploy / Publish
        ↓
Runtime Observation
        ↓
Outcome / Incident / User Feedback
        ↓
New Evidence
        ↓
Contract / Eval / Governanceを必要な分だけ更新
        ↺
```

このLoopでは、Governanceを最初に完成させるのではない。
実運用で観測されたRisk、失敗、判断不能、復帰不能、品質劣化をEvidenceとして、必要なContractとControlを段階的に追加する。

---

## 4. Proposed Layer Model

### Layer 1 — AI Workflow Engineering

主対象：Season 1

* Contract
* DTO
* Normalize
* Retry
* Artifact Integrity

目的：AIの非決定性を前提に、Stage間の責任境界と構造を固定する。

### Layer 2 — AI Project Control

主対象：Season 2

* Configuration
* Registration
* Audit
* Project State
* Active Work
* Baseline
* Canonical Source
* Repository Reflection
* Publication
* Runtime Verification

目的：Workflowを含むProject全体の状態、変更、正本、承認を制御する。

### Layer 3 — Human-AI Development Operating Model

主対象：Season 3候補

* Human → AI Work Instruction
* Responsibility Boundary
* Human Authorization
* Risk-proportional Authorization
* Evidence-driven Governance Evolution
* Development Model Comparison
* AI RoleではなくProcess / Authorityによる責任分離

目的：AIと人間がどういう責任分担と開発Cycleで仕事をするべきかを整理する。

### Layer 4 — Continuous Assurance

主対象：Season 4以降候補

* Evaluation
* Metrics
* Runtime Observability
* Risk Monitoring
* Security / Privacy
* Recovery
* Execution Provenance
* Drift Detection
* User / Outcome Feedback

目的：設計・公開・Runtime Verificationを通過した後も、システムが目的を満たし続けていることを継続的に確認する。

---

## 5. Capability Gap Analysis

### Gap 1 — Evaluation Framework

#### Current Observation

現在のTest、Contract Gate、Configuration Auditは、主として
「契約どおりか」「期待値と現在値が一致するか」を確認する能力が強い。

しかし、成果物やAgentの振る舞いが**目的に対して良かったか**を継続的に測定する仕組みは未成熟である。

例えば長文生成では、構造PASSだけでは次を保証できない。

* 事実性
* 網羅性
* 指示追従
* 引用品質
* 完走率
* 欠落率
* 再現性
* Latency
* Token / Cost
* Human Quality Judgment

#### Needed Capability

将来的には、少なくとも次の概念が必要になる可能性が高い。

* Evaluation Case
* Evaluation Dataset
* Trial
* Grader
* Trace / Transcript
* Outcome Verification
* Evaluation Baseline
* Regression Suite
* Quality Threshold
* Evaluation Report

#### Important Distinction

Agentが「成功した」と出力したことと、実環境のOutcomeが成功していることは別である。
Workflow SuccessとArtifact Successを分離した既存思想を、Evaluationへ拡張する必要がある。

#### Evidence Required

* 実Runtime実行
* 同一Taskの複数Trial
* Regressionが観測された事例
* Human評価と自動評価の差
* Outcomeを環境状態で確認できるTask

---

### Gap 2 — Risk-based Authorization

#### Current Observation

Human Authorizationの責任分離は成立しつつある。
しかし、どの変更をAIのみで進め、どの変更でHumanを止めるべきかというRisk階層はまだ十分に定義されていない。

#### Problem

成熟後も全変更をHuman承認にすると、Humanが新しいボトルネックになる。
逆に、Risk分類なしで自律範囲を広げると、責任境界が曖昧になる。

#### Needed Capability

例として次のようなRisk-proportionalな扱いが考えられる。

```text
Low Risk
Editorial / reversible local change
→ automated verification後に自動反映候補

Medium Risk
Documentation structure / configuration candidate
→ Review required

High Risk
Active Baseline / Project State / Publish
→ Human Authorization required

Critical
External write / destructive operation / secret access
→ Explicit Human Authorization + stronger evidence
```

これは現時点の採用ルールではなく、今後Evidenceにより設計すべきTarget Directionである。

#### Evidence Required

* Human承認が不要だった低Risk作業の反復実績
* 誤承認時の影響範囲
* Reversibility
* External Side Effect
* Secret / destructive operationの実運用

---

### Gap 3 — Runtime Observability

#### Current Observation

Runtime Verificationは「その時、対象Baselineが実際に動いたか」を確認するGateとして重要である。

しかし本番運用では、Verification後も正しく動き続けているかを観測する必要がある。

#### Needed Capability

* Run ID
* Trace
* Stage / Agent latency
* Model / Model Version
* Token Usage
* Retry Rate
* Gate Failure Rate
* Artifact Failure Rate
* Quality Score
* Runtime Configuration
* Platform Version
* Input / Output Provenance
* Drift Signal

#### Evolution

```text
Runtime Verification
        ↓
Runtime Observability
        ↓
Continuous Assurance
```

#### Evidence Required

Season 2-11のRuntime Evidence成立後、複数Runを通じて観測項目と実際の障害検出能力を評価する。

---

### Gap 4 — Recovery / Rollback

#### Current Observation

Local AI Foundryは「壊さない」「差分を検出する」「Gateで止める」「正本を守る」能力を強化してきた。

一方、成熟した運用では**壊れることを前提に戻せる能力**が必要になる。

#### Needed Capability

* Last Known Good State
* Recovery Point
* Rollback Procedure
* Restore Procedure
* Rollback Verification
* Incident Recovery Evidence
* Recovery Authorization

Active BaselineとHistorical Baselineは、この能力へ発展する土台になり得る。

#### Important Question

Baseline lifecycleへ`Last Known Good`の概念を追加すべきかは、実際のRollback事例が出るまで確定しない。

---

### Gap 5 — Execution Provenance

#### Current Observation

Configuration ManagementによりPrompt、Graph、Runtime設定等の管理は進んでいる。

最終的には、1つのArtifactまたはRuntime Outcomeから、
「何を使って生成されたか」を逆引きできる必要がある。

#### Target Traceability

```text
Artifact / Outcome
 ├─ Workflow Revision
 ├─ Graph Hash
 ├─ Prompt Revision
 ├─ Model
 ├─ Model Version
 ├─ Node Parameters
 ├─ Runtime Config
 ├─ Platform Version
 ├─ Input Dataset / Source
 ├─ Dependency Version
 └─ Evaluation Result
```

#### Evidence Required

* Runtime Run IDとConfigurationの紐付け
* Platform Drift発生時の再現試験
* 同一Artifactの再生成可能性

---

### Gap 6 — Security / Privacy

#### Current Observation

Security / PrivacyはこれまでLocal AI Foundryの中心テーマではなかった。
しかしAgentがTool、File、Shell、Network、GitHub Write、API、Secretへアクセスするほど、開発Controlとは別のSecurity責務が必要になる。

#### Needed Capability

* Least Privilege
* Tool Allowlist
* Read / Write Boundary
* Secret Management
* Sandbox
* External Input Trust Boundary
* Prompt Injection対策
* Data Exfiltration対策
* Dependency / Supply Chain確認
* Security Audit Log

#### Direction

Securityを既存Governanceへ無制限に詰め込むのではなく、
既存SDLCへSecure Development Practiceを重ねる考え方を参考に、独立した横断Profileとして適用できる形を検討する。

---

### Gap 7 — Human Responsibility Boundary

#### Current Observation

現在は、AIがEvidenceを準備し、人間が採用・却下・Publish・Acceptance等を判断する分担が成立し始めている。

将来AIの能力が上がった場合でも、
「AIができないからHumanを残す」という境界は長期的には成立しない。

#### Core Question

**AIが実行可能かではなく、最終責任を誰へ帰属させるべきか。**

#### Target Distinction

```text
Technical Verification
→ AI実行可能

Evidence Aggregation
→ AI実行可能

Candidate State Proposal
→ AI実行可能

Business Acceptance
→ Human Responsibility

Risk Acceptance
→ Human Responsibility

External Publication / irreversible authorization
→ Human Responsibilityまたは明示的に委譲されたAuthority
```

この考え方は単なるHuman in the Loopより、
**Human Responsibility Boundary**として整理した方が本質に近い可能性がある。

---

## 6. External Best Practice Alignment

本Working ModelはLocal AI Foundry固有の経験だけから「独自手法」を主張しない。
既存Best Practiceとの共通点と不足を確認する。

### 6.1 NIST AI Risk Management Framework

NIST AI RMFは、AI Risk Managementを`GOVERN / MAP / MEASURE / MANAGE`の4機能で整理し、Lifecycle全体で継続的に実施する考え方を示している。
また、MEASUREでは定量・定性のMetrics、Testing、Benchmarking、Monitoringを扱い、MANAGEではRiskの優先順位付け、対応、Recovery、継続改善を扱う。

Local AI Foundryとの対応は現時点で次のように見える。

* GOVERN：比較的強い
* MAP：Project State、Configuration、Boundaryの整理により成長中
* MEASURE：不足が大きい
* MANAGE：Controlは進んでいるがRisk-based優先順位、Recovery、Continuous Monitoringは不足

この対応は正式評価ではなく、Capability Gapを見るための比較仮説である。

Reference：NIST AI RMF 1.0 / AI RMF Core  
https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

### 6.2 NIST Secure Software Development Framework

NIST SSDFは、独自のSDLCを置き換えるのではなく、各SDLCへ高水準のSecure Development Practiceを統合する考え方を採る。

これはLocal AI Foundryが「新しい開発手法を名乗る」より、
既存SDLCへ重ねられるAI-Native Development Profileとして整理する方が強い可能性を示唆する。

Reference：NIST SP 800-218 SSDF  
https://csrc.nist.gov/pubs/sp/800/218/final

### 6.3 DORA 2025

DORA 2025は、AI利用が既存の組織・開発システムを自動的に改善するのではなく、既に存在する強みと弱みを増幅するという観測を示している。
強いAutomated Testing、Version Control、Fast Feedback Loop、Platform Engineering等がAI活用の結果を左右する。

これは、AIの能力そのものよりControl、Feedback、Architectureを先に強化してきたLocal AI Foundryの方向性と整合する。

Reference：Google Cloud / 2025 DORA Report announcement  
https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report

### 6.4 Anthropic Agent Evaluations

AnthropicはAgent Evaluationを、Task、Trial、Grader、Trace / Transcript、Outcome、Evaluation Harness、Evaluation Suite等へ分解している。
特にAgentの自己申告ではなく、最終的な環境状態でOutcomeを確認する考え方は、Local AI Foundryの
`Workflow Success ≠ Artifact Success`
という既存原則と接続できる。

Reference：Anthropic, Demystifying evals for AI agents, 2026-01-09  
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

---

## 7. Implication for Future Seasons

### 7.1 Season 3 Working Direction

Season 3は、Season 2の延長としてControl項目を増やすより、
**Human-AI Development Operating Model**を中心に置く方が自然である。

中心となる問いは次のとおり。

> AIと一緒に開発するとき、人間側の仕事、責任、指示、承認、Governanceはどう変わるのか。

候補テーマ：

* AIへの指示は意図ではなく工程で書く
* AIチームは表現であって、設計ではない
* 役職ではなく工程とAuthorityで責任を切る
* Aggregatorが責務を越えると何が壊れるか
* AIだからContractは後から育てられる
* Documentation IAは最初には作れなかった
* 問題が起きるたびにルールを増やすべきか
* Local AI Foundryは既存のどのDevelopment Modelに近いのか
* Human in the LoopではなくHuman Responsibility Boundary

ただし、Season 3の話数、題名、順序はFIXしない。
Season 2の実Evidenceと今後の開発事例を基に`30-article-incubator.md`で育てる。

### 7.2 Season 4 Working Direction

Season 4以降では、Human-AI Operating Modelが成立した後に、
**そのシステムが良く動き続けていることをどう継続的に証明するか**が中心課題になる可能性が高い。

候補テーマ：

* Evaluation Framework
* Regression Evaluation
* Risk-based Authorization
* Runtime Observability
* Recovery / Rollback
* Execution Provenance
* Security / Privacy
* Continuous Risk Monitoring
* User / Outcome Feedback
* Continuous Assurance

Season 4を確定するには、最低でもSeason 2-11以降の実Runtime Evidenceが必要である。
成功結果を先取りして記事構成を固定しない。

---

## 8. What Must Not Be Concluded Yet

現時点では、次を結論として扱わない。

* Local AI Foundryが独自の新しいSoftware Development Methodologyである。
* Agile、Spiral、Kanban、XP、Prototype等より優れている。
* Risk階層が既にFIXしている。
* Evaluation FrameworkのSchemaが確定している。
* Runtime ObservabilityのMetricsが確定している。
* Last Known Good Baselineを正式Lifecycleへ追加すべきである。
* Security Architectureが成立している。
* Season 3 / Season 4の話数と順序が確定している。

独自性は宣言して作るのではなく、既存モデルで説明できない要素が複数のProject Evidenceで繰り返し観測された後に判断する。

---

## 9. Promotion Conditions

このWorking Modelから正式なDevelopment Profile、Architecture、Governanceへ昇格するには、少なくとも次が必要である。

1. Season 2のPublished State VerificationとRuntime Verificationを完了する。
2. Runtimeを複数回実行し、Trace / Outcome / Failureを蓄積する。
3. Evaluation CaseとRegression Suiteを実験的に導入する。
4. Human Authorizationの実例をRisk別に分類できるまで蓄積する。
5. RollbackまたはRecoveryが必要になった実事例を記録する。
6. Execution ProvenanceをArtifactまたはRun単位で追跡する試験を行う。
7. Tool / Secret / External Writeを含むSecurity Boundaryを評価する。
8. Agile、Spiral、Kanban、XP、Prototype等との比較を一次資料ベースで実施する。
9. Local AI Foundry固有に残る差分をEvidence付きで特定する。
10. その差分が再現性のあるPracticeとして説明できるか確認する。

---

## 10. Related Internal Knowledge

* `notes/30-article-incubator.md`
  * Season構成、現在の執筆位置、将来記事候補を管理する。
* `notes/50-random-thoughts.md`
  * Evidence Driven、段階的Governance、Development Model比較等の元仮説を保持する。
* `notes/40-configuration-management.md`
  * Canonical Source、Current Snapshot、Repository Reflectionの実務原則を保持する。
* `notes/99-hall-of-fame.md`
  * 「AIの得意・不得意を理解したら、人間側の設計が変わってきた。」等の長期原則を保持する。

---

## 11. Current Working Conclusion

Local AI Foundryは、現時点では
**制御する能力が先行し、測定する能力と運用後の継続保証が不足している。**

したがって次の成長方向は、Controlを無制限に増やすことではない。

```text
Control
  ↓
Measurement
  ↓
Risk-based Authorization
  ↓
Observability
  ↓
Recovery / Security / Provenance
  ↓
Continuous Assurance
```

その過程で、人間の役割も
「AIができない仕事を代わりに行う人」から、
**目的、Risk、Evidence、採用状態、最終責任をどこへ帰属させるかを決める主体**へ変わっていく可能性が高い。

この仮説は、Local AI Foundry全体の長期テーマとして継続的に検証する。
