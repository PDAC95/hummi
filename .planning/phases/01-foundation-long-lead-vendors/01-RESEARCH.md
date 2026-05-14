# Phase 1: Foundation & Long-Lead Vendors - Research

**Researched:** 2026-05-14
**Domain:** CI/CD guardrails, Supabase migration discipline, secrets hygiene, observability, Canadian vendor lead-times
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Supabase setup & migrations**
- Dos proyectos: `hummi-staging` (preview/dev) y `hummi-prod` (producción)
- Single-owner por ahora: solo el founder tiene acceso a Studio + service_role en prod
- Migration flow: developer corre `supabase migration new` local → `supabase db push` contra staging → CI aplica a prod automáticamente al mergear a `main`
- Zero edición directa en Studio en prod (INFRA-02)
- Seed mínimo realista en staging: 2-3 servicios, 5-10 FSAs de KW/Cambridge/Guelph, 1 usuario admin
- Postgres extensions habilitadas desde Phase 1: `pgcrypto`, `pg_cron`, `pg_net` (INFRA-06)
- Schemas `ops` y `stripe` creados en ambos proyectos (INFRA-07)

**CI/CD pipeline & guardrails**
- CI provider: GitHub Actions (free tier, integración nativa)
- PR checks que bloquean merge (los 5 completos):
  1. `npm run lint`
  2. `tsc -b` (type check)
  3. `vite build`
  4. `supabase db push --dry-run` contra staging
  5. Secret-leak grep en `src/`
- Patrones del secret-leak grep: `VITE_.*SERVICE`, `service_role`, `SUPABASE_SERVICE`
- Red test del secret-grep: branch dedicada `test/secret-leak-red` con un commit intencional que mete `service_role` en `src/`, y se verifica que CI falla. La branch nunca se mergea; es prueba viva del guardrail
- En `main`: además de los PR checks, se corre `supabase db push` real contra prod

**Vendor lead-times**
- Tracking doc: `.planning/VENDORS.md` versionado en repo
- Owner: el founder hace todas las aplicaciones (requieren business info real). Claude provee templates/checklists
- Evidencia mínima por vendor: screenshot del portal + fecha de submission + email confirmation
- Definition of "done" para Phase 1: cada vendor "in flight con fecha de inicio documentada" (NO requiere aprobación final)

**Sentry & monitoring**
- Plan: Free tier (5k events/mes)
- Sample rate: 100% en dev/staging, 25% en prod
- Source maps: upload via CI step después del build
- Cobertura: SPA (React) + Edge Functions, ambos con DSN propio en env vars
- Alerts inicial: email al founder

**Secrets management & gitleaks**
- Storage: 3 lugares aislados — GitHub Actions secrets / Supabase Edge Function env vars / `.env.local`
- `.env.example` versionado en repo con nombres pero SIN valores
- Gitleaks: pre-commit hook + history scan ejecutado una vez antes de launch
- Si se encuentran secrets en history: rotar la key, documentar, NO reescribir history
- Service-role key: solo en GH Actions secrets + Supabase Edge Function env. Nunca en `src/`

**Baseline-debt cleanup scope**
- npm audit: target = cero high/critical findings antes de cerrar Phase 1
- Template FreshFlow heredado: scope mínimo. Solo se toca si: falla lint/tsc, aparece en npm audit, está claramente roto
- NO refactor preventivo. Pre-commit hooks beyond gitleaks: solo gitleaks por ahora

### Claude's Discretion
- Estructura exacta de `.github/workflows/*.yml` (un solo workflow vs múltiples)
- Versión específica de Node/npm para CI (usar la del `package.json` engines)
- Formato exacto de `.planning/VENDORS.md` (tabla vs sección por vendor — Claude propone, founder valida)
- Detalles de las Edge Functions de prueba para el synthetic error
- Plantillas de communicación con vendors (Claude las genera)
- Decisión de implementar pre-commit hook de gitleaks via `pre-commit` framework vs script bash custom

### Deferred Ideas (OUT OF SCOPE)
- Husky/lint-staged pre-commit framework (Phase 7-8 si el flujo se vuelve lento)
- 1Password/Bitwarden shared vault (cuando haya segundo colaborador)
- Slack/Discord alerts de Sentry (Phase 10)
- Backups + PITR custom (evaluar antes de live launch, Phase 12)
- Cleanup completo del template FreshFlow (Phase 12 Lighthouse pass)
- Issue/Project board en GitHub
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Two Supabase projects configured (staging + prod) | §1 — Two-project link workflow, separate access tokens & DB passwords |
| INFRA-02 | Migrations via CLI (zero Studio edits prod) | §1.2 — `supabase migration new` workflow, drift detection |
| INFRA-03 | CI runs lint+tsc+vite build+supabase db push --dry-run on PR | §2 — GitHub Actions multi-job workflow with `--dry-run` flag confirmed |
| INFRA-04 | CI greps `VITE_.*SERVICE`/`service_role` in `src/` | §3 — Ripgrep pattern + red-test branch setup |
| INFRA-05 | Gitleaks pre-commit hook + one-time history scan | §4 — gitleaks v8.30.x, `gitleaks git` (replaces deprecated detect/protect) |
| INFRA-06 | Postgres extensions: pgcrypto, pg_cron, pg_net | §1.3 — `CREATE EXTENSION IF NOT EXISTS` in migration files |
| INFRA-07 | Schemas `ops` and `stripe` created | §1.3 — `CREATE SCHEMA` in initial migration |
| INFRA-08 | Resolve 12 npm-audit vulnerabilities | §5 — All 12 have `fixAvailable: true`; `npm audit fix` resolves all |
| INFRA-09 | Sentry connected (frontend + Edge Functions) | §6 — @sentry/react 10.53.1, @sentry/vite-plugin 5.3.0, sentry on Deno |
| INFRA-10 | Twilio toll-free CSCA verification in flight | §7.1 — Toll-Free verification fields + 3-5 business day timeline |
| INFRA-11 | Stripe Canadian bank verification in flight | §7.2 — Required docs and process |
| INFRA-12 | Resend SPF/DKIM/DMARC configured | §7.3 — DNS records + warmup strategy |
| INFRA-13 | CRA HST registration in flight | §7.4 — BRO online registration, 15-20 min process |
| SEC-07 | Service-role key only in Edge Function + GH secrets | §3 — Grep guardrail + CI secrets pattern |
| PLAT-07 | Sentry captures unhandled errors browser + Edge | §6 — Both SDK init patterns covered |
</phase_requirements>

## Summary

Phase 1 establece la infraestructura de Hummi sin entregar features. La research confirma que el stack acordado (Supabase CLI dos proyectos, GitHub Actions, gitleaks v8.30+, Sentry 10.53+, Resend, Twilio, Stripe Canada, CRA BRO) es exactamente el camino estándar para una startup canadiense en 2026. Cada vendor tiene timelines documentados que justifican arrancar las clocks en semana 1 de la fase.

