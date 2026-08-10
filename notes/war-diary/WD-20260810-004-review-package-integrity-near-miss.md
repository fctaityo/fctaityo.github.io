# WD-20260810-004 Review Packageへtruncationが混入したNear Miss

## 日付

2026-08-10

## 出来事

Final Commit直前のPre-Commit Guardで、Review Package内に表示・転送レイヤ由来のtruncation markerが実テキストとして混入していることを検出した。

問題のSectionはCurrent Commit CandidateそのものではなくHistorical Diffだったが、Review Packageは「差分全文を保持している」前提で使われるArtifactである。

そのため、Commit前に停止した。

調査すると、過去のReview Package生成時に、Direct Git / Filesystem Sourceではなく、表示されたTool Responseまたは転送済み出力を再利用した経路が存在していた。

表示側で省略された内容が、そのまま後続Packageへ固定されていた。

さらに、その壊れたPackage自身のSHA-256は正常に一致していた。

Hashは壊れたArtifactが「その後変わっていない」ことを証明していたが、「元Sourceが完全だった」ことは証明していなかった。

## Near Miss後の対応

Review Package Integrity Gateを導入した。

Actual DiffはApproved Scopeを指定したGit commandからFilesystem上のraw fileへ直接出力し、そのraw fileをPackage生成元とする。

Current Full TextはFilesystem上のCurrent Sourceから直接取得する。

Tool Response、Chat Response、Console表示、検索Snippet等の表示・転送レイヤをSourceとして転記しない。

Package生成前にDirect SourceのSHA-256を取得し、生成後はPackage内のSource-derived ContentとDirect Sourceの一致を機械検証する。

truncation markerは存在するだけで即FAILにはしない。

規則本文やRegression FixtureのようにDirect Source自身が同じliteralを持つ場合があるため、Source-authenticとUnverifiedへ分類する。

Direct Sourceに存在しないmarker、Sourceを特定できないmarker、Section IntegrityをPASSしないmarkerだけをUnverified Truncation MarkerとしてPackage INVALIDにする。

## Regression Testで見つかった二つ目の罠

最初のCandidateでは、Package本文全体からmarkerを1件でも見つけたらINVALIDにする設計だった。

しかしReview Package運用規則自身が、検出対象markerのliteralを定義として保持している。

そのため正常Packageも必ず自己検出してINVALIDになることがRegression Testで判明した。

そこでmarkerの存在ではなく、そのmarkerがDirect Source由来かを判定する方式へ修正した。

## 学び

Evidence Integrityには内容だけでなくSource Acquisition Pathが含まれる。

表示用出力は、人間が読むには十分でもEvidence Sourceとして完全とは限らない。

Hash MatchはSource Integrity PASSの代替ではない。

そしてIntegrity Gate自身も、正常系と異常系の両方をRegression Testしなければ新しいFalse Positiveを作り得る。

## 関連

- [BZ-20260810-019 表示レイヤのtruncationがEvidenceへ混入する](../bug-zoo/BZ-20260810-019-display-truncation-corrupts-evidence.md)
