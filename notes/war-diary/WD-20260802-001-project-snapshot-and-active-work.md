# WD-20260802-001 Project Snapshotでは作業断面へ戻れなかった

## 日付

2026-08-02

## 出来事

Documentation Information Architectureの設計と、責務別Directory再編の最初の実装を進めた。

まず、Documentation全体の分類、配置、移動、Directory責務、Historical Evidence保護、Commit境界を定めるDocumentation Information Architectureを正式採用した。

Commit 1として、次をRepositoryへ反映した。

* Documentation Information Architecture
* ADR-0011
* Configuration Item `CFG-D003`
* Configuration Audit `CFG-20260802-005`
* Configuration Report `CR-20260802-005`
* Documentation Navigation

Commitは次のSHAでLocal Commit Verifyまで完了した。

```text
c165b10d10aebb6897e0aa13f406f9b6763744fa
docs: establish documentation information architecture
```

続いてCommit 2として、IAのContracts責務に従い、次の3文書を`docs/contracts/`へ正式移動した。

* Dify DTO Contract
* Status Artifact Contract
* Project State Transition

旧Pathは削除し、Compatibility shimは残さなかった。

Repository内の現在正本へ進むリンクだけを新Pathへ更新し、Historical Evidenceに記録された当時のScopeやPath表現は維持した。

Commitは次のSHAでLocal Commit Verifyまで完了した。

```text
2f35de8bdfff401e09049ea05e0d7688fc14a3ae
docs: reorganize contract documentation
```

Documentation IA実装は、Commit 2まで完了した時点で一度中断し、今回までに蓄積したnotesとプロジェクト運営ノウハウを整理することになった。

その際、現在の作業断面を確認するために`status.md`を見た。

`status.md`からは、次のProject全体状態を確認できた。

* Project State: `Published`
* Active Baseline: `BL-20260801-001`
* Runtime Status: `Not Executed`
* Runtime Acceptance: `PENDING`
* 次のProject State Gate: Runtime Verification

しかし、Documentation IA実装がCommit 2まで完了しており、次にCommit 3から再開すべきことは確認できなかった。

`status.md`は壊れていなかった。

むしろ、契約どおり正しく動いていた。

`status.md`はProject State、Active Baseline、Transition、Runtime Gateを示すCurrent Snapshotであり、Project Stateが変わらない通常のDocumentation作業やCommit履歴を作業ログとして保持しない。

今回必要だったのはProject全体のStateではなく、現在進行中のInitiativeについて、どこまで完了し、次に何を行うかという作業断面だった。

ここで初めて、次の2つは別責務であることが明確になった。

```text
Project State Current Snapshot
≠
Active Work Current Snapshot
```

この不足を解消するため、Documentation IA Commit 3へ進む前に、Active Work Minimum Adoptionを独立Commitとして挿入した。

## 何が問題だったか

問題は、`status.md`に情報が不足していたことではない。

Project Stateと現在作業中のInitiativeを、同じ「現在地」という言葉で扱っていたことだった。

`status.md`が答えるのは、次の問いである。

> Project全体はLifecycle上どこまで到達しているか。

今回確認したかったのは、次の問いだった。

> 今取り組んでいる作業はどこまで完了し、どこから再開するか。

両者は更新頻度もEvidenceも異なる。

Project Stateは、Entry Condition、Transition Evidence、Human Authorizationが成立した場合に遷移する。

一方、Active Workは、Initiative開始、Checkpoint完了、Interrupt、Pause、Next Action変更などで更新する必要がある。

もしDocumentation IAのCommit進捗を`status.md`へ追加すると、Project Stateが変わらないにもかかわらず、Commit 1、Commit 2、Commit 3のたびにCurrent Snapshotを更新することになる。

それでは`status.md`が作業ログへ戻ってしまう。

逆に、Project State契約を守って`status.md`を更新しなければ、Interrupt後に現在の作業断面へ短時間で復帰できない。

Project State Current Snapshotだけでは、プロジェクト全体の状態は分かっても、現在作業中のInitiativeの復帰地点までは分からなかった。

## Root Cause

第一の原因は、Project StateとActive Workの責務境界が未定義だったことだった。

Project State Governance導入時には、作業事実と正式なProject Stateを分離することを優先した。

その結果、`status.md`を作業ログから切り離すことには成功した。

しかし、切り離された作業断面をどこへ保持するかは、まだ必要になっていなかったため設計していなかった。

第二の原因は、Current Snapshotという言葉の中に、異なる更新周期を持つ情報をまとめて考えていたことだった。

* Project State Snapshotは低頻度で変わる
* Active Work SnapshotはCheckpointやInterruptごとに変わる

異なる更新Triggerを持つ情報を同じArtifactへ入れると、どちらかの責務が崩れる。

第三の原因は、Active Workの必要性が実運用前にはEvidenceとして現れていなかったことだった。

