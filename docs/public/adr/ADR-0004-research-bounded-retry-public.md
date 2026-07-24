# ADR-0004: Research契約違反に有限Retryを採用する

- Status: Accepted
- Date: 2026-07-16
- Scope: Research stage

## 背景（Context）

Research Agentは、同一の入力と指示に対しても、まれに必須項目の欠落や形式不一致を含む出力を返すことがある。

Contract Gateがこの違反を検出した場合、壊れたResearch成果物をそのままWritingへ渡すことはできない。一方で、偶発的な契約違反のたびに人間がWorkflowを再実行する運用は、回復性と自動化の両面で望ましくない。

この問題に対しては、Gateを弱めず、Retryの停止性と責任範囲を保ったまま回復する仕組みが必要である。

## 問題（Problem）

- Contract Gateを緩和すると、必須情報を欠いたDTOが後続Stageへ流れる。
- Retryを無制限にすると、停止性、コスト予測、監査可能性が失われる。
- 契約違反と、接続障害、timeout、実行例外などのシステム障害を同じRetryへ含めると、責任範囲が曖昧になる。
- Retry処理が循環構造を持つと、実行回数と状態遷移を静的に説明しにくくなる。

## 候補（Options）

1. Retryを行わない
2. Contract Gateの条件を緩和する
3. 循環構造で複数回Retryする
4. Research Stageの契約違反に限り、非循環構造で有限Retryを行う

## 決定（Decision）

Research Stageでは、Contract Gateが契約違反を検出した場合に限り、同一Stage内で有限回のRetryを行う。

Retry後の出力にも、初回と同一のNormalizeおよびContract Gateを適用する。再評価後も契約を満たさない場合はWorkflowを停止し、Writing以降のStageへは進めない。

Retry対象はResearch DTOの契約違反に限定する。モデル接続、timeout、Code例外、外部サービス障害などは、この契約Retryの対象に含めない。

Retry graphは循環させず、最大実行回数を構造上説明できる形とする。

## 採用理由（Rationale）

- Contract Gateの厳格さを維持したまま、偶発的な契約違反から回復できる。
- 壊れたDTOを後続Stageへ流さずに済む。
- Retryの最大回数と停止条件を明確にできる。
- 契約違反とシステム障害の責任範囲を分離できる。
- 非循環構造により、実行回数と状態遷移を監査しやすい。

## 採用しなかった案（Rejected Options）

### Retryを行わない

偶発的な契約違反のたびに、運用者による再実行が必要になる。

### Contract Gateを緩和する

回復性のために契約保証を失うことになり、後続Stageへ不完全なDTOが流れる。

### 循環構造で複数回Retryする

実行回数の上限、状態の引き継ぎ、停止条件が複雑になり、無限化や状態混線のリスクが高まる。

## 影響（Consequences）

### Positive（肯定的影響）

- Research Stageの一時的な出力揺らぎに対する回復性が向上する。
- Contract Gateを弱めずにWorkflowの自動完走率を改善できる。
- Retryの範囲と停止条件を明示できる。
- Workflowの停止性を構造として保証しやすくなる。

### Negative（否定的影響）

- Research Stageのgraphと監査対象が増える。
- Retry分のモデル実行コストが発生する。
- 契約違反とシステム障害を分類する運用が必要になる。
- Retry後も契約を満たさない場合は、Workflowが明示的に停止する。

## 適用範囲（Scope）

本ADRはResearch StageにおけるDTO契約違反の回復に適用する。

Planning、Writing、Review、Final AuditのRetry方針、ならびにインフラ障害や外部サービス障害の再試行方針は、本ADRの適用範囲外とする。

## 関連資料（Related）

- [ADR-0002: Agent間境界にDTOを採用する](ADR-0002-dto-boundaries.md)
- [REV-20260717-002 Research Retry Exhausted](../reviews/2026-07-17-typing-research-retry-exhausted.md)

[Public Documentationへ戻る](../README-public.md)
