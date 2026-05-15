---
phase: 01-foundation-long-lead-vendors
plan: 02
subsystem: infra
tags: [supabase, postgres, migrations, pgcrypto, pg_cron, pg_net, supabase-cli]

requires:
  - phase: 01-foundation-long-lead-vendors
    provides: "Plan 01-01 — staging+prod Supabase projects exist with credentials captured in account-credentials.md"
provides:
  - "supabase/ directory initialized at repo root with config.toml ([api], [db], [studio])"
  - "First migration 00000000000001_init_extensions_schemas.sql applied to hummi-staging — pgcrypto, pg_cron, pg_net in extensions schema; ops + stripe schemas with COMMENTs"
  - "supabase/seed.sql scaffold (intentionally minimal — Phase 1 has no app tables yet)"
  - "Founder-facing migration runbook documenting the local→staging→prod CI flow"
  - "supabase/.temp/ + supabase/.branches/ gitignored at repo root (belt-and-suspenders over the supabase/.gitignore the CLI created)"
affects: [01-03 (CI deploy-prod.yml will reuse this push pattern), 01-04 (Sentry edge-function deploy will share supabase link state), 02 (Auth phase will write the next migration on top of these schemas), 03+ (every later phase appends migrations to supabase/migrations/)]

tech-stack:
  added: [Supabase CLI v2.98.2 (via Scoop), supabase project structure, pgcrypto/pg_cron/pg_net Postgres extensions]
  patterns: ["Migration files numbered 00000000000001 onward (timestamp-style but zero-padded for the first one)", "All CREATE statements use IF NOT EXISTS for idempotency", "ops + stripe as the home schemas for internal-ops tables vs Stripe webhook idempotency", "WITH SCHEMA extensions to keep public clean"]

key-files:
  created:
    - "supabase/config.toml"
    - "supabase/.gitignore"
    - "supabase/migrations/00000000000001_init_extensions_schemas.sql"
    - "supabase/seed.sql"
    - ".planning/phases/01-foundation-long-lead-vendors/migration-runbook.md"
  modified:
    - ".gitignore"

key-decisions:
  - "Root .gitignore gets supabase/.temp + supabase/.branches entries even though supabase/.gitignore (created by `supabase init`) already covers them — belt-and-suspenders so a future `git clean -fdx` or a stripped supabase/.gitignore can't accidentally leak the linked-project ref"
  - "Seed file kept intentionally minimal — wrote a placeholder SELECT instead of fake INSERTs into tables that don't exist yet. Seed gets real rows in Phases 3-4 when service_categories/services/coverage_areas/admin_users tables land"
  - "Verified migration applied via three independent signals (not just one): (1) supabase migration list --linked shows LOCAL+REMOTE both populated; (2) supabase db dump --schema ops,stripe returns the live schemas with the COMMENTs we wrote; (3) supabase db dump --schema extensions returns grant_pg_cron_access + grant_pg_net_access event triggers (which are created BY pg_cron and pg_net during install)"

patterns-established:
  - "Migration verification pattern: `supabase migration list --linked` is the source of truth — both LOCAL and REMOTE columns must be populated. If REMOTE is empty after a push, the push didn't land"
  - "Always dry-run before push: `supabase db push --linked --dry-run` first, only then `supabase db push --linked`"
  - "Idempotent migrations: every CREATE EXTENSION/SCHEMA uses IF NOT EXISTS. Supabase preinstalls pgcrypto on every project, and the migration handles this without erroring (NOTICE: extension already exists, skipping)"

requirements-completed: [INFRA-02, INFRA-06, INFRA-07]

duration: 21min
completed: 2026-05-15
---

# Phase 01 Plan 02: Supabase Init + Initial Migration Summary

**Supabase project scaffolded at repo root, initial migration (pgcrypto + pg_cron + pg_net + ops/stripe schemas) applied live to hummi-staging, and the migration runbook documents the founder flow for every future schema change.**

## Performance

- **Duration:** 21 min
- **Started:** 2026-05-15T15:29:36Z
- **Completed:** 2026-05-15T15:51:25Z
- **Tasks:** 2 auto + 1 human-verify checkpoint (auto-approved by executor — equivalent live verification performed via CLI)
- **Files created:** 5 (`supabase/config.toml`, `supabase/.gitignore`, `supabase/migrations/00000000000001_init_extensions_schemas.sql`, `supabase/seed.sql`, `.planning/phases/01-foundation-long-lead-vendors/migration-runbook.md`)
- **Files modified:** 1 (`.gitignore`)

## Accomplishments

