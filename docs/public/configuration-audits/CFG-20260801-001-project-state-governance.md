# Project State Governance Configuration Audit

- Audit ID: `CFG-20260801-001`
- Date: `2026-08-01`
- Phase: `Development`
- Scope: Project State TransitionとCurrent Snapshot Governance
- Result: `Synchronized`
- Supersedes: `N/A`

> **Public Edition**
>
> 本書は内部Configuration Auditを基にした公開版である。
> App ID、Workflow ID、Draft ID、Commit SHA、内部Repository path、fingerprint、hash、
> Working Treeの具体的差分およびRepository外の承認記録は削除または一般化している。
>
> Governance設計、検証範囲、Final Result、残存Gateおよび次のHuman Decisionは維持する。

## Audit Purpose

本監査の目的は、Repository、Dify Draft、Published Workflow、Runtimeが別々の状態を持つ環境で、プロジェクト全体の「現在地」を一意に表現できるGovernanceを導入し、そのDocumentation同期を検証することである。

次を分離した。

- Project Phase
- Project State
- Configuration State
- Baseline
- Current Snapshot
- Human Authorization
- Configuration Audit

## Project State

```text
Proposed
→ Authorized
→ In Progress
→ Repository Verified
→ Draft Verified
→ Published
→ Runtime Verified
→ Accepted
→ Superseded
```

横断Stateとして`Blocked`と`Cancelled`を定義した。

Commit、Import、Test PASSなどの作業事実だけではStateを遷移させない。Entry Condition、Evidence、必要なHuman Authorizationが揃った時点で正式に遷移する。

## Baseline Cycle

| Role | Meaning |
|---|---|
| Candidate | 次の採用候補。進捗はAudit、Review、Test Evidenceで管理する |
| Active | Current Snapshotが示す唯一のBaseline |
| Historical | 以前のActive Baseline。追跡とRollbackのため保持する |

Active Baselineは常に一つとし、Candidate開始だけではCurrent Project Stateを変更しない。

## Current Snapshot

`status.md`は作業ログではなく、Project Stateに同期したCurrent Snapshotとして再定義した。

- Current Phase
- Project State
- Active Baseline
- Current Objective
- Recently Completed
- Current Blocker
- Remaining Gate
- Next Action
- Required Human Decision
- Allowed Next States
- Next State Gate

通常の更新Triggerは正式なProject State Transitionとする。

State非遷移時は、Human Authorization、Current Blocker、Project Phase、Current Snapshot Correctionに限りNavigation項目を更新できる。補助TriggerではProject State、State Entered At、Transition Evidence、Active Baselineを変更できない。

## Initial State Bootstrap

Governance導入前からプロジェクトが進行していたため、一度限りのInitial State Bootstrapを定義した。

```text
Stage 1: Governance Adoption
→ State契約、ADR、Snapshot契約をRepository正本へ採用

Stage 2: Initial State Bootstrap
→ 過去Evidence再確認
→ Human Approval
→ Bootstrap Evidence確定
→ Registry / Audit / Current Snapshot同期
```

未採用の契約を根拠にBootstrapする循環を禁止した。Bootstrapは一度成立した後に再実施できない。

## Responsibility Matrix

| Actor / System | Responsibility | Prohibition |
|---|---|---|
| Human | Scope、Active Baseline、Publish、Bootstrap、Acceptanceの承認 | EvidenceなしのState確定 |
| Codex | Evidence照合、契約適用、文書同期、State候補提示 | 自己承認 |
| Dify | Draft、Published、Runtimeの実効状態を保持 | Repository正本の代替、未承認Publish |
| Repository | 恒久仕様、履歴、DSL、Documentationの正本 | Runtime事実の推測 |

## Configuration Boundary

Configuration StateとProject Stateを自動変換しない。

- Configuration Itemが`Verified`でも、Draft Import未実施ならProject Stateは`Draft Verified`ではない。
- Draft検証がPASSでも、Published Workflowがなければ`Published`ではない。
- Runtime Run成功だけでは、Acceptance未確認のため`Runtime Verified`ではない。
- Project Stateが遷移しても、個別Configuration ItemのStatusを自動変更しない。

## Initial State Result

Governance Adoption後、保存済みEvidenceを再確認し、Initial Stateを`Draft Verified`として確定した。

- RepositoryからDify DraftへのImport完了
- Draft Graph検証完了
- UI Checklist完了
- RepositoryとDraftのSemantic Verification完了
- Published Workflowは未作成
- Runtime Verificationは未実施
- Runtime Acceptanceは未完了

`Draft Verified`より先のStateは推測していない。

## Verification

| Verification | Result |
|---|---|
| Documentation structure | PASS |
| State and Transition consistency | PASS |
| Baseline Cycle | PASS |
| Bootstrap Evidence Schema | PASS |
| Responsibility separation | PASS |
| Current Snapshot short-read test | PASS |
| Registry / Audit / Snapshot consistency | PASS |
| Documentation links | PASS |
| Mermaid structure | PASS |
| Repository diff quality | PASS |

## Configuration Result

- Configuration State: `Synchronized`
- Registry Status: `Verified`
- Blocking Drift: None
- Unknown Drift: None
- Audit Result: `Synchronized`

Bootstrap完了だけを根拠に`Verified`としたのではない。Documentation同期後の静的検証、リンク検証、Snapshot検証、Registry / Audit整合確認がPASSしたことを根拠とする。

## Final Result

`Synchronized`

Project State、Current Snapshot、Baseline Cycle、Configuration State、Definition of Done、作業手順、Navigationの責務は整合した。

## Definition of Done Decision

- Applicable DoD: `Development`
- Decision: `Met`
- Unmet conditions: None（Project State Governance Documentation Scope）

## Remaining Gate

本監査はPublish権限を付与しない。

次のProject Stateへ進むには、対象DraftとActive Baselineを特定したHuman Publish Decisionと、Publish直前のBaseline不変確認が必要である。

Runtime VerificationとRuntime AcceptanceはPublish後の別Gateである。

## Next Smallest Action

Human Publish Decision後、Publish直前にRepository、Active Baseline、Dify Draftの不変を確認する。

## Public Disclosure Review

本公開版には次を含めていない。

- App ID
- Workflow ID / Draft ID
- Commit SHA
- DSL hash / Semantic hash
- 内部Working Tree差分
- ローカル環境path
- Database情報
- Repository外の承認記録全文
- 内部Evidence IDの詳細
