import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readJson } from './helpers.mjs';

const settings = readJson('.claude/settings.json');
const { permissions, sandbox } = settings;

test('nothing is pre-approved and prompts cannot be skipped', () => {
  assert.deepEqual(permissions.allow ?? [], [], 'a shared template pre-approves nothing');
  assert.equal(permissions.defaultMode, 'default');
  assert.equal(permissions.disableBypassPermissionsMode, 'disable');
  assert.equal(permissions.additionalDirectories, undefined);
});

test('sensitive paths are denied', () => {
  for (const rule of [
    'Read(./private/**)',
    'Edit(./private/**)',
    'Read(./.env)',
    'Read(./.env.*)',
    'Read(./**/*.pem)',
    'Read(./**/*.key)',
    'Edit(./.obsidian/plugins/**)',
    'Edit(./.obsidian/community-plugins.json)',
    'Edit(./.claude/settings.json)',
    'Edit(./.claude/settings.local.json)',
  ]) {
    assert.ok(permissions.deny.includes(rule), `missing deny rule ${rule}`);
  }
  for (const rule of permissions.deny) {
    assert.doesNotMatch(rule, /^Write\(/, `${rule}: Write(...) rules do not match, use Edit(...)`);
  }
});

test('agents cannot drive the Obsidian command line', () => {
  // It can install and enable plugins, turn off Restricted mode and run code inside the app.
  for (const rule of ['Bash(obsidian *)', 'PowerShell(obsidian *)']) {
    assert.ok(permissions.deny.includes(rule), `missing deny rule ${rule}`);
  }
});

test('outbound commands always ask', () => {
  for (const rule of ['Bash(git push *)', 'PowerShell(git push *)', 'Bash(gh *)', 'PowerShell(gh *)', 'Bash(curl *)']) {
    assert.ok(permissions.ask.includes(rule), `missing ask rule ${rule}`);
  }
});

test('the sandbox is on where it exists and never blocks start-up elsewhere', () => {
  assert.equal(sandbox.enabled, true);
  assert.notEqual(sandbox.failIfUnavailable, true, 'native Windows has no sandbox and must still start');
  assert.equal(sandbox.autoAllowBashIfSandboxed, false, 'sandboxed commands still ask');
});

test('nothing runs on its own', () => {
  assert.equal(settings.hooks, undefined, 'the kit ships no hooks');
  assert.equal(settings.enableAllProjectMcpServers, undefined);
  assert.equal(settings.enabledMcpjsonServers, undefined);
  assert.equal(settings.disableSkillShellExecution, true);
  assert.equal(settings.env, undefined);
});