- Initialized `supabase/` via `supabase init` (CLI v2.98.2 — well above the ≥2.84 plan requirement)
- Wrote and applied the first migration to `hummi-staging` (project ref tracked in `account-credentials.md`); REMOTE column populated, schemas + extension auxiliary objects independently confirmed via `db dump`
- Built the founder-facing migration runbook covering local dev, staging push (manual from dev machine), prod push (CI-only via Plan 01-03), recovery via forward-fix migrations, and CLI version pin
- Locked `supabase/.temp/` out of git at the root level — verified with `git check-ignore` and a clean `git status` after the CLI populated `.temp/project-ref` on link

## Task Commits

Each task committed atomically on `phase-01/02-supabase-init-migrations`:

1. **Task 1: Initialize supabase/ + write initial migration + seed** — `6587fd7` (feat)
2. **Task 2: Link to hummi-staging and push migration + write runbook** — `34757b3` (docs)

Plus the orchestrator's plan-metadata commit at the end of this summary (will be `node gsd-tools commit ...`).

## Live Verification Against hummi-staging

This is what was actually proved against the remote DB, not just claimed:

```
$ supabase migration list --linked
   Local          | Remote         | Time (UTC)
  ----------------|----------------|----------------
   00000000000001 | 00000000000001 | 00000000000001
```

```
$ supabase db dump --linked --schema ops,stripe --keep-comments
... (excerpt) ...
CREATE SCHEMA IF NOT EXISTS "ops";
COMMENT ON SCHEMA "ops" IS 'Internal operations (audit_log, notifications_log, jobs)';
CREATE SCHEMA IF NOT EXISTS "stripe";
COMMENT ON SCHEMA "stripe" IS 'Stripe webhook idempotency + cached state';
```

```
$ supabase db dump --linked --schema extensions --keep-comments | grep grant_pg
COMMENT ON FUNCTION "extensions"."grant_pg_cron_access"() IS 'Grants access to pg_cron';
COMMENT ON FUNCTION "extensions"."grant_pg_net_access"() IS 'Grants access to pg_net';
```

Those `grant_pg_cron_access` and `grant_pg_net_access` event-trigger functions are created automatically when `pg_cron` and `pg_net` are installed — their presence is independent proof those extensions exist on the remote, beyond just trusting the `supabase db push` exit code.

The push itself emitted one informational NOTICE: `extension "pgcrypto" already exists, skipping` — Supabase pre-installs pgcrypto on every project, and the `IF NOT EXISTS` clause handles it cleanly. No errors, no warnings.

**Production (`hummi-prod`, project ref tracked in `account-credentials.md`) was NOT touched** — that's Plan 01-03's job (CI applies it on merge to `main`).

## Decisions Made

- **Root .gitignore gets explicit supabase/.temp + supabase/.branches entries** even though `supabase init` creates `supabase/.gitignore` with the same entries. Rationale: belt-and-suspenders. If a future contributor strips or replaces `supabase/.gitignore`, the root rule still catches it.
- **Seed file is intentionally minimal** — a single `SELECT 'note'` placeholder instead of fake INSERTs into `services` / `coverage_areas` / `admin_users` tables. Those tables don't exist yet (they land in Phases 3-4). Writing INSERT INTO services (...) here would fail at `supabase db reset` because the relation doesn't exist. The plan body (Task 1 step 5) explicitly directed this approach — see "Deviations from Plan" for how this differs from the orchestrator's success-criteria phrasing.
- **Verified live via `db dump` per schema** rather than asking the founder to log into Studio. The plan's checkpoint expected human visual verification, but the orchestrator told me to verify everything I could via CLI. `db dump` reads the live schema and returns DDL — strong evidence the schemas + extension hooks are present.

## Deviations from Plan

### 1. [Rule 4 — Documented, not architectural] Seed file scope: orchestrator vs. plan body

- **Found during:** SUMMARY.md self-check
- **Issue:** The orchestrator's prompt success criteria list "Seed data summary (services, FSAs, admin)" expecting real seed rows. The plan body (Task 1 step 5) explicitly says: "Real data (services, FSAs, admin user) will be added when those tables exist (Phases 3-4). This file is intentionally minimal in Phase 1." These two contradict each other.
- **Resolution:** Followed the plan body — it is the authoritative spec, and writing INSERTs into nonexistent tables would error on `supabase db reset`. The seed has a placeholder SELECT documenting why it's empty in this phase.
- **Files affected:** `supabase/seed.sql`
- **Re-verifies:** Plan body's "Why" is technically correct — without service/coverage/admin schemas (which arrive in Phases 3-4), there's nothing to seed against. A `seed.sql` referencing nonexistent tables would break local dev for everyone.

### 2. [Rule 3 — Blocking, no fix needed] CLI plugin-hint stderr noise

