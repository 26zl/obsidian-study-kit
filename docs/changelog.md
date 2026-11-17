# Changelog

Versions follow semantic versioning. A change that alters how a skill behaves is listed under "Changed", so you can read it before updating.

## 0.1.0 (unreleased)

First version.

### Added

- Vault layout with plain folder names: `inbox`, `daily`, `courses`, `areas`, `repos`, `templates`, `attachments`, with templates and four Bases dashboards.
- Eighteen skills: `vault-setup`, `vault-adopt`, `new-course`, `source-note`, `tutor`, `exam-trainer`, `recall`, `brain-map`, `summary-sheet`, `study-plan`, `daily-plan`, `weekly-review`, `inbox-triage`, `assignment-coach`, `link-repo`, `git-sync`, `vault-check`, `plugin-review`.
- Linked repositories: existing GitHub repositories come into `repos/` as Git submodules, unchanged, and sync with the vault through `git-sync` or the Git plugin.
- Adoption of an existing vault: a folder map in `profile.md` that every skill follows, so students keep their own layout.
- A graph view coloured by note type, bookmarks for the home note, the profile, the inbox and AI drafts that still need checking, and slash commands turned on.
- A demo course, DEMO101, about evidence-based study techniques, with a concept map in `DEMO101.canvas`.
- A reviewed list of recommended plugins with their settings (`docs/plugins.md`), and a guide to agents inside Obsidian, Obsidian's own agent skills and MCP servers (`docs/mcp.md`).
- Conservative agent settings for Claude Code, and `AGENTS.md` for other agents.
- A study context for Norway in `docs/locales/no.md`: local terms, forms of assessment and where institutions publish their AI rules.
