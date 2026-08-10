# WD-20260810-002 Human側の判断履歴をPublication実行条件から外した

## 日付

2026-08-10

## 出来事

Publication Governanceを運用する中で、現在のPublication判断をAI / CODEXへ渡すExecution Contractと、Human側で保持するDecision Historyの責務が近づきすぎていた。

Human-controlledな履歴ArtifactやPrivate Operational Stateの存在・状態をInternal / CODEX-facing Publication Executionの成立条件にすると、AI側の工程がHuman側の保存責務へ依存する。

これはCurrent Decisionを実行する責務と、過去の理由を保存する責務の混同だった。

そこでPublication Private Boundary Hotfixを実施した。

AI / CODEXへ渡すPublication判断は、Humanが現在有効と承認したHuman-approved Current Publication Decisionへ限定した。

必要なExecution ContextもInternal Source Identity、Approved Scope、必要なPublic Evidence、Internal Target等のnon-private情報へ限定した。

Human側のDecision HistoryやPrivate Operational Stateは、Internal ReflectionやPublication Synchronization Completeの成立条件から外した。

## 何が問題だったか

判断履歴は重要なProject Knowledgeである。

しかし、重要だからといって実行契約がその保存Artifactへ直接依存してよいわけではない。

履歴ArtifactはHumanが「なぜその判断をしたか」を保存する責務を持つ。

Execution Contractは「現在何を実行してよいか」を受け取る責務を持つ。

両者を結合すると、AIが本来知る必要のない履歴Artifactのidentity、status、completionまでExecution Gateへ入り込む。

## 修正

Publication Executionでは次だけを扱う。

- Current Internal Source
- Human-approved Current Publication Decision
- Approved Scope
- 必要なnon-private Execution Context

不足やConflictがある場合、AI / CODEXは履歴を推測せずHuman Decisionを求める。

Human側の履歴保存・更新・確認はHuman責務として維持するが、それ自体をAI側の完了条件にはしない。

## 学び

「履歴を保存すること」と「実行を履歴Artifactへ依存させること」は別である。

AIへ渡すべきものはHumanの思考履歴そのものではなく、現在の実行に必要な承認済みDecisionである。

Private Boundaryは秘密情報を隠すためだけではなく、責務依存を切るためのArchitectureでもある。
