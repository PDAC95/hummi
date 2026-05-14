# Stack Research — Additions on Top of Existing Hummi Base

**Research Date:** 2026-05-14
**Scope:** Brownfield. Locks in the libraries to add on top of React 19.1 + Vite 7 + TypeScript 5.9 + React Router 7 + Supabase JS 2.105 + Stripe (planned) + Vercel.
**Constraints honored:** One engineer, no separate Node backend, Supabase Edge Functions for anything secret, Vercel-only deploy, English-only frontend, Ontario (KW/Cambridge/Guelph) geography lock.

> **Note on version verification:** External lookups (Context7, npm registry, WebFetch) were not available in this research session. Versions below are taken from training data through Jan 2026 with a 4-month gap to the working date (2026-05-14). Each row carries an explicit **Confidence** value reflecting that gap. Before installing, run `npm view <pkg> version` to confirm the patch version — major versions are highly stable for everything in this list except where flagged.

---

## TL;DR — The Stack Hummi Should Add

| Category | Pick | Version (target) | Confidence |
|---|---|---|---|
| Server state / data fetching | `@tanstack/react-query` | `^5.62.x` | High |
| Forms | `react-hook-form` | `^7.54.x` | High |
| Validation | `zod` + `@hookform/resolvers` | `zod ^3.24.x`, resolvers `^3.10.x` | High |
| Data router | React Router 7 loaders/actions (already installed) | `7.9.3` (in repo) | High |
| Date math | `date-fns` + `@date-fns/tz` | `date-fns ^4.1.x`, `@date-fns/tz ^1.2.x` | High |
| Date/time picker | `react-day-picker` | `^9.4.x` | High |
| Headless UI primitives | Radix UI (`@radix-ui/react-*`, à la carte) | each `^1.x` latest | High |
| Styling helper | Stay on Bootstrap 5 grid + utility CSS, add `clsx` | `clsx ^2.1.x` | High |
| Supabase auth UI | **Build custom** (do not use `@supabase/auth-ui-react`) | n/a | High |
| Stripe browser SDKs | `@stripe/stripe-js` + `@stripe/react-stripe-js` | `stripe-js ^5.x`, `react-stripe-js ^3.x` | Med-High |
| Stripe Node SDK (Edge Functions) | `stripe` (npm, used in Deno via esm.sh) or Deno-native via `npm:stripe@^17` | `^17.x` | Med-High |
| Transactional email | **Resend** (`resend` SDK) | `^4.x` | High |
| SMS / OTP | **Supabase Auth phone OTP via Twilio** (no SDK in browser) | Supabase-managed | High |
| Address autocomplete | **Google Places (Autocomplete) JS API** | loader `^1.16.x` (`@googlemaps/js-api-loader`) | Med |
| Postal-code coverage validation | Local seeded `coverage_postal_codes` table (Supabase) | n/a | High |
| Admin panel | **Same Vite app under `/admin` route** with RLS-gated Supabase queries | n/a | High |
| Scheduled jobs / reminders | **Supabase `pg_cron` + Edge Functions** | n/a | High |
| Observability | **Sentry** (`@sentry/react`) + Vercel Web Analytics (already free) | `@sentry/react ^8.x` | High |
| Unit + integration tests | Vitest + Testing Library + `@testing-library/user-event` + `msw` | `vitest ^2.x`, RTL `^16.x`, user-event `^14.x`, `msw ^2.x` | High |
| E2E tests | Playwright (`@playwright/test`) | `^1.49.x` | High |
| Tiny extras | `nanoid` (idempotency keys), `posthog-js` (optional product analytics) | `nanoid ^5.x` | Med |

Total runtime bundle additions are modest: TanStack Query (~13kb gz), RHF (~8kb gz), Zod (~12kb gz tree-shaken), Stripe.js loader (lazy), Radix (à la carte, ~2-5kb per primitive). No state library, no UI kit, no Next.js — keep the SPA lean.

---

## 1. Data Fetching & Server State

**Pick:** **TanStack Query v5 (`@tanstack/react-query`)** — `^5.62.x`
**Runner-up:** Plain Supabase + React Router 7 loaders only (skip Query entirely)

