# Requirements: Hummi

**Defined:** 2026-05-14
**Core Value:** Que un cliente de KW/Cambridge/Guelph (residencial o comercial) pueda agendar y pagar una limpieza en menos de 5 minutos y vuelva a contratar sin volver a capturar nada.

## v1 Requirements

Cada requisito atómico, testable y centrado en el usuario. Se mapean a fases del roadmap.

### Foundation & Infrastructure

- [ ] **INFRA-01**: Two Supabase projects configured (staging para previews, prod para production)
- [x] **INFRA-02**: Supabase migrations gestionadas via CLI (zero direct Studio edits en prod)
- [x] **INFRA-03**: CI pipeline ejecuta `npm run lint`, `tsc -b`, `vite build`, y `supabase db push --dry-run` en cada PR
- [x] **INFRA-04**: CI greppea `VITE_.*SERVICE` y `service_role` en `src/` para prevenir leak de service-role key
- [ ] **INFRA-05**: Gitleaks pre-commit hook + history scan ejecutado una vez antes de launch
- [x] **INFRA-06**: Postgres extensions habilitadas: `pgcrypto`, `pg_cron`, `pg_net`
- [x] **INFRA-07**: Schemas `ops` (logs internos) y `stripe` (idempotencia webhook) creados
- [ ] **INFRA-08**: Auditoría y resolución de 12 vulnerabilidades de `npm audit` listadas en CONCERNS.md
- [ ] **INFRA-09**: Sentry conectado (frontend + Edge Functions) con DSN en env vars
- [ ] **INFRA-10**: Twilio Canadian toll-free number aplicado con CSCA verification (en fase 1, lead time 2–3 semanas)
- [ ] **INFRA-11**: Stripe Canadian account con bank verification iniciada en fase 1
- [ ] **INFRA-12**: Resend domain configurado con SPF/DKIM/DMARC (warmup 1–2 semanas antes de Phase 6)
- [ ] **INFRA-13**: HST registrado con CRA antes de live-mode cutover

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password (Supabase Auth)
- [ ] **AUTH-02**: User can log in with Google OAuth
- [ ] **AUTH-03**: User can reset password via email link
- [ ] **AUTH-04**: User can log in / log out from any page
- [ ] **AUTH-05**: User session persists across browser refresh
- [ ] **AUTH-06**: User selects account type at signup: `personal` (residencial) or `business` (comercial)
- [ ] **AUTH-07**: Business account captures legal name, Business Number, HST # (optional)
- [ ] **AUTH-08**: Admin role lives en `app_metadata.role` (only settable via service-role Edge Function)
- [ ] **AUTH-09**: `auth.is_admin()` helper function exists in DB and is used by RLS policies
- [ ] **AUTH-10**: Protected routes use React Router 7 loader pattern (no `<RequireAuth>` wrappers)
- [ ] **AUTH-11**: Identity linking enabled (email + Google same user)

### Phone Verification (Twilio Verify)

- [ ] **PHONE-01**: User can request SMS OTP via `send-otp` Edge Function (rate-limited)
- [ ] **PHONE-02**: User can verify OTP via `verify-otp` Edge Function
- [ ] **PHONE-03**: `profiles.phone_verified_at` timestamp set on successful verification
- [ ] **PHONE-04**: OTP request gate triggered between date/time selection and payment in booking wizard
- [ ] **PHONE-05**: Captcha gate on OTP request to prevent abuse
- [ ] **PHONE-06**: Phone format input uses `react-phone-number-input` (Canadian preset); Zod enforces E.164

### Properties

- [ ] **PROP-01**: User can register a property with street address, city, postal code
- [ ] **PROP-02**: System validates postal code against `coverage_postal_prefixes` (FSA-based) and blocks out-of-zone
- [ ] **PROP-03**: User picks property type: `residential` (house/apartment/townhouse) or `commercial` (office/retail/post-construction)
- [ ] **PROP-04**: Residential property captures: bedrooms (int), bathrooms (numeric — full + half), sqft range (enum), pets (bool), type (enum)
- [ ] **PROP-05**: Commercial property captures: sqft (numeric), type (office/retail/post-construction), preferred hours, access notes
- [ ] **PROP-06**: User can register multiple properties under one account
- [ ] **PROP-07**: User can edit a saved property (changes versioned via `updated_at`)
- [ ] **PROP-08**: User can soft-delete a property
- [ ] **PROP-09**: User can capture parking notes and entry/lockbox notes (encrypted at rest) per property
- [ ] **PROP-10**: User can capture special instructions per booking that override property defaults

