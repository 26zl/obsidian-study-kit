---
name: vault-setup
description: First-time setup and personalisation of the study vault. Walks the student through their profile, the safety basics, Git and GitHub backup, courses, linked GitHub repositories, recommended Obsidian plugins, optional life areas, templates in their own language and phone setup, one step at a time, and can be resumed at any point. Use when the student says "set up", "get started", "configure my vault" or "continue setup", when profile.md is still empty, or when they ask what to do first.
license: MIT
---

# Vault setup

One conversation that takes a fresh copy of the kit to a vault that fits this student. Many students have never used a terminal or Git, so use plain words, ask one or two questions at a time, and say what you are about to change before you change it.

Follow the vault rules in `AGENTS.md`. Start in the language the student writes in, and switch to the profile's language once it is set.

If the folder holds notes from before the kit, such as folders the kit did not create, run `vault-adopt` first. It maps the student's own layout, so the steps below can follow it instead of the kit's default folders.

## Resuming

`profile.md` has a `setup_done` list. Read it first, skip the steps listed there, and add a step's name when it is finished. The student may skip any step. A skipped step is not added, so it is offered again next time. The demo step is added only once the demo course is closed or gone.

Steps, in order: `profile`, `safety`, `backup`, `courses`, `repos`, `plugins`, `areas`, `templates`, `context`, `phone`, `demo`.

## profile

Fill in the properties in `profile.md`: `language`, `institution`, `field`, `term`. Then the sections "How I study" (when, how long, what has worked) and "Devices".

Nothing sensitive goes here: no identity number, address or health details. The profile is read at the start of every session.

## safety

Explain these five points in the student's language, briefly, and ask whether anything is unclear. The full version is in `docs/security.md`.

1. The AI can read and change files in this folder. It runs a command on the computer only after the student approves it.
2. Whatever the student asks about is sent to the AI provider. Notes that are never opened or mentioned are not sent.
3. Some things never go in the vault: passwords, identity numbers, bank details, patient or client information, other people's personal data, and exam material that must not be shared.
4. Sensitive documents the student still wants close by go in a folder named `private/`, which agents are told not to read and Git ignores. Offer to create it. Say plainly that this is a rule the agent follows, not a lock.
5. Community plugins can read everything on the computer. The kit recommends a few that were checked, in `docs/plugins.md`. Anything else goes through `plugin-review` first, and only Obsidian's own plugin browser is used to install.

## backup

Before an agent writes much, there must be a way back. Git gives every change a snapshot, and GitHub keeps a copy off the computer.

- If the folder is not a Git repository, explain what Git does in two sentences and offer to start one with `git init`. Run it only after a yes.
- If there is no first commit, offer to make one, and make it only after a yes.
- Ask whether the vault has a home on GitHub. If not, explain that it should be a **private** repository, because it will hold their notes. They can create it on github.com with **New repository**, or with the GitHub CLI if they have it. Then offer to add it with `git remote add origin <url>`. The first push happens through `git-sync`, after a yes.
- If they do not want Git, point to what Obsidian has built in: File recovery (Settings, Core plugins) keeps snapshots on the device, and Obsidian Sync keeps version history. Suggest a copy of the folder to another disk now and then.

Then do a restore drill together: change one line in a scratch note, and bring the old version back with File recovery or `git restore`. A backup the student has never restored from is a hope, not a backup.

## courses

Run `new-course` for each course this term.

## repos

Ask whether they already keep course work in GitHub repositories they want to see in Obsidian: a course repo, lab code, shared notes. Explain that the kit links a repository in as it is, under `repos/`, and that it stays its own repository on GitHub. Run `link-repo` for each one they name. This step needs Git and a first commit, so do `backup` first.

## plugins

The agent cannot install plugins, and should not. Walk the student through `docs/plugins.md`:

1. In Obsidian: Settings, Community plugins, **Turn on community plugins**.
2. **Git**, if the vault is on GitHub and this is a computer. Give the settings from the Git section of `docs/plugins.md`, including submodule updates when `repos/` holds linked repositories.
3. Optional, ask before suggesting each: a graph plugin for the brain view, and an AI plugin that runs the agent inside Obsidian. Say what each one can reach, as the table in `docs/plugins.md` does.

If the student uses Claude Code, mention Obsidian's official agent skills, which teach an agent the details of Bases, Canvas and Obsidian Markdown. The install commands are in `docs/mcp.md`. The student runs them, not the agent.

## areas

Ask which parts of life outside the courses they want a place for: work, money, health and training, projects. For each, create `areas/<name>/` with a short index note. Remind them that documents with sensitive details belong in `private/` or outside the vault.

## templates

If the profile language is not English, offer to translate the headings and helper text in `templates/`. Keep property names, property values and `{{placeholders}}` exactly as they are. Show what will change, and apply it after a yes.

## context

If `docs/locales/` has a file for the student's country, set `study_context` in the profile to its path and say in two sentences what it adds: local terms, grading, and where the AI rules are published.

## phone

The agent cannot do this step. Give the student the short checklist from `docs/sync-and-mobile.md`: choose how the vault reaches the phone, open it there, and set quick capture to land in `inbox`. Ask them to say when it is done.

## demo

`courses/DEMO101/` is a small sample course about how to study. Suggest one round of `exam-trainer` on it to see how the kit works, and opening `DEMO101.canvas` and the graph view (Ctrl or Cmd + G) to see the brain map. When the student is finished with it, set `status: done` on its home note so it leaves the dashboards, and tell them they can delete the folder in Obsidian whenever they like.

## Finish

Summarise what was set up and what was skipped, and name the first thing to try with real material: `source-note` on a reading from this week.