### Why
- The customer flow is **read-heavy with mutations and optimistic UI** (book a visit, see updated balance, see reschedule reflect immediately). React Query gives `useQuery`/`useMutation`, cache invalidation, retry-on-mount, focus-refetch, and stale-while-revalidate — all things you'd otherwise hand-roll with `useEffect` + Supabase.
- Pairs cleanly with `@supabase/supabase-js`: `useQuery({ queryKey: ['visits', userId], queryFn: () => supabase.from('visits').select(...) })`. The Supabase client already returns awaitable Promises with typed data/error — Query is the cache layer Supabase deliberately doesn't ship.
- Devtools are essential when you're solo debugging "why didn't the dashboard refresh after Stripe webhook landed."
- Real-time integration is well-trodden: subscribe to a Supabase channel inside `useEffect`, call `queryClient.invalidateQueries(['visits'])` on change. No competing cache.

### Why not SWR
Smaller, but lacks first-class mutations, no offline cache persistence story, weaker devtools. The Hummi flows lean on mutations heavily (book, cancel, reschedule, save card, change subscription tier).

### Why not "just use loaders"
React Router 7 loaders are great for initial route data, **but** they're tied to navigation. Once the user is inside the dashboard, you need imperative refetching after a mutation, polling for visit status, and websocket-driven invalidation. Loaders alone leave gaps. Use **both** (see §3).

### Real-time
Supabase real-time channels are fine for the admin queue and "visit status changes." Don't subscribe globally — subscribe inside the admin queue route and the customer's "upcoming visit" widget. Invalidate Query cache on payload, don't write directly.

### Do not use
- **Redux / Redux Toolkit Query** — overkill, dead weight for a SaaS with no client-side derived state.
- **Zustand** — fine for tiny UI state, but you already have Context API for that and Query for server state. Adding a third store is bloat.
- **Apollo / urql** — no GraphQL endpoint.

---

## 2. Forms & Validation

**Pick:** **React Hook Form v7** + **Zod v3** via **`@hookform/resolvers/zod`**
- `react-hook-form ^7.54.x`
- `zod ^3.24.x` (NOT Zod v4 — see below)
- `@hookform/resolvers ^3.10.x`

