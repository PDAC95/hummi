# Roadmap: Hummi

**Created:** 2026-05-14
**Depth:** Comprehensive (12 phases)
**Total v1 requirements:** 145 — all mapped, no orphans
**Markets:** Residential + commercial (KW / Cambridge / Guelph, Ontario)

## Overview

Hummi ships in 12 phases that move from infrastructure foundation through three commercial flows (one-shot, package, subscription) into operations tooling and launch readiness. Phase 1 starts the long-lead vendor work (Twilio toll-free, Stripe Canadian banking, Resend domain warmup, HST/CRA registration, two Supabase projects). Phase 6 is the keystone — one real customer can complete a booking end-to-end with Stripe Payment Element, the webhook is signed + idempotent, and HST is itemized. The remaining phases stack packages, subscriptions, admin tooling, notifications, cancellation policy, and launch hardening on top of that keystone.

Cross-cutting items (SEC-*, TEST-*, PLAT-*, CMP-*) have a primary home for their foundational policy and are threaded through every later phase as living requirements (RLS on every new table, smoke tests at each milestone, lazy-loaded chunks throughout). They're listed in their primary phase below for traceability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, ... 12): Planned milestone work
- Decimal phases (e.g. 6.1): Reserved for urgent insertions after planning

- [ ] **Phase 1: Foundation & Long-Lead Vendors** - Two Supabase projects, CI guardrails, baseline-debt cleanup, kickoff for Twilio/Stripe/Resend/CRA vendor lead times
- [ ] **Phase 2: Auth & Profiles** - Email/password + Google OAuth, account-type capture (personal/business), admin role in `app_metadata`
- [ ] **Phase 3: Coverage & Properties** - FSA-validated postal code gate; residential + commercial property CRUD with encrypted entry notes
- [ ] **Phase 4: Service Catalog & Pricing Engine** - Versioned pricing rules, server-side `pricing.quote()` security-definer fn, HST 13% itemized, pre-signup quote preview
- [ ] **Phase 5: Phone Verification (Twilio Verify)** - SMS-OTP gated between date/time selection and payment, captcha + rate limiting
- [ ] **Phase 6: One-shot Booking, Stripe Payment Element & Webhook (KEYSTONE)** - Real customer can book + pay end-to-end with signed/idempotent webhook, business invoice with HST #
- [ ] **Phase 7: Customer Dashboard** - Upcoming/past visits, status timeline, Stripe Customer Portal link, Stripe-hosted invoices
- [ ] **Phase 8: Packages (Prepaid 2–24 Visits)** - Non-expiring packages, atomic `schedule_package_visit` RPC, "X of N remaining" UI
- [ ] **Phase 9: Subscriptions (Custom Cadence, Stripe Checkout)** - Custom-interval subscriptions, RRULE 60-day rolling materialization, Customer Portal manages pause/cancel/card, one-click cancel
- [ ] **Phase 10: Admin Panel — Operations Core** - Lazy-loaded `/admin/*`, RBAC (admin/staff), job queue, calendar, crew assignment, status transitions, customer 360, refunds + comp credits, audit log
- [ ] **Phase 11: Notifications, Cancellation Policy & Reviews** - 24h reminders, on-the-way SMS via trigger, post-visit review request, cancellation policy (24h free / <24h 50% / no-show 100%) with fee preview
- [ ] **Phase 12: Admin Configuration, Compliance & Launch Readiness** - Pricing/services/coverage/policy editors, audit log viewer, RBAC user management, PIPEDA/CASL/Ontario CPA compliance, Lighthouse + accessibility pass, Stripe live-mode cutover

## Phase Details

### Phase 1: Foundation & Long-Lead Vendors
**Goal**: Establish discipline (CI guardrails, migration hygiene, secrets management, baseline-debt cleanup) and start every external lead-time clock so Phase 6 isn't blocked by Twilio, Stripe Canada, Resend DKIM, or CRA HST registration.
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08, INFRA-09, INFRA-10, INFRA-11, INFRA-12, INFRA-13, SEC-07, PLAT-07
**Success Criteria** (what must be TRUE):
  1. A developer can `supabase db push` a migration against staging and a CI step blocks merges that would break the prod schema
  2. CI fails any PR that introduces `VITE_.*SERVICE` or `service_role` strings inside `src/` (verified by an intentional red test)
  3. `npm audit` reports zero high/critical findings; gitleaks history scan has been run once and any exposed keys rotated
  4. Twilio toll-free CSCA verification, Stripe Canadian bank verification, Resend SPF/DKIM/DMARC warmup, and CRA HST registration are all in flight with documented start dates
  5. Sentry captures a synthetic error from both the SPA and a sample Edge Function, viewable in the dashboard
