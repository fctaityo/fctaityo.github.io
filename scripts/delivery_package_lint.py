#!/usr/bin/env python3
"""Validate LF GitHub Web Drop-in delivery package layout."""

from __future__ import annotations

import argparse
import sys
import tempfile
import zipfile
from pathlib import Path


def normalize_member(name: str) -> str:
    name = name.replace("\\", "/")
    while name.startswith("./"):
        name = name[2:]
    return name


def hidden_segment(path: str) -> str | None:
    for segment in normalize_member(path).split("/"):
        if segment.startswith("."):
            return segment
    return None


def list_zip(path: Path) -> tuple[list[str], list[str]]:
    members: list[str] = []
    errors: list[str] = []
    with zipfile.ZipFile(path) as zf:
        for info in zf.infolist():
            if info.is_dir():
                continue
            name = normalize_member(info.filename)
            if not name:
                continue
            if name.startswith("/") or name.startswith("../") or "/../" in name:
                errors.append(f"unsafe member path: {info.filename}")
                continue
            hidden = hidden_segment(name)
            if hidden:
                errors.append(
                    f"hidden/dot path is not Web Drop-in compatible: {name} "
                    f"(segment {hidden})"
                )
            members.append(name)
    return sorted(members), errors


def lint_package(path: Path, expected: list[str]) -> list[str]:
    errors: list[str] = []

    if path.is_dir():
        members = []
        for p in path.rglob("*"):
            if not p.is_file():
                continue
            name = p.relative_to(path).as_posix()
            hidden = hidden_segment(name)
            if hidden:
                errors.append(
                    f"hidden/dot path is not Web Drop-in compatible: {name} "
                    f"(segment {hidden})"
                )
            members.append(name)
        members = sorted(members)
    elif path.is_file() and path.suffix.lower() == ".zip":
        members, zip_errors = list_zip(path)
        errors.extend(zip_errors)
    else:
        return [f"unsupported package: {path}"]

    expected_norm = sorted(normalize_member(x) for x in expected)

    for item in expected_norm:
        hidden = hidden_segment(item)
        if hidden:
            errors.append(
                f"expected list itself contains hidden/dot path: {item} "
                f"(segment {hidden})"
            )

    if members != expected_norm:
        actual = set(members)
        wanted = set(expected_norm)
        extras = sorted(actual - wanted)
        missing = sorted(wanted - actual)
        if extras:
            errors.append("unexpected files: " + ", ".join(extras))
        if missing:
            errors.append("missing files: " + ", ".join(missing))

    forbidden_wrappers = {
        "payload",
        "package",
        "repo-root",
        "overwrite-to-repo-root",
        "validation",
        "evidence",
    }
    for member in members:
        first = member.split("/", 1)[0].lower()
        if first in forbidden_wrappers:
            errors.append(f"wrapper directory is prohibited: {member}")

    return errors


def self_test() -> bool:
    with tempfile.TemporaryDirectory() as td:
        td = Path(td)

        good = td / "good.zip"
        with zipfile.ZipFile(good, "w") as zf:
            zf.writestr("notes/a.md", "ok")
            zf.writestr("scripts/check.py", "ok")

        hidden = td / "hidden.zip"
        with zipfile.ZipFile(hidden, "w") as zf:
            zf.writestr(".github/workflows/check.yml", "bad")
            zf.writestr("notes/a.md", "ok")

        wrapper = td / "wrapper.zip"
        with zipfile.ZipFile(wrapper, "w") as zf:
            zf.writestr("payload/notes/a.md", "bad")

        good_errors = lint_package(good, ["notes/a.md", "scripts/check.py"])
        hidden_errors = lint_package(
            hidden,
            [".github/workflows/check.yml", "notes/a.md"],
        )
        wrapper_errors = lint_package(wrapper, ["notes/a.md"])

        if good_errors:
            print("SELF-TEST FAIL: valid Web Drop-in rejected", file=sys.stderr)
            return False
        if not hidden_errors:
            print("SELF-TEST FAIL: hidden path accepted", file=sys.stderr)
            return False
        if not wrapper_errors:
            print("SELF-TEST FAIL: wrapper package accepted", file=sys.stderr)
            return False

    print("DELIVERY SELF-TEST PASS")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate LF GitHub Web Drop-in delivery package."
    )
    parser.add_argument("package", nargs="?")
    parser.add_argument("--expected", action="append", default=[])
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    ok = True
    if args.self_test:
        ok = self_test() and ok

    if args.package:
        if not args.expected:
            print("FAIL: --expected is required", file=sys.stderr)
            return 2
        errors = lint_package(Path(args.package), args.expected)
        if errors:
            print(f"FAIL {args.package}")
            for error in errors:
                print(f"  {error}")
            ok = False
        else:
            print(f"DELIVERY PASS {args.package}")

    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
