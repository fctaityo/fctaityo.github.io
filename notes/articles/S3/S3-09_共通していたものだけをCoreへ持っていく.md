# S3-09 共通していたものだけをCoreへ持っていく

### 📌 本記事

- **Season3 第9話：共通していたものだけをCoreへ持っていく**

### 関連記事はコチラ👇

- S3-01：記事を作らないなら、何を作るの？
- S3-02：Reference Implementationは完成品ではない
- S3-03：別の仕事でも、同じところで壊れた
- S3-04：AIに任せる前に、実行環境を測れ
- S3-05：Gateを通った。でも、人間はOKを出さなかった
- S3-06：画面を作ったら、AIの裏側を見なくて済んだ
- S3-07：検索できても、正しい記事になるとは限らない
- S3-08：Difyもn8nもComfyUIも、Foundryそのものではない

---

## 【目次】

1. 「また出てきた」は、まだCoreではない
2. RIはCoreの部品箱ではなく、Evidence Generatorだった
3. Copyするのではなく、Controlだけを抽出する
4. 最初にCoreへ上がったのはRuntime Capability Calibrationだった
5. Contract、Gate、EvidenceもRIをまたいで残った
6. 強いCandidateでも、Evidenceが足りなければ止める
7. Evidenceが揃っても、自動ではCoreにならない
8. Coreへ持っていくとは、捨てるものを決めることでもある
9. 自分のWorkflowで同じことをやるなら

---

前回は、Difyもn8nもOllamaもComfyUIも、Local AI Foundryそのものではないと書いた。どれも実装には必要だった。でも仕事を変えると、主役のToolも変わる。それでもContract、Gate、Evidence、Human Authorityのような「また出てくるもの」があった。だったら話は簡単で、複数のReference Implementationに共通していたものを全部Foundry Coreへ入れればいい――とはならなかった。

むしろSeason 3で一番慎重になったのは、ここだったと思う。**共通して見えたことと、CoreとしてConfirmedできることは別である。** 一つのRIでうまくいった。別のRIでも似たものが出た。便利そうだ。将来も使えそうだ。そこまで揃っても、まだCandidateで止めることがある。今回は、「何をCoreへ入れたか」よりも、**何を根拠にCoreへ上げ、何をまだ上げなかったのか**の話をする。

## 1. 「また出てきた」は、まだCoreではない

RIを増やしていくと、同じような問題が何度も顔を出す。RI#1 Article Productionでは、Contractがあっても実行地点まで正しくBindingされなければ意味がなかった。RI#2 Documentation Productionでは、ModelやRuntimeの能力を設定値だけで決めると、実際に使える能力とズレる。RI#3 Visual Asset Productionでは、Technical Gateを通ってもHumanがAcceptしない。RI#4 Research-Grounded Long-form Content Productionでは、Searchが動いてもEvidenceと記事の意味が正しいとは限らない。

ここまで似た問いが並ぶと、「はい、共通Pattern発見。Core採用！」と言いたくなる。ワシも最初は、もっと簡単に共通化できると思っていた。

でも、このやり方だと危ない。あるRIで何度も必要だったものが、単にそのDomain固有の事情だった可能性がある。二つのRIで似て見えても、実際には別のFailure Modeを同じ言葉で呼んでいるだけかもしれない。逆に、見た目は違うのに、Controlとしては同じ問題を扱っている場合もある。

だから、単純な多数決にはしなかった。

```text
複数RIで見えた
↓
便利そう
↓
Core
```

ではない。

まず「何が起きたか」というEvidenceがあり、そこからRI固有実装を剥がし、再利用可能なControl Ruleとして説明できるかを見る。そのうえで、別のRIでも本当に同じControl Concernが必要だったのかを比較する。最後にHumanが、「これはFoundryの責務として残す」と判断する。

Season 3でやり始めたのは、機能の共通化ではなく、**Evidenceを使ったCore Extraction**だった。

## 2. RIはCoreの部品箱ではなく、Evidence Generatorだった

S3-02で、Reference Implementationは完成品ではないと書いた。S3-09まで来ると、その意味がもう一段はっきりする。RIは、完成した機能をCoreへ移植するための部品箱でもなかった。

RI#1にはArticle ProductionのWorkflowがある。RI#2にはDocumentation Production固有の処理がある。RI#3には画像生成とFoundryConsoleがある。RI#4にはSearch、Source、Evidence、Draft、ReviewのChainがある。RI#5はProducer側とは違い、CampaignやEvidence、Human Interventionを見るControl Planeである。

これらを全部混ぜてCoreへ入れたら、Foundry Coreは巨大な何でも入り箱になる。記事生成の都合、画像生成の都合、Researchの都合、Control Planeの都合が同じ層へ入ってしまい、何が本当に共通なのか分からなくなる。そこでRIの見方を変えた。

