# CM-20260815-001 Human Decision BoundaryとMechanical Continuationを分離する

## ID

`CM-20260815-001`

## 日付

2026-08-15

## 分類

Human Authorization（人間承認） / Execution Control（実行制御） / Responsibility Boundary（責任境界）

## 目的

Human Decision（人間判断）が必要な地点と、既に決定された内容をAI / CODEXが自律的に継続して処理するMechanical Continuation（機械的継続）を分離する。

目的はHuman Gate（人間判断ゲート）を減らすこと自体ではない。

Humanが意味、Risk（リスク）、採用、公開、実行許可を判断する責任を維持しながら、Human Decisionを必要としないTest（テスト）、Verification（検証）、Currentization（現在化）、Binding Synchronization（ひも付け同期）まで毎回Humanへ返して作業を停止させないための実務境界を整理する。

## 背景

RI #1 Article Production（記事制作）のFormal Runtime Verification（正式実行検証）へ進む過程で、Human Gateの置き場所が繰り返し問題になった。

Live Apply / Publish（実環境反映 / 公開）のように、実環境の意味ある状態を変更する操作ではHuman Decisionが必要だった。

一方で、Humanが承認済みのPublished Result（公開済み結果）へCanonical Launcher（正式起動経路）を同期すること、Correction（修正）後のTestを実行すること、Post-Commit Verification（Commit後検証）を行うこと、Formal Current Source（正式な現在地正本）を決定済み結果へCurrentizeすることまで、毎回Human Decisionとして扱うと作業が不必要に停止する。

この障害パターンはBug Zooで次として整理した。

- `BZ-20260814-023 Human Gateを機械処理へ増殖させる`

一次記録は次である。

- `WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した`

## 基本原則

Human GateはWorkflow（作業フロー）の節目ごとに置くものではない。

Human GateはAuthority Boundary（権限境界）へ置く。

```text
意味・Risk・採用・公開・実行許可が変わる
→ Human Decision

既に決めた内容を一意に実装・同期・検証する
→ Mechanical Continuation
```

Humanが一度決定したScope（作業範囲）、Target（対象）、Contract（契約）、Authorization（許可）の内側では、AI / CODEXは明示されたSTOP条件へ到達するまで自律継続する。

## Human Decisionが必要なもの

次はHuman Authority（人間権限）に残す。

### Purpose（目的）の変更

ProjectまたはTaskの目的、成功条件、優先順位を変更する。

### Contract Meaning（契約意味）の変更

Schema（スキーマ）、Gate条件、Acceptance Criteria（受入条件）、Retry Policy（再試行方針）等の意味を変更する。

単なる表記修正や既決定値の同期ではなく、成立条件そのものが変わる場合を指す。

### Risk Acceptance（リスク受容）

既知のFailure（失敗）、不確実性、Security / Privacy（セキュリティ / プライバシー）Riskを受容して進める。

### Active Baseline（採用中基準）の採用・切替

Candidate Baseline（候補基準）をCurrent Active（現在採用中）へ昇格する判断。

### Publish / Live Change（公開 / 実環境変更）

Dify Published Workflow（公開済みワークフロー）等、Live State（実環境状態）へ意味のある変更を反映する。

### Runtime Authorization（実行許可）

Formal Runtime（正式実行）のように、実行そのものへ明示許可が必要と定義された場合。

### Destructive / External / Secret-sensitive Operation（破壊的 / 外部 / Secret依存操作）

削除、外部書込み、Credential（認証情報）生成・交換・破棄等、Risk Boundary（リスク境界）を越える操作。

## Human Decisionを増やさないもの

Humanが意味とScopeを既に承認しており、次の処理が一意に決まる場合は、新しいHuman Gateを作らない。

### Test / Regression Test（テスト / 回帰テスト）

承認済みCorrectionまたはImplementation（実装）がContractどおりか確認する。

### Correction Verification（修正検証）

承認済みFinding（指摘）への修正が成立したかを確認する。

### Post-Commit Verification（Commit後検証）

Commitされた内容が承認Scopeと一致するかを確認する。

### Deterministic Currentization（決定論的現在化）

Human-approved Result（人間承認済み結果）からCurrent Sourceへ一意に反映できる現在化。

### Binding Synchronization（ひも付け同期）

Humanが既にTargetを決定しており、生成されたCurrent Identity（現在識別子）へLauncherやDependent Artifact（従属成果物）を同期する。

### Generated / Derived View Update（生成 / 派生View更新）

Canonical Source（正式正本）から機械的に生成できるIVM等の派生表示を更新する。

## Authorized Envelope

Human Decision後にAI / CODEXが自律継続できる範囲をAuthorized Envelope（承認済み実行範囲）として扱う。

最低限、次を明確にする。

```text
Purpose
Approved Scope
Canonical Source
Target / Candidate
Allowed Operations
Required Tests
Required Verification
STOP Conditions
External Side Effect Boundary
Runtime Authorization State
```

このEnvelope内では、単にPhase（段階）が一つ終わったという理由だけでHumanへ戻さない。

例えば次の流れは一つのAuthorized Envelopeとして継続できる。

```text
Approved Correction
        ↓
Implement
        ↓
Test
        ↓
Correction Verification
        ↓
Commit
        ↓
Post-Commit Verification
        ↓
Dependent Currentization
        ↓
Preflight
```

