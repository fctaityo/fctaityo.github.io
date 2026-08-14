# CM-20260815-002 Dependent CurrentizationとBinding Synchronizationを漏らさない

## ID

`CM-20260815-002`

## 日付

2026-08-15

## 分類

Currentization（現在化） / Configuration Synchronization（構成同期） / Execution Binding（実行ひも付け）

## 目的

Canonical Source（正式正本）やLive Identity（実環境識別子）が変更された時に、そこへ依存するLauncher、Current Source、Derived View、Runtime Binding等を取り残さずCurrentizeするための実務手順を整理する。

特に、Publish（公開）のように操作結果として新しいIdentityが生成される場合、Human-approved Meaning（人間承認済みの意味）を維持したまま、Dependent Artifact（従属成果物）へ新しいCurrent Identityを機械的に伝播する。

## 背景

RI #1ではDeterministic Retry Correction（決定論的Retry修正）をRepositoryへ反映し、Human-approved Live Apply / Publish（人間承認済み実環境反映 / 公開）まで完了した。

Repository / Draft / PublishedのSemantic Graph（意味構造）は一致し、新しいPublished Workflow IDは次となった。

`842c890c-7670-462b-956f-6156602280d5`

しかしFinal Pre-Runtime Gate（最終実行前ゲート）で、Canonical Launcher（正式起動経路）が旧Published Workflow ID

`48371254-9e46-4441-aebf-5467baedf5d0`

を向いたままであることが検出された。

Runtime Request送信前にSTOPしたため誤実行は発生しなかった。

この出来事はBug Zooで次として一般化した。

- `BZ-20260814-021 ContractがExecution Pointまで届かない`

一次記録は次である。

- `WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した`

## Currentizationは「文書更新」だけではない

Currentizationを`status.md`等のCurrent Source更新だけと考えない。

意味のあるCurrent Targetが変わる場合、そのTargetを参照するすべてのConsumer（利用側）についてCurrentness（現在性）を確認する必要がある。

例えばPublished Workflowが変わる場合、確認対象には次が含まれ得る。

```text
Repository Candidate
Draft Workflow
Published Workflow
Canonical Launcher
Runtime Evidence Launcher
Formal Test Binding
status.md
active-work.md
Implementation Visibility Matrix
Generated / Derived View
Evidence Manifest
```

すべてを毎回更新するという意味ではない。

各Consumerについて、

```text
更新が必要
更新不要
Historicalとして維持
対象外
```

を判定する。

## Source ChangeとIdentity Changeを分ける

Currentizationでは、Content（内容）が変わる場合とIdentity（識別子）が変わる場合を分けて考える。

### Content Change

Repository内のPrompt、Graph、Parameter、Documentation等の内容が変わる。

必要に応じてDraft / Published等へSemantic Change（意味変更）を伝播する。

### Identity Change

Human-approved Contentの意味は同じでも、Publish結果やArtifact生成によって新しいID、Revision、Hash等が生成される。

この場合、Dependent Consumerは新しいIdentityへ同期する必要がある。

RI #1のCanonical Launcher問題は後者だった。

Humanは「承認済みCandidateから生成・検証されたPublished Result」をRuntime Targetとして承認していた。

Publish操作で新Published Workflow IDが生成されたため、LauncherがそのIDへ追従する必要があった。

新しい意味判断ではなく、承認済みMeaningを新IdentityへBindingする処理である。

## Dependent Currentization

あるCurrent Value（現在値）が変わった時、その値へ依存するConsumerをCurrentizeする処理をDependent Currentization（従属現在化）として扱う。

```text
Approved Source / Meaning
        ↓
Operation
        ↓
New Current Identity
        ↓
Dependent Consumer Discovery
        ↓
Binding Synchronization
        ↓
Verification
```

重要なのは、変更したArtifact自身だけで完了扱いにしないことである。

## Dependencyの種類

依存は少なくとも次に分ける。

### Direct Execution Dependency（直接実行依存）

Launcher、Endpoint、Workflow ID、Formal Input Artifact等。

誤ると別Targetを実行するため、Runtime前にBlocking Verification（停止を伴う検証）が必要。

### Current State Dependency（現在状態依存）

`status.md`、`active-work.md`等。

Current Stateを人間とAIが誤認しないためにCurrentizeする。

### Derived View Dependency（派生表示依存）

IVM、Dashboard、Generated Summary等。

Canonical Sourceから再生成可能なら、Canonical Source更新後に機械再生成する。

### Historical Reference（履歴参照）

過去Evidence、War Diary、Historical Run Record等。

当時の事実を保存するため、Current Identityへ書き換えてはいけない。

Currentization対象とHistorical Preservation（履歴保存対象）を混同しない。

## Currentizationの標準確認順序

Current Targetが変更された場合、次の順序で確認する。

### 1. Canonical Changeを特定する

何がCurrentになったかを固定する。

例：

```text
Approved Repository Commit
Published Workflow ID
Revision
Semantic Hash
```

### 2. Human-approved Meaningとの一致を確認する

新しいIdentityがHuman-approved Candidate（人間承認済み候補）から生成された結果か確認する。

意味が変わっている場合はMechanical Currentizationではなく、新しいHuman Decision Boundary候補となる。

### 3. Dependent Consumerを列挙する

Launcher、Current Source、Derived View、Evidence Generator等、旧Valueを参照する可能性があるConsumerを確認する。

### 4. Historical Referenceを除外する

