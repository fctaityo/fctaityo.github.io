# Project Status

> **Public Edition**
>
> この文書は Local AI Foundry の公開版プロジェクトステータスです。
> 内部運用情報、構成管理情報、監査情報、環境固有情報は公開版では省略しています。


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

## 現在の既知制約

  — Conclusion Retry Prompt synchronization、`Blocked`


## 現在の既知制約

-   Published WorkflowはConfiguration Synchronizationの比較対象外である。
-   Current Baselineは`Provisional / Blocked`であり、既知Configuration
    Driftの採用判断は未完了である。
-   GemmaのDTO出力に構文・キー・長さの揺らぎがある。
-   fixtureなしの実LLM 5 Section連続正常系はOpenである。
-   Research
    Retryが初回raw全文を再利用し、同種の構文違反を繰り返す場合がある。
-   Image Prompt、Image Request、Final
-   DTOに共通の明示version fieldがない。

## 次のMilestone


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
-   Artifact / Package payload

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


## 最終更新

-   Snapshot Updated: `2026-07-24`
-   Last Verified: `2026-07-24`