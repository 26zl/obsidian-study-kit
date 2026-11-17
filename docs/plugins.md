# Plugins

The vault works without community plugins. Bases, Templates, Daily notes, Properties, Canvas and the graph view are core features, and the kit has already set them up, including a graph coloured by note type. Plugins add what the core cannot do: Git on a schedule, other views of your brain, and an AI agent inside the app.

This page lists the plugins worth having, what each can reach and the settings to choose. It was checked on 2026-11-17 against each plugin's page in Obsidian's community directory and its repository. Plugins change, so treat a verdict older than six months as a starting point, and run `plugin-review` before installing anything that is not on this page.

## How to install

1. Settings, Community plugins: **Turn on community plugins**.
2. Open a plugin's page from the tables below and choose **Install**, or search for it under **Browse** on the same settings page. Check the author's name, because look-alikes exist.
3. **Enable** it, then set it up as described here.

The kit ships no plugin settings. Since version 1.15.1, Obsidian sets aside settings that arrive with a vault before the plugin is installed (it keeps them as `data.json.bak`), so you choose the settings yourself, once, in the plugin's settings page.

## Start here: Git

| Plugin | Why | What it can reach | Verdict |
|---|---|---|---|
| [Git](https://community.obsidian.md/plugins/obsidian-git) by Vinzent | Commits, pulls and pushes the vault and its linked repos on a schedule. With it, GitHub works without a terminal | Runs the `git` program and talks to your Git host. Its directory review says Caution, because it runs a program. Mobile support is experimental and has no submodules | Install on your computers if the vault is on GitHub |

### Git settings

Settings, Git. The names are those in version 2.43.0 and may move between versions.

| Setting | Value | Why |
|---|---|---|
| Auto commit-and-sync interval (minutes) | 10 | A snapshot every ten minutes while Obsidian is open |
| Pull on startup | On | Each session starts from the latest version |
| Push on commit-and-sync | On | Keeps a copy on GitHub |
| Merge strategy | Merge | The safest choice. Rebase rewrites your local commits |
| Update submodules | On, if `repos/` holds linked repos | Commit-and-sync and pull then cover every linked repo too |

Two things before turning on submodule updates: each linked repo must be on its branch, and Git must be able to push to it. Say **sync** to your agent once and `git-sync` checks both.

The plugin signs in with your computer's Git credentials: Git Credential Manager, the GitHub CLI or an SSH key. Never put a token in its settings on a computer.

## Make it look like a brain

The core graph view already colours notes by kind, as explained on [[home#Your brain]], and `brain-map` draws a concept map of a course in Canvas. These plugins add other views of the same links.

| Plugin | What it does | What it can reach | Verdict |
|---|---|---|---|
| [Brain Atlas](https://community.obsidian.md/plugins/brain-atlas) by colorpulse6 | Your notes as a 3D anatomical brain | Draws on your device, with no network use. Labels show note titles, so turn them off before you share your screen. Mobile is experimental | Install with care: young, version 0.2, reviewed Satisfactory |
| [ExcaliBrain](https://community.obsidian.md/plugins/excalibrain) by zsviczian | The links around the current note as a living mind map | Needs the Excalidraw plugin. Local | Install if you like it: mature and widely used |
| [New 3D Graph](https://community.obsidian.md/plugins/new-3d-graph) by apoo711 | The graph view in 3D | Desktop only. Its directory review says Caution | Install with care |
| Brain Graph, Ember Brain | Brain-shaped graph views | Local, reviewed Passed, but a few months old with under a thousand downloads each | Wait and see |
| Extended Graph | Images, shapes and more colours in the graph | Desktop only. About a year without a release | Wait and see |
| InfraNodus AI Graph View | AI analysis of your graph | Sends text to InfraNodus and to OpenAI, and needs a paid account. Review: Caution | Avoid |
| Juggl, Graph Analysis | Older graph tools | No release in three years or more | Avoid |

## Run the AI inside Obsidian

The skills work with an agent in a terminal next to Obsidian. If you would rather have it in a side panel, these run the same agent inside the app, so `AGENTS.md`, the skills and the agent's own settings still apply.

| Plugin | What it does | What it can reach | Verdict |
|---|---|---|---|
| [Claudian](https://community.obsidian.md/plugins/realclaudian) by Yishen Tu | Claude Code, Codex or OpenCode in a side panel, with the vault as the working folder | Whatever the agent can reach: your files, commands you approve and your AI provider. Desktop only. Several look-alikes exist, so check the author | Install with care: keep its permission prompts on |
| [Agent Client](https://community.obsidian.md/plugins/agent-client) by RAIT-09 | Any agent that speaks the Agent Client Protocol, such as Claude Code, Codex or Gemini CLI, in a side panel | Starts the agent as a program with terminal access. Desktop only. Review: Caution | Install with care |
| [Smart Connections](https://community.obsidian.md/plugins/smart-connections) by Brian Petro | Lists the notes most related to the one you are reading, from embeddings computed on your device | Local by default. Its chat features send notes to a provider: leave them off | Install with care: source-available licence and paid add-ons |
| Copilot | Chat with your notes inside Obsidian | Sends notes to the provider you configure, and paid features to the plugin's company | Your choice: the skills do not need it |

Every note you use with an AI plugin is sent to its provider. The rules in [[security]] still apply.

## Add when you need them

All are maintained, and all work on mobile unless noted.

| Plugin | What it gives you | Keep in mind |
|---|---|---|
| Spaced Repetition | Flashcards kept in plain Markdown | No online service. The kit's `recall` covers topic-level review without it |
| Tasks | Task lists queried across the vault | The most actively maintained task plugin. No external services flagged |
| Excalidraw | Drawings and diagrams | Local by default. Its AI and OCR features need your own key: leave them off |
| Omnisearch | Search that includes PDFs and images | Builds a local index |
| Latex Suite | Fast maths entry | For STEM courses |
| Linter | Consistent formatting and properties | No network use |
| Importer (official) | One-time import from OneNote, Notion, Evernote, Apple Notes | Made by Obsidian |
| Maps (official) | The map view in Bases | Loads map tiles from the internet |
| LanguageTool Integration | Grammar checking | Sends the text you check to a LanguageTool server, unless you host one yourself |
| Docxer | Opens and converts Word files | Small and lightly maintained. No network use |

Advanced, because they run scripts: **Templater** and **QuickAdd**. Both are maintained and popular. Both can execute code, so never import a template or macro you have not read.

## Better left alone

| Plugin | Why |
|---|---|
| Local REST API, MCP server plugins | They open a local server onto your vault, and several had serious vulnerabilities in 2026. An agent can read the files directly. See [[mcp]] |
| Shell commands, Hider | The pair used in the 2026 shared-vault attacks |
| BRAT | Installs plugins from outside the directory, which skips Obsidian's automated review |
| Dataview, Datacore | Dataview has had no release since April 2025, and its JavaScript queries can run arbitrary code. Bases covers most uses |
| Kanban | Unmaintained since 2024. Bases has a kanban view |
| Calendar, Periodic Notes | No stable release since 2021 |
| Citations, Zotero Integration, Pandoc Reference List | Unmaintained and desktop only. Zotero Integration downloads and runs an external program |
| PDF++ | No release since September 2025, and built on private Obsidian internals |
| Remotely Save | No release since October 2024, and it holds your cloud storage credentials |

## Rules that hold whatever you install

- Install only from Obsidian's own plugin browser.
- Never trust the author of a vault someone sent you, and never sync plugins from a shared vault.
- Plugins do not update themselves. Read the release notes before you update.
- A plugin that asks for a token to a service you do not know is a reason to stop.
