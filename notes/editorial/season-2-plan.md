# Local AI Foundry 開発ログ — Season 2 Plan

Status: `CLOSURE / 12 NEXT`

## Season 2：壊れない仕組みをどう運用し続けるか

Season 1では、AI Workflowを壊れにくくするための設計を扱った。

Season 2では、設計されたWorkflowを継続的に変更、検証、同期、公開するための
Configuration Management、Project State Governance、正本管理、Human Authorization、
Repository Reflection、Execution Binding、Runtime Verificationを扱う。

2026-08-14〜15のRI #1 Formal Runtime Verificationでは、
Formal Test Case、Retry、Published Workflow、Canonical Launcher、Human Gateの境界で、
「ContractやHuman Decisionが存在すること」と「その決定がExecution Pointまで正しく届くこと」が別問題であると確認した。

このEvidenceを受け、05以降の旧構成を再評価した。

従来の「Governance要素を一項目ずつ説明する構成」から、
**何が壊れたか → どの境界が不足したか → 誰が何を担当すべきか**
という因果の流れへ再構成する。

## Current Position

01〜11の記事本文がRepository上に存在する。

現在の次執筆対象は **12 止めることも、運用である**。

当初は、Retry Correction後のCurrent Candidateに対するFresh Formal RV-01を実行し、
そのCurrent Runtime Evidenceを得てからSeason 2の最終構成をFIXする想定だった。

しかし、その後ProjectはRI #1単体の完遂からCross-RI Evidenceの比較へ進み、
Human DecisionによりRI #1 Article Productionを`FROZEN / HISTORICAL BENCHMARK`として保持する方針へ移行した。
Fresh Formal RV-01は`NOT EXECUTED`のままであり、成功結果を後から補うこともしない。

Season 2の最終話では、この未完了状態を失敗や成功へ書き換えるのではなく、
Current Purposeが変わった時に「続けない」と判断することも運用の一部である、という実Evidenceを扱う。

## Current Plan

