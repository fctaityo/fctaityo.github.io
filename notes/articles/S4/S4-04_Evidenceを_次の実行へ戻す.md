# S4-04 Evidenceを、次の実行へ戻す

### 📌 本記事

- **Season 4 第4話：Evidenceを、次の実行へ戻す**

### 前回までの流れ👇

- Season 4 第1話：AIは、前回の失敗を覚えていなかった
- Season 4 第2話：ログを残しただけでは、経験にはならない
- Season 4 第3話：成功より、失敗の方が役に立った

---

## 【目次】

1. Patternができても、次の実行はまだ変わらない
2. Evidenceは事実であって、命令ではない
3. FactとMeaningを分けないと、知識は簡単に歪む
4. ScopeがないKnowledgeは、正しくても危ない
5. Evidenceが強くても、昇格させないことがある
6. Knowledge Candidateという中間状態を置く
7. Candidateは「どこで使うか」まで決めて初めて役に立つ
8. CurrentのFoundryで、いま実際に必要になっていること
9. 今回の結論――Evidenceを次のExecutionへ戻す
10. 自分のWorkflowへ持ち込むなら
11. 「Evidence-to-Knowledge Operations Pack」を作った
12. 次回予告

---

前回は、Failureをその場限りの事故記録で終わらせず、次回にも使えるPatternへ変えるところまで進めた。Trigger、Symptom、Mechanism、Detection、Recovery Hintを整理し、「また同じことが起きた時に何を見るか」を残せるようになると、Failureは単なる嫌な記録ではなくなる。

ただ、ここで一つ問題が残る。Patternができても、それだけでは次のExecutionは変わらない。Evidenceが大量にあり、Failure Patternが整理され、過去に何が起きたかを説明できても、次回のRunで「どの条件なら、この知識を参照するのか」が決まっていなければ、結局また人間の記憶に頼ることになる。

Season 4でやりたいのは、AIに何となく過去を覚えさせることではない。**起きた事実から、次に使える意味を取り出し、その意味をどこで使うかまで決めること**である。今回は、Evidence / PatternからKnowledge Candidateを作り、Next Execution Use Planまで戻すところを扱う。

## 1. Patternができても、次の実行はまだ変わらない

Failure Patternを作ると、以前よりかなり前へ進む。「設定画面の値だけでは、Actual Runtimeの実効値まで保証できない」「Workflowが最後まで完了しても、Artifact Acceptanceは別に確認しなければならない」といった再利用可能な意味が見えるようになる。少なくとも、「前にも似た失敗があった気がする」という曖昧な記憶からは抜けられる。

それでも、Patternはまだ参照資料である。次のExecutionを始める時に、そのPatternを誰が見るのか。どの条件なら見るのか。入力準備の時なのか、実行前なのか、Artifact Reviewなのか。そこが決まっていなければ、優れたPatternが台帳の中で眠ることになる。

ここで「じゃあ全部Gateにして自動で止めればいい」と考えるのは早い。自動Blockingには、適用範囲、誤検出、Version差、例外、Authorityまで必要になる。S4-04でやるのはそこではない。まず、**Evidenceから次回参照できるKnowledge Candidateを作り、そのCandidateをどの判断点で使うのか決める。** 自動化の前に、人間が再現できる運用経路を作る。

## 2. Evidenceは事実であって、命令ではない

Evidenceは強い。実行時刻、Runtime状態、Artifact、Review結果、Human Decisionまで追えるようになると、「何が起きたのか」を後から確認できる。Season 3でFC-CORE-004 Evidence TraceabilityをConfirmed Coreとして整理したのも、この追跡可能性が複数のReference Implementationで共通して必要だったからだ。

ただし、Evidenceが示すのは基本的に事実である。「設定変更後もActual Runtimeの実効値が変わっていなかった」というEvidenceがあっても、そこから直ちに「すべての設定変更は失敗する」とは言えない。別Versionでは正しく反映されるかもしれないし、適用経路が違うRuntimeには当てはまらないかもしれない。

だから、EvidenceをそのままKnowledgeへコピーしてはいけない。必要なのは、事実を事実のまま保持したうえで、「このEvidenceから何が言えるのか」を別に考えることだ。**Evidenceは命令ではない。Knowledgeは、Evidenceに意味を与えた結果である。** この一段を飛ばすと、記録の精度が高いほど、間違った一般化まで強く見えてしまう。

