# Scoring and scheduling

Score every attempt from 0 to 3, so that any skill or agent schedules reviews the same way.

| Score | Meaning |
|---|---|
| 0 | No attempt, blank, or mostly wrong |
| 1 | Some correct parts, but a key idea is missing or wrong |
| 2 | Right idea, with gaps or imprecise wording |
| 3 | Complete and precise, in the student's own words, without help |

An answer reached with hints scores 2 at most. The score records what the student can do alone.

## Next review

Let `prev` be the topic's current `interval_days`. Use 1 if it is empty.

| Score | New `interval_days` |
|---|---|
| 0 | 1 |
| 1 | 2 |
| 2 | the larger of 3 and `prev` × 1.5, rounded |
| 3 | the larger of 4 and `prev` × 2.5, rounded |

Then apply the cap. If the course home has an `exam_date` in the future, the interval may not exceed one fifth of the days left until the exam, rounded down, and never goes below 1. With no exam date, or one that has passed, the cap is 30 days.

Example: score 3, `prev` 4, exam in 30 days. 4 × 2.5 = 10, the cap is 30 / 5 = 6, so the new interval is 6.

Update the topic note:

- `last_review`: today
- `next_review`: today plus `interval_days`
- `interval_days`: the new value
- `last_score`: the score
- `reviews`: add 1

## Why these numbers

Spaced retrieval beats massed study, and the best gap depends on how long the material has to last: about 20 to 40 percent of the time until the test when it is a week away, falling to 5 to 10 percent for a test a year away (Cepeda et al., 2008). One fifth is a simple rule inside that range for exams weeks or months ahead. A failed attempt returns the next day, because a quick success after an error is what repairs it.