```text
Domain Task
↓
Reference Implementation
↓
Runtime / Failure / Human Review / Evidence
↓
Reusable Control Signal
↓
Cross-RI Comparison
```

RIが作る一番大事なものは、成果物だけではない。**「この仕事をAIへ任せたら、どこで何が壊れたか」というEvidenceも作る。** RI#1がFreezeされてHistorical Benchmarkになった後も価値が残ったのは、このためだった。Freshな実行を続けなくても、そこで発生したContract、Binding、Gate、Publication、Evidenceの問題は、別RIと比較できる。

未完了のRIからでも、Evidenceは取れる。ただし、未完了の実装を「完成した成功例」に書き換えてはいけない。成功した部分、失敗した部分、Pendingな部分をそのまま残したうえで比較する。

これが結構大事だった。Coreを綺麗に見せるために過去を成功物語へ加工すると、Coreの根拠そのものが壊れる。

## 3. Copyするのではなく、Controlだけを抽出する

Core Extractionでもう一つ意識したのが、「動いたものをそのまま共通化しない」ことだった。たとえばRI#2でRuntime Capabilityを測る仕組みが動いたとしても、そのProbeの実装、特定Model名、Context Size、Hardware構成をFoundry Coreへ持っていくわけではない。それらはRI#2とCurrent Runtimeに依存するImplementationである。

残したいのは、もっと上のルールだった。具体値や特定実装を外したあとにも、別のRIで問える責務として残るかを見る。そのために、ImplementationではなくControlの形へ言い換える。

```text
Current Runtimeを観測・測定する
↓
実際に使えるCapabilityをEvidence付きで確定する
↓
その結果をDownstreamへBindingする
```

これなら、ModelやRuntimeが変わっても「何を確認しなければならないか」というControlの意味は残せる。実装方法は変わっても、責務は説明できる。しかも、次のRIで同じ問いが必要かどうかを比較できる。

同じことはContractやGateにも言える。RI#1の特定DTO SchemaをCoreにするのではない。RI#3の画像向け判定条件をCoreにするのでもない。RI#4のSearch QueryやSource数をCoreにするのでもない。

具体実装を剥がしてもなお残るものがあるかを見る。名前や実装を変えても同じ責務として説明できるなら、そこで初めてReusable Control Ruleの候補になる。ただし、この段階でもまだConfirmed Coreではない。

```text
RI-specific Implementation
≠
Reusable Control Rule
≠
Confirmed Foundry Core
```

この三つを分けないと、「よく使っている仕組み」と「Foundryが保持すべきControl」が混ざる。S3-08でToolとFoundryを分けたのと同じで、S3-09では**RIの実装とCoreを分ける**作業をしている。似ているから共通化するのではなく、Evidenceを見ながら境界を削っていく。

## 4. 最初にCoreへ上がったのはRuntime Capability Calibrationだった

この考え方を一番説明しやすいのが、FC-CORE-001 Runtime Capability Calibrationである。

CurrentではFC-CORE-001〜004まで4件がConfirmed Coreになっている。ただ、最初から4件が一気に「Coreです」と決まっていたわけではない。途中のDevelopment Modelでは、Confirmedとして扱っていたのはFC-CORE-001だけだった。

この履歴が、今回の話をものすごく分かりやすくしてくれる。RI#2では、Model、Runtime、Hardwareの能力を静的な設定値や想像だけで決めず、Current Runtimeを観測して、実際に使えるEffective Capabilityを決め、それを後続処理へ渡す必要が出た。

重要なのは、「RI#2でContextを測ったから、その仕組みをそのままCoreへコピーした」ではないことだ。抽出されたのは、**観測・実測 → Evidence-backed Effective Capability確定 → Downstream Binding**というControl Ruleだった。

ここまで抽象化すると、Article ProductionやDocumentation Productionだけの話ではなくなる。AIへ何かを任せる前に、現在のModel / Runtime / Hardwareがその仕事を本当に出来る状態なのかを測る。出来ると確認したCapabilityだけを後続へ渡す。

だからS3-04では「AIに任せる前に、実行環境を測れ」と書いた。Coreになった後から見ると、最初から当然の原則だったように見える。でも実際には逆で、**Runtimeで困ったEvidenceが先にあり、あとからControl Ruleとして名前がついた。**

## 5. Contract、Gate、EvidenceもRIをまたいで残った

その後Currentでは、FC-CORE-002 Delegation Contract Binding、FC-CORE-003 Deterministic Technical Gate、FC-CORE-004 Evidence TraceabilityもConfirmed Coreになった。ここで「001と同じように、002はこのRI、003はこのRI、004はこのRIから生まれた」と単純化しない方が正確だと思う。これらは、複数のRIと運用Evidenceをまたいで繰り返し必要性が見えたControlだからである。

