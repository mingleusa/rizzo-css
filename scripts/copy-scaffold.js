/**
 * Copies Svelte and Astro component templates into packages/rizzo-css/scaffold/
 * so the CLI can offer framework + component selection. Run before publishing (e.g. in prepublishOnly).
 * Also generates Svelte icon components from Astro icons and static SVG icons for vanilla.
 */
import { copyFileSync, mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve repo root: script is at <repo>/scripts/copy-scaffold.js (works with node scripts/copy-scaffold.js from repo root)
const selfDir = __dirname;
const rootDir = resolve(selfDir, '..');
const pkgDir = join(rootDir, 'packages', 'rizzo-css');
const scaffoldDir = join(pkgDir, 'scaffold');

const svelteSrc = resolve(rootDir, 'src', 'components', 'svelte');
const svelteDest = join(scaffoldDir, 'svelte');
const astroSrc = resolve(rootDir, 'src', 'components');
const astroDest = join(scaffoldDir, 'astro');

// Astro components to scaffold. Navbar, Search, Settings use minimal scaffold content (no docs config).
const ASTRO_SCAFFOLD = [
  'Accordion', 'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Button', 'Card', 'Checkbox',
  'CopyToClipboard', 'Divider', 'Dropdown', 'FormGroup', 'Input', 'Modal', 'Navbar', 'Pagination',
  'ProgressBar', 'Radio', 'Search', 'Select', 'Settings', 'Spinner', 'Table', 'Tabs', 'Textarea', 'ThemeIcon', 'ThemeSwitcher', 'Toast', 'Tooltip',
];

/** Minimal Astro scaffold content for components that depend on docs config in src. Same BEM structure, no docs deps. */
const ASTRO_SCAFFOLD_MINIMAL = {
  Navbar: `---
interface Props { siteName?: string; }
const { siteName = 'Site' } = Astro.props;
---
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">{siteName}</a>
    </div>
    <button type="button" class="navbar__toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <div class="navbar__menu" aria-hidden="true">
      <a href="/" class="navbar__link">Home</a>
    </div>
  </div>
</nav>
`,
  Search: `---
interface Props { id?: string; }
const { id = 'search-main' } = Astro.props;
---
<div class="search" data-search>
  <div class="search__trigger-wrapper">
    <button type="button" class="search__trigger" aria-label="Open search" aria-expanded="false" aria-controls="{id}-panel">
      <span class="search__trigger-text">Search</span>
    </button>
  </div>
  <div class="search__overlay" id="{id}-panel" aria-hidden="true" role="dialog" aria-modal="true" data-search-overlay>
    <div class="search__panel">
      <input type="search" class="search__input" placeholder="Search…" aria-label="Search" />
    </div>
  </div>
</div>
`,
  Settings: `---
interface Props {}
---
<div class="settings" data-settings aria-hidden="true">
  <div class="settings__overlay" data-settings-overlay aria-hidden="true"></div>
  <div class="settings__panel" role="dialog" aria-modal="true" aria-labelledby="settings-title" aria-hidden="true">
    <div class="settings__header">
      <h2 id="settings-title" class="settings__title">Settings</h2>
      <button type="button" class="settings__close" data-settings-close aria-label="Close">×</button>
    </div>
    <div class="settings__content"><p>Theme, font size, and accessibility options. Wire to your state and <code>window.openSettings</code>.</p></div>
  </div>
</div>
`,
};

function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = join(src, e.name);
    const destPath = join(dest, e.name);
    if (e.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/** Convert one Astro icon to a Svelte icon component. */
function astroIconToSvelte(astroPath, sveltePath, relativeName) {
  const raw = readFileSync(astroPath, 'utf8');
  const parts = raw.split('---');
  const template = parts.length >= 3 ? parts.slice(2).join('---').trim() : raw;
  const baseName = relativeName.replace(/\.astro$/, '').replace(/^.*[\\/]/, '');
  const idPrefix = baseName.toLowerCase().replace(/\s+/g, '-');
  let svg = template
    .replace(/\bclass=\{className\}/g, 'class={className}')
    .replace(/\bclass=\{`([^`]*)`\.trim\(\)\}/g, (_, inner) => 'class="' + inner.replace(/\$\{className\}/g, '{className}') + '"')
    .replace(/\bid=\{gradientId1\}/g, `id="${idPrefix}-grad-1"`)
    .replace(/\bid=\{gradientId2\}/g, `id="${idPrefix}-grad-2"`)
    .replace(/\bfill=\{`url\(#\$\{gradientId1\}\)`\}/g, `fill="url(#${idPrefix}-grad-1)"`)
    .replace(/\bfill=\{`url\(#\$\{gradientId2\}\)`\}/g, `fill="url(#${idPrefix}-grad-2)"`);
  svg = svg.replace(/url\(#\$\{gradientId1\}\)/g, `url(#${idPrefix}-grad-1)`);
  svg = svg.replace(/url\(#\$\{gradientId2\}\)/g, `url(#${idPrefix}-grad-2)`);
  // Remove <style is:global> blocks (Svelte can use :global in <style> if needed; for simplicity strip for now)
  svg = svg.replace(/<style is:global>[^]*?<\/style>\s*/g, '');
  const svelteContent = `<script>
  export let width = 16;
  export let height = 16;
  export let className = '';
</script>

${svg}
`;
  mkdirSync(dirname(sveltePath), { recursive: true });
  writeFileSync(sveltePath, svelteContent);
}

/** Recursively convert Astro icons dir to Svelte icons dir. */
function copyAstroIconsToSvelte(astroIconsDir, svelteIconsDir) {
  if (!existsSync(astroIconsDir)) return 0;
  mkdirSync(svelteIconsDir, { recursive: true });
  let count = 0;
  const entries = readdirSync(astroIconsDir, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = join(astroIconsDir, e.name);
    const destPath = join(svelteIconsDir, e.name.replace(/\.astro$/, '.svelte'));
    if (e.isDirectory()) {
      count += copyAstroIconsToSvelte(srcPath, destPath);
    } else if (e.name.endsWith('.astro')) {
      astroIconToSvelte(srcPath, destPath, e.name);
      count++;
    }
  }
  return count;
}

/** Extract raw SVG from Astro icon and write to file (for vanilla). */
function extractSvgFromAstro(astroPath) {
  const raw = readFileSync(astroPath, 'utf8');
  const parts = raw.split('---');
  const template = parts.length >= 3 ? parts.slice(2).join('---').trim() : raw;
  const match = template.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) return null;
  let svg = match[0]
    .replace(/\s*width=\{[^}]+\}/, ' width="24"')
    .replace(/\s*height=\{[^}]+\}/, ' height="24"')
    .replace(/\s*class=\{[^}]+\}/, '')
    .replace(/\s*class=\{[\s\S]*?\.trim\(\)\}/, '')
    .replace(/\s*class=\{[^}]+\}/, '')
    .replace(/\bid=\{gradientId1\}/g, 'id="grad-1"')
    .replace(/\bid=\{gradientId2\}/g, 'id="grad-2"')
    .replace(/\bfill=\{`url\(#\$\{gradientId1\}\)`\}/g, 'fill="url(#grad-1)"')
    .replace(/\bfill=\{`url\(#\$\{gradientId2\}\)`\}/g, 'fill="url(#grad-2)"')
    .replace(/"`\.trim\(\)\}/g, '"')
    .replace(/`\.trim\(\)\}/g, '');
  return svg;
}

function copyVanillaIcons(astroIconsDir, vanillaIconsDir) {
  if (!existsSync(astroIconsDir)) return 0;
  let count = 0;
  function walk(dir, rel = '') {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const srcPath = join(dir, e.name);
      const destRel = rel ? join(rel, e.name) : e.name;
      if (e.isDirectory()) {
        mkdirSync(join(vanillaIconsDir, destRel), { recursive: true });
        walk(srcPath, destRel);
      } else if (e.name.endsWith('.astro')) {
        const svg = extractSvgFromAstro(srcPath);
        if (svg) {
          const outPath = join(vanillaIconsDir, destRel.replace(/\.astro$/, '.svg'));
          mkdirSync(dirname(outPath), { recursive: true });
          writeFileSync(outPath, svg);
          count++;
        }
      }
    }
  }
  mkdirSync(vanillaIconsDir, { recursive: true });
  walk(astroIconsDir);
  return count;
}

function copySvelte() {
  if (!existsSync(svelteSrc)) {
    console.warn('copy-scaffold: ' + svelteSrc + ' not found, skipping');
    return;
  }
  const configDir = resolve(rootDir, 'src', 'config');
  const utilsDir = resolve(rootDir, 'src', 'utils');
  mkdirSync(svelteDest, { recursive: true });
  const entries = readdirSync(svelteSrc, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (e.name === 'docs' || e.name === 'node_modules') continue;
    if (e.isFile() && (e.name.endsWith('.svelte') || e.name === 'index.ts')) {
      let destPath = join(svelteDest, e.name);
      if (e.name === 'ThemeSwitcher.svelte') {
        let content = readFileSync(join(svelteSrc, e.name), 'utf8');
        content = content.replace(/from '\.\.\/\.\.\/config\/themes'|from "\.\.\/\.\.\/config\/themes"/g, "from './themes'");
        content = content.replace(/from '\.\.\/\.\.\/utils\/theme'|from "\.\.\/\.\.\/utils\/theme"/g, "from './theme'");
        writeFileSync(destPath, content);
      } else {
        copyFileSync(join(svelteSrc, e.name), destPath);
      }
      count++;
    }
  }
  if (existsSync(join(configDir, 'themes.ts'))) {
    copyFileSync(join(configDir, 'themes.ts'), join(svelteDest, 'themes.ts'));
  }
  if (existsSync(join(utilsDir, 'theme.ts'))) {
    let themeContent = readFileSync(join(utilsDir, 'theme.ts'), 'utf8');
    themeContent = themeContent.replace(/from '\.\.\/config\/themes'|from "\.\.\/config\/themes"/g, "from './themes'");
    writeFileSync(join(svelteDest, 'theme.ts'), themeContent);
  }
  // Copy Svelte icons from repo (Svelte 5, $props) so scaffold matches project
  const svelteIconsSrc = join(svelteSrc, 'icons');
  const svelteIconsDest = join(svelteDest, 'icons');
  if (existsSync(svelteIconsSrc)) {
    copyDirRecursive(svelteIconsSrc, svelteIconsDest);
  }
  console.log('copy-scaffold: Svelte components + icons (from src) -> packages/rizzo-css/scaffold/svelte');
}

function copyAstro() {
  if (!existsSync(astroSrc)) {
    console.warn('copy-scaffold: ' + astroSrc + ' not found, skipping');
    return;
  }
  const configDir = resolve(rootDir, 'src', 'config');
  mkdirSync(astroDest, { recursive: true });
  let count = 0;
  for (const name of ASTRO_SCAFFOLD) {
    const destFile = join(astroDest, name + '.astro');
    if (ASTRO_SCAFFOLD_MINIMAL[name]) {
      writeFileSync(destFile, ASTRO_SCAFFOLD_MINIMAL[name]);
      count++;
    } else {
      const srcFile = join(astroSrc, name + '.astro');
      if (existsSync(srcFile)) {
        let content = readFileSync(srcFile, 'utf8');
        if (name === 'ThemeSwitcher' || name === 'ThemeIcon') {
          content = content.replace(/'\.\.\/config\/themes'|"\.\.\/config\/themes"/g, "'./themes'");
        }
        writeFileSync(destFile, content);
        count++;
      }
    }
  }
  if (existsSync(join(configDir, 'themes.ts'))) {
    copyFileSync(join(configDir, 'themes.ts'), join(astroDest, 'themes.ts'));
  }
  const iconsSrc = join(astroSrc, 'icons');
  if (existsSync(iconsSrc)) {
    copyDirRecursive(iconsSrc, join(astroDest, 'icons'));
  }
  const vanillaIconsDir = join(scaffoldDir, 'vanilla', 'icons');
  const vanillaCount = copyVanillaIcons(join(astroDest, 'icons'), vanillaIconsDir);
  console.log('copy-scaffold: ' + ASTRO_SCAFFOLD.length + ' Astro components + icons -> packages/rizzo-css/scaffold/astro');
  console.log('copy-scaffold: ' + vanillaCount + ' vanilla SVG icons -> packages/rizzo-css/scaffold/vanilla/icons');
}

copyAstro();
copySvelte();
