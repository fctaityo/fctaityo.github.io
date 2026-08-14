# WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した

## 日付

2026-08-14

## 出来事

RI #1 Article Production（記事制作）のRuntime Verification（実行検証）へ進む過程で、Repository、Draft、Published、Formal Test Case、Canonical Launcher、Retry Contractまで事前に整備していたにもかかわらず、Formal RV-01の実行段階で複数のExecution Binding（実行ひも付け）不備が連続して表面化した。

今回の一連の出来事は、一つのRuntime Failureだけではない。

最初のFormal RV-01候補では、Human（人間）が定義済みのFormal Test ID `RV-01`に対応するExact Input（固定入力）があるにもかかわらず、実行側がgeneric E2E fixture（汎用E2Eテスト入力）を選択できる状態になっていた。その結果、Formal RV-01として扱うべきでないInputが送信され、Run ID `256bb97d-c590-408d-bb02-ff8419b9ad4e`が生成された。

このRunはFormal Input Binding Mismatch（正式入力ひも付け不一致）として無効扱いとし、Formal RVへ算入しなかった。

その後、Formal Test IDとExact Inputを機械的に固定するCorrection（修正）を行い、Commit `b368a2d675345164942f39e35776e6dd083826a2`でFormal Input BindingをRepositoryへ反映した。

Correction後のFormal RV-01では、Canonical Input SHA-256 `de79fdc53709f048c81bfc6ea223884e831f3b5fc5004268f4810a37958ae01b`が使用され、Formal Input BindingはPASSした。

しかし、今度はWorkflow内部のConclusion Retry（結論再試行）で別の問題が発生した。

## Formal Input Binding Mismatch

Human側では、`RV-01` / `RV-02` / `RV-03`をFormal Test Case（正式テストケース）として定義していた。

ところが実行側には、

```text
Formal Test ID
→
Exact Input
```

を一意に固定するMechanical Binding（機械的ひも付け）が存在していなかった。

そのため、Formal RunでありながらInput Source（入力元）を実行側が再選択できた。

実際のInvalid Pre-Correction Attempt（修正前無効実行）では、Formal RV-01のCanonical Inputではなくgeneric fixtureが使用された。

この時点で分かったのは、「Humanがテストケースを決めた」ことと、「その値以外をExecution Point（実行地点）で選択不能にした」ことは別だということだった。

Correctionでは、任意のRuntime Case指定を廃止し、Formal Runでは`RV-01` / `RV-02` / `RV-03`のFormal Test IDだけを受け付け、Machine-readable Canonical Artifact（機械可読な正式入力成果物）からExact Inputを解決する方式へ変更した。

Mismatchがある場合はCredential（認証情報）解決やHTTP送信より前にSTOPする。

## Correct ContractでもRV-01はFAILした

Formal Input Binding Correction後、Correct Contract（正しい契約）の下でFresh Formal RV-01を実行した。

Evidence Sessionは`fd209133-55b8-4019-8e0d-fea75d430cf4`、Dify Workflow Run IDは`bddfc9f9-9661-45c2-9f42-5e2e1de81c0b`である。

Formal Input BindingはPASSしたが、Workflowは`write_conclusion_retry_gate`でFAILした。

確認された文字数は次のとおりだった。

```text
Conclusion Initial
623

Conclusion Retry
698

Expected Range
240–420
```

Retryは、初回出力が長すぎたために行われた。

それにもかかわらず、Retry後は短くならず、623文字から698文字へ増えた。

このRunはFormal RV-01として`FAILED`となり、Runtime Acceptance（実行結果の正式受入れ）は`PENDING`のままとした。

## Retry PromptをRuntime Evidenceから確認した

「LLMが指示を守らなかった」で終わらせず、実際にOllamaへ送られたRetry PromptとDify Node Executionの`process_data.prompts`を確認した。

確認結果は`MIXED`だった。

Retry Strategy側では、前回の実測値`623`、確定上限`420`、最低でも`203`文字削減する必要があること、明示的に短縮・圧縮すべきことがRuntime Promptへ渡されていなかった。

一方、モデル自身のreasoningでは`240–420`という有効範囲を正しく計算していた。それにもかかわらず698文字を生成したため、Model Instruction Following Failure（モデル指示追従失敗）も成立した。

さらに、Section 1 / Section 3のRetryには「約20％短縮」という指示が存在した一方、Conclusion Retryには同じ短縮指示が存在せず、SectionごとにRetry Strategyが揃っていなかった。

