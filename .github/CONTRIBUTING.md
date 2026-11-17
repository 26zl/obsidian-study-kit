# Contributing

Thank you for helping. The kit is used by students with their own notes on their own computers, so changes are judged first on safety, then on whether they help someone learn.

## Before you start

Open an issue for anything larger than a fix, so the direction can be agreed before you write it. For a security problem, follow [SECURITY.md](SECURITY.md) instead.

## Ground rules

- **Text only.** No scripts, hooks, MCP servers, installers, bundled plugins or plugin settings. The repository holds Markdown, JSON settings, `.base` and `.canvas` files, plus the tests. Plugins are recommended in `docs/plugins.md`, with the settings to choose, and students install them themselves.
- **Nothing pre-approved.** Skills do not set `allowed-tools`, and `.claude/settings.json` has no `allow` rules.
- **Network only where it is the job.** `plugin-review` reads the web, and `link-repo` and `git-sync` talk to GitHub. Each asks first, and a push always waits for a yes. Any other skill works offline.
- **Works everywhere.** No bash-only or PowerShell-only steps. File names are lowercase ASCII with hyphens, and folder names carry no number prefixes.
- **The student does the learning.** A skill that produces the answer, the summary or the essay for the student works against the kit's purpose.
- **No personal data** in examples, tests or documentation.

## Skills

- Follow the open Agent Skills format: `name` and `description` are required, and only `license`, `compatibility` and `metadata` may be added.
- Write the description so an agent knows when to use the skill: what it does, then the situations and phrases that should trigger it.
- Explain why each step matters. Agents follow reasons better than commands in capital letters.
- A claim about learning needs a reference that you have checked yourself. Add it to `docs/learning-principles.md`.
- Add the skill to the tables in `AGENTS.md`, `.github/README.md` and `docs/skills.md`. The tests check this.

## Tests

The tests need Node.js 22 or later and Git, and nothing else:

```
node --test ".dev/tests/*.test.mjs"
```

They check the skills' format, the vault's configuration, every internal link, file names across platforms and that no secret is committed.

Behaviour tests for the skills live in `.dev/evals/`, in the format `claude plugin eval` reads. Each case starts a real agent session on your own account, so they cost model usage. Run them when you change a skill's behaviour.

A quick check: one run per case, no comparison arm, and a spending cap.

```
claude plugin eval . --scaffold --allow-tools Write,Edit,Bash --runs 1 --ablation none --max-cost-usd 5
```

The full run: three runs per case, compared against an agent without the kit.

```
claude plugin eval . --scaffold --allow-tools Write,Edit,Bash
```

`--allow-tools` grants the gated tools that the cases list in `allowed_tools`: Write and Edit for most, Bash for `git-sync` and `link-repo`. Their scaffolds keep everything inside the eval's own folder, and `git-sync` gets a local stand-in for GitHub, so nothing goes online. `--case 'git-sync*'` runs a single case, `--model sonnet` runs on a cheaper model, and `--no-publish` keeps the report on your computer. The first run asks you to confirm that you trust the plugin.

## Working in this repository with an agent

`.claude/settings.json` is what students get, and it applies to you too while you work here. The agent's file tools cannot leave the repository and cannot edit the settings file, because an agent that can change its own rules can give itself more access. Use `/add-dir` when you need a folder outside the repository. To change a permission rule, use `/permissions` and save the rule to the project settings, `.claude/settings.json`, so it ships with the kit. For anything else in the file, edit it by hand.

## Pull requests

- One change per pull request.
- Describe how the change behaves for a student, not only what was edited.
- If a skill's behaviour changes, add a line under "Changed" in `docs/changelog.md`.

## Releasing

1. Set the new version in `.claude-plugin/plugin.json` and as a heading in `docs/changelog.md`. The tests check that these agree.
2. Run the tests and the behaviour tests.
3. Tag the commit `vX.Y.Z` and publish a GitHub release with the changelog entry.

## The banner

`.github/assets/banner.png` sits at the top of both README files and is also the repository's social preview, the picture shown when the link is shared. Its source is `banner.svg` in the same folder. After changing it, export the PNG at 1280 × 640 pixels and under 1 MB, and upload it again under Settings, General, Social preview, because GitHub does not read it from the repository. The crystal in it is the kit's own drawing: Obsidian's brand rules do not allow their logo to be edited or combined with other artwork.

By contributing you agree that your contribution is licensed under the MIT License.
