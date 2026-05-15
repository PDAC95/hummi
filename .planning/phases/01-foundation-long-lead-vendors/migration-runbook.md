# Hummi Migration Runbook

**Audience:** Anyone touching the DB schema. Follow these steps for every schema change.

## Policy (INFRA-02 — enforced)

- **Never** edit schema directly in Supabase Studio for prod. All changes go through migration files.
- Migration files live in `supabase/migrations/` and are timestamped: `YYYYMMDDHHMMSS_description.sql`.
- The CLI assigns the timestamp via `supabase migration new <description>`.
- Migrations must be **idempotent** — every `CREATE` should use `IF NOT EXISTS`, every `DROP` should use `IF EXISTS`. This lets us re-run on fresh DBs without errors.
- An applied migration is **immutable**. If a migration is wrong, write a new migration that reverses or fixes it. Never edit a file that's already in `LOCAL` + `REMOTE`.

## Local dev workflow

```powershell
# 1. Create new migration
supabase migration new add_users_table
# → creates supabase/migrations/<timestamp>_add_users_table.sql

# 2. Edit the file with your SQL (idempotent)

# 3. (Optional) Drop and re-run all migrations on a local Docker Postgres
supabase db reset

# 4. Iterate until happy
```

## Pushing to staging

Staging push happens from the developer machine after the migration is reviewed locally.

```powershell
# Set the access token once per shell (or persist via env vars)
$env:SUPABASE_ACCESS_TOKEN = "<paste from .planning/phases/01-foundation-long-lead-vendors/account-credentials.md>"

# Link once per machine — uses STAGING_PROJECT_ID + STAGING_DB_PASSWORD
supabase link --project-ref <STAGING_PROJECT_ID> -p "<STAGING_DB_PASSWORD>"

# Always dry-run first — the CLI prints which migrations would apply without touching the DB
supabase db push --linked --dry-run -p "<STAGING_DB_PASSWORD>"

# Apply for real
supabase db push --linked -p "<STAGING_DB_PASSWORD>"

# Confirm — both LOCAL and REMOTE columns must be populated for every migration
supabase migration list --linked -p "<STAGING_DB_PASSWORD>"
```

If `REMOTE` is empty for a migration after `db push`, the push didn't actually land. Re-run.

## Pushing to prod

**Do not push manually.** Open a PR → merge to `main` → GitHub Actions `deploy-prod.yml` workflow (created in Plan 01-03) runs `supabase db push --linked` against `hummi-prod` using GH Actions secrets `SUPABASE_ACCESS_TOKEN` + `PRODUCTION_PROJECT_ID` + `PRODUCTION_DB_PASSWORD`.

Why: the only thing standing between a half-tested migration and prod is human review on the PR. Bypassing CI defeats INFRA-02.

## Recovering from a bad migration

- **Applied to staging only:** Write a new migration that reverses the change. Push staging again. Move on.
- **Applied to prod:** Same — write a forward fix. Never rewrite an applied migration's contents.
- **Applied locally only (via `supabase db reset`):** Edit freely; nothing has hit a real DB.
- **To check what's applied where:** `supabase migration list --linked` against the linked env.

## CLI version pin

- Required: ≥ 2.84 (older versions had broken `--dry-run` per RESEARCH.md Pitfall 1).
- Verified working: 2.98.2 (current as of Plan 01-02).
- CI pin lives in `.github/workflows/pr-checks.yml` via the `supabase/setup-cli@v1` action's `version:` field. Bump it deliberately, not opportunistically.

## Notes from the initial migration (Plan 01-02)

- `00000000000001_init_extensions_schemas.sql` enables `pgcrypto` (already pre-installed by Supabase — `IF NOT EXISTS` skips it cleanly), `pg_cron`, and `pg_net` in the `extensions` schema, and creates the `ops` + `stripe` schemas.
- pg_cron and pg_net are restricted-permission extensions on Supabase; only the `postgres` role can install them. The CLI runs as `postgres` over the pooler so this works without manual dashboard intervention.
- The seed file (`supabase/seed.sql`) is intentionally minimal in Phase 1 — real seed rows (services, FSAs, admin user) land in Phases 3-4 once their target tables exist.

## Anti-patterns to avoid

- Editing an already-applied migration file → **forbidden**. Write a forward fix.
- Running `supabase db push` against prod from your laptop → **forbidden**. Always via CI.
- Committing `supabase/.temp/` (linked-project state) → **gitignored**. Don't `git add -f` it.
- Putting raw connection strings or DB passwords in any committed file → use `account-credentials.md` (gitignored) or GH Actions secrets.
