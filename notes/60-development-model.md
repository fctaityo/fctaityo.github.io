# Development Model Notes

このファイルは、Local AI Foundry開発を通じて観測された
**AI前提の開発モデルそのものに関する知識**を案内するインデックスである。

詳細な記録は `notes/development-model/` 配下へ、1テーマ1ファイルで保存する。

Development Model Notesは、個別Workflowの実装方法や現在のProject Stateを管理する場所ではない。
Seasonをまたいで育つ長期的な開発思想、Human-AI Responsibility Boundary、Risk、Evaluation、Continuous Assurance、既存開発モデルとの比較仮説などを、Evidenceと未検証部分を分離しながら整理する。

## 他のnotesとの役割分担

* War Diaryは、開発中に起きた出来事と当時の判断を時系列で記録する。
* Bug Zooは、再発可能な障害パターンとRoot Causeを一般化する。
* NOTE記事インキュベータは、確定シリーズの構成、現在の執筆位置、今後の記事候補を管理する。
* Configuration Management Notesは、正本、差分、同期、検証、Repository Reflection等の実務知識を整理する。
* 思考メモは、まだ体系化されていない気付きや仮説を保持する。
* Development Model Notesは、複数のEvidenceと既存知識を横断し、AI前提の開発モデルとして何が成立しつつあり、何が不足しているかを構造化する。
* Hall of Fameは、将来も引用できる短い原則や言葉だけを保持する。
* ADRまたはdocs/へ昇格した内容がある場合、確定した設計判断はそちらを正本とし、ここでは形成過程、比較、未解決Gapを保持する。

## 運用ルール

* 1つの長期テーマを1ファイルとして記録する。
* ファイル名は `DM-YYYYMMDD-NNN-short-title.md` とする。
* このファイルには、DM ID・題名・概要・Status・リンクだけを置く。
* Observed Fact、Working Hypothesis、Target Direction、Open Gapを区別する。
* 独自手法の存在を先に宣言しない。既存のAgile、Spiral、Kanban、XP、Prototype、Risk Management、Secure SDLC等で説明できる範囲を先に確認する。
* 外部Best Practiceを参照する場合は、Local AI Foundry固有のEvidenceと外部知見を混同しない。
* Article化する場合は `30-article-incubator.md` へ昇格し、記事構成はそちらで管理する。
* 設計判断としてFIXした場合はADRまたはInternal Documentationへ昇格させる。
* Current State、実行履歴、作業履歴の正本にはしない。
* 詳細本文はこのインデックスへ再掲しない。

## Long-range Development Model

* [DM-20260808-001 AI-Native Developmentの長期到達像とCapability Gap](development-model/DM-20260808-001-ai-native-development-target-and-capability-gaps.md)  
  Season 1〜2で成立したControl Planeを起点に、Human-AI Development Operating ModelとContinuous Assuranceへ向かう長期到達像を整理し、Evaluation、Risk、Observability、Recovery、Provenance、Security、Human Responsibility Boundaryの不足をGapとして記録する。

## Human-Directed Execution Model

* [DM-20260815-002 Human-Directed FoundryにおけるContract ClosureとDeterministic Control Boundary](development-model/DM-20260815-002-contract-closure-and-deterministic-control-boundary.md)  
  RI #1 Formal Runtime Verificationで観測されたFixed Decision Binding、Contract Propagation、Deterministic Control Boundary、Human Decision Boundaryを横断整理し、Contract ClosureをFoundry横断Capability候補として検討する。StatusはWorking Model / Not Adopted Architectureであり、RI #2を含む横断Evidenceを昇格条件とする。

## Cross-RI / Foundry Core Transition

* [DM-20260821-003 RI #1 Freeze / Cross-RI Evidence / Foundry Core Transition](development-model/DM-20260821-003-ri1-freeze-cross-ri-foundry-core-transition.md)  
  RI #1を`FROZEN / HISTORICAL BENCHMARK`として止めた後、RI #2〜RI #4の比較Evidenceから共通Control Structureを抽出するCurrent Vectorへ移った経緯を整理する。Reference Implementationを完成品の数ではなくEvidence Sourceとして扱い、Confirmed CoreとCore Candidateを分離する。`FC-CORE-001 Runtime Capability Calibration`を最初のConfirmed Foundry Coreとして位置付け、Human + ChatGPT / CODEXの実運用上の役割分担とHandoff成立もCurrent Operating Evidenceとして記録する。StatusはWorking Model / Transition Note / Not Architecture SSOT。
