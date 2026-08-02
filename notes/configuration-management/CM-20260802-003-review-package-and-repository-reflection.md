# CM-20260802-003 Review PackageからRepository Reflectionまでの境界

## ID

`CM-20260802-003`

## 日付

2026-08-02

## 分類

Review / Repository Reflection

## 目的

AIが成果物とEvidenceを準備する工程、人間が内容を承認する工程、承認済み成果物をRepositoryへ固定する工程を分離し、AIの完了報告だけでRepositoryを変更しない。

## 背景

以前の作業では、AIが変更を行った後に次のような報告だけで終了する場合があった。

```text
修正しました。
検証しました。
完了です。
```

この形式ではHumanが確認できない。

* 実際に何が変わったか
* 承認Scope外が変わっていないか
* 既存内容が維持されたか
* 説明とWorking Treeが一致するか
* Commitしてよい状態か
* Evidenceが十分か

Local AI Foundryでは、変更を直接Commitする前にReview Packageを作成し、Human Reviewを通過した場合だけRepository Reflectionへ進む運用が定着した。

標準的な流れは次のとおり。

```text
Working Tree
↓
Configuration Audit
↓
Configuration Report
↓
Review Package
↓
Human Review
↓
Repository Reflection
↓
Local Commit Verify
```

## 各工程の責務

### Working Tree

AIが承認Scope内の変更を作成する。

この段階では正本へ固定されていない。

確認対象：

* 実差分
* 新規ファイル
* 削除ファイル
* Renameまたは移動
* Scope外差分
* Git Index

禁止事項：

* Human Review前のCommit
* Scope外変更
* 無断Stage
* 無断Push
* DifyまたはRuntimeへの無断操作

### Configuration Audit

ExpectedとActualを比較し、同期状態、Drift、Warning、Unknownを記録する。

Auditの目的は犯人探しではない。

人間が判断できるよう、現在状態と期待状態の差をEvidence付きで示す。

AuditはHuman Approvalの代替ではない。

### Configuration Report

Audit結果を、現在のConfiguration状態と残作業が把握できる形に要約する。

主な内容：

* 対象Configuration Item
* Current Status
* Synchronized領域
* Warning
* Definition of Done
* Remaining Action
* Authorization状態

ReportはAuditの要約であり、実差分の代替ではない。

### Review Package

Human Reviewに必要な成果物とEvidenceを一つの範囲へ固定する。

主な内容：

* Package ID
* Baseline HEAD
* Branch
* Configuration Item
* Audit
* Report
* Human Decision
* Review Scope
* Responsibility Boundary
* Full Actual Diff
* Verification結果
* Working Tree状態
* Next Smallest Action

Review Packageは説明資料ではない。

Humanが実際の変更をレビューするための提出物である。

AIの「できました」という報告ではなく、Humanが採用判断できる実体を提示する。

### Human Review

HumanはReview Packageと実差分を確認し、次のいずれかを判断する。

* PASS
* FAIL
* 修正要求
* Scope変更
* 保留

Human ReviewがPASSするまで、Repository Reflection AuthorityとCommit Authorizationを付与しない。

AIが自分で作成した成果物を自分で最終承認してはならない。

### Repository Reflection

Human Reviewで承認されたScopeだけをRepositoryへ固定する。

Repository Typeに応じて完了条件を分ける。

#### Internal Repository

* Local Commit
* Local Commit Verify
* Pushはremoteや承認条件により`Not Applicable`になり得る

#### Public Repository

* Commit
* Push
* GitHub Read Verify
* 公開状態確認

Public Repositoryは、明示承認がない限りRead Onlyとする。

### Local Commit Verify

Commitした事実と、承認内容が正しくCommitされた事実を分離して確認する。

主な確認項目：

* Commit SHA
* Commit Message
* Branch
* Commit Scope
* ファイル別差分
* `git show --check`
* Review Packageとの一致
* Configuration Item反映
* ADR反映
* Historical Evidence非改変
* Scope外tracked差分fingerprint
* Git Index
* Working Tree
* Project State
* Active Baseline
* Runtime Status
* Runtime Acceptance
* Git remote
* Push実施有無
* Public Repository状態
* Dify状態
* Runtime状態

Commitコマンドが成功しただけでは完了としない。

## Authorization境界

次の状態を区別する。

| 状態                              | 意味                       |
| ------------------------------- | ------------------------ |
| Scope Authorization             | Working Treeを作成してよい      |
| Human Review                    | 提出成果物をHumanが確認した         |
| Repository Reflection Authority | 承認成果物を正本へ反映してよい          |
| Commit Authorization            | 指定ScopeをCommitしてよい       |
| Push Authorization              | 指定remote・branchへPushしてよい |

これらを一つの「承認済み」にまとめない。

Working Tree作成の承認は、CommitやPushの承認ではない。

Human Review PASSは、承認されたScope以外を変更する許可ではない。

Commit Authorizationは、Dify操作やRuntime実行の許可ではない。

## Review Package Reflection

Review Package作成後にWorking Treeを修正した場合、Review Packageを再同期する。

次を許可しない。

* 古いReview Packageで新しいWorking Treeを承認する
* 説明文だけ更新し、Full Actual Diffを更新しない
* Minor Editorial修正をPackageへ反映せずCommitする
* Human Review後に差分を追加する

Review対象とCommit対象は一致させる。

一致しない場合は、再Reviewまたは新しいReview Packageが必要となる。

## 最小変更

Review Packageは、承認Scope以外のRepository全体を再生成するための仕組みではない。

次を守る。

* 正本全文を取得する
* 必要な変更だけを適用する
* 対象外の既存内容を維持する
* Historical Evidenceを勝手に書き換えない
* Scope外差分を保存する
* Commit後に正本から再取得して確認する

## Active Workとの関係

Local Commit VerifyでCheckpoint完了が確定した後、必要に応じて`active-work.md`を同期する。

Review Package提出時点では、Checkpointを完了扱いにしない。

Human Review PASSだけでも完了扱いにしない。

Repository ReflectionとLocal Commit Verifyが完了した時点で、Completed Checkpointを進める。

## 学び

AIは速く作れる。

しかし、速く作れることと、正しく正本へ反映されたことは別である。

```text
AIはEvidenceを揃える。

Humanは採用を判断する。

Repository Reflectionは承認結果を正本へ固定する。

Local Commit Verifyは固定結果を再確認する。
```

Review Packageの価値は、AIの説明を読みやすくすることではない。

人間が成果物を実際に確認し、責任を持って採用判断できるようにすることにある。

Commitは作業終了操作ではない。

承認された成果物を正本へ固定する工程である。
