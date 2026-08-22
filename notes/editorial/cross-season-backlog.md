# NOTE記事インキュベータ — Cross-Season Backlog

Status: `ACTIVE BACKLOG`

このファイルは、Seasonへ未配置、複数Seasonへまたがる、
または昇格条件が未成立の記事候補を管理する。

Season Planへ移しても、元Evidenceや未成立条件を消さない。
「面白そう」を理由に正式記事へ先取り昇格しない。

---

## Backlog（昇格待ち）

### PRR――公開物から消える判断を資産化する

* 現状：
  * Internal Publication Review RegistryとPrivate PRRの責務分離を実施済み。
  * Human-controlled Decision HistoryをAI / CODEX側Publication Executionの成立条件から外した。
  * War Diary：`WD-20260810-002`
  * Bug Zoo：`BZ-20260810-017`
* 核となる問い：
  * Current Publication Reviewと、公開成果物から消えるDecision Historyをなぜ別責務へ分けるのか。
* 核となるテーマ：
  * Publication Governance
  * Internal Publication Review Registry
  * Publication Reflection Register（PRR）
  * Current State / Decision History
  * Public / Internal / Private Boundary
  * Human-approved Current Publication Decision
  * non-private Execution Context
* 記事の到達点候補：
  * PRRは公開物やGit履歴から確認できなくなる判断を保持するPrivate Artifactである。
  * Current Publication ReviewとDecision Historyを同じ台帳へ混ぜない。
  * Human側の履歴保存責務をAI / CODEXのExecution Dependencyへしない。
* 本編から外した理由：
  * 価値は高いがPublic Documentation固有のPublication Governance比重が大きく、Season 2本編をGovernance Artifactのカタログへ戻してしまう。
  * Human Decision Boundaryの一般論はSeason 2-06へ残し、PRR固有論は独立候補として保持する。

### Difyのバージョンアップで契約が壊れた日

* 核となる問い：
  * Platform側の制約変更は、既存Workflowへどのように影響するのか。
* 扱うテーマ：
  * Dify Version
  * Selector制約
  * Code Node
  * DTO field
  * `finish_reason`
  * Import Compatibility
  * Platform Drift
  * Compatibility Verification
* 記事の到達点候補：
  * Workflowが昨日動いたことは、今日も動く保証にならない。
  * Platform VersionとPlatform側の制約もConfigurationとして追跡する必要がある。
  * Platform変更時は、既存Workflowの契約と互換性を再確認する。
* 本編から外した理由：
  * 単独テーマとして強いが、Season 2本線であるState / Authority / Source / Execution Binding / Runtimeの因果線から外れる。
  * Runtime Observability、Regression、Compatibilityを扱うSeason 4側へ接続できる候補として保持する。

### Reviewは、どこで終わるのか

* 現状：
  * Review Convergence RuleをInternal Governanceへ導入済み。
  * One Evidence Setに対するComplete Semantic Review、Semantic Freeze、Correction Batch、Correction Verification、Final Commit Boundaryを実運用で適用済み。
  * War Diary：`WD-20260810-003`
  * Bug Zoo：`BZ-20260810-018`
* 核となる問い：
  * Review品質を落とさずに、なぜCorrectionのたびにSemantic Reviewを最初からやり直してはいけないのか。
* 核となるテーマ：
  * Complete Semantic Review
  * Finding Classification
  * Semantic Freeze
  * Correction Batch
  * Correction Verification
  * Blocking Defect
  * Human Final Disposition
  * Commit Authorization
* 記事の到達点候補：
  * Reviewの品質とReview回数は同じではない。
  * 同じEvidence Setに対してFinding探索を繰り返すと、品質向上ではなく終了条件の消失が起きる。
  * Correctionは承認済みFindingを直す工程であり、それ自体を新しいSemantic Review Triggerにしない。
* 統合候補：
  * Season 2-08 `「作った」「反映した」「Published」は全部別`
  * Season 3：Cross-RI Evidence / Foundry Core ExtractionにおけるReview Control Pattern
* 昇格条件：
  * 異なるReview Scopeでも同じConvergence Ruleが機能する事例を追加する。
  * 単なる作業短縮ではなく、品質維持と停止条件の両立として一般化できること。

### Hashが合ってもEvidenceは壊れる

* 現状：
  * Review Packageへ表示・転送レイヤ由来のtruncationが混入するNear Missを確認済み。
  * Direct Source Acquisition、Source Integrity、Truncation Marker Guard、Package Integrity Gateを導入済み。
  * Regression TestでArtificial truncationをINVALIDとして停止し、Source-authenticなmarkerは誤検出しないことを確認済み。
  * War Diary：`WD-20260810-004`
  * Bug Zoo：`BZ-20260810-019`
