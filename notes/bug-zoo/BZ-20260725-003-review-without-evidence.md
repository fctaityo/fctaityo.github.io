# BZ-20260725-003 git diffください事件（笑）

- Status: Merged
- Merged Into: [BZ-20260731-016 Partial SourceをCanonical Sourceとして扱う](BZ-20260731-016-partial-source-as-canonical-source.md)

## 分類

Review / Evidence

## 症状

Evidenceを見ずにレビューした。

## Root Cause

レビュー対象の実体ではなく、説明や要約だけを根拠に判定しようとした。

## 教訓

AIもレビュー対象を読まなければ人間と同じ失敗をする。

## 統合理由

レビュー対象の実体やEvidenceを十分に取得せず、説明や要約だけを根拠に判定した事象は、BZ-20260731-016が扱う「不完全なSourceをCanonical Sourceとして扱う」障害パターンに包含される。

本IDは履歴追跡のため削除・再利用せず、統合済み記録として保持する。
