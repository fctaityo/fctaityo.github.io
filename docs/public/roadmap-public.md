# Project Roadmap

> **Public Documentation (Derived from the Internal Project Roadmap)**

## 1. Purpose

本書はLocal AI Foundryプロジェクト全体の中長期的な発展方針を説明するPublic Documentationである。Internal Project Roadmapを唯一の正本とする公開派生物であり、公開に不要なInternal Current WorkやEvidence詳細は保持しない。

Roadmapは現在の状態を管理する文書ではなく、Project全体が将来どのように成熟していくかを示す。

Current Status、Current Initiative、Project State、Runtime結果および日々の進捗は、それぞれ対応するPublic Documentationを参照する。

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
- Reference Implementation / Foundry Evolution

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
- Foundry CoreはReference Implementation間の比較EvidenceとHuman Decisionなしに確定しない。

---

# 4. Project Vision

Local AI Foundryは単一Workflowや自動化そのものの完成を目的としない。

HumanがPurpose、Judgment、Responsibility、Approvalを保持し、複数の業務をReference Implementationとして実証するHuman-Directed Foundryへ発展する。異なるRIの比較EvidenceからCore Candidateを検証し、Foundry Core CapabilityをHuman Decisionにより段階的に抽出する。

---

# 5. Project Roadmap

## 5.1 Evolution Overview

```text
Human-Directed Foundry
      │
      ▼
RI Evidence
 ├─ RI#1 Article Production / Historical Benchmark
 ├─ RI#2 Documentation Production
 ├─ RI#3 Visual Asset Production
 └─ RI#4 Research-Grounded Long-form Content Production
      │
      ▼
Cross-RI Evidence
      │
      ▼
Core Candidate Evaluation
      │
      ▼
Foundry Core Capability Extraction（Human Decision）
      │
      ▼
FC-CORE-001 confirmed / additional extraction continues
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

これらのWorkstream成熟はReference Implementation実証を支える。Evolutionの順序は日付や完成時期を定めず、Human Decisionで決定する。

## 5.3 Reference Implementation Evolution

| Area | Direction |
|---|---|
| RI#1 Article Production | Historical BenchmarkとしてEvidenceを保存し、Article固有責務と再利用可能なPatternを区別する |
| RI#2 Documentation Production | Documentationという異なる業務領域でControl Patternを実証し、RI間比較に必要なEvidenceを蓄積する |
| RI#3 Visual Asset Production | Visual Asset Productionで比較Evidenceを蓄積する。FoundryConsoleはControl Surface / Current Implementationとして扱う |
| RI#4 Research-Grounded Long-form Content Production | Research-groundedな長文制作で比較Evidenceを蓄積する。Temporal Entity IntegrityはCurrent Package / Capabilityとして扱う |
| Core Candidate | RI間で再現性、責務境界、失敗制御、Evidenceを比較検証する |
| Foundry Core | Capability単位の比較EvidenceとHuman Decisionによって段階的に定義する。FC-CORE-001は確認済みで、追加抽出を継続する |

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
| Human Authority | Reference Implementations | Purpose、Judgment、Responsibility、Approval Boundary |
| Reference Implementations | Foundry Core Decision | Comparative Evidence / Core Candidate Validation |

---

# 8. Responsibility Boundary

RoadmapはPlanning Layerのみを管理する。

| Subject | Public Reference / Responsibility |
|----------|-----------------|
| Current Status | [Project Status](status-public.md) |
| Current Initiative | Public Roadmapでは保持しない |
| Project State | [Project Status](status-public.md) |
| Architecture | [Public Architecture](architecture-public.md) |
| Documentation Structure | [Public Documentation Map](README-public.md) |
| Publication | Publication Governance |
| Configuration | Internal Documentation |

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

各Documentationが一貫した方向で発展できるよう、Project全体の長期的な成長指針を提供する。
