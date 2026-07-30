# NOTE記事インキュベータ

このファイルは、将来の記事になり得るテーマや構想を蓄積する。

完成した記事や単なる思いつきではなく、
調査・検証・構造化する価値があるテーマを育てることを目的とする。

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

## Season 2構想：壊れない仕組みをどう運用し続けるか

Season 1では、AI Workflowを壊れにくくするための設計を扱った。

Season 2では、設計されたWorkflowを継続的に変更、検証、同期、公開するための
Configuration Managementと運用統制を中心に扱う。

以下は目次候補であり、記事番号、タイトル、掲載順は執筆時に再評価する。

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

* 核となる問い：

  * なぜCurrent Snapshotは単なる作業一覧では不十分なのか。
* 扱うテーマ：

  * 30秒Dashboard
  * Work Queue
  * Current Phase
  * Baseline
  * Block
  * Pending
  * Evidence Navigation
* 記事の到達点：

  * Current Snapshotは「何をしたか」ではなく、
    「現在どの判断が可能か」を示すProject Dashboardである。

### 05 Canonical Sourceを失った日

* 核となる問い：

  * Partial Sourceを正本として扱うと、なぜ既存内容が失われるのか。
* 扱うテーマ：

  * Single Source of Truth
  * Canonical Source
  * Partial Source
  * 会話履歴
  * 記憶による再構成
  * Full File Replacement
  * Diff Verification
* 関連記録：

  * Bug Zoo：BZ-20260731-016
* 記事の到達点：

  * 一部だけ見えている情報から、ファイル全体を再構成してはならない。
  * 変更前に正本全文を取得し、変更後に差分を確認する必要がある。

### 06 Repository Reflectionという最後の確認

* 核となる問い：

  * テストが通り、Importに成功しても、なぜ作業完了ではないのか。
* 扱うテーマ：

  * Repository Reflection
  * GitHub再取得
  * 期待した変更
  * 意図しない変更
  * 既存内容維持
  * Human Commit
  * VERIFY
* 記事の到達点：

  * 成果物を生成したことと、正本へ正しく反映されたことは別である。
  * Repositoryから再取得して初めて、変更の完了を確認できる。

### 07 Runtime Verificationが最後の砦

* 核となる問い：

  * Static Test、Import、Semantic Graph一致だけでは、なぜ不十分なのか。
* 扱うテーマ：

  * Runtime Verification
  * Raw Output Contract
  * Normalize後DTO
  * Contract Gate
  * 実LLM実行
  * Runtime Acceptance
* 記事の到達点：

  * Graphが正しく、テストが通っていても、Runtimeの実出力は契約を破る可能性がある。
  * 実際に動かした結果を確認しない限り、Workflowの受け入れは完了しない。

### 08 Publishして終わりではない

* 核となる問い：

  * DraftをPublishした後、何を確認しなければならないのか。
* 扱うテーマ：

  * Draft Workflow
  * Published Workflow
  * Revision
  * Publish判定
  * Published State Verification
  * Repositoryとの同期
  * Release Complete
* 記事の到達点：

  * Publish操作は、公開状態への変更要求にすぎない。
  * Published Workflowの実体とRepository正本を再確認して初めて公開完了となる。

### 09 Difyのバージョンアップで契約が壊れた日

* 核となる問い：

  * Platform側の制約変更は、既存Workflowへどのように影響するのか。
* 扱うテーマ：

  * Dify 1.16
  * Selector制約
  * Code Node
  * DTO field
  * `finish_reason`
  * Import Compatibility
  * Platform Drift
* 記事の到達点：

  * Workflowが昨日動いたことは、今日も動く保証にならない。
  * Platform VersionもConfiguration Baselineの一部として管理する必要がある。

### 10 Season 2総括：AI開発は変更管理になる

* 核となる問い：

  * Workflowが完成に近づくほど、なぜ作業の中心がAI調整から変更管理へ移るのか。
* 扱うテーマ：

  * Configuration Management
  * Registration
  * Audit
  * Current Snapshot
  * Runtime Verification
  * Repository Reflection
  * Publish Verification
* 記事の到達点：

  * AI Workflow開発の後半で支配的になるのは、Prompt Engineeringではない。
  * 何を変更し、何を正本とし、何をEvidenceとして承認するかという変更管理である。

---

## Season 2構成の軸

Season 2は以下の順序で積み上げる。

1. 管理対象を定義する
   ConfigurationとConfiguration Registration

2. 差分を検出する
   Configuration AuditとDrift

3. 現在地を判断可能にする
   Current SnapshotとWork Queue

4. 正本を守る
   Canonical SourceとRepository Reflection

5. 実動作を確認する
   Runtime Verification

6. 公開状態を確認する
   Publish Verification

7. 外部変化を管理する
   Platform VersionとCompatibility

Season 1が「壊れない設計」を扱ったのに対し、
Season 2は「壊れない状態を維持する運用」を扱う。

---

## Season 2昇格条件

各候補は、以下を満たした段階で正式記事へ昇格する。

* 実際のProject Evidenceが存在する。
* 単発事故ではなく、一般化できるテーマになっている。
* 設計、実装、運用のどの問題かを区別できる。
* Expected、Actual、原因、判断、結果を説明できる。
* 内部情報を公開用にマスク可能である。
* 記事公開後も正本Documentationへ誘導できる。

---

## Backlog（昇格待ち）

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
