# NOTE記事インキュベータ

このファイルは、将来の記事になり得るテーマや構想を蓄積し、
Local AI Foundry開発ログのシリーズ構成と今後の執筆順を管理する。

完成した記事本文そのものや単なる思いつきを保存するのではなく、
調査・検証・構造化する価値があるテーマを育て、
Project Evidenceが揃ったものを正式記事へ昇格させることを目的とする。

## 運用上の責務

このファイルは、NOTE記事本文の正本ではない。

主な責務は次のとおり。

* Local AI Foundry開発ログのSeason構成を管理する。
* 現在の執筆位置と、次に扱うテーマを管理する。
* 各記事の核となる問い、扱う範囲、到達点を定義する。
* War Diary、Bug Zoo、Configuration Management Notes、ADR、Configuration Audit等から、記事化可能なテーマを昇格させる。
* 既存記事と重複する候補は、独立記事として残さず統合先を明示する。
* Projectの進化により前提が変わった場合は、未執筆記事の順序、題名、Scopeを再評価する。

記事本文、公開状態、公開日時、NOTE上の最終表示はNOTE側を正本とする。

このファイルでは、将来展開を管理するために必要な範囲だけを保持する。

---

## 確定シリーズ（Local AI Foundry 開発ログ）

### Season 1：壊れないAI Workflowを設計する

* 01 Local AI Foundry 完全始動！（公開）
* 02 AIは悪くなかった。悪かったのは設計だった。（公開）
* 03 Contract Drivenとは何か？（公開）
* 04 DTOだけを受け渡す理由（公開）
* 05 NormalizeはAIを信用しないためにある（公開）
* 06 Retryは保険ではない（公開）
* 07 すべて直した。それでも終わらなかった。（公開）

  * 副題：Configuration Managementという最後の壁
* 08 Runtimeを見ないレビューはレビューではない（公開）
* 09 Documentationは説明書ではなくUX（公開）

構成の軸：

生成のレイヤーであるContract、DTO、Normalize、Retryから始まり、
Configuration Management、Runtime Review、Documentationへ進む。

AIの出力品質だけを見る段階から、
Workflow全体を設計・検証・運用する段階へ移行する流れを扱った。

01〜09でSeason 1完結。

---

## Season 2：壊れない仕組みをどう運用し続けるか

Season 1では、AI Workflowを壊れにくくするための設計を扱った。

Season 2では、設計されたWorkflowを継続的に変更、検証、同期、公開するための
Configuration Management、Project State Governance、正本管理、Human Authorization、
Publication Governance、Repository Reflection、Runtime Verificationを扱う。

### Current Position

現在の執筆位置は **04 Current Snapshotは進捗表ではない**。

01〜03で、

```text
Configurationを管理対象として定義する
↓
正式にRegistrationする
↓
AuditでExpectedとActualの差を判断可能にする
```

まで進んだ。

04では、その結果を踏まえて、

```text
Project全体はいまどこにいるのか
↓
現在の作業はどこから再開するのか
```

を別責務として扱う。

04以降のCurrent Planは次のとおり。

```text
04 Current Snapshot
↓
05 Active Baseline
↓
06 Human Publish Decision
↓
07 Publication Review / PRR
↓
08 Canonical Source
↓
09 Repository Reflection
↓
10 Published State Verification
↓
11 Runtime Verification
↓
12 Platform Drift
↓
13 Season 2総括
```

未執筆記事の題名とScopeは、Project Evidenceが増えた場合に再評価できる。
ただし、前後記事の責務を重複させず、各記事で一つの主要な問いへ到達することを優先する。

---

### 01 Configurationはコードではない

* 核となる問い：

  * Prompt、Graph、Node Parameter、Runtime設定は、なぜ単なるコード差分として扱えないのか。
* 扱うテーマ：

  * Configuration Item
  * 実効値
  * 宣言値とRuntime値
  * Configuration Drift
  * Configuration Registry
* 記事の到達点：

  * Workflowの挙動を決めるものは、Repository内のコードだけではない。
  * Configurationも識別、登録、検証、追跡の対象である。

### 02 Configuration Registrationとは何か

* 核となる問い：

  * 新しいPrompt、Gate、Graph変更は、いつ正式な管理対象になるのか。
* 扱うテーマ：

  * Registration Candidate
  * Configuration Item ID
  * Owner
  * Status
  * Evidence
  * Pending、Blocked、Verified