しかも固定20％短縮はContract-safe（契約上安全）ではなかった。

```text
623 × 0.8 ≒ 498
```

Conclusionの上限420文字には届かないためである。

## 数える仕事をLLMへ戻していた

今回のRetry Failureで最も単純だった問題は、実測値をMachine（機械）がすでに知っていたことだった。

Gateは前回出力の実際の文字数を計測できる。

Minimum、Maximum、Targetも機械的に計算できる。

それにもかかわらず、Retry側ではLLM自身に前回出力の長さを推定させていた。

実際、モデルのreasoningでは前回出力を「約370文字」と誤認していた。

この誤認は、実際の623文字というMachine-measured Fact（機械計測済み事実）をRetry Payloadへ渡していなかったために発生した。

そこでHuman Decision（人間判断）としてOption A — Deterministic Retry Correction Payload（決定論的Retry修正Payload）を採用した。

役割を次のように分離した。

```text
Count / Compare / Delta
→ Machine

Meaning-preserving Rewrite / Compression
→ LLM
```

Retry時には、各SectionについてMachineが次を算出してLLMへ渡す。

- `previous_actual_length`
- `target`
- `minimum`
- `maximum`
- `excess`
- `required_reduction`
- `direction`
- `final_retry`

固定の「約20％短縮」は使用しない。

Introduction、Section 1、Section 2、Section 3、Conclusionの全5 Section Writing Retryへ同じ方式を横断適用した。

Repository Correction Commitは`2c59b018e3193ea0a197e657af1db6ddae1a455d`である。

Target Testsは`97 / 97 PASS`、Repository Testsは`173 / 173 PASS`となった。

## Repositoryを直しただけではLiveは直らなかった

Deterministic Retry CorrectionをRepositoryへ反映した直後、Pre-Runtime GateはFAILした。

理由は、Repositoryには新しい`retry_correction_json`が5 / 5存在した一方、Dify Draft / Publishedにはまだ反映されておらず0 / 5だったためである。

これはMechanical Currentization（機械的現在化）ではなく、Live Apply / Publish（実環境反映 / 公開）を伴う変更だったため、Human Authorization（人間許可）が必要だった。

そこで、HumanはRepository Commit `2c59b018e3193ea0a197e657af1db6ddae1a455d`のExact CandidateをCurrent Dify DraftへApplyし、Verify後にPublishすることを明示承認した。

Live Apply / Publish後、新しいPublished Workflowは`842c890c-7670-462b-956f-6156602280d5`となった。

Repository / Draft / Publishedはすべて89 Nodes / 100 Edges、Graph MD5 `4d06f300bf92ce9eecba5f8d768ed00a`で一致し、`retry_correction_json`も`5 / 5 / 5`となった。

## Publish後、Launcherだけ旧Publishedを向いていた

Live Apply / PublishはPASSしたが、Final Pre-Runtime Gateは再びFAILした。

Canonical Launcher（正式起動経路）が、旧Published Workflow

`48371254-9e46-4441-aebf-5467baedf5d0`

を向いたままだったためである。

Current Published Workflowは、

`842c890c-7670-462b-956f-6156602280d5`

へ変わっていた。

このGate STOP自体は正しかった。

旧Publishedを向いたLauncherでRuntimeを実行すれば、Current CandidateではないWorkflowをFormal RVとして実行することになる。

一方、この時点でHumanは、Commit `2c59b018e3193ea0a197e657af1db6ddae1a455d`から生成・検証されたPublished ResultをFresh RV-01のRuntime Targetとしてすでに承認していた。

したがって、生成された新しいPublished Workflow IDへCanonical LauncherをCurrentizeする処理は、新しいTargetをHumanが選び直すDecisionではなく、既決定TargetへのDeterministic Binding Synchronization（決定済み対象への機械的ひも付け同期）として扱った。

Canonical Launcherは旧Targetから`842c890c-7670-462b-956f-6156602280d5`へCurrentizeされ、Commit `90ce9c7dc43e435ffd04767091ebcc19f4a99d28`でRepositoryへ反映された。

## Human Gateの境界も揺れた

今回の一連では、Human Gate（人間判断ゲート）の置き場所についても混乱があった。

Live Apply / Publishは、実環境のPublished Workflowを変更するためHuman Decisionが必要だった。

