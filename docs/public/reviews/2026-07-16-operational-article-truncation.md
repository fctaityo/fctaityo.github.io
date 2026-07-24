# 記事途中切断 Operational Review

- Review ID: `REV-20260716-001`
- 日付: 2026-07-16
- Status: `Resolved`
- 対象: Article Generation Workflow

## 観測

Workflowは正常終了として扱われたが、保存された記事は本文の途中で終了していた。

記事内では複数の論点を提示していたにもかかわらず、その一部しか記述されていなかった。Review Stageも成果物の欠落を検出できず、公開できない状態の記事が最終成果物として保存された。

## 期待結果

- Workflowの完走と成果物の完成を別々に検証する。
- 記事が途中で終了している場合は、正常成果物として保存しない。
- ReviewおよびFinal Auditが記事全文を検査できる状態にする。

## 実際結果

- DTOの形式上は処理が継続した。
- 記事本文は未完だった。
- 後段の検査は本文全体の完成性を保証できなかった。
- 不完全な成果物が保存された。

## Root Cause

DTO Contractの成立だけで、成果物そのものの完成性まで保証できると扱っていた。

構造化されたレスポンスが返っていても、その内部に含まれる長文成果物が完結しているとは限らない。Transport上の成功とArtifact上の成功を分離していなかったことが根本原因である。

## 判断

長文記事を一括生成する構成を見直し、次の責務へ分離する。

1. Writing Plan
2. Section Writing
3. Assembly
4. Artifact Validation
5. Review
6. Final Audit

Artifact ValidatorはLLMの自己申告に依存せず、Section欠落、Conclusion欠落、本文の途中終了などを独立して検査する。

## 対応

- 長文生成をSection単位へ分割した。
- Review前にArtifact Validatorを配置した。
- 不正なStage値や不完全な成果物を後段で救済して正常扱いする処理を禁止した。
- Final Auditが記事全文を検査できる構成へ変更した。
- 正常系と異常系の回帰試験を実施した。

## 関連ADR

- [ADR-0006 Artifact Integrity Validation](../adr/ADR-0006-artifact-integrity-validation.md)
- ADR-0007 Section-based Writing

## Lessons Learned

**Workflowが成功したことと、成果物が完成したことは同じではない。**

Contract Gateはデータ構造を守る。Artifact Validatorは成果物の完成性を守る。両者を分離して初めて、公開可能な成果物を保証できる。

## 判定

`Resolved`
