#!/usr/bin/env node

const { copyFileSync, mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync, statSync } = require('fs');
const { join, dirname } = require('path');
const readline = require('readline');

const COMMANDS = ['init', 'add', 'theme', 'help'];
const FRAMEWORKS = ['vanilla', 'astro', 'svelte'];
const THEMES = [
  'github-dark-classic',
  'github-light',
  'shades-of-purple',
  'sandstorm-classic',
  'rocky-blood-orange',
  'minimal-dark-neon-yellow',
  'hack-the-box',
  'pink-cat-boo',
  'red-velvet-cupcake',
  'orangy-one-light',
  'sunflower',
  'green-breeze-light',
  'cute-pink',
  'semi-light-purple',
];
// Components available for scaffold (must match scaffold/svelte and scaffold/astro)
const SVELTE_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table',
];
const ASTRO_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table',
];

// ANSI colors for CLI (framework logo colors)
const C = {
  reset: '\u001b[0m',
  dim: '\u001b[90m',
  cyan: '\u001b[36m',
  vanilla: '\u001b[38;5;226m', // Vanilla JS yellow
  astro: '\u001b[38;5;208m',   // Astro orange #ff5d01
  svelte: '\u001b[38;5;202m',  // Svelte orange #ff3e00
};

const CIRCLE_EMPTY = '\u25CB ';  // ○
const CIRCLE_FILLED = '\u25CF '; // ●

// Resolve path to this package (works when run via npx or from repo)
function getPackageRoot() {
  return dirname(require.resolve('../package.json'));
}

function getCssPath() {
  return join(getPackageRoot(), 'dist', 'rizzo.min.css');
}

function question(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve((answer || '').trim());
    });
  });
}

/** Format label with optional ANSI color (item.color). */
function formatLabel(item) {
  const text = item.label || item.value;
  return item.color ? item.color + text + C.reset : text;
}

/** Single-select menu with circles. options: array of { value, label, color? }. Returns selected value. */
function selectMenu(options, title) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const isTty = process.stdin.isTTY && process.stdout.isTTY;

  if (!isTty) {
    console.log('\n' + (title || 'Choose one') + ':');
    items.forEach((item, i) => console.log('  ' + (i + 1) + '. ' + (item.label || item.value)));
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
      rl.question('\nEnter number [1]: ', (answer) => {
        rl.close();
        const n = parseInt((answer || '1').trim(), 10);
        const idx = n >= 1 && n <= items.length ? n - 1 : 0;
        resolve(items[idx].value);
      });
    });
  }

  return new Promise((resolve) => {
    let index = 0;
    const lineCount = (title ? 1 : 0) + items.length + 1;

    const render = (first) => {
      const lines = (title ? [title] : []).concat(
        items.map((item, i) => {
          const circle = i === index ? CIRCLE_FILLED : CIRCLE_EMPTY;
          const prefix = i === index ? C.cyan + '>' + C.reset + ' ' : '  ';
          return prefix + circle + formatLabel(item);
        })
      );
      if (!first) {
        process.stdout.write('\u001b[' + lineCount + 'A');
      }
      process.stdout.write('\u001b[?25l');
      process.stdout.write(lines.join('\n') + '\n\n');
      process.stdout.write('\u001b[?25h');
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    render(true);

    let buf = '';
    const onData = (ch) => {
      if (ch === '\u0003') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        process.exit(130);
      }
      if (ch === '\r' || ch === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stdin.pause();
        process.stdout.write('\n');
        resolve(items[index].value);
        return;
      }
      buf += ch;
      const isUp = buf === '\u001b[A' || buf === '\u001bOA' || (buf.length >= 2 && buf.endsWith('A') && buf.startsWith('\u001b'));
      const isDown = buf === '\u001b[B' || buf === '\u001bOB' || (buf.length >= 2 && buf.endsWith('B') && buf.startsWith('\u001b'));
      if (isUp) {
        buf = '';
        index = index <= 0 ? items.length - 1 : index - 1;
        render(false);
      } else if (isDown) {
        buf = '';
        index = index >= items.length - 1 ? 0 : index + 1;
        render(false);
      } else if (buf.length > 12 || (buf.length === 1 && ch !== '\u001b')) {
        buf = '';
      }
    };
    process.stdin.on('data', onData);
  });
}

