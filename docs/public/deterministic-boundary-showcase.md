# Deterministic Boundary Showcase

> **LLMを決定論的にするな。LLMとの境界を決定論的にしろ。**

Status: `PUBLIC SHOWCASE / EVIDENCE-BOUND`

Local AI Foundryでは、意味の構築、文章表現、分析、Recommendationのように揺らぎが価値になる仕事をSemantic Planeへ残す。一方、Count、Hash、Threshold、Delta、Binding、Gate、StateのようにMachineが確定できるControl FactはDeterministic Control Planeへ固定する。

## Source authority

- [CFG-20260730-001](configuration-audits/CFG-20260730-001-planning-prompt-runtime-acceptance.md): Raw Output、Normalize、Contract GateのRuntime Failure。
- [DM-20260815-002](../../notes/development-model/DM-20260815-002-contract-closure-and-deterministic-control-boundary.md): `Working Model / Not Adopted Architecture`。
- [Current Architecture](architecture-public.md): `FC-CORE-003 Deterministic Technical Gate`と`FC-CORE-004 Evidence Traceability`のCurrent authority。

Historical Observation、Working Model、Current Confirmed Coreは異なる強度であり、相互に自動昇格しない。

## Three principles

1. **意味は自由。構造は厳格。** DTO、required field、type、nullability、fixed value、handoff structureはMachine-readable Contractで固定する。
2. **Machineが知っている事実を、AIにもう一度考えさせるな。** 計測済みのCount、Range、Delta、Stateは確定値としてLLMへ渡す。
3. **回復した違反を、観測から消すな。** Recovery後のPASSとRecovery前のRaw violationを別Trackで保持する。

## Boundary

```text
[ Semantic Plane — Human / LLM ]
  Meaning / Writing / Analysis / Recommendation / Rewrite
                    |
====================|====================
      Deterministic Boundary
                    v
[ Deterministic Control Plane — Code / Machine ]
  ID / Hash / Count / Threshold / Range / Delta / Binding / Gate / State
```

**曖昧である必要のないものを、LLMの曖昧さへ戻さない。**

## Case 01 — Recovery hid the violation

Planning AgentのRaw Outputが`<think>`を含み、whole-response JSON parseに失敗した。Normalizeは後続のJSON objectを抽出でき、Normalized objectだけを見るGateは通過したが、Runtime Acceptance全体はFAILだった。

```text
raw_contract_result        = FAIL
normalization_result       = PASS_AFTER_EXTRACTION
normalized_contract_result = PASS
workflow_gate_result       = OK
runtime_acceptance         = FAIL
```

Recoveryが処理を救っても、Upstream Contract violationまで消してはならない。

## Case 02 — Machine fact was re-delegated

Conclusion Retryでは、Machineが初回623文字、上限420文字、必要削減203文字を計測済みだった。しかし確定値がRetryへ十分にBindingされず、Modelは前回出力を約370文字と誤認し、最終出力は698文字へ増加した。

```text
Count / Compare / Delta / Direction -> Machine
Meaning-preserving Rewrite / Compression / Expansion -> LLM
```

これはPromptを強くする問題ではない。確定済みControl Factを推測へ戻さないというSystem Boundaryの問題である。

## Current boundary

このShowcaseはCurrent Coreとの整合を説明するが、Working Model全体を採用済みArchitectureへ昇格しない。またRI#4 / RI#5のProduction Acceptance、Production Binding、AQC01-01 Human Runtime Authorityを変更しない。

Canonical implementation、Prompt全文、Internal DTO、Run ID、内部Path、Credential、非公開Raw EvidenceはPublic Boundary外である。

---

[Public Documentationへ戻る](README-public.md)
