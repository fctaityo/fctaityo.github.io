# WD-20260824-001 RI#4 Search Recall改善とRI#5 Campaign Control Planeが実戦へ入った

## Metadata

* ID：`WD-20260824-001`
* Date：2026-08-24
* Classification：RI#4 / RI#5 / Research Quality / Runtime / Control Plane / Evidence
* Status：Observed / Campaign Measurement In Progress
* Formal Repository Boundary：Human + ChatGPT側Current Factを記録する。Formal Repository Currentizationは別作業であり、本記録だけでFormal Current成立を主張しない。

## 1. 背景

RI#4の10RUN Campaignでは、Runtime Stability自体は大きく改善し、最初の完走Campaignで`FATAL 0`を達成した一方、Production Acceptanceは成立しなかった。

Evidence-confirmed Baselineは次だった。

```text
Requested: 10
Completed: 10
PASS:  2
FAIL:  8
FATAL: 0
```

主要Gateは`research_quality`が`2 / 10 PASS`で、複数Runに共通して次の連鎖が観測された。

```text
Search Providerが低関連Sourceを返す
↓
Source Relevance AgentがDISTRACTOR判定
↓
CORE_RELEVANT Source不足
↓
research_quality FAIL
↓
unsupported_claim FAIL
↓
review_integrity FAIL
↓
artifact_gate FAIL
↓
Final Run FAIL
```

ここで重要だったのは、Search KeywordだけをRoot Causeにしなかったことである。

Human Topicから抽出されたKeywordが合理的でも、Providerが低関連結果を返すRunが存在した。そこでSemantic Agent、Gate、Prompt、Research Logicをまとめて変更せず、まずCandidate PoolのRecallを増やす単独変更としてSearch Depthを`4 → 8`へ増やす案を切り出した。

## 2. Configを8へ変えてもRuntimeは4のままだった

最初の変更ではConfig上の`max_results_per_query`を8へ変更した。

しかし10RUN Evidenceを確認すると、実Runtimeは4件取得のままだった。

原因はExecution Path側の直書き値だった。

```text
Initial:
search(q, 4 ...)

Recovery:
recovery_search(rq, 4)
```

つまり、ConfigurationのCurrent ValueとRuntime Effective Valueが一致していなかった。

この最初の10RUNは破棄せず、実際に動いた条件をEvidence-backed Baselineとして固定した。

```text
Baseline Search Depth:
Initial  = 4 results/query
Recovery = 4 results/query

Baseline Outcome:
2 PASS / 8 FAIL / 0 FATAL
```

その後のCandidateではExecution Pathも修正し、Live SearchのInitial / Recovery双方を8件へ同期した。

```text
Candidate Search Depth:
Initial Live Search  = 8 results/query
Recovery Live Search = 8 results/query
Non-Live             = 2 results/queryのまま
```

変更対象はSearch Depthだけとし、Semantic Agent / Gate / Prompt / Research Logicは変更しない境界を維持した。

## 3. Depth 8 CampaignはMeasurement Pending

Depth 8 Candidateは10RUN再測定を開始したが、本記録時点では完走していない。

Evidence Snapshot：

```text
Campaign:
CMP-20260824-154103-53663

Status:
RUNNING

Completed:
3 / 10

PASS:  1
FAIL:  1
FATAL: 1
```

RUN3はDepth 8 Candidate条件でFinal PASSし、`research_quality`を含む主要Gateを通過した。

一方RUN2では`research` StageのSource Relevance LLMで次のFATALが発生した。

```text
exception_type:
OllamaError

exception_message:
OLLAMA_STREAM_INCOMPLETE: chunks=2140; chars=4404; terminal_done=false; num_ctx=12288
```

Runtime Capabilityは`CALIBRATED`で、`safe_max_num_ctx=146432`。このEvidenceだけからContext OverflowやSearch Depth 8との因果関係は確定できない。

