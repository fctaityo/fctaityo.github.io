# Glossary

## 1. Purpose

本書はLocal AI Foundryで使用する**Project固有用語のCurrent Reference**である。

Documentation、Publication、Governance、Project State、WorkflowおよびArchitectureで使用する共通用語を定義する。

本書は現在有効な用語のみを保持する。

変更履歴、採用経緯、Review Historyは保持しない。

各用語の詳細仕様は、それぞれの正本文書を参照する。

---

## 2. Scope

本書は以下で使用するProject固有用語へ適用する。

- Documentation
- Publication
- Governance
- Project State
- Repository
- Workflow
- Runtime
- Architecture
- AI Generation

一般的なIT用語、Git用語、Markdown用語は対象外とする。

---

# 1. Documentation

| 用語 | 定義 |
|------|------|
| Active Work | 現在実施中のInitiative、Checkpoint、Next Actionを管理するCurrent Work Snapshot。 |
| Current Reference | 現在有効なProject固有用語を保持する唯一のReference。 |
| Current Snapshot | Projectの現在地を30秒以内で把握するためのCurrent Status。 |
| Decision Log | ADRへ昇格しない小規模判断を保存する文書。 |
| Documentation Category | Documentation Information Architectureで定義される責務分類。 |
| Documentation Information Architecture | Documentation全体の責務、Directory構成、Navigation、移動規則を定義する正本。 |
| Documentation Navigation | 利用者を正本文書へ導くNavigation構造。 |
| Documentation Synchronization | Documentation間のCurrent Stateを同期する作業。 |
| Historical Artifact | Current Stateではなく履歴・証跡・時点情報を保持するArtifact。 |
| Navigation | DocumentationやArchitecture間の導線。READMEを起点として正本へ到達する仕組み。 |
| README | Documentation全体へのNavigation入口。 |
| Root Current Snapshot | Project全体の現在地を示す唯一のCurrent Snapshot。 |
| Status Artifact | Current Snapshotを保持するArtifact。 |
| Status Artifact Contract | Current Snapshotの生成・更新・検証規則を定義する契約。 |
| Transition Evidence | Project State遷移を証明するEvidence。 |

---

# 2. Publication

| 用語 | 定義 |
|------|------|
| Deferred Internal Reflection | Internal Repositoryへ即時Reflectionできない期間に、承認済みPublication活動を進め、後続のInternal Reflectionとして管理する運用。 |
| Derived | Internal Documentationから派生して生成されるPublic Documentation。 |
| Generalization | 内部情報を一般化して公開する編集方法。 |
| Information Value | 公開価値を評価するPublication Review観点。 |
| Internal Only | Internal Repositoryだけで保持するDocumentation。 |
| Mask | 公開不要情報を除外または秘匿する編集。 |
| Private Publication Decision History | 公開成果物やGit履歴から確認できなくなる判断をHuman側で管理するPrivate History。Internal / CODEX-facing Execution Contractの入力、検証または完了条件ではない。 |
| Public Canonical | Public Repositoryで直接管理する公開正本文書。 |
| Public Documentation | Public Repositoryで公開するDocumentation。 |
| Public Representation | Internal Documentationに対応する公開形態。 |
| Publication Classification | Public、Masked、Generalized等の公開分類。 |
| Publication Governance | Publication運用全体を定義する正本。 |
| Publication Item | Publication Review対象となるDocumentation管理単位。 |
| Publication Reflection | Internal DocumentationをPublicへ反映する作業。 |
| Internal Reflection Pending | Public Release完了後、必要なInternal Current StateへのReflectionと検証が未完了の内部運用状態。Project Stateではない。 |
| Publication Review | Public化可否および公開方法を判断するReview。 |
| Internal Publication Review Registry | 管理対象ごとのCurrent Publication Reviewを保持するInternal正本。Human Approval / AuthorizationをReview Statusから推測せず、Private Artifactの識別情報または管理状態を保持・要求しない。 |
| Human-approved Current Publication Decision | Publication Type、Classification、Review Status、Selection Reason、Public Representation、Mask / Generalization結果およびHuman Approval / Authorizationを含む、Sanitize済みのCurrent Decision Input。 |
| Publication Synchronization Complete | Human-approved Current Publication Decisionに基づく必要なInternal Reflection、Internal Commit、Local Commit VerifyおよびPublic / Internal Verificationが完了した状態。Private Historyの管理状態には依存しない。 |
| Publication Type | Internal Only、Derived、Public Canonical等の公開種別。 |
| Reference | Public Repository上でReferenceとして公開する形態。 |
| Release Audit | Public Release前に実施するPublication監査。 |
| Synchronization Audit | InternalとPublicの同期状態を確認する監査。 |

---

# 3. Governance

