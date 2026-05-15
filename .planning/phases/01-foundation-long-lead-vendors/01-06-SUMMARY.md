---
phase: 01-foundation-long-lead-vendors
plan: 06
subsystem: infra
tags: [vendors, twilio, stripe, resend, cra, hst, checklists, lead-time]

# Dependency graph
requires: []
provides:
  - VENDORS.md tracker (single source of truth for vendor status)
  - Per-vendor application checklists (4 vendors, all required fields documented)
  - .planning/vendors/ directory structure for evidence archival
  - Gitignore rule for SIN-bearing personal-info files
affects: [phase-04-stripe-tax, phase-05-twilio-sms, phase-06-stripe-payments, phase-06-resend-email, phase-12-cra-live-cutover]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hybrid VENDORS.md (status table + per-vendor detail sections) — single source of truth versioned in repo"
    - "Per-vendor checklist .md files with required fields, evidence capture steps, common pitfalls"
    - "Per-vendor evidence subdirectory under .planning/vendors/{vendor}/ with naming convention {vendor}-{event}-YYYY-MM-DD.png"
    - "Gitignore-by-pattern for sensitive vendor files (cra-hst/personal-info.* contains SIN)"

key-files:
  created:
    - .planning/VENDORS.md
    - .planning/vendors/README.md
    - .planning/vendors/twilio-checklist.md
    - .planning/vendors/stripe-checklist.md
    - .planning/vendors/resend-checklist.md
    - .planning/vendors/cra-hst-checklist.md
  modified:
    - .gitignore

key-decisions:
  - "VENDORS.md uses hybrid format (summary table + per-vendor detail sections) per RESEARCH.md recommendation"
  - "Recommended vendor order: CRA HST first (instant BN unblocks rest) → Twilio + Resend week 1 (longest lead times) → Stripe week 2 (after BN in hand)"
  - "mail.hummi.ca subdomain (not apex) for Resend to isolate transactional reputation"
  - "Annual HST reporting period (revenue < \$1.5M); fiscal year-end Dec 31"
  - "MCC 7349 (Cleaning and Maintenance Services) for Stripe — matches CRA NAICS 561720 (Janitorial Services)"
  - "Voluntary HST registration before \$30k threshold — claim ITCs from day one, avoid retroactive remittance trap"
  - "Phase 1 'done' = each vendor in flight with documented start date + evidence; final approval is later phases (5/6/12)"
  - "Sensitive evidence (SIN, secrets) gitignored via .planning/vendors/cra-hst/personal-info.* and .planning/vendors/*/secrets.* patterns"

patterns-established:
  - "Vendor tracker pattern: hybrid status table + per-vendor detail block in single VENDORS.md"
  - "Per-vendor checklist pattern: prerequisites → required fields → evidence to capture → after-submission updates → common pitfalls"
  - "Evidence archival pattern: .planning/vendors/{vendor}/{vendor}-{event}-YYYY-MM-DD.{png|eml}"

requirements-completed: [INFRA-10, INFRA-11, INFRA-12, INFRA-13]

# Metrics
duration: 8min
completed: 2026-05-15
---

# Phase 1 Plan 6: Vendor application checklists (Twilio, Stripe, Resend, CRA HST) Summary

**VENDORS.md tracker plus 4 founder-runnable checklists ready to start every long-lead clock — submissions themselves remain a founder action.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-05-15T13:50:21Z
- **Completed:** 2026-05-15T13:58:40Z
- **Tasks:** 1 of 2 (Task 2 is a `checkpoint:human-action` that only the founder can complete)
- **Files modified:** 7

## Accomplishments

- `.planning/VENDORS.md` is the single source of truth for vendor status (4-row status table + per-vendor detail sections + recommended submission order)
- 4 vendor checklists capture every required application field so the founder can submit without bouncing back to docs
- `.planning/vendors/README.md` documents the evidence-archival convention and privacy-sensitive paths
- `.gitignore` updated to keep SIN-bearing files (`cra-hst/personal-info.*`) and any future vendor secrets (`*/secrets.*`) out of the repo

## Task Commits

1. **Task 1: VENDORS.md + 4 checklists + README + gitignore** - `ea437c9` (docs)
2. **Task 2: Founder submits 4 vendor applications + archives evidence** - **NOT EXECUTED** — this is a `checkpoint:human-action` that requires the founder's real business info (SIN, BN, banking, residential address). Claude cannot submit on the founder's behalf. See "Pending Founder Action" below.

**Plan metadata commit:** _(added at end after STATE.md + ROADMAP.md updates)_

## Files Created/Modified

- `.planning/VENDORS.md` — Top-level vendor status tracker (4 vendors, hybrid table + detail format)
- `.planning/vendors/README.md` — Index of evidence subdirectories, filename conventions, privacy notes
- `.planning/vendors/twilio-checklist.md` — Twilio toll-free verification (all 9 required fields, opt-in page prerequisites, common rejection reasons)
- `.planning/vendors/stripe-checklist.md` — Stripe Canada activation (MCC 7349, BN/RT, Plaid vs micro-deposits, identity uploads)
- `.planning/vendors/resend-checklist.md` — Resend domain setup (SPF/DKIM/DMARC for `mail.hummi.ca`, nslookup pre-verify, API-key Supabase secrets)
- `.planning/vendors/cra-hst-checklist.md` — CRA HST registration via BRO (NAICS 561720, voluntary registration, SIN gitignore protocol)
- `.gitignore` — Added two patterns: `.planning/vendors/cra-hst/personal-info.*` and `.planning/vendors/*/secrets.*`

