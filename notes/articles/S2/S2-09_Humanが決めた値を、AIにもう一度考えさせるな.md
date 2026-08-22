# S2-09 Humanが決めた値を、AIにもう一度考えさせるな

### 📌 本記事
- **Season2 第09話：Humanが決めた値を、AIにもう一度考えさせるな**

### 関連記事はコチラ👇
- [S2-06：Human Decisionは多ければ安全になるわけではない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-06_Human%2520Decision%E3%81%AF%E5%A4%9A%E3%81%91%E3%82%8C%E3%81%B0%E5%AE%89%E5%85%A8%E3%81%AB%E3%81%AA%E3%82%8B%E3%82%8F%E3%81%91%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84.md)
- [S2-10：文字数はLLMに数えさせるな（笑）](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-10_%E6%96%87%E5%AD%97%E6%95%B0%E3%81%AFLLM%E3%81%AB%E6%95%B0%E3%81%88%E3%81%95%E3%81%9B%E3%82%8B%E3%81%AA%EF%BC%88%E7%AC%91%EF%BC%89.md)
- [S2-11：Publishしても、実行するまで分からない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-11_Publish%E3%81%97%E3%81%A6%E3%82%82%E3%80%81%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%E3%81%BE%E3%81%A7%E5%88%86%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84.md)

---

## 【目次】

1. Publishedまで揃った。今度は「何を実行するか」で壊れた
2. RV-01は、もうHumanが決めていた
3. AIに残っていたのは「判断」ではなく「選び直す余地」だった
4. 決める前はAIに考えさせる。決めた後は固定する
5. Human Decisionは、情報ではなくExecutionを拘束する
6. MismatchはRuntimeの前で止める
7. 「判断を任せる」と「決定を守らせる」は別の仕事

---

前回は、正しい成果物を作ったこと、Repositoryへ固定したこと、Draftへ反映したこと、Publishedしたこと、そして実行経路までCurrentへ揃えたことは全部別だという話をした。Repository / Draft / Publishedの意味が一致していても、Canonical Launcherが旧Publishedを向いていればCurrent Candidateは実行されない。だから実行地点までBindingを確認する必要があった。

そこまで直して、ワシらはようやくFormal Runtime Verificationへ進んだ。今度こそ「実際に動かして確認する」段階である。

ところが、そこでまた止まった。

今度の問題はPublishedでもLauncherでもなかった。**実行するTest CaseそのものはHumanがすでに決めていたのに、Execution側が別のInputを選べる状態だった。**

これ、後から見るとかなり単純である。

Humanが決めた値を、AIにもう一度考えさせていた。

## 1. Publishedまで揃った。今度は「何を実行するか」で壊れた

Formal Runtime Verificationでは、適当にWorkflowを一回動かして「動きました」で終わるわけにはいかない。どの条件で何を入力し、何をもってPASS / FAILとするかを事前に固定したFormal Test Caseが必要になる。

ワシらのRI #1では、`RV-01`、`RV-02`、`RV-03`というFormal Test CaseをHuman側で定義していた。それぞれには実行時に使うInputがあり、少なくともFormal RVとして扱うなら、そのTest Caseに対応するExact Inputを使わなければならない。

つまりHuman側のDecisionは、すでに終わっていた。

```text
Formal Test
RV-01

Input
RV-01として定義されたExact Input
```

にもかかわらず、最初のFormal RV-01候補ではgeneric E2E fixtureが使われた。Workflow自体は実行され、Runも生成された。しかしInputがFormal RV-01として定義したものではない以上、その結果をFormal RV-01のEvidenceとして採用することはできない。

このRunはFormal Input Binding Mismatchとして無効扱いになった。

ここで大事なのは、「AIが難しい判断を間違えた」という話ではないことだ。そもそも、その場で判断する必要がなかった。

## 2. RV-01は、もうHumanが決めていた

この事故を見た時、最初は「実行時のInput選択をもっと厳密にしよう」という程度の問題にも見えた。だが考えてみると、もう少し根が深かった。

