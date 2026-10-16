#!/usr/bin/env node
/**
 * Regenerates the tech badges and the tech-stack table in README.md from the versions
 * actually installed in node_modules, so they cannot drift from package.json / the lockfile.
 *
 *   pnpm readme:tech           rewrite the marked blocks in README.md
 *   pnpm readme:tech --check   exit 1 if README.md is out of date (no write)
 *
 * Marked blocks (edit everything else in README.md by hand):
 *   <!-- tech-badges:start --> ... <!-- tech-badges:end -->
 *   <!-- tech-stack:start -->  ... <!-- tech-stack:end -->
 */
import { readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = join(root, 'README.md');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

/** Installed version of `name`, optionally resolved from inside another package (transitive deps). */
function installed(name, via) {
  const base = via ? realpathSync(join(root, 'node_modules', via)) : join(root, 'node_modules', name);
  const req = createRequire(join(base, 'package.json'));
  const file = via ? req.resolve(`${name}/package.json`) : join(base, 'package.json');
  return JSON.parse(readFileSync(file, 'utf8')).version;
}

const majorMinor = (v) => v.split('.').slice(0, 2).join('.');
const major = (v) => v.split('.')[0];

/** group: where it appears; fmt: how the version is shown. */
const TECH = [
  // Frameworks
  { group: 'Frameworks', name: 'Astro', pkg: 'astro', fmt: majorMinor, color: 'FF5D01', logo: 'astro', url: 'https://astro.build', note: 'Docs site and reference components; React/Vue/Svelte islands via official integrations' },
  { group: 'Frameworks', name: 'Svelte', pkg: 'svelte', fmt: majorMinor, color: 'FF3E00', logo: 'svelte', url: 'https://svelte.dev', note: 'Components and docs at `/docs/svelte`; SvelteKit scaffold' },
  { group: 'Frameworks', name: 'React', pkg: 'react', fmt: majorMinor, color: '61DAFB', logo: 'react', logoColor: 'black', url: 'https://react.dev', note: 'Components and docs at `/docs/react`; Vite scaffold' },
  { group: 'Frameworks', name: 'Vue', pkg: 'vue', fmt: majorMinor, color: '4FC08D', logo: 'vuedotjs', url: 'https://vuejs.org', note: 'Components and docs at `/docs/vue`; Vite scaffold' },
  // Build & tooling
  { group: 'Build & tooling', name: 'TypeScript', pkg: 'typescript', fmt: majorMinor, color: '3178C6', logo: 'typescript', url: 'https://www.typescriptlang.org', note: 'Type safety' },
  { group: 'Build & tooling', name: 'Vite', pkg: 'vite', via: 'astro', fmt: major, color: '646CFF', logo: 'vite', url: 'https://vite.dev', note: 'Bundler under Astro; Vite scaffolds for Svelte, React and Vue' },
  { group: 'Build & tooling', name: 'PostCSS', pkg: 'postcss', fmt: majorMinor, color: 'DD3A0A', logo: 'postcss', url: 'https://postcss.org', note: 'CSS pipeline: postcss-import, Autoprefixer, cssnano' },
  { group: 'Build & tooling', name: 'Stylelint', pkg: 'stylelint', fmt: major, color: '263238', logo: 'stylelint', url: 'https://stylelint.io', note: 'CSS linting' },
  { group: 'Build & tooling', name: 'Husky', pkg: 'husky', fmt: major, color: '8F8F8F', logo: 'git', url: 'https://typicode.github.io/husky/', note: 'Git hooks: pre-commit runs lint-staged; pre-push runs build + smoke tests' },
  // Quality
  { group: 'Quality', name: 'Playwright', pkg: '@playwright/test', fmt: majorMinor, color: '2D4552', logo: 'playwright', url: 'https://playwright.dev', note: 'Smoke, accessibility and visual regression tests' },
  { group: 'Quality', name: 'axe-core', pkg: 'axe-core', via: '@axe-core/playwright', fmt: majorMinor, color: '007DC2', logo: 'accessibility', url: 'https://github.com/dequelabs/axe-core', note: 'Accessibility rules (via @axe-core/playwright)' },
  { group: 'Quality', name: 'Storybook', pkg: 'storybook', fmt: major, color: 'FF4785', logo: 'storybook', url: 'https://storybook.js.org', note: 'React component playground (optional)' },
  // Services
  { group: 'Services', name: 'Algolia', pkg: 'algoliasearch', fmt: major, color: '5468FF', logo: 'algolia', url: 'https://www.algolia.com', note: 'Docs-site search (optional)' },
].map((t) => ({ ...t, version: t.fmt(installed(t.pkg, t.via)) }));

// Runtime requirements come from the repo itself, not node_modules.
const nodeReq = (pkg.engines?.node ?? '').replace(/^>=/, '');
const pnpmVersion = (pkg.packageManager ?? '').split('@')[1] ?? '';
const RUNTIME = [
  { group: 'Build & tooling', name: 'Node.js', version: nodeReq ? `${nodeReq}+` : '', color: '5FA04E', logo: 'nodedotjs', url: 'https://nodejs.org', note: 'Required to build this repo (Astro 7, cssnano 9); the published CLI supports Node 18+' },
  { group: 'Build & tooling', name: 'pnpm', version: pnpmVersion ? majorMinor(pnpmVersion) : '', color: 'F69220', logo: 'pnpm', url: 'https://pnpm.io', note: 'Package manager (`packageManager` field)' },
];

const all = [...TECH, ...RUNTIME].filter((t) => t.version);

/** shields.io static-badge path segments escape `-` and `_`; spaces become `_`. */
const esc = (s) => String(s).replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_');
const badge = (t) => {
  const q = new URLSearchParams({ style: 'flat-square', logo: t.logo, logoColor: t.logoColor ?? 'white' });
  return `<a href="${t.url}"><img src="https://img.shields.io/badge/${esc(t.name)}-${esc(t.version)}-${t.color}?${q}" alt="${t.name} ${t.version}" /></a>`;
};

const GROUPS = ['Frameworks', 'Build & tooling', 'Quality', 'Services'];

const badges = [
  '<p align="center">',
  '  <a href="https://www.npmjs.com/package/rizzo-css"><img src="https://img.shields.io/npm/v/rizzo-css?style=flat-square&logo=npm&logoColor=white&color=CB3837" alt="npm version" /></a>',
  '  <a href="./LICENSE"><img src="https://img.shields.io/github/license/mingleusa/rizzo-css?style=flat-square&color=yellow" alt="License: MIT" /></a>',
  '  <a href="https://github.com/mingleusa/rizzo-css/actions/workflows/a11y.yml"><img src="https://img.shields.io/github/actions/workflow/status/mingleusa/rizzo-css/a11y.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=CI" alt="CI status" /></a>',
  '</p>',
  '',
  ...GROUPS.flatMap((g) => {
    const items = all.filter((t) => t.group === g);
    return items.length ? [`<p align="center">`, `  ${items.map(badge).join('\n  ')}`, `</p>`, ''] : [];
  }),
].join('\n').trimEnd();

const stack = [
  '| Area | Tool | Version | Role |',
  '|------|------|---------|------|',
  ...GROUPS.flatMap((g) =>
    all.filter((t) => t.group === g).map((t) => `| ${g} | [${t.name}](${t.url}) | \`${t.version}\` | ${t.note} |`),
  ),
].join('\n');

function replaceBlock(text, tag, body) {
  const re = new RegExp(`(<!-- ${tag}:start -->)[\\s\\S]*?(<!-- ${tag}:end -->)`);
  if (!re.test(text)) throw new Error(`README.md is missing the <!-- ${tag}:start/end --> markers`);
  return text.replace(re, `$1\n${body}\n$2`);
}

const before = readFileSync(readmePath, 'utf8');
let after = replaceBlock(before, 'tech-badges', badges);
after = replaceBlock(after, 'tech-stack', stack);

if (process.argv.includes('--check')) {
  if (after !== before) {
    console.error('README.md tech badges/stack are out of date. Run: pnpm readme:tech');
    process.exit(1);
  }
  console.log('README.md tech badges/stack are up to date.');
} else if (after !== before) {
  writeFileSync(readmePath, after);
  console.log(`README.md updated (${all.length} technologies).`);
} else {
  console.log('README.md already up to date.');
}