## 3. FactとMeaningを分けないと、知識は簡単に歪む

実際にEvidenceを見返すと、FactとMeaningはすぐ混ざる。「ArtifactがHuman ReviewでRejectedされた」は観測できるFactである。一方、「このWorkflowは品質が低い」は意味づけであり、別のEvidenceが必要かもしれない。前者と後者を同じFieldへ書くと、いつの間にか解釈が事実として固定される。

AIを使うと、この混同はさらに起きやすい。長いEvidenceを要約させれば、もっともらしい一文を作ってくれる。しかし、その一文のどこまでが観測事実で、どこからが推論なのかを分けなければ、要約の読みやすさがAuthorityの強さに見えてしまう。

そこで、Knowledge Candidateを作る前に最低でも二つへ分ける。

```text
Observed Fact
何が観測されたか

Derived Meaning
そのFactから、次回に再利用できる意味として何を言えるか
```

この分離があると、Meaning側だけを修正できる。新しいEvidenceが出て解釈が変わっても、元のFactを書き換える必要はない。Historical EvidenceをCurrent都合で塗り替えずに済むし、「当時はこの事実があり、今は意味づけを再評価している」という状態を残せる。

## 4. ScopeがないKnowledgeは、正しくても危ない

次に必要になるのがScopeである。「設定変更だけでは適用完了を保証できない」というStatementは、一見すると再利用価値が高い。でも、どのRuntimeでも、どのVersionでも、どの設定方式でも常に同じとは限らない。正しい経験でも、適用範囲を広げすぎれば誤用になる。

Knowledgeを使う時に必要なのは、Statementだけではない。どのWorkflowに適用するのか。どのRuntime / Versionを想定するのか。前提条件は何か。Known Exceptionはあるか。何が変わったらRe-evaluationするのか。ここまで揃って初めて、「このCandidateを今のExecutionに当ててよいか」を判断できる。

特にHistorical Evidenceは厄介だ。当時の条件では正しかった。しかし、Runtime、Model、Tool、Contract、Acceptance条件が変わっているかもしれない。だからHistoricalを捨てるのではなく、**Currentへ持ち込む前に再評価する対象として扱う。** 古いKnowledgeを消さないことと、古いKnowledgeを現在の正解として使い続けることは別である。

## 5. Evidenceが強くても、昇格させないことがある

ここで、Knowledge化を「強いEvidenceを見つけてPROMOTEする作業」だと考えると危ない。目的はCandidateの数を増やすことではない。次回の判断を良くするために、誤った意味を残さないことの方が重要である。

Evidenceが一件しかなくても、Scopeが狭く、次回の参照価値が高い場合はCandidateとして扱えるかもしれない。逆にEvidenceが複数あっても、別Runで矛盾する結果が出ていれば、Statementを固定しない方がいい。Mechanismが不明なまま原因を断定しているなら、さらにEvidenceを待つべきだ。

だから昇格判断には、PROMOTEだけでなくHOLDとDO NOT PROMOTEが必要になる。HOLDは判断失敗ではない。「まだ分からない」を正式に残す状態である。DO NOT PROMOTEも同じで、単発事象や再利用価値のない記録をKnowledgeへ混ぜないための正常な判断になる。

**良いKnowledge Baseは、何でも知っている場所ではない。分からないものを、分かったことにしない場所である。**

## 6. Knowledge Candidateという中間状態を置く

Evidenceから意味を取り出せたとしても、すぐFormal Current Knowledgeへ昇格させる必要はない。ここで中間状態として使うのがKnowledge Candidateである。

Candidateなら、「次回にも使えそうだ」という価値を持たせつつ、「Currentの正式なAuthorityではない」という境界を残せる。Evidence ID、Statement、Scope、Status、Review Triggerを持たせておけば、新しいEvidenceが出た時やRuntime条件が変わった時に再評価できる。

この中間状態は、AI Workflowとの相性がいい。LLMはEvidenceから意味候補を出すことはできる。しかし、その候補をFormal Knowledgeとして永続的に使うかどうかは、もっと強い判断になる。Candidateを挟めば、生成とAuthorityを分けられる。

