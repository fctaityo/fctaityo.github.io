# Configuration Synchronization Audit - Public Edition

- Audit ID: `CFG-20260724-002`
- Date: `2026-07-24`
- Phase: `Development`
- Scope: Draft / DSL間のPrompt・Code・LLM Parameters比較
- Task: 同期前のEvidenceと採用候補を確定し、人間承認が必要なConfiguration Itemを識別する
- Result: `Blocked`

> 本文書は、内部Configuration Auditの公開版である。Git識別子、内部App / Workflow ID、Runtime Run ID、ハッシュ値、ローカルパスなど、公開上不要な運用識別情報は省略している。判定、技術的論点、Blocking Drift、採用判断の内容は内部版から変更していない。

## 1. Audit Sequence

本Auditでは同期を実施していない。手順は次のとおりである。

```text
Audit
↓
Evidence
↓
Human Approval Pending
```

Prompt、Code、LLM Parameters、Provider、Runtime、Draft、DSL、Published Workflowは変更していない。

## 2. Baseline Summary

| Item | State |
|---|---|
| Draft graph | 73 nodes / 79 edges |
| DSL graph | 73 nodes / 79 edges |
| Provider / Model | Ollama / `gemma4:latest` |
| Provider known values | context size `16384` / max tokens `8192` |
| Prompt | 6 LLM nodesでConflict |
| Code | 5 Code nodesでConflict |
| LLM Parameters | Node明示値とRuntime実効値の関係が未確定 |
| Published Workflow | 本Auditでは未確認 |

Graph構造とProvider / Model identityは一致していた。一方、Prompt、Code、LLM Parametersには、単純な片側コピーでは解消できない差分が残っていた。

## 3. Prompt Comparison

DraftとDSLでPrompt本文が異なるLLMノードは6件あった。

| Node | Main Difference | Adoption Candidate |
|---|---|---|
| `planning_agent` | Draftは、企画と調査の責務分離、曖昧な対象の断定禁止、JSON契約を詳細化 | Draft候補。人間承認待ち |
| `research_agent` | Draftは非捏造とJSON契約を詳細化。DSLには短文化制約の重複がある | Draftをbase候補。短文化制約は重複除去後に別判断 |
| `research_retry_agent` | Draftは壊れた断片を模倣せず、完全DTOを再生成する規則を明示 | Draftをbase候補。Retry制約は別判断 |
| `writing_plan_agent` | Draftは5区画固定、空値禁止、文字数決定をNormalizeへ委譲 | Draft候補。人間承認待ち |
| `write_conclusion_retry_agent` | Draftは契約本文が強いが、解決先のない4変数を参照。DSLには有効selectorが存在 | **単純同期禁止**。DSLの有効selectorを維持し、Draftの契約本文を採る案 |
| `distribution_agent` | Draftは投稿数、タグ数、SEO keyword配列の契約を詳細化 | Draft候補。人間承認待ち |

### 3.1 Conclusion Retry Promptの未解決変数

Draft側のConclusion Retry Promptには、次の4変数への参照があった。

```text
article_summary
article_title
conclusion_requirements
requested_checkpoint
```

しかし、これらを解決するWorkflow graph上の出力は存在しなかった。Prompt本文は文章として完結していても、Runtimeでは値が空または未定義になるRiskがある。

一方、DSL側には実在するNode outputへ解決できるselectorがあった。

```text
writing_plan_contract.writing_plan_json
writing_plan_contract.conclusion_plan_json
research_result_unpacker.research_json
write_conclusion_agent.text
write_conclusion_gate.violations_json
```

したがって、DraftかDSLのどちらかをそのまま正本へコピーする方法は採用できない。必要なのは、Draftの契約本文とDSLの有効selectorを統合した新しいPromptである。

## 4. Code Comparison

Code本文が異なるノードは5件あった。

| Node | Main Difference | Adoption Candidate |
|---|---|---|
| `normalize_research_retry_contract` | Draftは`<think>`やcode fence除去、parse防御を詳細化。入力名は意味のない名称 | Draft Codeをbaseとし、入力名をsemantic nameへ統一 |
| `artifact_validator` | Draftは型防御、Section数、宣言値、warning構造を詳細化 | Draft候補 |
| `write_conclusion_retry_gate` | Draftは文字数違反だけをWarningへ分離。DSLはBlocking | Temporary Driftとしての期限・復帰条件・承認が必要 |
| `write_introduction_retry_gate` | Draftは文字数違反をWarning、DSLはBlocking | 明示的な承認EvidenceがないためDSL維持候補 |
| `writing_artifact_merge` | Draftはdistribution parse、型検査、確定Artifact構築を詳細化 | 意味生成を行わないことを確認後、Draft候補 |

