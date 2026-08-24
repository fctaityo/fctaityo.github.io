# BZ-20260824-024 Config上のSearch DepthをRuntime直書き値が上書きする

## 分類

Configuration / Runtime / Execution Binding / Observability

## 関連記録

- [WD-20260824-001 RI#4 Search Recall改善とRI#5 Campaign Control Planeが実戦へ入った](../war-diary/WD-20260824-001-ri4-search-recall-and-ri5-control-plane-campaign.md)
- [BZ-20260814-021 ContractがExecution Pointまで届かない](BZ-20260814-021-contract-not-propagated-to-execution-point.md)

## 症状

Configuration上ではSearch Depthを`4 → 8`へ変更済みなのに、実Runtimeでは各Queryの取得件数が4のままになる。

見た目上は設定変更が完了しているため、Configだけを確認するとCandidate条件が成立したように見える。

しかしExecution Pathには別の固定値が存在していた。

```text
Initial:
search(q, 4 ...)

Recovery:
recovery_search(rq, 4)
```

このため、Configuration ValueとRuntime Effective Valueが乖離した。

## Root Cause

同じControl Parameterに複数のAuthority Sourceが存在した。

```text
Config:
max_results_per_query = 8

Execution Code:
4 hardcoded
```

Execution Code側がConfigを参照せず固定値を持っていたため、Config変更がExecution Pointへ伝播しなかった。

これは一般的な「設定ファイルを変え忘れた」問題ではない。

Configurationが存在していても、ConsumerがそのConfigurationへBindingされていなければRuntime Behaviorは変わらないというExecution Binding Failureである。

## 影響

最初の10RUNはHumanが意図したDepth 8試験ではなく、実際にはDepth 4で実行された。

ただしEvidenceにより実効条件を特定できたため、その10RUNは破棄せず、次のEvidence-confirmed Baselineとして再分類できた。

```text
Depth 4 Baseline:
2 PASS / 8 FAIL / 0 FATAL
```

## 教訓

Configuration Changeの成立条件を「ファイル上の値が変わった」にしない。

少なくとも次を確認する。

```text
Canonical Configuration
↓
Consumer Binding
↓
Execution Request
↓
Runtime Effective Value
↓
Evidence
```

特にThreshold、Count、Retry Count、Search Depth、Context Size、Timeout等のDeterministic Parameterは、Runtime EvidenceへEffective Valueを残す。

## 再発防止パターン候補

- 同一ParameterのAuthority Sourceを一つにする。
- Execution Pathでmagic numberを持たずCanonical Configを参照する。
- TestでConfig変更がExecution Requestへ伝播することを確認する。
- Runtime EvidenceへEffective Parameterを記録する。
- Campaign / Benchmarkでは「意図した条件」ではなく「実測された条件」でBaseline / Candidateを命名する。
- Config ValueとRuntime Effective Valueが不一致ならMeasurement Acceptanceを停止する。

Configurationは、書かれているだけでは効かない。
