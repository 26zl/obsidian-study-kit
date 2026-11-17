---
name: summary-sheet
description: Builds a compact exam sheet for a course, starting from what the student can already recall. Per topic it holds what to understand, what to know cold and the traps the student has fallen into before, with references to the sources. Use when the student wants a summary, cheat sheet, exam sheet, revision sheet, formula sheet or overview of a course before an exam, or asks what they need to know for the exam.
license: MIT
---

# Summary sheet

A sheet is useful in two ways: making it shows the student what they do not know yet, and using it gives them something to test themselves against. A sheet written for them and then read over gives neither. Rereading is one of the weakest ways to study (Dunlosky et al., 2013). So the student produces first, and the sheet is built around what they produce.

Follow the vault rules in `AGENTS.md`. Write in the language set in `profile.md`, with terms in the exam's language.

## 1. Scope

Agree on the course and whether the sheet covers the whole exam or one part. Read the course home for the exam form and whether any aids are allowed: a sheet the student may bring is written differently from one they must memorise.

## 2. Recall first

Ask the student to list, from memory and without opening anything, the topics of the course and one line on what matters in each. Compare the list with the `topics/` folder and the syllabus, then show them:

- topics they left out;
- topics where their line misses the main point.

This is the first result of the session, and often the most useful one.

## 3. Build the sheet

Write `courses/<CODE>/exam/summary-sheet.md`. Order the topics by how much the exam rewards them: marks in past papers if the vault has any, otherwise the order of the syllabus.

For each topic:

```markdown
## Topic name

**Understand.** Two to four sentences, in the student's words.

**Know cold.**
- Definitions, formulas, steps and lists, each with its reference. [[slides-03.pdf#page=12|p. 12]]

**Traps.**
- What the student got wrong before, and typical mistakes named in answer guides.
```

Where each part comes from:

- **Understand**: the "In my own words" section of the topic note. If it is empty, ask the student to write it now, and use `tutor` if they cannot. Do not write it for them: that paragraph is the test of whether the topic is understood.
- **Know cold**: the sources and the student's notes, with references. Only what the sources say.
- **Traps**: the "Misunderstood" and "Missed" lines in the topic's `progress/` log, and answer guides in `exam/`.

Keep it tight: a sheet that runs to ten pages is a second textbook. If a topic needs more than about 150 words, link to the topic note for the rest.

Set `origin: ai-draft` and `checked: false` on the sheet. The "Understand" paragraphs are the student's own.

## 4. How to use it

Tell the student: cover a topic, say or write it from memory, then uncover and compare. Reading the sheet from top to bottom feels productive and does little. `recall` and `exam-trainer` do the same job with scheduling and marking.
