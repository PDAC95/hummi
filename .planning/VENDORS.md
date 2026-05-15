# Hummi External Vendors

**Owner:** Founder (Patricio)
**Last updated:** 2026-05-15
**Phase 1 success criterion:** All four vendors "in flight with documented start dates" — final approval verified in Phases 5/6/12.

This file is the single source of truth for external vendor status. Do not track vendor status in DMs, sticky notes, or memory — update the row here every time something changes.

## Status Summary

| Vendor | Phase 1 Status | Started | Approved | Evidence | Blocks |
|--------|----------------|---------|----------|----------|--------|
| [Twilio toll-free](#twilio-toll-free-verification-infra-10) | Not started | — | — | — | Phase 5 (SMS OTP), Phase 11 (on-the-way SMS) |
| [Stripe Canada](#stripe-canadian-account-infra-11) | Not started | — | — | — | Phase 6 (payments), Phase 4 (Stripe Tax) |
| [Resend domain](#resend-domain-setup-infra-12) | Not started | — | — | — | Phase 6 (booking confirmation email) |
| [CRA HST](#cra-hst-registration-infra-13) | Not started | — | — | — | Phase 4 (Stripe Tax), Phase 12 (live cutover) |

**Status values:** `Not started` → `Submitting` → `In flight` / `DNS propagating` / `Bank pending` → `Verified` → `Approved`

**Recommended order** (per RESEARCH.md §"Dependency Order"):
1. CRA HST first — instant BN issuance unblocks the rest
2. Twilio + Resend during week 1 — longest lead times
3. Stripe Canada in week 2 — needs BN in hand

---

## Twilio Toll-Free Verification (INFRA-10)

- **Checklist:** [vendors/twilio-checklist.md](vendors/twilio-checklist.md)
- **Submitted:** _(date)_
- **Status:** Not started
- **Reference:** _(Twilio Console verification ID, prefix `TF...`)_
- **Contact:** _(support ticket # if any)_
- **Files:** _(paths to screenshots in `.planning/vendors/twilio/`)_
- **Expected approval:** 3-5 business days after submission (rejections add 1-2 weeks)
- **Notes:** _(rejections, follow-ups, noteworthy email exchanges)_
- **Next steps:** _(what's outstanding)_

---

## Stripe Canadian Account (INFRA-11)

- **Checklist:** [vendors/stripe-checklist.md](vendors/stripe-checklist.md)
- **Submitted:** _(date)_
- **Status:** Not started
- **Account ID:** _(`acct_...`)_
- **Bank verification method:** _(Plaid / micro-deposits)_
- **Files:** _(paths in `.planning/vendors/stripe/`)_
- **Expected approval:** 1-2 days standard verification; bank verification adds 2-3 days if micro-deposits, instant if Plaid
- **Notes:**
- **Next steps:**

---

## Resend Domain Setup (INFRA-12)

- **Checklist:** [vendors/resend-checklist.md](vendors/resend-checklist.md)
- **Submitted:** _(date)_
- **Status:** Not started
- **Domain:** `mail.hummi.ca` (recommended subdomain — see RESEARCH.md)
- **DNS records added:** SPF / DKIM / DMARC
- **API key set:** Supabase Edge Function env (staging + prod)
- **Files:** _(paths in `.planning/vendors/resend/`)_
- **Expected approval:** DNS propagation 1-24h; Resend verification within 72h or domain fails
- **Notes:**
- **Next steps:**

---

## CRA HST Registration (INFRA-13)

- **Checklist:** [vendors/cra-hst-checklist.md](vendors/cra-hst-checklist.md)
- **Submitted:** _(date)_
- **Status:** Not started
- **BN:** _(9-digit Business Number)_
- **RT account:** RT0001
- **NAICS:** 561720 (Janitorial Services)
- **Reporting period:** Annual (default for revenue < $1.5M)
- **Files:** _(paths in `.planning/vendors/cra-hst/` — note: SIN is gitignored)_
- **Expected approval:** Instant — BN + RT issued at end of BRO session
- **Notes:**
- **Next steps:**

---

*Definition of "done" for Phase 1:* Each vendor row has a Started date + an Evidence file (screenshot) + Status moved off "Not started." Final approval is verified in later phases (5, 6, 12).
