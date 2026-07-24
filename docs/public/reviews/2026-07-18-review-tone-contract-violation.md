# Tone Contract違反をReview Agentが見逃し

[Operational Review一覧へ戻る](index.md)

- Review ID: `REV-20260718-004`
- 日付: 2026-07-18
- Status: `Open`
- Review Type: 打鍵レビュー
- 対象: Review Stage

## 結果

ユーザーはToneとして、常体を使用し、です・ます調を使用しないよう指定した。

Writing本文はほぼ常体だったが、最終文だけが「なのです。」で終了し、Tone Contractに違反した。

Review Agentは「トーンも一貫して常体で維持されている」と評価し、問題なしと判定した。

## 期待結果

- Toneをユーザー入力の契約として扱う。
- 一文でも禁止された文体が含まれていれば、Reviewは通過させない。
- 全体印象ではなく、文単位で契約適合性を確認する。

## 実際結果

- Tone指定: 常体
- Writing: 最終文のみTone違反
- Review: 問題なしと判定
- Final Audit: 注意付きで承認

## Root Cause

### 1. Toneを印象評価していた

Review Agentは文章全体の印象を優先し、各文がTone Contractを満たしているかを確認していなかった。

そのため、ほぼすべての文が常体であれば、一部の明確な違反を見逃す判定になっていた。

### 2. Tone Contractが形式化されていなかった

「概ね一貫している」といった曖昧な評価が許され、禁止された文末表現を一文単位で検出する条件が定義されていなかった。

## 影響範囲

- 常体または敬体を指定するWorkflow
- Tone指定を含む記事生成
- 全体印象を使って契約適合性を判定するReview

## 改善方針

### 1. ToneをContractとして定義する

Tone指定を参考情報ではなく、成果物が満たすべき契約条件として扱う。

### 2. 文単位で検査する

Reviewは、禁止された文末表現を文単位で確認する。

一文でも違反があれば、問題なしとして通過させない。

### 3. 独立Validatorを検討する

Review Agentの意味評価とは別に、形式化可能なTone条件を検査するValidatorをContract GateまたはFinal Auditへ追加する。

## 設計への影響

| Item | Result |
|---|---|
| ADR Required | No |
| Workflow Update | Yes |
| Prompt Update | Yes |
| Validator検討 | Yes |

## Lessons Learned

「ほぼ守られている」はContract適合ではない。

Toneのように形式化できる条件は、文章全体の印象へ委ねず、違反箇所を明示的に検査する必要がある。

## 判定

`Open`

Tone Contractを形式化し、Review Promptまたは独立Validatorへ反映した後、同一条件で回帰試験を実施する。
