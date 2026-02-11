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

// Astro components to scaffold (exclude docs-only: Navbar, Search, Settings, ThemeSwitcher, FrameworkSwitcher, CodeBlock)
const ASTRO_SCAFFOLD = [
  'Accordion', 'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Button', 'Card', 'Checkbox',
  'CopyToClipboard', 'Divider', 'Dropdown', 'FormGroup', 'Input', 'Modal', 'Pagination',
  'ProgressBar', 'Radio', 'Select', 'Spinner', 'Table', 'Tabs', 'Textarea', 'Toast', 'Tooltip',
];

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
  mkdirSync(svelteDest, { recursive: true });
  const entries = readdirSync(svelteSrc, { withFileTypes: true });
  let count = 0;
  // ThemeSwitcher depends on repo config/themes and utils/theme; exclude from scaffold so 24 components work out of the box
  const SVELTE_SCAFFOLD_SKIP = new Set(['ThemeSwitcher.svelte']);
  for (const e of entries) {
    if (e.name === 'docs' || e.name === 'node_modules') continue;
    if (SVELTE_SCAFFOLD_SKIP.has(e.name)) continue;
    if (e.isFile() && (e.name.endsWith('.svelte') || e.name === 'index.ts')) {
      copyFileSync(join(svelteSrc, e.name), join(svelteDest, e.name));
      count++;
    }
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
  mkdirSync(astroDest, { recursive: true });
  let count = 0;
  for (const name of ASTRO_SCAFFOLD) {
    const srcFile = join(astroSrc, name + '.astro');
    if (existsSync(srcFile)) {
      copyFileSync(srcFile, join(astroDest, name + '.astro'));
      count++;
    }
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
