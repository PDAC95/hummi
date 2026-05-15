# Runbook — Supabase Setup (Plan 01-01)

**Audience:** Founder (manual account creation; cannot be automated — requires login + 2FA + payment-method-on-file decisions)
**Estimated time:** ~15 minutes
**Output:** Two Supabase projects (`hummi-staging`, `hummi-prod`) plus a personal access token for CI use, all credentials captured into `account-credentials.md` (gitignored, same directory as this file).

---

## Why two projects (not branches)

Per `01-CONTEXT.md` and `01-RESEARCH.md` §"Pattern 1: Supabase CLI for Two Projects":

- Hard isolation between staging and prod — preview deploys can never touch prod data
- Independent DB passwords + service-role keys
- CI applies migrations to staging on PR, to prod only on merge to `main`
- Free tier covers both projects for v1

DO NOT use Supabase Branching for this — branching shares the parent project's auth users and storage, which defeats the isolation goal.

---

## Prerequisites

- A Supabase account ([supabase.com](https://supabase.com), GitHub login is fine)
- A password manager open and ready (1Password, Bitwarden, Apple Keychain) — DB passwords are shown ONCE and never recoverable from the dashboard
- This file's sibling `account-credentials.md` open in an editor — you will paste captured values into it as you go

---

## Step 1 — Create `hummi-staging`

1. Go to https://supabase.com/dashboard/new
2. Fill the form:
   - **Organization:** create one if you don't have it (suggested name: `Hummi`)
   - **Name:** `hummi-staging`
   - **Database password:** click "Generate a password" OR type your own — minimum 16 chars, mix of letters/numbers/symbols
   - **Region:** `East US (North Virginia)` — this is `us-east-1`, lowest latency from Ontario on the free tier
   - **Pricing plan:** Free
3. **IMMEDIATELY copy the DB password** into `account-credentials.md` under `STAGING_DB_PASSWORD`. Supabase does not show it again, and resetting it later is a separate flow that breaks any existing connection strings.
4. Click "Create new project" → wait ~2 minutes for provisioning
5. Once provisioned, go to **Settings → General**
6. Copy the **Reference ID** (looks like `abcdefghijklmnopqrst`, 20 chars) into `account-credentials.md` under `STAGING_PROJECT_ID`
7. Note today's date under `Created:` for hummi-staging

---

## Step 2 — Create `hummi-prod`

Repeat Step 1 exactly, with these differences:

- **Name:** `hummi-prod`
- **Database password:** generate a NEW password (do not reuse the staging one — isolation matters)
- Capture into `PRODUCTION_DB_PASSWORD` and `PRODUCTION_PROJECT_ID`

---

## Step 3 — Generate the personal access token (for CI)

This token lets the Supabase CLI authenticate inside GitHub Actions (used by plan 01-03).

1. Go to https://supabase.com/dashboard/account/tokens
2. Click **"Generate new token"**
3. Token name: `hummi-ci`
4. Click **"Generate token"**
5. **IMMEDIATELY copy the token** (starts with `sbp_…`) into `account-credentials.md` under `SUPABASE_ACCESS_TOKEN`
6. Note today's date under `Created:` for the token

The token has full access to your Supabase account — treat it like a password. It will be stored in GitHub Actions secrets in plan 01-03 and never appear in code.

---

## Step 4 — Verify

Both projects must be visible at https://supabase.com/dashboard. Each should show status **"Healthy"** in the dashboard.

Also confirm in `account-credentials.md`:

- `STAGING_PROJECT_ID` and `PRODUCTION_PROJECT_ID` are 20-char ref IDs
- `STAGING_DB_PASSWORD` and `PRODUCTION_DB_PASSWORD` are different from each other
- `SUPABASE_ACCESS_TOKEN` starts with `sbp_`
- No `__FILL_IN__` placeholders remain in the Supabase section

---

## Common gotchas

- **"My DB password didn't save anywhere"** → reset it from `Settings → Database → Reset database password`. Note this invalidates any existing connection strings, which is fine in plan 01-01 (nothing depends on it yet).
- **"Free tier project paused after 7 days of inactivity"** → expected behavior on free tier. Plan 01-02 will run a migration immediately after, which counts as activity. If a project gets paused before then, just visit the dashboard and click "Restore project".
- **"Region us-east-1 not listed"** → it's labelled `East US (North Virginia)` in the UI. That's the same region.
- **"Should I enable any extensions now?"** → No. Plan 01-02 enables `pgcrypto`, `pg_cron`, `pg_net` via migration so it's tracked in version control. Don't toggle them in the dashboard.

---

## What's next

Once `account-credentials.md` has all Supabase values filled in (zero `__FILL_IN__` in the Supabase section), plan 01-02 can run. It will:

1. `supabase init` locally
2. `supabase link --project-ref $STAGING_PROJECT_ID`
3. Create the first migration (extensions + `ops` and `stripe` schemas)
4. `supabase db push` against staging

Plan 01-03 will then wire `STAGING_PROJECT_ID`, `PRODUCTION_PROJECT_ID`, `STAGING_DB_PASSWORD`, `PRODUCTION_DB_PASSWORD`, and `SUPABASE_ACCESS_TOKEN` into GitHub Actions secrets.