FC-CORE-002が扱うのは、AIへ何かを任せる前の境界だ。必要成果、制約、責任・権限境界、Handoff、失敗条件を、識別可能なContractへBindingする。RI#1でも、Contractが書いてあるだけではExecution Pointを拘束できない問題が実際に出た。人間が決めたFormal Inputがあっても、実行地点に別Inputを選べる余地が残っていれば、Contractは成立したことにならない。

FC-CORE-003は、Machineが判定できるTechnical Boundaryを扱う。Actual ArtifactやRuntime StateをMachine-checkableな条件で評価し、FAILした状態をTechnical Successとして後段へ流さない。これはRI#1のContract Gateにも、RI#3のVisual Asset Technical Gateにも通じる。ただし、S3-05でやったように、Technical Gate PASSはHuman Acceptanceの代わりにはならない。だからFC-CORE-003の中へHuman Acceptanceまで詰め込まない。

FC-CORE-004は、何が起きたかを後から再構成するためのControlだ。Execution、Artifact、Gate、Review、Human DecisionのEvidence identityとBindingを保存し、Current、Historical、Candidateを混ぜない。RI#1のRuntime検証でも、RI#4のResearch Chainでも、RI#5のCampaign / Evidenceでも、「結果だけ」では原因や判断経路を追えない問題が出てきた。

面白いのは、三つとも実装の見た目がかなり違うことだ。

Contractは文章やSchemaに見える。GateはValidatorや判定処理に見える。EvidenceはLogやDBやArtifactに見える。それでもCoreとして見ているのは、それらの製品形態ではない。

**何を委譲したのかを固定する。壊れたものを成功として流さない。何が起きたか追えるようにする。** そのControl Responsibilityが、仕事を変えても残った。

## 6. 強いCandidateでも、Evidenceが足りなければ止める

ここで、Confirmed Coreだけを見ると危ない。「なるほど。複数RIで重要そうなら、最終的には全部Coreへ上がるんだな」と見えてしまうからだ。Currentには、あえて上げていないものがある。**Review Binding Integrity。Statusは `CANDIDATE — STRONG`。**

弱いアイデアだからCandidateなのではない。むしろStrongである。Review結果と対象Artifact / EvidenceのBindingが正しいことは、RI#4のようなResearch Workflowではかなり重要だ。レビューが何を見て出した判定なのか追えなければ、品質保証にならない。

それでも、CurrentではConfirmed Coreにしていない。理由は単純で、残るEvidence locator gapを解消する前に先取り昇格しないからだ。この判断は、S3-09で一番好きなところかもしれない（笑）。

だって、Projectを格好よく見せたいだけなら、「Coreが5個になりました！」と書いた方が映える。CandidateがStrongなら、なおさら上げたくなる。でもEvidenceが閉じていないなら止める。

```text
かなり重要そう
+
複数箇所で効きそう
+
名前も付いた
+
Strong Candidate
≠
Confirmed Core
```

ここで初めて、Confirmedという言葉に意味が出る。なんでもCoreへ入れるなら、Core Candidateという状態は要らない。**上げないための状態があるから、上がったものの重みが残る。**

## 7. Evidenceが揃っても、自動ではCoreにならない

もう一つ重要なのが、EvidenceがCoreを自動決定するわけではないことだった。Machineが「3つのRIで観測されました」「Failureが5回出ました」「再利用可能性スコア80点です」と計算したとしても、それだけでFoundry Coreへ自動昇格させる設計にはしていない。Current Architectureでは、Foundry CoreはCapability単位でHuman Decisionによって確定する。

これは「最後は人間の勘で決めます」という意味ではない。むしろ逆で、Humanが判断できるようにEvidenceを揃える。どのRIで観測されたか。何を防いだか。RI固有の事情ではないか。Semantic Boundaryをどこまでにするか。何を含めずに残すか。Candidateとして未解決のGapはないか。

その材料を見たうえで、Humanが責任を持って昇格を決める。

```text
Observed Pattern
↓
Core Candidate
↓
Cross-RI Evidence
↓
Boundary確認
↓
未解決Gap確認
↓
Human Decision
↓
Confirmed Core
```

この順序なら、Human AuthorityとEvidence-based Developmentはケンカしない。AIやMachineはEvidence収集、比較、Candidate整理を強く支援できる。でも「このProjectが将来にわたって保持するCore Responsibilityはこれだ」というArchitecture Decisionまで勝手に確定しない。

Human-directed ≠ Human-operatedという話と同じである。人間が全Evidenceを手作業で集める必要はない。でも、Authorityまで消す必要もない。

## 8. Coreへ持っていくとは、捨てるものを決めることでもある

Core Extractionという言葉だけ見ると、良いものを拾い集める作業に見える。でも実際にやっていることは、かなり「捨てる」作業でもある。何を残すかと同じくらい、何をCoreの外へ置くかを決める。

