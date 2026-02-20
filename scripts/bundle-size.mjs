#!/usr/bin/env node
/**
 * Report CSS bundle sizes (after build). Run: pnpm build:css && node scripts/bundle-size.mjs
 * Or: pnpm build && pnpm run size (if you add a "size" script that runs this).
 */
import { readFileSync, statSync, existsSync } from 'fs';
import { gzipSync } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const files = [
  { path: join(root, 'public/css/main.min.css'), label: 'public/css/main.min.css (site)' },
  { path: join(root, 'packages/rizzo-css/dist/rizzo.min.css'), label: 'packages/rizzo-css/dist/rizzo.min.css (package)' },
];

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(2)} kB`;
}

console.log('CSS bundle size (run after pnpm build:css)\n');

let total = 0;
for (const { path: filePath, label } of files) {
  if (!existsSync(filePath)) {
    console.log(`  ${label}: (not found — run pnpm build:css first)`);
    continue;
  }
  const stat = statSync(filePath);
  const size = stat.size;
  total += size;
  const content = readFileSync(filePath);
  const gzipLen = gzipSync(content).length;
  console.log(`  ${label}: ${formatBytes(size)} (gzip: ${formatBytes(gzipLen)})`);
}

if (total > 0) {
  console.log(`\n  Total (both): ${formatBytes(total)}`);
}
