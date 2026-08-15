# S2-11 Publishしても、実行するまで分からない

### 📌 本記事
- **Season2 第11話：Publishしても、実行するまで分からない**

### 関連記事はコチラ👇
- S2-10：文字数はLLMに数えさせるな（笑）

---

## 【目次】

1. RepositoryもDraftもPublishedも揃った
2. それでもProject Stateは`Published`のまま
3. 過去に実行したRunは、今のCandidateの証拠にはならない
4. StaticなPASSでは、Runtimeの現実までは証明できない
5. Runtimeでしか見えないものがある
6. 「Published」と「Runtime Accepted」の間にはGateがある
7. 今回は、まだ結論を書き切れない

---

前回までで、かなりのところまで来た。Humanが決めたExact InputをExecution側で再選択させない。Machineが知っている文字数や差分をLLMへ再推定させない。RepositoryへCorrectionを入れ、DraftへApplyし、Publishedまで反映し、Canonical LauncherもCurrent Publishedへ同期する。ここまで揃えば、見た目としてはかなり「完成」に近い。

実際、現在のRI #1はRepository / Draft / PublishedがSemantic Matchし、Canonical LauncherもCurrent Publishedを向いている。Deterministic Retry Correction Payloadも全Sectionへ反映済みで、Live側のVerificationも終わっている。Project Stateも`Published`である。

それでも、Current Candidate Runtimeはまだ`NOT EXECUTED`だ。

この一行が、今回の記事のほぼ全部である。

**Publishしても、実行するまで分からない。**

## 1. RepositoryもDraftもPublishedも揃った

RI #1では、Formal RV-01のFailureからかなり長いCorrectionを積み重ねた。Human-defined Exact InputをFormal Test IDへBindingし、RetryではMachine-measured FactをLLMへ渡す形へ変更し、そのCorrectionをRepositoryだけで終わらせず、Draft / PublishedまでCurrentizeした。さらにPublishで新しいIdentityが生成された後、Canonical Launcherが旧Publishedを向いていた問題も潰し、Current PublishedへBinding Synchronizationした。

現在のPublished Workflowは`842c890c-7670-462b-956f-6156602280d5`で、Repository / Draft / PublishedのGraph MD5は`4d06f300bf92ce9eecba5f8d768ed00a`で一致している。Current SourceもIVMもFresh RV-01直前のClean StopへCurrentize済みで、Fresh RV-01 Authorizationは`GRANTED / NOT CONSUMED`のまま残っている。

つまり、少なくとも「どのCandidateを実行するのか」「どのPublishedをLauncherが向くのか」「Formal Test IDからどのInputを使うのか」といったExecution前のBindingは整理された。

ここまで見ると、もう成功したような気分になる。

でも、まだ一回も動かしていない。

## 2. それでもProject Stateは`Published`のまま

Local AI Foundryでは、Project Stateを見た目の完成度で進めない。Repositoryが綺麗だから、Testが全部PASSしたから、Published WorkflowがCurrentだからという理由だけで`Runtime Verified`へ進めることはしない。

現在の正式状態は`Published`である。Runtime Acceptanceは`PENDING`、Current Candidate Runtimeは`NOT EXECUTED`。これは「何かが壊れていてBlocked」という意味ではない。むしろ、実行前に必要なCorrection、Publish、Binding、Currentizationまで終わり、Fresh RV-01を走らせる直前で意図的に止まっている状態である。

```text
Repository
VERIFIED

Live
VERIFIED

Current Candidate Runtime
NOT EXECUTED

Runtime Acceptance
PENDING

Project State
Published
```

ここで重要なのは、`Published`が失敗状態ではないことだ。Publishまで成立したという一つのLifecycle Stateであり、その次にRuntime Verificationが残っている。

逆に言えば、PublishedされたことをRuntime Successの代わりに使わない。

## 3. 過去に実行したRunは、今のCandidateの証拠にはならない

「まだRuntimeしていない」と言うと、少し不思議に見える。RI #1ではすでに実際のWorkflow Runが存在するからだ。Historical M16もあるし、Formal Input Binding Correction後にはCorrect Contract下のFormal RV-01も一度実行している。

そのFormal RV-01はFAILした。Conclusionが初回623文字、Retry後698文字となり、Expected Range 240〜420へ収束しなかった。そこから今回のDeterministic Retry Correction Payloadが作られた。

では、そのRunを現在のRuntime Evidenceとして使えばいいのか。

使えない。

理由は単純で、そのRunが**現在のCandidateではない**からだ。Historical Correct-Contract RV-01は、Retry Correctionを入れる前のPublished Candidateで実行された。今のCandidateは、そのFailureを受けてRepository、Draft、Published、Launcherまで変更された別のCurrent Stateである。

```text
Historical Run
→ その時のCandidateのEvidence

Current Candidate
→ Correction後の別Current State

Historical Evidence
≠
Current Candidate Runtime Evidence
```

過去Runは消さない。失敗した事実も重要なEvidenceである。しかし「一度Runtimeしたことがある」という理由で、新しいCandidateまでRuntime済みにしてはいけない。

EvidenceにもBindingが必要なのだ。

## 4. StaticなPASSでは、Runtimeの現実までは証明できない

