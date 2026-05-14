# FEATURES — Competitive Landscape & Scope

**Research dimension:** Features
**Project:** Hummi — residential cleaning booking platform (KW / Cambridge / Guelph, Ontario)
**Milestone context:** Subsequent (brownfield) — visual template exists, no business logic
**Last updated:** 2026-05-14

---

## How to read this document

- **Table stakes** = if you don't ship this in v1, conversion and retention break visibly. The cleaning customer expects it because every competitor offers it.
- **Differentiators** = realistic wedges for a small/medium Ontario operator. Picked for ROI vs build cost, not for being flashy.
- **Anti-features** = explicitly out of v1 (and probably v2). Either solved by adjacent channels (WhatsApp, phone) or only justifiable at 10×–100× current volume.
- **Complexity:** S = ≤2 days of focused work, M = 3–8 days, L = >8 days or spans backend + frontend + ops policy.
- **Dependencies** are the *other features in this doc* a given feature needs to exist first.

Competitors referenced throughout:
- **Tidy (tidy.com)** — US tech-forward platform, recurring-first, app-style booking.
- **Handy (handy.com)** — large marketplace, instant booking, aggressive recurring discounts.
- **Homeaglow (homeaglow.com)** — heavy growth via $19 first-clean promo, recurring lock-in.
- **MaidPro (maidpro.com)** — franchise, room-by-room "49-point checklist", quote-by-phone or by sqft form.
- **Molly Maid Canada (mollymaid.ca)** — franchise, Ontario presence, "Get a free estimate" form rather than instant quote, no online payment in many locations.
- **Merry Maids Canada (merrymaids.ca)** — franchise, callback-based quoting, similar pattern to Molly Maid.
- **The Maids (themaids.com / .ca)** — team-based service, "22-step cleaning process" trust signal.
- **Regional Ontario operators** — Custom Maids, AspenClean (Vancouver/Toronto, eco-positioned), Maid in Waterloo, Sparkly Maid (Toronto). Mostly form-based estimates, callback-driven, light online payment.

---

## 1. Onboarding & signup flow

### Table stakes

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Email + password signup | S | — | Supabase Auth default. Already on roadmap. |
| Google OAuth one-click | S | Email signup | Cuts ~20–30% of dropoff at signup vs email-only (industry well-known). Tidy and Handy both offer it. |
| SMS OTP for phone verification | M | Email signup | Required because phone is the channel for "on the way" + reminders. Twilio Verify works out of the box. Defer until *after* first booking attempt if it adds friction at top of funnel — see "delayed verification" below. |
| Password reset by email | S | Email signup | Supabase Auth covers this. |
| **Quote-before-signup** | M | Pricing engine, postal-code check | Critical pattern. Tidy, Handy, Homeaglow all let you see the price before creating an account. MaidPro and Molly Maid don't — and lose conversions. **Hummi should follow Tidy/Handy.** Collect address + property attributes first, show price, *then* ask for the account at the "confirm booking" step. |
| Postal-code gate at landing | S | Coverage zone management | Surface "Do we serve your area?" early. Homeaglow does this brutally well (single ZIP field on landing hero). Prevents wasted signups outside KW/Cambridge/Guelph. |

### Differentiators

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| **Delayed phone verification** | S | SMS OTP | Don't force OTP at signup — do it *after* the user picks a date/time. They're now committed. Reduces top-of-funnel drop. |
| Magic-link sign-in for returning users | S | Email signup | Supabase supports it natively. Reduces "forgot password" calls — common headache for non-technical demo (cleaning customers skew 35–65 y/o female). |
| Apple Sign-In | M | Email signup | Only if iOS share of traffic is high. Defer until analytics support it. |

### Anti-features (DO NOT BUILD in v1)

- **Magic-link as the *only* signin method.** Confuses non-technical users — they expect a password field. Tidy tried "passwordless" and walked it back.
- **Mandatory SMS OTP before showing pricing.** This is the #1 conversion killer in this category. Most regional Canadian operators that gate the quote behind a form are losing here.
- **Social signups beyond Google.** Facebook signup is increasingly distrusted (privacy concerns) and 35–55 demo has Facebook fatigue.
- **Phone number as the username.** Some Latin American platforms do this. Wrong fit for English Ontario customers.

---

## 2. Property profile depth

### Table stakes

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Street address + unit number | S | — | Required for crew dispatch. Use Google Places autocomplete if budget allows; if not, plain form is fine. |
| Postal code (validated against coverage list) | S | Coverage zone management | The gate. Reject N6 (London) before they invest more time. |
| Bedrooms count | S | — | Universal pricing dimension. 1/2/3/4/5+. |
| Bathrooms count (full + half) | S | — | Universal. Half-baths matter — they're ~half the time of a full bath. Tidy and MaidPro both split this. |
| Approx. square footage (range, not exact) | S | — | Better as ranges (<1000 / 1000–1500 / 1500–2000 / 2000–2500 / 2500–3000 / 3000+ sqft) — exact sqft is annoying to look up. Homeaglow uses ranges. |
| Property type (house / condo / apartment / townhouse) | S | — | Affects access, parking, and time estimate. |
| Pets in home (none / dog / cat / both / other) | S | — | Trust signal *and* dispatch info. Cleaners need to know. MaidPro asks this on every booking. |
| Multiple properties per customer | M | Auth | Already in scope. Stripe customer can have N addresses. Critical for landlords / Airbnb hosts — a high-LTV segment. |
| Edit / delete saved property | S | Multiple properties | Standard CRUD. |

