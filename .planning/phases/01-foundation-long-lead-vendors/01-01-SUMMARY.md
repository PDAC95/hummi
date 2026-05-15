---
phase: 01-foundation-long-lead-vendors
plan: 01
subsystem: infra
tags: [supabase, sentry, secrets-hygiene, runbook, gitignore, founder-setup]

requires: []
provides:
  - Gitignore pattern protecting any future phase-local account-credentials.md from accidental commit
  - Fillable credentials template with explicit downstream-consumption mapping
  - Step-by-step Supabase runbook (two projects + access token) the founder executes manually
  - Step-by-step Sentry runbook (org + SPA + Edge + auth token) the founder executes manually
affects:
  - 01-02 (Supabase migration init — needs STAGING_PROJECT_ID + STAGING_DB_PASSWORD + SUPABASE_ACCESS_TOKEN)
  - 01-03 (CI workflows — needs all Supabase + Sentry secrets to push into GitHub Actions)
  - 01-04 (Sentry instrumentation — needs both DSNs, org, both project slugs, and auth token)

tech-stack:
  added: []
  patterns:
    - "Phase-local credentials file pattern: each phase that captures secrets uses .planning/phases/<phase>/account-credentials.md, gitignored via the wildcard .planning/phases/*/account-credentials.md"
    - "Runbook-per-vendor pattern: every founder-owned manual setup gets a sibling runbook-<vendor>-setup.md with prerequisites, step-by-step, verification, and gotchas"
    - "Capture URL slug separately from display name (Sentry projects can get suffixed slugs that break source-map upload)"

