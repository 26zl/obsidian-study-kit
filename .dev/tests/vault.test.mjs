import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isHidden, listFiles, parseYaml, read, readJson, splitFrontmatter } from './helpers.mjs';

const files = listFiles();
const notes = files.filter((f) => f.endsWith('.md') && !isHidden(f));
const bases = files.filter((f) => f.endsWith('.base'));
const propertyTypes = readJson('.obsidian/types.json').types;

const required = {
  course: ['code', 'title', 'status'],
  topic: ['course', 'last_review', 'next_review', 'interval_days', 'reviews', 'last_score'],
  'progress-log': ['course', 'topic'],
  'lecture-note': ['course', 'date'],
  'source-note': ['course', 'source', 'origin', 'checked'],
  assignment: ['course', 'due', 'weight', 'status', 'ai_policy', 'ai_policy_source'],
  repo: ['url', 'branch'],
  daily: [],
  'weekly-review': [],
  'study-plan': [],
  profile: ['language', 'default_ai_policy', 'setup_done'],
};
const allowed = {
  course: { status: ['active', 'done'] },
  assignment: {
    status: ['todo', 'drafting', 'submitted', 'graded'],
    ai_policy: ['unknown', 'none', 'limited', 'open'],
  },
  profile: { default_ai_policy: ['unknown', 'none', 'limited', 'open'] },
};

