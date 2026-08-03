# Publication Governance

## 1. Purpose and Authority

本書は、Local AI FoundryにおけるPublication Governanceの正本である。

Publicationとは、Internal Repositoryで管理される成果物をPublic RepositoryおよびWebsiteへ反映する際の統制契約を定義する。

本書は公開可否の判断基準、責務境界、公開フローおよび禁止事項のみを定義する。

本書は現在状態、公開判断履歴、公開成果物そのものを保持しない。

それぞれ次を正本とする。

| 領域 | 正本 |
|---|---|
| Publication Contract | 本書 |
| Current Publication State | Publication Registry |
| Publication Decision History | Publication Reflection Register (PRR) |
| Public Contents | Public Repository |
| Presentation | Website Operations |
| Internal Source | Internal Repository |

---

# 2. Publication Responsibility Model

Publicationは責務単位で分離する。

| Component | Responsibility |
|---|---|
| Internal Repository | 唯一の正本（Single Source of Truth） |
| Publication Governance | 公開契約・公開統制 |
| Publication Registry | 現在公開状態 |
| Publication Reflection Register | 公開物やGit履歴から確認できなくなる公開判断履歴 |
| Public Repository | 公開成果物 |
| Website | Presentation Layer |

責務を重複させない。

Current StateをGovernanceへ保持してはならない。

履歴をRegistryへ保持してはならない。

公開物をGovernanceへ保持してはならない。

PRRには、不採用・保留理由、または公開時のマスク・一般化判断だけを保持する。

---

# 3. Publication Layer Model

Publication Layerは次の一方向で構成する。

```text
Internal Repository
        │
        ▼
Publication Governance
        │
        ▼
Publication Classification
        │
        ├── Publication Registry
        │
        ├── PRR（必要な場合のみ）
        │
        ▼
Public Repository
        │
        ▼
Website
```

Information Flowは一方向である。

WebsiteはPresentationのみを担当する。

Public Repositoryは公開成果物のみ保持する。

Internal Repositoryのみ正本とする。

---

# 4. Publication Classification Decision Tree

公開対象は次の順序で判定する。

```text
Internal Artifact
        │
        ▼
公開対象か？
        │
   ┌────┴────┐
   │         │
 No        Yes
   │         │
 Internal   公開可能性判定
   │         │
   │         ▼
   │   機密・内部情報を含むか？
   │         │
   │  ┌──────┴──────┐
   │  │             │
   │ Yes            No
   │  │             │
   │ Mask / Generalize   Public Candidate
   │  │             │
   └──┴──────┬──────┘
             ▼
       Human Decision
             │
             ▼
 PRR要否判定
             │
      ┌──────┴──────┐
      │             │
 必要             不要
      │             │
 PRR記録           記録なし
      └──────┬──────┘
             ▼
 Publication Registry
             │
             ▼
 Public Repository
             │
             ▼
 Website
```

Human Decisionなしに公開してはならない。

不採用・保留、またはマスク・一般化を伴わない単純公開では、PRRを作成しない。

---

# 5. Publication Boundary

各Repositoryは責務を超えてはならない。

| Layer | Responsibility |
|---|---|
| Internal | 正本 |
| Registry | Current State |
| PRR | 公開物やGit履歴から確認できなくなるDecision History |
| Public | Published Artifact |
| Website | Presentation |

責務を横断して情報を保持してはならない。

---

# 6. Publication Workflow

Publication Workflowは次とする。

```text
Internal Completion
        │
        ▼
Publication Classification
        │
        ▼
Mask / Generalization要否判定
        │
        ▼
Human Review
        │
        ▼
PRR要否判定
        │
   ┌────┴────┐
   │         │
 必要       不要
   │         │
PRR Recording
   └────┬────┘
        ▼
Registry Update
        │
        ▼
Public Repository Reflection
        │
        ▼
Website Reflection
```

PRRは、不採用・保留理由、または公開時のマスク・一般化判断を保存する必要がある場合だけ作成する。

RegistryはCurrent Stateのみ更新する。

WebsiteはPresentationのみ更新する。

---

# 7. Publication Rules

Publicationでは次を必須とする。

- Internalを唯一の正本とする。
- Publicは派生物とする。
- PublicからInternalへ上書きしない。
- Human Reviewを必須とする。
- Public Documentationは一般利用者向けに編集する。
- 必要に応じてMaskおよびGeneralizationを実施する。
- 不採用・保留、またはMask / Generalization判断が公開物やGit履歴から確認できなくなる場合だけPRRを作成する。
- Public成果物は公開契約に従って生成する。

---

# 8. Public Repository Boundary

Public Repositoryは公開成果物のみ保持する。

保持対象例

- Public Documentation
- Public Audit
- Public Registry
- Public Architecture
- Notes
- Website Assets

保持してはならないもの

- Internal Evidence
- Runtime Evidence
- Internal Audit
- Internal Registry
- PRR
- Human Working Notes
- Internal Decision

Public RepositoryはInternal Repositoryの代替として扱ってはならない。

---

# 9. Relationship to Other Documents

| Document | Responsibility |
|---|---|
| Publication Governance | Publication Contract |
| Publication Registry | Current Publication State |
| PRR | 不採用・保留理由、およびMask / Generalization判断の内部履歴 |
| Configuration Management | Internal Configuration |
| Documentation Information Architecture | Documentation Responsibility |
| Project State Transition | Project Lifecycle |
| Definition of Done | Completion Criteria |
| Website Operations | Presentation |

各文書は責務を重複しない。

---

# 10. Knowledge Feedback Loop

公開過程で得られた知見は必要に応じてInternalへ還元できる。

```text
Public Feedback
        │
        ▼
Human Evaluation
        │
        ▼
Internal Improvement
        │
        ▼
Internal Repository
```

Public Repositoryを直接修正してInternalへ同期してはならない。

Internal Repositoryを更新した後、新たなPublication Processを開始する。

---

# 11. Prohibited Practices

次を禁止する。

- Publicを正本として扱うこと
- Websiteを正本として扱うこと
- Registryへ履歴を書くこと
- PRRへCurrent Stateを書くこと
- GovernanceへCurrent Stateを書くこと
- Governanceへ履歴を書くこと
- PRRをPublic Repositoryへ配置すること
- PRRが不要な単純公開で形式的なPRR Entryを作成すること
- Public RepositoryからInternal Repositoryを更新すること
- Human Reviewなしに公開すること
- 機密情報を公開すること
- Internal Artifactをそのまま公開すること
- Websiteへ公開判断を保持すること

---

# 12. Verification and Definition of Done

Publicationは次を満たした場合のみ完了とする。

- Publication Classificationが完了している。
- Human Reviewが完了している。
- 必要なMaskまたはGeneralizationが完了している。
- PRR要否が判定されている。
- PRRが必要な場合は、不採用・保留理由またはMask / Generalization判断がPRRへ記録されている。
- PRRが不要な場合は、公開物やGit履歴から消える判断情報が存在しないことを確認している。
- Publication RegistryがCurrent Stateへ更新されている。
- Public Repositoryへ反映されている。
- Websiteへ必要なPresentationが反映されている。
- Internal Repositoryが唯一の正本であることを維持している。

公開完了後もInternal Repositoryを変更した場合は、新たなPublication Processを開始する。

Publication Registry、PRR、Public RepositoryおよびWebsiteを更新したことによって、Internal Repositoryの正本性は変化しない。
