# WD-20260725-001 曖昧なPromptがReviewを一周増やした

## 日付

2026-07-25

## 出来事

Current SnapshotをConfiguration Item中心の表示から、人間が30秒以内に次の作業を理解できるWork Queue中心のDashboardへ再定義するReviewを実施した。

Round 1のReview Packageに対し、次の3点をReview Commentとして提示した。

- Work Queueの作業名をConfiguration Item名ではなく、人間が実施する行為へ変更する。
- 承認済みPriorityの正本が存在しないため、Priority列を削除する。
- Next Actionを、最初に行う最小単位の行動へ短縮する。

3点はいずれも新しい設計論点ではなく、既存案の可読性を改善するReview Commentだった。

本来の意図は、3点を同一Review内で反映し、AI Reviewer Verdictを `PASS` へ更新したうえで、Human Final Decisionを待つことだった。

しかし、ChatGPTがCodex向けPromptへ次の表現を含めた。

- 「人間レビュー待ちへ進める」
- 「人間承認後は通常フローどおりCommitまで実施する」

この表現により、CodexはReview Commentの反映後に、別のReview工程が必要だと解釈した。

その結果、Review Comment Resolutionを記録するためのRound 2 Review Packageが新たに作成された。

## 何が問題だったか

Codexは与えられた指示に従い、Review IDを維持したままRound 2を作成した。

そのうえで、状態を次のように更新した。

- AI Reviewer Verdict: `PASS`
- Human Final Decision: `Pending`
- Repository Action: `Not Authorized`

形式上は整合していた。

しかし、今回必要だったのは再Reviewではない。

必要だったのは、同一Review内でReview Commentを解消し、AI Reviewer Verdictを `PASS` へ更新したうえで停止することだった。

Round 2 Review Packageの作成は、品質上の問題ではない。

ただし、工程としては不要だった。

## Root Cause

ChatGPTが、実行してほしい工程と停止地点を明示せず、頭の中にある運用意図を自然言語で説明した。

特に「人間レビュー待ちへ進める」という表現が、状態更新ではなく、新たなReview工程への移行として解釈できる余地を残した。

また、次の禁止事項を明記していなかった。

- 新しいReview Roundを作成しない。
- 新しいReview Packageを作成しない。
- 再Reviewを実施しない。
- Review Comment Resolution後は、AI Reviewer Verdictを更新して停止する。

Codexは曖昧な部分を善意で補完した。

その補完によって、不要な工程が追加された。

## 修正

Round 2は、新しいReview Roundではなく、Review Comment Resolutionとして扱った。

追加のReview Packageは作成しないことを明示した。

その後、AI Reviewer Verdictを `PASS`、Human Final Decisionを `Pending`、Repository Actionを `Not Authorized` としてReviewを停止した。

Human Final Decisionが `PASS` となった後は、Review工程を再開せず、Repository Reflectionへ移行することを明示した。

Repository Reflectionでは、承認済みScopeのみを反映し、検証後に対象ファイルだけをCommitする。

PushおよびReleaseは実施しない。

## 今後の指示方法

CodexやAI Agentへ工程を指示する場合は、意図の説明だけでなく、次の項目を明示する。

- 実施する工程
- 更新する状態
- 停止地点
- 作成してよい成果物
- 作成してはいけない成果物
- 次工程へ進む条件

今回であれば、次のように指示すべきだった。

    Review Comment 3点を同一Review内で反映してください。

    反映後、AI Reviewer VerdictをPASSへ更新してください。

    Round 2はReview Comment Resolutionとして記録してください。

    新規Review、再Review、新しいReview Round、追加Review Packageは作成しないでください。

    Human Final DecisionをPending、Repository ActionをNot Authorizedとして停止してください。

## 学び

AIへの指示は、意図ではなく工程で書く。

「何を目指しているか」だけではなく、「何を実行し、どこで止まり、何を作らないか」まで固定する。

Codexが指示を理解できなかったのではない。

曖昧な指示を、矛盾しない形で忠実に実行した結果、不要な工程が生まれた。

AIが余計なことをしたように見える場合は、先にPromptが余計な工程を許していなかったかを確認する。

Promptの品質は、文章の分かりやすさだけでは決まらない。

工程、権限、成果物、停止条件が一意に決まることまで含めて、良いPromptである。
