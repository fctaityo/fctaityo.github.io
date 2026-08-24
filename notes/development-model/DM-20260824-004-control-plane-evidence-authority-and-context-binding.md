# DM-20260824-004 Control PlaneのEvidence Authority分離とContext Binding

## Metadata

* ID：`DM-20260824-004`
* Date：2026-08-24
* Status：Working Model / Not Adopted Architecture
* Classification：Development Model / Control Plane / Evidence Authority / Human Intervention / Failure Containment
* Scope：Cross-RI / RI#5 Observed Evidence
* Related Evidence：RI#4 10RUN Campaign / RI#5 v0.52 Campaign Control Plane / WD-20260824-001 / BZ-20260824-024 / BZ-20260824-025
* Current Measurement Boundary：RI#4 Search Depth 8 Campaignは測定途中。成功率改善は未確定。

## 1. Purpose

RI#5は、RI#4の単一Runを直接実行するRunnerではなく、複数RunをCampaignとして運転し、Run History、Gate Matrix、Pattern Candidate、Human Intervention、Evidence Intake / ExportをHumanへ提示するControl Planeとして実装が進んだ。

この実運用から、単にDashboardを作るだけでは説明できない3つの責任境界が見えた。

1. Producer RIとControl PlaneのEvidence Authorityを分離する。
2. 単一RunのOutcomeとCampaign自体のLivenessを分離する。
3. Human Interventionを「直近状態」ではなく「判断対象Evidence」へBindingする。

本メモはこれらをDevelopment Model上のWorking Hypothesisとして整理する。

採用済みFoundry CoreやArchitecture SSOTではない。

---

## 2. Observed Facts

### 2.1 Producer RIがEvidence Authorityを保持している

RI#4は実際のResearch / Planning / Writing / Review / Gateを実行し、そのRun OutcomeとEvidenceを生成する。

RI#5はそれらを取得し、Campaign単位で次を行う。

```text
Collect
Bind
Monitor
Compare
Project
```

RI#5がRI#4のFailure Evidenceを書き換えてPASSへ変えることはしない。

この責務分離により、Control Planeは複数Runを比較できる一方、Domain ProducerのTruth Authorityを奪わない。

### 2.2 Run-level FATALでもCampaignは継続できた

Depth 8 Candidate Campaign `CMP-20260824-154103-53663`では、RUN2の`research` Stageで`OLLAMA_STREAM_INCOMPLETE`が発生した。

Run OutcomeはFATALとして保存された。

その後RI#5はCampaign自体を終了させずRUN3へ進み、RUN3はFinal PASSした。

```text
RUN2:
FATAL

Campaign:
RUNNING

RUN3:
PASS
```

単一Execution FailureとCampaign Orchestration Failureは同じではないことが実Evidenceで確認された。

### 2.3 Quality FAILとExecution FATALを別に保持している

Baseline Campaignで主要問題だったのは`research_quality FAIL`から後続Gateへ連鎖するQuality Failureだった。

一方RUN2のFATALはGate判定へ到達する前のRuntime / LLM Stream Execution Failureだった。

```text
Quality Failure:
Execution completed
→ Gate evaluated
→ FAIL

Execution FATAL:
Execution interrupted
→ Gate not completed
→ FATAL
```

この区別をCampaign Aggregationでも保持することで、品質改善とRuntime Stability改善を別の軸として評価できる。

### 2.4 Human Intervention TaskとAction TargetにBinding Gapがある

`FOCUS_LAST`は同系Scenario Familyを3Run追加する機能を持つ。

しかしCurrent ImplementationはWarningを発生させたFamilyではなく、クリック時点の直前Completed Run Familyを採用する。

UI上のTask MeaningとExecution Targetが同一Evidence Identityで拘束されていない。

このDefectにより、Humanが正しい判断をしてもMachine Executionが別Targetへ作用し得る。

---

## 3. Working Hypothesis 1 — Control Plane is not Evidence Authority

Control Planeの役割は、Producerを置き換えることではない。

Producerが生成したEvidenceを横断的に扱えるようにすることである。

Candidate Responsibility Boundary：

```text
Producer RI
→ Execute
→ Measure
→ Gate
→ Produce Evidence
→ Own Outcome Truth

Control Plane
→ Collect
→ Bind
→ Monitor
→ Compare
→ Project
→ Request / Orchestrate bounded actions
```

Control PlaneがOutcome Truthを再計算し始めると、Producer GateとControl Plane判定の二重Authorityが生まれる。

したがってControl Planeは、可能な限りProducer Evidenceを参照・Bindingし、独自の意味再生成でTruthを上書きしない方がよい。

## 4. Working Hypothesis 2 — Run OutcomeとCampaign Livenessを分離する

Campaignは複数の独立Runを観測する上位単位である。

一つのRunがFAIL / FATALになったことだけでCampaign全体を失敗終了させると、Failure Patternを集めるためのCampaignが最初のFailureで止まる。

一方、何が起きても継続する設計も危険である。

