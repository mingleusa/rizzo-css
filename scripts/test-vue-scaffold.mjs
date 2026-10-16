#!/usr/bin/env node
/**
 * End-to-end test for the Vue scaffold: generates a project with the real CLI (Full template, all
 * components), installs it, type-checks and builds it, then runs the behavior + axe suite in
 * tests/vue-scaffold/ against the Vite dev server.
 *
 *   pnpm test:vue-scaffold          (needs network for the install, and `pnpm build:css` run once; Chromium via Playwright)
 *
 * Set KEEP=1 to keep the generated project (its path is printed).
 */
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'packages', 'rizzo-css', 'bin', 'rizzo-css.js');
const testDir = join(root, 'tests', 'vue-scaffold');
const project = join(mkdtempSync(join(tmpdir(), 'rizzo-vue-')), 'app');

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) {
    console.error(`\n✗ ${cmd} ${args.join(' ')} failed (exit ${r.status})`);
    cleanup();
    process.exit(r.status || 1);
  }
}

function cleanup() {
  if (process.env.KEEP) console.log(`Project kept at ${project}`);
  else rmSync(dirname(project), { recursive: true, force: true });
}

function freePort() {
  return new Promise((res, rej) => {
    const srv = createServer();
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => res(port));
    });
    srv.on('error', rej);
  });
}

async function waitFor(url, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Dev server did not start at ${url}`);
}

if (!existsSync(join(root, 'packages', 'rizzo-css', 'dist', 'rizzo.min.css'))) {
  console.error('packages/rizzo-css/dist/rizzo.min.css is missing. Run `pnpm build:css` first.');
  process.exit(1);
}

console.log('→ Generating a Vue (Full template) project with the CLI…');
run('node', [cli, 'init', '--yes', '--path', project, '--framework', 'vue', '--template', 'full', '--package-manager', 'pnpm', '--no-install', '--no-git'], { stdio: 'ignore' });

console.log('→ Installing dependencies…');
run('pnpm', ['install', '--ignore-workspace'], { cwd: project });

// Mount the demo page (every component) instead of the template's router app.
copyFileSync(join(testDir, 'Demo.vue'), join(project, 'src', 'Demo.vue'));
copyFileSync(join(testDir, 'main.ts'), join(project, 'src', 'main.ts'));

console.log('→ Type-checking and building (vue-tsc + vite)…');
run('pnpm', ['build'], { cwd: project });

console.log('→ Running behavior and accessibility checks…');
const port = await freePort();
const server = spawn('pnpm', ['exec', 'vite', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: project, stdio: 'ignore', detached: true });
let code = 1;
try {
  await waitFor(`http://127.0.0.1:${port}/`);
  const r = spawnSync('node', [join(testDir, 'behavior.mjs')], { stdio: 'inherit', env: { ...process.env, URL: `http://127.0.0.1:${port}/` }, cwd: root });
  code = r.status ?? 1;
} finally {
  try {
    process.kill(-server.pid);
  } catch {
    /* already stopped */
  }
  cleanup();
}
process.exit(code);
