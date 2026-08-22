# S3-02 Reference Implementationは完成品ではない

### 📌 本記事

- **Season3 第2話：Reference Implementationは完成品ではない**

### 関連記事はコチラ👇

- S3-01：記事を作らないなら、何を作るの？

- S2-12：止めることも、運用である

---

## 【目次】

1. 完成させることが目的だと思っていた

2. RI#1は、未完了のまま価値を残した

3. 完成度がバラバラでも、比較はできる

4. RIが答えるのは「製品として完成したか」ではない

5. 個別実装をCoreへコピペしない

6. 4つのConfirmed Coreは、完成品から生まれたわけではない

7. Candidateを勝手にCoreへ昇格させない

8. Reference Implementationは、Evidenceを作る仕事場である

---

前回、記事制作を止めたあとで「じゃあLocal AI Foundryは何を作るProjectなんだ？」という話を書いた。そこで出した今の答えは、記事でも、画像でも、ドキュメントでもない。**人間がPurposeとResponsibilityを持ったままAIへ仕事を委譲し、その仕事が成立したと言える状態までControlするためのFoundryを作っている。**というものだった。そのために使っているのがReference Implementation、略してRIだ。RI#1はArticle Production、RI#2はDocumentation Production、RI#3はVisual Asset Production、RI#4はResearch-Grounded Long-form Content Production。名前だけ並べると、「四つの製品を順番に作っているProject」にも見える。

でも、今のワシらの使い方は違う。**Reference Implementationは完成品ではない。**ここを取り違えると、Local AI Foundryが何をやっているのかが、かなり分かりにくくなる。

## 1. 完成させることが目的だと思っていた

最初のRI#1を作っていた頃、ワシの頭の中はもっと単純だった。記事生成Workflowをちゃんと完成させる。企画して、調べて、書いて、レビューして、画像も作って、保存まで持っていく。壊れたら直し、足りないContractを足し、Retryを作り、Runtimeで確認する。

そうやって一つの仕組みを完成へ近づけていけば、Projectも前へ進むと思っていた。これは別に間違いではない。特定の業務を実際に動かせるところまで作らなければ、机上のArchitectureだけが増えていく。だからReference Implementationには、ちゃんとImplementationが必要だし、RuntimeもEvidenceも必要になる。

ただ、途中から一つの問題が出てきた。**RI#1を完成させることと、Local AI Foundryそのものを育てることが、同じではなくなった。**記事制作にしか必要ない機能をどこまで増やすのか。記事固有のWorkflowを磨くことが、Foundry全体の次の問いに本当に必要なのか。

逆に、記事制作で見つけたContractやGateの考え方は、別の仕事へ持っていっても残るのか。そこを区別しないと、Foundryを作っているつもりが、いつの間にか巨大な記事生成製品を作るProjectへ戻ってしまう。そこでRIの見方が変わった。**完成させるためだけに作るのではなく、別の仕事でも使えるControlを見つけるために作る。**この視点が入ったことで、RI#1を最後まで完遂しないという判断も成立するようになった。

## 2. RI#1は、未完了のまま価値を残した

RI#1 Article Productionは、Fresh Formal RV-01を実行しないまま**FROZEN / HISTORICAL BENCHMARK**になった。Historical Correct-Contract Formal RV-01にはFAILED Evidenceがあり、その後Correctionを進めてFresh RV直前まで持っていったが、Fresh Formal RV-01そのものは`NOT EXECUTED`のまま残っている。Runtime Acceptanceも完了済みへ書き換えていない。製品完成を唯一の物差しにするなら、これは扱いに困る状態だ。

「完成していない」「最後のRuntime Acceptanceまで行っていない」と言われれば、その通りだからだ。ところが、Foundry Core ExtractionのEvidence Sourceとして見ると話が変わる。RI#1には、Contractを定義しただけではExecution Pointまで意味が届かないこと、Humanが決めた値を下流で再選択できるとBindingが壊れること、Repositoryが正しくてもPublished StateやRuntimeが同じとは限らないこと、Machineが知っているCountやThresholdをLLMへ再推定させるとControlが崩れることなど、大量のEvidenceが残った。

Fresh RVを最後まで通していなくても、その途中で見つかった問題まで消えるわけではない。むしろ、**どこで壊れ、何を直し、何がまだ未確認なのかを正直に残しているから、次のRIと比較できる。**だからFreezeはFailureの言い換えではないし、未完了を成功扱いすることでもない。

```text
FROZEN
≠
FAILED
≠
DELETED
≠
RUNTIME ACCEPTED
```

RI#1は完成品として終わったのではなく、Historical Benchmarkとして役割を変えた。ここでワシの中でも、「RIの価値＝完成率」ではないことがかなりはっきりした。

