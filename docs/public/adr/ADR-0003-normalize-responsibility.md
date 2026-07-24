# ADR-0003: Normalizeを構造補正に限定する

- Status: Accepted
- Date: 2026-07-16
- Scope: Contract Normalize nodes

## 背景

LLMはJSON前後の文字列、欠落stage、トップレベルに出たhandoff項目、任意配列の欠落など、意味を変えず補正できる揺らぎを返す。

## 問題

補正を全面禁止すると回復可能な構造差で停止する。一方、欠落した要約や事実をCode nodeが補うと、未生成の意味を捏造する。

## 候補

1. 一切Normalizeせず厳密一致のみ許可する
2. 意味を含め不足項目を自動補完する
3. 構造補正だけを許可し、意味欠落はGateへ渡す

## 採用案

型・空値の正規化、固定stageの構造補正、既存handoff値の階層移動、任意項目の空配列化に限定する。Planningでは正規化済みStart入力から同義フィールドへの限定補完を許可する。

## 採用理由

回復可能な表現差と、Agentが生成すべき意味の欠落を分離できる。`research_summary` や `confirmed_points` の捏造を防げる。

## 採用しなかった案

- Normalizeなし: 実害のない構造揺らぎで停止率が上がる
- 意味補完: Gateを形式的に通すだけの偽データを作る

## 影響範囲

Planning/Research Normalize、Contract status、debug記録、テストに影響する。禁止転用はDTO仕様に従う。

