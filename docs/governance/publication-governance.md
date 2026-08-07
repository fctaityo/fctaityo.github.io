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
| Publication Review Current State | Internal Publication Review Registry |
| Publication Decision History | Publication Reflection Register（PRR / Private） |
| Public Contents | Public Repository |
| Presentation | Website Operations |
| Internal Source | Internal Repository |

Internal Publication Review RegistryはInternal Repositoryで管理する。

PRRはPrivate ArtifactとしてHuman-controlled Private Storageで管理し、
Internal RepositoryおよびPublic Repositoryへ配置しない。

Internal RepositoryへのReflectionを即時実施できない場合は、
本書が定めるDeferred Internal Reflection ModeによりPublicationを継続できる。

Deferred Internal Reflectionを使用しても、
Internal Repositoryが唯一の正本であることは変わらない。

---

# 2. Publication Responsibility Model

Publicationは責務単位で分離する。

| Component | Responsibility |
|---|---|
| Internal Repository | 唯一の正本（Single Source of Truth） |
| Publication Governance | 公開契約・公開統制 |
| Internal Publication Review Registry | 管理対象ごとの現在有効なPublication Review結果 |
| Publication Reflection Register | 公開物やGit履歴から確認できなくなるPublication Review判断履歴を保持するPrivate Artifact |
| Deferred Reflection Management | Internal Reflection待ちを管理する内部運用 |
| Public Repository | 公開成果物 |
| Website | Presentation Layer |

責務を重複させない。

Current Publication ReviewをGovernanceへ保持してはならない。

Review HistoryをInternal Publication Review Registryへ保持してはならない。

公開物をGovernanceへ保持してはならない。

PRRには、不採用・保留理由、または公開時のMask・Generalization・委譲その他の公開成果物から確認できなくなる判断だけを保持する。

PRRはPrivate Artifactであり、Internal Publication Review Registryは必要に応じてRelated PRR IDだけを参照する。

Deferred Reflection Managementは内部運用であり、
Current Publication Review、PRRまたはInternal Sourceの正本として扱ってはならない。

---

# 3. Publication Layer Model

Publication LayerはNormal Reflection Modeを標準とし、
Internal Reflectionを即時実施できない場合だけDeferred Internal Reflection Modeを使用する。

## 3.1 Normal Reflection Mode

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
        └── Private PRR（必要な場合のみ）
        │
        ▼
Public Repository
        │
        ▼
Website
```

## 3.2 Deferred Internal Reflection Mode

```text
Confirmed Internal Source
        │
        ▼
Publication Governance
        │
        ▼
Publication Review
        │
        ▼
Deferred Reflection Management
        │
        ▼
Public Repository
        │
        ▼
Website
        │
        ▼
Public Release Complete
        │
        ▼
Internal Reflection Pending
        │
        ▼
Internal Source Reconciliation
        │
        ▼
Internal Publication Review Registry
        │
        ├── Related Private PRR（必要な場合のみ）
        │
        ▼
Publication Synchronization Complete
```

Deferred Internal Reflection Modeでは、
Internal Publication Review RegistryへのRepository Reflectionおよび必要なPrivate PRRの確定を後続へ遅延できる。

ただし、Human Review、Publication Review、Internal Sourceの識別およびPRR要否判定を省略してはならない。

Public Artifactが先に成立しても、
Public RepositoryからInternal Repositoryへ逆同期してはならない。

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
        PRR要否判定
             │
      ┌──────┴──────┐
      │             │
 必要             不要
      │             │
 Private PRR対象   記録なし
      └──────┬──────┘
             ▼
      Reflection Mode判定
             │
      ┌──────┴──────┐
      │             │
 Normal          Deferred
      │             │
      ▼             ▼
 Internal       Deferred
 Reflection     Management
      │             │
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

Deferred ModeではPrivate PRRの確定を後続へ遅延できるが、
PRR要否判定そのものを遅延してはならない。

---

# 5. Publication Boundary

各Layerは責務を超えてはならない。

| Layer | Responsibility |
|---|---|
| Internal Repository | 正本 |
| Publication Governance | Publication Contract |
| Internal Publication Review Registry | Current Publication Review |
| PRR | 公開物やGit履歴から確認できなくなるDecision Historyを保持するPrivate Artifact |
| Deferred Reflection Management | Internal Reflection Pendingの内部運用管理 |
| Public Repository | Published Artifact |
| Website | Presentation |

責務を横断して情報を保持してはならない。

Internal Publication Review RegistryはInternal責務、PRRおよびDeferred Reflection ManagementはPrivate責務である。

Public RepositoryおよびWebsiteへ、
Publication Reviewの内部管理情報、Decision HistoryまたはInternal Reflection Pendingの詳細を保持してはならない。

---

# 6. Publication Workflow

Publication WorkflowはNormal Reflection ModeとDeferred Internal Reflection Modeを持つ。

## 6.1 Normal Reflection Mode

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
Private PRR Recording
   └────┬────┘
        ▼
Public Repository Reflection
        │
        ▼
Website Reflection
        │
        ▼
Publication Synchronization Complete
```

