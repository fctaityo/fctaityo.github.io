# S3-12 Foundry Coreとは何か

### 📌 本記事

- **Season3 第12話：Foundry Coreとは何か**

### 関連記事はコチラ👇

- S3-01：記事を作らないなら、何を作るの？
- S3-02：Reference Implementationは完成品ではない
- S3-03：別の仕事でも、同じところで壊れた
- S3-04：AIに任せる前に、実行環境を測れ
- S3-05：Gateを通った。でも、人間はOKを出さなかった
- S3-06：画面を作ったら、AIの裏側を見なくて済んだ
- S3-07：検索できても、正しい記事になるとは限らない
- S3-08：Difyもn8nもComfyUIも、Foundryそのものではない
- S3-09：共通していたものだけをCoreへ持っていく
- S3-10：AIごとに、得意な仕事を分ければいい
- S3-11：やり方を決めすぎない。成立条件を決める

---

## 【目次】

1. Season 3で作っていたのは、巨大なAI Workflowではなかった
2. Reference Implementationは答えではなく、Evidence Generatorだった
3. Coreへ持っていかなかったもの
4. FC-CORE-001 Runtime Capability Calibration
5. FC-CORE-002 Delegation Contract Binding
6. FC-CORE-003 Deterministic Technical Gate
7. FC-CORE-004 Evidence Traceability
8. 4つを並べただけではFoundry Coreにならない
9. Human-directed ≠ Human-operated
10. Foundry Coreは完成品なのか
11. Season 3で、ようやく「Foundry」の意味が見えた
12. 次のSeasonへ

---

Season 3を始めた時、やりたかったことは単純だった。記事制作だけではなく、資料制作、画像制作、調査、Evidence管理のような別の仕事にもAIを使い、それぞれをReference Implementationとして作ってみる。そして、仕事が変わっても繰り返し必要になるものがあるなら、それをFoundry Coreとして取り出せないかを確かめる。

12話まで来て、ようやく答えを出せるところまで来た。Local AI FoundryのCoreは、Difyでも、n8nでも、Ollamaでも、ComfyUIでも、特定のLLMでもない。巨大なWorkflowそのものでもない。**異なる仕事をAIへ委譲しても、同じ考え方で測り、任せ、止め、追跡できるControl Structure。** それがSeason 3で見つけたFoundry Coreだった。

## 1. Season 3で作っていたのは、巨大なAI Workflowではなかった

Season 1の頃は、AIが複数Stageを通りながら記事を作る仕組みそのものが面白かった。Season 2では、その仕組みを運用すると、Configuration、Current、Human Decision、Canonical Sourceのような「AIの賢さとは別の問題」が大量に出てくることを知った。そしてSeason 3では、さらに一歩進めて「記事制作以外でも同じ問題が起きるのか」を見始めた。

Documentation Productionでは、文章を生成できるだけでは足りなかった。Visual Asset Productionでは、画像を作れるだけでは足りなかった。Research-Grounded Long-form Productionでは、検索できるだけでは足りなかった。Evidence Foundationでは、ログを保存するだけでは足りなかった。仕事は違うのに、「何を任せたのか」「何をもって成功とするのか」「誰が判断するのか」「後から何が起きたか追えるのか」という問題が何度も戻ってきた。

ここで方向が変わった。各Reference Implementationを一つの巨大製品へ合体させるのではなく、**複数の仕事で繰り返し必要になった制御構造だけを取り出す**。RIを増やすことが目的ではない。RIは、Core候補を見つけるためのEvidence Generatorだった。

## 2. Reference Implementationは答えではなく、Evidence Generatorだった

Reference Implementationという名前には、最初から「これが完成形」という意味を持たせていない。ある仕事を実際に動かし、どこで壊れ、どこでHumanが必要になり、どの制御が別の仕事でも再登場するのかを観測するための実装である。だからRI固有の便利機能が、そのままCoreになるわけではない。

記事制作で必要だった機能が、資料制作では不要なこともある。Visual Asset Productionの画面構成をResearch Workflowへそのまま持っていっても意味はない。逆に、実行前に能力を測る、仕事の成立条件を決める、Machineで判定できるところをGateで止める、結果をEvidenceとして追えるようにする、という構造は仕事が変わっても何度も現れた。

S3-09で「共通していたものだけをCoreへ持っていく」としたのは、このためだった。似ているから採用するのではない。便利そうだから採用するのでもない。**異なるRIで繰り返し必要になり、Actual Evidenceで役割を説明できるものだけをCore候補として扱う。** Season 3で一番大きかった変化は、機能追加よりも、この昇格の考え方を持てたことかもしれない。

## 3. Coreへ持っていかなかったもの

何をCoreへ入れたかを見る前に、何を入れなかったかを見た方が分かりやすい。Dify、n8n、Ollama、ComfyUI、Searchは重要な実装要素だが、それ自体をFoundry Coreとはしていない。Model名も同じで、ある時点で性能が高いModelが見つかっても、それはResource Assignmentの候補であってCoreそのものではない。

