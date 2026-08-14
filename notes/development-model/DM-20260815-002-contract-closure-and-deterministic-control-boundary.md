# DM-20260815-002 Human-Directed FoundryにおけるContract ClosureとDeterministic Control Boundary

## Metadata

* ID：`DM-20260815-002`
* Date：2026-08-15
* Status：Working Model / Not Adopted Architecture
* Classification：Development Model / Human-AI Responsibility Boundary / Contract Execution / Deterministic Control
* Scope：Local AI Foundry全体
* Related Evidence：RI #1 Formal Runtime Verification / War Diary / Bug Zoo / Configuration Management Notes
* Related Series：Season 2 / Season 3構想

## 1. Purpose

RI #1 Article Production（記事制作）のFormal Runtime Verification（正式実行検証）では、Contract（契約）、Configuration（構成）、Human Decision（人間判断）、Repository Verification（リポジトリ検証）が存在していても、それだけでは実行時の正しさを保証できない事例が連続して観測された。

今回のEvidence（証拠）では、次の問題が確認された。

* Human-defined Formal Test Case（人間定義済み正式テストケース）があっても、Execution Point（実行地点）で別Inputを再選択できた。
* Correct Contract（正しい契約）で実行しても、Machine（機械）が知っている文字数・上限・必要削減量をLLMへ明示せず、Retry（再試行）結果が623文字から698文字へ増えた。
* RepositoryへCorrection（修正）を実装しても、Draft / Publishedへ自動では伝播しなかった。
* Human-approved Publish（人間承認済み公開）後、新しいPublished Identity（公開済み識別子）が生成されたが、Canonical Launcher（正式起動経路）は旧Identityを参照したままだった。
* Human Decisionが不要なCurrentization（現在化）やBinding Synchronization（ひも付け同期）までHuman Gate（人間判断ゲート）へ戻しかけた。

War Diaryでは一連の出来事を`WD-20260814-001`として記録し、Bug Zooでは再発可能な障害パターンを`BZ-20260814-020`〜`023`として分離した。

Configuration Management Notesでは、Human Decision Boundary（人間判断境界）とMechanical Continuation（機械的継続）、Dependent Currentization（従属現在化）とBinding Synchronizationを実務ルールとして整理した。

本メモでは、それらをさらに一段上げて、Human-Directed Foundry（人間主導Foundry）のDevelopment Model（開発モデル）として何が成立しつつあるかをWorking Model（作業仮説）として整理する。

ここで扱う名称・構造は採用済みArchitecture（設計）ではない。

---

## 2. Observed Facts

### 2.1 Contractが存在してもExecution Pointは自動では拘束されない

Formal Test ID `RV-01`にはHuman-defined Exact Input（人間定義済み固定入力）が存在していた。

しかし修正前のLauncherでは、Formal Run（正式実行）でgeneric E2E fixture（汎用E2E入力）を選択できた。

Human Decisionそのものは存在したが、

```text
Human Decision
        ↓
Execution Point
```

の間にMachine-enforced Binding（機械強制ひも付け）が無かった。

その結果、Humanが一度決めた値をAI / CODEXが再選択できた。

### 2.2 Machine FactをLLMへ再推定させるとControlが崩れる

Conclusion Retry（結論再試行）では、Gate（判定ゲート）が初回出力623文字を計測できていた。

有効範囲は240〜420文字であり、最低203文字の削減が必要だった。

しかしRetry Prompt（再試行指示）には、実測623、上限420、必要削減203というDeterministic Fact（決定論的事実）が十分に渡されていなかった。

モデルは前回出力を約370文字と誤認した。

その後、240〜420という範囲自体はreasoning（推論）で導けたにもかかわらず、最終出力は698文字となった。

ここでは、LLMのInstruction Following Failure（指示追従失敗）だけでなく、Machineが知っている事実をSemantic Model（意味生成モデル）へ再推定させたControl Design（制御設計）側の問題も存在した。

### 2.3 Repository PASSとLive PASSは別である

