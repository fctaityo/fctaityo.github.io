# BZ-20260814-021 ContractがExecution Pointまで届かない

## 分類

Contract / Configuration / Execution Binding

## 関連記録

- [WD-20260814-001 Formal RVがContract Propagationの穴を連続で露呈した](../war-diary/WD-20260814-001-formal-rv-exposed-contract-propagation-gaps.md)

## 症状

Contract、Configuration、Human-approved Targetが正本上では正しく定義されているのに、実際のExecution Pointへ同じ値が届いていない。

Repository上の定義、Draft、Published、Launcher、Runtime Request等のどこかで古い値、別の値、未解決値が残る。

RI #1では複数の形で発生した。

- Formal Test Caseは存在したが、Formal LauncherでExact Inputが強制Bindingされていなかった。
- Deterministic Retry CorrectionはRepositoryへ実装されたが、Live Draft / Publishedへはまだ反映されていなかった。
- Human-approved CandidateをPublishした後、Canonical Launcherだけが旧Published Workflowを向いたままだった。

## Root Cause

Contract Definition（契約定義）とContract Propagation（契約伝播）を同じものとして扱った。

「正本に書いてある」「RepositoryでTestが通る」「Publishedが更新された」といった局所的PASSだけで、依存するConsumerすべてがCurrentになったとみなした。

依存関係ごとの同期先とExecution Point VerificationがContract化されていなかったため、上流の正しい決定と下流の実効値が乖離した。

## 教訓

Contractは、定義された場所だけを確認しても不十分である。

少なくとも次を分離して確認する。

```text
Contract Definition
        ↓
Propagation
        ↓
Consumer Binding
        ↓
Execution Point
        ↓
Runtime Observation
```

値を変更した場合は、その値へ依存するArtifact、Launcher、Runtime Bindingを列挙し、一意にCurrentizeされることを確認する。

Publish等でIdentityが新しく生成される場合も、Humanが承認した意味が変わらない限り、依存BindingのCurrentizationを取りこぼさない。

## 再発防止パターン候補

- Canonical ContractのMachine-readable化
- Consumer一覧の明示
- Repository / Draft / Published / Launcher等のSemanticまたはIdentity Match
- Execution直前のBinding Verification
- Runtime RequestまたはRuntime EvidenceでのEffective Value確認

「Contractが存在する」ことと「Contractが効いている」ことを分離して検証する。
