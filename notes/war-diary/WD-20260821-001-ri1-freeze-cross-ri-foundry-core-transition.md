# WD-20260821-001 RI #1を止め、Cross-RI Evidenceへ進んだ

## 日付

2026-08-21

## 出来事

2026-08-14のRI #1 Article Production（記事制作）Formal Runtime Verification（正式実行検証）は、Fresh Formal RV-01直前のClean Stopまで到達していた。

Repository、Draft、Published、Canonical Launcher、Formal Current Source、IVMはCurrentへそろい、Fresh RV-01 Authorizationも`GRANTED / NOT CONSUMED`のまま保持されていた。

残っていた明確なNext ActionはFresh Formal RV-01 Final Pre-Runtime Gateだった。

その時点だけを見れば、次にFresh Formal RV-01を実行し、Current Candidate Runtime Evidenceを得る流れが自然だった。

しかし、その後Local AI FoundryではRI #2 Documentation Production、RI #3 Visual Asset Production、RI #4 Research-Grounded Long-form Content ProductionのEvidenceが増えた。

Projectが扱う問いも、RI #1単体を最後まで完遂することから、異なるReference Implementationで繰り返し現れるControl Structure（制御構造）を比較し、再利用可能なFoundry Coreを抽出することへ移った。

そこでHuman Decision（人間判断）として、Fresh Formal RV-01を実行せず、RI #1 Article Productionを

`FROZEN / HISTORICAL BENCHMARK`

として保持することを決めた。

これはRI #1をFailed（失敗）へ変更した判断ではない。

削除でも、Runtime Acceptanceを完了済みへ書き換える判断でもない。

Fresh Formal RV-01は`NOT EXECUTED`のまま残し、RI #1が持つHistorical Evidence（履歴証拠）をその状態のまま保存する。

## Fresh RVを実行しなかった

今回重要なのは、Fresh Formal RV-01を実行していないという事実である。

2026-08-14のClean Stopでは、Current Candidate Runtimeは`NOT EXECUTED`だった。

この後、Fresh RVを実行したという新しいEvidenceは作っていない。

したがって、RI #1のHistorical Recordへ次のような結果を追加してはならない。

```text
Fresh Formal RV-01
PASS
```

または、

```text
Runtime Acceptance
COMPLETE
```

実行していないものは実行していない。

この未完了状態自体をHistorical Evidenceとして保持する。

## FreezeはFailureの言い換えではない

RI #1にはHistorical Correct-Contract Formal RV-01の`FAILED` Evidenceが存在する。

一方、その後のRetry Correction、Live Apply / Publish、Canonical Launcher Currentizationまで進み、Fresh Formal RV-01を実行できるClean Stopも成立していた。

そこで止めた。

このため、今回のFreezeを過去の`FAILED` Runと同一視しない。

```text
Historical FAILED Run
≠
RI #1のCurrent Role
```

同時に、

```text
FROZEN
≠
Runtime Accepted
```

でもある。

今回採用した意味は次である。

```text
FROZEN / HISTORICAL BENCHMARK

=
新しいMainline Runtime検証は進めない
+
過去の成立・失敗・未実行Evidenceを保持する
+
Cross-RI比較で参照可能なBenchmarkとして残す
```

成功へ書き換えない。

失敗作として捨てない。

現在の目的に対して追加実行を続けない。

この三つを同時に成立させるためのRole Classification（役割分類）としてFreezeを使った。

## GateとPurposeを分離した

Fresh Formal RV-01は、2026-08-14時点では正しいRemaining Gateだった。

しかし、Remaining Gateが存在することと、そのGateを永遠に実行し続ける義務があることは同じではない。

GateはProject Purpose（目的）へ答えるための手段である。

```text
Gate
≠
Purpose
```

Purposeが変わらない間は、Remaining Gateを通過する意味がある。

一方、ProjectのCurrent Purposeが変わった場合は、そのGateがまだ何を判断するために必要なのかを再評価しなければならない。

今回、ProjectのCurrent VectorはRI #1単体の完遂ではなく、

```text
Cross-RI Evidence
        ↓
Foundry Core Extraction
```

へ移った。

その状態でFresh RV-01を実行することは技術的には可能だったが、Project全体の次の判断に必要なEvidenceとしての優先度は下がった。

Humanは、単に「次のGateだから」という理由だけでRuntimeを実行しないことを選んだ。

## RI #2〜RI #4が比較対象になった

2026-08-10の再位置付け時点では、Article ProductionをRI #1、Documentation ProductionをRI #2として扱い、RI #3はFuture / Undefinedだった。

その記録は当時のHistorical Factとして正しいため、書き換えない。

その後、Reference Implementationは次の四つまで具体化した。

```text
RI #1
Article Production

RI #2
Documentation Production

RI #3
Visual Asset Production

RI #4
Research-Grounded Long-form Content Production
```

ここで重要なのは、RIの数を増やすことではない。

異なる仕事へAIを委譲した時に、同じControl Structureが再び必要になるかを比較できるEvidenceが増えたことである。

