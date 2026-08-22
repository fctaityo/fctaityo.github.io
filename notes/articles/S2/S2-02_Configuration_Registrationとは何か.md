# S2-02 Configuration Registrationとは何か

### 📌 本記事
- **Season2 第02話：Configuration Registrationとは何か**

### 関連記事はコチラ👇
- [S2-01：Configurationはコードではない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-01_Configuration%E3%81%AF%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84.md)
- [S2-03：Auditは犯人探しではない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-03_Audit%E3%81%AF%E7%8A%AF%E4%BA%BA%E6%8E%A2%E3%81%97%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84_%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E5%8F%8D%E6%98%A0%E7%89%88.md)
- [S2-06：Human Decisionは多ければ安全になるわけではない](https://github.com/fctaityo/fctaityo.github.io/blob/main/notes/articles/S2/S2-06_Human%2520Decision%E3%81%AF%E5%A4%9A%E3%81%91%E3%82%8C%E3%81%B0%E5%AE%89%E5%85%A8%E3%81%AB%E3%81%AA%E3%82%8B%E3%82%8F%E3%81%91%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84.md)

---

## 【目次】

1. 前回の続き：「登録された」だけでは足りなかった
2. 実装した、と、正式な管理対象になった、の間
3. 実例：7件登録して、Blockedのまま終わった監査
4. IDを持たない候補は、まだ管理対象ではない
5. Owner不在は「誰も決めていない」の可視化
6. Statusは進捗バーではない
7. まとめ

---

## 1. 前回の続き：「登録された」だけでは足りなかった

前回、`CFG-A002`というResearch Promptの話をした。Draft側とDSL側の両方に、それぞれ正しい変更が存在していて、どちらを採用するか誰も決めていないまま`Unresolved`・`Blocked`で止まっている、という状態だった。

あの記事で一つ、説明を後回しにした言葉がある。「Registry」だ。`CFG-A002`は、なぜ`CFG-A002`という名前で呼べるのか。なぜそれが「今どんな状態か」を誰でも確認できるのか。答えは単純で、それがConfiguration Item Registryに**登録済み**だからだ。

では、登録は誰が、いつ、何をもって行うのか。今回はそこを掘る。

## 2. 実装した、と、正式な管理対象になった、の間

Local AI Foundryでは、構成変更を実装へ反映する前に、次の順序を踏む。

```text
Human Decision
→ Configuration Registration
→ Dependency Verification
→ Implementation Review
→ Repository / Draft Reflection
→ Runtime Verification
```

一見遠回りに見える。「もう直したいものは決まっているんだから、さっさとコードを書けばいいじゃないか」と思うかもしれない。実際、Season1まではそれに近い感覚で進めていた部分もある。

だが、Configurationはコードと違って、複数のRepresentation（Draft、DSL、GUI、Published、Runtime）に分散する。だから「何を、誰が、どんな責務で、どんなRiskを持って変更しようとしているか」を、実装より先に文字にしておかないと、後から「これは一体何のための変更だったか」を誰も再現できなくなる。

Configuration Registrationは、この最初の一歩だ。実装に着手する前に、変更対象へIDを与え、Category、責務、初期Statusを台帳へ記録する。

## 3. 実例：7件登録して、Blockedのまま終わった監査

7月30日、Research / Writing Plan Hardeningという変更に着手する前に、実際にこの手順を踏んだ監査記録が残っている。

このとき新規登録されたConfiguration Itemは7件。

| Configuration Item | Category | Main Responsibility | Initial Status |
|---|---|---|---|
| Research Result Aggregator Selection | Graph / Node Configuration | PASS済みResearch bundleだけをWritingへ渡す | `Pending` |
| Research Writing Plan Hardening Script | Code / Tooling | 承認済み変更を再現可能かつ冪等にDSLへ適用する | `Blocked` |
| Writing Plan Raw Output Contract | Contract | Normalize前Raw出力の形式要件とEvidenceを定義する | `Pending` |
| Writing Plan Raw Contract Gate | Code / Gate | Raw ContractをNormalize前に強制する | `Pending` |
| Writing Plan Target Allocation Contract | Contract | Section文字数配分の決定規則を定義する | `Pending` |
| Writing Plan Deterministic Target Normalize | Code / Normalize | Raw Gate PASS済みDTOへ文字数だけを決定的に付与する | `Blocked` |
| Writing Plan Normalized DTO Contract Gate | Code / Gate | Normalize後DTOを検査しRaw statusを保持する | `Blocked` |

7件のうち、初期Statusが`Pending`のものが4件、`Blocked`のものが3件。**この登録監査が終了した時点では、まだ1件も`Verified`ではなかった。**

監査そのものの結果も、`Blocked`だった。監査記録にはこう書かれている。

> 登録は完了したが、登録しただけでは`Synchronized`または`Verified`にはならない。

これが今回一番言いたいことだ。7件のConfiguration Itemは、名前を持ち、責務を持ち、台帳に記録された。つまり「管理対象」にはなった。しかし、それはまだ「実装が正しく動く」ことも、「他のRepresentationと一致している」ことも意味しない。**登録は、変更の入り口を管理下に置くための手続きであって、変更の完了を意味しない。**

## 4. IDを持たない候補は、まだ管理対象ではない

この監査には、もう一つ興味深い記述がある。

> Research Initial Contract GateとResearch Retry Final Gateは、別のConfiguration Registration Reviewが必要な候補として残った。本監査では未登録ItemへIDを先行採番していない。

Research Initial Contract GateとResearch Retry Final Gateは、この時点ですでに「変更した方がいいかもしれない」と認識はされていた。だが、まだIDは与えられていない。つまりまだConfiguration Itemではない。

ここに、地味だが重要な線引きがある。**「認識されている」と「登録されている」は別の状態だ。** 頭の中や会話の中で「あそこも直した方がいいよね」と共有されているだけの候補は、Registryのどこにも存在しない。存在しないものは、StatusもOwnerも持てないし、Configuration Itemとして正式なAudit対象にはできない。候補として監査記録の中に書き残すことはできても、登録済みItemと同じようには扱えない。実際、今回の監査もResearch Initial Contract GateとResearch Retry Final Gateを「候補」として言及してはいる。ただし、それはあくまで文中の記述であって、IDを持つ管理実体ではない。誰かが「先にIDを採番してしまおう」と思っても、Local AI Foundryはそれをやらない。IDの先行採番は、まだ責務もRiskも確定していない対象に、実在しない管理実体を与えてしまう行為だからだ。

候補のまま置いておく、という判断も、れっきとした運用の一部になる。

## 5. Owner不在は「誰も決めていない」の可視化

Configuration ItemにはOwnerという項目がある。これは担当者の名前ではなく、**今どのRepresentationを採用元として扱うか**を示すフィールドだ。

前回取り上げた時点の`CFG-A002`は、Ownerが`Unresolved`だった。もう一つ、Planning Promptを扱う`CFG-A001`の監査記録にも、同じ構造が出てくる。

| 項目 | 値 |
|---|---|
| Registry Status Before | `Pending` |
| Intended Registry Status | `Verified`（同期後検証とPASS Audit完了時） |
| Registry Status After | `Blocked` |
| Current Owner Before | `Draft` |
| Current Owner After | `Unresolved` |

このケースでは、承認済みDraftをDSLへ同期する作業自体は完了していた。Draft側とDSL側の内容は一致していることも確認済みだった。だが、実際にRuntimeで動かしてみると、曖昧な入力に対してRaw出力の契約違反が発生した。そのため、「DraftとDSLどちらを恒久的な採用元とするか」を確定できる状態ではなくなり、OwnerはDraftからUnresolvedへ戻された。

Ownerが`Unresolved`ということは、「同期はできているが、これを正式な基準として確定してよいと、まだ誰も判断していない」という状態を意味する。この項目があるおかげで、「一見動いているように見えるが、実は誰も本採用を決めていない変更」が、Registry上で埋もれずに可視化される。

## 6. Statusは進捗バーではない

Configuration Itemが取りうるStatusは、次の6種類だ。

| Status | 意味 |
|---|---|
| `Registered` | 管理対象として登録済み |
| `Pending` | 採用候補または同期方針の判断待ち |
| `Synchronized` | 承認内容を必要なRepresentationへ反映済み |
| `Verified` | 同期後の検証が完了 |
| `Blocked` | Conflict、Unknown、Runtime Drift、承認不足などにより同期を継続できない |
| `Deprecated` | 現在は使用しないが、履歴のためIDを保持 |

一見すると、`Registered → Pending → Synchronized → Verified`という一本道の進捗バーに見えるかもしれない。だが実際の運用はそう単純には進まない。第3章の7件は、登録監査終了時点で`Pending`または`Blocked`のままだったし、`CFG-A001`はDraftとDSLの同期自体は完了したが、Runtime Acceptanceで契約違反が見つかり、Registry Statusは`Blocked`になった。

Statusが示しているのは「あとどれくらいで終わるか」ではない。**そのItemが今、どんな運用上の制約の下にあるか**だ。`Blocked`は失敗の烙印ではなく、「この条件が解消されるまで、次のRepresentationへ進めてはいけない」という安全装置として機能している。

## 7. まとめ

Configuration Registrationは、変更に着手する前に、対象へIDと責務を与え、台帳へ記録する手続きだ。

登録することは、実装が正しいことを何も保証しない。今回見た7件のItemは登録監査終了時点でまだ同期にすら至っておらず、同期作業自体を終えていた`CFG-A001`でさえ、Runtime Acceptanceで`Blocked`になった。登録・同期のどちらが完了していても、`Verified`にたどり着けるとは限らない。逆に、まだIDを持たない候補は、どれだけ重要そうに見えても、Registry上では存在しないのと同じ扱いになる。

ID、Category、責務、Owner、Status、そしてEvidence。これらが追跡可能になって初めて、変更は正式な管理対象になる。実装できることと、正式に管理されていることは、似ているようでまったく別の話だ。

次は、この登録された状態が「今も正しいか」をどう確かめるか、Auditの話をする。

---

※本記事は「Local AI Foundry」開発ログ Season2の02本目。Season1（01〜09）、S2-01も合わせてどうぞ。実例は[Research / Writing Plan Hardening Configuration Registration Audit](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-audits/CFG-20260730-002-configuration-registration-research-writing-hardening.md)、[CFG-A001 Repository Reflection Audit](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-audits/CFG-20260730-001-planning-prompt-runtime-acceptance.md)、[Configuration Item Registry](https://github.com/fctaityo/fctaityo.github.io/blob/main/docs/public/configuration-items-public.md)を参照。設計判断はADR-0009に基づく。