* 記事の到達点：

  * 実装されたことと、正式なConfigurationとして登録されたことは別である。
  * 名前、責任者、状態、証拠を持たない変更は追跡できない。

### 03 Auditは犯人探しではない

* 核となる問い：

  * Configuration Auditは、何を判断するために行うのか。
* 扱うテーマ：

  * Baseline
  * ExpectedとActual
  * Drift
  * Blocking Drift
  * Warning
  * Unknown
  * Audit Result
* 記事の到達点：

  * Auditの目的は、人やAIの失敗を責めることではない。
  * 現在値と期待値の差を、Evidence付きで判断可能にすることである。

### 04 Current Snapshotは進捗表ではない

* Current Status：

  * Writing Ready
  * Season 2の現在執筆対象
* 核となる問い：

  * なぜCurrent Snapshotは単なる作業一覧では不十分なのか。
  * Project全体の現在地と、現在作業中の復帰地点は、なぜ同じSnapshotへ入れてはいけないのか。
* 中心となる対比：

  ```text
  Project State Current Snapshot
  ≠
  Active Work Current Snapshot
  ```

* 中心テーマ：

  * Project State Current Snapshot
  * Active Work Current Snapshot
  * Active Initiative
  * Completed Checkpoint
  * Next Action
  * Interrupt Recovery
  * Snapshotごとの更新Trigger
  * 低頻度で変わる正式状態
  * 高頻度で変わる作業断面
* 補助的に扱うテーマ：

  * 30秒Dashboard
  * Current Phase
  * Current Objective
  * Current Blocker
  * Remaining Gate
  * Human Decision
  * Evidence Navigation
* 関連記録：

  * War Diary：`WD-20260802-001`
  * Configuration Management Note：`CM-20260802-002`
  * ADR：`ADR-0012`
  * Configuration Item：`CFG-D005`
  * Configuration Audit：`CFG-20260802-007`
* 記事の到達点：

  * Current Snapshotは「何をしたか」の履歴ではない。
  * Project State Current Snapshotは、Project全体がLifecycle上どこまで到達したかを示す。
  * Active Work Current Snapshotは、現在のInitiativeについて、どこまで完了し、どこから再開するかを示す。
  * Project Stateが変わらない通常作業を`status.md`へ書けば、Project State Snapshotは作業ログ化する。
  * 作業断面をどこにも残さなければ、Interrupt後の復帰性が失われる。
  * 異なる更新Triggerを持つ現在値は、同じArtifactへ混ぜない。
  * Current Snapshotは一つへ集約することより、「何の現在値なのか」を明確にすることが重要である。
* Scope Boundary：

  * Active BaselineのCandidate / Active / Historicalの詳細は05へ送る。
  * Human AuthorizationとPublish承認責任の詳細は06へ送る。
  * AuditのExpected / Actual / Drift判定方法は03へ戻し、04では再説明しない。
  * Active Workを日報、Backlog、全Commit履歴へ拡張しない。

### 05 Active Baselineは「最新」ではない

* 核となる問い：

  * 複数のDraft、Commit、Import結果が存在する中で、何を現在採用中の基準として扱うのか。
* 扱うテーマ：

  * Candidate Baseline
  * Active Baseline
  * Historical Baseline
  * Baseline ID
  * Current Snapshot
  * Transition Evidence
  * 一意性
* 記事の到達点：

  * 最新のものが正本とは限らない。
  * Active Baselineは、「最も新しいもの」ではなく、現在採用されている唯一の基準状態を明示する。
  * Candidateが存在しても、Human DecisionなしにActiveへ昇格してはならない。
  * Baselineは正しさそのものを自動証明するものではなく、何を現在の判断基準として採用しているかを固定する。

### 06 Human Publish Decisionが最後の責任を持つ

* Scope：

  * Dify WorkflowのPublishとProject State Transitionを中心に扱う。
  * Public DocumentationのPublication Governanceは07で扱う。
* 核となる問い：

  * Test、Import、Semantic VerificationがPASSしても、なぜAIだけでPublishを決めてはいけないのか。
* 扱うテーマ：

  * Human Authorization
  * Publish Decision
  * State Transition
  * Entry Condition
  * Evidence
  * Allowed Next State
  * 自己承認の禁止
