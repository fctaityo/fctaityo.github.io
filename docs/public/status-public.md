# プロジェクト状況（Project Status）

> **Public Edition**
>
> 本書はLocal AI Foundryの公開版Project Statusである。
> Internal Repositoryにある`status.md`を正本とし、本書は公開可能なCurrent Snapshotだけを保持する派生物である。
> 内部識別子、環境固有情報、非公開Evidenceおよび内部Repository構造は省略または一般化している。

本書はProject Stateに同期した公開用Current Snapshotであり、利用者が現在地と次の一歩を30秒以内に把握するための簡潔なNavigationである。

公開契約は[Publication Governance](../governance/publication-governance.md)を参照する。

Internal Publication Review RegistryおよびPublication Reflection Register（PRR）は内部管理専用であり、Public Repositoryには配置しない。

## 現在地（要約）

Project Stateは`Published`を維持している。RI #1 Article ProductionはHistorical Benchmarkとして保存され、現在のProject方向はCross-RI EvidenceからFoundry Core Capabilityを抽出する段階へ移行している。

RI #2 Documentation Production、RI #3 Visual Asset Production、RI #4 Research-Grounded Long-form Content Production、RI #5 Foundry Control Planeの比較Evidenceを扱う。FoundryConsoleはRI #3のControl Surface / Current Implementationである。RI #4 Current Runtimeはv0.55、RI #5 Current Runtimeはv0.52である。

`FC-CORE-001 Runtime Capability Calibration`、`FC-CORE-002 Delegation Contract Binding`、`FC-CORE-003 Deterministic Technical Gate`、`FC-CORE-004 Evidence Traceability`は確認済みFoundry Core Capabilityである。Website v5はCurrent Presentationであり、Internal Repositoryの正本を代替しない。

## 30秒Current Snapshot

| 確認項目    | 現在値                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------- |
| 現在地 | Project State: `Published`<br>Current Baseline: Active<br>RI #1: Historical Benchmark |
| 目的 | Cross-RI Evidenceから再利用可能なFoundry Core Capabilityを抽出する |
| 最近完了 | RI #4のResearch Recall調整をRuntime検証し、実測で品質改善を確認。Execution Stabilityは追加Review対象として分離 |
| 残りGate | 追加Core Candidateの比較Evidence確認とHuman Decision |
| Blocker | なし（Project State `Blocked`ではない） |
| 次の一歩 | 4-Core confirmed setを基準にFoundry Core Extractionを継続 |
| Human判断 | FC-CORE-001〜004をConfirmed Coreとして維持し、Review Binding Integrityは`CANDIDATE — STRONG`として継続評価する |

## Current Baseline

| Representation | 公開情報 | 確認状態 |
|---|---|---|
| Project State | `Published` | Unchanged |
| Active Baseline | Current Project Baseline | Active |
| Current Vector | Cross-RI Evidence → Foundry Core Extraction | Current |
| RI #1 | Article Production / Historical Benchmark | Frozen |
| RI #2〜RI #5 | Documentation / Visual Asset / Research-Grounded Long-form Content / Foundry Control Plane | Current Evidence Sources |
| Foundry Core | FC-CORE-001〜004 confirmed。Review Binding Integrityは`CANDIDATE — STRONG` | Capability-based |
| Website v5 | Public Presentation | Current |

内部のBaseline ID、Commit SHA、Workflow Hash、App ID、Workflow ID、Revision識別子および環境固有情報は公開版では掲載しない。

## Reference Implementation Status

| Reference Implementation | 公開Current State |
|---|---|
| RI #1 Article Production | `FROZEN / HISTORICAL BENCHMARK` |
| RI #2 Documentation Production | 比較Evidenceを提供するCurrent RI |
| RI #3 Visual Asset Production | FoundryConsoleをControl Surface / Current Implementationとして検証中 |
| RI #4 Research-Grounded Long-form Content Production | Temporal Entity IntegrityをCurrent Package / Capabilityとして検証中 |
| RI #5 Foundry Control Plane | v0.52でProducer EvidenceをCollect / Bind / Monitor / Compare / Project |
| Foundry Core | FC-CORE-001〜004 confirmed。Review Binding Integrityは`CANDIDATE — STRONG` |

