# Hummi — Research Synthesis

**Project:** Hummi — residential cleaning booking platform (Kitchener / Waterloo / Cambridge / Guelph, Ontario)
**Domain:** Consumer marketplace SaaS, three-mode payments (one-shot / prepaid package / monthly subscription), single-operator with manual crew assignment
**Researched:** 2026-05-14
**Companion docs:** STACK.md · FEATURES.md · ARCHITECTURE.md · PITFALLS.md · ../PROJECT.md
**Overall confidence:** HIGH on architecture and pitfalls; MEDIUM-HIGH on stack versions (verify with `npm view` before installing); HIGH on features (industry conventions are well-documented).

---

## Executive Summary

Hummi is a brownfield React 19 + Vite 7 + Supabase + Stripe SPA. The existing FreshFlow template handles marketing surface; everything downstream (auth, properties, quoting, booking, payments, dashboard, notifications, admin) is greenfield. The four research streams converge on the same shape: one Supabase project (Postgres + Auth + Edge Functions + Storage), one Vite SPA with admin mounted at `/admin/*` and role-gated by an `app_metadata.role` JWT claim, Stripe as the source of truth for money with Postgres mirroring via signed/idempotent webhooks, and `pg_cron` + `pg_net` driving scheduled jobs (reminders, recurring visit materialization). No separate Node backend, no third-party auth, no second build pipeline.

The product spec already matches the industry canon set by Tidy/Handy/Homeaglow: quote before signup, postal-code gate at the landing hero, transparent live pricing with HST itemized, time **windows** (not exact times), recurring with skip/reschedule, and a one-click cancel/refund flow. The differentiator wedge versus Ontario incumbents (Molly Maid, Merry Maids) is exactly the absence of a "call for quote" form. Ship the 96 table-stakes features plus a focused set of 10 cheap differentiators (transparent calculator, satisfaction guarantee, same-cleaner-each-visit promise, eco add-on, non-expiring packages, crew bio cards, iCalendar attachment, etc.). Resist v2 scope creep — auto-assign, GPS tracking, native apps, public reviews, marketplace mechanics are all explicitly out.

The risk surface is dense but well-mapped. Top three: (1) Stripe webhook idempotency + signature verification — the keystone of every paid flow; one missed `stripe_events` PK insert duplicates visit credits or sends double emails. (2) Timezone math — every timestamp is `timestamptz`, all reminders compute on a stored `send_at`, DST weekends are part of the test suite. (3) RLS leaks — every table `ENABLE` + `FORCE ROW LEVEL SECURITY`, roles live in `app_metadata` (never `user_metadata`), service-role key never appears in any `VITE_*` env var. Behind these sit Ontario-specific compliance (HST 13%, CASL, PIPEDA, Ontario Consumer Protection Act one-click cancel), Canadian SMS deliverability (Twilio toll-free verification has 2–3 week lead time — start day one), and the brownfield baseline debt flagged in CONCERNS.md (1.4MB JS bundle, 12 npm-audit findings, no tests).

---

## Key Findings

### Recommended Stack (one-line rationale each)

Detail: STACK.md. Versions are Jan-2026 cutoff with a 4-month gap — verify with `npm view <pkg> version` before install.

**Data + state**
- **`@tanstack/react-query` v5** — cache layer Supabase deliberately doesn't ship; mutations + optimistic UI + devtools matter when solo-debugging webhook race conditions.
- **React Router 7 loaders/actions** (already installed) — route-level data block on first paint; pair with React Query for in-route refetches via `ensureQueryData`.
- **Supabase JS** (already installed) — single source: Postgres, Auth, Edge Functions, Storage, Realtime, `pg_cron`. No second backend.

**Forms + validation**
- **`react-hook-form` v7** — uncontrolled-input model keeps the booking form's many live-pricing fields from rerendering the tree.
- **`zod` v3 + `@hookform/resolvers/zod`** — one schema doubles as TS type and runtime validator at form *and* Edge Function boundary. Stay on v3 until `@hookform/resolvers` ships stable v4 support.

