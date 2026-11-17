---
name: git-sync
description: Syncs the vault and every linked repository in repos/ with GitHub in one routine. Shows what changed, commits with a clear message after the student agrees, pulls the latest changes, pushes only after a yes, puts linked repositories back on their branch, and stops at conflicts with an explanation in plain words. Use when the student says sync, save to GitHub, back up, commit, push, pull, update my repos, get my notes onto another computer, or asks why Git is complaining.
license: MIT
---

# Git sync

One routine that keeps the vault and its linked repositories in step with GitHub. It never rewrites history and never forces anything, so the worst that can happen is a stop with an explanation.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`. Pulling and pushing use the network and the student's GitHub sign-in: show each command before running it, and a push always waits for the student's yes.

The kit's Claude Code settings keep the sign-in out of the sandbox on purpose, so run `git pull`, `git push` and `git fetch` outside the sandbox from the start. Claude Code then asks the student once for each, instead of the command failing first. Read-only commands such as `git status` stay inside.

If the student has the Git plugin in Obsidian set to commit and sync automatically, mention once that it does the same job, and that two syncs at the same moment can collide. Suggest pausing the plugin while this runs.

## 1. Look

Start with read-only commands, and summarise what they show in plain words:

- `git status --short --branch` in the vault: what changed, and whether it is ahead of or behind GitHub.
- `git remote -v`. If there is no remote, stop and offer the GitHub part of the `backup` step in `vault-setup`.
- `git submodule status`, then `git -C repos/<name> status --short --branch` for each linked repository.

Check the list of changes before committing anything:

- Nothing under `private/`, no `.env` or key files, and no course material under `sources/`. The kit's `.gitignore` keeps these out. If one shows up anyway, stop and explain.
- No file over 50 MB. GitHub warns at 50 MB and refuses files over 100 MB.
- No large number of deleted files the student did not expect. If there are, stop and ask.

## 2. Linked repositories first

The vault records which commit each linked repository is at, so those repositories are synced first. That way the vault only ever points at commits that exist on GitHub.

For each folder in `repos/` that `.gitmodules` lists:

1. If it is on a detached commit, put it back on its branch: the `branch` in `.gitmodules`, else the one on its card note, else `main`. Run `git -C repos/<name> switch <branch>`. If Git refuses because of local changes, stop and show them.
2. If it has changes, show them and propose a commit message. After a yes: `git -C repos/<name> add -A`, then `git -C repos/<name> commit -m "<message>"`.
3. `git -C repos/<name> pull --no-rebase` brings in what changed on GitHub.
4. If it is ahead of GitHub, ask, then `git -C repos/<name> push`. If the push is refused because the student has no write access, say so. The commit stays on this computer and nothing is lost.

## 3. Then the vault

1. Show the changes and propose one commit message that says what happened, such as "Recall in DEMO101, two new source notes". A linked repository that moved shows up as a changed folder under `repos/`: that is the vault recording its new commit. After a yes: `git add -A`, then `git commit -m "<message>"`.
2. `git pull --no-rebase`.
3. Ask, then `git push`.

## 4. Report

A short table with one row per repository: committed, pulled, pushed, or what is left. End with anything the student should do themselves.

## When something goes wrong

Never use `--force`, `reset --hard`, `clean`, `rebase`, `restore .` or `checkout -- .`, and never delete a branch. When a step fails, stop, explain what Git said in plain words, and suggest the next step.

- **A merge conflict in a note.** List the files. Show both versions and let the student choose or combine them. Write the result only after a yes, then `git add <file>` and `git commit`.
- **A conflict on a `repos/<name>` folder.** Two computers moved the same linked repository. Sync that repository as in section 2, then `git add repos/<name>` and commit.
- **The push was rejected because GitHub has newer commits.** Pull, then push again.
- **Authentication failed, or Git waits for a password.** First check that the command ran outside the sandbox, as described above. If it did, the student has not signed in on this computer yet. They do it themselves, following GitHub's own instructions: Git Credential Manager, `gh auth login` or an SSH key. The Git plugin in Obsidian uses the same sign-in.
- **A token in the chat.** Never ask for one, and never write one into a file, a command or a URL. If the student pastes one, do not repeat it or use it, and suggest they revoke it on GitHub, because it has now been sent to the AI provider.
- **"Detached HEAD" in a linked repository.** Normal after cloning on a new computer. Section 2, step 1 fixes it.
- **Obsidian Sync is also on.** Let Sync finish before syncing with Git, so the two never work on the same file at once.
