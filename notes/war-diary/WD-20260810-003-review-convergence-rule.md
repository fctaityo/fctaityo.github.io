# WD-20260810-003 Reviewが終わらない構造をConvergence Ruleで止めた

## 日付

2026-08-10

## 出来事

Human ReviewでFindingを出し、CorrectionしたArtifactをもう一度AIへ渡すと、AIが新しいSemantic Reviewを開始して追加Findingを探す余地があった。

CorrectionのたびにReview全体へ戻ると、前回とは別の改善点やEditorial Preferenceまで見つかり、さらにCorrectionが発生する。

品質を上げようとしているのに、Commitへ進む停止条件そのものが消える構造だった。

これは2026-07-25の「曖昧なPromptがReview Roundを増やした」事件とは異なる。

今回はPrompt表現だけではなく、Review Process自体にConvergence Contractが不足していた。

そこでReview Convergence Ruleを導入した。

## 導入した境界

一つのEvidence Setに対してComplete Semantic Reviewは一度だけ行う。

Complete Reviewでは、その時点で確認可能なFindingをまとめて提示する。

FindingはBlocking Defect、Non-blocking Correction、Improvementへ分類する。

HumanがFinal Classification / Disposition、Semantic Freeze、Risk Acceptance、Correction採否、Commit Authorizationを決定する。

Semantic Freeze後のCorrectionは一つのCorrection Batchへ集約する。

Correction後はComplete Semantic Reviewへ戻らず、Correction Verificationとして承認済みFindingが直ったか、意味が維持されたか、Scopeが逸脱していないかだけを確認する。

Final Commit BoundaryではBlocking DefectだけをCurrent Commit停止条件とする。

ImprovementはFuture ScopeへDeferredできる。

Human Review PASS後は追加Semantic Reviewを開始せず、Execution Verificationへ進む。

## 学び

Review品質を上げることと、Review回数を増やすことは同じではない。

同じEvidence Setに対するFinding探索は一度でやり切る。

Correction Artifactは新しいSemantic Review Triggerではない。

AI Reviewerは推奨を出す責務を持つが、Final DispositionやCommit Authorizationを自分で確定しない。

Reviewを収束させるには、開始条件だけでなく終了条件と再入条件をContractとして持つ必要がある。

## 関連

- [WD-20260725-001 曖昧なPromptがReviewを一周増やした](WD-20260725-001-ambiguous-prompt-added-review-round.md)
- [BZ-20260810-018 Correction ArtifactでSemantic Reviewが再起動する](../bug-zoo/BZ-20260810-018-correction-reopens-semantic-review.md)
