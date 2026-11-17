import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { listFiles, read, root, splitFrontmatter } from './helpers.mjs';

const files = listFiles();
const skillFiles = files.filter((f) => f.startsWith('.claude/skills/'));
const skills = [...new Set(skillFiles.map((f) => f.split('/')[2]))].sort();
const specFields = ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'];

test('there are skills to check', () => {
  assert.ok(skills.length >= 10, `found only ${skills.length} skills`);
});

for (const skill of skills) {
  const path = `.claude/skills/${skill}/SKILL.md`;

  test(`${skill}: frontmatter follows the Agent Skills format`, () => {
    assert.ok(files.includes(path), `${path} is missing`);
    const { data, body } = splitFrontmatter(read(path));
    assert.ok(data, 'no frontmatter');
    for (const field of Object.keys(data)) {
      assert.ok(specFields.includes(field), `"${field}" is not a field of the Agent Skills format`);
    }
    assert.equal(data.name, skill, 'name must equal the folder name');
    assert.match(data.name, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(data.name.length <= 64);
    assert.equal(typeof data.description, 'string');
    assert.ok(data.description.length >= 40, 'description is too short to trigger reliably');
    assert.ok(data.description.length <= 1024, `description is ${data.description.length} characters`);
    assert.equal(data.license, 'MIT');
    assert.ok(body.split('\n').length < 500, 'SKILL.md body should stay under 500 lines');
  });

  test(`${skill}: asks for no pre-approved tools and runs nothing`, () => {
    const text = read(path);
    const { data } = splitFrontmatter(text);
    assert.equal(data['allowed-tools'], undefined, 'skills in this kit do not pre-approve tools');
    assert.doesNotMatch(text, /(^|\s)!`/m, 'inline shell execution is not allowed in skills');
    assert.doesNotMatch(text, /^\s*```\s*(bash|sh|shell|zsh|powershell|pwsh|ps1|cmd|bat)\b/m, 'no shell scripts in skills');
    const extras = skillFiles.filter((f) => f.startsWith(`.claude/skills/${skill}/`) && !f.endsWith('.md'));
    assert.deepEqual(extras, [], 'skills contain Markdown only');
  });

  test(`${skill}: files it points to exist`, () => {
    const text = read(path);
    for (const m of text.matchAll(/`(references\/[A-Za-z0-9._/-]+)`/g)) {
      assert.ok(existsSync(join(root, '.claude/skills', skill, m[1])), `${m[1]} is missing`);
    }
    for (const m of text.matchAll(/`(templates\/[a-z0-9-]+\.md)`/g)) {
      assert.ok(files.includes(m[1]), `${m[1]} is missing`);
    }
    for (const m of text.matchAll(/`(docs\/[a-z0-9/-]+\.md)`/g)) {
      assert.ok(files.includes(m[1]), `${m[1]} is missing`);
    }
  });
}

test('skills that share a reference file carry identical copies', () => {
  const copies = skillFiles.filter((f) => f.endsWith('/references/scheduling.md'));
  assert.ok(copies.length >= 2);
  const first = read(copies[0]);
  for (const copy of copies.slice(1)) assert.equal(read(copy), first, `${copy} differs from ${copies[0]}`);
});

test('skills that mention a sibling skill mention one that exists', () => {
  for (const skill of skills) {
    const { body } = splitFrontmatter(read(`.claude/skills/${skill}/SKILL.md`));
    for (const m of body.matchAll(/`([a-z]+(?:-[a-z]+)+)`/g)) {
      const looksLikeSkill = /-(trainer|coach|triage|review|setup|check|plan|sheet|note|course)$/.test(m[1]);
      if (looksLikeSkill && !m[1].includes('/')) {
        assert.ok(
          skills.includes(m[1]) || ['progress-log', 'source-note', 'lecture-note', 'weekly-review', 'study-plan', 'daily-note'].includes(m[1]),
          `${skill} mentions \`${m[1]}\`, which is not a skill`,
        );
      }
    }
  }
});

function tableNames(text, heading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, `heading "${heading}" not found`);
  const next = text.indexOf('\n## ', start + heading.length);
  const section = text.slice(start, next === -1 ? undefined : next);
  return [...section.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map((m) => m[1]).sort();
}

test('AGENTS.md lists exactly the skills that exist', () => {
  assert.deepEqual(tableNames(read('AGENTS.md'), '## Skills'), skills);
});

test('the README lists exactly the skills that exist', () => {
  assert.deepEqual(tableNames(read('.github/README.md'), '## The skills'), skills);
});

test('docs/skills.md describes every skill', () => {
  const text = read('docs/skills.md');
  const listed = [...new Set([...text.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map((m) => m[1]))].sort();
  assert.deepEqual(listed, skills);
});

const evalCases = [...new Set(files.filter((f) => /^\.dev\/evals\/[^/]+\/case\.yaml$/.test(f)).map((f) => f.split('/')[2]))].sort();

test('there are behaviour evals', () => {
  assert.ok(evalCases.length >= 4, `found only ${evalCases.length} eval cases`);
});

for (const name of evalCases) {
  test(`eval ${name}: case is complete and targets a skill that exists`, () => {
    const dir = `.dev/evals/${name}`;
    const spec = read(`${dir}/case.yaml`);
    assert.match(spec, new RegExp(`^name: ${name}$`, 'm'), 'name must equal the folder name');
    assert.match(spec, /^expected_outcome: /m, 'expected_outcome is missing');

    const prompt = read(`${dir}/prompt.md`);
    const tags = /^tags: \[([^\]]*)\]$/m.exec(prompt)?.[1].split(',').map((t) => t.trim()).filter(Boolean) ?? [];
    assert.ok(tags.length > 0, 'prompt.md needs tags');
    for (const tag of tags) assert.ok(skills.includes(tag), `tag "${tag}" is not a skill`);
    assert.match(prompt, /^max_turns: \d+$/m, 'prompt.md needs max_turns');
    assert.ok(files.some((f) => f.startsWith(`${dir}/graders/`) && f.endsWith('.md')), 'the case has no graders');

    const script = /^\s+scaffold_script: (\S+)$/m.exec(spec)?.[1];
    if (!script) return;
    assert.ok(files.includes(`${dir}/${script}`), `${script} is missing`);
    for (const m of read(`${dir}/${script}`).matchAll(/"\$kit\/([^"]+)"/g)) {
      assert.ok(files.some((f) => f === m[1] || f.startsWith(`${m[1]}/`)), `${script} copies ${m[1]}, which does not exist`);
    }
  });
}
