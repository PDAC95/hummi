# Runbook — Sentry Setup (Plan 01-01)

**Audience:** Founder (manual account creation; cannot be automated — requires login + 2FA + org-name decisions)
**Estimated time:** ~10 minutes
**Output:** A Sentry org plus two projects (`hummi-spa` and `hummi-edge`) plus an auth token for CI source-map uploads, all credentials captured into `account-credentials.md` (gitignored, same directory as this file).

---

## Why two projects (one for SPA, one for Edge)

Per `01-CONTEXT.md` and `01-RESEARCH.md`:

- The SPA (React 19 + Vite) and Supabase Edge Functions (Deno) are different runtimes with different stack trace formats and source-map needs
- Separate projects mean separate DSNs, separate alert routing, and clean per-runtime issue grouping in the dashboard
- Free tier (5k events/month) covers both projects for v1 with sample rates `100%` in dev/staging and `25%` in prod

---

## Prerequisites

- A Sentry account ([sentry.io](https://sentry.io), Google or GitHub login is fine)
- Decide on an **org slug** before starting — the slug appears in URLs (`sentry.io/organizations/<slug>/…`) and is hard to change later. Recommended: `hummi`. Capture whatever you choose into `SENTRY_ORG`.
- This file's sibling `account-credentials.md` open in an editor

---

## Step 1 — Create the org

1. Go to https://sentry.io/signup/ (or sign in if you already have an account)
2. If creating a new account: choose **"I'll add my own code"** when prompted (we want full control of the integration; plan 01-04 wires the SDK by hand)
3. When asked for an org slug: enter `hummi` (or your chosen slug)
4. Capture the slug into `account-credentials.md` under `SENTRY_ORG`

If you already have a Sentry org from another project, you can either:

- **(Recommended)** Reuse it — just record its slug in `SENTRY_ORG` and skip creating a new one
- Create a fresh org for Hummi (org settings include billing scope, so isolated billing is the only real reason to add a second org)

---

## Step 2 — Create project `hummi-spa`

1. From the org dashboard, click **"Create Project"** (or **Projects → New Project**)
2. Pick platform: **React**
3. Set alert frequency: **"Alert me on every new issue"** (v1 default; plan 01-04's instrumentation later filters noisy errors)
4. Project name: `hummi-spa`
5. Team: default
6. Click **Create Project**
7. On the post-creation screen, copy the **DSN** (looks like `https://abc123…@o123.ingest.sentry.io/456`) into `account-credentials.md` under `VITE_SENTRY_DSN`
8. Look at the project URL in the address bar — it will be `sentry.io/organizations/<org>/projects/<slug>/…`. Copy that `<slug>` into `SENTRY_PROJECT_SPA`. If you kept the recommended name, this will be `hummi-spa`.

> **Why we capture the slug separately from the project name:** Sentry sometimes appends a numeric suffix to slugs if there's a conflict (e.g., `hummi-spa-2`). Plan 01-04's `vite.config.ts` uses the slug for source-map uploads — if it doesn't match, uploads silently 404 and stack traces in prod become unreadable. Always capture the slug from the URL, not the display name.

---

## Step 3 — Create project `hummi-edge`

1. Click **"Create Project"** again
2. Pick platform: **Other** — Deno is not in the picker; "Other" with manual SDK install is the standard path for Deno (Sentry's Deno SDK works fine, just isn't first-class in the UI)
3. Project name: `hummi-edge`
4. Team: default
5. Click **Create Project**
6. Copy the DSN into `account-credentials.md` under `SENTRY_DSN_EDGE`
7. Capture the URL slug into `SENTRY_PROJECT_EDGE` (recommended: `hummi-edge`)

---

## Step 4 — Generate the auth token (for CI source-map upload)

1. Go to **User settings → Auth Tokens** (https://sentry.io/settings/account/api/auth-tokens/)
2. Click **"Create New Token"**
3. Token name: `hummi-ci-source-maps`
4. Scopes — check ONLY these two:
   - `project:releases`
   - `org:read`
5. Click **Create Token**
6. **IMMEDIATELY copy the token** (starts with `sntrys_…`) into `account-credentials.md` under `SENTRY_AUTH_TOKEN`. Sentry shows it once.
7. Note today's date under `Created:` for the token

The token will be stored in GitHub Actions secrets in plan 01-04 and used by `@sentry/vite-plugin` to upload source maps after each successful build. With only `project:releases` + `org:read`, a leaked token can manage releases but cannot read issue data or modify project settings — minimum-privilege principle.

---

## Step 5 — Verify

Both projects must be visible at `https://sentry.io/organizations/<your-org>/projects/`. Each should show **"Waiting for events"** until plan 01-04 wires up the SDKs.

In `account-credentials.md`, confirm in the Sentry section:

- `SENTRY_ORG` is the slug (lowercase, no spaces)
- `VITE_SENTRY_DSN` and `SENTRY_DSN_EDGE` both start with `https://` and end with a numeric ID
- `SENTRY_PROJECT_SPA` and `SENTRY_PROJECT_EDGE` are URL slugs (likely `hummi-spa` / `hummi-edge`)
- `SENTRY_AUTH_TOKEN` starts with `sntrys_`
- No `__FILL_IN__` placeholders remain in the Sentry section

---

## Common gotchas

- **"I picked the wrong platform"** → easy fix. Project Settings → General Settings → Platform; change it. SDK choice in code is independent.
- **"My org slug is taken (`hummi` is in use)"** → try `hummi-app`, `hummi-cleaning`, or your last-name initial appended (e.g., `hummi-pm`). Whatever you pick, capture it precisely in `SENTRY_ORG` — case-sensitive, exactly as it appears in URLs.
- **"Auth token leaked / committed by accident"** → revoke immediately at the same Auth Tokens page, generate a new one, update `account-credentials.md`. No history rewrite needed (per phase-1 secrets-hygiene policy).
- **"Should I set up alert rules now?"** → no. Plan 01-04 configures them after the SDK is wired and we have a synthetic test event flowing.

---

## What's next

Once `account-credentials.md` has all Sentry values filled in (zero `__FILL_IN__` in the Sentry section), plan 01-04 can run. It will:

1. Install `@sentry/react` and `@sentry/vite-plugin` for the SPA
2. Install `@sentry/deno` for Edge Functions
3. Wire up DSNs from env vars (Vite for SPA, Supabase Edge Function env for Edge)
4. Configure source-map upload in `vite.config.ts` using `SENTRY_ORG`, `SENTRY_PROJECT_SPA`, `SENTRY_AUTH_TOKEN`
5. Trigger a synthetic error from each runtime to verify both DSNs route to the right project (Phase 1 success criterion #5)

Plan 01-03 will move all five Sentry secrets into GitHub Actions secrets so CI can use them.
