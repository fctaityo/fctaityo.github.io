# Project Roadmap

> **Public Documentation (Derived from the Internal Project Roadmap)**

## 1. Purpose

本書は Local AI Foundry プロジェクト全体の中長期的な発展方針を説明するPublic Documentationである。

本書はInternal Project Roadmapから派生した公開版であり、Project全体の将来的な方向性を説明することを目的とする。

Roadmapは現在の状態を管理する文書ではなく、Project全体が将来どのように成熟していくかを示す。

Current Status、Current Initiative、Project State、Runtime結果および日々の進捗は、それぞれ対応するPublic Documentationを参照する。

---

# 2. Scope

本書はProject全体の長期的な方向性のみを管理する。

対象

* Workflow Platform
* Documentation
* Publication
* Website
* Runtime
* Platform
* Reference Implementation / Foundry Evolution

対象外

* Current Status
* Active Work
* Project State
* Commit Plan
* Runtime Evidence
* Audit / Report / Review
* Architecture本文
* ADR本文

---

# 3. Planning Principles

* Roadmapは将来像を管理する。
* Current Stateは保持しない。
* Workstream単位でProject全体の成熟方向を整理する。
* 実施順序はHuman Decisionによって決定する。
* Architectureは現在の構造、本書は将来の方向性を管理する。
* Foundry CoreはReference Implementation間の比較EvidenceとHuman Decisionなしに確定しない。

---

# 4. Project Vision

Local AI Foundryは単一Workflowや自動化そのものの完成を目的としない。

HumanがPurpose、Judgment、Responsibility、Approvalを保持し、複数の業務をReference Implementationとして実証するHuman-Directed Foundryへ発展する。

異なるReference Implementationの比較EvidenceからCore Candidateを検証し、Foundry Coreは十分なEvidenceを得た後のHuman Decisionで確定する。

---

# 5. Project Roadmap

## 5.1 Evolution Overview

```text
Human-Directed Foundry
      │
      ▼
Reference Implementation実証
 ├─ RI#1 Article Production
 ├─ RI#2 Documentation Production
 └─ RI#3 Next Domain / Undefined
      │
      ▼
RI間の比較Evidence
      │
      ▼
Core Candidate検証
      │
      ▼
Foundry Core Decision（Human Decision）
      │
      ▼
次Domainへの展開
```

## 5.2 Evolution Stages

| Stage      | Focus                               |
| ---------- | ----------------------------------- |
| Foundation | Workflow・Platform基盤構築               |
| Governance | Documentation・Contract・Governance整備 |
| Knowledge  | Project Knowledge体系化                |
| Delivery   | Public Documentation提供              |
| Operation  | Runtime品質保証                         |
| Evolution  | Capability継続拡張                      |

これらのWorkstream成熟はReference Implementation実証を支える。Evolutionの順序は日付や完成時期を定めず、Human Decisionで決定する。

## 5.3 Reference Implementation Evolution

| Area | Direction |
|---|---|
| RI#1 Article Production | 既存実装を最初のReference Implementationとして維持し、Article固有責務とCore Candidateを分離する |
| RI#2 Documentation Production | 異なるDocumentation業務でControl Patternを実証し、RI間比較に必要なEvidenceを蓄積する |
| RI#3 Next Domain | 用途を未定義のまま維持し、Human Decisionまで具体化しない |
| Core Candidate | RI間で再現性、責務境界、失敗制御、Evidenceを比較検証する |
| Foundry Core | 十分な比較Evidenceの後、独立したHuman Decisionで定義する |

---

# 6. Workstreams

## Core Foundation

### Workflow Platform

**Mission**

AI Workflow Capabilityを提供する。

**Long-term Vision**

継続的なWorkflow Capability向上。

### Platform

**Mission**

Execution Environmentを提供する。

**Long-term Vision**

AI Platform Ecosystemへ発展。

---

## Knowledge

### Documentation

**Mission**

Project Knowledgeを体系化しSSOTを維持する。

### Publication

**Mission**

公開可能なKnowledgeをPublic Documentationとして展開する。

---

## Delivery

### Website

**Mission**

Public KnowledgeをPresentation Layerとして提供する。

---

## Quality

### Runtime

**Mission**

Operational Qualityを継続的に保証する。

---

# 7. Cross-workstream Relationships

| From          | To            | Relationship         |
| ------------- | ------------- | -------------------- |
| Workflow      | Documentation | Knowledge Source     |
| Documentation | Publication   | Publication Source   |
| Publication   | Website       | Public Presentation  |
| Workflow      | Runtime       | Validation Target    |
| Platform      | All           | Execution Foundation |
| Human Authority | Reference Implementations | Purpose、Judgment、Responsibility、Approval Boundary |
| Reference Implementations | Foundry Core Decision | Comparative Evidence / Core Candidate Validation |

---

# 8. Responsibility Boundary

RoadmapはPlanning Layerのみを管理する。

| Subject                 | Reference              |
| ----------------------- | ---------------------- |
| Current Status          | Public Documentation   |
| Current Initiative      | Public Documentation   |
| Project State           | Public Documentation   |
| Architecture            | Public Documentation   |
| Documentation Structure | Public Documentation   |
| Publication             | Publication Governance |
| Configuration           | Internal Documentation |

---

# 9. Review and Maintenance

RoadmapはProject全体の方向性が変化した場合のみ更新する。

Current Status、Commit、Runtime、Audit、Reviewのみでは更新しない。

---

# 10. Verification and Definition of Done

更新完了条件

* Project全体を対象としている。
* Current Statusを保持していない。
* Active Workと責務が重複していない。
* Architectureと責務が重複していない。
* WorkstreamごとのMissionを定義している。
* Evolution Stageを整理している。
* Reference Implementation間の比較とFoundry Core Decisionの方向性を示している。
* Workstream間の関係を示している。
* 長期的なProject Visionを説明している。

---

# 11. Design Principle

RoadmapはProjectの未来を説明する文書である。

現在を説明する文書ではない。

各Documentationが一貫した方向で発展できるよう、Project全体の長期的な成長指針を提供する。
