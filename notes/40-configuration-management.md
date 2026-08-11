# Configuration Management Notes

このファイルは、Local AI Foundry開発で得られたConfiguration Managementの運用知識を案内するインデックスである。

詳細な記録は `notes/configuration-management/` 配下へ、1件1ファイルで保存する。

Configuration Management Notesは、正本、差分、同期、検証、反映完了条件など、既存成果物を安全に変更するための実務上の原則と手順を整理する。

## 他のnotesとの役割分担

* War Diaryは、開発中に起きた出来事と当時の判断を時系列で記録する。
* Bug Zooは、再発可能な障害パターンとRoot Causeを一般化する。
* Configuration Management Notesは、既存成果物を安全に変更・同期・検証するための運用知識を整理する。
* ADRは、確定した設計判断の正本とする。
* docs/へ昇格した内容がある場合も、確定前の検討過程や運用上の教訓はnotes/に残す。

## 運用ルール

* 1つの運用テーマを1ファイルとして記録する。
* ファイル名は `CM-YYYYMMDD-NNN-short-title.md` とする。
* このファイルには、CM ID・題名・概要・分類・リンクだけを置く。
* 特定の事件を起点とする場合は、対応するWar DiaryまたはBug Zooを相互参照する。
* 設計判断として確定した内容はADRまたはdocs/を正本とし、ここでは実務上の適用方法と教訓を記録する。
* Repository、Runtime、公開環境など複数の状態を扱う場合は、それぞれを別の確認対象として記録する。
* 推測や会話履歴だけで正本状態を補完しない。
* 詳細本文はこのインデックスへ再掲しない。

## Canonical Source / Change Control

* [CM-20260731-001 正本取得と最小変更](configuration-management/CM-20260731-001-canonical-source-and-minimal-change.md)
  GitHub最新版を正本として完全に取得し、既存成果物を再生成せず、正本へ必要な変更だけを適用するための基本原則を整理する。

## Current Snapshot / Work Recovery

* [CM-20260802-002 Project SnapshotとActive Work Snapshotを分離する](configuration-management/CM-20260802-002-project-snapshot-and-active-work.md)
  Project全体の正式状態と、現在作業中のInitiativeの復帰地点を別Artifactとして管理し、異なる更新Triggerを混在させない運用を整理する。

* [CM-20260811-001 Formal Current SourceとHuman Working Sidecarを分離する](configuration-management/CM-20260811-001-formal-current-source-and-human-working-sidecar.md)
  `status.md` / `active-work.md`のFormal Current Source（正式な現在地正本）を変更せず、Humanが今できるTask、Codex待ち、Authorization待ち、Working Artifact（作業中成果物）を扱うSide Task Matrix（STM）をHuman Working Sidecar（人間向け補助作業盤）として運用する境界を整理する。

## Review / Repository Reflection

* [CM-20260802-003 Review PackageからRepository Reflectionまでの境界](configuration-management/CM-20260802-003-review-package-and-repository-reflection.md)
  Working Tree、Audit、Report、Review Package、Human Review、Commit、Local Commit Verifyを分離し、AIがEvidenceを準備しHumanがRepository反映を承認する運用境界を整理する。
