#!/usr/bin/env bash
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
kit="$(cd "$here/../../.." && pwd)"
cp "$kit/AGENTS.md" "$kit/CLAUDE.md" "$kit/profile.md" .
cp -R "$kit/courses" "$kit/templates" .
mkdir -p inbox daily
if [ -d "$here/files" ]; then cp -R "$here/files/." .; fi
