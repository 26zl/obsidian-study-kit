# Security policy

## Reporting a vulnerability

Please report security problems privately, not in a public issue. On the repository's **Security** tab, choose **Report a vulnerability**. You should get a first answer within a week.

Include what you found, where it is (file and line), and how it could be used.

## What counts

The kit is text that steers AI agents, so its security problems look different from those of ordinary software. These are in scope:

- a skill or instruction that can lead an agent to send data out, delete or overwrite the student's notes, install software or weaken its own permissions;
- a weakness in `.claude/settings.json` that makes the documented protections not hold;
- a way for content in a note, a source or the inbox to take control of an agent through the kit's own instructions;
- documentation that gives unsafe advice;
- anything in the repository that should not be there: a secret, personal data, third-party code.

## Out of scope

- Vulnerabilities in Obsidian, in an AI agent or in a community plugin. Report those to their maintainers.
- The limits the documentation already states: no sandbox on native Windows, and deny rules that do not bind shell commands the user approves.

## Supported versions

Only the latest release receives fixes.
