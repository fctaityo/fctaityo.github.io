# CM-20260731-001 正本取得と最小変更

- Date: 2026-07-31
- Status: Recorded
- Category: Canonical Source / Change Control

## 概要

既存成果物を変更する作業では、新しい内容を生成する能力だけでは品質を保証できない。

変更対象外の内容を維持し、正本との差分を説明できることが必要である。

Local AI Foundryでは、GitHub最新版をSingle Source of Truthとして扱う。GitHub最新版を取得できない場合は、会話履歴、記憶、File Libraryなどを正本の代わりにしてはならない。

また、GitHub由来の情報であっても、対象ファイル全体を確認できていない状態で不足部分を推測してはならない。

## 適用対象

この原則は、次のような既存成果物の変更へ適用する。

- Markdown Documentation
- Configuration Registry
- Configuration Audit
- Workflow DSL
- Prompt
- Code Node
- Test
- Website HTML
- Release Information

新規作成ではなく既存成果物を変更する場合、変更対象外の維持も作業Scopeに含まれる。

## 基本原則

### 1. GitHub最新版を正本とする

作業開始時点のGitHub最新版を取得し、その内容を変更元とする。

取得できない場合は作業を停止し、GitHubを取得できる別の手段を確立する。

取得方法を変更することはできるが、情報源を別のものへ置き換えてはならない。

### 2. 正本を完全に確認する

ファイル名、見出し、断片、差分の一部だけでは、既存成果物全体の状態を保証できない。

対象ファイルを完全に取得できていることを確認してから変更案を作る。

長いファイルを分割取得する場合も、先頭から終端まで連続して確認し、取得範囲の欠落を残さない。

### 3. 既存成果物を再生成しない

既存成果物の変更では、正本を捨てて似た成果物を作り直してはならない。

正本を保持したまま、要求された変更だけを適用する。

表現の改善や構造整理を同時に行いたい場合も、当初Scopeと分離し、別の変更として扱う。

### 4. 変更対象外を保護する

変更対象外の内容は、単に触らないのではなく、維持されたことを確認する。

確認対象には次を含む。

- 既存の見出しと順序
- 既存リンク
- IDと参照先
- 表の列と行
- Configuration Itemの状態
- Audit ID
- WorkflowのNodeとEdge
- WebsiteのNavigationと既存セクション
- ファイル名と配置

### 5. 差分をEvidenceとして扱う

変更後は、正本と修正版の差分を確認する。

差分はレビューを補助する資料ではなく、変更Scopeを証明するEvidenceである。

要求された変更以外の差分が存在する場合は、その理由を説明できなければ反映してはならない。

## 標準フロー

```text
Canonical Fetch
    ↓
Complete Source Verification
    ↓
Scope Definition
    ↓
Minimal Change
    ↓
Diff Review
    ↓
Human Decision
    ↓
Repository Reflection
    ↓
Post-Reflection Verification
```

## Gate

### SOURCE Gate

- GitHub最新版を取得した
- 対象ファイルを完全に確認した
- 取得元のRepository、Branch、Pathを特定した

### CHANGE Gate

- 変更Scopeを明示した
- 正本を変更元として使用した
- 変更対象外を再生成していない

### REVIEW Gate

- 正本と修正版の差分を確認した
- 要求外の差分がない
- 既存リンク、ID、参照関係を維持した

### REFLECTION Gate

- Human Decisionが確定した
- Repositoryへ反映した
- 反映後のGitHub最新版を再取得した
- 想定変更と意図しない変更を確認した

## 既存notesとの関係

この原則は、`WD-20260724-003 ChatGPT、SSOT運用を破る` で確立した停止ルールを、既存成果物の変更管理へ拡張する。

同War Diaryでは、GitHub最新版を取得できない場合に、File Library、会話履歴、記憶している旧版などで不足を補完しないことが定められた。

本記録では、さらに次を明確にする。

- 正本は情報源だけでなく、取得完全性まで確認する。
- 既存成果物は再生成せず、正本へ変更を適用する。
- 変更対象外の維持も検証対象とする。
- 差分を変更ScopeのEvidenceとして扱う。

## 教訓

**正本を見たことと、正本を完全に取得したことは同じではない。**

**既存成果物の変更では、追加した内容だけでなく、失われなかった内容も品質である。**

**生成ではなく、正本への最小変更として扱う。**