* 核となる問い：
  * SHA-256が一致しているのに、なぜEvidence Artifactが信用できない場合があるのか。
* 核となるテーマ：
  * Direct Source
  * Source Acquisition Path
  * Display / Transfer Layer
  * Truncation
  * Source-derived Content
  * Hash Integrity
  * Package Integrity
  * Historical Snapshot Boundary
* 記事の到達点候補：
  * Hashは「そのArtifactが変わっていない」ことを確認できても、「元Sourceが完全だった」ことまでは保証しない。
  * EvidenceのIntegrityには内容だけでなく取得経路とDirect Sourceとの一致が含まれる。
  * Tool ResponseやConsole表示は人間向け表示であり、完全なEvidence Sourceとして再利用できるとは限らない。
* 統合候補：
  * Season 2-07 `Canonical Sourceを失った日`
  * Season 2-08 `「作った」「反映した」「Published」は全部別`
* 昇格条件：
  * Canonical Source問題とEvidence Generation Pipeline問題の違いを整理する。
  * Hash、Source Integrity、Package Integrityの責務を混同せず説明できること。

### AIだからContractは後から育てられる

* 現状：
  * Project Evidence：Status Artifact Contractの正式フォーマット追加
  * Configuration Audit：CFG-20260802-001
  * Status Artifactの章構成・表示順リファクタリング実施
  * Active Work Current Snapshotを後付けで導入し、ADR-0012、CFG-D005、CM-20260802-002へ発展
  * Project State、Baseline、Runtime状態、Workflowを変えずにDocumentation Contractを進化させた事例が複数存在する
  * Formal RVの実運用からFixed Decision Binding、Contract Propagation、Deterministic Control Boundary等のWorking Hypothesisが追加された
* 核となるテーマ：
  * 人間中心のProjectでは、変更・レビュー・整合性確認のコストが高いため、将来必要になりそうな管理体系まで事前に整備することが多い。
  * AI主体のProjectでは、Documentation更新、契約化、差分確認、監査を必要になった時点で高速に実施できる。
  * 「何も管理しない」と「最初からすべてを厳密に管理する」の二択ではなく、運用で実際に揺れた部分だけをContract化する段階的なGovernanceが成立する。
  * `status.md`のように表示構造の安定が人間とAIの双方に必要なArtifactは、早い段階でContract化する価値がある。
  * 管理は必要だが、管理のための管理は増やさない。
* 関連する記事候補：
  * Season 2-04 Current Snapshotは進捗表ではない
  * Season 2-12 止めることも、運用である
  * Season 3：Evidenceを基にContract / Governanceを後から育てる
* 昇格条件：
  * Status Artifact、Active Work以外にも、運用上の必要から後付けでContract化した事例を整理すること。
  * 人間中心のProjectとの違いを、単なるAIの処理速度ではなく、管理コストと変更容易性の違いとして一般化できること。
  * 「運用で回す対象」と「Contractとして固定する対象」の判断基準を整理できること。
  * 独立記事にするか、Season 2-12またはSeason 3へ吸収するかを再評価すること。

### AIへの指示は意図ではなく工程で書く

* 現状：
  * War Diary：WD-20260725-001
  * Bug Zoo：BZ-20260725-015
* 核となるテーマ：
  * AIは人間の意図を読むのではなく、Promptから実行可能な工程を構築する。
  * 「待つ」「進める」「通常フロー」のような曖昧な表現は、人間には自然でもAIには複数の工程として解釈される。
  * 実施する処理、更新する状態、停止地点、成果物、禁止事項まで固定して初めて工程が一意になる。
* 昇格条件：
  * Prompt設計の一般則として整理できること。
  * 同種事例が複数集まり、設計原則として説明できること。

### Aggregatorが全部を壊した日（笑）

* 現状：
  * War Diary：未記録
  * Bug Zoo：未登録
  * Hall of Fame：未登録
  * Operational Review：未作成
  * ADR：未作成
* 核となるテーマ：
  * Aggregatorが責務を超えて情報を再構成・再生成したことで、Workflow全体の整合性が崩壊した。
  * 問題は実装ではなく、責務境界を曖昧にした設計にあった。
  * Aggregatorは「統合」だけを行い、「意味を作らない」という設計原則へ至る契機となった。
