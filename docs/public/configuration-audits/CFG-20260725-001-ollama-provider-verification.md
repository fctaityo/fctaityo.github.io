# Ollama Provider Verification Audit - Public Edition

- Audit ID: `CFG-20260725-001`
- Date: `2026-07-25`
- Phase: `Development`
- Scope: `CFG-P001` Ollama Provider Settings
- Task: Provider設定と実効接続を検証し、`Synchronized`から`Verified`への遷移可否を判定する
- Audit Result: `Synchronized`
- Configuration Item Status After: `Verified`

> 本文書は、内部Configuration Auditの公開版である。Git識別子、内部DBレコード、Credential、Base URL、Model digest、Runtime Run ID、ハッシュ値など、公開上不要な運用識別情報は省略している。判定、検証範囲、技術的論点は内部版から変更していない。

## 1. Purpose

保存されているProvider設定を読むだけでは、Runtimeで実際に接続・生成できることまでは証明できない。

本Auditでは、次の3段階を分けて検証した。

```text
Provider configuration
↓
Ollama model existence
↓
Runtime generation through the actual network path
```

対象Configuration ItemにBlocking DriftとUnknown Driftがなく、実効接続と生成が確認できた場合に限り、状態を`Verified`へ遷移する。

## 2. Scope and Boundary

本Auditの対象:

- Difyに登録されたProvider / Model identity
- Providerの非Secret設定値
- Ollama上の同名モデル実体
- HostからOllamaへの短文生成
- Dify API containerからOllamaへの接続と短文生成

本Auditの対象外:

- LLMノードごとのContext
- LLMノードごとのMax Tokens
- Temperature
- Structured Output
- Reasoning / Think
- Workflow実行時の完全なrequest payload
- Workflow全体のE2E

Provider設定だけでNode単位の実効Parameterを保証しない。この責務境界を維持したまま、Provider層の実効接続だけを検証する。

## 3. Baseline Summary

| Item | Observed Value |
|---|---|
| Provider | Ollama |
| Model | `gemma4:latest` |
| Provider context size | `16384` |
| Provider max tokens | `8192` |
| Runtime path | Dify API container → Ollama |
| Status Before | `Synchronized` |
| Status After | `Verified` |

CredentialのSecret値と接続先の具体値はAuditへ記録していない。

## 4. Compared Representations

| Representation | What Was Verified | Result |
|---|---|---|
| Dify Provider configuration | Provider名、Model名、種別、非Secret設定値 | PASS |
| Ollama model registry | 同名モデルがRuntime上に存在し、metadataを取得できる | PASS |
| Host runtime | Ollamaへ短文生成を要求し、正常終了する | PASS |
| Dify network runtime | Dify API containerからOllamaへ到達し、短文生成が正常終了する | PASS |

## 5. Runtime Evidence

### 5.1 Host Runtime

Ollamaへ直接、短い生成リクエストを送信した。

```text
POST /api/generate
```

結果:

```text
response = CFG-P001-OK
done = true
done_reason = stop
```

### 5.2 Dify Network Runtime

Dify API containerの内側から、実際の接続経路を使って同様の生成リクエストを送信した。

```text
Dify API container
↓
Ollama
↓
POST /api/generate
```

結果:

```text
response = DIFY-PROVIDER-OK
done = true
done_reason = stop
```

設定が保存されているだけでなく、DifyからOllamaへ到達し、実際に生成が完了することを確認した。

## 6. Configuration Status Matrix

| Configuration Item | Representation | Status Before | Status After | Severity | Decision |
|---|---|---|---|---|---|
| `CFG-P001` | Dify Provider configuration | `Synchronized` | `Verified` | None | 維持 |
| `CFG-P001` | Ollama model registry | `Synchronized` | `Verified` | None | 維持 |
| `CFG-P001` | Dify container → Ollama Runtime | `Synchronized` | `Verified` | None | `Verified`へ遷移 |

## 7. Drift Assessment

| Drift Type | Result |
|---|---|
| Warning | None |
| Blocking Drift | None |
| Temporary Drift | None |
| Unknown Drift | None |

## 8. Verification

| Verification | Result | Evidence Summary |
|---|---|---|
| Static | PASS | Provider / Model identityと非Secret設定値が一致 |
| Unit | Not Applicable | 実装ロジック変更なし |
| Integration | PASS | Dify API containerからOllama model情報を取得 |
| E2E | Not Applicable | Workflow全体はScope外 |
| Runtime | PASS | HostおよびDify container経路の生成が`done_reason=stop`で完了 |
| Artifact | Not Applicable | Artifact変更なし |
| Documentation links | PASS | 関連Documentationとの責務境界を確認 |

## 9. Final Result

**Synchronized**

理由:

- Difyに保存されたProvider / Model identityと非Secret設定値が同期済み状態と一致した。
- Ollama上に同名モデルが存在した。
- HostからOllamaへの短文生成が正常終了した。
- Dify API containerからOllamaへ到達し、短文生成が`done_reason=stop`で完了した。
- 対象ScopeにBlocking DriftとUnknown Driftがなかった。

この結果により、Configuration Item `CFG-P001`の状態を`Synchronized`から`Verified`へ遷移した。

## 10. Definition of Done Decision

- Applicable DoD: `Development`
- Decision: `Met`
- Unmet conditions: None

## 11. Important Boundary

この`Verified`判定は、Provider層の設定、モデル実体、接続経路、短文生成に対するものである。

次は保証しない。

- 各LLMノードの実効Context
- 各LLMノードの出力上限
- Workflow Runtimeで送信された完全なParameter
- Workflow全体の正常完走

Providerが`Verified`でも、Node設定とWorkflow Runtimeは別のConfiguration Itemとして検証しなければならない。

## 12. Next Smallest Action

次のPending Configuration Itemを、同じくScopeを限定したAuditで確認する。

## 13. Human Approval

- Required: `No`
- Status: `Not Required`
- Notes: 保存済みProvider設定は変更せず、検証と状態遷移だけを実施した。

[Configuration Audit一覧へ戻る](index.md)

[Public Documentationへ戻る](../README-public.md)