各工程でPASSしたこと自体はHuman Decisionを新しく発生させない。

## STOPすべき条件

Mechanical Continuationでも無条件に進むわけではない。

次の場合はSTOPする。

### Meaning Conflict（意味競合）

Canonical ContractまたはHuman Decisionから次の処理を一意に決定できない。

### Scope Escape（Scope逸脱）

承認済みScope外の変更が必要になる。

### New Risk Boundary（新しいリスク境界）

Publish、External Write（外部書込み）、Credential変更、Destructive Operation等、未承認のRisk Boundaryへ入る。

### Ambiguous Target（対象不明）

Current Candidate、Current Published、Active Baseline等が複数あり、同期先を一意に決められない。

### Verification Failure（検証失敗）

Required Test、Semantic Verification（意味検証）、Binding Verification（ひも付け検証）等がFAILする。

### Authorization Exhausted / Consumed（許可消費済み）

明示されたOne-shot Authorization（1回限りの許可）が既に消費されている。

## Runtime Authorizationの消費

Runtime Authorizationは「Gateを確認した」だけでは消費しない。

今回のRI #1では、Fresh RV-01 Authorization（新規RV-01実行許可）を`GRANTED / NOT CONSUMED`として保持した。

Pre-Runtime Gate（実行前ゲート）がFAILし、Runtime Request（実行要求）を送信していない場合はAuthorizationを消費しない。

```text
Pre-Runtime Gate FAIL
Runtime Request = 0
→ Authorization NOT CONSUMED

Runtime Request Send
→ Authorization CONSUMED
```

Authorization消費のTrigger（契機）は、Contractで明示する。

推測で「もう使ったはず」「まだ使えるはず」と扱わない。

## PASS後の継続

工程設計では、PASS時のNext Action（次動作）を明示する。

次のようなPromptやProcedure（手順）は避ける。

```text
Test PASS
→ Report
→ STOP
→ Humanへ次の指示を要求
```

Human Decisionが存在しない場合は、次のようにする。

```text
Test PASS
→ Continue within Authorized Envelope

True Human Decision Boundary
→ STOP
```

Intermediate Report（中間報告）はTelemetry（進捗可視化）であり、原則としてApproval Request（承認要求）ではない。

## Human Gateを省略してはいけない場合

「HGやりすぎ問題」を防ぐことと、Human Authorityを削ることは別である。

次のような場合に「機械処理だから」とHuman Gateを消してはいけない。

- Candidateをどれにするか選ぶ。
- Contract条件を緩和する。
- Failureを許容してAcceptanceする。
- Published Workflowの意味を変更する。
- Runtimeを追加実行する。
- Model / Provider / Credential等を別構成へ変更する。
- 未承認ScopeまでCorrectionを拡大する。

Mechanical Continuationは、既決定内容の実行に限る。

新しい意味判断を機械処理へ偽装しない。

## RI #1での適用例

Deterministic Retry Correction（決定論的Retry修正）のRepository反映後、Live Draft / Publishedはまだ旧状態だった。

Live Apply / PublishはCurrent Published Workflowを変更するためHuman Decisionが必要だった。

HumanはExact Repository CandidateをDraftへApplyし、Verify後にPublishし、そのPublished ResultをFresh RV-01 Targetとして使用することを承認した。

Publish後に新しいPublished Workflow ID

`842c890c-7670-462b-956f-6156602280d5`

が生成された。

Canonical Launcherは旧Published Workflow IDを向いていたが、Humanはすでに「承認済みCandidateから生成・検証されたPublished Result」をRuntime Targetとして決定していた。

このため、新しいPublished Workflow IDへLauncherをCurrentizeすることは新しいHuman Decisionではなく、既決定TargetへのBinding Synchronizationとして処理した。

## 実務上の確認

Human Gateを追加する前に、次を確認する。

```text
1. 今、新しい意味判断が必要か。
2. Humanが選ぶべき候補が複数あるか。
3. Risk Boundaryを新しく越えるか。
4. 既存AuthorizationのScope外か。
5. 処理結果がCanonical Sourceから一意に決まるか。
```

1〜4が`No`で5が`Yes`なら、原則としてMechanical Continuationである。

逆に1〜4のいずれかが`Yes`ならHuman Decision Boundary候補として扱う。

## 学び

AIへ仕事を委譲する場合、Humanをすべての工程へ介在させることはHuman Responsibility Boundary（人間責任境界）ではない。

Humanが保持すべきなのは、目的、意味、Risk、採用、公開、許可に対するAuthority（権限）である。

その決定を実現するための決定論的な実装、同期、検証まで毎回Humanへ返すと、Humanは判断者ではなくWorkflow Controller（作業制御装置）になる。

実務上の境界は次である。

> Humanは意味と責任を決める。  
> AI / CODEXは、その決定の内側を自律的に完遂する。

ただし、AI / CODEXが新しい意味判断を必要とした時点でEnvelopeを越え、Humanへ戻る。

## 関連

* War Diary：`WD-20260814-001`
* Bug Zoo：`BZ-20260814-023`
* Bug Zoo：`BZ-20260814-020`
* `docs/configuration-management.md`
* `docs/codex-standard-operating-procedure.md`
* `docs/project-state-transition.md`