Deterministic Retry Correction Payload（決定論的Retry修正Payload）はRepositoryへ実装され、Test（テスト）もPASSした。

しかしDify Draft / Publishedは旧状態のままだった。

Repository上の正しさは、Live State（実環境状態）への反映を意味しない。

### 2.4 Publish PASSとExecution Binding PASSも別である

Human-approved Live Apply / Publish後、Repository / Draft / PublishedのSemantic Graph（意味構造）は一致した。

それでもCanonical Launcherは旧Published Workflow IDを参照していた。

このため、

```text
Semantic Equivalence
≠
Execution Binding
```

が実例として確認された。

### 2.5 Human Gateを増やすだけでは安全にならない

Live Apply / PublishはHuman Decisionが必要だった。

一方、Humanが承認済みのPublished ResultへLauncherを同期することは、Targetを新しく選ぶ判断ではなかった。

既決定Targetへの一意なBinding SynchronizationまでHumanへ戻すと、HumanはMeaning / Risk / Authority（意味 / リスク / 権限）の判断者ではなく、Workflow Continuation（作業継続）を許可するボタンになる。

---

## 3. Working Hypothesis 1 — Fixed Decision Binding

### 3.1 Definition Candidate

HumanまたはCanonical Contract（正式契約）が一意に値を決定した後、その値を下流のAI / CODEX / Agent（エージェント）が再探索・再推論・再選択しない。

Working Name（仮称）：

**Fixed Decision Binding**

### 3.2 Problem it addresses

AIは曖昧さを補完する能力を持つ。

これはSemantic Work（意味作業）では強みだが、すでに決定されたID、Target、Test Input、Threshold（閾値）等については誤動作要因になる。

一度決定済みの値に候補探索を残すと、AIが「より自然」「より一般的」「より妥当」に見える別値を選べる。

### 3.3 Candidate Rule

```text
Decision required
→ Human / Canonical Contract

Decision completed
→ Machine-readable Binding

Execution
→ Bound value only

Mismatch
→ Pre-Execution STOP
```

### 3.4 What this does not mean

Fixed Decision Bindingは、AIに判断させないという意味ではない。

候補生成、分析、Comparison（比較）、Recommendation（推奨）はAIが行える。

HumanまたはContractが値を確定した後のExecution Stage（実行段階）で、同じ判断を再度AIへ委譲しないという境界である。

---

## 4. Working Hypothesis 2 — Contract Propagation

### 4.1 Definition Candidate

Contractは正本へ記述された時点では完了していない。

そのContractを参照すべきConsumer（利用側）へ同じ意味が伝播し、Execution Pointで実効値として確認されるまでを一つのControl Concern（制御関心事）として扱う。

Working Name：

**Contract Propagation**

### 4.2 Candidate Flow

```text
Contract Definition
        ↓
Decision Binding
        ↓
Propagation
        ↓
Consumer Binding
        ↓
Execution Point
        ↓
Runtime Observation
```

### 4.3 Why this matters for AI systems

AI Workflowでは、同じContractが複数層へ投影される。

例：

* Prompt
* DTO
* Gate
* Retry Prompt
* Repository Configuration
* Draft Workflow
* Published Workflow
* Launcher
* Runtime Request
* Evidence Generator

Definition Source（定義元）が正しくても、Consumerの一つが古ければ実際のRuntime Behavior（実行時挙動）は古いContractで動く可能性がある。

### 4.4 Difference from Configuration Synchronization

Configuration SynchronizationはContract Propagationを実現する手段の一部である。

Contract Propagationはより広く、

> HumanまたはCanonical Sourceで成立した意味が、実行地点まで失われず届いているか

というDevelopment Model上のConcernを指す。

---

## 5. Working Hypothesis 3 — Deterministic Control Boundary

### 5.1 Definition Candidate

Count（計数）、Compare（比較）、Hash（ハッシュ）、Threshold判定、ID Binding、Range Calculation（範囲計算）、Delta Calculation（差分計算）、State Synchronization（状態同期）等、Machineが正確に処理できるControl FactをLLMへ推定させない。