### Service Catalog & Pricing

- [ ] **SVC-01**: Service catalog seeded with residential SKUs: Standard, Deep, Move-In/Move-Out, Post-Construction
- [ ] **SVC-02**: Service catalog seeded with commercial SKUs: Office (regular), Retail/Locales, Post-Construction commercial
- [ ] **SVC-03**: Admin can add/edit/disable services from the admin panel
- [ ] **SVC-04**: Add-ons per service (e.g., inside oven, inside fridge, eco products) as separate rows
- [ ] **SVC-05**: Pricing rules table is versioned by `effective_from` and `effective_to`
- [ ] **SVC-06**: Residential pricing formula: base × bedrooms × bathrooms × sqft_factor × service_type_multiplier
- [ ] **SVC-07**: Commercial pricing formula: sqft × service_type_rate
- [ ] **SVC-08**: Server-side `pricing.quote(property_id, service_id, addons[])` security-definer function is single source of truth
- [ ] **SVC-09**: HST 13% itemized in every quote (line item: subtotal, HST, total)
- [ ] **SVC-10**: Stripe Tax product code `txcd_20030000` with `tax_behavior: "exclusive"`
- [ ] **SVC-11**: Quote preview UI visible before signup (postal code → service → property attributes → live price)
- [ ] **SVC-12**: Admin can edit pricing rules; old quotes use old rule (effective_from honored)

### One-shot Booking & Payment

- [ ] **BOOK-01**: User selects property, service, add-ons, date, and time window (not exact time)
- [ ] **BOOK-02**: Calendar shows greyed-out slots when capacity is full for that date/zone/time block
- [ ] **BOOK-03**: Booking flow saves progress; abandoned bookings get a recovery email at T+1h
- [ ] **BOOK-04**: User confirms quote and proceeds to payment
- [ ] **BOOK-05**: Phone verification gate fires here if not yet verified (PHONE-04)
- [ ] **BOOK-06**: Stripe Payment Element renders with Apple Pay, Google Pay, and card support
- [ ] **BOOK-07**: `create-payment-intent` Edge Function creates Stripe PaymentIntent with idempotency key
- [ ] **BOOK-08**: `create_booking` RPC creates `bookings`, `visits`, and `payments` rows atomically with `SELECT FOR UPDATE` on capacity
- [ ] **BOOK-09**: Capacity slot held when PaymentIntent created; released on `payment_intent.payment_failed` or 15-min timeout
- [ ] **BOOK-10**: `stripe-webhook` Edge Function verifies signature against raw body via `stripe.webhooks.constructEvent`
- [ ] **BOOK-11**: Webhook inserts into `stripe.stripe_events` (PK = event.id) `ON CONFLICT DO NOTHING` for idempotency
- [ ] **BOOK-12**: On `payment_intent.succeeded`, booking marked as paid and confirmation email queued
- [ ] **BOOK-13**: Confirmation email sent via Resend with React Email template (English)
- [ ] **BOOK-14**: Business customers receive invoice with their Business Number and HST # included
- [ ] **BOOK-15**: All timestamps stored as `timestamptz`; `scheduled_at` + `scheduled_tz` (default `America/Toronto`)

### Customer Dashboard

