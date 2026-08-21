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
Repository Reflection、Execution Binding、Runtime Verificationを扱う。

2026-08-14〜15のRI #1 Formal Runtime Verificationでは、
Formal Test Case、Retry、Published Workflow、Canonical Launcher、Human Gateの境界で、
「ContractやHuman Decisionが存在すること」と「その決定がExecution Pointまで正しく届くこと」が別問題であると確認した。

このEvidenceを受け、05以降の旧構成を再評価した。

従来の「Governance要素を一項目ずつ説明する構成」から、
**何が壊れたか → どの境界が不足したか → 誰が何を担当すべきか**
という因果の流れへ再構成する。

### Current Position

01〜11の記事本文がRepository上に存在する。

現在の次執筆対象は **12 止めることも、運用である**。

当初は、Retry Correction後のCurrent Candidateに対するFresh Formal RV-01を実行し、
そのCurrent Runtime Evidenceを得てからSeason 2の最終構成をFIXする想定だった。

しかし、その後ProjectはRI #1単体の完遂からCross-RI Evidenceの比較へ進み、
Human DecisionによりRI #1 Article Productionを`FROZEN / HISTORICAL BENCHMARK`として保持する方針へ移行した。
Fresh Formal RV-01は`NOT EXECUTED`のままであり、成功結果を後から補うこともしない。

Season 2の最終話では、この未完了状態を失敗や成功へ書き換えるのではなく、
Current Purposeが変わった時に「続けない」と判断することも運用の一部である、という実Evidenceを扱う。

### Current Plan

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
  * Core CandidateをFoundry Coreへ先取り昇格しない。
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

---

## Long-range Series Direction

Season 2以降の長期展開は、現時点では確定シリーズではない。
Project Evidenceが増えるたびに再評価し、独自理論を先に作らない。

長期到達像とCapability Gapは、
[DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap](development-model/DM-20260808-001-ai-native-development-target-and-capability-gaps.md)
をWorking Modelとして参照する。

RI #1 Formal Runtime Verificationから得られたHuman-Directed Execution Model候補は、
[DM-20260815-002 Human-Directed FoundryにおけるContract ClosureとDeterministic Control Boundary](development-model/DM-20260815-002-contract-closure-and-deterministic-control-boundary.md)
を参照する。

