# S2-05 「最新」はCurrentではない

### 📌 本記事
- **Season2 第05話：「最新」はCurrentではない**

### 関連記事はコチラ👇
- [S2-04：Current Snapshotは進捗表ではない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-04_Current%20Snapshot%E3%81%AF%E9%80%B2%E6%8D%97%E8%A1%A8%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84.md)
- [S2-07：Canonical Sourceを失った日](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-07_Canonical%2520Source%E3%82%92%E5%A4%B1%E3%81%A3%E3%81%9F%E6%97%A5.md)
- [S2-08：「作った」「反映した」「Published」は全部別](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-08_%E3%80%8C%E4%BD%9C%E3%81%A3%E3%81%9F%E3%80%8D%E3%80%8C%E5%8F%8D%E6%98%A0%E3%81%97%E3%81%9F%E3%80%8D%E3%80%8CPublished%E3%80%8D%E3%81%AF%E5%85%A8%E9%83%A8%E5%88%A5.md)

---

## 【目次】

1. Current Snapshotを分けた。次は「何を基準に見る？」
2. Projectには「新しいもの」がいくらでも増える
3. 最新Commitが、現在の基準とは限らない
4. Candidateを作ってもCurrentは動かさない
5. Active Baselineは一つだけ
6. Historicalは失敗作置き場ではない
7. 「新しいEvidence」と「Current Evidence」も違う
8. Currentとは、採用されているという意味だ

---

前回は、Current Snapshotを一枚の進捗表にしてはいけないという話をした。Project全体がLifecycle上どこまで進んだのかを示す`status.md`と、現在の作業をどこから再開するのかを示す`active-work.md`では、そもそも答える問いが違う。どちらも「今」を扱っているが、同じCurrentではない。

この仕組みを作ったことで、Projectへ戻った時の迷子はかなり減った。ところが、Currentという言葉について考えていくと、もう一つ厄介な問題が残っていた。Projectの中には、新しいものが次々に増える。新しいCommit、新しいDraft、新しいPublished Workflow、新しいTest結果、新しいRuntime Evidence。では、その中で一番新しいものをCurrentとして扱えばいいのか。答えは違った。

今回は、ワシが**「最新」と「現在採用中」を分けるためにActive Baselineを必要とした話**である。

## 1. Current Snapshotを分けた。次は「何を基準に見る？」

Current SnapshotをProject StateとActive Workへ分けると、Project全体の現在地はかなり見やすくなる。たとえばワシのProjectでは、こんな表示がある。

```text
Project State
Published

Active Baseline
BL-20260801-001
```

`Published`はLifecycle上の現在地であり、`BL-20260801-001`はその現在地を判断する時に使っているBaselineである。

ここで最初の頃のワシは、Baselineというものをかなり雑に考えていた。なんとなく「今ある一番新しいやつ」くらいの認識だった。Gitで開発しているなら最新Commit、Difyなら最新Draft、WorkflowをPublishしたなら最新Published。それを追いかけていけばCurrentも分かるように思える。

だが、実際にはそうならなかった。なぜならProjectでは、**次の候補を作ることと、現在の基準を切り替えることが同時には起きない**からだ。

## 2. Projectには「新しいもの」がいくらでも増える

開発を続けていると、新しいArtifactは容赦なく増える。RepositoryではCommitが増える。DifyではDraftが更新される。修正を反映してPublishすれば新しいPublished Workflowができる。Testを実行すれば新しい結果が残り、Runtimeを動かせば新しいRun IDやEvidenceが生まれる。

時系列だけを見れば、それぞれに「最新」が存在する。

```text
Latest Commit
Latest Draft
Latest Published
Latest Test
Latest Runtime Run
```

問題は、これらが全部同じ意味の「最新」ではないことだった。たとえば新しい変更をRepositoryへ入れたとしても、まだReview中かもしれない。DraftへImportしていてもSemantic Verificationが終わっていないかもしれない。Runtime Runが一番新しくても、そのRunが現在検証しているCandidateとは別の古い構成で実行されたものかもしれない。

時刻が新しいというだけでは、そのArtifactを現在の判断基準として使ってよい理由にはならない。ここで必要になったのが、Baselineを単なる時系列ではなく、**「何を現在採用しているか」**として扱う考え方だった。

## 3. 最新Commitが、現在の基準とは限らない

Gitを使っていると、特に「最新＝正しい」に引っ張られやすい。RepositoryのHEADを見れば、一番新しいCommitはすぐ分かる。そのCommitには直前まで無かったCorrectionが入り、Testも増え、Documentationも更新されている。だから、それが一番進んだ状態であること自体は間違っていない。

しかし、「一番進んでいる」と「現在採用している」は別である。たとえば、現在使っているBaselineとは別に、次の変更候補を作ったとする。

```text
Current Active Baseline
        │
        ├─ 現在採用中
        │
        └─ 新しい変更を作る
                 ↓
             Candidate
```

Candidateでは、Repository変更もできる。Auditもできる。ReviewもTestもできる。むしろ、それらを十分にやらないと採用判断はできない。それでもCandidateを作った瞬間に、CurrentをCandidate側へ動かしてはいけない。なぜなら、そのCandidateはまだ**「採用候補」**だからだ。

もし「新しいCommitができたから」という理由だけでCurrentを切り替えれば、ReviewでRejectされたCandidateやTestで失敗したCandidateまで、一瞬Currentだったことになってしまう。GitのHEADは技術的な現在地点を示せるが、それだけでProjectが何を採用しているかまでは決められない。

## 4. Candidateを作ってもCurrentは動かさない

そこでBaselineには役割を持たせた。大きく分けると三つある。

