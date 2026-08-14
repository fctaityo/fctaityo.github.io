# BZ-20260814-020 Humanが決めた値をAIが再選択する

## 分類

Governance / Execution Binding / Responsibility Boundary

## 関連記録

- [WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した](../war-diary/WD-20260814-001-formal-rv-exposed-contract-propagation-gaps.md)

## 症状

HumanがFormal Test Case、Target、Input、Baselineその他の値をすでに確定しているにもかかわらず、後段のAI / CODEX / Launcherが、その値を再探索、再推論、再選択できる。

上流ではHuman Decisionが成立していても、Execution Point（実行地点）では候補集合が残ったままになり、AIが別の値を選べる。

RI #1では、Formal Test ID `RV-01`とExact InputがHuman側で定義済みだったにもかかわらず、Formal Runでgeneric E2E fixtureを選択できた。その結果、Formal RV-01として扱えないInputでRunが生成され、Formal Input Binding Mismatchとして無効化した。

## Root Cause

Human Decisionを「情報」として記録しただけで、Execution Pointへ機械的にBindingしていなかった。

Humanが値を決めた後も、実行側に探索余地が残っていた。

そのため、

```text
Human Decision
=
実行時の固定値
```

ではなく、

```text
Human Decision
=
AIが参照する候補情報の一つ
```

として扱われていた。

## 教訓

HumanまたはCanonical Contractが一意に値を決めた後は、その値を後段で再選択させない。

Execution Pointでは、Decision IDやTest IDからExact Valueを機械的に解決し、Mismatchがあれば実行前にSTOPする。

Humanが決めた値についてAIへ求めるのは「もう一度考えること」ではなく、「正しくBindingされていることを検証すること」である。

探索が必要な工程と、既決定値を実行する工程を分離する。

## 再発防止パターン候補

```text
Human / Canonical Decision
        ↓
Machine-readable Binding
        ↓
Pre-Execution Match
        ↓
Execution
```

この考え方をWorking Nameとして`Fixed Decision Binding`と呼ぶ。

ただし、正式Architecture名としての採用は別途判断する。
