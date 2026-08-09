# ADR-0013: Human-Directed FoundryとReference Implementationモデルへ再位置付けする

- Status: Accepted
- Date: 2026-08-10
- Decision Authority: Human

## Context

Local AI FoundryのCurrent ArchitectureはArticle Productionの詳細をProject全体として説明している。一方、RI#1 Article Productionから抽出したControl Pattern候補と、異なる業務・実装基盤を用いるRI#2 Documentation Productionの比較Evidenceにより、単一業務を越えた比較が可能になった。

Website v4.0はHuman-Directed FoundryというPublic PresentationをRelease済みだが、Public ArtifactはInternal Architectureの正本ではない。本ADRはInternal Current Documentationと検証Evidenceに基づき、Human-Directed FoundryへのPositioningを正式な設計判断として記録する。

## Decision

Human Final Reviewにより、次を決定する。

1. Project PositioningをArticle Production中心からHuman-Directed Foundryへ拡張する。
2. Article Productionを廃止せずReference Implementation #1として維持する。
3. Documentation ProductionをReference Implementation #2とし、複数RIの比較EvidenceでControl Patternを検証する。
4. 現時点でFoundry Coreを確定せず、観測された共通パターンをCore Candidateとして扱う。
5. Human AuthorityをFoundry Control ModelとReference Implementationの上位責務とし、Purpose、Judgment、Responsibility、ApprovalをHumanが保持する。
6. RI#3は次の業務領域として未定義のまま維持する。

## Current Evidence Boundary

- RI#1: 既存Article Production Architectureと実装Evidence。
- RI#2 Phase A: Synthetic Live Validationにより比較可能なEvidenceを取得済み。
- RI#2 Phase B: Real Document Copy実証の準備と事前検証は進んでいたが、Decision時点ではLive Run、Evidence Review、Oracle Comparisonは未完了。
- RI#2の設計・実装・Phase A / Phase Bに関するWorking Evidence / Pre-Reflectionは比較と判断の入力であり、それ自体をInternal SSOTとして採用しない。
- Website v4.0はPublic Presentation EvidenceでありInternal SSOTではない。

これらはFoundry Core確定、Project State Transition、Active Baseline変更、Runtime Verification、Public Repository Reflectionを意味しない。

## Consequences

- 既存Article Production詳細はRI#1配下で継続利用する。
- ArchitectureとRoadmapは複数RIと比較Evidenceを扱える。
- Core Candidateの正式Core化には追加Evidenceと独立Human Decisionが必要になる。
- PrinciplesへHuman AuthorityのProject-wide原則を追加する場合、Human Reviewと本ADRのAccepted判断が必要になる。

## Alternatives Considered

1. Article ProductionをProject全体定義のまま維持する。
2. RI#1から抽出したPatternを直ちにFoundry Coreとして確定する。
3. Website v4.0をInternal Sourceとして転載する。
4. RI#3を先行設計する。

## Rejected / Deferred

- 単一業務への固定はRI#2比較EvidenceをArchitecture上で扱えない。
- Foundry Coreの即時確定はRI間検証とHuman Decisionを欠く。
- Public Presentationの転載はInternal SSOT責務と矛盾する。
- RI#3の用途定義はEvidenceとHuman DecisionがないためDeferredとする。

## Related Documents

- [Public Architecture](../architecture-public.md)
- [Project Roadmap](../roadmap-public.md)
- [Principles](../principles-public.md)
- [Glossary](../glossary-public.md)

[Public Documentationへ戻る](../README-public.md)