過去RunやHistorical Evidence等、旧Valueを保存すべき記録はCurrentizeしない。

### 5. Bindingを同期する

Human-approved Meaningから一意に決まるCurrent ValueへConsumerを更新する。

### 6. Pre-Execution Verificationを行う

Runtimeに影響するBindingは、Credential解決やRequest送信より前に照合する。

### 7. Generated Viewを再生成する

IVM等、Canonical Sourceから機械生成できるものを再生成する。

### 8. Repository Reflectionを検証する

Commitしただけで終わらせず、承認Scope、Current Binding、Generated Viewが一致していることをPost-Commit Verificationで確認する。

## Binding Synchronizationの条件

新しいHuman DecisionなしでBinding Synchronizationを実行できるのは、少なくとも次を満たす場合である。

```text
Human-approved Meaningが確定している
AND
Current Targetが一意である
AND
新Identityがその承認済みMeaningから生成された
AND
同期先が既知のDependent Consumerである
AND
Contract Meaningを変更しない
AND
新しいRisk Boundaryを越えない
```

これらを満たさない場合は、単なるCurrentizationとして処理しない。

## Pre-Execution Binding Gate

Runtime Launcherは特に厳格に扱う。

最低限、次をRequest送信前に確認する。

```text
Expected Published Target
Actual Launcher Target
Formal Test ID
Exact Input Source
Baseline
Required Artifact Identity / Hash
```

Mismatchが一つでもある場合はSTOPする。

Runtime Requestを送信しない。

Credentialを不要に解決しない。

One-shot Runtime Authorizationがある場合も、Request未送信なら消費しない。

## Publish後のCurrentization

PublishはIdentityを生成・変更し得るため、Publish Verificationに次を含める。

```text
1. Publish Operation PASS
2. Published Result取得
3. Repository / Draft / Published Semantic Match
4. New Published Identity固定
5. Dependent Launcher / Binding確認
6. Required Current Source確認
7. Derived View再生成
8. Final Pre-Runtime Binding Gate
```

「Publish PASS」でCurrentization完了としない。

## Repository / Draft / Publishedの一致とLauncher一致は別Gate

RI #1ではRepository / Draft / PublishedのGraphはすべて89 Nodes / 100 Edges、Graph MD5

`4d06f300bf92ce9eecba5f8d768ed00a`

で一致した。

それでもLauncherは旧Published IDを向いていた。

このため、次は別々に検証する必要がある。

```text
Semantic Equivalence
Repository = Draft = Published

Execution Binding
Launcher = Current Published
```

Semantic Match（意味一致）がPASSしてもExecution Binding（実行ひも付け）PASSを意味しない。

## Fixed Decision Bindingとの関係

HumanまたはCanonical ContractがTargetを一度決定した後は、Dependent Consumer側でTargetを再探索させない。

```text
Human-approved Target
        ↓
Current Identity
        ↓
Machine-readable Binding
        ↓
Dependent Consumer
```

この考え方をWorking Nameとして`Fixed Decision Binding`と呼ぶ。

CMでは正式Architecture名を確定せず、実務上は「既決定Targetを再選択させない」「MismatchをPre-Executionで止める」という運用として扱う。

## Currentization Loopを作らない

Current Source更新を記録するためにさらにCurrent Sourceを更新し、そのCommit SHAを記録するためにまた更新する、といった再帰的Currentizationを作らない。

Evidence-only Reflection（証拠だけの反映）で完了条件を再生成し続けない。

CurrentizationのClosure（完了）は、承認対象の意味と必要BindingがCurrentであることによって判断する。

Commit Identityそのものを同じCommit内へ自己記録する必要がある場合は、別のCanonical Mechanism（正式仕組み）が明示されている場合に限る。

## Existing Driftを巻き込まない

Dependent Currentizationを行う時も、既存Working Tree Drift（作業ツリー差分）やSeparate Repository（別Repository）を無関係に修正しない。

Currentization Scopeを列挙し、Scope外の既存差分はPreserve（維持）する。

「現在化だからついでに直す」は行わない。

## 実務Checklist

Current Target変更後は次を確認する。

```text
[ ] Current Source / Meaningは何か
[ ] 新Identityは何か
[ ] Human-approved Meaningと一致するか
[ ] Direct Execution Consumerは何か
[ ] Current State Consumerは何か
[ ] Derived Viewは何か
[ ] Historical Referenceは何か
[ ] 旧Identity参照が残っていないか
[ ] Runtime前Binding Gateがあるか
[ ] Repository Reflection後に再確認したか
[ ] Scope外Driftを保持したか
```

## 学び

Configuration Managementでは、変更したSourceだけを見るとCurrentizationを取りこぼす。

重要なのは「何を変えたか」だけでなく、

> その変更を前提として動くものが、どこに存在するか

を追跡することである。

特にAI / Agent Workflowでは、Contract、Repository、Live State、Launcher、Runtime Request、Evidence Generatorが別々の層に存在する。

上流で正しく決めても、Execution PointまでCurrent Valueが届かなければ実際の挙動は変わらない。

したがってCurrentizationは、文書更新ではなくDependency Closure（依存関係の収束確認）として扱う。

## 関連

* War Diary：`WD-20260814-001`
* Bug Zoo：`BZ-20260814-021`
* Bug Zoo：`BZ-20260814-020`
* Configuration Management Note：`CM-20260815-001`
* `docs/configuration-management.md`
* `docs/codex-standard-operating-procedure.md`
* `docs/active-work.md`
* `docs/status.md`
