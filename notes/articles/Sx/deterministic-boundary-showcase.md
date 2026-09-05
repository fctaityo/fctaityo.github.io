# AIを賢くしたら壊れた。だから、境界を決定論的にした。

AIが賢く補ってくれれば、Workflowの制御は簡単になる。崩れたJSONも直せるし、文字数超過も自分で調整できる。Local AI Foundryでも当初はそう見えていた。しかし実際に壊れたのは、AIの能力ではなく、曖昧である必要のない仕事までAIへ戻した境界だった。

今回の結論は一行だ。

> **LLMを決定論的にするな。LLMとの境界を決定論的にしろ。**

## 【目次】

1. Normalizeが違反を消した
2. 623文字を直させたら698文字になった
3. 意味は自由、構造は厳格
4. Machineが知る事実を再推定させない
5. 回復した違反を観測から消さない
6. 境界を固定するのはAIを自由にするため

---

## 1. Normalizeが違反を消した

Planning AgentのRaw Outputが期待されたJSONではなく、`<think>`を含んで返ったことがある。Raw全体はparseできず、契約上は明確なFAILだった。ところがNormalizeは後続のJSON objectを救出し、後段Gateは`ok`を返した。

Normalizeが救出したこと自体は悪くない。問題は、回復後だけを見るとRaw Contract violationが存在しなかったように見えることだ。処理継続の成功と、上流が契約を守ったかどうかは別々に記録しなければならない。

## 2. 623文字を直させたら698文字になった

別のRetryでは、Machineは初回出力が623文字、許容上限が420文字、最低203文字の削減が必要だと知っていた。それでも確定値を十分に渡さず「適切な長さへ直す」とLLMへ任せると、Modelは元の長さを約370文字と誤認し、結果は698文字へ増えた。これは文字数を守れと強く命令すれば閉じる問題ではない。Machineが正確な値を持っているのに、再び推定させる設計が不要な不確定性を作った。

## 3. 意味は自由、構造は厳格

文章の意味、分析、Recommendation、言い換えは一つの正解へ固定しにくい。ここはLLMが価値を出すSemantic Planeである。一方、required field、type、nullability、ID、handoff structureは同じ入力へ同じ判定が必要なControl Planeである。

LLMの表現を固定しすぎず、Consumerが必要とする外枠だけをMachine-readable Contractで固定する。これが最初の原則になる。

## 4. Machineが知る事実を再推定させない

Count、Compare、Hash、Threshold、Range、Delta、Binding、StateがMachine側で確定しているなら、LLMへ再推定させない。現在値623、最大420、最低削減203、Direction=DECREASEを確定した上で、意味を保った圧縮だけを委譲する。

何でもCodeへ移すのではない。意味ではなくてよいものだけを決定論側へ戻す。

## 5. 回復した違反を観測から消さない

Fallback、Auto-fix、Retry、Default補完は必要だ。しかし後段が成功したから前段も成功扱いにすると、便利なRecovery layerがFailure Evidenceを隠す。`Raw FAIL`と`Normalized PASS`は同時に存在できるため、別Trackで保持する。

Evidenceを残すことで、単発の事故が次の設計判断へ変わる。回復能力と観測能力を同時に持つことが重要だ。

## 6. 境界を固定するのはAIを自由にするため

Deterministic ControlはAIを狭く縛るための考え方ではない。CountやStateまで考えさせる必要をなくし、意味、文章、分析へ能力を集中させるための設計である。三つの原則にまとめられる。意味は自由、構造は厳格。Machineが知っている事実をAIにもう一度考えさせない。回復した違反を観測から消さない。Public-safeな判定表とSource Authorityは[Deterministic Boundary Showcase](../../../docs/public/deterministic-boundary-showcase.md)から確認できる。RepositoryにはEvidenceを置き、記事では、そのEvidenceがなぜ設計上の転換点になったかを読む。

---

※ 本記事はStandalone Technical Articleであり、Season 4 Working Planを変更しない。`DM-20260815-002`は`Working Model / Not Adopted Architecture`のままである。
