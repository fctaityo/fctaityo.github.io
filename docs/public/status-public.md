# Project Status

> **Public Edition**
>
> This document is the public snapshot of the Local AI Foundry project.
> Internal operational details, confidential configuration information, and non-public implementation artifacts have been omitted where appropriate.


本書はLocal AI FoundryのCurrent Snapshot（現在地）の正本であり、Project
Dashboardとして扱う。履歴や経緯は記載しない。過去情報は[Operational
Reviews](reviews-public.md)、[ADR](adr-public/)、[Decision
Log](decisions.md)、Gitへ委譲する。

## プロジェクト健全性

| 項目 | 状態 |
|---|---|
| 総合状態 | 🟡 開発中 |
| アーキテクチャ | 🟢 安定 |
| Workflow | 🟡 実験運用 |
| ドキュメント | 🟡 Governance導入・Baseline監査前 |
| 成果物検証 | 🟢 Validator稼働中 |
| 本番運用準備 | 🟡 未完了 |

## Configuration概要

### 現在のBaseline

-   状態: `Provisional / Partially Synchronized / Blocked`
-   Configuration Item Registry:
    [Configuration Item Registry](configuration-items.md)（15 items / 6 categories）

### 最新Audit

-   最新Configuration Audit:
    [`CFG-20260724-003`](configuration-audits/CFG-20260724-003-conclusion-retry-prompt-sync.md)
-   Audit結果: `Blocked`

### 現在のDrift

-   未解消のBlocking Drift: 3
-   Warning: 3
-   Temporary Drift: 0
-   Unknown Drift: 0

| 項目 | 件数 |
|---|---:|
| Configuration Items | 15 |
| Pending | 5 |
| Synchronized | 1 |
| Verified | 2 |
| Blocked | 7 |
| Deprecated | 0 |
| Categories | 6 |

詳細と各ItemのCurrent Owner、Depends On、Riskは
[Configuration Item Registry](configuration-items.md)を唯一の正本とする。

## 本日の重点作業