**Runner-up:** TanStack Form + Zod (newer, more "future-proof", but ecosystem is thinner and the booking flow doesn't need its split-state architecture)

### Why
- RHF is uncontrolled-input-first → minimal re-renders, which matters because the booking form has many fields (address, beds, baths, sqft, date, time, frequency, add-ons) that you want recomputing price live without rerendering the whole tree.
- Zod gives you one schema that doubles as **TypeScript types** (`z.infer<typeof schema>`) and **runtime validation** at the form boundary AND at the Edge Function boundary (validate webhook bodies, validate RPC inputs).
- RHF's `useFieldArray` handles the multi-property and multi-visit-in-package UIs cleanly.
- `@hookform/resolvers/zod` is the canonical bridge. No glue code.

### Zod v3 vs v4
Zod v4 has been in active development; as of training-data cutoff, v3 is still the stable line that all resolvers and most libraries target. **Stay on v3 until both `@hookform/resolvers` and `drizzle-zod` (if you ever adopt it) have v4 stable resolvers shipped.** Re-check at install time — flag this for the engineer at phase plan time.

### Do not use
- **Formik** — slower, controlled-input model, RHF won this category years ago.
- **Yup** — Zod is the de-facto choice for new TS projects; you also benefit from `z.infer` for free.
- **Vest / Joi** — not React-form-shaped enough.

---

## 3. Routing & Data Loaders

**Pick:** **React Router 7 with `loader` + `action`** for route-level data
Already installed (`react-router 7.9.3`). Use the *Data Router* features that ship in v7.

### When to use loaders vs TanStack Query
| Use a loader when | Use TanStack Query when |
|---|---|
| Data is needed before the route renders (block on first paint) | Data is needed after interaction or polling |
| Data is "the page" (visit detail, invoice page) | Data is "a widget" (upcoming visits list, balance counter) |
| You want React Router to show a transition state | You want devtools, cache reuse across routes, optimistic mutations |
| SEO/initial-render matters (not the case here, SPA) | Most other cases |

**Recipe:** Loaders fetch and hydrate `queryClient` via `ensureQueryData`, then components use `useQuery` with the same key. You get RR's defer/`Await` for fast-paint AND Query's cache for navigations. This pattern (sometimes called "RR + RQ marriage") is documented in TanStack's `react-router` integration examples — adopt it from day one.

### Auth-gated routes
- A `protectedLoader` that calls `supabase.auth.getUser()` and `throw redirect("/login")` if null. Don't use a `<RequireAuth>` wrapper — the data loader runs before the route renders, so you avoid the flash of unauthenticated content.
- Admin routes use the same pattern with an extra RLS-backed role check (`profiles.role === 'admin'`).

### Do not use
- **TanStack Router** — would force a router swap. R7's data APIs are mature enough; don't churn.
- **Next.js App Router** — would require migrating off Vite. Out of scope per project constraints.

---

## 4. Date / Time

**Pick:** **`date-fns` v4** + **`@date-fns/tz`** for the Ontario timezone (`America/Toronto`)
- `date-fns ^4.1.x`
- `@date-fns/tz ^1.2.x`

**Runner-up:** Luxon (`^3.5.x`) — DateTime objects with built-in TZ, but heavier and not as tree-shakable.

### Why
- Tree-shakable functional API → only `format`, `addDays`, `parseISO`, `differenceInHours` get bundled.
- v4 dropped legacy code, embraces native `Intl` for locale formatting, and the new `@date-fns/tz` plugin gives you `TZDate` for cross-DST math without monkey-patching `Date`.
- You **will** hit DST edge cases (visit scheduled for 2026-03-08 at 02:30 a.m. doesn't exist in Toronto). Pick a TZ-aware lib from day one.

### Why not Day.js
Day.js is fine, but its plugin model (you have to `.extend(utc)` etc.) is bug-prone, and tree-shaking is worse. date-fns v4 is the modern winner.

### Why not Luxon
Heavier (~25kb gz vs ~8kb gz typical). Object-oriented API is nicer for date logic, but worth it only if you're juggling lots of TZ math. Hummi's TZ math is "always America/Toronto" — date-fns handles it fine.

### Calendar / date picker UI
**Pick:** **`react-day-picker` v9** — `^9.4.x`

- Headless-ish, accessible, fully styleable. Plays well with date-fns (it uses date-fns under the hood).
- Supports date ranges (good for paquetes that pick multiple visit days), disabled dates (block postal-code-blocked or past dates), and locales out of the box.

**Runner-up:** Build with HTML `<input type="date">` and progressively enhance. Cheap, ugly, accessible. Use for v1 admin if you're tight on time.

### Do not use
- **Moment.js** — deprecated, huge.
- **react-datepicker** — older, less accessible.
- **MUI X Date Pickers** — would force MUI as a peer dep. No.

---

## 5. UI Components

**Pick:** **Keep Bootstrap 5 grid for layout** (it's already wired through the FreshFlow template). For interactive primitives, use **Radix UI à la carte** (`@radix-ui/react-dialog`, `react-dropdown-menu`, `react-popover`, `react-select`, `react-tooltip`, `react-toast`, `react-tabs`) — each `^1.x`.

**Runner-up:** **shadcn/ui** copy-paste recipes (which themselves use Radix + Tailwind). Tempting and gorgeous, but requires adopting Tailwind on top of Bootstrap — that's a stack split nobody wants.

### Why
- The template already ships polished marketing visuals with Bootstrap 5 utility classes. Don't fight it on public pages.
- For **app surfaces** (booking flow, dashboard, admin) you need accessible, low-level primitives, not a heavy kit. Radix gives you exactly the unstyled-but-accessible building blocks (focus traps, ARIA, keyboard nav) and you skin them with the existing CSS conventions.
- À la carte → minimal bundle. Install `@radix-ui/react-dialog` only when you need a modal. Don't install all of Radix.

### Why not full shadcn/ui adoption
shadcn/ui assumes Tailwind. Bringing Tailwind into a Bootstrap codebase doubles your styling cognitive load and bundle. **If** at some point you do a full UI redesign and rip out Bootstrap, *then* migrate to shadcn — that's a milestone of its own, not a stack decision now.

### Why not Headless UI
Headless UI is fine but smaller surface than Radix (missing combobox-quality select, popover, etc.) and Tailwind-coupled by convention. Radix is the more neutral pick.

### Toasts / notifications
**Pick:** **`sonner`** (`^1.7.x`) — purpose-built toast library, great a11y, tiny.
Sweetalert2 is already in the repo from the template but it's modal-style and overkill for "Reservation confirmed" toasts. Keep Sweetalert2 only for confirmation dialogs that already use it; use Sonner for all new toasts.

### Styling helper
- **`clsx`** (`^2.1.x`) — tiny conditional className joiner. That's it. No `tailwind-merge`, no CVA, no styled-components.

### Do not use
- **Material UI / Chakra / Mantine** — each is 100kb+ gz and would clash with Bootstrap.
- **Tailwind CSS** — see above; conflicts with existing Bootstrap grid.
- **Styled-components / Emotion** — runtime CSS-in-JS is dead. Keep CSS files.

---

## 6. Auth UI (Supabase)

**Pick:** **Build custom auth screens.** Do **not** use `@supabase/auth-ui-react`.

### Why
- The official `@supabase/auth-ui-react` is deprecated/legacy and unstyleable beyond theming. Every commercial Supabase app eventually rips it out.
- You already need custom UI: signup must capture phone, must check postal code coverage *during* signup before storing, and SMS OTP for phone verification is a flow Supabase Auth UI doesn't render natively.
- The Supabase client gives you everything you need in ~6 functions: `signUp`, `signInWithPassword`, `signInWithOAuth`, `signInWithOtp` (phone), `verifyOtp`, `resetPasswordForEmail`. RHF + Zod + your own form components do it in 200 lines per screen.

### Patterns to use
- `@supabase/ssr` (`^0.5.x`) — even in a pure SPA, the SSR helpers give you cookie-based session storage that's easier to share with Vercel edge middleware later if you ever need it. **Optional for v1.** Default storage (localStorage) is fine for an SPA on Vercel CDN.
- Use Supabase Auth's built-in **phone provider with Twilio** (configured in Supabase dashboard) — Supabase routes the OTP through Twilio and you only call `signInWithOtp({ phone })` / `verifyOtp({ phone, token, type: 'sms' })`. No Twilio SDK in the browser.
- Use **PKCE flow** for Google OAuth (the default in modern `supabase-js`).

### Do not use
- **Clerk / Auth0 / NextAuth** — Supabase Auth is included, free, and integrates with RLS. Adding a third-party auth service is unnecessary cost and a second user table to keep in sync.
- **`@supabase/auth-ui-react`** — see above.

---

## 7. Stripe Integration

**Pick (browser):** **`@stripe/stripe-js`** + **`@stripe/react-stripe-js`**
- `@stripe/stripe-js ^5.x` (lazy-loaded ESM Stripe.js shim)
- `@stripe/react-stripe-js ^3.x` (React `<Elements>` provider + hooks)

**Pick (Edge Functions):** **`stripe` npm package** — `^17.x` (Deno-compatible via `npm:stripe`)

### Why "Payment Element" over "Card Element" or "Checkout"
Stripe now has three paradigms; this is the single most important Stripe decision you'll make.

| Paradigm | Use for | Don't use for |
|---|---|---|
| **Stripe Checkout** (hosted page) | Quick wins, low-volume — Stripe hosts the page | Hummi's branded booking flow (you want it inline) |
| **Payment Element** (unified inline) | **Your one-shot bookings and package purchases** — single embedded element that handles card + Apple Pay + Google Pay automatically | If you need exotic Pay flows Stripe doesn't support |
| **Card Element** (legacy) | Anything new | All new builds — Payment Element supersedes it |

**Recommendation:** Payment Element for one-shot and package purchases. **Customer Portal** (hosted by Stripe) for subscription management, payment method updates, and invoice download — saves you weeks of UI.

### Flow
1. Browser → Edge Function: "Create a PaymentIntent for visit X, amount $Y, customer Z."
2. Edge Function calls `stripe.paymentIntents.create({ amount, customer, automatic_payment_methods: { enabled: true } })`, returns `client_secret`.
3. Browser mounts `<Elements stripe={stripePromise} options={{ clientSecret }}>` → `<PaymentElement />` → `stripe.confirmPayment()` on submit.
4. Stripe webhook → Edge Function `stripe-webhook` → verify signature → update `visits.payment_status` in Supabase.

### Subscriptions
- Create Stripe `Customer` on first signup (Edge Function, idempotent via user_id metadata).
- Create `Subscription` via Edge Function when the user picks a monthly plan, using a `default_payment_method` they set up via SetupIntent (Payment Element in "setup" mode).
- All cancellation/upgrade UI → **redirect to Customer Portal session** generated by Edge Function. Zero UI to build.

### Idempotency
Always pass `Idempotency-Key` (use `nanoid()` from the browser, stored in a ref/local state) on PaymentIntent creation. Survives double-clicks and React StrictMode double-renders.

### Do not use
- **Square / PayPal / Adyen** — out of scope, Stripe is decided.
- **`stripe-node` directly in browser** — never, secret key would leak. Always Edge Function.
- **Old Card Element + manual 3DS handling** — Payment Element does this automatically.

---

## 8. Transactional Email

**Pick:** **Resend** (`resend` npm package, `^4.x`)

**Runner-up:** Postmark (`postmark` npm, ~`^4.x`) — slightly cheaper at low volume, harder DX.

### Why Resend
- Built for the Vercel/serverless era. Single `npm:resend` package, four-line Edge Function send.
- Free tier: 3,000 emails/month, 100/day — covers Hummi's v1 transactional volume easily.
- **React Email** (same team, `@react-email/components ^0.0.x`) lets you write templates as React components, preview in browser, render to HTML server-side in the Edge Function. Massive DX win over Mustache/MJML for a React shop.
- Built-in webhook for bounces and complaints — you can mark accounts as undeliverable in Supabase.

### Why not SendGrid
Overpriced for transactional, hostile docs, deprecated multiple SDKs in the last 5 years, enterprise-focused. Postmark is better in every way *except* React Email integration, which is Resend-only.

### Email types Hummi needs (v1)
- Booking confirmation (immediate, after Stripe webhook)
- Booking receipt with PDF invoice link (Stripe-hosted invoice URL)
- 24h-before reminder (scheduled — see §13)
- "Crew on the way" notification (admin-triggered)
- Post-service review request (24h after status=completed)
- Password reset (Supabase handles this natively — don't re-implement)

### Do not use
- **`nodemailer`** with SMTP — possible but a tax for nothing.
- **Mailgun / Mandrill** — fine but worse DX than Resend in 2026.
- **AWS SES** — cheapest at scale but ops-heavy. Save for a later milestone if volume justifies it.

---

## 9. SMS

**Pick:** **Twilio**, **but never touched from the browser**. Use it via:
1. **Supabase Auth phone provider** for OTP — Supabase calls Twilio internally; you call `supabase.auth.signInWithOtp({ phone })`.
2. **Edge Function `send-sms`** for transactional SMS (24h reminder if user opted into SMS, "on the way" notification) — uses Twilio REST API directly (no SDK needed, just `fetch`).

### Why
- Twilio Verify or Twilio Programmable Messaging is the most stable, cheapest, best-documented SMS provider in North America.
- Already-supported as Supabase Auth's phone provider — zero browser code, zero SDK install. Free tier and your Twilio account just charges you per SMS (~$0.0079/SMS in Canada as of late 2025).

### Why not MessageBird / Vonage / Telnyx
All viable, none integrate with Supabase Auth out of the box, so you'd have to roll your own OTP. Twilio = Supabase-supported = less code.

### Cost note for Hummi
SMS volume = (signups × 1 OTP) + (visits × ~2 reminders). At 100 visits/month with 2 SMS each = 200 SMS = ~$1.60/month CAD. Negligible.

### Do not use
- **AWS SNS** — cheaper but you'll write a deliverability-and-opt-out compliance layer. Not worth it.
- **Browser-side Twilio SDK** — never, account SID leak.

---

## 10. Address / Postal Code Validation

**Pick (postal-code coverage):** **Local Supabase table** `coverage_postal_codes`
**Pick (address autocomplete UX, optional):** **Google Places Autocomplete (New)** via `@googlemaps/js-api-loader ^1.16.x`

### Two separate problems
1. **"Is this address in our service area?"** → Look up the **FSA** (first 3 chars of postal code, e.g. `N2L`) against a Supabase table seeded from the project's coverage list. This is gated by data ownership, not by an API. **Always do this server-side** in an Edge Function (or via RLS-enforced read), don't rely on the client.
2. **"Help the user fill the address quickly without typos"** → Optional autocomplete. Nice-to-have, not required for v1. Recommended provider:

### Google Places Autocomplete (New)
- The "Places API (New)" launched 2024/2025 with usage-based, dramatically cheaper pricing than Place Details.
- Use Autocomplete to suggest addresses, then on selection pull just the structured fields (`postalCode`, `route`, `streetNumber`, `subpremise`, `locality`).
- Restrict autocomplete with `componentRestrictions: { country: 'ca' }` and bias toward a center point in Waterloo Region.
- Free tier covers ~10k requests/month, then ~$2.83 per 1000 autocomplete sessions. Hummi v1 will not hit paid tier.

### Runner-up: Canada Post AddressComplete
- Most accurate Canada-specific lookups, but the JS widget is older and pricing starts at ~CA$40/mo for the cheapest tier. Skip unless you find Google's Canadian address corpus has gaps for new builds in Cambridge/Guelph (unlikely).

### Why not free OSM (Nominatim, Photon, Geoapify)
Slower, missing many recent residential addresses, generous-but-limited free tiers. For a paid booking flow, address typos = lost revenue. The 95th-percentile address lookup needs to be high quality. Google wins.

### Do not use
- **MapBox Search** — fine, but Google's Canada residential data is better than MapBox's in Ontario suburbia.
- **HERE API** — overkill, not better than Google here.
- **Trusting client-side postal code regex alone** — `[A-Z]\d[A-Z]\d\d[A-Z]` matches valid format but says nothing about coverage.

### Coverage table schema (preview, not the schema research)
```
coverage_postal_codes
  fsa text primary key       -- "N2L"
  region text not null        -- "Waterloo"
  active boolean default true -- toggleable from admin
  created_at timestamptz
```
Admin panel CRUDs this. Edge Function or RLS-readable view exposes only `active=true` rows to anon clients for instant client-side preview.

---

## 11. Maps (optional)

**Verdict:** **Don't ship a map in v1.** Cleaning customers don't need to see their visit on a map. Don't add MapBox or Google Maps JS as a runtime dep unless and until you build the cleaner-app (which is explicitly out of scope per PROJECT.md).

If you ever want a static map thumbnail of the property (post-MVP), use **Mapbox Static Images API** — single `<img src>` URL, zero JS bundle cost.

---

## 12. Admin Panel Approach

**Pick:** **Build the admin panel inside the same Vite app under `/admin/*` routes.**

### Why
- One codebase, one deploy, one auth system. The admin "is just another logged-in user with `role='admin'`" — RLS policies do the heavy lifting.
- Reuses every component, type, and Supabase query already built for the customer side. The admin's "visit detail" view is 80% the same component as the customer's "visit detail" view.
- Vite code-splits the admin route automatically (via `lazy()` + Suspense or React Router's `lazy` loaders), so anon visitors never download admin JS.

### Why not Refine / React Admin / Retool / Supabase Studio
| Tool | Why not |
|---|---|
| **Refine** | A whole second framework on top of React Query + your routing. You'd be learning Refine instead of shipping. |
| **React Admin** | Heavy (300kb+), opinionated UI clashes with Bootstrap, MUI peer dep. |
| **Retool** | Vendor lock-in, monthly per-seat cost, separate codebase, deploys via clicks not git. |
| **Supabase Studio** | Great for raw table editing during dev, never customer-facing. Not a real admin panel — no domain UI (assign cleaner, mark "on the way"). |

### Auth & RLS for admin
- Single `profiles` table with `role` enum (`customer | admin | crew_lead`).
- RLS policies on every table: `using (auth.uid() = customer_id OR (select role from profiles where id = auth.uid()) = 'admin')`.
- `/admin/*` routes have a `loader` that throws redirect if the user's role isn't admin. Belt and suspenders with RLS.

### Layout
- Separate `<AdminLayout>` (no marketing nav, sidebar with admin sections) rendered inside `/admin` parent route.
- Don't share the customer's `<Layout>` — they're different products visually.

---

## 13. Background Jobs / Scheduled Emails

**Pick:** **Supabase Edge Functions invoked by `pg_cron`** (Supabase Scheduled Functions)

### Why
- Already in the Supabase platform. No new vendor, no new bill, no new SDK.
- `pg_cron` schedules a Postgres function that calls `net.http_post` to an Edge Function URL, passing the current time. The Edge Function queries `visits` for any visit scheduled `now() + 24 hours BETWEEN scheduled_at AND scheduled_at + 5 minutes` and sends a reminder email/SMS, marking `reminder_sent_at = now()`.
- Idempotency is enforced by the `reminder_sent_at IS NULL` guard.
- Run frequency: every 5 minutes for the reminder cron is more than enough granularity for a 24h reminder.

### Jobs Hummi needs (v1)
| Job | Schedule | Action |
|---|---|---|
| 24h reminder | every 5 min | Send email/SMS for any visit between 24h and 24h5min from now |
| "Visit due to start" alert (admin internal) | every 5 min | Notify admin (Slack webhook? or just dashboard count) |
| Review request | every hour | For visits `completed_at < now() - 24h AND review_requested_at IS NULL` send review email |
| Stripe Subscription renewal heads-up | daily | For subs renewing in 7 days, send "your card will be charged" email |
| Stale-card cleanup | weekly | Sweep expired payment methods, email user to update |

### Runner-up: Inngest
- Inngest is genuinely lovely (event-driven, durable workflows, typed) but is a separate vendor with a separate dashboard and free tier limits. The Hummi job set is tiny and entirely cron-shaped. **Adopt Inngest only if** you start needing fan-out, retries with delays, or multi-step durable workflows (e.g. "wait 24h, then if no review, send second reminder").
- **Trigger.dev** is similar; same verdict.
- **QStash (Upstash)** — cheap and simple HTTP scheduler, but adds a vendor. Use only if Supabase `pg_cron` has a latency or reliability issue (it won't at v1 scale).

### Stripe webhooks (specifically)
- Stripe webhooks → Supabase Edge Function `stripe-webhook` → verify signature with `STRIPE_WEBHOOK_SECRET` → switch on `event.type` → write to `payments` and `subscriptions` tables.
- **Always 200 fast.** If you need long work, enqueue a row in a `webhook_jobs` table and process it from a `pg_cron`-driven worker.

### Do not use
- **Vercel Cron** — works, but lives in a separate `vercel.json` and runs in Vercel functions, splitting your backend code between Vercel and Supabase. Keep all backend code in Supabase Edge Functions.
- **GitHub Actions schedules** — possible, ugly, never do this for production.

---

## 14. Observability

**Pick:** **Sentry** (`@sentry/react ^8.x`) + **Vercel Web Analytics** (free, already available).

### Why Sentry
- Standard for SPAs, source-map upload integrates with Vite via `@sentry/vite-plugin` in the build.
- Browser SDK + Supabase Edge Functions SDK both exist → end-to-end traces from a button click to a Stripe error.
- Free Developer tier (5k errors/month) is plenty for Hummi v1.
- Performance monitoring catches slow Edge Functions and slow React renders that you'd never see otherwise.

### Why Vercel Web Analytics (plus optional PostHog)
- Web Analytics is free, privacy-friendly, page-view + Core Web Vitals only. Add the `@vercel/analytics` package (`^1.x`) — single component drop-in.
- **Optional v1.1:** `posthog-js` (`^1.x`) for product analytics (funnel: landing → signup → first paid visit). Free tier 1M events/month. Skip for v1 if you're cost-conscious; add later.

### Do not use
- **Datadog RUM** — overkill cost.
- **LogRocket / FullStory** — session replay is a privacy minefield with payment forms. Skip.
- **`console.log` to nothing** — Sentry replaces this. Wire it in phase 1.

---

## 15. Testing

**Pick (unit/integration):**
- **Vitest** (`^2.x`) — Vite-native, faster than Jest, same `expect` API.
- **Testing Library** (`@testing-library/react ^16.x`, `@testing-library/user-event ^14.x`, `@testing-library/jest-dom ^6.x`).
- **MSW** (`msw ^2.x`) for mocking Supabase REST and Stripe Elements at the network layer.

**Pick (E2E):** **Playwright** (`@playwright/test ^1.49.x`)
- Runs against a Vercel preview deployment in CI.
- Test the three critical flows: signup-with-coverage-check, one-shot booking with Stripe test card, customer cancel-and-refund.

### Why
- Vitest reuses Vite's transformer → tests are 3-5x faster than Jest + Babel. No config drift.
- MSW v2 works in jsdom and Node, mocks `fetch` (which Supabase uses under the hood). Easier than mocking the Supabase client directly.
- Playwright > Cypress for new builds in 2026: parallel by default, better tracing, multi-browser, free.

### Approach
- **No 100% coverage goal.** Test critical paths (auth, booking, payment confirm, webhook idempotency).
- **Stripe testing:** Use Stripe test cards (`4242 4242 4242 4242` and the 3DS variants) in Playwright. Stripe provides a CLI to forward webhooks to your local dev → use it for local Edge Function dev.
- **Supabase testing:** local Supabase via `supabase start` (Docker), or a dedicated staging project. Don't run tests against production.

### Do not use
- **Jest** — slower, more config, no Vite alignment.
- **Cypress** — fine, but Playwright is strictly better now.
- **Storybook for v1** — over-investment; reconsider in v2 if the design system grows.

---

## 16. Misc Utilities

| Lib | Version | Why |
|---|---|---|
| `clsx` | `^2.1.x` | Class joining. Tiny. |
| `nanoid` | `^5.x` | Stripe idempotency keys, ad-hoc IDs. |
| `react-error-boundary` | `^5.x` | Wraps the router for graceful error fallbacks. Sentry integrates. |
| `react-helmet-async` | `^2.x` | If you need per-page `<title>` / OG tags. Only if SEO matters for the marketing pages (it does). |
| `@vercel/analytics` | `^1.x` | Drop-in. |
| `@vercel/speed-insights` | `^1.x` | Drop-in. |

### Things explicitly NOT to add
- **Lodash / Underscore** — modern JS covers it.
- **Axios** — `fetch` (with `@tanstack/react-query`) is enough.
- **`uuid`** — `nanoid` or `crypto.randomUUID()` is smaller.
- **Bootstrap JS (the jQuery bundle)** — you already use only the grid CSS; never load the JS.
- **jQuery** — should not be in the tree. Audit and remove if any FreshFlow section snuck it in.
- **Internationalization libs (`react-i18next`, `next-intl`)** — English-only per PROJECT.md.

---

## 17. Supabase-Specific Tooling

Worth calling out because Hummi is "all in" on Supabase:

| Tool | Use |
|---|---|
| **Supabase CLI** (`supabase` global) | Local dev (`supabase start`), migrations (`supabase migration new`), function deploy (`supabase functions deploy`). **Add it as a `devDependency` via `npx supabase`** so the team isn't fighting global installs. |
| **`supabase gen types typescript`** | Generates types from your schema → import as `Database` in `createClient<Database>()`. Run on every migration. Add as `npm run db:types` script. |
| **Database migrations** | Version-controlled in `/supabase/migrations/`. **Never edit the schema from the dashboard in prod.** |
| **RLS policies** | Required on every table. Default deny. Tested with Supabase's `pgtap` if you get serious. |
| **Edge Functions** | Deno runtime. Use `npm:` specifiers (`import Stripe from 'npm:stripe@^17'`) for npm packages. |

---

## Quality Gate Self-Check

- [x] Versions are current — taken from training-data cutoff (Jan 2026, ~4mo gap from working date 2026-05-14). Confidence levels per row. **External verification was attempted via Context7 and npm registry but those tools were unavailable in this session. Engineer should run `npm view <pkg> version` before installing.**
- [x] Rationale is project-specific — every recommendation cites the Hummi flow (booking, coverage check, Stripe Customer Portal, Supabase Edge Function for SMS, Ontario timezone) rather than generic "best practice."
- [x] Confidence levels assigned — see table column.
- [x] Explicit "do not use" list — included per category and a consolidated list in §16.

---

## Open Questions / Flags for Phase Planning

1. **Zod v3 vs v4** — Engineer must confirm `@hookform/resolvers` v3 vs v4 compat at install time. If `@hookform/resolvers` ships v4 support by 2026-05, prefer Zod 4.
2. **Stripe Tax (Canada GST/HST)** — out of explicit research scope here, but Hummi will need it before launching. Enable **Stripe Tax** in dashboard, register for Ontario HST collection, set product tax codes on services. Flag for the **Payments** dimension research.
3. **Google Places billing key management** — needs a `VITE_GOOGLE_PLACES_KEY` (browser-safe, restricted by HTTP referrer in Google Cloud Console). Don't ship the unrestricted key.
4. **Phone number format** — Supabase phone auth expects E.164 (`+15195551234`). Build a small input component using `react-phone-number-input` (`^3.x`) OR enforce E.164 with Zod and accept Canadian-only formatting. **Recommend `react-phone-number-input`** for v1 UX.
5. **Customer Portal session URL** — generated per-request from an Edge Function; cache locally for 5 minutes per user to avoid hammering Stripe.

---

*Stack research: 2026-05-14. Companion docs: ARCHITECTURE.md, FEATURES.md, PITFALLS.md (research dimension).*
