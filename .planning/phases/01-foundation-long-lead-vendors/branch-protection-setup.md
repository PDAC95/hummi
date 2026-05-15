# Branch Protection — Required for `main`

This is the founder-facing checklist for enabling branch protection on `main` so
that the Phase 1 CI workflows actually block bad merges (and so nobody can
force-push over the project history).

**Repo:** https://github.com/PDAC95/hummi

---

## Where to add the rule

Open: https://github.com/PDAC95/hummi/settings/rules
(Settings tab → Rules → Rulesets → **New ruleset → New branch ruleset**)

Choose **New branch ruleset** (the modern UI). The legacy "Branch protection
rules" page works too but the UX is older.

---

## Rule for `main`

### Step 1 — Targets

- **Ruleset name:** `main protection`
- **Enforcement status:** **Active**
- **Bypass list:** leave empty (no bypasses — you'll go through PRs like everyone else)
- **Target branches:**
  - Click **Add target → Include by pattern**
  - Pattern: `main`

### Step 2 — Branch protections (toggle each)

- [x] **Restrict deletions** — prevents accidentally deleting `main`
- [x] **Require linear history** — keeps the commit graph clean (no merge bubbles)
- [x] **Require a pull request before merging**
  - Required approvals: **0** (solo dev — bump to 1 when you have a second contributor)
  - **Dismiss stale pull request approvals when new commits are pushed**: ON
  - **Require approval of the most recent reviewable push**: leave OFF (irrelevant at 0 approvers)
- [x] **Require status checks to pass**
  - **Require branches to be up to date before merging**: ON
  - **Status checks that are required:** click **Add checks** and add each by name:
    1. `Lint + Typecheck + Build`
    2. `Secret Leak Grep (INFRA-04 / SEC-07)`
    3. `Supabase Migration Dry-Run (INFRA-03)`
    4. `npm audit (INFRA-08)`
    5. `Gitleaks` (the job name from `.github/workflows/gitleaks.yml`)

  **Important:** GitHub only suggests check names in the autocomplete after they've
  run at least once on the repo. So the very first PR after merging this plan won't
  let you add the names yet — open a throwaway PR first to make CI run, **then**
  come back here and add the 5 required checks.

- [x] **Block force pushes** — `main` is append-only via PR
- [ ] **Require code scanning results** — leave OFF (no CodeQL set up yet)

### Step 3 — Save

Click **Create**. The ruleset shows status `Active` with target `main`.

---

## Rule for `test/secret-leak-red` (deferred to Plan 01-07)

Plan 01-07 will create a permanent red-test branch. It needs a separate ruleset
to make that branch un-deletable and effectively un-mergeable (it exists as
living evidence of the secret-grep guardrail). Defer this rule until then —
just noting it here for traceability:

- Target: `test/secret-leak-red`
- Restrict deletions: ON
- Block force pushes: ON
- Require PR: ON, with **99 required approvals** (effectively un-mergeable)

---

## Branching strategy reminder

Hummi uses **GitHub Flow** — one feature branch per GSD plan, one PR per plan,
merge to `main`. There is **no `develop` branch**. The `deploy-staging.yml`
workflow does not auto-trigger off any long-lived branch; staging deploys
happen on-demand via `workflow_dispatch`.

Source: `.claude/CLAUDE.md` "Workflow de Git", and `01-CONTEXT.md` decisions.

---

## Verification

After saving:

1. Open https://github.com/PDAC95/hummi/settings/rules — ruleset shows `Active`.
2. Try (in a throwaway local branch) `git push --force origin main` — GitHub
   rejects with `protected branch hook declined`.
3. Open a throwaway PR with a tiny markdown change. Verify:
   - All 5 status checks appear and run.
   - The **Merge** button is greyed out / labelled "Merging is blocked" until
     all checks pass.
   - Once checks pass, you can merge.

---

## Troubleshooting

- **"I don't see the checks in the autocomplete":** They only appear after they
  run at least once. Open a throwaway PR, wait for CI, then add the names.
- **"Merge is blocked even though checks passed":** check that "Require branches
  to be up to date" isn't holding you back — click **Update branch** on the PR.
- **"I need to bypass for an emergency":** add yourself temporarily to the
  bypass list, do the merge, then **remove yourself immediately**. Document the
  reason in the PR description.
