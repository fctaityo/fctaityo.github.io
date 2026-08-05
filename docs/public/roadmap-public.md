# Project Roadmap

> **Public Edition**
>
> 本書はInternal Project Roadmapから生成されたPublic派生物である。
> Internal Repositoryを唯一の正本とし、本書は公開用Representationのみを提供する。

## 1. Purpose

本書は Local AI Foundry プロジェクト全体の中長期的な発展方針を管理する Planning Document の正本である。

Roadmapは現在の状態を管理する文書ではなく、Project全体が将来どのように成熟していくかを示す。

Current Status、Project Planning、Project Stateおよび運用状況は、それぞれ対応する公開Documentationを参照する。

---

# 2. Scope

本書はProject全体の長期的な方向性のみを管理する。

対象

- Workflow Platform
- Documentation
- Publication
- Website
- Runtime
- Platform

対象外

- Current Status
- Active Work
- Project State
- Commit Plan
- Runtime Evidence
- Audit / Report / Review
- Architecture本文
- ADR本文

---

# 3. Planning Principles

- Roadmapは将来像を管理する。
- Current Stateは保持しない。
- Workstream単位でProject全体の成熟方向を整理する。
- 実施順序はHuman Decisionによって決定する。
- Architectureは現在の構造、本書は将来の方向性を管理する。

---

# 4. Project Vision

Local AI Foundryは単一Workflowの完成を目的としない。

Workflow、Documentation、Publication、Website、RuntimeおよびPlatformを継続的に発展させ、長期運用可能なKnowledge Platformへ成熟させることを目指す。

---

# 5. Project Roadmap

## 5.1 Evolution Overview

```text
Project Vision
      │
      ▼
Foundation
 ├─ Workflow Platform
 └─ Platform
      │
      ▼
Governance
 └─ Documentation
      │
      ▼
Knowledge
 └─ Publication
      │
      ▼
Delivery
 └─ Website
      │
      ▼
Operation
 └─ Runtime
      │
      ▼
Continuous Evolution
```

## 5.2 Evolution Stages

| Stage | Focus |
|--------|-------|
| Foundation | Workflow・Platform基盤構築 |
| Governance | Documentation・Contract・Governance整備 |
| Knowledge | Project Knowledge体系化 |
| Delivery | Public Documentation提供 |
| Operation | Runtime品質保証 |
| Evolution | Capability継続拡張 |

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

| From | To | Relationship |
|------|----|--------------|
| Workflow | Documentation | Knowledge Source |
| Documentation | Publication | Publication Source |
| Publication | Website | Public Presentation |
| Workflow | Runtime | Validation Target |
| Platform | All | Execution Foundation |

---

# 8. Responsibility Boundary

RoadmapはPlanning Layerのみを管理する。

| Subject | Source of Truth |
|----------|-----------------|
| Current Status | Public Project Status Documentation |
| Current Initiative | Public Project Planning Documentation |
| Project State | Project State Documentation |
| Architecture | Public Architecture Documentation |
| Documentation Structure | Public Documentation Information Architecture |
| Publication | Publication Governance |
| Configuration | Configuration Management |

---

# 9. Review and Maintenance

RoadmapはProject全体の方向性が変化した場合のみ更新する。

Current Status、Commit、Runtime、Audit、Reviewのみでは更新しない。

---

# 10. Verification and Definition of Done

更新完了条件

- Project全体を対象としている。
- Current Statusを保持していない。
- Active Workと責務が重複していない。
- Architectureと責務が重複していない。
- WorkstreamごとのMissionを定義している。
- Evolution Stageを整理している。
- Workstream間の関係を示している。
- 長期的なProject Visionを説明している。

---

# 11. Design Principle

RoadmapはProjectの未来を説明する文書である。

現在を説明する文書ではない。

各正本文書が一貫した方向で発展できるよう、Project全体の長期的な成長指針を提供する。
