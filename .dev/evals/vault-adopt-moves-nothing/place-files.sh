#!/usr/bin/env bash
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
kit="$(cd "$here/../../.." && pwd)"
# A vault the student has used for a while. Only the kit's instructions and profile are added.
cp "$kit/AGENTS.md" "$kit/CLAUDE.md" "$kit/profile.md" .
if [ -d "$here/files" ]; then cp -R "$here/files/." .; fi
