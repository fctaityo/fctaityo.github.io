#!/usr/bin/env python3
"""Lint paragraph density in LF long-form NOTE Markdown articles."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from statistics import median
from typing import Iterable

SENTENCE_END_RE = re.compile(r"[。！？!?]+")
HEADING_RE = re.compile(r"^(#{2,6})\s+(.+)$")
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")
INLINE_CODE_RE = re.compile(r"`[^`]*`")
BOLD_RE = re.compile(r"\*\*|__")
HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)

SHORT_CHAR_LIMIT = 140
SHORT_SENTENCE_LIMIT = 2
ONE_SENTENCE_RUN_LIMIT = 2
SHORT_RUN_LIMIT = 2
SECTION_MIN_PARAGRAPHS_FOR_DENSITY = 4
SHORT_RATIO_LIMIT = 0.50
MAX_SENTENCE_LIMIT = 8


@dataclass
class Paragraph:
    text: str
    start_line: int
    end_line: int
    section: str

    @property
    def plain(self) -> str:
        text = MARKDOWN_LINK_RE.sub(r"\1", self.text)
        text = INLINE_CODE_RE.sub("", text)
        text = BOLD_RE.sub("", text)
        text = HTML_COMMENT_RE.sub("", text)
        return re.sub(r"\s+", "", text)

    @property
    def chars(self) -> int:
        return len(self.plain)

    @property
    def sentences(self) -> int:
        n = len(SENTENCE_END_RE.findall(self.plain))
        return max(1, n)

    @property
    def short(self) -> bool:
        return self.sentences <= SHORT_SENTENCE_LIMIT and self.chars < SHORT_CHAR_LIMIT

    @property
    def one_sentence(self) -> bool:
        return self.sentences <= 1


def _is_structural_block(lines: list[str]) -> bool:
    stripped = [line.strip() for line in lines if line.strip()]
    if not stripped:
        return True
    first = stripped[0]
    if first.startswith("#"):
        return True
    if first == "---":
        return True
    if first.startswith(("- ", "* ", "+ ", "> ")):
        return True
    if re.match(r"^\d+\.\s", first):
        return True
    if first.startswith("|") and first.endswith("|"):
        return True
    return False


def parse_prose_paragraphs(text: str) -> list[Paragraph]:
    lines = text.splitlines()
    paragraphs: list[Paragraph] = []
    block: list[str] = []
    block_start = 0
    in_fence = False
    section = "(preamble)"

    def flush(end_index: int) -> None:
        nonlocal block, block_start, section
        if not block:
            return
        if not _is_structural_block(block):
            paragraphs.append(
                Paragraph(
                    text="\n".join(block).strip(),
                    start_line=block_start + 1,
                    end_line=end_index,
                    section=section,
                )
            )
        block = []

    for idx, line in enumerate(lines):
        stripped = line.strip()

        if stripped.startswith("```"):
            flush(idx)
            in_fence = not in_fence
            continue
        if in_fence:
            continue

        heading = HEADING_RE.match(stripped)
        if heading:
            flush(idx)
            section = stripped
            continue

        if not stripped:
            flush(idx)
            continue

        if not block:
            block_start = idx
        block.append(line)

    flush(len(lines))
    return paragraphs


def _runs(items: list[Paragraph], predicate) -> Iterable[list[Paragraph]]:
    run: list[Paragraph] = []
    previous: Paragraph | None = None
    for item in items:
        contiguous = (
            previous is None
            or (
                item.section == previous.section
                and item.start_line <= previous.end_line + 2
            )
        )
        if predicate(item) and contiguous:
            run.append(item)
        else:
            if run:
                yield run
            run = [item] if predicate(item) else []
        previous = item
    if run:
        yield run


def lint_text(text: str, source: str = "<memory>") -> list[str]:
    paragraphs = parse_prose_paragraphs(text)
    errors: list[str] = []

    for run in _runs(paragraphs, lambda p: p.one_sentence):
        if len(run) >= ONE_SENTENCE_RUN_LIMIT:
            errors.append(
                f"{source}:{run[0].start_line}-{run[-1].end_line}: "
                f"{len(run)} consecutive one-sentence prose paragraphs"
            )

    for run in _runs(paragraphs, lambda p: p.short):
        if len(run) >= SHORT_RUN_LIMIT:
            errors.append(
                f"{source}:{run[0].start_line}-{run[-1].end_line}: "
                f"{len(run)} consecutive short prose paragraphs "
                f"(<= {SHORT_SENTENCE_LIMIT} sentences and < {SHORT_CHAR_LIMIT} chars each)"
            )

    for paragraph in paragraphs:
        if paragraph.sentences > MAX_SENTENCE_LIMIT:
            errors.append(
                f"{source}:{paragraph.start_line}-{paragraph.end_line}: "
                f"oversized prose paragraph: {paragraph.sentences} sentences "
                f"(max {MAX_SENTENCE_LIMIT})"
            )

    sections: dict[str, list[Paragraph]] = {}
    for p in paragraphs:
        sections.setdefault(p.section, []).append(p)

    for section, items in sections.items():
        if len(items) < SECTION_MIN_PARAGRAPHS_FOR_DENSITY:
            continue
        short_items = [p for p in items if p.short]
        ratio = len(short_items) / len(items)
        if ratio >= SHORT_RATIO_LIMIT:
            med_sent = median(p.sentences for p in items)
            med_chars = median(p.chars for p in items)
            errors.append(
                f"{source}:{items[0].start_line}-{items[-1].end_line}: "
                f"section '{section}' is fragmented: "
                f"{len(short_items)}/{len(items)} prose paragraphs are short "
                f"(median {med_sent:g} sentences, {med_chars:g} chars)"
            )

    return errors


def self_test() -> bool:
    good = """## Good

