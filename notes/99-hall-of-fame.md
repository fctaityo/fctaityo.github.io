# Hall of Fame

このファイルは、Local AI Foundry開発で生まれた言葉のうち、
将来も設計判断や思想として引用できるものだけを記録する。

一時的な思いつきや作業メモは登録しない。

## 名言

> AIは悪くなかった。悪かったのは設計だった。

> Documentationは説明書ではない。

> Normalizeは創作してはいけない。

> Runtimeを見ないレビューはレビューではない。

> GitHubが正本。思考はCommitで育つ。

> GitHubが正本。ChatGPTは思考を育てる。Commitは人間が責任を持つ。

> Workflow SuccessとArtifact Successは別物である。

> Retryは保険ではない。

> AIへ仕事を任せる責任を持つなら、止める権利も自分で持つ。

> 完全始動は完成ではない。

## 珍言

> 「git diffください」

（もう出しとるやろｗ）

---

## Memo

### 2026-07-24 GitHub運用方針

今回のGitHub連携検証で、Foundryの運用方針が一つ固まった。

- GitHub上の `notes/` を正本（Single Source of Truth）とする。
- ChatGPTはGitHub最新版を読み、修正版全文を提案する。
- 最終判断・Commitは人間が行う。
- 思考は対話で育て、履歴はCommitで残す。

この運用により、常にGitHub最新版を基準として設計・レビュー・ナレッジ整理を行う。
