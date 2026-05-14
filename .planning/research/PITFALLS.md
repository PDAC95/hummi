# PITFALLS — Hummi (Residential Cleaning Booking, KW/Cambridge/Guelph)

**Research dimension:** Project pitfalls — practical landmines for a React + Supabase + Stripe + Vercel cleaning booking platform shipped by a small team in Ontario.
**Date:** 2026-05-14
**Scope:** Subsequent milestone (brownfield). Customer accounts, multi-property, three purchase modes (one-shot / prepaid package / monthly subscription), email + SMS, admin panel, postal-code gated coverage.

**Severity legend:** Critical = data loss, money loss, or shutdown-class incident. Major = serious customer pain, refund risk, ops drag. Minor = polish/quality issue.

**Phase shorthand used below:**
- `DB` = database schema + migrations
- `AUTH` = Supabase Auth + RLS + role wiring
- `STRIPE` = Stripe integration (Checkout, Customer Portal, webhooks, Tax)
- `SCHED` = scheduling / visit lifecycle
- `NOTIF` = email + SMS pipeline
- `ADMIN` = admin panel + RBAC + audit
- `BOOK_UX` = customer booking UX
- `LEGAL` = Ontario / PIPEDA / CPA compliance
- `INFRA` = Vercel + Supabase environments, CI/CD, secrets
- `WEBHOOK` = webhook handler hardening (overlaps STRIPE + NOTIF)

---

## 1. Stripe Pitfalls (residential service product)

### 1.1 Subscription proration nightmares
**Severity:** Major
**What goes wrong:** Customer on monthly plan (e.g. "2 cleanings/month") upgrades mid-cycle to 4/month. Stripe by default prorates with `proration_behavior: "create_prorations"`, which generates a partial-period invoice item. If the plan price is also tied to the property size, the proration math doesn't match the operational reality (you can't deliver half a cleaning). Customers see weird $13.42 charges, support tickets explode.
**Warning signs:** Customers asking "what is this $X charge", invoices with `prorate` line items, mismatch between visits delivered and amount billed for the period.
**Prevention:**
- Use `proration_behavior: "none"` for plan changes and bill from the next period instead. Communicate "your new plan starts next billing cycle" in the UI.
- Treat the Stripe Price as a *rate* and the actual visit credit as a counter in your own `subscription_entitlements` table. Don't rely on Stripe to know how many cleanings someone "owes".
- Forbid mid-cycle downgrades altogether for v1; allow only at period boundary.
**Phase:** STRIPE (after subscription mode is live, before launching upgrades/downgrades).

### 1.2 Webhook reliability and idempotency
**Severity:** Critical
**What goes wrong:** Stripe retries webhooks up to ~3 days on 5xx. Your handler runs twice and credits the customer's package twice, or sends two confirmation emails, or double-creates a visit. Worse: in Supabase Edge Functions a transient cold-start error returns 500, Stripe retries, but in-between you already wrote half the rows.
**Warning signs:** Duplicate `Visit` rows for the same `checkout_session_id`, customers reporting two confirmation emails for one booking, mismatched visit credits vs payments.
**Prevention:**
- Persist a `stripe_events` table with `event.id` as PK. First thing the handler does: `INSERT ... ON CONFLICT (event_id) DO NOTHING RETURNING 1`. If the insert is a no-op, return 200 immediately.
- Wrap all downstream writes in a single transaction keyed by the event id.
- Always return 200 *after* commit; return 500 only if the work truly failed and you want Stripe to retry.
- Treat the webhook handler as "ingest + enqueue", not "ingest + do everything". See 9.4.
**Phase:** WEBHOOK (Phase 0 of any Stripe work — before going live with even one-shot).

### 1.3 Payment / Invoice / PaymentIntent mental model
**Severity:** Major
**What goes wrong:** Devs new to Stripe conflate `Charge`, `PaymentIntent`, `Invoice`, `Subscription`, `Checkout Session`. Result: refund logic uses the wrong object, the Customer Portal shows different invoices than your dashboard, reconciliation breaks.
**Warning signs:** "Why is there a PaymentIntent without an Invoice?", refunds failing with "no charge on this PaymentIntent", missing invoices for one-shot purchases.
**Prevention:**
- One-shot and prepaid package → `Checkout Session` in `payment` mode. No Invoice is auto-created. If you need a PDF receipt, either enable Stripe-hosted receipts or create an `Invoice` + `InvoiceItem` manually before charge.
- Subscriptions → Stripe creates `Invoice` per cycle automatically. Use the `invoice.paid` webhook as the source of truth, not `charge.succeeded`.
- Standardize internally: every payment row in your DB references *both* the `payment_intent_id` and (if applicable) the `invoice_id`.
**Phase:** STRIPE (data-model phase, before writing any handler).

### 1.4 Saved cards and Customer Portal misuse
**Severity:** Major
**What goes wrong:** You build your own "update card" UI and forget SCA / 3DS. Or you enable the Stripe Customer Portal and customers can self-cancel subscriptions in two clicks (good), but also self-refund or change plans in ways you don't expect (bad). Or you save a `PaymentMethod` without `SetupIntent` confirmation and the card later fails on off-session charges.
**Warning signs:** Failed `off_session: true` charges with `authentication_required`, customers cancelling without you knowing, surprise plan switches.
**Prevention:**
- Use Customer Portal but lock down features: disable plan switching, disable cancellation reasons that bypass your retention flow, disable invoice history if you render your own.
- For saving cards, use `SetupIntent` (not bare `PaymentMethod`) so 3DS happens up-front. Mark cards used for subscriptions with `off_session=true`.
- Subscribe to `customer.subscription.deleted` and `customer.subscription.updated` and propagate to your DB *and* to NOTIF so the customer gets your version of the cancel email, not just Stripe's.
**Phase:** STRIPE (alongside subscriptions).