test('Obsidian config keeps third-party code and network features off', () => {
  const core = readJson('.obsidian/core-plugins.json');
  for (const id of ['sync', 'publish', 'webviewer', 'slides']) assert.equal(core[id], false, `${id} must be off by default`);
  for (const id of ['bases', 'templates', 'daily-notes', 'properties', 'file-recovery']) assert.equal(core[id], true, `${id} must be on`);
  for (const f of files) {
    assert.doesNotMatch(f, /^\.obsidian\/(plugins|themes|snippets)\//, `${f}: third-party code is never committed`);
    assert.doesNotMatch(f, /^\.obsidian\/(community-plugins|workspace|workspace-mobile|workspaces)\.json$/, `${f} must not be committed`);
  }
});

test('Obsidian config points at folders and templates that exist', () => {
  const app = readJson('.obsidian/app.json');
  const hasFolder = (dir) => files.some((f) => f.startsWith(`${dir}/`));
  assert.equal(app.newFileLocation, 'folder');
  assert.ok(hasFolder(app.newFileFolderPath), `${app.newFileFolderPath} does not exist`);
  assert.ok(hasFolder(app.attachmentFolderPath), `${app.attachmentFolderPath} does not exist`);
  assert.equal(app.trashOption, 'local');

  const daily = readJson('.obsidian/daily-notes.json');
  assert.ok(hasFolder(daily.folder));
  assert.ok(files.includes(`${daily.template}.md`), `${daily.template}.md does not exist`);
  assert.ok(hasFolder(readJson('.obsidian/templates.json').folder));

  const kinds = ['text', 'multitext', 'number', 'checkbox', 'date', 'datetime', 'tags', 'aliases'];
  for (const [name, kind] of Object.entries(propertyTypes)) assert.ok(kinds.includes(kind), `${name}: unknown type ${kind}`);
});

test('Obsidian settings are stored exactly as Obsidian writes them, so opening the vault changes nothing', () => {
  for (const f of files.filter((x) => /^\.obsidian\/[^/]+\.json$/.test(x))) {
    const text = read(f);
    assert.equal(text, JSON.stringify(JSON.parse(text), null, 2), `${f}: store it as JSON.stringify(data, null, 2), without a final newline`);
  }
});

test('folders have plain names, without number prefixes', () => {
  const folders = new Set(files.filter((f) => !isHidden(f) && f.includes('/')).map((f) => f.split('/')[0]));
  for (const folder of folders) assert.doesNotMatch(folder, /^\d/, `${folder}: use a plain folder name`);
});

test('the graph colours notes by kinds and folders that exist', () => {
  const graph = readJson('.obsidian/graph.json');
  assert.ok(Array.isArray(graph.colorGroups) && graph.colorGroups.length > 0, 'no colour groups');
  for (const { query, color } of graph.colorGroups) {
    assert.ok(Number.isInteger(color?.rgb) && color.rgb >= 0 && color.rgb <= 0xffffff, `${query}: rgb must be an integer colour`);
    for (const m of query.matchAll(/\[type:([a-z-]+)\]/g)) assert.ok(m[1] in required, `${query}: unknown type "${m[1]}"`);
    for (const m of query.matchAll(/path:\/\^([a-z-]+)\\\//g)) {
      assert.ok(files.some((f) => f.startsWith(`${m[1]}/`)), `${query}: there is no folder "${m[1]}"`);
    }
  }
  assert.match(graph.search, /templates/, 'the graph hides the templates');
});

test('bookmarks point at files and folders that exist', () => {
  for (const item of readJson('.obsidian/bookmarks.json').items) {
    if (item.type === 'file') assert.ok(files.includes(item.path), `bookmark ${item.path} does not exist`);
    if (item.type === 'folder') assert.ok(files.some((f) => f.startsWith(`${item.path}/`)), `bookmark ${item.path}/ does not exist`);
  }
});

for (const canvas of files.filter((f) => f.endsWith('.canvas'))) {
  test(`${canvas}: nodes and edges are valid JSON Canvas`, () => {
    const doc = readJson(canvas);
    const nodes = new Set();
    for (const node of doc.nodes) {
      assert.ok(node.id && !nodes.has(node.id), `node id missing or repeated: ${node.id}`);
      nodes.add(node.id);
      assert.ok(['text', 'file', 'link', 'group'].includes(node.type), `${node.id}: unknown node type ${node.type}`);
      for (const k of ['x', 'y', 'width', 'height']) assert.ok(Number.isInteger(node[k]), `${node.id}: ${k} must be an integer`);
      if (node.type !== 'file') continue;
      assert.ok(files.includes(node.file), `${node.id}: ${node.file} does not exist`);
      if (node.subpath) {
        const heading = node.subpath.replace(/^#/, '');
        assert.ok(read(node.file).split('\n').some((l) => /^#{1,6}\s/.test(l) && l.replace(/^#+\s+/, '') === heading), `${node.id}: no heading "${heading}"`);
      }
    }
    const edges = new Set();
    for (const edge of doc.edges) {
      assert.ok(edge.id && !edges.has(edge.id) && !nodes.has(edge.id), `edge id missing or repeated: ${edge.id}`);
      edges.add(edge.id);
      assert.ok(nodes.has(edge.fromNode) && nodes.has(edge.toNode), `${edge.id}: points at a node that does not exist`);
    }
  });
}

for (const base of bases) {
  test(`${base}: structure is valid`, () => {
    const doc = parseYaml(read(base));
    for (const k of Object.keys(doc)) {
      assert.ok(['filters', 'formulas', 'properties', 'summaries', 'views'].includes(k), `unknown top-level key "${k}"`);
    }
    assert.ok(JSON.stringify(doc.filters).includes('templates'), 'the base must exclude the templates folder');
    const formulas = Object.keys(doc.formulas ?? {});
    for (const k of Object.keys(doc.properties ?? {})) {
      assert.match(k, /^(note|formula|file)\./, `properties key "${k}" needs a note., formula. or file. prefix`);
      if (k.startsWith('formula.')) assert.ok(formulas.includes(k.slice(8)), `${k} is not defined`);
      if (k.startsWith('note.')) assert.ok(k.slice(5) in propertyTypes, `${k} is not a known property`);
    }
    assert.ok(Array.isArray(doc.views) && doc.views.length > 0, 'a base needs at least one view');
    const names = new Set();
    for (const view of doc.views) {
      assert.ok(['table', 'cards', 'list', 'map', 'kanban'].includes(view.type), `unknown view type ${view.type}`);
      assert.ok(view.name && !names.has(view.name), `view name missing or repeated: ${view.name}`);
      names.add(view.name);
      for (const column of view.order ?? []) {
        if (column.startsWith('formula.')) assert.ok(formulas.includes(column.slice(8)), `${column} is not defined`);
        else if (!column.startsWith('file.')) assert.ok(column in propertyTypes, `column "${column}" is not a known property`);
      }
      for (const sort of view.sort ?? []) {
        assert.ok(['ASC', 'DESC'].includes(sort.direction), 'sort direction must be ASC or DESC');
      }
    }
  });
}

for (const note of notes) {
  const { data } = splitFrontmatter(read(note));
  if (!data) continue;

  test(`${note}: properties are known and complete`, () => {
    for (const k of Object.keys(data)) assert.ok(k in propertyTypes, `"${k}" is missing from .obsidian/types.json`);
    if (!data.type) return;
    assert.ok(data.type in required, `unknown type "${data.type}"`);
    for (const k of required[data.type]) assert.ok(k in data, `type ${data.type} needs the property "${k}"`);
    for (const [k, values] of Object.entries(allowed[data.type] ?? {})) {
      if (data[k] !== null) assert.ok(values.includes(data[k]), `${k}: "${data[k]}" is not one of ${values.join(', ')}`);
    }
    for (const k of Object.keys(data)) {
      if (propertyTypes[k] === 'date' && data[k] !== null && !note.startsWith('templates/')) {
        assert.match(String(data[k]), /^\d{4}-\d{2}-\d{2}$/, `${k} must be YYYY-MM-DD`);
      }
    }
  });
}

test('every template has a type', () => {
  const templates = notes.filter((n) => n.startsWith('templates/'));
  assert.ok(templates.length >= 5);
  for (const t of templates) assert.ok(splitFrontmatter(read(t)).data?.type, `${t} has no type`);
});

test('notes that belong to a course name a course that exists', () => {
  const codes = notes
    .map((n) => splitFrontmatter(read(n)).data)
    .filter((d) => d?.type === 'course' && d.code)
    .map((d) => d.code);
  for (const n of notes.filter((f) => !f.startsWith('templates/'))) {
    const { data } = splitFrontmatter(read(n));
    if (data?.course) assert.ok(codes.includes(data.course), `${n}: no course home for "${data.course}"`);
  }
});

test('.gitignore keeps private files, third-party code and course material out', () => {
  const lines = read('.gitignore').split('\n');
  for (const line of [
    'private/',
    '.env',
    '*.pem',
    '*.key',
    '.obsidian/plugins/',
    '.obsidian/community-plugins.json',
    '.obsidian/workspace.json',
    '.obsidian/appearance.json',
    'courses/**/sources/**/*.pdf',
    '.claude/settings.local.json',
    '.agents/',
  ]) {
    assert.ok(lines.includes(line), `.gitignore is missing "${line}"`);
  }
});

test('manifests agree with each other and with the changelog', () => {
  const plugin = readJson('.claude-plugin/plugin.json');
  const market = readJson('.claude-plugin/marketplace.json');
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.equal(market.plugins.length, 1);
  assert.equal(market.plugins[0].name, plugin.name);
  assert.equal(market.plugins[0].source, './');
  assert.deepEqual(plugin.skills, ['./.claude/skills/']);
  assert.ok(read('docs/changelog.md').includes(`## ${plugin.version}`), 'the changelog has no entry for this version');
  assert.deepEqual(readJson('.gemini/settings.json').context.fileName, ['AGENTS.md', 'GEMINI.md']);
});

test('CLAUDE.md imports the shared instructions', () => {
  const lines = read('CLAUDE.md').split('\n');
  assert.ok(lines.includes('@AGENTS.md'));
  assert.ok(lines.includes('@profile.md'));
});
