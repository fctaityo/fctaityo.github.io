# S2-10 文字数はLLMに数えさせるな（笑）

### 📌 本記事
- **Season2 第10話：文字数はLLMに数えさせるな（笑）**

### 関連記事はコチラ👇
- S2-09：Humanが決めた値を、AIにもう一度考えさせるな

---

## 【目次】

1. Humanが決めた値の次は、Machineが知っている値だった
2. 623文字を「約370文字」だと思った
3. 「20％短くして」ではContractを守れない
4. 数える・比べる・差を出すのはMachineの仕事
5. LLMへ任せるのは「意味を保って直す」こと
6. Retryは賢さではなく、責務分離で安定した
7. 「意味は自由。構造は厳格。」を実行時まで持っていく

---

前回は、Humanがすでに決めた値をExecution側でAIにもう一度選ばせてはいけないという話をした。Formal Test ID `RV-01`とExact Inputが決まっているなら、Execution側の仕事は「どのInputが良いか」を考えることではない。決定済みの値をMachine-readableにBindingし、その値以外ならRuntime前に止める。それが必要だった。

ところがRI #1のFormal Runtime Verificationでは、もう一つ似たことをやっていた。今度はHumanが決めた値ではない。**Machineがすでに正確に知っている値を、LLMにもう一度推定させていた。** 対象は、ものすごく地味である。文字数だ。そしてその結果、初回623文字だったConclusionを短くするためのRetryで、なぜか698文字になった（笑）。

## 1. Humanが決めた値の次は、Machineが知っている値だった

Formal RV-01を正しいExact Inputで実行したところ、WorkflowはConclusionのLength GateでFAILした。Conclusionには許容範囲があり、240〜420文字へ収める必要があった。しかし初回出力は623文字だった。ここまでは別におかしくない。LLMは非決定的なので、指定した長さを一発で外すことはある。そのためWorkflowにはRetryがあり、Gateを外した時はもう一度書き直す設計になっていた。問題は、そのRetryに何を渡していたかだった。

Machine側のGateは、初回出力が623文字であることを計測できている。最大値が420文字であることもContractから分かっている。つまり、最低でも203文字削減しなければならないことまで計算できる。

```text
Actual
623

Maximum
420

Required Reduction
203以上
```

この三つは推論ではない。Machineが確定できる事実である。ところがRetry Promptには、その事実が十分に入っていなかった。

## 2. 623文字を「約370文字」だと思った

Runtime Evidenceを確認すると、かなり面白いことが起きていた。モデル自身のreasoningでは、前回のConclusionを「約370文字」と認識していたのである。実際は623文字だ。倍までは違わないが、「上限420文字を203文字以上削らないといけない文章」と「すでに370文字くらいで範囲内に見える文章」では、修正方針がまるで違う。

しかもモデルは、その後に有効範囲が240〜420文字であること自体は計算できていた。つまりRangeは理解している。しかし出発点となるActual Lengthを誤認したまま書き直し、最終出力は698文字になった。

```text
Initial
623

Retry
698

Expected
240–420
```

短くするRetryで75文字増えた。ここだけ切り取ると、「LLMがアホだった」で終わらせたくなる（笑）。だがRuntime Promptまで見ると、そう単純でもなかった。Machineは623という実測値を知っていたのに、それをRetry側へ確定情報として渡していなかった。LLMは前回文章そのものを読んで、自分で「どれくらい長いか」を判断するしかなかったのである。

つまりモデル側にはInstruction Following Failureがあったが、設計側にも**Machineが知っている事実をLLMへ再推定させた問題**があった。このReview結果は、どちらか一方ではなく`MIXED`になった。

## 3. 「20％短くして」ではContractを守れない

さらに調べると、Retry StrategyはSectionごとに揃っていなかった。一部のSectionでは「約20％短縮する」といった指示が使われていた。一見すると分かりやすい。長すぎたら20％短くする。まだ長ければもう一度Retryする。人間が文章を直す時にも、これくらいの指示は普通に使う。

しかしContract Gateを通す制御として考えると、20％には根拠がない。Conclusionの初回は623文字だった。これを20％短くすると、

```text
623 × 0.8 ≒ 498
```

まだ上限420文字を超える。つまりモデルが指示どおり完璧に20％短縮できたとしても、Contract上はFAILする。ここで問題なのは「20％という数字が悪い」ことではない。固定割合のHeuristicを、現在のActual ValueとContractとの差を見ずに使っていることである。

Actualが450文字なら20％短縮で360文字になり、範囲へ入る可能性がある。しかし623文字なら足りない。900文字ならもっと足りない。必要な修正量は毎回違う。なら、毎回Machineが計算すればいい。

## 4. 数える・比べる・差を出すのはMachineの仕事

ここで責務をかなり単純に分けた。

```text
Count
Compare
Range
Delta
Direction

→ Machine
```

