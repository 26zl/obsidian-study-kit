# Sync and mobile

The vault is ordinary files, so it can be read and written on a phone or tablet. The skills run where your agent runs, which is your computer. This page covers how the vault reaches your other devices and what works there.

Facts about Obsidian's services were checked on 2026-11-17. Prices and limits change, so confirm them on obsidian.md.

## Choosing how to sync

Pick one of two setups. In both, each tool has one job, so they never fight over the same file.

| Setup | Computers | Phone | Cost |
|---|---|---|---|
| **Git only** | Git and GitHub on every computer, through the Git plugin or by saying **sync** to your agent | Not covered | Free |
| **Obsidian Sync, plus Git for history** | Obsidian Sync on every device. Git and GitHub on one main computer, for history, backup and linked repos | Obsidian Sync | Paid. Students get a discount |

Avoid two tools moving the same files between the same computers: Git pulling on several computers while Obsidian Sync also runs on them, or the vault inside iCloud Drive, OneDrive or Dropbox on top of either. That is how conflict copies and lost edits happen.

The Git plugin's phone mode is experimental and cannot handle linked repos, so the kit does not rely on Git on phones.

### Obsidian Sync

End-to-end encryption is available when you create the remote vault. The Standard plan has one vault, 1 GB and a 5 MB limit per file. Plus has ten vaults, 10 GB or more and 200 MB per file. With the Standard plan, files over 5 MB do not sync, so large slide decks stay on the computer unless you compress them. Word and other Office files sync only when "Sync all other types" is turned on.

### Git and GitHub

Make the repository on GitHub **private**: it holds your notes. Then let the Git plugin commit and sync every few minutes (settings in [[plugins#Git settings]]), or say **sync** to your agent when you finish a session. Repositories you have linked into `repos/` are synced in the same round. See [[linked-repos]].

## What reaches the phone

Obsidian Sync skips every file and folder whose name starts with a dot, except `.obsidian`. So:

| Synced | Not synced |
|---|---|
| Your notes, sources, templates, dashboards, `AGENTS.md`, `docs/`, and the files of linked repos | `.claude/` (skills and agent settings), `.git/` and the `.git` link in each linked repo, `.gitignore`, `.github/`, `.dev/` |

That is the right split. Notes go everywhere. Agent configuration and Git stay on the computer, and Git carries them between computers.

## Setting up the phone

1. Install Obsidian from the App Store or Google Play.
2. Sign in, connect to your remote vault and let the first sync finish.
3. Check that new notes land in `inbox`. The kit already sets this, and it follows the vault when settings sync.
4. Set up capture:
   - iOS: the Share Sheet sends text and links to Obsidian. Quick Capture from the Lock Screen and widgets needs a recent iOS version.
   - Android: use the widgets and app shortcuts.
5. Leave community plugin sync off.

## What works on a phone

- Reading and editing notes, daily notes and linked repos included.
- The dashboards on [the home note](../home.md). Bases is a core feature and works on mobile.
- The graph view, coloured the same way as on the computer.
- Self-test questions. They are folded callouts: tap to reveal the answer.
- Capturing into the inbox.

## What stays on the computer

- The skills. Your agent runs on the computer. Some agents let you steer a session on your computer from a phone app, and the files still stay on the computer.
- Git, and with it pushing to GitHub.
- Anything in a dot-folder.

## Avoiding conflicts

- Let sync finish on the computer before you start an agent session, and again before you pick up the phone.
- The skills mostly add: new notes and new log entries. They do not rewrite notes you wrote. That keeps conflicts rare.
- If two devices changed the same note, Obsidian Sync either merges the changes or keeps a conflict copy, depending on its conflict setting. Git stops and asks, and `git-sync` walks you through it. Check the result after a busy day.

## Sync is not backup

Sync copies your mistakes to every device. Version history helps, and so does File recovery on each device, but keep an independent copy: Git with GitHub, or a copy of the folder on another disk. See [Security and privacy](security.md).