/** Index of first "real" option when using all/none sentinels (0=Select all, 1=Select none, 2+=real). */
const SENTINEL_ALL = '__all__';
const SENTINEL_NONE = '__none__';

function hasAllNoneSentinels(items) {
  return items.length >= 2 && items[0].value === SENTINEL_ALL && items[1].value === SENTINEL_NONE;
}

function getRealValues(items) {
  if (hasAllNoneSentinels(items)) return items.slice(2).map((i) => i.value);
  return items.map((i) => i.value);
}

/** Multi-select menu: circles ○/●, Space toggles, Enter confirms. Optional first two options: Select all / Select none (value __all__ / __none__). Returns array of selected values. */
function multiSelectMenu(options, title) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const isTty = process.stdin.isTTY && process.stdout.isTTY;
  const withSentinels = hasAllNoneSentinels(items);
  const realValues = getRealValues(items);

  if (!isTty) {
    console.log('\n' + (title || 'Choose (space to toggle, enter when done)') + ':');
    items.forEach((item, i) => console.log('  ' + (i + 1) + '. ' + (item.label || item.value)));
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
      rl.question('\nEnter numbers to include (e.g. 1 3 5 or all): ', (answer) => {
        rl.close();
        const s = (answer || '').trim().toLowerCase();
        if (s === 'all' || s === 'a') {
          resolve(realValues);
          return;
        }
        if (withSentinels && s === '1') {
          resolve(realValues);
          return;
        }
        if (withSentinels && (s === '2' || s === 'none' || s === 'n')) {
          resolve([]);
          return;
        }
        const parts = s.split(/[\s,]+/).filter(Boolean);
        const indices = new Set();
        for (const p of parts) {
          const n = parseInt(p, 10);
          if (n >= 1 && n <= items.length) indices.add(n - 1);
        }
        if (withSentinels && indices.has(0)) {
          resolve(realValues);
          return;
        }
        if (withSentinels && indices.has(1)) {
          resolve([]);
          return;
        }
        const result = Array.from(indices)
          .sort((a, b) => a - b)
          .filter((i) => !withSentinels || (i !== 0 && i !== 1))
          .map((i) => items[i].value);
        resolve(result);
      });
    });
  }

  return new Promise((resolve) => {
    let index = 0;
    const selected = new Set();
    const lineCount = (title ? 1 : 0) + items.length + 1;
    const realStart = withSentinels ? 2 : 0;

    const finish = () => {
      if (withSentinels && index === 0) {
        resolve(realValues);
        return;
      }
      if (withSentinels && index === 1) {
        resolve([]);
        return;
      }
      resolve(
        Array.from(selected)
          .filter((i) => i >= realStart)
          .sort((a, b) => a - b)
          .map((i) => items[i].value)
      );
    };

    const render = (first) => {
      const lines = (title ? [title] : []).concat(
        items.map((item, i) => {
          const isAction = withSentinels && (i === 0 || i === 1);
          const circle = isAction ? CIRCLE_EMPTY : selected.has(i) ? CIRCLE_FILLED : CIRCLE_EMPTY;
          const prefix = i === index ? C.cyan + '>' + C.reset + ' ' : '  ';
          return prefix + circle + formatLabel(item);
        })
      );
      if (!first) {
        process.stdout.write('\u001b[' + lineCount + 'A');
      }
      process.stdout.write('\u001b[?25l');
      process.stdout.write(lines.join('\n') + '\n\n');
      process.stdout.write('\u001b[?25h');
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    render(true);

    let buf = '';
    const onData = (ch) => {
      if (ch === '\u0003') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        process.exit(130);
      }
      if (ch === '\r' || ch === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stdin.pause();
        process.stdout.write('\n');
        if (withSentinels && (index === 0 || index === 1)) {
          if (index === 0) resolve(realValues);
          else resolve([]);
        } else {
          finish();
        }
        return;
      }
      if (ch === ' ') {
        buf = '';
        if (withSentinels && index === 0) {
          for (let i = realStart; i < items.length; i++) selected.add(i);
        } else if (withSentinels && index === 1) {
          for (let i = realStart; i < items.length; i++) selected.delete(i);
        } else {
          if (selected.has(index)) selected.delete(index);
          else selected.add(index);
        }
        render(false);
        return;
      }
      if (ch === 'a' || ch === 'A') {
        buf = '';
        for (let i = realStart; i < items.length; i++) selected.add(i);
        render(false);
        return;
      }
      if (ch === 'n' || ch === 'N') {
        buf = '';
        for (let i = realStart; i < items.length; i++) selected.delete(i);
        render(false);
        return;
      }
      buf += ch;
      const isUp = buf === '\u001b[A' || buf === '\u001bOA' || (buf.length >= 2 && buf.endsWith('A') && buf.startsWith('\u001b'));
      const isDown = buf === '\u001b[B' || buf === '\u001bOB' || (buf.length >= 2 && buf.endsWith('B') && buf.startsWith('\u001b'));
      if (isUp) {
        buf = '';
        index = index <= 0 ? items.length - 1 : index - 1;
        render(false);
      } else if (isDown) {
        buf = '';
        index = index >= items.length - 1 ? 0 : index + 1;
        render(false);
      } else if (buf.length > 12 || (buf.length === 1 && ch !== '\u001b')) {
        buf = '';
      }
    };
    process.stdin.on('data', onData);
  });
}

