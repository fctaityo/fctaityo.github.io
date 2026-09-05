#!/usr/bin/env python3
"""Fail-closed aggregate static gate for LF NOTE publication candidates."""

from __future__ import annotations

import argparse
import hashlib
import re
import subprocess
import sys
from pathlib import Path

FORBIDDEN_RI_RE = re.compile(r"RI #[1-5]")


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
        errors = lint_notation(path.read_text(encoding="utf-8"), str(path))
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