| 項目 | 内容 |
|---|---|
| Configuration Item | [`CFG-P001`](configuration-items.md#cfg-p001) Ollama Provider Settings |
| Current Status（現在状態） | `Synchronized` |
| 次の行動 | 検証とConfiguration Auditを実施し、`Verified`への遷移可否を判定する |
| 理由 | `langgenius/ollama/ollama`、`gemma4:latest`。Secret値はRegistryへ記録しない |
| 選定ルール | 現在の作業Queueで優先順位が最も高い着手可能Item |

Configuration Item、Current Status、ReasonはRegistry、Next
ActionはLifecycleの`Synchronized → Verified`から導出する。
次に確認する場所は[`CFG-P001`のRegistry行](configuration-items.md#cfg-p001)と
[Configuration Audit運用規則](configuration-audits/README.md)である。

## 現在の作業状況

| 表示区分 | 件数 |
|---|---:|
| 着手可能 | 4 |
| ├─ 検証待ち | 1 |
| └─ Blocked解除条件の確認待ち | 1 |
| 依存解消待ち | 9 |

`着手可能`は未解決の依存先がないItemの総数である。`検証待ち`と
`Blocked解除条件の確認待ち`はその内訳であり、合計へ加算しない。本集計は下のQueueから
機械的に集計するViewであり、独自の状態を保持しない。

各Viewの責務:

- `本日の重点作業`: 今日着手すべき1件
- `現在の作業状況`: 全体件数
- `現在の作業Queue`: 全件詳細

## 現在の作業Queue

本Queueは[Configuration Item Registry](configuration-items.md)のCurrent
Snapshotを整形したDashboard viewであり、独自のConfiguration Item情報を保持しない。

列の取得元:

- `Configuration Item ID`、`Configuration Item名`、`Current Status`、`Depends On`、`理由`:
  Registryの該当行。`理由`はRegistryの`Notes`を短縮せず表示する。
- `最新Audit`: Registryの`Notes`にAudit IDが明記されている場合だけ表示する。明記がなければ
  `要Audit確認`とする。
- `状態分類`、`未解決の依存先`: 下記Queue生成規則による機械的なview。
- `次の行動`: RegistryのCurrent StatusにLifecycle遷移規則を適用した定型表示。個別の採用内容や
  解除条件は生成せず、根拠がない場合は`要Audit確認`とする。

| 優先順位 | 状態分類 | Configuration Item ID | Configuration Item名 | Current Status（現在状態） | 理由 | 最新Audit | Depends On（依存先） | 未解決の依存先 | 次の行動 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Synchronized・検証待ち | [`CFG-P001`](configuration-items.md#cfg-p001) | Ollama Provider Settings | Synchronized | `langgenius/ollama/ollama`、`gemma4:latest`。Secret値はRegistryへ記録しない | 要Audit確認 | None | None | 検証とConfiguration Auditを実施し、`Verified`への遷移可否を判定する |
| 2 | 着手可能 | [`CFG-A001`](configuration-items.md#cfg-a001) | Planning Prompt | Pending | Planning Agent Prompt。Draft採用候補は未承認 | 要Audit確認 | None | None | Pendingの承認条件をAuditで確認する |
| 3 | 着手可能 | [`CFG-A006`](configuration-items.md#cfg-a006) | Distribution Prompt | Pending | Distribution schemaを詳細化したDraftが採用候補 | 要Audit確認 | None | None | Pendingの承認条件をAuditで確認する |
| 4 | Blocked解除条件の確認待ち | [`CFG-L001`](configuration-items.md#cfg-l001) | Dify LLM Node Parameters | Blocked | Model、Context、Max Tokens、Temperature、Structured Output、Reasoning | 要Audit確認 | [`CFG-P001`](configuration-items.md#cfg-p001) | None | Blocked解除条件をAuditで確認し、`Pending`への遷移可否を判定する |
| 5 | 未解決依存あり | [`CFG-A002`](configuration-items.md#cfg-a002) | Research Prompt | Blocked | Draft本文とDSL短文化制約の双方に有効変更がある | 要Audit確認 | [`CFG-A001`](configuration-items.md#cfg-a001) | [`CFG-A001`](configuration-items.md#cfg-a001) | 依存解消後、Blocked解除条件をAuditで確認する |
| 6 | 未解決依存あり | [`CFG-C005`](configuration-items.md#cfg-c005) | Writing Artifact Merge | Pending | Draft Codeが採用候補。意味非生成の再確認が必要 | 要Audit確認 | [`CFG-A006`](configuration-items.md#cfg-a006) | [`CFG-A006`](configuration-items.md#cfg-a006) | 依存解消後、Pendingの承認条件をAuditで確認する |
| 7 | 未解決依存あり | [`CFG-R001`](configuration-items.md#cfg-r001) | Effective LLM Request Parameters | Blocked | Runtime DBに完全なrequest payloadがなく、Node実効値の追加検証が必要 | 要Audit確認 | [`CFG-G001`](configuration-items.md#cfg-g001), [`CFG-L001`](configuration-items.md#cfg-l001), [`CFG-P001`](configuration-items.md#cfg-p001) | [`CFG-L001`](configuration-items.md#cfg-l001) | 依存解消後、Blocked解除条件をAuditで確認する |
| 8 | 未解決依存あり | [`CFG-A003`](configuration-items.md#cfg-a003) | Research Retry Prompt | Blocked | Draft契約とDSL縮退条件の採用範囲が未決定 | 要Audit確認 | [`CFG-A002`](configuration-items.md#cfg-a002) | [`CFG-A002`](configuration-items.md#cfg-a002) | 依存解消後、Blocked解除条件をAuditで確認する |
| 9 | 未解決依存あり | [`CFG-A004`](configuration-items.md#cfg-a004) | Writing Plan Prompt | Pending | Draft採用候補は未承認 | 要Audit確認 | [`CFG-A001`](configuration-items.md#cfg-a001), [`CFG-A002`](configuration-items.md#cfg-a002) | [`CFG-A001`](configuration-items.md#cfg-a001), [`CFG-A002`](configuration-items.md#cfg-a002) | 依存解消後、Pendingの承認条件をAuditで確認する |
| 10 | 未解決依存あり | [`CFG-C001`](configuration-items.md#cfg-c001) | Research Retry Normalize | Blocked | Draftの詳細debugとDSLのsemantic input nameが競合 | 要Audit確認 | [`CFG-A003`](configuration-items.md#cfg-a003) | [`CFG-A003`](configuration-items.md#cfg-a003) | 依存解消後、Blocked解除条件をAuditで確認する |
| 11 | 未解決依存あり | [`CFG-C002`](configuration-items.md#cfg-c002) | Artifact Validator | Pending | Draft Codeが採用候補 | 要Audit確認 | [`CFG-A004`](configuration-items.md#cfg-a004) | [`CFG-A004`](configuration-items.md#cfg-a004) | 依存解消後、Pendingの承認条件をAuditで確認する |
| 12 | 未解決依存あり | [`CFG-C003`](configuration-items.md#cfg-c003) | Conclusion Retry Final Gate | Blocked | `body_length`をWarningにするにはTemporary Drift承認が必要 | 要Audit確認 | [`CFG-A004`](configuration-items.md#cfg-a004) | [`CFG-A004`](configuration-items.md#cfg-a004) | 依存解消後、Blocked解除条件をAuditで確認する |
| 13 | 未解決依存あり | [`CFG-C004`](configuration-items.md#cfg-c004) | Introduction Retry Final Gate | Blocked | Draftだけが`body_length`をWarning化。採用Evidenceなし | 要Audit確認 | [`CFG-A004`](configuration-items.md#cfg-a004) | [`CFG-A004`](configuration-items.md#cfg-a004) | 依存解消後、Blocked解除条件をAuditで確認する |

Queue生成規則:

1. Registryの`Verified`と`Deprecated`を除くItemを表示する。
2. `Depends On: None`を第0依存層とする。
3. 依存先が`Synchronized`または`Verified`なら、その依存は解消済みとする。
4. 未解決依存を持つItemは、依存先の直後となる最小依存層へ置く。
5. 同一依存層ではRiskを`Critical`、`High`、`Medium`、`Low`の順、同一RiskではID昇順にする。
6. 人間による手動Priorityは使用しない。Registry変更時に本viewを再生成する。
7. 状態分類は次の優先順で一意に決定する。
   `Synchronized・検証待ち`、`未解決依存あり`、`Blocked解除条件の確認待ち`、`着手可能`。
8. `Deprecated`の依存先は自動的に解消済みとせず、Registryの依存更新を必要とする。

## 最近のConfiguration Audit

- [`CFG-20260724-003`](configuration-audits/CFG-20260724-003-conclusion-retry-prompt-sync.md)
  — Conclusion Retry Prompt synchronization、`Blocked`
- [`CFG-20260724-002`](configuration-audits/CFG-20260724-002-configuration-synchronization.md)
  — Working Tree / Prompt / Code / LLM Parameters comparison、`Blocked`
- [`CFG-20260724-001`](configuration-audits/CFG-20260724-001-pilot-baseline.md)
  — Pilot Configuration Audit、`Blocked`

完全な履歴は[Configuration Audit一覧](configuration-audits/index.md)を参照する。

## 最近のDecision

- [`DEC-2026-0011`](decisions.md#dec-2026-0011) — 固定IDには安定した直接リンクを提供する
- [`DEC-2026-0010`](decisions.md#dec-2026-0010) — LLM Context WindowはProvider設定へ依存しない
- [`DEC-2026-0009`](decisions.md#dec-2026-0009) — Git remote未設定時はPushしない

Decisionの内容とEvidenceは[Decision Log](decisions.md)を正本とする。

## 現在の既知制約

-   Prompt全文、差分Code hash、LLM Node Parametersは
    `CFG-20260724-002`で比較済みだが、採用方向は人間承認待ちである。
-   Published WorkflowはConfiguration Synchronizationの比較対象外である。
-   Current Baselineは`Provisional / Blocked`であり、既知Configuration
    Driftの採用判断は未完了である。
-   GemmaのDTO出力に構文・キー・長さの揺らぎがある。
-   fixtureなしの実LLM 5 Section連続正常系はOpenである。
-   Research
    Retryが初回raw全文を再利用し、同種の構文違反を繰り返す場合がある。
-   Image Prompt、Image Request、Final
    Audit出力の契約一式は未完成である。
-   DTOに共通の明示version fieldがない。
-   Git remoteは未設定である。

## 次のMilestone

`本日の重点作業`をLifecycleとConfiguration Auditに従って完了する。

## プロジェクト参照情報

### 現在のArchitecture

-   Architecture: Contract-Driven Multi-Agent Platform
-   Dify Workflow Revision: `0.3.2`
-   Current Workflow:
    `workflows/dify/local-ai-7-stage-multi-agent.dsl.yml`
-   Node数: 73
-   Edge数: 79
-   LLM: Ollama `gemma4:latest`
-   Orchestration: Dify / n8n
-   Image Generation: ComfyUI
-   Persistence: UUID spool transportと原子的保存
-   Configuration Governance:
    [Configuration Management](configuration-management-public.md) Change Set B導入済み

### 現在のPipeline

```text
Planning
↓
Research
↓
Writing Plan
↓
Section Writing
↓
Assembly
↓
Artifact Validator
↓
Review
↓
Final Audit
↓
Package
```

Research、各Section、ReviewのRetryは最大1回の有限グラフである。Artifact
Validator FAIL時はReview以降へ進まない。

### 現在のDTO

正式または専用Builderとして現在実装済みのDTOは次のとおり。

-   Planning DTO
-   Research DTO
-   Writing Plan DTO
-   Section Writing DTO
-   Review入力DTO
-   Review出力DTO
-   Final Audit入力DTO
-   Artifact / Package payload

Image Prompt、Image Request、Final Audit出力はAgent
prompt上のschemaまたは専用処理が存在するが、DTO / Normalize / Contract
Gateの契約一式は未完成である。

### 現在のTest状況

Last Verified: `2026-07-18`

| Test | Current Status |
|---|---|
| Unit Tests | 16件成功（Artifact Integrity / Research Retry） |
| Integration Tests | n8n transport / persistence 8ケース成功 |
| E2E | 固定DTOによるDify → n8n → ComfyUI正常系とValidator異常系に成功。実LLM 5 Section正常系はOpen |
| Dify DSL Validation | 成功、73 nodes / 79 edges、environment key検証成功 |
| Mermaid Validation | Architecture 10ブロック、構造エラー0 |
| Markdown Links | 177リンク、切れ0 |

## 更新方針

本書は常に現在状態だけを保持する。Workflow、DTO、ADR、Operational
Review、主要テストが変更された場合は同じ変更で更新する。変更履歴を追記せず、以前の値はReviews、ADR、Decision
Log、Gitで追跡する。

本SnapshotはConfiguration Audit
`CFG-20260724-003`の現在値を反映している。Conclusion Retry
PromptはローカルDSLへ同期済みだが、他のBlocking Driftが残るためBaselineは正式確定前である。詳細はAuditを正本とする。

## 最終更新

-   Snapshot Updated: `2026-07-24`
-   Last Verified: `2026-07-24`