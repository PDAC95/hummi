---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
last_updated: "2026-05-15T16:30:39.787Z"
progress:
  total_phases: 1
  completed_phases: 0
  total_plans: 7
  completed_plans: 4
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** Que un cliente de KW/Cambridge/Guelph — residencial o comercial — pueda agendar y pagar una limpieza en menos de 5 minutos, y que vuelva a contratar sin volver a capturar nada.
**Current focus:** Phase 1 — Foundation & Long-Lead Vendors

## Current Position

Phase: 1 of 12 (Foundation & Long-Lead Vendors)
Plans complete: 4 of 7 (01-01 docs + 01-06 docs await founder; 01-02 Supabase init+migration applied LIVE to hummi-staging; 01-03 CI guardrails workflows committed locally — secrets + branch protection await founder post-merge)
Status: In progress — Wave 2 progressing. Plan 01-03 (CI guardrails) done locally; orchestrator owns push + PR. Plan 01-04 (Sentry) and 01-05 (pre-commit hooks) are the natural next plans in Wave 2.
Last activity: 2026-05-15 — Plan 01-03 ci-guardrails: 4 GH Actions workflows + shared secret-leak script + 2 founder runbooks committed on phase-01/03-ci-guardrails.

Progress: [██████░░░░░░] 57% of Phase 1 plans complete (4/7)

## Performance Metrics

**Velocity:**
- Total plans completed: 4 (01-01 docs await founder, 01-06 docs await founder, 01-02 fully executed live against staging, 01-03 workflows committed locally)
- Average duration: 10.5 min
- Total execution time: 0.7 h

**By Phase:**

| Phase | Plans | Total  | Avg/Plan |
|-------|-------|--------|----------|
| 01-foundation-long-lead-vendors | 4/7 | 42 min | 10.5 min |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min, executor done), 01-06 (8 min, executor done), 01-02 (21 min, fully shipped live), 01-03 (9 min, workflows committed locally)
- Trend: 01-03 came in at 9 min — fast because all 4 workflows + 2 docs + 1 script are pure file-creation with no live verification step (CI itself is the live verification, but that requires founder to add secrets first)

*Updated after each plan completion*
| Phase 01-foundation-long-lead-vendors P01 | 4min | 1 tasks | 5 files |
| Phase 01-foundation-long-lead-vendors P06 | 8min | 1 tasks | 7 files |
| Phase 01-foundation-long-lead-vendors P02 | 21min | 2 tasks | 6 files |
| Phase 01-foundation-long-lead-vendors P03 | 9min | 3 tasks | 9 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. Highlights affecting Phase 1:

- Two Supabase projects from day one (staging + prod) to prevent preview deploys hitting prod
- Phase 1 absorbs brownfield baseline debt (npm-audit triage, gitleaks history scan, route-based code splitting groundwork) per PITFALLS guidance
- Long-lead vendor work kicked off immediately: Twilio toll-free (2–3 wk), Stripe Canadian bank verification, Resend SPF/DKIM/DMARC warmup (1–2 wk), CRA HST registration
- Admin role lives only in `app_metadata`, never `user_metadata` (security-critical)
- Stripe Tax with `txcd_20030000` + `tax_behavior: "exclusive"` from day one
- **01-01:** Phase-local credentials pattern — gitignored `account-credentials.md` per phase via wildcard `.planning/phases/*/account-credentials.md`, paired with committable `runbook-<vendor>-setup.md` files (zero secrets in git). Future phases that capture vendor secrets reuse this layout.
- **01-01:** Capture Sentry project URL slug as a separate field from display name — slugs can get numeric suffixes on collision and `@sentry/vite-plugin` source-map upload silently 404s on mismatch.
- **Workflow:** Branch-per-plan GitHub Flow (one branch per GSD plan, naming `phase-XX/YY-slug`, one PR per plan, main always green). Documented in `.claude/CLAUDE.md`.
- **Push protection lesson (2026-05-15):** GitHub Push Protection caught Stripe-shaped placeholders in plan docs. Future placeholders must break the prefix format (e.g., `sk_<test>_PLACEHOLDER`) to avoid false positives.
- **01-02:** Migration verification pattern: `supabase migration list --linked` (LOCAL+REMOTE both populated) is the source of truth, BUT independently validate via `supabase db dump --schema <name>` to confirm the actual DDL landed — exit code alone is insufficient when CLI shim layers can mangle stderr.
- **01-02:** Idempotency policy: every CREATE EXTENSION/SCHEMA in migrations must use `IF NOT EXISTS`. Supabase preinstalls pgcrypto on every project; without IF NOT EXISTS the first migration would fail.
- **01-02:** Belt-and-suspenders gitignore: `supabase init` creates `supabase/.gitignore` with `.temp` + `.branches` entries, but we mirror them in root `.gitignore` so `git clean -fdx` or a stripped supabase/.gitignore can't leak the linked-project ref.
- **01-03:** Same secret-leak grep script (`scripts/secret-leak-grep.sh`) is invoked verbatim from CI (`pr-checks.yml`) AND from the future pre-commit hook (Plan 01-05). Single source of truth for forbidden patterns — they cannot drift apart.
- **01-03:** Created `.gitattributes` enforcing LF on `.sh/.bash/.yml/.yaml/.sql` BEFORE committing the bash script. Without this, Windows `core.autocrlf=true` would have committed `\r`-suffixed shebang and Ubuntu CI would fail to execute the script.
- **01-03:** Deleted legacy `.github/workflows/ci.yml` — its lint+build job was superseded by `lint-typecheck-build` in `pr-checks.yml`. Keeping both would double-run lint/build, burn double Actions minutes, and create duplicate required-check names in branch protection.
- **01-03:** Pinned Supabase CLI to `2.84.5` (not `latest`) in all 3 Supabase workflows per RESEARCH.md Pitfall 1 — older CLIs had broken `--dry-run`, and `latest` is a moving target that could regress silently.
- **01-03:** `deploy-prod.yml` uses `concurrency: deploy-prod` with `cancel-in-progress: false` so two PRs merging back-to-back never run two parallel prod migration applies — the second waits for the first to finish.

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

