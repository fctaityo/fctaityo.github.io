# Local AI Foundry 開発ログ — Season 4 Working Plan

Status: `CURRENT WORKING PLAN / STRUCTURE NOT FROZEN`

NOTE Publicationの共通規約は[`NOTE Publication Contract`](note-publication-contract.md)に従う。本PlanはSeason 4のテーマ、順序、候補を管理し、Project Currentや公開済み状態を確定しない。

## Season 4構想：Operational Learning / Continuous Assurance

Season 4は、Season 3で設計したDelegation / Control Structureを前提条件として要求する続編ではない。
単体でも読めて、単体商材でも最初のDoneまで到達できることを維持する。
そのうえで、Season 3で作成したArtifactを持っている読者は、それをOptional Inputとして再利用できる設計にする。

Season 3が「AIへどう仕事を任せるか」を扱うのに対し、Season 4は「任せた結果からどう学び、壊さず、次の実行を良くするか」を扱う。
Continuous AssuranceはSeason 4の一要素として保持し、Evaluation / Regression / Recovery / Observability / Evidence-to-Knowledgeを一つの運用ループとして扱う。

## Current Project Basis

Current Projectは、RI#5 Evidence FoundationをProtected Baseとして、RI#4 Evidence-Driven Runtime Hardeningへ進んでいる。
Season 4はこのActual Evidenceを基礎にするが、未成立の将来機能や独自理論を先に完成したものとして書かない。

Currentで観測できている主要な接続候補：

```text
Execution
→ Evidence
→ Failure / Outcome Classification
→ Knowledge Candidate
→ Regression / Recovery / Re-evaluation
→ Next Execution
```

## Season 3との境界

### Season 3

**Design / Delegation**

* Human / Machine Boundary
* Human-facing Control Surface
* Research Quality
* Cross-RI Core Extraction
* Model / Role Assignment
* Contract / Gate

### Season 4

**Operate / Learn / Improve**

* Failure Patternの蓄積
* EvidenceからKnowledgeへの昇格
* Anti-Regression
* Current / Historical / Candidate Knowledge Boundary
* Recovery / Rollback / Re-run
* Baseline Protection
* Continuous Evaluation / Outcome Verification

Canonical Separation：

**Season 3は「どう任せるか」。Season 4は「任せた結果をどう次へ活かすか」。**

## 中心となる問い

* AI Workflowは、前回のExecution結果から何をFormal Knowledgeとして残せるのか。
* Log、Evidence、Knowledge、Memoryをどう区別するのか。
* 改善変更が既存の正常Behaviorを壊していないことをどう確認するのか。
* Failure時に、どこまでMachineで原因特定・Recovery・Re-runできるのか。
* 過去の良好状態とCurrentをどう分け、いつBaselineを更新するのか。
* 設計、Publish、Runtime Verificationを通過したAI Systemが、目的を満たし続けていることをどう継続的に確認するのか。

## Working Theme

* Evidence Foundation
* Evidence-to-Knowledge
* Failure Pattern / Failure Family
* Formal Knowledge Boundary
* Anti-Regression
* Last Accepted Baseline
* Protected Behavior / Protected Concept
* Regression Evaluation
* Runtime Observability
* Recovery / Rollback / Re-run
* Execution Provenance
* Current / Historical / Candidate Separation
* Outcome Verification
* User / Outcome Feedback
* Risk-based Authorization
* Continuous Assurance

## Season 4 Free / Paid Working Principle

Season 3と同じく、無料読者からStory Closureを取り上げない。

Canonical Principle：

**結果は無料。再現方法が有料。**

Season 4のPaid Practical Layerは、設計資料の焼き直しではなく、運用中に継続利用できるArtifactを優先する。

候補例：

* Ledger
* Operations Workbook
* Baseline Registry
* Regression Board
* Recovery Playbook
* Evidence Intake / Promotion Worksheet

## Standalone Completion Rule

Season 4の各Paid Productは、過去商品を一切購入していない読者でも単体で最初のDoneまで到達できなければならない。

```text
S4 Product alone
→ STARTER INPUTを内包
→ First Doneまで完結

S3 Artifact available
→ Optional Inputとして再利用
→ 入力作成を短縮 / 深度を上げる
```

**Season 3商品を必須Dependencyにしない。Season 3商品がある場合はBoostとして機能させる。**

各有料記事では次を明示する。

1. この商品は単体で使用できる。
2. Season 3商材購入は必須ではない。
3. 再利用できるSeason 3 Artifactがある場合は、その対応先を示す。
4. 関連するSeason 3記事へのリンクをPublication時に実URLで掲載する。
5. 存在しない記事URLや未公開Artifactへのリンクを先に作らない。

## Working Outline

以下はCurrent Working Outlineであり、Actual EvidenceとHuman Editorial Decisionにより変更できる。