* 昇格条件：
  * War Diaryへの事実記録。
  * Bug Zooへの一般化。
  * Operational ReviewによるRoot Cause分析。
  * ADRとして設計判断が確立した時点で、正式シリーズへの昇格を再検討する。

### このプロジェクトはアジャイルなのか？

* 現状：
  * 思考メモへWaterfall、Agile、Scrum、XP、Kanban、Spiral、Prototypeとの比較仮説を記録済み。
  * Documentation IA、Active Work、Project State Governance、Configuration Managementが、実運用のEvidenceを基に段階的に追加された。
  * 独自の開発モデル名は定義していない。
* 核となる問い：
  * Local AI Foundryの進め方は、既存のどの開発モデルに近いのか。
  * 「独自手法」と呼ぶ前に、既存モデルでどこまで説明できるのか。
* 扱うテーマ：
  * Waterfallとの違い
  * Agileとの共通点
  * Scrumではない可能性
  * XP、Kanbanとの比較観点
  * SpiralのRisk Drivenとの比較
  * Prototypeとの共通点と相違点
  * ソフトウェア実装だけでなくDocumentation、Governance、Configurationまで反復的に育てる進め方
  * Evidenceを基に必要な責務だけを追加する段階的Governance
* 記事の到達点：
  * 現時点ではアジャイル的、反復的、漸進的な性質が強い。
  * ただしScrum、XP、Kanbanのいずれかと同一視できるEvidenceはない。
  * SpiralやPrototypeとも共通点はあるが、目的と継続方法が異なる可能性がある。
  * 既存モデルで説明できない部分が繰り返し観測されるまでは、独自モデルと断定しない。
* 昇格条件：
  * 各開発モデルの定義と比較観点を一次資料または信頼できる資料で確認すること。
  * Project Evidenceを具体例として整理すること。
  * 共通点、相違点、比較不能な点を表形式で整理すること。
  * 「AIだから新しい」という結論を先に置かないこと。

### Documentation IAは最初には作れなかった

* 現状：
  * Documentation Information Architecture採用済み。
  * ADR-0011採用済み。
  * 責務別Directory再編のCommit 1〜6を完了し、Local Commit Verifyまで完了。
  * Active Work導入時に、Human Decision、ADR-0012、IA更新を経てRoot責務を拡張した。
  * Documentation IAは固定完成物ではなく、実運用で新しい責務が観測された場合に更新できる設計として実証された。
* 核となる問い：
  * Documentationを最初から設計対象にすべきであっても、なぜ完成したInformation Architectureを初期段階で固定できなかったのか。
  * Directory責務は、いつ、何を根拠に追加・変更すべきなのか。
* 扱うテーマ：
  * Documentationを最初から設計対象にすること
  * Information Architectureを最初から完成させることの違い
  * 実運用で観測された責務
  * Human Decision
  * ADR
  * IA更新
  * READMEのNavigation責務
  * Historical Evidence保護
  * Compatibility shimを残さない判断
  * 責務単位の段階的Commit
* 記事の到達点：
  * Documentationは最初から設計対象に含めるべきである。
  * ただし、実在しない責務やDirectoryまで先回りして固定する必要はない。
  * 十分な文書と実運用Evidenceが生まれた後で、観測された責務をInformation Architectureとして整理できる場合がある。
  * Directory構造は永久固定ではなく、新しい責務が発見された時にHuman Decision、ADR、IA更新を経て進化させる。
  * 「必要になったら育てる」は無計画ではなく、Evidenceを基に必要な責務だけを追加することを意味する。
* 昇格条件：
  * Directory再編前後の責務とNavigationの違いを比較する。
  * Public Documentationへ公開可能なIA文書と事例を選別する。
  * Season 2本編、独立記事、公式HPの思想コンテンツのどこへ配置するか再評価する。

---

## 統合済み候補

### Current Snapshotは一つではなかった

* 統合先：
  * Season 2-04 `Current Snapshotは進捗表ではない`
* 関連記録：
  * War Diary：`WD-20260802-001`
  * Configuration Management Note：`CM-20260802-002`
  * ADR：`ADR-0012`
  * Configuration Item：`CFG-D005`
  * Configuration Audit：`CFG-20260802-007`
* 統合理由：
  * 独立記事として扱うより、04の中心命題である
    `Project State Current Snapshot ≠ Active Work Current Snapshot`
    を実例として構成した方が、前後記事との責務分離が明確になる。
  * 04へ統合しても一次記録、運用知識、設計判断、Configuration Evidenceは各正本に残るため、知識は失われない。
