# Maintainer guide

Notes for maintainers of the Rizzo CSS repo. For day-to-day commands (build, test, lint, contrast, bundle size), see [CONTRIBUTING.md](../CONTRIBUTING.md). For contributing and PRs, see the same doc.

## Branch protection (main)

To ensure all changes to `main` go through a reviewed pull request:

1. **GitHub** → repo **Settings** → **Branches**.
2. **Add rule** (or edit the rule for `main`).
3. **Branch name pattern:** `main`.
4. Enable:
   - **Require a pull request before merging**
   - **Require approvals** (e.g. 1)
   - Optionally: **Require status checks to pass** (add your CI jobs, e.g. build, test:a11y)
   - Optionally: **Do not allow bypassing the above settings** (so admins also follow the rule)
5. Save.

Only designated reviewers (or code owners, if configured) can approve; you decide when to merge.

## Optional: CODEOWNERS

To require that specific people (e.g. you) must approve PRs, add a [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) file at `.github/CODEOWNERS`, then in the branch protection rule enable **Require review from Code Owners**.

Example `.github/CODEOWNERS`:

```
* @your-github-username
```

## Releasing

See [PUBLISHING.md](./PUBLISHING.md) for version bump, build, and publish steps.
