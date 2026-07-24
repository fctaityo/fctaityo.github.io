# Section Writing Artifact Integrity 実環境E2Eレビュー

- Review ID: `REV-20260717-001`
- 日付: 2026-07-17
- Status: `Open`
- Review Type: 打鍵レビュー / 実運用レビュー / 品質レビュー
- 対象: Section-based Writing Workflow

## 目的

Section Writingへ移行したWorkflowについて、次の2点を実環境で確認する。

1. 複数Sectionから構成される記事が、Planningから保存まで完走すること。
2. 欠落または途中終了したSectionが、Reviewより後へ流れないこと。

## 観測結果

### 1. Researchの不安定さがWriting検証を妨げた

Research Stageが先に停止すると、Section Writingそのものの検証へ到達できない。

そこで、既知の正常なResearch DTOを用いた一時的な検証経路を作成し、Writing以降の責務を独立して確認した。本番WorkflowのResearch ContractやRetry方針は変更していない。

**Status: Resolved**

### 2. 推論過程内の例示データを成果物として誤採用した

Section Agentの出力には、最終成果物より前にスキーマ例が含まれる場合があった。抽出処理が最初に見つかったJSON Objectを採用したため、例示用データがSection成果物として扱われた。

抽出対象を最終回答部分へ限定することで、成果物ではない例示データの誤採用を防止した。

**Status: Resolved**

### 3. Retry成功後も初回失敗結果が選択された

初回生成が失敗し、Retryが成功した場合でも、結果統合処理が初回結果を優先していた。

Retry結果を優先し、Retryが存在しない場合のみ初回結果を採用するよう、結果選択の責務を修正した。

**Status: Resolved**

### 4. Section単位の完成性検査が不足していた

記事全体の末尾だけを確認しても、途中Sectionの本文が途中終了している可能性を検出できない。

Artifact ValidatorへSection単位の完成性検査を追加し、本文が未完と判断されたSectionを後段へ渡さないようにした。

**Status: Resolved**

### 5. 正常系・異常系E2E

固定DTOを使用した正常系では、複数SectionのAssembly、Artifact Validation、Review、Final Audit、保存、画像生成まで完走した。

異常系では次を確認した。

- Conclusionが欠落した成果物はReview前に停止する。
- Section本文が途中終了した成果物はReview前に停止する。
- Retry時に成果物DTOが返らない場合は、必須項目欠落として停止する。

ただし、実LLMがすべてのSectionを連続生成する正常系については、モデル出力の不安定さが残っており、継続検証が必要である。

**Status: Open**

### 6. 画像生成設定の代替採用を可視化した

要求された画像生成設定が未指定または利用不能な場合、実際に採用された設定と要求値の差異が分からない状態だった。

要求値、実採用値、一致状態を成果物メタデータへ分離して記録し、代替採用を警告として残すようにした。

**Status: Resolved**

## Root Cause

Section Writing導入直後のWorkflowでは、次の責務が十分に分離されていなかった。

- LLM出力から成果物を抽出する責務
- 初回結果とRetry結果を選択する責務
- Section単位で完成性を検証する責務
- 要求された構成と実際の構成差異を記録する責務

## 改善

- 最終回答部分だけを成果物抽出の対象とする。
- Retry成功時はRetry成果物を優先する。
- 各Sectionの完成性をArtifact Validatorで検査する。
- 要求値と実採用値を分離して記録する。
- Researchを固定した試験と、実LLMを使う試験を分ける。

## 関連ADR

- [ADR-0006 Artifact Integrity Validation](../adr/ADR-0006-artifact-integrity-validation.md)
- ADR-0007 Section-based Writing

## Lessons Learned

E2Eテストは、単に最後まで動いたことを確認する作業ではない。

各Stageの責務を分離し、正常系だけでなく、欠落、途中終了、Retry失敗、代替採用が設計どおり扱われることを確認して初めて、Artifact Integrityを検証できる。

## 判定

`Open`

固定DTOによる正常系と異常系の確認は完了した。実LLMによる複数Section連続生成の安定性について、継続して検証する。
