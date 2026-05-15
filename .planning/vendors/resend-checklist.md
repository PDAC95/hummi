# Resend Domain Setup Checklist (INFRA-12)

**Portal:** https://resend.com/domains → Add domain
**Lead time:** DNS propagation 1-24h; Resend verification window closes after 72h or domain fails
**Why now:** Blocks Phase 6 (booking confirmation email); warmup takes 1-2 weeks of organic volume

## Recommended domain

Use **`mail.hummi.ca`** (subdomain, not the apex) — isolates transactional reputation from any future marketing emails. Apex is reserved for the website.

## DNS records to add

At the domain registrar (Cloudflare / Namecheap / GoDaddy / wherever `hummi.ca` lives):

- [ ] **SPF (TXT) on `mail.hummi.ca`:**
  ```
  v=spf1 include:_spf.resend.com ~all
  ```
- [ ] **DKIM (CNAME) — 3 records from Resend dashboard, prefixed `resend._domainkey.*`**
  - Copy each value directly from Resend → Domains → `mail.hummi.ca` → DNS Records (use the copy buttons; do NOT transcribe — one wrong character = silent verification failure)
  - The hostnames Resend gives you look like `resend._domainkey.mail.hummi.ca` — paste them as-is into the registrar
- [ ] **DMARC (TXT) on `_dmarc.mail.hummi.ca`:**
  ```
  v=DMARC1; p=none; rua=mailto:dmarc@hummi.ca
  ```
  - Start with `p=none` (monitor only). After 2-4 weeks of clean aggregate reports (`rua` mailbox), tighten to `p=quarantine`. Don't go to `p=reject` until Phase 12.

## Pre-verify with nslookup (avoid Pitfall 8)

Before clicking **Verify** in Resend, confirm DNS has propagated:

```powershell
nslookup -type=TXT mail.hummi.ca
nslookup -type=CNAME resend._domainkey.mail.hummi.ca
nslookup -type=TXT _dmarc.mail.hummi.ca
```

All three must return Resend's expected values. If any returns nothing or the wrong value, wait an hour and retry — registrar TTLs vary (Cloudflare propagates in minutes; some others take hours).

If after 24h `nslookup` still doesn't show the expected values, delete the records and re-add them (typo is the most common cause).

## API key — never put real values in `src/`

- [ ] Generate API key named **"Hummi Production"** in Resend → API Keys
- [ ] Copy the key value ONCE (Resend hides it after you close the modal)
- [ ] Store as a Supabase Edge Function secret on prod:
  ```powershell
  supabase secrets set RESEND_API_KEY="<paste-key-here>" --project-ref <PROD_PROJECT_ID>
  ```
- [ ] Generate a second key named **"Hummi Staging"** and set it on staging:
  ```powershell
  supabase secrets set RESEND_API_KEY="<paste-staging-key-here>" --project-ref <STAGING_PROJECT_ID>
  ```
- [ ] Confirm `.env.example` has only the variable name `RESEND_API_KEY=` with no value

**Never** put a real Resend key in `src/`, `.env.example`, or any committed file.

## Warmup strategy (passive)

For Hummi v1, transactional volume starts near zero (no customers yet) — warmup happens organically as first customers book. Plan for first month:

- Week 1: 10-15 emails/day (founder + test accounts)
- Week 2-3: 50-100/day (first real bookings)
- Week 4+: full volume

Don't blast on launch day — that's the fastest way to land in spam.

## Evidence to capture

- [ ] Screenshot of "Domain Verified" green check in Resend → `.planning/vendors/resend/resend-verified-YYYY-MM-DD.png`
- [ ] Screenshot of all 3 DNS record types in the registrar → `.planning/vendors/resend/resend-dns-YYYY-MM-DD.png`
- [ ] Screenshot of API keys list (showing the 2 named keys, with the values masked) → `.planning/vendors/resend/resend-api-keys-YYYY-MM-DD.png`

## After completion

1. Update [VENDORS.md](../VENDORS.md) → Resend row:
   - Started: `<today's-date>`
   - Status: `DNS propagating` initially, then `Verified` once green
   - Domain: `mail.hummi.ca`
2. Final approval is verified in Phase 6 (first real transactional email sent end-to-end).

## Common pitfalls

- Adding records to apex `hummi.ca` instead of subdomain `mail.hummi.ca` — re-add on the correct host.
- Cloudflare proxy enabled on the CNAME (orange cloud) — must be DNS-only (grey cloud). Resend cannot follow the proxy.
- Registrar appends the apex to your hostname twice (e.g. `mail.hummi.ca.hummi.ca`) — strip the trailing `.hummi.ca` from the host field.
