# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** Que un cliente de KW/Cambridge/Guelph — residencial o comercial — pueda agendar y pagar una limpieza en menos de 5 minutos, y que vuelva a contratar sin volver a capturar nada.
**Current focus:** Phase 1 — Foundation & Long-Lead Vendors

## Current Position

Phase: 1 of 12 (Foundation & Long-Lead Vendors)
Plan: 1 of 7 in current phase (executor work complete; founder action pending before 01-02)
Status: In progress
Last activity: 2026-05-15 — Plan 01-01 executor work done (template + runbooks committed); founder must run runbooks to fill account-credentials.md before plan 01-02

Progress: [█░░░░░░░░░] 1%

## Performance Metrics

**Velocity:**
- Total plans completed: 1 (executor portion; 01-01 awaits founder action to fully close)
- Average duration: 4 min
- Total execution time: 0.07 h

**By Phase:**

| Phase | Plans | Total  | Avg/Plan |
|-------|-------|--------|----------|
| 01    | 1/7   | 4 min  | 4 min    |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min, executor done, founder pending)
- Trend: starting

*Updated after each plan completion*

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

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- External lead-times (Twilio CSCA, Stripe CA banking, Resend warmup, CRA HST) gate Phase 6 — must start in Phase 1 or Phase 6 slips
- Brownfield bundle is 1.4MB JS / 856KB CSS; route-based code splitting required before Phase 7 to keep customer bundle < 1MB gz
- **Active: Plan 01-01 founder checkpoint** — founder must execute runbook-supabase-setup.md and runbook-sentry-setup.md and fill .planning/phases/01-foundation-long-lead-vendors/account-credentials.md (gitignored). Plan 01-02 cannot start until zero __FILL_IN__ placeholders remain in that file.

## Session Continuity

Last session: 2026-05-15 (plan 01-01 executor work)
Stopped at: Completed 01-01-PLAN.md executor portion; account-credentials.md template + Supabase + Sentry runbooks committed on branch phase-01/01-supabase-sentry-accounts; awaiting founder to execute runbooks and fill credentials
Resume file: .planning/phases/01-foundation-long-lead-vendors/account-credentials.md — founder fills, then plan 01-02
