# Configuration Audit一覧

本ページは、公開済みConfiguration Auditの索引である。内部運用規則、非公開Evidence、
Repository内部識別情報は各公開版から除外または一般化している。

| Audit ID | 実施日 | Scope（適用範囲） | Result（結果） | Baseline（基準状態） | 関連Review / ADR | Audit |
|---|---|---|---|---|---|---|
| <a id="cfg-20260730-001"></a>[`CFG-20260730-001`](CFG-20260730-001-planning-prompt-runtime-acceptance.md) | 2026-07-30 | `CFG-A001` Planning Prompt同期・Runtime Acceptance | Blocked | Draft / DSL System Prompt同期済み / Runtime Acceptance Blocked | `REV-20260730-001`（公開版未収録） | [Planning Prompt Repository Reflection Audit](CFG-20260730-001-planning-prompt-runtime-acceptance.md) |
| <a id="cfg-20260725-001"></a>[`CFG-20260725-001`](CFG-20260725-001-ollama-provider-verification.md) | 2026-07-25 | `CFG-P001` Ollama Provider Settings検証 | Synchronized | Provisional / Partially Synchronized / Blocked | `ADR-0008` | [Ollama Provider Verification Audit](CFG-20260725-001-ollama-provider-verification.md) |
| <a id="cfg-20260724-002"></a>[`CFG-20260724-002`](CFG-20260724-002-configuration-synchronization.md) | 2026-07-24 | Working Tree分類、Draft / DSL Prompt・Code・LLM Parameters比較 | Blocked | Provisional / Classified / Blocked | `ADR-0008`, `ADR-0009`, Operational Reviews | [Configuration Synchronization Audit](CFG-20260724-002-configuration-synchronization.md) |

## 公開範囲

内部Configuration Auditのうち、公開版が作成されていないAuditは本索引へ掲載しない。
公開版を追加する場合は、本文ファイルの配置と同じ変更で本索引を更新し、相対リンクの到達性を確認する。
