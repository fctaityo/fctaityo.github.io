# S2-03 Auditは犯人探しではない

### 📌 本記事
- **Season2 第03話：Auditは犯人探しではない**

### 関連記事はコチラ👇
- Season1（01〜09）：壊れないAI Workflowを設計する
- S2-01：Configurationはコードではない
- S2-02：Configuration Registrationとは何か

---

## 【目次】

1. 「監査」という言葉が、いちばん誤解を招く
2. 登録したConfigurationは、まだ正しいとは限らない
3. 実例：Graphは一致しているのに、AuditはBlockedだった
4. Blockedは失敗の烙印ではない
5. 別のAuditでは、Verifiedまで進んだ
6. Warning、Blocking、Unknownを分ける理由
7. Auditが残すのは、犯人ではなく次の判断材料
8. まとめ

---

## 1. 「監査」という言葉が、いちばん誤解を招く

Configuration Registrationによって、変更対象にはID、Category、Owner、Statusが与えられる。前回は、それで初めて変更が正式な管理対象になるところまで話した。では登録が終わったら、次は何をするのか。Local AI Foundryでは、そこでConfiguration Auditが出てくる。

「監査」と聞くと、どうしても身構える。何かやらかした人を探し、間違いを指摘し、合格か不合格かを言い渡す工程に見えるからだ。ワシも最初は、ずいぶん大げさな名前を付けたものだと思っていた。

だが、実際にやっていることはもっと地味だ。**登録したConfigurationが、今どこに、どんな状態で存在しているかを確認する。** それだけである。

誰が悪かったかは、Auditの判定対象ではない。昨日の判断が正しかったかどうかを裁くものでもない。現在のBaselineと、実際に観測できた状態を比べ、その差をEvidence付きで見えるようにする。Auditの仕事は、そこまでだ。

## 2. 登録したConfigurationは、まだ正しいとは限らない

前回の記事では、Configuration Registrationを「変更の入り口を管理下に置くための手続き」と説明した。名前とIDが付き、責務とRiskが記録されても、その内容が正しいと証明されたわけではない。Draft、DSL、GUI、Published、Runtimeのどこに何があり、互いに一致しているかは、まだ確認されていない。

ここでAuditが必要になる。対象となるConfiguration Itemを決め、比較するRepresentationを揃え、Baselineとして扱う情報を確認する。そのうえで、保存されている値、実装されている値、Runtimeで観測された値を比べる。

この比較で差が見つかったからといって、すぐに修正へ進むわけではない。差分の一方が間違いとは限らないからだ。Season2の01で取り上げた`CFG-A002`のように、Draft側とDSL側の双方に意味のある変更が残っている場合もある。

Auditは、差分を消す工程ではない。まず差分を分類し、何が一致し、何が競合し、何がまだ分からないのかを切り分ける工程だ。

## 3. 実例：Graphは一致しているのに、AuditはBlockedだった

2026年7月24日に行ったConfiguration Synchronization Auditでは、DraftとDSLのGraph、Prompt、Code、LLM Parametersを比較した。Graphはどちらも73 nodes、79 edgesで一致していた。ProviderとModelも一致していた。ここだけを見れば、「だいたい同じだから同期済みでよい」と言いたくなる。

ところがPromptを比べると、6つのLLM Nodeで差分が見つかった。Codeにも5つの差分があり、LLM Parametersには、保存された設定だけではRuntimeの実効値を確定できない項目が残った。さらにConclusion Retry Promptでは、Draft側の契約本文とDSL側の有効なselectorの両方を残す必要があり、どちらかを丸ごと採用する方法では解決できなかった。

このAuditの結果は`Blocked`になった。だが、Auditが作業を止めたわけではない。**すでに存在していたConflictとRuntime Driftを、Auditが見える形にした**のである。

しかも、このAuditでは同期そのものを実施していない。PromptもCodeもParameterも変更せず、比較、分類、採用候補の提示までで止めている。次の最小作業も、すべてを一気に直すことではなく、Conclusion Retry Prompt一つだけを最初の承認対象にすることだった。

この止まり方は、消極的に見えるかもしれない。だが、正本が決まっていない状態で全体を上書きするより、はるかに安全だ。

## 4. Blockedは失敗の烙印ではない

`Blocked`という言葉も誤解されやすい。作業が失敗した、設計が間違っていた、担当者が何かをやらかした。そんな印象を持ちやすいが、Configuration Managementでの意味は違う。

`Blocked`は、**現在の条件では次の同期や採用判断へ進めない**ことを示す状態だ。今回なら、Prompt、Code、LLM Parametersの採用方向が人間承認待ちであり、Runtimeの実効値にも未確認部分が残っていた。だから、正式Baselineへ採用してはいけない。

これは不合格通知ではない。「ここから先へ進むには、この条件を先に解消する必要がある」という停止線だ。止まる理由と解除条件が分かっているなら、むしろ状態は管理できている。

危ないのは、差分があることではない。差分があるのに、それを知らないまま「たぶん一致している」と進むことだ。あるいは、差分の理由が分からないのに、新しい方を正しいと決めて上書きすることだ。

Auditが`Blocked`を返した時、見つかったのは犯人ではない。次へ進めない理由である。

## 5. 別のAuditでは、Verifiedまで進んだ

