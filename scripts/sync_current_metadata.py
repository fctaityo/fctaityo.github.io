#!/usr/bin/env python3
"""Validate the crawler-visible head against the single Current metadata source."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
META = json.loads((ROOT / "assets/current-metadata.json").read_text(encoding="utf-8"))
HTML = (ROOT / "index.html").read_text(encoding="utf-8")

EXPECTED = {
    r"<title>([^<]+)</title>": META["title"],
    r'<meta name="description" content="([^"]+)">': META["description"],
    r'<link rel="canonical" href="([^"]+)">': META["url"],
    r'<meta property="og:type" content="([^"]+)">': META["og_type"],
    r'<meta property="og:url" content="([^"]+)">': META["url"],
    r'<meta property="og:title" content="([^"]+)">': META["title"],
    r'<meta property="og:description" content="([^"]+)">': META["social_description"],
    r'<meta property="og:image" content="([^"]+)">': META["image"],
    r'<meta property="og:image:alt" content="([^"]+)">': META["image_alt"],
    r'<meta name="twitter:card" content="([^"]+)">': META["twitter_card"],
    r'<meta name="twitter:url" content="([^"]+)">': META["url"],
    r'<meta name="twitter:title" content="([^"]+)">': META["title"],
    r'<meta name="twitter:description" content="([^"]+)">': META["social_description"],
    r'<meta name="twitter:image" content="([^"]+)">': META["image"],
}

for pattern, expected in EXPECTED.items():
    found = re.findall(pattern, HTML)
    if found != [expected]:
        raise SystemExit(f"CURRENT METADATA DRIFT: {pattern} -> {found!r}")
if "document.title" in (ROOT / "v5.js").read_text(encoding="utf-8"):
    raise SystemExit("CURRENT METADATA DRIFT: JavaScript title override remains")
if not (ROOT / "assets/hero-foundry.webp").is_file():
    raise SystemExit("CURRENT METADATA DRIFT: OGP image missing")
print("Current metadata validation: PASS")