## 3. 完成度がバラバラでも、比較はできる

今ある四つのRIは、そもそも同じ状態にいない。RI#1は**FROZEN / HISTORICAL BENCHMARK**。RI#2 Documentation Productionは**IMPLEMENTATION VERIFIED / CORE CONTRIBUTOR**だが、Live Acceptanceは`PENDING`。RI#3 Visual Asset Productionは**RUNTIME VALIDATED / CORE CONTRIBUTOR**まで来ている一方で、Production Acceptanceは`NOT REACHED`。

RI#4 Research-Grounded Long-form Content Productionは、今も**ACTIVE VALIDATION / CURRENT FRONTIER**にいる。もしRIが製品ラインナップなら、ずいぶん変な状態だ（笑）。一つは凍結、一つはImplementation Verified、一つはRuntime ValidatedだがProduction Acceptance未到達、もう一つは現在もValidation中。全部同じ「完成」へ揃っていない。

でもCross-RI Evidenceを取るには、それでいい。なぜなら比較したいのは、四つのRIの完成率ではないからだ。

```text
Article Production
Documentation Production
Visual Asset Production
Research-Grounded Long-form
```

これだけ違う仕事へAIを任せた時に、

```text
何を先に決めないと仕事が成立しないのか
どこをMachineで止めなければならないのか
何をEvidenceとして残さなければならないのか
どこからHumanが判断しなければならないのか
```

が、どう繰り返し現れるのかを見る。ある問いについて必要なEvidenceが取れたなら、そのRIはすでに比較材料として働いている。すべてのAcceptanceを終えてからでなければ一切学べない、というものではない。ここはかなり重要だった。

**RIは全部同じFinish Lineへ向かう競走ではない。**それぞれ違う仕事を使って、Foundryの成立条件を照らすためのEvidence Sourceでもある。

## 4. RIが答えるのは「製品として完成したか」ではない

では、RIでは何を確認しているのか。ワシは今、「その仕事をAIへ委譲した時、何があれば成立し、何が無いと壊れるのか」という問いへの実証だと考えている。例えばDocumentation Productionなら、Sourceを勝手に変えず、変更範囲を守り、Machine-checkableな条件を通過し、Review結果をEvidenceへ残す必要がある。Visual Asset Productionなら、画像が生成されたことだけでは足りず、顔が画面内にあるか、胴体が不自然に切れていないかといったTechnical Gateが必要になり、それを通ってもHumanが「使える」と判断するとは限らない。

Research-Grounded Long-formなら、検索結果を取れたことと、Currentで正しいEntityを根拠として文章へBindingできたことは別になる。Article Productionでは、Humanが決めたTest InputやPublished IdentityがExecution Pointまで正しく届いているかが問題になった。成果物はまるで違う。なのに、仕事を成立させようとすると、何度も似た種類のControlが現れる。

だからRIで一番見たいのは、完成画面の美しさではない。**その業務固有の実装を剥がしたあとにも、何が残るのか。**そこにFoundry Core Candidateが見えてくる。

## 5. 個別実装をCoreへコピペしない

ここでもう一つ大事なのが、RIで動いたものをそのままFoundry Coreへ持っていかないことだ。例えばRI#2では、Local Runtime、Model Context、Allocation Probe、Effective Contextといった具体的な実装がある。これをそのまま「Foundry Core」と呼んでしまったら、Coreが特定Modelや特定Runtimeの実装詳細で埋まってしまう。RI#3でも同じだ。

FoundryConsoleはHuman-facing Control Surfaceとして重要なCurrent Implementationだが、FoundryConsoleそのものをRI#3と同一視しないし、ましてFoundry Coreそのものとも呼ばない。ComfyUIを使っているからComfyUIがCoreになるわけでもない。必要なのは、実装を一段抽象化して見ることだ。

```text
RI固有Implementation
≠
再利用可能なControl Rule
≠
Confirmed Foundry Core
```

RI#2のContext Capability Calibrationから重要だったのは、個別のContext値そのものではない。

```text
Current Runtimeを観測・測定する
↓
Evidence-backed Effective Capabilityを決定する
↓
Downstream ProcessingへBindingする
```

というControl Structureだった。仕事、Model、Runtimeが変わっても残せる形まで削って初めて、Foundry Coreとして検討する意味が出てくる。Reference Implementationは、Coreの完成品を作る場所ではない。**Coreへ持っていけるものと、RIに置いていくものを見分ける場所でもある。**

## 6. 4つのConfirmed Coreは、完成品から生まれたわけではない

