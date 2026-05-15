# Vendor Evidence

This directory holds screenshots, confirmation emails, and submission proof for each external vendor referenced in [`../VENDORS.md`](../VENDORS.md).

## Subdirectories

- `twilio/` — Toll-free submission screenshot, sample message, opt-in flow URL screenshot
- `stripe/` — Account activation screenshot, bank verification status
- `resend/` — Domain DNS records screenshot, verified status screenshot
- `cra-hst/` — BN/RT confirmation screenshot. **Personal info file (SIN, DOB) is gitignored.**

Create the subdirectory the first time you save a file into it (`mkdir .planning/vendors/twilio`).

## Filename conventions

- `{vendor}-submission-YYYY-MM-DD.png` for initial submission
- `{vendor}-verified-YYYY-MM-DD.png` once approved
- `{vendor}-confirmation.eml` for confirmation emails
- `{vendor}-rejection-YYYY-MM-DD.png` if a vendor rejects (use the rejection itself as evidence + action item)

## Privacy

All screenshots in this directory go in the repo EXCEPT files matching gitignored patterns. The repo root `.gitignore` excludes:

```
.planning/vendors/cra-hst/personal-info.*
.planning/vendors/*/secrets.*
```

The CRA BN itself is **public** (it appears on every invoice) — only the SIN and DOB used to register it are sensitive. Save those to `.planning/vendors/cra-hst/personal-info.txt` (gitignored) so the founder has a local-only record.

To verify a sensitive file is properly ignored before saving real data:

```powershell
git check-ignore .planning/vendors/cra-hst/personal-info.txt
```

The command should print the path (meaning the rule matches). If it prints nothing, the file is NOT ignored — stop, fix `.gitignore`, then save.

## What lives where

| File | Source | Purpose |
|------|--------|---------|
| `../VENDORS.md` | This repo | Status table — single source of truth |
| `*-checklist.md` | This dir | Per-vendor application instructions |
| `{vendor}/*.png` | Vendor portals | Submission + approval evidence |
| `{vendor}/*.eml` | Vendor email | Confirmation + correspondence |