El hallazgo crítico para el planner: las 12 vulnerabilidades de `npm audit` tienen `fixAvailable: true` para todas. Esto significa que `npm audit fix` (sin `--force`) resuelve INFRA-08 limpiamente; ninguna requiere un major upgrade de Vite o React. Todas las vulns son dev dependencies o transitive (rollup, picomatch, swiper, etc.) y caen dentro de los rangos semver actuales.

Para los workflows de GitHub Actions el patrón recomendado por Supabase es **dos workflows separados** (staging-on-develop, prod-on-main) más un workflow de PR para los 5 checks que bloquean merge. Las secrets se separan por environment (`STAGING_PROJECT_ID` vs `PRODUCTION_PROJECT_ID`). Para gitleaks la integración recomendada es el script bash en `.git/hooks/pre-commit` para el dev (solo-founder), no pre-commit framework — la complejidad extra no se justifica con un solo colaborador.

**Primary recommendation:** Tres workflows GitHub Actions (`pr-checks.yml`, `deploy-staging.yml`, `deploy-prod.yml`) + script bash pre-commit + gitleaks-action en CI como red de seguridad. Sentry vía `@sentry/wizard` para el setup inicial, después manual config para Edge Functions.

---

## Standard Stack

### Core (versions verified via `npm view` on 2026-05-14)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@sentry/react` | `^10.53.1` | Browser error + perf monitoring | Official React SDK; supports React 16-19 (`peerDeps: react: '^16.14.0 \|\| 17.x \|\| 18.x \|\| 19.x'`) |
| `@sentry/vite-plugin` | `^5.3.0` | Source map upload on build | Official, replaces deprecated `vite-plugin-sentry` |
| `@sentry/deno` | `^10.53.1` | Edge Functions monitoring | npm version supersedes `deno.land/x/sentry` |
| `supabase` (CLI) | `^2.84+` | Migrations + linking | Required for `db push --dry-run` |
| `supabase/setup-cli@v1` | GH Action | Install CLI in CI | Official, reads version from `package-lock.json` or accepts explicit |
| `gitleaks` | `v8.30.1` | Secret scanner | Standard since v8.19 deprecated `detect`/`protect` in favor of `git`/`dir` |
| `gitleaks/gitleaks-action@v2` | GH Action | CI secret scan | Free for personal accounts, free license for orgs |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `actions/checkout@v4` | GH Action | Repo checkout | All workflows |
| `actions/setup-node@v4` | GH Action | Node setup + npm cache | All Node jobs |
| `actions/cache@v4` | GH Action | Cache `~/.npm` | If `setup-node` cache insufficient |
| `@sentry/wizard` | `latest` | Interactive setup | One-time install: `npx @sentry/wizard@latest -i sourcemaps` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Standalone gitleaks pre-commit script | `pre-commit` framework (`pre-commit-hooks`) | Framework better for teams (config tracked); overkill for single founder. Use bash script for v1, migrate to `lefthook` if/when team grows. |
| Three separate workflows | Single mega-workflow with conditional jobs | Separate workflows = clearer error attribution, faster cancellation, easier branch protection rule setup |
| `@sentry/deno` (via npm) | `deno.land/x/sentry/index.mjs` | npm version is current; deno.land URL still works but Sentry recommends npm specifier in Supabase Edge Functions |
| `npm audit fix` (no force) | `npm audit fix --force` | All 12 vulns resolve with non-force fix; never use `--force` unless a major upgrade is genuinely needed (it isn't here) |

**Installation:**
```bash
# Dev dependencies (Sentry)
npm install --save-dev @sentry/vite-plugin
npm install @sentry/react

# CLI tools (verified separately, not in package.json)
npm install -g supabase
# Or use scoop on Windows: scoop install supabase

# gitleaks on Windows
scoop install gitleaks
# OR download binary from https://github.com/gitleaks/gitleaks/releases

# Resolve npm audit (run before any other install)
npm audit fix
```

---

## Architecture Patterns

### Recommended File Structure

```
.
├── .github/
│   └── workflows/
│       ├── pr-checks.yml          # Runs on PR: lint, tsc, build, db push --dry-run, secret grep
│       ├── deploy-staging.yml     # Runs on push to develop: supabase db push to staging
│       ├── deploy-prod.yml        # Runs on push to main: supabase db push to prod
│       └── gitleaks.yml           # Runs on PR + schedule: full repo gitleaks scan
├── .gitignore                     # Add: .env.local, .env.sentry-build-plugin, supabase/.temp
├── .env.example                   # Var names only, no values
├── .gitleaks.toml                 # Optional, only if defaults produce false positives
├── scripts/
│   ├── install-pre-commit.sh      # Sets up .git/hooks/pre-commit with gitleaks
│   └── secret-leak-grep.sh        # The grep used by both pre-commit and CI
├── src/
│   └── instrument.ts              # Sentry init for SPA (imported FIRST in main.tsx)
├── supabase/
│   ├── config.toml                # Local Supabase config
│   ├── migrations/
│   │   ├── 00000000000001_init_extensions_schemas.sql   # pgcrypto, pg_cron, pg_net, ops, stripe schemas
│   │   └── (future migrations…)
│   ├── seed.sql                   # Staging-only seed (3 services, 5-10 FSAs, 1 admin)
│   └── functions/
│       ├── _shared/sentry.ts      # Shared Sentry init helper for Edge Functions
│       └── _synthetic-error/index.ts  # Throws on invocation; for INFRA-09 verification
├── vite.config.ts                 # sentryVitePlugin + sourcemap: 'hidden'
└── .planning/
    ├── VENDORS.md                 # Vendor tracking table
    └── vendors/                   # Per-vendor evidence (screenshots, emails)
```

### Pattern 1: Supabase CLI for Two Projects

**What:** Link to one project at a time; switch projects per CI environment via different secrets.
**When to use:** Always — `supabase link` is single-project by design.

**Key insight from research:** Supabase explicitly documents that you can't maintain multiple project-refs in a single local config — each `link` replaces the previous. The pattern is to **not commit the linked-project-ref file** (`supabase/.temp/`) to git, and let each CI workflow link fresh.

```yaml
# Source: https://supabase.com/docs/guides/deployment/managing-environments
# .github/workflows/deploy-staging.yml
name: Deploy migrations to staging
on:
  push:
    branches: [develop]
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      SUPABASE_DB_PASSWORD: ${{ secrets.STAGING_DB_PASSWORD }}
      SUPABASE_PROJECT_ID: ${{ secrets.STAGING_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - run: supabase link --project-ref $SUPABASE_PROJECT_ID
      - run: supabase db push --linked
```

### Pattern 2: `supabase db push --dry-run` in PR Check

**What:** `--dry-run` flag prints migrations that *would* be applied without applying them. **Confirmed exists** in current CLI.

**Critical pitfall (verified from gh issue #776):** `--dry-run` in older CLI versions did **not** actually compile/test the SQL — it just listed filenames. The fix landed in later versions; verify with `supabase --version >= 2.84`. For Phase 1, the dry-run is run against staging (where the schema state matches what the PR would push) which catches real conflicts.

```yaml
# .github/workflows/pr-checks.yml (excerpt)
- name: Migration dry-run against staging
  env:
    SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
    SUPABASE_DB_PASSWORD: ${{ secrets.STAGING_DB_PASSWORD }}
  run: |
    supabase link --project-ref ${{ secrets.STAGING_PROJECT_ID }}
    supabase db push --linked --dry-run
```

### Pattern 3: Initial Migration for Extensions + Schemas

**What:** Single migration file creates `pgcrypto`, `pg_cron`, `pg_net` extensions and `ops`, `stripe` schemas. Extensions go in the `extensions` schema (Supabase convention).

```sql
-- Source: https://supabase.com/docs/guides/database/extensions
-- supabase/migrations/00000000000001_init_extensions_schemas.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE SCHEMA IF NOT EXISTS ops;
CREATE SCHEMA IF NOT EXISTS stripe;

-- pg_cron + pg_net are restricted-permission extensions on Supabase;
-- only `postgres` role can install them. The CLI runs as postgres so this works.
COMMENT ON SCHEMA ops IS 'Internal operations (audit_log, notifications_log, jobs)';
COMMENT ON SCHEMA stripe IS 'Stripe webhook idempotency + cached state';
```

### Pattern 4: Sentry SPA Init for React 19

**Critical:** React 19 uses the new `onUncaughtError` / `onCaughtError` / `onRecoverableError` callbacks on `createRoot`, NOT the old class-component ErrorBoundary. Sentry ships `reactErrorHandler` for these.

```typescript
// Source: https://docs.sentry.io/platforms/javascript/guides/react/
// src/instrument.ts — MUST be imported FIRST in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE, // 'development' | 'production'
  integrations: [
    Sentry.browserTracingIntegration(),
    // Skip replayIntegration for v1 — privacy concern on payment forms (see PITFALLS §14)
  ],
  tracesSampleRate: import.meta.env.PROD ? 0.25 : 1.0,
});
```

```typescript
// src/main.tsx
import "./instrument";  // FIRST — must be before any other import that may throw
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App";

const root = createRoot(document.getElementById("root")!, {
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});
root.render(<App />);
```

### Pattern 5: Sentry Edge Function Init (Deno)

**Critical gotchas from research:**
1. `defaultIntegrations: false` is **required** because Deno Edge Functions don't have per-request scope isolation.
2. `await Sentry.flush(2000)` is **required** before the function returns — otherwise events get dropped on cold-start exit.
3. Use `withScope` to attach per-request context instead of global scope.

```typescript
// Source: https://supabase.com/docs/guides/functions/examples/sentry-monitoring
// supabase/functions/_shared/sentry.ts
import * as Sentry from "npm:@sentry/deno@^10";

Sentry.init({
  dsn: Deno.env.get("SENTRY_DSN")!,
  environment: Deno.env.get("SUPABASE_ENV") ?? "production",
  defaultIntegrations: false, // CRITICAL: no scope isolation in Deno runtime
  tracesSampleRate: Deno.env.get("SUPABASE_ENV") === "production" ? 0.25 : 1.0,
});

export { Sentry };
```

```typescript
// supabase/functions/_synthetic-error/index.ts
// For INFRA-09 verification: visible in Sentry dashboard after invocation
import { Sentry } from "../_shared/sentry.ts";

Deno.serve(async (req) => {
  try {
    throw new Error("sentry-synthetic-edge-function-error");
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
    return new Response("logged", { status: 500 });
  }
});
```

### Pattern 6: Vite Config with Source Map Upload

```typescript
// Source: https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: "hidden",  // Generate, but don't reference in built files
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: "hummi",
      project: "hummi-spa",
      authToken: process.env.SENTRY_AUTH_TOKEN, // ONLY in CI; absent in local builds = plugin no-ops gracefully
      sourcemaps: {
        filesToDeleteAfterUpload: ["./dist/**/*.map"],
      },
      disable: !process.env.SENTRY_AUTH_TOKEN, // Local builds skip plugin entirely
    }),
  ],
});
```

### Pattern 7: GitHub Actions PR Check Workflow

```yaml
# Source: combining Supabase docs + GitHub Actions best practices
# .github/workflows/pr-checks.yml
name: PR Checks
on:
  pull_request:
    branches: [main, develop]

permissions:
  contents: read

jobs:
  lint-typecheck-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: 'package.json'  # or '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc -b
      - run: npm run build
        env:
          # Dummy DSN — build must not fail when Sentry env absent
          VITE_SENTRY_DSN: ''

  secret-leak-grep:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Grep for secret leaks in src/
        run: bash scripts/secret-leak-grep.sh

  supabase-dry-run:
    runs-on: ubuntu-latest
    env:
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      SUPABASE_DB_PASSWORD: ${{ secrets.STAGING_DB_PASSWORD }}
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - run: supabase link --project-ref ${{ secrets.STAGING_PROJECT_ID }}
      - run: supabase db push --linked --dry-run

  npm-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: 'package.json'
          cache: 'npm'
      - run: npm ci
      - run: npm audit --audit-level=high  # Exit 1 if any high/critical
```

### Anti-Patterns to Avoid

- **Committing `supabase/.temp/`:** This contains the currently-linked project-ref and credentials. Already in default `.gitignore` from `supabase init`, but verify it's there.
- **Running `npm audit fix --force`:** Force fix can introduce breaking changes (major version bumps). All 12 current vulns resolve with non-force fix; never use force.
- **Sentry init in a regular React component:** Must be in a separate file imported FIRST in `main.tsx`. Otherwise errors thrown during early module evaluation aren't captured.
- **Using `@sentry/browser` instead of `@sentry/react`:** `@sentry/react` includes `@sentry/browser` plus React-specific helpers (`reactErrorHandler`, `withErrorBoundary`).
- **Storing `SENTRY_AUTH_TOKEN` in `.env`:** This token uploads source maps; if leaked, attackers can poison your Sentry releases. Only in CI secrets + `.env.sentry-build-plugin` (gitignored).
- **`gitleaks detect` / `gitleaks protect`:** Deprecated in v8.19+. Use `gitleaks git` and `gitleaks dir` instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Secret scanner | Custom regex scripts | `gitleaks` | 100+ built-in patterns for AWS/Stripe/Google/Supabase keys, entropy detection, allowlist support |
| Source map upload to Sentry | `curl` + Sentry CLI | `@sentry/vite-plugin` | Handles release creation, source-map matching, debug-id injection automatically |
| Supabase CLI install in CI | Manual download + chmod | `supabase/setup-cli@v1` | Reads version from lockfile, handles caching, platform-aware |
| `npm audit` parsing | jq + grep gymnastics | `npm audit --audit-level=high` | Native exit code, no parsing |
| Pre-commit hook framework | bash spaghetti | Standalone bash script (single-dev) OR `lefthook` (team) | Husky deprecated their lifecycle model; lefthook is the modern alternative when a framework is justified |
| Sentry init for Edge Functions | Custom HTTP error reporter | `@sentry/deno` via npm | Handles fingerprinting, breadcrumbs, retry-on-flush correctly |

**Key insight:** All five Phase 1 deliverables (CI guardrails, secret hygiene, observability, vendor tracking, migration discipline) have battle-tested off-the-shelf tooling. The temptation to "just write a quick bash script" should be resisted especially for the secret scanner — homegrown regexes miss formats you don't know exist (Stripe `rk_live_*` restricted keys, Supabase JWT format, etc.).

---

## Common Pitfalls

### Pitfall 1: `supabase db push --dry-run` doesn't catch all errors
**What goes wrong:** Old CLI versions only list migration filenames, don't validate SQL syntax against the actual remote state.
**Why it happens:** GitHub issue #776 documented this; fix landed in 2024 but old projects may still use older CLI.
**How to avoid:** Pin Supabase CLI version in CI to `>= 2.84` (latest stable). Don't use `version: latest` if you want determinism — pin explicitly: `version: '2.84.2'`.
**Warning signs:** CI dry-run passes but `supabase db push` to prod fails with syntax/dependency error.

### Pitfall 2: `service_role` JWT in Vite env var
**What goes wrong:** Dev writes `VITE_SUPABASE_SERVICE_ROLE_KEY=eyJ...` in `.env.local`, Vite bundles it to the SPA, anyone can bypass RLS.
**Why it happens:** Confusion between `anon` (public, safe in browser) and `service_role` (admin, server-only).
**How to avoid:** Grep guardrail in CI + pre-commit. The pattern `VITE_.*SERVICE` catches all variants. `service_role` and `SUPABASE_SERVICE` catch direct hardcoded values.
**Warning signs:** `service_role` appears in `dist/` after build, "Network" tab in DevTools shows the JWT in initial bundle.

### Pitfall 3: Sentry init runs AFTER first error
**What goes wrong:** `Sentry.init` is called inside a React component or after other imports; errors thrown during early module load (e.g., from a Supabase client init) are not captured.
**Why it happens:** Devs put Sentry init in `App.tsx` instead of a dedicated first-imported file.
**How to avoid:** Create `src/instrument.ts` with **only** the `Sentry.init` call, import it as the **first line** of `main.tsx`.
**Warning signs:** Console shows errors that never appear in Sentry dashboard.

### Pitfall 4: Edge Function Sentry events get dropped
**What goes wrong:** `Sentry.captureException(e)` is called but the function returns before the event is sent to Sentry's API. Cold-start exit kills the process before the network call completes.
**Why it happens:** Sentry queues events for batching; Deno Edge Functions terminate quickly.
**How to avoid:** Always `await Sentry.flush(2000)` before returning from any error path. Set `defaultIntegrations: false` per Supabase's official guidance.
**Warning signs:** Errors visible in Supabase function logs but missing in Sentry.

### Pitfall 5: gitleaks scans entire history on every pre-commit
**What goes wrong:** Slow `git hook pre-commit` because the scanner re-walks every commit.
**Why it happens:** Default `gitleaks git` scans full history. The `--pre-commit --staged` flags scope it to staged files only (open GitHub issue #1522 reports this still has bugs in some versions).
**How to avoid:** Use `gitleaks protect --staged` (deprecated but still works) OR `gitleaks git --pre-commit --staged --redact` and accept occasional false positives. For the one-time history scan, use `gitleaks git --log-opts="--all"` separately.
**Warning signs:** `git commit` takes 30+ seconds with a few staged files.

### Pitfall 6: Twilio toll-free verification rejected for missing opt-in proof
**What goes wrong:** Application submitted without screenshot of the opt-in flow URL; rejected; restart timer.
**Why it happens:** Twilio requires a **publicly accessible URL** to an image showing the opt-in flow (form where user enters phone + explicit consent text). The Hummi opt-in page must exist before submission.
**How to avoid:** Build a placeholder opt-in flow page (even mocked, hosted on staging Vercel) before submitting. Include sample message content with "Reply STOP to opt out" and sender ID.
**Warning signs:** "Verification rejected — opt-in flow not visible" email from Twilio.

### Pitfall 7: CRA BRO phone option removed November 2025
**What goes wrong:** Founder tries to register HST by calling CRA; gets told phone registration is no longer available.
**Why it happens:** Effective Nov 3, 2025, CRA only accepts BN/program-account registrations online via BRO.
**How to avoid:** Use BRO directly: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/business-registration-online-overview.html. Need SIN, legal name, address, NAICS code, fiscal year-end, estimated revenue.
**Warning signs:** Founder reports "I tried calling CRA and they wouldn't help."

### Pitfall 8: Resend domain verification timeout
**What goes wrong:** DNS records added but Resend never marks the domain verified.
**Why it happens:** Resend gives up after 72 hours if DNS doesn't resolve. Propagation can take 24h but slow registrars + wrong record type = miss the window.
**How to avoid:** Verify DNS propagation with `dig` from multiple locations BEFORE clicking "Verify" in Resend. If records look right but Resend doesn't see them, delete & re-add the domain in Resend dashboard.
**Warning signs:** Resend shows "DKIM missing" for >24 hours despite records being added.

---

## State of the Art (2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `gitleaks detect` / `gitleaks protect` | `gitleaks git` / `gitleaks dir` | v8.19.0 (2024) | Old commands deprecated but still work; docs and CI examples use new names |
| `@sentry/react` with class ErrorBoundary | `Sentry.reactErrorHandler` on `createRoot` | React 19 (Dec 2024) + Sentry 8.x | React 19's new error callbacks are the canonical integration point |
| Sentry via `deno.land/x/sentry/index.mjs` | `npm:@sentry/deno` specifier | 2025 | npm specifier is current standard for Supabase Edge Functions |
| Husky 9 + lint-staged | `lefthook` OR plain bash hooks | 2024 | Husky's installation lifecycle changed twice; lefthook is the cleaner choice |
| CRA phone registration | CRA Business Registration Online (BRO) | Nov 3, 2025 | Phone option removed for new BN/program registrations |
| Stripe Connect "all platforms" Canadian update | New verification reqs Nov 6, 2024 | Nov 2024 | Existing Canadian accounts had until Jan 29, 2025 to comply; new accounts must meet from start |

**Deprecated/outdated (do not use):**
- `vite-plugin-sentry` (the third-party plugin): superseded by official `@sentry/vite-plugin`
- `@supabase/auth-ui-react`: deprecated; build custom auth UI (covered in STACK.md, applies in Phase 2)
- `gitleaks detect --source` / `gitleaks protect`: still works but no longer documented; migrate to `gitleaks git`
- Manually editing `supabase/.branches/_current_branch`: out of date; use `supabase link` consistently

---

## Vendor Application Checklists

### Twilio Toll-Free Verification (INFRA-10)

**Portal:** Twilio Console → Phone Numbers → Regulatory Compliance → Toll-Free Verifications
**Lead time:** 3-5 business days for initial review; rejections can add weeks
**Approval gate:** Required before any SMS to Canadian numbers will deliver via toll-free

**Required fields (from official docs):**
1. Business legal name + corporate website URL
2. Business address (the address registered with the CRA / business registry)
3. Business contact email (for verification status notifications)
4. Estimated monthly message volume (e.g., "500 SMS/month")
5. Opt-in flow description (text) — how users consent
6. **Publicly hosted URL with screenshot/image of the opt-in flow** (Hummi must have this online before submitting)
7. Sample message content (must include sender ID "Hummi" and "Reply STOP to opt out")
8. Privacy policy URL (must be live and accessible — covers CASL requirements)
9. Use-case classification (OTP / appointment reminders / both)

**Hummi-specific gotcha:** The opt-in flow doesn't exist in code yet (Phase 5 deliverable). Phase 1 needs a **placeholder static page** at e.g. `staging.hummi.ca/sms-opt-in` with the required disclosure text — this satisfies the screenshot requirement without blocking on Phase 5.

**Toll-free vs short code:** Canada toll-free is correct choice. Long-codes have 60-70% delivery to Rogers/Bell/Telus without registration; toll-free verified hits 95%+ (per Twilio support docs).

**No separate CSCA enrollment needed** — Twilio's toll-free verification IS the CSCA-equivalent compliance path. CSCA (Canadian Common Short Code Administrator) governs only short codes (e.g., 12345), which Hummi doesn't use.

### Stripe Canadian Account Activation (INFRA-11)

**Portal:** https://dashboard.stripe.com/ → Account settings → Business details
**Lead time:** 1-2 business days for standard verification; bank verification adds 2-3 days (micro-deposits)
**Approval gate:** Required before charging real customers (test mode works without activation)

**Required documents/info:**
1. **Business legal name** matching CRA records (will be cross-checked)
2. **Business address** (must match what's on your CRA registration)
3. **Canadian business number (BN)** — 9 digits, plus the RT0001 program suffix once HST registered
4. **Industry code** — for cleaning services, MCC 7349 ("Cleaning and Maintenance Services")
5. **Owner identity verification:**
   - Founder's full legal name, DOB, SIN (collected via Stripe, not stored)
   - Government-issued ID upload (driver's license or passport)
   - Residential address
6. **Canadian bank account** for payouts:
   - Institution number (3 digits)
   - Transit number (5 digits)
   - Account number
   - **Void cheque OR direct deposit form** (PDF upload)
7. **Articles of incorporation** if incorporated (sole proprietor doesn't need)

**Hummi-specific:** Founder is single owner. If sole proprietorship, the founder's SIN doubles as the business identifier. If incorporated, BN comes from incorporation.

**Bank verification:** Stripe uses Plaid (if available) or micro-deposits (2-3 days). Faster to use Plaid if the Canadian bank supports it (RBC, TD, BMO, Scotia, CIBC all do).

**HST collection:** Configure Stripe Tax with product code `txcd_20030000` ("Cleaning services") and `tax_behavior: "exclusive"` AFTER HST registration completes. This is Phase 4/6 work; Phase 1 only needs the Stripe account activated and bank verified.

### Resend Domain Setup (INFRA-12)

**Portal:** https://resend.com/domains → Add domain
**Lead time:** DNS propagation 1-24 hours; verification within 72 hours or domain fails
**Approval gate:** Required before any production email sends

**Required DNS records** (added at the domain registrar, e.g., Cloudflare, Namecheap):
1. **SPF (TXT):** `v=spf1 include:_spf.resend.com ~all`
2. **DKIM (CNAME or TXT):** Resend provides 3 records prefixed with `resend._domainkey.*` — copy directly from dashboard
3. **DMARC (TXT, recommended after SPF/DKIM verified):** Start with `v=DMARC1; p=none; rua=mailto:dmarc@hummi.ca` for monitoring; move to `p=quarantine` after 2-4 weeks of clean reports
4. **MX (optional):** Only if accepting replies; Resend supports inbound via `feedback-smtp.resend.com`

**Subdomain pattern:** Send from `mail.hummi.ca` rather than apex `hummi.ca`. Isolates reputation if you ever add marketing emails later.

**Warmup strategy:**
- Week 1: 10-15 emails/day to known-engaged recipients (founder, friends, test accounts)
- Week 2-3: ramp to 50-100/day
- Week 4+: full transactional volume

For Hummi v1, transactional volume will start near zero (no customers yet), so warmup happens naturally as the first customers book. Don't blast on launch day.

**API key:** Generate one named "Hummi Production" in Resend dashboard. Store in Supabase Edge Function env vars (`RESEND_API_KEY`). Never in `src/` (browser).

### CRA HST Registration (INFRA-13)

**Portal:** https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/business-registration-online-overview.html
**Lead time:** 15-20 minutes online; BN issued immediately upon completion
**Approval gate:** Required before charging HST on invoices (Phase 4 server-side pricing); required for Stripe Tax setup

**Hummi-specific decision:** Register **voluntarily** before hitting $30k threshold. Reasoning:
1. Founder gets to claim Input Tax Credits (ITCs) on business expenses (Stripe fees, Supabase plan, Twilio, Resend) immediately
2. Avoids the retroactive remittance trap when accidentally crossing $30k
3. Required input for Stripe Tax configuration in Phase 4
4. Eliminates the "$30k threshold cron alert" from the to-do list

**Required info:**
1. **SIN** (founder's Social Insurance Number)
2. **Legal business name** (sole prop = founder's name; incorporated = registered legal name)
3. **Business address** (residential is OK for sole prop)
4. **NAICS industry code** — for residential/commercial cleaning, use **561720** ("Janitorial Services")
5. **Estimated annual revenue** (be honest; underestimate is fine for new businesses)
6. **Fiscal year-end** (Dec 31 is default and simplest)
7. **Expected first day of taxable supplies** (i.e., when Hummi will start charging)
8. **Reporting period preference:**
   - Annual filing if expected revenue < $1.5M (recommended for Hummi v1)
   - Quarterly if growth-stage
9. **Direct deposit info** (for refunds; same banking as Stripe)

**Output:** BN (9 digits) + RT program account suffix (RT0001 for HST). Used in:
- Stripe Tax registration
- Business invoices (legally required line item)
- All future CRA filings

**Phase 1 deliverable:** Registration submitted, BN/RT received, screenshot of confirmation page archived in `.planning/vendors/cra-hst-confirmation.png`. Actual HST filing and remittance is Phase 12 (CMP-07).

---

## VENDORS.md Format Recommendation

**Recommendation:** **Hybrid — top-level summary table + per-vendor detail section**

**Rationale:** Table alone is too sparse for the founder to track per-vendor todos and email threads; section-per-vendor alone makes the at-a-glance status view harder. Combining gives both.

```markdown
# Hummi External Vendors

**Last updated:** YYYY-MM-DD

## Status Summary

| Vendor | Phase 1 Status | Started | Approved | Evidence | Blocks |
|--------|----------------|---------|----------|----------|--------|
| Twilio toll-free | In flight | 2026-05-15 | — | vendors/twilio-submission.png | Phase 5 |
| Stripe Canada | Bank pending | 2026-05-16 | — | vendors/stripe-business-verified.png | Phase 6 |
| Resend domain | DNS propagating | 2026-05-15 | — | vendors/resend-dns.png | Phase 6 |
| CRA HST | Registered | 2026-05-16 | 2026-05-16 | vendors/cra-bn-confirmation.png | Phase 4 (Stripe Tax) + Phase 12 (live) |

---

## Twilio Toll-Free Verification (INFRA-10)
- **Submitted:** 2026-05-15
- **Status:** In flight (verification in progress)
- **Reference:** Twilio Console verification ID `TF...`
- **Contact:** support@twilio.com ticket #...
- **Files:** [submission screenshot](vendors/twilio-submission.png), [confirmation email](vendors/twilio-confirmation.eml)
- **Notes:**
  - Used cleaning services use case
  - Sample message: "Hi {{name}}, this is Hummi confirming your cleaning on {{date}}. Reply STOP to opt out."
  - Opt-in screenshot URL: https://staging.hummi.ca/sms-opt-in
- **Next steps:** Wait for approval email; ETA 3-5 business days

## Stripe Canadian Account (INFRA-11)
...

(repeat for each vendor)
```

**Why this beats pure-table:** Each vendor needs ~10 lines of context (ticket numbers, sample data submitted, account-specific quirks) that a table can't hold readably. Per-vendor section lives below the summary table for drill-down.

---

## Code Examples

### Secret-Leak Grep Script

```bash
#!/usr/bin/env bash
# Source: derived from Hummi CONTEXT.md decisions, INFRA-04 + SEC-07
# scripts/secret-leak-grep.sh
# Used by both .git/hooks/pre-commit AND .github/workflows/pr-checks.yml

set -euo pipefail

# Patterns from CONTEXT.md: VITE_.*SERVICE, service_role, SUPABASE_SERVICE
# Use ripgrep for speed and structured exit codes.
# rg exits 0 if matches found (BAD), 1 if no matches (GOOD), 2 if error.

PATTERNS=(
  'VITE_[A-Z_]*SERVICE'
  'service_role'
  'SUPABASE_SERVICE'
  'SUPABASE_SERVICE_ROLE_KEY'
)

# Build the combined ripgrep pattern (PCRE alternation)
COMBINED=$(IFS='|'; echo "${PATTERNS[*]}")

# Scope: src/ only. Exclude .test.ts and .spec.ts (allow legitimate references in tests
# that are scoped to mock/fake values — but verify those don't contain real keys via review).
if rg --pcre2 --hidden --glob '!*.test.*' --glob '!*.spec.*' --type-add 'srccode:*.{ts,tsx,js,jsx,html,css}' -t srccode "$COMBINED" src/; then
  echo ""
  echo "ERROR: Possible secret leak detected in src/."
  echo "Forbidden patterns: ${PATTERNS[*]}"
  echo "Service-role keys must NEVER appear in src/. Move to Supabase Edge Function env or GH Actions secrets."
  exit 1
fi

echo "Secret-leak grep: clean."
```

**Note on Windows:** The script uses `rg` (ripgrep). On Windows, install via `scoop install ripgrep` or use the GitHub Actions runner (Linux). For local dev on the founder's Windows machine, the pre-commit hook calls this same script via Git Bash (which ships with Git for Windows).

### Pre-Commit Hook (Bash, Single-Dev Recommended)

```bash
#!/usr/bin/env bash
# Source: combined CONTEXT.md decision + gitleaks docs
# .git/hooks/pre-commit (NOT committed; installed via scripts/install-pre-commit.sh)

set -euo pipefail

# 1. Run gitleaks on staged files
if command -v gitleaks >/dev/null 2>&1; then
  gitleaks git --pre-commit --staged --redact --no-banner || {
    echo "gitleaks: secret detected in staged changes. Commit blocked."
    exit 1
  }
else
  echo "WARNING: gitleaks not installed. Skipping secret scan. Run: scoop install gitleaks"
fi

# 2. Run the secret-leak grep on staged src/ files
bash scripts/secret-leak-grep.sh || exit 1

exit 0
```

```bash
#!/usr/bin/env bash
# scripts/install-pre-commit.sh — run once per dev machine after clone
set -euo pipefail
HOOK="$(git rev-parse --git-dir)/hooks/pre-commit"
cp scripts/pre-commit.sh "$HOOK"
chmod +x "$HOOK"
echo "Pre-commit hook installed at: $HOOK"
```

### Red-Test Setup Procedure

**Goal:** Verify the CI secret-leak grep actually blocks merges (success criterion #2 of Phase 1).

```bash
# 1. From main branch, create the red-test branch
git checkout -b test/secret-leak-red

# 2. Introduce a deliberate fake secret in src/
cat >> src/__red-test-marker.ts <<'EOF'
// DO NOT MERGE — this file exists to verify the CI guardrail.
// If you see this in main, the secret-leak grep is broken.
const SUPABASE_SERVICE_ROLE_KEY = "fake.eyJSAMPLEKEY.shouldNeverShipToProd";
export { SUPABASE_SERVICE_ROLE_KEY };
EOF

# 3. Commit and push (the pre-commit hook will block this LOCALLY — use --no-verify ONLY for this red-test setup)
git add src/__red-test-marker.ts
git commit --no-verify -m "test: red-test marker for secret-leak guardrail (DO NOT MERGE)"
git push origin test/secret-leak-red

# 4. Open a PR from test/secret-leak-red → main
# 5. Verify the CI "secret-leak-grep" job FAILS
# 6. Document the failing CI URL in .planning/phases/01-foundation-long-lead-vendors/RED-TEST-EVIDENCE.md
# 7. DO NOT MERGE this PR. Leave it open as living proof. Add branch protection: prevent deletion of test/secret-leak-red.
```

**Branch protection:** In GitHub repo settings → Branches → Add rule for `test/secret-leak-red`: enable "Restrict deletions" and "Restrict force pushes". This keeps the evidence permanent.

### Gitleaks GitHub Actions Workflow

```yaml
# .github/workflows/gitleaks.yml
name: gitleaks
on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for accurate scan
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # GITLEAKS_LICENSE not required for personal account repos
```

### One-Time History Scan

```bash
# Run from the repo root, ONCE, before any v1 launch
# If secrets found: rotate keys, document rotation in VENDORS.md (or audit doc)
# Do NOT rewrite git history (CONTEXT.md decision)
gitleaks git --log-opts="--all" --redact --report-format=json --report-path=.planning/research/gitleaks-history-scan.json
```

---

## Open Questions

1. **Supabase CLI exact version to pin in CI**
   - What we know: Need >= 2.84 for working `--dry-run`
   - What's unclear: Whether the latest stable as of Phase 1 start has any regressions
   - Recommendation: Plan task to check latest version at start of Phase 1, pin to specific (e.g., `version: 2.84.5`), revisit pin if blockers appear

2. **Where staging Supabase project is hosted**
   - What we know: Two projects needed (`hummi-staging` and `hummi-prod`)
   - What's unclear: Whether both should be in the same region (US-East / Canada Central). Free tier may limit region choice.
   - Recommendation: Both in `us-east-1` for free tier consistency; revisit Canadian-data-residency for prod before live launch (Phase 12 compliance)

3. **Branch model**
   - What we know: CONTEXT.md says "developer corre `supabase migration new` local → `supabase db push` contra staging → CI aplica a prod automáticamente al mergear a `main`"
   - What's unclear: Is there a `develop` branch (Supabase docs assume yes) or does the founder work directly on feature branches → PR → `main`?
   - Recommendation: Single-developer, GitHub Flow (feature branches → PR → main). Staging deploys happen on PR open (via CI job) rather than on `develop` push. Adjust workflow YAML accordingly.

4. **Sentry org/project slug**
   - What we know: Free tier requires creating an org + project
   - What's unclear: Founder's preferred org slug (`hummi`? `hummi-cleaning`?)
   - Recommendation: Plan task to create Sentry account + org/project early in Phase 1 (Wave 0 work), then plug slug into `vite.config.ts`

5. **`.env.sentry-build-plugin` vs `SENTRY_AUTH_TOKEN` in CI**
   - What we know: Either approach works
   - What's unclear: Preference for the founder's local DX
   - Recommendation: Use CI-only env var (`SENTRY_AUTH_TOKEN`). Local builds skip source map upload (no slow CI feedback). This matches the `disable: !process.env.SENTRY_AUTH_TOKEN` pattern in Pattern 6.

---

## Validation Architecture

> **`workflow.nyquist_validation` is NOT present in `.planning/config.json`** (only `research`, `plan_check`, `verifier` are listed). This section is included anyway because Phase 1 deliverables are heavily verification-driven and the planner needs a clear validation strategy.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed. Vitest planned for Phase 12 (per ROADMAP.md TEST-01). |
| Config file | None — Phase 1 doesn't require unit tests for infra deliverables |
| Quick run command | `npm run lint && npx tsc -b && npm run build` (existing) |
| Full suite command | Same as quick + CI workflow simulation |

### Phase Requirements → Validation Map
| Req ID | Behavior | Validation Type | Automated Command | Manual? |
|--------|----------|-----------------|-------------------|---------|
| INFRA-01 | Two Supabase projects exist + linkable | smoke | `supabase link --project-ref $STAGING && supabase link --project-ref $PROD` | Manual: verify in Supabase dashboard |
| INFRA-02 | Migration applies cleanly to staging | smoke | `supabase db push --linked --dry-run` (CI) | — |
| INFRA-03 | CI 5-check pipeline blocks bad merges | E2E | Push a PR with intentional lint error; verify merge blocked | Manual review of CI logs |
| INFRA-04 | Secret-leak grep catches `service_role` | unit (the grep script) + E2E (red-test PR) | `bash scripts/secret-leak-grep.sh` against fixture | Manual: red-test PR stays red |
| INFRA-05 | gitleaks pre-commit blocks committed secrets | manual | `gitleaks git --pre-commit --staged --redact` after staging a fake key | Manual one-time test on dev machine |
| INFRA-05 (history scan) | Run gitleaks across full git history once | manual | `gitleaks git --log-opts="--all" --report-path=.planning/research/gitleaks-history.json` | Manual one-time |
| INFRA-06 | Extensions enabled in staging + prod | smoke | `psql ... -c "SELECT extname FROM pg_extension"` shows pgcrypto, pg_cron, pg_net | Manual SQL query OR automate as a `supabase migration test` |
| INFRA-07 | `ops` + `stripe` schemas exist | smoke | `psql ... -c "\dn ops stripe"` | Manual SQL query |
| INFRA-08 | Zero high/critical npm vulns | smoke | `npm audit --audit-level=high` exits 0 | — |
| INFRA-09 (SPA) | Sentry receives synthetic error from browser | E2E | Open dev-only route that throws; check Sentry dashboard | Manual: screenshot Sentry event |
| INFRA-09 (Edge) | Sentry receives synthetic error from Edge Function | E2E | `curl https://<project>.supabase.co/functions/v1/_synthetic-error` | Manual: screenshot Sentry event |
| INFRA-10 | Twilio toll-free submitted | evidence | Screenshot of submission + email confirmation | Manual: archive in `.planning/vendors/` |
| INFRA-11 | Stripe Canadian account submitted, bank verification initiated | evidence | Stripe dashboard screenshot showing "Bank verification pending" | Manual archive |
| INFRA-12 | Resend domain DNS records added, verification pending or complete | evidence | Resend dashboard screenshot | Manual archive |
| INFRA-13 | CRA HST registered, BN/RT issued | evidence | BRO confirmation screenshot | Manual archive |
| SEC-07 | service_role key absent from `src/` and `dist/` | smoke | Combined `scripts/secret-leak-grep.sh` + `rg 'service_role' dist/` post-build | Automated in CI |
| PLAT-07 | Sentry captures both browser + Edge errors | E2E | Combined verification from INFRA-09 | Manual |

### Sampling Rate
- **Per task commit:** `npm run lint && npx tsc -b && npm run build && bash scripts/secret-leak-grep.sh`
- **Per wave merge:** Full PR check workflow (the 5 checks) + gitleaks scan
- **Phase gate:** All success criteria verified manually + screenshots archived

### Wave 0 Gaps
- [ ] `scripts/secret-leak-grep.sh` — created in Phase 1, used by both pre-commit and CI
- [ ] `scripts/install-pre-commit.sh` — installer for the bash hook
- [ ] `src/instrument.ts` — Sentry SPA init (must be imported FIRST in main.tsx)
- [ ] `supabase/functions/_shared/sentry.ts` — Shared Sentry init for Edge Functions
- [ ] `supabase/functions/_synthetic-error/index.ts` — Throws on invocation; used for INFRA-09 verification
- [ ] `supabase/migrations/00000000000001_init_extensions_schemas.sql` — pgcrypto, pg_cron, pg_net + ops, stripe schemas
- [ ] `.gitleaks.toml` — Only if defaults produce false positives (likely not needed for v1)
- [ ] `.env.example` — All env var names; no values
- [ ] `.planning/VENDORS.md` — Per the format above
- [ ] `.github/workflows/pr-checks.yml` — 5 checks
- [ ] `.github/workflows/deploy-staging.yml` — On push to develop OR on PR open
- [ ] `.github/workflows/deploy-prod.yml` — On push to main
- [ ] `.github/workflows/gitleaks.yml` — On PR + schedule

---

## Dependency Order / Parallelization Hints

Phase 1 deliverables split into 4 streams that can mostly run in parallel:

1. **Stream A: Supabase + CI (sequential within stream)**
   - A1. Create staging + prod Supabase projects → A2. Local `supabase init` + first migration (extensions + schemas) → A3. Push to staging → A4. Set up 3 GH workflows → A5. Red-test branch + verify CI blocks

2. **Stream B: Secrets (sequential within stream)**
   - B1. Install gitleaks locally → B2. Create `scripts/secret-leak-grep.sh` + pre-commit installer → B3. One-time history scan → B4. Rotate any leaked keys → B5. `.env.example`

3. **Stream C: npm audit + Sentry (parallel, both small)**
   - C1. `npm audit fix` (resolves all 12) + commit → C2. Install Sentry packages → C3. Wizard + manual config → C4. Synthetic error verification (SPA + Edge Function)

4. **Stream D: Vendor applications (parallel — wait time, not work time)**
   - D1. Twilio toll-free (week 1, longest lead) + Resend DNS (week 1, fast DNS but 1-2 week warmup)
   - D2. CRA HST (week 1, instant BN issuance — start ASAP since downstream blocks Stripe Tax)
   - D3. Stripe Canada (week 2, after HST registered — needs BN/RT for Stripe Tax setup)

**Critical path:** Stream A (CI guardrails) blocks ALL Phase 2+ work because no other phase can merge without the guardrails. Stream D (vendors) blocks Phase 5 (Twilio), Phase 6 (Stripe + Resend), Phase 12 (CRA HST live).

**Recommended wave structure for the planner:**
- **Wave 0:** Create Supabase projects + Sentry account + Twilio account + Resend account + Stripe account + CRA BRO submission (all founder manual setup work)
- **Wave 1:** Stream A1-A4 + Stream B1-B2 + Stream C1-C2 (in parallel)
- **Wave 2:** Stream A5 (red-test) + Stream B3-B5 + Stream C3-C4 (in parallel, depends on Wave 1)
- **Wave 3:** Vendor evidence archival + VENDORS.md finalize + phase verification

---

## Sources

### Primary (HIGH confidence)
- [Supabase: Managing Environments](https://supabase.com/docs/guides/deployment/managing-environments) — two-project workflow, exact GH Actions YAML
- [Supabase: db push reference](https://supabase.com/docs/reference/cli/supabase-db-push) — `--dry-run` flag confirmed, all options
- [Supabase: Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations) — naming convention, migration file format
- [Supabase: Extensions](https://supabase.com/docs/guides/database/extensions) — `CREATE EXTENSION WITH SCHEMA extensions` pattern
- [Supabase: Sentry monitoring for Edge Functions](https://supabase.com/docs/guides/functions/examples/sentry-monitoring) — init pattern, `defaultIntegrations: false`, flush requirement
- [Sentry React docs](https://docs.sentry.io/platforms/javascript/guides/react/) — React 19 `reactErrorHandler` pattern
- [Sentry Vite sourcemap docs](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/) — exact `vite.config.ts`, `SENTRY_AUTH_TOKEN`
- [supabase/setup-cli GitHub Action](https://github.com/supabase/setup-cli) — usage, version input
- [gitleaks-action v2 README](https://github.com/gitleaks/gitleaks-action) — workflow YAML, license requirements
- [gitleaks main repo](https://github.com/gitleaks/gitleaks) — v8.30.1, deprecation of detect/protect
- npm registry direct queries — verified `@sentry/react@10.53.1`, `@sentry/vite-plugin@5.3.0`, `@sentry/deno@10.53.1`
- Local `npm audit --json` output — confirmed 12 vulns, all with `fixAvailable: true`

### Secondary (MEDIUM confidence)
- [Twilio toll-free verification onboarding](https://www.twilio.com/docs/messaging/compliance/toll-free/console-onboarding) — fields required, status flow
- [Twilio Canada SMS guidelines](https://www.twilio.com/en-us/guidelines/ca/sms) — opt-in flow requirements
- [Stripe Canada verification](https://support.stripe.com/questions/verification-requirements-canada) — required documents, BN format
- [Resend domain docs](https://resend.com/docs/dashboard/domains/introduction) — DNS records, 72-hour timeout
- [CRA: Register for GST/HST](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-account/register-account.html) — BRO online, threshold, fields
- [d4b.dev: gitleaks pre-commit hook](https://www.d4b.dev/blog/2026-02-01-gitleaks-pre-commit-hook/) — bash vs framework comparison

### Tertiary (LOW confidence — flagged for verification)
- Approval timelines from various blog posts (Twilio "3-5 days", Stripe bank verification "2-3 days micro-deposits") — verify against current Twilio/Stripe support pages at submission time
- "Voluntary HST registration as best practice for small biz" — Hummi business decision, verify with accountant
- gitleaks `--pre-commit --staged` behavior — GitHub issue #1522 indicates open bugs; verify on first install

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified via direct npm registry query
- Architecture: HIGH — patterns sourced from official Supabase + Sentry docs
- Pitfalls: HIGH — cross-referenced PITFALLS.md + official deprecation notes (gitleaks v8.19, CRA Nov 2025)
- Vendor checklists: MEDIUM — required fields verified from each vendor's docs; approval times are estimates that vary

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 for stable items (Supabase CLI, gitleaks, Sentry); 2026-05-28 for vendor portals (Twilio, Stripe, Resend, CRA — UI/forms change frequently). Re-verify before each vendor submission.

## RESEARCH COMPLETE

**Phase:** 1 - Foundation & Long-Lead Vendors
**Confidence:** HIGH

### Key Findings
- All 12 npm audit vulnerabilities have `fixAvailable: true`; `npm audit fix` (no `--force`) resolves them cleanly — no Vite/React major upgrade needed
- `supabase db push --dry-run` flag exists and works; requires CLI >= 2.84 for full SQL validation
- Sentry stack: `@sentry/react 10.53.1` (supports React 19), `@sentry/vite-plugin 5.3.0`, `@sentry/deno 10.53.1` (npm specifier, not deno.land)
- Gitleaks v8.30.1 stable; `detect`/`protect` deprecated since v8.19 — use `gitleaks git`/`gitleaks dir` instead
- CRA phone registration removed Nov 3, 2025 — BRO online only (15-20 min, instant BN issuance)
- Recommend bash pre-commit script (not framework) for single-dev; revisit lefthook when team grows
- Three GitHub Actions workflows (pr-checks, deploy-staging, deploy-prod) + gitleaks workflow = cleanest separation

### File Created
`c:\dev\Hummi\.planning\phases\01-foundation-long-lead-vendors\01-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | All versions verified via direct npm registry query + official docs |
| Architecture | HIGH | All patterns sourced from current Supabase + Sentry docs |
| Pitfalls | HIGH | Cross-referenced with PITFALLS.md + official deprecation notices |
| Vendor checklists | MEDIUM | Required fields verified; approval timelines are vendor estimates |

### Open Questions
1. Exact Supabase CLI version to pin (≥2.84, latest at Phase 1 start)
2. Supabase project regions (both us-east-1 for free tier? or Canada-central for prod?)
3. Branch model — GitHub Flow vs Git Flow (CONTEXT.md implies feature → main; Supabase docs assume develop → main)
4. Sentry org/project slug — needs founder decision
5. `SENTRY_AUTH_TOKEN` storage — recommend CI-only, but verify founder preference

### Ready for Planning
Research complete. Planner can now create PLAN.md files. Recommended wave structure provided in "Dependency Order / Parallelization Hints" section.
