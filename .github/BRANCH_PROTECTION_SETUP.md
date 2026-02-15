# Branch protection setup for `main`

Branch protection is configured in **GitHub’s repo Settings**, not in files. Follow these steps once per repo.

---

## 1. Open branch protection settings

1. Open your repo on GitHub: `https://github.com/<owner>/rizzo-css`
2. Click **Settings** (repo tab bar).
3. In the left sidebar, under **Code and automation**, click **Branches**.

---

## 2. Add a rule for `main`

1. Under **Branch protection rules**, click **Add rule** (or **Add branch protection rule**).
2. In **Branch name pattern**, type:
   ```text
   main
   ```
   (Use the exact name of your default branch; change if yours is `master`.)

---

## 3. Configure the rule

Enable and set at least these:

| Setting | What to do |
|--------|-------------|
| **Require a pull request before merging** | ✅ Check. Optionally set “Require approvals” to 1 (or 0 if you’re solo). |
| **Require status checks to pass before merging** | ✅ Check if you have CI (e.g. GitHub Actions). Then add the check names (e.g. `build`, `test`) in the box. Skip if you don’t have CI yet. |
| **Do not allow bypassing the above settings** | ✅ Check so even admins follow the rule. |
| **Restrict who can push to matching branches** | Leave empty unless you want only certain people/teams to push to `main`. |
| **Allow force pushes** | **Do not allow** (for `main`). |
| **Allow deletions** | **Do not allow** (for `main`). |

Optional:

- **Require branches to be up to date before merging** – only if you want PRs to always include the latest `main` (can require frequent “Update branch”).
- **Require conversation resolution before merging** – all comments resolved before merge.
- **Require linear history** – only if you want to enforce rebase/squash-only.

---

## 4. Save

Click **Create** (or **Save changes**).

---

## Result

- Pushing directly to `main` is blocked (or restricted, if you added restrictions).
- Force push and delete for `main` are blocked.
- Merges happen via pull requests (and optionally with status checks and approvals).

To change the rule later: **Settings → Branches →** click the existing rule for `main` → edit → **Save changes**.