* 記事の到達点：

  * Evidenceを揃えることと、公開を承認することは別である。
  * AIは状態候補を提示できるが、自分で承認してはならない。
  * 最終的なPublish責任はHuman Decisionに残す。

### 07 PRR――公開物から消える判断を資産化する

* Scope：

  * Public Documentation / WebsiteのPublication Governanceを扱う。
  * Dify Workflow Publishとは区別する。
* 核となる問い：

  * Current Publication Reviewと、公開成果物から確認できなくなる判断履歴を、なぜ別々に管理するのか。
  * Human側のDecision Historyを保持しながら、なぜAI / CODEXのPublication Executionをその履歴Artifactへ依存させてはいけないのか。
* 扱うテーマ：

  * Publication Governance
  * Internal Publication Review Registry
  * Publication Reflection Register（PRR）
  * Current Publication Review
  * Publication Decision History
  * Human-approved Current Publication Decision
  * Publication Execution Contract
  * Human-controlled Decision History
  * non-private Execution Context
  * 採用
  * 不採用
  * 保留
  * Mask
  * Generalization
  * 委譲
  * Public / Internal / Private Boundary
* 関連記録：

  * War Diary：`WD-20260810-002`
  * Bug Zoo：`BZ-20260810-017`
* 記事の到達点：

  * Internal Publication Review Registryは、管理対象ごとの現在有効なPublication Review結果を保持する。
  * PRRは、公開物やGit履歴から確認できなくなる判断だけをPrivate Artifactとして保持する。
  * Current StateとDecision Historyを同じ台帳へ混ぜてはならない。
  * Human側のDecision Historyを保持することと、AI / CODEXの実行条件をその履歴Artifactへ依存させることは別である。
  * AI / CODEXへ渡すのは、現在の実行に必要なHuman-approved Current Publication Decisionとnon-private Execution Contextである。
  * Public Documentationは公開後の姿しか見せないため、消えた判断理由には別の保存責務が必要になる。
  * PRRは形式的に毎回作るものではなく、不採用・保留・Mask・Generalization・委譲等の判断が残る場合に必要となる。

### 08 Canonical Sourceを失った日

* 核となる問い：

  * Partial Sourceを正本として扱うと、なぜ既存内容が失われるのか。
* 扱うテーマ：

  * Single Source of Truth
  * Canonical Source
  * Partial Source
  * 会話履歴
  * 記憶による再構成
  * Full File Replacement
  * Minimal Change
  * Diff Verification
* 関連記録：

  * Bug Zoo：`BZ-20260731-016`
  * Configuration Management Note：`CM-20260731-001`
* 記事の到達点：

  * 一部だけ見えている情報から、ファイル全体を再構成してはならない。
  * 変更前に正本全文を取得し、変更後に差分を確認する必要がある。
  * AIの記憶や会話履歴は、Canonical Sourceの代替にはならない。

### 09 Repository Reflection――「作った」と「反映された」は別

* 核となる問い：

  * 成果物、Audit、Reviewが揃っても、なぜRepositoryへ正しく固定されたことを別途確認する必要があるのか。
  * Reviewを高品質に保ったまま、なぜCorrectionのたびにComplete Semantic Reviewへ戻ってはいけないのか。
  * Review PackageのHashが一致していても、なぜEvidenceの完全性は別途検証しなければならないのか。
* 扱うテーマ：

  * Working Tree
  * Configuration Audit
  * Configuration Report
  * Review Package
  * Review Convergence
  * Complete Semantic Review
  * Semantic Freeze
  * Correction Batch
  * Correction Verification
  * Final Commit Boundary
  * Package Integrity
  * Direct Source Acquisition
  * Source Integrity
  * Truncation Marker Guard
  * Human Review
  * Repository Reflection
  * Commit Authorization
  * Local Commit Verify
  * GitHub Read Verify
  * 期待した変更
  * 意図しない変更
  * 既存内容維持
* 関連記録：

  * Configuration Management Note：`CM-20260802-003`
  * War Diary：`WD-20260810-003`、`WD-20260810-004`
  * Bug Zoo：`BZ-20260810-018`、`BZ-20260810-019`
