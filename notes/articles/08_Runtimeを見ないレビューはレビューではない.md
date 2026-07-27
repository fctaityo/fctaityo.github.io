# 08 Runtimeを見ないレビューはレビューではない

### 📌 本記事
- **08 Runtimeを見ないレビューはレビューではない**

### 関連記事はコチラ👇
- 01 Local AI Foundry 完全始動！
- 02 AIは悪くなかった。悪かったのは設計だった。
- 03 Contract Drivenとは何か？
- 04 DTOだけを受け渡す理由
- 05 NormalizeはAIを信用しないためにある
- 06 Retryは保険ではない
- 07 すべて直した。それでも終わらなかった。
- 09 Documentationは説明書ではなくUX

---

## 【目次】

1. 前回の宿題：`Provisional / Blocked`の中身を開けてみる
2. 完璧に見えたPromptに、存在しない変数が4つあった
3. 「設定を読む」と「実際に送られた値」は別物
4. Runtimeまで見て、初めて`Verified`になった例
5. SOPが「Runtime確認」を独立した手順にしている理由
6. まとめ

---

## 1. 前回の宿題：`Provisional / Blocked`の中身を開けてみる

07で、Current Baselineが`Provisional / Blocked`のまま終わっていない、という話を書いた。全部直したはずのContract Gate、Normalize、Retryは設計通りに動いているのに、構成の基準状態だけはまだ確定していなかった。あのときは抽象的なステータスだけを引用した。今回はその中身、実際に何がBlockingになっているのかを開けてみる。

`CFG-20260724-002`というConfiguration Auditには、3件のBlocking Driftが記録されている。

- `CFG-B004` Prompt：6ノードが競合
- `CFG-B005` Code / Normalize：5ノードが競合
- `CFG-B006` LLM Parameters / Runtime：Node明示値がReview Retryだけにあり、Runtime request payloadの完全値をDBから取得できない

このAuditのタイトルは「Synchronization」だが、実際にやったことは同期ではない。冒頭にこう明記されている。

> 本Auditは同期を実施していない。順序は次のとおりである。
> Audit → Evidence → Human Approval Pending

比較して、証跡を残して、人間の承認を待つ。ここまでしかやっていない。今回はこの中の一つ、`CFG-B004`の中身を見ていく。

## 2. 完璧に見えたPromptに、存在しない変数が4つあった

Auditには、Draft側とDSL側でPrompt本文が異なる6ノードが列挙されている。その中に`write_conclusion_retry_agent`（Conclusion再生成）がある。

Draft側のPromptを読むと、一見かなりしっかり書かれている。全文再生成を求め、240〜360字という長さの契約があり、完結条件も明示されている。Prompt単体を読む限り、欠けているものはなさそうに見える。

しかしAuditはこう書いている。

> `article_summary`、`article_title`、`conclusion_requirements`、`requested_checkpoint`という解決先のない4変数を含む

Draft側のPromptには、この4つの変数への参照がある。だが、これらの変数がどのノードのどの出力から解決されるのか、Workflow graph上のどこにも定義されていない。Promptの文章としては完結しているのに、実行時にこの4箇所は空か未定義のまま埋め込まれることになる。

一方でDSL側には、同じ役割を果たす有効なselectorがちゃんと存在する。

```text
writing_plan_contract.writing_plan_json
writing_plan_contract.conclusion_plan_json
research_result_unpacker.research_json
write_conclusion_agent.text
write_conclusion_gate.violations_json
```

もしレビューが「Draft側のPrompt本文を読んで、文章として破綻していないか確認する」というやり方だったら、この不具合は絶対に見つからない。**文章としては完成していて、実行時にだけ壊れる。**これが、読むだけのレビューの限界を一番はっきり示している例だと思う。

## 3. 「設定を読む」と「実際に送られた値」は別物

もう一つ、似た構造の問題がある。今度はPromptではなく、LLM Node Parametersの話だ。

このWorkflowには18個のLLMノードがある。そのうち`review_retry_agent`だけが、`num_ctx=16384`、`num_predict=2048`、`think=false`という値をノードごとに明示している。残り17ノードには、こうした明示値が一つもない。

「じゃあ他の17ノードは何が使われているのか」を確認しようとすると、ここで壁にぶつかる。Auditにはこう書かれている。