Code差分は「新しい方を採る」という判断だけでは処理できない。Gateの厳格度やTemporary Driftの扱いを含むため、Node単位の承認と再検証が必要である。

## 5. LLM Parameters / Runtime Comparison

DraftとDSLには18個のLLMノードがある。

| Item | Observed State | Decision |
|---|---|---|
| Provider / Model | 全18ノードでOllama / `gemma4:latest` | Synchronized |
| Context | Draftの`review_retry_agent`だけ`num_ctx=16384`を明示。他17ノードとDSLには明示値なし | 用途別Policyを先に決定する |
| Max Tokens | Draftの`review_retry_agent`だけ`num_predict=2048`を明示 | 用途別Policyを先に決定する |
| Temperature | 全18ノードで明示値なし | 現状維持候補 |
| Structured Output | 全18ノードで無効 | Synchronized |
| Reasoning / Think | Draftの`review_retry_agent`だけ`think=false`を明示 | JSON DTO生成ノードで明示するか人間判断 |

Runtime DBには総token数の記録はあるが、Ollamaへ送信した完全なrequest payloadは保存されていなかった。そのため、次の値を事後に確定できない。

- `num_ctx`
- `num_predict`
- temperature
- think

Provider設定にcontext sizeとmax tokensが登録されていても、それだけで全LLMノードの実効値を保証することはできない。Configuration上の意図とRuntimeで実際に送信された値は、別のEvidenceとして扱う必要がある。

## 6. Configuration Status Matrix

| Configuration Item | Status | Severity | Decision |
|---|---|---|---|
| Graph | Synchronized | None | 維持 |
| Prompt | Conflict | Blocking | Node単位で人間承認 |
| Code | Conflict | Blocking | Node単位で人間承認 |
| Normalize inputs | Conflict | Blocking | Code採用と同時に承認 |
| LLM Parameters | Runtime Drift | Blocking | 用途別Policy決定後に同期・再検証 |
| Provider / Model identity | Synchronized | None | 維持 |
| Published Workflow | Not Checked | Warning | 公開前Auditで確認 |
| Documentation | Current Auditと同期 | None | 維持 |

## 7. Blocking Drift

| ID | Item | Condition | Unblock Condition |
|---|---|---|---|
| `CFG-B004` | Prompt | 6ノードが競合し、Conclusion RetryにはDraftとDSL双方に保持すべき要素がある | Prompt採用方針を承認し、1 Problemずつ同期・再監査 |
| `CFG-B005` | Code / Normalize | 5 Codeノードと入力名が競合し、Gateの厳格度に承認差分がある | Code採用方針を承認し、1ノードずつ同期・再監査 |
| `CFG-B006` | LLM Parameters / Runtime | Node明示値が一部にしかなく、完全なRuntime request payloadを取得できない | 用途別Parameter Policyを承認し、Node設定と実効値を再検証 |

Blocking Drift件数: **3**

## 8. Verification

| Verification | Result |
|---|---|
| Graph | PASS - Draft / DSLとも73 nodes / 79 edges |
| Prompt | Compared - 6差分ノードを確認 |
| Prompt variables | Compared - Conclusion Retryの未解決4変数を確認 |
| Code | Compared - 5差分ノードを確認 |
| LLM Parameters | Compared - 全18ノードを確認 |
| Runtime | Partial - token evidenceは確認、完全なrequest payloadは取得不可 |
| Published Workflow | Not Checked |
| Synchronization | Not Performed - 人間承認前のため |

## 9. Final Result

**Blocked**

理由:

- Prompt、Code、LLM Parametersの採用方向が人間承認待ちである。
- Conclusion Retry PromptはDraftとDSLの双方に保持すべき要素があり、単純同期できない。
- Runtimeで実際に送信されたParameterを、保存済みConfigurationだけから確定できない。

## 10. Current Baseline

**Provisional / Classified / Blocked**

GraphとConfiguration identityはBaseline候補として維持する。Prompt、Code、LLM Parametersは正式Baselineへ未採用である。

## 11. Next Smallest Action

Conclusion Retry Promptだけを最初の承認対象とする。

理由:

- Draft側に未解決変数があり、Runtime入力欠落Riskが明確である。
- DSL側には有効selectorがある。
- Promptの問題として、GateのWarning化とは分離して扱える。

承認後もPrompt 1ノードだけを同期し、静的selector検証と新しいConfiguration Auditを行う。

## 12. Human Approval

- Required: `Yes`
- Status: `Pending`
- Notes: 本Auditは比較と候補提示のみ。同期、設定変更、公開、Commitは実施していない。
