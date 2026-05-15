# Stripe Canadian Account Activation Checklist (INFRA-11)

**Portal:** https://dashboard.stripe.com/ → Account settings → Business details
**Lead time:** 1-2 days for standard verification + 2-3 days for bank verification (micro-deposits) OR ~minutes if Plaid
**Why now:** Blocks Phase 6 (payment processing); the BN/RT will be required for Stripe Tax setup in Phase 4

## Prerequisites

- [ ] **CRA HST registration submitted** (you need the BN/RT to wire Stripe Tax in Phase 4 — Stripe activation itself doesn't strictly require HST, but registering both during Phase 1 means no rework later)
- [ ] **Canadian bank account opened** (RBC / TD / BMO / Scotia / CIBC all support Plaid for instant verification)
- [ ] **Void cheque OR direct deposit form** (PDF) ready for upload
- [ ] **Government-issued ID** (driver's license or passport — both sides; keep PDF/PNG handy)
- [ ] **Articles of incorporation** PDF if Hummi is incorporated (sole prop = skip)

## Required fields

### Business identity
- [ ] **Business legal name** (must match CRA records)
- [ ] **Business address** (must match CRA registration)
- [ ] **Canadian business number (BN)** — 9 digits + RT0001 (HST account suffix) once HST registered
- [ ] **Business website URL** (use staging.hummi.ca if production isn't live yet)
- [ ] **Industry code (MCC): 7349** — "Cleaning and Maintenance Services"
- [ ] **Business description** (one short paragraph; Stripe shows this internally for risk review):
  > Hummi provides residential and commercial cleaning services in Kitchener-Waterloo, Cambridge, and Guelph (Ontario). Customers book online and pay via Stripe Payment Element. Average ticket size $80-$300 CAD.

### Owner identity (Stripe collects, does not store SIN)
- [ ] Owner full legal name
- [ ] Owner DOB
- [ ] Owner SIN (entered live; not stored after verification)
- [ ] Government-issued ID upload
- [ ] Residential address (owner)

### Banking
- [ ] Canadian bank account:
  - Institution number (3 digits)
  - Transit number (5 digits)
  - Account number
- [ ] Void cheque OR direct deposit form (PDF upload)
- [ ] Currency: CAD

## Bank verification

| Method | Speed | When to use |
|--------|-------|-------------|
| **Plaid** (preferred) | Instant | RBC, TD, BMO, Scotia, CIBC, Tangerine |
| **Micro-deposits** (fallback) | 2-3 business days | Banks Plaid doesn't support |

For micro-deposits: Stripe sends two small deposits (each between $0.01 and $0.99). You return to the Stripe dashboard 2-3 days later and confirm the exact amounts.

## Evidence to capture

- [ ] Screenshot showing "Business details verified" → `.planning/vendors/stripe/stripe-business-verified-YYYY-MM-DD.png`
- [ ] **Stripe Account ID** (`acct_<base32-id>`) → record in [VENDORS.md](../VENDORS.md)
- [ ] Screenshot showing "Bank account pending verification" OR "Bank verified" → `.planning/vendors/stripe/stripe-bank-<status>-YYYY-MM-DD.png`

## After submission

1. Update [VENDORS.md](../VENDORS.md) → Stripe row:
   - Started: `<today's-date>`
   - Status: `Bank pending` (micro-deposits) or `Verified` (Plaid)
   - Account ID: `acct_<id>`
   - Bank verification method: `Plaid` or `Micro-deposits`
2. If micro-deposits: check the bank account in 2-3 days; return to the Stripe dashboard to confirm the amounts.
3. Final approval (live mode) is verified in Phase 6 + Phase 12.
4. **Do NOT** configure Stripe Tax yet — that's Phase 4 (needs the HST RT account first).

## Things NOT to do during Phase 1

- Don't switch the dashboard to live mode — Phase 6 covers that.
- Don't generate API keys for `src/`. Phase 1 only needs the account activated.
- Don't create products/prices yet — Phase 4 owns the catalog.