Working Name：

**Deterministic Control Boundary**

### 5.2 Candidate Responsibility Split

```text
Semantic Plane（意味面）
Human / LLM
- Purpose
- Meaning
- Writing
- Analysis
- Recommendation
- Meaning-preserving Rewrite

Deterministic Control Plane（決定論的制御面）
Code / Machine
- ID
- Hash
- Count
- Threshold
- Range
- Delta
- Binding
- Retry Count
- Authorization State
- Currentization
- Exact Input
```

### 5.3 Relation to existing Foundry principle

Local AI Foundryには既に、

> 意味は自由。構造は厳格。

という原則がある。

Deterministic Control Boundaryは、この原則をExecution Control（実行制御）へ広げるWorking Hypothesisと見ることができる。

ただし、すべてをCodeへ固定することを意味しない。

意味の質、文章表現、分析、代替案生成等は非決定性を活用する。

構造とControl Factだけを決定論側へ置く。

### 5.4 Retry case

今回採用したDeterministic Retry Correction Payloadでは、

```text
Count / Compare / Delta / Direction
→ Machine

Meaning-preserving Rewrite / Compression / Expansion
→ LLM
```

と分離した。

これはDeterministic Control Boundaryの具体例として扱える。

---

## 6. Working Hypothesis 4 — Human Decision Boundary

### 6.1 Existing direction strengthened by evidence

既存`DM-20260808-001`では、Human Responsibility Boundary（人間責任境界）とRisk-based Authorization（リスク比例承認）がCapability Gap（能力不足）として挙げられていた。

今回のRI #1 Evidenceにより、少なくとも一つの追加観測が得られた。

> Human Gateは多いほど安全になるわけではない。

### 6.2 Decision vs Continuation

Humanが保持するのはAuthority（権限）であり、すべてのStep（工程）の実行操作ではない。

Candidate Boundary：

```text
Purpose / Meaning / Risk / Adoption / Publish / Runtime Authorization
→ Human Decision Boundary

Approved Scope内の
Explore / Implement / Test / Correct / Verify / Currentize
→ Mechanical Continuation
```

### 6.3 Human-directed does not mean Human-operated

Human-Directed FoundryはHumanが全操作を打鍵する方式ではない。

Humanが、

* 何を目指すか
* 何を採用するか
* どのRiskを受けるか
* どこまでAIへ委譲するか
* いつ外部へ反映・実行するか

を決定し、その範囲内をAIが自律的に完遂できることを目指す。

Humanが毎StepのContinueを押す構造は、Human Responsibility BoundaryではなくHuman Bottleneck（人間ボトルネック）を作る可能性がある。

---

## 7. Dependent Currentization as an Operational Mechanism

`CM-20260815-002`では、Publish等でCurrent Identity（現在識別子）が変わった場合に、Launcher、Current Source、Derived View（派生表示）等のDependent Consumer（従属利用側）をCurrentizeする手順を整理した。

Development Model上では、Dependent Currentizationを独立したPrinciple（原則）というより、Contract PropagationとFixed Decision Bindingを成立させるOperational Mechanism（運用機構）の一つとして扱う方が現時点では自然である。

```text
Human-approved Meaning
        ↓
New Current Identity
        ↓
Dependent Currentization
        ↓
Binding Verification
        ↓
Execution
```

この位置付けはWorking Modelであり、将来別Capabilityとして独立する可能性を否定しない。

---

## 8. Candidate Umbrella — Contract Closure

今回のEvidenceを一つの上位概念で見ると、Contractには「定義する」以外の成立条件が存在する。

Candidateとして次のClosure（収束）を考えられる。

```text
Contract Definition
        ↓
Decision Binding
        ↓
Propagation
        ↓
Execution Binding
        ↓
Runtime Observation
        ↓
Evidence Freshness
```

Working Name：

**Contract Closure**

意味は、