**Plans**: 7 plans
  - [x] 01-01-PLAN.md — Founder provisions Supabase staging+prod and Sentry org/projects (captures credentials) _(docs shipped 2026-05-15; founder owns Sentry remainder; Supabase block already filled)_
  - [x] 01-02-PLAN.md — Initialize Supabase locally, write + apply initial migration (extensions + schemas) _(applied LIVE to hummi-staging 2026-05-15; INFRA-02/06/07 complete)_
  - [x] 01-03-PLAN.md — GitHub Actions workflows (PR checks, deploy-staging, deploy-prod, gitleaks) + secret-grep script _(workflows + 2 founder runbooks shipped 2026-05-15; founder owns post-merge GH secrets + main branch ruleset config; INFRA-03/04 + SEC-07 complete)_
  - [ ] 01-04-PLAN.md — Sentry instrumentation for SPA (React 19) and Edge Functions (Deno)
  - [ ] 01-05-PLAN.md — npm audit cleanup (12 vulns) + gitleaks pre-commit hook + history scan
  - [x] 01-06-PLAN.md — Vendor applications: Twilio toll-free, Stripe Canada, Resend domain, CRA HST _(docs shipped 2026-05-15; founder owns 4 submissions)_
  - [ ] 01-07-PLAN.md — Red-test verification (CI blocks bad PR) + synthetic Sentry events + phase verification doc

### Phase 2: Auth & Profiles
**Goal**: Customers can create an account (personal or business), sign in via email/password or Google OAuth, and the platform has a strict, server-trusted admin role available for later phases.
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08, AUTH-09, AUTH-10, AUTH-11, SEC-01, SEC-02, SEC-03, SEC-04, TEST-05
**Success Criteria** (what must be TRUE):
  1. A new visitor can sign up with email + password, log out, and log back in on a different device with their session preserved
  2. A user can sign in with Google OAuth and is recognized as the same user if they previously signed up via email (identity linking works)
  3. Selecting "business" at signup captures legal name, Business Number, and optional HST # — and these fields appear on the profile
  4. An automated CI test logs in as user A, queries every customer table, and asserts zero rows leak from user B
  5. A user cannot promote themselves to admin by editing `user_metadata` — admin role lives only in `app_metadata` and is settable only by a service-role Edge Function

### Phase 3: Coverage & Properties
**Goal**: Customers can register one or more properties (residential or commercial) but only inside the KW/Cambridge/Guelph coverage zone, with all sensitive entry data encrypted at rest.
**Depends on**: Phase 2
**Requirements**: GEO-01, GEO-02, GEO-03, GEO-04, GEO-05, PROP-01, PROP-02, PROP-03, PROP-04, PROP-05, PROP-06, PROP-07, PROP-08, PROP-09, PROP-10, SEC-09
**Success Criteria** (what must be TRUE):
  1. A customer in N2L Waterloo can register their property; a customer attempting N6 London is blocked client-side AND server-side with a "we don't serve your area yet" message
  2. A residential customer can capture bedrooms, bathrooms (full + half as numeric), sqft range, pets, and property subtype; a commercial customer captures sqft, type (office/retail/post-construction), hours, and access notes
  3. A customer can register multiple properties under one account and soft-delete one without losing the visit history attached to it
  4. Entry/lockbox notes are encrypted at rest (pgcrypto) — verified by reading the raw column value in the DB and confirming it isn't plaintext
  5. An admin can add a new postal-code prefix to the coverage table and a customer in that prefix can immediately register without a deploy

