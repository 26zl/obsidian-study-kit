# Skills

A skill is a set of instructions an AI agent follows for one kind of task. The kit's skills are plain text files in `.claude/skills/`. They contain no scripts and start nothing on their own. Three use the network, and each asks first: `plugin-review` reads the web, and `link-repo` and `git-sync` talk to GitHub.

You do not have to remember the names. Say what you want, and the agent picks the skill. With Claude Code you can also call one directly, for example `/exam-trainer`.

## Learning

| Skill | Say something like | What it does | What it writes |
|---|---|---|---|
| `tutor` | "help me understand validity" | Asks one question at a time and gives hints in steps instead of answers | An entry in the topic's `progress/` log, and the next review date |
| `exam-trainer` | "test me on IMT4110" | Sets one question, waits for your answer, then marks it against your sources using marking points written beforehand | Your answer word for word, the marking, what you misunderstood and the next exercise |
| `recall` | "what is due?" | A ten-minute round of the topics due for review today, across all courses | A line per topic in its log, and new review dates |
| `source-note` | "make a note from slides-03.pdf" | Turns one source into one note with page references and self-test questions | A note in `notes/`, marked `origin: ai-draft` |
| `brain-map` | "brain map IMT4110", "how do these topics connect?" | You name the connections from memory, then it checks them against the sources, draws a concept map and suggests links that make the graph denser | `<CODE>.canvas`, a log entry, and links you approve |
| `summary-sheet` | "make an exam sheet for IMT4110" | Starts from what you can recall, then builds a sheet per topic: understand, know cold, traps | `exam/summary-sheet.md` |

## Planning

| Skill | Say something like | What it does | What it writes |
|---|---|---|---|
| `study-plan` | "plan my weeks until the exams" | Plans backwards from exam dates, and replans when you fall behind | `courses/study-plan.md` |
| `daily-plan` | "plan my day", "close the day" | At most three priorities in the morning, and a short record in the evening | Today's daily note |
| `weekly-review` | "weekly review" | Shows the week's numbers, asks two questions and sets next week | `daily/weekly/YYYY-Www.md` |

## Looking after the vault

| Skill | Say something like | What it does | What it writes |
|---|---|---|---|
| `vault-setup` | "set up" | First-time setup, one step at a time, resumable | `profile.md`, course folders |
| `vault-adopt` | "adopt my vault" | Maps the folders of a vault you already have to the kit's roles, and adds the kit around your notes without moving any | A folder map in `profile.md`, and the kit's files you approve |
| `new-course` | "add the course SYK2100" | Creates the course folder and home note | `courses/<CODE>/` |
| `inbox-triage` | "sort my inbox" | Proposes where each capture belongs and moves it after you approve | Moves files and adds properties |
| `vault-check` | "check my vault" | Finds broken links, files too large to sync, leaked secrets, risky plugin state and linked repos that need attention | Nothing. It only reports |

## GitHub

| Skill | Say something like | What it does | What it writes |
|---|---|---|---|
| `link-repo` | "link github.com/me/course-repo" | Brings an existing repository into `repos/` as a Git submodule, without changing it | `repos/<name>/`, a card note, and one commit after you approve |
| `git-sync` | "sync" | Commits, pulls and pushes each linked repo and then the vault, asking before every commit and push | Commits, with messages you approve |

## Graded work and plugins

| Skill | Say something like | What it does | What it writes |
|---|---|---|---|
| `assignment-coach` | "give me feedback on my draft" | Checks the course's AI policy first, then coaches without writing your text, and logs the help given | The AI use log in the assignment note |
| `plugin-review` | "is the Tasks plugin safe?" | Reviews an Obsidian community plugin before you install it | Nothing. It gives a verdict |

## How the pieces fit

```
sources/  ->  notes/  ->  topics/  ->  progress/  ->  dashboards
slides        cited       what you     attempts,      what is due,
readings      notes       must know    mistakes       deadlines
```

- You put course material in `sources/`.
- `source-note` and your own lecture notes go in `notes/`.
- A topic note in `topics/` is one thing you must master, in your own words, with self-test questions.
- `tutor`, `exam-trainer` and `recall` write to `progress/` and set each topic's next review date.
- The dashboards on [the home note](../home.md) read those dates and your deadlines.
- Every note links to its course and topics, so each course becomes a cluster in the graph. `brain-map` draws the connections between topics.
- Repositories in `repos/` count as course material, and `git-sync` keeps them and the vault on GitHub.

Everything is ordinary Markdown with properties. Another agent, another model or no agent at all can pick up where the last one stopped. See [Learning principles](learning-principles.md) for why the skills work the way they do.

## Writing your own skill

1. Create `.claude/skills/<name>/SKILL.md`. The folder name is lowercase letters, digits and hyphens.
2. Start with frontmatter holding `name` (the same as the folder) and `description`: what the skill does and when to use it, in under 1,024 characters.
3. Write the instructions below. Explain why each step matters. Agents follow reasons better than commands.
4. Add the skill to the table in `AGENTS.md`, so agents that do not load skills on their own can find it.

Keep to the fields of the open Agent Skills format: `name`, `description`, `license`, `compatibility`, `metadata`. The kit's own skills carry no scripts and pre-approve no tools, and its tests enforce that. Run them with `node --test ".dev/tests/*.test.mjs"`.