function printHelp() {
  console.log(`
rizzo-css CLI — Add Rizzo CSS to your project

Usage:
  npx rizzo-css <command> [options]

Commands:
  init    Add Rizzo to existing project or scaffold new one (first menu: existing vs new)
  add     Copy Rizzo CSS into the current project (auto-detects Svelte/Astro)
  theme   List all available themes (use in init or set data-theme on <html>)
  help    Show this help

Use framework CLI first, then add Rizzo CSS:
  npm create svelte@latest my-app
  cd my-app && npx rizzo-css add

  npm create astro@latest my-app
  cd my-app && npx rizzo-css add

Examples:
  npx rizzo-css init
  npx rizzo-css add
  npx rizzo-css add --path public/css
  npx rizzo-css add --framework svelte
  npx rizzo-css theme

Docs: https://rizzo-css.vercel.app
`);
}

function cmdTheme() {
  process.stdout.write('\nAvailable themes (set data-theme on <html>):\n\n');
  THEMES.forEach((t) => process.stdout.write('  ' + t + '\n'));
  process.stdout.write('\nExample: <html lang="en" data-theme="github-dark-classic">\n\n');
}

/** Detect framework from cwd: "svelte" | "astro" | null. */
function detectFramework(cwd) {
  if (existsSync(join(cwd, 'svelte.config.js')) || existsSync(join(cwd, 'svelte.config.ts'))) return 'svelte';
  if (existsSync(join(cwd, 'astro.config.mjs')) || existsSync(join(cwd, 'astro.config.mts')) || existsSync(join(cwd, 'astro.config.js'))) return 'astro';
  try {
    const pkg = readFileSync(join(cwd, 'package.json'), 'utf8');
    const json = JSON.parse(pkg);
    const deps = { ...json.dependencies, ...(json.devDependencies || {}) };
    if (deps['@sveltejs/kit'] || deps['svelte']) return 'svelte';
    if (deps['astro']) return 'astro';
  } catch (_) { /* ignore */ }
  return null;
}

/** Default CSS directory and link href for a framework (for add command). */
function getFrameworkCssPaths(framework) {
  if (framework === 'svelte') return { targetDir: 'static/css', linkHref: '/css/rizzo.min.css' };
  if (framework === 'astro') return { targetDir: 'public/css', linkHref: '/css/rizzo.min.css' };
  return { targetDir: 'css', linkHref: 'css/rizzo.min.css' };
}