- **Found during:** Every `supabase` invocation
- **Issue:** Some shim/plugin layer emits `<claude-code-hint v="1" type="plugin" value="supabase@claude-plugins-official" />` on stderr for every invocation, which PowerShell flags as `NativeCommandError`. It's purely cosmetic — the CLI completes successfully, exit codes are correct, output on stdout is fine.
- **Resolution:** Ignored. Confirmed via `Finished supabase ...` markers and migration list output that the CLI is working normally. Did not attempt to suppress the hint — it's not our shim and disabling it might affect plugin behavior.

### 3. [Rule 1 — Bug, not blocking] Plan's Task 1 verify command uses `-SimpleMatch` with regex pipes

- **Found during:** Running Task 1 verify
- **Issue:** Plan specifies `Select-String -Path ... -Pattern 'pgcrypto|pg_cron|pg_net|ops|stripe' -SimpleMatch`. The `-SimpleMatch` flag treats the `|` as literal, so the command returns 0 matches even when all five tokens are present. Could mislead a future executor into thinking the migration is empty.
- **Resolution:** Re-ran the same `Select-String` without `-SimpleMatch` (proper regex mode) and got the expected 7 matching lines covering all 5 tokens. Did NOT amend the plan file — the plan is immutable once executed. Will note this in any future plan template review.

---

**Total deviations:** 3 (1 plan-vs-orchestrator scope clarification, 1 cosmetic-ignored, 1 verify-command-bug-with-workaround)
**Impact on plan:** Zero functional impact. The migration applied cleanly, the schemas exist live, and the runbook is in place. The seed-file deviation is the most consequential and is fully documented for the orchestrator's review.

## Issues Encountered

- **`supabase/seed.sql` not auto-created by `supabase init`** — current CLI (v2.98.2) only creates `supabase/config.toml` and `supabase/.gitignore` plus `.temp/`. We had to write `seed.sql` and `migrations/00000000000001_init_extensions_schemas.sql` from scratch. Plan was already structured to do this, so no scrambling — flagging it because the plan implied `seed.sql` would already exist.

## Authentication Gates

None — `SUPABASE_ACCESS_TOKEN` and `STAGING_DB_PASSWORD` were already in `account-credentials.md` from Plan 01-01. Set the env var inline per command, did not persist.

## User Setup Required

None — credentials already captured by Plan 01-01. Plan 01-03 will mirror this push pattern in CI for the prod project, using GH Actions secrets seeded from the same `account-credentials.md`.

## Next Plan Readiness

- **Plan 01-03 (CI guardrails)** can now reference `supabase/migrations/` as the source for its `supabase db push --dry-run` PR check, and the migration runbook's "Pushing to prod" section for the CI workflow design.
- **Future schema work (Phase 2 onward)** has a documented pattern: `supabase migration new <description>` → idempotent SQL → `db push --linked --dry-run` → `db push --linked` → confirm via `migration list --linked`.
- **Concern:** The runbook references `.github/workflows/pr-checks.yml` and `deploy-prod.yml` which don't exist yet (they're Plan 01-03 deliverables). The references are forward-looking and will resolve when 01-03 ships. Not a blocker.

## Self-Check: PASSED

Verified before writing this section:

- `supabase/config.toml` — present, has `[api]` (line 7), `[db]` (line 27), `[studio]` (line 88) ✓
- `supabase/migrations/00000000000001_init_extensions_schemas.sql` — present, contains all 5 required tokens (pgcrypto, pg_cron, pg_net, ops, stripe) ✓
- `supabase/seed.sql` — present (intentionally minimal placeholder) ✓
- `.gitignore` — contains `supabase/.temp/` and `supabase/.branches/` ✓
- `git check-ignore supabase/.temp/cli-latest` returns the path (i.e., it IS ignored) ✓
- `git status --short` shows zero entries under `supabase/.temp/` even though `.temp/` contains `project-ref`, `pooler-url`, `linked-project.json` etc. — gitignore is working ✓
- `migration-runbook.md` — present at `.planning/phases/01-foundation-long-lead-vendors/migration-runbook.md` ✓
- Commit `6587fd7` (Task 1) exists in `git log` ✓
- Commit `34757b3` (Task 2) exists in `git log` ✓
- Migration verified live on hummi-staging — `supabase migration list --linked` returns LOCAL+REMOTE both = `00000000000001`; `db dump --schema ops,stripe` returns the schemas with COMMENTs; `db dump --schema extensions` returns the pg_cron + pg_net grant trigger functions ✓
- No project refs, DB passwords, or access tokens leaked into any committed file (`grep` against the 5 known secret values returned no matches) ✓
- Production (`hummi-prod`) was NOT touched — only `hummi-staging` was linked + pushed ✓ (project refs intentionally omitted here; tracked in gitignored `account-credentials.md`)

---
*Phase: 01-foundation-long-lead-vendors*
*Completed: 2026-05-15*
