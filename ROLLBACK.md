# Rollback Runbook

This document covers three rollback strategies in order of preference.
Choose the one that fits the situation.

---

## Decision Tree

```
Production is broken?
│
├─ Yes: how urgent?
│   ├─ Urgent (users affected NOW)
│   │   └─ → Strategy 1: Vercel instant rollback (< 2 min, no code changes)
│   │
│   └─ Non-urgent (can take 5 to 10 min)
│       └─ → Strategy 2: Git revert (leaves clean audit trail)
│
└─ Development/staging only
    └─ → Strategy 3: Git tag checkout (local only, never force-push main)
```

---

## Strategy 1: Vercel Instant Rollback (Recommended for Production)

Vercel keeps every deployment. You can reactivate any previous one instantly.

### Via Dashboard (fastest)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open the **meow-acquisition-engine** project
3. Click **Deployments** tab
4. Find the last known-good deployment
5. Click **⋯** → **Promote to Production**
6. Done: DNS flips in < 30 seconds

### Via CLI
```bash
# List recent deployments
vercel ls meow-acquisition-engine

# Promote a specific deployment URL to production
vercel promote <deployment-url> --scope <your-team>
```

### Verification
- Check production URL loads correctly
- Verify Calendly booking link still works
- Confirm client logo marquee renders
- Check Substack feed section loads

---

## Strategy 2: Git Revert (Safe for Production, Auditable)

Creates a new commit that undoes the problematic change. Main branch history stays linear.

```bash
# Identify the bad commit(s)
git log --oneline -10

# Revert a single commit
git revert <commit-sha> --no-edit

# Revert a range of commits (newest first)
git revert <newest-sha>..<oldest-sha> --no-edit

# Push: triggers a new Vercel deployment automatically
git push origin main
```

**When to use**: When a specific commit introduced a bug and you want a traceable fix in git history.

**Do not use `git revert` for**: Config changes that need immediate rollback: use Strategy 1 instead while you prepare the revert.

---

## Strategy 3: Git Tag Checkout (Development Only)

Use this locally to test against a previous known-good state.
**Never force-push to `main`.**

```bash
# List all version tags
git tag -l

# Check out a previous version locally
git checkout v1.0.0

# Create a branch from that tag to test fixes
git checkout -b fix/investigate-v1.0.0

# When done, return to main
git checkout main
```

### To redeploy from a tag (emergency, use with caution)
```bash
# Create a new branch from the tag
git checkout -b hotfix/rollback-to-v1.0.0 v1.0.0

# Push the branch: deploy it on Vercel as a preview first
git push origin hotfix/rollback-to-v1.0.0

# Only after verifying the preview, merge to main via PR
gh pr create --base main --head hotfix/rollback-to-v1.0.0 \
  --title "hotfix: rollback to v1.0.0" \
  --body "Emergency rollback: see incident notes"
```

---

## Version Tag Reference

| Tag | SHA | Date | Description |
|-----|-----|------|-------------|
| `v1.3.0` | _(current)_ | 2026-04-15 | Local screenshots, Canter Club marquee, Web Design section reorder |
| `v1.2.1` | | 2026-04-14 | VideoShowcase promoted, AIModelsShowcase removed |
| `v1.1.0` | | 2026-04-09 | Engineering hardening: dead code cleanup, DB scaffolding |
| `v1.0.0` | `2256e7d` | 2026-04-07 | Production baseline: fully functional acquisition engine |

---

## Post-Rollback Checklist

- [ ] Production URL loads without errors
- [ ] "Book a Call" / Calendly CTA button works
- [ ] Client logo marquee scrolls correctly
- [ ] Navigation links and mobile menu work
- [ ] Substack feed section renders (or gracefully hides on error)
- [ ] Background animation renders
- [ ] Footer social links work
- [ ] Page loads under 3 seconds (check Vercel Web Vitals)

---

## Adding New Entries to This Table

Whenever you create a new release tag:
```bash
git tag -a v<X.Y.Z> -m "Release v<X.Y.Z>: <one-line summary>"
git push origin v<X.Y.Z>
```

Then add a row to the Version Tag Reference table above.
