# MCP Extension

## Purpose

本書は、Local AI FoundryにおけるMCP（Model Context Protocol）拡張方針の公開版である。

MCPは既存アーキテクチャを置き換えるものではなく、既存Workflowへ外部機能を追加するための拡張レイヤとして利用する。

実装手順、Runtime構成、接続設定および環境固有情報はInternal Documentationを正本とする。

---

## Extension Policy

MCPは既存システムと疎結合で追加できる構成を基本方針とする。

既存のWorkflowや実行環境を変更することなく、必要な機能を独立したサービスとして追加できることを優先する。

MCP導入を理由として既存Architectureの責務境界を変更しない。

---

## Supported Integration

MCPは用途に応じて各コンポーネントから利用できる。

対象例

- AI Workflow
- Automation Workflow
- External Tool Integration
- Repository Integration
- Browser Automation
- Database Access

利用方法は各Runtimeに応じて適切なBridgeまたはTool Interfaceを使用する。

---

## Design Principles

MCP Extensionでは次を原則とする。

- 既存Architectureを変更しない
- 独立した拡張として追加する
- 各サービスの責務を維持する
- 永続データを分離する
- 必要最小限の公開範囲とする

---

## Network Policy

MCPは既存システムへ最小限の接続だけを行う。

不要な外部公開を行わず、既存ネットワーク構成を維持することを原則とする。

---

## Responsibility

本書は公開可能な設計方針のみを示す。

実装方法、設定値、接続情報、Runtime構成、運用手順および環境固有情報は公開対象としない。

---

## Related Documents

- Architecture
- Publication Governance
- Documentation Information Architecture
