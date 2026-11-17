# Getting started

## What you need

- **Obsidian 1.15.1 or later.** It runs on Windows, macOS, Linux, iOS and Android. Use at least this version, because it contains security fixes.
- **An AI agent that can work with files on your computer.** The kit is built and tested with Claude Code. Other agents are covered in [Using other agents](other-agents.md).
- **Git and a GitHub account**, optional and recommended. Git gives you history and a way back, GitHub keeps a copy off your computer, and together they let you link your existing repositories into the vault.

The vault itself needs none of this to be useful. The folders, templates, graph, self-test questions and dashboards work in plain Obsidian. The skills need an agent.

## 1. Get your own copy

On GitHub, choose **Use this template**, then **Create a new repository**, and make it **Private**. Your copy will hold your notes. Clone it to your computer.

Without GitHub: download the ZIP file and unpack it. Everything works, but you get no history and no easy updates.

Keep the folder out of other cloud-synced folders such as OneDrive, iCloud Drive or Dropbox. See [Sync and mobile](sync-and-mobile.md) for the two setups that work.

## 2. Open it in Obsidian

Choose **Open folder as vault** and pick the folder. Obsidian shows no trust prompt, because the kit ships no plugins. Open [the home note](../home.md), and press Ctrl+G (Cmd+G on a Mac) to see the graph.

Plugins are optional. When you want Git inside Obsidian, a brain view or the agent in a side panel, follow [Plugins](plugins.md).

## 3. Start your agent in the folder

With Claude Code, open a terminal in the vault folder and run `claude`. The first time, it asks whether you trust the folder. It is your own copy, and you can read what the kit asks of the agent in `AGENTS.md` and `.claude/settings.json` before you answer.

Then say:

> set up

The `vault-setup` skill takes it from there: your profile, the safety basics, Git and GitHub, your courses, the repositories you want to link and the plugins worth installing. You can stop at any point and continue later.

## 4. Try the demo course

`courses/DEMO101` is a small course about how to study. Try:

> test me on DEMO101

> what is due for recall?

> help me understand spacing

Then open `DEMO101.canvas` in the course folder to see a brain map, and say **brain map DEMO101** to make your own.

## 5. Add your first real source

Put a PDF or slide deck in `courses/<CODE>/sources/` and say:

> make a note from week-1-slides.pdf

You get one note with page references and self-test questions, marked as an AI draft until you have checked it.

## 6. Link the repositories you already have

If course work already lives on GitHub, bring it in without changing it:

> link https://github.com/you/your-course-repo

It appears under `repos/`, joins the graph, and keeps its own history on GitHub. See [Linked repos](linked-repos.md).

## Already have a vault?

You do not have to start over. Either copy your notes into your new copy of the kit, or install the skills into your existing vault as a Claude Code plugin:

```
claude plugin marketplace add 26zl/obsidian-study-kit
claude plugin install study-kit@obsidian-study-kit
```

Then say:

> adopt my vault

`vault-adopt` looks at your folders and Obsidian settings, proposes which of your folders is the inbox, the daily notes, the courses and so on, and records that folder map in `profile.md`. Every skill follows the map from then on. After you agree, it adds the kit's templates, dashboards and safety settings next to your notes. It moves and renames nothing, and it tells you how to undo what it added.

## A normal day

| When | Say | Skill |
|---|---|---|
| Morning | "plan my day" | `daily-plan` |
| Studying | "help me understand X" or "test me on X" | `tutor`, `exam-trainer` |
| Any spare ten minutes | "what is due?" | `recall` |
| Evening | "close the day", then "sync" | `daily-plan`, `git-sync` |
| Once a week | "weekly review" | `weekly-review` |

All of the skills are described in [Skills](skills.md).

## Updating the kit

New versions change how the agent behaves, so read the changes before you take them. In your vault folder:

```
git remote add kit https://github.com/26zl/obsidian-study-kit.git
git fetch kit --tags
git diff HEAD v0.2.0 -- .claude/skills AGENTS.md templates docs
```

Replace `v0.2.0` with the release you want. When you have read the diff and want the new skills:

```
git checkout v0.2.0 -- .claude/skills
```

This replaces the skill files with the release's versions, so anything you changed in them yourself is overwritten. Commit first. Your notes are not touched. [The changelog](changelog.md) lists what changed in each release.
