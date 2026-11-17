---
name: vault-adopt
description: Brings the kit into a vault the student already has, without moving, renaming or rewriting their notes. Looks at their folders, Obsidian settings and properties, proposes which existing folder plays each role (inbox, daily notes, courses, areas, repos, templates, attachments), records that folder map in profile.md so every skill follows it, and adds only the kit's own pieces after a yes. Use when the student already has an Obsidian vault and wants the kit in it, says adopt, import, migrate or "use my existing vault", has copied their old notes into the kit, or installed the skills as a plugin into an existing vault.
license: MIT
---

# Vault adopt

Many students arrive with a vault they have used for years. Moving their notes into the kit's folders would break links and habits, so this skill does the opposite: the kit learns their layout. Nothing they wrote is moved, renamed or rewritten, and the skills follow a folder map instead of the default folders.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`, or the language the student writes in.

## 1. Look, without changing anything

Read, then summarise in plain words:

- The top two levels of folders and how many notes each holds. Skip dot-folders and never open `private/`.
- Obsidian's settings, if `.obsidian/` exists: the daily notes folder and date format (`daily-notes.json`), the templates folder (`templates.json`), where attachments and new notes go (`app.json`), and the installed community plugins (`community-plugins.json`).
- The structure, if there is one: PARA (Projects, Areas, Resources, Archive), numbered folders in Johnny Decimal style, maps of content (notes that mostly list links), Zettelkasten (notes named by date or number), or one folder per course.
- Properties already in use, especially `type`, `tags`, `course` and dates, so the kit's properties do not clash with the student's.
- Folders that look like courses: course codes such as `TDT4100`, or subject names.
- Whether the vault is a Git repository, and which of the kit's files are present: `AGENTS.md`, `CLAUDE.md`, `profile.md`, `.claude/settings.json`, `.claude/skills/`.

Flag what needs care, without fixing it: a plugin that runs commands or opens a local server (suggest `plugin-review`), passwords or personal data noticed in passing (say where, never the value), and files over 5 MB.

## 2. Propose a folder map

One row per role. Use an existing folder wherever one fits, and propose a new folder with a plain name only where nothing does. A role can stay empty if the student does not want it.

| Role | Kit default | In this vault |
|---|---|---|
| Inbox | `inbox/` | |
| Daily notes | `daily/` | the folder in Obsidian's daily notes settings |
| Courses | `courses/` | |
| Areas | `areas/` | |
| Linked repos | `repos/` | |
| Templates | `templates/` | the folder in Obsidian's templates settings |
| Attachments | `attachments/` | the folder in Obsidian's files settings |

Give one line of reasoning per row, and ask the student to correct the table before anything is written.

## 3. Record it

Write the agreed table under the heading `## Folder map` in `profile.md`. If there is no `profile.md`, create it from the kit's version and leave the rest for `vault-setup`. From then on every skill uses these folders, as `AGENTS.md` says.

If the daily notes or templates folder in the map differs from Obsidian's own settings, offer to change the setting, so that new daily notes and templates land where the map says.

## 4. Add the kit's own pieces

Show the list, and add it after a yes. Never overwrite: if a name is taken, propose another and ask.

- `AGENTS.md` and `CLAUDE.md` at the vault root, if missing. If the vault has its own, show both and ask how to combine them.
- `.claude/settings.json`, if missing. It holds the permission rules described in `docs/security.md`, and Claude Code asks the student before it is written. If the vault has its own, show which of the kit's rules it lacks.
- The kit's templates in a subfolder `study-kit/` of the templates folder, so they do not mix with the student's own.
- The dashboards `courses.base`, `topics.base` and `assignments.base` in the courses folder, and `repos.base` in the repos folder. In each, change `file.inFolder("templates")` to the mapped templates folder, so templates stay out of the tables.
- The home note, as `home.md`, or `study-home.md` if `home.md` is taken.
- If the vault uses Git: the kit's protective lines in `.gitignore`, with the course material paths pointed at the mapped courses folder.

Leave everything else in `.obsidian/` alone. Offer the kit's graph colours as a separate step, because they change the student's own graph view.

When the kit came in as a Claude Code plugin, its files are in the plugin's own folder, three levels above the folder this skill is in. Copy them from there.

## 5. Connect what is already there

One course at a time, and only after a yes:

- For each course folder, offer a course home note `<CODE>.md` from the course template, inside the existing folder. The kit's subfolders, such as `topics/` and `progress/`, appear when a skill first needs them.
- Offer to mark notes that are concepts the student must master as topics, so `recall` can schedule them. Show the list of notes, and after a yes add `type: topic`, `course` and the empty review properties to their frontmatter. Change nothing else in those notes.

## 6. Hand over

Summarise what was found, what was added and where, and what stayed exactly as it was. Say how to undo it: delete the files listed as added, and the `## Folder map` section in `profile.md`. Then offer `vault-setup` for what adoption does not cover: profile, safety, backup, plugins and phone.
