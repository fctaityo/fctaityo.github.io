const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const meta = JSON.parse(fs.readFileSync(path.join(root, 'assets/current-metadata.json'), 'utf8'));

test('crawler metadata is complete, unique, and Current', () => {
  for (const value of [meta.title, meta.description, meta.social_description, meta.url, meta.image]) {
    assert.ok(html.includes(value));
  }
  for (const key of ['og:type','og:url','og:title','og:description','og:image','twitter:card','twitter:url','twitter:title','twitter:description','twitter:image']) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.equal((html.match(new RegExp(`(?:property|name)="${escaped}"`, 'g')) || []).length, 1);
  }
  assert.ok(meta.title.includes('v5.4'));
  assert.ok(!meta.title.includes('v5.2'));
  assert.ok(fs.existsSync(path.join(root, 'assets/hero-foundry.webp')));
  assert.ok(!fs.readFileSync(path.join(root, 'v5.js'), 'utf8').includes('document.title'));
});
