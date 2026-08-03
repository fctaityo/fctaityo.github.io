# Publication Registry

## 1. Purpose

本書はLocal AI FoundryにおけるPublication Registryの正本である。

Publication Registryは、現在公開されている成果物(Current Publication State)のみを保持する。

本書は公開契約、公開判断履歴、公開手順、公開成果物そのものを保持しない。

それぞれ次を正本とする。

| 領域 | 正本 |
|---|---|
| Publication Contract | Publication Governance |
| Publication Current State | 本書 |
| Publication Decision History | Publication Reflection Register (PRR) |
| Public Artifact | Public Repository |
| Presentation | Website Operations |

---

# 2. Responsibility

Publication Registryの責務はCurrent Publication Stateのみである。

保持する情報は現在有効な公開状態のみとする。

過去の履歴は保持しない。

判断理由は保持しない。

公開契約は保持しない。

---

# 3. Registry Schema

各Publication Itemは次の項目を保持する。

| Field | Description |
|---|---|
| Publication ID | 固定識別子 |
| Artifact Name | 成果物名称 |
| Internal Source | Internal Repository上の正本 |
| Public Representation | Public Repository上の公開版 |
| Publication Classification | Public / Masked / Generalized / Not Published |
| Current Status | 現在状態 |
| Current Version | 現在公開Version |
| Public Repository | 公開Repository |
| Website Representation | Website掲載先 |
| Last Verified | 最終Verify日時 |
| Related PRR | 最新PRR ID |

RegistryはCurrent Stateのみ保持する。

---

# 4. Publication Classification

Classificationは次のみ許可する。

| Classification | Meaning |
|---|---|
| Public | 制限なしで公開 |
| Masked | 一部情報を伏せて公開 |
| Generalized | 一般化して公開 |
| Not Published | 公開対象外 |

Classification変更時はPRRを更新する。

---

# 5. Current Status

Current Statusは現在値のみ保持する。

許可する状態は次とする。

| Status | Meaning |
|---|---|
| Published | 公開中 |
| Archived | 公開終了 |
| Replaced | 新版へ置換済み |
| Withdrawn | 公開取り下げ |

履歴は保持しない。

---

# 6. Registry Update Rules

Registry更新は次の場合のみ許可する。

- 新規公開
- 公開終了
- 公開版更新
- Website反映先変更
- Verify結果更新

公開判断だけではRegistryを更新しない。

PRR確定後にCurrent Stateを更新する。

---

# 7. Relationship to Other Documents

| Document | Responsibility |
|---|---|
| Publication Governance | Publication Contract |
| Publication Registry | Current Publication State |
| Publication Reflection Register | Decision History |
| Website Operations | Presentation |
| Public Repository | Public Artifact |

責務を重複してはならない。

---

# 8. Registry Lifecycle

Publication RegistryはCurrent Stateのみ管理する。

```text
Not Published
        │
        ▼
Published
        │
   ┌────┴────┐
   ▼         ▼
Archived  Replaced
        │
        ▼
Withdrawn
```

状態遷移の判断はPublication Governanceに従う。

Registryは現在状態のみ保持する。

---

# 9. Prohibited Practices

次を禁止する。

- 履歴を書くこと
- 判断理由を書くこと
- Human Reviewを書くこと
- PRR内容を書くこと
- Website内容を書くこと
- Governance内容を書くこと
- Public Repository内容を書くこと
- Internal Repositoryを変更すること

RegistryはCurrent Stateのみ保持する。

---

# 10. Verification and Definition of Done

Registry更新は次を満たした場合のみ完了とする。

- PRRが確定している。
- Current Publication Stateが更新されている。
- 最新Classificationが反映されている。
- 最新Statusが反映されている。
- Website反映先が確認されている。
- Last Verifiedが更新されている。
- Related PRRが最新を指している。

RegistryはCurrent Stateのみを保持し、履歴管理は行わない。