function cmdAdd(argv) {
  const pathIdx = argv.indexOf('--path');
  const customPath = pathIdx !== -1 && argv[pathIdx + 1] ? argv[pathIdx + 1] : null;
  const frameworkIdx = argv.indexOf('--framework');
  const explicitFramework = frameworkIdx !== -1 && argv[frameworkIdx + 1] ? argv[frameworkIdx + 1].toLowerCase() : null;
  const cwd = process.cwd();
  const framework = explicitFramework && FRAMEWORKS.includes(explicitFramework)
    ? explicitFramework
    : (explicitFramework === null ? detectFramework(cwd) : null);
  const paths = getFrameworkCssPaths(framework);
  const targetDir = customPath || paths.targetDir;
  const targetFile = join(cwd, targetDir, 'rizzo.min.css');
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  mkdirSync(join(cwd, targetDir), { recursive: true });
  copyFileSync(cssSource, targetFile);
  const linkHref = customPath ? customPath + '/rizzo.min.css' : paths.linkHref;
  console.log('\n✓ Rizzo CSS copied to ' + targetFile);
  if (framework === 'svelte') {
    console.log('\nDetected Svelte/SvelteKit. Add to your root layout (e.g. src/app.html):\n');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="github-dark-classic" (see: npx rizzo-css theme)');
    console.log('\nTo add Rizzo Svelte components later: copy from this package\'s scaffold or run npx rizzo-css init and pick Svelte + components in an empty folder, then copy the generated files.\n');
  } else if (framework === 'astro') {
    console.log('\nDetected Astro. Add to your layout (e.g. src/layouts/Layout.astro):\n');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="github-dark-classic" (see: npx rizzo-css theme)\n');
  } else {
    console.log('\nAdd to your HTML or layout:\n');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    if (framework === 'vanilla') {
      console.log('\nVanilla JS: same CSS and component classes as Astro/Svelte. Use the same BEM markup from the docs.');
    }
    console.log('\nSet a theme on <html>: data-theme="github-dark-classic" (see: npx rizzo-css theme)\n');
  }
}

function getScaffoldSvelteDir() {
  return join(getPackageRoot(), 'scaffold', 'svelte');
}

function getScaffoldAstroDir() {
  return join(getPackageRoot(), 'scaffold', 'astro');
}

function getScaffoldVanillaIndex() {
  return join(getPackageRoot(), 'scaffold', 'vanilla', 'index.html');
}

function getScaffoldVanillaIconsDir() {
  return join(getPackageRoot(), 'scaffold', 'vanilla', 'icons');
}

/** Copy Rizzo icons into the project for the given framework. */
function copyRizzoIcons(projectDir, framework) {
  if (framework === 'astro') {
    const iconsSrc = join(getScaffoldAstroDir(), 'icons');
    if (!existsSync(iconsSrc)) return;
    const targetDir = join(projectDir, 'src', 'components', 'rizzo', 'icons');
    mkdirSync(targetDir, { recursive: true });
    copyDirRecursive(iconsSrc, targetDir);
  } else if (framework === 'svelte') {
    const iconsSrc = join(getScaffoldSvelteDir(), 'icons');
    if (!existsSync(iconsSrc)) return;
    const targetDir = join(projectDir, 'src', 'lib', 'rizzo', 'icons');
    mkdirSync(targetDir, { recursive: true });
    copyDirRecursive(iconsSrc, targetDir);
  } else if (framework === 'vanilla') {
    const iconsSrc = getScaffoldVanillaIconsDir();
    if (!existsSync(iconsSrc)) return;
    const targetDir = join(projectDir, 'icons');
    mkdirSync(targetDir, { recursive: true });
    copyDirRecursive(iconsSrc, targetDir);
  }
}

function getScaffoldAstroAppDir() {
  return join(getPackageRoot(), 'scaffold', 'astro-app');
}

