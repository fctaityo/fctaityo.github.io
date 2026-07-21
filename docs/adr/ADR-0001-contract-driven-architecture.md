---
title: ADR-0001 Contract-Driven Architecture
---

# ADR-0001: Contract-Driven Architectureを採用する

- Status: Accepted
- Date: 2026-07-16
- Scope: Dify multi-agent workflow

## 背景

Local AI FoundryではLLMの非決定的な出力を7段階のAgent間で受け渡す。実運用で、Workflowが完走しても空成果物や別Stage形式が後段へ渡るSilent Failureが発生した。

## 問題

プロンプトだけでは、必須項目、型、空値、Stage境界を実行時に保証できない。後段がraw出力を善意に解釈すると、失敗位置と責任範囲が不明になる。

## 候補

1. プロンプト指示だけで形式を揃える
2. Package Outputで全Stageを一括救済する
3. 各StageにDTO、Normalize、Contract Gateを置く

## 採用案

各Stageを `Agent → DTO候補 → Normalize → Contract Gate` の契約境界として実装する。現時点ではPlanningとResearchに正式実装し、他Stageへ段階展開する。

## 採用理由

失敗を発生Stageで局所化でき、壊れたDTOを後段へ流さず、Agent数が増えても同じ責務単位で保守できる。意味生成と構造保証を分離できる。

## 採用しなかった案

- プロンプトのみ: 出力揺らぎを実行時に検出できない
- Package一括救済: 失敗を隠し、Package Outputへ責務が集中する

## 影響範囲

Dify graph、DTO仕様、Stage別テスト、監査ログに影響する。Agentが生成する意味内容は制約しない。詳細契約は [DTO仕様](../dify-dto-contracts.md) を参照する。