* 記事の到達点：

  * 成果物を生成したことと、正本へ正しく反映されたことは別である。
  * Human ReviewとCommit Authorizationは別である。
  * One Evidence Setに対するComplete Semantic Reviewは一度で収束させ、Correction Artifactだけを理由にFinding探索を再開しない。
  * Review Packageは内容だけでなくSource取得経路と収録後一致を検証し、表示・転送レイヤ由来の欠落をEvidenceとして固定しない。
  * Hash一致はArtifactが不変であることを示せても、取得元が完全だったことまでは証明しない。
  * Commitが成功したことと、承認Scopeが正しく固定されたことも別である。
  * Repositoryから再取得して確認して初めて、Reflection結果を検証できる。

### 10 Publishして終わりではない

* 核となる問い：

  * DraftをPublishした後、何を確認しなければならないのか。
* 扱うテーマ：

  * Draft Workflow
  * Published Workflow
  * Revision
  * Publish判定
  * Published State Verification
  * Repository / Draft / Published Semantic Verification
  * Project State `Published`
* 記事の到達点：

  * Publish操作は、Published状態への変更操作であって、検証そのものではない。
  * Published Workflowの実体と対象Baselineを再確認して初めて、Published Stateを確定できる。
  * Published State VerificationとRuntime Verificationは別Gateである。

### 11 Runtime Verificationが最後の砦

* Current Evidence State：

  * Project Stateは`Published`まで到達済み。
  * Runtime Verificationは未実施。
  * Runtime Acceptanceは`PENDING`。
  * 本記事は、実Runtime Evidenceが成立した後に最終構成を確定する。
* 核となる問い：

  * Static Test、Import、Semantic Graph一致、Published State Verificationだけでは、なぜ不十分なのか。
* 扱うテーマ：

  * Runtime Verification
  * Raw Output Contract
  * Normalize後DTO
  * Contract Gate
  * 実LLM実行
  * Runtime Evidence
  * Runtime Acceptance
* 記事の到達点：

  * Graphが正しく、Published状態まで一致していても、Runtimeの実出力は契約を破る可能性がある。
  * 実際に動かした結果を確認しない限り、WorkflowのRuntime受け入れは完了しない。
  * Runtime Verificationの実Evidenceが得られるまでは、成功談を先取りしない。

### 12 Difyのバージョンアップで契約が壊れた日

* 核となる問い：

  * Platform側の制約変更は、既存Workflowへどのように影響するのか。
* 扱うテーマ：

  * Dify Version
  * Selector制約
  * Code Node
  * DTO field
  * `finish_reason`
  * Import Compatibility
  * Platform Drift
  * Compatibility Verification
* 記事の到達点：

  * Workflowが昨日動いたことは、今日も動く保証にならない。
  * Platform VersionとPlatform側の制約もConfigurationとして追跡する必要がある。
  * Platform変更時は、既存Workflowの契約と互換性を再確認する。

### 13 Season 2総括：AI開発は状態管理と変更管理になる

* 核となる問い：

  * Workflowが完成に近づくほど、なぜ作業の中心がAI調整から状態管理と変更管理へ移るのか。
* 扱うテーマ：

  * Configuration Management
  * Registration
  * Audit
  * Project State
  * Current Snapshot
  * Active Work
  * Active Baseline
  * Human Authorization
  * Publication Governance
  * Publication Review Registry
  * PRR
  * Canonical Source
  * Repository Reflection
  * Review Convergence
  * Evidence Integrity
  * Published State Verification
  * Runtime Verification
  * Platform Drift
* 記事の到達点：

  * AI Workflow開発の後半で支配的になるのは、Prompt Engineeringだけではない。
  * 何を変更し、どの状態を採用し、何を正本とし、何をEvidenceとして承認するかという状態管理と変更管理である。
  * 壊れないWorkflowを運用し続けるには、WorkflowだけでなくProjectそのものを管理する必要がある。
  * Project全体の正式状態、現在の作業断面、公開判断、Repository Reflection、Runtime Evidenceは別責務として管理する必要がある。
  * ReviewはFindingを増やし続けるためではなく、同じEvidence Setに対する判断を収束させるために設計する必要がある。
  * EvidenceはHashだけでなく、どこから取得し、完全なSourceと一致しているかまで含めて信頼性を判断する必要がある。
  * AIが強くなるほど、人間の仕事は「全部を手で作ること」から「何を正しい状態として採用するかを判断すること」へ移る。

---

## Season 2構成の軸

Season 2は以下の順序で積み上げる。

1. 管理対象を定義する  
   ConfigurationとConfiguration Registration

2. 差分を検出する  
   Configuration AuditとDrift

