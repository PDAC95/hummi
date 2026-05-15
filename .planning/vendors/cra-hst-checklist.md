# CRA HST Registration Checklist (INFRA-13)

**Portal:** https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/business-registration-online-overview.html
**Lead time:** 15-20 minutes online; BN issued immediately upon completion
**Why now:** Blocks Phase 4 (Stripe Tax setup needs BN/RT); blocks Phase 12 (live mode launch needs HST registered with CRA)

## Decision: voluntary registration BEFORE the $30k threshold

Per CONTEXT.md: register voluntarily, do not wait for the small-supplier threshold. Reasoning:

1. Founder claims Input Tax Credits (ITCs) on Stripe fees, Supabase plan, Twilio, Resend, and other HST-bearing business expenses from day one
2. Avoids retroactive remittance trap when crossing $30k mid-quarter
3. Required input for Stripe Tax configuration in Phase 4
4. Eliminates the "$30k threshold cron alert" from the to-do list
5. Customers expect HST itemized on invoices — registration unlocks that

## Pitfall 7 — phone registration NOT available

Effective Nov 3, 2025, CRA only accepts BN / program-account registrations online via BRO. Do NOT call CRA expecting a human to register HST for you — they won't.

## Required info — gather BEFORE opening BRO

- [ ] **SIN** (founder's Social Insurance Number)
- [ ] **Legal business name**
  - Sole proprietorship → founder's full legal name
  - Incorporated → registered legal name from articles of incorporation
- [ ] **Business address** (residential is OK for sole prop)
- [ ] **NAICS industry code: 561720** — "Janitorial Services"
- [ ] **Estimated annual revenue** (be honest; underestimating is fine for a new business)
- [ ] **Fiscal year-end:** Dec 31 (default — simplest for tax filings)
- [ ] **Expected first day of taxable supplies** (the date Hummi will start charging — match Phase 6 target launch)
- [ ] **Reporting period:**
  - **Annual filing** if expected revenue < $1.5M (recommended for Hummi v1)
  - Quarterly if growth-stage and you want faster ITC refunds
- [ ] **Direct deposit info** for refunds (same Canadian banking as Stripe — institution + transit + account numbers)
- [ ] **Major business activity description** (one sentence):
  > Residential and commercial cleaning services in Kitchener-Waterloo, Cambridge, and Guelph.

## Output (what BRO gives you at the end)

- **BN** — 9-digit Business Number (this is **public** — appears on every invoice)
- **RT0001** — HST program account suffix (BN + RT0001 = full HST account ID)

These two values are used in:
- Stripe Tax registration (Phase 4)
- Business invoices, legally required line item under Ontario CPA (Phase 6 BOOK-14)
- All future CRA filings (Phase 12 ongoing)

## Evidence to capture

- [ ] Screenshot of BRO confirmation page showing **BN + RT0001** → save as `.planning/vendors/cra-hst/cra-bn-confirmation-YYYY-MM-DD.png`
  - Safe to commit — BN is public, no SIN appears on the confirmation page
- [ ] **Personal info file (SIN, DOB)** → save locally as `.planning/vendors/cra-hst/personal-info.txt`
  - **GITIGNORED** — verify before saving real data:
    ```powershell
    git check-ignore .planning/vendors/cra-hst/personal-info.txt
    ```
    Should print the path. If it prints nothing, the file is NOT ignored — stop, fix `.gitignore`, then save.
- [ ] Confirmation email from CRA → save as `.planning/vendors/cra-hst/cra-confirmation.eml` (this email contains BN, not SIN — safe to commit)

## After submission

1. Update [VENDORS.md](../VENDORS.md) → CRA HST row:
   - Started: `<today's-date>`
   - Status: `Registered`
   - BN: `<9-digit-number>`
   - RT account: `RT0001`
   - NAICS: `561720`
   - Reporting period: `Annual` (or `Quarterly` if you chose that)
2. Wait for any follow-up CRA mail (annual filing instructions usually arrive 4-6 weeks later by mail). File the letter under `.planning/vendors/cra-hst/`.
3. First HST filing happens at fiscal year-end; Phase 12 captures the filing process.

## Things NOT to do during Phase 1

- Don't apply for payroll (RP), corporate income tax (RC), or import/export (RM) accounts unless Hummi specifically needs them. Phase 1 is HST-only.
- Don't pick "Quarterly" reporting just because it sounds professional — Annual is less paperwork and works fine until revenue justifies the switch.
- Don't pick a fiscal year-end that's not Dec 31 unless your accountant has a specific reason. Default keeps everything aligned with personal taxes.
