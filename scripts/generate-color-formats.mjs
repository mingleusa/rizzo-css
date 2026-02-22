#!/usr/bin/env node
/**
 * Generates color-format-tokens.css: for each color variable (--var) in theme and
 * variables CSS we output --var--oklch, --var--hex, --var--rgb, --var--hsl so the
 * colors page can read and display the correct format without runtime conversion.
 *
 * Run: node scripts/generate-color-formats.mjs
 * Then build CSS so the generated file is included.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as culori from 'culori';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcStyles = join(root, 'src/styles');

/** Normalize oklch for display: L%, C, H deg */
function toOklchString(color) {
  if (!color || color.mode !== 'oklch') return '';
  const L = Math.round((color.l ?? 0) * 100);
  const C = (color.c ?? 0);
  const H = Math.round((color.h ?? 0));
  return `oklch(${L}% ${C} ${H}deg)`;
}

/** Convert any culori color to hex, rgb, hsl, oklch strings */
function toFormats(color) {
  if (!color) return null;
  try {
    const hex = culori.formatHex(color);
    const rgb = culori.formatRgb(color);
    const hsl = culori.formatHsl(color);
    const oklch = toOklchString(culori.oklch(color));
    return { hex, rgb, hsl, oklch };
  } catch {
    return null;
  }
}

/** Parse a single color value to culori color (or null) */
function parseColorValue(value, varMap = {}) {
  if (!value || typeof value !== 'string') return null;
  const v = value.trim();
  // Literal oklch(L% C H) or oklch(L C H)
  const oklchLiteral = v.match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*\)$/);
  if (oklchLiteral) {
    const L = parseFloat(oklchLiteral[1]);
    const Lnorm = L <= 1 ? L : L / 100;
    const C = parseFloat(oklchLiteral[2]);
    const H = parseFloat(oklchLiteral[3]);
    return culori.oklch({ mode: 'oklch', l: Lnorm, c: C, h: H });
  }
  // oklch(from var(--x) L C h) – use base var's hue (L/C may have optional "deg" in theme files)
  const fromMatch = v.match(/^oklch\(\s*from\s+var\((--[a-zA-Z0-9-]+)\)\s+([\d.]+)(?:deg)?\s+([\d.]+)(?:deg)?\s+h\s*\)$/);
  if (fromMatch) {
    const baseVar = fromMatch[1];
    const L = parseFloat(fromMatch[2]);
    const C = parseFloat(fromMatch[3]);
    const base = varMap[baseVar];
    if (!base) return null;
    const baseOklch = culori.oklch(base);
    if (!baseOklch || baseOklch.mode !== 'oklch') return null;
    const H = baseOklch.h ?? 0;
    return culori.oklch({ mode: 'oklch', l: L, c: C, h: H });
  }
  // oklch(from var(--x) l c h / N%) – overlay-style: take L,c,h from base, apply alpha
  const fromAlphaMatch = v.match(/^oklch\(\s*from\s+var\((--[a-zA-Z0-9-]+)\)\s+l\s+c\s+h\s*\/\s*([\d.]+)%\s*\)$/);
  if (fromAlphaMatch) {
    const baseVar = fromAlphaMatch[1];
    const alpha = parseFloat(fromAlphaMatch[2]) / 100;
    const base = varMap[baseVar];
    if (!base) return null;
    const baseOklch = culori.oklch(base);
    if (!baseOklch || baseOklch.mode !== 'oklch') return null;
    const L = baseOklch.l ?? 0;
    const C = baseOklch.c ?? 0;
    const H = baseOklch.h ?? 0;
    return culori.oklch({ mode: 'oklch', l: L, c: C, h: H, alpha });
  }
  // var(--x)
  const varMatch = v.match(/^var\((--[a-zA-Z0-9-]+)\)$/);
  if (varMatch) {
    const ref = varMap[varMatch[1]];
    return ref ? culori.oklch(ref) : null;
  }
  // Let culori try (hex, rgb, hsl, etc.)
  try {
    return culori.oklch(culori.parse(v));
  } catch {
    return null;
  }
}

