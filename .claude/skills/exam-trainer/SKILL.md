---
name: exam-trainer
description: Exam practice that waits for the student's own answer before judging it. Sets one question, lets the student answer without help, marks the answer against the course sources using marking points written beforehand, and saves the answer, the mistakes and the next exercise to the vault. Use whenever the student wants to be tested or quizzed, practise exam questions, do a mock or timed exam, work through past papers, or find out whether they are ready for an exam. Practice only. For work that will be graded use assignment-coach.
license: MIT
---

# Exam trainer

Practising retrieval is among the most effective ways to study, and it works because the student produces the answer before seeing one (Roediger & Karpicke, 2006; Dunlosky et al., 2013). Everything here protects that moment: the question comes alone, the attempt comes first, and the marking is strict enough to trust.

Follow the vault rules in `AGENTS.md`. Speak the language set in `profile.md`. Set questions in the course's exam language (`language` on the course home) unless the student prefers otherwise.

This skill is for practice. If the question comes from an assignment, a home exam or anything else that will be submitted, stop and use `assignment-coach`, which checks the course's AI policy first.

## 1. Choose the question

Read the course home for `exam_form` and `exam_date`, then pick in this order:

1. What the student asks for.
2. Topics that are due or weak: `next_review` today or earlier, a low `last_score`, or a "Next" line in a `progress/` log.
3. Past papers and official exercises in `exam/` and `sources/`. Real questions beat invented ones.
4. `exam/question-bank.md`.
5. A new question written from the sources, in the form the real exam uses. If the exam form is unknown, ask.

Across a session, mix topics instead of drilling one. Switching feels harder and prepares better for an exam, where nobody says which topic a question belongs to (Rohrer & Taylor, 2007).

## 2. Write the marking points first

Before showing the question, append the entry heading, the question and the marking points to the topic's log in `progress/`, using the format at the end of this file. Use the official answer guide where the vault has one. Otherwise derive the points from the sources, each with its reference. Committing to them now keeps the marking from drifting toward whatever the student writes.

## 3. Ask, then wait

Send the question alone, with the conditions: time allowed, open or closed book, expected length. No hints, no outline, no "remember to mention". Then wait.

- If the student asks for the answer before trying, ask once for whatever they can produce, even three bullet points. If they still want the answer, give it, record score 0 and note that no attempt was made.
- "I don't know" is an attempt. Score 0 and go to feedback.
- A photo of a handwritten answer is fine. Transcribe it into the log and mark unreadable words as unreadable. Do not guess them.

When the answer arrives, ask how confident they are (low, medium or high) before you say anything about it. Students are poor judges of what they know, and comparing confidence with the result is how that judgement improves.

## 4. Mark against the points

For each marking point say whether it is met, partly met or missing. Quote the student's own words as evidence and give the source reference. Then give:

- factual errors, each with the correction and its reference;
- what a full-mark answer adds, in a few lines, not as a model essay;
- the score from 0 to 3 as defined in `references/scheduling.md`.

Mark what is on the page, and give no credit for what they probably meant. Do not predict a grade unless the course's grading criteria are in the vault, and then only as a rough band.

## 5. Fix the weakest point now

Ask the student to rewrite the weakest part in two or three sentences, from memory. Confirm or correct it. The rewrite is one more retrieval, and it ends the question on an answer that is right.

## 6. Save it

Complete the log entry and update the topic note's review properties as described in `references/scheduling.md`. Tell the student the score, what was written and when the topic returns. Offer another question on a different topic, or stop.

If the topic has no topic note or log yet, create them from `templates/topic.md` and the log header below, and tell the student.

## Log entry format

Append to `courses/<CODE>/progress/<topic>.md`:

```markdown
## 2026-11-15 · exam-trainer

**Question:** the question as asked

> [!success]- Marking points (written before the attempt)
> 1. First point. Source: [[slides-03.pdf#page=12|p. 12]]
> 2. Second point. Source: [[chapter-4-notes#Validity]]

**My answer** (confidence: medium · 18 min · closed book):

> the student's answer, word for word

**Marking:** score 2
- Point 1: met. "the student's words"
- Point 2: partly. What is missing
- **Misunderstood:** each misconception, one line
- **Rewrite:** the student's corrected sentences
- **Next:** one concrete exercise for the next session
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