前回の第1話を書いた時点では、Confirmed Foundry Coreとして扱っていたのは**FC-CORE-001 Runtime Capability Calibration**だけだった。その後Cross-RI EvidenceのAssessmentを進め、Human Decisionを経てPhase 3Cが`TERMINAL / PASS`となり、現在は四つのCoreがConfirmedになっている。

```text
FC-CORE-001
Runtime Capability Calibration

FC-CORE-002
Delegation Contract Binding

FC-CORE-003
Deterministic Technical Gate

FC-CORE-004
Evidence Traceability
```

ここが面白い。四つのRIが全部「完成しました！」となったから、この四つが生まれたわけではない。RI#1はFreezeされている。

RI#2はLive AcceptanceがまだPending。RI#3はProduction Acceptanceへ到達していない。RI#4はActive Validation中だ。それでも、異なる仕事で得たEvidenceを横断し、RI固有のMechanismと再利用可能なControl Ruleを分けていくと、「これは仕事を変えても残る」と判断できるものが出てきた。

Delegationする仕事には、実行前に必要成果や制約、責任・権限境界、Handoff条件、失敗条件をBindingしておく必要がある。Machineで判定できるTechnical Boundaryでは、Actual ArtifactやRuntime StateをMachine-checkableな条件で評価し、FAILをTechnical Successとして後段へ流してはいけない。Execution、Artifact、Gate、Review、Human Decisionを後から再構成できるように、Evidence identityとBindingを残さなければならない。こうしたRuleは、記事だけ、文書だけ、画像だけの都合では説明しにくくなった。

だからCoreへ上がった。**完成品からCoreを切り出したのではない。複数の未完成を含む実証から、仕事を越えて残ったControlを切り出した。**今のLocal AI Foundryらしさが一番出ているのは、たぶんここだと思う。

## 7. Candidateを勝手にCoreへ昇格させない

ただし、「何度か出てきたからCoreでいいよね」という話にもしていない。今も**Review Binding Integrity**は`CANDIDATE — STRONG`のまま残っている。複数のEvidenceからかなり強いSignalが出ているが、RI#4のReview Bindingに関するsub-artifact locatorなど、まだ埋めるべきEvidence gapが残っている。だからConfirmedへは上げない。

ここで急いで名前を付けてしまうと、Season 3が「ワシらが考えた最強のArchitecture発表会」になる（笑）。それはやりたくない。

```text
複数RIで見えた
↓
Candidateになる

Candidateとして強い
↓
Evidenceを詰める

Evidenceが十分
+
Human Decision
↓
Confirmed Core
```

この順番を守る。逆に言えば、RIを完成品として扱わないことは、Coreを雑に決めていいという意味ではない。RI側は途中でもEvidence Sourceになれるが、Coreへ昇格する時には、**何を根拠に一般化したのか**を説明できなければならない。Reference Implementationを実証環境として使うからこそ、CandidateとConfirmedを分ける必要がある。

## 8. Reference Implementationは、Evidenceを作る仕事場である

最初はRIを「実際に動く見本」くらいに考えていた。もちろん今も、机上の設計ではなく実際の業務を動かすImplementationであることは変わらない。ただ、Local AI Foundryでの役割は、それだけではなくなった。RIは、ある仕事をAIへ委譲してみる場所だ。

そこで壊れる。Gateを入れる。Humanが却下する。Runtimeで想定と違うことが起きる。

SourceやBindingが古くなる。Evidenceが足りなくなる。そういう現実の摩擦を通して、「この仕事を成立させるために本当に必要だったもの」を残す。そして次のRIへ仕事を変える。

前の仕事で必要だったControlが消えるなら、それはDomain固有だった可能性がある。別の仕事でもまた必要になるなら、Candidateとして残る。さらに異なるRIでも繰り返し現れ、Evidenceが揃い、Humanが採用を判断したら、Foundry Coreへ昇格する。

```text
Domain Task
↓
Reference Implementation
↓
Failure / Runtime / Human Review / Evidence
↓
Reusable Control Signal
↓
Cross-RI Comparison
↓
Core Candidate
↓
Evidence + Human Decision
↓
Confirmed Foundry Core
```

だから今のワシにとって、Reference Implementationは完成品ではない。**Evidenceを作る仕事場だ。**完成していないRIにも価値がある。FreezeしたRIにも価値がある。

Acceptanceへ届かなかったRunにも、何が届かなかったのかというEvidenceが残る。大事なのは、それを成功へ書き換えず、失敗として捨てず、次の仕事と比較できる形で残すことだ。RI#1からRI#4まで、成果物は全部違う。では実際に、仕事を変えたのに「同じところで壊れた」と言えるのはどこなのか。

次はそこを、もっと具体的に見ていく。**Season 3 第3話「別の仕事でも、同じところで壊れた」へ続く。**
