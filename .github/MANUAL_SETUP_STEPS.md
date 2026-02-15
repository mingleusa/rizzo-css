# Manual GitHub setup — step-by-step

Do these on the GitHub website. Take your time; each step is one action.

**Setup complete.** Labels (`bug`, `enhancement`, `question`), issue templates (Bug report, Feature request, Question/discussion), default branch, and branch protection for `main` are configured. This file is kept for reference or for re-applying the same setup on another repo.

---

## Part 1: Set the default branch (if needed)

Branch protection applies to a branch name. Make sure the branch you want to protect is the default.

### Step 1.1 — Open repo Settings

1. You should still be on your repo (e.g. **github.com/mingleusa/rizzo-css**).
2. At the top of the repo page, click the tab **Settings**.  
   (If you don’t see Settings, you may not have admin rights; only admins see it.)

### Step 1.2 — Find the default branch

1. In the **left sidebar** of Settings, click **General** (first item under “Overview”).
2. Scroll to the section **Default branch**.
3. It will show something like `main` or `master`.  
   - If it already says `main`, note it and go to Part 2.  
   - If it says something else and you want `main` to be default, click the switch/edit icon next to the branch name, choose `main` from the list, confirm. Then continue to Part 2.

---

## Part 2: Add branch protection for `main`

All of this is in **Settings**, then **Branches**.

### Step 2.1 — Open branch protection rules

1. You’re in **Settings** (left sidebar).
2. In the left sidebar, under **Code and automation**, click **Branches**.

### Step 2.2 — Start a new rule

1. On the Branches page, find the section **Branch protection rules**.
2. Click the button **Add rule** (or **Add branch protection rule**).

### Step 2.3 — Branch name pattern

1. You’ll see a box labeled **Branch name pattern**.
2. Type exactly: `main`  
   (Use the same name as your default branch from Part 1.)

### Step 2.4 — Require a pull request

1. Scroll down to **Require a pull request before merging**.
2. Check the box to turn it **on**.
3. Under it you may see **Require approvals**.  
   - If you work alone: set to **0** or leave as is.  
   - If you want someone else to approve: set to **1** (or more).  
4. Optionally check **Dismiss stale pull request approvals when new commits are pushed** (recommended).

### Step 2.5 — Do not allow bypassing

1. Find **Do not allow bypassing the above settings**.
2. Check the box so that **even admins** must follow this rule.

### Step 2.6 — Force pushes

1. Find **Allow force pushes**.
2. Choose **Do not allow** (for the `main` branch).

### Step 2.7 — Allow deletions

1. Find **Allow deletions**.
2. Choose **Do not allow** (so the `main` branch can’t be deleted).

### Step 2.8 — (Optional) Status checks

1. Find **Require status checks to pass before merging**.
2. Leave it **off** for now unless you already have GitHub Actions (or other CI) that run on pull requests.  
3. If you do have CI and see check names (e.g. “build”, “test”), you can turn this **on** and select those checks.

### Step 2.9 — Save the rule

1. Scroll to the bottom of the page.
2. Click **Create** (or **Save changes**).

You should see a rule listed under Branch protection rules with pattern `main`. From now on, merges to `main` must go through a pull request; direct pushes and force pushes to `main` are blocked.

---

## Quick checklist (for reference or new repos)

- [x] Labels: **bug**, **enhancement**, **question**
- [x] Part 1: Default branch **main**
- [x] Part 2: Branch protection for **main** (PR required; no force push; no delete)

If you need to change the rule later: **Settings → Branches** → click the rule for `main` → edit → **Save changes**.
