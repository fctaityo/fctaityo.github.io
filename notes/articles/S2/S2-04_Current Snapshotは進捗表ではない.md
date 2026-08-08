# S2-04 Current Snapshotは進捗表ではない

### 📌 本記事
- **Season2 第04話 Current Snapshotは進捗表ではない**

### 関連記事はコチラ👇
- **03 Auditは犯人探しではない**

---

## 【目次】

1. 「差分」は分かった。で、今どこ？
2. 最初は一枚の進捗表に全部入れたくなる
3. Projectと作業は、同じ速度では進まない
4. 正しいstatus.mdを見て、ワシは作業場所を見失った
5. Current Snapshotを二つに分けた
6. Active Workも進捗表にはしない
7. 30秒で戻れればいい
8. 「今」は一種類ではない

---

前回は、Configuration Auditの話をした。ExpectedとActualを並べ、どこにDriftがあるのかをEvidence付きで確認する。Auditの目的は誰かの失敗を責めることではなく、「いま目の前にある状態」と「期待している状態」の差を、人間が判断できる形にすることだった。

ここまで来ると、Projectの状態はかなり追いやすくなる。何が管理対象なのかが分かり、Configurationとして登録され、Auditを見れば差分まで辿れる。ワシ自身、「これならProjectの状態を見失うことはないだろう」と思っていた。

ところが、実際の開発を続けていると別の問題が出てきた。差分は分かる。それでも、別作業を挟んで戻ってきた時に「どこから再開すればいいのか」が分からない。今回は、その時に初めて見えたCurrent Snapshotの話である。

## 1. 「差分」は分かった。で、今どこ？

Auditを整備すると、Projectの状態はかなり詳しく追える。何を基準に確認したのか、実際はどうだったのか、差分はBlockingなのかWarningなのか。必要ならEvidenceまで降りて確認できる。

ただ、詳しく追えることと、すぐに作業へ戻れることは同じではない。Gitの履歴もAuditもReportもADRも揃っていれば、全部読み直すことで過去に何が起きたかは分かる。だが、Projectへ戻るたびにそこまで読まないと次の作業が特定できないなら、復帰のための仕組みとしては重い。

ワシが欲しかったのは過去の全履歴ではなく、「Project全体はいまどの状態なのか」と「いま進めている作業はどこまで終わっていて、次に何をするのか」を短時間で確認できることだった。当時は、この二つをまとめてCurrent Snapshotへ載せれば済むと思っていた。

## 2. 最初は一枚の進捗表に全部入れたくなる

Current Snapshotと聞くと、「いまの状況をまとめた一覧」を作りたくなる。Project State、現在のPhase、Active Baseline、Runtimeの状態、Blocker、最近終わった作業、次の作業、担当中のCommit。全部一枚に並んでいれば便利そうに見えるし、発想としては普通の進捗表やDashboardに近い。

問題は、その一枚に性質の違う「現在」が混ざり始めることだった。ProjectにはLifecycle上の正式な状態があり、Stateが変わった、Baselineが切り替わった、次のGateはRuntime Verificationである、といった情報は、会話が少し進んだりMarkdownを一枚直したりした程度では変わらない。

一方、日々の作業地点はよく変わる。Commit 1が終わり、Commit 2が終わり、次はCommit 3。途中で別件へ移れば、戻ってきた時の再開地点も変わる。これも「現在」ではあるが、Project Stateと同じ速度では動いていない。

## 3. Projectと作業は、同じ速度では進まない

Project Stateは、Project全体のLifecycle上の到達地点を表す。正式な条件やEvidenceが揃い、必要な判断を経た時に変わるため、更新頻度は低い。それに対して作業地点は、Checkpointの完了、Next Actionの変更、Blockerの発生、Interruptといったタイミングで動くため、更新頻度が高い。

この二つを一枚へ押し込むと、どこかで無理が出る。作業地点が変わるたびにProject StateのSnapshotまで更新すれば、「ProjectはいまどのStateなのか」を示す文書へ日々のCommitや作業経過が混ざり、少しずつ作業ログへ近づいていく。

