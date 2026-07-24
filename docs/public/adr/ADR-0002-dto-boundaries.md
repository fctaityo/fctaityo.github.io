# ADR-0002: Agent間境界にDTOを採用する

- Status: Accepted
- Date: 2026-07-16
- Scope: Agent間データ交換

## 背景

raw LLM出力や巨大な前工程JSONをそのまま渡すと、後続Agentが前工程のStageや不要な文脈を模倣し、役割を逸脱した。

## 問題

後続が必要とするデータと、前工程の内部表現・debug・制御情報が分離されていない。フィールドの類似名による意味転用も起こり得る。

## 候補

1. raw textを直接渡す
2. 全Stage共通の巨大JSONを渡す
3. Stage別DTOと役割別の最小DTOを渡す

## 採用案

Planning、Researchは正式なStage DTOを使用する。ReviewとFinal AuditにはBuilderで最小入力DTOを作る。Retry情報はResearch DTOへ混ぜず監査bundleへ分離する。

## 採用理由

入力面積を限定し、類似フィールドの意味差を仕様化できる。Agent追加時もDTOのproducer、consumer、違反動作を個別管理できる。

## 採用しなかった案

- raw text: 構造・型・Stageを保証できない
- 共通巨大JSON: 不要文脈、トークン増大、責務混在を招く

## 影響範囲

Agent prompt、Normalizeの入力、Review/Audit DTO Builder、Package artifact、ログに影響する。DTOの正本は dify-dto-contracts.md とする。

[Public Documentationへ戻る](../README-public.md)

