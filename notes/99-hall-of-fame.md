# Hall of Fame

このファイルは、Local AI Foundry開発で生まれた言葉のうち、
将来も設計判断や思想として引用できるものだけを記録する。

一時的な思いつきや作業メモは登録しない。

## 名言

> AIの得意・不得意を理解したら、人間側の設計が変わってきた。

> AIは悪くなかった。悪かったのは設計だった。

> 意味は自由。構造は厳格。

> Documentationは説明書ではない。

> Normalizeは創作してはいけない。

> Runtimeを見ないレビューはレビューではない。

> GitHubが正本。思考はCommitで育つ。

> GitHubが正本。ChatGPTは思考を育てる。Commitは人間が責任を持つ。

> Workflow SuccessとArtifact Successは別物である。

> Retryは保険ではない。

> AIチームは表現であって、設計ではない。

> 役職ではなく工程で責任を切る。

> Localとは、所有ではなく主導権である。

> AIへ仕事を任せる責任を持つなら、止める権利も自分で持つ。

> 完全始動は完成ではない。

> 入口で止めれば、出口は壊れない。

> 生成できても、運べなければ成果物にはならない。

> Reviewは判定する。本文を書き直させない。

> 最新は、正本ではない。

> Evidenceを揃えることと、承認することは別である。

> AIは状態を提示できる。承認はできない。

> 公開されなかった判断も、資産である。

> 管理のための管理はしない。必要になったら育てる。

> 現在地と作業地点は同じではない。

> Active Workは進捗表ではない。Interrupt後に再開するためのBookmarkである。

> Human in the Loopではない。Human Responsibility Boundaryである。

> AIを使う。でも、人間を消さない。

> 自動化は目的ではない。人間が責任を持つ成果と判断を支援するための手段である。

> One Evidence Set = ONE Complete Semantic Review.

> Correction Artifact ≠ New Semantic Review Trigger.

> Hash Match ≠ Source Integrity PASS.

> 制御できることと、良い結果を測れることは別である。

> Information Architectureは整理術ではない。責務を定義するArchitectureである。

> Humanが決めた値を、AIにもう一度考えさせない。

> 機械が知っている事実を、LLMに推定させない。

> Contractは、書いた場所ではなく、実行地点まで届いて初めて効く。

> Humanは意味と責任を決める。AIは、その決定の内側を完遂する。

## 珍言

> 「git diffください」

（もう出しとるやろｗ）

---

## Memo

### 2026-07-24 GitHub運用方針

今回のGitHub連携検証で、Foundryの運用方針が一つ固まった。

* GitHub上の `notes/` を正本（Single Source of Truth）とする。
* ChatGPTはGitHub最新版を読み、修正版全文を提案する。
* 最終判断・Commitは人間が行う。
* 思考は対話で育て、履歴はCommitで残す。

この運用により、常にGitHub最新版を基準として設計・レビュー・ナレッジ整理を行う。

### 2026-08-01 Project State GovernanceとPRR

Project State Governanceの導入により、作業事実と正式なProject Stateを分離する方針が固まった。

* Commit、Import、Test PASSだけではProject Stateを遷移させない。
* Current Snapshotは作業ログではなく、現在地と次の判断を示すProject Dashboardとする。
* Candidate BaselineとActive Baselineを分離し、Activeは一つだけとする。
* AIはEvidenceを照合し、状態候補を提示できる。
* PublishやAcceptanceの最終承認はHuman Decisionに残す。
* 最新のDraft、Commit、Import結果であることと、正本として採用されていることは別である。

Publication Reflection Register（PRR）の導入により、公開物やGit履歴から消える判断を内部資産として残す方針が固まった。

* 不採用、保留、対象外となった文書と、その理由を記録する。
* 採用時にマスクまたは一般化した情報と、その理由を記録する。
* PRRは更新履歴やGit差分の複製にしない。
* 基本形式は「対象ドキュメント」「判定」「その理由」の表とする。
* 未来の自分が30秒で公開判断を思い出せることを目的とする。

この運用により、公開された成果物だけでなく、公開されなかった判断もProject Knowledgeとして保持する。

### 2026-08-04 Publication Governance責務分離

Publication Governanceの再整理により、Current Publication ReviewとPublication Decision Historyを別責務として扱う方針が固まった。

