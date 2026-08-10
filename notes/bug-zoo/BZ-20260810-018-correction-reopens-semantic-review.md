# BZ-20260810-018 Correction ArtifactでSemantic Reviewが再起動する

## 分類

Review / Evidence / Artifact

## 関連記録

- [WD-20260810-003 Reviewが終わらない構造をConvergence Ruleで止めた](../war-diary/WD-20260810-003-review-convergence-rule.md)
- [BZ-20260725-015 曖昧なPromptが工程を増やした事件](BZ-20260725-015-ambiguous-prompt-added-review-round.md)

## 症状

Complete ReviewでFindingを出し、そのFindingを修正したArtifactを再提示すると、新しいComplete Semantic Reviewが開始される。

新しいReviewでは前回Findingと無関係な改善点やEditorial Preferenceまで発見され、追加Correctionが発生する。

Correctionのたびに同じことを繰り返し、品質上は大きなBlocking DefectがないのにCommitへ到達できない。

## Root Cause

Review Phaseと再入条件が定義されていなかった。

Correction Artifactを「承認済みFindingの修正版」ではなく「新しいEvidence Set」として扱い、Finding探索を毎回ゼロから再開していた。

Reviewの目的を品質確認だけで定義し、収束条件をContract化していなかった。

## 教訓

One Evidence Setに対するComplete Semantic Reviewは一度だけ行う。

Complete Reviewで確認可能なFindingをまとめ、Human Decision後にSemantic Freezeする。

Correctionは一つのCorrection Batchへ集約し、その後はCorrection Verificationで指定Finding、意味維持、Scope、Verificationだけを確認する。

Correction Artifactを新しいSemantic Review Triggerにしない。

Correctionによって新しいBlocking Defectが生じた場合は停止できるが、無関係なFinding探索を再開しない。

Final Commit BoundaryではHumanがBlocking DefectとDispositionしたFindingだけを停止条件にする。