function getScaffoldSvelteAppDir() {
  return join(getPackageRoot(), 'scaffold', 'svelte-app');
}

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

/** Copy directory recursively; in text files (utf-8), replace each key in replacements with its value. */
function copyDirRecursiveWithReplacements(src, dest, replacements) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  const textExtensions = new Set(['.html', '.astro', '.svelte', '.ts', '.js', '.mjs', '.json', '.css', '.md']);
  for (const e of entries) {
    const srcPath = join(src, e.name);
    const destPath = join(dest, e.name);
    if (e.isDirectory()) {
      copyDirRecursiveWithReplacements(srcPath, destPath, replacements);
    } else {
      const ext = srcPath.slice(srcPath.lastIndexOf('.'));
      if (textExtensions.has(ext)) {
        let content = readFileSync(srcPath, 'utf8');
        for (const [key, value] of Object.entries(replacements)) {
          content = content.split(key).join(value);
        }
        writeFileSync(destPath, content, 'utf8');
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }
}

function copySvelteComponents(projectDir, selectedNames) {
  const scaffoldDir = getScaffoldSvelteDir();
  if (!existsSync(scaffoldDir)) {
    console.log('\n  Component templates not in this package; use CSS only or copy from repo: https://github.com/mingleusa/rizzo-css/tree/main/src/components/svelte');
    return;
  }
  const files = readdirSync(scaffoldDir);
  const available = files.filter((f) => f.endsWith('.svelte')).map((f) => f.replace('.svelte', ''));
  const toCopy = selectedNames.filter((n) => available.includes(n));
  if (toCopy.length === 0) {
    console.log('\n  No matching component files in scaffold; use CSS only or copy from repo.');
    return;
  }
  const targetDir = join(projectDir, 'src', 'lib', 'rizzo');
  mkdirSync(targetDir, { recursive: true });
  const exports = [];
  for (const name of toCopy) {
    const src = join(scaffoldDir, name + '.svelte');
    if (existsSync(src)) {
      copyFileSync(src, join(targetDir, name + '.svelte'));
      exports.push(`export { default as ${name} } from './${name}.svelte';`);
    }
  }
  const iconsSrc = join(scaffoldDir, 'icons');
  if (existsSync(iconsSrc)) {
    copyDirRecursive(iconsSrc, join(targetDir, 'icons'));
  }
  if (exports.length > 0) {
    const indexContent = `/** Rizzo CSS Svelte components — selected via npx rizzo-css init */\n${exports.join('\n')}\n`;
    writeFileSync(join(targetDir, 'index.ts'), indexContent, 'utf8');
    console.log('\n  ✓ ' + exports.length + ' Svelte components copied to ' + targetDir + (existsSync(iconsSrc) ? ' + icons' : ''));
    console.log('  Import in your app: import { Button, Badge, ... } from \'$lib/rizzo\';\n');
  }
}

function copyAstroComponents(projectDir, selectedNames) {
  const scaffoldDir = getScaffoldAstroDir();
  if (!existsSync(scaffoldDir)) {
    console.log('\n  Astro component templates not in this package; use CSS only or copy from repo: https://github.com/mingleusa/rizzo-css/tree/main/src/components');
    return;
  }
  const files = readdirSync(scaffoldDir).filter((f) => f.endsWith('.astro'));
  const available = files.map((f) => f.replace('.astro', ''));
  const toCopy = selectedNames.filter((n) => available.includes(n));
  if (toCopy.length === 0) {
    console.log('\n  No matching Astro components in scaffold; use CSS only or copy from repo.');
    return;
  }
  const targetDir = join(projectDir, 'src', 'components', 'rizzo');
  mkdirSync(targetDir, { recursive: true });
  let count = 0;
  for (const name of toCopy) {
    const src = join(scaffoldDir, name + '.astro');
    if (existsSync(src)) {
      copyFileSync(src, join(targetDir, name + '.astro'));
      count++;
    }
  }
  const iconsSrc = join(scaffoldDir, 'icons');
  if (existsSync(iconsSrc)) {
    copyDirRecursive(iconsSrc, join(targetDir, 'icons'));
  }
  if (count > 0) {
    console.log('\n  ✓ ' + count + ' Astro components + icons copied to ' + targetDir);
    console.log('  Import in your pages: import Button from \'../components/rizzo/Button.astro\';\n');
  }
}

/** Add Rizzo CSS (and optional components) to an existing project in cwd. */
async function runAddToExisting() {
  const cwd = process.cwd();
  const detected = detectFramework(cwd);
  const frameworkOptions = [
    { value: 'vanilla', label: 'Vanilla JS (HTML + CSS)', color: C.vanilla },
    { value: 'astro', label: 'Astro', color: C.astro },
    { value: 'svelte', label: 'Svelte', color: C.svelte },
  ];
  let frameworkPrompt = '? Framework';
  if (detected) {
    frameworkPrompt += ' (detected: ' + detected + ' — pick to confirm or choose another)';
  }
  const framework = await selectMenu(frameworkOptions, frameworkPrompt);

  const defaultTheme = await selectMenu(
    THEMES.map((t) => ({ value: t, label: t })),
    '? Default theme (all 14 themes are included in the CSS; this sets the initial data-theme)'
  );
  const theme = THEMES.includes(defaultTheme) ? defaultTheme : THEMES[0];

  let selectedComponents = [];
  const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : [];
  if (componentList.length > 0) {
    const includeLabel = framework === 'svelte' ? 'Svelte' : 'Astro';
    const includeChoice = await selectMenu(
      [
        { value: 'none', label: 'None' },
        { value: 'pick', label: 'Yes, pick ' + includeLabel + ' components' },
      ],
      '? Include ' + includeLabel + ' components?'
    );
    if (includeChoice === 'pick') {
      selectedComponents = await multiSelectMenu(
        [
          { value: SENTINEL_ALL, label: 'Select all components' },
          { value: SENTINEL_NONE, label: 'Select no components' },
          ...componentList.map((c) => ({ value: c, label: c })),
        ],
        '? Components — pick individuals (Space to toggle) or choose Select all/none below. Enter=confirm'
      );
    }
  }

  const cssSource = getCssPath();
  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  const paths = getFrameworkCssPaths(framework);
  const targetDir = join(cwd, paths.targetDir);
  const cssTarget = join(targetDir, 'rizzo.min.css');
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(cssSource, cssTarget);

  copyRizzoIcons(cwd, framework);
  if (framework === 'svelte' && selectedComponents.length > 0) {
    copySvelteComponents(cwd, selectedComponents);
  } else if (framework === 'astro' && selectedComponents.length > 0) {
    copyAstroComponents(cwd, selectedComponents);
  }

  const linkHref = paths.linkHref;
  console.log('\n✓ Rizzo CSS added to your existing project');
  console.log('  - ' + cssTarget);
  if (framework === 'svelte') {
    console.log('\nAdd to your root layout (e.g. src/app.html):');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: npx rizzo-css theme)');
    if (selectedComponents.length > 0) {
      console.log('  Components are in src/lib/rizzo — import from \'$lib/rizzo\'.');
    }
  } else if (framework === 'astro') {
    console.log('\nAdd to your layout (e.g. src/layouts/Layout.astro):');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: npx rizzo-css theme)');
    if (selectedComponents.length > 0) {
      console.log('  Components are in src/components/rizzo — import from there.');
    }
  } else {
    console.log('\nAdd to your HTML or layout:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: npx rizzo-css theme)');
  }
  console.log('\nDocs: https://rizzo-css.vercel.app\n');
}

