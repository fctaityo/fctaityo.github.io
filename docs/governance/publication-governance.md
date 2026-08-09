# Publication Governance

## 1. Purpose and Authority

本書は、Local AI FoundryにおけるPublication Governanceの正本である。

Publicationとは、Internal Repositoryで管理される成果物をPublic RepositoryおよびWebsiteへ反映する際の統制契約を定義する。

本書は公開可否の判断基準、責務境界、公開フローおよび禁止事項のみを定義する。

本書は現在状態、Human-controlled Private History、公開成果物そのものを保持しない。

それぞれ次を正本とする。

| 領域 | 正本 |
|---|---|
| Publication Contract | 本書 |
| Publication Review Current State | Internal Publication Review Registry |
| Public Contents | Public Repository |
| Presentation | Website Operations |
| Internal Source | Internal Repository |

Internal Publication Review RegistryはInternal Repositoryで管理する。

Publication判断に関するHuman-controlled Private HistoryはPublication Execution Contractの外部責務である。

Private Artifactの名称、ID、Path、SHA、Revision、存在、記録状態または更新状態を、Internal Publication Review Registry、Deferred Internal Reflection、Public Reflection、VerificationまたはPublication完了条件として要求してはならない。

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
| Deferred Reflection Management | Internal Reflection待ちを管理する内部運用 |
| Public Repository | 公開成果物 |
| Website | Presentation Layer |

責務を重複させない。

Current Publication ReviewをGovernanceへ保持してはならない。

Review HistoryをInternal Publication Review Registryへ保持してはならない。

公開物をGovernanceへ保持してはならない。

Human-controlled Private HistoryはHuman側の責務であり、Publication Execution、Internal Current State、Public ArtifactまたはWebsite Presentationの成立条件として扱ってはならない。

InternalまたはCODEX-facing Current Documentationは、Human-controlled Private Artifactの名称、ID、Path、SHA、Revision、存在または状態を参照、要求、検証またはExecution Dependencyとして使用してはならない。

Deferred Reflection Managementは内部運用であり、
Current Publication ReviewまたはInternal Sourceの正本として扱ってはならない。

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
        ▼
Human Decision
        │
        ▼
Internal Publication Review Registry
        │
        ▼
Public Repository
        │
        ▼
Website
```

Publication Executionへ渡す判断情報は、Human-approved Current Publication Decisionに限定する。

Human-controlled Private HistoryはこのExecution Flowの外部で管理し、本Flowの入力、Gateまたは完了条件として扱わない。

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
Human Decision
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
        ▼
Publication Synchronization Complete
```

Deferred Internal Reflection Modeでは、
Internal Publication Review RegistryへのRepository Reflectionを後続へ遅延できる。

ただし、Human Review、Publication Review、Internal Sourceの識別およびHuman Authorizationを省略してはならない。

Deferred Reflection後のInternal作業へは、Human-approved Current Publication DecisionだけをExecution Inputとして渡す。

Human-controlled Private Artifactの名称、ID、Path、SHA、Revisionまたは状態をDeferred Reflection Inputとして要求してはならない。

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

Publication ReviewからExecutionへ渡すCurrent Decisionは、Publication Type、Publication Classification、Review Status、Selection Reason、Public Representation、Mask / Generalization結果およびHuman Approval / Authorizationに限定する。

Human-controlled Private Historyの記録要否、保存形式または管理状態は、本Decision TreeおよびPublication ExecutionのGateに含めない。

---

# 5. Publication Boundary

各Layerは責務を超えてはならない。

| Layer | Responsibility |
|---|---|
| Internal Repository | 正本 |
| Publication Governance | Publication Contract |
| Internal Publication Review Registry | Current Publication Review |
| Deferred Reflection Management | Internal Reflection Pendingの内部運用管理 |
| Public Repository | Published Artifact |
| Website | Presentation |

責務を横断して情報を保持してはならない。

Internal Publication Review RegistryおよびDeferred Reflection OperationsはInternal責務である。