3. Project全体の現在地を判断可能にする  
   Project StateとProject State Current Snapshot

4. 現在作業中の復帰地点を保持する  
   Active Work Current Snapshot、Active Initiative、Completed Checkpoint、Next Action

5. 採用中の基準を固定する  
   Candidate / Active / Historical Baseline

6. 最終判断の責任を分離する  
   Human AuthorizationとDify Publish Decision

7. 公開判断のCurrent StateとDecision Historyを分離する  
   Internal Publication Review RegistryとPrivate PRR

8. 正本を守る  
   Canonical Source、Minimal Change、Partial Source禁止

9. 承認済み成果物を正本へ固定し、再確認する  
   Repository ReflectionとVerify

10. Published状態を確認する  
    Published State Verification

11. 実動作を確認する  
    Runtime VerificationとRuntime Acceptance

12. 外部変化を管理する  
    Platform Version、Platform Drift、Compatibility

Season 1が「壊れない設計」を扱ったのに対し、
Season 2は「壊れない状態を維持する運用」を扱う。

---

## Season 2昇格条件

各候補は、以下を満たした段階で正式記事へ昇格する。

* 実際のProject Evidenceが存在する。
* 単発事故ではなく、一般化できるテーマになっている。
* 設計、実装、運用、Governanceのどの問題かを区別できる。
* Expected、Actual、原因、判断、結果を説明できる。
* 内部情報を公開用にMaskまたはGeneralizeできる。
* 記事公開後も正本Documentationまたは公開可能なEvidenceへ誘導できる。
* 前後記事と主要な問いが重複していない。
* Evidenceが未成立の将来結果を成功済みとして先取りしていない。

---

## Long-range Series Direction

Season 2以降の長期展開は、現時点では確定シリーズではない。
Project Evidenceが増えるたびに再評価し、独自理論を先に作らない。

詳細な長期到達像とCapability Gapは、
[DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap](development-model/DM-20260808-001-ai-native-development-target-and-capability-gaps.md)
をWorking Modelとして参照する。

### Season 3構想（未FIX）：Human-Directed Foundryはどう成立するのか

2026-08-10のADR-0013 Acceptedとv4.0 Public Documentation同期により、
Local AI FoundryはArticle Production中心のProjectから、HumanがPurpose、Judgment、
Responsibility、Approvalを保持し、複数業務をReference Implementationとして実証する
Human-Directed Foundryへ正式に再位置付けされた。

現時点ではArticle ProductionをRI#1、Documentation ProductionをRI#2として扱う。
複数RIで観測された共通Control PatternはCore Candidateであり、Foundry Coreは未確定である。
RI#3はFuture / Undefinedのまま維持する。RI#2の比較EvidenceはFoundry Core確定や
Project Runtime Verificationを意味しない。

* 中心となる問い：

  * 異なる業務をAIへ委譲するとき、Human Authorityを維持しながら、どのControl Patternを再利用可能なものとして検証できるのか。
* Working Theme：

  * Human-Directed Foundry
  * Human-AI Development Operating Model
  * Reference Implementation Model
  * RI#1 Article Production / RI#2 Documentation Production
  * Core Candidate / Foundry Core Boundary
  * Human Authority Boundary
  * Automationそのものを目的にしない
  * Review Convergence / Semantic Freeze
  * Evidence Integrity / Direct Source
  * AIへの指示は意図ではなく工程で書く
  * AIチームは表現であって、設計ではない
  * 役職ではなく工程とAuthorityで責任を切る
  * Aggregator等の責務境界
  * Evidenceを基にContract / Governanceを後から育てる
  * Documentation IAは最初には作れなかった
  * 問題が起きるたびにルールを増やすべきか
  * Agile / Spiral / Kanban / XP / Prototype等との比較
  * Human in the LoopではなくHuman Responsibility Boundary
* 到達候補：

  * Automationそのものを目的にせず、人間が責任を持つ成果と判断を支援するためにAIへ業務を委譲する。
  * Article ProductionをProject全体定義へ固定せずRI#1として維持し、RI#2との比較EvidenceからCore Candidateを検証する。
  * 共通Patternが観測されてもFoundry Coreを先に確定せず、複数RIのEvidenceと独立したHuman Decisionを必要とする。
  * AIがEvidence準備、Technical Verification、Candidate State Proposalを担い、HumanはPurpose、Judgment、Responsibility、Approvalを保持するモデルを検証する。
  * ReviewとEvidenceの品質を落とさずに工程を収束させるControl Patternが、異なるReference Implementationでも再現できるか確認する。
  * Local AI Foundry独自の開発手法を先に宣言せず、既存Development Modelで説明できない差分がEvidenceとして残るかを確認する。
