# WD-20260801-001 Project Stateを整え、公開判断まで資産化した

## 日付

2026-08-01

## 出来事

Project State Governanceの設計と導入を完了し、その内容をPublic Documentation、Documentation Map、公式HPへ順番に反映した。

今回の内部側作業では、次の要素を整理した。

- Project State
- Current Snapshot
- Active Baseline
- Human Publish Decision
- State Transition
- Initial State Bootstrap

Project Stateは、Commit、Import、Test PASSなどの作業事実だけでは遷移させない。

Entry Condition、Evidence、必要なHuman Authorizationが揃った時点で正式に遷移させる。

Current Snapshotは作業ログではなく、現在のProject State、Active Baseline、Current Blocker、Remaining Gate、Next Actionを短時間で確認するProject Dashboardとして再定義した。

Candidate Baseline、Active Baseline、Historical Baselineを分離し、Active Baselineは常に一つとした。

AIはEvidenceを確認し、状態候補を提示できる。

ただし、PublishやAcceptanceの最終承認はHuman Decisionに残した。

内部Governance導入後、Public化作業を次の順番で進めた。

1. Public Documentation
2. Documentation Map
3. 公式HP
4. NOTE構想

Public Documentationでは、Project State GovernanceのPublic Configuration Auditを作成した。

内部識別情報、Commit SHA、App ID、Workflow ID、ローカルpath、hash、非公開Evidenceは削除または一般化した。

Documentation Mapでは、公開READMEを更新し、Project Status、Project State Governance、Configuration Audit、ADR、Architecture、Operational Reviewへ目的別に辿れる構成へ変更した。

公式HPでは、Public DocumentationをGitHubとは別の公開入口として追加した。

同時に、Website Operations Policyに従って次を更新した。

- `index.html`
- `releases/index.html`
- `releases/2026-08-01-v2.11.html`

公式HPはv2.11として公開した。

この一連のPublic化判断を残すため、Publication Reflection Register（PRR）を新設した。

PRRはGit履歴ではない。

公開物やGit履歴から確認できなくなる次の情報だけを残す。

- 不採用または保留となった文書と、その理由
- 採用時にマスクまたは一般化した情報と、その理由

PRRの基本形式は、次の3列だけとした。

| 対象ドキュメント | 判定 | その理由 |
|---|---|---|

複雑なReview構造や更新履歴は持たせず、未来の自分が30秒で公開判断を思い出せる内部メモとして整理した。

## 何が問題だったか

今回の作業中、ChatGPT側で現在地と作業対象の認識が何度かずれた。

Public Documentationの作成とCommitはすでに完了していたにもかかわらず、次の作業としてPublic版作成を再提案した。

GitHubを確認すれば完了済みであることを判断できたが、会話上の記憶だけで現在地を推測した。

PRR設計でも、最初はReflection Review、Redaction Decisions、Withheld Decisionsなどの複雑な構造を作ろうとした。

しかし、必要だったのは次の2点だけだった。

- 不採用になった文書と、その理由
- 公開時に何をマスクし、なぜマスクしたか

目的に対して構造を増やしすぎたことで、単純な内部メモを不要に複雑化した。

公式HP更新では、最初にPythonスクリプトを配布し、既存`index.html`へ文字列置換を適用する方式を採用した。

しかし、生成したスクリプトに構文不備があり、実行時に次のエラーが発生した。

```text
SyntaxError: unterminated string literal
```

さらに、配布ZIPへ説明用`README.md`を含めたことで、Repository Rootに存在する正本`README.md`と混同する危険を生んだ。

また、GitHubコネクタではRead操作が可能だったにもかかわらず、Commit確認を依頼された際に「現在はRepositoryを取得できない」と誤って案内した。

実際には、Write操作は403で失敗していたが、Read操作は継続して利用可能だった。

ReadとWriteの状態を分けずに説明したことで、確認可能な作業まで不可能であるように伝えてしまった。

## Root Cause

第一の原因は、現在地を正本から確認せず、会話上の流れだけで推測したことだった。

Public化作業のように複数Stepがある場合、直前の説明ではなく、GitHub上のCommitと対象ファイルを確認して現在地を判断する必要がある。

第二の原因は、目的よりも形式を先に設計したことだった。

PRRでは、Review文書らしい構成を作ろうとした結果、本来の目的である「公開物から消える判断を残す」ことから離れた。

必要な情報量を確認せず、一般的なReview構造を持ち込んだことが複雑化の原因だった。

第三の原因は、更新方法を必要以上に自動化したことだった。

今回の公式HP更新対象は3ファイルだけだった。