UIもCoreではない。S3-06でHuman-facing Control Surfaceの価値はかなり大きかったが、画面の見た目や特定のConsole実装を全RIへ強制すれば、今度はDomain ImplementationとCoreの境界が崩れる。Retry回数やSearch Depthのような具体Parameterも、実務では重要でも、RuntimeやTaskに依存するならCoreへ固定しない。

つまりCoreは「全部入りの共通部品箱」ではない。**交換されるもの、Domainに依存するもの、Evidenceが足りないものを無理に中心へ入れないこと**もCore設計の一部だった。この境界があるから、外側のToolやModelを変えながら、内側の制御構造を残せる。

## 4. FC-CORE-001 Runtime Capability Calibration

最初にConfirmed Coreになったのは、Runtime Capability Calibrationだった。AIへ仕事を任せる前に、Model名や公称Specだけを見て「この仕事は出来るだろう」と決めない。Current Runtimeで実際に観測・測定し、その環境で使えるEffective CapabilityをEvidence付きで決め、後段の処理へBindingする。

これはS3-04で扱った「AIに任せる前に、実行環境を測れ」の答えでもある。同じModel名でも、Hardware、Runtime、Context、設定、周辺Toolが変われば、実際に使える能力は変わる。逆に小さいModelでも、Taskを限定すれば十分に使えることがある。だからCapabilityはカタログ値ではなく、Current RuntimeのEvidenceとして扱う。

ここで重要なのは、CalibrationがBenchmark大会ではないことだ。目的は一番強いAIを決めることではなく、**この仕事を、この実行環境で、どこまで任せられるかを決めること**にある。測った結果がAssignmentやFallbackへつながって、初めてControl Structureとして意味を持つ。

## 5. FC-CORE-002 Delegation Contract Binding

能力が分かっても、何を任せたのかが曖昧ならWorkflowは壊れる。そこでConfirmed CoreになったのがDelegation Contract Bindingである。委譲する仕事を実行前に、必要成果、制約、責任・権限境界、Handoff条件、Failure条件を持つ識別可能なContractへBindingする。

S3-10ではModel名より先にRoleと責任を決め、S3-11では手順を固定しすぎず成立条件を決めるところまで進んだ。この二つはつながっている。誰に任せるかだけでなく、**何を満たせばその仕事を完了として受け取れるのか**が必要になるからだ。

Contractは巨大なPromptの別名ではない。内部のHowを一つに固定するためでもない。ModelやToolを交換しても、同じ仕事として扱えるBoundaryを残すためにある。Required Output、Authority Boundary、Failure、Handoffが残っていれば、実装が変わっても委譲した仕事の意味を追える。

## 6. FC-CORE-003 Deterministic Technical Gate

Contractを書いたら、次は守られたかを確認しなければならない。そこで必要になるのがDeterministic Technical Gateである。定義されたTechnical Control Boundaryでは、Actual ArtifactやRuntime StateをMachine-checkableな成立条件で評価し、FAILした状態をTechnical Successとして後段へ流さない。

ここでSeason 3の重要な分離が出てくる。Technical GateとHuman Acceptanceは同じではない。Schemaが正しい、Required Fieldがある、Fileが存在する、禁止条件に触れていない、といったものはMachineで閉じられる。一方で「この成果物を採用するか」「目的に合っているか」「商品として出すか」はHumanが持つ判断になり得る。

S3-05で「Gateを通った。でも、人間はOKを出さなかった」という出来事を扱ったのは、この違いが実運用で現れたからだった。**Machineで決められることをHumanへ投げない。しかしMachine PASSをHuman OKへ読み替えない。** この二つを同時に守ることが、AIへ仕事を任せる時の制御境界になった。

## 7. FC-CORE-004 Evidence Traceability

そして、実行が終わった後に必要になったのがEvidence Traceabilityだった。Execution、Artifact、Gate、Review、Human Decisionを後から再構成できるように、Evidence identityとBindingを残し、Current、Historical、Candidateの区別を保持する。

ログがあるだけでは足りない。どのExecutionがどのArtifactを作り、どのGateを通り、どのReviewを受け、Humanが何を判断したのかがつながっていなければ、後から「なぜこれがCurrentなのか」を説明できない。逆にTraceabilityがあれば、成功だけでなくFAILやHOLDも、次の判断に使えるEvidenceになる。

RI #5 Evidence FoundationがProtected Baseとして重要になったのも、このためである。CurrentではActual Human Runtimeまで含むEvidence Foundationのmilestoneには到達しているが、Control Plane全体のProduction Acceptanceが完了したわけではない。**出来たことと、まだ認めていないことを同じEvidence上で分けて持つ。** それ自体がFoundryの制御に必要だった。

## 8. 4つを並べただけではFoundry Coreにならない

ここまで読むと、Foundry Coreとは4つの機能一覧なのかと思うかもしれない。でも、そうではない。Calibration、Contract、Gate、Evidenceを別々に置いただけでは、まだ「便利な仕組みが4個ある」だけである。

