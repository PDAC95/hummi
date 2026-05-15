---
phase: 01-foundation-long-lead-vendors
plan: 03
subsystem: infra
tags: [github-actions, ci, supabase-cli, gitleaks, ripgrep, secret-scanning, branch-protection]

requires:
  - phase: 01-foundation-long-lead-vendors
    provides: "Plan 01-01 — credentials captured in account-credentials.md (the values founder will paste into GH Actions secrets)"
  - phase: 01-foundation-long-lead-vendors
    provides: "Plan 01-02 — supabase/migrations/ scaffold (the directory the dry-run + deploy-prod workflows operate on) and the migration-runbook flow that CI now mirrors"
provides:
  - "GitHub Actions workflow .github/workflows/pr-checks.yml — 4 jobs / 5 required checks: lint+tsc+build, secret-leak grep, supabase dry-run against staging, npm audit"
  - "GitHub Actions workflow .github/workflows/deploy-staging.yml — PR-time dry-run on migration changes + workflow_dispatch for manual apply (no develop branch trigger)"
  - "GitHub Actions workflow .github/workflows/deploy-prod.yml — push to main → dry-run + apply migration to hummi-prod, with concurrency: deploy-prod serializing prod deploys"
  - "GitHub Actions workflow .github/workflows/gitleaks.yml — gitleaks/gitleaks-action@v2 full-history scan on PR + push to main"
  - "scripts/secret-leak-grep.sh — POSIX bash, executable in git index (mode 100755), shared by CI and the future pre-commit hook (Plan 01-05). Scans only src/ for VITE_*SERVICE patterns, service_role literal, SUPABASE_SERVICE prefix"
  - ".gitattributes — forces LF line endings on .sh/.bash/.yml/.yaml/.sql so the script and workflows run on Ubuntu CI regardless of contributor core.autocrlf setting"
  - ".planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md — founder runbook listing 8 required GH Actions secrets"
  - ".planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md — founder runbook for the main branch ruleset (5 required checks, restrict deletions, block force pushes, require linear history)"
affects: [01-04 (Sentry plan will add SENTRY_AUTH_TOKEN/ORG/PROJECT_SPA secrets and source-map upload step in pr-checks.yml or a new release.yml), 01-05 (pre-commit hook will invoke the SAME scripts/secret-leak-grep.sh — no duplication of pattern logic), 01-07 (red-test branch test/secret-leak-red will rely on the secret-leak-grep job to fail as evidence the guardrail works), 02+ (every future migration PR will dry-run via supabase-dry-run job; merge to main fires deploy-prod.yml)]

tech-stack:
  added:
    - "GitHub Actions (free tier, 4 workflow files)"
    - "supabase/setup-cli@v1 action pinned to Supabase CLI 2.84.5 (per RESEARCH.md Pitfall 1 — older CLIs had broken --dry-run)"
    - "gitleaks/gitleaks-action@v2"
    - "ripgrep (assumed preinstalled on Ubuntu runners; Plan 01-05 will install locally)"
  patterns:
    - "Same script for local pre-commit AND CI: scripts/secret-leak-grep.sh sourced from both contexts so patterns/exit codes can never drift apart"
    - "5 required PR checks per CONTEXT.md: lint, tsc, build, supabase-dry-run, secret-leak-grep — split into 4 GH Actions jobs (the first job covers 3 checks)"
    - "GitHub Flow only: deploy-staging triggers on PR or workflow_dispatch — never on a develop branch, which does not exist in this project"
    - "Concurrency group on deploy-prod (group: deploy-prod, cancel-in-progress: false) so two PRs merging back-to-back do not run two parallel prod migration applies"
    - "Build env in CI uses placeholder VITE_* values — vite needs them defined to build but no real secrets are involved at build time (publishable keys ship to browser anyway, anything sensitive is server-side)"
    - "LF line endings enforced via .gitattributes for .sh/.bash/.yml/.yaml/.sql so Windows contributors with default core.autocrlf=true do not break Ubuntu CI"

key-files:
  created:
    - ".github/workflows/pr-checks.yml"
    - ".github/workflows/deploy-staging.yml"
    - ".github/workflows/deploy-prod.yml"
    - ".github/workflows/gitleaks.yml"
    - "scripts/secret-leak-grep.sh"
    - ".gitattributes"
    - ".planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md"
    - ".planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md"
  modified:
    - ".github/workflows/ci.yml (DELETED — superseded by pr-checks.yml)"