| 話 | Working Title | 基本 | Paid Product / Artifact Candidate |
| --- | --- | --- | --- |
| 01 | AIは、前回の失敗を覚えていなかった | 無料 | なし |
| 02 | ログを残しただけでは、経験にはならない | 無料 | なし |
| 03 | 成功より、失敗の方が役に立った | 無料 + 有料 | Failure Pattern Ledger Pack |
| 04 | Evidenceを、次の実行へ戻す | 無料 + 有料 / 有料主力候補 | Evidence-to-Knowledge Operations Pack |
| 05 | 同じ失敗を二度させない | 無料 + 有料 / 有料主力候補 | Anti-Regression Design / Operations Pack |
| 06 | 過去の正解も、今は正解とは限らない | 無料 | なし / Current-Historical境界をStoryで閉じる |
| 07 | AIの記憶を、そのまま信用しない | 無料 + 有料 | Formal Knowledge Boundary Pack |
| 08 | 知識が増えたら、判断は良くなるのか？ | 無料 | S4-04との接続候補 |
| 09 | 失敗したWorkflowを、自分で立て直せるか | 無料 + 有料 / 有料主力候補 | Workflow Recovery Playbook |
| 10 | 改善したつもりで、前より壊れた | 無料 + 有料 | Baseline & Regression Workbook |
| 11 | 経験を、別のAI Workflowでも使えるか | 無料 | Cross-Workflow Knowledge Transfer |
| 12 | Local AI Foundryは、学習する工場になれるか | 無料フィナーレ | Season 4 Bundle候補 |

## Paid Artifact Working Catalog

Current Candidate。商品名、価格、販売単位、添付FormatはHuman Editorial Decisionで確定する。

* Failure Pattern Ledger Pack
* Evidence-to-Knowledge Operations Pack
* Anti-Regression Design / Operations Pack
* Formal Knowledge Boundary Pack
* Workflow Recovery Playbook
* Baseline & Regression Workbook
* Local AI Foundry — Evidence & Continuous Improvement Bundle

## Season 3 Optional Input Map

Season 3商品は必須ではない。持っている場合のみ、次のようにOptional Inputとして利用できる可能性がある。

| Season 4 Candidate | Optional Season 3 Input |
| --- | --- |
| Failure Pattern Ledger Pack | Human Check / Research Qualityで得たFailure・Review記録 |
| Evidence-to-Knowledge Operations Pack | Research Quality Design Pack / Cross-RI Evidence Matrix |
| Anti-Regression Pack | Contract / Gate Artifact、Human CheckのAcceptance Boundary |
| Formal Knowledge Boundary Pack | Cross-RI Evidence MatrixのEvidence / Candidate区分 |
| Workflow Recovery Playbook | Model / Role AssignmentのHandoff / Fallback情報 |
| Baseline & Regression Workbook | Contract / Gate、Model / Role Assignmentの成立条件・Current Assignment |

詳細なS3商品状態は[`season-3-plan.md`](season-3-plan.md)をCanonicalとする。

## Cross-Season Backlog Intake

Season 4へ接続可能な既存Backlog Candidateは、[`cross-season-backlog.md`](cross-season-backlog.md)からEvidenceと昇格条件を引き継ぐ。

特に接続しやすい候補：

* Difyのバージョンアップで契約が壊れた日 — Platform Drift / Compatibility / Regression
* Hashが合ってもEvidenceは壊れる — Evidence Integrity / Provenance
* Reviewは、どこで終わるのか — Review Convergence / Evidence Set Boundary

Backlog Candidateは、面白そうという理由だけでWorking Outlineへ先取り昇格しない。

## 到達候補

* Log保存とKnowledge化を分離する。
* Evidenceを次回Executionへ再利用できるFormal Inputへ昇格する。
* Contractどおりであることと、成果として良いことを分離して測定する。
* Runtime Verificationを一回のGateで終わらせず、ObservabilityとFeedbackへ接続する。
* 改善変更からLast Accepted / Protected Behaviorを守る。
* 壊れた場合に既知の良好状態へ戻す、または安全に再実行できる能力を持つ。
* AIの自律範囲をRiskに比例させ、Human Authorizationを必要な場所へ集中させる。

## 昇格条件

Season 4を正式シリーズとして固定する前に、少なくとも次を確認する。

* RI#4 / RI#5を含むActual Runtime / Outcome / Evidenceの蓄積がある。
* 複数RunのTraceとOutcomeを比較できる。
* Failure / Regression / Recoveryのうち複数について実Project Evidenceが存在する。
* EvidenceからKnowledge、またはKnowledgeから次回ExecutionへのBindingについてActual事例が存在する。
* Season 3のStory Closureと重複せず、Season 4独自の運用・改善テーマとして説明できる。

## Editorial Guard

* 未成立の自動学習機能を「Foundryが自分で学習した」と書かない。
* MemoryとFormal Knowledgeを混同しない。
* Historical EvidenceをCurrent Successへ書き換えない。
* Regression PreventionとTechnical Gateを同じ商品として再販しない。
* Season 3 Artifactが必要であるかのような販売導線を作らない。