特定Model名を捨てる。特定Runtimeの値を捨てる。DifyのNode構成を捨てる。ComfyUIのGraphを捨てる。RI#4のQuery条件を捨てる。FoundryConsoleの画面構成も、そのままCoreにはしない。

もちろん実装としては全部残る。Historical Evidenceとしても価値がある。ただ、Coreの定義からは外す。Coreへ持っていきたいのは「その実装をもう一度作る方法」ではなく、「別の仕事、別のRuntime、別のToolになっても、もう一度問わなければならないControlは何か」だからだ。現在Confirmedされている4件を並べると、その性格が見える。

```text
FC-CORE-001
Runtime Capability Calibration
→ 今の実行環境は本当に出来るのか

FC-CORE-002
Delegation Contract Binding
→ 何を、どの条件で任せたのか

FC-CORE-003
Deterministic Technical Gate
→ 壊れた状態を成功として流していないか

FC-CORE-004
Evidence Traceability
→ 何が起き、何を根拠に判断したか追えるか
```

どれも特定業務の名前ではない。特定Toolの名前でもない。RI固有の実装を削っていったあとに、Control Responsibilityだけが残っている。だから、ここまで来てようやく「Foundry Core」という名前がしっくりしてきた。

## 9. 自分のWorkflowで同じことをやるなら

この考え方はLocal AI Foundryだけの話ではないと思う。たとえば、記事制作、議事録作成、画像生成、調査レポート、コード生成という複数のAI Workflowを持っていたとする。それぞれに似たValidator、似たHuman Check、似たLog、似たPrompt Ruleが入っている。

そこで、似ているものを全部共通Libraryへ移す前に、一度止まった方がいい。見るべきなのは、「同じコードがあるか」ではなく、「同じControl Concernがあるか」である。

どのWorkflowで発生したのか。何が壊れた時に必要になったのか。そのControlが無いと何が起きるのか。Domain固有の条件を外しても意味が残るのか。別Workflowでも同じ責務として説明できるのか。まだEvidenceが足りない部分はないか。

この比較をやると、「再利用できそうな処理」と「Coreとして保持したい責務」が分かれてくる。そして、ここでも急がない方がいい。Candidateのまま持つことは失敗ではない。むしろEvidenceが増えるまで名前と仮説を保持し、別のWorkflowで試せる。成立しなければ捨てればいい。

**Coreを増やすことが目的ではない。Coreにしてよいものだけを残す。** Season 3の中心命題だった「RIを増やすことが目的ではない。共通する制御構造を見つける」は、ここまで来てようやく後半までつながった気がする。

ここまでが今回の無料Storyである。「共通して見えた」だけではCoreに上げないこと、Cross-RI Evidenceを揃え、RI固有の実装を剥がし、Semantic Boundaryと未解決Gapを確認し、最後はHuman Decisionで昇格を決めることまで、結論はここで閉じている。

ただ、自分の複数Workflowで同じ比較をやろうとすると、途端に記録項目が増える。どのWorkflowで観測したのか。何が壊れて必要になったのか。Domain固有ではないのか。別Workflowでも同じ責務として説明できるのか。まだ何のEvidenceが欠けているのか。Candidateを保持するのか、Rejectするのか、Core相当へ昇格させるのか。頭の中だけで横断比較するには、かなりしんどい。

そこでS3-09のPaid Practical Layerとして、**「AI Workflowの共通構造を見極める Cross-RI Evidence Matrix Design Pack」** を用意する。**価格は2,980円（税込）。** 商品の中心Artifactが **Cross-RI Evidence Matrix** である。これは「何個のWorkflowで見つかったらCore」と自動判定する表ではない。Observed Pattern、Cross-RI Evidence、Semantic Boundary、未解決Gapを一つの流れで残し、**HumanがCONFIRM / HOLD / REJECTを判断できる状態を作るための実務Matrix**である。

無料本文では「何を根拠にCoreへ上げるのか」まで。有料側では、それを自分のAI Workflowへ持ち込み、Candidateを比較し、Evidenceを揃え、昇格判断まで残すための具体的な手順とArtifactを扱う。今回も境界は同じだ。**結果は無料。再現方法が有料。**

---

次回は **「AIごとに、得意な仕事を分ければいい」**。

Coreが見えてくると、今度はそのControlの内側で「どのAIへ、どの仕事を任せるか」が問題になる。全部を一つのModelへ押し込む必要はない。考えるのが得意なAI、書くのが得意なAI、画像を作るAI、決定論的な処理を担うMachine。それぞれを、役割と境界で分ければいい。

ただし、ここでも「高性能Modelだから全部任せる」にはしない。次は、Model名ではなく**仕事と責任から役割を割り当てる**話へ進む。

---