key-decisions:
  - "Deleted legacy .github/workflows/ci.yml: its lint+build job is now superseded by lint-typecheck-build in pr-checks.yml. Keeping both would double-run lint/build, burn double GH Actions minutes, and create two competing required-check names in branch protection. Rationale logged in commit message of 8dad149."
  - "Created .gitattributes to force LF on .sh/.bash/.yml/.yaml/.sql before committing the bash script. Without this, Windows contributors with default core.autocrlf=true would commit with CRLF, and Ubuntu CI runners would fail to execute scripts/secret-leak-grep.sh because of the \\r in the shebang line. Belt-and-suspenders: also forces LF on yml so workflow files are unambiguous to GH's parser."
  - "Pinned Supabase CLI to 2.84.5 in all three Supabase workflows (not 'latest'). Per RESEARCH.md Pitfall 1: older CLIs had broken --dry-run, and 'latest' is a moving target that could break CI silently when a new version regresses. Re-evaluate the pin at next phase boundary."
  - "deploy-prod.yml uses concurrency: deploy-prod with cancel-in-progress: false — serializes prod deploys but never cancels an in-flight one. If two PRs merge back-to-back the second waits for the first to finish before applying, preventing the race where 'apply A' and 'apply B' run in parallel against the same DB."
  - "deploy-staging.yml splits dry-run and apply into 3 separate steps with 'if:' conditionals (pr → dry-run, dispatch+apply=true → apply, dispatch+apply=false → dry-run) instead of one step with shell branching. This makes the GH Actions UI show clearly WHICH path ran and WHY, which matters when staging is the safety net before prod."
  - "Build job in pr-checks.yml passes placeholder VITE_* env vars (not GH secrets). The build only validates compilation, not real connectivity — using real secrets at build time would unnecessarily expose them to the build logs and to anyone with read access to the Actions tab."
  - "Did NOT auto-configure GH Actions secrets or branch protection — those require GitHub UI access that Claude does not have. Documented exactly what the founder must do in two runbooks (gh-secrets-setup.md and branch-protection-setup.md), referenced from the checkpoint in the plan."

patterns-established:
  - "Pattern: shared secret-leak script in scripts/, invoked verbatim from BOTH .github/workflows/pr-checks.yml and (future) .git/hooks/pre-commit. Single source of truth for forbidden patterns."
  - "Pattern: every workflow that talks to Supabase uses supabase/setup-cli@v1 with version: 2.84.5 (pinned), then sets SUPABASE_ACCESS_TOKEN + SUPABASE_DB_PASSWORD via env at the job level so all steps inherit them, then runs supabase link --project-ref <SECRET> as the first real step."
  - "Pattern: deploy-prod.yml triggers on push to main with paths: ['supabase/migrations/**'] filter — non-migration PRs do not fire prod deploys. Same filter on deploy-staging.yml's PR trigger."
  - "Pattern: founder-facing setup docs live next to the plan they belong to (.planning/phases/XX/) and are committable (no secrets, just instructions). The actual secret values stay in account-credentials.md (gitignored)."

requirements-completed: [INFRA-03, INFRA-04, SEC-07]

duration: 9min
completed: 2026-05-15
---

# Phase 01 Plan 03: CI Guardrails Summary

**Four GitHub Actions workflows enforce 5 required PR checks (lint, tsc, build, supabase dry-run, secret-leak grep) on every PR to main, plus auto-deploy migrations to hummi-prod on push to main — all wired to a shared bash secret-leak script that doubles as the future pre-commit hook.**

## Performance

- **Duration:** 9 min
- **Started:** 2026-05-15T16:16:45Z
- **Completed:** 2026-05-15T16:25:10Z
- **Tasks:** 3 auto + 1 checkpoint:human-action (deferred to founder post-merge — see "User Setup Required" below)
- **Files created:** 8
- **Files deleted:** 1 (legacy ci.yml superseded by pr-checks.yml)

## Accomplishments