```text
Candidate
次に採用するかもしれない候補

Active
現在採用している基準

Historical
以前Activeだった基準
```

Candidateは未来の可能性である。新しいPromptを試してもいい。Workflowを直してもいい。Documentationを更新してもいい。Testを実行し、Auditを取り、Reviewを行ってもいい。ただし、その作業が進んでもActive Baselineは自動では変わらない。

これは最初かなり回りくどく見えた。「どうせ次にこれを使うんだから、もうCurrentでよくない？」と思いたくなる。しかし、この区別がないとCandidateの途中状態までProjectの正式状態へ入り込む。修正中だからCurrent、TestでFAILしてもCurrent、Correction中もCurrent、Reviewで内容が変わってもCurrent、となれば、Currentは「現在採用しているもの」ではなく、単に**「今いじっているもの」**になってしまう。

前回の記事でProject State Current SnapshotとActive Work Current Snapshotを分けたのと同じで、ここでも責務を分ける必要があった。**作業対象であることと、採用対象であることは別なのだ。**

## 5. Active Baselineは一つだけ

Active Baselineには、もう一つ重要な条件がある。**同時に一つしか存在しない。**

これが意外と大事だった。もしActive Baselineが二つあれば、Projectについて何か判断するたびに「どっちのBaseline？」という問いが発生する。RuntimeはA、DocumentationはB、Published WorkflowはAだけど最新AuditはB、といった状態を許せば、Evidenceを見ても何に対する証拠なのか分からなくなる。

だからActive Baselineは、**現在、このProjectが判断基準として採用している唯一のBaseline**として固定する。Candidateが10個あっても構わないし、Historicalが何個残っていても構わない。だがCurrent Snapshotから見えるActiveは一つだけである。

そしてCandidateをActiveへ変える時には、人間の判断を挟む。AIはTest、Audit、Review、Evidenceを揃え、「このCandidateならActiveへ移せそうだ」という候補を提示することはできる。しかし、それらはあくまで判断材料である。どのCandidateを現在採用するかは、単純な時刻順や「Testが通ったから」という一条件だけでは決めない。

## 6. Historicalは失敗作置き場ではない

Active Baselineを切り替えると、それまで使っていたActiveはHistoricalになる。ここでHistoricalという言葉も、最初は「古いやつ」くらいに見える。しかし、単なるゴミ箱ではない。

Historicalは、以前そのProjectが正式に採用していたBaselineであり、その時点で取得したEvidenceや判断を理解するためのAnchorになる。

```text
Candidate
   ↓
Human Decision
   ↓
Active
   ↓
次のBaselineを採用
   ↓
Historical
```

Historicalを残しておけば、過去のRunやAuditを見た時に、「このEvidenceは、どの状態を検証していたものなのか」を追跡できる。逆に、Baselineを持たず「その時の最新版」で済ませると、数週間後には当時の「最新版」が何だったのか分からなくなる。

さらに厄介なのは、Historicalが必ずしも失敗したBaselineとは限らないことだ。以前は正しくActiveだった。ただ、その後に別のBaselineが採用されたからHistoricalになっただけである。Historicalは「悪いもの」ではなく、**以前採用されていたもの**である。状態を示す言葉と評価を混ぜないことも、Projectを追跡しやすくするためには重要だった。

## 7. 「新しいEvidence」と「Current Evidence」も違う

この区別は、最近のRuntime Verificationでも何度も効いた。ワシのProjectには過去に実行したRuntime Runが残っている。Run IDもEvidenceもあり、結果がFAILだったものもある。その後Workflowを修正すると、新しいCandidateは当然まだRuntimeで実行されていない。

この時、Repositoryを見れば新しい。Published Workflowも新しい。しかしRuntime Evidenceを時刻順に並べれば、一番新しいEvidenceは修正前のRunだったりする。

ここで、

```text
Latest Runtime Evidence
=
Current Candidate Runtime Evidence
```

と扱ったらアウトである。

修正前のWorkflowで取得したFAIL Evidenceを、修正後CandidateのRuntime結果として使うことはできない。だから現在のProjectでは、過去Runについて`Current Candidate Binding = false`のように区別している。

Evidenceが存在するかどうかだけでは足りない。**そのEvidenceが何に対するEvidenceなのかまでひも付いていなければならない。**

これはActive Baselineの考え方とかなり似ている。新しいものを探すのではなく、**現在の判断対象へ正しくBindingされているものを探す。** Currentを決める時に必要なのは、時刻ではなく関係性だった。

## 8. Currentとは、採用されているという意味だ

ここまで運用してみて、Baselineに対するワシの認識はかなり変わった。最初はVersion番号やCommit SHAをまとめるための識別子くらいに思っていた。しかし実際に必要だったのは、Projectの中に大量に存在する「新しいもの」から、**現在どれを判断基準として使っているのかを一意にする仕組み**だった。

Candidateは新しくていい。Activeより先へ進んでいてもいい。TestもReviewもどんどんやればいい。それでも採用されるまではCandidateである。逆にHistoricalは古くても消してはいけない。過去のEvidenceが何を意味していたのかを理解するために必要になる。

つまり、`Latest`は時刻やRevisionとして新しいという意味であり、`Current`は現在の判断基準として採用されているという意味になる。この二つは同じではない。

前回、Current Snapshotを整理した時に「今は一種類ではない」と書いた。今回さらに分かったのは、**「今」は新しさでも決まらない**ということだった。

新しいものを作るのはAIでもできる。Candidateを大量に比較することもできる。AuditやTestを回し、どれが採用候補になり得るか整理することもできる。だが、「これを現在の基準として扱う」と決める操作には別の責任がある。

Currentとは、最新であることではない。**現在、採用されているという意味なのだ。**