key-files:
  created:
    - .planning/phases/01-foundation-long-lead-vendors/account-credentials.md (gitignored, only on founder's machine)
    - .planning/phases/01-foundation-long-lead-vendors/runbook-supabase-setup.md
    - .planning/phases/01-foundation-long-lead-vendors/runbook-sentry-setup.md
  modified:
    - .gitignore

key-decisions:
  - "Track captured credentials in a phase-local gitignored file rather than asking the founder to keep them in a password manager only — downstream plans need to grep/reference them"
  - "Split the founder runbook into two files (one per vendor) instead of one large doc — each vendor's setup is self-contained and the cognitive load per session is lower"
  - "Capture Sentry project URL slug as a distinct value from project display name to prevent silent source-map upload 404s in plan 01-04"
  - "Use a wildcard gitignore pattern (.planning/phases/*/account-credentials.md) instead of a fixed path so future phases automatically inherit the protection without touching .gitignore again"

patterns-established:
  - "Phase-local credentials file (gitignored, named account-credentials.md, lives in the phase directory)"
  - "Vendor runbook (named runbook-<vendor>-setup.md, lives in the phase directory, committable because it contains zero secrets)"
  - "Downstream consumption table inside the credentials file maps every captured value to the plan that consumes it and the destination (env var, GH Actions secret, code default)"

requirements-completed: []  # INFRA-01 stays open until founder finishes the manual checkpoint AND plan 01-02 confirms a working migration push against hummi-staging

duration: 4 min
completed: 2026-05-15
---

# Phase 1 Plan 01: Supabase + Sentry Account Setup — Summary

**Fillable credentials template plus two founder-targeted runbooks (Supabase staging+prod, Sentry org+SPA+Edge) that turn the manual SaaS provisioning into a 25-minute, copy-paste-friendly checklist with explicit downstream consumption mapping.**

## Performance

- **Duration:** ~4 min (executor work; founder runbook execution adds ~25 min separately)
- **Started:** 2026-05-15T13:13:19Z
- **Completed:** 2026-05-15T13:17:13Z
- **Tasks:** 1 plan task (Task 1: template + .gitignore) plus 2 deviation-added artifacts (the two runbooks)
- **Files created:** 3 (1 gitignored credentials template + 2 committed runbooks)
- **Files modified:** 1 (`.gitignore`)

## Accomplishments

- `.gitignore` extended with wildcard pattern `.planning/phases/*/account-credentials.md` so any phase that captures secrets is automatically protected. Verified working with `git check-ignore`.
- `account-credentials.md` template created with placeholders for every Supabase + Sentry value plans 01-02 / 01-03 / 01-04 will consume, plus an explicit consumption table mapping each value to its downstream plan and destination.
- Supabase runbook details project creation in `us-east-1`, captures the one-time-only DB password gotcha, generates the CI personal access token with minimum information, and explicitly tells the founder NOT to toggle Postgres extensions in the dashboard (those belong in plan 01-02's migration so they live in version control).
- Sentry runbook details org creation, both projects (React for SPA, Other for Deno Edge), the URL-slug-vs-display-name distinction that prevents silent source-map upload failures in plan 01-04, and an auth token with minimum-privilege scopes (`project:releases` + `org:read`).

## Task Commits

1. **Task 1 (gitignore part):** chore(01-01): gitignore phase-local account-credentials files — `3b1eafc`
2. **Deviation artifact 1 (Supabase runbook):** docs(01-01): add Supabase staging+prod setup runbook for founder — `5db3848`
3. **Deviation artifact 2 (Sentry runbook):** docs(01-01): add Sentry org+SPA+Edge setup runbook for founder — `73e2f7f`

The credentials template file itself (`account-credentials.md`) was created on disk but is not in any commit — it's gitignored by design and lives only on the founder's machine.

**Plan metadata commit:** added separately by the orchestrator after this SUMMARY is written.

## Files Created/Modified

- `.gitignore` — added wildcard pattern `.planning/phases/*/account-credentials.md` to protect phase-local credentials from accidental commit
- `.planning/phases/01-foundation-long-lead-vendors/account-credentials.md` — gitignored credentials template with `__FILL_IN__` placeholders for every Supabase + Sentry value, plus a downstream consumption table
- `.planning/phases/01-foundation-long-lead-vendors/runbook-supabase-setup.md` — committed runbook for the founder's manual Supabase provisioning step
- `.planning/phases/01-foundation-long-lead-vendors/runbook-sentry-setup.md` — committed runbook for the founder's manual Sentry provisioning step

## Decisions Made

- **Wildcard gitignore pattern over fixed path** — `.planning/phases/*/account-credentials.md` instead of a per-phase line. Future phases that capture secrets inherit the protection without anyone touching `.gitignore` again.
- **Two runbooks instead of one combined doc** — Supabase and Sentry are independent SaaS workflows with different prerequisites and gotchas. Splitting them keeps each session focused (~10–15 min each) and makes it obvious which one to re-read if a specific value needs to be re-captured.
- **Capture Sentry URL slug as a distinct field** — Sentry's project display name and URL slug can diverge (suffix added on collision). Plan 01-04's `vite.config.ts` uses the slug for source-map upload via `@sentry/vite-plugin`. A mismatch produces silent 404s and unreadable production stack traces, so the runbook makes the founder grab the slug from the address bar explicitly.
- **Downstream consumption table inside the credentials file** — gives the founder (and future-me) a clear answer to "which plan eats this value and where does it go?" without re-reading every PLAN.md.

## Deviations from Plan

### Auto-fixed (Rule 2 — missing critical) artifacts

**1. [Rule 2 — Missing Critical] Added two dedicated runbooks (Supabase + Sentry)**
- **Found during:** Task 1 / planning the human-action checkpoint
- **Issue:** The original PLAN.md packs the founder's instructions inside a single `<how-to-verify>` block on the `checkpoint:human-action` task. That works fine when the executor and founder are the same person in the same session, but the project's branch-per-plan GitHub Flow means the founder may resume this work hours or days after the executor finished. Without standalone runbooks, the founder would have to re-open the PLAN.md and parse the checkpoint block out of context — friction that causes skipped verification steps (especially the "capture the URL slug" detail).
- **Fix:** Extracted founder-facing instructions into two committed runbooks (`runbook-supabase-setup.md`, `runbook-sentry-setup.md`) with prerequisites, step-by-step, verification, and gotchas sections. Linked from the credentials template's preamble.
- **Files modified:** `.planning/phases/01-foundation-long-lead-vendors/runbook-supabase-setup.md` (new), `.planning/phases/01-foundation-long-lead-vendors/runbook-sentry-setup.md` (new)
- **Verification:** Both files written with the Write tool; committed with conventional-commits docs() prefix; readable independently.
- **Committed in:** `5db3848` (Supabase) and `73e2f7f` (Sentry)

---

**Total deviations:** 2 auto-fixed (both Rule 2 — Missing Critical: founder ergonomics).
**Impact on plan:** No scope creep. The original plan's `<how-to-verify>` block is preserved verbatim inside the runbooks, just relocated to standalone files for easier discovery. Zero secrets in committed files.

## Issues Encountered

None.

## User Setup Required

**This plan is `autonomous: false` — the actual account creation is founder-owned and is not yet done.**

The founder must now:

1. Open `.planning/phases/01-foundation-long-lead-vendors/runbook-supabase-setup.md` and execute it end-to-end (~15 min). Capture every value into `account-credentials.md`.
2. Open `.planning/phases/01-foundation-long-lead-vendors/runbook-sentry-setup.md` and execute it end-to-end (~10 min). Capture every value into `account-credentials.md`.
3. From the repo root, run:
   ```powershell
   git check-ignore .planning/phases/01-foundation-long-lead-vendors/account-credentials.md
   Select-String -Path .planning/phases/01-foundation-long-lead-vendors/account-credentials.md -Pattern '__FILL_IN__|__FILL_IN_DATE__' -SimpleMatch
   ```
   The first command must print the path. The second must return zero matches.

Once both verifications pass, plan 01-02 can run.

## Next Phase Readiness

**Status: this plan's executor portion is complete; founder action is the only thing gating plan 01-02.**

- Branch `phase-01/01-supabase-sentry-accounts` is ready to PR. The PR contains the gitignore change and the two runbooks. CI will be added in plan 01-03, so this PR has nothing to block on yet.
- `INFRA-01` (the requirement this plan maps to) stays open in REQUIREMENTS.md until the founder completes the manual setup AND plan 01-02 confirms a working `supabase db push` against `hummi-staging`. Marking it complete here would be premature — the requirement is "Two Supabase projects configured", not "Two Supabase project setup runbooks written".

---

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `[x] FOUND: .gitignore` — modified, contains `.planning/phases/*/account-credentials.md`
- `[x] FOUND: .planning/phases/01-foundation-long-lead-vendors/account-credentials.md` — exists on disk, gitignored (verified with `git check-ignore`)
- `[x] FOUND: .planning/phases/01-foundation-long-lead-vendors/runbook-supabase-setup.md` — exists, committed in `5db3848`
- `[x] FOUND: .planning/phases/01-foundation-long-lead-vendors/runbook-sentry-setup.md` — exists, committed in `73e2f7f`
- `[x] FOUND commit 3b1eafc` — chore(01-01): gitignore phase-local account-credentials files
- `[x] FOUND commit 5db3848` — docs(01-01): Supabase runbook
- `[x] FOUND commit 73e2f7f` — docs(01-01): Sentry runbook

Honest scope assessment:

- **Verifiable now:** template exists, gitignore protects it, both runbooks are committed and readable.
- **NOT verifiable until founder acts:** that the runbooks actually produce working Supabase projects + Sentry org. That's a checkpoint outside the executor's scope by design (plan declares `autonomous: false`).
- **NOT verifiable until plan 01-02:** that the captured credentials let CLI commands actually authenticate. INFRA-01 stays open until then.

---

*Phase: 01-foundation-long-lead-vendors*
*Completed: 2026-05-15*