それにもかかわらず、部分置換用スクリプトを生成したことで、構文不備、配置手順、実行方法、削除対象など、新しい失敗点を増やした。

第四の原因は、GitHub連携のRead権限とWrite権限を区別しなかったことだった。

ChatGPT側のPlugin権限はFull Accessだったが、GitHub App側ではContents Writeが許可されていなかった。

その結果、Readは可能、Writeは403という状態だった。

この違いを確認せず、連携全体が利用できないように説明した。

## 修正

PRRはゼロから作り直した。

複雑な構造を削除し、次の表を本体とした。

| 対象ドキュメント | 判定 | その理由 |
|---|---|---|

マスクがある場合は、判定を`採用（マスクあり）`とし、その理由欄へ何を、なぜマスクしたかを書く。

初回PRRとして、Project State Governance公開レビューを記録した。

続いて、Public README Navigation更新、公式HP v2.11更新を個別PRRとして追加した。

PRR個別ファイルは`entries/`配下へ配置し、ルートには`index.md`と`PRR-template.md`だけを残す構成へ整理した。

公式HP更新は、スクリプト方式を中止した。

GitHubから取得した最新`index.html`全文を正本として使用し、完成版のHTMLファイルを直接作成した。

最終的な反映対象は次の3ファイルだけとした。

- `index.html`
- `releases/index.html`
- `releases/2026-08-01-v2.11.html`

配布用READMEや一時スクリプトはRepositoryへ反映しないことを明確にした。

Commit後はGitHub Readで3ファイルを再取得し、次を確認した。

- トップページの最新リリースがv2.11を向いている
- Public Documentationへの直接導線が追加されている
- Releases一覧の先頭にv2.11が追加されている
- v2.11個別Releaseページが存在する

GitHub連携については、次の状態として整理した。

- Repository Read: 利用可能
- Commit履歴確認: 利用可能
- ファイル取得: 利用可能
- Contents Write: 403
- Commit作成: 利用不可

今後は、編集対象ファイルをGitHubから取得し、完成版を人間がCommitする。

Commit後の確認はGitHub Readで実施する。

## 今後の運用

Project Stateに関する作業では、会話履歴や直前の説明ではなく、Current SnapshotとGitHub正本を確認して現在地を判断する。

作業Stepを説明する場合は、各Stepを次の状態で明示する。

- 未着手
- 進行中
- 完了
- 次に実施

完了済みStepを再提案しない。

公開判断を伴う作業では、作業完了後にPRRを作成する。

PRRには、今回レビューした対象を省略せず記載する。

ただし、Git差分や更新履歴は複製しない。

記録するのは、公開物から見えなくなる判断だけとする。

ファイル更新では、自動化によって失敗点が増える場合は、完成版ファイルの直接置換を優先する。

特に単発で対象ファイルが少ない場合は、更新スクリプトを作らない。

Repository Rootに既存する一般名のファイルと混同する可能性があるため、配布物へ不要な`README.md`を含めない。

GitHub連携の状態を説明する場合は、ReadとWriteを分けて確認する。

Writeが失敗しても、Readまで不可能と判断しない。

Commit確認を依頼された場合は、GitHubから最新Commitまたは対象ファイルを実際に取得してから回答する。

## 学び

最新のファイルが、正本とは限らない。

最新のDraft、Commit、Import結果が存在しても、Active Baselineとして採用されていなければ現在の基準ではない。

Evidenceを揃えることと、承認することは別である。

AIはEvidenceを確認し、状態候補を提示できる。

しかし、自分でPublishやAcceptanceを承認してはならない。

公開された成果物だけがProject Knowledgeではない。

不採用になった文書、保留した理由、マスクした情報とその理由も、後から必要になる判断資産である。

公開されなかった判断も、資産である。

運用文書は複雑であるほど良いわけではない。

目的が単純なら、形式も単純でよい。

今回のPRRでは、「対象ドキュメント」「判定」「その理由」の表だけで目的を満たした。

自動化は、失敗点を減らす場合にだけ使う。

少数ファイルの更新にスクリプトを追加すると、構文、配置、実行環境、削除判断という新しい失敗点が増える。

完成版ファイルを直接渡す方が安全な場合もある。

GitHub連携は、使えるか使えないかの二択ではない。

Read可能、Write不可という状態がある。

機能ごとに実際の結果を確認し、できることまで不可能と説明しない。

Project State Governanceによって、Workflowの状態だけでなく、Project全体の現在地を管理できるようになった。

PRRによって、公開されたものだけでなく、公開されなかった判断も残せるようになった。

壊れないWorkflowを運用し続けるには、Workflowだけでなく、状態、正本、承認、公開判断まで管理する必要がある。
