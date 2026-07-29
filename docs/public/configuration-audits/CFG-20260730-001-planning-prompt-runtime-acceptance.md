# CFG-A001 Planning Prompt Repository Reflection Audit

- Audit ID: `CFG-20260730-001`
- Date: `2026-07-30`
- Auditor: `Public Documentation`
- Phase: `Development`
- Configuration Item: `CFG-A001`
- Scope: Planning Agent System PromptのDraft → DSL同期とRuntime Acceptance
- Task: 承認済みDraft Planning PromptのRepository Reflection
- Trigger: CFG-A001 Human Final Decision Approved後のfield-level同期
- Supersedes: `N/A`
- Related Review: `REV-20260730-001`

## Baseline

| Item | Value |
|---|---|
| Git baseline | 公開対象外 |
| Working Tree | Repository Reflection開始時点で、CFG-A001 System Prompt同期差分とScope外既存差分が混在 |
| App ID | 公開対象外 |
| Workflow ID | 公開対象外 |
| Workflow Version | `draft` |
| Draft updated_at | `Unconfirmed` |
| DSL path | 公開対象外 |
| Draft / DSL System Prompt | 実効文字列の一致をfingerprintで確認 |
| User Prompt Before / After | 同一であることをfingerprintで確認 |
| Provider | Local LLM Provider。Secretは記録しない |
| Runtime Run IDs | 公開対象外 |
| Previous Audit | [`CFG-20260724-002`](CFG-20260724-002-configuration-synchronization.md) |

## Audit Scope

Included:

- `planning_agent.prompt_template`のSystem Prompt
- Draft／DSL System Prompt実効文字列とfingerprint
- User Prompt非変更
- YAML構文
- CFG-A001 field-level非変更範囲
- 通常入力／曖昧Entity入力Runtime Acceptance
- Planning Raw Output、Normalize、Contract Gate

Excluded:

- User Prompt変更
- 他Prompt、他Node、Graph、Edge、Selector、DTO Schema、Workflow設定変更
- Prompt独自改善、Draft変更、Publish
- CFG-A001以外のConfiguration Item
- Scope外Working Tree差分

## Configuration Item Status

| 項目 | 値 |
|---|---|
| Registry Status Before | `Pending` |
| Intended Registry Status | `Verified`（同期後検証とPASS Audit完了時） |
| Registry Status After | `Blocked` |
| Current Owner Before | `Draft` |
| Current Owner After | `Unresolved` |

Current Ownerは、承認済みDraftがDSLへ同期済みである一方、Runtime Acceptanceが失敗しているため、
恒久採用元を単一Representationへ確定できない状態として`Unresolved`とする。

## Draft Source and DSL Target

| 項目 | Draft Source | DSL Target |
|---|---|---|
| Representation | Dify Draft | Git管理DSL |
| App ID / Path | 公開対象外 | 公開対象外 |
| Workflow ID | 公開対象外 | 公開対象外 |
| Node ID | `planning_agent` | `planning_agent` |
| Field | `prompt_template[role=system].text` | `prompt_template[role=system].text` |

## Configuration Status Matrix

| Representation | Registry Status Before | Registry Status After | Configuration State | Severity | Evidence | Decision |
|---|---|---|---|---|---|---|
| Draft ↔ DSL | Pending | Blocked | `Synchronized` | None | System Prompt fingerprint一致 | 同期自体は完了 |
| Runtime Raw Output | Pending | Blocked | `Runtime Drift` | Blocking | 曖昧Entity入力でRaw Contract FAIL | Acceptance失敗 |
| Normalize後DTO / Gate | Pending | Blocked | `Equivalent` | Warning | Normalize抽出後Gate `ok` | Raw PASSを意味しない |

## Changed Items

| Item | Before | After | Authorized Scope | Verification |
|---|---|---|---|---|
| Planning Agent System Prompt | Git baseline上の旧System Prompt | 承認済みDraft全文 | CFG-A001 System Promptのみ | Draft／DSL実効文字列とfingerprint一致 |
| Planning Agent User Prompt | 変更前fingerprint | 同一 | 変更禁止 | Before／After一致 |

## Static Verification

| Verification | Result | Evidence |
|---|---|---|
| Draft / DSL System Prompt | PASS | fingerprint一致 |
| User Prompt非変更 | PASS | fingerprint一致 |
| YAML syntax | PASS | YAML parser |
| Graph / Node / Edge / Selector非変更 | PASS for CFG-A001 reflection scope | field-level比較 |
| CFG-A001以外の差分非増加 | PASS | Scope分離確認 |

## Runtime Acceptance

| 項目 | 通常入力 | 曖昧Entity入力 |
|---|---|---|
| Input topic | 明確なTopic | `高橋名人` |
| Run ID | 公開対象外 | 公開対象外 |
| Planning Output fingerprint | 確認済み | 確認済み |
| 先頭文字 | `{` | `<` |
| 先頭`<think>` | No | Yes |
| Raw JSON parse | PASS | FAIL |
| Normalize Contract | PASS | PASS after extraction |
| Planning Gate | `ok` | `ok` |
| Test Result | PASS | FAIL |

## Contract Results

- Raw Output Contract: `FAIL`
  - 先頭文字が`{`ではない
  - DTO外文章と`<think>`が存在する
  - 生出力全体を標準JSON Parserでparseできない