* 昇格条件：

  * Season 2の実Evidenceを完了させる。
  * RI#1とRI#2の比較Evidenceを複数事例で整理する。
  * Human Authority Boundaryが異なる業務でも維持できるか確認する。
  * Review ConvergenceとEvidence Integrityが特定Workflow固有ではなく再利用可能なControl Patternか比較する。
  * Core CandidateとFoundry Coreを混同せず、Core確定をHuman DecisionまでDeferredする。
  * Development Model比較を一次資料ベースで実施する。
  * 独自性ではなく再現可能なPracticeとして説明できるテーマを優先する。

### Season 4構想（未FIX）：Continuous Assurance

* 中心となる問い：

  * 設計、Publish、Runtime Verificationを通過したAI Systemが、目的を満たし続けていることをどう継続的に証明するのか。
* Working Theme：

  * Evaluation Framework
  * Evaluation Case / Dataset / Trial / Grader
  * Regression Evaluation
  * Outcome Verification
  * Risk-based Authorization
  * Runtime Observability
  * Recovery / Rollback
  * Execution Provenance
  * Security / Privacy
  * Continuous Risk Monitoring
  * User / Outcome Feedback
  * Continuous Assurance
* 到達候補：

  * Contractどおりであることと、成果として良いことを分離して測定する。
  * Runtime Verificationを一回のGateで終わらせず、ObservabilityとFeedbackへ接続する。
  * 壊さない能力だけでなく、壊れた場合に既知の良好状態へ戻せる能力を持つ。
  * AIの自律範囲をRiskに比例させ、Human Authorizationを必要な場所へ集中させる。
* 昇格条件：

  * Season 2-11の実Runtime Evidenceが成立する。
  * 複数RunのTraceとOutcomeを比較できる。
  * EvaluationまたはRegressionの実験Evidenceが存在する。
  * Recovery、Security、Provenanceの少なくとも一部について実Project Evidenceが存在する。

---

## Backlog（昇格待ち）

### Reviewは、どこで終わるのか

* 現状：

  * Review Convergence RuleをInternal Governanceへ導入済み。
  * One Evidence Setに対するComplete Semantic Review、Semantic Freeze、Correction Batch、Correction Verification、Final Commit Boundaryを実運用で適用済み。
  * War Diary：`WD-20260810-003`
  * Bug Zoo：`BZ-20260810-018`
* 核となる問い：

  * Review品質を落とさずに、なぜCorrectionのたびにSemantic Reviewを最初からやり直してはいけないのか。
* 核となるテーマ：

  * Complete Semantic Review
  * Finding Classification
  * Semantic Freeze
  * Correction Batch
  * Correction Verification
  * Blocking Defect
  * Human Final Disposition
  * Commit Authorization
* 記事の到達点候補：

  * Reviewの品質とReview回数は同じではない。
  * 同じEvidence Setに対してFinding探索を繰り返すと、品質向上ではなく終了条件の消失が起きる。
  * Correctionは承認済みFindingを直す工程であり、それ自体を新しいSemantic Review Triggerにしない。
* 統合候補：

  * Season 2-09 Repository Reflection――「作った」と「反映された」は別
  * Season 3構想：Human-Directed FoundryのReview Control Pattern
* 昇格条件：

  * 異なるReview Scopeでも同じConvergence Ruleが機能する事例を追加する。
  * 単なる作業短縮ではなく、品質維持と停止条件の両立として一般化できること。

### Hashが合ってもEvidenceは壊れる

* 現状：

  * Review Packageへ表示・転送レイヤ由来のtruncationが混入するNear Missを確認済み。
  * Direct Source Acquisition、Source Integrity、Truncation Marker Guard、Package Integrity Gateを導入済み。
  * Regression TestでArtificial truncationをINVALIDとして停止し、Source-authenticなmarkerは誤検出しないことを確認済み。
  * War Diary：`WD-20260810-004`
  * Bug Zoo：`BZ-20260810-019`
