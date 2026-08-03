# Publication Registry

## 1. Purpose

本書はLocal AI FoundryにおけるPublication Registryの正本である。

Publication Registryは、Internal Repository上の文書とPublic Repository上の公開成果物との対応関係、および現在有効な公開状態（Current Publication State）を保持する。

本書は公開契約、公開判断履歴、公開手順、公開成果物そのものを保持しない。

それぞれ次を正本とする。

| 領域 | 正本 |
|---|---|
| Publication Contract | Publication Governance |
| Publication Current State | 本書 |
| Publication Decision History | Publication Reflection Register (PRR) |
| Public Artifact | Public Repository |
| Presentation | Website Operations |
| Internal Source | Internal Repository |

---

## 2. Responsibility

Publication Registryの責務は、次のCurrent Stateを一意に管理することである。

- Internal Source
- Publication Type
- Publication Classification
- Public Representation
- Current Status
- Current Version
- Public Repository
- Website Representation
- Last Verified
- Related PRR

本書は、どのInternal文書が、どのPublication TypeおよびPublication Classificationによって、どのPublic成果物へ対応しているかを示す。

過去の履歴は保持しない。

判断理由は保持しない。

公開契約は保持しない。

不採用、保留、Mask、Generalization、他文書への委譲その他のPublication Review判断は、必要に応じてPRRへ記録する。

---

## 3. Registry Schema

各Publication Itemは次の項目を保持する。

| Field | Description |
|---|---|
| Publication ID | Publication Itemを一意に識別する固定ID |
| Artifact Name | 公開成果物または管理対象文書の名称 |
| Internal Source | Internal Repository上の正本。Public Canonicalでは`Not Applicable`を使用する |
| Publication Type | Public Canonical / Derived / Reference / Internal Only |
| Public Representation | Public Repository上の公開版。非公開の場合は`Not Applicable` |
| Publication Classification | Public / Masked / Generalized / Not Published |
| Current Status | 現在の公開状態 |
| Current Version | 現在公開されているVersion。文書単独Versionを持たない場合は`Repository Current` |
| Public Repository | 公開成果物を保持するRepository。非公開の場合は`Not Applicable` |
| Website Representation | Website上の掲載先または導線。存在しない場合は`Not Applicable` |
| Last Verified | Current Stateを最後に確認したJST日時 |
| Related PRR | 関連PRR ID。PRR不要の場合は`Not Required` |

RegistryはCurrent Stateのみ保持する。

---

## 4. Publication Type

Publication Typeは、Publication ItemがPublic Repository上で担う責務を示す。

| Publication Type | Responsibility |
|---|---|
| Public Canonical | Public Repository上で正本として管理する公開文書 |
| Derived | Internal正本から生成または編集する公開派生物 |
| Reference | 公開記事またはPublic Documentationを補助するReference |
| Internal Only | Public Repositoryへ公開しない文書 |

Publication TypeとPublication Classificationは別概念である。

Publication Typeは文書の責務を示し、Publication Classificationは公開時の取り扱いを示す。

次のような組み合わせを許可する。

```text
Derived + Public
Derived + Masked
Derived + Generalized
Reference + Public
Internal Only + Not Published
```

Publication Typeの追加または変更にはHuman Reviewを必要とする。

Publication Typeの定義はPublication Governanceを正本とし、本書は各Publication Itemの現在値だけを保持する。

---

## 5. Publication Classification

Classificationは次のみ許可する。

| Classification | Meaning |
|---|---|
| Public | 制限なしで公開 |
| Masked | 一部情報を伏せて公開 |
| Generalized | 内部固有情報を一般化して公開 |
| Not Published | 公開対象外 |

Classification変更時はPRR要否を判定する。

不採用・保留、またはMask / Generalization判断が公開物やGit履歴から確認できなくなる場合だけPRRを更新する。

---

## 6. Current Status

Current Statusは現在値のみ保持する。

許可する状態は次とする。

| Status | Meaning |
|---|---|
| Not Published | 現在Public Repositoryへ公開されていない |
| Published | 公開中 |
| Archived | 公開終了後も参照用として保持している |
| Replaced | 新版または別成果物へ置換済み |
| Withdrawn | 公開を取り下げた |

