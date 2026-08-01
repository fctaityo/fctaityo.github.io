# Configuration Item Registry

> **Public Edition**
>
> 本書は、Local AI Foundryで使用しているConfiguration Itemの考え方と、
> 公開記事・公開ドキュメントから参照されるItemだけを掲載する公開版Registryである。
>
> 内部運用Registryの複製ではない。環境固有情報、実装識別子、内部Evidence、
> 未公開Item、詳細な依存関係は掲載しない。

## 目的

Configurationは、コードのように一つのRepositoryだけへ存在するとは限らない。

同じPromptやParameterでも、Draft、DSL、GUI、Published、Runtimeなど、
複数のRepresentationに別々の状態で存在しうる。

Configuration Itemは、その差分、採用判断、検証、同期状態を独立して管理するための最小単位である。

> Configuration Itemは、独立して差分、採用判断、検証、同期状態を管理する最小単位である。

本書では、公開記事や公開Documentationの理解に必要なItemだけを登録し、
内部実装を再現できる情報は掲載しない。

## Public Registry

### <a id="cfg-a002"></a>`CFG-A002` — Research Prompt

| Field | Public Value |
|---|---|
| Category | Agent Prompt |
| Representation | Draft / DSL / GUI / Published / Runtime |
| Current Owner | `Unresolved` |
| Current Status | `Blocked` |
| Risk | `High` |
| Public Summary | Draft側とDSL側の双方に有効な変更が存在し、採用方向が未確定 |
| Public Purpose | 複数のRepresentationに正しい変更が同時に存在しうる例 |

#### 状態の意味

`CFG-A002`では、Draft側とDSL側の双方に、それぞれ目的を持った有効な変更が存在した。

どちらか一方が単純に誤りなのではなく、両方を無条件に同時採用できないことが問題となる。
GitはDSLの差分を確認できるが、Draft側の変更を自動的には比較・統合しない。

このため、採用元を人間が決定し、必要なRepresentationへ同期し、
検証が完了するまで`Blocked`として扱う。

この例が示すのは、Configurationの矛盾が必ずしもバグや事故ではないということだ。
異なる場所とタイミングで有効な変更が発生する以上、採用判断そのものを管理する必要がある。

## Field Definitions

### Category

Configuration Itemの種類を示す。

公開版では、次のような一般分類を使用する。

- Graph / Node Configuration
- Agent Prompt
- Contract / Code / Gate
- LLM Parameters
- Provider
- Runtime
- Documentation / Governance

### Representation

Configuration Itemが存在、保存、編集、または観測される場所を示す。

| Representation | 意味 |
|---|---|
| `Draft` | Difyの未公開Workflowに保存された状態 |
| `DSL` | Gitで管理されるWorkflow定義 |
| `GUI` | 人間が画面上で編集・確認する状態 |
| `Published` | 公開Workflowが使用する状態 |
| `Runtime` | 実行時に観測された実効状態 |
| `Provider` | Model Providerに保存された設定 |
| `Documentation` | Contractや運用仕様として定義された状態 |
| `Git` | Repositoryで管理されるScriptやTooling |

Representationに名前があるだけでは、同期済みを意味しない。

### Current Owner

担当者名ではなく、現在どのRepresentationを採用元として扱うかを示す。

採用元が決まっていない場合は`Unresolved`とする。

### Current Status

| Status | 意味 |
|---|---|
| `Registered` | 管理対象として登録済み |
| `Pending` | 採用候補または同期方針の判断待ち |
| `Synchronized` | 承認内容を必要なRepresentationへ反映済み |
| `Verified` | 同期後の検証が完了 |
| `Blocked` | Conflict、Unknown、Runtime Drift、承認不足などにより同期を継続できない |
| `Deprecated` | 現在は使用しないが、履歴のためIDを保持 |

Statusは作業進捗ではなく、そのItemが現在どの運用状態にあるかを示す。

### Risk

Riskは変更の優先度ではなく、誤同期した場合の影響度を示す。

| Risk | 意味 |
|---|---|
| `Low` | 影響範囲が限定される |
| `Medium` | 関連するNodeや設定へ影響する |
| `High` | Workflow品質、契約判定、成果物品質へ影響する |
| `Critical` | Workflow全体、主要実行経路、Runtimeへ重大な影響を与えうる |

## ID Policy

Configuration Item IDは、公開後も変更・再利用しない。

```text
CFG-<Category Prefix><3桁連番>
```

公開記事から参照されたItemは、本書へ必要最小限の情報だけを追加する。

内部Registryに存在するすべてのItemを公開版へ自動同期しない。
公開の必要がなくなったItemも、参照履歴を守るためIDを削除・再利用しない。

## Public Scope

公開版に掲載する情報:

- 公開記事や公開Documentationから参照されるConfiguration Item ID
- 一般化したCategory
- 一般化したRepresentation
- 公開に必要なStatusとRisk
- 概念理解に必要な要約
- 公開可能な運用ルール

公開版に掲載しない情報:

- App ID、Workflow ID、Draft ID、Run ID、Node ID
- 内部Script名、Selector名、変数名、Database情報
- Commit SHA、hash、fingerprint
- ローカル環境path、内部Repository path
- 非公開Evidenceと内部Auditへの直接リンク
- Credential、接続情報、Secret
- 未公開Itemの一覧と詳細な依存関係
- 内部作業中の具体的な差分

公開対象としなかった情報やマスク判断は、内部のPublication Reflection Registerで管理する。

## Related Public Documentation

- [Documentation Map](README-public.md)
- [Configuration Audit](configuration-audits/)
- [Architecture](architecture-public.md)
- [Project Status](status-public.md)

---

このPublic Editionは、内部運用Registryの正本を置き換えない。

内部版は実際のConfiguration StateとEvidenceを管理し、
公開版は設計思想と公開事例を理解するためのReferenceとして使用する。
