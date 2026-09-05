# NOTE Publication Contract

Status: `CURRENT / CANONICAL ENTRY / MACHINE-GATED`

## Purpose and authority

本Contractは、Local AI FoundryのNOTE記事を執筆、レビュー、Human handoff、Publicationする際の共通Canonical入口である。記事ごとの指示や会話はChange Inputであり、本Contractおよび参照先のCanonical Sourceを上書きしない。

事実は次のAuthority順で確認する。

1. Project CurrentはInternal Formal Current、Current Contract、Current Snapshot。
2. 実行結果は、それらにBindingされたActual Runtime Evidence、Review、Audit。
3. 開発上の出来事は、対応するWar Diary、Bug Zoo、ADR、Development Model等のCanonical Artifact。
4. Public Projectionは公開可能なCurrent表現の正本であり、Internal-only事実を推測する根拠にはしない。
5. NOTE上の公開状態、公開日時、公開URL、表示内容はNOTEの実画面をAuthorityとする。Repository内の下書き名や予定URLから公開済みと推測しない。

Authority間に意味的競合がある場合は推測で統合せず、記事を`DELIVERY READY`にしない。

## Canonical notation

Runtime Initiativeの表記は`RI#1`から`RI#5`をCanonicalとする。空白を含む`RI #1`から`RI #5`は禁止する。識別子、Status、Version、SHA-256、URLは原文の意味と強度を維持する。

## Current Fact recheck

Current依存の記述を含む記事は、Human handoffの直前にCurrent Gateから再確認する。少なくともVersion、Project State、RI state、Acceptance、Binding、Candidate identity、公開状態、URLを記事で使用する場合に再確認し、Gate後に本文が変わった場合は全Gateを再実行する。

`Candidate`、`Pending`、`Blocked`、`Not Granted`、`Not Established`、`Historical`を、根拠なく`Current`、`Accepted`、`Production`、`Published`へ強化してはならない。Historical Evidenceは当時の事実であり、単独でCurrentを確定しない。

## Responsibility boundaries

- 本Contract: Source Authority、Current recheck、表記、Status強度、NOTE公開状態・URL、最終Static Gateを規定する。
- [Article Style Contract](article-style-contract.md): Paragraph Densityだけを規定する。
- [Paid Content Value Protection Contract](paid-content-value-protection-contract.md): Free / Paid / Private境界だけを規定する。
- Current Season Plan: Season内のテーマ、順序、候補を管理し、Project Currentや公開済み状態を確定しない。
- [Human + ChatGPT Delivery Contract](../../contracts/HUMAN-CHATGPT-DELIVERY-CONTRACT.md): Repositoryへ渡す完成ファイルとHandoff形式を規定する。

## Series structural continuity

同一Seriesの新規記事は、Current Season Planと同一Seriesの直近の`HUMAN ACCEPTED`記事を必ず実際に開き、後者をStructural Baselineとして扱う。Contractだけを読んで開始してはならない。偶然のVariationをFormatと誤認しないよう、同一Seasonのもう1本のAccepted Articleも確認する。Paid記事では直近のAccepted Paid Articleがあれば併せて確認する。Season初回では前Season最終話、新Season Plan、Series共通Baselineを確認する。

Humanの明示的なEditorial Decisionがない限り、Navigation、記事identity、目次、区切り、番号付きSection、関連記事導線、次回予告またはHuman Acceptedな終了Variationを省略・変更しない。Generic Blog / Generic NOTE / Generic Markdown Templateはこれらを上書きしない。Authority順は次とする。

```text
Human Explicit Instruction
→ Current Contract
→ Human Accepted Series Structural Baseline
→ Current Season Plan
→ Generic Writing Heuristic
```

Series Format変更はHuman Editorial Decisionである。変更時はChange Scope、対象Series、理由、新Baseline、過去記事へのretrofit有無を明示し、通常の本文修正へ黙って混ぜない。Human Accepted FormatはMachine Defaultより上位であり、Machine PASSはFormatのHuman Acceptanceを意味しない。Humanが新FormatをAcceptedした場合のみ、CurrentizationとMachine Projection更新により新Baselineへ昇格できる。

Paid BoundaryはSeries Structureを置き換える理由にならない。Paid記事も通常のSeries StructureとFree Story Closureを維持し、Paid Practical Layerを追加要素として結合する。Season初回・最終回のVariationはAccepted BaselineまたはHuman Decisionに従う。単発記事へ別SeriesのFormatを強制しない。

[`series-structure-baseline.json`](series-structure-baseline.json)はMachineがBaselineと必須blockを解決するためのProjectionであり、Human Accepted Articleと二重正本にはならない。ProjectionのBaselineが存在しない、Acceptedでない、またはActual Artifactの構造と矛盾する場合はfail-closedとする。

## Publication boundary

公開記事へ秘密、個人情報、非公開Repository情報、credential、内部限定URLを含めない。公開可能性がCanonical Sourceから確定できない情報は公開本文へ出さない。Free / Paidの価値境界はPaid Content Value Protection Contractへ委譲する。

## Required static gate

Human handoffおよびRepository反映の直前に、完成ファイルへ次を実行する。

```text
python scripts/note_publication_lint.py <article.md>
```

このGateはParagraph Gateを内包し、禁止表記とSeries Structure Regressionを検査し、対象ファイルのSHA-256をReceiptへ出す。Series対象ではBaseline ProjectionとActual Accepted Artifactの両方を確認する。対象省略、Self-test失敗、Paragraph Gate失敗、禁止表記、Structure Regression、Gate後のhash変更はfail-closedとする。文章や意味を自動修正せず、Fact Source Authority、Status、Editorial DecisionをStatic Gateだけで代替しない。