### Differentiators

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Parking details (free street / driveway / paid / "we'll let you know") | S | Address | Real KW/Cambridge problem — winter parking, permit zones in Uptown Waterloo. Cleaners hate parking surprises. Worth a dedicated field. |
| Key access / entry instructions | M | Property profile | Free-text + structured ("we'll be home" / "key in lockbox CODE" / "doorman" / "garage code"). Critical for recurring + Airbnb hosts. Sensitive — store encrypted at rest. |
| Special instructions per visit *and* per property | S | Property profile | Two scopes: persistent ("dog is friendly, lives in laundry room") vs one-off ("skip the office today, husband working from home"). |
| Photos of the property (optional) | M | Property profile, Supabase Storage | Lets the customer upload 2–3 pics. Cleaners arrive informed. Not on Tidy/Handy yet — small operator differentiator. |
| Hazard / preference flags (heavy mold, hoarding situation, scent sensitivity, eco products only) | S | Property profile | Self-disclosure. Hoarding/biohazard should *block* booking and route to manual review — protects crew safety. |
| Allergies / cleaning product preferences | S | Property profile | "Fragrance-free" "no bleach" "pet-safe only". Pairs well with eco-friendly differentiator below. |

### Anti-features

- **Full floor-plan upload.** Cute, useless. Cleaners don't read floor plans.
- **Exact square footage required.** Most Ontario homeowners don't know their exact sqft. Ranges are enough.
- **Photo uploads as a *required* step.** Optional only — required photos kill conversion.
- **Smart-lock integrations (August, Schlage Encode).** Way too niche for a small operator. Maybe v3+.

---

## 3. Service catalog

### Table stakes (ship all five in v1)

| Service | Naming | Complexity to build | Notes |
|---|---|---|---|
| **Standard Cleaning** | "Standard Clean" or "Regular Clean" | S | Default. Lowest price. Assumes the home is in normal condition. |
| **Deep Cleaning** | "Deep Clean" | S | ~1.5–2× standard price. First-time customers usually need this. Tidy and Handy *recommend* it for the first visit by default. |
| **Move-In / Move-Out** | "Move-In / Move-Out Clean" | S | Empty house. 2–3× standard. Often includes inside-cabinets and inside-fridge. |
| **Post-Construction Clean** | "Post-Construction Clean" | M | Specialty. Heavy dust, drywall residue. 2–3× standard *minimum*. Many operators decline these — Hummi should *gate* via admin approval before charging. |
| **Recurring** (Weekly / Bi-weekly / Monthly) | "Recurring Clean" | S | Cadence picker on top of Standard. Same SKU, schedule wrapper. Tidy is recurring-first. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Add-ons à la carte** (inside fridge, inside oven, inside cabinets, interior windows, laundry/folding, dishes) | M | High margin. Homeaglow and Tidy both push these hard at checkout. Typical pricing: $20–$50 each. **Strong differentiator vs Molly Maid's "call to add"**. |
| **Eco-friendly product upgrade** | S | $10–$15 upsell or "always included" depending on positioning. AspenClean built a brand on this. KW demographic (university town, young families) responds well. |
| **First-time customer "Deep Clean" auto-suggest** | S | If property has never been cleaned by Hummi, default the service to Deep with a "Why?" tooltip. Honest pricing → fewer "this took longer than expected" disputes. |

### Anti-features

- **Commercial / office cleaning.** Already in PROJECT.md out-of-scope. Different sales motion, different insurance.
- **Carpet shampooing, window-washing exteriors, pressure-washing, eaves cleaning.** Equipment-heavy, different crew skillset. Subcontract or refuse.
- **One-off "handyman" tasks bundled in.** Handy started here and the marketplace got messy. Stay focused on cleaning.
- **Hourly-only services with no scope cap.** Trap — every cleaner takes 8 hours.

---

## 4. Pricing model

### Industry reality

There's no single right answer. Three live patterns in cleaning:

1. **Flat rate by bedrooms + bathrooms** (Tidy, Handy, Homeaglow). Easiest to display, easiest for the customer to understand. Ignores sqft.
2. **By square footage** (MaidPro, some regionals). More precise but requires the customer to know their sqft.
3. **Hourly with a minimum** (some Ontario regionals, e.g. some Toronto operators). Customer pays for X hours, cleaner stays X hours. Honest but the customer dislikes uncertainty.

### Recommendation for Hummi

**Hybrid: bedrooms × bathrooms × sqft band × service type, displayed as a single flat price.** PROJECT.md already commits to "calcular precio por propiedad". The pricing engine should:

| Input | Effect |
|---|---|
| Service type (Standard / Deep / Move / Post-Construction) | Base multiplier (1.0× / 1.6× / 2.2× / 2.8× — tune from operator data) |
| Bedrooms | +$X per bedroom above 2 |
| Bathrooms | +$Y per full, +$Y/2 per half |
| Sqft band | Tier modifier (<1000 = base, then +5–10% per band) |
| Add-ons | Fixed $ each |
| Recurring discount | -10% bi-weekly, -15% weekly (industry standard, see §6) |
| HST (Ontario 13%) | Added on top of subtotal at display time, *always shown* before payment |

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Server-side pricing function (Supabase Edge Function or SQL function) | M | Property profile, Service catalog | Single source of truth. Frontend *displays* price by calling this. Never compute on the client and trust it. |
| Admin-configurable pricing rules (base rates, multipliers, sqft bands) | L | Pricing function, Admin auth | Operator must tune without a deploy. Build a simple "Pricing Rules" admin page. |
| Promo codes / discount codes | M | Pricing function | Defer to v1.5 if tight. Stripe Coupons handle the payment side; you still need a UI input. |
| Show HST separately on quote and invoice | S | Pricing function | Canadian compliance basics. Don't bundle into "$X total" only — itemize subtotal + HST + total. |
| Show estimated price *before* signup | S | Pricing function | See §1. Critical. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Transparent pricing calculator on landing page** | S | Public, no login. The customer plays with bedrooms/bathrooms/sqft and sees a live price. Tidy does this. MaidPro doesn't. Huge trust signal — "no hidden fees." |
| **Bundle discount math shown inline** | S | When the customer toggles "make this recurring bi-weekly", show "Save $X per visit" in real time. Tidy and Handy both highlight this. |
| **Price-lock guarantee for recurring customers** | S | "Your weekly rate is locked for 12 months." Calms re-pricing anxiety. Tidy offers this implicitly. |

