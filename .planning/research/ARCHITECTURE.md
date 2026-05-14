# Architecture — Hummi Booking Platform (v1)

**Research Date:** 2026-05-14
**Dimension:** Architecture
**Scope:** Greenfield system on top of existing SPA shell. Defines DB schema, RLS, auth, Stripe, notifications, admin panel, coverage validation, and phased build order. Frontend SPA structure (routing, sections, context) is already in place and out of scope for this doc.

---

## 0. Architectural Stance (TL;DR)

- **Single Supabase project** holds Postgres + Auth + Edge Functions + Storage. No separate Node server.
- **Single Vite SPA** serves both customer flows and admin panel under `/admin/*`, gated by role claim. No second build.
- **Stripe is source of truth for money** — Postgres mirrors Stripe state via webhooks. Never trust client-side success.
- **Edge Functions own all writes that involve secrets or money:** Stripe webhook, Stripe customer/intent creation, Twilio SMS, Resend email, cron jobs.
- **RLS-first:** every table is RLS-enabled. Customer access is row-scoped by `user_id`. Admin role bypasses via JWT claim. Edge Functions use `service_role` to bypass RLS for webhook side-effects.
- **Pricing is table + formula:** structured pricing_rules table stores base + per-attribute deltas. A SQL function `pricing.quote(property_id, service_id)` returns a price. Easy to A/B and audit.
- **Visit is the atomic unit of operation** — bookings, packages, and subscriptions all generate `visits`. Admin ops, notifications, assignments, reviews all hang off `visits`.

---

