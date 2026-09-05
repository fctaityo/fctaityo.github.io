import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "note_publication_lint.py"
SPEC = importlib.util.spec_from_file_location("note_publication_lint", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class NotePublicationLintTests(unittest.TestCase):
    def run_cli(self, *args):
        return subprocess.run([sys.executable, str(SCRIPT), *args], text=True, capture_output=True)

    def test_self_test(self):
        result = self.run_cli("--self-test")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("SELF-TEST PASS", result.stdout)

    def test_missing_target_fails_closed(self):
        self.assertNotEqual(self.run_cli().returncode, 0)

    def test_canonical_and_literal_examples(self):
        text = "RI#4。\n```text\nRI #4\n```\n> RI #5"
        self.assertEqual(MODULE.lint_notation(text, "sample"), [])

    def test_forbidden_notation_is_rejected(self):
        errors = MODULE.lint_notation("CurrentはRI #4。", "sample")
        self.assertEqual(len(errors), 1)

    def test_aggregate_gate_and_hash_receipt(self):
        with tempfile.TemporaryDirectory() as temp:
            article = Path(temp) / "article.md"
            article.write_text("## 本文\n\nこれは第一文である。これは第二文である。これはRI#4の第三文である。\n", encoding="utf-8")
            result = self.run_cli(str(article))
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("PARAGRAPH GATE PASS", result.stdout)
            self.assertIn("sha256=", result.stdout)
            self.assertIn("NOTE PUBLICATION GATE PASS files=1", result.stdout)


if __name__ == "__main__":
    unittest.main()

