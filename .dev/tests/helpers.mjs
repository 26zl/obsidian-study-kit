import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function git(args) {
  return execFileSync('git', ['-c', 'core.quotepath=false', ...args], { cwd: root, encoding: 'utf8' });
}

// Linked repositories are Git submodules. Their files belong to other repositories, not to the kit.
export function submodulePaths() {
  return git(['ls-files', '-z', '--stage'])
    .split('\0')
    .filter((entry) => entry.startsWith('160000 '))
    .map((entry) => entry.slice(entry.indexOf('\t') + 1));
}

// Tracked files plus untracked files that Git does not ignore, with forward slashes.
export function listFiles() {
  const linked = submodulePaths();
  const inLinked = (f) => linked.some((path) => f === path || f.startsWith(`${path}/`));
  return git(['ls-files', '-z', '--cached', '--others', '--exclude-standard'])
    .split('\0')
    .filter((f) => f && !inLinked(f) && existsSync(join(root, f)))
    .sort();
}

export function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

export function readJson(rel) {
  return JSON.parse(read(rel));
}

export function isHidden(rel) {
  return rel.split('/').some((part) => part.startsWith('.'));
}

export function splitFrontmatter(text) {
  const lines = text.split('\n');
  if (lines[0] !== '---') return { data: null, body: text };
  const end = lines.indexOf('---', 1);
  if (end === -1) throw new Error('frontmatter is not closed');
  return {
    data: parseYaml(lines.slice(1, end).join('\n')),
    body: lines.slice(end + 1).join('\n'),
  };
}

function scalar(raw, n) {
  const s = raw.trim();
  if (s.startsWith("'")) {
    if (s.length < 2 || !s.endsWith("'")) throw new Error(`line ${n}: unclosed single quote`);
    return s.slice(1, -1).replace(/''/g, "'");
  }
  if (s.startsWith('"')) {
    if (s.length < 2 || !s.endsWith('"')) throw new Error(`line ${n}: unclosed double quote`);
    return JSON.parse(s);
  }
  if (s === '[]') return [];
  if (/^[[{&*!|>%@`]/.test(s)) throw new Error(`line ${n}: quote the value "${s}"`);
  if (/: |\s#/.test(s)) throw new Error(`line ${n}: quote the value "${s}"`);
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return s;
}

// The YAML subset the kit uses: block maps and lists, quoted or plain scalars, comments.
// Anything else is rejected so files stay simple enough for every tool to read.
export function parseYaml(text) {
  if (text.includes('\t')) throw new Error('tabs are not allowed');
  const lines = text
    .split('\n')
    .map((raw, i) => ({ raw, n: i + 1 }))
    .filter((l) => l.raw.trim() !== '' && !l.raw.trim().startsWith('#'))
    .map((l) => ({ indent: l.raw.length - l.raw.trimStart().length, text: l.raw.trim(), n: l.n }));
  let pos = 0;
  const key = /^([A-Za-z0-9_.-]+):(?:\s+(.*))?$/;
  const isItem = (l) => l.text === '-' || l.text.startsWith('- ');

  function block(indent) {
    return isItem(lines[pos]) ? list(indent) : map(indent);
  }

  function map(indent) {
    const out = {};
    while (pos < lines.length && lines[pos].indent === indent && !isItem(lines[pos])) {
      const { text: t, n } = lines[pos];
      const m = key.exec(t);
      if (!m) throw new Error(`line ${n}: expected "key: value"`);
      if (m[1] in out) throw new Error(`line ${n}: duplicate key "${m[1]}"`);
      pos += 1;
      if (m[2] !== undefined && m[2] !== '') out[m[1]] = scalar(m[2], n);
      else if (pos < lines.length && lines[pos].indent > indent) out[m[1]] = block(lines[pos].indent);
      else if (pos < lines.length && lines[pos].indent === indent && isItem(lines[pos])) out[m[1]] = list(indent);
      else out[m[1]] = null;
    }
    if (pos < lines.length && lines[pos].indent > indent) {
      throw new Error(`line ${lines[pos].n}: unexpected indentation`);
    }
    return out;
  }

  function list(indent) {
    const out = [];
    while (pos < lines.length && lines[pos].indent === indent && isItem(lines[pos])) {
      const line = lines[pos];
      const rest = line.text.slice(1).trim();
      if (!/^['"]/.test(rest) && key.test(rest)) {
        lines[pos] = { indent: indent + 2, text: rest, n: line.n };
        out.push(map(indent + 2));
      } else {
        pos += 1;
        out.push(scalar(rest, line.n));
      }
    }
    return out;
  }

  if (lines.length === 0) return {};
  const result = block(lines[0].indent);
  if (pos < lines.length) throw new Error(`line ${lines[pos].n}: could not parse`);
  return result;
}

// Markdown with fenced blocks and inline code blanked out, so examples are not read as links.
export function withoutCode(markdown) {
  let fence = null;
  return markdown
    .split('\n')
    .map((line) => {
      const m = /^\s*(?:>\s*)*(`{3,}|~{3,})/.exec(line);
      if (fence) {
        if (m && m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
        return '';
      }
      if (m) {
        fence = m[1];
        return '';
      }
      return line.replace(/`[^`\n]*`/g, '');
    })
    .join('\n');
}
