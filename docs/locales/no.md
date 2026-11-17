# Study context: Norway

This file gives the agent and you the context of studying in Norway: the local terms, the forms of assessment and where the rules for AI are published. Set `study_context: docs/locales/no.md` in `profile.md` to use it. Like the rest of the kit it is in English; the agent answers in whatever language you set in the profile.

The links and rules were checked on 2026-11-15. Rules change, and a faculty or course can be stricter than its institution. Read the page yourself before you rely on what is written here.

## Terms

The Norwegian words are kept, because they are the ones your institution uses.

| Term | Meaning | Property in the vault |
|---|---|---|
| Emne | A course with its own code and credits (studiepoeng) | `type: course`, `code`, `credits` |
| Pensum | What you must know for the exam | The files in `sources/` |
| Arbeidskrav | Compulsory work that must be approved before you may sit the exam | `type: assignment`. Write "arbeidskrav" in `weight` |
| Skoleeksamen | A supervised exam on site, often in Inspera | `exam_form` |
| Hjemmeeksamen | An exam you do at home within a deadline | `exam_form`. Counts as assessment under way |
| Sensur | The grade is announced | |
| Begrunnelse og klage | You can ask for the reasons behind your grade and appeal it. The deadlines are in the institution's exam regulations | |
| Kont, utsatt eksamen | A new exam after a fail or a valid absence | Add a new row to the study plan |
| Karakterskala | A to F, where F is a fail, or pass and fail | |

## Cheating

Cheating (fusk) is regulated by section 12-4 of the Universities and University Colleges Act (universitets- og høyskoleloven). It requires intent or gross negligence. The consequence can be an annulled exam and exclusion for up to one year, or up to two years in particularly serious cases.

Source: https://lovdata.no/lov/2024-03-08-9/§12-4

## AI in assignments and exams

There is no national rule for declaring AI use. The requirements are set by the institution, the faculty and the course, and they go by different names: deklarasjon, egenerklæring, redegjørelse.

What the institutions below have in common: you must be open about your use, you are responsible for the content, and handing in AI-generated text as your own can be cheating.

| Institution | Main points | Where it is written |
|---|---|---|
| NTNU | AI is a permitted aid unless the assignment or course says otherwise. Use that mattered for the result must be declared. Where the faculty or course requires it, a declaration form is uploaded in Inspera | https://i.ntnu.no/wiki/-/wiki/Norsk/Kunstig+intelligens+i+bachelor-+og+masteroppgaver and https://i.ntnu.no/wiki/-/wiki/Norsk/Juks+p%C3%A5+eksamen |
| UiO | Use that the course permits, and that you are open about, is not cheating. Show when and how you used AI. Documentation requirements are set per course, and several faculties have their own templates | https://www.uio.no/studier/ressurser/ki/index.html |
| UiB | The submission must be your own independent work. The faculty and course set the rules, and several faculties use categories from no AI to full AI | https://www4.uib.no/for-studenter/dine-studier/regelverk-og-retningslinjer/studenters-bruk-av-kunstig-intelligens |
| OsloMet | A new guideline from September 2026. Use that mattered for the academic content must be described in the submission | https://student.oslomet.no/retningslinje-for-bruk-av-ki-i-studentarbeid-og-doktorgradsarbeid |

The OsloMet row is based on coverage of the guideline, not on the guideline itself. Read the page.

### Using it in the vault

- Set `ai_policy` on each assignment after you have read the assignment text and the course page, and paste or link the rule under "AI policy" in the assignment note.
- Set `default_ai_policy` in `profile.md` only once you have read your institution's general rule. At NTNU the main rule corresponds to `open`: permitted, but the use must be declared. The course can be stricter.
- A home exam and any other assessment under way counts as `none`, unless its rules say AI is a permitted aid.

### Declaration

NTNU's form "Deklarasjon om KI-hjelpemidler" asks about spell checking, text generation, writing assistance, programming assistance, image generation and other tools. The kinds in the vault's AI use log cover the same ground:

| In the AI use log | In NTNU's form |
|---|---|
| `language` | Spell checking and language editing (stavekontroll og språkvask) |
| `text` | Text generation (tekstgenerering) |
| `brainstorming`, `outline`, `feedback`, `explanation` | Writing assistance (skriveassistanse) |
| `code` | Programming assistance (programmeringsassistanse) |
| `image` | Image generation (bildegenerering) |
| `data`, `search`, `other` | Other tools (andre verktøy) |

For a declaration written in Norwegian, NTNU suggests opening with: «I arbeidet med denne oppgaven har jeg benyttet kunstig intelligens (KI) som verktøy på følgende måte:» ("In this assignment I have used artificial intelligence (AI) as a tool in the following way:").

The form is linked from the NTNU page above. Other institutions have their own forms and templates. Always use the one your course asks for.

## Citing AI

Institutions disagree on whether an AI tool belongs in the reference list. NTNU and OsloMet want you to describe the use rather than list the tool as a source. Others show examples in APA 7.

- Kildekompasset: https://www.kildekompasset.no/references/kunstig-intelligens-chatgpt-writesonic-mfl/
- Søk & Skriv: https://www.sokogskriv.no/kunstig-intelligens/

Both say you must follow the guidelines at your own institution.

## Privacy in placements and fieldwork

Notes from placements, for example in nursing, social care or teacher training, must not contain anything that can identify a patient, service user or pupil. A name, a date of birth, a room number or an unusual diagnosis can be enough. The same goes for interviews and other research data in assignments. Such information does not belong in the vault, and it must not be given to an AI service.