### Phase 4: Service Catalog & Pricing Engine
**Goal**: Residential and commercial services have transparent, server-computed quotes (with HST itemized) that anyone can preview without signing up, and pricing rules are versioned so old quotes never drift.
**Depends on**: Phase 3
**Requirements**: SVC-01, SVC-02, SVC-03, SVC-04, SVC-05, SVC-06, SVC-07, SVC-08, SVC-09, SVC-10, SVC-11, SVC-12
**Success Criteria** (what must be TRUE):
  1. A visitor (no account) can enter a postal code, pick "Standard Residential" or "Office Commercial," fill in property attributes, and see a live price breakdown including subtotal, HST 13%, and total
  2. The pricing.quote() SQL function is the single source of truth — the same inputs produce the same price whether called from the SPA, an Edge Function, or psql
  3. An admin updates a pricing rule with a future `effective_from` and any quote saved before that timestamp still references the old rule's breakdown
  4. The commercial pricing formula returns a sqft-based price for office/retail/post-construction services, distinct from the attribute-based residential formula
  5. Stripe Tax product code `txcd_20030000` is configured with `tax_behavior: "exclusive"` and tax_amount + tax_jurisdiction are persisted on every quote

### Phase 5: Phone Verification (Twilio Verify)
**Goal**: Customers verify their phone via SMS-OTP after picking date/time but before payment — verifying intent without adding friction at signup.
**Depends on**: Phase 2 (auth) + Phase 1 (Twilio toll-free verification must be active by now)
**Requirements**: PHONE-01, PHONE-02, PHONE-03, PHONE-04, PHONE-05, PHONE-06
**Success Criteria** (what must be TRUE):
  1. A customer who selects a service, property, and date/time receives an OTP modal before the Stripe Payment Element loads — and cannot proceed to pay without verifying
  2. OTP requests are rate-limited (Captcha + per-phone + per-IP limits) so a bot cannot pump up Twilio costs
  3. Phone numbers are captured via `react-phone-number-input` with Canadian preset and stored in E.164 format
  4. `profiles.phone_verified_at` is set only by the `verify-otp` Edge Function — never directly settable from the SPA
  5. A returning verified customer is not asked to re-verify on subsequent bookings (the flag is sticky per account)

### Phase 6: One-shot Booking, Stripe Payment Element & Webhook (KEYSTONE)
**Goal**: A real customer can complete a real booking end-to-end — pick property, service, date/time, pay with card/Apple Pay/Google Pay, receive a confirmation email — with the webhook signed, idempotent, and writing the visit row atomically. Business customers receive a Stripe invoice with their Business Number and HST # included.
**Depends on**: Phase 4 (pricing) + Phase 5 (phone verification) + Phase 1 (Stripe live keys, Resend DKIM)
**Requirements**: BOOK-01, BOOK-02, BOOK-03, BOOK-04, BOOK-05, BOOK-06, BOOK-07, BOOK-08, BOOK-09, BOOK-10, BOOK-11, BOOK-12, BOOK-13, BOOK-14, BOOK-15, SEC-05, SEC-06, SEC-08, NOTIF-02, NOTIF-08, TEST-03, TEST-07
**Success Criteria** (what must be TRUE):
  1. A customer can complete the full booking wizard (property → service → date/time → review → pay) on mobile and desktop, with Apple Pay and Google Pay options available in the Payment Element
  2. The slot they picked is locked the moment the PaymentIntent is created and released if payment fails or times out at 15 minutes — preventing double-booking
  3. The Stripe webhook verifies the signature on the raw body, inserts into `stripe.stripe_events` with PK = event.id `ON CONFLICT DO NOTHING`, and an idempotency E2E test (sending the same event twice) produces exactly one visit row
  4. A confirmation email arrives within 60 seconds via Resend with the booking details, scheduled time in America/Toronto, and HST itemized
  5. A business customer's confirmation includes a Stripe-hosted invoice URL with their captured Business Number and HST # on the invoice document

### Phase 7: Customer Dashboard
**Goal**: A customer can see everything they've done — next visit prominently, upcoming list, past visits with rebook, payment methods and invoices via Stripe Customer Portal, and CASL-compliant notification preferences.
**Depends on**: Phase 6
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, DASH-07, DASH-08, PLAT-03, PLAT-04
**Success Criteria** (what must be TRUE):
  1. The dashboard hero card shows the customer's next upcoming visit with date, time window in Toronto local time, property address, and service name — at a glance
  2. A customer can click "rebook this visit" on any past visit and lands on the booking wizard with property/service/add-ons pre-filled
  3. The "Payments" tab opens a Stripe Customer Portal session where the customer can update cards, download invoices, and view payment history without leaving the brand
  4. A customer can toggle email and SMS notifications per category (transactional always on, marketing opt-in) and the preference is honored by the next outbound message
  5. Property management (CRUD) is accessible from the dashboard and bundles do not load Stripe.js until the user navigates to a payment route