### Anti-features

- **Per-hour with no maximum.** Customer hates the uncertainty.
- **"Call for quote" forms.** This is what Molly Maid / Merry Maids do, and it's exactly the gap Hummi is exploiting.
- **Surge pricing.** Cleaning isn't Uber. Customers will revolt.
- **Dynamic AI pricing.** Save for after 1000 jobs of data. v1 = rules engine.

---

## 5. Booking flow steps

### Recommended canonical flow (mirrors Tidy + Homeaglow)

1. **Postal code / address** (gate) →
2. **Property attributes** (bedrooms, bathrooms, sqft, pets) →
3. **Service type** (default Standard; first-time gets Deep auto-suggested) →
4. **Add-ons** →
5. **Frequency** (one-time / weekly / bi-weekly / monthly) — also surfaces Package option →
6. **Date + time-window** picker →
7. **Account creation** (email + Google OAuth) →
8. **Phone verification** (SMS OTP) →
9. **Special instructions / key access** →
10. **Payment** (Stripe) →
11. **Confirmation**

### Table stakes

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Calendar date picker with availability | M | Admin coverage capacity | Show only dates the crew has capacity. Greyed-out unavailable days. Tidy and Handy do this. Block dates by zone (no Guelph capacity Friday). |
| **Time *windows*, not exact times** | S | Calendar | Industry standard: 2–3 hour arrival windows (e.g. 8–10am, 10am–12pm, 12–2pm). Cleaners run late from a previous job — exact times cause disputes. Tidy, Handy, MaidPro all use windows. |
| Recurring schedule (every 1 / 2 / 4 weeks, same weekday + window) | M | One-shot booking, Subscription billing | Default to same day-of-week + same window. Customer can shift later. |
| Skip / reschedule a single occurrence | M | Recurring schedule, Cancel policy | Critical for recurring retention. "Skip this week" button. Tidy's killer feature. |
| Save card and reuse for future bookings | S | Stripe | Stripe Customer + PaymentMethod. Standard. |
| Address confirmation + map preview before checkout | S | Property profile | Reduces wrong-address bookings. Static Google Maps embed is enough. |
| Order summary panel sticky on right side of flow | S | — | Tidy, Handy, Homeaglow all do this. Customer sees total continuously. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Booking flow saves progress (resumable)** | M | Auth | If a user abandons mid-flow, email them a "complete your booking" link 1 hour later. Recovers 5–15% of dropouts. Homeaglow does this heavily. |
| **Single-page accordion flow on mobile** | S | — | Better mobile UX than a multi-page wizard. Bookings happen on phones (60%+ of cleaning traffic). |
| Estimated visit duration shown ("~2.5 hours") | S | Pricing engine | Sets expectations. Reduces "they were only there 90 minutes!" complaints. |

### Anti-features

- **"Instant" booking with no admin review for *first-time* customers.** Allows fraud / no-shows / mismatched-scope bookings. PROJECT.md already commits to manual crew assignment — keep it that way for v1. Auto-assign comes later.
- **Exact-time arrivals.** Operationally impossible. Even MaidPro uses windows.
- **30-step wizards** (looking at you, Servpro). 10 screens is too many. Aim for ≤6 screens / ≤90 seconds to first booked.
- **Forced account creation on step 1.** Quote first. Always.

---

## 6. Package & subscription models

### Industry patterns

| Model | Who does it | Typical discount | Customer mental model |
|---|---|---|---|
| One-time only | All | 0% | "I just need it once." |
| Prepaid bundle (4 or 8 visits) | MaidPro, some regionals | 5–10% off vs one-time | "I'll save a bit and lock in a few visits." |
| Recurring schedule, charged per visit | Tidy, Handy, Homeaglow (the default) | 10–20% off | "I want this on autopilot but I'm not committing to a year." |
| Monthly subscription (N visits/mo flat fee) | Less common; some boutique services | 15–20% off | "I want a fixed monthly bill." |
| Annual prepay | Rare | 20–25% off | "I'm a heavy user and want max savings." |

### Table stakes for Hummi v1 (already in PROJECT.md)

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| **One-shot booking** | M | Pricing, Stripe Checkout | Already scoped. |
| **Prepaid package of N visits** | L | Pricing, Stripe Payment Intent, Booking engine | Customer pays the full amount upfront, system tracks remaining visit count, each scheduled visit decrements. Edge cases below. |
| **Monthly subscription (N services / mo)** | L | Stripe Subscriptions, Pricing, Booking engine | Stripe charges monthly. Customer schedules N visits within the billing cycle. **Unused visits expire each cycle** (industry standard — communicate clearly). |
| Pause subscription | M | Subscription | "Pause for 1 month" — Stripe supports pausing the price, your scheduling logic just skips the cycle. |
| Cancel subscription | S | Subscription | One-click in Stripe Customer Portal. |
| "X visits remaining" badge in dashboard | S | Package, Subscription | Critical UX. |
| Auto-renewal toggle (subscription) | S | Subscription | Default on, but customer can toggle off. Required for trust. |
| Renewal-soon email (3 days before next charge) | S | Email | Reduces chargebacks. PROJECT.md mentions it. |

### Common pitfalls (avoid these)

