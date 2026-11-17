import assert from 'node:assert/strict';
import { posix } from 'node:path';
import { test } from 'node:test';
import { isHidden, listFiles, parseYaml, read, withoutCode } from './helpers.mjs';

const files = listFiles();
const visible = files.filter((f) => !isHidden(f));
// The README files live in .github/, where GitHub shows them, so they are checked alongside the notes.
const notes = [...visible.filter((f) => f.endsWith('.md')), ...files.filter((f) => /^\.github\/README(\.[a-z]+)?\.md$/.test(f))];

// Obsidian resolves [[name]] by file name, so index every visible file by its name.
const byName = new Map();
for (const f of visible) {
  const name = posix.basename(f).toLowerCase();
  for (const key of f.endsWith('.md') ? [name, name.slice(0, -3)] : [name]) {
    byName.set(key, [...(byName.get(key) ?? []), f]);
  }
}

function headings(file) {
  return withoutCode(read(file))
    .split('\n')
    .map((l) => /^#{1,6}\s+(.*?)\s*$/.exec(l)?.[1])
    .filter(Boolean)
    .map((h) => h.toLowerCase());
}

function resolveWikilink(target, from) {
  const clean = target.toLowerCase();
  if (clean.includes('/')) return visible.filter((f) => f.toLowerCase() === clean || f.toLowerCase() === `${clean}.md`);
  const hits = byName.get(clean) ?? [];
  const sameFolder = hits.filter((f) => posix.dirname(f) === posix.dirname(from));
  return sameFolder.length === 1 ? sameFolder : hits;
}

test('note names are unique, so links by name are never ambiguous', () => {
  for (const [name, paths] of byName) {
    if (name.endsWith('.md') && paths.length > 1) {
      assert.fail(`"${name}" exists in several places: ${paths.join(', ')}`);
    }
  }
});

for (const note of notes) {
  test(`${note}: links resolve`, () => {
    const text = withoutCode(read(note));

    for (const m of text.matchAll(/!?\[\[([^\]|#]*)(?:#([^\]|]*))?(?:\|[^\]]*)?\]\]/g)) {
      const [whole, target, anchor] = m;
      if (/\{\{.*\}\}/.test(whole)) continue;
      const hits = target === '' ? [note] : resolveWikilink(target.trim(), note);
      assert.equal(hits.length, 1, `${whole} matches ${hits.length} files`);
      if (!anchor) continue;
      if (hits[0].endsWith('.md')) {
        assert.ok(headings(hits[0]).includes(anchor.trim().toLowerCase()), `${whole}: no such heading in ${hits[0]}`);
      } else if (hits[0].endsWith('.base')) {
        const views = parseYaml(read(hits[0])).views.map((v) => v.name);
        assert.ok(views.includes(anchor.trim()), `${whole}: no view named "${anchor}" in ${hits[0]}`);
      }
    }

    // Markdown links and images. Obsidian embeds (![[...]]) never match, because they have no "](".
    for (const m of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const url = m[1];
      if (/^(https?:|mailto:|#)/.test(url)) continue;
      const path = decodeURIComponent(url.split('#')[0]);
      const target = posix.normalize(posix.join(posix.dirname(note), path));
      assert.ok(files.includes(target), `${m[0]} points to ${target}, which does not exist`);
    }
  });
}