## 6.2 Deferred Internal Reflection Mode

Deferred Modeは、
Internal RepositoryへのReflectionを即時実施できない明確な理由があり、
Humanがその使用を承認した場合だけ使用する。

```text
Internal Source Identification
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
        ▼
Deferred Reflection Management
        │
        ▼
Public Repository Reflection
        │
        ▼
Website Reflection
        │
        ▼
Public Release Complete
        │
        ▼
Internal Reflection Pending
        │
        ▼
Internal Source Reconciliation
        │
        ▼
Internal Publication Review Registry Update
        │
        ├── Private PRR Recording（必要な場合）
        │
        ▼
Publication Synchronization Complete
```

Deferred Modeの詳細な管理方法、Reflection Input、Pending管理、
Conflict処理およびRecovery手順はInternal Operationsで定義する。

WebsiteはPresentationのみ更新する。

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
* Internal Publication Review RegistryをPublic Repositoryへ配置しない。
* PRRをInternal RepositoryまたはPublic Repositoryへ配置しない。
* Public成果物は公開契約に従って生成する。
* Websiteは公開成果物へのPresentationおよびNavigationだけを担当する。
* Normal Reflection Modeを標準とする。
* Internal Reflectionを即時実施できない場合だけDeferred Internal Reflection Modeを使用する。
* Deferred ModeでもInternal Sourceの識別、Human Review、Publication ReviewおよびPRR要否判定を省略しない。
* Deferred Reflectionの管理情報をInternal Source、Current Publication ReviewまたはPRRの正本として扱わない。
* Internal Reflection再開時はCurrent Internal Sourceとの整合を確認してからReflectionする。
* Conflictがある場合はPublic ArtifactをInternalへ逆輸入せず、Current Internal Sourceを基準に再評価する。
* Public Release CompleteとPublication Synchronization Completeを区別する。

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
* PRRを含むPrivate Publication Decision Artifact
* Deferred Reflection Management Artifact
* Internal Reflection Pending一覧
* Human Working Notes
* Internal Decision

Public RepositoryはInternal Repositoryの代替として扱ってはならない。

Public Repositoryに公開対象一覧、内部Review Current State、
Publication Decision HistoryまたはDeferred Reflectionの内部管理情報を保持してはならない。

---

# 9. Relationship to Other Documents

| Document | Responsibility |
|---|---|
| Publication Governance | Publication Contract |
| Internal Publication Review Registry | Current Publication Review |
| PRR | 不採用・保留理由、Mask・Generalization・委譲その他の内部判断履歴を保持するPrivate Artifact |
| Deferred Reflection Operations | Deferred Internal Reflectionの内部運用 |
| Configuration Management | Internal Configuration |
| Documentation Information Architecture | Documentation Responsibility |
| Project State Transition | Project Lifecycle |
| Definition of Done | Completion Criteria |
| Website Operations | Presentation |

各文書は責務を重複しない。

Internal Publication Review RegistryおよびDeferred Reflection OperationsはInternal管理とし、PRRはPrivate管理とする。

