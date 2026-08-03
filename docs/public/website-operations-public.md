# Website Operations Policy

> **Public Edition**
>
> この文書はWebsite Operations Policyの公開版である。内部正本から非公開情報を除き、公式ホームページのPresentation Layer運用に必要な方針を掲載する。

- Status: Active
- Applies To: Local AI Foundry公式ホームページ
- Owner: Repository Maintainer
- Effective Date: 2026-07-25

## 目的

本書は、Local AI Foundry公式ホームページに何を掲載し、いつ更新し、どの公開情報へ利用者を案内するかを定める。

公式ホームページはPresentation Layerであり、内部成果物、公開判断、Publication Current Stateまたは公開Documentationの正本ではない。

公式ホームページは、初めてプロジェクトを知る閲覧者、継続的に開発状況を追う利用者、公開資料やGitHubへ進む技術者に対し、プロジェクトの価値、設計の概要、公開可能な現在地、主要な更新および公開情報への入口を提供する。

更新では、既存のブランド、情報構造、公開範囲を維持する。内部仕様を転載せず、公開する価値と導線に変更が生じた場合に必要な範囲を更新する。

Publicationの契約は`docs/governance/publication-governance.md`、現在の公開状態は`docs/registry/publication-registry.md`を参照する。

## 責務境界

| Layer / Document | Responsibility |
|---|---|
| Internal Repository | 唯一の正本 |
| Publication Governance | 公開契約・公開統制 |
| Publication Registry | Current Publication State |
| Publication Reflection Register (PRR) | 不採用・保留理由、およびMask / Generalization判断の内部履歴 |
| Public Repository | Internalから生成された公開成果物 |
| Website | Presentation Layer、概要、告知、公開導線 |

本書はWebsiteの表示と公開導線だけを扱う。

公開可否、Mask / Generalization、PRR要否、Current Publication Stateを本書で決定または保持しない。

## バージョン運用

公式サイトの正式リリースは`vMAJOR.MINOR.PATCH`の考え方で管理する。現在の表示形式に合わせ、Patchが`0`の場合は`v2.9`のように省略できる。

- Patch: typo、リンク修正、表示崩れなど、情報構造や機能を変えない公開上必要な修正
- Minor: 公開セクション、重要な導線、Public Documentation、主要な説明または体験を追加・更新する変更
- Major: サイトの目的、対象読者、ブランド構造、主要な情報設計を大きく変更する更新

正式リリースは、対象変更と公開成果物が整合し、検証が完了した時点で付与する。複数の軽微な変更は、公開上の意味が一つになる単位へまとめてよい。

日付は、HTMLの`datetime`属性とファイル名では`YYYY-MM-DD`、画面表示では`YYYY.MM.DD`を使用する。

## リリース判定基準

Version更新の要否は変更量ではなく、公開上の意味が変化するかで判断する。利用者が認識すべき変更はVersion更新対象とし、判断に迷う場合はVersion更新側へ倒す。複数の軽微な修正をまとめて正式リリースとして扱うことは許容する。

Version更新を原則必要とする変更:

- Public Documentationの新規追加
- Public Documentationの大幅な内容更新
- 公開Architectureの変更
- 公開仕様または公開Contractの変更
- 公開Workflow構成または主要処理フローの変更
- 公式サイトの構成変更
- Release Driven Website Operationの変更
- 利用者から見える機能、仕様、制約、導線の変更

Version更新を原則不要とする変更:

- Typo修正
- 表記揺れ修正
- 意味を変更しない文章修正
- 軽微なリンク修正
- CSSやレイアウトの軽微な調整
- 公開仕様に影響しない内部整理
- コメントや補足説明のみの追加

| 変更内容 | Version更新 |
|---|---|
| Public Documentation追加・大幅更新 | 必要 |
| 公開Architecture変更 | 必要 |
| 公開Contract・Workflow仕様変更 | 必要 |
| 公式サイト構成変更 | 必要 |
| Typo・表記揺れ修正 | 原則不要 |
| 軽微なリンク修正 | 原則不要 |
| CSS微調整 | 原則不要 |

Version更新を伴う場合は、公式トップページ、Releases一覧、個別Releaseページを同時更新する。

Commitは公開準備であり公開完了ではない。承認されたPublic RepositoryへのPushとGitHub Pages反映確認まで完了した時点をRelease Completeとする。

## 更新履歴

トップページには、閲覧者がプロジェクトの現在を理解するために重要な更新だけを掲載する。

掲載対象:

- 新機能または新しい公開体験
- Public Documentationの追加・重要な更新
- 公開Architectureの重要な更新
- 公開ADRの追加
- Public Release
- 重要な品質、導線、アクセシビリティ改善

原則として掲載しないもの:

- 軽微な文言修正
- typo修正
- コメントのみの修正
- 振る舞いを変えないリファクタリング
- 内部専用の設定、Workflow、テスト、運用変更

例外として、リンク監査のように公開情報の信頼性へ広く影響する保守作業は、正式リリースとして記録できる。

## Releasesページ

`releases/index.html`は、公式サイトの正式リリースを時系列で一覧化する。各正式リリースは、日付、バージョン、要約、詳細ページへの導線を持つ。

詳細ページには、公開利用者へ影響する変更、改善理由、検証結果を簡潔に記載する。内部実装値、Prompt、非公開証跡、環境固有情報、PRRの内容は掲載しない。

