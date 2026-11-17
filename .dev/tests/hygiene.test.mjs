import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { listFiles, read, root } from './helpers.mjs';

const files = listFiles();
const textFile = /\.(md|json|base|canvas|svg|mjs|yml|yaml|sh)$|(^|\/)(LICENSE|\.gitignore|\.gitattributes|\.gitmodules|\.editorconfig)$/;
// The README banner, which is also the social preview image GitHub shows when the repository is shared.
const banner = /^\.github\/assets\/[a-z0-9-]+\.png$/;

test('file names work on Windows, macOS, Linux, iOS and Android', () => {
  const seen = new Map();
  for (const f of files) {
    assert.ok(f.length <= 180, `${f}: path is longer than 180 characters`);
    for (const part of f.split('/')) {
      assert.doesNotMatch(part, /[\\:*?"<>|\u0000-\u001f]/, `${f}: unsafe character in "${part}"`);
      assert.doesNotMatch(part, /[ .]$/, `${f}: "${part}" ends with a space or a dot`);
      assert.doesNotMatch(part, /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i, `${f}: "${part}" is reserved on Windows`);
    }
    const key = f.toLowerCase();
    assert.ok(!seen.has(key), `${f} and ${seen.get(key)} differ only in case`);
    seen.set(key, f);
  }
});

test('the repository holds only small text files, plus the README banner', () => {
  for (const f of files) {
    if (f.endsWith('/.gitkeep')) {
      assert.equal(statSync(join(root, f)).size, 0, `${f} should be empty`);
      continue;
    }
    if (banner.test(f)) {
      assert.ok(statSync(join(root, f)).size < 1_000_000, `${f} is over 1 MB, GitHub's limit for a social preview`);
      continue;
    }
    assert.match(f, textFile, `${f}: unexpected file type`);
    assert.ok(statSync(join(root, f)).size < 200_000, `${f} is larger than 200 kB`);
  }
});

test('SVG images hold no scripts, event handlers or outside references', () => {
  for (const f of files.filter((x) => x.endsWith('.svg'))) {
    assert.doesNotMatch(read(f), /<script|<foreignObject|\son[a-z]+\s*=|href\s*=\s*"(?!#)/i, `${f} must be a plain picture`);
  }
});

// Obsidian writes its own settings and canvases without a final newline. The kit stores them the
// same way, so opening the vault in Obsidian does not show up as changes in Git.
const writtenByObsidian = (f) => f.startsWith('.obsidian/') || f.endsWith('.canvas');

test('text files are UTF-8 without a BOM, use LF and end with a newline', () => {
  for (const f of files.filter((x) => textFile.test(x))) {
    const bytes = readFileSync(join(root, f));
    assert.ok(!(bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf), `${f} starts with a BOM`);
    const text = bytes.toString('utf8');
    assert.ok(!text.includes(String.fromCharCode(0xfffd)), `${f} is not valid UTF-8`);
    assert.ok(!text.includes('\r'), `${f} contains CR line endings`);
    if (!writtenByObsidian(f)) assert.ok(text.endsWith('\n'), `${f} does not end with a newline`);
  }
});

test('no secrets are committed', () => {
  const patterns = {
    'private key': /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    'AWS access key': /\bAKIA[0-9A-Z]{16}\b/,
    'GitHub token': /\b(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,})\b/,
    'API key': /\bsk-[A-Za-z0-9_-]{24,}\b/,
    'Slack token': /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/,
    'Google API key': /\bAIza[0-9A-Za-z_-]{35}\b/,
  };
  for (const f of files.filter((x) => textFile.test(x))) {
    const text = read(f);
    for (const [kind, pattern] of Object.entries(patterns)) {
      assert.doesNotMatch(text, pattern, `${f} contains something shaped like a ${kind}`);
    }
  }
});

test('nothing private or machine-specific is committed', () => {
  for (const f of files) {
    assert.doesNotMatch(f, /^private\//, `${f}: the private folder is never committed`);
    assert.doesNotMatch(f, /(^|\/)\.env(\.|$)/, `${f}: env files are never committed`);
    assert.doesNotMatch(f, /(^|\/)(CLAUDE|AGENTS)\.local\.md$|settings\.local\.json$/, `${f}: local agent files are never committed`);
  }
  for (const f of files.filter((x) => textFile.test(x))) {
    assert.doesNotMatch(read(f), /[A-Za-z]:\\Users\\|\/Users\/[a-z]|\/home\/[a-z]/, `${f} contains a path from someone's machine`);
  }
});

test('GitHub Actions are pinned to a commit and run with read-only permissions', () => {
  const workflows = files.filter((f) => /^\.github\/workflows\/.*\.ya?ml$/.test(f));
  assert.ok(workflows.length > 0, 'no workflow found');
  for (const w of workflows) {
    const text = read(w);
    for (const m of text.matchAll(/uses:\s*(\S+)/g)) {
      assert.match(m[1], /@[0-9a-f]{40}$/, `${w}: ${m[1]} is not pinned to a commit SHA`);
    }
    assert.match(text, /^permissions:\n {2}contents: read$/m, `${w}: set top-level permissions to contents: read`);
    assert.doesNotMatch(text, /pull_request_target/, `${w}: pull_request_target is not used in this repository`);
  }
});