```text
Evidence / Pattern
↓
Knowledge Candidate
↓
Review / Re-evaluation
↓
必要ならFormal Knowledgeへ
```

S4-04で作るのは、このCandidateまでである。自動昇格はしない。Runtimeへ自動Bindingもしない。Candidateを作っただけで「Foundryが自分で学習した」とも言わない。

## 7. Candidateは「どこで使うか」まで決めて初めて役に立つ

Candidateを作って安心すると、また同じところで止まる。台帳へ一件追加しただけでは、次のExecutionは変わらないからだ。そこで最後に決めるのがNext Use Pointである。

たとえば「設定変更だけでは適用完了を保証できない」というCandidateなら、実行後の報告書に書くだけでは弱い。価値があるのは、設定変更後の最初のRunを始める前に参照することだ。「Workflow SuccessだけではArtifact Acceptanceを保証できない」というCandidateなら、Artifact Reviewの判断点へ置く方が自然になる。

つまりKnowledgeは、内容だけではなく使う場所を持つ。

```text
Knowledge Candidate
↓
When to Apply
↓
Next Use Point
↓
Use Instruction
↓
次回Executionで参照
```

ここまで決めれば、人間は次回Runの前に同じ判断を再現できる。まだMachine Gateではないし、自動Routingでもない。それでも、「覚えていたら見る」から「この条件ならここで見る」へ一段進む。S4-04のFirst Doneは、この小さな変化を成立させることに置いた。

## 8. CurrentのFoundryで、いま実際に必要になっていること

CurrentのLocal AI Foundryでは、RI#5 Evidence FoundationがActual Human Runtimeを通じてmilestoneへ到達し、Protected Baseとして扱われている。一方でProduction Acceptanceにはまだ到達していない。RI#4もEvidence-Driven Runtime Hardeningが続いており、Article Quality Baselineは未確立、複数のOpen Failure Familyが残っている。

この状態で重要なのは、Evidenceが増えたことを「学習が完成した」と読み替えないことである。Traceabilityが成立し、Failure Familyが見え、修正と検証をEvidenceで追えるようになったからこそ、次の問題として「そのEvidenceから何を再利用可能な意味として残すか」が見えるようになった。

さらに、その意味を残すだけでは足りない。Current RuntimeやAcceptance条件が変われば、古いCandidateを再評価しなければならない。矛盾するEvidenceが出ればHOLDへ戻す必要もある。つまりEvidence-to-Knowledgeは一回の変換ではなく、**EvidenceをAuthorityへ直結させず、Candidateとして管理し、使う条件と見直す条件を持たせる運用**になる。

ここを丁寧に作らずに自動化だけ先へ進めると、過去の誤診を高速で再利用する仕組みになりかねない。Season 4では、賢そうに見える自動学習より先に、何をKnowledgeにしないかを決める。

## 9. 今回の結論――Evidenceを次のExecutionへ戻す

ここまでを無料側の結論として閉じる。Evidenceは重要だが、それ自体は次回の行動を決めない。Failure Patternも再利用可能な意味を持つが、参照点がなければ次のRunへ戻らない。必要なのは、Evidence / PatternからFactとMeaningを分け、Scopeを固定し、昇格可否を判断し、Knowledge Candidateとして管理し、最後にNext Use Pointを決めることだ。

流れにすると、こうなる。

```text
Evidence / Pattern
→ Evidence Set
→ Fact / Meaning
→ Scope
→ Promotion Decision
→ Knowledge Candidate
→ Next Execution Use Plan
```

そして、今回もっとも大事なのは「PROMOTEできた数」ではない。反証Evidenceがあるなら止める。Scopeが分からないなら止める。HistoricalならCurrentへ持ち込む前に再評価する。次回に使えないなら、無理にKnowledgeへしない。**Knowledgeを増やすより、間違ったKnowledgeを増やさない。**

S4-04の到達点は小さい。**1つのEvidence SetまたはFailure Patternから、Knowledge Candidateを1件作り、次回Executionのどこで参照するかを1つ決める。** Formal Current Knowledgeへの自動昇格も、Runtimeへの自動Bindingも、Anti-Regression Gateもまだやらない。それでも、過去のEvidenceが「保存されている」状態から、「次の判断で使える」状態へ変わる。