すべてのAuditが`Blocked`で終わるわけではない。翌日の2026年7月25日には、Ollama Provider Settingsを対象にしたAuditを行っている。こちらでは、Difyに保存されたProvider設定だけでなく、Ollama上に同名Modelが存在すること、Hostから生成できること、Dify API containerから実際の接続経路を通って生成できることまで確認した。

結果は、Audit Resultが`Synchronized`、対象Configuration ItemのStatusは`Verified`になった。保存値が一致しているだけでなく、実際の接続と短文生成まで確認でき、対象ScopeにBlocking DriftもUnknown Driftも残らなかったからだ。

ただし、このAuditも何でも保証したわけではない。LLM NodeごとのContext、Max Tokens、Temperature、Workflow全体のE2Eは対象外として明記されている。Providerが`Verified`でも、Node設定やWorkflow Runtimeまで自動的に正しいことにはならない。

ここがAuditの大事なところだ。成功した時ほど、何が確認できて、何が確認できていないかを分ける。`Verified`は万能証明書ではなく、**定めたScopeについて必要なEvidenceが揃った**という判定である。

一つ目のAudit Resultは`Blocked`、二つ目はConfiguration Item Statusが`Verified`まで進んだ。結果は違うが、やっていることは同じだ。対象とScopeを決め、Baselineと実際の状態を比較し、Evidenceから現在のStatusを判断している。

## 6. Warning、Blocking、Unknownを分ける理由

差分は、すべて同じ重さではない。すぐに止める必要がある差もあれば、影響を把握したうえで作業を続けられる差もある。まだ理由を確定できず、判断そのものができない差もある。

そのためAuditでは、少なくともWarning、Blocking、Unknownを分けて扱う。Warningは、差や未完了事項があるものの、影響と許容範囲を説明できる状態だ。Blockingは、解消または承認されるまで次へ進めない差を示す。Unknownは、なぜその状態になっているのか、どちらを採るべきか、実効値が何なのかを確定できない状態である。

特にUnknownは扱いが難しい。間違いだと判定できるなら直せるが、何が正しいか分からなければ修正方向も決められない。更新日時が新しい、文章が詳しい、実際に一度動いた。その程度の理由で正本を決めると、別の場所に残っていた有効変更を消す可能性がある。

だから、分類は細かいほど偉いという話ではない。必要なのは、次の判断が変わる単位で分けることだ。進めてよいのか、止めるべきなのか、追加Evidenceが必要なのか。それが分かればよい。

Audit Resultは、差分の多さを採点した点数ではない。今の状態で何をしてよいかを決めるための判断材料だ。

## 7. Auditが残すのは、犯人ではなく次の判断材料

Configuration Auditをやる前は、現在の状態を説明しようとすると「たぶんDraftが新しい」「DSLも一部直してある」「Runtimeでは動いていた気がする」といった話になりやすい。どれも完全な嘘ではないが、そのままでは次の判断に使えない。

Auditを通すと、何を比較したか、どこが一致したか、どこにConflictがあるか、何が未確認か、次に誰の承認が必要かが一つの記録にまとまる。`Blocked`なら解除条件が分かり、`Verified`ならその判定が及ぶScopeが分かる。

ここで初めて、人間は判断できる。「このPromptだけ先に統合する」「Providerは採用するがNode Parameterは別に確認する」「Runtime Evidenceが取れるまで正本を決めない」といった次の一手を、推測ではなくEvidenceから選べるようになる。

Auditは作業を遅くする書類ではない。判断不能なまま進んで、後から全部をやり直すことを防ぐための道具だ。ワシらが欲しかったのは、間違いを責める仕組みではなく、**今どこまで分かっていて、何がまだ決められないかを見失わない仕組み**だった。

その意味では、Auditの最終成果物は判定そのものではない。次の判断を可能にするCurrent Stateである。

## 8. まとめ

Configuration Registrationは、変更対象を正式な管理下へ置く。Configuration Auditは、その対象が現在どんな状態にあるかをEvidence付きで確かめる。

Auditで差が見つかっても、誰かが悪いとは限らない。DraftとDSLの双方に有効な変更が残っていることもあれば、保存値だけではRuntimeの実効値を確定できないこともある。`Blocked`は失敗の烙印ではなく、次へ進むために解消すべき条件を示す停止線だ。

反対に、Evidenceが揃えば`Verified`まで進める。ただし、その判定は定めたScopeの中だけで有効であり、Project全体が完成したことを意味しない。

Auditは犯人を探さない。Baselineと現在値を比べ、Driftを分類し、人間が次の判断をできる状態を作る。その積み重ねがなければ、Project全体が今どこにいるのかも、次に何をしてよいのかも分からなくなる。

次は、AuditやTestの結果を全部並べるのではなく、Projectの現在地を30秒で判断できる形にする話、Current Snapshotへ進む。

---

※本記事は「Local AI Foundry」開発ログ Season2の03本目。Season1（01〜09）、S2-01、S2-02も合わせてどうぞ。実例は[Configuration Synchronization Audit](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-audits/CFG-20260724-002-configuration-synchronization.md)、[Ollama Provider Verification Audit](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-audits/CFG-20260725-001-ollama-provider-verification.md)、[Configuration Audit一覧](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-audits/index.md)を参照。
