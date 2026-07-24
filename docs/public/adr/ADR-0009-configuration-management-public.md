# ADR-0009: Configuration Managementを導入する

- Status: Accepted
- Date: 2026-07-24
- Scope: Project governance and configuration synchronization

## 背景（Context）

Local AI Foundryの構成情報は、Workflow Editor、エクスポートされたWorkflow定義、Git、Documentation、Provider Settings、実行時の状態など、複数の場所へ分散している。

これらは更新契機、保存形式、反映タイミングが異なるため、Workflow全体を一つの成果物だけで完全に表現することはできない。

GUIまたはエクスポート定義の一方を無条件に正本として全面同期すると、他方にだけ存在する有効なPrompt、Code、Gate条件、Runtime Parametersなどを失う可能性がある。

そのため、Workflow全体に単一の正本を置くのではなく、構成要素ごとに正本、派生物、実効状態、同期方向を管理する必要がある。

## 問題（Problem）

- 構成情報が複数の保存場所へ分散している。
- 保存された設定と実行時の実効状態が一致するとは限らない。
- GUI、Workflow定義、Git、Documentationのどれか一つだけでは全体を表現できない。
- 構成差分の存在だけでは、どちらを採用すべきか判断できない。
- Git外で行われた変更がProject Knowledgeへ残らない場合がある。
- 暫定変更が終了条件なしで恒久化する危険がある。

## 決定（Decision）

Local AI FoundryへConfiguration Managementを導入する。

Workflow全体を単一の正本として扱わず、Configuration Itemごとに次の情報を管理する。

- 正本
- 派生物
- 実効状態
- 同期方向
- 変更理由
- 検証結果

Configuration Itemには、少なくとも次の設定種別を含める。

- GraphとEdge
- Promptと変数参照
- Codeノード
- DTO、Normalize、Contract Gate
- LLM Node Parameters
- Provider Settings
- DraftおよびPublished Workflow
- Workflow定義
- Git
- Documentation
- Runtimeの実効状態と実行証跡

構成差分は、単なる一致・不一致ではなく、状態として分類する。

例：

- `Synchronized`
- `Equivalent`
- `Draft Newer`
- `Definition Newer`
- `Runtime Drift`
- `Intentional Temporary Drift`
- `Conflict`
- `Unknown`

採用判断はWorkflow全体ではなく、設定種別およびConfiguration Item単位で行う。

Git外で行った変更もHuman Change Traceの対象とし、変更理由と検証結果を残す。暫定変更には、対象、終了条件、復帰先、関連する検証記録を持たせる。

構成へ影響する作業は、同期状態と実効状態を確認するまで完了としない。

## 採用理由（Rationale）

- GUI、Workflow定義、Git、Documentation、Runtimeの差分を構成要素ごとに判断できる。
- 一括同期による有効設定の消失を防止できる。
- Prompt、Code、Graph、Runtime Parametersを独立した変更単位として扱える。
- 保存状態と実効状態を分離して管理できる。
- Git外の人間による変更をProject Knowledgeとして追跡できる。
- 一時的な変更と恒久的な変更を区別できる。
- Workflow成功と構成同期の完了を分離できる。

## 影響（Consequences）

### Positive（肯定的影響）

- 構成差分の判断基準が明確になる。
- 構成変更の追跡性と再現性が向上する。
- 実行時だけに存在する差分を検出しやすくなる。
- 一時的な変更を管理下に置ける。
- Documentationを構成管理の一部として扱える。
- 変更完了の定義を、実装だけでなく同期と検証まで含めて定義できる。

### Negative（否定的影響）

- 作業開始時と完了時の確認項目が増える。
- GUIだけで完結する変更を正式完了とは扱えなくなる。
- Configuration Itemごとの正本管理に継続的な保守が必要になる。
- 自動化が整うまでは、一部の比較と採用判断が手動になる。
- 監査情報そのものが古くならないよう管理する必要がある。

## Risk（リスク）

- Configuration Audit自体が古くなり、実状態を表さなくなる。
- 管理情報を増やしすぎると、実装と管理情報の二重管理になる。
- 開発初期に過度な監査を要求すると、実装速度を損なう。
- 差分の存在だけを理由に、新しい変更を機械的に採用または破棄する危険がある。
- Temporary Driftが、終了条件なしで恒久化する危険がある。

これらを抑制するため、Current Snapshot、恒久仕様、観測事実、重要判断をそれぞれ異なる文書責務へ分離する。

開発途中では、追跡可能なTemporary Driftを許容する。一方で、原因、意図、終了条件が不明なUnknown Driftは許容しない。

## 運用原則（Operational Principles）

- 構成差分はConfiguration Item単位で判断する。
- 保存された設定とRuntimeの実効状態を区別する。
- 同期作業では、差分の新旧だけでなく変更意図を確認する。
- Git外の変更も追跡対象とする。
- 暫定変更には終了条件と復帰先を持たせる。
- 構成変更は、同期状態と検証結果を確認して完了とする。
- Configuration Management自体もProject Knowledgeとして保守する。

## 適用範囲（Scope）

本ADRは、Local AI Foundryの開発ガバナンス、構成同期、変更追跡に適用する。

DTOの意味、Agent Promptの内容、Gate条件、Retry方針、外部処理、Persistenceなどの個別動作は、本ADRによって直接変更しない。

## 関連資料（Related）

- [Configuration Management](../configuration-management.md)
- [Project Constitution](../principles.md)
- [Project Status](../status.md)
