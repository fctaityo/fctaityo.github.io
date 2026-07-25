# BZ-20260725-015 曖昧なPromptが工程を増やした事件

## 分類

Prompt / Agent Instruction

## 関連記録

- [WD-20260725-001 曖昧なPromptがReviewを一周増やした](../war-diary/WD-20260725-001-ambiguous-prompt-added-review-round.md)

## 症状

Review Comment Resolutionだけで済むはずだった作業に対し、不要なRound 2 Review Packageが生成された。

本来必要だったのは、同一Review内でReview Commentを解消し、AI Reviewer Verdictを更新して停止することだった。

しかし、Prompt内の「人間レビュー待ちへ進める」「人間承認後は通常フローどおりCommitまで実施する」という表現により、Codexは別のReview工程が必要だと解釈した。

結果として、内容上は整合していたが、工程上は不要なReview RoundとReview Packageが追加された。

## Root Cause

AIへ実施してほしい工程ではなく、作業者の意図を自然言語で説明していた。

実施する処理、更新する状態、停止地点、次工程への遷移条件が固定されていなかった。

また、新規Review、追加Round、追加Review Packageを作成しないという禁止事項も明示していなかった。

AIは不足している工程を補完し、指示と矛盾しない追加成果物を生成した。

## 教訓

AIへの指示は意図ではなく工程で書く。

実施する処理、更新する状態、停止地点、作成する成果物、作成してはいけない成果物を明示する。

「待つ」「進める」「通常フロー」のような、複数の工程に解釈できる表現を単独で使わない。

AIが余計なことをしたように見える場合は、先にPromptが余計な工程を許していなかったか確認する。