> Contractが書かれているだけでなく、決定値が固定され、必要Consumerへ伝播し、Execution Pointで拘束され、実Runtimeで実効値が観測され、そのEvidenceがCurrent Candidateへ正しくBindingされている状態

である。

### 8.1 Why only a candidate

今回のRI #1だけでFoundry Coreとして採用するには早い。

RI #2 Documentation Production（文書制作）等、別Reference Implementation（参照実装）でも同種の問題が観測されるか確認する必要がある。

特に、

* Fixed Decision Binding
* Contract Propagation
* Deterministic Control Boundary
* Human Decision Boundary

がRI #2でも同じ形で有効かを見ることで、RI #1固有のRuntime Engineering Pattern（実行工学パターン）なのか、Foundry横断のControl Pattern（制御パターン）なのかを判定できる。

---

## 9. Relation to the Proposed Layer Model

既存`DM-20260808-001`の4 Layer（層）へ対応させると、今回のWorking ModelはLayer 1〜3を横断する。

### Layer 1 — AI Workflow Engineering

* Deterministic Control Boundary
* Retry Correction Payload
* Execution Contractの局所的Propagation

### Layer 2 — AI Project Control

* Fixed Decision Binding
* Contract Propagation
* Dependent Currentization
* Repository / Draft / Published / Launcher Binding
* Formal Current Source

### Layer 3 — Human-AI Development Operating Model

* Human Decision Boundary
* Mechanical Continuation
* Authorized Envelope（承認済み実行範囲）
* Human-directed ≠ Human-operated

今回のEvidenceは、Layer 1〜3が別々の問題ではなく、一つのExecution Chain（実行連鎖）として接続される必要があることを示している。

---

## 10. Impact on Current Capability Gap View

既存`DM-20260808-001`では、Local AI FoundryはControl Plane（制御面）が比較的強く、Evaluation（評価）、Observability（可観測性）、Recovery（復旧）等が不足すると整理していた。

今回のEvidenceにより、Control Plane自体にも追加のGapが見えた。

### New Gap Candidate A — Decision-to-Execution Binding

Human DecisionまたはCanonical ContractをExecution Pointへ一意に固定する能力。

### New Gap Candidate B — Contract Propagation Verification

Definition SourceからConsumer、Execution Pointまで同一Meaningが届いたことを検証する能力。

### New Gap Candidate C — Deterministic / Semantic Responsibility Split

Machineが扱うControl Factと、LLMが扱うSemantic Workを分離する能力。

### New Gap Candidate D — Authorization Boundary Precision

Human Decisionが必要なRisk Boundaryと、AIが自律継続すべきMechanical Workを過不足なく分離する能力。

これらは既存Control Planeの否定ではない。

Control Planeを「正本を管理する」「Gateを置く」段階から、

> DecisionからExecutionまで閉じる

段階へ成熟させる追加Capability候補である。

---

## 11. Evidence Classification

### Observed Fact

* Formal RV-01でHuman-defined Exact Inputとは別fixtureを選択できた。
* Correct Contract下のConclusion Retryが623文字から698文字へ増えた。
* Machineが知る623 / 420 / 203削減をRetryへ十分に渡していなかった。
* Repository Correction後もLive Draft / Publishedは旧状態だった。
* Publish後もCanonical Launcherは旧Published IDを参照していた。
* Pre-Runtime GateがRequest送信前にMismatchを検出してSTOPした。
* Human-approved Published ResultへのLauncher Currentizationは新しいMeaning Decisionを必要としなかった。

### Working Hypothesis

* Fixed Decision Binding
* Contract Propagation
* Deterministic Control Boundary
* Contract Closure
* Semantic Plane / Deterministic Control Planeという二面モデル

### Operational Knowledge already recorded

* Human Decision Boundary / Mechanical Continuation
* Authorized Envelope
* Dependent Currentization
* Binding Synchronization
* Pre-Execution Binding Gate

### Not Yet Proven