- [ ] **DASH-01**: Dashboard hero card shows next upcoming visit with date, time window, property, service
- [ ] **DASH-02**: Upcoming visits list (paginated)
- [ ] **DASH-03**: Past visits list with "rebook this visit" CTA
- [ ] **DASH-04**: Booking detail page shows status timeline (booked → assigned → on the way → completed)
- [ ] **DASH-05**: "Payments" tab links to Stripe Customer Portal for cards, invoices, and subscription management
- [ ] **DASH-06**: Invoice download available via Stripe-hosted URLs (no custom PDF generation)
- [ ] **DASH-07**: Notification preferences (CASL-compliant): email + SMS toggles per category (transactional / marketing)
- [ ] **DASH-08**: Property management tab (CRUD) accessible from dashboard

### Packages (Prepaid N Visits)

- [ ] **PKG-01**: Customer can purchase a package of 2 to 24 visits prepaid
- [ ] **PKG-02**: Package payment uses one-shot Payment Element flow (BOOK-06 through BOOK-12)
- [ ] **PKG-03**: Webhook handler `kind='package'` creates `packages` row with `visits_remaining = N`
- [ ] **PKG-04**: Package visits are non-expiring (no `expires_at` enforced in v1; column nullable for future)
- [ ] **PKG-05**: Customer schedules package visits anytime via booking wizard with "use my package" option
- [ ] **PKG-06**: `schedule_package_visit` RPC atomically decrements `visits_remaining` and creates `visits` row
- [ ] **PKG-07**: Dashboard shows "X of N visits remaining" with link to schedule next
- [ ] **PKG-08**: Admin can issue comp-visit credit to a customer (audit-logged)

### Subscriptions (Recurring with Custom Cadence)

- [ ] **SUB-01**: Customer selects subscription with custom cadence (interval in days — e.g. 7, 14, 21, 30, 45, 60)
- [ ] **SUB-02**: Stripe Checkout (subscription mode) creates customer + subscription + first invoice
- [ ] **SUB-03**: `proration_behavior: "none"` prevents mid-cycle prorations
- [ ] **SUB-04**: `subscriptions` table mirrors Stripe state via `customer.subscription.updated/.deleted` webhooks
- [ ] **SUB-05**: Webhook handlers tolerate out-of-order events via `upsert` keyed by `stripe_subscription_id`
- [ ] **SUB-06**: Recurring visits materialized via hybrid eager+lazy: RRULE-based 60-day rolling cron generates upcoming `visits` rows
- [ ] **SUB-07**: Customer can pause subscription via Stripe Customer Portal
- [ ] **SUB-08**: Customer can cancel subscription in **one click** from dashboard (Ontario CPA compliance)
- [ ] **SUB-09**: Customer can update payment method via Stripe Customer Portal
- [ ] **SUB-10**: Renewal-soon email sent at T-7 days via `invoice.upcoming` webhook
- [ ] **SUB-11**: Payment failure triggers retry email with Customer Portal link
- [ ] **SUB-12**: Mid-cycle plan changes/downgrades forbidden in v1 (only cancel-and-resubscribe)

### Cancellation & Reschedule

- [ ] **CXL-01**: Customer can cancel an upcoming visit from dashboard
- [ ] **CXL-02**: Cancellation >24h before visit: free, no charge
- [ ] **CXL-03**: Cancellation <24h before visit: 50% fee charged OR forfeit one package visit
- [ ] **CXL-04**: No-show: 100% charge applied by admin
- [ ] **CXL-05**: UI shows fee preview before customer confirms cancellation
- [ ] **CXL-06**: Customer can reschedule an upcoming visit (subject to cancellation policy)
- [ ] **CXL-07**: Reschedule cancels old queued notifications (24h reminder, on-the-way)
- [ ] **CXL-08**: Reschedule applies cancellation policy if <24h to original time
- [ ] **CXL-09**: Admin can override cancellation policy (audit-logged)
- [ ] **CXL-10**: Cancellation policy values configurable from admin panel (window hours, fee %, no-show %)

### Notifications

