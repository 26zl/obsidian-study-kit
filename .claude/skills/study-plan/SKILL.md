---
name: study-plan
description: Builds a day-by-day study plan backwards from exam dates and deadlines, and rebuilds it when the student has fallen behind. Spreads topics out, schedules recall and timed practice, and says what to cut first when time runs short. Use when the student wants a study plan, a revision or exam schedule, asks how to fit everything in before an exam, says they are behind, overwhelmed or do not know where to start, or when an exam date changes.
license: MIT
---

# Study plan

A plan the student will follow beats a perfect one they abandon in week two. Build it from real numbers, make every session concrete, and decide in advance what gets dropped when a day is lost.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

## 1. Gather

From the vault:

- each active course home: `exam_date`, `exam_form`;
- `assignments/` notes: `due`, `weight`, `status`;
- `topics/` notes with their `last_score`, or the topic list in the syllabus if there are no topic notes yet;
- past papers in `exam/` and `sources/`.

From the student, a few questions at a time:

- how much time they can give on a normal weekday and at weekends, honestly;
- fixed commitments: work, travel, family, days off;
- what they already know well and what worries them.

If an exam date or the topic list is missing, ask. Do not plan around a guess.

## 2. Do the arithmetic

Show it as a small table: study sessions available between today and each exam, and sessions needed (topics to learn, recall time, practice papers and their review).

If it does not fit, say so plainly, before writing any plan. Then decide together what to cut. Weight the choice by what the exam rewards: topics that carry the most marks or come up most often in past papers stay, and optional reading goes first. A plan that pretends there is time for everything fails silently.

## 3. Build the plan

- **Every topic once, early.** The first pass is for understanding, with `tutor` or `source-note`. New material does not belong in the last days.
- **Recall every day.** Reserve ten to fifteen minutes a day for `recall`. It schedules the individual topics itself, so the plan only protects the time.
- **Timed practice in the last third.** Use past papers under exam conditions with `exam-trainer`: at least two full papers if they exist, each followed by a session on the weakest topics it exposed.
- **Mix courses** within a week when exams are close together, instead of finishing one before starting the next. If the student prefers one course at a time in the final days before an exam, do it their way.
- **Leave slack.** One unplanned session a week, so a lost day does not break the plan.
- **The day before an exam** is for a light review, the practical checklist (place, time, ID, permitted aids) and sleep.
- **Make sessions concrete.** "Topic 3: explain it back with tutor, then two questions from the 2025 paper", not "read chapter 3".

## 4. Write it

Write `courses/study-plan.md` with `type: study-plan`. Replace the old plan and carry over what was already ticked off.

```markdown
---
type: study-plan
---

# Study plan

Written 2026-11-15. Exams: CODE1 on 2026-12-03, CODE2 on 2026-12-17.

## The arithmetic

| | Sessions available | Sessions needed |
|---|---|---|

## Week 47

- [ ] **Mon 16 Nov** · CODE1 · Topic 3: explain it back with tutor, then two questions from the 2025 paper
- [ ] **Tue 17 Nov** · CODE1 · ...

## If a day slips

Do a short session instead of none: one topic, or one answer.

| Course | Cut first | Never cut |
|---|---|---|

## Besides studying

Deadlines, registration, travel and other things with a date.
```

Each session is a checkbox so it can be ticked on a phone.

## 5. Replanning

When the student is behind, read the unticked sessions and the `progress/` logs, and rebuild from today. Keep what is done, recount the sessions, apply the "cut first" list, and say exactly what changed and what was dropped.

Leave blame out of it. Falling behind is the normal case, and a plan that has been repaired is still a plan. If the numbers no longer allow a pass through everything, say that, and help the student choose what to secure.