さらにRUN3が同Candidate条件で完全PASSしたため、Depth 8が必ずFATALを起こす構造とも言えない。

したがって現時点では、次を分離する。

```text
Observed Fact:
Depth 8が実Runtimeへ反映された状態でFinal PASSを確認した。

Observed Fact:
同CampaignでOLLAMA_STREAM_INCOMPLETE FATALを1件確認した。

Working Hypothesis:
Candidate Pool増加によりCORE_RELEVANT Sourceを拾える確率が上がる可能性がある。

Not Established:
Depth 8で成功率が改善した。
Depth 8がFATALを引き起こした。
```

10RUN完走後にBaselineと比較するまで、改善確定扱いしない。

## 4. RI#5がRunではなくCampaignを運転し始めた

RI#5 v0.52では、RI#4 CampaignをHumanが各Runへ張り付かずにLoop運転できるControl Planeが成立しつつある。

Human + ChatGPT側Current Capabilityとして、少なくとも次が実運用されている。

```text
14 Stage Monitoring
Campaign Progress
Run History
Gate Matrix
Pattern Candidate Detection
Human Intervention Tasks
RI Fleet
Evidence Intake
Evidence Export
Runtime Dependency
Run Boundary HOLD
```

Evidence AuthorityはProducer RI側に残る。

RI#5はProducer Evidenceを書き換えて正解を作るAuthorityではなく、次を担う。

```text
Collect
Bind
Monitor
Compare
Project
```

RUN2がFATALになっても、RI#5はFailure Evidenceを保存・分類し、Campaign全体を終了させずRUN3へ進んだ。

```text
Run-level Outcome:
FATAL

Campaign-level State:
RUNNING
```

この分離により、単一Execution FailureとOrchestration Livenessを別々に観測できた。

## 5. Human Interventionで新しいBinding Defectが見えた

Human Interventionには次の操作がある。

```text
確認済み
安全HOLD
直前Run Replay
同系3Run追加
```

`ACK_TASK`はUI実動作確認済み。

`REPLAY_LAST`もEvidence上でReplay実行が確認され、Action自体は動いていた。ただし成功結果をHumanへ返すUI Feedbackが弱かった。

`FOCUS_LAST`は別の既知Defectを持つ。

本来期待するのは、Warningを発生させたScenario Familyへ3Run追加をBindingすることである。

しかしCurrent Implementationは、クリック時点の直前Completed Run Familyを採用する。

```text
Expected:
Warning Evidence
→ Target Family
→ FOCUS 3 Runs

Current Defect:
Button Click
→ Last Completed Run
→ Family
→ FOCUS 3 Runs
```

つまり、表示されたHuman Taskの意味とActionが参照するExecution Contextが同一Evidence IdentityへBindingされていない。

このDefectは認識のみであり、本記録のScopeでは修正しない。

## 6. この日の判断

今回の重要点は、一度に全部を直さなかったことである。

Research Qualityが悪いからといって、Keyword Agent、Search Provider、Source Relevance Agent、Gate Threshold、Promptを同時に変更しなかった。

まずEvidenceで候補Source不足を確認し、Search Depthだけを単独Candidateとして変更した。

同時に、Config値を変えたこと自体を成功条件にせず、Runtime Effective ValueをEvidenceで確認した。

そしてDepth 8 Campaign途中のPASS / FAIL / FATALを、そのまま改善結論へ変換しなかった。

この日、次の原則が再確認された。

> 気付く範囲は広く、変更範囲は厳格。

> 意味は自由。構造は厳格。

## 7. 次のGate

```text
Depth 8 Candidate 10RUN完走
↓
4-result Baselineと比較
↓
Candidate Count / Unique URL / CORE_RELEVANT Count確認
↓
research_quality / unsupported_claim / review_integrity / artifact_gate比較
↓
PASS / FAIL / FATAL比較
↓
Root Cause Review
↓
次CorrectionのHuman Decision
```

途中結果だけでDepth 8をEvidence Acceptedへ昇格しない。