HumanはFormal Test Caseを定義していた。`RV-01`という名前だけではなく、そのTestで何を入力するかも決めている。つまりExecution側に必要なのは、「どのInputが良さそうか」を考えることではない。

必要なのは、

```text
RV-01
↓
RV-01にBindingされたExact Input
```

をそのまま解決することだった。

ところが修正前の実行側には、Formal RunでありながらInput Sourceを選択できる余地が残っていた。generic E2E fixtureも使える。別のRuntime Caseを指定する余地もある。Humanが上流で一意に決めた後も、Execution Pointでは候補集合が残っていた。

この状態では、Human Decisionが存在していても実行を拘束していない。

```text
Human Decision
→ 「RV-01ではこのInputを使う」

Execution
→ 「どのInputを使おうかな？」
```

いや、考えるなよ（笑）。

そこ、もう決まっとる。

## 3. AIに残っていたのは「判断」ではなく「選び直す余地」だった

AIへ仕事を任せる話をすると、「AIの裁量をどこまで残すか」という話になりやすい。ワシ自身、AIの推論や提案能力はできるだけ活かしたいと思っている。候補を出す、比較する、原因を分析する、代替案を考える。そういう仕事では、AIに選択肢があることは強みになる。

しかし、すでに決定済みの値について同じ自由を残すと、意味が変わる。

たとえばHumanが三つのCandidateを比較してAを採用したとする。

```text
Candidate A
Candidate B
Candidate C

Human Decision
→ A
```

この後のExecutionでAIへ、

```text
A / B / Cのどれを使いますか？
```

と聞く必要はない。そこでBを選べるなら、Human Decisionは採用結果ではなく「参考情報の一つ」に戻ってしまう。

RI #1のFormal RVで起きたことも同じだった。`RV-01`とExact Inputが決まっているのに、Execution側にはgeneric fixtureを選べる余地があった。

問題はAIに裁量を与えたことではない。

**裁量を置く場所を間違えたことだった。**

この障害パターンはBug Zooで`BZ-20260814-020 Humanが決めた値をAIが再選択する`として整理した。そこでのRoot Causeはかなり端的で、Human Decisionを「情報」として記録しただけで、Execution Pointへ機械的にBindingしていなかったことだった。

## 4. 決める前はAIに考えさせる。決めた後は固定する

ここを整理すると、AIの裁量を消す話ではないことが分かる。

たとえばFormal Test Caseを設計する前なら、AIに候補を出させていい。

```text
どんなTest Caseが必要か
どのInputが境界条件を踏めるか
どの順番で試すか
何をRiskとして見るか
```

AIに分析させ、Humanがそれを見て選ぶ。この段階では探索が仕事である。

しかしHumanが`RV-01`とExact Inputを確定したら、Execution Stageの仕事は変わる。

```text
Decision前
探索 / 比較 / 推奨

Decision
Human / Canonical Contract

Decision後
固定値をBindingして実行
```

つまり、同じAIを使っていても、Stageによって求める能力が違う。決定前は「考える能力」を使う。決定後は「決まったことを変えずに運ぶ能力」が必要になる。

ここを一緒にすると、AIは親切にもう一度考える。

もっと一般的なfixtureの方が良いかもしれない。別のInputの方がテストしやすいかもしれない。過去に使ったE2E Caseがあるから、それを流用できるかもしれない。

Semantic Workなら、その柔軟さは価値になる。

だがFormal Executionでは、その「良かれと思って」がContract違反になる。

## 5. Human Decisionは、情報ではなくExecutionを拘束する

この事故の後、Formal Runの入口を修正した。任意のRuntime Caseを選べる形をやめ、Formal RunではFormal Test IDを指定する。そしてTest IDからMachine-readableなCanonical Artifactを使ってExact Inputを解決する。

考え方としてはこうなる。