履歴は保持しない。

---

## 7. Registry Update Rules

Registry更新は次の場合のみ許可する。

- Human ReviewによりPublication Typeを確定したInternal文書をPublication管理対象へ追加する
- Publication TypeをHuman Reviewにより追加または変更する
- 新規公開する
- 公開終了する
- 公開版を更新する
- Internal SourceまたはPublic Representationの対応先を変更する
- Publication Classificationを変更する
- Website反映先を変更する
- Verify結果を更新する

公開判断だけではRegistryを更新しない。

公開反映とVerifyが成立した後にCurrent Stateを更新する。

PRRが必要な場合は、対応するPRR確定後に更新する。

PRRが不要な場合は、`Related PRR`へ`Not Required`を記録する。

Internal Onlyを含むPublication Itemは、公開対象外である現在値を明示するためRegistryへ保持できる。

Registry行は削除せず、公開終了または置換時はCurrent Statusを更新する。

---

## 8. Relationship to Other Documents

| Document | Responsibility |
|---|---|
| Publication Governance | Publication Contract、Publication TypeおよびPublication Classificationの定義 |
| Publication Registry | Internal SourceとPublic Representationの対応関係、およびCurrent Publication State |
| Publication Reflection Register | 採用・不採用・保留理由、およびMask / Generalization判断の内部履歴 |
| Documentation Information Architecture | Internal Documentationの配置と責務 |
| Website Operations | Presentation |
| Public Repository | Public Artifact |
| Internal Repository | Internal Sourceおよび唯一の正本 |

責務を重複してはならない。

---

## 9. Registry Lifecycle

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
   │         │
   └────┬────┘
        ▼
Withdrawn
```

状態遷移の判断はPublication Governanceに従う。

Registryは現在状態のみ保持する。

Publication Typeの変更はStatus Transitionではない。

Publication Classificationの変更もStatus Transitionとは分離して管理する。

---

## 10. Prohibited Practices

次を禁止する。

- 履歴を書くこと
- 判断理由を書くこと
- Human Review本文を書くこと
- PRR内容を複製すること
- PRRが不要な公開で架空のPRR IDを書くこと
- Website内容を複製すること
- Governance内容を再定義すること
- Public Repository内容を本文へ転載すること
- Internal Repositoryを変更すること
- Documentation Information Architectureへの掲載だけを根拠にPublication Itemへ登録すること
- Internal Sourceを確認せずPublic Representationを登録すること
- Public Representationを確認せずPublishedへ変更すること
- Publication TypeとPublication Classificationを同一項目として扱うこと
- Internal OnlyをNot Published以外のClassificationで登録すること
- Public Canonicalへ架空のInternal Sourceを設定すること
- Collection単位の登録だけで個別管理が必要なPublication Itemを省略すること

RegistryはInternal文書とPublic成果物の対応関係、およびCurrent Stateのみを保持する。

---

## 11. Verification and Definition of Done

Registry更新は次を満たした場合のみ完了とする。

- 対象Internal Sourceを確認している。
- Publication TypeがPublication Governanceの定義と一致している。
- Publication Classificationが最新判断と一致している。
- Public Representationの実在を確認している。
- Internal SourceとPublic Representationの対応関係が正しい。
- Current Publication Stateが更新されている。
- 最新Statusが反映されている。
- Current Versionが反映されている。
- Public Repositoryが確認されている。
- Website反映先が確認されている。
- Last Verifiedが更新されている。
- PRR要否が判定されている。
- PRRが必要な場合は、Related PRRが対応する最新PRRを指している。
- PRRが不要な場合は、Related PRRが`Not Required`である。
- Public CanonicalではInternal Sourceが`Not Applicable`である。
- Internal OnlyではPublic Representation、Public RepositoryおよびWebsite Representationが`Not Applicable`である。
- Registryが履歴または判断理由を保持していない。

RegistryはInternal文書とPublic成果物の対応関係、およびCurrent Stateのみを保持し、履歴管理は行わない。
