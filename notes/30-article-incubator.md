# NOTE記事インキュベータ

このファイルは、将来の記事になり得るテーマや構想を蓄積する。

完成した記事や単なる思いつきではなく、
調査・検証・構造化する価値があるテーマを育てることを目的とする。

## 確定シリーズ（Local AI Foundry 開発ログ）

- 01 Local AI Foundry 完全始動！（公開）
- 02 AIは悪くなかった。悪かったのは設計だった。（公開）
- 03 Contract Drivenとは何か？（公開）
- 04 DTOだけを受け渡す理由（公開）
- 05 NormalizeはAIを信用しないためにある（公開）
- 06 Retryは保険ではない（公開）
- 07 すべて直した。それでも終わらなかった。（公開）
  - 副題：Configuration Managementという最後の壁
- 08 Runtimeを見ないレビューはレビューではない
- 09 Documentationは説明書ではなくUX

構成の軸：生成のレイヤー（Contract→DTO→Normalize→Retry）から、運用・検証・可視化のレイヤー（Configuration→Runtime Review→Documentation）へ積み上がる流れ。01〜09で一区切り（Season1）。

## Backlog（昇格待ち）

### AIへの指示は意図ではなく工程で書く

- 現状：
  - War Diary：WD-20260725-001
  - Bug Zoo：BZ-20260725-015
- 核となるテーマ：
  - AIは人間の意図を読むのではなく、Promptから実行可能な工程を構築する。
  - 「待つ」「進める」「通常フロー」のような曖昧な表現は、人間には自然でもAIには複数の工程として解釈される。
  - 実施する処理、更新する状態、停止地点、成果物、禁止事項まで固定して初めて工程が一意になる。
- 昇格条件：
  - Prompt設計の一般則として整理できること。
  - 同種事例が複数集まり、設計原則として説明できること。

### Aggregatorが全部を壊した日（笑）

- 現状：
  - War Diary：未記録
  - Bug Zoo：未登録
  - Hall of Fame：未登録
  - Operational Review：未作成
  - ADR：未作成
- 核となるテーマ：
  - Aggregatorが責務を超えて情報を再構成・再生成したことで、Workflow全体の整合性が崩壊した。
  - 問題は実装ではなく、責務境界を曖昧にした設計にあった。
  - Aggregatorは「統合」だけを行い、「意味を作らない」という設計原則へ至る契機となった。
- 昇格条件：
  - War Diaryへの事実記録。
  - Bug Zooへの一般化。
  - Operational ReviewによるRoot Cause分析。
  - ADRとして設計判断が確立した時点で、正式シリーズへの昇格を再検討する。