* これらがRI #2でも同じ形で成立する。
* Contract ClosureがFoundry Coreとして独立した正式Architectureになる。
* Semantic Plane / Deterministic Control PlaneがすべてのFoundry Use Caseへ適用できる。
* Fixed Decision Bindingという名称が正式用語として最適である。

---

## 12. What Must Not Be Concluded Yet

現時点では次を結論として扱わない。

* `Contract Closure`が正式なFoundry Coreである。
* `Fixed Decision Binding`が正式Architecture用語として採用された。
* Human Gateは少ないほど良い。
* Human Authorizationは不要である。
* すべてのControlをCode化すべきである。
* LLMはDeterministic Taskを一切実行してはいけない。
* RI #1で成立したPatternがRI #2 / RI #3でも必ず成立する。
* Fresh Formal RV-01のCurrent CandidateがPASSする。

特にFresh Formal RV-01は、このメモ作成時点でCurrent Candidate Runtimeが`NOT EXECUTED`であり、成功結果を先取りしない。

---

## 13. Promotion Conditions

このWorking ModelをFoundry横断の正式なArchitecture / Development Profile候補へ昇格するには、少なくとも次を確認する。

1. Fresh Formal RV-01以降で、Fixed Decision BindingとDeterministic Retry CorrectionがExecution Pointで有効に機能する。
2. RI #1の複数RuntimeでContract Propagationが再現可能に確認できる。
3. RI #2 Documentation Productionで、既決定値、Canonical Source、Deterministic Control、Human Decision Boundaryに同型Patternが観測される。
4. Human Gateを減らしたMechanical Continuationが、Safety / Quality / Traceabilityを損なわず運用できる。
5. Dependent Currentizationが異なるIdentity Changeでも有効に機能する。
6. Contract DefinitionとRuntime Effective Valueの差を自動検出できる。
7. EvidenceがCurrent Candidateへ正しくBindingされる。
8. 既存`DM-20260808-001`のRisk-based Authorization、Execution Provenance、Runtime Observabilityと矛盾なく統合できる。

---

## 14. Implication for Season 2 / Season 3

### Season 2

Season 2では、今回のPatternを抽象論から始めるより、実際に起きたIncident（事象）から説明する方が適している。

候補テーマ：

* Humanが決めた値をAIにもう一度考えさせるな
* 文字数はLLMに数えさせるな（笑）
* Human Decisionは多ければ安全になるわけではない
* Publishしても実行するまで分からない

Season 2では具体的なRI #1 Evidenceを中心に扱い、Foundry全体の理論として断定しない。

### Season 3

Season 3では、RI #1 / RI #2を横断してEvidenceが揃った場合、

* Human Responsibility Boundary
* Authorized Envelope
* Human-directed ≠ Human-operated
* Deterministic Control Boundary
* Contract Propagation
* Fixed Decision Binding

をHuman-AI Development Operating Modelとして一般化する候補になる。

Season 2が「何が壊れ、どう運用を直したか」であるなら、Season 3は「HumanとAIの責任をどう設計すると、その運用が成立するか」を扱う。

---

## 15. Current Working Conclusion

今回のRI #1 Evidenceから、Local AI FoundryのControl Planeには次の追加課題が見えた。

Contractを定義するだけでは足りない。

Humanが決めた値をExecution Pointへ固定し、必要なConsumerへ伝播し、Machineが扱えるControl FactをLLMへ再委譲せず、Human Decisionが不要な範囲ではAIが自律継続し、実Runtimeで有効値を観測する必要がある。

現時点のWorking Modelを最も短く表すと、次になる。

```text
Human
→ Purpose / Meaning / Risk / Authority

Machine
→ Binding / Count / Compare / Synchronize / Verify

LLM
→ Semantic Generation / Analysis / Rewrite

Runtime Evidence
→ 実際に何が使われ、何が起きたかを証明
```

これは既存原則、

> 意味は自由。構造は厳格。

を、Human-Directed FoundryのExecution Model（実行モデル）へ拡張する候補と見ることができる。

ただし、Foundry Coreへの昇格はRI #2を含む横断Evidenceを待つ。
