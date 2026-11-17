---
name: recall
description: Short daily session of spaced recall across all courses. Finds the topics that are due for review today, asks the student to retrieve each one from memory, marks it briefly and schedules the next review. Use when the student asks what is due, wants a daily review, a quick quiz, flashcard-style practice or a warm-up, says "do my reviews", or has ten minutes and wants to use them well.
license: MIT
---

# Recall

A few minutes of retrieval spread over many days does more for long-term memory than the same minutes spent in one sitting (Cepeda et al., 2006). This skill keeps that habit cheap: it finds what is due, asks, marks, reschedules and gets out of the way.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`.

## 1. Find what is due

Collect the notes with `type: topic` in courses whose home note has `status: active`. A topic is due when `next_review` is empty, today or earlier.

Order them with the most overdue first, then alternate between courses so that two topics from the same course do not follow each other when that can be avoided. Take five topics, or about ten minutes' worth, and tell the student how many more are waiting.

If nothing is due, say so and say when the next topic comes up. Do not invent extra reviews: asking early throws away the benefit of the gap. Offer a `tutor` session on something new, or leave it there.

## 2. Ask from memory

For each topic send one prompt and wait:

- If the topic note has a "Self-test" section, use one of its questions. Check the topic's log and pick one that was not used last time.
- Otherwise ask the student to explain the core of the topic in their own words.

Ask for recall, not recognition. "Explain why", "list the steps", "what separates A from B". No multiple choice, and no hints inside the question.

## 3. Mark briefly

Compare the answer with the topic note and its sources. In two to four lines say what was right, what was missing and the correction, with the reference. Give the score from 0 to 3 as defined in `references/scheduling.md`.

Keep moving. A recall session is a check, not a lesson. When a topic scores 0 or 1, note it and suggest a `tutor` session on it afterwards.

## 4. Reschedule and log

Update the topic note's review properties as described in `references/scheduling.md`, and append to `courses/<CODE>/progress/<topic>.md`:

```markdown
## 2026-11-15 · recall
- **Prompt:** the question asked
- **Score:** 2
- **Missed:** what was missing or wrong, one line
```

A new log file starts with:

```markdown
---
type: progress-log
course: CODE
topic: "[[topic-file-name]]"
---

# Progress: topic name
```

## 5. Close

End with a short table of topic, score and next review date, and one sentence on the pattern you see, for example which course is weakest right now. Then stop.
