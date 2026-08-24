# NOTE記事インキュベータ

このファイルは、Local AI FoundryのNOTE連載における**Editorial Hub（編集管制塔）**である。

記事本文そのものは保持せず、Season構成、現在の執筆位置、次のEditorial Action、
Season別Planning Artifact、Cross-Season BacklogへのNavigationを管理する。

旧`30-article-incubator.md`が肥大化したため、Season詳細とBacklogを`notes/editorial/`へ分離した。
分割元は `fctaityo/fctaityo.github.io` / `main` / `notes/30-article-incubator.md`、
Source Blob SHAは `2e32696b04adfc765b418d61d1132b3ea936ebd7`。

## 運用上の責務

* Local AI Foundry開発ログのSeason構成を管理する。
* 現在の執筆位置と次に扱うテーマを示す。
* Season別Planning ArtifactへのCanonical Navigationを提供する。
* War Diary、Bug Zoo、Configuration Management Notes、Development Model Notes等から育った記事候補をCross-Season Backlogへ接続する。
* Project Evidenceによって前提が変わった場合、未執筆記事の順序、題名、ScopeをSeason Plan側で再評価する。
* NOTE記事本文、公開状態、公開日時、NOTE上の最終表示はNOTE側を正本とする。

## Current Editorial Position

### Season 1

`CLOSED / 01〜09`

[Season 1 Plan](editorial/season-1-plan.md)

### Season 2

`ARTICLE BODY COMPLETE / 01〜12`

Repository上では01〜12の記事本文が存在する。
NOTE上の公開状態・公開日時・最終表示はNOTE側を正本とする。

[Season 2 Plan](editorial/season-2-plan.md)

### Season 3

`CURRENT WORKING PLAN / STRUCTURE NOT FROZEN`

Working Direction：

**AIに仕事を任せる仕組みを作る — Reference ImplementationからFoundry Coreへ**

現在のProject Evidenceでは、FC-CORE-001〜004がConfirmed Core。
Review Binding Integrityは`CANDIDATE — STRONG`であり、
Foundry Core Extractionは次CandidateのEvidence Assessmentへ継続している。

Season 3では、無料読者向けの開発物語を途中で欠損させず、**Story Closure（物語の完結）は無料**とする。
実機開発から得た再現可能なImplementation Knowledge、具体Parameter、Threshold、Template、実務ArtifactはPaid Content候補として保護する。

Canonical Principle：

**結果は無料。再現方法が有料。**

詳細なFree / Paid境界、各話の商品候補、Paid Artifactの扱いはSeason 3 PlanをCanonical Planning Artifactとし、
全記事共通のEditorial BoundaryはPaid Content Value Protection Contractに従う。

[Season 3 Plan](editorial/season-3-plan.md)

[Paid Content Value Protection Contract](editorial/paid-content-value-protection-contract.md)

### Season 4

`LONG-RANGE WORKING DIRECTION / NOT FIXED`

Continuous Assuranceを長期候補として保持する。

[Season 4 Working Plan](editorial/season-4-working-plan.md)

## Cross-Season Backlog

Seasonへ未配置、または複数Seasonへまたがる記事候補は、
[Cross-Season Backlog](editorial/cross-season-backlog.md)で管理する。

## Editorial Rule

**RIを増やすこと自体を記事の目的にしない。**

各RIの具体Evidenceを使いながら、
再利用可能なDelegation / Control / Governance / Evidenceの問いへ到達する。

新しいCore Candidateを、便利そうという理由だけでConfirmed Coreへ先取りしない。
Working Nameを採用済みArchitectureとして扱わない。
Historical EvidenceをCurrent Successへ書き換えない。