RI #1 FreezeからCross-RI Evidence / Foundry Core Extractionへ移ったCurrent Transitionは、
[WD-20260821-001 RI #1を止め、Cross-RI Evidenceへ進んだ](war-diary/WD-20260821-001-ri1-freeze-cross-ri-foundry-core-transition.md)と
[DM-20260821-003 RI #1 Freeze / Cross-RI Evidence / Foundry Core Transition](development-model/DM-20260821-003-ri1-freeze-cross-ri-foundry-core-transition.md)
を参照する。

### Season 3構想（未FIX）：AIに仕事を任せる仕組みを作る — Reference ImplementationからFoundry Coreへ

Local AI Foundryは、Article Productionだけを完成させるProjectから、
異なる業務をReference Implementationとして実証し、そこから再利用可能なControl Structureを抽出する段階へ進んだ。

現在のReference Implementationは次のとおり。

* RI #1 — Article Production
  * `FROZEN / HISTORICAL BENCHMARK`
* RI #2 — Documentation Production
  * Current Evidence Source / Core Contributor
* RI #3 — Visual Asset Production
  * Human Runtime Validated / Core Contributor
  * FoundryConsoleはHuman-facing Control Surface / Current Implementationであり、RI #3そのものの名称ではない。
* RI #4 — Research-Grounded Long-form Content Production
  * Current Frontier / Active Validation
  * Temporal Entity IntegrityはCurrent Package / Capabilityであり、RI #4そのものの名称ではない。

ProjectのCurrent Vectorは、

```text
Cross-RI Evidence
→
Foundry Core Extraction
```

である。

現時点でConfirmed Foundry Coreとなっているのは、
`FC-CORE-001 Runtime Capability Calibration`だけである。

その中心ルールは、AI Model / Runtime / Hardwareの能力を静的値や推測だけで決めず、
Current Runtimeを観測・測定し、Evidence-backed Effective Capabilityを決定して、
その結果をDownstream ProcessingへBindingすることである。

それ以外のHuman Authority、Deterministic Gate、Review Integrity、Evidence / Observability、
Human-facing Control Surface、Technical GateとHuman Acceptanceの分離等は、
Cross-RI Evidenceを増やしながら検証するCore Candidateとして扱う。

**RIを増やすことが目的ではない。共通する制御構造を見つける。**

RIはそのためのEvidence Generatorであり、各RI固有の実装をそのままCoreへ持ち込まない。

* 中心となる問い：

  * 異なる仕事をAIへ委譲したとき、複数のReference Implementationで繰り返し必要になった制御構造のうち、何をEvidence付きでFoundry Coreへ昇格できるのか。
* Current Operating Evidence：

  * HumanはPurpose、Judgment、Responsibility、Authorization、Acceptanceを保持する。
  * Human + ChatGPTはArchitecture、Design、Prototype、Runtime Proof、Review、Core Candidate整理を進められる。
  * CODEXはActual Repository上のFormal Implementation、Verification、Currentization、Internal Canonical Sourceに基づくPublic Projection等を担う実行主体として利用する。
  * Human + ChatGPTからCODEXへのHandoff / Instruction、CODEXからのTerminal Reportという同期経路は実運用で成立している。
  * NOTEや公式HP等のPublic-native ArtifactはHuman + ChatGPT側で作成・編集し、Internal Canonical Sourceから派生するPublic Projectionと責務を混同しない。
  * この役割分担自体を、現時点でFoundry CoreのConfirmed Capabilityとしては扱わない。
* Working Theme：

  * Reference Implementation Model
  * Cross-RI Evidence
  * Foundry Core Extraction
  * Core Candidate / Confirmed Core Boundary
  * Runtime Capability Calibration
  * Human Authority Boundary
  * Human Decision Boundary / Mechanical Continuation
  * Technical Gate / Human Acceptance Separation
  * Deterministic Validation
  * Review Integrity / Review Convergence
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
* Working Outline：

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

  Season 3をRI #1からRI #4までの単純な開発日誌にはしない。
  各RIの具体Evidenceを使いながら、再利用可能なDelegation / Controlの問いへ到達する構成を優先する。
* 到達候補：

  * RI固有Implementationと再利用可能なControl Structureを分離する。
  * Technical Gate PASSとHuman Acceptanceを分離する。
  * Runtime / Adapter CapabilityとFoundry Coreを分離する。
  * Core昇格を「便利そうだから」ではなくCross-RI EvidenceとHuman Decisionで判断する。
  * `FC-CORE-001`がなぜConfirmed Coreになったのかを、Originと再利用可能性を含めて説明できる。
  * Dify、n8n、Ollama、ComfyUI、Search等をFoundryそのものと決め打ちせず、交換可能なAdapter / Processing Planeとして扱えるか検証する。
  * Humanが全Stepを操作しなくても、Authority Boundaryと成立条件を保ったままAIへ仕事を委譲できるOperating Modelを検証する。
* 昇格条件：

  * Season 2を`止めることも、運用である`まで実Evidenceで閉じる。
  * RI #1〜RI #4の比較Evidenceを複数のControl Patternについて整理する。
  * `FC-CORE-001`とCore Candidateの違いをEvidence付きで説明できる。
  * 一つのRIだけで観測されたPatternをCoreへ先取り昇格しない。
  * Human Authority Boundary、Technical Gate / Human Acceptance、Evidence / Observability等が異なる業務でどう現れるか比較する。
  * Runtime / Workflow / Integration / Domain AdapterとFoundry Coreの責務差を検証する。
  * Human + ChatGPT / CODEXの分業を、会話上の役割名ではなく実際のHandoffとFormal Reflection Evidenceから説明する。
  * Development Model比較を一次資料ベースで実施し、独自性を先に宣言しない。

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

  * RI #2〜RI #4を含む複数RIでRuntime / Outcome Evidenceが蓄積される。
  * 複数RunのTraceとOutcomeを比較できる。
  * EvaluationまたはRegressionの実験Evidenceが存在する。
  * Recovery、Security、Provenanceの少なくとも一部について実Project Evidenceが存在する。

---

## Backlog（昇格待ち）

### PRR――公開物から消える判断を資産化する

* 現状：

  * Internal Publication Review RegistryとPrivate PRRの責務分離を実施済み。
  * Human-controlled Decision HistoryをAI / CODEX側Publication Executionの成立条件から外した。
  * War Diary：`WD-20260810-002`
  * Bug Zoo：`BZ-20260810-017`
* 核となる問い：

  * Current Publication Reviewと、公開成果物から消えるDecision Historyをなぜ別責務へ分けるのか。
* 核となるテーマ：

  * Publication Governance
  * Internal Publication Review Registry
  * Publication Reflection Register（PRR）
  * Current State / Decision History
  * Public / Internal / Private Boundary
  * Human-approved Current Publication Decision
  * non-private Execution Context
* 記事の到達点候補：

  * PRRは公開物やGit履歴から確認できなくなる判断を保持するPrivate Artifactである。
  * Current Publication ReviewとDecision Historyを同じ台帳へ混ぜない。
  * Human側の履歴保存責務をAI / CODEXのExecution Dependencyへしない。
* 本編から外した理由：

  * 価値は高いがPublic Documentation固有のPublication Governance比重が大きく、Season 2本編をGovernance Artifactのカタログへ戻してしまう。
  * Human Decision Boundaryの一般論は06へ残し、PRR固有論は独立候補として保持する。

### Difyのバージョンアップで契約が壊れた日

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
* 記事の到達点候補：

  * Workflowが昨日動いたことは、今日も動く保証にならない。
  * Platform VersionとPlatform側の制約もConfigurationとして追跡する必要がある。
  * Platform変更時は、既存Workflowの契約と互換性を再確認する。
* 本編から外した理由：

  * 単独テーマとして強いが、現在のSeason 2本線であるState / Authority / Source / Execution Binding / Runtimeの因果線から外れる。
  * Runtime Observability、Regression、Compatibilityを扱うSeason 4側へ接続できる候補として保持する。

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

  * Season 2-08 `「作った」「反映した」「Published」は全部別`
  * Season 3構想：Cross-RI Evidence / Foundry Core ExtractionにおけるReview Control Pattern
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

  * Season 2-07 `Canonical Sourceを失った日`
  * Season 2-08 `「作った」「反映した」「Published」は全部別`
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
  * Formal RVの実運用からFixed Decision Binding、Contract Propagation、Deterministic Control Boundary等のWorking Hypothesisが追加された
* 核となるテーマ：

  * 人間中心のProjectでは、変更・レビュー・整合性確認のコストが高いため、将来必要になりそうな管理体系まで事前に整備することが多い。
  * AI主体のProjectでは、Documentation更新、契約化、差分確認、監査を必要になった時点で高速に実施できる。
  * そのため、「何も管理しない」と「最初からすべてを厳密に管理する」の二択ではなく、運用で実際に揺れた部分だけをContract化する段階的なGovernanceが成立する。
  * ただし、Projectの起点として毎回参照される`status.md`のように、表示構造の安定が人間とAIの双方に必要なArtifactは、早い段階でContract化する価値がある。
  * 管理は必要だが、管理のための管理は増やさない。
* 関連する記事候補：

  * Season 2-04 Current Snapshotは進捗表ではない
  * Season 2-12 止めることも、運用である
  * Season 3構想：Evidenceを基にContract / Governanceを後から育てる
* 昇格条件：

  * Status Artifact、Active Work以外にも、運用上の必要から後付けでContract化した事例を整理すること。
  * 人間中心のProjectとの違いを、単なるAIの処理速度ではなく、管理コストと変更容易性の違いとして一般化できること。
  * 「運用で回す対象」と「Contractとして固定する対象」の判断基準を整理できること。
  * 独立記事にするか、Season 2-12またはSeason 3へ吸収するかを再評価すること。

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
