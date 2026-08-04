# Publication Governance

## 1. Purpose and Authority

本書は、Local AI FoundryにおけるPublication Governanceの正本である。

Publicationとは、Internal Repositoryで管理される成果物をPublic RepositoryおよびWebsiteへ反映する際の統制契約を定義する。

本書は公開可否の判断基準、責務境界、公開フローおよび禁止事項のみを定義する。

本書は現在状態、公開判断履歴、公開成果物そのものを保持しない。

それぞれ次を正本とする。

| 領域                               | 正本                                   |
| -------------------------------- | ------------------------------------ |
| Publication Contract             | 本書                                   |
| Publication Review Current State | Internal Publication Review Registry |
| Publication Decision History     | Publication Reflection Register（PRR） |
| Public Contents                  | Public Repository                    |
| Presentation                     | Website Operations                   |
| Internal Source                  | Internal Repository                  |

Internal Publication Review RegistryおよびPRRはInternal Repositoryで管理し、Public Repositoryへ配置しない。

---

# 2. Publication Responsibility Model

Publicationは責務単位で分離する。

| Component                            | Responsibility                            |
| ------------------------------------ | ----------------------------------------- |
| Internal Repository                  | 唯一の正本（Single Source of Truth）             |
| Publication Governance               | 公開契約・公開統制                                 |
| Internal Publication Review Registry | 管理対象ごとの現在有効なPublication Review結果          |
| Publication Reflection Register      | 公開物やGit履歴から確認できなくなるPublication Review判断履歴 |
| Public Repository                    | 公開成果物                                     |
| Website                              | Presentation Layer                        |

責務を重複させない。

Current Publication ReviewをGovernanceへ保持してはならない。

Review HistoryをInternal Publication Review Registryへ保持してはならない。

公開物をGovernanceへ保持してはならない。

PRRには、不採用・保留理由、または公開時のMask・Generalization・委譲その他の公開成果物から確認できなくなる判断だけを保持する。

Internal Publication Review RegistryおよびPRRをPublic Repositoryへ配置してはならない。

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
Publication Review
        │
        ├── Internal Publication Review Registry
        │
        └── PRR（必要な場合のみ）
        │
        ▼
Public Repository
        │
        ▼
Website
```

Information Flowは一方向である。

Publication ReviewはInternalで実施する。

WebsiteはPresentationのみを担当する。

Public Repositoryは公開成果物のみ保持する。

Internal Repositoryのみ正本とする。

Internal Publication Review RegistryおよびPRRはPublication Processを支える内部管理資料であり、Public Layerを構成しない。

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
      Publication Review
             │
             ▼
 Internal Publication Review Registry
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
      Public Repository
             │
             ▼
          Website
```

Human Decisionなしに公開してはならない。

Internal Publication Review Registryは、各管理対象の現在有効なPublication Review結果を保持する。

不採用・保留、Mask・Generalization、委譲その他の公開成果物から確認できなくなる判断が存在する場合だけ、PRRを作成する。

Internal Publication Review RegistryおよびPRRはPublic Repositoryへ公開しない。

---

# 5. Publication Boundary

各Layerは責務を超えてはならない。

| Layer                                | Responsibility                      |
| ------------------------------------ | ----------------------------------- |
| Internal Repository                  | 正本                                  |
| Publication Governance               | Publication Contract                |
| Internal Publication Review Registry | Current Publication Review          |
| PRR                                  | 公開物やGit履歴から確認できなくなるDecision History |
| Public Repository                    | Published Artifact                  |
| Website                              | Presentation                        |

責務を横断して情報を保持してはならない。

Internal Publication Review RegistryおよびPRRはInternal Layerに属する。

Public RepositoryおよびWebsiteへPublication Reviewの内部管理情報を保持してはならない。

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
Internal Publication Review Registry Update
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
Public Repository Reflection
        │
        ▼
