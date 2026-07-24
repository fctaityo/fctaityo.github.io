# WD-20260724-001 Local AI Foundry 完全始動

- Date: 2026-07-24
- Status: Recorded
- Related Article: 01 Local AI Foundry 完全始動！

## 概要

Local AI Foundryを、企画・調査・執筆・レビュー・画像生成・監査・保存をつなぐ制作基盤として始動した。

Dify上のワークフローは、Planning、Research、Writing Plan、Section Writing、Review、Image Prompt／Request、Final Audit、Package Outputで構成。

記事01公開時点の構成は、72ノード・78エッジ。

利用基盤：

- Dify：ワークフロー実行
- Ollama：ローカルLLM実行
- ComfyUI：画像生成
- n8n：成果物の保存・配送

Planning・ResearchではDTOとContract Gateを実装。

Writing系ではWriting Planと5セクション生成、Artifact Validatorまで実装した。

一方、Image Prompt・Image Request・Final AuditはPrompt上のschema定義が中心で、独立したNormalize／Gateは未完成だった。

## 検証状況

記事01公開時点で、以下を確認した。

- ユニットテスト16件成功
- n8n連携の統合テスト8ケース成功
- Dify DSL検証成功
- fixtureを使わない実LLMによる5セクション連続正常系は未安定

fixtureでの成功と、非決定的な実LLMでの成功は同一視しない。

「テストが通った」という結果だけでなく、何を入力し、何を検証した成功なのかを区別する。

## 設計上の到達点

AI同士の会話や人格ではなく、DTO、Contract Gate、責任境界、停止条件を中心に工程を設計した。

役職ではなく工程ごとに責任を分離し、次工程へ渡す情報を必要最小限に限定した。

Workflow SuccessとArtifact Successを分離した。

ワークフローが例外なく完走しても、成果物が欠落・破損していれば成功とは扱わない。

Retryは成功するまで繰り返す保険ではなく、回数上限を持つ有限の復旧手段とした。

Reviewは判定に専念させ、本文の正本を書き換えさせない。

## 完全始動の意味

この時点で、Local AI Foundryは完成していない。

未完成のGateや、未安定な実LLM正常系が残っていた。

それでも、動かし、壊れた原因を記録し、修正し、再検証する改善サイクルを回せる状態になった。

完成したから始動したのではない。

壊し、直し、育て続けるための基盤が成立したことを「完全始動」とした。

## Documentation Phase

- Phase1 基礎構築
- Phase2 Human Operations
- Phase3 Navigation Layer 完了

## 今日の学び

Documentationは説明書ではない。

Documentationそのものがシステムの一部だった。

## 今日の記事候補

「DocumentationはUXだった」
