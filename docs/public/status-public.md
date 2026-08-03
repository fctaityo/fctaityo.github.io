# プロジェクト状況（Project Status）

> **Public Edition**
>
> 本書はLocal AI Foundryの公開版Project Statusである。
> Internal Repositoryにある`status.md`を正本とし、本書は公開可能なCurrent Snapshotだけを保持する派生物である。
> 内部識別子、環境固有情報、非公開Evidenceおよび内部Repository構造は省略または一般化している。

本書はProject Stateに同期した公開用Current Snapshotであり、利用者が現在地と次の一歩を30秒以内に把握するための簡潔なNavigationである。

公開契約は[Publication Governance](../governance/publication-governance.md)、現在の公開状態は[Publication Registry](../registry/publication-registry.md)を参照する。

## 現在地（要約）

Workflowの設計、実装、Import、Publishおよび意味上の一致確認までは完了している。

現在は、Published Workflowを実際に動かす前に、何を入力し、何を確認し、どの状態を合格とするかを決めている段階である。

Published Workflowは固定済みである。

Runtime Verificationはまだ実行していない。

## 30秒Current Snapshot

| 確認項目 | 現在値 |
|---|---|
| 現在地 | Project State: `Published`<br>Current Baseline: Active<br>Repository / Draft / Publishedの整合確認済み |
| 目的 | Published Workflowを固定し、Runtime VerificationとRuntime Acceptanceの明示承認に備える |
| 最近完了 | Publish、Published Workflow作成、Repository / Published Semantic Verification PASS |
| 残りGate | Runtime Verification、Runtime Acceptance |
| Blocker | なし。Runtime実行はHuman Authorization未成立のため未実施 |
| 次の一歩 | Runtime Verificationの対象、入力、必須Run、Acceptance条件を確認する |
| Human判断 | Published Workflowに対するRuntime VerificationのScopeと実行を承認するか |

## Current Baseline

| Representation | 公開情報 | 確認状態 |
|---|---|---|
| Baseline | Active Baseline | Active |
| Repository | 対象BaselineのRepository状態 | 確認済み |
| Workflow DSL | Internal Repository上の対象Workflow | 確認済み |
| Draft Workflow | 対象Draft Workflow | 検証済み |
| Draft Graph | DAG、Maximum DepthおよびPath制約 | PASS |
| Semantic Graph | Repository / Draft / Published | MATCH |
| UI Checklist | 必須Checklist | PASS |
| Published Workflow | 対象Published Workflow | PASS |

内部のBaseline ID、Commit SHA、Workflow Hash、App ID、Workflow ID、Revision識別子および環境固有情報は公開版では掲載しない。

## Runtime Status

**Runtime Status:** Not Executed

| 確認項目 | 公開情報 | 確認状態 |
|---|---|---|
| Runtime Verification | Run未実施 | Not Executed |
| Runtime Acceptance | Acceptance Evidence未確定 | `PENDING` |

### `Runtime Verified`へ進むGate

1. 対象Published WorkflowをRuntime Verification対象として明示承認する。
2. 実行入力、必須RunおよびAcceptance条件を確定する。
3. Runtime実行前にRepository / Draft / PublishedのBaseline不変を確認する。
4. 必須Runtime RunとAcceptance EvidenceがPASSした場合だけ`Runtime Verified`へ進む。

Runtime実行承認はまだ存在しない。

本SnapshotはRuntime実行権限を付与しない。

## Transition Information

> **公開Current Snapshot:** Active BaselineのPublishとPublished Verificationは完了した。
> Project Stateは`Published`である。Runtimeは未実施である。

| 確認項目 | 現在値 |
|---|---|
| Current Phase | Runtime Verification Preparation |
| Project State | `Published` |
| Transition Evidence | Internal Repositoryで管理 |
| Baseline | Active |
| Allowed Next States | `Runtime Verified`、`Blocked`、`Cancelled` |
| Next State Gate | Runtime実行の明示承認、必須Run完了、Acceptance Evidence PASS |
| Snapshot Updated | `2026-08-02` |

### その他の許可Transition

- Blocking条件を確認した場合: `Blocked`
- 現Baselineの利用中止を人間が承認した場合: `Cancelled`

## Bootstrap Information

`Draft Verified`の初期State確定はInternal RepositoryのBootstrap Evidenceで管理している。

公開可能な確認結果は次のとおりである。

- Import実使用ファイルとRepository上の対象Artifactが一致
- Draft GraphのNode / Edge構造、DAGおよびDepth制約を確認
- Writing Planのfan-out / fan-inとAssembly順序を確認
- Section間の不要な直列依存がないことを確認
- 対象Gateへの不要field非混入を確認
- Retry Contextの契約を確認
- Writing Plan Raw GateとDeterministic Normalizeを確認
- RepositoryとDraftの主要属性およびSemantic Graphが一致
- Dify UI Checklist PASS

内部Hash、識別子、Database確認手順および非公開Evidenceの詳細は掲載しない。

## 詳細へのNavigation

| 確認対象 | 公開先 |
|---|---|
| 公開Documentation入口 | [Public Documentation](README-public.md) |
| 公開契約 | [Publication Governance](../governance/publication-governance.md) |
| 現在の公開状態 | [Publication Registry](../registry/publication-registry.md) |
| 公開Architecture | [Architecture](architecture-public.md) |
| 公開Configuration Audit | [Configuration Audit一覧](configuration-audits/index.md) |
| 公開Operational Review | [Operational Review一覧](reviews/index.md) |
| 公式サイト運用 | [Website Operations](website-operations-public.md) |

## Publication Boundary

本公開版では、次の情報を省略または一般化している。

- Baseline ID
- Repository BranchおよびCommit SHA
- Workflow HashおよびSemantic Graph Hash
- Dify App ID
- Draft Workflow ID
- Published Workflow ID
- Revision Timestamp
- 内部Evidence IDおよびPath
- Database確認情報
- 環境固有情報
- Repository外の承認記録

これらのMask / Generalization判断は、Public Artifactではなく内部のPublication Reflection Registerで管理する。
