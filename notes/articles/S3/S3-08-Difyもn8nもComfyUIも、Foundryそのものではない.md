# S3-08 Difyもn8nもComfyUIも、Foundryそのものではない

### 📌 本記事

- **Season3 第8話：Difyもn8nもComfyUIも、Foundryそのものではない**

### 関連記事はコチラ👇

- S3-01：記事を作らないなら、何を作るの？
- S3-02：Reference Implementationは完成品ではない
- S3-03：別の仕事でも、同じところで壊れた
- S3-04：AIに任せる前に、実行環境を測れ
- S3-05：Gateを通った。でも、人間はOKを出さなかった
- S3-06：画面を作ったら、AIの裏側を見なくて済んだ
- S3-07：検索できても、正しい記事になるとは限らない

---

## 【目次】

1. 道具が増えるほど、「これがFoundry？」に見えてきた
2. Difyもn8nもOllamaもComfyUIも、ちゃんと必要だった
3. でも、どの道具にも最終判断は任せていなかった
4. RIが変わると、主役の道具も変わった
5. Current Architectureでは、ToolingはFoundry Coreの下にいる
6. Foundryに残したいのは、製品名ではなくControlだった
7. じゃあ道具は何でもいいのか
8. 次に見るのは「道具が変わっても残ったもの」

---

前回はRI#4で、検索できることと、正しいResearchができることと、正しい記事になることは別だと書いた。Search Intent、Query、Source、Evidence、Draft、Review。検索という一個の機能に見えていたものを分解していくと、途中にいくつものControl Boundaryがあった。

ここで、いったんRI固有の話から引いてみる。Local AI Foundryを作る過程では、Dify、n8n、Ollama、ComfyUI、Searchと、かなり色々な道具を使ってきた。画面まで作った。Workflowも組んだ。Local LLMも動かした。検索もつないだ。これだけ並ぶと、外から見れば「Local AI Foundryって、要するにこのツール群を組み合わせたシステムでしょ？」と見えても不思議ではない。

実際、ワシ自身も最初の頃はかなりその感覚に近かった。DifyのWorkflowを育て、n8nで外部処理をつなぎ、OllamaでLocal LLMを動かし、ComfyUIで画像を作る。壊れればNodeやPromptや接続を直す。目の前にあるのは全部それらの画面だから、どうしても「Foundryを作る＝このStackを完成させる」に見えてくる。ところがRIを増やして横から眺めた時、その説明ではどうにも足りなくなった。

## 1. 道具が増えるほど、「これがFoundry？」に見えてきた

RI#1 Article ProductionのHistorical Implementationは、まさにDify / Ollama / n8n / ComfyUIを使った構成だった。Dify側で生成Workflowを組み、Local LLM Runtimeを使い、外部処理をつなぎ、画像生成も組み込む。一つのTopicから記事、画像、最終成果物まで流したかったので、道具が増えるのは自然だった。

しかも、それぞれの道具はちゃんと仕事をしていた。Difyが無ければ当時のGeneration Workflowは組めなかったし、Ollamaが無ければLocal LLMをその形では動かせない。n8nはWorkflowの外側をつなぐ役を持ち、ComfyUIは画像生成Runtimeとして必要だった。だから「そんなものは枝葉だからどうでもいい」と言いたいわけではない。**実装を成立させるうえでは、どれも重要だった。**

ただ、開発が進むほど妙なことが増えた。DifyのWorkflowが最後まで走っても、記事が成立しているとは限らない。ComfyUIが画像を返しても、人間が使いたい画像とは限らない。Searchが結果を返しても、正しいEvidenceとは限らない。道具が「仕事を実行できた」ことと、ワシらが欲しい成果が「成立した」ことの間に、別の判定が必要だった。

この時点で、少しずつ違和感が出てきた。もしFoundryがDifyやn8nやComfyUIそのものなら、なぜワシらはその外側にContractやGateやReviewやEvidenceを何度も足しているんだ？　道具を動かすだけでFoundryが完成するなら、こんなに境界線を増やす必要はないはずだった。

## 2. Difyもn8nもOllamaもComfyUIも、ちゃんと必要だった

ここは変に逆張りしない方がいい。S3-08のタイトルだけを見ると、「ツールなんて要らない」という話に見えるかもしれないが、全然そうではない。AIへ仕事を任せる以上、実際にModelを動かすRuntimeも、処理をつなぐWorkflowも、画像を作るBackendも、外部情報を取るSearchも要る。

たとえばOllamaのようなLocal LLM Runtimeは、Modelを実際に動かす場所である。ComfyUIは画像生成の実行基盤として強い。Difyやn8nのようなWorkflow / Integration Toolは、複数の処理を接続し、データを次へ渡す。Searchは外部世界からSource候補を持ってくる。こういう部品が無ければ、Foundryは何も実行できない。