いずれもPublic RepositoryへのNavigation対象としない。

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

Deferred Internal ReflectionもPublic RepositoryからInternal Repositoryへの逆同期ではない。

Deferred ModeではPublication時に識別したInternal SourceとCurrent Internal Sourceを照合し、
必要なHuman Reviewを経て正式Reflectionする。

Internal Repositoryを更新した後、必要な場合は新たなPublication Processを開始する。

必要なPublication Review結果はInternal Publication Review Registryへ反映する。

公開成果物から確認できなくなる新たな判断が生じた場合はPRRへ記録する。

---

# 11. Prohibited Practices

次を禁止する。

* Public Repositoryを正本として扱うこと
* Websiteを正本として扱うこと
* Deferred Reflection Management Artifactを正本として扱うこと
* Internal Publication Review RegistryへReview Historyを書くこと
* PRRへCurrent Publication Reviewを書くこと
* GovernanceへCurrent Publication Reviewを書くこと
* GovernanceへReview Historyを書くこと
* Internal Publication Review RegistryをPublic Repositoryへ配置すること
* PRRをInternal RepositoryまたはPublic Repositoryへ配置すること
* Deferred Reflectionの内部管理情報をPublic Repositoryへ配置すること
* PRRが不要な単純公開で形式的なPRR Entryを作成すること
* Public RepositoryからInternal Repositoryを自動更新または上書きすること
* Public Artifactから失われたInternal SourceまたはHistorical Decisionを推測再生成すること
* Internal Sourceを識別せずDeferred Modeを使用すること
* Current Internal Sourceとの整合確認なしにDeferred ReflectionをInternalへ反映すること
* Human Reviewなしに公開すること
* 機密情報を公開すること
* Internal Artifactをそのまま公開すること
* Websiteへ公開判断を保持すること
* WebsiteへInternal Publication Review Registry、PRRまたはDeferred Reflectionの内部管理情報を複製すること
* 公開対象一覧または内部Review台帳をPublic Documentationとして公開すること
* Deferred Internal ReflectionをProject State TransitionまたはActive Baseline Transitionとして扱うこと

---

# 12. Verification and Definition of Done

Publicationの完了状態は次の2段階へ分離する。

## 12.1 Public Release Complete

Public Releaseは次を満たした場合にCompleteとする。

* Publication Classificationが完了している。
* Human Reviewが完了している。
* 必要なMaskまたはGeneralizationが完了している。
* PRR要否が判定されている。
* Public Repositoryへ承認済み公開成果物が反映されている。
* Websiteへ必要なPresentationが反映されている。
* Public側の反映結果が検証されている。
* Internal Repositoryが唯一の正本であることを維持している。
* Public RepositoryまたはWebsiteに内部管理情報が混入していない。

Deferred Modeでは、これに加えて次を満たす。

* Publication対象のInternal Sourceが識別されている。
* Internal Reflection Pendingが内部運用上追跡可能である。

Public Release CompleteはPublication Synchronization Completeを意味しない。

## 12.2 Publication Synchronization Complete

Publication Synchronizationは次を満たした場合にCompleteとする。

* Current Internal Sourceとの整合確認が完了している。
* Conflictがある場合はHuman ReviewまたはPublication Re-reviewが完了している。
* Internal Publication Review RegistryがCurrent Publication Reviewへ更新されている。
* PRRが必要な場合は、公開成果物から確認できなくなる判断がPrivate PRRへ記録され、Internal Publication Review RegistryからRelated PRR IDを参照できる。
* PRRが不要な場合は、公開成果物やGit履歴から消える判断情報が存在しないことを確認している。
* 必要なInternal Reflectionが正式に完了している。
* Internal Reflection結果が検証されている。
* Internal Repositoryが唯一の正本であることを維持している。

公開完了後もInternal Repositoryを変更した場合は、必要な新たなPublication Processを開始する。

Internal Publication Review Registry、PRR、Deferred Reflection Management、
Public RepositoryおよびWebsiteを更新したことによって、Internal Repositoryの正本性は変化しない。
