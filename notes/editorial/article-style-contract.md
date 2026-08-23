# NOTE Long-form Article Style Contract

Status: `CURRENT / MACHINE-GATED`

## Purpose

Local AI Foundryの長文NOTE記事で、LLM由来の短文縦連打・過剰改行・一文段落の連続だけでなく、逆方向の巨大一段落化も再発させない。

このContractは「読みやすそうだから改行する」運用ではなく、**意味のまとまりが変わった時だけ段落を分ける**ことを要求する。

Repositoryへ渡す成果物形式は、Repository共通Contractの[`HUMAN-CHATGPT-DELIVERY-CONTRACT.md`](../../contracts/HUMAN-CHATGPT-DELIVERY-CONTRACT.md)に従う。

## Canonical Rule

```text
句点ごとに改行しない。
一文ごとの段落分割を常態化しない。
改行は意味・論点・場面の切替で行う。
迷った場合は改行しない。
```

## Paragraph Density

通常本文では次を基準とする。

- 1段落は原則3〜6文程度を基本粒度とする。
- 同じ意味の流れが続く場合は7〜8文程度までまとめてよい。9文以上の通常本文段落は分割する。
- 1〜2文の短段落は、強調や明確な転換に限って使用する。
- 通常本文の短段落を連続させない。
- 1つの見出し内で細切れ段落を量産しない。
- S3-01相当の段落密度を基準とし、それより明らかに細かい縦連打にも、逆に全体を巨大な一段落へ潰す方向にも退化させない。

## Exclusions

以下はParagraph Density Gateの対象外とする。

- 見出し
- 箇条書き
- 表
- Code block
- 引用
- Horizontal rule
- 記事冒頭のNavigation / 目次
- 意図的な単独強調文。ただし通常本文で連続使用は禁止

## Machine Gate

```text
python scripts/note_paragraph_lint.py <article.md>
```

長文NOTE記事をHumanへ渡す前、およびGitHubへ反映する前に実行する。

`PASS`しない記事を完成版として扱わない。

Machine Gateは文章表現を自動修正しない。検出対象は「細切れ段落への退化」と「巨大一段落への退化」であり、意味上の段落境界はHuman / Writerが修正する。

### Fail-closed Execution

記事ファイルを指定してGateを実行した場合、Linter自身のRegression Self-testを**必ず先に自動実行**する。Self-testを省略して記事だけをPASSさせる経路を設けない。

対象記事を指定しない通常実行は成功扱いにしない。Self-testだけを明示的に行う場合のみ、`--self-test`を使用する。

### Required Gate Receipt

完成版としてHumanへ渡すメッセージには、Machine Gateが実際に対象とした完成ファイルを識別できるよう、少なくとも次の出力を提示する。

```text
SELF-TEST PASS
PASS <article.md> sha256=<SHA-256>
NOTE ARTICLE GATE PASS files=1
```

**Gate Receiptが提示されていない成果物は、記事本文が見た目上正常でも`DELIVERY READY`として扱わない。**

SHA-256は「Gateを通した内容」と「Humanへ渡した内容」をBindingするための識別子であり、Gate後に本文を変更した場合は必ず再実行する。

## Blocking Conditions

次はBlockingとする。

1. 同一見出し内で、1文だけの通常本文段落が2つ以上連続する。
2. 同一見出し内で、1〜2文かつ短い通常本文段落が2つ以上連続する。
3. 同一見出し内で短段落が支配的となり、細切れ構成へ退化している。
4. 通常本文の1段落が9文以上になり、意味単位が巨大一段落へ潰れている。
5. Linter自体のRegression Self-testがFAILする。
6. Machine Gateの対象記事が指定されていない。
7. Humanへ渡す完成版とGate ReceiptのSHA-256が一致しない、またはReceiptが存在しない。

`##`だけでなく`###`以下の小見出しも独立した意味区間として扱う。小見出しをまたいで別論点の短段落を誤って連結判定しない。

## Required Workflow

```text
Current Article / Season Planを読む
↓
本Contractを読む
↓
記事を書く・修正する
↓
Paragraph Lint（Self-test自動実行）
↓
FAILなら段落だけを意味単位で再構成
↓
再Lint
↓
PASS + SHA-256 Receipt
↓
Gate後の本文変更なし
↓
Full-file Delivery Contractに従って完成ファイルをHumanへ渡す
```

## Scope Preservation

既存記事を修正する場合、Paragraph Lintの導入を理由に未指定本文を全面改稿しない。

改行修正では、明示的な内容変更指示がない限り、非空白文字を変更しない。
