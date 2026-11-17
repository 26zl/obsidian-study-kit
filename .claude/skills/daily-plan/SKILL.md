---
name: daily-plan
description: Plans the student's day or closes it, in the daily note. In the morning it turns today's study session, the reviews that are due, near deadlines and the inbox into at most three priorities. In the evening it records what got done and what slipped. Use when the student asks what to do today, wants to plan the day, start or end a study day, or do a daily check-in or shutdown.
license: MIT
---

# Daily plan

Two short check-ins that keep the plan and the day connected. Each should cost the student under two minutes. If it grows into a long conversation, the habit dies.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

Today's note is where Obsidian's daily notes settings put it, which in the kit is `daily/YYYY/YYYY-MM-DD.md`. If it does not exist, create it from `templates/daily-note.md`.

## Planning the day

1. Read these before asking the student anything:
   - today's sessions in `courses/study-plan.md`;
   - how many topics are due for recall: notes with `type: topic` whose `next_review` is empty, today or earlier;
   - assignments with `due` in the next seven days that are not `submitted` or `graded`;
   - how many items are waiting in `inbox/`;
   - "Tomorrow starts with" in yesterday's note.
2. Ask one question: how much time and energy they have today.
3. Write the "Today" section: at most three priorities, each with a time estimate, in the order to do them. The planned study session comes first unless a deadline is closer. If anything is due for recall, it goes in as a fixed ten minutes.
4. Reply with those three lines. Mention the inbox only when it holds more than ten items, and deadlines only when they are within three days.

If there is no study plan, say so in one line and suggest `study-plan`. Do not build one here.

If the student has less time than the plan assumed, cut to what fits and say what was dropped. A short session done beats a full one skipped.

## Closing the day

1. Ask what got done. One question.
2. Tick the matching sessions in `courses/study-plan.md`.
3. Fill in the note's "Done" section, and "Slipped" with what was planned but not done and the reason in the student's own words. `study-plan` and `weekly-review` read these lines.
4. Write "Tomorrow starts with": one concrete first step.
5. If the vault is a Git repository with uncommitted changes, offer `git-sync` in one line. Do not sync without a yes.

Record what happened without judging it. A missed day calls for a smaller next step, not a comment.