ReleasesページはGit履歴またはPublication Registryの複製ではない。Gitが技術的な変更記録、Publication RegistryがCurrent Publication Stateを示すのに対し、Releasesページは公開上意味のある変更を人間が理解できる単位で説明する。

## Git、GitHub Releases、公式サイト

### Git Commit

Git Commitは、Public Repositoryに反映されたファイル単位の変更内容と差分を追跡する技術記録である。

Git Commitだけでは、公開判断、Current Publication StateまたはGitHub Pages反映完了を証明しない。

### GitHub Releases

GitHub Releasesは、配布物、タグ、外部利用者へ固定して告知する成果物がある場合に使用する。すべてのサイト更新に必須とはしない。作成する場合は、公式サイトのバージョンと説明を整合させる。

### 公式サイト

公式サイトは、プロジェクトの価値、公開可能な設計、公開上の現在地、主要な更新および次に進む導線を示す。

Commit一覧、Publication Registry、PRR、内部変更履歴または公開Documentation本文の代替にはしない。

## Documentationとの関係

### 内部Documentation

内部DocumentationはInternal Repositoryに保持し、実装、運用、構成管理、詳細契約、検証証跡の唯一の正本を構成する。

内部DocumentationをPublic Repositoryまたは公式サイトから直接リンクしない。

### Public Documentation

Public Documentationは、Internal Repositoryの正本からPublication Governanceに従って生成された派生物である。

公開可能なArchitecture、Principles、Status、ADR、Operational Reviewその他の公開成果物を保持できるが、Internal Repositoryの正本性を代替しない。

公開時はPublic版だけを公式導線へ掲載し、内部文書への導線を含めない。

### 公式サイト

公式サイトは概要と入口を担当する。Public Documentationの全文を重複掲載せず、閲覧者が必要な深さへ進める導線を提供する。

同じ事実を複数箇所へ記載する場合、詳細は対応する公開成果物へ置き、公式サイトは要約とリンクに限定する。

## Release Driven Website Operation

- 公式ホームページ更新は、原則として正式リリースと同時に実施する。
- トップページ更新時はVersion更新要否を判定する。
- Version更新時はReleasesページを同時に更新する。
- 正式リリースごとに必要なReleaseページを作成する。
- Website更新は、承認されたPublication ScopeのPresentation Reflectionとして実施する。
- Website更新だけでPublication Classification、PRRまたはRegistry更新を代替しない。

## Publication and Documentation Flow

```text
Internal Artifact
↓
Publication Classification
↓
Mask / Generalization要否判定
↓
Human Review
↓
PRR要否判定
↓
Public Artifact作成
↓
Public Repository Reflection
↓
GitHub Read Verify
↓
Publication Registry更新
↓
Website Presentation Reflection
↓
Version / Releaseページ更新
↓
GitHub Pages反映確認
↓
Release Complete
```

PRRは、不採用・保留理由、またはMask / Generalization判断が公開物やGit履歴から確認できなくなる場合だけ作成する。

工程の一部が対象外の場合は省略できるが、公開内容とInternal Repositoryの正本との対応確認、Publication RegistryのCurrent State確認およびWebsiteの導線確認は省略しない。

Push未実施のCommitは公開されていない。正式リリースは、承認されたPush後のGitHub Pages反映確認をもって完了する。

Documentation編集のみを目的とする作業では、Humanが指定した停止点に従う。Releaseまたは公開を目的とする作業でも、Push権限を作業指示や本書から推測してはならない。

## 運用原則

1. Internal Repositoryだけを正本とする。
2. Publication Governanceに従って公開対象と境界を確定する。
3. Publication RegistryをCurrent Publication Stateの正本として扱う。
4. PRRは必要な場合だけ内部で作成し、公式サイトへ掲載しない。
5. Public Repositoryの成果物はInternalから生成された派生物として扱う。
6. 公式サイトは概要と公開導線に集中し、内部仕様を転載しない。
7. 公開先が存在しない文書へのリンクを作らない。
8. 正式リリースではトップページ、Releases一覧、詳細ページのバージョンと日付を一致させる。
9. 更新履歴は公開上意味のある変更だけを記録する。
10. 既存デザイン、ブランド、レスポンシブ、アクセシビリティを維持する。
11. Commit前に差分、リンク、構文、対象ファイルを確認する。
12. PushはHuman Authorizationがある場合だけ実施する。
13. Push後にGitHubのCommit SHAとGitHub Pages反映状態を確認する。
14. Internal Documentation、Public Artifact、Publication Registry、PRR、Websiteの責務を混在させない。

## Verification and Definition of Done

Website Reflectionは次をすべて満たした場合に完了とする。

- Websiteへ反映するPublication ScopeがHuman Review済みである。
- WebsiteがPresentation Layerの責務に限定されている。
- 内部情報、PRR内容および非公開Evidenceが掲載されていない。
- Public Artifactへのリンクが有効である。
- Publication RegistryのCurrent StateとWebsiteの表示が矛盾していない。
- Version更新要否が判定されている。
- Version更新時はトップページ、Releases一覧および詳細ページが同期している。
- HTML、リンク、表示、レスポンシブおよびアクセシビリティを確認している。
- 承認されたCommit / Pushが完了している。
- GitHub最新版とGitHub Pages反映を確認している。
- 意図しない変更がない。
- Internal Repositoryが唯一の正本であることを維持している。