| Pitfall | Mitigation |
|---|---|
| Customers don't understand "package expiry" | Make packages **non-expiring** for v1 (a competitive edge vs operators that auto-expire after 6 months). Or set a generous 12-month expiry — and email reminders at 60/30/14 days. |
| Subscription customer takes a 3-week vacation, "wastes" a month's visits | Allow **pause** (above) and/or "carry over 1 unused visit." Document the policy. |
| Customer thinks they bought a package but actually subscribed (or vice versa) | Show big, plain-English summary on the checkout step: "You are buying: 4 visits, paid today, $X total." vs "You are subscribing: $X/month, 2 visits per month, cancel anytime." |
| Discount stacking confusion | Decide one rule: recurring discount XOR promo code, *not* both. Document. |
| Refund of a partially-used package | Pro-rate at the *one-time price* of visits already used, refund the rest. Hardest billing edge case — see §12. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Gift packages** ("Buy 4 visits as a gift") | M | Package + Stripe | Big in Q4 (Christmas) for cleaning services. AspenClean and some regional operators offer this. Real revenue at low cost. |
| **Referral credit** (see §13) — applied as visit credit | M | Package billing | "Refer a friend, get $50 credit." |
| Family/household sharing of a package | L | Auth, Multi-property | Defer past v1. Adds permission complexity. |

### Anti-features

- **Annual contracts with cancellation penalties.** This is a Comcast move. Customers run.
- **Gym-style "you must cancel 90 days in advance" terms.** Reputation killer.
- **More than 3 plan tiers.** Decision paralysis. One-shot / package / monthly subscription is plenty.

---

## 7. Cancellation & reschedule policies

### Industry norms

| Operator | Cancel window | Fee |
|---|---|---|
| Tidy | 24h before | $25–$50 cancel fee inside window; rescheduling free outside window |
| Handy | 24h before | $15–$25 fee, sometimes a full charge for late cancel |
| Homeaglow | 24h before | Charges roughly half the visit fee for <24h cancel |
| MaidPro | 24–48h before (franchise-dependent) | Varies by location, sometimes a flat fee |
| Molly Maid | 48h before | Typical $50 lockout/cancellation fee |

