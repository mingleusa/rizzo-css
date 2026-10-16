# Maintainer guide

Notes for maintainers of the Rizzo CSS repo. For day-to-day commands (build, test, lint, contrast, bundle size), see [CONTRIBUTING.md](../CONTRIBUTING.md). For contributing and PRs, see the same doc.

## Stability and versioning

- **Current:** Pre-1.0 (0.0.x). We add features and fix bugs; minor versions (0.x.0) add features without breaking existing APIs; patch (0.0.x) for fixes and docs.
- **Semver:** Follow [semantic versioning](https://semver.org/). See [PUBLISHING.md – Versioning strategy](./PUBLISHING.md#versioning-strategy) for patch vs minor vs major.
- **1.0:** When the system stabilizes (e.g. no planned breaking changes to BEM class names or public CSS variables), we may release 1.0 and adopt a clearer deprecation policy (e.g. one minor version deprecation window before removal). Until then, avoid breaking changes without notice.

**Upgrade guide:** For how to upgrade between versions and what to expect at 1.0, see [UPGRADE.md](./UPGRADE.md).

### Pre-1.0 checklist

Before tagging 1.0, we aim to:

1. **API stability** — No planned breaking renames to BEM class names or public theme tokens (`--background`, `--text`, `--accent`, etc.).
2. **Deprecation policy** — Document how we will deprecate (e.g. one minor version notice before removal).
3. **Docs** — [UPGRADE.md](./UPGRADE.md) and [MAINTAINING.md](./MAINTAINING.md) clearly describe stability and upgrade path.
4. **Tasks by impact** — High-priority items in [TODO.md – Tasks by impact](./TODO.md#tasks-by-impact) reviewed; any blocking items for 1.0 addressed or explicitly deferred.

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

See [PUBLISHING.md](./PUBLISHING.md) for the full release checklist: version bump, tarball inspection, scaffold smoke tests, publish (with 2FA), and CDN verification.

## Dependencies and security

- **Overrides and audit config** live in `pnpm-workspace.yaml` (pnpm 12 ignores the `pnpm` field in `package.json`): `overrides` pin secure floors for transitive packages, and `auditConfig.ignoreGhsas` lists advisories we knowingly accept, each with a comment. CI fails on any other `high` advisory.
- **Upgrading:** update in small groups, then run `pnpm build`, `pnpm test:a11y`, `pnpm test:storybook` and `pnpm check:svelte`, and generate and build each scaffold (see the release checklist). Scaffold `package.json` files should track the versions we have actually built them with.
- **Node:** the repo needs Node 22.22.3+ (or 24.15+); CI uses Node 24. Check a dependency's `engines` before bumping, because a newer Node API (such as `Set.prototype.difference`) can pass locally and crash on an older CI runner.
- **README badges and tech stack** are generated: run `pnpm readme:tech` after dependency changes.
- Roadmap and advisory status: [UPGRADE.md](./UPGRADE.md#dependency-upgrade-roadmap).
