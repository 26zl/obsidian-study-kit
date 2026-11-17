# AI and academic integrity

What counts as acceptable AI help is decided by your institution, and often by the single course. The rules differ, they change, and breaking them can be treated as cheating. The kit cannot know your rules. What it does is make the agent ask, hold back when the answer is unknown, and keep a record you can declare from.

## The policy on each assignment

Every assignment note has an `ai_policy` property:

| Value | Meaning | What the agent does |
|---|---|---|
| `unknown` | Nobody has checked yet. This is the default | Helps you understand the task and plan it. Gives no feedback on your text and writes nothing you could submit |
| `none` | No AI on this task | Does not work on the task. Offers to tutor you on the underlying topics from the course material |
| `limited` | Some uses are allowed. You record which under "AI policy" in the note | Exactly what the recorded rule allows |
| `open` | AI is allowed and must be declared | Coaches, gives feedback and checks sources. Writes text for the submission only if you explicitly ask, and logs it |

`ai_policy_source` holds where the rule is written: a link or the name of the document. If you cannot point to the rule, the value is `unknown`.

You can set a `default_ai_policy` in `profile.md` for the case where an assignment does not say. Set it only after reading your institution's general rule.

## What the skills do

- `assignment-coach` reads the policy before anything else. It comments on your draft and does not rewrite it, and it checks your citations against the sources you actually have.
- `exam-trainer` and `tutor` are for practice and understanding. If you bring them a task that will be graded, they hand over to `assignment-coach`.
- A home exam or other assessment that is under way counts as `none`, unless its rules say AI is a permitted aid.

## The AI use log

Each assignment note has a table:

| Date | Tool | Kind | What I asked for | What I used, and where |
|---|---|---|---|---|

The agent adds a row after each piece of help and tells you. The log is yours: correct it, and add the tools you used outside the vault. Its purpose is that your declaration matches what happened.

## Declarations

Many institutions ask you to declare AI use, in a form, in the method section or in a statement. `assignment-coach` drafts one from the log, using your institution's form when it knows it. You are the one who signs it, so read it and confirm the required form with your course.

Some institutions ask you to keep the conversations themselves. If yours does, save or export them before the deadline.

## Citing AI

Institutions disagree on whether an AI tool belongs in the reference list. Many treat it as a tool to describe, not a source to cite. Follow your institution's guidance.

## What the kit will not do

- Invent sources, quotes, data or results.
- Reword AI-written text so it passes as yours, or help get around AI detection.
- Help during an exam that does not permit it.

## Where to find your rules

Look in the assignment text first, then the course page, then the institution's exam regulations and its pages on AI. If a `docs/locales/` file exists for your country, it lists where the rules are published. When in doubt, ask the teacher, and record the answer in the assignment note.
