# BZ-20260810-017 Human側の判断履歴をAI実行条件へ混ぜる

## 分類

Governance / Responsibility Boundary

## 関連記録

- [WD-20260810-002 Human側の判断履歴をPublication実行条件から外した](../war-diary/WD-20260810-002-publication-execution-boundary.md)

## 症状

AI / CODEXが現在のPublication処理を実行するために、Human-controlled Decision HistoryやPrivate Operational Stateのidentity、status、completionを確認する必要がある状態になる。

現在判断そのものは確定していても、Human側の履歴Artifactが未作成、未更新、未確認であることを理由にInternal ReflectionやPublication Synchronizationが進められない。

## Root Cause

Current Execution DecisionとDecision Historyを同じ責務として扱った。

「なぜその判断になったか」を保存するHuman側の履歴責務と、「現在何を実行してよいか」を受け取るAI側のExecution Contractを分離していなかった。

重要なHistoryだからExecutionにも必要だろう、という直感で依存を追加すると、Human-onlyな管理対象が機械実行の前提条件へ入り込む。

## 教訓

AI / CODEXへ渡すのは、現在の処理に必要なHuman-approved Current Decisionとnon-private Execution Contextに限定する。

Human-controlled Historyの存在・状態・完了をAI側のExecution Gateにしない。

履歴保存が必要でも、それはHuman責務として独立させる。

不足・Conflictがある場合は履歴から推測せずHuman Decisionを求める。

Private Boundaryは情報公開範囲だけでなく、依存関係の境界として設計する。