**UI + dates**
- **Bootstrap 5 grid (kept) + Radix UI primitives à la carte + `clsx`** — don't fight the FreshFlow CSS on marketing pages; bring Radix only for accessible modals/popovers/toasts on app surfaces. **No Tailwind, no shadcn/ui, no MUI.**
- **`sonner`** for toasts; keep existing `sweetalert2` only where it already lives.
- **`date-fns` v4 + `@date-fns/tz`** — tree-shakable, TZ-aware (`America/Toronto`), modern DST math.
- **`react-day-picker` v9** — accessible date picker, uses date-fns under the hood.

**Auth + payments + comms**
- **Build custom Supabase Auth screens.** Do **not** use `@supabase/auth-ui-react` (deprecated). Email/pw + Google OAuth via `supabase-js`; phone OTP via Twilio Verify in an Edge Function (decision in ARCHITECTURE §4.1 — Supabase's native phone-auth was rejected because it conflates login and verification).
- **`@stripe/stripe-js` + `@stripe/react-stripe-js`** (Payment Element, not legacy Card Element). **Stripe Checkout (subscription mode)** for the subscription flow; **Customer Portal** for card updates, invoice download, and cancel.
- **`stripe` npm v17** in Edge Functions (Deno via `npm:` specifier).
- **Resend** (`resend ^4` + `@react-email/components`) for transactional email.
- **Twilio** for SMS — never browser-side. Toll-free number with **CSCA verification (start 2–3 weeks before launch)**.

**Infra + ops**
- **Google Places Autocomplete (New)** for address UX (optional v1 polish). Coverage *truth* lives in `coverage_postal_prefixes` Supabase table.
- **Sentry** (`@sentry/react ^8`) + **Vercel Web Analytics** for observability. PostHog optional later.
- **Vitest + Testing Library + MSW** for unit/integration; **Playwright** for E2E against Vercel previews.
- **Supabase CLI + `supabase gen types typescript`** wired as `npm run db:types`. **Zero direct Studio edits in production** — migrations only.

**Things explicitly NOT to add:** Redux/Zustand, Tailwind, Formik/Yup, MUI/Chakra/Mantine, Day.js/Moment, jQuery, Bootstrap JS bundle, axios, lodash, Refine/React-Admin/Retool, `@supabase/auth-ui-react`, Clerk/Auth0, i18n libs, Vercel Cron, GitHub-Actions schedules.

### Table-stakes feature set for v1 (grouped by domain)

Detail: FEATURES.md. 96 table-stakes items total; condensed by domain.

**Auth & onboarding** — Email/pw signup, Google OAuth, password reset; SMS OTP **after** date/time selection (delayed verification); quote before signup (postal-code gate at landing hero).

**Properties** — CRUD with multiple properties per customer; bedrooms, full+half bathrooms (`numeric(3,1)`), sqft ranges, pets, property type; postal code validated against `coverage_postal_prefixes`; parking notes, entry/lockbox notes (encrypted), special instructions per property and per visit; hazard/preference flags.

**Services & pricing** — Five SKUs (Standard, Deep, Move-In/Out, Post-Construction admin-gated, Recurring as cadence wrapper); add-ons à la carte; server-side `pricing.quote()` SQL function as single source of truth; admin-editable `pricing_rules` versioned by `effective_from`; HST 13% itemized; recurring discount -10% bi-weekly / -15% weekly.

**Booking flow** — 6-screen mobile-first wizard with sticky order summary; time **windows** (never exact times); capacity-aware calendar grayout; SetupIntent for card saving (3DS up-front, `off_session=true` for renewals); booking saves progress + 1h recovery email.

**Packages & subscriptions** — One-shot via Payment Element; prepaid package (2–24 visits, `visits_remaining` counter), **non-expiring** for v1; Stripe Checkout subscription mode, `proration_behavior: "none"`, pause + cancel via Customer Portal, renewal-soon email at T-7.

**Cancellation & reschedule** — >24h free; <24h 50% fee or forfeit one package visit; no-show 100%; admin override; reschedule cancels old queued reminders.

**Customer dashboard** — Next visit hero card + upcoming + past + rebook-this-visit; Stripe Customer Portal link; Stripe-hosted invoices; subscription/package status; CASL-compliant notification preferences.

**Notifications cadence** — Confirmation on `payment_intent.succeeded`; 24h reminder (cron every 15 min, `(visit_id, template)` unique partial index); "Crew on the way" SMS via Postgres trigger + `pg_net`; post-service review at T+24h; renewal email at T-7 via `invoice.upcoming`; payment failure + retry link.

**Admin panel** (`/admin/*`, lazy-loaded, role-gated) — Job queue of unassigned visits, calendar view, crew management, assign modal, status transitions writing `audit_log` via trigger, customer 360, pricing/coverage/services/policy editors, one-click refund + comp-visit credit ledger, failed-payment queue, append-only audit log.

### Differentiators worth including in v1 (top 5)

Detail: FEATURES.md §13.

1. **Transparent live pricing calculator before signup** (S) — wedge vs Molly Maid / Merry Maids' callback forms.
2. **Satisfaction guarantee** (S, copy + admin tool) — industry-standard signal.
3. **Same-cleaner-each-visit promise for recurring customers** (M) — operational discipline; Tidy's retention lever.
4. **Eco-friendly product upgrade as add-on** (S) — KW/Guelph demographic responds.
5. **Non-expiring packages + crew bio cards + iCalendar attachment** (each S, ship together) — cheap, loved, clearly better than competitors.

Defer the **referral program** (currently in PROJECT.md "Out of Scope") to v1.5 unless growth becomes a priority during requirements — there is a tension to resolve (see Open Decisions).

### Anti-features to explicitly avoid

Consolidated from FEATURES §14 and PROJECT.md "Out of Scope". Re-evaluate only at the listed trigger.

| Anti-feature | Why not | Revisit at |
|---|---|---|
| Real-time GPS crew tracking | Solved by "on the way" SMS; expensive + creepy | Never for residential |
| In-app chat with cleaner | 24/7 expectation; SMS/phone covers it | 50+ visits/day with chat staff |
| Marketplace of independent cleaners | Different business model | Different company entirely |
| Native iOS/Android app | Web responsive handles 99% of bookings | 10× volume + stickiness data |
| Instant booking for first-time customers | Fraud/scope/no-show risk | After auto-assignment proven |
| Cleaner login / cleaner app | PROJECT.md decision; WhatsApp works | Crew count >5 |
| Public reviews on landing | PROJECT.md decision | After 50+ verified happy customers |
| Spanish frontend | Wrong demographic | Market entry change |
| Auto-assignment of crews | Manual at v1 volume | 30+ visits/day |
| Commercial / office cleaning | Different sales motion + insurance | Different product |
| Carpet shampoo / window-wash / pressure-wash | Equipment-heavy specialties | Subcontract or refuse |
| More than 3 plan tiers | Decision paralysis | Never |
| Annual contracts with cancel penalties | Reputation killer | Never |
| Surge pricing / dynamic AI pricing | Customer revolt | Never (need 1000+ jobs of data) |
| Push notifications | No native app | If native app ships |
| Custom payment gateway (Moneris/Interac) | Stripe handles everything Canadian | Never for v1 |
| Net-30 invoicing | Pay-up-front is the norm | Never for residential |
| In-admin support ticket system | Email + phone is fine | Use Front/Zendesk externally later |
| Multi-tenant SaaS | Hummi is one operator | White-label pivot |
| Magic-link as the only signin | Confuses 35–65 demo | Never as sole method |
| Mandatory SMS OTP before showing pricing | #1 conversion killer | Never |

### Architecture spine

Detail: ARCHITECTURE.md.

**DB tables** (all RLS + `FORCE ROW LEVEL SECURITY`): `profiles` (1:1 with `auth.users`), `properties` (soft-delete), `coverage_zones`, `coverage_postal_prefixes`, `services`, `pricing_rules` (versioned), `bookings` (one-shot), `packages` (prepaid N visits), `subscriptions` (monthly), **`visits`** (atomic unit, exactly one of `booking_id`/`package_id`/`subscription_id` enforced by check constraint), `crews`, `assignments` (unique on `visit_id`), `payments` (polymorphic), `cancellation_policies`, `reviews`, `ops.notifications_log`, `ops.audit_log`, `stripe.stripe_events` (idempotency PK).

**RLS model:**
- Customer policies scoped by `user_id = auth.uid()`; use `auth.user_id()` helper, never inline.
- Admin via `app_metadata.role = 'admin'` (`auth.is_admin()` helper). Set only via service-role Edge Function; never `user_metadata`.
- Service role bypasses RLS in Edge Functions for webhook side-effects.
- Business-rule writes go through security-definer RPCs (`create_booking`, `cancel_visit`, `start_subscription`).
- **Automated RLS smoke test in CI**: log in as user A, assert 0 rows for user B's data.

**Stripe webhook flow:**
1. Stripe POST → `stripe-webhook` Edge Function.
2. **Verify signature** against raw body (`req.text()` — many Edge runtimes JSON-parse early; capture raw).
3. **Insert into `stripe.stripe_events`** with PK = `event.id` ON CONFLICT DO NOTHING. If duplicate → return 200, exit.
4. Switch on `event.type`: `payment_intent.succeeded`/`.payment_failed`/`checkout.session.completed`/`invoice.paid`/`.payment_failed`/`customer.subscription.updated`/`.deleted`.
5. Handler does **minimum DB write + enqueue follow-up** (target <500ms). Heavy work goes into a `jobs` table or `pgmq`.
6. Mark `stripe_events.processed_at = now()`, return 200. Errors → set `error`, throw → Stripe retries.

**Scheduled jobs:** `pg_cron` + `pg_net` from inside Postgres. Every 15 min: `ops.queue_24h_reminders()` finds visits 23h45m–24h15m out without a sent `reminder_24h` log row, posts to `notify-visit-reminder` Edge Function. `(visit_id, template)` unique partial index where `status in ('sent','delivered','queued')` enforces no double-sends. **Fallback** if `pg_cron` unavailable on the Supabase plan: Vercel Cron hitting Edge Functions.

**Admin panel approach:** same Vite SPA under `/admin/*`, lazy-loaded via `lazy()` + `Suspense` (saves ~100–200 KB on customer bundle), gated by `<AdminGuard>` checking `session.user.app_metadata.role`. RLS enforces it server-side. Separate `<AdminLayout>`; new `src/admin/` top-level folder; reuses customer types and components.

### Suggested build order (12 phases)

| # | Phase | Exits with |
|---|---|---|
| 1 | **Foundation** — Supabase project, migrations, CI `db push` check, `pgcrypto/pg_cron/pg_net`, `ops` + `stripe` schemas, env-var discipline, two Supabase projects (staging + prod), gitleaks pre-commit, audit 12 npm vulns + Stripe-key history per CONCERNS.md | Empty DB, discipline, baseline debt addressed |
| 2 | **Auth + profiles** — `profiles` + `handle_new_user` trigger + `auth.is_admin()` + RLS, email/pw + Google OAuth, protected-route loader pattern, identity linking enabled | Users can sign up/in/out |
| 3 | **Coverage + properties** — `coverage_zones`, `coverage_postal_prefixes` (seeded), `properties` + insert trigger, RPCs, "My properties" dashboard | Customers manage geo-gated properties |
| 4 | **Services catalog + pricing engine** — `services`, `pricing_rules` (seeded, versioned), `pricing.quote()` security-definer fn, quote-preview UI pre-signup, admin scaffold | Real prices visible without auth |
| 5 | **Phone verification (Twilio Verify)** — `send-otp`/`verify-otp` Edge Functions, OTP modal, rate-limits, Captcha gate (Twilio toll-free verification process **started in Phase 1**) | `phone_verified_at` gating helper |
| 6 | **One-shot booking + Stripe + webhook** *(keystone)* — `bookings`/`visits`/`payments`/`stripe.stripe_events`, `create_booking` RPC, `create-payment-intent` + `stripe-webhook` Edge Functions, full booking wizard, confirmation email, E2E test with test card, **idempotency + signature verification mandatory** | Real customer can book + pay E2E |
| 7 | **Customer dashboard** — upcoming/past visits, payments tab, Stripe Customer Portal link, booking detail with status timeline | Customer can see everything they've done |
| 8 | **Packages (prepaid N visits)** — `packages` table, `purchase_package` RPC, `schedule_package_visit` atomic decrement, webhook `kind='package'` branch, "X of N remaining" UI, non-expiring policy | Customers can buy + use packages |
| 9 | **Subscriptions (Stripe Checkout subscription mode)** — `subscriptions`, `create-checkout-session` Edge Function, handlers tolerant of out-of-order via `upsert`, `proration_behavior: "none"`, **hybrid eager+lazy materialization (RRULE + 60-day rolling cron)** | All three commercial flows live |
| 10 | **Admin panel — visits, assignments, crews** — `crews` + `assignments`, lazy-loaded `/admin/*`, job queue + calendar + assign modal, audit_log via trigger, `on_visit_status_change` trigger fires `notify-on-the-way`, RBAC `staff`/`admin` | Ops runs a day end-to-end |
| 11 | **Notifications — reminders + cancellation policy + reviews** — `cancellation_policies` (seeded), `reviews`, `queue_24h_reminders` + `queue_review_requests` crons, cancellation cancels pending notifications, fee-preview UI, post-visit review form | Closed customer comms loop |
| 12 | **Admin polish + launch readiness** — editors with `effective_from` versioning, audit-log viewer, admin user management, accessibility pass, **Stripe live-mode cutover** with HST/Stripe Tax verified, **CASL one-click cancel verified**, **PIPEDA privacy policy live**, gitleaks history scan, Lighthouse pass | v1 ready for paying customers |

**Parallelization:** Phase 3 + Phase 4 can run in parallel after Phase 2. Phase 5 slots anywhere before Phase 6. Phases 8 + 9 can run in parallel after Phase 6. Phase 10 (admin UI) can start once Phase 6 data exists.

**Lead-time risks to start in Phase 1:** Twilio Canadian toll-free verification (2–3 weeks), Stripe Canadian account + bank verification (weeks), Resend DKIM/SPF/DMARC warmup (1–2 weeks), Google Places billing key, HST registration decision with accountant.

### Critical pitfalls + prevention (top 10)

Detail: PITFALLS.md.

| # | Pitfall (severity) | One-line prevention |
|---|---|---|
| 1 | **Stripe webhook duplicates / re-credits** (Critical, §1.2 + §9.1–9.4) | `stripe.stripe_events` PK = `event.id`, `INSERT ... ON CONFLICT DO NOTHING` first thing in handler; verify → idempotent insert → minimum DB write → enqueue → 200 in <500ms. |
| 2 | **Missing webhook signature verification** (Critical, §9.3) | First line of every handler: `stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)` against `req.text()` (raw, not parsed). |
| 3 | **RLS policy leaks** (Critical, §2.1) | `ENABLE` + `FORCE ROW LEVEL SECURITY` on every table, `auth.user_id()` helper, automated CI smoke test as user A asserting 0 rows for user B's data. |
| 4 | **Admin role in `user_metadata` (user-editable!)** (Critical, §2.2) | Role lives in `app_metadata` only, set via service-role Edge Function, RLS reads via `auth.jwt() -> 'app_metadata' ->> 'role'`. Never gate admin purely client-side. |
| 5 | **Service-role key leaking to the browser bundle** (Critical, §2.4) | CI grep fails build on `VITE_.*SERVICE` or `service_role` strings in `src/`. Key only in Edge Function secrets + GitHub Actions secrets. Gitleaks pre-commit + history scan once before launch. |
| 6 | **Timezone bugs around DST** (Critical, §3.1) | All timestamps `timestamptz`. Store `scheduled_at` + `scheduled_tz text DEFAULT 'America/Toronto'`. Persist precomputed `send_at` for reminders; cron uses `send_at <= now()`. Tests include March + November transition weekends. |
| 7 | **Double-booked time slots / no slot lock during async Stripe Checkout** (Critical, §3.2) | `capacity(zone, date, time_block, max_visits, booked_visits)` with `SELECT ... FOR UPDATE` in booking transaction. Hold slot when Checkout session created; release on `checkout.session.expired`. |
| 8 | **Preview deploys hitting prod Supabase** (Critical, §8.2) | Two Supabase projects: staging (preview env scope) + prod (production env scope only). Stripe test keys for staging, live for prod, separate webhook endpoints. |
| 9 | **Ontario CPA: subscription cancellation friction → chargebacks + regulatory exposure** (Critical, §7.2) | One-click cancel from dashboard. Renewal notice via `invoice.upcoming` at T-7. Explicit checkbox at signup with price + cadence. 10-day cooling-off rule in code. Lawyer reviews TOS once. |
| 10 | **HST handling drift (Stripe Tax, registration threshold, `tax_behavior: "exclusive"`)** (Critical, §1.6 + §7.3) | Decide pre-launch: register with CRA immediately vs wait for $30k/12mo. If registered: Stripe Tax with product code `txcd_20030000`, `tax_behavior: "exclusive"`, persist `tax_amount` + `tax_jurisdiction`, show breakdown in checkout UI, weekly $25k alert. |

**Honorable mentions:** notification re-sends on retries (§4.4, two-phase commit + unique partial index), Canadian SMS deliverability (§4.1, toll-free verification lead time), email domain reputation (§4.3, SPF/DKIM/DMARC at domain purchase), audit log gaps (§6.1, Postgres trigger from day one), bundle bloat (§8.4 + CONCERNS.md, lazy admin route + `manualChunks` + defer Stripe.js).

---

## Open decisions / tensions to resolve in requirements

| # | Decision | Tension | Recommendation |
|---|---|---|---|
| 1 | **Referral program in v1?** | PROJECT.md "Out of Scope" vs FEATURES.md §13 #5 ROI | Default: defer to v1.5. Re-debate only if growth is a top-3 v1 goal. |
| 2 | **SMS OTP at signup vs delayed after date/time pick** | PROJECT.md lists OTP under auth; FEATURES §1 + ARCHITECTURE §4.1 say split it from primary auth | Phone verification is a **separate step gated by booking flow**, not signup. Primary auth = email/pw + Google OAuth. |
| 3 | **HST: register immediately or wait for $30k?** | PITFALLS §1.6 + §7.3 say decide pre-launch | Register-immediately for scale-oriented launch (simpler Stripe Tax). Confirm with accountant before Phase 6. |
| 4 | **Package expiry policy** | FEATURES §6 recommends non-expiring | Non-expiring for v1. Keep nullable `expires_at` column for future flexibility. |
| 5 | **Apple Pay / Google Pay at checkout** | FEATURES §12 says ship; not in PROJECT.md | Ship — Payment Element enables with one config flag. |
| 6 | **Subscription proration** | PITFALLS §1.1: `proration_behavior: "none"`; default is `create_prorations` | Adopt `proration_behavior: "none"` + "next-cycle" copy. Forbid mid-cycle downgrades in v1. |
| 7 | **Address autocomplete provider** | STACK §10 picks Google; PITFALLS §5.5 mentions Canada Post + Geoapify as cheaper | Default Google Places (best Canadian residential data). Reassess if Google bill exceeds $50/mo. Skip autocomplete if Phase 3 scope tight. |
| 8 | **Coverage validation: FSA-only or FSA + LDU?** | ARCHITECTURE §8.2 FSA-only; PITFALLS §5.4 argues FSA + LDU where partial | Schema supports both — nullable `ldu text` column on `coverage_postal_prefixes`. Seed FSA-only in v1; LDU rows future precision. |
| 9 | **Zod v3 vs v4** | STACK §2 flags timing | Install v3 in Phase 1. TODO to revisit when both Zod v4 and `@hookform/resolvers` v4 are stable. |
| 10 | **Realtime usage scope** | ARCHITECTURE mentions Realtime for both admin + dashboard; PITFALLS §2.6 warns about cost | Realtime **only** in admin live queue. Customer dashboard uses React Query revalidate-on-focus + 30s polling. Tabs-hidden disconnect on admin. |
| 11 | **Email: Resend vs Postmark** | STACK §8 picks Resend; PITFALLS §4.3 prefers Postmark for deliverability | Default Resend for DX. Pivot to Postmark in single Edge Function swap if Gmail spam-folder rate >5% during Phase 6 warmup. |
| 12 | **Brownfield baseline debt** (1.4MB JS, 12 npm vulns, prior Stripe-key history per CONCERNS.md) | PITFALLS cross-cutting says address in INFRA before product surface area | Bake into Phase 1: gitleaks history scan, `npm audit` triage, route-based code splitting, Vitest scaffolded, CSS audit started. |
| 13 | **Phone format input** | STACK §17 + Twilio E.164 requirement | `react-phone-number-input` v3 (Canadian preset) for UX; Zod enforces E.164 at boundary. |
| 14 | **Workers vs contractors classification** | PITFALLS §7.4 — operational, not software | Out of software scope. Keep `crews` schema flexible. Ontario employment lawyer before scaling crew count. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Library choices are battle-tested consensus; versions from Jan-2026 cutoff with 4-month gap — verify with `npm view` before install. Zod v3/v4 and resolvers v4 readiness are known open questions. |
| Features | HIGH | Competitor patterns (Tidy, Handy, Homeaglow, MaidPro, Molly Maid, Merry Maids) publicly observable; cleaning-industry feature canon is stable; Ontario items (HST, CASL, PIPEDA, CPA) cited from current law. |
| Architecture | HIGH | Standard Supabase+Stripe+Vercel pattern; every decision has explicit rationale + alternative considered + rejected. Phase 6 keystone design exercised by stable open-source examples. |
| Pitfalls | HIGH | All major pitfalls well-documented in vendor docs + community post-mortems. CPA 2025/2026 amendments and Canadian toll-free policies are time-sensitive — re-verify in legal/ops review before launch. |

**Overall confidence:** HIGH for roadmap structure; MEDIUM on exact library versions; MEDIUM on a few Ontario regulatory specifics needing accountant + lawyer signoff before live-mode cutover.

### Gaps to address during planning/execution

- **HST registration decision** — needs accountant before Phase 6.
- **Twilio Canadian toll-free verification** — start application in Phase 1.
- **Stripe Canadian bank verification** — start day one of Phase 1.
- **Email DKIM/SPF/DMARC + domain warmup** — DNS records 1–2 weeks before Phase 6.
- **`pg_cron` + `pg_net` availability on chosen Supabase plan** — verify in Phase 1; Vercel Cron is fallback.
- **Backup + PITR validation** — one successful restore drill before Phase 12.
- **CPA legal review** — subscription TOS + one-click cancel + cooling-off validated by Ontario lawyer before Phase 12.
- **Cleaner contractor agreement** — before Hummi has more than 2–3 crews.
- **Brownfield baseline debt** — Phase 1 absorbs; don't push after launch.

---

*Synthesis: 2026-05-14. Detailed sources in each companion doc.*
*Ready for: requirements definition → roadmap → phase planning.*
