# External Integrations

**Analysis Date:** 2026-05-14

## APIs & External Services

**Database & Backend:**
- Supabase - PostgreSQL database, authentication, real-time subscriptions
  - SDK/Client: `@supabase/supabase-js` 2.105.4
  - Implementation: `src/lib/supabase.ts` - Creates Supabase client
  - Auth: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (browser-safe anon key)

**Payment Processing:**
- Stripe - Payment processing (configured but not yet integrated into app code)
  - Publishable Key: `VITE_STRIPE_PUBLISHABLE_KEY` (safe for browser)
  - Secret Key: Stored in Vercel environment variables or Supabase Edge Functions (NOT in browser env)
  - Status: SDK not yet installed (`stripe` package missing from package.json)

## Data Storage

**Databases:**
- Supabase PostgreSQL
  - Connection: Via `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`
  - Client: `@supabase/supabase-js` (RLS-enabled anon key)
  - Usage: Database initialization at `src/lib/supabase.ts`
  - Currently instantiated but no active queries found in component code (integration in progress)

**File Storage:**
- Supabase Storage (likely, as part of Supabase project, but not yet referenced in code)
- Fallback: Local filesystem only for static assets in `src/assets/`

**Caching:**
- None configured (no Redis or similar)

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Built-in to Supabase platform
  - Implementation: Supabase client supports JWT-based RLS (Row Level Security)
  - Feature: Anon key for unauthenticated users, user sign-up/login via Supabase UI components (not yet implemented)
  - Status: Client created but not wired into login pages yet

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Browser console only (no structured logging service)
- Supabase provides query logs in dashboard

## CI/CD & Deployment

**Hosting:**
- Vercel (primary deployment platform)
- GitHub integration: PDAC95/hummi repository

**CI Pipeline:**
- GitHub Actions (`.github/workflows/ci.yml`)
  - Linting + build on push to main and PRs
  - Node 20, npm caching enabled

**Deployment Strategy:**
- Static SPA deployed to Vercel's global CDN
- Environment variables configured in Vercel dashboard
- No server-side code required

## Environment Configuration

**Required env vars:**

Browser-exposed (must be prefixed with `VITE_`):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anonymous key (safe for browser)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe test/live publishable key

Server-only (NO `VITE_` prefix, stored in Vercel dashboard):
- `STRIPE_SECRET_KEY` - Stripe secret key (for Edge Functions or backend)

**Secrets location:**
- `.env.local` for development (git-ignored)
- Vercel dashboard environment variables for production
- Supabase project secrets for Edge Functions (if used)
- Template: `.env.example`

## API Architecture

**Frontend API Calls:**
- Supabase JS client: RPC calls, table queries with RLS
- Stripe.js: Client-side payment form validation only
- No custom API routes (pure SPA)

**Server Communication:**
- Supabase Edge Functions: Where Stripe secret key and server-side logic lives
- Vercel serverless functions: Can be added but not currently used

## Webhooks & Callbacks

**Incoming:**
- Stripe webhooks can be configured to notify backend (Edge Functions or Vercel API)
- Currently not implemented

**Outgoing:**
- None detected

## Data Security Model

**Authentication:**
- Supabase JWT tokens in local storage
- Anon key used for unauthenticated queries
- RLS (Row Level Security) enforced at database level

**Authorization:**
- Supabase RLS policies protect database rows based on user ID
- API routes inherit user context from JWT

**Encryption:**
- HTTPS enforced by Vercel + Supabase
- Sensitive env vars never exposed to browser

## Integration Readiness

| Service | Status | Notes |
|---------|--------|-------|
| Supabase | Initialized | Client created (`src/lib/supabase.ts`), not yet wired to components |
| Stripe | Configured | Env vars set, SDK not installed, no checkout implementation |
| GitHub | Integrated | CI workflow running, Vercel auto-deploys |
| Vercel | Live | SPA hosted and deployed automatically |

---

*Integration audit: 2026-05-14*