- [ ] **NOTIF-01**: `ops.notifications_log` table with unique partial index on `(visit_id, template) WHERE status IN ('sent','delivered','queued')` to prevent duplicate sends
- [ ] **NOTIF-02**: Booking confirmation email sent on `payment_intent.succeeded`
- [ ] **NOTIF-03**: 24h-before-visit reminder (email + SMS) sent via `pg_cron` every 15 min finding visits 23h45m–24h15m out
- [ ] **NOTIF-04**: "Crew on the way" SMS sent when admin marks visit status `on_the_way` (Postgres trigger + `pg_net`)
- [ ] **NOTIF-05**: Post-service review request email sent at T+24h after visit `completed`
- [ ] **NOTIF-06**: Subscription renewal reminder email sent at T-7 via `invoice.upcoming` webhook
- [ ] **NOTIF-07**: Payment failure email with retry link sent on `invoice.payment_failed`
- [ ] **NOTIF-08**: All transactional emails sent via Resend with React Email components
- [ ] **NOTIF-09**: All SMS sent from Edge Functions via Twilio REST (never from browser)
- [ ] **NOTIF-10**: Customer notification preferences honored (CASL: transactional always sent; marketing requires opt-in)
- [ ] **NOTIF-11**: Send timestamp computed and stored as `send_at` in `notifications_log` (DST-safe)

### Coverage / Geographic Validation

- [ ] **GEO-01**: `coverage_zones` table seeded with KW, Cambridge, Guelph
- [ ] **GEO-02**: `coverage_postal_prefixes` table seeded with FSA list (N2 + N1R/N1S/N1T + N3C/N3E/N3H + N1E/N1G/N1H/N1K/N1L)
- [ ] **GEO-03**: Client-side postal code validation on landing hero (UX) → "We serve your area" or "Not yet, get notified"
- [ ] **GEO-04**: Server-side validation in `pricing.quote()` and `create_booking` RPC (security)
- [ ] **GEO-05**: Admin can add/edit postal prefixes without redeploy

### Reviews

- [ ] **REV-01**: `reviews` table with rating (1-5) and comment
- [ ] **REV-02**: Review request email sent T+24h after visit completed (NOTIF-05)
- [ ] **REV-03**: Customer can submit review via unique link in email
- [ ] **REV-04**: Reviews visible only to admin in v1 (not published publicly)
- [ ] **REV-05**: Admin sees per-customer and per-crew review aggregates

### Admin Panel — Core

- [ ] **ADM-01**: Admin panel mounted at `/admin/*`, lazy-loaded as separate chunk
- [ ] **ADM-02**: `<AdminGuard>` checks `session.user.app_metadata.role IN ('admin','staff')`
- [ ] **ADM-03**: Admin login flow shares Supabase Auth but routes to admin shell after login
- [ ] **ADM-04**: RBAC: `staff` can manage visits and assignments; `admin` can also manage pricing, services, coverage, refunds
- [ ] **ADM-05**: Admin job queue: list of unassigned visits with filter by date/zone
- [ ] **ADM-06**: Admin calendar view: month/week/day showing all visits with status colors
- [ ] **ADM-07**: Admin can assign a crew to a visit (writes `assignments` row, unique on `visit_id`)
- [ ] **ADM-08**: Admin can transition visit status: `booked → assigned → on_the_way → in_progress → completed → cancelled`
- [ ] **ADM-09**: Status transitions write to `ops.audit_log` via Postgres trigger

### Admin Panel — Customer & Operations

