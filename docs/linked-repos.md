# Linked repos

Bring a GitHub repository into the vault without changing it: a course repo, lab code, shared notes, even another Obsidian vault. Its notes show up in Obsidian like your own, in search, in links and in the graph. It stays its own repository with its own history on GitHub, and you keep using it there as before.

## How it works

The repository becomes a Git submodule: a folder, `repos/<name>/`, that holds a full clone of it. Your vault records only which repository it is and which commit it is at. Nothing is added to the repository itself.

```
your vault (a private repository on GitHub)
├── courses/
├── ...
└── repos/
    ├── my-course-repo/      the course repo, still its own repository on GitHub
    ├── my-course-repo.md    a card note in the vault: what it is, links, your notes
    └── repos.base           the "Linked repos" table on the home note
```

## Link one

Say to your agent, with the repository's address:

> link https://github.com/owner/my-course-repo

`link-repo` checks that the vault is ready, shows each command before running it, clones the repository into `repos/`, writes the card note and commits the link. By hand, the core of it is:

```
git submodule add -b main https://github.com/owner/my-course-repo.git repos/my-course-repo
git commit -m "Link my-course-repo"
```

## Private repositories

Linked repos do not have to be public. A private repository works exactly like a public one, as long as Git on your computer is signed in to an account that has access.

- **Sign in once per computer**, with GitHub's own tools: Git Credential Manager, `gh auth login` followed by `gh auth setup-git`, or an SSH key. One sign-in covers your vault and every repo you link. Never paste a token into a note, a setting, an address or the chat.
- **The vault stores no secrets.** `.gitmodules` holds each repo's address and branch, and the vault records its commit. Nothing else.
- **Your phone needs no access.** Obsidian Sync brings the files.
- **The agent asks before every pull and push.** Those commands need your sign-in, which the kit's settings hide from everything else the agent runs. So `git-sync` and `link-repo` run them outside the sandbox, and Claude Code asks you once for each. The Git plugin in Obsidian syncs without asking.
- **Other people need their own access.** Someone who clones your vault without access to a private repo gets an empty folder for it. That is also why the public template links no repositories.
- **A public vault reveals the address.** If your vault is public and a linked repo private, anyone can see the repo's name and address in `.gitmodules`, but not its contents.
- **University organisations** sometimes require single sign-on. If GitHub refuses access to an organisation's repo although you are a member, authorise your token or SSH key for that organisation in your GitHub settings.

## Keep it in sync

| Where | How |
|---|---|
| In Obsidian, on a computer | The Git plugin with **Update submodules** on. Its commit-and-sync commits and pushes changes in every linked repo, then in the vault. See [[plugins#Git settings]] |
| With your agent | Say **sync**. `git-sync` goes through each linked repo first, then the vault, and asks before every push |
| In a terminal | Commit and push inside `repos/<name>` as in any repository, then commit the vault so it records the new commit |
| On a phone | Obsidian Sync carries the files but not Git. Edits made on the phone are committed the next time a computer syncs |

Linked repos are pushed before the vault, so the vault never points at a commit that exists only on your computer. `git-sync` and the Git plugin both work in that order.

## On a new computer

```
git clone --recurse-submodules https://github.com/you/your-vault.git
```

In a clone you already have, run `git submodule update --init`. Each linked repo then sits on a fixed commit, which Git calls a detached HEAD. That is normal: say **sync** once, and `git-sync` puts each one back on its branch.

## Unlink one

Say **unlink my-course-repo**. The agent shows the steps and runs each one after a yes:

```
git submodule deinit -f repos/my-course-repo
git rm -f repos/my-course-repo
git commit -m "Unlink my-course-repo"
```

The repository on GitHub is not touched. Git keeps a spare copy under `.git/modules/`, which you can delete by hand.

## Good to know

- **Edits are real.** A change under `repos/<name>/` is a change to that repository, and pushing publishes it there. Renaming a note in Obsidian also updates links to it inside linked repos. To only read a repository someone else owns, do not push to it, or fork it first.
- **What you link reaches your phone** if you use Obsidian Sync. Leave out repositories with exam papers, personal data or very large files.
- **Code repositories are fine.** Obsidian shows Markdown, canvases, images and PDFs, and hides code files unless you turn on "Detect all file extensions".
- **Another Obsidian vault** can be linked too. Its own `.obsidian` settings are ignored, and its notes join your graph.
- **Links by name** such as `[[README]]` can be ambiguous when several repositories have a file with that name. Add the folder to be sure: `[[repos/my-course-repo/README]]`.