* Internal Publication Review Registryは、管理対象ごとの現在有効なPublication Review結果を保持する。
* Publication Reflection Register（PRR）は、公開物やGit履歴から確認できなくなる判断履歴だけを保持する。
* PRRはPrivate Artifactとし、Internal RepositoryおよびPublic Repositoryへ配置しない。
* 不採用、保留、Mask、Generalization、委譲その他の「公開後には見えなくなる理由」がある場合だけPRRへ残す。
* PRRを更新履歴、Git差分、Current Publication Reviewの複製にしない。

この整理により、「現在の公開判定」と「なぜその判定になったか」を同じ台帳へ混在させない。

### 2026-08-10 Human-Directed FoundryとReview / Evidence Governance

Local AI FoundryのPositioningと、人間・AI間の責任境界を再整理した。

* Article ProductionをProject全体定義として固定せず、Reference Implementation #1として維持する。
* Documentation ProductionをReference Implementation #2として扱い、異なる業務で共通Control Patternを比較する。
* 共通PatternはCore Candidateであり、Foundry Coreは比較EvidenceとHuman Decisionなしに確定しない。
* HumanはPurpose、Judgment、Responsibility、Approvalを保持する。
* Automationそのものを目的にせず、人間が責任を持つ成果と判断を支援するために使用する。

Publication Governanceでは、Human側のDecision HistoryとAI / CODEX向けExecution Contractを分離した。

* Current Publication ReviewとDecision Historyは別責務として保持する。
* Human-controlled Decision HistoryやPrivate Operational StateをPublication Executionの成立条件にしない。
* AI / CODEXへはHuman-approved Current Publication Decisionと、現在の実行に必要なnon-private Execution Contextだけを渡す。

Review運用では、品質を落とさずに収束させる境界を明文化した。

* One Evidence Setに対するComplete Semantic Reviewは一度だけ行う。
* Semantic Freeze後のCorrection Artifactを新しいSemantic Review Triggerにしない。
* CorrectionはCorrection Verificationで確認し、Final Commit BoundaryではBlocking Defectだけを停止条件とする。
* AIはFinding、Evidence、Risk、Recommended Dispositionを提示し、HumanがFinal DispositionとCommit Authorizationを決定する。

Review PackageのNear Missから、Evidence IntegrityはHashだけでは成立しないことも確認した。

* Actual DiffやCurrent Full TextはGit / FilesystemのDirect Sourceから取得する。
* Tool Response、Chat Response、Console表示等の表示・転送レイヤをEvidence Sourceとして転記しない。
* Source-derived ContentはPackage生成後にDirect Sourceとの一致を確認する。
* Hash一致はSource Integrityの代替ではない。
* truncation等の不完全性を確認したPackageはHuman ReviewやCommit Guardへ進めない。

この一連の整理により、Local AI Foundryは「AIへ何を作らせるか」だけでなく、
「何を人間が保持し、どこでAIを止め、何をEvidenceとして信頼し、どうReviewを終わらせるか」までを
FoundryのControl Pattern候補として扱う段階へ進んだ。

### 2026-08-15 Formal RV反省花火とExecution Boundary

RI #1 Formal Runtime Verificationでは、Contract、Human Decision、Repository Verificationが存在していても、
その意味がExecution Pointまで機械的にBindingされなければ、実行時に別の値や古い値が使われ得ることを確認した。

今回の一次記録・障害整理・運用整理・Development Model整理を通じて、次の原則候補が強くなった。

* HumanまたはCanonical Contractが一意に決めた値を、Execution側で再探索・再選択させない。
* Count、Range、Delta、Hash、ID、Binding等、Machineが正確に扱えるControl FactをLLMへ再推定させない。
* ContractはDefinitionだけで完了とせず、必要なConsumerへ伝播し、Execution Pointで拘束されることを確認する。
* Human Decision BoundaryとMechanical Continuationを分離し、既承認Scope内のTest、Verify、Currentization、Binding Synchronizationを不要なHuman Gateへ戻さない。
* Publish等でCurrent Identityが変わった場合は、Launcher、Current Source、Derived View等のDependent ConsumerをCurrentizeし、Semantic MatchとExecution Bindingを別々に検証する。

この整理から、`Fixed Decision Binding`、`Contract Propagation`、`Deterministic Control Boundary`、`Contract Closure`等のWorking Nameが生まれた。

ただし、これらは現時点ではWorking Model / Not Adopted Architectureである。
RI #2を含む横断EvidenceなしにFoundry Coreへ昇格させない。

また、この時点のFresh Formal RV-01 Current Candidate Runtimeは未実行であり、成功結果を先取りしない。

今回Hall of Fameへ追加するのは、Working Nameそのものではなく、名称が将来変わっても残る責任境界の短い原則だけとする。
