---
name: new-course
description: Adds a course to the vault with the folder layout, home note and properties that the dashboards and the other skills rely on. Use when the student starts a new course, module, subject or term, wants to add a course, or mentions a course that has no folder in courses/ yet.
license: MIT
---

# New course

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

## 1. Collect the facts

Ask for what you do not already have, one or two questions at a time. Take the answers from the syllabus or course page if the student pastes one or points to it.

| Property | What to ask | If unknown |
|---|---|---|
| `code` | The course code as the institution writes it | Required. Use a short name without spaces if the course has no code |
| `title` | Full name | Required |
| `term` | Term, for example `2026-autumn` | Leave empty |
| `credits` | Credits | Leave empty |
| `exam_date` | Date of the final exam or the last deadline | Leave empty and note where it will be announced |
| `exam_form` | School exam, home exam, oral, portfolio, multiple choice | Leave empty |
| `language` | Language of teaching and exam | The profile's language |

Also ask what the course says about using AI in coursework and in exams, and where that rule is written. Record it under "AI rules" in the course home, with the link. If the student does not know, write that it must be checked.

Never invent a date, a weight or a rule. An empty property with a note on where to find the answer is better than a wrong one, because the dashboards and the study plan are built on these values.

## 2. Create the course

The folder is `courses/<CODE>/`. Use the institution's spelling of the code without spaces or characters that are unsafe in file names (`\ / : * ? " < > |`).

If the folder already exists, stop and show what is there. Add what is missing and never overwrite.

Create:

```
courses/<CODE>/
  <CODE>.md          from templates/course-home.md
  sources/
  notes/
  topics/
  assignments/
  exam/
  progress/
```

Put an empty `.gitkeep` file in each empty folder so Git keeps it. Set `type: course` and `status: active` on the home note.

## 3. Connect it

- Add a link to the course home under "Courses this term" in `profile.md`.
- For each graded task the student mentions, create a note in `assignments/` from `templates/assignment.md` with `due`, `weight` and `ai_policy`. Use `ai_policy: unknown` until the student has checked the rule.
- If the syllabus lists topics, offer to create one topic note per topic from `templates/topic.md`. Leave the "In my own words" section empty for the student. Each topic note links back to the course home under "Sources" or "Key points", so the course becomes one cluster in the graph.
- If the course already lives in a GitHub repository (lab code, shared notes, the student's own course repo), offer `link-repo` to bring it in under `repos/` without changing it, and link the repository's card from the course home under "Links".

## 4. Say what happens next

Tell the student where slides and readings go (`sources/`) and which skills to try first: `source-note` on the first reading, and `study-plan` once the exam date is known. Once a few topics exist, `brain-map` draws how they connect.
