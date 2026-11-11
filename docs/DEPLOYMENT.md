# Deployment

The docs site is served at **https://rizzo-css.jordanmingle.dev** as a **Plesk Node.js app** (Phusion Passenger).

The Astro build is fully static. [`deploy/server.cjs`](../deploy/server.cjs) is a small server with no dependencies. It serves `dist/` and adds cache headers (`immutable` for `/assets/`, `/_astro/`, `/css/`, `/icons/`) and security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`). It also gzips text responses and answers `ETag` revalidation with `304`. The server needs only Node, so nothing is installed on the server.

You build the site locally and upload it as a zip. No SSH or CI deploy is involved.

## Deploying a new version

1. **Build and package** on your machine, from a clean, up-to-date `main`:

   ```bash
   git switch main && git pull
   pnpm package:deploy
   ```

   This runs `pnpm build`, which uses your local `.env`, so the Algolia search keys are included. It then writes `release/rizzo-css-site-v<version>-<sha>.zip`, which contains `server.cjs` and `dist/`. If the filename ends in `-dirty`, the build included uncommitted changes.

2. **Upload**: in Plesk, open **Files** and go to the application root (`/rizzo-css.jordanmingle.dev/`, the folder that contains `httpdocs/`).
   - Delete the old `dist/` folder, so pages you've removed don't linger.
   - Upload the zip, select it, choose **Extract Files**, and confirm overwriting `server.cjs`.
   - Delete the zip.

3. **Restart**: go to **Websites & Domains → rizzo-css.jordanmingle.dev → Node.js** and click **Restart App**.

4. **Check** https://rizzo-css.jordanmingle.dev, a docs page, and `/blocks`.

To check the build before uploading, run `pnpm serve:prod` (http://localhost:4321). It uses the same server as production.

## Server layout

```
/var/www/vhosts/jordanmingle.dev/rizzo-css.jordanmingle.dev/   ← application root
├── server.cjs        ← application startup file
├── dist/             ← built site
└── httpdocs/         ← document root: keep EMPTY
```

Keep `httpdocs/` empty. nginx serves any file in the document root directly, which bypasses the Node app and its headers. That includes the placeholder `index.html` that Plesk creates.

## One-time Plesk setup

**Websites & Domains → rizzo-css.jordanmingle.dev → Node.js**:

- Node.js version: 22 or newer
- Application mode: `production`
- Application root: `/rizzo-css.jordanmingle.dev`
- Document root: `/rizzo-css.jordanmingle.dev/httpdocs`
- Application startup file: `server.cjs`
- Click **Enable Node.js**. Don't run *NPM install*, because there is no `package.json` on the server.

Then delete the default files from `httpdocs/`, and enable SSL (Let's Encrypt) with the HTTP→HTTPS redirect.

## Troubleshooting

- **The Plesk placeholder page appears**: `httpdocs/` isn't empty.
- **The Passenger error page appears**, or the page says the app failed to start: check that `server.cjs` and `dist/index.html` are directly in the application root, not inside an extra folder created by the extraction. Then check **Websites & Domains → Logs**.
- **Old content still shows**: click **Restart App**, then hard-refresh. HTML is served with `max-age=0`, so a hard refresh is enough.