### Phase 8: Packages (Prepaid 2–24 Visits)
**Goal**: A customer can buy a non-expiring package of 2–24 visits in one upfront payment and schedule visits from that balance any time without re-paying.
**Depends on**: Phase 6
**Requirements**: PKG-01, PKG-02, PKG-03, PKG-04, PKG-05, PKG-06, PKG-07, PKG-08
**Success Criteria** (what must be TRUE):
  1. A customer can choose "Package of 8 visits," pay once via Payment Element, and immediately see "8 of 8 visits remaining" in the dashboard
  2. The customer schedules a package visit and the counter atomically decrements to 7 — and a concurrent double-click cannot decrement past zero or oversubscribe
  3. Package visits do not expire — there is no enforced `expires_at` in v1, and the column is nullable for future use
  4. An admin can issue a comp-visit credit and the customer's package balance increments, with the action written to the audit log
  5. The package purchase flow reuses the Phase 6 Payment Element + webhook pipeline — the same idempotency guarantees apply (verified by the same test pattern)

### Phase 9: Subscriptions (Custom Cadence, Stripe Checkout)
**Goal**: A customer can subscribe with a custom interval (e.g. every 7, 14, 21, 30 days), be charged automatically by Stripe, and self-manage pause/cancel/card from the Stripe Customer Portal with one-click cancellation per Ontario CPA.
**Depends on**: Phase 6
**Requirements**: SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07, SUB-08, SUB-09, SUB-10, SUB-11, SUB-12, CMP-05
**Success Criteria** (what must be TRUE):
  1. A customer picks "Subscription, every 14 days," is redirected to Stripe Checkout (subscription mode), pays, and a `subscriptions` row is created mirroring Stripe state via `checkout.session.completed`
  2. The next 60 days of upcoming visits are materialized in the `visits` table from the subscription's RRULE — and a rolling cron extends this window forward daily
  3. `proration_behavior` is `"none"` so mid-cycle plan changes never produce surprise charges, and mid-cycle downgrades are not allowed in v1
  4. A renewal-soon email is sent 7 days before the next charge via the `invoice.upcoming` webhook
  5. A customer can cancel the subscription with a single click from the dashboard (no email-only flow) and receives confirmation — Ontario CPA compliance verified manually

### Phase 10: Admin Panel — Operations Core
**Goal**: Operations staff can run a day end-to-end — see unassigned visits, assign crews, transition status, manage customers, refund payments, all from a lazy-loaded admin panel that never bloats the customer bundle.
**Depends on**: Phase 6 (bookings exist) — can start in parallel with Phase 7/8/9
**Requirements**: ADM-01, ADM-02, ADM-03, ADM-04, ADM-05, ADM-06, ADM-07, ADM-08, ADM-09, ADM-10, ADM-11, ADM-12, ADM-13, ADM-14, ADM-15, NOTIF-04, NOTIF-09, PLAT-02
**Success Criteria** (what must be TRUE):
  1. An admin user logs in and is routed to `/admin` with the admin chunk lazy-loaded (verified: customer bundle stays under 1MB gzipped and admin code is not in it)
  2. A staff user can see the day's unassigned visits, drag-assign a crew, mark the visit "on the way," and the customer receives the SMS notification within 60 seconds — fired by the Postgres trigger
  3. A staff user cannot edit pricing rules or issue refunds (RBAC denies the route); an admin user can (RBAC allows)
  4. Every status transition writes a row to `ops.audit_log` via the Postgres trigger with `before`/`after` JSON and actor identity
  5. An admin can issue a refund with one click against a payment and the action appears in both the audit log and the `payments` table with refunded_amount_cents populated

