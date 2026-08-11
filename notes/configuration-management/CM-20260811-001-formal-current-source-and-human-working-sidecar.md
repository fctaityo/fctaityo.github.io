# CM-20260811-001 Formal Current SourceとHuman Working Sidecarを分離する

## ID

`CM-20260811-001`

## 日付

2026-08-11

## 分類

Current Snapshot / Work Recovery / Working Artifact Management

## 目的

Formal Current Source（正式な現在地正本）の責務を変更せず、Humanが「今できること」「次のGate」「Working Artifact（作業中成果物）」を判断するためのHuman Working Sidecar（人間向け補助作業盤）を分離する。

## 背景

`CM-20260802-002`では、Project State Current SnapshotとActive Work Current Snapshotを分離した。

```text
status.md
→ Project全体の正式状態

active-work.md
→ Current Initiativeの正式な復帰地点
```

この分離により、Project Stateと通常作業の復帰地点を同じSnapshotへ混在させる問題は解消した。

その後、Runtime Verification Preflight（実行検証事前確認）で、別の運用上の不足が見えた。

Human + ChatGPT（人間＋ChatGPT）だけで進められるDesign（設計）やReview（レビュー）が残っている一方で、Implementation（実装）、Runtime（実行時）、Project State Transition（プロジェクト状態遷移）はCodex、Human Authorization（人間の正式許可）、Fresh Human Runtime GO（新しいHuman実行許可）等のGate（判定ゲート）を必要とした。

Formal Current Sourceだけを読んでも、

* 今この場でHuman + ChatGPTだけで進められるTaskはどれか
* Codex待ちのTaskはどれか
* Human Decision / Authorization待ちはどれか
* Separate Scope（別作業範囲）として進められる作業は何か
* Working ArtifactをHumanがどこまで保持すべきか

を一枚で判断することは難しかった。

そこでSide Task Matrix（サイド作業一覧表、STM）を導入した。

## 三つの責務

STM導入後は、Current Workを次の三層として扱う。

```text
1. status.md
   Formal Project Current Source

2. active-work.md
   Formal Current Initiative Recovery Point

3. STM
   Human Working Sidecar
```

### `status.md`

Project State、Active Baseline、Runtime Gate等の正式なProject全体Current Stateを保持する。

STMはこれを変更しない。

### `active-work.md`

Current Initiative、Completed Checkpoint、Next Action、Blocker、Human Decision等、正式な作業復帰地点を保持する。

STMはこれを作業ログやHuman ToDo Listへ変換しない。

### STM

Formal Current Sourceを読み、人間の作業判断に必要な形へ展開する。

主に次を保持できる。

* Human + ChatGPTで今できるTask
* Codex待ちTask
* Human Decision / Authorization待ちTask
* Separate Scope
* 開始禁止Task
* Working Artifact Registry（作業成果物台帳）
* Human Review結果
* 次に必要なGate
* Formal Current Source取得後に成立したWorking Overlay（作業中の上乗せ状態）

STMはFormal State（正式状態）の正本ではない。

## Formal SourceとWorking Overlayを分ける

Formal Current Source取得後、Human + ChatGPTの作業によって新しい判断や成果が成立する場合がある。

その場合も、STM上の進捗をFormal Current Sourceへ自動変換しない。

```text
Repository Current Source
≠
STM Working Overlay
```

例えば、Human Review `PASS`やHuman Decision `ADOPT`がSTM上で成立しても、その事実だけで`status.md`や`active-work.md`を書き換えない。

Formal Current SourceにCurrentness Drift（現在性差分）を検出した場合、STMは次だけを行う。

1. Driftを検出する。
2. 何がFormal Sourceより先へ進んだかを記録する。
3. Codexへ渡すCurrentization（現在化）対象として分類する。
4. Human Review / Authorization境界を保持する。

Human + ChatGPT側でFormal Current Sourceの置換ファイルを作成しない。

## 責務境界Near Miss

