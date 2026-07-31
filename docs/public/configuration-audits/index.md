# Configuration Audit一覧

本ページは、公開済みConfiguration Auditの索引である。

公開版の作成・マスク・内部Auditとの対応規則は[Public Configuration Audit](README.md)を参照する。

| Audit ID | 実施日 | Scope（適用範囲） | Result（結果） | Baseline（基準状態） | 関連Review / ADR | Audit |
|---|---|---|---|---|---|---|
| <a id="cfg-20260801-001"></a>[`CFG-20260801-001`](CFG-20260801-001-project-state-governance.md) | 2026-08-01 | Project State / Current Snapshot Governance | Synchronized | Initial State `Draft Verified` / Active Baseline確定 | Project State Governance Decision | [Project State Governance Audit](CFG-20260801-001-project-state-governance.md) |
| <a id="cfg-20260730-002"></a>[`CFG-20260730-002`](CFG-20260730-002-configuration-registration-research-writing-hardening.md) | 2026-07-30 | Research / Writing Plan Hardening Configuration Registration | Blocked | Registration Completed / Implementation Not Started | Registration Human Decision | [Configuration Registration Audit](CFG-20260730-002-configuration-registration-research-writing-hardening.md) |
| <a id="cfg-20260730-001"></a>[`CFG-20260730-001`](CFG-20260730-001-planning-prompt-runtime-acceptance.md) | 2026-07-30 | Planning Prompt同期・Runtime Acceptance | Blocked | Draft / DSL System Prompt同期済み / Runtime Acceptance Blocked | `REV-20260730-001`（公開版未収録） | [Planning Prompt Repository Reflection Audit](CFG-20260730-001-planning-prompt-runtime-acceptance.md) |
| <a id="cfg-20260725-001"></a>[`CFG-20260725-001`](CFG-20260725-001-ollama-provider-verification.md) | 2026-07-25 | Ollama Provider Settings検証 | Synchronized | Provider Configuration Verification | `ADR-0008` | [Ollama Provider Verification Audit](CFG-20260725-001-ollama-provider-verification.md) |
| <a id="cfg-20260724-002"></a>[`CFG-20260724-002`](CFG-20260724-002-configuration-synchronization.md) | 2026-07-24 | Draft / DSL Prompt・Code・LLM Parameters比較 | Blocked | Provisional / Classified / Blocked | `ADR-0008`, `ADR-0009`, Operational Reviews | [Configuration Synchronization Audit](CFG-20260724-002-configuration-synchronization.md) |

## 公開範囲

内部Configuration Auditのうち、公開版が作成されていないAuditは本索引へ掲載しない。

公開版を追加または更新する場合は、本文ファイルと同じ変更で本索引を同期し、相対リンクの到達性を確認する。
