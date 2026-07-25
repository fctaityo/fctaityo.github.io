# WD-20260725-001 曖昧なPromptがReviewを一周増やした

## 日付

2026-07-25

## 出来事

Current SnapshotをConfiguration Item中心の表示から、人間が30秒以内に次の作業を理解できるWork Queue中心のDashboardへ再定義するReviewを実施した。

Round 1のReview Packageに対し、次の3点をReview Commentとして提示した。

- Work Queueの作業名をConfiguration Item名ではなく、人間が実施する行為へ変更する。
- 承認済みPriorityの正本が存在しないため、Priority列を削除する。
- Next Actionを最初に行う最小単位の行動へ短縮する。

3点はいずれも新しい設計論点ではなく、既存案の可読性を改善する軽微なReview Commentだった。

本来の意図は、3点を同一Review内で反映し、AI Reviewer Verdictを`PASS`へ更新したうえで、Repository反映とCommitへ進めることだった。

しかし、ChatGPTがCodex向けPromptへ次の表現を含めた。

- 「人間レビュー待ちへ進める」
- 「人間承認後は通常フローどおりCommitまで実施する」

この表現により、CodexはReview Commentの反映後にHuman Reviewを待つ別工程が必要だと解釈した。

その結果、Review Comment Resolutionを記録するためのRound 2 Review Packageが新たに作成された。

## 何が問題だったか

Codexは与えられた指示に従い、Review IDを維持したままRound 2を作成し、AI Reviewer Verdictを`PASS`、Human Final Decisionを`Pending`、Repository Actionを`Not Authorized`として停止した。

形式上は整合していた。

しかし、今回必要だったのは再Reviewではなく、Review Commentを反映して既存Reviewを完了させ、Repository Reflectionへ移ることだった。

Round 2 Review Packageの作成は品質上の問題ではないが、工程としては不要だった。

## Root Cause

ChatGPTが、実行してほしい工程と停止地点を明示せず、頭の中にある運用意図を自然言語で説明した。

特に「人間レビュー待ちへ進める」という表現が、状態更新ではなく新たなReview工程への移行として解釈できる余地を残した。

また、次の禁止事項を明記していなかった。

- 新しいReview Roundを作成しない。
- 新しいReview Packageを作成しない。
- 再Reviewを実施しない。
- Review Comment Resolution後はRepository Reflectionへ移る。

AIは曖昧な部分を善意で補完したが、その補完によって不要な工程が追加された。

## 修正

以後、CodexやAI Agentへ工程を指示する場合は、意図の説明だけでなく次を明示する。

- 実施する工程
- 更新する状態
- 停止地点
- 作成してよい成果物
- 作成してはいけない成果物
- 次工程へ進む条件

今回の指示であれば、次のように書くべきだった。

```text
Review Comment 3点を同一Review内で反映してください。

反映後、AI Reviewer VerdictをPASSへ更新してください。

新規Review、再Review、新しいReview Round、追加Review Packageは作成しないでください。

その後は承認済みScopeをRepositoryへ反映し、検証後に対象だけをCommitしてください。

Push、Releaseは実施しないでください。