大事なのは接続である。まずRuntimeを測り、実際に使えるCapabilityを決める。そのCapabilityを前提に仕事をContractへBindingする。ContractのうちMachineで判定できる成立条件をGateへ落とし、実行結果とGate結果をEvidenceへBindingする。そしてHumanがPurpose、Judgment、Responsibility、Authorization、Acceptanceを保持しながら、必要な場所だけ判断する。

つまりSeason 3で見つけたCoreは、**Measure → Bind → Gate → Trace** という制御の連鎖として見ると分かりやすい。ただし、これは特定の固定Workflowを全業務へ強制するという意味ではない。Domainごとの処理手順やUIやResourceは外側で変えられる。その変化を許しながら、委譲の意味と成立条件とEvidenceを失わないための構造がCoreなのである。

## 9. Human-directed ≠ Human-operated

Season 3を通して、もう一つはっきりしたことがある。Humanが責任を持つことと、Humanが全Stepを操作することは同じではない。むしろ全StepでHuman確認を要求すると、Automationは進んでもDelegationは進まない。

Humanが保持するのは、Purpose、Judgment、Responsibility、Authorization、Acceptanceである。Machineで一意に閉じられる検査やContinuationまで毎回Humanへ返す必要はない。一方で、採用、公開、責任を伴う判断まで「自動化できるから」という理由でMachineへ渡してはいけない。

これがHuman-directed ≠ Human-operatedという考え方につながった。**人間が方向と責任を握ったまま、操作そのものは必要なところまでMachineへ任せる。** Foundry CoreはHumanを外すための仕組みではなく、Humanを本当に判断が必要な場所へ戻すための仕組みでもある。

## 10. Foundry Coreは完成品なのか

ここはSeason 3の最後だからこそ、はっきり書いておきたい。Foundry Coreは「全部完成した」という意味ではない。CurrentでConfirmed CoreなのはFC-CORE-001〜004であり、それ以外の候補を先回りして確定扱いにはしない。

たとえばReview Binding IntegrityはStrong Candidateだが、残るEvidence locator gapが解消されるまではConfirmed Coreへ昇格させない。RI #4もCurrent CandidateとしてEvidence-Driven Runtime Hardeningが続いており、Article Quality Baselineはまだ確立していない。RI #5もEvidence Foundation milestoneには到達したが、Production Acceptanceは未到達である。

これは未完成だから失敗、という話ではない。むしろ**Confirmed、Candidate、Pendingを分けられること自体が、FoundryをEvidenceで育てるための条件**である。Season 3で手に入れたのは最終完成図ではなく、「何をCoreと呼んでよく、何をまだ呼んではいけないか」を判断する土台だった。

## 11. Season 3で、ようやく「Foundry」の意味が見えた

Season 3の最初に「記事を作らないなら、何を作るの？」と問い直した。答えは、記事の代わりに資料を作るとか、画像を作るとか、別のAIアプリを増やすという話ではなかった。異なる仕事を実際に作ることで、その奥にある共通の制御構造を見つけることだった。

Documentation、Visual Asset、Research、Evidence。仕事が変われば、使うToolもModelもUIも処理手順も変わる。それでも、実行前に能力を測り、任せる仕事を定義し、成立条件をGateで確認し、結果をEvidenceとして追えるようにする必要は残った。そしてHumanは、全部を操作するのではなく、PurposeとJudgmentとResponsibilityを握る。

だから今のLocal AI Foundryを一文で言うなら、**「AIをたくさん並べる工場ではない。異なる仕事を、Evidence付きの制御構造でAIへ委譲するためのFoundryである」**となる。Difyもn8nもModelも、UIやDomain Implementationも変わっていい。

変わってもなお、何を測り、何を任せ、何をもってPASSとし、何が起きたかを追える。その中心だけを残す。それが、Season 3でたどり着いたFoundry Coreだった。

## 12. 次のSeasonへ

ここでSeason 3は終わる。ただしLocal AI Foundryの開発が終わるわけではない。むしろCoreが見えたことで、次の問題がはっきりした。

AIへ仕事を任せ、Gateを通し、Evidenceを残せるようになった。では、そのEvidenceは次の実行でどう使われるのか。同じFailureを何度も繰り返さないためには何をKnowledgeとして残すのか。改善した変更が、前に動いていたものを壊していないことをどう確認するのか。過去の成功は、いつまでCurrentの正解として扱ってよいのか。

Season 4のWorking Themeは、**Operational Learning / Continuous Assurance**。Season 3が「AIへどう仕事を任せるか」だったなら、次は「任せた結果からどう学び、壊さず、次の実行を良くするか」へ進む。ただし、まだWorking Planである。Actual Evidenceより先に、未来のFoundryを完成したものとして書くつもりはない。

Season 1でWorkflowを作った。Season 2で、そのWorkflowを壊さず運用する難しさを知った。Season 3で、仕事が変わっても残るCoreを探した。そして次は、**そのCoreを使って動いた結果を、どう次へ返すか**を考える。

ここで、Season 3は完。ここまで読んでくれて、本当にありがとう。Local AI Foundryは、まだ作っている途中だ。だから次のSeasonでも、成功だけではなく、壊れたところも、止めたところも、まだ分からないところも、そのままEvidenceとして追いかけていく。