これは一つ目の文である。ここで二つ目の説明を続ける。さらに三つ目の文で同じ論点を閉じる。意味が続くので同じ段落へまとめる。

次の論点へ移るため、ここで段落を変える。この段落も複数文を含める。さらに説明を続けて、意味単位で閉じる。

### Next

短い導入。

ここは別の小見出し配下なので、前の短文とは連続扱いにしない。説明を複数文続ける。意味単位で閉じる。
"""
    bad = """## Bad

AIに任せた。

でも壊れた。
"""
    oversized = """## Oversized

一文目。二文目。三文目。四文目。五文目。六文目。七文目。八文目。九文目。
"""
    good_errors = lint_text(good, "<self-test-good>")
    bad_errors = lint_text(bad, "<self-test-bad>")
    oversized_errors = lint_text(oversized, "<self-test-oversized>")
    if good_errors:
        print("SELF-TEST FAIL: good sample was rejected", file=sys.stderr)
        for err in good_errors:
            print(f"  {err}", file=sys.stderr)
        return False
    if not bad_errors:
        print("SELF-TEST FAIL: fragmented sample was not rejected", file=sys.stderr)
        return False
    if not oversized_errors:
        print("SELF-TEST FAIL: oversized paragraph was not rejected", file=sys.stderr)
        return False
    print("SELF-TEST PASS")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Detect under- and over-segmented paragraph density in LF NOTE articles."
    )
    parser.add_argument("files", nargs="*", help="Markdown files to lint")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    ok = True
    if args.self_test:
        ok = self_test() and ok

    if not args.files:
        return 0 if ok else 1

    for raw in args.files:
        path = Path(raw)
        if not path.exists():
            print(f"FAIL {path}: file not found", file=sys.stderr)
            ok = False
            continue
        text = path.read_text(encoding="utf-8")
        errors = lint_text(text, str(path))
        if errors:
            print(f"FAIL {path}")
            for err in errors:
                print(f"  {err}")
            ok = False
        else:
            print(f"PASS {path}")

    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
