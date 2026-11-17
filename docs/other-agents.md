# Using other agents

The kit is built and tested with Claude Code. The skills are written in the open Agent Skills format and the instructions are in `AGENTS.md`, so other agents can use them too. Apart from Claude Code, nothing on this page has been tested by the kit's maintainers. The table reflects each vendor's documentation as of 2026-11-15, and reports of what works are welcome.

## How an agent finds the kit

Two files do the work:

- `AGENTS.md` holds the rules and a table of the skills. Most agents read it on their own.
- `.claude/skills/<name>/SKILL.md` holds each skill. Many agents load this folder on their own. An agent that does not can still follow a skill, because `AGENTS.md` tells it where the files are.

| Agent | Reads `AGENTS.md` | Loads `.claude/skills/` |
|---|---|---|
| Claude Code | Through `CLAUDE.md`, which imports it | Yes |
| Cursor | Yes | Yes |
| GitHub Copilot (CLI and agent mode) | Yes | Yes |
| OpenCode | Yes | Yes |
| Goose | Yes | Yes |
| Amp | Yes | Yes |
| Devin Desktop (formerly Windsurf) | Yes | Yes |
| OpenAI Codex CLI | Yes | No. It looks in `.agents/skills/` |
| Gemini CLI | Yes, through the kit's `.gemini/settings.json` | No. It looks in `.gemini/skills/` or `.agents/skills/` |
| Zed | Yes | No. It looks in `.agents/skills/` |

## Codex, Gemini CLI and Zed

These three work without any setup: they read `AGENTS.md` and open the skill files when a task matches. If you want them to list the skills natively, link the folder they look in to the one the kit uses. Run this once in the vault folder.

macOS and Linux:

```
mkdir -p .agents
ln -s ../.claude/skills .agents/skills
```

Windows, in Command Prompt:

```
mkdir .agents
mklink /J .agents\skills .claude\skills
```

The kit's `.gitignore` already keeps `.agents/` out of Git.

## Inside Obsidian

Two plugins run an agent in a side panel instead of a terminal: Claudian runs Claude Code, Codex or OpenCode, and Agent Client runs any agent that speaks the Agent Client Protocol, Gemini CLI included. Both start the agent in the vault folder, so it picks up `AGENTS.md`, the skills and its own permission settings as it would in a terminal. Both are desktop only. See [Plugins](plugins.md) for what they can reach.

## Permissions

`.claude/settings.json` configures Claude Code only. Every agent has its own way of limiting what it may read, write and run. Set it up before you let another agent work in the vault, and apply the same principles: ask before commands, no access outside the vault, nothing sent anywhere without a prompt. See [Security and privacy](security.md).

## Installing only the skills

If you already have a vault and want the skills without the template, Claude Code can install them as a plugin:

```
claude plugin marketplace add 26zl/obsidian-study-kit
claude plugin install study-kit@obsidian-study-kit
```

Then say **adopt my vault**: `vault-adopt` maps your folders to the kit's roles and adds the kit's files next to your notes, without moving any. The skills are called with a prefix, for example `/study-kit:tutor`. Do not combine this with the template in the same vault, or every skill appears twice.