```text
Human / Canonical Decision
        ↓
Formal Test ID
        ↓
Machine-readable Binding
        ↓
Exact Input
        ↓
Execution
```

Execution側は、Inputを発明しない。より良いInputを探さない。HumanのDecisionを解釈して「たぶんこういう意味だろう」と補完もしない。

Test IDから決められた値を解決する。

この考え方を、現在のProjectではWorking Nameとして`Fixed Decision Binding`と呼んでいる。ただし、これは今のところFoundry全体の正式Architecture名として確定したものではない。RI #1で見えたPatternに名前を付け、別のReference Implementationでも同じ問題が再現するか確認している段階である。

名前より重要なのは、ルール自体だ。

**HumanまたはCanonical Contractが一意に決めた値を、後段で再探索・再推論・再選択させない。**

Human DecisionをDocumentationへ書いて終わりにせず、Execution Pointでその値以外を使えないところまで持っていく。

## 6. MismatchはRuntimeの前で止める

Bindingを入れるなら、Mismatchをどこで検出するかも重要になる。

一番まずいのは、間違ったInputでRuntime Requestを送った後に「違いました」と気づくことである。Formal VerificationならEvidenceが汚れるし、One-shot Authorizationがある場合は実行許可の扱いまで複雑になる。外部APIやCredentialを使う処理なら、不要なSide Effectまで起こり得る。

だからFormal Input Bindingでは、Executionのかなり手前で照合する。

```text
Formal Test ID
        ↓
Expected Exact Input
        ↓
Actual Binding
        ↓
MATCH ?
   ├─ Yes → 次へ
   └─ No  → STOP
```

MismatchならCredential解決やHTTP Requestより前に止める。

これは「失敗しないように頑張る」仕組みではない。むしろ、**間違った状態なら確実に実行しない**ための仕組みである。

AI Systemでは、賢く正解を推測させるより、間違った値を使えない構造にした方が強い場面がある。特にID、Target、Baseline、Test Input、Thresholdのように、すでに正解が一つへ決まっている値はそうである。

ここでは推論精度を上げても根本解決にはならない。

選択肢そのものを消す。

## 7. 「判断を任せる」と「決定を守らせる」は別の仕事

この一件で、AIへ仕事を委譲する時の境界がまた一つ見えた。

ワシはAIに判断させたくないわけではない。むしろ考える仕事はかなり任せたい。大量のEvidenceを読み、候補を比較し、Root Causeを分析し、Correction案を出し、Humanが判断できる材料まで整理する。人間だけで全部やるより、AIを使った方が圧倒的に速い。

ただし、HumanがDecisionした後まで同じ探索モードを引きずらせてはいけない。

```text
Before Decision
AIは考える

At Decision
Human / Canonical Contractが固定する

After Decision
MachineがBindingを守る
```

この三つは同じ「AIに任せる」の中に見えて、責務が違う。

Humanが全部を操作する必要はない。前回書いた通り、決定済みの範囲はAI / CODEXが自律的に完遂すればいい。ただし自律的に完遂することと、決定済みの値を勝手に再選択することは別である。

自由に考えてほしい場所では、自由に考えさせる。

決まった値を守る場所では、考え直させない。

この区別は、Human Authorityを強くするためにも必要だった。Humanが一度決めたことをExecution側が毎回再解釈するなら、最終的に何を決めたのがHumanなのか分からなくなる。逆に、Decision後の値が機械的にBindingされていれば、Humanは細かい実行操作から離れても、そのDecisionはExecution Pointまで残る。

そして、この話を進めると次の疑問が出てくる。

Humanが決めた値だけではない。

**Machineがもう正確に知っている値まで、なぜLLMにもう一度考えさせるのか。**

今回のFormal RVでは、文字数をMachineが計測できていた。それなのにRetry側では、LLMが前回出力の長さを推定していた。

結果、623文字を約370文字だと思い込んだ。

次はもっと単純な話である。

**文字数はLLMに数えさせるな（笑）。**
