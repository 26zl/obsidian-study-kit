---
name: vault-check
description: Read-only health and safety check of the vault. Finds broken links, notes missing the properties the dashboards need, files too large to sync, possible secrets and personal data, risky plugin state and things Git would publish by mistake. Reports findings without changing anything. Use when the student asks to check, audit, clean or validate the vault, when a dashboard looks wrong, before making a repository public or sharing the vault, or as a monthly routine.
license: MIT
---

# Vault check

A check the student can run at any time without worrying about what it will do. It reads, it reports, and it changes nothing. Fixes are proposed and applied one by one, after a yes.

Follow the vault rules in `AGENTS.md`, including the folder map in `profile.md` if there is one. Speak the language set in `profile.md`. Do not read `private/`. Only note whether it exists and whether Git ignores it.

Never print a secret. Report the file, the line, the kind of secret and at most its first four characters.

## Checks

**1. Links.** Wikilinks, Markdown links and embeds that point to a note or file that does not exist. Skip code blocks and the placeholders in `templates/`. Report broken links inside `repos/` separately: those files belong to another repository, so the fix belongs there.

**2. Properties.** For each note with a `type`: required properties missing for that type (the table in `AGENTS.md`), values outside the allowed set (`status`, `ai_policy`), dates not written `YYYY-MM-DD`, and notes whose `course` has no course home.

**3. Reviews.** Topics more than 14 days overdue for review. Courses with an exam in the next 14 days that still have topics never reviewed.

**4. Sync and file names.**
- Files over 5 MB, which the smallest Obsidian Sync plan skips, and over 200 MB.
- Names that break on some systems: the characters `\ / : * ? " < > |`, a trailing space or dot, two names that differ only in upper and lower case, and paths longer than about 180 characters.

**5. Sensitive content.** Search the notes for:
- private keys (`-----BEGIN` followed by `PRIVATE KEY-----`);
- access tokens with well-known prefixes, such as `sk-`, `ghp_`, `gho_`, `github_pat_`, `AKIA`, `AIza`, `xoxb-`;
- lines where `password`, `passord`, `secret` or `token` is followed by a value;
- digit runs shaped like identity numbers or payment cards;
- names together with health or client details, in fields where that applies.

For a real secret, the advice is always the same: remove it, and if the vault has ever been pushed or synced, treat the secret as exposed and change it at the service that issued it.

**6. Plugins.** If `.obsidian/plugins/` exists, list each plugin with its version from `manifest.json`, and note whether `docs/plugins.md` lists it. Any other plugin should have been through `plugin-review`. Flag any plugin that runs shell commands or opens a local server.

**7. Git.** Ask before running anything, and use read-only commands only: `git status --porcelain`, `git ls-files`, `git remote -v`, `git log -1`, `git submodule status`. Report:
- tracked files that should not be: anything under `private/`, `.env` files, key files, course material under `sources/`;
- whether `.gitignore` still contains the kit's protective lines;
- how long ago the last commit was;
- the remote's address, with a reminder to confirm on the hosting site that the repository is private. This check cannot see that.

**8. Linked repositories.** For each entry in `.gitmodules`: whether its folder under `repos/` exists and is checked out, whether it is on a branch or a detached commit (`git -C repos/<name> status --short --branch`), uncommitted changes, and whether a card note `repos/<name>.md` exists. A detached commit is the normal state right after cloning on a new computer. `git-sync` puts it back on its branch.

**9. Kit.** `AGENTS.md` and `.claude/settings.json` exist, the settings still contain deny rules, and each folder in `.claude/skills/` holds a `SKILL.md` whose `name` matches the folder.

## Report

Group the findings by how soon they need attention:

- **Fix now**: secrets, sensitive data, tracked private files.
- **Should fix**: broken links, missing properties, files that will not sync.
- **Good to know**: overdue reviews, old commits, linked repositories that are behind or detached, plugin reminders.

For each finding give what it is, where it is (file and line), why it matters in one sentence, and the suggested fix. End with the counts and a line saying that nothing was changed.
