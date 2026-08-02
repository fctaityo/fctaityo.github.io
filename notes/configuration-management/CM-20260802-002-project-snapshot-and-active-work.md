# CM-20260802-002 Project SnapshotとActive Work Snapshotを分離する

## ID

`CM-20260802-002`

## 日付

2026-08-02

## 分類

Current Snapshot / Work Recovery

## 目的

Project全体の正式状態を示すSnapshotと、現在作業中のInitiativeの復帰地点を示すSnapshotを分離し、異なる更新Triggerと履歴責務を同じArtifactへ混在させない。

## 背景

Documentation Information Architectureの実装は、Commit 1とCommit 2まで完了していた。

その後、notes整理へInterruptする前に現在地を確認するため`status.md`を参照した。

`status.md`からは、次を確認できた。

* Project State
* Active Baseline
* Runtime Status
* Runtime Acceptance
* Remaining Gate
* Project全体のNext Action

しかし、Documentation IA実装について次を確認できなかった。

* Commit 1が完了している
* Commit 2が完了している
* 次はCommit 3から再開する
* 現在はnotes整理のため一時停止している

これは`status.md`の欠陥ではなかった。

`status.md`はProject State Current Snapshotであり、Project Stateが変化しない通常作業、Documentation変更、個別Commitを作業ログとして保持しない契約だった。

不足していたのは、現在の1つのActive Initiativeについて、完了CheckpointとNext Actionを示す別のSnapshotだった。

関連する一次記録は次のとおり。

* War Diary：`WD-20260802-001`
* ADR：`ADR-0012`
* Configuration Item：`CFG-D005`

## 原則

Project State Current SnapshotとActive Work Current Snapshotは別責務とする。

```text
status.md
→ Project全体の正式状態

active-work.md
→ 現在作業中の復帰地点
```

両者はどちらも「現在」を示すが、判断対象と更新頻度が異なる。

### Project State Current Snapshot

主な責務：

* Project State
* Active Baseline
* State Transition
* Runtime Gate
* Remaining Gate
* 正式なProject全体のNext Action

主な更新契機：

* Project State Transition
* Baseline変更
* 正式Authorization
* BlockerまたはGateの正式変更
* Status Artifact Contractで許可されたCorrection

通常のCommitや会話進行だけでは更新しない。

### Active Work Current Snapshot

主な責務：

* Current Initiative
* Purpose
* Status
* Current Scope
* Completed Checkpoint
* Next Action
* Blocker
* Human Decision
* Related Configuration
* Related Evidence
* Updated At

主な更新契機：

* Active Initiative開始
* Initiative Status変更
* Completed Checkpoint更新
* Next Action変更
* Blocker発生または解消
* Human Decision発生または解消
* Interrupt、Pause、Handover前
* Local Commit Verify完了
* Initiative完了、取消、置換

## Active Workへ保持しないもの

`active-work.md`は作業履歴ファイルではない。

次を保持しない。

* Project State
* Active Baseline
* Runtime状態
* Transition情報
* 日々の作業ログ
* 全Commit履歴
* Daily Report
* Backlog
* Roadmap
* 複数Initiativeの一覧
* 完了済みInitiativeのArchive
* Review Package全文
* AuditまたはReport全文

詳細履歴は次へ委譲する。

* Git
* Configuration Audit
* Configuration Report
* Review Package
* War Diary
* ADR

Active Workへ残すのは、Interrupt後に再開するために必要な最小断面だけとする。

## 更新判断

### 更新する

次のいずれかが実質的に変化した場合に更新する。

* Initiative
* Status
* Scope
* Completed Checkpoint
* Next Action
* Blocker
* Human Decision
* Related Configuration
* Related Evidence

### 更新しない

次だけでは更新しない。

* 会話が進んだ
* 調査コマンドを実行した
* 細かな作業手順を一つ完了した
* 未承認の将来作業を思いついた
* Commit SHAを履歴として追記したい
* 進捗率を更新したい
* Snapshotの実質値が変わっていない

## Local Commit Verifyとの関係

Checkpoint完了は、ファイル編集やCommit実行だけでは確定しない。

Local Commit Verifyで次を確認した後に、Completed Checkpointを更新する。

* 承認ScopeだけがCommitされた
* `git show --check`がPASSした
* Review PackageとCommitが一致した
* Git Indexが空である
* Scope外差分が維持された
* Project State、Baseline、Runtimeが意図せず変化していない

この確認が完了する前は、Active Work上でCheckpointを完了扱いにしない。

## Initiative終了時

現在のInitiativeが完了し、次の承認済みInitiativeが存在する場合は、Active Workを次のInitiativeへ置き換える。

次のInitiativeがない場合は、`No Active Initiative`とする。

完了済みInitiativeの履歴はActive Workへ蓄積しない。

## 実務上の確認順序

作業再開時は、次の順番で確認する。

1. `status.md`
2. `active-work.md`
3. Active Workが示す関連Evidence
4. 対象Repositoryの最新正本
5. 必要なADR、Audit、Review Package

`status.md`だけで作業地点を推測しない。

`active-work.md`だけでProject StateやRuntime状態を推測しない。

## 学び

Current Snapshotは一つに集約すればよいわけではない。

異なる速度で変化し、異なる判断を支える情報は分離する。

```text
Project Stateは、Project全体の到達状態を示す。

Active Workは、現在作業中の復帰地点を示す。
```

正式状態と作業地点は、どちらも重要だが同じものではない。

Active Workは進捗表ではない。

Interrupt後に迷わず再開するためのBookmarkである。