Website Reflection
```

Internal Publication Review RegistryはCurrent Publication Reviewのみ更新する。

PRRは、不採用・保留理由、Mask・Generalization・委譲その他の公開成果物から確認できなくなる判断を保存する必要がある場合だけ作成する。

WebsiteはPresentationのみ更新する。

Public Repository ReflectionおよびWebsite Reflectionによって、Internal Publication Review RegistryまたはPRRを公開してはならない。

---

# 7. Publication Rules

Publicationでは次を必須とする。

* Internal Repositoryを唯一の正本とする。
* Public Repositoryの成果物はInternal Sourceから生成または管理された公開成果物とする。
* Public RepositoryからInternal Repositoryへ上書きしない。
* Human Reviewを必須とする。
* Public Documentationは一般利用者向けに編集する。
* 必要に応じてMaskおよびGeneralizationを実施する。
* 各管理対象のCurrent Publication ReviewをInternal Publication Review Registryへ記録する。
* 不採用・保留、Mask・Generalization・委譲その他の公開成果物から確認できなくなる判断が存在する場合だけPRRを作成する。
* Internal Publication Review RegistryおよびPRRをPublic Repositoryへ配置しない。
* Public成果物は公開契約に従って生成する。
* Websiteは公開成果物へのPresentationおよびNavigationだけを担当する。

---

# 8. Public Repository Boundary

Public Repositoryは公開成果物のみ保持する。

保持対象例

* Public Documentation
* Public Audit
* Public Architecture
* Notes
* Website Assets
* Publication Governance

保持してはならないもの

* Internal Evidence
* Runtime Evidence
* Internal Audit
* Internal Configuration Registry
* Internal Publication Review Registry
* PRR
* Human Working Notes
* Internal Decision

Public RepositoryはInternal Repositoryの代替として扱ってはならない。

Public Repositoryに公開対象一覧、内部Review Current StateまたはPublication Decision Historyを保持してはならない。

---

# 9. Relationship to Other Documents

| Document                               | Responsibility                            |
| -------------------------------------- | ----------------------------------------- |
| Publication Governance                 | Publication Contract                      |
| Internal Publication Review Registry   | Current Publication Review                |
| PRR                                    | 不採用・保留理由、Mask・Generalization・委譲その他の内部判断履歴 |
| Configuration Management               | Internal Configuration                    |
| Documentation Information Architecture | Documentation Responsibility              |
| Project State Transition               | Project Lifecycle                         |
| Definition of Done                     | Completion Criteria                       |
| Website Operations                     | Presentation                              |

各文書は責務を重複しない。

Internal Publication Review RegistryおよびPRRはInternal Repositoryで管理し、Public RepositoryへのNavigation対象としない。

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

Public Repositoryを直接修正してInternal Repositoryへ同期してはならない。

Internal Repositoryを更新した後、新たなPublication Processを開始する。

必要なPublication Review結果はInternal Publication Review Registryへ反映する。

公開成果物から確認できなくなる新たな判断が生じた場合はPRRへ記録する。

---

# 11. Prohibited Practices

次を禁止する。

* Public Repositoryを正本として扱うこと
* Websiteを正本として扱うこと
* Internal Publication Review RegistryへReview Historyを書くこと
* PRRへCurrent Publication Reviewを書くこと
* GovernanceへCurrent Publication Reviewを書くこと
* GovernanceへReview Historyを書くこと
* Internal Publication Review RegistryをPublic Repositoryへ配置すること
* PRRをPublic Repositoryへ配置すること
* PRRが不要な単純公開で形式的なPRR Entryを作成すること
* Public RepositoryからInternal Repositoryを更新すること
* Human Reviewなしに公開すること
* 機密情報を公開すること
* Internal Artifactをそのまま公開すること
* Websiteへ公開判断を保持すること
* WebsiteへInternal Publication Review RegistryまたはPRRの内容を複製すること
* 公開対象一覧または内部Review台帳をPublic Documentationとして公開すること

---

# 12. Verification and Definition of Done

Publicationは次を満たした場合のみ完了とする。

* Publication Classificationが完了している。
* Human Reviewが完了している。
* 必要なMaskまたはGeneralizationが完了している。
* Internal Publication Review RegistryがCurrent Publication Reviewへ更新されている。
* PRR要否が判定されている。
* PRRが必要な場合は、不採用・保留理由、Mask・Generalization・委譲その他の公開成果物から確認できなくなる判断がPRRへ記録されている。
* PRRが不要な場合は、公開成果物やGit履歴から消える判断情報が存在しないことを確認している。
* Internal Publication Review RegistryおよびPRRがPublic Repositoryへ配置されていない。
* Public Repositoryへ承認済み公開成果物が反映されている。
* Websiteへ必要なPresentationが反映されている。
* Internal Repositoryが唯一の正本であることを維持している。
* Public RepositoryまたはWebsiteに、公開対象一覧、内部Review Current StateまたはPublication Decision Historyが混入していない。

公開完了後もInternal Repositoryを変更した場合は、新たなPublication Processを開始する。

Internal Publication Review Registry、PRR、Public RepositoryおよびWebsiteを更新したことによって、Internal Repositoryの正本性は変化しない。
