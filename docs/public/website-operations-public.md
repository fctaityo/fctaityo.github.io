# Website Operations Policy

> **Public Edition**
>
> この文書はWebsite Operations Policyの公開版です。内部正本から非公開情報を除き、公開運用に必要な方針を掲載しています。

- Status: Active
- Applies To: Local AI Foundry公式ホームページ
- Owner: Repository Maintainer
- Effective Date: 2026-07-25

## 目的

本書は、Local AI Foundry公式ホームページに何を掲載し、いつ更新し、どの記録を正本として扱うかを定める。公式ホームページ運用のSingle Source of Truthとする。

公式ホームページは、初めてプロジェクトを知る閲覧者、継続的に開発状況を追う利用者、公開資料やGitHubへ進む技術者に対し、プロジェクトの価値、設計の概要、現在地、公開情報への入口を提供する。

更新では、既存のブランド、情報構造、公開範囲を維持する。内部仕様を転載せず、公開する価値と導線に変更が生じた場合に必要な範囲を更新する。

## バージョン運用

公式サイトの正式リリースは`vMAJOR.MINOR.PATCH`の考え方で管理する。現在の表示形式に合わせ、Patchが`0`の場合は`v2.9`のように省略できる。

- Patch: typo、リンク修正、表示崩れなど、情報構造や機能を変えない公開上必要な修正
- Minor: 公開セクション、重要な導線、Public Documentation、主要な説明または体験を追加・更新する変更
- Major: サイトの目的、対象読者、ブランド構造、主要な情報設計を大きく変更する更新

正式リリースは、対象変更とDocumentationが整合し、検証が完了した時点で付与する。複数の軽微な変更は、公開上の意味が一つになる単位へまとめてよい。

日付は、HTMLの`datetime`属性とファイル名では`YYYY-MM-DD`、画面表示では`YYYY.MM.DD`を使用する。

## 更新履歴

トップページには、閲覧者がプロジェクトの現在を理解するために重要な更新だけを掲載する。

掲載対象:

- 新機能または新しい公開体験
- Public Documentationの追加・重要な更新
- Architectureの公開上重要な更新
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

詳細ページには、公開利用者へ影響する変更、改善理由、検証結果を簡潔に記載する。内部実装値、Prompt、非公開証跡、環境固有情報は掲載しない。

ReleasesページはGit履歴の複製ではない。Gitが全変更の技術記録であるのに対し、Releasesページは公開上意味のある変更を人間が理解できる単位で説明する。

## Git、GitHub Releases、公式サイト

### Git Commit

Git Commitは、ファイル単位の変更内容、実装経緯、差分を追跡する技術的な正本である。公開サイトへ掲載しない軽微な変更や内部変更も記録する。

### GitHub Releases

GitHub Releasesは、配布物、タグ、外部利用者へ固定して告知する成果物がある場合に使用する。すべてのサイト更新に必須とはしない。作成する場合は、公式サイトのバージョンと説明を整合させる。

### 公式サイト

公式サイトは、プロジェクトの価値、公開可能な設計、現在地、主要な更新、次に進む導線を示す。Commit一覧や内部変更履歴の代替にはしない。

## Documentationとの関係

### 内部Documentation

内部Documentationは、実装、運用、構成管理、詳細契約、検証証跡の正本を保持する。公開サイトから直接リンクしない。

### Public Documentation

内部正本は`docs/`に保持する。公開版は`docs/public/`に配置し、公開可能なArchitecture、Principles、Status、ADR、Operational Reviewを保持する。公式サイトより詳しい公開資料の正本であり、内部資料への導線を含めない。

公開時はPublic版のみを公式導線へ掲載し、内部文書へ公式サイトから直接リンクしない。

### 公式サイト

公式サイトは概要と入口を担当する。Public Documentationの全文を重複掲載せず、閲覧者が必要な深さへ進める導線を提供する。

同じ事実を複数箇所へ記載する場合は、詳細な正本をDocumentationに置き、公式サイトは要約とリンクに限定する。

## Release Driven Website Operation

- 公式ホームページ更新は、原則として正式リリースと同時に実施する。
- トップページ更新時はVersionを更新する。
- Releasesページを同時に更新する。
- 正式リリースごとにReleaseページを作成する。
- Website更新だけを単独で行わない。

## Documentation Flow

```text
実装
↓
内部Documentation更新
↓
Public Documentation更新
↓
Website更新
↓
Version更新
↓
Commit
↓
Push
↓
GitHub Pages公開
```

公開前にリンク、表示、Markdown、正本との整合を検証する。工程の一部が対象外の場合は省略できるが、公開内容と正本の整合確認は省略しない。

## 運用原則

1. GitHub `main`の実ファイルとGit履歴を変更確認の基準にする。
2. 公式サイトは概要と公開導線に集中し、内部仕様を転載しない。
3. Public Documentationを公開詳細の正本として扱う。
4. 公開先が存在しない文書へのリンクを作らない。
5. 正式リリースではトップページ、Releases一覧、詳細ページのバージョンと日付を一致させる。
6. 更新履歴は公開上意味のある変更だけを記録する。
7. 既存デザイン、ブランド、レスポンシブ、アクセシビリティを維持する。
8. Commit前に差分、リンク、構文、対象ファイルを確認する。
9. Push後にGitHubのCommit SHAとGitHub Pages反映状態を確認する。
10. 内部Documentation、Public Documentation、公式サイトの責務を混在させない。
