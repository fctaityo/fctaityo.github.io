# NOTE Paid Content Value Protection Contract

Status: `CURRENT / HUMAN-EDITORIAL-GATED`

NOTE Publication全体の共通入口は[`NOTE Publication Contract`](note-publication-contract.md)とし、本Contractの責務はFree / Paid / Private境界に限定する。

## Purpose

Local AI FoundryのNOTE記事で、無料読者が開発物語と結果を最後まで理解できる状態を保ちながら、
実機開発によって獲得した再現可能なImplementation Knowledgeと実務Artifactの価値を守る。

このContractは「重要な結末を隠して課金する」ためのものではない。
無料記事としての読後感を壊さず、読者が自分の環境で再現・転用するための具体的価値をPaid Layerへ分離する。

## Canonical Principle

**結果は無料。再現方法が有料。**

補助原則：

**Story Closureは無料。Implementation Depthは有料。**

## Free Story Closure Guarantee

有料設定を行う記事でも、無料範囲だけで次を理解できるようにする。

1. 何を作ろうとしたのか。
2. 何が起きたのか。
3. 何に困ったのか。
4. 何を調べ、何を発見したのか。
5. どの方向へ修正したのか。
6. 結果として何が改善・失敗・保留になったのか。
7. 次に何が課題として残ったのか。

次のようなPaywall配置を標準にしない。

```text
問題発生
↓
原因究明
↓
「結局どうなったかはここから有料」
```

標準形は次とする。

```text
問題発生
↓
原因究明
↓
判断
↓
結果
↓
無料Story Closure
↓
ここからPaid Practical Layer
↓
再現方法 / 具体条件 / 実務Artifact
```

## FREE — Public Story / Knowledge

原則として無料範囲に置けるもの：

* 開発物語
* 問題の存在
* Failure Chainの概念説明
* 発見した設計上の意味
* 品質が改善した、失敗した、保留になった等の結果
* Architecture / Governance上の学び
* Candidate / Confirmed / Pending等の正確な状態
* 「何を変える方向へ進んだか」という抽象化された説明
* 次の検証課題

無料部分は宣伝文だけにしない。
Paid Layerがなくても一つの記事として読了できる品質を要求する。

## PAID CANDIDATE — Reproducible Practical Value

次はPaid Content候補として優先的に保護する。

* 具体Parameter
* Threshold
* Retry回数 / Recovery条件
* Search / Retrievalの具体深度・件数・配分
* Context Size / Runtime tuning値
* Model固有の実測設定
* Gateの具体成立条件
* Before / Afterの詳細比較条件
* 成功率とParameter変更を直接結び付ける実測表
* Prompt / Contractの実用Template
* Calibration手順
* Failure Analysisの再現手順
* Debug Checklist
* Decision Matrix
* Cross-RI Evidence Matrix
* 実装・導入手順
* 「この条件で通る / 落ちる」ことを再利用できるRecipe
* Sanitized Design Artifact
* 時間短縮・失敗回避に直接使える実務資料

単一の具体値が常に有料という意味ではない。
その情報が、他者による再現・調整・実装・失敗回避へどの程度直接利用できるかで判断する。

## Paid Public Edition

Internal Artifactをそのまま有料ゾーンへ置いてはならない。

Internal資料を商品化する場合は、Publication Review済みの`Paid Public Edition`を新たに作成する。

Paid Public Editionでは、商品価値に必要な具体性を残しつつ、少なくとも次を除去・一般化する。

* Credential / Secret / Token
* Private Artifact
* 個人情報
* Security-sensitive情報
* 不要なRepository内部Path
* 公開不要なCommit SHA / Internal Identifier
* 販売対象と無関係な未公開Defect
* Third-party confidential information
* Humanが公開を承認していない情報

有料販売はPrivate Boundaryの解除を意味しない。

## NEVER PUBLIC AS-IS

Free / Paidを問わず、次は無加工公開しない。

* Credential
* Secret
* Personal / Private information
* Security-sensitive operational detail
* Human-approved Publication Boundaryを越えるInternal-only情報
* 第三者の権利・秘密を侵害する情報

## Editorial Classification

記事作成中に価値のある具体情報が出た場合、削除するだけで終わらせず、次のいずれかへ分類する。

```text
FREE STORY
PAID PRACTICAL
PAID ARTIFACT CANDIDATE
INTERNAL ONLY
```

`PAID PRACTICAL`または`PAID ARTIFACT CANDIDATE`へ分類した内容は、記事本文の有料ゾーンまたはPaid Public Editionの候補として保持する。

## Paid Boundary Review

完成版前に次をReviewする。

```text
Fact Accuracy
↓
Publication Boundary
↓
Paid Content Value Protection
↓
Free Story Closure
↓
Free / Paid Boundary Decision
↓
Paid Artifact Candidate Review
↓
Article Style / Paragraph Gate
```

### Blocking Conditions

次はPaid Boundary ReviewのBlockingとする。

1. 無料範囲では記事の結果が分からない。
2. Paywallが開発物語の途中に置かれ、無料読者のStory Closureが成立しない。
3. 高価値な再現ParameterやThresholdを無意識に無料公開している。
4. Internal ArtifactをSanitizeせず添付しようとしている。
5. Paid Layerに商品価値がなく、単に本文を途中で分割しただけになっている。
6. Paid LayerでPrivate / Security Boundaryを越えている。
7. Candidate情報を確定済みの再現Recipeとして販売しようとしている。

## Decision Authority

Humanが最終Editorial / Product Authorityを保持する。

Human + ChatGPTは、記事作成・Review時にPaid候補、Free / Paid境界、Paid Artifact候補を抽出し、Human Decisionへ提示する。

CODEX等のExecution AgentへこのBoundaryを共有する場合、役割はPublication時の一次防御とする。
価格、商品名、販売戦略、どの情報を商品化するかというProduct DecisionをExecution Agentへ委譲しない。

## Season 3 Application

Season 3では第5話以降、Paid Practical Layerを実戦投入できる状態とする。

ただし、すべての回を有料化する必要はない。
各話の物語上の役割と、その時点で存在する再現可能な実務資産に応じて判断する。

Current Working Principle：

```text
01〜04:
Free Foundation

05〜:
Free Story Closure
+
Paid Practical Layer where justified
```

各話の商品候補とWorking Mapは[`season-3-plan.md`](season-3-plan.md)を参照する。

## Product Philosophy

LFが販売する価値は「結末を知る権利」ではない。

実機で作り、壊し、測り、比較し、Gateを通し、Evidenceを残した結果として得た、

* 再現可能性
* 時間短縮
* 失敗回避
* 判断材料
* 実務Template
* 検証済みArtifact

に価値を置く。