- Wrote `scripts/secret-leak-grep.sh` as a POSIX bash script (mode 100755 in git index) that uses ripgrep + PCRE alternation to scan src/ for `VITE_[A-Z_]*SERVICE`, `service_role`, `SUPABASE_SERVICE`, and `SUPABASE_SERVICE_ROLE_KEY`. Same script used by CI now and by the pre-commit hook in Plan 01-05 — no duplication of pattern logic.
- Added `.gitattributes` enforcing LF on .sh/.bash/.yml/.yaml/.sql so Windows contributors with default `core.autocrlf=true` cannot accidentally commit a `\r`-suffixed shebang that would break Ubuntu CI.
- Wrote 4 GitHub Actions workflows totaling 4 jobs / 5 required checks for PR + dual-purpose deploy paths for staging (dry-run on PR, manual apply via workflow_dispatch) and prod (auto-apply on push to main with migrations changes, serialized by concurrency group).
- Pinned Supabase CLI to 2.84.5 in all 3 Supabase-related workflows (per RESEARCH.md Pitfall 1).
- Removed the legacy `ci.yml` whose lint+build job duplicates `lint-typecheck-build` in pr-checks.yml — deviation Rule 3 (would burn double Actions minutes and confuse the required-checks list in branch protection).
- Wrote two founder-facing runbooks (`gh-secrets-setup.md`, `branch-protection-setup.md`) so founder can follow step-by-step to configure the 8 GH Actions secrets and the main branch ruleset post-merge.

## Task Commits

Each task committed atomically on `phase-01/03-ci-guardrails`:

1. **Task 1: Create secret-leak-grep.sh + .gitattributes** — `97e7b31` (feat)
2. **Task 2: Write GH secrets + branch protection setup docs** — `c26cf10` (docs)
3. **Task 3: Create the four GitHub Actions workflows + delete legacy ci.yml** — `8dad149` (feat)

**Plan metadata commit:** to be added by orchestrator at the end of this summary (`docs(01-03): complete ci-guardrails plan`).

## Files Created/Modified

- `scripts/secret-leak-grep.sh` — shared secret-leak grep, mode 100755, used by CI now and pre-commit hook in Plan 01-05
- `.gitattributes` — enforces LF endings for .sh/.bash/.yml/.yaml/.sql
- `.github/workflows/pr-checks.yml` — 4 jobs covering 5 required PR checks (lint+tsc+build, secret-leak, supabase dry-run, npm audit)
- `.github/workflows/deploy-staging.yml` — PR dry-run + workflow_dispatch (no develop branch trigger)
- `.github/workflows/deploy-prod.yml` — push-to-main migration deploy with concurrency serialization
- `.github/workflows/gitleaks.yml` — gitleaks-action@v2 on PR + push to main
- `.github/workflows/ci.yml` — DELETED (superseded by pr-checks.yml)
- `.planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md` — founder runbook for 8 GH Actions secrets
- `.planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md` — founder runbook for main branch ruleset

## Decisions Made

See `key-decisions` in frontmatter (7 decisions, full rationale documented).

Highlights:
- Deleted legacy `ci.yml` to prevent double-running lint+build and to keep the required-checks list in branch protection unambiguous.
- Created `.gitattributes` BEFORE committing the bash script so the script gets LF endings in the git blob from the start (Windows `core.autocrlf=true` would have flipped them to CRLF, breaking Ubuntu CI).
- Supabase CLI pinned to 2.84.5 (not `latest`).
- `deploy-prod.yml` uses `concurrency: deploy-prod` with `cancel-in-progress: false` to serialize prod deploys.
- Build job uses placeholder VITE_* env vars, not real secrets — avoids unnecessary secret exposure in build logs.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking] Added .gitattributes for LF line endings**
- **Found during:** Task 1 (committing the bash script)
- **Issue:** `git config core.autocrlf` returned `true` (Windows default), and the first `git add scripts/secret-leak-grep.sh` produced the warning `LF will be replaced by CRLF the next time Git touches it`. If committed in CRLF, Ubuntu CI would execute `bash scripts/secret-leak-grep.sh` and fail at the shebang line because `#!/usr/bin/env bash\r` is not a valid interpreter line. The script would never run, the secret-leak grep check would always fail, and PRs would be blocked indefinitely.
- **Fix:** Created `.gitattributes` mapping `*.sh`, `*.bash`, `*.yml`, `*.yaml`, `*.sql` to `text eol=lf`. Then ran `git rm --cached scripts/secret-leak-grep.sh` and `git add` again to re-stage with LF endings. Verified the blob hash (`0de8ab4...`) was preserved (LF content), and confirmed mode was still `100755`.
- **Files modified:** Added `.gitattributes` (committed alongside the script in `97e7b31`).
- **Verification:** `git ls-files --stage scripts/secret-leak-grep.sh` shows `100755 0de8ab46... 0 scripts/secret-leak-grep.sh`. Bash smoke test from Git Bash on Windows ran the script and got the expected exit code 2 (ripgrep not installed locally — Plan 01-05 installs it).
- **Committed in:** `97e7b31` (Task 1 commit).