RI固有の実装を完成させることと、Foundry全体で再利用できるControlを見つけることは別の目的である。

RI #1はその比較の最初のHistorical Benchmarkとして残る。

## 最初のConfirmed Foundry Coreが生まれた

Cross-RI比較の中で、

`FC-CORE-001 Runtime Capability Calibration`

は最初のConfirmed Foundry Core Capabilityとなった。

その中心ルールは、AI Model / Runtime / Hardwareの能力を固定値や推測だけで決めず、

```text
Current Runtimeを観測・測定
        ↓
Evidence-backed Effective Capabilityを決定
        ↓
Downstream ProcessingへBinding
```

することである。

これはRI #2のContext Capability Calibrationで具体化され、単一Workflowの便利機能としてではなく、Runtime CapabilityをEvidenceで決めて下流へ渡すControlとしてFoundry Coreへ昇格した。

一方、Human Authority Boundary、Deterministic Gate、Review Integrity、Evidence / Observability、Human-facing Control Surface等、他にも複数RIで共通して見える構造は存在する。

ただし、それらを今回のWar DiaryでConfirmed Coreへ昇格させない。

ConfirmedとCandidateを混同しない。

## 「止める」こともHuman Authorityである

Local AI Foundryでは、HumanがPurpose、Judgment、Responsibility、Authorization、Acceptanceを保持する。

これは、何を開始するかをHumanが決めるという意味だけではない。

何を続けないかもHumanが決める。

Runtime Authorizationが存在していたとしても、そのAuthorizationを必ず消費しなければならないわけではない。

新しいEvidenceが増え、Project Purposeが変わり、別の検証へ進む方が現在の目的に合うなら、残っているGateを実行しない判断もAuthorityの一部である。

ただし、「止める」という判断を正当化するために過去の状態を書き換えてはいけない。

今回のRI #1では、

```text
Fresh Formal RV-01
NOT EXECUTED

Runtime Acceptance
NOT COMPLETED

RI #1 Role
FROZEN / HISTORICAL BENCHMARK
```

を同時に保持する。

これにより、Projectは次へ進みながら、RI #1の未完了状態も事実として残せる。

## 今回の学び

運用とは、予定したGateを最後まで消化することだけではない。

Gateが何のために存在するのかをCurrent Purposeへ照らし直し、続ける意味が薄れた場合に正しく止めることも運用である。

重要なのは、止めた後に履歴を成功へ書き換えないことである。

```text
Freeze
≠
Failed
≠
Deleted
≠
Accepted
```

Historical Evidenceを保ったままCurrent Roleだけを変えることで、過去の事実と現在の目的を両立できる。

また、Reference Implementationは完成品の数を増やすための単位ではない。

異なる仕事でControl Structureを検証するEvidence Sourceとして扱う。

RI #1から得たものをRI #1だけの知識として閉じず、RI #2〜RI #4と比較し、共通して再現するものだけをFoundry Core Candidateとして育てる。

## この時点で確定した事実

1. Fresh Formal RV-01は実行していない。
2. RI #1のRuntime Acceptanceを完了済みへ変更していない。
3. RI #1 Article Productionは`FROZEN / HISTORICAL BENCHMARK`として保持する。
4. Historical Correct-Contract Formal RV-01の`FAILED` Evidenceを削除・上書きしない。
5. RI #1のFresh RV直前Clean Stop EvidenceもHistorical Recordとして保持する。
6. RI #2〜RI #4がCross-RI比較のCurrent Evidence Sourceとなった。
7. ProjectのCurrent Vectorは`Cross-RI Evidence → Foundry Core Extraction`へ移った。
8. `FC-CORE-001 Runtime Capability Calibration`は最初のConfirmed Foundry Core Capabilityである。
9. RIの数を増やすこと自体をProject Goalにしない。
10. Remaining Gateを実行しない判断も、Historical Stateを改変しない限りHuman Authorityの一部として扱える。

## まだ結論にしないこと

今回の出来事だけから、次を確定事項にはしない。

- すべてのIncomplete RIをFreezeすべきという一般則。
- 一定期間が経過したらRemaining Gateを自動的に廃棄するルール。
- Cross-RIで一度共通して見えたControl Patternを自動的にFoundry Coreへ昇格するルール。
- `FC-CORE-001`以外のCore CandidateのConfirmed化。
- FoundryConsoleをRI #3そのものとする定義。
- Temporal Entity IntegrityをRI #4そのものとする定義。
- Dify、n8n、Ollama、ComfyUI、Search等をFoundry CoreまたはAdapterとして最終確定するArchitecture。

これらは追加EvidenceとHuman Decisionを必要とする。

## 関連

- [WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した](WD-20260814-001-formal-rv-exposed-contract-propagation-gaps.md)
- [WD-20260810-001 Article ProductionからHuman-Directed Foundryへ再位置付けした](WD-20260810-001-human-directed-foundry-repositioning.md)
- [NOTE記事インキュベータ](../30-article-incubator.md)
- [Public Project Status](../../docs/public/status-public.md)
