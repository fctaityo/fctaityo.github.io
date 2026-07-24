# ADR-0006: Artifact Integrity Validationを独立責務にする

- Status: Accepted
- Date: 2026-07-17
- Scope: Writing後からReview前

## 背景（Context）

Workflowが正常終了し、DTO構造や保存処理が成功していても、最終成果物そのものが完全であるとは限らない。

長文生成では、出力途中の切断、宣言した構成と実際の内容の不一致、結論の欠落、付随成果物の不足などが発生し得る。これらは、Stage DTOの構造が正しいことだけでは保証できない。

また、LLMによるReviewは意味的な品質評価には有効だが、決定的かつ再現可能な完全性検査を単独で担わせるべきではない。

## 問題（Problem）

- Workflow SuccessとArtifact Successは同義ではない。
- DTOが正しくても、成果物が途中で終了している場合がある。
- LLM Reviewは出力揺らぎを持ち、決定的な完全性検査には向かない。
- 保存後の人間確認だけでは、公開不可能な成果物を正常処理として扱ってしまう。
- 意味的評価と構造的・決定的検査が同一責務に混在している。

## 候補（Options）

1. LLM Reviewだけで成果物品質を判定する
2. 保存後に人間が確認する
3. Review前に独立したArtifact Integrity Validationを置く

## 決定（Decision）

Writingによる成果物生成後、Reviewへ渡す前に、Artifact Integrity Validationを独立した責務として配置する。

Artifact Integrity Validationは、成果物が後続処理へ進むための最低条件を満たしているかを、決定的かつ再現可能な方法で検査する。

検査に失敗した成果物は、Review、Final Audit、Persistenceなどの後続処理へ進めない。

意味的な品質評価はLLM Reviewが担当し、構造、完全性、必須要素などの決定的な検査はArtifact Integrity Validationが担当する。

## 採用理由（Rationale）

- Workflow SuccessとArtifact Successを明確に分離できる。
- LLM判断とは独立した再現可能な検査を実現できる。
- 不完全な成果物が正常処理として保存・公開されることを防げる。
- Review Agentを意味的評価へ集中させられる。
- 成果物不備の検出位置を、後段ではなく生成直後へ寄せられる。

## 採用しなかった案（Rejected Options）

### LLM Reviewだけで判定する

LLMは意味的な評価には適しているが、出力揺らぎやStage逸脱があり、決定的な完全性保証には向かない。

### 保存後に人間が確認する

不完全な成果物を正常保存として扱うことになり、Workflow上の成功と公開可能性が混同される。

## 影響（Consequences）

### Positive（肯定的影響）

- 不完全な成果物の後段流入を防止できる。
- Workflow成功と成果物成功を別々に判定できる。
- 回帰テスト可能な品質条件を持てる。
- Reviewの責務を意味的品質評価へ限定できる。
- 不具合発生時の切り分けが容易になる。

### Negative（否定的影響）

- Workflowに追加の検証責務が増える。
- 検証条件の保守が必要になる。
- 検証条件が過剰に厳しい場合、正当な成果物を停止させる可能性がある。
- 成果物種別が増えるたびに、検証責務の追加判断が必要になる。

## 責務境界（Responsibility Boundary）

Artifact Integrity Validationは、成果物が最低限の完全性条件を満たしているかを検査する。

以下は本責務に含めない。

- 文体や読みやすさの評価
- 主張の妥当性や説得力の評価
- 表現上の好み
- 人間による最終的な公開判断

これらはReview、Final Audit、または人間の責務として扱う。

## 適用範囲（Scope）

本ADRは、Writing後からReview前までの成果物完全性検査に適用する。

外部生成物や保存後の実体検証については、各処理境界で別途検証責務を持たせる。

## 関連資料（Related）

- [ADR-0002: Agent間境界にDTOを採用する](ADR-0002-dto-boundaries.md)
- [REV-20260716-001 記事途中切断](../reviews/2026-07-16-operational-article-truncation.md)
- [REV-20260717-001 Section Writing Artifact Integrity](../reviews/2026-07-17-e2e-section-writing-integrity.md)

[Public Documentationへ戻る](../README-public.md)
