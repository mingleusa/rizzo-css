#!/usr/bin/env node
/**
 * Report CSS bundle sizes (after build). Run: pnpm build:css && node scripts/bundle-size.mjs
 * With --check: fail (exit 1) if package CSS exceeds BUNDLE_SIZE_BUDGET_BYTES.
 * Budget is documented in PUBLISHING.md and CONTRIBUTING.md.
 */
import { readFileSync, statSync, existsSync } from 'fs';
import { gzipSync } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const BUNDLE_SIZE_BUDGET_BYTES = 450 * 1024; // 450 kB for packages/rizzo-css/dist/rizzo.min.css
const checkBudget = process.argv.includes('--check') || process.env.CHECK_BUDGET === '1';

const files = [
  { path: join(root, 'public/css/main.min.css'), label: 'public/css/main.min.css (site)' },
  { path: join(root, 'packages/rizzo-css/dist/rizzo.min.css'), label: 'packages/rizzo-css/dist/rizzo.min.css (package)', budget: BUNDLE_SIZE_BUDGET_BYTES },
];

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(2)} kB`;
}

console.log('CSS bundle size (run after pnpm build:css)\n');

let total = 0;
let overBudget = false;
for (const { path: filePath, label, budget } of files) {
  if (!existsSync(filePath)) {
    console.log(`  ${label}: (not found — run pnpm build:css first)`);
    if (checkBudget && budget) process.exit(1);
    continue;
  }
  const stat = statSync(filePath);
  const size = stat.size;
  total += size;
  const content = readFileSync(filePath);
  const gzipLen = gzipSync(content).length;
  let line = `  ${label}: ${formatBytes(size)} (gzip: ${formatBytes(gzipLen)})`;
  if (budget && size > budget) {
    line += ` — over budget (${formatBytes(budget)} max)`;
    overBudget = true;
  } else if (budget && checkBudget) {
    line += ` — within budget (${formatBytes(budget)} max)`;
  }
  console.log(line);
}

if (total > 0) {
  console.log(`\n  Total (both): ${formatBytes(total)}`);
}

if (checkBudget && overBudget) {
  console.error('\n  Bundle size budget exceeded. See docs/PUBLISHING.md and CONTRIBUTING.md.');
  process.exit(1);
}