逆に、Project Stateが変わった時だけSnapshotを更新する契約を守れば、今度は作業地点が残らない。Project全体の現在地は分かるのに、次に何をすればいいのかが分からない。この違いをワシが本当に理解したのは、実際に作業場所を見失った時だった。

## 4. 正しいstatus.mdを見て、ワシは作業場所を見失った

2026年8月2日、Documentation Information Architectureの実装を進めていた。Documentation全体を責務別に再編する作業で、いきなり全ファイルを動かすのではなく、Scopeを分けて段階的にCommitする計画だった。

Commit 1ではInformation Architecture本体やADR、Configuration Item、Audit、Reportなどを反映し、Local Commit Verifyまで完了した。続くCommit 2では、Contracts責務に従って3つの文書を`docs/contracts/`へ移動し、こちらもVerifyまで終わっていた。その時点の作業断面は単純だった。

```text
Documentation IA Implementation

Commit 1  完了
Commit 2  完了
Commit 3  次にやる
```

そこで一度作業を止め、溜まっていたnotesの整理へ移ることにした。別作業を挟む前に、いつものように`status.md`を確認すると、Project全体の状態はきちんと記録されていた。

```text
Project State       Published
Active Baseline     BL-20260801-001
Runtime Status      Not Executed
Runtime Acceptance  PENDING
Next Gate           Runtime Verification
```

何も壊れていない。`status.md`は契約どおり正しく動いていた。それでも、ワシが知りたかった「Documentation IAはCommit 2まで終わっている」「次はCommit 3から再開する」という情報は、そこにはなかった。

最初は`status.md`に情報が足りないのではないかとも考えたが、そうではなかった。Commit 1、Commit 2、Commit 3と通常作業の進捗を書き始めれば、Project State専用に整理したCurrent Snapshotを再び作業ログへ戻すことになる。問題は`status.md`ではなく、ワシが一つのSnapshotに二つの責務を持たせようとしていたことだった。

```text
Project State Current Snapshot
≠
Active Work Current Snapshot
```

この区別は、設計図を眺めている時ではなく、正しい`status.md`を見ながら作業場所を見失った時に初めて必要性が確定した。

## 5. Current Snapshotを二つに分けた

そこで、Current Snapshotを一つへ集約する発想をやめた。`status.md`はProject State Current Snapshotとして残し、Project全体がLifecycle上どこまで到達しているかを示す。一方で、新しく`active-work.md`を作り、現在進めている一つのInitiativeについて、どこまで終わり、どこから再開するかを示すことにした。

当時のActive Work Snapshotに必要だった情報は、この程度だった。

| Field | Value |
| --- | --- |
| Initiative | Documentation Information Architecture Implementation |
| Status | Paused |
| Completed Checkpoint | Commit 1 / Commit 2 Completed |
| Next Action | Commit 3のScope確認とWorking Tree作成 |
| Blocker | None |
| Human Decision | None |

これなら、Projectへ戻った時に`status.md`で正式状態を確認し、`active-work.md`で作業の復帰地点を確認できる。二つに分けたことで情報が散ったようにも見えるが、実際には責務が分かれたことで、それぞれのSnapshotが何に答える文書なのかが明確になった。

Single Source of Truthは、すべての情報を一枚へ集めるという意味ではない。同じ意味の正本を複数作らないことが重要なのであって、異なる責務を持つ情報まで同じArtifactへ詰め込む必要はない。

## 6. Active Workも進捗表にはしない

`active-work.md`を作ると、今度はそこへ作業履歴を全部書きたくなる。昨日は何をした、今日はどこまで進んだ、Commit SHAは何か、次の候補はいくつあるか、終わったInitiativeも残しておこう、と情報を増やせば増やすほど一見便利そうに見える。

だが、それを始めるとActive Workも日報、Backlog、Roadmap、Commit履歴、Archiveを兼ね始める。情報量は増えるが、「どこから再開すればいいか」を確認する速度は落ちる。そこで、Active Workには何を持たせないかも明確にした。

