# Hall of Fame

このファイルは、Local AI Foundry開発で生まれた言葉のうち、
将来も設計判断や思想として引用できるものだけを記録する。

一時的な思いつきや作業メモは登録しない。

## 名言

> AIは悪くなかった。悪かったのは設計だった。

> 意味は自由。構造は厳格。

> Documentationは説明書ではない。

> Normalizeは創作してはいけない。

> Runtimeを見ないレビューはレビューではない。

> GitHubが正本。思考はCommitで育つ。

> GitHubが正本。ChatGPTは思考を育てる。Commitは人間が責任を持つ。

> Workflow SuccessとArtifact Successは別物である。

> Retryは保険ではない。

> AIチームは表現であって、設計ではない。

> 役職ではなく工程で責任を切る。

> Localとは、所有ではなく主導権である。

> AIへ仕事を任せる責任を持つなら、止める権利も自分で持つ。

> 完全始動は完成ではない。

> 入口で止めれば、出口は壊れない。

> 生成できても、運べなければ成果物にはならない。

> Reviewは判定する。本文を書き直させない。

> 最新は、正本ではない。

> Evidenceを揃えることと、承認することは別である。

> AIは状態を提示できる。承認はできない。

> 公開されなかった判断も、資産である。

## 珍言

> 「git diffください」

（もう出しとるやろｗ）

---

## Memo

### 2026-07-24 GitHub運用方針

今回のGitHub連携検証で、Foundryの運用方針が一つ固まった。

* GitHub上の `notes/` を正本（Single Source of Truth）とする。
* ChatGPTはGitHub最新版を読み、修正版全文を提案する。
* 最終判断・Commitは人間が行う。
* 思考は対話で育て、履歴はCommitで残す。

この運用により、常にGitHub最新版を基準として設計・レビュー・ナレッジ整理を行う。

### 2026-08-01 Project State GovernanceとPRR

Project State Governanceの導入により、作業事実と正式なProject Stateを分離する方針が固まった。

* Commit、Import、Test PASSだけではProject Stateを遷移させない。
* Current Snapshotは作業ログではなく、現在地と次の判断を示すProject Dashboardとする。
* Candidate BaselineとActive Baselineを分離し、Activeは一つだけとする。
* AIはEvidenceを照合し、状態候補を提示できる。
* PublishやAcceptanceの最終承認はHuman Decisionに残す。
* 最新のDraft、Commit、Import結果であることと、正本として採用されていることは別である。

Publication Reflection Register（PRR）の導入により、公開物やGit履歴から消える判断を内部資産として残す方針が固まった。

* 不採用、保留、対象外となった文書と、その理由を記録する。
* 採用時にマスクまたは一般化した情報と、その理由を記録する。
* PRRは更新履歴やGit差分の複製にしない。
* 基本形式は「対象ドキュメント」「判定」「その理由」の表とする。
* 未来の自分が30秒で公開判断を思い出せることを目的とする。

この運用により、公開された成果物だけでなく、公開されなかった判断もProject Knowledgeとして保持する。
