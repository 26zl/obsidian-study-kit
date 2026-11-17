#!/usr/bin/env bash
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
kit="$(cd "$here/../../.." && pwd)"
cp "$kit/AGENTS.md" "$kit/CLAUDE.md" "$kit/profile.md" "$kit/.gitignore" .
cp -R "$kit/courses" "$kit/templates" .
mkdir -p inbox daily
# A vault whose remote is up to date, plus one change the student has not committed yet.
# The stand-in for GitHub lives inside the workspace and is hidden from Git.
remote="$PWD/.remote/vault.git"
mkdir -p "$PWD/.remote"
git init -q --bare "$remote"
git init -q -b main .
printf '.remote/\n' >> .git/info/exclude
git config user.name "Student"
git config user.email "student@example.com"
git add -A
git commit -q -m "Start of term"
git remote add origin "$remote"
git push -q -u origin main
printf '\n- Spacing beats cramming, and the gap should grow after each success.\n' >> courses/DEMO101/topics/spacing.md