一方で、Humanがすでに承認したTargetへLauncherを同期すること、Testを実行すること、Post-Commit Verificationを行うこと、Current Sourceを機械的にCurrentizeすることまで毎回Humanへ戻すと、Humanは判断者ではなく単なる承認ボタンになる。

今回、Fresh RV-01 Authorizationは`GRANTED / NOT CONSUMED`のまま維持した。

Runtime Requestが送信されていない機械的Gate FAILではAuthorizationを消費しない。

Human Decisionを必要とする変更と、既決定内容を一意に同期するMechanical Continuation（機械的継続）を分離する必要があることが明確になった。

## Clean StopまでCurrentizeした

Canonical Launcher Currentization後、Fresh RV-01をすぐ実行せず、次回再開しやすいClean Stop（綺麗な停止点）を作った。

Current Stateは次のとおりである。

```text
Repository
CURRENT

Draft
CURRENT

Published
CURRENT

Canonical Launcher
CURRENT

Formal Current Source
CURRENT

IVM
CURRENT

Current Candidate Runtime
NOT EXECUTED

Fresh RV-01 Authorization
GRANTED / NOT CONSUMED
```

Current Published Workflowは`842c890c-7670-462b-956f-6156602280d5`。

Repository / Draft / Published Graph MD5はすべて`4d06f300bf92ce9eecba5f8d768ed00a`。

Runtime Requestは`0`。

Current Candidateに対するWorkflow Runも`0`。

次のActionはFresh Formal RV-01 Final Pre-Runtime Gateである。

## この時点で確定した事実

今回のWar Diaryでは、次の事実までを固定する。

1. Human-defined Formal Test Caseが存在していても、Execution PointでExact Input Bindingを機械強制しなければ別Inputを選択できた。
2. Correct Formal Input Binding下でも、Conclusion Retryは623文字から698文字へ増加し、240–420文字のGateを満たさなかった。
3. Retry PromptにはMachineが知っていた実測623、上限420、最低203削減というCorrection Factが十分に渡されていなかった。
4. Section間でRetry Strategyが統一されていなかった。
5. Deterministic Retry Correction Payloadを全5 Sectionへ横断実装した。
6. Repository CorrectionだけではLive Draft / Publishedは変わらず、Human-approved Live Apply / Publishが別途必要だった。
7. Publish後にCanonical LauncherのCurrent Target Bindingが旧Publishedのまま残り、Final Pre-Runtime GateがRuntime送信前に停止させた。
8. LauncherをCurrent PublishedへCurrentizeし、Fresh RV-01直前のClean Stopまで同期した。
9. Current Candidate Runtimeはまだ`NOT EXECUTED`であり、Fresh RV-01の結果はまだ存在しない。

## まだ結論にしないこと

今回の出来事から、次の考え方が候補として見えた。

- Humanが一度決めた値をAIへ再選択させないFixed Decision Binding
- Contract DefinitionだけでなくExecution PointまでのContract Propagation
- Deterministicに処理できる計測・比較・同期をLLMやHumanへ戻さないResponsibility Boundary
- Human Decision GateとMechanical Continuationの分離
- Publish等でIdentityが変わるArtifact間のDependent Currentization

ただし、これらをこのWar DiaryだけでFoundry Coreや恒久Architectureとして確定しない。

再発可能な障害パターンはBug Zooへ、変更・同期・Authorizationの実務知識はConfiguration Management Notesへ、Human-AI Development Operating Modelとして一般化できる内容はDevelopment Model Notesへ整理したうえで、必要なものだけを正式な設計判断へ昇格させる。

## 関連

- Formal Input Binding Correction Commit `b368a2d675345164942f39e35776e6dd083826a2`
- Historical Correct-Contract RV-01 Run ID `bddfc9f9-9661-45c2-9f42-5e2e1de81c0b`
- Historical Correct-Contract RV-01 Evidence Session `fd209133-55b8-4019-8e0d-fea75d430cf4`
- Deterministic Retry Correction Commit `2c59b018e3193ea0a197e657af1db6ddae1a455d`
- Current Published Workflow `842c890c-7670-462b-956f-6156602280d5`
- Canonical Launcher Currentization Commit `90ce9c7dc43e435ffd04767091ebcc19f4a99d28`
- `docs/status.md`
- `docs/active-work.md`
- LF Human + ChatGPT Side Task Matrix v1.0.45