でも、部品が強力であることと、その部品がProject全体の意味を決めることは別だった。ComfyUIが高機能になったからといって、Human Acceptanceの責任までComfyUIへ移るわけではない。Difyに分岐やRetryを足せるからといって、何をRetryしてよいかという契約まで自動的に正しくなるわけではない。Searchが便利になっても、採用したSourceが今回のClaimを本当に支えているかは別に確認しなければならない。

つまり道具は、**能力を提供する。だが責任境界までは勝手に決めてくれない。** ここを混ぜると、「そのToolで出来ること」がそのまま「Humanが任せてよいこと」にすり替わる。Season 3で何度も引っかかったのは、まさにそこだった。

## 3. でも、どの道具にも最終判断は任せていなかった

S3-05では、Technical Gateを通った成果物をHumanがRejectした。S3-06では、Human-facing Control Surfaceを作り、裏側を全部操作しなくてもHumanが判断できる形へ寄せた。S3-07では、Searchが成功してもResearch Qualityは保証されないと分かった。振り返ると、どの回でも「Toolが動いたか」より、その後の境界線の方が問題になっている。

ここで共通していたのがHuman Authorityだった。何を作るのか。何を採用するのか。どのRiskを取るのか。どこで止めるのか。最終的にAcceptするのか。AIやToolへ処理を委譲しても、Purpose、Judgment、Responsibility、Approvalまで丸ごと渡したわけではない。

だからHuman-facing Control Surfaceも、Backendを全部Humanへ戻すために作ったのではなかった。むしろ逆で、Machineに任せてよい処理は裏で進めつつ、HumanがAuthorityを使う場所だけ表へ出したかった。FoundryConsoleはその考え方をRI#3へ実装したCurrent Implementationであって、FoundryConsoleそのものがRI#3でもなければ、Local AI Foundryそのものでもない。

この区別がかなり大きい。画面、Workflow、Runtime、Model、Search Engineは交換や更新の対象になり得る。一方で、「Humanが何を保持し、Machineへ何を委譲し、何をGateし、何をEvidenceとして残すか」というControlは、道具の画面より上の層に置かないと毎回消えてしまう。

## 4. RIが変わると、主役の道具も変わった

RI#1ではArticle Productionが中心だった。RI#2ではDocumentation Productionへ仕事を変えた。RI#3ではVisual Asset Productionへ進み、ComfyUIとFoundryConsoleが前面に出た。RI#4ではResearch-Grounded Long-form Content Productionになり、Search、Source、Entity、Evidence Bindingの問題が主役になった。さらにRI#5では、個々の成果物を作るProducer側ではなく、CampaignやEvidence、Human Interventionを扱うControl Planeへ視点が上がっている。

仕事が変われば、当然使う道具も変わる。記事生成で便利だった構成を、そのまま画像生成へ持っていけるわけではない。画像生成で重要だったControl Surfaceの実装を、そのままResearch品質の答えにすることもできない。RIごとにDomain Implementationがあり、それぞれ別のRuntimeやToolingを持つ。

それでもSeason 3で面白かったのは、仕事を変えたのに同じ種類の問いが何度も戻ってきたことだった。Current Runtimeは本当にその仕事を出来るのか。AIへ何を任せるのか。どこで機械的に止めるのか。あとから何が起きたか追えるのか。成果物を最終的に誰がAcceptするのか。

ここで初めて、「RIごとの実装」と「RIをまたいで残るControl」を別々に見た方がいい、と腹落ちした。DifyのNode構成をCoreへ持っていくのではない。ComfyUIのGraphをCoreへ持っていくのでもない。Search Queryの作り方をそのままProject全体のCoreにするのでもない。**仕事を変えても繰り返し必要になった制御構造だけを、別の層で見る。**

## 5. Current Architectureでは、ToolingはFoundry Coreの下にいる

Current Architectureでは、この関係がかなりはっきり整理されている。上から順番に見ると、Human Authorityがあり、その下にFoundry Core、その下にReference Implementation、さらにその下にInfrastructure / Runtime / Toolingがある。

```text
Human Authority
↓
Foundry Core
↓
Reference Implementation
↓
Infrastructure / Runtime / Tooling
```

この並びを見た時、ワシの中ではかなり整理がついた。Dify、n8n、Ollama、ComfyUI、Searchが不要なのではない。**それらはFoundryを実行するための重要なToolingだが、Foundry Coreそのものではない。** RIも同じで、RI#1のArticle ProductionやRI#3のVisual Asset ProductionそのものをCoreと呼ぶわけではない。

CurrentでConfirmedになっているFoundry Coreは、FC-CORE-001 Runtime Capability Calibration、FC-CORE-002 Delegation Contract Binding、FC-CORE-003 Deterministic Technical Gate、FC-CORE-004 Evidence Traceabilityの4つである。見事なくらい製品名が入っていない。どれも「何のToolを使うか」ではなく、「AIへ仕事を委譲するとき、何を制御しなければならないか」を表している。

