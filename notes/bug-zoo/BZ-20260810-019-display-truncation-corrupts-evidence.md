# BZ-20260810-019 表示レイヤのtruncationがEvidenceへ混入する

## 分類

Review / Evidence / Artifact

## 関連記録

- [WD-20260810-004 Review Packageへtruncationが混入したNear Miss](../war-diary/WD-20260810-004-review-package-integrity-near-miss.md)
- [BZ-20260731-016 Partial SourceをCanonical Sourceとして扱う](BZ-20260731-016-partial-source-as-canonical-source.md)

## 症状

Git diffやCurrent Full TextをReview Packageへ収録したつもりでも、実際にはTool Response、Console表示、Chat転送等で途中省略された表示結果をSourceとして使っている。

Packageにはtruncation markerや欠落したSectionが固定されるが、生成後のSHA-256はその壊れたPackageに対して正常に一致する。

Hash確認だけではEvidenceの欠落を発見できない。

## Root Cause

Source Acquisition PathをIntegrityの対象に含めていなかった。

Direct Repository / Filesystem Sourceと、人間向けDisplay / Transfer Layerを同じものとして扱った。

Hashを「Artifactが変わっていないこと」の確認ではなく、「元Sourceが完全だったこと」の証明として過大評価した。

## 教訓

Actual DiffはGitからFilesystem上のraw fileへ直接取得する。

Current Full TextはFilesystem上のCurrent Sourceから直接取得する。

Tool Response、Console表示、Chat Response、検索Snippet等をSource-derived Contentの生成元にしない。

Package生成前にDirect Sourceを識別し、生成後にPackage内SectionとDirect Sourceの完全一致を検証する。

Hash MatchだけをSource Integrity PASSの根拠にしない。

truncation markerはDirect Source由来のSource-authenticか、取得・転送過程で生じたUnverifiedかを判定する。

Unverified markerやSection Integrity FAILを含むPackageはHuman Review、Commit Authorization、Stage判定、Commit Guardへ使用しない。

BZ-20260731-016が「不完全なSourceをCanonical Sourceとして扱う」問題なのに対し、本件は「完全なSourceから取得したつもりでもEvidence Generation経路で不完全になる」問題として区別する。