### Phase 11: Notifications, Cancellation Policy & Reviews
**Goal**: Closed comms loop — customers receive timely transactional messages, can cancel/reschedule with a clear fee preview per policy, and a post-service review is captured (visible to admin only in v1).
**Depends on**: Phase 10 (status transitions exist) — can start in parallel with Phase 12 prep work
**Requirements**: NOTIF-01, NOTIF-03, NOTIF-05, NOTIF-06, NOTIF-07, NOTIF-10, NOTIF-11, CXL-01, CXL-02, CXL-03, CXL-04, CXL-05, CXL-06, CXL-07, CXL-08, CXL-09, CXL-10, REV-01, REV-02, REV-03, REV-04, REV-05, TEST-04, TEST-06
**Success Criteria** (what must be TRUE):
  1. A customer with a visit 24 hours out receives both an email and SMS reminder within a 15-minute window — and a second cron pass cannot produce a duplicate (unique partial index on `(visit_id, template)` enforces it)
  2. A customer canceling more than 24 hours before sees "$0 fee" in the preview; less than 24 hours sees "50% fee" or "1 package visit forfeit"; the policy is honored when they confirm
  3. Rescheduling a visit cancels any already-queued 24h reminder and on-the-way SMS, then re-queues fresh ones tied to the new time
  4. 24 hours after a visit is marked completed, the customer receives a review request email; submitting a 1–5 rating + comment writes to the `reviews` table and is visible only to admin
  5. A DST transition test (March + November weekends) confirms reminders fire at the correct local Toronto time, not at a shifted hour

### Phase 12: Admin Configuration, Compliance & Launch Readiness
**Goal**: Hummi is ready to take paying customers in production — pricing/services/coverage/policy editors are live, compliance (PIPEDA, CASL, Ontario CPA, HST) is verified by counsel and tested, accessibility/performance baselines pass, and Stripe is in live mode.
**Depends on**: Phase 11 (everything else)
**Requirements**: ADM-16, ADM-17, ADM-18, ADM-19, ADM-20, CMP-01, CMP-02, CMP-03, CMP-04, CMP-06, CMP-07, CMP-08, PLAT-01, PLAT-05, PLAT-06, TEST-01, TEST-02
**Success Criteria** (what must be TRUE):
  1. An admin can edit pricing rules, services, cancellation policy, and coverage prefixes from the admin UI — all changes are audit-logged and `effective_from`-versioned so old quotes/policies remain reproducible
  2. A new admin can be invited by email and receives the role via a service-role Edge Function (never via direct DB edit or `user_metadata` mutation)
  3. PIPEDA-compliant privacy policy and Ontario-lawyer-reviewed Terms of Service are published and linked from the footer; CASL marketing opt-in checkbox is separate from transactional consent at signup
  4. Ontario CPA cooling-off (10 days, full refund) is enforceable via an admin override path and documented in the policy editor
  5. Stripe is in live mode with the live webhook endpoint signed and tested; HST registration is confirmed with CRA; Lighthouse Performance ≥ 80 mobile on landing + quote pages with keyboard navigation and ARIA labels verified

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12

**Parallelization opportunities** (post-planning, with care):
- Phase 3 and Phase 4 can run in parallel after Phase 2
- Phase 5 can slot anywhere after Phase 2 and before Phase 6
- Phases 7, 8, and 9 can run in parallel after Phase 6
- Phase 10 (admin) can start as soon as Phase 6 lands data; doesn't have to wait for 7/8/9
- Phase 11 cron pieces can develop in parallel with Phase 10 UI

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Long-Lead Vendors | 4/7 | In Progress|  |
| 2. Auth & Profiles | 0/TBD | Not started | - |
| 3. Coverage & Properties | 0/TBD | Not started | - |
| 4. Service Catalog & Pricing Engine | 0/TBD | Not started | - |
| 5. Phone Verification | 0/TBD | Not started | - |
| 6. One-shot Booking & Stripe Webhook | 0/TBD | Not started | - |
| 7. Customer Dashboard | 0/TBD | Not started | - |
| 8. Packages | 0/TBD | Not started | - |
| 9. Subscriptions | 0/TBD | Not started | - |
| 10. Admin Panel — Operations Core | 0/TBD | Not started | - |
| 11. Notifications, Cancellation & Reviews | 0/TBD | Not started | - |
| 12. Admin Configuration, Compliance & Launch | 0/TBD | Not started | - |

---
*Roadmap created: 2026-05-14 from REQUIREMENTS.md (145 v1 reqs) and research synthesis (SUMMARY/ARCHITECTURE/STACK/PITFALLS/FEATURES).*