ここは大事なので、逆向きにも考えてみた。たとえばComfyUIを使っているからFC-CORE-003が成立するわけではない。ComfyUIの出力に対し、Actual ArtifactをMachine-checkableな条件で評価し、FAILをSuccessとして流さない境界を実装して初めてDeterministic Technical Gateになる。ToolはCapabilityを実現する場所にはなれるが、Tool名だけではCapabilityの成立証明にならない。

## 6. Foundryに残したいのは、製品名ではなくControlだった

昔のワシなら、構成図の中心にDifyを書いて、その隣にn8n、下にOllama、横にComfyUIを置けば「Local AI FoundryのArchitecture図」が出来た気になっていたと思う（笑）。実際、それはRI#1の実装図としては意味がある。でもProject全体の定義としては弱い。

なぜなら、その図は道具を変えた瞬間に古くなるからだ。Model Runtimeを変えたら別物。Workflow Engineを変えたら別物。画像Backendを変えたら別物。もしFoundryのIdentityが製品名にBindingされていたら、Tool更新のたびに「Foundryそのもの」が壊れることになる。

一方で、Current Runtimeを測ってから委譲範囲を決めること、仕事をContractへBindingすること、機械的に判定できる境界ではFAILを後段へ流さないこと、ExecutionからHuman DecisionまでEvidenceを追えるようにすることは、特定製品の名前が変わっても問いとして残る。もちろん実装方法は変わる。それでも「必要なControlは何か」という意味は残せる。

ここでワシらがFoundry Coreと呼び始めたものの輪郭が見えてきた。**FoundryはToolの寄せ集めではなく、異なるToolと異なる仕事の上に載せるControl Structureとして見た方が筋が通る。** 少なくとも今のCurrent Architectureは、その方向へ整理されている。

## 7. じゃあ道具は何でもいいのか

ここで「じゃあDifyでも別のToolでも何でも同じなんだな」と飛ぶと、それも違う。道具ごとに出来ること、出来ないこと、Failure Mode、観測出来る情報、設定の持ち方、Runtime特性は違う。Toolを変えればAdapterもConfigurationもGateの置き方も変わり得るし、そもそもCurrent Runtimeで必要Capabilityが成立するか測り直さなければならない。

Season 3でFC-CORE-001 Runtime Capability CalibrationがConfirmed Coreになったことを考えると、むしろ「Toolは何でもいい」とは逆の話になる。採用したModel / Runtime / Hardwareが実際に何を出来るのかは、推測ではなくEvidenceで確定する必要がある。特定Toolへ宗教的に固定しない代わりに、**採用したToolがその役割を本当に果たせるかは、ちゃんと測れ**ということになる。

同じく、「Toolを差し替えてもFoundry Coreは絶対そのまま動く」と実証済みなわけでもない。そこまで先回りして万能なPortabilityを主張するつもりはない。実装を変えれば壊れる場所はあるし、再検証も必要になる。Currentで言えるのは、Foundry Coreを特定製品名そのものとして定義していないこと、そしてRIをまたいだEvidenceから再利用可能なControlを抽出していることまでである。

この線引きはかなり好きだ。Toolを軽視しない。でもToolへProjectのIdentityを全部預けない。便利なProductは使う。合わなくなれば見直す。ただし、その上で守るべきContract、Gate、Evidence、Human Authorityは、別の責務として持つ。

## 8. 次に見るのは「道具が変わっても残ったもの」

S3-08で言いたかったのは、Difyが悪い、n8nが古い、ComfyUIでは足りない、という話ではない。むしろ逆で、どれも実際のReference Implementationを成立させるために使ってきた大事な道具である。ただ、Local AI Foundryを説明するとき、その製品名だけを並べてもProjectの中心には届かなかった。

RI#1からRI#5まで仕事と実装を変えたことで、ようやく「そのRIだから必要だったもの」と「仕事を変えてもまた必要になったもの」を分けて見られるようになった。ここまで来ると、次にやることはかなり自然である。各RIの中から、共通して見えたControlを拾い上げればいい。

ただし、**共通して見えたから即Core、ではない。** 便利そうだからでも、何度か使ったからでもない。どのRIで何が起き、そのControlが何を防ぎ、どのEvidenceで再利用可能性を支えられるのか。そのうえでHumanがCoreへ上げると判断したものだけを残す。

---

次回は **「共通していたものだけをCoreへ持っていく」**。FC-CORE-001〜004は、最初からFoundryの理念として置かれていたわけではない。異なるReference Implementationを作り、壊し、比較した結果として残った。

Difyでもない。ComfyUIでもない。RIそのものでもない。では、何を根拠に「これはFoundry Coreだ」と言えるようになったのか。次はCross-RI EvidenceからCoreへ上げる、その境界を見ていく。

---
