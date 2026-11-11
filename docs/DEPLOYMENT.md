# Deployment

The docs site is served at **https://rizzo-css.jordanmingle.dev** as a **Plesk Node.js app** (Phusion Passenger).

The Astro build is fully static. [`deploy/server.cjs`](../deploy/server.cjs) is a small server with no dependencies. It serves `dist/` and adds cache headers (`immutable` for `/assets/`, `/_astro/`, `/css/`, `/icons/`) and security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`). It also gzips text responses and answers `ETag` revalidation with `304`. The server needs only Node, so nothing is installed on the server.

## How a deploy happens

1. A push to `main` triggers CI ([a11y.yml](../.github/workflows/a11y.yml)): build, audit, a11y, and visual tests.
2. When CI passes, [deploy.yml](../.github/workflows/deploy.yml) builds the site with the production secrets. It then `rsync`s `dist/` and `server.cjs` to the app root over SSH and touches `tmp/restart.txt`, which makes Passenger restart the app.
3. The workflow then checks that `/`, `/docs/getting-started`, and `/blocks` return `200`.

To redeploy by hand, open **Actions → Deploy → Run workflow**.

## Server layout

```
/var/www/vhosts/jordanmingle.dev/rizzo-css.jordanmingle.dev/   ← application root (DEPLOY_PATH)
├── server.cjs        ← application startup file
├── dist/             ← built site
├── httpdocs/         ← document root: keep EMPTY
└── tmp/restart.txt   ← touched on every deploy
```

Keep `httpdocs/` empty. nginx serves any file in the document root directly, which bypasses the Node app and its headers. That includes the placeholder `index.html` that Plesk creates.

## One-time Plesk setup

1. **Websites & Domains → rizzo-css.jordanmingle.dev → Node.js**
   - Node.js version: 22 or newer
   - Application mode: `production`
   - Application root: `/rizzo-css.jordanmingle.dev`
   - Document root: `/rizzo-css.jordanmingle.dev/httpdocs`
   - Application startup file: `server.cjs`
   - Click **Enable Node.js**. Don't run *NPM install*, because there is no `package.json` on the server.
2. Delete the default files from `httpdocs/`.
3. **Hosting & DNS → Hosting → SSH access**: set the subscription's system user to `/bin/bash`. The chrooted shell usually lacks `rsync`.
4. Add the deploy public key to that user's `~/.ssh/authorized_keys`, or use the SSH Keys extension.

## GitHub secrets

Set these in **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `DEPLOY_HOST` | Server hostname or IP |
| `DEPLOY_PORT` | SSH port (optional; default `22`) |
| `DEPLOY_USER` | The subscription's system user |
| `DEPLOY_KEY` | Private key (the full file, including the `BEGIN`/`END` lines) |
| `DEPLOY_PATH` | Application root, e.g. `/var/www/vhosts/jordanmingle.dev/rizzo-css.jordanmingle.dev` |
| `PUBLIC_ALGOLIA_APP_ID`, `PUBLIC_ALGOLIA_SEARCH_KEY`, `PUBLIC_ALGOLIA_INDEX_NAME`, `PUBLIC_ALGOLIA_ENABLED` | Same as `.env`. These are read when the site is built; see [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) |

## Running the production server locally

```bash
pnpm build && pnpm serve:prod   # http://localhost:4321 (override with PORT=…)
```

## Troubleshooting

- **The Plesk placeholder page appears**: `httpdocs/` isn't empty.
- **The site doesn't update after a deploy**: check that `tmp/restart.txt` exists in the application root, or click **Restart App** in Plesk's Node.js page.
- **The Passenger error page appears**: check the logs under **Websites & Domains → Logs**. Run `node server.cjs` over SSH to see startup errors.