```text
01 Configurationはコードではない
↓
02 Configuration Registrationとは何か
↓
03 Auditは犯人探しではない
↓
04 Current Snapshotは進捗表ではない
↓
05 「最新」はCurrentではない
↓
06 Human Decisionは多ければ安全になるわけではない
↓
07 Canonical Sourceを失った日
↓
08 「作った」「反映した」「Published」は全部別
↓
09 Humanが決めた値を、AIにもう一度考えさせるな
↓
10 文字数はLLMに数えさせるな（笑）
↓
11 Publishしても、実行するまで分からない
↓
12 止めることも、運用である
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
  * Article Body Exists
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
  * Candidate / Active / HistoricalとLatest / Currentの詳細は05へ送る。
  * Human Decision Boundaryの詳細は06へ送る。
  * AuditのExpected / Actual / Drift判定方法は03へ戻し、04では再説明しない。
  * Active Workを日報、Backlog、全Commit履歴へ拡張しない。

### 05 「最新」はCurrentではない

* Current Status：
  * Article Body Exists
  * Fact Check PASS
* 核となる問い：
  * 新しいCommit、Draft、Published Workflow、Runtime Evidenceが増え続ける中で、何をCurrentとして扱うのか。
* 扱うテーマ：
  * Latest
  * Current
  * Candidate
  * Active
  * Historical
  * Active Baseline
  * Current Candidate Binding
  * Evidence Binding
* 記事の到達点：
  * `Latest`は時刻やRevisionとして新しいという意味であり、`Current`は現在の判断基準として採用されているという意味である。
  * Candidateが新しくても、Currentであるとは限らない。
  * Historicalは失敗作置き場ではなく、過去Evidenceの意味を理解するための基準になる。
  * 最新のRuntime Evidenceであっても、Current CandidateへBindingされていなければCurrent Candidate Runtime Evidenceではない。
  * Currentとは、最新であることではなく、現在採用されているという意味である。
* Scope Boundary：
  * 「誰が採用を決めるか」とHuman Gateの詳細は06へ送る。
  * Formal Test Input BindingやFixed Decision Bindingは09へ送る。
  * Runtime結果そのものの評価は11へ送る。

### 06 Human Decisionは多ければ安全になるわけではない

* Current Status：
  * Article Body Exists
* 核となる問い：
  * Humanが責任を持つProjectで、どこにHuman Decisionを置き、どこからAIへ自律継続させるべきか。
  * Human Gateは多いほど安全になるのか。
* 扱うテーマ：
  * Human Decision Boundary
  * Human Responsibility Boundary
  * Human Authorization
  * Authorized Envelope
  * Mechanical Continuation
  * Publish / Live Change
  * Runtime Authorization
  * Risk Acceptance
  * Test / Verify / Currentization
  * HGやりすぎ問題
* 関連記録：
  * War Diary：`WD-20260814-001`
  * Bug Zoo：`BZ-20260814-023`
  * Configuration Management Note：`CM-20260815-001`
  * Development Model Note：`DM-20260815-002`
* 記事の到達点：
  * Human GateはWorkflowの節目ではなく、Authority Boundaryへ置く。
  * Purpose、Meaning、Risk、Adoption、Publish、Runtime Authorization等はHuman Decisionに残す。
  * Human-approved Scope内のTest、Correction Verification、Post-Commit Verification、Currentization、Binding Synchronizationまで毎回Humanへ戻さない。
  * Human-DirectedはHuman-operatedを意味しない。
  * Humanは意味と責任を決め、AI / CODEXはその決定の内側を完遂する。
* Scope Boundary：
  * Public Documentation固有のPRR運用は本編から外し、Backlogへ送る。
  * Humanが決めた具体値をExecution Pointへ固定する問題は09へ送る。
  * Season 3ではRI #1〜RI #4のCross-RI Evidenceを基にHuman-AI Operating ModelとFoundry Core Candidateを再一般化する。

### 07 Canonical Sourceを失った日

* 核となる問い：
  * Partial Sourceを正本として扱うと、なぜ既存内容が失われるのか。
  * 「覚えている」「一部見えている」はなぜCanonical Sourceの代わりにならないのか。
* 扱うテーマ：
  * Single Source of Truth
  * Canonical Source
  * Partial Source
  * 会話履歴
  * 記憶による再構成
  * Full File Replacement
  * Minimal Change
  * Diff Verification
  * Direct Source
* 関連記録：
  * Bug Zoo：`BZ-20260731-016`
  * Configuration Management Note：`CM-20260731-001`
* 記事の到達点：
  * 一部だけ見えている情報から、ファイル全体を再構成してはならない。
  * 変更前に正本全文を取得し、変更後に差分を確認する必要がある。
  * AIの記憶や会話履歴は、Canonical Sourceの代替にはならない。
  * Single Source of Truthは「全部を一つに書く」ことではなく、責務ごとに何を正本として信頼するかを固定することである。
* Scope Boundary：
  * Hash / truncation / Evidence Package IntegrityはBacklogの独立テーマとして保持する。
  * Reflection後に各状態へ正しく届いたかは08へ送る。

### 08 「作った」「反映した」「Published」は全部別

* 核となる問い：
  * 成果物を作ったこと、Repositoryへ固定したこと、DraftへApplyしたこと、Publishしたこと、Published Stateを検証したことは、なぜ別々に確認しなければならないのか。
* 扱うテーマ：
  * Working Artifact
  * Human Review
  * Repository Reflection
  * Commit Authorization
  * Local Commit Verify
  * Draft Apply
  * Published Workflow
  * Published State Verification
  * Repository / Draft / Published Semantic Verification
  * Dependent Currentization
  * Canonical Launcher
  * Semantic Equivalence
  * Execution Binding
* 関連記録：
  * Configuration Management Note：`CM-20260802-003`
  * Configuration Management Note：`CM-20260815-002`
  * War Diary：`WD-20260814-001`
  * Bug Zoo：`BZ-20260814-021`
* 記事の到達点：
  * `作った ≠ Repositoryへ固定された ≠ Draftへ反映された ≠ Publishedされた ≠ Published Stateが検証された`。
  * Publish操作はPublished状態への変更操作であって、検証そのものではない。
  * Repository / Draft / PublishedのSemantic MatchがPASSしても、Launcher等のExecution Binding PASSを意味しない。
  * Publish等で新Identityが生成された場合は、依存するConsumerをCurrentizeする必要がある。
  * Historical ReferenceはCurrentizationせず、当時の事実として保持する。
* Scope Boundary：
  * Review ConvergenceとEvidence Package Integrityの詳細はBacklogまたはSeason 3へ送る。
  * Human Gateの境界は06へ戻す。
  * Runtimeで実際に何が起きたかは11へ送る。

### 09 Humanが決めた値を、AIにもう一度考えさせるな

* 核となる問い：
  * HumanまたはCanonical Contractが一意に決めたTest InputやTargetを、なぜExecution側で再探索・再選択させてはいけないのか。
* 中心事例：
  * Formal Test ID `RV-01`にはExact Inputが定義済みだった。
  * しかし修正前Launcherではgeneric E2E fixtureを選択できた。
  * Formal Input Binding MismatchとしてRunを無効化し、Test IDからExact Inputを機械的に解決する方式へ修正した。
* 扱うテーマ：
  * Fixed Decision Binding（Working Name）
  * Formal Test ID
  * Exact Input
  * Machine-readable Binding
  * Pre-Execution Match
  * Contract Propagation
  * Consumer Binding
  * Execution Point
  * Mismatch STOP
* 関連記録：
  * War Diary：`WD-20260814-001`
  * Bug Zoo：`BZ-20260814-020`
  * Bug Zoo：`BZ-20260814-021`
  * Configuration Management Note：`CM-20260815-002`
  * Development Model Note：`DM-20260815-002`
* 記事の到達点：
  * Humanが値を決めたことと、その値以外をExecution Pointで選択不能にしたことは別である。
  * 決定前はAIが候補生成・比較・推奨を行ってよい。
  * 決定後は同じ判断を再度AIへ委譲せず、Machine-readable Bindingで固定する。
  * Contractは書かれているだけでなく、Consumerへ伝播しExecution Pointで効いていることを確認する。
* Scope Boundary：
  * `Fixed Decision Binding`はWorking Nameとして扱い、正式Architecture名とは断定しない。
  * Machine / LLMの一般的な責務分離は10へ送る。
  * `Contract Closure`をFoundry Coreとして先取りしない。

### 10 文字数はLLMに数えさせるな（笑）

* 核となる問い：
  * CodeやGateが正確に知っている文字数、範囲、差分を、なぜLLMへ再推定させてはいけないのか。
* 中心事例：

  ```text
  Conclusion Initial
  623

  Conclusion Retry
  698

  Expected Range
  240–420
  ```

  * Machineは623文字を計測できた。
  * 上限420文字、最低203文字削減も計算できた。
  * Retry Promptにはそれらが十分に渡らず、モデルは前回出力を約370文字と誤認した。
* 扱うテーマ：
  * Deterministic Control Boundary（Working Name）
  * Machine-measured Fact
  * Count
  * Compare
  * Range
  * Delta
  * Direction
  * Deterministic Retry Correction Payload
  * Semantic Rewrite
  * Retry Strategy
  * Horizontal Correction
* 関連記録：
  * War Diary：`WD-20260814-001`
  * Bug Zoo：`BZ-20260814-022`
  * Development Model Note：`DM-20260815-002`
* 記事の到達点：
  * Machineが正確に知っている事実をLLMへ推定させない。
  * `Count / Compare / Delta / Direction`はMachineが担当し、`Meaning-preserving Rewrite / Compression / Expansion`はLLMが担当する。
  * 固定割合の「20％短縮」のようなHeuristicはContract-derivedでなければ安全ではない。
  * 「意味は自由。構造は厳格。」をExecution Controlへ拡張すると、Deterministic ControlとSemantic Generationの境界が見える。
* Scope Boundary：
  * LLMが悪い／使えないという結論にしない。
  * 今回のFailureはRetry Strategy側とModel Instruction Following側の`MIXED`として扱う。
  * Deterministic Control Boundaryを正式Foundry Coreと断定しない。

### 11 Publishしても、実行するまで分からない

* Current Evidence State：
  * Project Stateは`Published`。
  * Historical Correct-Contract Formal RV-01には`FAILED` Evidenceが存在する。
  * Fresh Formal RV-01は実行されず、`NOT EXECUTED`のまま保持する。
  * RI #1 Article Productionは`FROZEN / HISTORICAL BENCHMARK`として保持する。
  * Runtime AcceptanceはHistorical Stateとして`PENDING`のままであり、Freezeによって`PASS`へ書き換えない。
* 核となる問い：
  * Repository、Draft、Published、Launcher、Formal Input Bindingが一致しても、なぜRuntime Acceptanceは完了しないのか。
* 扱うテーマ：
  * Published State Verification
  * Runtime Verification
  * Exact Input Binding
  * Effective Runtime Value
  * Raw Output Contract
  * Normalize後DTO
  * Contract Gate
  * Runtime Evidence
  * Current Candidate Binding
  * Runtime Acceptance
* 関連記録：
  * War Diary：`WD-20260814-001`
  * Development Model Note：`DM-20260815-002`
* 記事の到達点：
  * Static Test、Repository Verification、Semantic Graph一致、Published State Verificationは、Runtime Successの代替ではない。
  * RuntimeではLLM出力、Retry、Effective Parameter、Transport等、実行しなければ観測できない事象がある。
  * 過去Runが存在してもCurrent CandidateへBindingされていなければCurrent Runtime Evidenceにはならない。
  * 実Runtime Evidenceを確認して初めてRuntime Acceptanceを判断できる。
* Scope Boundary：
  * 実行されなかったFresh Formal RV-01の結果を推測・補完しない。
  * Remaining Gateを実行せずRI #1をFreezeしたHuman Decisionそのものは12へ送る。
  * Season 1-08 `Runtimeを見ないレビューはレビューではない`の再説明にせず、Season 2では`Published ≠ Runtime Accepted`というLifecycle / State問題を中心にする。

### 12 止めることも、運用である

* Current Status：
  * Season 2 Final / Next Writing Target
* Current Evidence State：
  * RI #1 Article Productionは`FROZEN / HISTORICAL BENCHMARK`。
  * Fresh Formal RV-01は`NOT EXECUTED`。
  * RI #1 Runtime AcceptanceはHistorical Stateとして`PENDING`のまま保持する。
  * RI #1を`Failed`や`Deleted`へ分類し直さず、既存Historical Evidenceを保存する。
  * ProjectのCurrent Vectorは`Cross-RI Evidence → Foundry Core Extraction`へ移行した。
  * RI #2〜RI #4の比較Evidenceが加わり、RI #1単体の完遂だけをProjectの目的とする前提はCurrentではなくなった。
* 核となる問い：
  * 実行可能なRemaining Gateが残っていても、「実行しない」という判断は運用として成立するのか。
  * Current Purposeが変わった時、古いRemaining Gateを消化すること自体を目的にしてよいのか。
  * `Freeze`、`Failed`、`Deleted`、`Complete`は、なぜ同じ意味ではないのか。
* 扱うテーマ：
  * Gate ≠ Purpose
  * Current Purpose
  * Remaining Gate Re-evaluation
  * Human Decision / Human Authority
  * Continue / Stop Decision
  * Freeze ≠ Failed ≠ Deleted
  * Historical Evidence Preservation
  * Configuration / State Boundary
  * Latest / Current Boundary
  * Human Decision / Mechanical Continuation
  * Canonical / Partial Source
  * Repository / Draft / Published
  * Semantic / Execution Binding
  * Deterministic / Semantic Responsibility
  * Published / Runtime Acceptance
  * Human Responsibility Boundary
  * Cross-RI Transition
* 記事の到達点：
  * Season 2の本質はGovernance Artifactを増やすことではなく、責務と状態の境界を分け、Currentな判断を壊さず維持することにある。
  * GateはCurrentな問いへ答えるための手段であり、残っているGateをすべて消化すること自体がProjectの目的ではない。
  * Current Purposeが変わった場合、Human AuthorityはRemaining Gateを再評価し、継続だけでなく停止を選択できる。
  * 停止を選んでも、`NOT EXECUTED`や`PENDING`を`PASS`や`COMPLETE`へ書き換える必要はない。
  * 未完了のHistorical Stateを正直に保存したまま、Project全体は次のCurrent Vectorへ進める。
  * RI #1はここで止まるが、そのEvidenceはRI #2〜RI #4との比較材料として残り、Foundry Coreを考える次のSeasonへ接続する。
  * 「境界を決める」という旧12のテーマは失われず、その境界があるからこそHumanが「どこまで続け、どこで止めるか」を責任を持って判断できる、という形でSeason 2を閉じる。
* 関連記録：
  * War Diary：`WD-20260814-001`、`WD-20260821-001`
  * Bug Zoo：`BZ-20260814-020`〜`023`
  * Configuration Management Note：`CM-20260815-001`、`CM-20260815-002`
  * Development Model Note：`DM-20260815-002`、`DM-20260821-003`
* Scope Boundary：
  * RI #1を`Failed`、`Deleted`、`Runtime Accepted`として扱わない。
  * Fresh Formal RV-01を実行済みとして扱わない。
  * `Contract Closure`等のWorking Modelを採用済みArchitectureとして断定しない。
  * Foundry Coreの定義やCross-RI Extractionの詳細はSeason 3へ送り、Season 2では「正しく止める」Human Authorityまでで閉じる。

---

## Season 2構成の軸

Season 2は以下の流れで積み上げる。

1. **Configuration Plane**  
   管理対象を定義し、Registrationし、Expected / ActualをAuditする。  
   `01 → 02 → 03`

2. **State Plane**  
   Projectの現在地と作業地点を分け、LatestとCurrentを分ける。  
   `04 → 05`

3. **Authority Plane**  
   Humanが本当に判断すべき場所と、AIが自律継続すべき場所を分ける。  
   `06`

4. **Source / Reflection Plane**  
   Canonical Sourceを守り、作成・Repository Reflection・Draft・Published・Execution Bindingを分ける。  
   `07 → 08`

5. **Control / Contract Plane**  
   Human-decided ValueをExecutionへ固定し、Deterministic FactとSemantic Workを分ける。  
   `09 → 10`

6. **Runtime Plane**  
   Published StateとRuntime Acceptanceを分け、実Runtime Evidenceで確認する。  
   `11`

7. **Season Synthesis**  
   責任境界を設計することがSeason 2全体を貫いていたと整理し、
   その運用上の帰結として、Human Authorityが継続だけでなく停止も選択できることを確認する。  
   `12`

Season 1が「壊れない設計」を扱ったのに対し、
Season 2は「壊れない状態と責任境界を維持し、必要なら未完了を偽らず正しく止める運用」を扱う。

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
* Working NameやCore Candidateを採用済みArchitectureとして先取りしていない。
* Human DecisionによるFreezeを扱う場合、未完了のRuntime / Acceptanceを成功扱いせずHistorical Evidenceとして保持している。