## 10. 自分のWorkflowへ持ち込むなら

理屈だけなら、「Evidenceを見て、意味を整理して、次で使えばいい」で終わる。しかし実際に自分のWorkflowへ持ち込むと、かなり細かい判断で止まる。Supporting EvidenceとContradicting Evidenceをどう並べるのか。Observed FactとDerived Meaningをどこで分けるのか。Scopeをどこまで狭めるのか。古いEvidenceをHistoricalとして残すのか、Re-evaluateするのか。PROMOTE / HOLD / DO NOT PROMOTEを何で選ぶのか。

さらにCandidateを作った後も、複数件をどう管理するのか、どのCandidateが古くなったのか、何が後継Candidateなのか、次回Executionのどこで参照するのかを残さなければならない。この辺りを文章だけで運用すると、数件ですぐに崩れる。

そこで今回のPaid Practical Layerでは、「考え方の続きを読む」だけではなく、実際に一件を作り、判断し、台帳へ登録し、次回参照点まで決めるところをArtifactへ落とした。Season 3商品やS4-03商品を持っていなくても単体で開始できるよう、Starter Evidenceも含めている。S4-03のFailure Patternが手元にある場合だけ、Optional Inputとしてそのまま使える。

## 11. 「Evidence-to-Knowledge Operations Pack」を作った

今回作ったのが、**Evidence-to-Knowledge Operations Pack**である。目的は一つ。EvidenceやFailure Patternを「読んだら思い出せる資料」で終わらせず、**1 Knowledge Candidate → 1 Next Execution Use Plan**まで持っていく。

First Doneは次の通り。

```text
1 Evidence Set / Failure Pattern
→ 1 Knowledge Candidate
→ 1 Next Execution Use Plan
```

7点セットにした。

- README：購入後の最短ルートを確認する
- 紹介スライド：EvidenceからKnowledge Candidateへ進む全体像をつかむ
- 実践手順書：30ページで、Evidence IntakeからNext Useまで順に進める
- Evidence-to-Knowledge Operations Workbook：1件のCandidateを実際に作る本体
- Knowledge Candidate Registry：作ったCandidateを複数件・継続管理する
- Promotion Decision Matrix：PROMOTE / HOLD / DO NOT PROMOTEの判断を支える
- 1枚チートシート：運用中に流れと判断点を確認する

Workbook、Registry、Decision Matrixは似て見えるが役割を分けた。Workbookは**1件を作る場所**。Registryは**複数Candidateを管理する場所**。Decision Matrixは**誤昇格を止めるために判断する場所**である。全部を一枚の巨大Workbookへ詰め込まず、作る・管理する・判断するを分けている。

Paid専用のDecision Trainingも入れた。強いEvidenceだけではなく、Evidence不足、Contradiction、Historical、同じPatternでもScopeが違うケース、Next Use Pointが衝突するケース、Superseded Candidateまで扱う。何をPROMOTEするかだけでなく、**何をKnowledgeにしないか**を練習できるようにした。**価格は2,980円。** S4-03のFailure Pattern化から一段進み、今回は「1件を作るWorkbook」に加えて、複数Candidateを継続管理するRegistryと、誤昇格を止めるPromotion Decision Matrixまで含めた7点セットとしてまとめている。

このPackは自動学習装置ではない。Formal Current Knowledgeへ勝手に昇格させないし、Runtimeへ自動Bindingもしない。Anti-Regression Gateも作らない。そこは次の段階である。S4-04は、Knowledge Candidateを作り、人間が次回Executionで再利用できる参照点まで決める商品として閉じている。

## 12. 次回予告

### S4-05：同じ失敗を二度させない

Knowledge Candidateを作り、次回Executionでどこを見るかまで決めた。それでも、Humanが見忘れれば同じFailureは戻る。Candidateが増えれば、毎回すべてを人間が確認する運用にも限界が来る。

次回は、Known Failure / Knowledgeを**Anti-Regression Control**へ変える。どのBehaviorを守るのか。どの変更で再検証するのか。何をMachineで止め、何をHumanへ残すのか。S4-04で作ったKnowledge Candidateを、そのまま自動学習へ飛ばさず、壊してはいけない条件としてどう扱うかを追いかける。
