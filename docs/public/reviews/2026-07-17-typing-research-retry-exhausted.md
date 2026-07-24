# Research Retry Exhausted 打鍵レビュー

- Review ID: `REV-20260717-002`
- 日付: 2026-07-17
- Status: `Open`
- Review Type: 打鍵レビュー / 実運用レビュー
- 対象: Research Stage
- 関連ADR: [ADR-0004](../adr/ADR-0004-research-bounded-retry-public.md)

## 観測事実

Planning Stageは正常に完了した。

Research Stageの初回生成はContractを満たさず、設計どおり1回だけRetryした。Retry後もResearch Contractを満たさなかったため、最終GateがWorkflowを停止した。

Writing以降のStageは実行されていない。サービス障害ではなく、壊れたResearch DTOを後段へ渡さないための正常な停止だった。

## 期待結果

- Research Agentが完全なResearch DTOを単一の構造化データとして返す。
- 初回失敗時は、失敗原因を縮退させたRetry入力を使用する。
- Retry後もContractを満たさない場合は、有限回数で停止する。
- Normalizeが欠落した意味情報を創作して通過させない。

## 実際結果

初回生成とRetry生成の双方で、長い自然言語や引用符を含む出力が構造を破壊した。

抽出処理は完全なResearch DTOを取得できず、必須項目を欠落として扱った。Retryでも初回出力と似た長さ・構造が再生成され、同じ失敗形態が繰り返された。

## Root Cause

直接原因はResearch DTOの構文不正である。

再発を招いた根本原因は、Retryが初回の失敗出力を大きな文脈として再利用し、モデルへ「何を残し、何を捨て、どこまで短くするか」を十分に制約できていなかったことにある。

Retryは再実行されていたが、失敗原因を減らす方向へ縮退していなかった。

## Gateの評価

Retry上限到達後、最終GateはResearch DTOを拒否し、Writing以降を実行しなかった。

この停止動作はContract-Driven Architectureとして設計どおりである。問題はGateが厳しすぎることではなく、Retry入力が同じ失敗を再生産したことにある。

## 改善方針

- Retry ContextをContract違反と短い正規化済み材料に限定する。
- 初回のraw出力全文をそのまま再投入しない。
- Research DTOの各項目に責務と上限を設ける。
- Retryでは、意味を維持しながら短く完全なDTOを返すよう要求する。
- Retry回数やGate条件を安易に緩和しない。
- Normalizeによる意味生成で構文不正を隠蔽しない。

## 関連ADR

[ADR-0004 Research Bounded Retry](../adr/ADR-0004-research-bounded-retry-public.md)

[Operational Review一覧へ戻る](index.md)

## Lessons Learned

Retryは「もう一度同じことを頼む機能」ではない。

Retryには、失敗原因を減らし、出力をより小さく、より明確な契約へ収束させる責務がある。同じ文脈を再投入して同じ出力を期待するだけでは、失敗を1回増やすだけになる。

## 判定

`Open`

Retry Contextの責務とResearch DTOの出力制約を見直し、同一条件で回帰試験を実施する。
