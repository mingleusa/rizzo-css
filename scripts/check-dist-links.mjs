#!/usr/bin/env node
/**
 * Verify that every root-relative URL in the built site resolves to a file in dist/.
 *
 * Scans dist HTML (src, href, srcset, poster attributes; <pre>/<code> samples are ignored) and dist CSS
 * (url(...)). A URL resolves if dist has that file, or <path>/index.html, as served by deploy/server.cjs.
 * Also rejects anything under /icons/: stock Apache installs alias that path to their own icon set
 * (Alias /icons/ /usr/share/apache2/icons/), so files there 404 on Apache/Plesk/cPanel hosts.
 *
 * Usage: node scripts/check-dist-links.mjs   (after pnpm build; exits 1 on problems)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html not found. Run `pnpm build` first.');
  process.exit(1);
}

const RESERVED = ['/icons/'];
// Fictional pages linked from live demos (Breadcrumb: Home / Blog / …, Footer: Docs · Privacy).
const DEMO_PLACEHOLDERS = new Set(['/blog', '/privacy']);

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

const exists = new Map();
function resolves(urlPath) {
  if (exists.has(urlPath)) return exists.get(urlPath);
  const target = path.join(dist, urlPath);
  let ok = false;
  if (target.startsWith(dist)) {
    try {
      const stat = fs.statSync(target);
      ok = stat.isFile() || fs.existsSync(path.join(target, 'index.html'));
    } catch {}
  }
  exists.set(urlPath, ok);
  return ok;
}

/** Normalize a raw attribute/url() value to a decoded root-relative path, or null if not local. */
function toPath(raw) {
  const value = raw.trim().replace(/&amp;/g, '&');
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  const clean = value.split(/[?#]/)[0];
  try {
    return decodeURIComponent(clean);
  } catch {
    return clean;
  }
}

const problems = new Map(); // url -> { reason, pages:Set }
function report(url, reason, file) {
  if (!problems.has(url)) problems.set(url, { reason, pages: new Set() });
  problems.get(url).pages.add('/' + path.relative(dist, file).split(path.sep).join('/'));
}

function check(raw, file) {
  const p = toPath(raw);
  if (!p) return;
  if (RESERVED.some((r) => p.startsWith(r))) report(p, `under ${RESERVED.join(', ')} (Apache reserves it)`, file);
  else if (!DEMO_PLACEHOLDERS.has(p) && !resolves(p)) report(p, 'missing from dist/', file);
}

const files = walk(dist);
let refs = 0;
for (const file of files) {
  if (file.endsWith('.html')) {
    // Code samples (<pre>, <code>) show example markup, not links on this site.
    const html = fs.readFileSync(file, 'utf8').replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/g, '');
    for (const m of html.matchAll(/\s(?:src|href|poster)="([^"]*)"/g)) {
      refs++;
      check(m[1], file);
    }
    for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) {
      for (const candidate of m[1].split(',')) {
        refs++;
        check(candidate.trim().split(/\s+/)[0], file);
      }
    }
  } else if (file.endsWith('.css')) {
    const css = fs.readFileSync(file, 'utf8');
    for (const m of css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
      refs++;
      check(m[2], file);
    }
  }
}

if (problems.size === 0) {
  console.log(`✓ dist links OK (${refs} references in ${files.length} files)`);
  process.exit(0);
}

console.error(`✗ ${problems.size} broken or disallowed URL(s) in dist/:\n`);
for (const [url, { reason, pages }] of [...problems].sort()) {
  const list = [...pages];
  console.error(`  ${url}  (${reason})`);
  console.error(`    in ${list.slice(0, 3).join(', ')}${list.length > 3 ? ` and ${list.length - 3} more` : ''}`);
}
process.exit(1);
