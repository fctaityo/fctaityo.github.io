# Research Entity Resolution欠如によるTopic逸脱

- Review ID: `REV-20260718-002`
- 日付: 2026-07-18
- Status: `Open`
- Review Type: 打鍵レビュー
- 対象: Research Stage

## 結果

「高橋名人」を題材として記事生成を実施したところ、Research Stageが対象人物を特定できなかった。

そのままWritingが許可されたため、「高橋名人についての記事」ではなく、「高橋名人を調べる方法の記事」が生成された。

DTO Contract、Normalize、Contract Gate、Retryは処理を継続した。これは構文上の失敗ではなく、Research能力とTopic充足判定の不足による意味品質上の失敗である。

## 期待結果

- Research Stageが記事対象を一意に特定する。
- 対象について直接説明する情報をWriting Stageへ渡す。
- 対象を特定できない場合はWritingを許可しない。
- 調査方法や一般論へのTopic置換を検出する。

## 実際結果

```text
Topic: 高橋名人
↓
Research: 対象人物を特定できない
↓
Writing authorized
↓
「高橋名人を調べる方法」の記事を生成
```

記事本文は生成されたが、入力Topicを満たしていない。

## Root Cause

Research Stageには、入力された名称が何を指しているかを確定する責務が明示されていなかった。

また、Research DTOが構文上成立していることは確認していたが、調査結果が入力Topicを直接満たしているかを判定するGateが存在しなかった。

## 影響範囲

次のような曖昧性を持つTopicで、同種の逸脱が発生する可能性がある。

- 人物名
- 企業名
- 製品名
- 略称
- シリーズ名
- 同名作品
- 時点によって情報が変化する対象

## 暫定回避策

INPUTで対象を補足する。

```text
高橋名人（元ハドソン、高橋利幸）
```

ただし、これは入力者へ対象同定責任を移すだけであり、Research基盤の恒久対策ではない。

## 改善方針

### 1. Entity Resolution

Research前に対象Entityを確定する。

最低限、次の情報を扱う。

- 入力表記
- 正規化名称
- 対象種別
- 同定根拠
- confidence
- ambiguity
- writing_authorized

### 2. 根拠資料による対象同定

Research Stageが、利用可能な検索結果または参照資料を使って対象を確認できる構成を検討する。

特定の検索製品や実装方式は本レビューでは決定しない。

### 3. Topic Satisfaction Gate

次の場合はWritingを許可しない。

- 対象Entityが確定していない。
- 調査結果が入力Topicを直接説明していない。
- 記事内容が調査方法や一般論へ置換されている。
- Writingへ渡せる具体的材料が存在しない。

## 設計への影響

Entity Resolutionの責務位置、Research DTO、Topic Satisfaction Gateの変更範囲を整理したうえで、ADRへの昇格を検討する。

## Lessons Learned

構文上正しいResearch DTOでも、Topicを満たしているとは限らない。

Contract-Driven Architectureには、型と必須項目だけでなく、「この情報は本当に入力された対象を説明しているか」という意味契約も必要である。

## 判定

`Open`
