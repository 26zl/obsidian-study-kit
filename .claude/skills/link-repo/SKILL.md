---
name: link-repo
description: Links an existing GitHub repository into the vault under repos/ as a Git submodule, without changing the repository, so its notes appear in Obsidian, search and the graph while it keeps its own history and remote on GitHub. Also re-attaches, updates and unlinks linked repositories. Use when the student wants to add, connect, import, link or include a GitHub repo in the vault or in Obsidian (a course repo, lab code, shared notes, another vault), pastes a github.com link, or asks how to get a repository into Obsidian.
license: MIT
---

# Link a repository

A linked repository is another Git repository that lives inside the vault as a folder, `repos/<name>/`. Obsidian reads its files like any other notes, so they show up in search, links and the graph. The repository itself is not adapted in any way: it keeps its own history, its own GitHub remote and its own collaborators. The vault only records which repository it is and which commit it is at. Git calls this a submodule.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

This skill talks to GitHub. Show each command that uses the network before running it, and run it only after a yes.

## 1. Check the ground

- Git is installed: `git --version`.
- The vault is a Git repository with at least one commit: `git log -1 --oneline`. If not, stop and offer the `backup` step of `vault-setup`.
- The repository is not linked already: look for it in `.gitmodules`, if that file exists.

## 2. Collect the facts

| What | How |
|---|---|
| Address | Accept a browser link, `owner/name` or a clone URL, and use the clone URL `https://github.com/<owner>/<name>.git`. Use the `git@github.com:` form only if the student already uses SSH keys |
| Name | The folder under `repos/`: the repository name in lowercase with hyphens. Ask if it collides with an existing folder or note |
| Branch | The branch to follow. Ask, or read it from `git ls-remote --symref <url> HEAD` (network) |
| Course | Optional: the course code it belongs to |

Private repositories work when the student can already clone them on this computer. If Git reports an authentication error or waits for a password, stop. The student signs in once, outside the agent, following GitHub's own instructions: Git Credential Manager for HTTPS, `gh auth login` if they use the GitHub CLI, or an SSH key. Never ask for a token, never write one into a file, and never put one in a URL. If the student pastes one anyway, do not repeat it or use it, and suggest they revoke it on GitHub, because it has now been sent to the AI provider.

Commands that contact GitHub need the student's sign-in, and the kit's Claude Code settings keep it out of the sandbox on purpose: `~/.ssh` and the GitHub CLI's login are hidden from sandboxed commands. So run `git ls-remote` and `git submodule add` outside the sandbox from the start, which makes Claude Code ask the student once for each. Everything else stays in the sandbox.

Say so before linking when:

- the repository is large. Over a few hundred megabytes, cloning and syncing are slow, and the phone gets every file through Obsidian Sync;
- it holds material that must not be shared or synced to a phone, such as exam papers or other people's personal data;
- the student does not have write access and wants to edit it. They can still read and link it, but pushing needs permission or a fork.

## 3. Link it

Show the command, then run it after a yes:

1. `git submodule add -b <branch> <url> repos/<name>` clones the repository into `repos/<name>` and records it in `.gitmodules`.
2. `git -C repos/<name> status --short --branch` confirms that it is on `<branch>`.

Then create the card note `repos/<name>.md` from `templates/repo.md`, with `type: repo`, `url` (the browser address, never a URL with credentials in it), `branch`, and `course` if there is one. Under "What it is", write one or two lines based on the repository's README, and say that is where they came from. Leave "My notes" empty for the student. If a course was named, add a link to the card under "Links" on the course home.

Finally, show the commit and make it after a yes: `git add .gitmodules repos/<name> repos/<name>.md`, then `git commit -m "Link <name>"`.

Change nothing inside `repos/<name>/` in this skill. The point is that the repository comes in as it is.

## 4. Explain how it syncs

In plain words, briefly:

- Edits made in Obsidian to files under `repos/<name>/` are edits to that repository.
- `git-sync`, or the Git plugin in Obsidian with submodule updates turned on, commits and pushes those edits to the repository's own GitHub remote, then records the new state in the vault.
- On another computer: clone the vault with `git clone --recurse-submodules <vault-url>`, or run `git submodule update --init` in an existing clone. The linked repository then sits on a detached commit, which is normal, and `git-sync` puts it back on its branch.
- On a phone, Obsidian Sync carries the files but not Git. Edits made there are committed the next time the computer syncs.

## Other requests

**Bring a linked repository up to date.** `git -C repos/<name> pull`, then commit the new state in the vault. `git-sync` does this for every linked repository at once.

**It says "detached HEAD".** `git -C repos/<name> switch <branch>`, then `git -C repos/<name> pull`. If the switch reports local changes, stop and show them.

**Unlink.** This removes the folder from the vault, while the repository on GitHub stays as it is. Show the steps and let the student approve each one:

1. `git submodule deinit -f repos/<name>`
2. `git rm -f repos/<name>`
3. `git commit -m "Unlink <name>"`

Git keeps a copy of the clone under `.git/modules/`. Tell the student it can be deleted by hand once they are sure, and leave the card note for them to keep or delete.

**The repository is an Obsidian vault itself.** Its own `.obsidian` folder is ignored by this vault, which is fine. Its templates may show up in search and in the graph: mention it.
