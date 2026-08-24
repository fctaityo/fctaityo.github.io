# BZ-20260824-025 Human InterventionがWarning Contextではなく直前RunへBindingされる

## 分類

Review / Evidence / Human Intervention / Context Binding / Control Plane

## 関連記録

- [WD-20260824-001 RI#4 Search Recall改善とRI#5 Campaign Control Planeが実戦へ入った](../war-diary/WD-20260824-001-ri4-search-recall-and-ri5-control-plane-campaign.md)

## 症状

RI#5のHuman Intervention Taskには、同じScenario Familyを3Run追加する`FOCUS_LAST`操作が存在する。

Humanが画面で見るTaskは、あるWarning / Pattern Candidateを起点としている。

しかしCurrent Implementationでは、Button Click時にWarningを発生させたFamilyを使わず、その時点の直前Completed Run Familyを採用する。

```text
Expected:
Warning Evidence
→ Warning Target Family
→ Human Action
→ Same Family 3 Runs

Current:
Warning Evidence
→ Human Action
→ Last Completed Run
→ Last Run Family
→ 3 Runs
```

Warning表示後に別Runが完了すると、Humanが「このWarningへ対処する」つもりで押したActionが別Familyへ作用し得る。

## Root Cause

Human-facing TaskとExecution Actionの間にImmutable Context Bindingがない。

UI Cardは「何に対するTaskか」をHumanへ提示しているが、Action HandlerはCard生成時のEvidence Identity / Scenario Familyを使用せず、クリック時のMutable Global Stateである`last completed run`から対象を再解決している。

これは表示上の問題ではなく、Human Decision Bindingの問題である。

Humanが選択したTaskの意味と、Machineが実行したTargetが一致しない可能性がある。

## 影響

- Human Interventionの対象Familyが意図とずれる。
- Pattern再現試験が別Scenarioへ向く。
- 追加3RunのEvidenceが元Warningへ正しく帰属しない。
- UI上では操作成功に見えても、Human DecisionとExecution TargetのTraceabilityが失われる。

## 教訓

Human-facing Actionは、画面に表示したTrigger Evidenceへ直接Bindingする。

```text
Task Creation
→ task_id
→ trigger_evidence_id
→ target_family
→ action
→ execution
→ resulting_run_ids
```

クリック時にTargetを再推定・再探索しない。

これは`Fixed Decision Binding`と同じ責任境界をHuman Intervention UIへ適用したものと考えられる。

## 再発防止パターン候補

- Task生成時に`target_family`を固定する。
- `trigger_evidence_id` / `trigger_run_id` / `pattern_id`をTaskへ保持する。
- Action Requestは`task_id`または固定Targetを受け取る。
- Click時の`last_*` stateからTargetを再解決しない。
- Resulting RunへOrigin Task / Trigger EvidenceをBindingする。
- UI Success Feedbackに実際のTarget Familyと追加Run数を返す。

## Current Disposition

Known Defect / Unfixed。

本記録は障害パターンのKnowledge化のみを行い、修正Authorizationを意味しない。