- [ ] **ADM-10**: Customer 360 view: contact, properties, all visits, subscriptions, packages, payments, reviews
- [ ] **ADM-11**: Admin can issue refund (one click → Stripe API) — refund logged to `payments` and audit log
- [ ] **ADM-12**: Admin can issue comp-visit credit (manual credit to customer's package or subscription)
- [ ] **ADM-13**: Failed payments queue: list of `invoice.payment_failed` events with retry link sender
- [ ] **ADM-14**: Audit log viewer: filter by user, action, date
- [ ] **ADM-15**: Crew management CRUD: name, contact, active flag, region preference

### Admin Panel — Configuration

- [ ] **ADM-16**: Pricing rules editor with `effective_from` versioning (new rule, old rule preserved)
- [ ] **ADM-17**: Service catalog editor (add/edit/disable services and add-ons)
- [ ] **ADM-18**: Cancellation policy editor (window hours, fee %, no-show %)
- [ ] **ADM-19**: Coverage editor: add/remove postal prefixes per zone
- [ ] **ADM-20**: Admin user management: invite admin/staff via email (sets `app_metadata.role` via service-role Edge Function)

### Security & Data Integrity

- [ ] **SEC-01**: All tables have `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`
- [ ] **SEC-02**: Customer policies scoped by `auth.user_id()` helper (no inline `auth.uid()`)
- [ ] **SEC-03**: Admin role checked via `auth.is_admin()` (reads `app_metadata.role`, never `user_metadata`)
- [ ] **SEC-04**: Automated RLS smoke test in CI: log in as User A, assert 0 rows leaked from User B
- [ ] **SEC-05**: Webhook signature verification on every Stripe Edge Function call
- [ ] **SEC-06**: Idempotency table `stripe.stripe_events` with PK = `event.id` (`ON CONFLICT DO NOTHING`)
- [x] **SEC-07**: Service-role key only in Edge Function secrets + GitHub Actions secrets (never in `src/`)
- [ ] **SEC-08**: All business-rule writes go through security-definer RPCs (`create_booking`, `cancel_visit`, `start_subscription`, `purchase_package`, `schedule_package_visit`)
- [ ] **SEC-09**: Sensitive columns (entry notes, lockbox codes) encrypted at rest using `pgcrypto`

### Compliance (Ontario)

- [ ] **CMP-01**: PIPEDA-compliant privacy policy published before launch
- [ ] **CMP-02**: CASL: explicit opt-in checkbox at signup for marketing emails (separate from transactional)
- [ ] **CMP-03**: CASL: one-click unsubscribe in every marketing email; unsubscribe processed within 10 days
- [ ] **CMP-04**: Ontario CPA: subscription renewal disclosure at signup (price, cadence, next charge date)
- [ ] **CMP-05**: Ontario CPA: one-click subscription cancel (already in SUB-08)
- [ ] **CMP-06**: Ontario CPA: 10-day cooling-off period for subscriptions (full refund if cancelled within 10 days of first charge)
- [ ] **CMP-07**: HST tax registration with CRA completed before live mode
- [ ] **CMP-08**: Terms of Service reviewed by Ontario lawyer before launch

### Platform & Performance

- [ ] **PLAT-01**: Web app responsive (mobile-first)
- [ ] **PLAT-02**: Bundle size: customer chunk under 1MB gzipped (Vite `manualChunks` for vendor split)
- [ ] **PLAT-03**: Admin chunk loaded only when `/admin/*` visited (React `lazy()`)
- [ ] **PLAT-04**: Stripe.js loaded only on booking/payment pages (deferred)
- [ ] **PLAT-05**: Lighthouse Performance ≥ 80 on mobile for landing + quote pages
- [ ] **PLAT-06**: Accessibility: keyboard navigation, ARIA labels on form inputs, `aria-live` for toasts
- [ ] **PLAT-07**: Sentry captures unhandled errors in browser + Edge Functions

### Testing

- [ ] **TEST-01**: Vitest + Testing Library configured; smoke tests for critical components
- [ ] **TEST-02**: MSW configured for mocking Supabase + Stripe in unit tests
- [ ] **TEST-03**: Playwright E2E test against Vercel preview: signup → quote → book → pay (test card) → confirmation
- [ ] **TEST-04**: Playwright E2E test for subscription: subscribe → renewal webhook simulation → cancel
- [ ] **TEST-05**: DB integration test: RLS leak test (User A vs User B)
- [ ] **TEST-06**: DB integration test: DST transition weekend (March + November)
- [ ] **TEST-07**: Stripe webhook idempotency test: same event ID twice → only one DB row

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Growth & Marketing

- **REF-01**: Referral program — customers share codes, get credit on successful referral
- **REF-02**: Promo codes / discount coupons
- **REV-V2-01**: Approve and publish reviews as testimonials on landing
- **MKT-01**: Email drip campaigns for inactive customers

### UX Polish

- **UX-V2-01**: Google Places address autocomplete (v1.1)
- **UX-V2-02**: LDU-level postal code precision (some FSA partial coverage)
- **UX-V2-03**: Multilingual (Spanish frontend if demographic shifts)
- **UX-V2-04**: PWA install prompt

### Operations

- **OPS-V2-01**: Cleaner app/login (mark on-the-way, completed, photos)
- **OPS-V2-02**: Auto-assignment of crews based on availability + zone
- **OPS-V2-03**: GPS tracking of crews (probably never)
- **OPS-V2-04**: SMS chat with crew (probably never)
- **OPS-V2-05**: Native iOS/Android app

### Business

- **BIZ-V2-01**: Commercial Net-30 invoicing for select clients
- **BIZ-V2-02**: Multi-location commercial (one contract, multiple offices)
- **BIZ-V2-03**: Cleaning supplies marketplace add-on

## Out of Scope

Explicitly excluded for v1. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real-time GPS crew tracking | Solved by "on the way" SMS; expensive and creepy |
| In-app chat with cleaner | 24/7 expectation; SMS/phone covers it |
| Marketplace of independent cleaners | Different business model entirely |
| Native iOS/Android app | Web responsive handles 99% of bookings |
| Instant booking for first-time customers | Fraud and scope risk |
| Cleaner login / cleaner app v1 | WhatsApp works for current crew size |
| Public customer reviews on landing | Need 50+ verified reviews first |
| Spanish frontend | Wrong demographic for KW/Cambridge/Guelph |
| Auto-assignment of crews | Manual at v1 volume |
| Carpet shampoo / window-wash / pressure-wash | Equipment-heavy specialties; subcontract if needed |
| More than 3 plan tiers | Decision paralysis |
| Annual contracts with cancel penalties | Reputation killer |
| Surge pricing / dynamic AI pricing | Customer revolt; need 1000+ jobs of data |
| Net-30 invoicing for commercial in v1 | Pay-up-front is the norm |
| Custom payment gateway (Moneris/Interac) | Stripe handles all Canadian payment needs |
| Magic-link as the only signin | Confuses 35-65 demographic |
| Mandatory SMS OTP at signup | #1 conversion killer; gated to booking instead |
| Referral program v1 | Deferred to v1.5 |
| Google Places autocomplete v1 | Manual input + postal code validation enough |
| Realtime customer dashboard updates | React Query polling enough; Realtime reserved for admin live queue |

## Traceability

Per-REQ-ID mapping to phases. Every v1 requirement maps to exactly one phase. Cross-cutting items (SEC, TEST, PLAT, CMP) are placed in the phase where their foundational policy lives; they recur as living requirements in later phases by virtue of "every new table gets RLS," etc.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Pending |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 1 | Complete |
| INFRA-08 | Phase 1 | Pending |
| INFRA-09 | Phase 1 | Pending |
| INFRA-10 | Phase 1 | Pending |
| INFRA-11 | Phase 1 | Pending |
| INFRA-12 | Phase 1 | Pending |
| INFRA-13 | Phase 1 | Pending |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| AUTH-06 | Phase 2 | Pending |
| AUTH-07 | Phase 2 | Pending |
| AUTH-08 | Phase 2 | Pending |
| AUTH-09 | Phase 2 | Pending |
| AUTH-10 | Phase 2 | Pending |
| AUTH-11 | Phase 2 | Pending |
| PHONE-01 | Phase 5 | Pending |
| PHONE-02 | Phase 5 | Pending |
| PHONE-03 | Phase 5 | Pending |
| PHONE-04 | Phase 5 | Pending |
| PHONE-05 | Phase 5 | Pending |
| PHONE-06 | Phase 5 | Pending |
| PROP-01 | Phase 3 | Pending |
| PROP-02 | Phase 3 | Pending |
| PROP-03 | Phase 3 | Pending |
| PROP-04 | Phase 3 | Pending |
| PROP-05 | Phase 3 | Pending |
| PROP-06 | Phase 3 | Pending |
| PROP-07 | Phase 3 | Pending |
| PROP-08 | Phase 3 | Pending |
| PROP-09 | Phase 3 | Pending |
| PROP-10 | Phase 3 | Pending |
| SVC-01 | Phase 4 | Pending |
| SVC-02 | Phase 4 | Pending |
| SVC-03 | Phase 4 | Pending |
| SVC-04 | Phase 4 | Pending |
| SVC-05 | Phase 4 | Pending |
| SVC-06 | Phase 4 | Pending |
| SVC-07 | Phase 4 | Pending |
| SVC-08 | Phase 4 | Pending |
| SVC-09 | Phase 4 | Pending |
| SVC-10 | Phase 4 | Pending |
| SVC-11 | Phase 4 | Pending |
| SVC-12 | Phase 4 | Pending |
| BOOK-01 | Phase 6 | Pending |
| BOOK-02 | Phase 6 | Pending |
| BOOK-03 | Phase 6 | Pending |
| BOOK-04 | Phase 6 | Pending |
| BOOK-05 | Phase 6 | Pending |
| BOOK-06 | Phase 6 | Pending |
| BOOK-07 | Phase 6 | Pending |
| BOOK-08 | Phase 6 | Pending |
| BOOK-09 | Phase 6 | Pending |
| BOOK-10 | Phase 6 | Pending |
| BOOK-11 | Phase 6 | Pending |
| BOOK-12 | Phase 6 | Pending |
| BOOK-13 | Phase 6 | Pending |
| BOOK-14 | Phase 6 | Pending |
| BOOK-15 | Phase 6 | Pending |
| DASH-01 | Phase 7 | Pending |
| DASH-02 | Phase 7 | Pending |
| DASH-03 | Phase 7 | Pending |
| DASH-04 | Phase 7 | Pending |
| DASH-05 | Phase 7 | Pending |
| DASH-06 | Phase 7 | Pending |
| DASH-07 | Phase 7 | Pending |
| DASH-08 | Phase 7 | Pending |
| PKG-01 | Phase 8 | Pending |
| PKG-02 | Phase 8 | Pending |
| PKG-03 | Phase 8 | Pending |
| PKG-04 | Phase 8 | Pending |
| PKG-05 | Phase 8 | Pending |
| PKG-06 | Phase 8 | Pending |
| PKG-07 | Phase 8 | Pending |
| PKG-08 | Phase 8 | Pending |
| SUB-01 | Phase 9 | Pending |
| SUB-02 | Phase 9 | Pending |
| SUB-03 | Phase 9 | Pending |
| SUB-04 | Phase 9 | Pending |
| SUB-05 | Phase 9 | Pending |
| SUB-06 | Phase 9 | Pending |
| SUB-07 | Phase 9 | Pending |
| SUB-08 | Phase 9 | Pending |
| SUB-09 | Phase 9 | Pending |
| SUB-10 | Phase 9 | Pending |
| SUB-11 | Phase 9 | Pending |
| SUB-12 | Phase 9 | Pending |
| CXL-01 | Phase 11 | Pending |
| CXL-02 | Phase 11 | Pending |
| CXL-03 | Phase 11 | Pending |
| CXL-04 | Phase 11 | Pending |
| CXL-05 | Phase 11 | Pending |
| CXL-06 | Phase 11 | Pending |
| CXL-07 | Phase 11 | Pending |
| CXL-08 | Phase 11 | Pending |
| CXL-09 | Phase 11 | Pending |
| CXL-10 | Phase 11 | Pending |
| NOTIF-01 | Phase 11 | Pending |
| NOTIF-02 | Phase 6 | Pending |
| NOTIF-03 | Phase 11 | Pending |
| NOTIF-04 | Phase 10 | Pending |
| NOTIF-05 | Phase 11 | Pending |
| NOTIF-06 | Phase 11 | Pending |
| NOTIF-07 | Phase 11 | Pending |
| NOTIF-08 | Phase 6 | Pending |
| NOTIF-09 | Phase 10 | Pending |
| NOTIF-10 | Phase 11 | Pending |
| NOTIF-11 | Phase 11 | Pending |
| GEO-01 | Phase 3 | Pending |
| GEO-02 | Phase 3 | Pending |
| GEO-03 | Phase 3 | Pending |
| GEO-04 | Phase 3 | Pending |
| GEO-05 | Phase 3 | Pending |
| REV-01 | Phase 11 | Pending |
| REV-02 | Phase 11 | Pending |
| REV-03 | Phase 11 | Pending |
| REV-04 | Phase 11 | Pending |
| REV-05 | Phase 11 | Pending |
| ADM-01 | Phase 10 | Pending |
| ADM-02 | Phase 10 | Pending |
| ADM-03 | Phase 10 | Pending |
| ADM-04 | Phase 10 | Pending |
| ADM-05 | Phase 10 | Pending |
| ADM-06 | Phase 10 | Pending |
| ADM-07 | Phase 10 | Pending |
| ADM-08 | Phase 10 | Pending |
| ADM-09 | Phase 10 | Pending |
| ADM-10 | Phase 10 | Pending |
| ADM-11 | Phase 10 | Pending |
| ADM-12 | Phase 10 | Pending |
| ADM-13 | Phase 10 | Pending |
| ADM-14 | Phase 10 | Pending |
| ADM-15 | Phase 10 | Pending |
| ADM-16 | Phase 12 | Pending |
| ADM-17 | Phase 12 | Pending |
| ADM-18 | Phase 12 | Pending |
| ADM-19 | Phase 12 | Pending |
| ADM-20 | Phase 12 | Pending |
| SEC-01 | Phase 2 (policy; recurs every new table) | Pending |
| SEC-02 | Phase 2 (policy; recurs every new table) | Pending |
| SEC-03 | Phase 2 (policy; recurs every admin policy) | Pending |
| SEC-04 | Phase 2 (CI test, recurs per migration) | Pending |
| SEC-05 | Phase 6 (recurs every Stripe Edge Function) | Pending |
| SEC-06 | Phase 6 (recurs every webhook event type) | Pending |
| SEC-07 | Phase 1 (foundational guardrail) | Complete |
| SEC-08 | Phase 6 (policy; recurs every business RPC) | Pending |
| SEC-09 | Phase 3 (policy; recurs for any sensitive column) | Pending |
| CMP-01 | Phase 12 | Pending |
| CMP-02 | Phase 12 | Pending |
| CMP-03 | Phase 12 | Pending |
| CMP-04 | Phase 12 | Pending |
| CMP-05 | Phase 9 | Pending |
| CMP-06 | Phase 12 | Pending |
| CMP-07 | Phase 12 (registration kicked off in Phase 1 via INFRA-13) | Pending |
| CMP-08 | Phase 12 | Pending |
| PLAT-01 | Phase 12 (responsive audit; mobile-first throughout) | Pending |
| PLAT-02 | Phase 10 (admin lazy-load is the largest split) | Pending |
| PLAT-03 | Phase 7 (admin chunk verified absent from customer bundle) | Pending |
| PLAT-04 | Phase 7 (Stripe.js deferred from non-payment routes) | Pending |
| PLAT-05 | Phase 12 (final Lighthouse pass) | Pending |
| PLAT-06 | Phase 12 (final a11y pass) | Pending |
| PLAT-07 | Phase 1 (Sentry installed; recurs per Edge Function) | Pending |
| TEST-01 | Phase 12 (Vitest scaffolded in Phase 1, broadened here) | Pending |
| TEST-02 | Phase 12 (MSW scaffolded in Phase 1, broadened here) | Pending |
| TEST-03 | Phase 6 (booking E2E) | Pending |
| TEST-04 | Phase 11 (subscription E2E with renewal sim) | Pending |
| TEST-05 | Phase 2 (RLS leak test established with first RLS table) | Pending |
| TEST-06 | Phase 11 (DST transition test for reminder cron) | Pending |
| TEST-07 | Phase 6 (webhook idempotency test) | Pending |

**Coverage:**
- v1 requirements: 145 total
- Mapped to phases: 145
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-14*
*Last updated: 2026-05-14 with detailed per-REQ-ID traceability after roadmap creation*
