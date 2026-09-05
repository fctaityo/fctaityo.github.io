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

    def series_article(self, *, nav="前回までの流れ👇", ending="次回予告", paid=False):
        paid_layer = "\nここからPaid Practical Layer\n\n" if paid else "\n"
        return f"""# S4-03 テスト

### 📌 本記事

- **Season 4 第3話：テスト**

### {nav}

- Season 4 第2話：前回

---

## 【目次】

1. 本文
2. {ending}

---

導入の第一文である。これは第二文である。これは第三文である。

## 1. 本文

本文の第一文である。これは第二文である。これは第三文である。
{paid_layer}
## 2. {ending}

予告の第一文である。これは第二文である。これは第三文である。
"""

    def lint_structure(self, text, name="S4-03_test.md"):
        return MODULE.lint_series_structure(Path(name), text, ROOT)

    def test_series_structure_normal_paid_and_navigation_variants_pass(self):
        self.assertEqual(self.lint_structure(self.series_article()), [])
        self.assertEqual(self.lint_structure(self.series_article(paid=True)), [])
        self.assertEqual(self.lint_structure(self.series_article(nav="関連記事はコチラ👇")), [])

    def test_human_accepted_finale_variation_passes(self):
        self.assertEqual(self.lint_structure(self.series_article(ending="Season Finale")), [])

    def test_missing_major_blocks_fail(self):
        cases = {
            "article_identity": self.series_article().replace("### 📌 本記事\n", ""),
            "toc": self.series_article().replace("## 【目次】", "## 概要"),
            "series_navigation": self.series_article().replace("### 前回までの流れ👇", "### ブログ情報"),
            "numbered_sections": self.series_article().replace("## 1. 本文", "## 本文").replace("## 2. 次回予告", "## 次回予告"),
        }
        for expected, text in cases.items():
            with self.subTest(expected=expected):
                self.assertTrue(any(expected in error for error in self.lint_structure(text)))

    def test_generic_series_article_and_paid_opening_replacement_fail(self):
        generic = "# S4-03 テスト\n\n## 本文\n\n文である。"
        self.assertGreaterEqual(len(self.lint_structure(generic)), 4)
        replaced = self.series_article(paid=True).replace("ここからPaid Practical Layer", "", 1)
        replaced = replaced.replace("### 📌 本記事", "ここからPaid Practical Layer\n\n### 📌 本記事")
        self.assertTrue(any("paid boundary" in error for error in self.lint_structure(replaced)))

    def test_draft_or_historical_baseline_status_is_rejected(self):
        projection = MODULE.load_series_projection(ROOT)
        original = projection["series"]["S4"]["baseline_status"]
        projection["series"]["S4"]["baseline_status"] = "DRAFT"
        old_loader = MODULE.load_series_projection
        MODULE.load_series_projection = lambda root: projection
        try:
            self.assertTrue(any("HUMAN_ACCEPTED" in error for error in self.lint_structure(self.series_article())))
        finally:
            MODULE.load_series_projection = old_loader
            projection["series"]["S4"]["baseline_status"] = original


if __name__ == "__main__":
    unittest.main()
