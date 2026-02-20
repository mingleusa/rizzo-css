#!/usr/bin/env node
/**
 * Check theme contrast for WCAG AA (4.5:1 normal text, 3:1 large/UI).
 * Reads theme CSS files, resolves --text/--background and --accent/--accent-text,
 * and reports pass/fail per theme.
 *
 * Run: pnpm check:contrast
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse, wcagContrast } from 'culori';

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = join(__dirname, '..', 'src', 'styles', 'themes');

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

function extractThemeBlock(css) {
  const match = css.match(/\[data-theme="([^"]+)"\]\s*\{([\s\S]*?)\n\}/);
  if (!match) return null;
  return { themeId: match[1], body: match[2] };
}

function parseVariables(body) {
  const vars = {};
  // Match --name: value; (value can be oklch(...) or var(--x))
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(body)) !== null) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

function resolveValue(name, vars, visited = new Set()) {
  if (visited.has(name)) return null;
  const raw = vars[name];
  if (!raw) return null;
  const varMatch = raw.match(/^var\s*\(\s*--([a-z0-9-]+)\s*\)$/i);
  if (varMatch) {
    visited.add(name);
    return resolveValue(varMatch[1], vars, visited);
  }
  return raw;
}

function parseOklch(str) {
  const s = str.trim();
  if (!/^oklch\s*\(/.test(s)) return null;
  return parse(s);
}

function checkTheme(themeId, css) {
  const block = extractThemeBlock(css);
  if (!block) return { themeId, error: 'No [data-theme] block found' };

  const vars = parseVariables(block.body);
  const bgRaw = resolveValue('bg', vars) || resolveValue('background', vars);
  const fgRaw = resolveValue('fg', vars) || resolveValue('text', vars);
  const accentRaw = resolveValue('accent', vars);
  const accentTextRaw = resolveValue('accent-text', vars);

  const bg = parseOklch(bgRaw);
  const fg = parseOklch(fgRaw);
  const accent = parseOklch(accentRaw);
  const accentText = parseOklch(accentTextRaw);

  const results = { themeId, textOnBg: null, accentTextOnAccent: null, ok: true };

  if (bg && fg) {
    results.textOnBg = wcagContrast(fg, bg);
    if (results.textOnBg < AA_NORMAL) results.ok = false;
  } else {
    results.ok = false;
    if (!bg) results.error = 'Missing --bg/--background (oklch)';
    else if (!fg) results.error = 'Missing --fg/--text (oklch)';
  }

  if (accent && accentText) {
    results.accentTextOnAccent = wcagContrast(accentText, accent);
    if (results.accentTextOnAccent < AA_NORMAL) results.ok = false;
  } else {
    if (!accent || !accentText) results.accentTextOnAccent = null;
    else results.ok = false;
  }

  return results;
}

function main() {
  const darkDir = join(THEMES_DIR, 'dark');
  const lightDir = join(THEMES_DIR, 'light');
  const darkFiles = readdirSync(darkDir).filter((f) => f.endsWith('.css'));
  const lightFiles = readdirSync(lightDir).filter((f) => f.endsWith('.css'));

  const all = [
    ...darkFiles.map((f) => ({ path: join(darkDir, f), id: f.replace('.css', '') })),
    ...lightFiles.map((f) => ({ path: join(lightDir, f), id: f.replace('.css', '') })),
  ];

  console.log('Theme contrast (WCAG AA: text/background and accent-text/accent ≥ 4.5:1)\n');

  let failed = 0;
  for (const { path: filePath, id } of all) {
    const css = readFileSync(filePath, 'utf8');
    const r = checkTheme(id, css);
    if (r.error) {
      console.log(`  ${id}: ERROR - ${r.error}`);
      failed++;
      continue;
    }
    const t = r.textOnBg != null ? r.textOnBg.toFixed(2) : '—';
    const a = r.accentTextOnAccent != null ? r.accentTextOnAccent.toFixed(2) : '—';
    const status = r.ok ? '✓' : '✗';
    if (!r.ok) failed++;
    console.log(`  ${status} ${id}`);
    console.log(`      text/background: ${t}:1  accent-text/accent: ${a}:1`);
  }

  console.log('');
  if (failed > 0) {
    console.log(`Failed: ${failed} theme(s). Required: ≥ ${AA_NORMAL}:1 for normal text (WCAG AA).`);
    process.exit(1);
  }
  console.log('All themes meet WCAG AA contrast (≥ 4.5:1).');
}

main();
