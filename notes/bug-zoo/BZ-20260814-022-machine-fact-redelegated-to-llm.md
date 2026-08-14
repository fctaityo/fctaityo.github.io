# BZ-20260814-022 機械が知っている事実をLLMに推定させる

## 分類

Retry / Runtime / Responsibility Boundary

## 関連記録

- [WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した](../war-diary/WD-20260814-001-formal-rv-exposed-contract-propagation-gaps.md)

## 症状

CodeやGateがすでに正確に計測・計算できる値を、Retry Prompt等でLLMへ再推定させる。

LLMは意味生成には必要でも、文字数、範囲、差分、超過量、必要削減量等のDeterministic Fact（決定論的事実）を再計算する必要はない。

RI #1のConclusion Retryでは、Machine側は初回出力が623文字であることを計測できた。Gate上限は420文字であり、最低203文字削減が必要だった。

しかしRetry Promptには、そのMachine-measured Factが十分に渡されず、モデルは前回出力を「約370文字」と誤認した。

その後、モデル自身は有効範囲240–420を計算できたにもかかわらず、最終出力は698文字となった。

## Root Cause

Deterministic ControlとSemantic Generationの責務を分離していなかった。

「LLMへ前回出力を見せれば、自分で必要な修正量も判断できる」と考え、Machineが持つ確定値をCorrection Payloadへ固定しなかった。

また、SectionごとにRetry Strategyが異なり、一部では固定の「約20％短縮」というHeuristicを使っていた。

固定20％短縮はContract-derivedではなく、Conclusionでは623文字から約498文字までしか減らず、上限420を満たさない。

## 教訓

Machineが正確に知っている事実をLLMに推定させない。

責務を次のように分ける。

```text
Count / Compare / Delta / Direction
→ Machine

Meaning-preserving Rewrite / Compression / Expansion
→ LLM
```

Retryでは、少なくとも実測値、最小値、最大値、Target、超過または不足量、修正方向、Final RetryかどうかをMachine側で確定し、そのPayloadをLLMへ渡す。

LLMへ任せるのは「何文字か」ではなく、「その制約の中で意味を保ってどう書き直すか」である。

## 再発防止パターン候補

- Machine-measured `actual_length`
- Machine-derived `minimum` / `maximum` / `target`
- `direction = compress | expand`
- `excess`または`shortage`
- `required_reduction`または`required_expansion`
- `final_retry`
- Gateと同じCharacter Count Methodを使用
- Mechanical Truncationは禁止し、意味修正はLLMへ残す