### 1.5 Refunds and partial credits for missed cleanings
**Severity:** Major
**What goes wrong:** Crew no-shows or arrives late. Customer demands refund or credit. In a subscription model, refunding via `refund` API doesn't return the visit credit, so your DB still thinks the visit was used. Or you refund half, but your DB doesn't track partial refunds, so reporting is wrong.
**Warning signs:** Visit marked "completed" with a refund attached, customer says "I'm owed a visit" but DB shows 0 credits, accounting can't tie refunds to specific visits.
**Prevention:**
- Model a `credit_ledger` in your DB: every charge adds credits, every refund or cancellation deducts. The Stripe ledger and your ledger should reconcile nightly.
- For partial refunds on subscriptions, prefer `Credit Notes` against the invoice (Stripe has first-class support). For one-shots, `refund.amount` is fine but log it in the ledger too.
- Have a separate "comp visit" workflow: admin adds a free visit credit without touching Stripe at all. Cleaner audit trail than refund + recharge.
**Phase:** STRIPE + ADMIN (admin-facing concern; build the credit ledger before the first subscription customer).

### 1.6 Tax handling for Ontario (HST 13%)
**Severity:** Critical (legal + accounting)
**What goes wrong:** You either charge tax on top of every price and forget that Ontario small suppliers only need to register above $30k/12-months, OR you don't charge HST at all and CRA comes knocking. Or you enable Stripe Tax expecting automation but it requires `tax_id` registration and proper product tax codes, and you ship without setting `tax_behavior: "exclusive"` so prices show wrong.
**Warning signs:** Invoices missing HST line item, tax-included prices that don't match displayed price, support questions like "why is this $79 instead of $69?".
**Prevention:**
- Decide up-front: small-supplier (no HST collected, must register if revenue crosses $30k) vs registered. If you're committed to scale, register now and use a single HST number.
- If registered: enable Stripe Tax, set product tax codes (`txcd_20030000` = cleaning services), set `tax_behavior: "exclusive"`, and verify on test invoices that the 13% line appears. Show the breakdown in your checkout UI yourself; don't rely on Stripe alone.
- Persist `tax_amount` and `tax_jurisdiction` on every payment record for CRA filings.
- Keep an HST registration threshold alert (e.g. weekly cron summing last 12 months' revenue, alert at $25k).
**Phase:** STRIPE + LEGAL (must be settled before first paid transaction).

---

## 2. Supabase Pitfalls (multi-tenant customer data)

### 2.1 RLS policies that leak data
**Severity:** Critical
**What goes wrong:** Classic mistakes — forgetting to enable RLS on a table at all (`ALTER TABLE x ENABLE ROW LEVEL SECURITY`), writing a policy with `USING (true)` to "test it", joining tables in a policy that lets customers read another customer's properties via a relation. Or RLS is on but the service_role key is being used from the browser somewhere.
**Warning signs:** A query from anon key returns rows it shouldn't; a customer files a bug "I see someone else's address"; tables show `rowsecurity = false` in pg_class.
**Prevention:**
- Default policy in every migration: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` plus `FORCE ROW LEVEL SECURITY`. The latter makes even the table owner subject to RLS — caught us cold once.
- Write a single helper SQL function `auth.user_id() returns uuid` and always reference it (`USING (customer_id = auth.user_id())`). Don't `SELECT auth.uid()` inline — easy to typo.
- Add an automated RLS smoke test: log in as User A in pgTAP or a CI script, attempt to SELECT user B's rows, assert 0 rows.
- Never re-use the anon client between sessions in SSR; always pass the JWT.
**Phase:** AUTH + DB (every table migration must include RLS in the same migration).

### 2.2 JWT claim usage for admin role checks
**Severity:** Critical
**What goes wrong:** Devs put `is_admin: true` in `user_metadata` (which is user-editable!) instead of `app_metadata`. A customer hits `supabase.auth.updateUser({ data: { is_admin: true }})` and is now an admin. Or admin checks happen only in the client (`if (user.user_metadata.is_admin) showAdminPanel`).
**Warning signs:** Admin links visible to non-admins after editing browser state, `user_metadata` containing role-like fields, RLS policies referencing `user_metadata`.
**Prevention:**
- Roles live in `app_metadata` only (set via service role / Edge Function, not the client).
- Or, simpler: a `staff` table with `(user_id, role)`; RLS policies reference that table.
- Add an Edge Function `assert_admin()` that runs server-side before any admin write; never trust client gating alone.
- For RLS: `USING (EXISTS (SELECT 1 FROM staff WHERE user_id = auth.user_id() AND role = 'admin'))`.
**Phase:** AUTH (before any admin route ships).

### 2.3 Auth flows that double-create users
**Severity:** Major
**What goes wrong:** Customer signs up with email/password, then later "signs in with Google" using the same email. Supabase by default treats these as separate `auth.users` rows (unless identity linking is configured), so the customer has two accounts, two customer profiles, and their bookings are split.
**Warning signs:** Customer "lost" their bookings, admin sees two `customers` rows with same email, RLS-correct queries returning zero for an authenticated user.
**Prevention:**
- Enable email-to-identity linking in Supabase Auth settings, or implement a `before-sign-up` Edge Function (Auth Hook) that detects duplicate emails and merges.
- Treat `auth.users.id` as opaque; do NOT use email as your `customers` primary key. Map `auth_user_id → customer_id` via a join table to allow future merges.
- During signup, before creating the customer row, check for pre-existing customer with same normalized email and offer "sign in instead?".
**Phase:** AUTH (before SMS-OTP and Google OAuth go live together).

### 2.4 Service role key leaking
**Severity:** Critical
**What goes wrong:** Someone uses `SUPABASE_SERVICE_ROLE_KEY` in a Vite `VITE_*` env var and it ends up in the bundle. Game over — anyone bypasses all RLS.
**Warning signs:** `VITE_SUPABASE_SERVICE_ROLE_KEY` anywhere in the codebase, secrets in `dist/`, `service_role` strings in browser DevTools "Sources".
**Prevention:**
- Lint rule / grep in CI: fail build if `VITE_.*SERVICE` or `service_role` appears in `src/`.
- Service role only ever lives in Edge Function secrets and GitHub Actions secrets — never in `.env.local`, never in `vite.config.ts`.
- Add a `git pre-commit` hook (gitleaks or `git-secrets`) to block commits containing the key.
- Given the prior incident in CONCERNS.md (Stripe keys exposed), audit git history with `gitleaks detect` once before public launch and rotate everything.
**Phase:** INFRA (Phase 0 — before any Edge Function exists).

### 2.5 Edge Function cold starts and timeouts
**Severity:** Major
**What goes wrong:** Stripe webhook handler is an Edge Function that imports a giant SDK; cold start takes 4s; Stripe times out at 30s but your downstream Twilio call takes 12s; cumulative request hits the wall. Or Edge Functions have a hard `~150s` execution limit (currently) that you discover only at scale.
**Warning signs:** Sporadic 504s on webhook endpoint, Stripe dashboard showing webhook failures during low-traffic hours, customer reports of late confirmation emails.
**Prevention:**
- Keep Edge Functions tiny: parse + verify + enqueue. Heavy work goes to a queue (Supabase Queues / `pgmq`, or even just a `jobs` table polled by a cron).
- Bundle-trim with `deno bundle --minify` style options; avoid importing whole SDKs.
- Measure cold start in CI by hitting a fresh deploy 5× consecutively; alert if p95 > 2s.
- For multi-second tasks (SMS sequences, PDF generation), background them; respond to the trigger in <1s.
**Phase:** INFRA + WEBHOOK + NOTIF.

### 2.6 Realtime subscription costs
**Severity:** Minor → Major at scale
**What goes wrong:** You wire `supabase.channel('visits').on('postgres_changes', ...)` on the customer dashboard to keep visit status live. Now every customer holds a Realtime connection 24/7. On free/Pro tier, the concurrent-connection cap is reachable surprisingly fast, and billing escalates.
**Warning signs:** "Max concurrent connections" warnings, sluggish reconnect storms, billing spikes on Supabase invoice.
**Prevention:**
- Don't enable Realtime by default. Use it only on screens that need it (e.g. admin live queue), and disable when tab is hidden (`document.hidden`).
- For customer dashboard, plain polling every 30s or revalidate-on-focus (SWR / React Query) is cheaper and simpler.
- Filter Realtime by user (`filter: 'customer_id=eq.{uid}'`) — Supabase still respects RLS, but server-side filtering reduces traffic.
**Phase:** SCHED + ADMIN (revisit when admin live-queue ships).

### 2.7 Migration management (CLI vs Studio drift)
**Severity:** Major
**What goes wrong:** You edit a table in Supabase Studio "to fix one thing", forget to capture it as a migration, then `supabase db push` from another env wipes your change or fails. Or two devs both `supabase db diff` and merge migrations out of order.
**Warning signs:** `supabase db diff` showing changes you don't remember making, migrations failing on preview but not local, prod schema differing from `supabase/migrations/`.
**Prevention:**
- Rule: zero direct edits in Studio for production project. Local Studio is fine for sketching, but anything that goes to staging/prod is a migration file in git.
- CI step: `supabase db diff` against the project; fail if non-empty (means drift).
- Pre-merge: rebase migrations and use timestamp prefixes only via `supabase migration new` (never hand-name).
- Take regular schema snapshots (`pg_dump --schema-only`) as backup before any risky migration.
**Phase:** DB (Phase 1 — establish migration discipline before second table exists).

---

## 3. Scheduling and Visit Management Pitfalls

### 3.1 Timezone bugs (America/Toronto, DST)
**Severity:** Critical
**What goes wrong:** Customer in Waterloo books "Saturday 10:00 AM". You store `2026-06-13T10:00:00` as text or as naive timestamp. On the server (UTC), the cron that sends "24h reminder" subtracts 24h from a UTC interpretation. The customer gets the reminder at the wrong time. Or worse: DST transition weekend, the cron skips or doubles a reminder.
**Warning signs:** "I got the reminder at 6 AM", visits showing yesterday's date in admin, spring-forward/fall-back weekend incidents.
**Prevention:**
- Store all timestamps as `timestamptz` in Postgres (Supabase default — but verify). Application code never handles "naive" times.
- Store the *intended local time* + the IANA zone explicitly: `scheduled_at timestamptz NOT NULL`, `scheduled_tz text DEFAULT 'America/Toronto' NOT NULL`. Render in the customer's zone on the client.
- For reminders: schedule "send_at" as `timestamptz` (24h before `scheduled_at`). The cron picks up by `WHERE send_at <= now()`. Don't compute offsets in app code.
- Test suite must include March (spring forward) and November (fall back) dates explicitly.
**Phase:** SCHED + DB (foundational — first migration that has a date column).

### 3.2 Double-booking the same time slot
**Severity:** Critical
**What goes wrong:** Two customers concurrently book the only available 10 AM slot for the only crew in Cambridge. Both see "available", both pay, both get confirmed. Now you owe two cleanings.
**Warning signs:** Two visits with same `crew_id` and overlapping `scheduled_at`, admin manually shuffling crews to cover overlap.
**Prevention:**
- Don't allocate the crew at booking time in v1 — booking puts the visit in a "pending assignment" queue (matches the "manual assignment" decision in PROJECT.md). The booking only reserves a *capacity slot* per zone+time, not a specific crew.
- Slot capacity table: `capacity(zone, date, time_block, max_visits, booked_visits)`. Use Postgres advisory locks or `SELECT ... FOR UPDATE` inside a transaction when incrementing.
- Exclusion constraint (when crews are eventually auto-assigned): `EXCLUDE USING gist (crew_id WITH =, tstzrange(scheduled_at, scheduled_end) WITH &&)`.
- Stripe Checkout is async — the slot must be held when the session is created and released if `checkout.session.expired` fires (15-min default).
**Phase:** SCHED (Phase 1 — before any booking endpoint is live).

### 3.3 "Past" visits sitting in "upcoming" due to TZ offset
**Severity:** Major
**What goes wrong:** Customer dashboard filters `WHERE scheduled_at > now()`. But `now()` is UTC and `scheduled_at` is stored UTC but displayed as Toronto local. A visit at "today 2 PM Toronto" already happened by 7 PM UTC; the filter still includes it if you're not careful with intervals, especially around midnight.
**Warning signs:** Dashboard shows yesterday's visit as "upcoming", admin sees same visit in both "to do" and "completed".
**Prevention:**
- Filter by a strict tstz comparison: `scheduled_at + interval '2 hours' > now()` (grace period). Define "upcoming" as "not yet started or in progress".
- Visits have an explicit state machine: `requested → scheduled → en_route → in_progress → completed → reviewed`. The dashboard groups by *state*, not by date arithmetic.
- A cron flips `scheduled → started` when the time arrives and no admin marked en_route yet, so the date-vs-state contradiction can't happen.
**Phase:** SCHED + ADMIN (visit lifecycle phase).

### 3.4 Recurring schedule generation (eager vs lazy)
**Severity:** Major
**What goes wrong:** Eagerly generate 12 months of visits at subscription start → customer changes day-of-week, you now have 50 stale visits to migrate. Lazily generate "next visit only" → you can't show "next 3 dates" in the dashboard, and you risk missing a visit if the cron fails.
**Warning signs:** Customer says "I changed my day but old visits still show", "no upcoming visits" warning right after subscribe, double-creation when a cron retries.
**Prevention:**
- Hybrid: store the *rule* (`RRULE` text or structured `{frequency, day_of_week, time}`) as the source of truth on the subscription. Materialize visits 60 days ahead via daily cron. Beyond 60 days, dashboard renders from the rule on-the-fly.
- Visit IDs derived from `(subscription_id, occurrence_index)` so re-materialization is idempotent. Status changes (rescheduled, cancelled) detach the visit from the rule.
- Rule changes invalidate forward materializations: delete future non-customized visits, regenerate from new rule.
**Phase:** SCHED (after subscription mode is live, before first monthly customer).

### 3.5 Race conditions when admin assigns and customer reschedules
**Severity:** Major
**What goes wrong:** Admin assigns Crew A to Saturday 10 AM at 9:02 AM. Customer reschedules to Sunday at 9:02:30 AM. Crew A's job-list still shows Saturday because notification was already sent. Or: optimistic concurrency missing entirely and the latest write wins, silently overwriting the assignment.
**Warning signs:** Crew shows up on the wrong day, "I rescheduled but got the old reminder", admin: "I assigned this twice".
**Prevention:**
- `visits` table has `version` column. Every update is `UPDATE ... WHERE id = ? AND version = ?` (optimistic locking). UI re-fetches on conflict and asks "this changed, want to retry?".
- Reschedule and assign are two distinct operations with their own audit events. A reschedule pushes the visit back to "needs reassignment" if the new time conflicts with the assigned crew.
- Notifications keyed by `visit_id` + `event_type`: when a visit reschedules, any pending unsent reminders are cancelled and new ones queued.
**Phase:** SCHED + ADMIN + NOTIF.

---

## 4. Notification Pitfalls

### 4.1 SMS deliverability and 10DLC / Canadian SMS regulations
**Severity:** Critical
**What goes wrong:** You spin up Twilio with a long-code number, start sending OTPs and reminders, and a few weeks in your delivery rate to Canadian carriers (Rogers/Bell/Telus) drops to ~40%. Reason: you're not registered with CSCA campaign registry (the Canadian equivalent of 10DLC), and Canadian carriers filter aggressively. Or you send marketing copy in a transactional template and trigger CASL violations.
**Warning signs:** Twilio status webhooks showing `failed`/`undelivered` at high rate, customers saying "never got the code", complaints filtered by carrier.
**Prevention:**
- Use a toll-free number (TFN) in Canada — must be verified through Twilio's toll-free verification process (~2-3 weeks). Long-codes for transactional SMS to Canada are increasingly unreliable.
- Keep transactional and marketing on separate sender IDs / messaging services.
- Comply with CASL: every SMS needs sender identification and an opt-out mechanism (e.g. "Reply STOP"). For OTP, exemption applies but include sender name.
- Test delivery on all three major Canadian carriers before launch.
**Phase:** NOTIF (Phase 0 of SMS work, weeks before launch because of verification lead time).

### 4.2 Twilio costs running away (OTP)
**Severity:** Major
**What goes wrong:** Signup form has no rate limit; bot floods OTP requests; each costs ~$0.04 CAD; thousands of $/day in fraud. Or legitimate users mistype the phone and request resends 10x.
**Warning signs:** Twilio usage dashboard spiking, OTP-send count >> signup count, attempts from unusual countries.
**Prevention:**
- Use Supabase's built-in SMS rate limit (per IP, per phone, per hour) and tune it down to e.g. 3 sends per phone per hour, 10 per IP per hour.
- Cap total SMS spend daily — set a Twilio budget alert at $50/day.
- hCaptcha / Turnstile in front of the signup form before the OTP request hits Twilio.
- Reject obviously-fake numbers up-front (libphonenumber validation; only allow `+1` Canadian area codes if customers must be local).
**Phase:** NOTIF + AUTH (before SMS-OTP is publicly enabled).

### 4.3 Email spam classification from a new domain
**Severity:** Major
**What goes wrong:** You buy `hummi.ca`, set up Resend/Postmark, blast confirmation emails on launch day. Gmail/Hotmail throw them all to spam because the domain has no reputation, SPF/DKIM/DMARC aren't aligned, and you're using a Resend-shared subdomain.
**Warning signs:** Customer reports "didn't get email", spam-folder hits in your own tests, sender-score reputation low.
**Prevention:**
- Set SPF + DKIM + DMARC the moment the domain is purchased (DMARC at `p=none` first to monitor, then `p=quarantine`).
- Send from a real subdomain (`mail.hummi.ca`) not the apex, to isolate reputation.
- Warm up: start with low volume to engaged users (your friends, test accounts), then scale.
- Use a transactional-only ESP (Postmark > Resend > SendGrid for deliverability per my reading). Don't mix marketing newsletters on the same sending domain.
- Plain-text alternative + minimal HTML; avoid spammy patterns (no all-caps subject, no shortened URLs, real `Reply-To`).
**Phase:** NOTIF + INFRA (DNS work happens before first email is sent — schedule 1-2 weeks lead time).

### 4.4 Notification loops on retries
**Severity:** Major
**What goes wrong:** Reminder cron picks up rows where `reminder_sent_at IS NULL`. It sends, then errors before writing `reminder_sent_at`. Next minute, same row, same send. Customer gets 12 reminders.
**Warning signs:** Customers complaining about repeat texts, Twilio cost spike, identical email duplicates.
**Prevention:**
- Two-phase commit pattern: lock the row (`SELECT ... FOR UPDATE SKIP LOCKED`), set `reminder_sent_at = now()`, send. If send fails, set `reminder_failed_at` and a retry counter — but the row is no longer eligible for the simple `IS NULL` query.
- Or: send first to a queue with an idempotency key (`visit_id:reminder:24h`). The queue dedupes, the worker can crash freely.
- Cap retries (3-5) and alert on failures rather than retrying forever.
**Phase:** NOTIF (built into the reminder job from day one).

### 4.5 Reminders sent for cancelled visits
**Severity:** Major
**What goes wrong:** Customer cancels Saturday's cleaning Friday afternoon. The "24h before" reminder was already queued at booking time and fires Friday at 10 AM. Customer thinks the cancellation didn't work; calls support.
**Warning signs:** Cancelled visits with `reminder_sent_at` populated, support tickets "I cancelled but got reminded".
**Prevention:**
- Cancel queued notifications when visit cancels. If using an external scheduler (Twilio messaging services with `send_at`), call its cancel API. If using your own `jobs` table, set `cancelled_at`.
- Worker re-checks visit state right before sending: `if visit.status = 'cancelled' then skip`.
- Same applies to reschedules — old queued reminders must be invalidated.
**Phase:** NOTIF + SCHED (must be in v1 cancellation flow).

---

## 5. UX Pitfalls in Cleaning Booking

### 5.1 Pricing surprises at checkout
**Severity:** Major
**What goes wrong:** Customer enters address, sees "from $89". Picks deep clean, sees $89. At checkout, total is $147 because of HST + add-ons + size multiplier they didn't see. Cart abandonment skyrockets.
**Warning signs:** Stripe Checkout abandonment >40%, support emails "why is it more than the website said", Hotjar recordings of users dropping at checkout.
**Prevention:**
- Show the full price breakdown live as the customer configures: base + size multiplier + add-ons + tax. Reuse the same pricing function on server and client (single source of truth in a shared TS file or an Edge Function the client calls).
- Final total visible on the form *before* clicking "Proceed to payment".
- Stripe Checkout itself shows tax — make sure the displayed-on-site number matches by setting `tax_behavior: "exclusive"` and computing identically.
**Phase:** BOOK_UX + STRIPE.

### 5.2 Confusing "service" vs "visit" vs "booking"
**Severity:** Major
**What goes wrong:** Your code, UI copy, emails, and admin all use these three words interchangeably. Customer hears "your booking is confirmed" but admin says "we haven't scheduled the visit yet". Trust erodes.
**Warning signs:** Mixed vocabulary in UI screenshots, support has to translate ("you mean the visit on Saturday"), team meetings spent disambiguating.
**Prevention:**
- Pin a tiny domain glossary in the repo (e.g. `docs/glossary.md`): **Service** = the catalog item (Standard, Deep, Move-In). **Visit** = one scheduled occurrence with a date/time/crew. **Booking** = the customer's act of purchasing one or more visits, tied to a payment. **Subscription** = ongoing entitlement that mints visits.
- Apply consistently in DB table names (`services`, `visits`, `bookings`, `subscriptions`), TypeScript types, and customer-facing copy.
- One copy reviewer / writer owns the customer-facing language pass before launch.
**Phase:** DB + BOOK_UX (foundational — name your tables right or pay forever).

### 5.3 Subscription cancellation friction → chargebacks
**Severity:** Critical (financial)
**What goes wrong:** To cancel, customer has to email support → frustration → they file a chargeback with their bank instead. Stripe penalizes you ($15 + lost revenue + dispute on record). Above ~1% chargeback rate, Stripe restricts the account.
**Warning signs:** Chargeback rate climbing, "how do I cancel" support tickets, social posts complaining about retention tactics.
**Prevention:**
- One-click cancel from the customer dashboard. Stripe Customer Portal can do this; or build your own. Either way, no email-required, no phone call.
- Confirmation page after cancel: clear next-step ("you'll keep service through April 30, then no charges").
- Optional save-the-customer offer (pause for a month, downgrade) but make it skippable, not modal-trapping.
- This is also CPA-mandated in Ontario; see 7.2.
**Phase:** STRIPE + BOOK_UX (when subscriptions go live, not as a follow-up).

### 5.4 Booking outside coverage from dirty postal-code data
**Severity:** Major
**What goes wrong:** Your "in-zone" check is a static list of postal-code prefixes (`N2L`, `N1G`, etc.). Customer enters `n2L 3g1` (lowercase, space). Your validator does case-sensitive string compare and lets them through. Or a `N2P` (technically Kitchener but in a sub-zone you don't service) slips because you only checked the first three.
**Warning signs:** Bookings showing up outside your service area, admin manually cancelling/refunding, Google Maps showing crew driving 90 minutes.
**Prevention:**
- Normalize postal codes on input (`/^([A-Z]\d[A-Z])\s*(\d[A-Z]\d)$/i`, uppercase + 6-char canonical).
- Maintain coverage as full FSAs (`A1A`) AND specific LDUs (`A1A 1B1`) where service is partial. Encode in a DB table, not a hardcoded list.
- Validate at multiple points: address autocomplete restricts to coverage, server re-validates on booking, payment intent rejects if mismatch.
- Manual admin override flag for edge-case addresses (new construction, P.O. boxes that resolve weirdly).
**Phase:** BOOK_UX + DB.

### 5.5 Slow address autocomplete killing conversion
**Severity:** Major
**What goes wrong:** Google Places autocomplete adds 400ms latency per keystroke, looks janky on slow phones, and Google charges per session. Or you skip autocomplete and accept free-text; now half the addresses are unrouteable for crews.
**Warning signs:** Form-completion time >2 min, address typos in admin, Google bill jumping.
**Prevention:**
- Use Canada Post AddressComplete or Geoapify for Canada — cheaper than Google for CA-only and returns FSA/LDU cleanly.
- Debounce input (250-300 ms), cache last query, session-token to optimize billing.
- Fall back to free-text + a "we'll verify this" message if the API is down — don't block the booking, but flag for admin review.
**Phase:** BOOK_UX.

---

## 6. Admin / Back-office Pitfalls

### 6.1 No audit log → "who cancelled what?"
**Severity:** Major
**What goes wrong:** Admin or customer cancels a visit. A week later the dispute comes: "I didn't cancel that". You have nothing. Or admin "fixes" a price field, breaks reporting, no record of who did it.
**Warning signs:** "Who did this?" Slack messages, no `updated_by` on critical tables, support unable to answer customer disputes.
**Prevention:**
- Append-only `audit_log(actor_id, actor_type, action, entity_type, entity_id, before_jsonb, after_jsonb, occurred_at)` table from day one.
- Postgres trigger on critical tables (`visits`, `subscriptions`, `payments`, `customers`) writes audit row on every UPDATE/DELETE. Don't rely on app code to remember.
- Capture both customer and admin actors; for admin actions in Edge Functions, propagate the staff user id.
**Phase:** DB + ADMIN (set up triggers in the first migration after the entities exist).

### 6.2 Manual data edits in Supabase Studio bypass app logic
**Severity:** Major
**What goes wrong:** Admin "just updates one visit's date" in Studio. Pricing rules, notification cancellation, audit logging — all bypassed. Customer gets surprise reminder for the old date.
**Warning signs:** State that "shouldn't be possible" appears, audit log gaps, support's "we adjusted that on our side" emails.
**Prevention:**
- Build a real admin UI from day one for the operations admins actually do (reassign crew, reschedule, cancel, refund, comp visit). Studio access stays for the engineer.
- Studio access is by named user, requires MFA, and is logged (Supabase Pro+ has audit log of admin SQL).
- For any operation done via Studio, follow up with a manual audit_log insert so the trail is intact.
**Phase:** ADMIN.

### 6.3 Crew assignments not propagating to notifications
**Severity:** Major
**What goes wrong:** Admin assigns Crew B at 8 AM. Customer's "en route" notification at 9:55 AM was queued earlier referencing Crew A's name. Customer is confused when Crew B shows up.
**Warning signs:** Customer "I was told Crew A would come", inconsistency in notification text vs reality.
**Prevention:**
- Notifications fetch their content at send time, not queue time. The job stores `visit_id` + `template_key`; the worker renders fresh.
- Or, if pre-rendering: any assignment change re-renders the queued notification.
- Treat the visit's "active crew" as a derived value with a single source of truth (the latest `crew_assignment` row).
**Phase:** NOTIF + ADMIN.

### 6.4 Admin panel without proper RBAC → security incident
**Severity:** Critical
**What goes wrong:** All staff get the same admin login. Cleaner-coordinator can refund anyone. Or someone leaves the company and you forget to revoke. Or admin routes are gated only on client-side `if (user.isAdmin)` (see 2.2).
**Warning signs:** Single shared admin password, no list of "who has admin", no last-login per staff.
**Prevention:**
- Minimum two roles: `staff` (read + assign + reschedule) and `admin` (refunds, pricing, role changes). Add `superadmin` if needed for destructive ops.
- Every staff user is a real Supabase Auth user with their own login (and MFA). No shared accounts.
- RLS + Edge Function checks enforce per-role permissions. Client-side gates are UX-only.
- Quarterly review: list of active staff vs reality.
**Phase:** AUTH + ADMIN (Phase 0 of admin work).

---

## 7. Legal / Compliance Ontario-Specific

### 7.1 PIPEDA privacy requirements
**Severity:** Major
**What goes wrong:** You collect addresses, phone numbers, payment info, photos of the home (potentially), without a privacy policy explaining purpose, retention, third-party sharing (Stripe, Twilio). Customer files an OPC complaint or you breach and have no breach-response plan.
**Warning signs:** No privacy policy on the site, no record of who accesses customer data, no breach response runbook.
**Prevention:**
- Privacy policy at launch covering: what you collect, why, where it goes (Supabase US/CA, Stripe US, Twilio US), retention, customer's right to access/delete.
- Honor data-subject access requests (DSAR) within 30 days. Build an "export my data" admin tool early.
- Encrypt at rest (Supabase does this by default), TLS in transit, no PII in logs.
- Designate a Privacy Officer (small biz — the founder).
- Breach response plan: who to call, OPC notification path, customer notification template.
**Phase:** LEGAL + DB (privacy review before first customer signup).

### 7.2 Ontario Consumer Protection Act around subscriptions
**Severity:** Critical
**What goes wrong:** Recent CPA amendments (in force in Ontario as of late 2025 / early 2026) require: clear auto-renewal disclosure at signup, advance notice before renewals (~30-60 days for annual; for monthly, advance notice of price changes), one-click cancellation matching ease of signup, cooling-off period for distance contracts. Skip these and customers can rescind + chargeback, with regulatory exposure on top.
**Warning signs:** Subscription terms buried in TOS, no renewal-reminder email, cancel-by-email-only flow.
**Prevention:**
- Signup flow: explicit checkbox "I understand I'll be charged $X per month until I cancel" with the price and cadence visible.
- Renewal notice email automated (Stripe `invoice.upcoming` webhook → email at T-7 days for monthly).
- One-click cancel (5.3) is also a CPA requirement, not just a UX nicety.
- 10-day cooling-off period for distance contracts in Ontario — implement a "cancel within 10 days for full refund" rule in code.
- Have a lawyer review the subscription TOS once before launch (a few hundred dollars; pays for itself).
**Phase:** LEGAL + STRIPE + BOOK_UX (must be ready before first paid subscription).

### 7.3 HST registration thresholds
**Severity:** Major
**What goes wrong:** Small-supplier threshold is $30k revenue in any rolling 4 quarters. Cross it and you have 29 days to register, then HST is collectable from day one of next quarter — including retroactive remittance if you didn't charge. Many founders find out at tax time.
**Warning signs:** Cumulative revenue approaching $30k with no HST line in invoices, accountant raising eyebrows.
**Prevention:**
- Decide pre-launch: register with CRA immediately (simpler — you charge HST on everything, claim ITCs) vs wait for the threshold.
- If waiting: dashboard widget that sums rolling-12-month revenue and alerts at $25k. Bake in 4 weeks of lead time.
- Persist `hst_collected` per transaction (see 1.6) regardless, so once registered, retroactive accounting is mechanical.
**Phase:** LEGAL + STRIPE.

### 7.4 Workers vs contractors classification
**Severity:** Major (operational, not software)
**What goes wrong:** Cleaners treated as contractors but functionally are employees per Ontario ESA tests (control over hours, exclusivity, tools provided). CRA / Ontario MOL reclassifies, retroactive CPP/EI + back-pay + penalties. Out of scope for the software but worth noting.
**Warning signs:** Cleaners only working for you, fixed schedules, you provide uniforms/supplies/tools.
**Prevention:**
- Get an employment lawyer to write a defensible contractor agreement OR move to employee model. Don't DIY this in Ontario; the ESA is plaintiff-friendly.
- For the software: keep crew scheduling flexible enough to support both models (employee with fixed schedule vs contractor with availability windows).
**Phase:** LEGAL (out-of-software; flag in onboarding docs).

---

## 8. Vercel + Supabase Deployment Pitfalls

### 8.1 Env var sync drift (local / preview / prod)
**Severity:** Major
**What goes wrong:** You add `STRIPE_WEBHOOK_SECRET` locally, ship. Preview deploys fail because Vercel doesn't have it. You add it to "Production" only. Next PR preview still fails. Months later, a value drifts between Vercel and Supabase Edge Function secrets and webhooks silently break.
**Warning signs:** "It works locally but not on preview", Vercel build errors mentioning missing env vars, mismatched behavior between branches.
**Prevention:**
- Source of truth: `.env.example` in repo lists every var with a comment. CI step verifies every key in `.env.example` is present in Vercel project (via `vercel env ls`).
- Pull via `vercel env pull` rather than copy-pasting.
- Tag env vars by env explicitly in Vercel (Development / Preview / Production). Preview-only test keys, Production real keys.
- Sync Edge Function secrets via `supabase secrets set` from a sealed file, version-controlled (encrypted).
**Phase:** INFRA (Phase 0 — formalize before second secret is added).

### 8.2 Preview deploys hitting prod Supabase
**Severity:** Critical
**What goes wrong:** Every PR preview uses the same `SUPABASE_URL` (prod). A bug in a PR runs a DELETE against prod customers. Or QA on preview produces fake bookings that pollute prod data.
**Warning signs:** Prod data appearing from "test users", "I deleted that test record but it's gone for real", Stripe test events landing on prod webhook handler.
**Prevention:**
- Two Supabase projects minimum: `hummi-staging` (preview deploys point here) and `hummi-prod` (only main branch deploys here). Edge Function secrets per project.
- Vercel "Preview" env scope holds staging keys; "Production" scope holds prod keys.
- Stripe test mode keys for staging, live mode for prod. Webhook endpoints separated.
- Optional: a third "local" Supabase project for dev, or run Supabase locally via CLI.
**Phase:** INFRA (Phase 0).

### 8.3 CORS between Vercel and Supabase Edge Functions
**Severity:** Minor → Major
**What goes wrong:** Edge Function returns no `Access-Control-Allow-Origin`, browser blocks the response, customer sees nothing. Or `*` is used and you accidentally accept requests from any origin (low risk on POST with JWT, but ugly).
**Warning signs:** CORS errors in browser console on prod only, OPTIONS preflight failures, Edge Function returns 200 but client errors anyway.
**Prevention:**
- Standard CORS handler in a shared Edge Function utility. Allow only your Vercel domains (`https://hummi.ca`, `https://*.vercel.app` if you must support preview, but lock to your team's preview pattern).
- Test OPTIONS preflight explicitly in CI for each function.
**Phase:** INFRA + WEBHOOK.

### 8.4 Build output too big → slow cold starts (and now: bundle size)
**Severity:** Major (already a concern per CONCERNS.md — 1.4MB JS, 856KB CSS)
**What goes wrong:** Cold pageload on 4G is 5+ seconds. Lighthouse score in the 30s. Vercel edge cache helps but doesn't fix initial JS parse time on the user's phone.
**Warning signs:** Lighthouse LCP > 4s, "size limit exceeded" warnings from Vite, customer drop on first-visit.
**Prevention:**
- Route-based code splitting via React Router 7 lazy routes (already flagged in CONCERNS.md).
- Audit CSS — drop unused template CSS modules (CONCERNS.md says 7,348 lines of legacy CSS).
- `manualChunks` for vendor (react, react-dom, supabase-js, stripe-js).
- `rollup-plugin-visualizer` in CI; fail PR if bundle grows >10% without justification.
- Defer Stripe.js loading until checkout page (it's ~150KB).
**Phase:** INFRA + BOOK_UX (current bundle bloat is from template; tackle alongside lazy routing).

---

## 9. Stripe + Supabase Webhook Handling Bugs

### 9.1 Out-of-order events
**Severity:** Major
**What goes wrong:** Stripe doesn't guarantee delivery order. `customer.subscription.updated` arrives before `customer.subscription.created`, and your handler errors on missing FK or, worse, creates a duplicate. Or `invoice.payment_failed` arrives after `invoice.paid` was retried.
**Warning signs:** "Customer not found" errors in webhook logs, double subscription rows, charges credited in wrong order.
**Prevention:**
- Each handler must be reentrant + tolerant of out-of-order. Use `event.created` and `event.data.object.status` to determine if action is still appropriate.
- For `subscription.*` events: always `upsert` by `subscription_id` and overwrite the record with the latest state from `event.data.object` (Stripe always sends the *current* full object).
- For `invoice.*` events: `paid`/`payment_failed`/`finalized` are independent state transitions; persist the last-seen status keyed by `(invoice_id, event.created)` and only apply forward.
**Phase:** WEBHOOK.

### 9.2 Replay attacks / replay handling
**Severity:** Critical
**What goes wrong:** Attacker captures a webhook URL and signing-secret-less endpoint, replays old "invoice paid" events to trigger fulfillment without payment. Or Stripe legitimately replays during their incidents, and your idempotency-less handler re-credits accounts.
**Warning signs:** Free service granted with no payment record, multiple credits on same invoice id, suspicious traffic to webhook URL.
**Prevention:**
- Idempotency table (see 1.2) handles legitimate replays.
- Signature verification (see 9.3) handles malicious replays.
- Reject events with `event.created` older than a sane window (e.g. 1 hour) unless explicitly resending.
**Phase:** WEBHOOK.

### 9.3 Forgetting to verify signature
**Severity:** Critical
**What goes wrong:** Edge Function reads JSON body, processes the event, never calls `stripe.webhooks.constructEvent(rawBody, sig, secret)`. Anyone can POST a payload pretending to be Stripe and grant themselves anything.
**Warning signs:** No `Stripe-Signature` header check in handler code, no `STRIPE_WEBHOOK_SECRET` env var being read, suspicious traffic.
**Prevention:**
- First line of every handler: verify signature against raw body. If verification fails, return 400 and log.
- Use the official Stripe SDK's verification helper, not a hand-rolled HMAC.
- Note: many Edge Function frameworks JSON-parse the body before you see it. Use raw-body capture (`req.text()` and pass the string into `constructEvent`).
- Rotate webhook secret on any suspected leak; both Stripe and Vercel/Supabase make this one-click.
**Phase:** WEBHOOK (Phase 0 — must exist on first deploy).

### 9.4 Treating webhook handler as synchronous when work needs a queue
**Severity:** Major
**What goes wrong:** Webhook handler verifies, then calls Twilio to send SMS, then Postmark for email, then Supabase to insert. Twilio is slow / down → Stripe times out at 30s → retries → next attempt times out too. Whole pipeline starves.
**Warning signs:** Webhook deliveries failing in Stripe dashboard, retries piling up, downstream services timing out.
**Prevention:**
- Handler does: verify → idempotency-insert → minimum-viable DB write → enqueue follow-up jobs → return 200. Target <500ms response.
- Follow-up work (emails, SMS, PDF gen) runs in a separate worker (Supabase Queues, `pgmq`, or polled `jobs` table via cron). Each job has its own retry/backoff.
- Monitor handler p95 latency; alert above 1s.
**Phase:** WEBHOOK + NOTIF (architectural choice — make it before the second webhook handler is written).

---

## Cross-cutting / "Don't Forget"

- **Currency:** Stripe defaults can surprise. Confirm everything is `CAD`, including price IDs, on day one. Mixing CAD and USD across products causes math errors.
- **Time format in logs:** Set Supabase + Vercel logs to UTC for consistency, render Toronto-local only in the UI.
- **Manual SQL on prod:** Lock down direct DB access via PgBouncer + IP allowlist where possible.
- **Backups:** Supabase Pro has PITR. Enable it. Validate restore once before launch (the only proven backup is a successful restore).
- **Existing template-level concerns** (per `.planning/codebase/CONCERNS.md`): the 12 npm-audit vulnerabilities (esp. critical Swiper prototype pollution), the absence of any test framework, the 1.4MB JS bundle, and the prior Stripe key exposure incident are themselves pitfalls — address them in INFRA before adding the new product surface area, not after.

---

## Phase Mapping Summary

| Phase | Pitfalls primarily addressed here |
|---|---|
| **INFRA** (env, secrets, deploys) | 2.4, 2.5, 2.7, 4.3, 8.1, 8.2, 8.3, 8.4, plus CONCERNS.md cleanup |
| **DB** (schema, migrations, audit) | 2.1, 2.7, 3.1, 5.2, 5.4, 6.1, 7.1 |
| **AUTH** (Supabase Auth, RLS, roles) | 2.1, 2.2, 2.3, 4.2, 6.4 |
| **STRIPE** (payments, subscriptions, tax) | 1.1–1.6, 5.1, 5.3, 7.2, 7.3 |
| **WEBHOOK** | 1.2, 9.1–9.4 |
| **SCHED** (visits, recurrence, capacity) | 3.1–3.5, 4.5 |
| **NOTIF** (email, SMS) | 4.1–4.5, 6.3 |
| **BOOK_UX** (customer booking) | 5.1–5.5, 8.4 |
| **ADMIN** (back-office) | 1.5, 3.5, 6.1–6.4 |
| **LEGAL** | 1.6, 7.1–7.4 |

---

*Disclaimer for the team: this document is engineering guidance from collected industry experience and public docs. Tax, privacy, and consumer-protection items (sections 1.6, 7.x) need professional validation before launch — get an accountant for HST and a lawyer for subscription TOS + cleaners' contracts.*
