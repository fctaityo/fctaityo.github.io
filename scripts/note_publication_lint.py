#!/usr/bin/env python3
"""Fail-closed aggregate static gate for LF NOTE publication candidates."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

FORBIDDEN_RI_RE = re.compile(r"RI #[1-5]")
SERIES_FILE_RE = re.compile(r"^(S\d+)-\d+", re.IGNORECASE)
NUMBERED_SECTION_RE = re.compile(r"^##\s+(\d+)[.\uff0e]\s*(.+?)\s*$", re.MULTILINE)
TOC_ITEM_RE = re.compile(r"^\s*(\d+)[.\uff0e]\s+(.+?)\s*$", re.MULTILINE)
NAVIGATION_RE = re.compile(r"^###\s+(?:\u524d\u56de\u307e\u3067\u306e\u6d41\u308c|\u95a2\u9023\u8a18\u4e8b)[^\n]*$", re.MULTILINE)


def visible_lines(text: str):
    """Yield prose lines; fenced examples and Markdown quotations are literals."""
    in_fence = False
    for number, line in enumerate(text.splitlines(), 1):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or line.lstrip().startswith(">"):
            continue
        yield number, line


def lint_notation(text: str, source: str) -> list[str]:
    errors = []
    for number, line in visible_lines(text):
        for match in FORBIDDEN_RI_RE.finditer(line):
            errors.append(f"{source}:{number}: forbidden RI notation '{match.group(0)}'; use '{match.group(0).replace(' ', '')}'")
    return errors


def structure_shape(text: str) -> dict:
    lines = text.splitlines()
    first_content = next((line for line in lines if line.strip()), "")
    sections = NUMBERED_SECTION_RE.findall(text)
    toc_match = re.search(r"^##\s+【\u76ee\u6b21】\s*$([\s\S]*?)(?=^---\s*$)", text, re.MULTILINE)
    toc_items = TOC_ITEM_RE.findall(toc_match.group(1)) if toc_match else []
    return {
        "h1_title": bool(re.match(r"^#\s+\S", first_content)),
        "article_identity": bool(re.search(r"^###\s+📌\s*本記事\s*$", text, re.MULTILINE)),
        "series_navigation": bool(NAVIGATION_RE.search(text)),
        "toc": toc_match is not None,
        "horizontal_separation": len(re.findall(r"^---\s*$", text, re.MULTILINE)) >= 2,
        "numbered_sections": bool(sections),
        "section_numbers": [number for number, _ in sections],
        "toc_numbers": [number for number, _ in toc_items],
        "has_ending": any(
            re.search(pattern, title)
            for _, title in sections
            for pattern in (r"次回予告", r"Season\s*(?:Wrap|Finale)", r"次Season", r"最終回")
        ),
    }


def load_series_projection(root: Path) -> dict:
    path = root / "notes" / "editorial" / "series-structure-baseline.json"
    return json.loads(path.read_text(encoding="utf-8"))


def lint_series_structure(path: Path, text: str, root: Path) -> list[str]:
    match = SERIES_FILE_RE.match(path.name)
    if not match:
        return []
    series_id = match.group(1).upper()
    errors = []
    try:
        projection = load_series_projection(root)
    except (OSError, ValueError) as exc:
        return [f"series baseline projection unavailable: {exc}"]
    series = projection.get("series", {}).get(series_id)
    if not isinstance(series, dict):
        return [f"series baseline is not registered: {series_id}"]
    if series.get("baseline_status") != "HUMAN_ACCEPTED":
        errors.append("baseline_status must be HUMAN_ACCEPTED")
    baseline_path = root / str(series.get("baseline_article", ""))
    corroborating = [root / str(item) for item in series.get("corroborating_articles", [])]
    if not baseline_path.is_file():
        errors.append(f"accepted baseline missing: {baseline_path}")
        return errors
    if not corroborating or any(not item.is_file() for item in corroborating):
        errors.append("accepted corroborating article missing")
        return errors
    baseline_shape = structure_shape(baseline_path.read_text(encoding="utf-8"))
    shape = structure_shape(text)
    for block in series.get("required_blocks", []):
        if not baseline_shape.get(block):
            errors.append(f"projection drift: baseline lacks declared block {block}")
        elif not shape.get(block):
            errors.append(f"structure regression: missing {block}")
    numbers = shape["section_numbers"]
    if numbers and numbers != [str(index) for index in range(1, len(numbers) + 1)]:
        errors.append("numbered sections must be unique and contiguous from 1")
    if shape["toc_numbers"] != numbers:
        errors.append("table of contents numbering does not match body sections")
    if series.get("ending_policy") == "NEXT_PREVIEW_OR_HUMAN_ACCEPTED_VARIANT" and baseline_shape["has_ending"] and not shape["has_ending"]:
        errors.append("structure regression: accepted ending block is missing")
    paid_positions = [text.find(marker) for marker in ("ここからPaid Practical Layer", "ここから有料") if marker in text]
    first_section = text.find("## 1.")
    if paid_positions and (first_section < 0 or min(paid_positions) < first_section):
        errors.append("paid boundary must not replace the opening series structure")
    return errors


def self_test() -> bool:
    cases = [
        ("RI#4 is canonical.", False),
        ("RI #4 is forbidden.", True),
        ("```text\nRI #4 bad example\n```", False),
        ("> RI #4 quoted bad example", False),
    ]
    ok = all(bool(lint_notation(text, "<self-test>")) == rejected for text, rejected in cases)
    print("SELF-TEST PASS" if ok else "SELF-TEST FAIL", file=sys.stdout if ok else sys.stderr)
    return ok


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest().upper()


def main() -> int:
    parser = argparse.ArgumentParser(description="Run the complete static gate for LF NOTE articles.")
    parser.add_argument("files", nargs="*", help="Markdown articles to lint")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if not args.files and not args.self_test:
        parser.error("article.md is required (or use --self-test)")
    if not self_test():
        return 1
    if not args.files:
        return 0

    root = Path(__file__).resolve().parent.parent
    paragraph_linter = root / "scripts" / "note_paragraph_lint.py"
    paths = [Path(raw) for raw in args.files]
    if any(not path.is_file() for path in paths):
        for path in paths:
            if not path.is_file():
                print(f"FAIL {path}: file not found or not a file", file=sys.stderr)
        return 1

    paragraph = subprocess.run(
        [sys.executable, str(paragraph_linter), *map(str, paths)],
        text=True,
        capture_output=True,
        check=False,
    )
    if paragraph.returncode:
        sys.stdout.write(paragraph.stdout)
        sys.stderr.write(paragraph.stderr)
        print("NOTE PUBLICATION GATE FAIL: paragraph gate", file=sys.stderr)
        return 1
    print("PARAGRAPH GATE PASS")

    ok = True
    for path in paths:
        text = path.read_text(encoding="utf-8")
        errors = lint_notation(text, str(path))
        errors.extend(lint_series_structure(path, text, root))
        if errors:
            ok = False
            print(f"FAIL {path}")
            for error in errors:
                print(f"  {error}")
        else:
            print(f"PASS {path} sha256={sha256(path)}")
    if not ok:
        print("NOTE PUBLICATION GATE FAIL", file=sys.stderr)
        return 1
    print(f"NOTE PUBLICATION GATE PASS files={len(paths)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
