# S2-08 「作った」「反映した」「Published」は全部別

### 📌 本記事
- **Season2 第08話：「作った」「反映した」「Published」は全部別**

### 関連記事はコチラ👇
- S2-07：Canonical Sourceを失った日

---

## 【目次】

1. 正本を守っても、まだ終わりではなかった
2. 「作った」はWorking Artifactができたという意味
3. Commitは「作ったものを正本へ固定した」
4. Repositoryが正しくても、DraftとPublishedは別世界
5. Publishedまで合っても、Launcherは古いままだった
6. Currentizationは「変更したもの」ではなく「依存するもの」を追う
7. 完了は一つのPASSではなく、境界ごとに確認する

---

前回は、Canonical Sourceを取得できなければ止まり、正本の一部しか見えていない状態で不足をAIの記憶から補わないという話をした。既存成果物を変更する時は、正本全文を変更元として使い、指定されたScopeだけを直し、Diffで変更対象外が残っていることまで確認する。ここまでやれば「正しい成果物を作る」ための入口はかなり安定する。

ところがProjectを進めていくと、また別の問題が出てきた。正しい成果物を作ったからといって、それがRepositoryへ反映されたとは限らない。RepositoryへCommitしたからといって、DifyのDraftへ届いたとは限らない。DraftへApplyしたからといってPublishedされたとは限らないし、Publishedされたからといって実行経路まで新しいPublishedを向いているとも限らない。

ワシはこの辺りを最初、かなり雑に「反映した」でまとめていた。だが実際には、**「作った」「正本へ固定した」「Draftへ反映した」「Publishedした」「Published Stateを検証した」「実行経路をCurrentへ合わせた」は全部別の状態**だった。

今回は、その境界が一気に見えた話である。

## 1. 正本を守っても、まだ終わりではなかった

Canonical Sourceを守る運用を作ったことで、少なくとも「古い全文を記憶で再生成して既存内容を消す」といった事故は止めやすくなった。GitHub最新版を取り、必要な範囲を完全に取得し、Minimal Changeを入れ、Diffを見る。これは既存Artifactを安全に変更するための基本になった。

しかし、その手順で良い成果物が完成しても、まだProjectの挙動は変わっていないことがある。たとえばWorkflowのPromptやRetry処理をRepository上で修正し、Testが全部PASSしたとしても、その時点でDifyのLive Workflowまで勝手に変わるわけではない。RepositoryはRepository、Dify DraftはDraft、Published WorkflowはPublished Workflowとして別々に存在しているからだ。

この違いは、文章だけを扱っている時よりWorkflowを扱う時の方が露骨に出る。MarkdownならGitHubへCommitした時点で公開正本になる運用も作れるが、DifyではRepository上のDefinitionと実際に動くWorkflowが別の層にいる。だから「Repositoryで正しい」は重要なPASSではあるものの、**Liveで正しいという意味にはならない。**

ここを一つの「反映済み」という言葉でまとめると、途中のどの層まで届いているのか分からなくなる。

## 2. 「作った」はWorking Artifactができたという意味

まず一番手前にあるのがWorking Artifactである。AIがMarkdownを修正した、Workflow DSLを直した、Promptを変更した、Testを追加した。この段階で言えるのは、**変更案ができた**ということだけだ。

Local AI Foundryでは、このWorking Treeの段階とRepository Reflectionを分けている。AIが「修正しました」「TestはPASSしました」と報告しても、そのままCommitして正本を変えるわけではない。Humanが実差分とEvidenceを確認し、採用するScopeを決め、その承認結果をRepositoryへ固定する工程を別に持つ。

```text
Working Artifact
        ↓
Review / Decision
        ↓
Repository Reflection
```

ここで大事なのは、Working Artifactが悪いとか仮物だから信用しないという話ではない。むしろHuman Reviewに出すための実体として非常に重要である。ただし、**作成済みであることと、正本として採用済みであることは別**だ。

