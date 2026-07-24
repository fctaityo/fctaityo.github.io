# Review Knowledge Base

## Operational Reviewの目的

このディレクトリは、Local AI Foundryで実施した打鍵レビュー、実運用レビュー、品質レビューのうち、公開可能な記録をProject Knowledgeとして保存するためのものです。

レビュー一覧は[index.md](index.md)を参照してください。

[Public Documentationへ戻る](../README-public.md)

公開版では、設計上の判断、観測された問題、改善の方向性を残しつつ、実行環境固有の値、内部Run ID、Commit SHA、非公開証跡、運用上の機微情報は省略しています。

## 運用規則

- レビューごとに独立したMarkdownを作成する。
- 観測事実、期待結果、実際結果、影響、原因、対応、判定を分離して記録する。
- Review IDは文書単位で`REV-YYYYMMDD-NNN`形式とする。
- 各レビューには`Open`、`Resolved`、`Closed`、`Won't Fix`のいずれかを付ける。
- `Resolved`は修正と回帰確認が完了したレビューに使用する。
- `Closed`は問題ではない、または追加対応が不要と確認されたレビューに使用する。
- `Won't Fix`は、未修正の理由、受容する影響、代替運用、再検討条件を記録する。
- 設計変更が生じた場合は、関連するADR、Architecture、Error Catalog、Workflow Documentationと同期する。
- 認証情報、個人情報、内部URL、ローカルパス、非公開の実行識別子は記録しない。
- 修正完了後もレビュー記録を削除しない。

## 原則

### 1 Review = 1 Problem = 1 Root Cause

1つのレビュー票には、原則として1つの問題と1つのRoot Causeを記録します。

複数の不具合や異なる修正責務が判明した場合は、レビュー票を分割し、それぞれ独立したReview IDを採番します。原因、修正責務、完了条件はレビュー票ごとに一意とします。

## ファイル名

```text
YYYY-MM-DD-<review-kind>-<short-topic>.md
```

例:

```text
2026-07-17-e2e-section-writing-integrity.md
```

## Status一覧

| Status | 意味 |
|---|---|
| Open | 調査中、対応中、または再確認待ち |
| Resolved | 修正と検証が完了 |
| Closed | 問題ではない、または追加対応不要 |
| Won't Fix | 問題を認識したうえで修正しない |

## ADRとの関係

重要な設計変更はReviewからADRへ接続し、ADRからも根拠となったReviewを参照します。

Reviewは具体的な観測事実を記録し、ADRはその事実を踏まえて採用した恒久的な設計判断を記録します。ReviewがResolveされても、判断の根拠として本文を残します。

Reviewから次のいずれかが必要になった場合はADRを提案します。

- 責務境界または正本の変更
- Contract、Gate、Retry方針の恒久変更
- Configuration Management方針の変更
- 複数StageまたはProject全体へ影響する判断

## 公開版と内部正本

このディレクトリの文書は公開用に編集された配布版です。

内部正本には、より詳細なEvidence、実行情報、構成情報、調査過程が含まれる場合があります。公開版は内部正本を置き換えるものではなく、設計判断とLessons Learnedを外部共有するための派生成果物です。