* 核となる問い：

  * SHA-256が一致しているのに、なぜEvidence Artifactが信用できない場合があるのか。
* 核となるテーマ：

  * Direct Source
  * Source Acquisition Path
  * Display / Transfer Layer
  * Truncation
  * Source-derived Content
  * Hash Integrity
  * Package Integrity
  * Historical Snapshot Boundary
* 記事の到達点候補：

  * Hashは「そのArtifactが変わっていない」ことを確認できても、「元Sourceが完全だった」ことまでは保証しない。
  * EvidenceのIntegrityには内容だけでなく取得経路とDirect Sourceとの一致が含まれる。
  * Tool ResponseやConsole表示は人間向け表示であり、完全なEvidence Sourceとして再利用できるとは限らない。
* 統合候補：

  * Season 2-08 Canonical Sourceを失った日
  * Season 2-09 Repository Reflection――「作った」と「反映された」は別
* 昇格条件：

  * Canonical Source問題とEvidence Generation Pipeline問題の違いを整理する。
  * Hash、Source Integrity、Package Integrityの責務を混同せず説明できること。

### AIだからContractは後から育てられる

* 現状：

  * Project Evidence：Status Artifact Contractの正式フォーマット追加
  * Configuration Audit：CFG-20260802-001
  * Status Artifactの章構成・表示順リファクタリング実施
  * Active Work Current Snapshotを後付けで導入し、ADR-0012、CFG-D005、CM-20260802-002へ発展
  * Project State、Baseline、Runtime状態、Workflowを変えずにDocumentation Contractを進化させた事例が複数存在する
* 核となるテーマ：

  * 人間中心のProjectでは、変更・レビュー・整合性確認のコストが高いため、将来必要になりそうな管理体系まで事前に整備することが多い。
  * AI主体のProjectでは、Documentation更新、契約化、差分確認、監査を必要になった時点で高速に実施できる。
  * そのため、「何も管理しない」と「最初からすべてを厳密に管理する」の二択ではなく、運用で実際に揺れた部分だけをContract化する段階的なGovernanceが成立する。
  * ただし、Projectの起点として毎回参照される`status.md`のように、表示構造の安定が人間とAIの双方に必要なArtifactは、早い段階でContract化する価値がある。
  * 管理は必要だが、管理のための管理は増やさない。
* 関連する記事候補：

  * Season 2-04 Current Snapshotは進捗表ではない
  * Season 2-13 Season 2総括：AI開発は状態管理と変更管理になる
  * Season 3構想：Evidenceを基にContract / Governanceを後から育てる
* 昇格条件：

  * Status Artifact、Active Work以外にも、運用上の必要から後付けでContract化した事例を整理すること。
  * 人間中心のProjectとの違いを、単なるAIの処理速度ではなく、管理コストと変更容易性の違いとして一般化できること。
  * 「運用で回す対象」と「Contractとして固定する対象」の判断基準を整理できること。
  * 独立記事にするか、Season 2-04またはSeason 2-13へ吸収するかを再評価すること。

### AIへの指示は意図ではなく工程で書く

* 現状：

  * War Diary：WD-20260725-001
  * Bug Zoo：BZ-20260725-015
* 核となるテーマ：

  * AIは人間の意図を読むのではなく、Promptから実行可能な工程を構築する。
  * 「待つ」「進める」「通常フロー」のような曖昧な表現は、人間には自然でもAIには複数の工程として解釈される。
  * 実施する処理、更新する状態、停止地点、成果物、禁止事項まで固定して初めて工程が一意になる。
* 昇格条件：

  * Prompt設計の一般則として整理できること。
  * 同種事例が複数集まり、設計原則として説明できること。

### Aggregatorが全部を壊した日（笑）

* 現状：

  * War Diary：未記録
  * Bug Zoo：未登録
  * Hall of Fame：未登録
  * Operational Review：未作成
  * ADR：未作成
* 核となるテーマ：

  * Aggregatorが責務を超えて情報を再構成・再生成したことで、Workflow全体の整合性が崩壊した。
  * 問題は実装ではなく、責務境界を曖昧にした設計にあった。
  * Aggregatorは「統合」だけを行い、「意味を作らない」という設計原則へ至る契機となった。
* 昇格条件：

  * War Diaryへの事実記録。
  * Bug Zooへの一般化。
  * Operational ReviewによるRoot Cause分析。
  * ADRとして設計判断が確立した時点で、正式シリーズへの昇格を再検討する。