STM運用の初期段階で、ChatGPTが`status.md`と`active-work.md`のReflection Candidate（反映候補）を生成した。

これはHuman Working SidecarがFormal Current Sourceの編集責務へ踏み込んだ状態だった。

Human Reviewで誤りを検出し、CandidateはInvalid / Discarded（無効 / 破棄済み）とした。

このNear Missから、次を明文化した。

```text
Human + ChatGPT:
Read / Compare / Design / Review / Working Overlay

Codex:
Actual Internal Repository Change / Current Source Currentization

Human:
Decision / Review / Authorization

Runtime:
Fresh Human Runtime GOまで実行しない
```

Actorの境界は対象Artifactと運用契約に従い、STMが勝手に拡張しない。

## MainlineとSeparate Scope

STMでは、現在のInitiativeに必要なMainline（本線）と、独立して進められるSeparate Scope（別作業範囲）を分離する。

Separate ScopeをMainlineの「残作業」へ混ぜない。

また、Codexが利用できないからという理由だけで、新しいMainline Taskを作らない。

```text
Mainline:
Current Source / Current EvidenceでRequiredと確認できるTask

Separate Scope:
Humanが別件として明示開始した場合だけ進めるTask
```

これにより、「今できること」と「今やるべきこと」を区別できる。

## Working Artifact Management

Human + ChatGPT作業では、Design Candidate、Review Draft、Instruction Draft等のWorking Artifactが増えやすい。

すべてをHumanが個別Downloadして管理すると、管理対象が増え、どれがCurrentか分かりにくくなる。

STMではWorking Artifact Registryを持ち、次の運用を採用した。

```text
Working Artifact
↓
STM Registry
↓
Human Review
↓
Human Decision
↓
Human-approved Artifact
```

通常のWorking ArtifactはHumanが全Revisionを保存しなくてよい。

一方、Human-approved ArtifactをHuman側で「最新版STM一つだけ管理する」とする場合は、STMからExact Recovery（完全復元）できる必要がある。

そのためHuman-approved ArtifactはAppendix（付録）へExact Payload（完全本文）を保持できる。

「Humanは保存しなくてよい」と宣言するだけでRecovery経路がない状態は許容しない。

## STMへ持たせない責務

STMは次を正本として保持しない。

* Project State
* Active Baseline
* Formal Runtime Status
* Project State Transition
* Formal Current Initiative
* Repository上の正式なCurrent Source
* Implementation Authorizationそのもの
* Runtime Authorizationそのもの
* Repository変更結果
* Commit / Push結果の正本
* Historical Evidence全文

これらは各Formal SourceまたはEvidenceを参照する。

## 実務上の確認順序

Human Working Sidecarを利用する場合も、起点はFormal Current Sourceである。

```text
1. status.md
2. active-work.md
3. STM
4. STMが示すCurrent Evidence / Working Artifact
5. 必要なRepository Current Source
```

STMだけからProject State、Active Baseline、Runtime Statusを確定しない。

逆に、Formal Current SourceだけからHuman + ChatGPTのWorking Overlayを推測しない。

## 学び

Current Snapshotを分離した後でも、人間の操作盤という別責務が必要になる場合がある。

ただし、操作しやすいからという理由でFormal Stateをそこへ移してはならない。

Human Working Sidecarの価値は、正本を増やすことではなく、

> Formal Current Sourceを壊さず、人間が次の正しい行動を選びやすくすること

にある。

また、AIへ作業を委譲する環境では「何をAIへ任せるか」だけでなく、

* 今どのActorが実施可能か
* どのGateを越えていないか
* どの成果物がWorkingでどれがHuman-approvedか
* どこから先は別Actorへ渡すか

を可視化すること自体がConfiguration / Work Recoveryの一部になる。

## 関連

* War Diary：`WD-20260811-001`
* Configuration Management Note：`CM-20260802-002`
* Side Task Matrix（STM）
* Project Boot Contract
