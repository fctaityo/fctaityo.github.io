# WD-20260811-001 Formal Current Sourceを壊さずHuman Working Sidecarを作った

## 日付

2026-08-11

## 出来事

Runtime Verification Preflight（実行検証事前確認）の本線では、Minimal Runtime Parameter Evidence Instrumentation（最小実行時設定証拠取得仕組み）のDesign Candidate（設計候補）をHuman + ChatGPT（人間＋ChatGPT）で詰められる余地が残っていた。

一方、Instrumentation Implementation（証拠取得仕組みの実装）、Diagnostic Run（診断実行）、Runtime Verification（実行検証）は、Implementation Authorization（実装許可）、Fresh Human Runtime GO（新しいHuman実行許可）、Codex（コード実装担当AI）等のGate（判定ゲート）が必要だった。

そこで、Formal Current Source（正式な現在地正本）を変更せず、Human側から「今できること」「今はできないこと」「次のGate」を一枚で確認するSide Task Matrix（サイド作業一覧表、STM）を作成した。

STMでは、Mainline（本線）をM01〜M21へ分解し、Human + ChatGPTだけで進められるDesign（設計）、Review（レビュー）、Evidence整理と、Codex実装、Runtime実行、Project State Transition（プロジェクト状態遷移）を明確に分離した。

この整理により、M03〜M14はHuman + ChatGPT側で完了し、Human Review（人間レビュー） `PASS`、Human Decision（人間判断） `ADOPT`、Approved Design（承認済み設計）、Codex Implementation Instruction（Codex実装指示）まで成立した。

ただし、これらはImplementation Authorization（実装許可）ではない。

M15以降は明示Gateまで開始しない状態で停止した。

## 途中で起きた責務境界エラー

STMをCurrentize（現在化）する過程で、ChatGPTが`status.md`と`active-work.md`のReflection Candidate（反映候補）を作成した。

これは責務境界を越えていた。

Human + ChatGPTが行うべきなのは、

* Current Source（現在地正本）を読む
* Currentness Drift（現在性差分）を検出する
* STMへ差分を記録する
* Codexへ渡すべきCurrentization（現在化）内容を整理する

までであり、Codex側のRepository作業として扱うFormal Current Sourceの置換候補を作ることではなかった。

Human Reviewでこの誤りを検出し、生成済みCandidateはInvalid / Discarded（無効 / 破棄済み）とした。

以後STMでは、

```text
Repository Current Source
≠
STM Working Overlay
```

を明示し、Current Source Drift（現在地正本との差分）はCodex待ちTaskとして扱うことにした。

## STMが担った役割

STMはProject StateやActive Workを置き換える新しいFormal Artifact（正式成果物）ではない。

役割はHuman Working Sidecar（人間向け補助作業盤）である。

主に次を扱う。

* Human + ChatGPTだけで今できるTask
* Human DecisionまたはAuthorization待ちのTask
* Codex待ちのTask
* Separate Scope（別作業範囲）
* 開始してはいけないTask
* Working Artifact Registry（作業成果物台帳）
* Human Review結果
* 次に必要なGate

Formal Current Sourceを人間向けに読み替えるが、Formal State（正式状態）そのものは所有しない。

## Working Artifact管理で分かったこと

Design Candidate、Review Draft、Codex Handoff等を毎回Humanが個別Downloadして管理すると、Human側の管理負荷が増える。

そこで、Working Artifact（作業中成果物）はSTMのRegistry（台帳）で管理し、Humanが通常保持するのは最新版STMだけとした。

Human-approved Artifact（人間承認済み成果物）については、最新版STMからExact Recovery（完全復元）できるようExact Payload（完全本文）をAppendix（付録）へ保持する方式へ修正した。

これにより、

```text
ChatGPT Working Artifact
→ STM Registry
→ Human Review
→ Human-approved Artifact
→ STMからRecovery可能
```

というHuman側の軽量なArtifact管理が成立した。

## 学び

Formal Current Sourceは重要だが、人間が今この瞬間に「何なら進められるか」を判断する操作盤とは責務が違う。

だからといって、その操作盤へFormal Stateを持たせてはいけない。

Human Working Sidecarは、

* 正本からCurrent Stateを読む
* 作業中に成立したWorking Overlayを別に持つ
* Authorization境界を可視化する
* 正本のCurrentness Driftを検出しても自分では書き換えない

という境界を守ることで成立する。

また、Human側の管理を「最新版Sidecar一つ」に集約するなら、重要Artifactを本当に復元できる設計が必要である。

「管理しなくてよい」と宣言するだけではArtifact Management（成果物管理）にはならない。

## 関連

- `WD-20260802-001 Project Snapshotでは作業断面へ戻れなかった`
- `CM-20260802-002 Project SnapshotとActive Work Snapshotを分離する`
- `CM-20260811-001 Formal Current SourceとHuman Working Sidecarを分離する`
- Side Task Matrix（STM）
