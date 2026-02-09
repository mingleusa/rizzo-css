#!/usr/bin/env node

const { copyFileSync, mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } = require('fs');
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

function printHelp() {
  console.log(`
rizzo-css CLI — Add Rizzo CSS to your project

Usage:
  npx rizzo-css <command> [options]

Commands:
  init    Scaffold a new project (prompts: name, framework, theme; Astro/Svelte: optional component picker)
  add     Copy Rizzo CSS into the current project
  theme   List available themes
  help    Show this help

Examples:
  npx rizzo-css init
  npx rizzo-css add
  npx rizzo-css add --path public/css
  npx rizzo-css theme

Docs: https://rizzo-css.vercel.app
`);
}

function cmdTheme() {
  console.log('\nAvailable themes (set data-theme on <html>):\n');
  THEMES.forEach((t) => console.log('  ' + t));
  console.log('\nExample: <html lang="en" data-theme="github-dark-classic">\n');
}

function cmdAdd(argv) {
  const pathIdx = argv.indexOf('--path');
  const customPath = pathIdx !== -1 && argv[pathIdx + 1] ? argv[pathIdx + 1] : null;
  const targetDir = customPath || 'css';
  const targetFile = join(process.cwd(), targetDir, 'rizzo.min.css');
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  mkdirSync(join(process.cwd(), targetDir), { recursive: true });
  copyFileSync(cssSource, targetFile);
  const linkPath = targetDir + '/rizzo.min.css';
  console.log('\n✓ Rizzo CSS copied to ' + targetFile);
  console.log('\nAdd to your HTML or layout:\n');
  console.log('  <link rel="stylesheet" href="' + linkPath + '" />');
  console.log('\nSet a theme on <html>: data-theme="github-dark-classic" (see: npx rizzo-css theme)\n');
}

function parseComponentSelection(input, componentList, maxNum) {
  const s = (input || '').trim().toLowerCase();
  if (s === 'none' || s === 'n') return [];
  if (s === 'all' || s === 'a') return componentList.slice();
  const parts = s.split(/[\s,]+/).filter(Boolean);
  const indices = new Set();
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (n >= 1 && n <= maxNum) indices.add(n - 1);
  }
  return indices.size === 0 ? [] : Array.from(indices).sort((a, b) => a - b).map((i) => componentList[i]);
}

function getScaffoldSvelteDir() {
  return join(getPackageRoot(), 'scaffold', 'svelte');
}

function getScaffoldAstroDir() {
  return join(getPackageRoot(), 'scaffold', 'astro');
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
  if (exports.length > 0) {
    const indexContent = `/** Rizzo CSS Svelte components — selected via npx rizzo-css init */\n${exports.join('\n')}\n`;
    writeFileSync(join(targetDir, 'index.ts'), indexContent, 'utf8');
    console.log('\n  ✓ ' + exports.length + ' Svelte components copied to ' + targetDir);
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

async function cmdInit() {
  const name = await question('Project name (folder name, or leave blank for current directory): ');
  let framework = await question('Framework: vanilla, astro, svelte (default: vanilla): ') || 'vanilla';
  framework = framework.toLowerCase();
  if (!FRAMEWORKS.includes(framework)) framework = 'vanilla';

  const theme = await question('Theme (default: github-dark-classic, or run "npx rizzo-css theme" for list): ') || 'github-dark-classic';

  let selectedComponents = [];
  const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : [];
  if (componentList.length > 0) {
    const label = framework === 'svelte' ? 'Svelte' : 'Astro';
    const include = await question('Include ' + label + ' components? (y/n, default: n): ') || 'n';
    if (include.toLowerCase() === 'y' || include.toLowerCase() === 'yes') {
      console.log('\nComponents (enter numbers to include, e.g. 1 3 5, or "all" / "none"):');
      componentList.forEach((c, i) => console.log('  ' + (i + 1) + '. ' + c));
      const choice = await question('\nSelection (e.g. 1 2 3 or all): ');
      selectedComponents = parseComponentSelection(choice, componentList, componentList.length);
    }
  }

  const projectDir = name ? join(process.cwd(), name) : process.cwd();
  const cssDir = framework === 'astro' ? join(projectDir, 'public', 'css') : join(projectDir, 'css');
  const cssTarget = join(cssDir, 'rizzo.min.css');
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  mkdirSync(cssDir, { recursive: true });
  copyFileSync(cssSource, cssTarget);

  const linkHref = framework === 'astro' ? '/css/rizzo.min.css' : 'css/rizzo.min.css';
  const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
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

  const indexPath = join(projectDir, 'index.html');
  writeFileSync(indexPath, indexHtml, 'utf8');

  if (framework === 'svelte' && selectedComponents.length > 0) {
    copySvelteComponents(projectDir, selectedComponents);
  } else if (framework === 'astro' && selectedComponents.length > 0) {
    copyAstroComponents(projectDir, selectedComponents);
  }

  console.log('\n✓ Project ready at ' + projectDir);
  console.log('  - ' + cssTarget);
  console.log('  - ' + indexPath);
  console.log('\nRun a local server (e.g. npx serve .) or open index.html. Docs: https://rizzo-css.vercel.app\n');
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