- **Founder action (Plan 01-01):** Execute `runbook-supabase-setup.md` and `runbook-sentry-setup.md`; fill `account-credentials.md` (gitignored) with real Supabase project IDs, DB passwords, access token, and Sentry DSNs/auth token/slugs. Plan 01-02 cannot start until zero `__FILL_IN__` placeholders remain.
- **Founder action (Plan 01-06 Task 2):** Submit all 4 vendor applications per `.planning/vendors/*-checklist.md` and update `.planning/VENDORS.md` rows with Started date + Status + reference IDs. Recommended order: CRA HST first (instant) → Twilio + Resend week 1 → Stripe week 2.
- **Founder action (Plan 01-03 post-merge):** After this PR merges, follow `.planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md` to add the 8 GH Actions secrets (5 are required for 01-03 workflows: `SUPABASE_ACCESS_TOKEN`, `STAGING_PROJECT_ID`, `STAGING_DB_PASSWORD`, `PRODUCTION_PROJECT_ID`, `PRODUCTION_DB_PASSWORD`; 3 are pre-staged for 01-04: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT_SPA`). Then follow `branch-protection-setup.md` to create the `main` ruleset with the 5 required status checks. **Open a throwaway PR first** so check names appear in GH's autocomplete, THEN add the names to the ruleset.

### Blockers/Concerns

[Issues that affect future work]

- External lead-times (Twilio CSCA, Stripe CA banking, Resend warmup, CRA HST) gate Phase 6 — must start in Phase 1 or Phase 6 slips
- Brownfield bundle is 1.4MB JS / 856KB CSS; route-based code splitting required before Phase 7 to keep customer bundle < 1MB gz
- **Active: Plan 01-01 founder checkpoint** — founder must still execute the Sentry runbook and fill remaining Sentry placeholders in `account-credentials.md` (Supabase block is already filled; the staging push in 01-02 confirmed those values work). Plan 01-04 (Sentry integration) depends on the Sentry block being non-`__FILL_IN__`.
- **Active: Plan 01-03 founder checkpoint** — CI workflows are committed locally but the workflows cannot run successfully until founder adds 5 Supabase secrets to GH Actions and configures the `main` branch ruleset. Until then, the first PR that opens against main will FAIL the supabase-dry-run check (no STAGING_PROJECT_ID secret). Recommended sequencing: merge this PR → add secrets → open throwaway PR to make CI run + populate GH's check-name autocomplete → add the 5 required checks to branch protection.
- **Validation gap:** CI is not yet validated end-to-end. Workflows are well-formed YAML and the secret-leak grep script behaves correctly on Windows (exits 2 with install hint when ripgrep missing), but the actual scan path on Ubuntu is unverified until the first real PR runs. The first PR after secrets are configured will be the live test.

## Session Continuity

Last session: 2026-05-15 (Wave 2 — plan 01-03 ci-guardrails committed locally)
Stopped at: Plan 01-03 done locally on `phase-01/03-ci-guardrails` (3 task commits + plan-metadata commit pending). Orchestrator owns push + PR open. After merge, founder must add the 5 Supabase GH Actions secrets and create the `main` branch ruleset before the workflows are functional.
Resume files:
- `.planning/phases/01-foundation-long-lead-vendors/01-03-SUMMARY.md` (workflow inventory + deviations + Self-Check section)
- `.planning/phases/01-foundation-long-lead-vendors/gh-secrets-setup.md` (8 GH Actions secrets the founder must add)
- `.planning/phases/01-foundation-long-lead-vendors/branch-protection-setup.md` (main ruleset config — required checks, restrict deletions, block force pushes)
- `.planning/phases/01-foundation-long-lead-vendors/account-credentials.md` (Supabase block ready, Sentry block still `__FILL_IN__`)
Next step: Orchestrator pushes `phase-01/03-ci-guardrails` + opens PR. After merge + founder configures secrets/branch protection, kick off plan 01-04 (Sentry) on branch `phase-01/04-sentry`. Plan 01-05 (pre-commit hooks) is also unblocked and can run in parallel — it depends on `scripts/secret-leak-grep.sh` which is already in main after this PR merges.
