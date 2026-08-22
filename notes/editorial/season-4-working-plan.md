# Local AI Foundry 開発ログ — Season 4 Working Plan

Status: `LONG-RANGE WORKING DIRECTION / NOT FIXED`

## Season 4構想：Continuous Assurance

Season 4は現時点で確定シリーズではない。
Project Evidenceが増えるたびに再評価し、独自理論や将来結果を先に作らない。

## 中心となる問い

* 設計、Publish、Runtime Verificationを通過したAI Systemが、目的を満たし続けていることをどう継続的に証明するのか。

## Working Theme

* Evaluation Framework
* Evaluation Case / Dataset / Trial / Grader
* Regression Evaluation
* Outcome Verification
* Risk-based Authorization
* Runtime Observability
* Recovery / Rollback
* Execution Provenance
* Security / Privacy
* Continuous Risk Monitoring
* User / Outcome Feedback
* Continuous Assurance

## 到達候補

* Contractどおりであることと、成果として良いことを分離して測定する。
* Runtime Verificationを一回のGateで終わらせず、ObservabilityとFeedbackへ接続する。
* 壊さない能力だけでなく、壊れた場合に既知の良好状態へ戻せる能力を持つ。
* AIの自律範囲をRiskに比例させ、Human Authorizationを必要な場所へ集中させる。

## 昇格条件

* RI #2〜RI #4を含む複数RIでRuntime / Outcome Evidenceが蓄積される。
* 複数RunのTraceとOutcomeを比較できる。
* EvaluationまたはRegressionの実験Evidenceが存在する。
* Recovery、Security、Provenanceの少なくとも一部について実Project Evidenceが存在する。
