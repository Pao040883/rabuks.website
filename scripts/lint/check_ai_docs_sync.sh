#!/usr/bin/env bash
set -euo pipefail

BASE_SHA="${GITHUB_BASE_SHA:-}"
HEAD_SHA="${GITHUB_SHA:-}"

if [[ -z "$BASE_SHA" || -z "$HEAD_SHA" ]]; then
  echo "No PR base/head SHA provided; skipping AI docs sync check."
  exit 0
fi

CHANGED=$(git diff --name-only "$BASE_SHA" "$HEAD_SHA" || true)
if [[ -z "$CHANGED" ]]; then
  echo "No changed files detected."
  exit 0
fi

CODE_CHANGED=$(echo "$CHANGED" | grep -vE '^docs/ai/' || true)
AI_CHANGED=$(echo "$CHANGED" | grep -E '^docs/ai/' || true)

if [[ -n "$CODE_CHANGED" && -z "$AI_CHANGED" ]]; then
  echo "❌ Code or infra changed but docs/ai/* was not updated."
  echo "Changed non-memory files:"
  echo "$CODE_CHANGED"
  echo
  echo "Update at least the core memory files:"
  echo "- docs/ai/PLAN.md"
  echo "- docs/ai/STATUS.md"
  echo "- docs/ai/DECISIONS.md"
  exit 1
fi

echo "✅ AI docs sync check passed."
