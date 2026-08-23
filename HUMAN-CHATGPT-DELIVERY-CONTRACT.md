# Human + ChatGPT Full-file Delivery Contract

Status: `CURRENT / MACHINE-VERIFIABLE`

## Purpose

Local AI FoundryでHuman + ChatGPTがRepositoryへ反映する成果物をHumanへ渡すとき、Commit前にPatch適用、Installer実行、手作業Merge、生成Script実行等を要求しない。

**Commit-readyとは、Repositoryへ保存するファイル内容がすでに最終形であることを意味する。**

Commit / Pushは成果物を変換する工程ではない。

## Default Human Delivery Transport

Human + ChatGPTからHumanへ渡すRepository反映Packageは、原則として**GitHub Web `Upload files`でそのまま投入できるWeb Drop-in Package**とする。

Humanの通常操作は次だけとする。

```text
ZIPを展開
↓
GitHub WebのUpload filesへPackage内容を投入
↓
全対象Fileが一覧に表示されることを確認
↓
Commit
```

ローカルGit、Installer、Patch適用等を通常前提にしない。

## Mandatory Delivery Rule

Human + ChatGPTからRepository反映物を渡す場合、次を必須とする。

1. 既存ファイルを変更する場合は、Current Canonical Sourceの全文を取得する。
2. 指定された変更だけをCurrent Sourceへ反映する。
3. Humanへ渡すファイルは、変更後の**完全な全文ファイル**とする。
4. 新規ファイルは、保存先Pathに置けばそのまま成立する完成ファイルとする。
5. ZIP内PathはRepository Rootからの相対Pathと一致させる。
6. ZIPにWrapper Directoryを作らない。
7. ZIPにはCommit対象ファイルだけを入れる。
8. GitHub Web Uploadを標準TransportとするPackageには、dot / hidden pathを含めない。
9. GitHub Web Upload画面で対象Fileがhidden扱いされる構成をCommit-ready Packageとして渡さない。
10. Humanへ別途Application Stepを要求しない。
11. Domain-specific Machine Gateが定義されているArtifactは、**完成版そのものに対してGateを実行し、Human-facing DeliveryへGate Receiptを提示する。**
12. Gate ReceiptがArtifactのHash / Digestを出力する場合、ReceiptとHumanへ渡す完成版のDigestが一致しなければCommit-readyとして扱わない。

## Web Drop-in Compatibility Gate

GitHub Web Upload用Packageでは、すべてのPath segmentについて次を禁止する。

```text
.github/
.foo/
path/.hidden/
```

つまり、`.`で始まるFile / Directoryを含むPackageはWeb Drop-in `FAIL`とする。

Repository上でdot-directoryが正規に利用可能であっても、Humanの標準反映経路であるGitHub Web Uploadがhidden扱いしてPackage内容を欠落させる場合、その構成はHuman + ChatGPT Delivery Contractに適合しない。

dot-directoryを必須とする機能を導入する必要がある場合は、Web Drop-inとは別のHuman-approved Delivery Modeとして明示的に設計する。通常Packageへ黙って混在させない。

## Prohibited Delivery Forms

Humanが明示的に要求した場合を除き、次の形式でRepository反映物を渡してはならない。

- Patch / Diffだけを渡す
- Installerを実行して既存ファイルを書き換える
- PowerShell / Python / Shell Scriptで変更を適用させる
- `sed`等の置換CommandをHumanへ実行させる
- Humanへ手作業Mergeを要求する
- 「この行を追加」「ここを書き換え」と指示だけを渡す
- `payload/`等のWrapper Directoryを経由してから再配置させる
- Commit前に別の生成工程を要求する
- GitHub Web UploadでhiddenになるPathを通常Packageに入れる
- Required Machine Gateを実行せず、またはGate ReceiptなしでMachine-gated Artifactを完成版として渡す

Validation ScriptやLint ScriptをRepository自体の機能として追加することはできる。
ただし、それらは**成果物を作り変えるApplication Stepではなく、完成済み成果物を検証するGate**として扱う。

## Current Source Gate

既存ファイルの完全版を安全に生成できるだけのCurrent Sourceを取得できない場合、Patchで代用しない。

```text
Current Source available
→ Full Fileを生成
→ Deliver

Current Source unavailable
→ STOP
→ Current Sourceを要求
```

Historical Snapshot、Memory、会話履歴からCurrent File全文を推測して作らない。

## Pre-delivery Verification

Humanへ渡す前にHuman + ChatGPT側で次を完了する。

- Current Source確認
- Scope Preservation確認
- 対象Fileが完成済み全文であることの確認
- 必要なDomain-specific Lint / Test
- Domain-specific Gate Receipt確認
- GateがDigestを出力する場合は完成版とのDigest一致確認
- Gate後に対象Artifactが変更されていないことの確認
- Delivery PackageのPath検査
- Wrapper / Extra File不存在確認
- dot / hidden path不存在確認
- GitHub Web Upload互換性確認

ZIP Deliveryでは次のMachine Gateを使用する。

```text
python scripts/delivery_package_lint.py <package.zip> \
  --expected <repo-relative-path> \
  --expected <repo-relative-path> ...
```

`DELIVERY PASS`しないPackageをHumanへCommit-readyとして渡さない。

## Human Operation Boundary

Humanへ要求してよいRepository反映操作は原則、

```text
Upload
Overwrite / Save
Commit
Push
```

までとする。

Humanが成果物を成立させるためにInstallerやMutation Scriptを実行しなければならない状態、またはUpload画面で対象Fileが欠落する状態は、**Delivery未完了**である。

## Definition of Done

Human + ChatGPT側のRepository Deliveryは、次をすべて満たした時点で成立する。

```text
Current Source based
+
Requested Scope only
+
Complete Final Files
+
Required Domain Gate PASS
+
Gate Receipt bound to Final Artifact
+
Repo-relative Web Drop-in Layout
+
No Hidden Path
+
Required Gate PASS
=
DELIVERY READY
```