必要なのは、Run FailureとCampaign Stop Conditionを別Contractにすることである。

```text
Run Outcome:
PASS / FAIL / FATAL

Campaign Continuation:
CONTINUE / HOLD / STOP
```

Candidate Stop Conditionsには、例えば次があり得る。

- Evidence保存不能
- Producer Identity不明
- Runtime Dependency破損
- Human-requested HOLD
- Safety / Authorization Boundary違反
- Campaign Contract自体の不成立

Domain Quality FAILやrecoverableな単発Runtime FATALは、Evidenceを保存できる限りCampaign継続対象になり得る。

この境界は今後Cross-RI Evidenceが必要であり、現時点ではRI#5 Observed EvidenceからのWorking Hypothesisである。

## 5. Working Hypothesis 3 — Human ActionはTrigger EvidenceへBindingする

Human Interventionでは、Humanが画面上のTaskを見てMeaning / Risk / Intentを判断する。

Machine側はその判断を受け取った後、Targetを再推定してはいけない。

Candidate Flow：

```text
Observed Evidence
↓
Pattern / Warning
↓
Human Task
↓
Human Decision
↓
Bound Target
↓
Execution
↓
Result Evidence
```

Task作成時に少なくとも次を固定する方がよい。

```text
task_id
trigger_evidence_id
trigger_run_id
pattern_id
bound_target
requested_action
```

実行後は、生成されたRun / EvidenceからOrigin Taskへ逆参照できることが望ましい。

この構造により、Human Decision TraceabilityとExecution Bindingを一つの線で再構成できる。

## 6. Working Hypothesis 4 — Control Planeでは意味と構造の境界がさらに重要になる

RI#4ではSearch Intent / Source RelevanceのSemantic JudgmentをLLMへ残し、ID、Count、Threshold、Schema、Range、Binding、State、Authorization等をDeterministic Controlへ残す方向が強くなった。

RI#5ではこの境界がさらに上位へ現れる。

Semantic Plane：

```text
Warningの意味
Patternの解釈
追加検証が必要か
どのCorrectionを採るか
Production Acceptanceを認めるか
```

Human / LLMが扱う。

Deterministic Control Plane：

```text
run_id
task_id
campaign_id
Count
Gate Result
Binding
Retry / Focus Remaining
HOLD State
Authorization State
Evidence Locator
Version Identity
```

Machineが扱う。

ここでMachineがSemantic Meaningを文字列一致だけで再判定したり、Humanが選んだTargetを`last completed`等から再推定したりすると境界が崩れる。

この意味で、既存の原則

> 意味は自由。構造は厳格。

は、単一WorkflowだけでなくControl Planeにも適用可能な可能性が高まった。

ただしCross-RIでの追加EvidenceなしにConfirmed Foundry Coreへ昇格させない。

## 7. Search Recall実験から見えるEvaluation Boundary

RI#4ではSearch Depth 4 Baselineが`2 PASS / 8 FAIL / 0 FATAL`だった。

Depth 8 Candidateは測定途中で、3RUN時点では`1 PASS / 1 FAIL / 1 FATAL`である。

RUN3で完全PASSを確認したことは、Depth 8状態で正常完走可能であるEvidenceになる。

しかし3RUN時点の割合を10RUN Baselineと比較して「改善した」と結論づけることはできない。

Development Model上、変更評価では次を分ける必要がある。

```text
Implementation Proof:
意図した変更が実Runtimeへ反映されたか

Execution Proof:
変更後条件で正常完走できるか

Campaign Measurement:
十分なRun数で結果分布がどう変わるか

Acceptance:
改善を採用するか
```

この分離により、「8件取得できた」「1回PASSした」「成功率が改善した」「Production Acceptance」の4つを同一視しない。

## 8. Open Gaps

- RI#5 Control Plane PatternがRI#4以外のProducer RIでも成立するか。
- Campaign Stop ConditionをどこまでDeterministicに定義できるか。
- Pattern Candidate DetectionのSemantic / Deterministic Boundaryをどう切るか。
- Human Intervention TaskからResult Evidenceまでの完全Traceabilityをどう実装するか。
- `FOCUS_LAST` Binding Defect修正後に、Warning Target Familyが確実に維持されるか。
- Depth 8 Candidateの10RUN完走後、Recall増加がQuality PASS率へ有意な改善傾向を示すか。
- FATAL頻度とCandidate Pool増加に相関があるか。

## 9. Target Direction

現時点のTarget Directionは次である。

```text
Producer Truthを保持する
+
Control Planeで横断観測する
+
Run FailureとCampaign Livenessを分離する
+
Human ActionをTrigger EvidenceへBindingする
+
Semantic JudgmentとDeterministic Controlを混ぜない
+
途中結果をAcceptanceへ先取りしない
```

これは採用済みArchitectureではない。

今後、RI#5のCorrection Evidenceと別RIでの再利用Evidenceを集め、Foundry Core Candidateとして扱えるかを再評価する。