/** Find matching closing brace; start at index of opening {. Returns end index or -1. */
function findMatchingBrace(str, start) {
  let depth = 0;
  for (let i = start; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Extract rule blocks: { selector, content }. Handles nested {} so theme blocks with nested rules are fully read. */
function extractBlocks(css, selectorPattern) {
  const blocks = [];
  const re = new RegExp(`(${selectorPattern})\\s*\\{`, 'g');
  let m;
  while ((m = re.exec(css)) !== null) {
    const openIdx = m.index + m[0].length;
    const closeIdx = findMatchingBrace(css, openIdx - 1);
    if (closeIdx === -1) continue;
    const content = css.slice(openIdx, closeIdx);
    blocks.push({ selector: m[1].trim(), content });
  }
  return blocks;
}

/** Extract --name: value; declarations from block content */
function extractVars(content) {
  const vars = {};
  const re = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

/** Only variables that look like colors (oklch, var, #, rgb, hsl) */
function isColorValue(value) {
  return /^oklch\(|^var\(|^#|^rgb\(|^hsl\(|^rgba\(|^hsla\(/.test(value.trim());
}

function processBlock(selector, content, out) {
  const declarations = extractVars(content);
  const resolved = {};
  const order = [];

  // Only consider color-like declarations
  for (const name of Object.keys(declarations)) {
    if (isColorValue(declarations[name])) order.push(name);
  }

  // Multi-pass: resolve var() and oklch(from var()) once their dependencies are in resolved
  let changed = true;
  for (let pass = 0; pass < 50 && changed; pass++) {
    changed = false;
    for (const name of order) {
      if (resolved[name]) continue;
      const value = declarations[name];
      const color = parseColorValue(value, resolved);
      if (color) {
        resolved[name] = color;
        changed = true;
      }
    }
  }

  const lines = [];
  for (const name of order) {
    const color = resolved[name];
    if (!color) continue;
    const fmt = toFormats(color);
    if (!fmt) continue;
    lines.push(`  ${name}--oklch: ${fmt.oklch};`);
    lines.push(`  ${name}--hex: ${fmt.hex};`);
    lines.push(`  ${name}--rgb: ${fmt.rgb};`);
    lines.push(`  ${name}--hsl: ${fmt.hsl};`);
  }
  if (lines.length) {
    out.push(`${selector} {`);
    out.push(lines.join('\n'));
    out.push('}\n');
  }
}

function main() {
  const out = [
    '/* Auto-generated by scripts/generate-color-formats.mjs – do not edit */',
    '/* Format-specific tokens for the colors docs page (read from CSS, no runtime conversion). */',
    '',
  ];

  // 1) :root from variables.css (neutral scale + any other color vars)
  const variablesPath = join(srcStyles, 'variables.css');
  const variablesCss = readFileSync(variablesPath, 'utf8');
  const rootBlocks = extractBlocks(variablesCss, ':root');
  for (const { selector, content } of rootBlocks) {
    processBlock(selector, content, out);
  }

  // 2) Theme files: [data-theme="..."]
  const themesDir = join(srcStyles, 'themes');
  const themeDirs = ['dark', 'light'];
  for (const dir of themeDirs) {
    const themePath = join(themesDir, dir);
    try {
      const entries = readdirSync(themePath, { withFileTypes: true });
      for (const ent of entries) {
        if (!ent.isFile() || !ent.name.endsWith('.css')) continue;
        const css = readFileSync(join(themePath, ent.name), 'utf8');
        const blocks = extractBlocks(css, '\\[data-theme="[^"]+"\\]');
        for (const { selector, content } of blocks) {
          processBlock(selector, content, out);
        }
      }
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
  }

  const outputPath = join(srcStyles, 'color-format-tokens.css');
  writeFileSync(outputPath, out.join('\n'), 'utf8');
  console.log('Wrote', outputPath);
}

main();
