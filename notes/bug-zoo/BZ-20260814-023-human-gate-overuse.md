# BZ-20260814-023 Human Gateを機械処理へ増殖させる

## 分類

Governance / Human Authorization / Responsibility Boundary

## 関連記録

- [WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した](../war-diary/WD-20260814-001-formal-rv-exposed-contract-propagation-gaps.md)

## 症状

SafetyやGovernanceを強化する過程で、本来は機械的に一意に進められる処理までHuman Decision Gateへ戻す。

Commit後Verify、既承認TargetへのCurrentization、Launcher Binding同期、Current Source反映、PASS後の継続等について、意味判断が存在しないのにHumanへ再承認を求める。

結果としてHumanはPurpose、Risk、採用、Publish等を判断する責任者ではなく、単純なContinuationを許可する「承認ボタン」になる。

## Root Cause

Human Authorizationの目的を、「Humanが責任を持つ意味判断」ではなく「危険そうな工程の前で毎回止めること」と誤解した。

Humanがすでに決定したTargetやScopeについて、後段のDeterministic Synchronizationまで新しいDecisionとして扱った。

Safety BoundaryとWorkflow Step Boundaryを混同した。

## 教訓

Human Gateは多いほど安全になるわけではない。

Humanが判断すべきものと、AI / CODEXが自律継続すべきものを分離する。

Human Decisionが必要な例：

- Purpose変更
- Contract Meaning変更
- Risk Acceptance
- Active Baseline採用
- Publish / Live Change
- Runtime Authorization
- destructive / secret / external side effectを伴う高Risk変更

Humanへ戻す必要がない例：

- 既承認Scope内のTest
- Correction Verification
- Post-Commit Verification
- Human-approved Targetへの一意なBinding Synchronization
- Currentization
- Generated View更新
- Mechanical Gate PASS後の既承認Continuation

## 再発防止パターン候補

```text
Human Decision Boundary
        ↓
Authorized Envelope
        ↓
Explore / Implement / Test / Correct / Verify
        ↓
Deterministic Continuation
        ↓
次のTrue Human Decision BoundaryだけでSTOP
```

Human GateはWorkflowの節目ではなく、Authority Boundary（権限境界）へ置く。

この障害パターンをWorking Nameとして「HGやりすぎ問題」と呼ぶ。