これは以前の記事で扱ったCandidateとCurrentの関係にも似ている。新しいものが存在することと、それを現在採用することは同じではない。Artifactも同じで、作った瞬間にProjectの正式状態へ昇格するわけではない。

## 3. Commitは「作ったものを正本へ固定した」

Human Reviewを通過してRepository Reflectionへ進むと、承認済みの変更がCommitされる。ここで初めて、Working ArtifactだったものがRepositoryの履歴へ固定される。

ワシは昔、Commitをかなり「作業終了ボタン」に近い感覚で見ていた。変更して、Testして、Commitしたら終わり。しかし今の運用では、Commitは終わりではなく、**承認された成果物を正本へ固定する工程**として扱っている。

さらに、Commitコマンドが成功しただけでも終わらない。Commit SHA、Commit Message、対象ファイル、実際のDiff、承認Scopeとの一致、Git IndexやWorking Treeの状態まで確認する。Public RepositoryならPush後にGitHubから再取得して、実際に正本へ反映された内容まで見る。

```text
Commit成功
≠
承認Scopeが正しく固定された
```

だからRepository Reflectionの後にはVerificationがある。これは細かい儀式を増やしたいからではない。AIが作った内容、Humanが承認した内容、Gitが実際に固定した内容を、同じものとして扱ってよいか確認するためである。

ここまでは、まだRepositoryの中の話だ。

## 4. Repositoryが正しくても、DraftとPublishedは別世界

この境界が決定的に見えたのが、RI #1のFormal Runtime Verificationへ進む途中だった。

Conclusion Retryの失敗を調べた結果、Machineが知っている文字数、上限、必要削減量をLLMへ正しく渡すDeterministic Retry Correctionを実装した。RepositoryへCorrectionを入れ、Target TestsとRepository TestsもPASSした。Repository上では、修正は成立していた。

ところがPre-Runtime Gateで確認すると、Dify Draft / PublishedにはそのCorrectionがまだ入っていなかった。Repository側には新しいRetry Payloadが存在するのに、Live側は旧状態のままだった。

```text
Repository
CORRECTED

Draft
OLD

Published
OLD
```

これはBugではなく、ある意味では当然である。Repositoryを直す操作とDifyへApplyする操作は別だからだ。むしろ危ないのは、「RepositoryでTestが通った」という事実から「Difyも直っているはず」と飛躍することである。

そこでHumanがExact Repository CandidateのLive Apply / Publishを承認し、Current Draftへ反映してVerifyし、その結果をPublishした。Publish後にはRepository / Draft / PublishedのSemantic Graphが一致し、同じ意味のWorkflowになっていることまで確認した。

ここでようやく、

```text
Repository = Draft = Published
```

というSemantic Equivalenceが成立した。

しかし、まだ終わらなかった。

## 5. Publishedまで合っても、Launcherは古いままだった

Live Apply / Publish後、新しいPublished Workflowが生成された。Repository、Draft、PublishedのGraphは一致している。Retry Correctionも各層へ届いている。普通なら「これでRuntimeへ行ける」と思うところだった。

ところがFinal Pre-Runtime Gateが止めた。

Canonical Launcherが、まだ旧Published Workflow IDを向いていたのである。

```text
Repository
CURRENT

Draft
CURRENT

Published
CURRENT

Launcher
OLD
```

これがかなり面白かった。**意味は全部合っているのに、実行先だけが古い。**

Repository / Draft / PublishedのSemantic MatchがPASSしたことと、LauncherがCurrent Publishedを向いていることは別のGateだった。前者は「同じWorkflow内容が各層へ存在するか」を見ている。後者は「実際にRuntime Requestを送る時、どのWorkflow IDへ飛ぶか」を見ている。

```text
Semantic Equivalence
Repository = Draft = Published

Execution Binding
Launcher = Current Published
```

この二つを同じ「一致している」でまとめると、意味として正しい旧Workflowを実行してしまう可能性がある。Formal Runtimeではそれも失敗である。検証したいCurrent Candidateではなく、HistoricalなPublishedを動かしてしまうからだ。

