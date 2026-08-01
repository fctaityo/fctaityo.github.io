# Bug Zoo

このファイルは、Local AI Foundry開発で確認された障害パターンを案内するインデックスである。

詳細な記録は `notes/bug-zoo/` 配下へ、1件1ファイルで保存する。

War Diaryが出来事を時系列で記録するのに対し、Bug Zooは再発可能な障害パターン、Root Cause、再発防止の教訓を整理する。

## 運用ルール

- 1つの障害パターンを1ファイルとして記録する。
- ファイル名は `BZ-YYYYMMDD-NNN-short-title.md` とする。
- このファイルには、BZ ID・題名・概要・分類・リンクだけを置く。
- 発生日を特定できない既存項目は、分割移行日を採番日に使用してよい。
- 同じ出来事の一次記録がWar Diaryにある場合は、BZ本文から相互参照する。
- 設計判断として確定した内容はADRを正本とし、Bug Zooでは障害パターンとして要約する。
- 既存BZが別のBZへ包含された場合、元のIDは削除・再利用せず、統合済み記録として保持する。
- 詳細本文はこのインデックスへ再掲しない。

## Prompt / Agent Instruction

- [BZ-20260725-015 曖昧なPromptが工程を増やした事件](bug-zoo/BZ-20260725-015-ambiguous-prompt-added-review-round.md)  
  工程、停止地点、禁止事項を明示しなかったため、不要なReview RoundとReview Packageが生成された。

- [BZ-20260725-007 AI劇団四季事件](bug-zoo/BZ-20260725-007-ai-theater-company.md)  
  Agent間連携をDTOとContractではなく、人間同士の会話として設計しかけた。

## Contract / DTO

- [BZ-20260725-001 Normalize事件](bug-zoo/BZ-20260725-001-normalize-crossed-boundary.md)  
  Normalizeが型変換を超えて意味を書き換えかけた。

- [BZ-20260725-002 JSON破損事件](bug-zoo/BZ-20260725-002-json-corruption.md)  
  LLM出力を構造化データとして無条件に信用した。

- [BZ-20260725-011 Stage境界消失事件](bug-zoo/BZ-20260725-011-stage-boundary-lost.md)  
  Raw出力を工程間で共有し、別Stageの情報が後段へ混入した。

- [BZ-20260725-012 必須DTO欠落伝播事件](bug-zoo/BZ-20260725-012-required-dto-field-propagation.md)  
  上流DTOの単一欠落が、下流で複数の品質異常へ姿を変えた。

## Review / Evidence / Artifact

- [BZ-20260725-004 Workflow Success偽装事件](bug-zoo/BZ-20260725-004-workflow-success-masked-artifact-failure.md)  
  Workflow SuccessをArtifact Successと同一視し、破損した成果物を正常終了の裏側へ隠した。

- [BZ-20260725-006 Review Agent本文上書き事件](bug-zoo/BZ-20260725-006-review-agent-overwrite.md)  
  Review担当が判定だけでなく本文の所有権まで持ちかけた。

- [BZ-20260725-009 fixture成功＝実LLM成功事件](bug-zoo/BZ-20260725-009-fixture-is-not-real-llm.md)  
  決定的なfixture成功を、非決定的な実LLM成功と同一視した。

## Retry / Runtime / Transport

- [BZ-20260725-005 Retry無限保険化事件](bug-zoo/BZ-20260725-005-retry-as-insurance.md)  
  Retryを有限の復旧手段ではなく、最終的な成功を保証する保険として扱いかけた。

- [BZ-20260725-013 巨大JSON・E2BIG事件](bug-zoo/BZ-20260725-013-large-json-e2big.md)  
  長文成果物をコマンドライン引数で運び、OSの引数サイズ制限に到達した。

- [BZ-20260725-014 Context Window 4096天井事件](bug-zoo/BZ-20260725-014-context-window-4096.md)  
  Promptやモデルではなく、DifyのLLM Node側Runtime設定が生成上限を決めていた。

## Source / Change Management

- [BZ-20260731-016 Partial SourceをCanonical Sourceとして扱う](bug-zoo/BZ-20260731-016-partial-source-as-canonical-source.md)  
  正本やEvidenceの一部だけを取得した状態で判定・補完・再生成し、誤判定や変更対象外の消失を招く。

## Project Framing

- [BZ-20260725-008 Local万能論事件](bug-zoo/BZ-20260725-008-local-is-not-enough.md)  
  Localの価値を配置場所や所有形態だけで説明しかけた。

- [BZ-20260725-010 完全始動＝完成事件](bug-zoo/BZ-20260725-010-launch-is-not-completion.md)  
  改善サイクルが始まった状態と、完成状態を混同しかけた。

## 統合済み

- [BZ-20260725-003 git diffください事件（笑）](bug-zoo/BZ-20260725-003-review-without-evidence.md)  
  **BZ-20260731-016へ統合済み。** レビュー対象の実体やEvidenceを十分に取得せず、説明や要約だけで判定する障害パターンとして包含された。
