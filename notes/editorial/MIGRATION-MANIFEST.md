# Editorial Split Migration Manifest

Package: `LF-NOTES-EDITORIAL-SPLIT_v1.0`
Date: `2026-08-22`

## Canonical source checked

Repository: `fctaityo/fctaityo.github.io`
Branch: `main`
Source: `notes/30-article-incubator.md`
Source Blob SHA: `2e32696b04adfc765b418d61d1132b3ea936ebd7`

## Purpose

肥大化した`notes/30-article-incubator.md`をEditorial Hubへ縮退し、
詳細PlanningをSeason単位・Backlog単位へ分離する。

## Mapping

| 旧30内の責務 | 新しい配置 |
|---|---|
| 運用責務 / Current Editorial Position / Navigation | `notes/30-article-incubator.md` |
| Season 1 | `notes/editorial/season-1-plan.md` |
| Season 2 | `notes/editorial/season-2-plan.md` |
| Season 3 | `notes/editorial/season-3-plan.md` |
| Season 4 Working Direction | `notes/editorial/season-4-working-plan.md` |
| Backlog / 統合済み候補 | `notes/editorial/cross-season-backlog.md` |
| notes Navigation | `notes/00-README.md` |

## Currentization applied during split

Season 3について、旧Sourceの以下のCurrent表現のみCurrentizeした。

- `FC-CORE-001のみConfirmed` → `FC-CORE-001〜004 Confirmed`
- Phase 3C → `TERMINAL / PASS`
- Review Binding Integrity → `CANDIDATE — STRONG`
- Next → 次Candidate Evidence Assessment / Human Decision Preparation
- RIのCurrent roleをFormal Public Recoveryに合わせて明確化

Season 1 / Season 2のHistorical Evidenceは成功扱いへ書き換えていない。
Fresh Formal RV-01は`NOT EXECUTED`、RI #1 Runtime AcceptanceはHistorical `PENDING`のまま保持した。

## Non-goals

- NOTE記事本文の変更
- `notes/articles/`既存記事本文の移動・改名
- docs/の変更
- Formal Core semanticsの新規変更
- RI Stateの新規変更
- Runtime / Acceptanceの変更

## Upload

ZIP内の`notes/`をRepositoryの`notes/`へ同階層で配置する。

- `00-README.md`：置換
- `30-article-incubator.md`：置換
- `editorial/`：新設
- 既存`notes/articles/`：触らない

HumanがUpload / Commit後、GitHub Read-Backで配置・LinkをVerifyすること。