## Runtime Status

RI #1のRuntime EvidenceはHistorical Benchmarkとして保存されている。RI #4 v0.55 / RI #5 v0.52ではResearch Recallの調整をRuntime検証し、実測で品質改善を確認した。一方でExecution Stabilityには追加Reviewが必要であり、Production Acceptanceには未到達である。本Public Currentization自体は新しいRuntime実行を意味しない。

| 確認項目 | 公開情報 | 確認状態 |
|---|---|---|
| RI #1 Runtime | Historical Evidence | Frozen |
| Current Publication Work | Documentation Projection / Review | Runtime対象外 |
| Project Runtime Acceptance | Publicationによる変更なし | Unchanged |

## Transition Information

> **公開Current Snapshot:** Project Stateは`Published`であり、Current VectorはFoundry Core Extractionである。

| 確認項目                | 現在値                                             |
| ------------------- | ----------------------------------------------- |
| Current Phase       | Cross-RI Evidence / Foundry Core Extraction     |
| Project State       | `Published`                                     |
| Transition Evidence | Internal Repositoryで管理                          |
| Baseline            | Active                                          |
| Allowed Next States | Human-authorized Project State Contractに従う      |
| Next State Gate     | Human Decisionと必要Evidence                      |
| Snapshot Updated    | `2026-08-22`                                    |

### その他の許可Transition

* Blocking条件を確認した場合: `Blocked`
* 現Baselineの利用中止を人間が承認した場合: `Cancelled`

## Bootstrap Information

`Draft Verified`の初期State確定はInternal RepositoryのBootstrap Evidenceで管理している。

公開可能な確認結果は次のとおりである。

* Import実使用ファイルとRepository上の対象Artifactが一致
* Draft GraphのNode / Edge構造、DAGおよびDepth制約を確認
* Writing Planのfan-out / fan-inとAssembly順序を確認
* Section間の不要な直列依存がないことを確認
* 対象Gateへの不要field非混入を確認
* Retry Contextの契約を確認
* Writing Plan Raw GateとDeterministic Normalizeを確認
* RepositoryとDraftの主要属性およびSemantic Graphが一致
* Dify UI Checklist PASS

内部Hash、識別子、Database確認手順および非公開Evidenceの詳細は掲載しない。

## 詳細へのNavigation

| 確認対象                  | 公開先                                                               |
| --------------------- | ----------------------------------------------------------------- |
| 公開Documentation入口     | [Public Documentation](README-public.md)                          |
| 公開契約                  | [Publication Governance](../governance/publication-governance.md) |
| 公開Architecture        | [Architecture](architecture-public.md)                            |
| 公開Configuration Audit | [Configuration Audit一覧](configuration-audits/index.md)            |
| 公開Operational Review  | [Operational Review一覧](reviews/index.md)                          |
| 公式サイト運用               | [Website Operations](website-operations-public.md)                |

Internal Publication Review RegistryおよびPRRは内部管理専用であり、このPublic Navigationには含めない。

## Publication Boundary

本公開版では、次の情報を省略または一般化している。

* Baseline ID
* Repository BranchおよびCommit SHA
* Workflow HashおよびSemantic Graph Hash
* Dify App ID
* Draft Workflow ID
* Published Workflow ID
* Revision Timestamp
* 内部Evidence IDおよびPath
* Database確認情報
* 環境固有情報
* Repository外の承認記録
* Internal Publication Review Registryの内容
* PRRの内容
* 公開対象一覧および内部Review Current State

これらのMask / Generalization判断は、Public Artifactではなく内部のPublication Reflection Registerで管理する。

各管理対象の現在有効なPublication Review結果は、内部のPublication Review Registryで管理する。