GateはRequest送信前にMismatchを検出してSTOPしたので、誤ったRuntime実行は起きなかった。そしてHumanはすでに「承認済みCandidateから生成・検証されたPublished ResultをRuntime Targetとして使う」と決めていたため、Launcherを新しいPublished IdentityへCurrentizeする処理は新しいHuman Decisionではなく、既決定TargetへのBinding Synchronizationとして処理した。

ここでようやく、「Publishedされた」と「Publishedされたものを実行する準備が整った」が別だと完全に理解した。

## 6. Currentizationは「変更したもの」ではなく「依存するもの」を追う

このLauncher事件から、Currentizationの見方も変わった。以前は`status.md`や`active-work.md`を現在の状態へ更新するようなDocumentation作業をCurrentizationと呼ぶ感覚が強かった。しかし実際には、Current Targetが変わった時、その値に依存しているもの全体を確認する必要がある。

たとえばPublished Workflowが変わった場合、依存先にはLauncherだけでなく、Runtime Evidence Launcher、Formal Test Binding、Current Source、IVMのようなDerived View、Evidence Manifestなどが存在し得る。すべてを毎回書き換えるのではなく、それぞれについて「更新が必要」「更新不要」「Historicalとして維持」「対象外」を判断する。

ここでHistorical ReferenceをCurrentへ書き換えてはいけないのも重要である。過去のRuntime EvidenceやWar Diaryに旧Workflow IDが残っているのは間違いではない。それは当時の事実だからだ。

```text
Current Consumer
→ 新しいCurrent Identityへ同期する

Historical Reference
→ 当時のIdentityを維持する
```

つまりCurrentizationとは、新しいIDを見つけて全文検索・置換することではない。**どのArtifactがCurrent Valueへ依存し、どのArtifactが過去の事実を保存しているのかを区別して、依存関係を収束させる仕事**になる。

変更したSourceだけ見て「直した」と言っていると、この依存先を取りこぼす。RI #1でLauncherが残ったのは、まさにその形だった。

## 7. 完了は一つのPASSではなく、境界ごとに確認する

ここまでやって、ワシの中で「反映した」という言葉はかなり使いにくくなった。

```text
Working Artifactを作った
≠
Humanが採用した

Humanが採用した
≠
Repositoryへ固定された

Repositoryへ固定された
≠
DraftへApplyされた

DraftへApplyされた
≠
Publishedされた

Publishedされた
≠
Published Stateが検証された

Published Stateが検証された
≠
Execution BindingがCurrentになった
```

どれか一つが無意味なのではない。全部必要で、全部答えている問いが違う。Repository TestはRepositoryの正しさを見る。Draft ApplyはLive Candidateへ意味を運ぶ。PublishはPublished Stateを変更する。Semantic Verificationは各層の意味が一致しているかを見る。Launcher Bindingは実行先がCurrentかを見る。

だから「最後に全部まとめて確認すればいい」でもない。境界ごとに何が成立したのかを確認しながら進んだ方が、失敗した時にどこで意味が途切れたか分かる。

このSeasonで何度も出てきたのは、似た言葉を分ける話だった。LatestとCurrentを分けた。Human DecisionとMechanical Continuationを分けた。Canonical SourceとPartial Sourceを分けた。そして今回は、「作った」「固定した」「反映した」「Publishedした」「実行できる状態になった」を分けた。

分けるほど面倒になるように見えるが、実際には逆だった。境界が明確になるほど、AIへ任せられる範囲が広がる。どこまで終わったかをMachineが判定でき、どこでHuman Decisionが必要かも分かるからだ。

そして次に出てくるのは、さらに厄介な境界である。

HumanがTest Caseを決めた。Canonical Contractにも書いた。それでもExecution側が別の値を選べるなら、そのDecisionは本当に効いていると言えるのか。

**Humanが決めた値を、AIにもう一度考えさせるな。**

次は、その話をする。