### このプロジェクトはアジャイルなのか？

* 現状：

  * 思考メモへWaterfall、Agile、Scrum、XP、Kanban、Spiral、Prototypeとの比較仮説を記録済み。
  * Documentation IA、Active Work、Project State Governance、Configuration Managementが、実運用のEvidenceを基に段階的に追加された。
  * 独自の開発モデル名は定義していない。
* 核となる問い：

  * Local AI Foundryの進め方は、既存のどの開発モデルに近いのか。
  * 「独自手法」と呼ぶ前に、既存モデルでどこまで説明できるのか。
* 扱うテーマ：

  * Waterfallとの違い
  * Agileとの共通点
  * Scrumではない可能性
  * XP、Kanbanとの比較観点
  * SpiralのRisk Drivenとの比較
  * Prototypeとの共通点と相違点
  * ソフトウェア実装だけでなくDocumentation、Governance、Configurationまで反復的に育てる進め方
  * Evidenceを基に必要な責務だけを追加する段階的Governance
* 記事の到達点：

  * 現時点ではアジャイル的、反復的、漸進的な性質が強い。
  * ただしScrum、XP、Kanbanのいずれかと同一視できるEvidenceはない。
  * SpiralやPrototypeとも共通点はあるが、目的と継続方法が異なる可能性がある。
  * 既存モデルで説明できない部分が繰り返し観測されるまでは、独自モデルと断定しない。
* 昇格条件：

  * 各開発モデルの定義と比較観点を一次資料または信頼できる資料で確認すること。
  * Project Evidenceを具体例として整理すること。
  * 共通点、相違点、比較不能な点を表形式で整理すること。
  * 「AIだから新しい」という結論を先に置かないこと。

### Documentation IAは最初には作れなかった

* 現状：

  * Documentation Information Architecture採用済み。
  * ADR-0011採用済み。
  * 責務別Directory再編のCommit 1〜6を完了し、Local Commit Verifyまで完了。
  * Active Work導入時に、Human Decision、ADR-0012、IA更新を経てRoot責務を拡張した。
  * Documentation IAは固定完成物ではなく、実運用で新しい責務が観測された場合に更新できる設計として実証された。
* 核となる問い：

  * Documentationを最初から設計対象にすべきであっても、なぜ完成したInformation Architectureを初期段階で固定できなかったのか。
  * Directory責務は、いつ、何を根拠に追加・変更すべきなのか。
* 扱うテーマ：

  * Documentationを最初から設計対象にすること
  * Information Architectureを最初から完成させることの違い
  * 実運用で観測された責務
  * Human Decision
  * ADR
  * IA更新
  * READMEのNavigation責務
  * Historical Evidence保護
  * Compatibility shimを残さない判断
  * 責務単位の段階的Commit
* 記事の到達点：

  * Documentationは最初から設計対象に含めるべきである。
  * ただし、実在しない責務やDirectoryまで先回りして固定する必要はない。
  * 十分な文書と実運用Evidenceが生まれた後で、観測された責務をInformation Architectureとして整理できる場合がある。
  * Directory構造は永久固定ではなく、新しい責務が発見された時にHuman Decision、ADR、IA更新を経て進化させる。
  * 「必要になったら育てる」は無計画ではなく、Evidenceを基に必要な責務だけを追加することを意味する。
* 昇格条件：

  * Directory再編前後の責務とNavigationの違いを比較する。
  * Public Documentationへ公開可能なIA文書と事例を選別する。
  * Season 2本編、独立記事、公式HPの思想コンテンツのどこへ配置するか再評価する。

---

## 統合済み候補

### Current Snapshotは一つではなかった

* 統合先：

  * Season 2-04 `Current Snapshotは進捗表ではない`
* 関連記録：

  * War Diary：`WD-20260802-001`
  * Configuration Management Note：`CM-20260802-002`
  * ADR：`ADR-0012`
  * Configuration Item：`CFG-D005`
  * Configuration Audit：`CFG-20260802-007`
* 統合理由：

  * 独立記事として扱うより、04の中心命題である
    `Project State Current Snapshot ≠ Active Work Current Snapshot`
    を実例として構成した方が、前後記事との責務分離が明確になる。
  * 04へ統合しても一次記録、運用知識、設計判断、Configuration Evidenceは各正本に残るため、知識は失われない。
