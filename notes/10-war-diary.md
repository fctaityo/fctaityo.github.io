# 開発戦記

このファイルは、Local AI Foundry開発で起きた出来事と判断を時系列で案内するインデックスである。

詳細な記録は `notes/war-diary/` 配下へ、1件1ファイルで保存する。

Bug Zoo・ADR・Hall of Fame・NOTE記事になる前段階の一次記録として扱い、当時の状況や思考の流れを残す。

## 運用ルール

- 1つの出来事を1ファイルとして記録する。
- ファイル名は `WD-YYYYMMDD-NNN-short-title.md` とする。
- このファイルには、日付・題名・概要・リンクだけを置く。
- 障害パターンとして再利用できるものはBug Zooへ整理する。
- 設計判断として確定したものはADRへ記録する。
- 将来も引用できる原則や言葉はHall of Fameへ昇格させる。
- NOTE記事へ展開しても、一次記録は削除しない。

## 2026-07

### 2026-07-24

- [WD-20260724-001 Local AI Foundry 完全始動](war-diary/WD-20260724-001-foundry-launched.md)  
  制作基盤としての初期構成、検証状況、設計上の到達点と「完全始動」の意味を記録。

- [WD-20260724-002 AIは悪くなかった。悪かったのは設計だった。](war-diary/WD-20260724-002-design-not-ai.md)  
  実LLM正常系の検証で連続した障害と、DTO、Gate、Retry、Transport、Artifact検証、責任分離、Runtimeから得た設計上の教訓を記録。

- [WD-20260724-003 ChatGPT、SSOT運用を破る](war-diary/WD-20260724-003-chatgpt-broke-ssot.md)  
  GitHub最新版を取得できなかったChatGPTが代替情報で更新案を生成し、正本運用を自ら破った事件と、その後追加した停止ルールを記録。
