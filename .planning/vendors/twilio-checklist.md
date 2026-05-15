# Twilio Toll-Free Verification Checklist (INFRA-10)

**Portal:** Twilio Console → Phone Numbers → Regulatory Compliance → Toll-Free Verifications
**Lead time:** 3-5 business days for initial review; rejections can add 1-2 weeks
**Why now:** Approval blocks Phase 5 (SMS OTP); the verified number ALSO carries Hummi's "on the way" SMS in Phase 11

## Prerequisites — do these BEFORE submitting

- [ ] **Placeholder opt-in page hosted publicly** (Pitfall 6 — Twilio rejects without proof)
  - Suggested URL: `staging.hummi.ca/sms-opt-in` (deploy a static page; copy from CONTEXT.md)
  - Must show:
    - Form field for phone number
    - Sample message text
    - "Reply STOP to opt out" disclosure
    - Sender identity ("Hummi")
- [ ] **Privacy policy URL is live** (covers CASL — Phase 12 will polish; Phase 1 needs a placeholder)
- [ ] **Toll-free number purchased** in the Twilio Console (a verification needs a target number)
- [ ] Twilio account funded enough to cover the monthly toll-free fee

## Required application fields (all 9, from Twilio docs)

- [ ] **1. Business legal name** + corporate website URL
- [ ] **2. Business address** (matches CRA registration / business registry)
- [ ] **3. Business contact email** (for verification updates — use a monitored inbox, NOT a personal Gmail)
- [ ] **4. Estimated monthly message volume:** 500 SMS/month (initial estimate; can revise upward later)
- [ ] **5. Opt-in flow description (text):**
  > Customer enters phone number during booking; receives OTP for verification; can reply STOP to opt out of future messages.
- [ ] **6. Publicly hosted URL** of the opt-in flow screenshot/image (the page from Prerequisites above)
- [ ] **7. Sample message content (verbatim):**
  > Hi `<customer-first-name>`, this is Hummi confirming your cleaning on `<date>` at `<time>`. Reply STOP to opt out.
- [ ] **8. Privacy policy URL** (https://hummi.ca/privacy or staging equivalent)
- [ ] **9. Use-case classification:** **OTP + appointment reminders**

## Evidence to capture

- [ ] Screenshot of submission page (after clicking Submit) → save as `.planning/vendors/twilio/twilio-submission-YYYY-MM-DD.png`
- [ ] Verification ID (starts with `TF...`) → record in [VENDORS.md](../VENDORS.md)
- [ ] Confirmation email from Twilio → save as `.planning/vendors/twilio/twilio-confirmation.eml`
- [ ] Screenshot of the live opt-in page (proof the URL submitted is real) → `.planning/vendors/twilio/twilio-opt-in-page-YYYY-MM-DD.png`

## After submission

1. Update [VENDORS.md](../VENDORS.md) → Twilio row:
   - Started: `<today's-date>`
   - Status: `In flight`
   - Reference: `<TF-id>`
2. Watch the contact email for the next 3-5 business days. If rejected (most common reason: opt-in page missing required disclosures), fix the issue and resubmit.
3. Final approval is verified in Phase 5. Phase 1 done = "In flight" with evidence.

## Common rejection reasons (avoid these)

- Opt-in page missing "Reply STOP to opt out" text
- Opt-in page not publicly accessible (behind login or 404)
- Sample message doesn't match the use case (e.g., promotional content for an "OTP" use case)
- Business address doesn't match the corporate registry
- Privacy policy URL returns 404