| 用語 | 定義 |
|------|------|
| Artifact Contract | Artifactの責務・更新規則を定義する契約。 |
| Configuration Audit | Configuration同期状態を検証する監査。 |
| Configuration Item | 独立して管理される最小Configuration単位。 |
| Configuration Management | Configuration全体の運用契約。 |
| Configuration Report | Configuration Audit結果を要約する報告書。 |
| Definition of Done | 完了条件を定義する品質契約。 |
| Existing Drift | 作業開始前から存在する差分。 |
| Human Authorization | Humanによる正式承認。Project State遷移等で使用する。 |
| Human Review | Humanによる正式レビュー。 |
| Review Artifact | Reviewのため一時生成するArtifact。 |
| Review Package | Human / AI Reviewへ引き渡す一時成果物。 |
| Synchronization | 正本と派生物をCurrent Stateへ同期すること。 |

---

# 4. Project State

| 用語 | 定義 |
|------|------|
| Active Baseline | Current Snapshotが示す唯一のBaseline。 |
| Baseline | 一つの変更系列を管理する識別単位。 |
| Bootstrap Evidence | Initial Project Stateを証明するEvidence。 |
| Candidate Baseline | 次に採用候補となるBaseline。 |
| Current Baseline | 現在有効なBaseline。 |
| Human Acceptance | 最終受入れ承認。 |
| Project Phase | 長期的活動区分。 |
| Project State | Project全体のLifecycle上の到達状態。 |
| Project State Transition | Project State遷移を定義する契約。 |
| Repository Verified | Repository検証完了状態。 |
| Draft Verified | Draft検証完了状態。 |
| Published | Published Workflowが正式固定された状態。 |
| Runtime Verification | Published WorkflowをRuntime実行して検証する工程。 |
| Runtime Acceptance | Runtime Verification結果を正式受入れする工程。 |
| Runtime Verified | Runtime Verification完了状態。 |
| State Transition | Project Stateが正式に遷移すること。 |

---

# 5. Repository

| 用語 | 定義 |
|------|------|
| Current State | 現在有効な状態。Historyを含まない。 |
| GitHub Read Verify | Public Repository反映後の読取検証。 |
| Internal Repository | Internal Documentationおよび実装正本を保持するRepository。 |
| Internal Source | Internal Repositoryを唯一の正本とする考え方。 |
| Local Commit Verify | Internal Repository Commit後の検証。 |
| Public Repository | Public Documentationを保持するRepository。 |
| Repository Reflection | Repositoryへ正式反映する作業。 |
| Single Source of Truth (SSOT) | 正本を一箇所だけ保持する設計原則。 |

---

# 6. Workflow

| 用語 | 定義 |
|------|------|
| Agent | LLMを利用し、単一Stageの意味生成を担当するコンポーネント。検査や保存プログラムはAgentではない。 |
| Artifact | 公開・保存対象の記事、X投稿、タグ、画像、関連JSONの成果物。 |
| Artifact Success | ContractとArtifact検証を通過し、期待成果物が有効に保存された状態。Workflow Successだけでは保証されない。 |
| Artifact Validator | LLMを使わずAssembly後の成果物完成性を検査するValidator。Contract Gateとは対象が異なる。 |
| Assembly | 合格Sectionを順序・Markdown外形だけで結合する処理。 |
| Bundle | DTO、Contract結果、Retry監査などをまとめた単位。Artifactとは異なる。 |
| Bounded Retry | 最大回数が固定された有限Retry。 |
| Contract | DTOのfield、型、必須等を定義する規約。 |
| Contract Gate | DTOを変更せずContract適合を判定する決定的処理。 |
| DTO | Stage間で受け渡す構造化データ。 |
| Evidence | Run ID、DTO、Validator結果など再確認可能な証跡。 |
| E2E | Difyからn8n、ComfyUIまでを対象とするEnd-to-End試験。 |
| Final Audit | Validator、Review、画像等を含む最終公開判定。 |
| Handoff | Stage間で受け渡す検証済み材料。 |
| Normalize | raw出力を明示ルールで構造補正する処理。 |
| Package | 検証済み成果物をn8nへ送る単位。 |
| Retry | 同一Stageを失敗理由付きで再生成する処理。 |
| Review | 記事全文を評価する品質判定Stage。 |
| Section Writing | Writing Planに基づきSection単位で生成する方式。 |
| Silent Failure | エラーを成功に見せる失敗。 |
| Stage | 明確な責務を持つ処理単位。 |
| Workflow | Dify上の有限グラフ全体。 |
| Workflow Success | Workflow全体が正常終了した状態。 |
| Writing Plan | タイトル、Section構成、役割等を定義するDTO。 |

# 7. Runtime

