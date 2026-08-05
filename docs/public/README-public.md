# Local AI Foundry Documentation

> **Public Edition**
>
> このディレクトリは、Local AI Foundryの公開ドキュメント入口である。
> 内部運用資料、環境固有情報、非公開Evidence、実装上の識別情報は含めない。

このページでは、公開済みの設計、判断、Publication Contract、Configuration Audit、Operational Reviewへ辿るための導線を提供する。

Internal Repositoryを唯一の正本とし、このPublic Repositoryに配置されたDocumentationは承認済みの公開成果物として扱う。

## 最初に読む

* [Project Status](status-public.md): 公開可能な範囲で現在地と次の主要Gateを確認する
* [Architecture](architecture-public.md): システム全体の構造と責務境界を確認する
* [基本原則](principles-public.md): Local AI Foundryの設計思想を確認する
* [Glossary](glossary-public.md): Local AI Foundryで使用するProject固有用語を確認する
* [Publication Governance](../governance/publication-governance.md): 公開契約、責務境界、分類、公開フローを確認する
* [Website Operations](website-operations-public.md): 公式サイトの表示、導線、VersionおよびRelease運用を確認する
* [Configuration Audit一覧](configuration-audits/index.md): 公開済みConfiguration Auditを確認する
* [Operational Review一覧](reviews/index.md): 実運用で観測された事象と知見を確認する
* [ADR一覧](adr/): 重要な設計判断を確認する

## 目的別Navigation

| 目的                                    | 最初に開く文書                                                                                             | 次に確認する文書                                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 現在地と次の行動を知る                           | [Project Status](status-public.md)                                                                  | [Project State Governance Audit](configuration-audits/CFG-20260801-001-project-state-governance.md) |
| Project StateとCurrent Snapshotの考え方を知る | [Project State Governance Audit](configuration-audits/CFG-20260801-001-project-state-governance.md) | [Project Status](status-public.md)                                                                  |
| Project固有用語を確認する                      | [Glossary](glossary-public.md)                                                                      | 関連する公開文書                                                                                            |
| 公開契約と責務境界を知る                          | [Publication Governance](../governance/publication-governance.md)                                   | [Website Operations](website-operations-public.md)                                                  |
| 公式サイトの表示・導線・Release運用を確認する            | [Website Operations](website-operations-public.md)                                                  | [Publication Governance](../governance/publication-governance.md)                                   |
| 公開済みの構成監査結果を確認する                      | [Configuration Audit一覧](configuration-audits/index.md)                                              | 対象Audit本文                                                                                           |
| 重要な設計判断を確認する                          | [ADR一覧](adr/)                                                                                       | [Architecture](architecture-public.md)                                                              |
| 構造と責務境界を理解する                          | [Architecture](architecture-public.md)                                                              | 関連ADR、Configuration Audit                                                                           |
| 実運用で得られた知見を確認する                       | [Operational Review一覧](reviews/index.md)                                                            | 対象Review本文                                                                                          |

## Documentation Navigation構成

```mermaid
flowchart LR
    Status["Project Status<br/>公開可能な現在地"]
    ProjectState["Project State Governance<br/>State・Baseline・Current Snapshot"]
    PublicationGovernance["Publication Governance<br/>公開契約・責務境界"]
    Website["Website Operations<br/>Presentation Layer"]
    Audit["Configuration Audit<br/>同期状態・検証結果"]
    ADR["ADR<br/>重要な設計判断"]
    Architecture["Architecture<br/>構造・責務境界"]
    Review["Operational Review<br/>実運用知識"]

    Status -->|"現在地の背景"| ProjectState
    ProjectState -->|"検証結果"| Audit
    PublicationGovernance -->|"表示・公開導線"| Website
    Audit -->|"設計根拠"| ADR
    ADR -->|"構造上の位置付け"| Architecture
    Review -->|"必要に応じて設計判断へ昇華"| ADR
    Architecture -->|"公開可能な現在地へ戻る"| Status
```

矢印は情報の複製方向ではなく、公開利用者が次に確認する文書を示す。

Publication GovernanceとWebsite Operationsは相互に代替しない。

* Publication Governance: 公開契約
* Website Operations: Presentation Layer

## 公開ドキュメント

### はじめに

* [基本原則](principles-public.md): 設計思想
* [Architecture](architecture-public.md): システム構成とデータフロー
* [Project Status](status-public.md): 公開可能なCurrent Snapshot
* [Glossary](glossary-public.md): Project固有用語のCurrent Reference

### Publication

* [Publication Governance](../governance/publication-governance.md): 公開契約、分類、責務境界、公開フロー
* [Website Operations](website-operations-public.md): 公式ホームページのPresentation Layer、導線、VersionおよびRelease運用

### 設計・判断

* [ADR一覧](adr/): 重要な設計判断
* [Project State Governance Audit](configuration-audits/CFG-20260801-001-project-state-governance.md): Project State Governance導入の公開実例

### Configuration Audit

* [Public Configuration Audit](configuration-audits/README.md): 公開版Auditの考え方とマスク方針
* [Configuration Audit一覧](configuration-audits/index.md): 公開済みAuditの索引

### Operational Review

* [Operational Review規約](reviews/README.md)
* [Operational Review一覧](reviews/index.md)

## 公開版の範囲

公開版には、利用者が設計思想、責務境界、公開契約、判断理由および公開済み監査結果を理解するために必要な情報を掲載する。

次の情報は削除または一般化する。

* App ID、Workflow ID、Draft ID、Run ID
* Commit SHA、hash、fingerprint
* ローカル環境Path、内部Repository Path
* Database情報、認証情報、接続情報
* Repository外の承認記録全文
* 内部Working Treeの具体的差分
* 非公開Evidenceの詳細
* 内部管理資料
* 内部運用上の判断履歴
* 公開対象として承認されていないDocumentation

Public RepositoryまたはWebsiteをInternal Repositoryの正本の代替として扱わない。

## Navigation Verification

本ページの更新は次を確認して完了とする。

* Publication Governanceへのリンクが有効である
* Website Operationsへのリンクが有効である
* Project Status、Architecture、基本原則へのリンクが有効である
* ADR、Configuration Audit、Operational Reviewの各入口へ到達できる
* Internal Repositoryだけが正本であることを明示している
* Public Repositoryを公開成果物、WebsiteをPresentation Layerとして扱っている
* 内部資料または未公開Documentationへの直接導線が存在しない
* 各公開文書の責務が重複していない