文字数を数える。Minimum / Maximumと比較する。どれくらい超えているかを出す。短くすべきか長くすべきかを決める。これらは全部、Codeで正確に処理できる。

一方で、

```text
Meaning-preserving Rewrite
Compression
Expansion

→ LLM
```

文章の意味を保ちながら短くする、必要な情報を落とさず圧縮する、短すぎる文章を自然に膨らませる。ここはLLMの得意分野である。この二つを混ぜない。

Retry時にはMachine側で、実測値、Minimum、Maximum、Target、超過量または不足量、修正方向、Final Retryかどうかを確定する。そしてそのPayloadをLLMへ渡す。たとえば考え方としては、

```text
actual_length = 623
minimum = 240
maximum = 420
direction = compress
required_reduction >= 203
final_retry = true / false
```

のような情報を先にMachine側で固定する。LLMへ「前の文章、長かったよ。いい感じに短くして」と頼むのではない。**今623文字で、上限420文字。最低203文字削る必要がある。その制約の中で意味を保って書き直せ。** ここまで制御情報をMachine側で持たせる。

## 5. LLMへ任せるのは「意味を保って直す」こと

この話をすると、「じゃあ文字数を超えたらCodeで420文字に切ればいいのでは？」という発想も出てくる。それはやらなかった。機械的に末尾を切れば、文字数だけは確実にContractへ入る。しかし文章として必要な結論、文の途中、重要な条件まで切れる可能性がある。

```text
Mechanical Truncation
→ Lengthは守れる
→ Meaningは壊れる可能性がある
```

今回やりたかったのは、Deterministic Controlを強くすることであって、Semantic WorkまでMachineへ奪うことではない。Machineは「何文字削る必要があるか」を決める。LLMは「その削減量を満たしながら、どこを圧縮すれば意味を保てるか」を考える。この役割分担にすると、両方の得意分野を使える。

Machineに文章を書かせない。LLMに文字数を推定させない。単純だが、この分離ができていなかった。

## 6. Retryは賢さではなく、責務分離で安定した

Correctionでは、この考え方をConclusionだけに入れて終わりにはしなかった。Introduction、Section 1、Section 2、Section 3、Conclusionの全5 Section Writing Retryへ同じ方式を横断適用した。ここも重要だった。一つのFailureだけ直すと、別Sectionで同じ種類の欠陥が残る。ConclusionではMachine-measured Factを渡すが、Section 1では20％短縮、Section 3では別の指示、という状態ではRetry Contractそのものが揃わない。

だからRetry Correction Payloadを共通化し、どのSectionでも同じControl Factを使う形へ寄せた。

```text
Actual Length
Minimum
Maximum
Target
Delta
Direction
Final Retry

→ Machine側で確定

Semantic Rewrite
→ LLM
```

さらにCharacter Count MethodもGateと同じものを使う。GateではA方式で数え、Retry側では別方式で「だいたいこのくらい」と計算したら、またControlがずれるからだ。これでRetryは、「LLMが次こそ空気を読んでくれることを期待する処理」から、MachineがCorrection条件を明示し、その範囲でLLMに書き直させる処理へ変わった。

Retryそのものが賢くなったというより、**Retryで誰が何を担当するかが明確になった**という方が近い。

## 7. 「意味は自由。構造は厳格。」を実行時まで持っていく

Local AI Foundryでは以前から、**「意味は自由。構造は厳格。」**という考え方を使ってきた。LLMには文章、発想、分析、表現の自由を残す。一方でDTO、Schema、Stage Boundary、Gateのような構造は曖昧にしない。Season 1では、その境界をWorkflow設計の中で何度も扱った。

今回のRetry Failureを見ていると、この考え方はExecution Controlにもそのまま伸びてくる。

```text
Semantic
文章の意味
表現
圧縮方法
言い換え
分析

→ LLM

Deterministic Control
文字数
範囲
差分
方向
Retry回数
ID
Binding

→ Machine
```

この分け方を、現在はWorking Nameとして`Deterministic Control Boundary`と呼んでいる。ただし`Fixed Decision Binding`と同じく、これもRI #1だけを根拠にFoundry全体の正式Architectureとして確定したわけではない。別のReference Implementationでも同じ境界が効くかを見てから判断する。

それでも今回の事例から言えることはかなり明確だった。AIに何でも考えさせれば賢いSystemになるわけではない。Humanが決めた値は再選択させない。Machineが知っている事実は再推定させない。そのうえで、意味を作る仕事は思い切りLLMへ任せる。そうした方が、AIの自由を減らすどころか、**本当にAIへ任せたい場所だけ自由にできる。**

そしてここまでRepository、Draft、Published、Launcher、Formal Input、Retry Controlを揃えても、まだ最後の問題が残る。全部正しく見えている。Publishedもしている。でも、実際のRuntimeで成功するかは、まだ分からない。次は、**Publishしても、実行するまで分からない。** という話をする。