Human-controlled Private HistoryはHuman側のPrivate責務であり、Internal Publication Review Registry、Deferred Reflection Management、Public RepositoryまたはWebsiteの責務へ取り込まない。

Public RepositoryおよびWebsiteへ、
Publication Reviewの内部管理情報、Human-controlled Private HistoryまたはInternal Reflection Pendingの詳細を保持してはならない。

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
Human-approved Current Publication Decision
        │
        ▼
Internal Publication Review Registry Update
        │
        ▼
Public Repository Reflection
        │
        ▼
Website Reflection
        │
        ▼
Publication Synchronization Complete
```

Human-controlled Private Historyの作成、更新、識別または検証は、このExecution Flowの前提条件または完了条件ではない。

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
Human-approved Current Publication Decision
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
        ▼
Publication Synchronization Complete
```

Deferred Modeの詳細な管理方法、Reflection Input、Pending管理、
Conflict処理およびRecovery手順はInternal Operationsで定義する。

Internal Operationsは、Human-approved Current Publication DecisionをExecution Inputとして使用し、Human-controlled Private Artifactを入力、Gate、Evidenceまたは完了条件として要求してはならない。

WebsiteはPresentationのみ更新する。

---

# 7. Publication Rules

Publicationでは次を必須とする。

* Internal Repositoryを唯一の正本とする。
* Public Repositoryの成果物はInternal Sourceから生成または管理された公開成果物とする。
* Public RepositoryからInternal Repositoryへ上書きしない。
* Human Reviewを必須とする。
* Human-approved Current Publication DecisionをPublication Executionの正規入力とする。
* Public Documentationは一般利用者向けに編集する。
* 必要に応じてMaskおよびGeneralizationを実施する。
* 各管理対象のCurrent Publication ReviewをInternal Publication Review Registryへ記録する。
* Internal Publication Review RegistryをPublic Repositoryへ配置しない。
* Human-controlled Private ArtifactをInternal RepositoryまたはPublic Repositoryへ配置しない。
* Human-controlled Private Artifactの名称、ID、Path、SHA、Revision、存在または状態をInternal / CODEX-facing Execution Contractへ含めない。
* Public成果物は公開契約に従って生成する。
* Websiteは公開成果物へのPresentationおよびNavigationだけを担当する。
* Normal Reflection Modeを標準とする。
* Internal Reflectionを即時実施できない場合だけDeferred Internal Reflection Modeを使用する。
* Deferred ModeでもInternal Sourceの識別、Human Review、Publication ReviewおよびHuman Authorizationを省略しない。
* Deferred Reflectionの管理情報をInternal SourceまたはCurrent Publication Reviewの正本として扱わない。
* Internal Reflection再開時はCurrent Internal Sourceとの整合を確認してからReflectionする。
* Conflictがある場合はPublic ArtifactをInternalへ逆輸入せず、Current Internal Sourceを基準に再評価する。
* Public Release CompleteとPublication Synchronization Completeを区別する。
* Human-controlled Private Historyの管理状態はPublic Release CompleteまたはPublication Synchronization Completeの成立条件にしない。

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
* Human-controlled Private Publication Decision Artifact
* Deferred Reflection Management Artifact
* Internal Reflection Pending一覧
* Human Working Notes
* Internal Decision

Public RepositoryはInternal Repositoryの代替として扱ってはならない。

Public Repositoryに公開対象一覧、内部Review Current State、
Human-controlled Private HistoryまたはDeferred Reflectionの内部管理情報を保持してはならない。

---

# 9. Relationship to Other Documents

| Document | Responsibility |
|---|---|
| Publication Governance | Publication Contract |
| Internal Publication Review Registry | Current Publication Review |
| Deferred Reflection Operations | Deferred Internal Reflectionの内部運用 |
| Configuration Management | Internal Configuration |
| Documentation Information Architecture | Documentation Responsibility |
| Project State Transition | Project Lifecycle |
| Definition of Done | Completion Criteria |
| Website Operations | Presentation |

各文書は責務を重複しない。

Internal Publication Review RegistryおよびDeferred Reflection OperationsはInternal管理とする。