### Recommendation for Hummi v1

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| **Reschedule >24h before**: free, unlimited | S | Booking, Calendar | Standard. Reduces cancellations because the customer just moves the visit. |
| **Cancel >24h before**: free (or full credit to next visit) | S | Booking | Easy refund / no refund needed if not yet charged. |
| **Cancel / reschedule <24h before**: 50% fee OR forfeit one package visit | M | Booking, Stripe charges | Charge the saved card. Industry standard. Critical for crew compensation. |
| **No-show (cleaner arrives, can't enter)**: 100% fee | M | Admin marks no-show | Same logic. |
| Admin override (waive fee on a case-by-case basis) | S | Admin panel | Required — customer service tool. |
| Policy displayed at booking time | S | Booking | Reduces disputes. Pre-checked acknowledgment box. |
| Email + SMS confirmation of cancellation | S | Notifications | Sets expectations. |
| Reschedule self-service from dashboard | M | Dashboard, Calendar | Table stakes. Tidy, Handy, Homeaglow all have it. |

### Anti-features

- **No cancellation allowed online ("call us").** Modern customers reject this. Molly Maid's "call to cancel" is a friction point Hummi can beat.
- **Different policies per service type with no clear logic.** Pick one. Maybe one exception: Post-Construction has 72h policy.
- **Auto-rebook a cancelled recurring visit "next available slot" without asking.** Confuses customers.

---

## 8. Customer dashboard

### What customers *actually* look at (in observed order of click frequency, per published Tidy / Handy UX research)

1. "When's my next visit?" (next visit card, prominent)
2. "I need to cancel/reschedule this" (action on next visit)
3. "Did I get charged?" (invoices / payment history)
4. "Update my card" (payment methods)
5. "Book another one like the last one" (rebook past visit)
6. "How many visits do I have left?" (package/subscription status)
7. "Where's my receipt for [whatever date]?" (invoice download)

### Table stakes

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| **Next visit hero card** | S | Booking | Date, time window, address, crew (if assigned), CTA: reschedule / cancel / add instructions. |
| **Upcoming visits list** | S | Booking | All future visits beyond the next one. |
| **Past visits list** | S | Booking | Date, service, total, status (completed / no-show / cancelled). |
| **Rebook this visit** button on past visits | S | Booking flow | Pre-fills the booking form with that visit's settings. Huge for retention. Tidy has it. |
| **Payment methods (list, add, remove, set default)** | M | Stripe | Use Stripe Customer Portal *if possible* — saves UI work. Stripe-hosted, PCI-compliant. |
| **Invoices / receipts (list + download PDF)** | M | Stripe | Stripe issues these automatically. Surface the hosted invoice URL in the dashboard. |
| **Subscription / package status** | S | Subscription, Package | "4 of 8 visits remaining, expires 2026-11-14" / "Subscription: 2 visits/mo, next charge May 30." |
| **Properties list (add / edit / delete)** | M | Property profile | Already in scope. |
| **Profile** (name, email, phone, password change) | S | Auth | Standard. |
| **Notification preferences** | S | Notifications | At least email opt-in/out for marketing (legally required in Canada — CASL). SMS toggle for non-urgent messages. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **"Add a tip" on past visit** | M | Stripe | Cleaners care. Customers want to tip post-service when they were happy. Stripe supports adding charges to a customer. |
| **Leave instructions for the next visit** (from dashboard, not just at booking) | S | Booking, Notifications | Sticky note. Visible to the crew assignment view. |
| **Refer a friend tile** | M | Referral program (see §13) | One-tap share link with prefilled code. |
| **Service review / rating after visit** | M | Notifications, Admin | Post-service email + dashboard prompt. Internal use only in v1 (PROJECT.md out-of-scope: public reviews). Still valuable as ops data. |
| **Re-quote a property** when sqft or rooms change | S | Pricing | Customer who renovated wants a new price without rebooking. |

### Anti-features

- **Real-time GPS map of the crew.** PROJECT.md already says no — agree. Expensive (Mapbox or Google fees), creepy, and doesn't solve a real problem at small scale.
- **In-dashboard chat with the cleaner.** SMS/phone is fine. Chat creates 24/7 expectations.
- **Gamification / loyalty points / badges.** Cleaning isn't candy crush.
- **Multi-language toggle.** Out of scope per PROJECT.md.

---

## 9. Trust & safety signals

### Where they appear

- **Landing page hero** — short trust line
- **Booking flow checkout step** — final reassurance before payment
- **Footer** — badges + insurance info
- **Email confirmations** — reinforce post-purchase
- **About / FAQ pages** — long-form

### Table stakes

| Signal | Complexity | Notes |
|---|---|---|
| "Insured & bonded" copy + badge | S (copy only) | Real insurance must back it up. Molly Maid, MaidPro, Merry Maids all lead with this. Required trust signal in Ontario. |
| Background-checked crew copy | S | "All cleaners are background-checked." Standard. The Maids leans hard on this. |
| Satisfaction guarantee | S | "If you're not happy, we'll come back free within 24h." Tidy, Handy, MaidPro, The Maids all offer this. Industry standard. **Hummi should ship this in v1.** |
| Star rating / count on landing | S | "4.9 stars from 1,200+ KW homes." Even if v1 has fewer, surface what you've got honestly. |
| Photos of real crews (not stock) | S | Stock photos are obvious and hurt trust. Cleaning is hyper-local — show actual KW team. |
| Customer testimonials (text + name + neighborhood) | S | "Sarah from Uptown Waterloo — Bi-weekly customer." Neighborhood-specific resonates locally. |
| Privacy policy + Terms of service pages | S | CASL + PIPEDA compliance for Canada. Plain-English versions linked in footer. |
| SSL / HTTPS lock | S | Vercel default. Don't overlook. |

### Differentiators

| Signal | Complexity | Notes |
|---|---|---|
| **Before/after photo gallery** | M | Storage, Admin tooling | Real evidence beats testimonials. Operator uploads weekly. Adjacent to property-photo feature in §2. |
| **"Same cleaner each visit" promise** for recurring customers | M | Admin scheduling | Tidy's signature. Customers love crew continuity. Operationally hard, but a real differentiator. |
| **Crew bio cards** (first name, photo, years with Hummi) shown after assignment | S | Admin | Personal, demystifies "who's coming into my house." MaidPro does this in some markets. |
| **Live "team in your neighborhood today" widget** | M | Booking, Geo | "We have a crew in Kitchener N2A on Tuesday." Builds urgency + relevance. |
| **Local-press / community-board mentions** | S (copy only) | Cheap, KW-area. "As seen in Waterloo Region Record" if true. |

### Anti-features

- **Fake reviews / generated testimonials.** Beyond the legal risk (Canadian Competition Bureau cracks down), customers detect this fast. Never.
- **"Trusted by 10,000+ customers" when you have 50.** Honest small numbers > inflated numbers.
- **Generic "We're the best!" copy with no specifics.** "Trusted by Waterloo families since 2025" > "We're the best cleaning company."

---

## 10. Communication touchpoints (email + SMS)

### The cadence that works (table stakes)

| Event | Email? | SMS? | Notes |
|---|---|---|---|
| Account created | ✓ welcome | — | Set expectations. CASL-compliant single opt-in. |
| Booking confirmed / payment received | ✓ confirmation w/ details | ✓ short confirm | "Your clean is confirmed for Thu May 28, 10am–12pm window." |
| 48h before visit | — | — | (Optional — skip if you have 24h) |
| **24h before visit** | ✓ reminder | ✓ reminder | Industry standard. Tidy, Handy, MaidPro all do this. |
| **Crew on the way** (~30–60 min before arrival) | — | ✓ "Your crew is on the way, ETA ~30 min" | Admin or crew triggers this manually in v1. |
| **Post-service** (1–2h after completion) | ✓ "How did we do?" + review prompt + receipt | — | Capture rating, prompt re-book. |
| **Renewal reminder** (subscription) — 3 days before charge | ✓ | — | Reduces chargebacks. |
| **Payment failed** | ✓ + retry link | ✓ short alert | See §12. |
| Cancellation by customer | ✓ confirm | ✓ confirm | Receipt of the cancellation. |
| Reschedule by customer | ✓ confirm | ✓ confirm | New date/time. |
| Cancellation by Hummi (rare) | ✓ | ✓ + apology | Operator-initiated, e.g. weather. |
| Marketing / promo | ✓ (with explicit CASL opt-in) | — | Quarterly max. |

### Table stakes complexity

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| Transactional email provider integration (Resend / Postmark) | M | — | Resend is the simplest fit with Supabase + React stack. |
| Twilio SMS integration | M | Auth | Already implied by OTP. Reuse for reminders. |
| Email templates (8–10 templates above) | M | Email provider | React Email or MJML. Hard-coded HTML is fine for v1 if budget tight. |
| SMS templates (5–6 templates) | S | Twilio | Plain text, <160 chars where possible. |
| Per-user opt-out on marketing emails | S | Notifications, CASL | Required by law in Canada. |
| Per-user SMS opt-out | S | Twilio | Required (STOP keyword). |
| Trigger orchestration (cron + event-based) | M | Supabase Edge Functions | 24h reminder = scheduled cron over upcoming visits. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Slack-style status updates to a personal "visit thread"** | L | Skip for v1. Email + SMS covers it. |
| **iCalendar (.ics) attachment in confirmation email** | S | One-line. Adds the visit to the customer's Google/Apple Calendar. Cheap & loved. |
| **Post-service photo summary** ("Here's what we cleaned") | M | Storage | Polaroid-style. Big trust win for first-time customers. Tidy doesn't do this — small operator opportunity. |
| Branded SMS sender ID | S | Twilio | "HUMMI" instead of a 10-digit number. Trust signal in Canada (Twilio short codes / alphanumeric sender IDs available). |

### Anti-features (avoid)

- **Marketing emails > 1×/month.** Cleaning is a low-frequency category. Don't spam.
- **"We miss you!" reactivation campaigns at week 2.** Looks desperate. Wait 90+ days.
- **SMS for non-urgent stuff** (newsletters, promos). High unsubscribe risk + carrier penalties.
- **Push notifications.** Web push has low adoption in this demo. No native app per PROJECT.md.
- **Calling the customer when SMS works.** Operator time sink.

---

## 11. Admin / back-office features

This is where most cleaning SaaS dies: founders build a beautiful customer side and a barely-functional admin panel. Operators live in the admin panel daily. Build it like the customer cares.

### Table stakes (v1 required)

| Feature | Complexity | Dependencies | Notes |
|---|---|---|---|
| **Admin login** (separate from customer auth, role-flagged) | S | Auth | Supabase RLS + a `role` claim. |
| **Job queue (unassigned visits)** | M | Booking, Admin | Filterable by date, zone, service. The first screen the operator opens every morning. |
| **Calendar view of all visits** | L | Booking, Admin | Day / week / month grids. Color-coded by crew or by status. **Critical.** Many ops platforms (Jobber, Housecall Pro) get this right — study them. |
| **Crew management** (add crew, edit crew, deactivate) | M | Admin | Just a name, phone, photo, active flag in v1. No login for cleaners (PROJECT.md). |
| **Assign crew to visit** (drag-drop or dropdown) | M | Calendar, Crew | Required, manual in v1. |
| **Mark visit status** (scheduled / assigned / en route / in progress / completed / no-show / cancelled) | M | Booking, Admin | Drives notifications and billing. |
| **Customer list** (search, filter by zone, LTV) | M | Auth | Operators look up customers by phone or name constantly. |
| **Customer detail view** (visit history, payment history, notes, properties, package/sub status) | M | Customer list | The 360 view. Operators answer support calls from here. |
| **Internal notes per customer** (admin-only) | S | Customer detail | "Husband is doctor, sometimes home — call ahead" / "Pays slowly, watch invoices." |
| **Pricing rules editor** | L | Pricing engine | Already noted in §4. |
| **Coverage zone editor** (postal code list, capacity per zone per day) | M | — | Postal codes in/out + max visits per day. |
| **Service catalog editor** (services, add-ons, base prices) | M | Service catalog | Operator self-serve. |
| **Cancellation / refund tools** (waive fee, issue refund, partial credit) | M | Stripe | One-click refund. Stripe Refunds API. Audit log. |
| **Invoices / payments report** (today, this week, this month, by service) | M | Stripe | Operator finance basics. |
| **Failed-payment queue** | M | Stripe, Notifications | See §12. |
| Audit log (who did what, when) | S | Admin actions | At minimum: assignments, refunds, status changes. Compliance + accountability. |

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Day-of route view** (visits clustered by neighborhood) | M | Calendar | Even without auto-routing, listing tomorrow's visits grouped by postal-code prefix saves the crew's drive time. Jobber-style. |
| **Send SMS to crew** from admin (templated) | S | Twilio | One-tap "send today's job sheet to crew lead." |
| **Customer revenue dashboard** (LTV, churn risk, last visit recency) | M | Reporting | Identifies who needs a reactivation nudge. |
| **Drag-drop reassign visits between crews** | L | Calendar | Saves daily ops time. Worth building post-v1. |
| **Bulk reschedule for weather / holidays** | M | Calendar, Notifications | "Snowstorm Tuesday — push all Tuesday visits to Wednesday + notify." |

### Anti-features

- **AI-powered auto-assignment in v1.** PROJECT.md says manual — agree. Auto-assign is hard, brittle, and politically charged with crews.
- **Per-crew earnings calculator / payroll.** Out of scope for v1. Use Sheets or accounting software externally.
- **Customer support ticket system inside admin.** Email + phone covers it at this scale. Adding Zendesk-lite to your own app is wasted effort.
- **Multi-tenant (multiple companies on one Hummi).** Hummi is one operator. No tenancy.

---

## 12. Payment edge cases

The boring stuff that hurts most when ignored.

### Table stakes

| Case | What to do | Complexity | Dependencies |
|---|---|---|---|
| **Failed subscription renewal** | Stripe auto-retries (Smart Retries on). After final failure, mark subscription `past_due`, email customer, pause future visits, surface "update card" CTA in dashboard. | M | Stripe webhooks, Notifications |
| **Card on file declined for one-shot booking** | Block the booking (don't dispatch a crew on a dead card). Email + SMS the customer with retry link. Hold the slot for 24h. | M | Stripe, Booking |
| **Customer wants to update card mid-subscription** | Stripe Customer Portal handles this — link to it from dashboard. | S | Stripe Portal |
| **Refund a missed visit (customer's fault, e.g. lockout)** | Per cancellation policy (§7) — typically charge 100%. Admin can override. | S | Stripe, Admin |
| **Refund a missed visit (operator's fault, e.g. crew no-show)** | Full refund + free reclean credit. One-click admin tool. | M | Stripe, Admin |
| **Partial credit for a short visit** | Manual admin action: refund $X to original payment method or issue dashboard credit. | M | Stripe, Admin |
| **Dispute / chargeback** | Stripe surfaces these in their dashboard. Hummi doesn't need its own UI for v1 — admin checks Stripe directly. | S | — |
| **Invoice download** | Stripe-hosted invoice URL. Don't render your own. | S | Stripe |
| **HST itemization on invoice** | Stripe tax (or manual line item). Must show "HST 13%" separately. | S | Stripe |
| **Tip via dashboard** | Stripe charges customer additional, marks as tip in metadata. | M | Stripe |

### Edge case to call out: partial package refund

When a customer wants to refund a partially-used 8-visit package:
- Pricing logic must compute: `refund = total_paid − (visits_used × one_time_unit_price)`
- Where `one_time_unit_price` is the non-discounted single-visit price, NOT the package-rate per visit. This prevents customers from gaming the discount.
- Document this clearly in the package T&Cs at purchase.
- **Complexity: M.** Pricing engine must support computing the one-time equivalent of a package.

### Differentiators

| Feature | Complexity | Notes |
|---|---|---|
| **Dashboard credit balance** | M | Operator can issue $X credit to a customer; applied automatically at next booking. Avoids the friction of a literal refund + recharge. Tidy uses this. |
| **Apple Pay / Google Pay at checkout** | S | Stripe supports out of the box. Cuts mobile checkout time meaningfully. |

### Anti-features

- **Custom payment gateway integration (e.g. Moneris, Interac e-transfer).** Stripe only. PROJECT.md commits to this.
- **Net-30 invoicing.** Residential cleaning is pay-up-front. No accounts receivable.
- **Crypto / BNPL.** Not the demo.

---

## 13. Differentiators worth considering for Hummi

Ranked by likely ROI vs build cost for a small/medium Ontario operator.

| # | Differentiator | Complexity | Why it's worth it | Notes |
|---|---|---|---|---|
| 1 | **Transparent pricing calculator before signup** | S | Direct conversion lift. Beats Molly Maid / Merry Maids / most regionals where you have to call for a quote. | Already covered §4. **Ship in v1.** |
| 2 | **Satisfaction guarantee** | S (copy + admin tool) | Industry-standard signal; absence is conspicuous. | Ship in v1. |
| 3 | **Same cleaner each visit (recurring)** | M | Sticky promise. Reduces churn. | Operational discipline, not heavy code. Ship in v1. |
| 4 | **Eco-friendly product option** | S | KW/Guelph demographic skews young, university, environmentally aware. AspenClean built a brand here. | Ship as an add-on in v1. |
| 5 | **Referral program** (give $25, get $25) | M | Low CAC channel. PROJECT.md currently lists it as out-of-scope — reconsider for v1 if growth is a priority. | Defer to v1.5 if scope tight. |
| 6 | **Post-service photo summary** | M | Trust + delight. Differentiator at this scale. | Defer to v1.5. |
| 7 | **Property photos uploaded by customer** | M | Crew arrives prepared; fewer surprises. | Defer to v1.5. |
| 8 | **Non-expiring packages** | S | Beats operators that auto-expire visits. Simple policy decision. | Ship in v1. |
| 9 | **Crew bio cards (first name + photo on assignment confirmation)** | S | Demystifies "who's in my house." | Ship in v1. |
| 10 | **iCalendar attachment in confirmation email** | S | Cheap, loved. | Ship in v1. |

### Larger differentiators to consider later (NOT v1)

| Idea | Why later | Notes |
|---|---|---|
| Cleaner self-serve mobile view | Adds auth + role surface | PROJECT.md correctly punts. Re-evaluate at ~10 crews. |
| Auto-routing / dispatch optimization | High complexity, low ROI at small scale | Manual works to ~50 visits/day. |
| Public review wall | Moderation complexity | After 100+ verified reviews. |
| Loyalty / tiers | Premature optimization | Most cleaning customers don't think in tiers. |
| Native mobile app | Web responsive is enough | PROJECT.md says so — agree. |

---

## 14. Anti-features explicitly worth NOT building

Consolidated for clarity. Each of these has been justified above; this is the single index.

| Anti-feature | Why not | Re-evaluate at |
|---|---|---|
| **Real-time GPS tracking of crew** | Creepy, expensive, doesn't solve the actual problem ("when will they arrive?") which is solved by SMS "on the way." | Never, for residential. |
| **In-app chat with cleaner** | Creates 24/7 expectation. SMS/phone covers it. | Maybe at 50+ visits/day with chat ops staff. |
| **Marketplace of independent cleaners** | Different business model (Handy/Tidy at scale). Hummi is one operator with W2/contract crews. | Different company entirely. |
| **Native iOS/Android app** | Web responsive handles 99% of bookings. Native cost is not justified at this scale. | 10× current volume + retention data justifying app stickiness. |
| **Instant booking for first-time customers (no admin review)** | Fraud, scope-mismatch, no-show risk. Manual review is fine at v1 volume. | After admin auto-assignment is proven. |
| **Cleaner login / cleaner app** | PROJECT.md says no. WhatsApp/SMS works. | When crew count > 5 and ops needs a job board. |
| **Public reviews on landing** | PROJECT.md says no. Moderation + reputation risk before brand is established. | After 50+ verified happy customers. |
| **Spanish frontend** | PROJECT.md says no. Wrong demographic. | Different market entry. |
| **Auto-assignment of crews** | PROJECT.md says no. Manual works at v1 volume. | At 30+ visits/day. |
| **Commercial / office cleaning** | Different sales motion, insurance, equipment. | Different product. |
| **Carpet shampoo / windows / pressure-wash** | Equipment-heavy specialties. | Subcontract or refuse. |
| **More than 3 plan tiers** | Decision paralysis. | Never. |
| **Annual contracts with cancellation penalties** | Reputation killer. | Never. |
| **Surge pricing** | Customer revolt. | Never. |
| **Fake reviews** | Illegal in Canada (Competition Bureau). | Never. |
| **Push notifications** | No native app. Web push has low adoption in this demo. | If a native app ships. |
| **Customer support ticket system inside admin** | Email + phone is fine. | At scale, use Front / Zendesk externally. |
| **Multi-tenant SaaS** | Hummi is one operator. | If Hummi pivots to white-label, different product. |
| **Custom payment gateway (Moneris, Interac)** | Stripe handles everything Canadian. | Never for v1. |
| **Net-30 invoicing for residential** | Pay-up-front is the norm. | Never for residential. |

---

## 15. Ontario / Canadian market specifics

These constraints are non-negotiable for legal/operational reasons and are missing from US-centric playbooks.

| Item | Detail | Where it surfaces |
|---|---|---|
| **HST (Harmonized Sales Tax) — 13% in Ontario** | Must be itemized separately on every quote and invoice. Stripe Tax (Canadian) handles this automatically if configured; otherwise compute manually. | Pricing engine, invoices, checkout, dashboard |
| **GST/HST number on invoices** | Once Hummi crosses $30k CAD in revenue in 4 consecutive quarters, GST/HST registration is mandatory and the GST/HST number must appear on every invoice. Stripe supports embedding it. | Invoice template |
| **CASL (Canada Anti-Spam Legislation)** | Express opt-in required for *commercial* emails (marketing). Transactional emails (confirmations, reminders) are exempt. Must include unsubscribe link in all commercial emails. Unsubscribe must be honored within 10 business days. Violations: up to $10M CAD. | Email templates, notification preferences |
| **PIPEDA (Personal Information Protection and Electronic Documents Act)** | Federal privacy law. Requires consent for personal data collection, purpose disclosure, data breach notification. Need a clear Privacy Policy. | Privacy policy page, signup consent |
| **Postal code format** | Canadian postal codes (A1A 1A1). Validate format strictly. Don't allow US ZIPs. Specific coverage list in PROJECT.md: KW (N2H/N2L/N2J/N2K/N2T/N2V), Cambridge (N1R/N1S/N1T/N3C/N3E/N3H), Guelph (N1E/N1G/N1H/N1K/N1L). | Postal-code gate, coverage zone admin |
| **Currency: CAD only** | No multi-currency in v1. Stripe account in CAD. | Pricing engine, Stripe |
| **Phone format: +1 with Canadian area codes** | KW area codes: 519, 226, 548. Validate Canadian/US numbers (E.164). | SMS, signup |
| **Bilingual not required for English Ontario** | Quebec has Bill 96 (French-language requirements) — not relevant to KW/Cambridge/Guelph. | Frontend |
| **Workers' Compensation (WSIB)** | Operator-side concern. Cleaners must be covered. Surface "WSIB-covered crews" in trust signals if true. | Trust signals copy |
| **Holiday calendar** | Statutory holidays where crew shouldn't be scheduled (Family Day, Victoria Day, Canada Day, Civic Holiday, Labour Day, Thanksgiving, Christmas, Boxing Day, New Year's Day, Good Friday). Block these on calendar by default. | Admin calendar, booking calendar |
| **Winter operations** | Snow days in southern Ontario. Need a "bulk reschedule" admin tool (§11). | Admin tooling |
| **Tipping culture** | Canadian customers tip cleaners but at lower rates than US (~10–15% vs 15–20%). Surface tipping as optional, not pushed. | Post-service email, dashboard |

---

## 16. Feature dependency map

A consolidated DAG (Directed Acyclic Graph) of feature dependencies to inform sequencing. Read top-down: each row depends on rows above it.

```
LAYER 0 — Foundation
  Supabase Auth (email + Google OAuth)
  Stripe account + Customer setup
  Email provider (Resend/Postmark)
  Twilio SMS

LAYER 1 — Core data
  Customer profile
  Property profile (with postal-code validation)
  Coverage zone management (admin)
  Service catalog (admin)
  Pricing engine (server-side function)
  Pricing rules editor (admin)

LAYER 2 — Quote & book
  Public pricing calculator (no login)
  Booking flow (postal → property → service → date/time → account → payment)
  SMS OTP verification
  Calendar with capacity & windows
  Stripe Checkout one-shot

LAYER 3 — Recurring + Packages
  Recurring schedule (skip / reschedule individual occurrence)
  Prepaid packages (visit counter)
  Stripe Subscriptions (monthly)
  Pause / cancel subscription
  Renewal reminder emails

LAYER 4 — Customer dashboard
  Next visit + upcoming list
  Past visits + rebook button
  Payment methods (Stripe Customer Portal)
  Invoices download
  Package/Subscription status
  Reschedule / cancel self-serve
  Notification preferences

LAYER 5 — Admin panel
  Admin auth (role)
  Job queue (unassigned)
  Calendar view (all visits)
  Crew management
  Assign crew + status update
  Customer list + detail
  Internal notes
  Cancellation / refund tools
  Failed payment queue
  Audit log

LAYER 6 — Notifications cadence
  Confirmation (email + SMS)
  24h reminder
  On-the-way (admin-triggered)
  Post-service review prompt
  Renewal reminders
  Payment failure alerts

LAYER 7 — Polish / differentiators
  Eco-friendly add-on
  Crew bio cards
  iCalendar attachment
  Satisfaction guarantee tool (admin)
  Same-cleaner promise (scheduling discipline)
  Non-expiring packages
```

**Critical insight:** the pricing engine (Layer 1) and calendar/capacity (Layer 2) are the two biggest risk areas. Build and test them first. Everything downstream depends on them being right.

---

## 17. Summary scorecard

| Category | Table stakes items | Differentiator items | Anti-feature items |
|---|---|---|---|
| Onboarding & signup | 6 | 3 | 4 |
| Property profile | 8 | 6 | 4 |
| Service catalog | 5 | 3 | 4 |
| Pricing | 5 | 3 | 4 |
| Booking flow | 7 | 3 | 4 |
| Packages & subscriptions | 7 | 3 | 3 |
| Cancellation policy | 7 | — | 3 |
| Customer dashboard | 10 | 5 | 4 |
| Trust & safety | 8 | 5 | 3 |
| Communications | 7 | 4 | 5 |
| Admin / back-office | 16 | 5 | 4 |
| Payment edge cases | 10 | 2 | 3 |
| **TOTALS** | **96** | **42** | **45** |

For v1, target the **96 table stakes** plus the **10 highest-ROI differentiators identified in §13**. That's roughly 106 distinct features — large but not unrealistic for a 4–8 month build with a focused team given the template already exists.

---

## Disclaimer

Competitor patterns described here are based on publicly observable behavior of the named platforms as of 2026. Exact pricing percentages, cancellation windows, and policy details can change. Validate against current competitor sites during the requirements phase.

This document feeds into requirements definition (next milestone phase). It is intentionally opinionated — re-debate any item the team disagrees with rather than treating it as gospel.
