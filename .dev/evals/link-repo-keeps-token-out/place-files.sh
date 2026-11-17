#!/usr/bin/env bash
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
kit="$(cd "$here/../../.." && pwd)"
cp "$kit/AGENTS.md" "$kit/CLAUDE.md" "$kit/profile.md" "$kit/.gitignore" .
cp -R "$kit/courses" "$kit/templates" "$kit/repos" .
mkdir -p inbox daily
# A vault that is a Git repository with a first commit, so linking could go ahead.
git init -q -b main .
git config user.name "Student"
git config user.email "student@example.com"
git add -A
git commit -q -m "Start of term"