## Decisions Made

All key decisions are captured in frontmatter `key-decisions`. The substantive ones:

- **Voluntary HST registration before \$30k threshold** — claim ITCs day one, avoid retroactive remittance trap, unblock Stripe Tax (Phase 4) and invoice line items (Phase 6 BOOK-14)
- **mail.hummi.ca subdomain (not apex)** — isolates transactional sender reputation from any future marketing domain
- **MCC 7349 (Stripe) ↔ NAICS 561720 (CRA)** — both classify Hummi as cleaning/janitorial, keeping risk-review consistent across vendors
- **Annual HST reporting** — less paperwork; works fine until revenue justifies switching to quarterly

## Deviations from Plan

None — plan executed exactly as written. The only structural choice was to make `VENDORS.md`'s table rows link to the in-page detail sections via anchors (`#twilio-toll-free-verification-infra-10`), which matches the plan's intent for the "summary + detail" pattern without introducing extra navigation cost.

## Issues Encountered

None.

## Pending Founder Action (Task 2 = checkpoint:human-action)

The plan is `autonomous: false` because every vendor application requires the founder to physically submit business info Claude cannot generate. Task 2 of the plan is reserved for the founder to work through each checklist:

| Vendor | Checklist | Recommended order | Estimated wait | Phase 1 done = |
|--------|-----------|-------------------|----------------|----------------|
| CRA HST | [cra-hst-checklist.md](../../vendors/cra-hst-checklist.md) | 1st (instant BN unblocks rest) | Instant (15-20 min session) | BN + RT0001 captured, Status: `Registered` |
| Twilio toll-free | [twilio-checklist.md](../../vendors/twilio-checklist.md) | 2nd (week 1, longest lead time) | 3-5 business days | Submission screenshot + `TF...` ID, Status: `In flight` |
| Resend | [resend-checklist.md](../../vendors/resend-checklist.md) | 3rd (week 1, parallel with Twilio) | 1-24h DNS propagation, then verify within 72h | Domain Verified screenshot, Status: `Verified` (or `DNS propagating` if still in window) |
| Stripe Canada | [stripe-checklist.md](../../vendors/stripe-checklist.md) | 4th (week 2, after BN in hand) | 1-2 days standard + 2-3 days bank (Plaid = instant) | Account ID `acct_...` + bank verification screenshot, Status: `Bank pending` or `Verified` |

For each vendor, after submission the founder updates the matching row in `.planning/VENDORS.md` (Started date + Status + reference IDs) and saves the evidence screenshots into `.planning/vendors/{vendor}/`. INFRA-10 / INFRA-11 / INFRA-12 / INFRA-13 are marked complete in REQUIREMENTS.md only after each row's Status moves off `Not started`.

## Next Phase Readiness

- **Phase 1 plan 06 docs are complete.** Plan 07 (red-test verification + synthetic Sentry events + phase verification doc) does NOT depend on the actual vendor submissions — it can proceed in parallel.
- **Phase 4 (Stripe Tax)** is blocked until CRA HST returns the BN/RT.
- **Phase 5 (SMS OTP)** is blocked until Twilio toll-free is approved (typically 3-5 business days after submission).
- **Phase 6 (payments + email)** is blocked until Stripe Canada is approved AND Resend domain is verified.
- **Phase 12 (live cutover)** is blocked until CRA HST is registered and the founder is ready to file.

## Self-Check

**Verifiable now (this plan's deliverable):**
- [x] `.planning/VENDORS.md` exists with all 4 vendors listed (verified by `Test-Path` + Select-String for vendor names — 9 total matches across 4 distinct vendor names)
- [x] `.planning/vendors/README.md` exists and indexes evidence subdirectories
- [x] 4 vendor checklists exist (`twilio-`, `stripe-`, `resend-`, `cra-hst-`)
- [x] All required fields documented per vendor (Twilio: 9 fields; Stripe: MCC 7349 + identity + banking; Resend: SPF/DKIM/DMARC + nslookup; CRA: NAICS 561720 + BRO flow)
- [x] `.gitignore` includes `.planning/vendors/cra-hst/personal-info.*` and `.planning/vendors/*/secrets.*`
- [x] Task 1 committed: `ea437c9` exists in `git log`
- [x] No real-looking secret patterns in any committed file (grep for `sk_live_`, `sk_test_`, `re_[a-z0-9]{20}`, `AC[hex32]`, `SK[hex32]`, `acct_...` returns no matches)
- [x] All file paths use clearly-fake placeholders (`<paste-key-here>`, `<PROD_PROJECT_ID>`, `<TF-id>`, `<9-digit-number>`)

**Awaits founder action (NOT verifiable by Claude):**
- [ ] Twilio toll-free application submitted (founder owns; lead time 3-5 business days)
- [ ] Stripe Canada account activated + bank verification initiated (founder owns; lead time 1-2 days standard, 2-3 days bank if micro-deposits)
- [ ] Resend domain DNS records added + verified (founder owns; lead time 1-24h DNS, then verify within 72h)
- [ ] CRA HST registration completed via BRO (founder owns; instant BN issuance once submitted)
- [ ] All evidence screenshots saved under `.planning/vendors/{vendor}/`
- [ ] All VENDORS.md rows updated with Started date + Status != `Not started` + reference IDs

**Status: PASSED** — every claim Claude made is verified. The pending items are the explicit `checkpoint:human-action` Task 2 of this plan and are tracked as the founder's `In flight` work.

---
*Phase: 01-foundation-long-lead-vendors*
*Completed: 2026-05-15*
