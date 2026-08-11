# 開発戦記

このファイルは、Local AI Foundry開発で起きた出来事と判断を時系列で案内するインデックスである。

詳細な記録は `notes/war-diary/` 配下へ、1件1ファイルで保存する。

Bug Zoo・ADR・Hall of Fame・NOTE記事になる前段階の一次記録として扱い、当時の状況や思考の流れを残す。

## 運用ルール

* 1つの出来事を1ファイルとして記録する。
* ファイル名は `WD-YYYYMMDD-NNN-short-title.md` とする。
* このファイルには、日付・題名・概要・リンクだけを置く。
* 障害パターンとして再利用できるものはBug Zooへ整理する。
* 設計判断として確定したものはADRへ記録する。
* 将来も引用できる原則や言葉はHall of Fameへ昇格させる。
* NOTE記事へ展開しても、一次記録は削除しない。

## 2026-08

### 2026-08-11

* [WD-20260811-001 Formal Current Sourceを壊さずHuman Working Sidecarを作った](war-diary/WD-20260811-001-human-working-sidecar-stm.md)
  Codexが実装を担当できない時間帯でもHuman + ChatGPTで安全に前倒しできる作業を可視化するためSTMを導入。Formal Current Source（正式な現在地正本）とSTM Working Overlay（STM上の作業進捗）を分離し、Mainline（本線）、Separate Scope（別作業範囲）、Codex待ち、Working Artifact（作業中成果物）をHuman側で扱う一方、`status.md` / `active-work.md`の実ファイル編集はCodex側責務へ戻した経緯を記録。

### 2026-08-10

* [WD-20260810-001 Article ProductionからHuman-Directed Foundryへ再位置付けした](war-diary/WD-20260810-001-human-directed-foundry-repositioning.md)
  Article ProductionをProject全体定義のまま固定せずRI#1として維持し、Documentation ProductionをRI#2、共通PatternをCore Candidateとして扱うHuman-Directed Foundryへ再位置付けした経緯を記録。Foundry Coreは未確定、RI#3はFuture / Undefinedとし、HumanがPurpose、Judgment、Responsibility、Approvalを保持する境界を正式化した。

* [WD-20260810-002 Human側の判断履歴をPublication実行条件から外した](war-diary/WD-20260810-002-publication-execution-boundary.md)
  Publication Execution ContractがHuman-controlled Decision HistoryやPrivate Operational Stateへ依存しないよう境界を修正し、AI / CODEXへはHuman-approved Current Publication Decisionとnon-private Execution Contextだけを渡す形へ整理した経緯を記録。

* [WD-20260810-003 Reviewが終わらない構造をConvergence Ruleで止めた](war-diary/WD-20260810-003-review-convergence-rule.md)
  Correction後のArtifactを新しいSemantic Reviewの起点として扱うとFinding探索が再開し続ける問題を整理し、One Evidence Setに対するComplete Semantic Review、Semantic Freeze、Correction Batch、Correction Verification、Final Commit Boundaryを導入した経緯を記録。

* [WD-20260810-004 Review Packageへtruncationが混入したNear Miss](war-diary/WD-20260810-004-review-package-integrity-near-miss.md)
  表示・転送レイヤで省略されたdiff断片がReview Packageへ取り込まれ、SHA-256一致だけでは破損を検出できなかったNear Missと、Direct Source Acquisition、Source Integrity、Truncation Marker Guardを導入するまでを記録。

### 2026-08-02

* [WD-20260802-001 Project Snapshotでは作業断面へ戻れなかった](war-diary/WD-20260802-001-project-snapshot-and-active-work.md)
  Documentation IAのCommit 2完了後、`status.md`だけでは現在作業中の復帰地点を特定できないことを確認。Project State Current SnapshotとActive Work Current Snapshotを別責務として整理し、ADR-0012、CFG-D005、Active Work Minimum Adoptionへ至った経緯を記録。

### 2026-08-01

* [WD-20260801-001 Project Stateを整え、公開判断まで資産化した](war-diary/WD-20260801-001-project-state-governance-and-publication.md)
  Project State Governanceを導入し、Current Snapshot、Active Baseline、Human Publish Decisionを整理したうえで、Public Documentation、公式HP v2.11、PRRへ反映した一連の作業を記録。公開判断を資産化する運用、完成版ファイル方式への切り替え、GitHub Read／Writeの区別まで含めて整理。

## 2026-07

### 2026-07-25

* [WD-20260725-001 曖昧なPromptがReviewを一周増やした](war-diary/WD-20260725-001-ambiguous-prompt-added-review-round.md)
  曖昧なPromptにより、Review Comment Resolutionだけで済むはずだった作業が、新しいReview Roundとして解釈され、不要なReview Packageが生成された事件。AIへの指示は意図ではなく、工程・停止条件・禁止事項まで固定する必要があることを記録。

### 2026-07-24

* [WD-20260724-001 Local AI Foundry 完全始動](war-diary/WD-20260724-001-foundry-launched.md)
  制作基盤としての初期構成、検証状況、設計上の到達点と「完全始動」の意味を記録。

* [WD-20260724-002 AIは悪くなかった。悪かったのは設計だった。](war-diary/WD-20260724-002-design-not-ai.md)
  実LLM正常系の検証で連続した障害と、DTO、Gate、Retry、Transport、Artifact検証、責任分離、Runtimeから得た設計上の教訓を記録。

* [WD-20260724-003 ChatGPT、SSOT運用を破る](war-diary/WD-20260724-003-chatgpt-broke-ssot.md)
  GitHub最新版を取得できなかったChatGPTが代替情報で更新案を生成し、正本運用を自ら破った事件と、その後追加した停止ルールを記録。