> Runtime DBの`execution_metadata`は`total_tokens`を保持するが、Ollamaへ送信した`num_ctx`、`num_predict`、temperature、thinkのrequest payloadは保持していない。

つまり、実行が終わったあと保存されているのは「合計トークン数がいくつだったか」という結果だけで、「実際にどんな設定でOllamaへリクエストを送ったか」という中身そのものは、どこにも残っていない。しかも、いくつかのノードでは過去の実行で`4096`トークンに到達した記録がある。上限に当たったのか、たまたまその長さで収まっただけなのか、Node側の設定を読むだけでは判断できない。

Configuration設定を読む。それは「何を送るつもりだったか」しか教えてくれない。「実際に何が送られ、どう処理されたか」は、Runtimeの実行証跡を見ない限り分からない。この2つは似ているようで、まったく別の情報だ。

## 4. Runtimeまで見て、初めて`Verified`になった例

対照的な例もある。`CFG-20260725-001`、Ollama Provider Settingsの検証Auditだ。

このAuditも最初はProvider設定を確認するところから始まる。Difyに登録されているモデル名、context size、max tokens。Ollama側に同名モデルが実在するか、そのdigestとmetadata。ここまでは、いわば「設定を読む」作業だ。

でも、このAuditはそこで止まらなかった。

> `POST /api/generate`
> 応答`CFG-P001-OK`、`done=true`、`done_reason=stop`

Ollama自体に直接、実際に短い生成リクエストを送っている。さらに、Dify APIコンテナの内側からも同じリクエストを送り、`done_reason=stop`という正常終了を確認している。設定が正しそうに見えるだけでなく、**実際にそのネットワーク経路で、実際に生成が動くことを確認した。**

このAuditだけが、`Synchronized`から`Verified`という一段上のStatusへ遷移している。Registry上でも、この`CFG-P001`だけが`Verified`だ。他のほとんどのItemは、まだ`Pending`か`Blocked`のままになっている。

読むだけでは`Synchronized`にすらたどり着けない場合がある。今回のConclusion Retry Promptのように、読んだ範囲では正しく見えても、実行時に壊れる部分がある。Runtimeを実際に動かして確認して、初めて`Verified`と呼べる。

## 5. SOPが「Runtime確認」を独立した手順にしている理由

Codex Standard Operating Procedureには、標準フローが17ステップで定義されている。その中の11番目にこうある。

> 11. Runtime実効値とArtifactを確認する。

これは静的検証（7番）やUnit Test（8番）、Integration Test（9番）とは別に、独立した手順として置かれている。しかも、Documentationを同期する12番の**前**に置かれている。つまり、実際にRuntimeで何が起きたかを確認する前に、Documentationへ「これで正しく動いています」と書いてはいけない、という順番になっている。

GUIでの変更についても、同じ発想がある。「未記録のGUI変更を正常な最新状態として採用しない」という規則があり、変更者や理由が追跡できない限り、その変更は正式な状態として扱われない。

これは04〜07で繰り返し出てきた考え方の延長線上にある。DTOは「Agentが何を言ったか」ではなく「検証済みの構造」だけを次へ渡す。Configuration Managementは「GUIでいじった」という事実だけでは正本を更新しない。今回のRuntimeの話も同じだ。**「そう書いてある」「そう設定されているはず」は、それだけでは事実として扱わない。**

## 6. まとめ

Draft側のPromptは、文章としては完成していた。でも4つの変数は実行時に解決されない。LLM Node Parametersは、設定を読む限りでは17ノードに特に指定がないだけに見える。でも実際に何が送信されたかは、Runtimeの記録からも再現できない。

読むことと、動かして確認することは、別の作業だ。Promptを読んで「良さそう」と判断するのは、レビューの入り口でしかない。実際にそのWorkflowを走らせて、`done_reason`を確認し、実効値を確認し、そこで初めて「動いている」と言える。

レビューは、読む仕事じゃない。動かして確かめる仕事だ。

Runtimeを見ないレビューは、レビューではない。読んだだけの安心は、実行時に平気で裏切られる。

次は、この開発ログシリーズ自体の話をする。**Documentationは説明書ではなくUX。**

---

※本記事は「Local AI Foundry」開発ログの08本目。01〜07も合わせてどうぞ。実例は`CFG-20260724-002`、`CFG-20260725-001`を参照。運用規則はCodex Standard Operating Procedureに基づく。