**2. [Rule 3 — Blocking] Deleted legacy `.github/workflows/ci.yml`**
- **Found during:** Task 3 (writing the new workflows)
- **Issue:** A legacy `ci.yml` from initial repo setup already exists with a `lint-and-build` job that runs `npm ci`, `npm run lint`, and `npm run build` — the exact same checks now covered by `lint-typecheck-build` in `pr-checks.yml`. Keeping both would (a) burn ~2x GH Actions minutes per PR for redundant work, (b) create two distinct check names that would BOTH need to be added as required status checks in branch protection (confusing for the founder), and (c) drift over time as one gets updated and the other does not.
- **Fix:** `git rm .github/workflows/ci.yml` and committed the deletion alongside the new workflow files in the same Task 3 commit. The new `pr-checks.yml` is a strict superset (adds tsc -b, secret-leak grep, supabase dry-run, npm audit on top of lint+build).
- **Files modified:** Deleted `.github/workflows/ci.yml`.
- **Verification:** `Test-Path .github/workflows/ci.yml` returns `False`. The `lint-typecheck-build` job in pr-checks.yml runs everything ci.yml ran plus more.
- **Committed in:** `8dad149` (Task 3 commit).

---

**Total deviations:** 2 auto-fixed (both Rule 3 — blocking).
**Impact on plan:** Both deviations were necessary for the plan's actual goal (CI that works) to be achievable. Without `.gitattributes`, the secret-leak grep check would have been broken on day 1 of CI being enabled. Without deleting `ci.yml`, the founder would have had to add a 6th required check name to branch protection that does the same thing as one of the 5 we documented. No scope creep — both are housekeeping in service of the plan.

## Issues Encountered

- **PowerShell `Select-String -SimpleMatch` produced misleading 0-match result for `VITE_[A-Z_]*SERVICE`** — the plan's verify command had this exact issue (carried forward from Plan 01-02 deviation #3 of the same flavor). Worked around by using ripgrep-via-Grep-tool to confirm the patterns are present in the script (got 2 matches as expected).
- **Local bash smoke test cannot validate the rg-based scan path on Windows** — ripgrep is not installed locally yet (Plan 01-05 will add it). The script handled this correctly by exiting 2 with a clear install hint, which is the documented behavior. Real validation of the scan path will happen on the Ubuntu runner the first time CI runs.

## Authentication Gates

None during execution. The 8 GH Actions secrets the founder must add post-merge are documented in `gh-secrets-setup.md` and listed in "User Setup Required" below.

## User Setup Required

**External configuration required after this PR merges to main.** The 4 workflow files exist in the repo but cannot run successfully until the founder configures GitHub Actions secrets and branch protection. Two runbooks document the exact steps:

1. **`.planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md`** — add 8 GH Actions secrets:
   - `SUPABASE_ACCESS_TOKEN`, `STAGING_PROJECT_ID`, `STAGING_DB_PASSWORD`, `PRODUCTION_PROJECT_ID`, `PRODUCTION_DB_PASSWORD` (required for Plan 01-03 workflows to function)
   - `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT_SPA` (used later by Plan 01-04)

   Values come from `account-credentials.md` (gitignored).

2. **`.planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md`** — create the `main` branch ruleset with the 5 required status checks (Lint + Typecheck + Build, Secret Leak Grep, Supabase Migration Dry-Run, npm audit, Gitleaks), restrict deletions, block force pushes, require linear history.

   **Chicken-and-egg note:** GitHub only suggests check names in the autocomplete after they have run at least once. So the founder will need to open a throwaway PR after this one merges to make CI run, then come back and add the 5 names to the ruleset.