Documentation IAを設計した時点では、Rootの正式文書は次の3件で足りていた。

* `README.md`
* `status.md`
* `glossary.md`

Commit 1とCommit 2を完了し、別作業へInterruptしようとした時点で初めて、`status.md`だけでは復帰地点を特定できないという具体的なEvidenceが発生した。

最初からActive Workを想像で追加したのではなく、実際に不足が発生したことで新しい責務が確定した。

## 修正

Root Current Snapshotとして`docs/active-work.md`を新設した。

Active Workは、現在の1つのActive Initiativeだけを表示する。

初期Snapshotには次を記録した。

| Field                | Value                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| Initiative           | Documentation Information Architecture Implementation                       |
| Status               | `Paused`                                                                    |
| Completed Checkpoint | Commit 1およびCommit 2 — Completed / Local Commit Verified                     |
| Next Action          | Commit 3（Governance / Registry / Quality / Planning）のScope確認とWorking Tree作成 |
| Blocker              | `None`                                                                      |
| Human Decision       | `None`                                                                      |

Active Workには、次を保持しない。

* Project State
* Active Baseline
* Runtime状態
* Transition情報
* 作業ログ
* 全Commit履歴
* Daily Report
* Backlog
* Roadmap
* 複数Initiative管理
* 完了済みInitiativeのArchive

履歴はGit、Configuration Audit、Configuration Report、Review Packageへ委譲する。

Active Workには、Interrupt後の復帰に必要な最小断面だけを残す。

正式導入に伴い、次を同期した。

* Documentation Information Architecture
* ADR-0012
* Configuration Item `CFG-D005`
* Codex Standard Operating Procedure
* Documentation README
* Configuration Audit `CFG-20260802-007`
* Configuration Report `CR-20260802-007`
* Review Package

Active Work Minimum Adoptionは、既存のIA Commit Planへ混在させず、Commit 2とCommit 3の間に独立Commitとして挿入した。

Commitは次のSHAでLocal Commit Verifyまで完了した。

```text
652eba2dce4938d87e27fe390ab53e6a4054a86e
docs: adopt active work current snapshot
```

## 今後の運用

作業開始時は、次の2つを別々に確認する。

```text
status.md
→ Project全体のState、Baseline、Runtime Gate

active-work.md
→ 現在のInitiative、完了Checkpoint、Next Action
```

Active Workは次の場合に更新する。

* Active Initiativeを開始した
* Statusが変わった
* Completed Checkpointが進んだ
* Next Actionが変わった
* BlockerまたはHuman Decisionが発生・解消した
* Interrupt、Pause、Handover前に復帰地点を固定する
* Local Commit VerifyでCheckpoint完了が確定した
* Initiativeが完了、取消、置換された

会話や調査が進んだだけでは更新しない。

細かな作業手順や全Commit履歴を追記しない。

次のActive Initiativeがない場合は`No Active Initiative`とし、完了済みInitiativeの履歴一覧にはしない。

ChatGPT Project Boot側では、Repository Reflection完了後に別作業としてSource Routingを同期する。

想定する起動経路は次のとおりである。

```text
現在地確認
→ status.md

作業再開・引き継ぎ
→ status.md
→ active-work.md

現在の作業断面・Interrupt復帰
→ active-work.md
```

Repository内のActive Work導入と、Repository外のChatGPT Project情報源更新は別作業として扱う。

## 学び

Current Snapshotは一種類とは限らない。

重要なのは、現在値を一つのファイルへ集約することではなく、何の現在値なのかを明確にすることである。

Project StateとCurrent Workは、どちらも「今」を示す。

しかし、同じものではない。

```text
Project Stateは、Project全体の到達状態を示す。

Active Workは、現在作業中の復帰地点を示す。
```

更新頻度が違う情報は、同じArtifactへ混ぜない。

Project Stateが変わらない通常作業を`status.md`へ書けば、Current Snapshotは作業ログになる。

作業断面をどこにも残さなければ、Interrupt後の復帰性が失われる。

責務を分離することで、どちらも壊さずに済む。

また、今回のActive Workは、Documentation IAの設計時に先回りして追加したものではない。

実際にCommit 2まで完了し、Interruptしようとした時に不足が観測された。

そのEvidenceを基に、Human Decision、ADR、IA更新、Configuration Audit、Review Package、Repository Reflectionへ進んだ。

これは、Local AI Foundryで繰り返し起きている進化の形でもある。

```text
実運用
↓
不足を観測
↓
責務を分離
↓
Human Decision
↓
ADR
↓
Documentation
↓
Repository Reflection
```

仕組みは、管理項目を増やすために作るのではない。

実際に失われた判断、確認できなかった現在地、再開できなかった作業断面を回復するために作る。

管理のための管理はしない。

必要になった時に、必要な責務だけを育てる。
