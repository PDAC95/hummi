# GitHub Actions Secrets — Required for Phase 1 Workflows

This is the founder-facing checklist for adding the GitHub Actions secrets that the
Phase 1 CI workflows (`pr-checks.yml`, `deploy-staging.yml`, `deploy-prod.yml`,
`gitleaks.yml`) need to function. Without these the workflows will fail at the
`supabase link` / `supabase db push` step.

**Repo:** https://github.com/PDAC95/hummi

---

## Where to add them

Open: https://github.com/PDAC95/hummi/settings/secrets/actions
(Settings tab → Secrets and variables → Actions → "New repository secret")

For each row in the table below, click **New repository secret**, paste the
**Name** exactly as written, paste the **Value** from the source listed, then
click **Add secret**.

---

## The 8 secrets

Values come from `.planning/phases/01-foundation-long-lead-vendors/account-credentials.md`
(gitignored, never committed).

| # | Secret name             | Value source (account-credentials.md field)               | Used by                                                | Required for plan |
|---|-------------------------|-----------------------------------------------------------|--------------------------------------------------------|-------------------|
| 1 | `SUPABASE_ACCESS_TOKEN` | Supabase Access Token                                     | pr-checks.yml, deploy-staging.yml, deploy-prod.yml     | 01-03             |
| 2 | `STAGING_PROJECT_ID`    | hummi-staging Project Ref                                 | pr-checks.yml, deploy-staging.yml                      | 01-03             |
| 3 | `STAGING_DB_PASSWORD`   | hummi-staging DB Password                                 | pr-checks.yml, deploy-staging.yml                      | 01-03             |
| 4 | `PRODUCTION_PROJECT_ID` | hummi-prod Project Ref                                    | deploy-prod.yml                                        | 01-03             |
| 5 | `PRODUCTION_DB_PASSWORD`| hummi-prod DB Password                                    | deploy-prod.yml                                        | 01-03             |
| 6 | `SENTRY_AUTH_TOKEN`     | SENTRY_AUTH_TOKEN                                         | (will be wired in Plan 01-04 for source-map upload)    | 01-04             |
| 7 | `SENTRY_ORG`            | SENTRY_ORG                                                | (Plan 01-04)                                           | 01-04             |
| 8 | `SENTRY_PROJECT_SPA`    | SENTRY_PROJECT_SPA (slug — e.g., `hummi-spa`)             | (Plan 01-04 — feeds vite.config.ts source-map target)  | 01-04             |

**Why a separate `SENTRY_PROJECT_SPA` field for the slug:** Sentry can append numeric
suffixes to project slugs on collision (`hummi-spa-2`). If the source-map upload uses
the wrong slug, `@sentry/vite-plugin` 404s silently and your stack traces stay
minified in prod. Capture the slug exactly as it appears in the Sentry project URL.

---

## Verification

After adding, open any PR (or push a commit). In the Actions tab, click into the
workflow run and expand each step:

- If you see a step like `supabase link --project-ref ...` succeed → the
  `SUPABASE_ACCESS_TOKEN` and corresponding project ID secrets are wired.
- If a step fails with `Project ref is required` or `Invalid access token` →
  re-check the value vs. account-credentials.md. Most common mistake is pasting
  the project URL instead of the project ref.

The secrets needed for Plan 01-03 to fully function are the first 5 (Supabase ones).
The Sentry secrets (6–8) can wait until Plan 01-04 is executed.

---

## Security reminders

- **NEVER** paste these values into a commit message, PR comment, Discord, Slack,
  email, or any non-secret-store location.
- They live only in:
  1. GitHub Actions secrets (this page)
  2. Your local `account-credentials.md` (gitignored at the phase level)
  3. Supabase Edge Function env vars (for runtime — added when we ship Edge Functions)
- If you suspect a secret has leaked, **rotate it first** (Supabase: Project Settings
  → Database → Reset DB password; Sentry: Settings → Auth Tokens → Revoke), then
  update the GitHub secret with the new value.
- GitHub never displays secret values after they're set — only the name. If you
  forget which value you put in, look it up in `account-credentials.md`, don't
  try to read it from GH.
