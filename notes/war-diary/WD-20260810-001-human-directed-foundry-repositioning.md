# WD-20260810-001 Article ProductionからHuman-Directed Foundryへ再位置付けした

## 日付

2026-08-10

## 出来事

Local AI Foundryは、当初Article Production Workflowを中心に発展してきた。

その後、Documentation Productionという異なる業務領域でControl Patternを比較できるEvidenceが増え、Article ProductionだけをProject全体定義として扱う説明では現在の実態を表せなくなった。

そこでProject PositioningをHuman-Directed Foundryへ拡張した。

Article Productionは廃止せずReference Implementation #1（RI#1）として維持し、Documentation ProductionをReference Implementation #2（RI#2）として扱う。

複数RIで共通して観測されたResponsibility Boundary、Contract、DTO / Handoff、Validation、Gate、Review、Evidence、Human Authority Boundary等はCore Candidateとして扱う。

ただし、共通して見えたからという理由だけでFoundry Coreには確定しない。

Foundry Coreは追加の比較Evidenceと独立したHuman Decisionを必要とする。

RI#3はFuture / Undefinedのまま維持し、用途を先回りして設計しない。

## 何が変わったか

従来の中心問いは「記事をどう壊さず生成するか」だった。

再位置付け後は、より上位の問いとして「人間が責任を保持したまま、異なる業務をAIへどう委譲するか」を扱う。

HumanはPurpose、Judgment、Responsibility、Approvalを保持する。

AIは明示されたResponsibility Boundaryの内側で仕事を担当し、Contract、Validation、Review、Evidence、Human Gateによって成果物を成立させる。

Automationそのものは目的にしない。

## 学び

一つの成功WorkflowからProject全体のCoreを決めてはいけない。

異なる業務で同じControl Patternが再現するかを比較し、Evidenceが揃ったものだけをCore Candidateとして育てる。

Human AuthorityはAIが苦手だから残す例外処理ではない。

Purpose、Judgment、Responsibility、Approvalを誰が保持するかというProject-wideな責任境界である。

## 関連

- Public Architecture
- Public Principles P-19
- Public Roadmap
- ADR-0013
