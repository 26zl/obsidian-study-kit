#!/usr/bin/env bash
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
kit="$(cd "$here/../../.." && pwd)"
cp "$kit/AGENTS.md" "$kit/CLAUDE.md" "$kit/profile.md" .
cp -R "$kit/courses" "$kit/templates" .
mkdir -p inbox daily
# Start without the demo map, so the skill has to begin with the student.
rm -f courses/DEMO101/DEMO101.canvas