Project StateやActive Baseline、Runtime状態は`status.md`側の責務であり、細かな履歴はGitにある。判断のEvidenceはAuditやReport、Review Packageへ、設計理由はADRへ、出来事の経緯はWar Diaryへ残せる。`active-work.md`まで同じ情報を抱える必要はない。

Active Workに残すのは、Current Initiative、Completed Checkpoint、Next Action、Blocker、Human Decisionなど、Interrupt後の復帰に必要な最小断面だけでいい。ここから生まれた原則が、**Active Workは進捗表ではない。Interrupt後に再開するためのBookmarkである。** というものだった。

## 7. 30秒で戻れればいい

ワシがCurrent Snapshotに求めているのは、情報量より理解速度である。Projectへ戻った時、30秒程度で次の問いに答えられればいい。

```text
Project全体はいまどこ？
次の正式Gateは何？
いま何の作業をしている？
どこまで終わった？
次に何をする？
止めているものはある？
人間の判断待ちはある？
```

詳しい理由が必要になったら、その後でEvidenceへ降りればいい。Current SnapshotはAuditやCommit履歴を置き換えるものではなく、必要なEvidenceへ最短で入るための入口でもある。

この考え方にしてから、Documentationを見る基準も少し変わった。情報をどれだけ保存しているかだけでなく、「この文書は何の問いに答えるのか」を先に考えるようになった。`status.md`はProject全体の正式状態に答え、`active-work.md`は現在作業中の復帰地点に答える。問いが違うから、Artifactも分ける。

全部入りDashboardは最初こそ便利に見える。ただ、異なる速度で変わる情報を同じ場所へ足し続けると、やがて一枚の中で何が正式状態で、何が単なる作業経過なのか分かりにくくなる。Current Snapshotを軽く保つのは、見た目を整えるためではなく、判断速度を落とさないためでもある。

## 8. 「今」は一種類ではない

今回の失敗で分かったのは、ワシ自身がCurrent Snapshotという言葉に引っ張られていたことだった。「Currentなのだから、一番新しい情報を一か所へ集めればいい」と考えていたが、Projectには性質の違う複数の「今」がある。

Project全体がLifecycle上どこまで進んだのかという現在地と、現在のInitiativeをどこから再開するのかという作業地点は、どちらも現在を表している。ただし、更新される理由も必要なEvidenceも読む目的も違うため、一つへまとめる必要はなかった。

```text
status.md
→ Project全体の到達状態

active-work.md
→ 現在作業中の復帰地点
```

大事なのはCurrent Snapshotを一つにすることではなく、**そのArtifactが何のCurrentを表しているのかを明確にすること**である。

そして今回のActive Workは、Documentation IAを設計した時点から用意していたわけではない。Commit 2まで作業し、別件へInterruptしようとした時に「戻る場所が分からない」という不足が初めてEvidenceとして現れた。その不足を受けて新しい責務を追加した。

```text
実運用する
↓
不足が起きる
↓
責務を分ける
↓
必要なContractやDocumentationを育てる
```

管理項目を増やしたかったのではない。戻れなかったから、戻れるようにした。この順番は、Local AI Foundryで仕組みを増やす時の重要な基準になりつつある。

Project全体の現在地と作業地点は、これで分けられた。では次に、RepositoryへDraftやCommit、Import結果が増えていった時、その中のどれを「いま採用している基準」として扱うのかという問題が残る。

一番新しいものが、そのまま正しい基準になるとは限らない。

次回は、**「最新」と「採用中」は同じではない**という話をする。

---

※本記事はLocal AI Foundryの実開発で発生した、Documentation Information Architecture実装中のInterrupt Recoveryをもとに構成している。

一次記録：
- [WD-20260802-001 Project Snapshotでは作業断面へ戻れなかった](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/war-diary/WD-20260802-001-project-snapshot-and-active-work.md)
- [CM-20260802-002 Project SnapshotとActive Work Snapshotを分離する](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/configuration-management/CM-20260802-002-project-snapshot-and-active-work.md)

関連する設計・Configuration Evidence：`ADR-0012` / `CFG-D005` / `CFG-20260802-007`