- Normalize Contract: `PASS after extraction`
  - `</think>`以前を除去し、後続の最初のparse可能なJSON objectを抽出した
  - `schema_valid_before_normalization`はRaw全体ではなく抽出後objectを評価した
- Gate: `ok`
  - Raw Outputを直接検査せず、Normalize結果だけを評価した
  - Raw Output ContractのPASSを意味しない

## Warning

| ID | Item | Condition | Impact | Required Action |
|---|---|---|---|---|
| `CFG-20260730-001-W01` | Runtime Evidence | Repository外でRetention／Backup未確認 | Evidence消失Risk | fingerprintと要約をRepositoryへ保存 |

## Blocking Drift

| ID | Item | Condition | Evidence | Unblock Condition |
|---|---|---|---|---|
| `CFG-20260730-001-B01` | CFG-A001 Runtime Acceptance | 曖昧Entity生出力がRaw Output Contract違反 | 公開対象外のRuntime Evidence | Root Cause確定後、承認済み対応と再TestでRaw Contract PASS |
| `CFG-20260730-001-B02` | Planning検査境界 | Raw違反がNormalize後Gateから不可視 | Normalize／Gate実装と出力 | Raw／Normalized Contract責務を承認し、違反を観測可能にする |

`B01`と`B02`をProject Dashboard上で2件、単一Problemの2側面として1件、または既存Driftの
継続として数える規則は確定していない。集計件数は推測しない。

## Temporary and Unknown Drift

- Temporary Drift: なし
- Unknown Drift:

| ID | Item | Unknown Fact | Required Decision |
|---|---|---|---|
| `CFG-20260730-001-U01` | Root Cause | Prompt、model、LLM Parameters等のどれが`<think>`生成原因か | Operational ReviewでRoot Causeを確定 |

## Evidence

| Evidence ID | Type | Reference | Notes |
|---|---|---|---|
| `E01` | Prompt fingerprint | Draft / DSL一致を確認 | System Prompt全文は複製しない |
| `E02` | User Prompt fingerprint | Before／After一致を確認 | User Prompt全文は複製しない |
| `E03` | Runtime | 通常入力のRuntime Evidence | Repository外 |
| `E04` | Runtime | 曖昧Entity入力のRuntime Evidence | Repository外 |
| `E05` | Raw Output fingerprint | 対象出力のfingerprintを確認 | `<think>`全文は保存しない |
| `E06` | Operational Review | `REV-20260730-001` | Planning Raw Contract |

## Evidence Location and Retention Risk

- Primary runtime evidence: Dify Runtime Database
- Repository外Evidence: Yes
- Confirmed retention: No
- Confirmed executed backup: No
- Risk: Runtime Databaseまたは永続化領域の消失時にRun Evidenceを再取得できない可能性

`Existing environment does not provide confirmed retention evidence`

## Verification

| Verification | Result | Evidence |
|---|---|---|
| Static | PASS | YAML、fingerprint、field-level比較 |
| Unit | Not performed | 今回Scopeは既存Runtime Acceptance |
| Integration | Not performed | Graph／DTO境界変更なし |
| E2E | Not completed | Planning Evidence取得後にRun停止 |
| Runtime | FAIL | 曖昧Entity Raw Contract |
| Artifact | Not Applicable | Planning Stage対象 |
| Documentation links | PASS for public links | 公開対象文書間の相対リンクを確認 |
| Mermaid | Not Applicable | Mermaidなし |

## Repository Reflection Result

```text
Configuration Synchronization: Completed
Runtime Acceptance: Failed
Repository Reflection: Blocked
Draft ↔ DSL: Synchronized
Runtime Raw Output: Runtime Drift
Normalize DTO: Equivalent
Raw Output Contract: FAIL
Normalize Contract: PASS after extraction
Gate: ok
Publish: Not performed
Push: Not performed
```

## Final Result

`Blocked`

Draft／DSL System Prompt同期は成功したが、曖昧Entity Runtime AcceptanceでRaw Output Contract違反が
発生し、その違反がNormalize後のGateから不可視となる。Blocking DriftとRoot Cause未確定が残るため、
`Synchronized`または`Verified`とは判定しない。

## Definition of Done Decision

- Applicable DoD: `Development`
- Decision: `Not Met`
- Unmet conditions:
  - Raw Output Contractを満たしていない
  - Runtime Acceptanceが成功していない
  - Blocking Driftがゼロではない
  - Unknown Root Causeが残る

## Remaining Risk

- `<think>`生成Root Cause未確定
- Raw違反が他入力でも発生する可能性
- Gate `ok`がRaw Contract PASSと誤解される可能性
- Runtime EvidenceのRetention／Backup未確認
- Scope外Working Tree差分との混在

## Required Next Action

1. `REV-20260730-001`でRoot CauseとRaw／Normalized Contract責務をレビューする。
2. Prompt、model、Parameters等を変更する場合は別途Human Final Decisionを得る。
3. 承認済み対策後に通常入力／曖昧Entity Runtime Acceptanceを再実施する。

## Human Approval

| 項目 | 値 |
|---|---|
| Review Package | Repository外 |
| Review Result | `PASS（軽微修正反映済み）` |
| Human Final Decision | `Approved` |
| Repository Action | `Authorized` |