## Next Plan Readiness

- **Plan 01-04 (Sentry integration)** can now reference `pr-checks.yml` as the place to add a source-map upload step, and the 3 Sentry secrets are already documented in `gh-secrets-setup.md` for the founder to add.
- **Plan 01-05 (pre-commit hooks)** has `scripts/secret-leak-grep.sh` ready to wire into the pre-commit hook — no need to duplicate the pattern logic. Plan 01-05 will also handle installing ripgrep locally on contributor machines.
- **Plan 01-07 (red-test branches)** can now create `test/secret-leak-red` and rely on the `Secret Leak Grep (INFRA-04 / SEC-07)` job in pr-checks.yml to fail when a service-role-shaped string is added to src/.
- **Future schema PRs (Phase 2 onward)** will automatically dry-run via the `supabase-dry-run` job on every PR, and any merge to main with `supabase/migrations/**` changes will fire `deploy-prod.yml`.
- **Concern:** CI is not yet validated end-to-end — the FIRST PR after this branch merges + secrets are configured will be the live test. If anything in the workflow YAML has a typo or a secret name does not match, that PR's CI will fail and we will fix forward. Branch protection should be enabled AFTER the first PR proves the workflows work, not before (otherwise a typo would block the very PR that fixes the typo).

## Self-Check: PASSED

Verified before writing this section:

- `scripts/secret-leak-grep.sh` — present, mode 100755 in git index (`git ls-files --stage` shows `100755 0de8ab46...`), contains all 4 patterns (verified via ripgrep-Grep, two of which are the spec required ones: `VITE_[A-Z_]*SERVICE` line 36, `service_role` line 37). Smoke-tested via `bash scripts/secret-leak-grep.sh` — returned exit 2 with clean ripgrep-not-installed message (expected on Windows without rg).
- `.gitattributes` — present, contains LF mapping for `.sh`, `.bash`, `.yml`, `.yaml`, `.sql`.
- `.github/workflows/pr-checks.yml` — present, contains all 4 job IDs (`lint-typecheck-build`, `secret-leak-grep`, `supabase-dry-run`, `npm-audit`) confirmed via Grep with 5 occurrences (the body has both job names and references). Validated as well-formed YAML via Python `yaml.safe_load`.
- `.github/workflows/deploy-staging.yml` — present, well-formed YAML, NO `branches: [develop]` trigger (the only `develop` reference in the workflows directory is the explicit comment in this file noting there is no develop branch). Contains 3 conditional steps (PR dry-run, dispatch+apply, dispatch+dry-run).
- `.github/workflows/deploy-prod.yml` — present, well-formed YAML, references `secrets.PRODUCTION_PROJECT_ID` + `secrets.PRODUCTION_DB_PASSWORD`, has `concurrency: deploy-prod` with `cancel-in-progress: false`.
- `.github/workflows/gitleaks.yml` — present, well-formed YAML, uses `gitleaks/gitleaks-action@v2` with `fetch-depth: 0`.
- `.github/workflows/ci.yml` — DELETED (`Test-Path` returns `False`, `git status` shows `D .github/workflows/ci.yml` was committed in 8dad149).
- `.planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md` — present, lists all 8 required secrets (verified via Grep: 6 occurrences of the 4 spec-required names with overlap from headers + table rows).
- `.planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md` — present, lists all 5 required status check names (verified via Grep: 5 occurrences).
- All 3 task commits present in `git log`: `97e7b31`, `c26cf10`, `8dad149`.
- No Stripe-shaped fully-formed `sk_live_…` or `sk_test_…` patterns anywhere in the repo (verified via Grep on the regex `sk_(live|test)_[A-Za-z0-9]{16,}` — zero matches).
- All Supabase workflow steps reference `${{ secrets.NAME }}` — no hardcoded credentials (verified by reading each workflow file before committing).

**Important caveat:** CI is not yet validated end-to-end. The first PR after this merges + the founder adds the 5 Supabase secrets will be the live test. The bash script behavior on Ubuntu (where ripgrep IS installed) was not directly tested locally because that requires Ubuntu — it was tested logically by running on Windows where the dependency-missing path returned the documented exit code 2.

---
*Phase: 01-foundation-long-lead-vendors*
*Completed: 2026-05-15*