| 用語 | 定義 |
|------|------|
| actual checkpoint | ComfyUIが実際に使用したcheckpoint。requested checkpointとの差異はWarningとしてEvidence化する。 |
| Context Window | LLMが一度の推論で扱えるコンテキスト量。長文処理では各LLM Nodeで明示設定する。 |
| Draft | 編集中Workflow。Repository正本との意味一致を確認する対象。 |
| finish_reason | LLM生成終了理由。`stop`は正常終了、`length`は出力上限到達を示す重要な診断情報。 |
| fixture | 再現可能な試験用固定入力。fixture成功は実LLM正常系成功と同一視しない。 |
| LLM Node Runtime | LLMノードが実行時に使用するContext Window、Think、Num Predict等の設定。Model Provider設定より優先される。 |
| Model Provider | Difyでモデル接続情報や既定値を保持する設定。実行時Runtime設定を上書きしない。 |
| requested checkpoint | Dify側から画像生成時に指定されたcheckpoint。 |
| Runtime | 実際にWorkflowが動作する実行環境。RepositoryやDraftとは区別する。 |
| Runtime Drift | 保存構成とRuntime実効状態との差異。 |
| Runtime Evidence | Runtime Verification結果を証明するEvidence。 |
| Runtime Run | Runtimeにおける一回の実行。Run IDを持つ。 |
| usage.total_tokens | 実行で消費した総Token数。Context不足や切断調査の主要Evidenceとして扱う。 |

---

# 8. Architecture

| 用語 | 定義 |
|------|------|
| Architecture | Project全体構造、責務境界および主要Component間の関係を定義する正本。 |
| Architecture Layer | Projectを責務単位で分離した構造レイヤ。 |
| Component | Architecture上で責務を持つ独立要素。 |
| Data Flow | Component間で受け渡されるデータの流れ。 |
| Core Candidate | 複数Reference Implementationの比較Evidenceによって再利用可能性を検証中で、まだFoundry Coreへ確定していないControl Pattern。 |
| Foundry Core | 複数Reference Implementationの比較EvidenceとHuman Decisionを経てCapability単位で正式定義する共通Control Model。FC-CORE-001は確定済みで、その他のPatternはCore Candidateである。 |
| Foundry Core Extraction | Cross-RI Evidenceから再利用可能なCapabilityを分離し、Human DecisionでFoundry Coreへ正式化するProjectの方向。 |
| Runtime Capability Calibration | Current Model / Runtime / Hardware capabilityを観測・実測し、Evidence-backed Effective Capabilityとして確定して後続処理へBindingするControl Pattern。FC-CORE-001。 |
| Human Authority Boundary | Humanが保持するPurpose、Judgment、Responsibility、Approvalと、AIへ委譲できる責務との境界。 |
| Human-Directed Foundry | HumanがPurpose、Judgment、Responsibility、Approvalを保持し、Contract、Validation、Review、Evidence、Governanceの下でAIへ業務を委譲するProject Positioning。 |
| Internal Documentation | Internal Repositoryで管理するDocumentation。Project運用の正本を保持する。 |
| Interface | Component間の接続契約。 |
| MCP Extension | MCP連携機能を拡張するArchitecture。 |
| Output Pipeline | Dify・n8n・ComfyUIなどを接続する出力処理系列。 |
| Platform | Runtimeを構成する基盤環境。 |
| Presentation Layer | 利用者へ情報を提示するための公開レイヤ。Websiteはこの責務を持つ。 |
| Repository Layer | Repository上で管理されるDocumentation・DSL・Configurationを保持するレイヤ。 |
| Reference Implementation | FoundryのControl Patternを特定の業務領域と実装基盤で実証し、比較Evidenceを提供する実装。 |
| Responsibility Boundary | Component、Stage、Human、AIが担当する責務と、越えてはならない範囲を明示する境界。 |
| Runtime Layer | 実際のWorkflow実行を担当するレイヤ。 |
| Website Presentation | Public DocumentationをWebsite上へ提示するPresentation Layer。 |

---

# 9. AI Generation

| 用語 | 定義 |
|------|------|
| AI Generation | AIを利用して成果物を生成する工程全体。 |
| Generation Pipeline | 調査、執筆、レビュー、画像生成までを含む生成処理系列。 |
| Image Generation | ComfyUI等を利用した画像生成工程。 |
| Multi-Agent Workflow | 複数Agentが責務分担して成果物を生成するWorkflow。 |
| Prompt | LLMへ与える入力指示。 |
| Prompt Engineering | Prompt品質を改善する設計手法。 |
| Prompt Contract | Promptが満たすべき構造・責務・制約を定義した契約。 |
| Research | 執筆前に情報収集を行うStage。 |
| Review Loop | Review結果をGenerationへ反映し品質改善を繰り返す処理。 |
| Thinking Model | 推論能力を利用して意味生成を行うLLM。 |
| Writing | Writing Planに従って本文を生成するStage。 |

---

# Verification

Glossaryの更新は、次をすべて満たした場合のみ完了とする。

- Project固有用語のみを収録している。
- Current Referenceとして現在有効な定義のみ保持している。
- History、変更履歴およびReview Historyを保持していない。
- 用語はカテゴリ別に整理されている。
- 各用語は一意に定義されている。
- 他文書の責務を重複して記載していない。
- Documentation、Publication、Governance、Project State、Workflow、Architectureで使用する共通用語を網羅している。
- Workflow系既存用語との意味が一致している。
- 新しいProject固有用語が正式採用された場合、本書をCurrent Referenceとして更新する。
