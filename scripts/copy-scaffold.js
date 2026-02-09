/**
 * Copies Svelte and Astro component templates into packages/rizzo-css/scaffold/
 * so the CLI can offer framework + component selection. Run before publishing (e.g. in prepublishOnly).
 */
const { copyFileSync, mkdirSync, readdirSync, existsSync } = require('fs');
const { join, dirname, resolve } = require('path');

// Resolve repo root: script is at <repo>/scripts/copy-scaffold.js (works with node scripts/copy-scaffold.js from repo root)
const scriptPath = process.argv[1] || require.main.filename;
const selfDir = resolve(process.cwd(), dirname(scriptPath));
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

function copySvelte() {
  if (!existsSync(svelteSrc)) {
    console.warn('copy-scaffold: ' + svelteSrc + ' not found, skipping');
    return;
  }
  mkdirSync(svelteDest, { recursive: true });
  const entries = readdirSync(svelteSrc, { withFileTypes: true });
  let count = 0;
  for (const e of entries) {
    if (e.name === 'docs' || e.name === 'node_modules') continue;
    if (e.isFile() && (e.name.endsWith('.svelte') || e.name === 'index.ts')) {
      copyFileSync(join(svelteSrc, e.name), join(svelteDest, e.name));
      count++;
    }
  }
  console.log('copy-scaffold: ' + count + ' Svelte files -> packages/rizzo-css/scaffold/svelte');
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
  console.log('copy-scaffold: ' + ASTRO_SCAFFOLD.length + ' Astro components + icons -> packages/rizzo-css/scaffold/astro');
}

copySvelte();
copyAstro();
