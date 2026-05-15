#!/usr/bin/env bash
# scripts/secret-leak-grep.sh
# Used by: .git/hooks/pre-commit (installed by Plan 01-05) AND .github/workflows/pr-checks.yml
# Enforces INFRA-04 + SEC-07: service-role / SERVICE patterns must NEVER appear in src/.
#
# Same script, same patterns, same exit codes in both contexts.
# Scope is intentionally limited to src/ — other directories (docs, .planning/,
# supabase/migrations/) may legitimately discuss these patterns in prose or SQL.
#
# Exit codes:
#   0 — clean (no forbidden patterns found in src/)
#   1 — possible secret leak detected (rg matched at least one pattern)
#   2 — script error (rg missing, src/ missing, etc.)

set -euo pipefail

# Verify dependencies up front so the failure mode is obvious.
if ! command -v rg >/dev/null 2>&1; then
  echo "ERROR: ripgrep (rg) is not installed."
  echo "  Local (Windows):  scoop install ripgrep"
  echo "  Local (macOS):    brew install ripgrep"
  echo "  Local (Linux):    apt-get install ripgrep   (Ubuntu CI runners ship with it)"
  exit 2
fi

if [ ! -d "src" ]; then
  echo "ERROR: src/ directory not found at $(pwd)."
  echo "Run this script from the repo root."
  exit 2
fi

# Forbidden patterns. These are the prefixes/identifiers that, if present in
# src/, indicate a service-role or other server-only secret has leaked into
# code that gets bundled to the browser.
PATTERNS=(
  'VITE_[A-Z_]*SERVICE'
  'service_role'
  'SUPABASE_SERVICE'
  'SUPABASE_SERVICE_ROLE_KEY'
)

# Build PCRE alternation: pattern1|pattern2|...
COMBINED=$(IFS='|'; echo "${PATTERNS[*]}")

# Scan src/ only. Exclude test/spec files (mock values in tests are reviewed
# manually and frequently legitimate). Use a custom file-type so we ignore
# binary/asset files and only inspect actual code.
#
# rg exit code semantics:
#   0 — at least one match (BAD for us — we want zero matches)
#   1 — no matches (GOOD)
#   2 — ripgrep error (script-level error, not our policy violation)
set +e
rg --pcre2 --hidden \
   --glob '!*.test.*' \
   --glob '!*.spec.*' \
   --type-add 'srccode:*.{ts,tsx,js,jsx,html,css}' \
   -t srccode \
   "$COMBINED" src/
RG_EXIT=$?
set -e

if [ "$RG_EXIT" -eq 0 ]; then
  echo ""
  echo "ERROR: Possible secret leak detected in src/."
  echo "Forbidden patterns: ${PATTERNS[*]}"
  echo ""
  echo "Service-role keys must NEVER appear in src/ — they ship to the browser."
  echo "Move secrets to:"
  echo "  - Supabase Edge Function env vars (for runtime server-side use)"
  echo "  - GitHub Actions secrets (for CI use)"
  echo "  - .env.local (for local dev only — gitignored)"
  exit 1
elif [ "$RG_EXIT" -eq 2 ]; then
  echo "ERROR: ripgrep failed with exit code 2."
  exit 2
fi

echo "Secret-leak grep: clean."
exit 0
