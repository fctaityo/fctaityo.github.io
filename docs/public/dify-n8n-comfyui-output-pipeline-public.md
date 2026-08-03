# Dify → n8n → ComfyUI Output Pipeline

## Purpose

本書は、Local AI Foundryにおける成果物出力パイプラインの公開版である。

AI Workflowで生成した成果物を後続処理へ受け渡し、文章・画像・関連Artifactを一つの成果物として管理する設計方針を示す。

実装方法、Runtime構成、環境固有設定および運用手順はInternal Documentationを正本とする。

---

## Architecture

Output Pipelineは次の責務で構成される。

- AI Workflow
- Automation Workflow
- Image Generation
- Artifact Management

各コンポーネントは責務ごとに分離し、Pipeline全体で一つの成果物を構成する。

---

## Design Principles

Output Pipelineでは次を原則とする。

- Workflowと実行処理を分離する
- Artifactを一元管理する
- 各段階でValidationを実施する
- Pipeline全体の整合性を維持する
- 実装詳細を各コンポーネントへ閉じ込める

---

## Artifact Management

Pipelineは文章だけではなく、成果物全体を一つのPackageとして管理する。

対象例

- Article
- Social Posts
- Image Request
- Generated Image
- Metadata
- Operational Artifact

各ArtifactはPipeline全体の一貫性を維持した状態で管理する。

---

## Validation

Output Pipelineでは複数段階でValidationを実施する。

Validationは単一Componentではなく、Pipeline全体として品質を保証することを目的とする。

---

## Error Handling

一部の処理が失敗した場合でも、利用可能な成果物を保持できる構成を採用する。

必要に応じて部分成功として後続処理へ受け渡せることを設計原則とする。

---

## Responsibility

本書は公開可能な設計方針のみを示す。

Runtime構成、実装方式、保存構造、接続方法、Workflow定義および環境固有情報は公開対象としない。

---

## Related Documents

- Architecture
- MCP Extension
- Publication Governance
- Documentation Information Architecture