ここまでのCorrectionでは大量のTestを通している。RepositoryでStructureを確認し、Graphを比較し、PromptやPayloadの存在を検査し、Formal Input Bindingも機械的に照合できるようにした。Published Stateも確認し、LauncherがCurrent Publishedを向くことも確認した。

これらは全部重要である。

ただし、答えている問いが違う。

```text
Repository Test
→ 実装がContractどおり存在するか

Semantic Verification
→ Repository / Draft / Publishedの意味が一致するか

Binding Verification
→ LauncherやInputがCurrent Targetを向くか

Runtime Verification
→ 実際にその状態で動かした時、何が起きるか
```

Static Testで「Retry Promptへ`actual_length`が入るコードになっている」ことは確認できる。しかし実際のRunでどの値が入り、LLMがその制約の中で何を返し、Gateがどう判定するかまではStatic Testだけでは証明できない。

Published WorkflowのGraphがRepositoryと一致していることも確認できる。しかし、そのWorkflowが実際のProvider、Model、Credential、Transportを通った時に期待どおり動くかは、実行しなければ分からない。

Static VerificationはRuntimeの代用品ではない。

## 5. Runtimeでしか見えないものがある

Runtimeへ進む理由は、「念のため一回動かしてみる」ことではない。実行しなければ観測できないものが存在するからである。

LLMのActual Outputはその代表である。Promptが正しくても、モデルがどう応答するかはRuntimeで初めて確定する。Retry Payloadに623、420、203という正しいCorrection Factを渡せても、それを受け取ったLLMが意味を保ちながらContract内へ収束できるかは別問題だ。

さらにRuntime ParameterのEffective Valueも、設計値やConfiguration上の値だけではなく、実際のRequestやProvider側でどう効いたかを観測する必要がある場合がある。Transport、Authentication、Endpoint、Request Count、Run ID、Raw Output、Normalize後DTO、Gate Resultなども同じである。

つまりRuntime Evidenceとは、「設計上こうなるはず」をもう一度説明する資料ではない。

**実際に何が起きたかを固定するEvidence**である。

今回のFormal RVでは、Correct Contract下でもConclusion Retryが623から698へ増えた。これはStatic Reviewだけでは出てこなかった事実だった。そして、そのActual Runtime Evidenceを見たからこそ、「Machineが知っている623をLLMへ渡していない」という設計側の欠陥と、「240〜420を理解しても698を返した」というModel Instruction Following側の問題を`MIXED`として分けられた。

Runtimeは、設計を証明する最後の儀式ではない。

設計が現実とぶつかる場所である。

## 6. 「Published」と「Runtime Accepted」の間にはGateがある

現在の次ActionはFresh Formal RV-01のFinal Pre-Runtime Gateである。ここではRepository / Draft / Published / Canonical Launcher / Formal Input Binding / Service Readiness / Credential BindingなどがCurrent Candidateを向いていることを確認し、PASSした場合だけFresh RV-01をexactly once実行する。

Fresh RV-01 Authorizationはすでに`GRANTED / NOT CONSUMED`で、Current TargetやScopeが変わっていなければ同じHuman GOを毎回取り直す必要はない。ただし、このAuthorizationがRV-02 / RV-03やRuntime Acceptance、Project State Transitionまで自動的に許可するわけでもない。

```text
Published
        ↓
Final Pre-Runtime Gate
        ↓
Fresh RV-01
        ↓
Runtime Evidence
        ↓
Acceptance Decision
        ↓
条件成立時だけ
Runtime Verified候補
```

この境界を飛ばさない。

PublishはLive Stateを成立させる工程であり、Runtime Acceptanceは実行結果を受け入れる判断である。似て見えるが、別の責務を持っている。

だから現在のProject Stateが`Published`のままなのは遅れているからではない。

まだRuntime AcceptanceのEvidenceが存在しないからだ。

## 7. 今回は、まだ結論を書き切れない

ここまでの記事では、過去に起きたFailureを振り返り、その原因とCorrectionまでを書いてきた。しかしこのS2-11だけは、今の時点で最後まで書き切ることができない。

Fresh Deterministic Retry Correction Candidateは、まだRuntimeされていない。

現在確定しているのは、

```text
Repository / Draft / Published
MATCH

Canonical Launcher
CURRENT

Formal Input Binding
PASS

Fresh RV-01 Authorization
GRANTED / NOT CONSUMED

Current Candidate Runtime
NOT EXECUTED

Runtime Acceptance
PENDING
```

ここまでである。

だから「Correctionは成功した」とも、「やっぱりRuntimeでFAILした」とも書かない。どちらを書いてもEvidenceより先に結論を作ることになる。

この章の本当の続きは、Fresh RV-01を実行した後にしか書けない。

それでいい。

むしろ、**分からないことを分からないままCurrent Stateとして残せること**が、このProjectでずっと作ってきた運用の意味でもある。LatestをCurrentと混同しない。PublishedをRuntime Verifiedと混同しない。Historical RunをCurrent Candidate Evidenceへ流用しない。まだ観測していない結果を、期待や予想で埋めない。

Publishしても、実行するまで分からない。

そして実行した後も、結果を見て初めて次を決める。

Fresh RV-01は、まだ走っていない。

だからこの記事も、ここで一度止める。
