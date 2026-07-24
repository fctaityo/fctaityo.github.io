# 基本原則（Principles）

本書はLocal AI FoundryのProject Constitution（プロジェクト憲章）の公開版であり、公開可能な設計思想と基本原則を定義する。

[Architecture](architecture-public.md)は構造、Glossaryは用語、[ADR](adr/)は重要な設計判断、Decision Logは運用・小規模判断を扱う。本書はそれら全体に適用する基本原則を定義する。

[Public Documentationへ戻る](README-public.md)

## 原則

### P-01 — 意味は自由。構造は厳格。

Agentの創造性は保ち、機械境界では契約された構造だけを受け入れる。

### P-02 — Contract-Driven

後段の都合や暗黙知ではなく、明示したContractを工程間の判定基準にする。

### P-03 — DTO Boundary

Agent間で利用できるのは検証済みDTOであり、raw LLM出力を後続へ直接渡さない。

### P-04 — Normalizeは意味を生成しない

型、階層、表記を明示ルールで整えるだけで、欠けた事実・主張・結論を創作しない。

### P-05 — Contract Gateは修正しない

Gateは検査、証跡化、分岐、停止だけを担う。

### P-06 — Workflow Success ≠ Artifact Success

Workflow完走と、公開可能な成果物の成立を別の成功条件として扱う。

### P-07 — Evidence by Default

判定、Retry、モデル実行、保存、画像生成の結果を後から追跡できる形で残す。

### P-08 — Atomic Persistence

不完全な書込みを正式成果物として公開せず、検証済みの一式だけを確定する。

### P-09 — Silent Failureを許容しない

空値、切断、契約違反、fallback、checkpoint差異を明示する。

### P-10 — Retryは有限

Retryの対象、上限、入力、終了条件をStageごとに固定し、無限循環を作らない。

### P-11 — LLMは確率的コンポーネントとして扱う

同一入力でも失敗し得る前提で、決定的なGate、Validator、証跡を外側へ置く。

### P-12 — Contract検証とArtifact検証を分離する

DTOの型・必須値はContract Gate、記事や画像の完成性はArtifact Validatorが検査する。

### P-13 — 責務は一つ。（Single Responsibility）

各Agent、Normalize、Assembly、Contract Gate、Artifact Validator、Review、Final Auditは、一つの責務だけを持つ。責務境界を越えて、意味生成、契約修正、成果物補完、他工程の代行を行わない。

本原則は、P-04、P-05、P-12およびArtifact Validatorの検査限定責務を包括する上位原則である。責務変更が必要な場合はWorkflow内の便宜的修正ではなく、設計変更として扱いADRを追加して判断する。

### P-14 — 構成の正本と同期方向を明示する（Source Synchronization）

GUI、Draft、DSL、Git、Documentation、Runtimeを一括して一つの正本とみなさない。Graph、Prompt、Code、LLM Node Parameters、Provider Settings、Contract、Documentationごとに正本、派生物、実効状態を識別し、差異がある場合は設定種別ごとに同期方向を決定する。

同期は差分の検出だけで終わらず、採用判断、反映、検証、証跡化までを一つの変更単位として扱う。

### P-15 — 人間による変更を追跡可能にする（Human Change Trace）

GUI、管理画面、DB、Runtime Console等で行うGit外の変更も、変更者、日時、対象、理由、変更前後、検証結果を追跡可能にする。変更理由を確認できない差分は、更新時刻だけを根拠に最新の正本として採用しない。

Git外の変更を恒久採用する場合は、対応するDSL、Documentation、Testおよび必要なReviewまたはADRへ同期する。

### P-16 — 完了前に構成監査を行う（Configuration Audit）

構成へ影響する作業は、Graph、Prompt、Code、Parameters、Provider Settings、DSL、Draft、Git、Documentation、Runtimeの同期状態を確認するまで完了としない。

Blockingな構成差分が残る場合、Workflowまたは成果物が成功していても作業を完了扱いにしない。監査の運用様式と自動化はConfiguration Managementに従い、段階的に導入する。

### P-17 — 暫定変更を管理する（Temporary Change Control）

Bring-up、障害回避、実験のための暫定変更を恒久仕様と区別する。暫定変更には目的、対象、開始条件、終了条件、復帰先、影響範囲、関連Reviewを持たせ、許可した範囲を越えて適用しない。

契約またはGateを一時的に緩和する場合も、構造違反を隠さず、Warning等の監査証跡を残す。終了条件または復帰先を持たない暫定変更は禁止する。

### P-18 — Project Knowledgeを保存し昇華する（Knowledge Preservation）

失敗、打鍵、実運用、品質確認、構成差分から得た知識を一時的な会話や個人の記憶だけに残さない。観測事実はOperational Reviewへ保存し、恒久的な判断はADR、基本原則はProject Constitution、構造と責務はArchitecture、実行可能な変更はWorkflowおよび関連実装へ、必要性に応じて昇華する。

すべてのReviewを必ずADRや原則へ昇格させるのではなく、知識の影響範囲に合う正本へ反映する。上位文書または実装へ反映した後も、根拠となったReviewはProject Knowledgeとして削除しない。

## 変更管理

原則は通常のリファクタリングでは変更しない。Principles変更はプロジェクト全体へ影響する設計変更として扱う。

変更が必要な場合は関連ReviewとADRを用意し、Workflow、DTO Contract、Error Catalogへの影響を確認する。採用後は影響を受ける文書と実装を同じ変更単位で追跡する。

P-01からP-18のIDは変更しない。途中へ原則を追加する場合は既存IDを繰り上げず、枝番または新しい末尾番号を使用する。
