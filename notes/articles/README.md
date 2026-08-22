# NOTE Articles Writing Gate

`notes/articles/`配下の長文NOTE記事を新規作成・修正する場合は、次を必須とする。

1. [`../editorial/article-style-contract.md`](../editorial/article-style-contract.md) をCurrent Writing Contractとして確認する。
2. 完成前に `python scripts/note_paragraph_lint.py <対象.md>` を実行する。
3. `PASS`しない記事を完成版として扱わない。
4. Humanへ渡すRepository反映物は、Rootの[`HUMAN-CHATGPT-DELIVERY-CONTRACT.md`](../../HUMAN-CHATGPT-DELIVERY-CONTRACT.md)に従い、**GitHub Web Uploadへそのまま投入できる完成済み全文ファイル**として渡す。
5. Web Drop-in Packageにdot / hidden pathを混在させない。

このGateの目的は、LLMが生成しやすい「一文ごとの改行」「短文段落の縦連打」への退化を機械的に検出し、さらにHumanへPatch適用やInstaller実行を要求しないDeliveryを保証することにある。