async function cmdInit() {
  const initMode = await selectMenu(
    [
      { value: 'existing', label: 'Add to existing project (current directory)' },
      { value: 'new', label: 'Create new project (scaffold)' },
    ],
    '? Are you using an existing project or creating a new one?'
  );

  if (initMode === 'existing') {
    await runAddToExisting();
    return;
  }

  const projectChoice = await selectMenu(
    [
      { value: 'cwd', label: 'Current directory' },
      { value: 'name', label: 'Enter project name (new folder)' },
    ],
    '? Project location'
  );
  const name = projectChoice === 'name' ? await question('Project name (folder name): ') : '';

  const framework = await selectMenu(
    [
      { value: 'vanilla', label: 'Vanilla JS (HTML + CSS + same styles & components)', color: C.vanilla },
      { value: 'astro', label: 'Astro', color: C.astro },
      { value: 'svelte', label: 'Svelte', color: C.svelte },
    ],
    '? Framework (arrows, Enter to select) — all get the same CSS and component styles'
  );

  const defaultTheme = await selectMenu(
    THEMES.map((t) => ({ value: t, label: t })),
    '? Default theme (all 14 themes are included in the CSS; this sets the initial data-theme)'
  );
  const theme = THEMES.includes(defaultTheme) ? defaultTheme : THEMES[0];

  let selectedComponents = [];
  const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : [];
  if (componentList.length > 0) {
    const includeLabel = framework === 'svelte' ? 'Svelte' : 'Astro';
    const includeChoice = await selectMenu(
      [
        { value: 'none', label: 'None' },
        { value: 'pick', label: 'Yes, pick ' + includeLabel + ' components' },
      ],
      '? Include ' + includeLabel + ' components?'
    );
    if (includeChoice === 'pick') {
      selectedComponents = await multiSelectMenu(
        [
          { value: SENTINEL_ALL, label: 'Select all components' },
          { value: SENTINEL_NONE, label: 'Select no components' },
          ...componentList.map((c) => ({ value: c, label: c })),
        ],
        '? Components — pick individuals (Space to toggle) or choose Select all/none below. Enter=confirm'
      );
    }
  }

  const projectDir = name ? join(process.cwd(), name) : process.cwd();
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  const themeComment = '\n  <!-- Default theme: ' + theme + ' (all 14 themes included in CSS) -->';
  const projectNamePkg = name
    ? name.replace(/\s+/g, '-').toLowerCase()
    : (framework === 'astro' ? 'my-astro-app' : framework === 'svelte' ? 'my-svelte-app' : 'my-app');
  const replacements = {
    '{{DATA_THEME}}': theme,
    '{{THEME_LIST_COMMENT}}': themeComment,
    '{{TITLE}}': name || 'App',
    '{{PROJECT_NAME}}': projectNamePkg,
  };

  const astroAppDir = getScaffoldAstroAppDir();
  const svelteAppDir = getScaffoldSvelteAppDir();

  let cssTarget;
  let indexPath;

  if (framework === 'astro' && existsSync(astroAppDir)) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(astroAppDir, projectDir, replacements);
    mkdirSync(join(projectDir, 'public', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'public', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyRizzoIcons(projectDir, 'astro');
    if (selectedComponents.length > 0) {
      copyAstroComponents(projectDir, selectedComponents);
    }
  } else if (framework === 'svelte' && existsSync(svelteAppDir)) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(svelteAppDir, projectDir, replacements);
    mkdirSync(join(projectDir, 'static', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyRizzoIcons(projectDir, 'svelte');
    if (selectedComponents.length > 0) {
      copySvelteComponents(projectDir, selectedComponents);
    }
  } else {
    const cssDir = framework === 'astro' ? join(projectDir, 'public', 'css') : join(projectDir, 'css');
    cssTarget = join(cssDir, 'rizzo.min.css');
    const linkHref = framework === 'astro' ? '/css/rizzo.min.css' : 'css/rizzo.min.css';
    mkdirSync(cssDir, { recursive: true });
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }

    const vanillaScaffoldPath = getScaffoldVanillaIndex();
    indexPath = join(projectDir, 'index.html');
    if (framework === 'vanilla' && existsSync(vanillaScaffoldPath)) {
      let indexHtml = readFileSync(vanillaScaffoldPath, 'utf8');
      indexHtml = indexHtml
        .replace(/\{\{DATA_THEME\}\}/g, theme)
        .replace(/\{\{THEME_LIST_COMMENT\}\}/g, themeComment)
        .replace(/\{\{TITLE\}\}/g, name || 'App')
        .replace(/\{\{LINK_HREF\}\}/g, linkHref);
      writeFileSync(indexPath, indexHtml, 'utf8');
    } else {
      const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">${themeComment}
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${name || 'App'}</title>
  <link rel="stylesheet" href="${linkHref}" />
</head>
<body>
  <h1>Hello, Rizzo CSS</h1>
  <p>Edit this file and add components. Docs: <a href="https://rizzo-css.vercel.app">rizzo-css.vercel.app</a></p>
</body>
</html>
`;
      writeFileSync(indexPath, indexHtml, 'utf8');
    }
    copyRizzoIcons(projectDir, framework);
    if (framework === 'vanilla') {
      const vanillaReadme = join(getPackageRoot(), 'scaffold', 'vanilla', 'README.md');
      if (existsSync(vanillaReadme)) {
        copyFileSync(vanillaReadme, join(projectDir, 'README.md'));
      }
      const vanillaJs = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
      if (existsSync(vanillaJs)) {
        mkdirSync(join(projectDir, 'js'), { recursive: true });
        copyFileSync(vanillaJs, join(projectDir, 'js', 'main.js'));
      }
    }
    if (framework === 'svelte' && selectedComponents.length > 0) {
      copySvelteComponents(projectDir, selectedComponents);
    } else if (framework === 'astro' && selectedComponents.length > 0) {
      copyAstroComponents(projectDir, selectedComponents);
    }
  }

  console.log('\n✓ Project ready at ' + projectDir);
  console.log('  - ' + cssTarget);
  if (indexPath) console.log('  - ' + indexPath);
  if (framework === 'vanilla') {
    console.log('  - Vanilla JS: same CSS and component styles; index includes theme switcher and sample components.');
    console.log('  - js/main.js (theme, toast, settings, tabs, modal, dropdown, accordion)');
    console.log('  - Icons: ' + join(projectDir, 'icons') + ' (SVG files)');
    console.log('  - README.md (setup and CDN/local options)');
  }
  const runPrefix = name ? 'cd ' + name + ' && ' : '';
  if (framework === 'astro' && existsSync(astroAppDir)) {
    console.log('  - Default Astro project with Rizzo CSS. Run: ' + runPrefix + 'pnpm install && pnpm dev');
    console.log('  - Icons: src/components/rizzo/icons/ (Astro components)');
  }
  if (framework === 'svelte' && existsSync(svelteAppDir)) {
    console.log('  - Default SvelteKit project with Rizzo CSS. Run: ' + runPrefix + 'pnpm install && pnpm dev');
    console.log('  - Install dependencies first (required before dev). Icons: src/lib/rizzo/icons/ (Svelte components)');
  }
  if ((framework === 'svelte' || framework === 'astro') && !existsSync(framework === 'astro' ? astroAppDir : svelteAppDir)) {
    const fw = framework === 'svelte' ? 'Svelte' : 'Astro';
    console.log('\nTip: To use the official ' + fw + ' scaffold, create a project with their CLI (e.g. npm create ' + framework + '@latest my-app), then run npx rizzo-css add in that folder.');
  }
  console.log('\nDocs: https://rizzo-css.vercel.app\n');
}

function main() {
  const argv = process.argv.slice(2);
  const command = (argv[0] || 'help').toLowerCase().replace(/^--?/, '');

  if (command === 'help' || command === 'h' || !COMMANDS.includes(command)) {
    if (argv[0] && !COMMANDS.includes(command) && command !== 'h') {
      console.error('Unknown command: ' + argv[0] + '\n');
    }
    printHelp();
    return;
  }

  if (command === 'theme') {
    cmdTheme();
    return;
  }

  if (command === 'add') {
    cmdAdd(argv);
    return;
  }

  if (command === 'init') {
    cmdInit().catch((err) => {
      console.error(err);
      process.exit(1);
    });
    return;
  }
}

main();