## 1. Component Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Browser (SPA — Vite)                          │
│  ┌──────────────────────────┐    ┌────────────────────────────┐     │
│  │  Customer routes         │    │  Admin routes (/admin/*)    │     │
│  │  /, /book, /dashboard    │    │  (same bundle, role-gated)  │     │
│  └────────────┬─────────────┘    └─────────────┬──────────────┘     │
│               │                                 │                    │
│         supabase-js (anon key + JWT)      supabase-js (admin JWT)    │
│               │                                 │                    │
│               └─────────────────┬───────────────┘                    │
│                                 │                                    │
│                       stripe-js (publishable)                        │
└─────────────────────────────────┼────────────────────────────────────┘
                                  │
              ┌───────────────────┴────────────────────┐
              │                                        │
     ┌────────▼──────────┐                  ┌─────────▼──────────┐
     │  Supabase Postgres │                  │   Stripe (SaaS)    │
     │  - tables (RLS on) │  ◄── webhook ────│   Customers,       │
     │  - SQL fns         │                  │   PaymentIntents,  │
     │  - pg_cron         │                  │   Subscriptions    │
     │  - triggers        │                  └─────────┬──────────┘
     └────────┬───────────┘                            │
              │ NOTIFY / pg_net                        │ webhook POST
              │                                        │
              │              ┌─────────────────────────▼────────────┐
              └─────────────►│ Supabase Edge Functions (Deno)        │
                             │  - stripe-webhook                     │
                             │  - create-checkout                    │
                             │  - send-otp / verify-otp              │
                             │  - notify-visit-reminder (cron)       │
                             │  - notify-on-the-way (trigger)        │
                             │  - send-email / send-sms (internal)   │
                             └──────────┬──────────┬─────────────────┘
                                        │          │
                                ┌───────▼───┐  ┌───▼──────┐
                                │ Resend    │  │ Twilio   │
                                │ (email)   │  │ (SMS)    │
                                └───────────┘  └──────────┘
```

**Trust boundaries:**
- Browser → only anon JWT + customer JWT. Never sees Stripe secret, Resend key, Twilio creds, service_role key.
- Edge Functions → hold all third-party secrets, use `service_role` for DB writes that bypass RLS (webhook → mark booking paid, etc.).
- Postgres → enforces RLS for every authenticated query. Edge Function is the only path for unauthenticated server-side writes.

---

## 2. Database Schema

### 2.1 Schemas

- `public` — application tables (default).
- `auth` — Supabase managed (read-only from app).
- `stripe` — read mirror of Stripe entities (`stripe_events`, helper views).
- `ops` — internal admin/operational tables (`audit_log`, `notifications_log`).

### 2.2 Entity Overview (high-level)

```
auth.users  ─1:1─►  profiles  ─1:N─►  properties
                       │                  │
                       │                  └─1:N─► bookings ─1:N─► visits
                       │                  └─1:N─► packages ─1:N─► visits
                       │                  └─1:N─► subscriptions ─1:N─► visits
                       │
                       └─1:N─►  reviews (on visits)

services ──┐
pricing_rules ──┤── used by quote(property, service)
coverage_zones ─┘── validates property.postal_code

visits ──N:1─► crews   (via assignments)
visits ──1:N─► notifications_log
visits ──1:1─► reviews

payments ──N:1─► bookings | packages | subscription_invoices
stripe_events  (idempotency)
audit_log      (admin actions)
```

### 2.3 Tables (DDL sketch)

Conventions:
- All ids are `uuid` with `default gen_random_uuid()`.
- All tables have `created_at timestamptz default now()`, `updated_at timestamptz default now()` (trigger).
- `_status` columns are `text` constrained by `check` (Postgres enums are painful to migrate).
- All foreign keys `on delete restrict` unless noted. Soft delete via `deleted_at` only on `properties`, `crews`.

#### `profiles` (1:1 with auth.users)

```sql
create table profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text not null unique,
  full_name         text,
  phone_e164        text,
  phone_verified_at timestamptz,
  stripe_customer_id text unique,
  preferred_language text default 'en' check (preferred_language in ('en','es')),
  marketing_opt_in  boolean default false,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index on profiles(stripe_customer_id);
```

Notes:
- `id = auth.users.id` so JWT `sub` claim directly addresses the profile.
- `phone_verified_at` is the gating flag for booking confirmation flows.
- `stripe_customer_id` lazily populated on first checkout (Edge Function), unique to detect duplicates.

#### `properties`

```sql
create table properties (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references profiles(id) on delete cascade,
  label             text not null,                          -- "Home", "Mom's house"
  street_address    text not null,
  unit              text,
  city              text not null,
  province          text not null default 'ON',
  postal_code       text not null,                          -- normalized A1A 1A1
  country           text not null default 'CA',
  square_feet       integer not null check (square_feet > 0 and square_feet < 20000),
  bedrooms          integer not null check (bedrooms between 0 and 20),
  bathrooms         numeric(3,1) not null check (bathrooms between 0 and 20),
  pets              boolean default false,
  parking_notes     text,
  entry_notes       text,                                   -- gate code, lockbox, etc.
  coverage_zone_id  uuid references coverage_zones(id),     -- nullable, set on insert via trigger/fn
  deleted_at        timestamptz,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index on properties(user_id) where deleted_at is null;
create index on properties(postal_code);
create index on properties(coverage_zone_id);
```

Notes:
- `bathrooms numeric(3,1)` to support "2.5 baths".
- `coverage_zone_id` resolved on insert/update by trigger that looks up `postal_code` prefix in `coverage_zones`. If null → property out of zone, blocked at app layer.
- Soft delete to preserve historical visit references.

#### `services` (catalog)

```sql
create table services (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,                       -- 'standard', 'deep', 'move-in-out'
  name          text not null,
  description   text,
  duration_minutes_base integer not null,                   -- baseline duration, scaled by property
  is_active     boolean not null default true,
  display_order integer not null default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
```

#### `pricing_rules` (table-driven, audited)

```sql
create table pricing_rules (
  id           uuid primary key default gen_random_uuid(),
  service_id   uuid not null references services(id) on delete cascade,
  rule_kind    text not null check (rule_kind in ('base','per_bedroom','per_bathroom','per_sqft_band','flat_addon','multiplier')),
  -- For 'per_sqft_band' the band is encoded in min/max:
  sqft_min     integer,
  sqft_max     integer,
  -- The actual price contribution:
  amount_cents integer,             -- for fixed/per-unit rules
  multiplier   numeric(5,3),        -- for multiplier rules (e.g., pets=1.10, deep=1.6)
  applies_when_pets    boolean,     -- conditional flat_addon
  effective_from timestamptz not null default now(),
  effective_to   timestamptz,       -- null = current
  created_at   timestamptz default now()
);
create index on pricing_rules(service_id, effective_from desc);
```

The quote is computed by a SQL function:

```sql
create or replace function pricing.quote(p_property_id uuid, p_service_id uuid)
returns table(subtotal_cents int, tax_cents int, total_cents int, breakdown jsonb)
language plpgsql security definer as $$
  -- 1. Fetch property attrs (sqft, bedrooms, bathrooms, pets)
  -- 2. Fetch active rules where effective_from <= now() and (effective_to is null or > now())
  -- 3. Apply in order: base -> per_bedroom*bedrooms -> per_bathroom*bathrooms ->
  --    per_sqft_band (matching band) -> flat_addon (if condition) -> multipliers (compounded)
  -- 4. Tax = subtotal * 0.13 (ON HST). Future: tax_rates table.
  -- 5. Return total + breakdown jsonb {base: X, bedrooms: Y, bathrooms: Z, sqft: A, addons: [...], multipliers: {...}}
$$;
```

Why table + formula hybrid: rules are data (admin-editable, versioned by `effective_from`), but the computation is a deterministic SQL function the app and admin both call. Quote breakdown is stored on `bookings.price_breakdown jsonb` at booking time so historic prices don't drift when rules change.

#### `coverage_zones`

```sql
create table coverage_zones (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,                            -- 'Kitchener', 'Waterloo', 'Cambridge', 'Guelph'
  is_active       boolean not null default true,
  created_at      timestamptz default now()
);

create table coverage_postal_prefixes (
  id           uuid primary key default gen_random_uuid(),
  zone_id      uuid not null references coverage_zones(id) on delete cascade,
  prefix       text not null,                               -- 'N2L', 'N1G', 'N3C'
  unique(prefix)
);
create index on coverage_postal_prefixes(prefix);
```

Why two tables: `coverage_zones` is the marketing/operational concept (KW, Cambridge, Guelph), `coverage_postal_prefixes` is the technical validator. Admin manages the prefix list. Property insert trigger:

```sql
update properties set coverage_zone_id = (
  select zone_id from coverage_postal_prefixes
   where prefix = upper(substr(regexp_replace(NEW.postal_code,'\s',''),1,3))
   limit 1
);
```

#### `bookings` (one-shot)

```sql
create table bookings (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id),
  property_id     uuid not null references properties(id),
  service_id      uuid not null references services(id),
  scheduled_at    timestamptz not null,
  duration_minutes integer not null,
  status          text not null default 'pending_payment'
                  check (status in ('pending_payment','paid','assigned','in_progress','completed','cancelled','refunded')),
  price_subtotal_cents int not null,
  price_tax_cents      int not null,
  price_total_cents    int not null,
  price_breakdown jsonb not null,
  notes_from_customer text,
  stripe_payment_intent_id text unique,
  cancelled_at    timestamptz,
  cancellation_reason text,
  cancellation_fee_cents int default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index on bookings(user_id, scheduled_at desc);
create index on bookings(status) where status in ('pending_payment','paid','assigned');
create index on bookings(stripe_payment_intent_id);
```

#### `packages` (prepaid N visits)

```sql
create table packages (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id),
  property_id     uuid not null references properties(id),
  service_id      uuid not null references services(id),
  total_visits    int not null check (total_visits between 2 and 24),
  visits_remaining int not null,
  status          text not null default 'pending_payment'
                  check (status in ('pending_payment','active','exhausted','cancelled','refunded','expired')),
  price_total_cents int not null,
  price_breakdown   jsonb not null,
  stripe_payment_intent_id text unique,
  expires_at      timestamptz,                              -- e.g. 12 months after purchase
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index on packages(user_id, status);
create check constraint visits_remaining_valid check (visits_remaining between 0 and total_visits);
```

#### `subscriptions` (monthly recurring)

```sql
create table subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id),
  property_id     uuid not null references properties(id),
  service_id      uuid not null references services(id),
  visits_per_period int not null check (visits_per_period between 1 and 8),
  cadence         text not null default 'monthly' check (cadence in ('weekly','biweekly','monthly')),
  status          text not null default 'incomplete'
                  check (status in ('incomplete','active','past_due','paused','canceled')),
  current_period_start timestamptz,
  current_period_end   timestamptz,
  visits_remaining_in_period int not null default 0,
  stripe_subscription_id text unique,
  stripe_price_id   text not null,
  cancel_at_period_end boolean not null default false,
  paused_at       timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index on subscriptions(user_id, status);
create index on subscriptions(stripe_subscription_id);
```

#### `visits` (the atomic operational unit)

```sql
create table visits (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id),
  property_id     uuid not null references properties(id),
  service_id      uuid not null references services(id),

  -- Exactly one of these three is non-null (enforced by check constraint):
  booking_id      uuid references bookings(id),
  package_id      uuid references packages(id),
  subscription_id uuid references subscriptions(id),

  scheduled_at    timestamptz not null,
  duration_minutes int not null,
  status          text not null default 'scheduled'
                  check (status in ('scheduled','assigned','en_route','in_progress','completed','cancelled','no_show')),
  status_updated_at timestamptz default now(),
  completed_at    timestamptz,
  internal_notes  text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),

  constraint visit_has_one_parent check (
    (booking_id is not null)::int +
    (package_id is not null)::int +
    (subscription_id is not null)::int = 1
  )
);
create index on visits(user_id, scheduled_at desc);
create index on visits(scheduled_at) where status in ('scheduled','assigned','en_route');
create index on visits(status) where status in ('scheduled','assigned');
create index on visits(property_id, scheduled_at);
```

Why one table with three parent FKs: every operational query ("what visits are tomorrow?", "what's this crew's schedule?", "send 24h reminders") works uniformly. The check constraint enforces "exactly one parent".

#### `crews` and `assignments`

```sql
create table crews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,                                -- "Crew A"
  lead_name   text,
  lead_phone  text,
  is_active   boolean not null default true,
  deleted_at  timestamptz,
  created_at  timestamptz default now()
);

create table assignments (
  id          uuid primary key default gen_random_uuid(),
  visit_id    uuid not null unique references visits(id) on delete cascade,
  crew_id     uuid not null references crews(id),
  assigned_by uuid not null references profiles(id),        -- admin who assigned
  assigned_at timestamptz default now(),
  notes       text
);
create index on assignments(crew_id);
```

`unique(visit_id)` — one crew per visit in v1 (no shared crews). If a visit reassigns, replace row (or audit via `assignment_history` later — out of scope v1).

#### `payments`

```sql
create table payments (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id),
  -- Polymorphic-ish link: exactly one of these is set
  booking_id      uuid references bookings(id),
  package_id      uuid references packages(id),
  subscription_id uuid references subscriptions(id),

  stripe_payment_intent_id text unique,
  stripe_invoice_id        text unique,                     -- for subscription invoice payments
  stripe_charge_id         text,
  amount_cents  int not null,
  currency      text not null default 'cad',
  status        text not null check (status in ('processing','succeeded','failed','refunded','partially_refunded')),
  failure_reason text,
  refunded_at   timestamptz,
  refunded_amount_cents int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
create index on payments(user_id, created_at desc);
create index on payments(stripe_payment_intent_id);
create index on payments(stripe_invoice_id);
```

#### `cancellation_policies`

```sql
create table cancellation_policies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,                                -- "default-2026", "holiday"
  is_active   boolean not null default true,
  -- Rules: hours_before -> fee_pct
  free_cancel_hours_before int not null default 48,
  partial_fee_hours_before int not null default 24,
  partial_fee_pct          int not null default 50,
  no_refund_hours_before   int not null default 4,
  effective_from timestamptz not null default now(),
  effective_to   timestamptz
);
```

Applied at cancellation time: pick active policy, compare `scheduled_at - now()` to the thresholds, compute `cancellation_fee_cents` on `bookings`/`visits`.

#### `notifications_log` (ops.notifications_log)

```sql
create table ops.notifications_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references profiles(id),
  visit_id     uuid references visits(id),
  channel      text not null check (channel in ('email','sms')),
  template     text not null,                               -- 'confirmation','reminder_24h','on_the_way','review_request'
  provider     text not null check (provider in ('resend','twilio')),
  provider_message_id text,
  status       text not null check (status in ('queued','sent','delivered','failed','bounced')),
  payload      jsonb,
  error        text,
  sent_at      timestamptz,
  created_at   timestamptz default now()
);
create index on ops.notifications_log(visit_id);
create index on ops.notifications_log(user_id, created_at desc);
create index on ops.notifications_log(template, status);
```

Idempotency for cron-driven reminders: unique `(visit_id, template)` partial index where `status in ('sent','delivered')` prevents duplicates.

#### `reviews`

```sql
create table reviews (
  id           uuid primary key default gen_random_uuid(),
  visit_id     uuid not null unique references visits(id),
  user_id      uuid not null references profiles(id),
  rating       int not null check (rating between 1 and 5),
  comment      text,
  is_public    boolean not null default false,              -- admin gates publication
  created_at   timestamptz default now()
);
```

#### `audit_log` (ops.audit_log)

```sql
create table ops.audit_log (
  id           bigint generated always as identity primary key,
  actor_id     uuid references profiles(id),                -- admin who did it
  actor_role   text not null,
  action       text not null,                               -- 'visit.assign','booking.refund','pricing.update'
  entity_type  text not null,
  entity_id    uuid,
  before       jsonb,
  after        jsonb,
  ip           inet,
  user_agent   text,
  created_at   timestamptz default now()
);
create index on ops.audit_log(entity_type, entity_id);
create index on ops.audit_log(actor_id, created_at desc);
create index on ops.audit_log(created_at desc);
```

Written from admin Edge Functions or via Postgres trigger on key tables.

#### `stripe_events` (idempotency table)

```sql
create table stripe.stripe_events (
  id            text primary key,                           -- Stripe's evt_xxx id
  type          text not null,
  payload       jsonb not null,
  processed_at  timestamptz,
  error         text,
  created_at    timestamptz default now()
);
create index on stripe.stripe_events(type, created_at desc);
```

The webhook inserts the event row with `processed_at = null` first. If insert fails on PK conflict → duplicate → ack 200, exit. Otherwise process the event, then update `processed_at = now()`. This makes the webhook safely retriable.

### 2.4 Critical Indexes (summary)

- `visits(scheduled_at) WHERE status in ('scheduled','assigned','en_route')` — drives reminder cron + admin upcoming view.
- `visits(user_id, scheduled_at desc)` — customer dashboard.
- `bookings(stripe_payment_intent_id)`, `packages(stripe_payment_intent_id)`, `subscriptions(stripe_subscription_id)`, `payments(stripe_payment_intent_id|stripe_invoice_id)` — webhook lookups.
- `properties(user_id) WHERE deleted_at IS NULL` — customer's property list.
- `coverage_postal_prefixes(prefix)` — zone validation lookup.
- `notifications_log` partial unique on `(visit_id, template) WHERE status in ('sent','delivered')` — dedupe.

---

## 3. Row Level Security (RLS)

Every public/ops table has `alter table ... enable row level security`. The pattern:

- **Customer policies** scoped by `user_id = auth.uid()`.
- **Admin policies** allow all if JWT claim has role `admin` (read: `auth.jwt() ->> 'role' = 'admin'`, but we use `app_metadata.role` — see auth section).
- **Service role** automatically bypasses RLS — Edge Functions use it for webhook side-effects.

### 3.1 Helper functions

```sql
create or replace function auth.is_admin() returns boolean
language sql stable as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;
```

### 3.2 Per-table policy sketches

| Table | Customer | Admin | Notes |
|---|---|---|---|
| `profiles` | select/update where `id = auth.uid()` | all | No insert from customer — created via trigger on auth.users insert. |
| `properties` | all where `user_id = auth.uid() and deleted_at is null` | all | Customer delete = soft delete (update `deleted_at`). |
| `services` | select where `is_active = true` | all | Public-read catalog. |
| `pricing_rules` | no access | all | Customer only sees prices via `pricing.quote()` SQL function (security definer). |
| `coverage_zones` | select where `is_active = true` | all | |
| `coverage_postal_prefixes` | select all | all | Needed for client-side validation. |
| `bookings` | select where `user_id = auth.uid()`; insert with `user_id = auth.uid() and status = 'pending_payment'`; update only for cancellation (status transition guarded) | all | Status transitions to 'paid'/'assigned'/etc. only via service_role (webhook/admin). |
| `packages` | same shape as bookings | all | |
| `subscriptions` | select where `user_id = auth.uid()`; insert via Edge Function (not direct) | all | |
| `visits` | select where `user_id = auth.uid()` | all | Customer cancels via RPC that updates status to 'cancelled' if policy allows. No raw update. |
| `assignments` | no access | all | Customer learns assignment via visit.status + on-the-way notification. |
| `crews` | no access | all | |
| `payments` | select where `user_id = auth.uid()` | all | Insert/update only via service_role from webhook. |
| `cancellation_policies` | select where `is_active = true` | all | Customer needs to read current policy to display rules. |
| `ops.notifications_log` | no access | all | Server-only. |
| `reviews` | select where `user_id = auth.uid() or is_public = true`; insert where `user_id = auth.uid()` and visit completed | all | |
| `ops.audit_log` | no access | all | |
| `stripe.stripe_events` | no access | no access | Service-role only. |

### 3.3 Mutation gates

Customer mutations that look simple (insert booking) but have business rules (property must be in zone, scheduled_at in future, etc.) are wrapped in **security definer RPCs** (`create_booking`, `cancel_visit`, `start_subscription`) rather than raw RLS-permitted inserts. The RPC validates and inserts. Pure RLS just blocks unauthorized access.

---

## 4. Auth Model

### 4.1 Combining Email/Password + Google OAuth + SMS OTP

Supabase Auth handles email/pw and OAuth natively. **Phone SMS OTP is NOT used as a primary auth factor** — too brittle for repeat logins, and Twilio Verify costs add up. Instead:

- **Primary auth:** Email/password OR Google OAuth (Supabase handles both, both produce a `auth.users` row, same `id`).
- **Phone verification:** A separate "verify your phone" step inside the dashboard, gated before booking. Uses Twilio Verify (SMS OTP) via an Edge Function — NOT Supabase's phone-auth flow.

Flow:
1. User signs up with email or Google.
2. Trigger inserts a `profiles` row.
3. On first booking attempt, app checks `profiles.phone_verified_at`. If null, prompt for phone, call `send-otp` Edge Function → Twilio Verify → user enters code → `verify-otp` Edge Function checks and sets `phone_verified_at = now()`, `phone_e164`.

Why this split: separating "login" from "phone-verified" means a user can change their phone without re-creating their account, and Google OAuth users don't get an awkward "ALSO send me an SMS to log in" step.

### 4.2 user vs profile separation

- `auth.users` — Supabase-managed, contains email/password hash, OAuth identities, `app_metadata`, `user_metadata`.
- `public.profiles` — app-owned, references `auth.users(id)`. Contains phone, Stripe customer id, marketing prefs, language.

Trigger to keep in sync:
```sql
create function auth.handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
  return new;
end$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function auth.handle_new_user();
```

### 4.3 Admin role

**Decision: app_metadata role claim, NOT a separate admins table.**

Rationale:
- `app_metadata` is mutable only via service_role (not by the user themselves), unlike `user_metadata`.
- RLS policies can read it via `auth.jwt()` cheaply.
- No extra join on every admin policy.
- Audit log captures who promoted whom.

Implementation:
- Admin promotion happens via an Edge Function (`admin/grant-role`) callable only by existing admins (bootstrap: SQL one-liner for the first admin, then UI for everyone else).
- The function calls `supabase.auth.admin.updateUserById(id, { app_metadata: { role: 'admin' } })`.
- An audit log row is written.
- Existing JWTs do NOT auto-refresh with the new role — admin must log out/in (or app calls `refreshSession()` after promotion).

We optionally maintain a thin `public.admin_users` view for the admin UI to list admins:

```sql
create view public.admin_users as
  select p.id, p.email, p.full_name, u.app_metadata
    from public.profiles p
    join auth.users u on u.id = p.id
   where (u.app_metadata->>'role') = 'admin';
```

---

## 5. Stripe Integration Architecture

### 5.1 Where Stripe Customer is created

**Lazily, on first payment intent**, NOT on signup.

Why: many users browse and never book. Creating a Customer for every signup pollutes Stripe and bloats search.

Flow on first payment:
1. Customer clicks "Pay" on a booking.
2. SPA calls `create-payment-intent` Edge Function with `{ booking_id }`.
3. Function reads `profiles.stripe_customer_id`. If null, calls `stripe.customers.create({ email, name, metadata: { profile_id } })`, then `update profiles set stripe_customer_id = ...`.
4. Function calls `stripe.paymentIntents.create({ customer, amount, currency: 'cad', metadata: { booking_id, kind: 'booking' } })`.
5. Returns `client_secret` to SPA.
6. SPA uses Stripe.js `confirmCardPayment(client_secret)`.
7. After confirm, SPA shows "processing" state. Real source of truth = webhook.

### 5.2 One-shot Booking Payment

```
Customer ──pay──► SPA ──RPC──► create-payment-intent (Edge)
                                  │
                                  ├── ensure Stripe Customer
                                  └── PaymentIntent (metadata.kind='booking', metadata.booking_id)
                                          │
                          ◄─client_secret──┘
                          │
Customer ── confirmCardPayment(client_secret) ──► Stripe
                                                     │
                                                     │ webhook: payment_intent.succeeded
                                                     ▼
                              stripe-webhook (Edge, service_role)
                                  │
                                  ├── insert stripe_events row (idempotency)
                                  ├── update bookings set status='paid' where stripe_payment_intent_id = pi.id
                                  ├── insert payments row
                                  ├── insert visits row (one)
                                  ├── enqueue confirmation email/SMS
                                  └── mark stripe_events.processed_at = now()
```

If webhook hasn't arrived after ~3s, SPA polls `bookings.status` for 'paid' via Supabase realtime channel and shows confirmation. If status doesn't flip within 30s → "Payment received, confirmation pending" + an internal monitoring alert.

### 5.3 Package Payment

Same as one-shot except:
- Metadata: `{ kind: 'package', package_id }`.
- Webhook handler on success: `update packages set status='active', visits_remaining = total_visits` and DOES NOT auto-create visits. Visits are scheduled by customer separately via `schedule_package_visit(package_id, scheduled_at)` RPC, which decrements `visits_remaining` and inserts a `visits` row.

### 5.4 Subscription Flow

Use **Stripe Checkout in subscription mode** (saves us from rebuilding card-on-file UI and the SCA dance):

```
Customer ──"Start subscription"──► SPA ──RPC──► create-checkout-session (Edge)
                                                   │
                                                   ├── ensure Stripe Customer
                                                   ├── stripe.checkout.sessions.create({
                                                   │     mode: 'subscription',
                                                   │     customer,
                                                   │     line_items: [{ price: stripe_price_id, quantity: 1 }],
                                                   │     metadata: { property_id, service_id, visits_per_period, kind: 'subscription' },
                                                   │     success_url, cancel_url
                                                   │   })
                                          ◄─url────┘
                                          │
Customer ── redirect to Stripe Checkout ──► pays
                                          │
                                  ┌───────┴──────────────┐
                                  │                      │
                       webhook: checkout.session.completed
                                  │
                                  ▼
                       stripe-webhook (Edge)
                          │
                          ├── idempotency check
                          ├── insert subscriptions row (status='active', stripe_subscription_id, current_period_start/end, visits_remaining_in_period = visits_per_period)
                          ├── enqueue welcome email
                          └── mark processed

(later, monthly:)
                       webhook: invoice.paid
                                  │
                                  ▼
                          ├── insert payments row
                          ├── update subscriptions set current_period_start/end, visits_remaining_in_period = visits_per_period
                          └── enqueue receipt email

                       webhook: invoice.payment_failed
                          ├── update subscriptions set status='past_due'
                          └── enqueue dunning email

                       webhook: customer.subscription.deleted
                          └── update subscriptions set status='canceled'
```

Customer Portal: enable Stripe Customer Portal (pay methods, invoice download, self-serve cancel) via a `create-portal-session` Edge Function that returns a portal URL. Saves a ton of UI work.

### 5.5 Webhook handler — where it lives

**Supabase Edge Function: `stripe-webhook`** at `https://<project>.functions.supabase.co/stripe-webhook`. Stripe webhook configured to POST to this URL. Function:

```ts
// Pseudocode
serve(async (req) => {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  const event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);

  // Idempotency: insert with ON CONFLICT DO NOTHING
  const inserted = await sb.from('stripe_events')
    .insert({ id: event.id, type: event.type, payload: event })
    .select().maybeSingle();
  if (!inserted) return new Response('duplicate', { status: 200 });

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': await handlePaymentIntentSucceeded(event); break;
      case 'payment_intent.payment_failed': await handlePaymentIntentFailed(event); break;
      case 'checkout.session.completed': await handleCheckoutCompleted(event); break;
      case 'invoice.paid': await handleInvoicePaid(event); break;
      case 'invoice.payment_failed': await handleInvoiceFailed(event); break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': await handleSubscriptionChange(event); break;
    }
    await sb.from('stripe_events').update({ processed_at: new Date() }).eq('id', event.id);
    return new Response('ok', { status: 200 });
  } catch (err) {
    await sb.from('stripe_events').update({ error: String(err) }).eq('id', event.id);
    throw err; // 500 → Stripe retries
  }
});
```

### 5.6 Idempotency strategy summary

- `stripe.stripe_events.id` = Stripe event id (PK). Duplicate POST = PK conflict = ack.
- Webhook handler logic is itself idempotent (uses `update ... where status != 'paid'`, `insert ... on conflict do nothing` for payments).
- Visit creation from `payment_intent.succeeded` checks `select 1 from visits where booking_id = ?` before inserting.

---

## 6. Notifications & Scheduled Jobs

### 6.1 24h reminder — `pg_cron` + Edge Function

Use Supabase's built-in `pg_cron` to schedule a SQL function every 15 minutes that finds visits between 23h45m and 24h15m away with no reminder yet sent, and calls an Edge Function via `pg_net`:

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Helper that queues reminders
create function ops.queue_24h_reminders() returns void language plpgsql security definer as $$
declare v record;
begin
  for v in
    select id from visits
     where status in ('scheduled','assigned')
       and scheduled_at between now() + interval '23 hours 45 min'
                            and now() + interval '24 hours 15 min'
       and not exists (
         select 1 from ops.notifications_log nl
          where nl.visit_id = visits.id
            and nl.template = 'reminder_24h'
            and nl.status in ('sent','delivered','queued')
       )
  loop
    perform net.http_post(
      url := current_setting('app.edge_functions_url') || '/notify-visit-reminder',
      headers := jsonb_build_object('Authorization','Bearer '||current_setting('app.cron_secret')),
      body := jsonb_build_object('visit_id', v.id, 'template', 'reminder_24h')
    );
  end loop;
end$$;

select cron.schedule('24h-reminders', '*/15 * * * *', $$select ops.queue_24h_reminders()$$);
```

The Edge Function `notify-visit-reminder` then:
1. Inserts `notifications_log` rows with status `queued` (unique partial index prevents double-queue).
2. Calls Resend (email) + Twilio (SMS).
3. Updates row to `sent` or `failed`.

Why `pg_cron` over external schedulers: zero new infra, runs inside Supabase, easy to inspect. Caveat: pg_cron tasks shouldn't be heavy — we delegate the actual sending to Edge Functions.

### 6.2 "On-the-way" notification — admin status change

When admin updates `visits.status = 'en_route'`:

**Option A (chosen): Postgres trigger calls Edge Function via pg_net.**

```sql
create function ops.on_visit_status_change() returns trigger language plpgsql as $$
begin
  if new.status = 'en_route' and old.status <> 'en_route' then
    perform net.http_post(
      url := current_setting('app.edge_functions_url') || '/notify-on-the-way',
      headers := jsonb_build_object('Authorization','Bearer '||current_setting('app.cron_secret')),
      body := jsonb_build_object('visit_id', new.id)
    );
  end if;
  return new;
end$$;

create trigger trg_visit_status_change
  after update of status on visits
  for each row execute function ops.on_visit_status_change();
```

**Option B (not chosen): Supabase Realtime listened by an Edge Function.** Requires a long-running connection, fragile in serverless. Rejected.

**Option C (not chosen): Admin UI calls Edge Function directly.** Works but couples admin UI to notification logic. Rejected for v1 — trigger keeps notification dispatch out of business logic.

### 6.3 Other notifications

- **Confirmation email** (post-payment) → fired from `stripe-webhook` handler directly (synchronous).
- **Review request email** → pg_cron every hour: find visits `completed` >24h ago without `review_request` notification, queue it.
- **Subscription renewal upcoming** → driven by Stripe `invoice.upcoming` webhook (Stripe sends it ~7d before). Handler queues an email.

### 6.4 Provider choice

**Email: Resend.** Modern API, cheap, React-email templates, easy DKIM setup. Alternative: Postmark (slightly pricier, excellent deliverability). SendGrid is heavier and not recommended for v1.

**SMS: Twilio.** Twilio Verify for OTP (handles rate limiting + carrier rules for us), Twilio Messaging API for reminders. Canadian sender ID requires a registered toll-free number — start that approval early.

### 6.5 Logging

Every dispatch writes `ops.notifications_log`. Failed sends are retried by a separate pg_cron job (`*/10 * * * *`) that retries `status='failed' and attempts < 3`.

---

## 7. Admin Panel Architecture

**Decision: Same Vite SPA, mounted under `/admin/*`, role-gated.**

Rationale:
- Single build pipeline, single deploy.
- Share supabase client, types, components.
- Admin routes loaded lazily so customer bundle isn't bloated (we'll add lazy loading in a dedicated phase).
- The "Supabase Studio + custom thin UI" approach is tempting for very early ops but breaks down once non-developers (operations staff) use it. Hummi will hire ops people; they need a polished UI.
- A separate Vite build doubles maintenance for shared types/components — not worth it for v1.

Structure:
```
src/admin/                   # New top-level folder, sibling of pages/
  layout/AdminLayout.tsx     # Sidebar, header, auth guard
  routes/AdminRouter.tsx     # Nested routes under /admin
  pages/
    AdminDashboard.tsx
    AdminBookings.tsx
    AdminVisits.tsx
    AdminCustomers.tsx
    AdminCrews.tsx
    AdminAssignments.tsx
    AdminPricing.tsx
    AdminCoverage.tsx
    AdminPolicies.tsx
  components/
    StatusBadge.tsx
    AssignCrewModal.tsx
    PriceRuleEditor.tsx
```

Route guard:
```tsx
function AdminGuard({ children }: { children: ReactNode }) {
  const { session, loading } = useSession();
  if (loading) return <Loading />;
  if (!session) return <Navigate to="/sign-in?next=/admin" />;
  const role = session.user.app_metadata?.role;
  if (role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
}
```

Lazy load the admin bundle:
```ts
const AdminRouter = lazy(() => import('./admin/routes/AdminRouter'));
// in main router:
{ path: '/admin/*', element: <Suspense fallback={<Loading/>}><AdminRouter /></Suspense> }
```

This splits admin code out of the public bundle (saves ~100-200KB for end customers).

Daily ops not covered by admin UI in v1 (e.g., bulk pricing rule changes, manual refunds beyond a simple button) → SQL via Supabase Studio is acceptable. We don't build an editor for everything.

---

## 8. Coverage Zone Validation

### 8.1 Two layers

**Client-side (UX):**
- On property creation form, normalize postal code (`A1A 1A1` format) on blur.
- Query `coverage_postal_prefixes` directly (public read RLS) to validate first 3 chars.
- Show "We don't service this area yet — join the waitlist?" if no match.

**Server-side (security):**
- `create_property` RPC (security definer) re-runs the same check before insert.
- Property trigger sets `coverage_zone_id`. If null, raise exception.
- RLS prevents booking creation on properties with `coverage_zone_id is null` (or we filter in `create_booking` RPC — cleaner).

### 8.2 Postal code data

A seed migration populates `coverage_postal_prefixes` with the v1 list from PROJECT.md (N1E/N1G/N1H/N1K/N1L for Guelph, N1R/N1S/N1T/N3C/N3E/N3H for Cambridge, N2H/N2K/N2L/N2M/N2N/N2P/N2R for Kitchener + Waterloo split). Admin can edit live without redeploy.

Hard-coded lists were considered and rejected: operations team needs to expand coverage without engineering involvement.

---

## 9. Build Order & Dependency Graph

### 9.1 Component dependency graph

```
                ┌──────────────────────┐
                │  Auth + profiles     │   (must come first — everything is user-scoped)
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │  Coverage zones      │   (no deps — pure data)
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │  Properties          │
                └──────────┬───────────┘
                           │
                ┌──────────▼───────────┐
                │  Services + Pricing  │
                │  rules + quote()     │
                └──────────┬───────────┘
                           │
            ┌──────────────┼───────────────┐
            │              │               │
   ┌────────▼────┐  ┌──────▼─────┐  ┌─────▼──────┐
   │  Bookings   │  │  Packages  │  │ Subscriptions│
   │  + Stripe   │  │  + Stripe  │  │ + Stripe     │
   │   one-shot  │  │   one-shot │  │   Checkout   │
   └────────┬────┘  └──────┬─────┘  └─────┬──────┘
            │              │               │
            └──────────────┼───────────────┘
                           │
                ┌──────────▼───────────┐
                │  Visits (uniform)    │
                └──────────┬───────────┘
                           │
            ┌──────────────┼───────────────┐
            │              │               │
   ┌────────▼─────┐ ┌──────▼─────┐ ┌──────▼──────┐
   │  Customer    │ │  Crews +   │ │ Notifications│
   │  dashboard   │ │  assignment│ │ (email/sms) │
   └──────────────┘ └──────┬─────┘ └──────┬──────┘
                           │              │
                ┌──────────▼──────────────▼───────┐
                │  Admin panel (consumes all)     │
                └──────────────┬──────────────────┘
                               │
                ┌──────────────▼──────────────────┐
                │  Reviews + cancellation policy  │
                └─────────────────────────────────┘
```

### 9.2 What MUST come before X

- **Auth + profiles must come before everything** — RLS depends on `auth.uid()`.
- **Coverage + properties must come before bookings** — can't book a property that doesn't exist.
- **Services + pricing must come before bookings** — quoting drives `price_total_cents`.
- **Stripe customer creation must come before any paid flow** — but it's lazy, so just ship the Edge Function once.
- **Webhook handler must come before any "real" paid flow** — without it, money flows but DB never updates.
- **Visits abstraction must come before notifications** — reminders run on visits, not on bookings.
- **Visits + assignments must come before admin panel** (or at least scaffolded) — admin's main job is the assignment queue.
- **Notifications can be partially parallel** — confirmation email can ship with bookings, reminder cron can come later.

### 9.3 What can be parallel

- Customer dashboard UI ↔ admin panel UI (after data layer exists).
- Email templates ↔ SMS templates.
- Pricing rule editor (admin) ↔ booking quote display (customer).
- Subscription flow ↔ package flow (independent Stripe paths once webhook handler exists).

---

## 10. Suggested Phasing (12 phases)

Each phase is a shippable, testable slice. Phases are deliberately small enough to fit one focused work session.

### Phase 1 — Foundation: Supabase project, migrations, CI

- Init `supabase/` folder, link to project.
- First migration: enable extensions (`pgcrypto`, `pg_cron`, `pg_net`, `pg_stat_statements`), create `ops` and `stripe` schemas, set up `updated_at` trigger function.
- Wire `supabase db push` into CI as a check (not deploy yet).
- Decide & document branching strategy (preview branches per PR vs single dev).
- Add Stripe SDK to package.json (server side only — for Edge Functions).

**Exits with:** empty but well-organized database, migration discipline.

### Phase 2 — Auth + profiles

- Migration: `profiles` table, `handle_new_user` trigger, RLS policies, `auth.is_admin()` helper.
- SPA: replace template sign-in/sign-up pages with real Supabase Auth (email/pw + Google OAuth).
- Add `useSession` hook + `<AuthProvider>` context, lift session into existing FreshFlowContext or sibling.
- Protected route helper (`<RequireAuth>`).
- Customer dashboard shell page (empty, but auth-gated).

**Exits with:** users can sign up, log in, log out, OAuth works.

### Phase 3 — Coverage + properties

- Migration: `coverage_zones`, `coverage_postal_prefixes` (seeded), `properties` + trigger.
- RLS + `create_property` / `update_property` / `soft_delete_property` RPCs.
- SPA: "My properties" page in dashboard. Add/edit/delete. Postal code validation with friendly error.

**Exits with:** customers can manage property list, geo-gated.

### Phase 4 — Services catalog + pricing engine

- Migration: `services`, `pricing_rules` (seeded with a default set), `pricing.quote()` function.
- SPA: quote preview UI ("Estimate cost"). Displays breakdown.
- Admin scaffold (just `/admin` route + `<AdminGuard>` + sidebar + "Services" page that lists services).

**Exits with:** quote returns a real price; admin can see catalog (read-only is fine for now).

### Phase 5 — Phone verification (Twilio Verify)

- Edge Functions: `send-otp`, `verify-otp`.
- SPA: phone capture + OTP modal in dashboard. Sets `phone_verified_at` on success.
- Add `phone_verified` gating helper used by booking flow in Phase 6.

**Exits with:** users can verify phone; subsequent flows check the flag.

### Phase 6 — One-shot booking + Stripe PaymentIntent + webhook

This is the keystone phase — touches the most pieces.

- Migration: `bookings`, `visits`, `payments`, `stripe.stripe_events`. RLS + `create_booking` RPC.
- Edge Functions: `create-payment-intent`, `stripe-webhook` (handles `payment_intent.succeeded`, `.payment_failed` minimal).
- SPA: full booking flow — pick property → service → date/time → review → pay (Stripe Elements) → confirmation page polling `bookings.status`.
- Email: send confirmation email from webhook (Resend integration, minimal template).
- E2E test: book + pay + verify visit row exists.

**Exits with:** a real customer can complete a real (test mode) booking end-to-end.

### Phase 7 — Customer dashboard (visits + history)

- SPA: "Upcoming visits", "Past visits", "Payments & receipts" tabs in dashboard.
- Stripe Customer Portal link (Edge Function `create-portal-session`).
- Booking detail page (status timeline, address, crew when assigned).

**Exits with:** customer can see everything they've done.

### Phase 8 — Packages (prepaid N visits)

- Migration: `packages`. Reuse `visits`. `purchase_package` RPC + Edge Function for PaymentIntent.
- Webhook handler extension: `kind='package'` branch activates the package.
- SPA: "Buy a package" flow + dashboard view ("3 of 5 visits remaining"). Schedule package visits.

**Exits with:** customers can buy and use packages.

### Phase 9 — Subscriptions (Stripe Checkout)

- Migration: `subscriptions`. `create-checkout-session` Edge Function.
- Webhook handlers: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`.
- Cron job: every day at midnight, for each active subscription, schedule next month's visits up to `visits_per_period`.
- SPA: subscribe flow + manage subscription view (cancel/pause via Customer Portal).

**Exits with:** all three commercial flows work.

### Phase 10 — Admin panel: bookings, visits, assignments, crews

- Migration: `crews`, `assignments`. Admin role policies tightened.
- SPA `/admin`: queue of unassigned visits, calendar view, crew list, "assign crew" modal.
- Admin status transitions: trigger writes `audit_log` + fires `on_visit_status_change` for en_route.
- Edge Function `notify-on-the-way` sends SMS.

**Exits with:** ops can run a day end-to-end from the panel.

### Phase 11 — Notifications: reminders + reviews + cancellation policy

- Migration: `cancellation_policies` (seeded), `reviews`.
- pg_cron jobs: `queue_24h_reminders` + `queue_review_requests`.
- Edge Functions: `notify-visit-reminder`, `notify-review-request`.
- SPA: customer cancel/reschedule UI with fee preview based on active policy. `cancel_visit` RPC.
- SPA: post-visit review form.

**Exits with:** end-to-end customer comms loop closed.

### Phase 12 — Admin polish: pricing/coverage/policy editors, audit log viewer

- Admin UI for editing `pricing_rules` (with effective_from versioning), `coverage_postal_prefixes`, `cancellation_policies`, `services`.
- Audit log viewer (read-only).
- Admin user management (grant/revoke role).
- Final accessibility + responsive pass on customer flows.
- Stripe live mode cutover checklist.

**Exits with:** v1 ready for paying customers in production.

### 10.1 Parallelization hints

- After Phase 2: phase 3 (properties) and phase 4 (services/pricing) can be parallel — they don't touch each other.
- Phase 5 (phone) is independent of phase 3-4, can slot anywhere before phase 6.
- Phase 8 + phase 9 (packages + subscriptions) can be parallel once phase 6 lands.
- Phase 10 (admin) UI can start as soon as phase 6 ships data; doesn't have to wait for phases 7-9.
- Phase 11 (notifications) cron pieces are independent of admin UI.

### 10.2 Risks worth calling out in roadmap

- **Twilio toll-free verification timeline (Canada)** — start in phase 1 or 2, can take weeks. Block on this for SMS reminders.
- **Stripe Canadian account setup + bank verification** — same: weeks. Start day one.
- **pg_cron + pg_net availability** on the Supabase plan — verify on free tier or upgrade. Worst case, fall back to a Vercel Cron route hitting an Edge Function (still no separate infra).
- **Apple/Google review timeline** — not relevant for v1 (web app), but if SMS opt-in language is wrong, deliverability suffers.

---

## 11. Open Questions for Other Research Dimensions

These are flagged for sister docs (TESTING.md, RISKS.md, OPS.md, etc.) — don't try to answer here:

- Backup & restore policy for Postgres (point-in-time recovery configuration).
- E2E test strategy with Stripe test mode (Playwright + stripe-mock).
- Observability: do we need Sentry / Logflare / Axiom for Edge Functions?
- Rate limiting on RPCs (Supabase has it natively at the gateway, but custom per-RPC may be needed for `create_booking`).
- Tax handling for non-HST provinces if/when coverage expands — schema supports it via future `tax_rates` table.
- Compliance: PIPEDA (CA privacy), Stripe Radar config, SCA (3DS2) for Canadian cards — usually fine via Stripe defaults but worth confirming.

---

*Architecture research: 2026-05-14*