Human-controlled Private Historyは本Relationship ModelのExecution Dependencyに含めない。

Internal Publication Review RegistryおよびDeferred Reflection OperationsはPublic RepositoryへのNavigation対象としない。

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

公開成果物から確認できなくなる判断をHumanがPrivate Historyとして保持する場合でも、そのPrivate管理はPublication Execution、Internal ReflectionまたはPublication完了状態へ依存させない。

---

# 11. Prohibited Practices

次を禁止する。

* Public Repositoryを正本として扱うこと
* Websiteを正本として扱うこと
* Deferred Reflection Management Artifactを正本として扱うこと
* Internal Publication Review RegistryへReview Historyを書くこと
* GovernanceへCurrent Publication Reviewを書くこと
* GovernanceへReview Historyを書くこと
* Internal Publication Review RegistryをPublic Repositoryへ配置すること
* Human-controlled Private ArtifactをInternal RepositoryまたはPublic Repositoryへ配置すること
* Human-controlled Private Artifactの名称、ID、Path、SHA、Revision、存在、記録状態または更新状態をInternal / CODEX-facing Current Documentationで参照、要求、検証またはExecution Dependencyとして使用すること
* Human-controlled Private Historyの成立、更新または整合をPublic Release CompleteまたはPublication Synchronization Completeの条件にすること
* Deferred Reflectionの内部管理情報をPublic Repositoryへ配置すること
* Public RepositoryからInternal Repositoryを自動更新または上書きすること
* Public Artifactから失われたInternal SourceまたはHistorical Decisionを推測再生成すること
* Internal Sourceを識別せずDeferred Modeを使用すること
* Current Internal Sourceとの整合確認なしにDeferred ReflectionをInternalへ反映すること
* Human Reviewなしに公開すること
* 機密情報を公開すること
* Internal Artifactをそのまま公開すること
* Websiteへ公開判断を保持すること
* WebsiteへInternal Publication Review RegistryまたはDeferred Reflectionの内部管理情報を複製すること
* 公開対象一覧または内部Review台帳をPublic Documentationとして公開すること
* Deferred Internal ReflectionをProject State TransitionまたはActive Baseline Transitionとして扱うこと

---

# 12. Verification and Definition of Done

Publicationの完了状態は次の2段階へ分離する。

## 12.1 Public Release Complete

Public Releaseは次を満たした場合にCompleteとする。

* Publication Classificationが完了している。
* Human Reviewが完了している。
* Human-approved Current Publication Decisionが成立している。
* 必要なMaskまたはGeneralizationが完了している。
* Public Repositoryへ承認済み公開成果物が反映されている。
* Websiteへ必要なPresentationが反映されている。
* Public側の反映結果が検証されている。
* Internal Repositoryが唯一の正本であることを維持している。
* Public RepositoryまたはWebsiteに内部管理情報またはHuman-controlled Private情報が混入していない。

Deferred Modeでは、これに加えて次を満たす。

* Publication対象のInternal Sourceが識別されている。
* Internal ReflectionのDeferred使用がHuman Authorizationによって承認されている。

Public Release CompleteはPublication Synchronization Completeを意味しない。

## 12.2 Publication Synchronization Complete

Publication Synchronizationは次を満たした場合にCompleteとする。

* Current Internal Sourceとの整合確認が完了している。
* Conflictがある場合はHuman ReviewまたはPublication Re-reviewが完了している。
* Human-approved Current Publication DecisionがCurrentである。
* Internal Publication Review RegistryがCurrent Publication Reviewへ更新されている。
* 必要なInternal Reflectionが正式に完了している。
* Internal Reflection結果が検証されている。
* Internal Repositoryが唯一の正本であることを維持している。
* Human-controlled Private Artifactの存在、ID、状態または更新結果に依存せず上記条件を判定できる。

公開完了後もInternal Repositoryを変更した場合は、必要な新たなPublication Processを開始する。

Internal Publication Review Registry、Deferred Reflection Management、
Public RepositoryおよびWebsiteを更新したことによって、Internal Repositoryの正本性は変化しない。
