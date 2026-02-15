#!/usr/bin/env node

const { copyFileSync, mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync, statSync, unlinkSync } = require('fs');
const { join, dirname, resolve: pathResolve, relative: pathRelative } = require('path');
const { spawnSync } = require('child_process');
const readline = require('readline');

/** ASCII banner for CLI output: cat face (matches SVG logo) + name. Fits narrow terminals. */
const CLI_BANNER = `      /\\___/\\   
   __(  o o  )__
     (  =^=  )  
    _/   ~   \\_ 
   /  \\_____/  \\
 ____  ___ _____________     ____ ____ ____
|  _ \\|_ _|__  /__  / _ \\   / ___/ ___/ ___|
| |_) || |  / /  / / | | | | |   \\___ \\___ \\
|  _ < | | / /_ / /| |_| | | |___ ___) |__) |
|_| \\_\\___/____/____\\___/   \\____|____/____/
      Design system · Vanilla · Astro · Svelte`;

const RIZZO_CONFIG_FILE = 'rizzo-css.json';
/** Scaffold README filename; avoids overwriting an existing project README.md. */
const SCAFFOLD_README_FILENAME = 'README-RIZZO.md';
/** Scaffold license filename; avoids overwriting an existing project LICENSE. */
const SCAFFOLD_LICENSE_FILENAME = 'LICENSE-RIZZO';
/** Snippet file written by add command for copy-paste of link and theme. */
const RIZZO_SNIPPET_FILE = 'RIZZO-SNIPPET.txt';

const COMMANDS = ['init', 'add', 'theme', 'doctor', 'help'];
const FRAMEWORKS = ['vanilla', 'astro', 'svelte'];
/** Supported package managers: detection, install/add commands, and --package-manager override. */
const VALID_PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'];

/** Full = everything we ship. Minimal = same full interactive base (all components). Manual = same base, pick which to include. */
const TEMPLATES = {
  vanilla: [
    { value: 'full', label: 'Full — index.html + theme switcher, js/main.js, icons, component showcase, ' + SCAFFOLD_README_FILENAME },
    { value: 'minimal', label: 'Minimal — index.html + CSS + js/main.js + all interactive components (recommended starter)' },
    { value: 'manual', label: 'Manual — index.html + CSS; pick which components to add (base = all interactive)' },
  ],
  astro: [
    { value: 'full', label: 'Full — Astro app + all components (with dependencies so everything works)' },
    { value: 'minimal', label: 'Minimal — Astro app + all interactive components (full base; everything works together)' },
    { value: 'manual', label: 'Manual — same base; pick which components to include (all interactive pre-selected)' },
  ],
  svelte: [
    { value: 'full', label: 'Full — SvelteKit app + all components (with dependencies so everything works)' },
    { value: 'minimal', label: 'Minimal — SvelteKit app + all interactive components (full base; everything works together)' },
    { value: 'manual', label: 'Manual — same base; pick which components to include (all interactive pre-selected)' },
  ],
};

const VANILLA_MINIMAL_README = `# Vanilla + Rizzo CSS (minimal)

Minimal starter: HTML + CSS + js/main.js + all interactive component pages. Scaffolded with \`npx rizzo-css init --framework vanilla --template minimal\`.

- Open \`index.html\` in a browser or serve the folder. Edit \`index.html\` and add your content. CSS: \`css/rizzo.min.css\`. Script: \`js/main.js\` (already linked).
- \`components/\` contains HTML pages for every interactive component (Button, Badge, Card, Modal, Tabs, Navbar, Search, Settings, ThemeSwitcher, Dropdown, Accordion, Toast, CopyToClipboard, forms, table, etc.). Open \`components/index.html\` to browse them.
- Set a theme: \`<html data-theme="github-dark-classic">\` (see \`npx rizzo-css theme\` for all themes).
- Template **Full** adds the same components in a full showcase layout with theme switcher on every page.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
`;

const VANILLA_MANUAL_README = `# Vanilla + Rizzo CSS (manual)

Manual setup: HTML + CSS, plus the component pages you chose (base = all interactive components). Scaffolded with \`npx rizzo-css init --framework vanilla --template manual\`.

- Open \`index.html\` in a browser or serve the folder with any static server.
- Edit \`index.html\` and add your content. CSS: \`css/rizzo.min.css\`.
- If you picked components, \`components/\` has their HTML pages and \`js/main.js\` is included (open \`components/index.html\` to browse).
- Set a theme: \`<html data-theme="github-dark-classic">\` (see \`npx rizzo-css theme\` for all themes).

**If you chose no components:** To add component JavaScript (modal, dropdown, tabs, toast, search, navbar, copy-to-clipboard, theme switcher, etc.), use the [Vanilla component docs](https://rizzo-css.vercel.app/docs/vanilla/components) or run \`npx rizzo-css init\` with Vanilla → **Minimal** or **Full** in a temp folder and copy \`js/main.js\` and \`components/\` into this project.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
`;

const FALLBACK_MINIMAL_README = `# Rizzo CSS (minimal)

Minimal project with Rizzo CSS. Add a proper framework (e.g. \`npm create astro@latest\` or \`npm create svelte@latest\`), then run \`npx rizzo-css add\` in the project.

- This folder has a single HTML file and \`css/rizzo.min.css\`.
- For a full app with config and tooling, use the framework's create command and \`rizzo-css add\`.

Docs: [rizzo-css.vercel.app](https://rizzo-css.vercel.app)
`;

// Dark and light themes (order matches scaffold optgroups and config/themes.ts)
const DARK_THEMES = [
  'github-dark-classic',
  'shades-of-purple',
  'sandstorm-classic',
  'rocky-blood-orange',
  'minimal-dark-neon-yellow',
  'hack-the-box',
  'pink-cat-boo',
];
const LIGHT_THEMES = [
  'github-light',
  'red-velvet-cupcake',
  'orangy-one-light',
  'sunflower',
  'green-breeze-light',
  'cute-pink',
  'semi-light-purple',
];
const THEMES = [...DARK_THEMES, ...LIGHT_THEMES];
// Components available for scaffold (must match scaffold/svelte and scaffold/astro)
const SVELTE_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table', 'ThemeSwitcher',
  'Navbar', 'Settings', 'Search', 'Icons',
];
const ASTRO_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table', 'ThemeSwitcher',
  'Navbar', 'Settings', 'Search', 'Icons',
];

// Base set for Minimal and Manual: all interactive components we ship (so minimal/manual have a full working set). Full still includes everything (same list + any extras).
const RECOMMENDED_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table', 'ThemeSwitcher',
  'Navbar', 'Search', 'Settings', 'Icons',
];

// Vanilla components that need js/main.js for interactivity.
const VANILLA_JS_COMPONENTS = ['Modal', 'Dropdown', 'Tabs', 'Toast', 'ThemeSwitcher', 'Search', 'Accordion', 'CopyToClipboard', 'Navbar', 'Settings'];

// Component dependencies per framework: when user selects a component, these are copied automatically so it works.
// Manual users can run: npx rizzo-css help components
const COMPONENT_DEPS = {
  astro: { Settings: ['ThemeSwitcher'], Toast: ['Alert'], Navbar: ['Search', 'Settings'] },
  svelte: { Settings: ['ThemeSwitcher'], Toast: ['Alert'], Navbar: ['Search', 'Settings'] },
};

function getComponentDeps(framework, componentName) {
  const deps = COMPONENT_DEPS[framework];
  return (deps && deps[componentName]) ? deps[componentName] : [];
}

/** Returns a short label for the picker, e.g. " (adds ThemeSwitcher)" or "". */
function getComponentDependencyLabel(framework, componentName) {
  const deps = getComponentDeps(framework, componentName);
  if (deps.length === 0) return '';
  return ' (adds ' + deps.join(', ') + ')';
}

/** Expand a list of component names with all required dependencies. Used for full, minimal, and add so everything works. */
function expandWithDeps(framework, names) {
  const depsMap = COMPONENT_DEPS[framework];
  if (!depsMap) return [...names];
  const out = new Set(names);
  let added = true;
  while (added) {
    added = false;
    for (const name of out) {
      const req = depsMap[name];
      if (req) for (const d of req) {
        if (!out.has(d)) { out.add(d); added = true; }
      }
    }
  }
  return [...names].filter((n) => out.has(n)).concat([...out].filter((n) => !names.includes(n)));
}

/** Log which components were added automatically because others require them. Call before copy when expanded.length > selected.length. */
function logAddedDeps(selected, expanded, framework) {
  const added = expanded.filter((n) => !selected.includes(n));
  if (added.length === 0) return;
  const depsMap = COMPONENT_DEPS[framework];
  if (!depsMap) return;
  const byRequirement = [];
  for (const name of added) {
    for (const [parent, deps] of Object.entries(depsMap)) {
      if (deps.includes(name) && selected.includes(parent)) {
        byRequirement.push(name + ' (required by ' + parent + ')');
        break;
      }
    }
  }
  if (byRequirement.length) console.log('\n  Also adding: ' + byRequirement.join('; '));
}

// Vanilla scaffold: component name (same as ASTRO_COMPONENTS) -> components/*.html slug. Navbar, Settings, Search, Icons are vanilla-only.
const VANILLA_COMPONENT_SLUGS = {
  Button: 'button', Badge: 'badge', Card: 'cards', Divider: 'divider', Spinner: 'spinner', ProgressBar: 'progress-bar',
  Avatar: 'avatar', Alert: 'alert', Breadcrumb: 'breadcrumb', FormGroup: 'forms', Input: 'forms', Checkbox: 'forms',
  Textarea: 'forms', Select: 'forms', Radio: 'forms', CopyToClipboard: 'copy-to-clipboard', Tooltip: 'tooltip',
  Pagination: 'pagination', Tabs: 'tabs', Accordion: 'accordion', Dropdown: 'dropdown', Modal: 'modal',
  Toast: 'toast', Table: 'table', ThemeSwitcher: 'theme-switcher',
  Navbar: 'navbar', Settings: 'settings', Search: 'search', Icons: 'icons',
};

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

/** Copy package dist/fonts into <cssTargetDir>/fonts so CSS url(./fonts/...) resolves. cssTargetDir is framework-specific (static/css | css). Not used for Astro; use copyRizzoCssAndFontsForAstro instead. */
function copyRizzoFonts(cssTargetDir) {
  const fontsSrc = join(getPackageRoot(), 'dist', 'fonts');
  if (!existsSync(fontsSrc)) return;
  const dest = join(cssTargetDir, 'fonts');
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(fontsSrc, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = join(fontsSrc, e.name);
    const destPath = join(dest, e.name);
    if (e.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/** Astro only: copy rizzo.min.css to public/css with font URLs rewritten to /assets/fonts/, and copy fonts to public/assets/fonts. */
function copyRizzoCssAndFontsForAstro(projectDir, cssSource) {
  const cssDir = join(projectDir, 'public', 'css');
  const cssTarget = join(cssDir, 'rizzo.min.css');
  const fontsDest = join(projectDir, 'public', 'assets', 'fonts');
  mkdirSync(cssDir, { recursive: true });
  mkdirSync(fontsDest, { recursive: true });
  copyFileSync(cssSource, cssTarget);
  let css = readFileSync(cssTarget, 'utf8');
  css = css.replace(/url\(['"]?\.\/fonts\//g, "url('/assets/fonts/");
  writeFileSync(cssTarget, css, 'utf8');
  const fontsSrc = join(getPackageRoot(), 'dist', 'fonts');
  if (existsSync(fontsSrc)) {
    const entries = readdirSync(fontsSrc, { withFileTypes: true });
    for (const e of entries) {
      const srcPath = join(fontsSrc, e.name);
      const destPath = join(fontsDest, e.name);
      if (e.isDirectory()) copyDirRecursive(srcPath, destPath);
      else copyFileSync(srcPath, destPath);
    }
  }
}

/** SvelteKit only: copy rizzo.min.css to static/css with font URLs rewritten to /assets/fonts/, and copy fonts to static/assets/fonts. */
function copyRizzoCssAndFontsForSvelte(projectDir, cssSource) {
  const cssDir = join(projectDir, 'static', 'css');
  const cssTarget = join(cssDir, 'rizzo.min.css');
  const fontsDest = join(projectDir, 'static', 'assets', 'fonts');
  mkdirSync(cssDir, { recursive: true });
  mkdirSync(fontsDest, { recursive: true });
  copyFileSync(cssSource, cssTarget);
  let css = readFileSync(cssTarget, 'utf8');
  css = css.replace(/url\(['"]?\.\/fonts\//g, "url('/assets/fonts/");
  writeFileSync(cssTarget, css, 'utf8');
  const fontsSrc = join(getPackageRoot(), 'dist', 'fonts');
  if (existsSync(fontsSrc)) {
    const entries = readdirSync(fontsSrc, { withFileTypes: true });
    for (const e of entries) {
      const srcPath = join(fontsSrc, e.name);
      const destPath = join(fontsDest, e.name);
      if (e.isDirectory()) copyDirRecursive(srcPath, destPath);
      else copyFileSync(srcPath, destPath);
    }
  }
}

/** Copy the package LICENSE into the project dir as LICENSE-RIZZO so we do not overwrite an existing LICENSE. */
function copyPackageLicense(projectDir) {
  const licensePath = join(getPackageRoot(), 'LICENSE');
  if (existsSync(licensePath)) {
    copyFileSync(licensePath, join(projectDir, SCAFFOLD_LICENSE_FILENAME));
  }
}

/** Name of the scaffold gitignore file (no leading dot so npm pack includes it). Copied to project as .gitignore. */
const SCAFFOLD_GITIGNORE_FILE = 'gitignore';

/** Copy scaffold vanilla gitignore into project as .gitignore so new vanilla projects have sensible defaults. */
function copyVanillaGitignore(projectDir) {
  const gitignorePath = join(getPackageRoot(), 'scaffold', 'vanilla', SCAFFOLD_GITIGNORE_FILE);
  if (existsSync(gitignorePath)) {
    copyFileSync(gitignorePath, join(projectDir, '.gitignore'));
  }
}

/** Copy Astro minimal scaffold gitignore into project as .gitignore (full and minimal templates). */
function copyAstroGitignore(projectDir) {
  const gitignorePath = join(getScaffoldAstroMinimalDir(), SCAFFOLD_GITIGNORE_FILE);
  if (existsSync(gitignorePath)) {
    copyFileSync(gitignorePath, join(projectDir, '.gitignore'));
    const copiedAsFile = join(projectDir, SCAFFOLD_GITIGNORE_FILE);
    if (existsSync(copiedAsFile)) unlinkSync(copiedAsFile);
  }
}

/** Copy Svelte minimal scaffold gitignore into project as .gitignore (full and minimal templates). */
function copySvelteGitignore(projectDir) {
  const gitignorePath = join(getScaffoldSvelteMinimalDir(), SCAFFOLD_GITIGNORE_FILE);
  if (existsSync(gitignorePath)) {
    copyFileSync(gitignorePath, join(projectDir, '.gitignore'));
    const copiedAsFile = join(projectDir, SCAFFOLD_GITIGNORE_FILE);
    if (existsSync(copiedAsFile)) unlinkSync(copiedAsFile);
  }
}

/** Read rizzo-css.json from cwd. Returns { targetDir?, framework?, packageManager?, theme? } or null. Preserves unknown keys. */
function readRizzoConfig(cwd) {
  if (!cwd || !existsSync(cwd)) return null;
  const configPath = join(cwd, RIZZO_CONFIG_FILE);
  if (!existsSync(configPath)) return null;
  try {
    const raw = JSON.parse(readFileSync(configPath, 'utf8'));
    const out = {};
    if (typeof raw.targetDir === 'string') out.targetDir = raw.targetDir;
    if (typeof raw.framework === 'string' && FRAMEWORKS.includes(raw.framework)) out.framework = raw.framework;
    if (typeof raw.packageManager === 'string' && ['npm', 'pnpm', 'yarn', 'bun'].includes(raw.packageManager)) out.packageManager = raw.packageManager;
    if (typeof raw.theme === 'string') out.theme = raw.theme;
    return Object.keys(out).length ? out : null;
  } catch (_) { return null; }
}

/** Write rizzo-css.json to cwd. config: { targetDir?, framework?, packageManager? }. Preserves unknown keys from existing file. */
function writeRizzoConfig(cwd, config) {
  if (!cwd || !existsSync(cwd)) return;
  const configPath = join(cwd, RIZZO_CONFIG_FILE);
  let obj = {};
  if (existsSync(configPath)) {
    try {
      const raw = JSON.parse(readFileSync(configPath, 'utf8'));
      if (raw && typeof raw === 'object') obj = { ...raw };
    } catch (_) { /* ignore */ }
  }
  if (config.targetDir != null) obj.targetDir = config.targetDir;
  if (config.framework != null) obj.framework = config.framework;
  if (config.packageManager != null) obj.packageManager = config.packageManager;
  if (config.theme != null) obj.theme = config.theme;
  writeFileSync(configPath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

/** Run a command in cwd. command is the full string (e.g. "pnpm add rizzo-css"). Returns exit code. */
function runInDir(cwd, command) {
  const result = spawnSync(command, { cwd, shell: true, stdio: 'inherit' });
  return result.status != null ? result.status : result.signal ? 1 : 0;
}

function hasFlag(argv, flag) {
  return argv.indexOf(flag) !== -1;
}

function getFlagValue(argv, flag) {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] != null ? argv[i + 1] : null;
}

/** Parse --package-manager value; returns npm|pnpm|yarn|bun or null if invalid/absent. */
function parsePackageManager(value) {
  if (!value || typeof value !== 'string') return null;
  const v = value.toLowerCase().trim();
  return VALID_PACKAGE_MANAGERS.includes(v) ? v : null;
}

/** Get positional args for a command (excludes --flag and --flag value). Used for e.g. add Button ThemeSwitcher. */
function getPositionalArgs(argv) {
  const positionals = [];
  for (let i = 1; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      if (!argv[i].includes('=')) i++;
      continue;
    }
    positionals.push(argv[i]);
  }
  return positionals;
}

/** Package manager detection (manual: lockfiles + packageManager field). Returns { agent, command } or null if none found. */
function detectPackageManager(cwd) {
  if (!cwd || !existsSync(cwd)) return null;
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return { agent: 'pnpm', command: 'pnpm' };
  if (existsSync(join(cwd, 'yarn.lock'))) return { agent: 'yarn', command: 'yarn' };
  if (existsSync(join(cwd, 'bun.lockb'))) return { agent: 'bun', command: 'bun' };
  if (existsSync(join(cwd, 'package-lock.json')) || existsSync(join(cwd, 'npm-shrinkwrap.json'))) return { agent: 'npm', command: 'npm' };
  const pkgPath = join(cwd, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      const pm = pkg.packageManager || (pkg.devEngines && pkg.devEngines.packageManager);
      if (typeof pm === 'string') {
        const name = (pm.split('@')[0] || '').toLowerCase();
        if (['npm', 'pnpm', 'yarn', 'bun'].includes(name)) return { agent: name, command: name };
      }
    } catch (_) { /* ignore */ }
  }
  return null;
}

/** Get install and run commands for a package manager. pm: { agent, command } from detectPackageManager. */
function getPackageManagerCommands(pm) {
  if (!pm) pm = { agent: 'npm', command: 'npm' };
  const c = pm.command;
  return {
    agent: pm.agent,
    install: c + ' install',
    run: (script) => (pm.agent === 'npm' ? c + ' run ' + script : c + ' run ' + script),
    add: (pkg) => (pm.agent === 'npm' ? c + ' install ' + pkg : c + ' add ' + pkg),
    addDev: (pkg) => (pm.agent === 'npm' ? c + ' install -D ' + pkg : pm.agent === 'bun' ? c + ' add -d ' + pkg : c + ' add -D ' + pkg),
    dlx: (pkgAndArgs) => (pm.agent === 'npm' ? 'npx ' + pkgAndArgs : pm.agent === 'pnpm' ? 'pnpm dlx ' + pkgAndArgs : pm.agent === 'yarn' ? 'yarn dlx ' + pkgAndArgs : 'bunx ' + pkgAndArgs),
  };
}

/** Detect package manager for a project dir, falling back to cwd then default npm. */
function resolvePackageManager(projectDir, fallbackCwd) {
  const pm = detectPackageManager(projectDir) || detectPackageManager(fallbackCwd || process.cwd());
  return getPackageManagerCommands(pm || { agent: 'npm', command: 'npm' });
}

/** Example command to create a new framework project (e.g. create-astro, create-svelte). */
function getCreateProjectExample(pm, framework) {
  const createPkg = 'create-' + framework + '@latest';
  if (pm.agent === 'npm') return 'npm create ' + framework + '@latest my-app';
  if (pm.agent === 'pnpm') return 'pnpm dlx ' + createPkg + ' my-app';
  if (pm.agent === 'yarn') return 'yarn create ' + framework + ' my-app';
  if (pm.agent === 'bun') return 'bun create ' + framework + ' my-app';
  return 'npm create ' + framework + '@latest my-app';
}

/** Prompt user to select package manager (npm, pnpm, yarn, bun). Shows "(detected)" only when we actually found a lockfile or packageManager; for new projects with no detection, user chooses. Returns agent string. */
async function promptPackageManager(projectDir) {
  const actuallyDetected = detectPackageManager(projectDir) || detectPackageManager(process.cwd());
  const resolved = actuallyDetected
    ? getPackageManagerCommands(actuallyDetected)
    : null;
  const agents = ['npm', 'pnpm', 'yarn', 'bun'];
  const options = agents.map((a) => ({
    value: a,
    label: (resolved && a === resolved.agent) ? a + ' (detected)' : a,
  }));
  return selectMenu(options, '? Package manager (for install and run commands)');
}

/** Prompt user to select Full or Manual for the chosen framework. Returns 'full' or 'manual'. */
async function promptTemplate(framework) {
  const options = TEMPLATES[framework] || TEMPLATES.vanilla;
  return selectMenu(options, '? Full or Manual?');
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

/** Prompt yes/no; default yes. Returns true to run, false to skip. */
async function confirmRunInstall(pm) {
  const answer = await question('\nRun ' + pm.install + ' now? (Y/n) ');
  return answer === '' || /^y(es)?$/i.test(answer);
}

/** Ask user to copy js/main.js for vanilla interactive components. */
async function confirmCopyVanillaJs() {
  const answer = await question('\nCopy js/main.js for modal, dropdown, tabs, toast, search, navbar, copy-to-clipboard, theme switcher? (Y/n) ');
  return answer === '' || /^y(es)?$/i.test(answer);
}

/** True if directory looks like an existing project (has package.json, src/, or index.html). */
function isDirNonEmpty(dir) {
  if (!dir || !existsSync(dir)) return false;
  return existsSync(join(dir, 'package.json')) || existsSync(join(dir, 'src')) || existsSync(join(dir, 'index.html'));
}

/** Ask user to confirm creating in a non-empty directory. */
async function confirmNonEmptyDir(projectDir) {
  const answer = await question('\nCurrent directory is not empty. Continue? (y/N) ');
  return /^y(es)?$/i.test(answer);
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

  const HINT = '  \u2191\u2193 move \u00b7 Enter select';
  return new Promise((resolve) => {
    let index = 0;
    const lineCount = (title ? 1 : 0) + items.length + 2; // +1 blank +1 hint

    const render = (first) => {
      const lines = (title ? [title] : []).concat(
        items.map((item, i) => {
          const circle = i === index ? CIRCLE_FILLED : CIRCLE_EMPTY;
          const prefix = i === index ? C.cyan + '>' + C.reset + ' ' : '  ';
          return prefix + circle + formatLabel(item);
        })
      ).concat(['', HINT]);
      if (!first) {
        process.stdout.write('\u001b[' + lineCount + 'A');
      }
      process.stdout.write('\u001b[?25l');
      process.stdout.write(lines.join('\n') + '\n');
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

/** Multi-select menu: circles ○/●, Space toggles, Enter confirms. Optional first two options: Select all / Select none (value __all__ / __none__). initialSelected: optional array of values to pre-check. Returns array of selected values. */
function multiSelectMenu(options, title, initialSelected) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const isTty = process.stdin.isTTY && process.stdout.isTTY;
  const withSentinels = hasAllNoneSentinels(items);
  const realValues = getRealValues(items);
  const initialSet = Array.isArray(initialSelected) ? new Set(initialSelected) : null;

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
    if (initialSet && initialSet.size > 0) {
      for (let i = 0; i < items.length; i++) {
        if (initialSet.has(items[i].value)) selected.add(i);
      }
    }
    const HINT = '  \u2191\u2193 move \u00b7 Space toggle \u00b7 a all \u00b7 n none \u00b7 1-9 toggle (0=10th) \u00b7 Enter confirm';
    const lineCount = (title ? 1 : 0) + items.length + 2; // +1 blank +1 hint
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
      ).concat(['', HINT]);
      if (!first) {
        process.stdout.write('\u001b[' + lineCount + 'A');
      }
      process.stdout.write('\u001b[?25l');
      process.stdout.write(lines.join('\n') + '\n');
      process.stdout.write('\u001b[?25h');
    };

    const toggleByNumber = (num) => {
      const n = num === 0 ? 10 : num;
      const idx = n >= 1 && n <= items.length ? n - 1 : -1;
      if (idx < realStart) return; // don't toggle "Select all" / "Select none"
      if (selected.has(idx)) selected.delete(idx);
      else selected.add(idx);
      render(false);
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
      if (ch >= '1' && ch <= '9') {
        buf = '';
        toggleByNumber(parseInt(ch, 10));
        return;
      }
      if (ch === '0' && items.length >= 10) {
        buf = '';
        toggleByNumber(10);
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
  console.log(CLI_BANNER);
  console.log(`
rizzo-css CLI — Add Rizzo CSS to your project (Vanilla, Astro, Svelte)

Available commands: init, add, theme, doctor, help

Flags summary:
  init   --yes  --path <dir>  --framework <fw>  --template <t>  --package-manager <pm>  --install  --no-install
  add    --path <dir>  --framework <fw>  ...  --no-snippet  --readme  --force  --vanilla-js
  theme  (no flags)
  doctor Check config, CSS file, and optional layout link
  help   (no flags)

Usage (use your package manager):
  npx rizzo-css <command> [options]
  pnpm dlx rizzo-css <command> [options]
  yarn dlx rizzo-css <command> [options]
  bunx rizzo-css <command> [options]

Commands:
  init    New project = Full (everything) | Minimal (all 29 interactive) | Manual (all pre-selected; pick what to include). Existing = drop in CSS + hand-pick. First: framework, then existing vs new.
  add     Same as init → existing: drop in CSS + hand-pick components (framework detected or from rizzo-css.json)
  theme   List all available themes (use in init or set data-theme on <html>)
  help    Show this help

Options (init):
  --yes             Non-interactive: scaffold new in cwd with defaults (framework: astro, template: full)
  --path <dir>      Project directory (relative to cwd or absolute). Scaffold and run install there. With --yes; interactive: "Enter path" option.
  --framework <fw>  vanilla | astro | svelte (with --yes; otherwise first prompt)
  --template <t>    full | minimal | manual (all frameworks); with --yes defaults to full
  --package-manager <pm>  npm | pnpm | yarn | bun (with --yes, or skip PM prompt when interactive)
  --install         After scaffolding, run package manager install in project directory (no prompt)
  --no-install      Do not run install and do not prompt
  (Install always runs in the project directory. rizzo-css.json is written for new and existing projects; interactive run prompts "Run install now? (Y/n)" for Astro/Svelte.)

Options (add):
  --path <dir>      Target directory for rizzo.min.css (overrides config and framework default)
  --framework <fw>   vanilla | astro | svelte (overrides config and detection)
  --package-manager <pm>  npm | pnpm | yarn | bun (override detection for install/print commands)
  --install-package  After copying CSS, run package manager add rizzo-css
  --no-install      Do not run install or add (overrides --install-package)
  --no-snippet      Do not write RIZZO-SNIPPET.txt (link + theme copy-paste)
  --readme          Write README-RIZZO.md into the project
  --force           Overwrite existing rizzo.min.css without prompting
  --vanilla-js      (Vanilla) Copy js/main.js for interactive components (modal, dropdown, tabs, toast, search, navbar, copy-to-clipboard, theme switcher)

Package managers:
  Supported: npm, pnpm, yarn, bun. Detection: lockfiles (pnpm-lock.yaml, yarn.lock, bun.lockb, package-lock.json) or package.json "packageManager"/"devEngines.packageManager". Use --package-manager to override.

Interactive prompts (when no --yes/flag provided):
  Single-choice (framework, template, etc.): ↑/↓ move, Enter select.
  Multi-choice (component selection only): ↑/↓ move, Space toggle, a = all, n = none, Enter confirm, 1-9 toggle by number (0 = 10th).
  Ctrl+C to exit.

Config:
  Optional rizzo-css.json in project root: { "targetDir", "framework", "packageManager" }.
  Used by add and init when present. Detection: lockfiles and packageManager field in package.json.

Use framework CLI first, then add Rizzo CSS (match your package manager):
  For Vanilla:  npx rizzo-css init --yes --framework vanilla
  npm create svelte@latest my-app   && cd my-app && npx rizzo-css add
  pnpm dlx create-svelte@latest my-app && cd my-app && pnpm dlx rizzo-css add
  yarn create svelte my-app         && cd my-app && yarn dlx rizzo-css add
  bun create svelte my-app         && cd my-app && bunx rizzo-css add
  npm create astro@latest my-app   && cd my-app && npx rizzo-css add
  pnpm dlx create-astro@latest my-app && cd my-app && pnpm dlx rizzo-css add
  yarn create astro my-app         && cd my-app && yarn dlx rizzo-css add
  bun create astro my-app         && cd my-app && bunx rizzo-css add

Examples:
  npx rizzo-css init
  npx rizzo-css init --yes --framework astro --install
  npx rizzo-css init --yes --path my-app --framework astro --install
  npx rizzo-css init --yes --framework astro --package-manager pnpm --install
  npx rizzo-css init --yes --framework vanilla
  npx rizzo-css init --yes --framework svelte --template full
  npx rizzo-css add --package-manager yarn --install-package
  npx rizzo-css add
  npx rizzo-css add Button
  npx rizzo-css add Button ThemeSwitcher --path public/css --framework svelte
  npx rizzo-css add --install-package
  npx rizzo-css theme

Component dependencies (manual / add):
  Some components require others to work. Picking them adds the required ones automatically.
  Full list of available components and what relies on what: npx rizzo-css help components

Docs: https://rizzo-css.vercel.app
`);
}

function printHelpComponents() {
  const list = ASTRO_COMPONENTS.map((name) => {
    const deps = getComponentDeps('astro', name);
    return deps.length ? name + ' (adds ' + deps.join(', ') + ')' : name;
  });
  const line1 = list.slice(0, 10).join(', ');
  const line2 = list.slice(10, 20).join(', ');
  const line3 = list.slice(20).join(', ');
  console.log(`
Components — full list and what relies on what

Available to pick (Astro & Svelte; same list):
  ` + line1 + (line2 ? ',\n  ' + line2 : '') + (line3 ? ',\n  ' + line3 : '') + `

Dependencies (when you pick the component on the left, the right is added automatically):
  Navbar    →  Search, Settings (navbar includes search bar; Settings so gear button works)
  Settings  →  ThemeSwitcher (and themes.ts)
  Toast     →  Alert

ThemeSwitcher and ThemeIcon: when selected, themes.ts (and Svelte theme.ts) is copied so they work.
Icons: copied whenever you add any component.

Where components are copied:
  Astro   → src/components/rizzo/   (import from there)
  Svelte  → src/lib/rizzo/          (import from '$lib/rizzo')
  Vanilla → components/ (HTML)     (for interactivity add js/main.js; use --vanilla-js on add)

  Full     = all components above; dependencies are included so everything works.
  Minimal  = all 29 interactive components; any component that requires others gets them.
  Manual   = you pick; the picker shows e.g. "Settings (adds ThemeSwitcher)". Required deps are added when you confirm.

To see this again: npx rizzo-css help components
`);
}

function cmdTheme() {
  process.stdout.write('\nDark themes (set data-theme on <html>):\n');
  DARK_THEMES.forEach((t) => process.stdout.write('  ' + t + '\n'));
  process.stdout.write('\nLight themes:\n');
  LIGHT_THEMES.forEach((t) => process.stdout.write('  ' + t + '\n'));
  process.stdout.write('\nExample: <html lang="en" data-theme="github-dark-classic">\n\n');
}

/** Check project for Rizzo CSS: config, CSS file, optional link in layout. */
function cmdDoctor() {
  const cwd = process.cwd();
  const config = readRizzoConfig(cwd);
  console.log(CLI_BANNER);
  console.log('  Doctor — check config, CSS path, and layout link\n');
  let ok = true;
  if (!config) {
    console.log('  ✗ No ' + RIZZO_CONFIG_FILE + '. Run: npx rizzo-css add or init');
    ok = false;
  } else {
    console.log('  ✓ ' + RIZZO_CONFIG_FILE + ' (framework: ' + (config.framework || '?') + ')');
    const fw = config.framework || 'vanilla';
    const paths = getFrameworkCssPaths(fw);
    const targetDir = (config.targetDir || paths.targetDir);
    const cssPath = fw === 'astro' ? join(cwd, 'public', 'css', 'rizzo.min.css') : fw === 'svelte' ? join(cwd, 'static', 'css', 'rizzo.min.css') : join(cwd, targetDir, 'rizzo.min.css');
    if (!existsSync(cssPath)) {
      console.log('  ✗ CSS not found at ' + cssPath);
      ok = false;
    } else {
      console.log('  ✓ CSS at ' + cssPath);
    }
    const layoutPaths = fw === 'svelte' ? ['src/app.html'] : fw === 'astro' ? ['src/layouts/Layout.astro', 'src/layouts/BaseLayout.astro'] : [];
    for (const lp of layoutPaths) {
      const full = join(cwd, lp);
      if (existsSync(full)) {
        const content = readFileSync(full, 'utf8');
        if (!content.includes('rizzo') && !content.includes('rizzo.min.css')) {
          console.log('  ? Layout ' + lp + ' may not include the stylesheet — add <link rel="stylesheet" href="' + (fw === 'svelte' ? '/css/rizzo.min.css' : '/css/rizzo.min.css') + '" />');
        } else {
          console.log('  ✓ Layout ' + lp + ' includes Rizzo link');
        }
        break;
      }
    }
  }
  if (config && config.theme) console.log('  Theme (from config): ' + config.theme);
  console.log(ok ? '\nAll checks passed.\n' : '\nFix the items above, then run your dev server.\n');
}

/** Prompt for default dark theme, default light theme, and initial theme. Returns { theme, defaultDark, defaultLight }. */
async function promptThemes() {
  const defaultDark = await selectMenu(
    DARK_THEMES.map((t) => ({ value: t, label: t })),
    '? Default dark theme (used when system preference is dark)'
  );
  const defaultLight = await selectMenu(
    LIGHT_THEMES.map((t) => ({ value: t, label: t })),
    '? Default light theme (used when system preference is light)'
  );
  const initialChoice = await selectMenu(
    [
      { value: 'system', label: 'System (follow OS light/dark)' },
      { value: defaultDark, label: defaultDark + ' (dark)' },
      { value: defaultLight, label: defaultLight + ' (light)' },
    ],
    '? Initial theme on first load'
  );
  const theme = initialChoice;
  return { theme, defaultDark: DARK_THEMES.includes(defaultDark) ? defaultDark : DARK_THEMES[0], defaultLight: LIGHT_THEMES.includes(defaultLight) ? defaultLight : LIGHT_THEMES[0] };
}

function componentOptionLabel(framework, name) {
  const suffix = getComponentDependencyLabel(framework, name);
  return name + suffix;
}

/** Ask what to include: CSS only, all 29 interactive, all components, or pick. Returns array of component names. Only call when componentList.length > 0. initialSelection: when set (e.g. for manual = all 29 pre-selected), skip the menu and show multi-select with these pre-selected. */
async function promptComponentChoice(componentList, framework, initialSelection) {
  const recommended = RECOMMENDED_COMPONENTS.filter((c) => componentList.includes(c));
  if (initialSelection !== undefined) {
    return multiSelectMenu(
      [
        { value: SENTINEL_ALL, label: 'Select all components' },
        { value: SENTINEL_NONE, label: 'Select no components' },
        ...componentList.map((c) => ({ value: c, label: componentOptionLabel(framework, c) })),
      ],
      '? Components (all interactive pre-selected) — Space to toggle, Enter to confirm',
      initialSelection
    );
  }
  const choice = await selectMenu(
    [
      { value: 'none', label: 'CSS only — no components' },
      { value: 'recommended', label: 'All interactive components (' + recommended.length + ' — base set: Button, Badge, Card, Modal, Tabs, Navbar, Search, Settings, …)' },
      { value: 'all', label: 'All components (' + componentList.length + ')' },
      { value: 'pick', label: 'Pick components (choose each one)' },
    ],
    '? What to include?'
  );
  if (choice === 'none') return [];
  if (choice === 'recommended') return recommended;
  if (choice === 'all') return [...componentList];
  return multiSelectMenu(
    [
      { value: SENTINEL_ALL, label: 'Select all components' },
      { value: SENTINEL_NONE, label: 'Select no components' },
      ...componentList.map((c) => ({ value: c, label: componentOptionLabel(framework, c) })),
    ],
    '? Components — Space to toggle, Enter to confirm. Items like "Settings (adds ThemeSwitcher)" add those deps automatically. List: npx rizzo-css help components'
  );
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

/**
 * Framework-specific paths for CSS and static assets. Use these so fonts, sounds, images
 * go in the right place per framework (Astro: public/, SvelteKit: static/, Vanilla: project root).
 * - targetDir: where rizzo.min.css is copied. Fonts: Astro public/assets/fonts, Svelte static/assets/fonts (CLI rewrites URLs); Vanilla targetDir/fonts.
 * - assetsRoot: root for static assets (Astro: public; Svelte: static; Vanilla: '').
 */
function getFrameworkCssPaths(framework) {
  if (framework === 'svelte') {
    return { targetDir: 'static/css', linkHref: '/css/rizzo.min.css', fontsDir: 'static/assets/fonts', assetsRoot: 'static' };
  }
  if (framework === 'astro') {
    return { targetDir: 'public/css', linkHref: '/css/rizzo.min.css', fontsDir: 'public/assets/fonts', assetsRoot: 'public' };
  }
  return { targetDir: 'css', linkHref: 'css/rizzo.min.css', fontsDir: 'css/fonts', assetsRoot: '' };
}

/**
 * Browser-visible href for the CSS file. Astro serves public/ at /, SvelteKit serves static/ at /.
 * Use this when a custom --path is provided so we tell the user the correct <link href="...">.
 */
function getLinkHrefForTargetDir(framework, targetDir) {
  const file = 'rizzo.min.css';
  if (framework === 'astro' && targetDir) {
    const path = targetDir.replace(/^public\/?/, '').replace(/\/+$/, '') || 'css';
    return '/' + (path ? path + '/' : '') + file;
  }
  if (framework === 'svelte' && targetDir) {
    const path = targetDir.replace(/^static\/?/, '').replace(/\/+$/, '') || 'css';
    return '/' + (path ? path + '/' : '') + file;
  }
  const base = targetDir ? targetDir.replace(/\/+$/, '') : 'css';
  return base ? base + '/' + file : file;
}

async function cmdAdd(argv) {
  const customPath = getFlagValue(argv, '--path');
  const explicitFrameworkRaw = getFlagValue(argv, '--framework');
  const explicitFramework = explicitFrameworkRaw && FRAMEWORKS.includes(explicitFrameworkRaw.toLowerCase()) ? explicitFrameworkRaw.toLowerCase() : null;
  const installPackage = hasFlag(argv, '--install-package');
  const noInstall = hasFlag(argv, '--no-install');
  const writeSnippet = !hasFlag(argv, '--no-snippet');
  const writeReadme = hasFlag(argv, '--readme');
  const force = hasFlag(argv, '--force');
  const copyVanillaJs = hasFlag(argv, '--vanilla-js');
  const positionals = getPositionalArgs(argv);

  const cwd = process.cwd();
  const config = readRizzoConfig(cwd);
  const pmOverride = parsePackageManager(getFlagValue(argv, '--package-manager'));
  const options = {
    config,
    targetDir: customPath || (config && config.targetDir) || undefined,
    packageManager: pmOverride || undefined,
    preselectedComponents: positionals.length > 0 ? positionals : undefined,
    writeSnippet,
    writeReadme,
    force,
    copyVanillaJs,
  };
  await runAddToExisting(explicitFramework, options);
  if (installPackage && !noInstall) {
    const pm = (pmOverride
      ? getPackageManagerCommands({ agent: pmOverride, command: pmOverride })
      : (config && config.packageManager)
        ? getPackageManagerCommands({ agent: config.packageManager, command: config.packageManager })
        : resolvePackageManager(cwd));
    const addPkg = pm.add('rizzo-css');
    console.log('\nRunning: ' + addPkg);
    const code = runInDir(cwd, addPkg);
    if (code !== 0) {
      console.error('\nInstall failed (exit ' + code + '). You can run manually: ' + addPkg);
    }
  }
}

function getScaffoldSvelteDir() {
  return join(getPackageRoot(), 'scaffold', 'svelte');
}

function getScaffoldAstroDir() {
  return join(getPackageRoot(), 'scaffold', 'astro');
}

function getScaffoldUtilsDir() {
  return join(getPackageRoot(), 'scaffold', 'utils');
}

function getScaffoldVanillaIndex() {
  return join(getPackageRoot(), 'scaffold', 'vanilla', 'index.html');
}

function getScaffoldVanillaIconsDir() {
  return join(getPackageRoot(), 'scaffold', 'vanilla', 'icons');
}

function getScaffoldVanillaComponentsDir() {
  return join(getPackageRoot(), 'scaffold', 'vanilla', 'components');
}

/** Copy selected Vanilla component HTML files into projectDir/components/, with replacements. Writes a simple components/index.html. */
function copyVanillaComponents(projectDir, selectedNames, replacements) {
  const srcDir = getScaffoldVanillaComponentsDir();
  if (!existsSync(srcDir)) return;
  const linkHref = replacements['{{LINK_HREF}}'] || 'css/rizzo.min.css';
  const slugsToCopy = [];
  const seen = new Set();
  for (const name of selectedNames) {
    const slug = VANILLA_COMPONENT_SLUGS[name];
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      slugsToCopy.push(slug);
    }
  }
  if (slugsToCopy.length === 0) return;
  const destDir = join(projectDir, 'components');
  mkdirSync(destDir, { recursive: true });
  for (const slug of slugsToCopy) {
    const src = join(srcDir, slug + '.html');
    if (existsSync(src)) {
      let content = readFileSync(src, 'utf8');
      for (const [key, value] of Object.entries(replacements)) {
        content = content.split(key).join(value);
      }
      writeFileSync(join(destDir, slug + '.html'), content, 'utf8');
    }
  }
  const indexLinks = slugsToCopy.map((s) => '    <li><a href="' + s + '.html">' + s + '</a></li>').join('\n');
  const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="${replacements['{{DATA_THEME}}'] || 'github-dark-classic'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Components</title>
  <link rel="stylesheet" href="../${linkHref}" />
</head>
<body>
  <main style="padding: var(--spacing-6); max-width: 60ch;">
    <h1>Components</h1>
    <ul>
${indexLinks}
    </ul>
    <p><a href="../index.html">Back to index</a></p>
  </main>
  <script src="../js/main.js"></script>
</body>
</html>
`;
  writeFileSync(join(destDir, 'index.html'), indexHtml, 'utf8');
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

function getScaffoldAstroMinimalDir() {
  return join(getPackageRoot(), 'scaffold', 'astro-minimal');
}

function getScaffoldSvelteMinimalDir() {
  return join(getPackageRoot(), 'scaffold', 'svelte-minimal');
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
  const toCopy = selectedNames.filter((n) => n !== 'Icons' && available.includes(n));
  const copyIconsOnly = selectedNames.includes('Icons') && toCopy.length === 0;
  if (toCopy.length === 0 && !copyIconsOnly) {
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
  if (existsSync(iconsSrc) && (toCopy.length > 0 || copyIconsOnly)) {
    copyDirRecursive(iconsSrc, join(targetDir, 'icons'));
  }
  if (toCopy.includes('ThemeSwitcher') || toCopy.includes('ThemeIcon')) {
    const themesSrc = join(scaffoldDir, 'themes.ts');
    const themeSrc = join(scaffoldDir, 'theme.ts');
    if (existsSync(themesSrc)) copyFileSync(themesSrc, join(targetDir, 'themes.ts'));
    if (existsSync(themeSrc)) copyFileSync(themeSrc, join(targetDir, 'theme.ts'));
  }
  if (exports.length > 0 || copyIconsOnly) {
    if (exports.length > 0) {
      const indexContent = `/** Rizzo CSS Svelte components — selected via npx rizzo-css init */\n${exports.join('\n')}\n`;
      writeFileSync(join(targetDir, 'index.ts'), indexContent, 'utf8');
    }
    const msg = copyIconsOnly ? 'Icons' : exports.length + ' Svelte components' + (existsSync(iconsSrc) ? ' + icons' : '');
    console.log('\n  ✓ ' + msg + ' copied to ' + targetDir);
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
  const toCopy = selectedNames.filter((n) => n !== 'Icons' && available.includes(n));
  const copyIconsOnly = selectedNames.includes('Icons') && toCopy.length === 0;
  if (toCopy.length === 0 && !copyIconsOnly) {
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
  if (existsSync(iconsSrc) && (toCopy.length > 0 || copyIconsOnly)) {
    copyDirRecursive(iconsSrc, join(targetDir, 'icons'));
  }
  if (toCopy.includes('ThemeSwitcher') || toCopy.includes('ThemeIcon')) {
    const themesSrc = join(scaffoldDir, 'themes.ts');
    if (existsSync(themesSrc)) {
      copyFileSync(themesSrc, join(targetDir, 'themes.ts'));
    }
    // ThemeSwitcher.astro imports '../utils/theme' -> need src/components/utils/theme.ts in project
    const utilsDir = getScaffoldUtilsDir();
    const themeSrc = join(utilsDir, 'theme.ts');
    if (existsSync(themeSrc)) {
      const componentsDir = join(projectDir, 'src', 'components');
      const projectUtilsDir = join(componentsDir, 'utils');
      mkdirSync(projectUtilsDir, { recursive: true });
      let themeContent = readFileSync(themeSrc, 'utf8');
      themeContent = themeContent.replace(/from ['"]\.\.\/astro\/themes['"]/g, "from '../rizzo/themes'");
      writeFileSync(join(projectUtilsDir, 'theme.ts'), themeContent);
    }
  }
  if (count > 0 || copyIconsOnly) {
    const msg = copyIconsOnly ? 'Icons' : count + ' Astro components + icons';
    console.log('\n  ✓ ' + msg + ' copied to ' + targetDir);
    console.log('  Import in your pages: import Button from \'../components/rizzo/Button.astro\';\n');
  }
}

/** Add Rizzo CSS and hand-picked components to an existing project in cwd. frameworkOverride: when set (from init), skip framework prompt. options: { config?, targetDir? }. */
async function runAddToExisting(frameworkOverride, options) {
  const cwd = process.cwd();
  const config = (options && options.config) || readRizzoConfig(cwd);
  let framework = frameworkOverride || (config && config.framework);
  if (framework == null) {
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
    framework = await selectMenu(frameworkOptions, frameworkPrompt);
  }

  const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : framework === 'vanilla' ? Object.keys(VANILLA_COMPONENT_SLUGS) : [];
  const preselected = options.preselectedComponents && options.preselectedComponents.length > 0 ? options.preselectedComponents : null;
  let selectedComponents;
  if (preselected && componentList.length > 0) {
    const valid = preselected.filter((c) => componentList.includes(c));
    const invalid = preselected.filter((c) => !componentList.includes(c));
    if (invalid.length > 0) {
      console.log('Unknown or unsupported component name(s) (skipped): ' + invalid.join(', '));
    }
    selectedComponents = valid;
    if (selectedComponents.length > 0) {
      const n = selectedComponents.length;
      console.log('Adding ' + n + ' component' + (n === 1 ? '' : 's') + ': ' + selectedComponents.join(', '));
    }
  } else if (preselected && componentList.length === 0) {
    selectedComponents = [];
  } else {
    selectedComponents = componentList.length > 0
      ? await promptComponentChoice(componentList, framework)
      : [];
  }

  let theme, defaultDark, defaultLight;
  const wantsThemeSwitcher = selectedComponents.includes('ThemeSwitcher');
  if (wantsThemeSwitcher && !preselected) {
    const setDefaults = await selectMenu(
      [
        { value: true, label: 'Yes — choose default dark, default light, and initial theme' },
        { value: false, label: 'No — use defaults (github-dark-classic / github-light)' },
      ],
      '? Set default themes for ThemeSwitcher? (same as create-new flow)'
    );
    if (setDefaults) {
      const out = await promptThemes();
      theme = out.theme;
      defaultDark = out.defaultDark;
      defaultLight = out.defaultLight;
    } else {
      theme = DARK_THEMES[0];
      defaultDark = DARK_THEMES[0];
      defaultLight = LIGHT_THEMES[0];
    }
  } else {
    theme = DARK_THEMES[0];
    defaultDark = DARK_THEMES[0];
    defaultLight = LIGHT_THEMES[0];
  }

  const cssSource = getCssPath();
  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  const paths = getFrameworkCssPaths(framework);
  const targetDirRaw = (options && options.targetDir) || (config && config.targetDir) || paths.targetDir;
  let cssTarget;
  if (framework === 'astro') {
    cssTarget = join(cwd, 'public', 'css', 'rizzo.min.css');
  } else if (framework === 'svelte') {
    cssTarget = join(cwd, 'static', 'css', 'rizzo.min.css');
  } else {
    const targetDir = join(cwd, targetDirRaw);
    cssTarget = join(targetDir, 'rizzo.min.css');
  }
  const cssExists = existsSync(cssTarget);
  if (cssExists && !options.force) {
    const answer = await question('\nCSS already exists at ' + cssTarget + '. Overwrite? (y/N) ');
    if (answer !== '' && !/^y(es)?$/i.test(answer)) {
      console.log('Skipping CSS copy. Updating config and components only.');
    } else {
      options._overwriteCss = true;
    }
  } else if (cssExists && options.force) {
    options._overwriteCss = true;
  } else {
    options._overwriteCss = true;
  }
  if (options._overwriteCss) {
    if (framework === 'astro') {
      copyRizzoCssAndFontsForAstro(cwd, cssSource);
    } else if (framework === 'svelte') {
      copyRizzoCssAndFontsForSvelte(cwd, cssSource);
    } else {
      const targetDir = join(cwd, targetDirRaw);
      mkdirSync(targetDir, { recursive: true });
      copyFileSync(cssSource, cssTarget);
      copyRizzoFonts(dirname(cssTarget));
    }
  }

  copyRizzoIcons(cwd, framework);
  if (framework === 'svelte' && selectedComponents.length > 0) {
    const expanded = expandWithDeps('svelte', selectedComponents);
    logAddedDeps(selectedComponents, expanded, 'svelte');
    copySvelteComponents(cwd, expanded);
  } else if (framework === 'astro' && selectedComponents.length > 0) {
    const expanded = expandWithDeps('astro', selectedComponents);
    logAddedDeps(selectedComponents, expanded, 'astro');
    copyAstroComponents(cwd, expanded);
  } else if (framework === 'vanilla' && selectedComponents.length > 0) {
    const linkHrefForVanilla = (options && options.targetDir) ? getLinkHrefForTargetDir(framework, options.targetDir) : paths.linkHref;
    const vanillaRepl = { '{{LINK_HREF}}': linkHrefForVanilla, '{{DATA_THEME}}': theme };
    copyVanillaComponents(cwd, selectedComponents, vanillaRepl);
    const needsJs = selectedComponents.some((c) => VANILLA_JS_COMPONENTS.includes(c));
    const vanillaJsPath = join(cwd, 'js', 'main.js');
    if (needsJs && !existsSync(vanillaJsPath) && (options.copyVanillaJs || (!preselected && (await confirmCopyVanillaJs())))) {
      const vanillaJsSrc = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
      if (existsSync(vanillaJsSrc)) {
        mkdirSync(join(cwd, 'js'), { recursive: true });
        let mainJs = readFileSync(vanillaJsSrc, 'utf8');
        mainJs = mainJs.replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark).replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight);
        writeFileSync(vanillaJsPath, mainJs, 'utf8');
        console.log('  - Wrote js/main.js (for modal, dropdown, tabs, toast, search, navbar, copy-to-clipboard, theme switcher)');
      }
    } else if (needsJs && !existsSync(vanillaJsPath)) {
      options._vanillaJsHint = true;
    }
  }

  const linkHref = (framework === 'astro' || framework === 'svelte') ? paths.linkHref : ((options && options.targetDir) ? getLinkHrefForTargetDir(framework, options.targetDir) : paths.linkHref);
  const pmFromOption = options && options.packageManager && VALID_PACKAGE_MANAGERS.includes(options.packageManager);
  const pm = pmFromOption
    ? getPackageManagerCommands({ agent: options.packageManager, command: options.packageManager })
    : (config && config.packageManager)
      ? getPackageManagerCommands({ agent: config.packageManager, command: config.packageManager })
      : resolvePackageManager(cwd);
  const cliExample = pm.dlx('rizzo-css theme');
  const configTargetDir = framework === 'astro' ? 'public/css' : framework === 'svelte' ? 'static/css' : targetDirRaw;
  writeRizzoConfig(cwd, { targetDir: configTargetDir, framework, packageManager: pm.agent, theme });
  const writeSnippet = options.writeSnippet !== false;
  if (writeSnippet) {
    const where = framework === 'svelte' ? 'Root layout (e.g. src/app.html)' : framework === 'astro' ? 'Layout (e.g. src/layouts/Layout.astro)' : 'HTML or layout';
    const snippetBody = [
      'Add to ' + where + ':',
      '',
      '  <link rel="stylesheet" href="' + linkHref + '" />',
      '',
      'On <html>: data-theme="' + theme + '"',
      'Themes: ' + cliExample,
    ].join('\n');
    writeFileSync(join(cwd, RIZZO_SNIPPET_FILE), snippetBody + '\n', 'utf8');
  }
  if (options.writeReadme) {
    const readmePath = join(getPackageRoot(), 'scaffold', 'vanilla', SCAFFOLD_README_FILENAME);
    if (existsSync(readmePath)) {
      copyFileSync(readmePath, join(cwd, SCAFFOLD_README_FILENAME));
    }
  }
  console.log('\n✓ Rizzo CSS added to your existing project');
  console.log('  - ' + cssTarget);
  console.log('  - Wrote ' + RIZZO_CONFIG_FILE);
  if (writeSnippet) console.log('  - Wrote ' + RIZZO_SNIPPET_FILE + ' (copy-paste link + theme)');
  if (options.writeReadme) console.log('  - Wrote ' + SCAFFOLD_README_FILENAME);
  console.log('\nYou must add the stylesheet link yourself — it is not added automatically.');
  if (selectedComponents.length === 0) {
    console.log('\n  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('  data-theme="' + theme + '" on <html> — list themes: ' + cliExample);
  } else if (framework === 'svelte') {
    console.log('\nIn your root layout (e.g. src/app.html), add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('  data-theme="' + theme + '" on <html> (themes: ' + cliExample + ')');
    console.log('  Components: src/lib/rizzo — import from \'$lib/rizzo\'.');
  } else if (framework === 'astro') {
    console.log('\nIn your layout (e.g. src/layouts/Layout.astro), add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('  data-theme="' + theme + '" on <html> (themes: ' + cliExample + ')');
    console.log('  Components: src/components/rizzo — import from there.');
  } else {
    console.log('\nIn your HTML or layout, add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('  data-theme="' + theme + '" on <html> (themes: ' + cliExample + ')');
    console.log('  Component HTML files are in components/.');
    if (options._vanillaJsHint) {
      console.log('  For interactive components (modal, dropdown, tabs, toast, search, navbar, copy-to-clipboard, theme switcher), add js/main.js — run again with --vanilla-js or copy from a Full scaffold.');
    }
  }
  console.log('\nTo install the package: ' + pm.add('rizzo-css'));
  console.log('\nNext: add the link above, then run your dev server. Docs: https://rizzo-css.vercel.app\n');
}

async function cmdInit(argv) {
  argv = argv || [];
  const yes = hasFlag(argv, '--yes');
  const runInstallAfterScaffold = hasFlag(argv, '--install');
  const noInstall = hasFlag(argv, '--no-install');
  const cwd = process.cwd();
  const config = readRizzoConfig(cwd);

  let framework;
  let initMode;
  let name = '';
  let customProjectPath = getFlagValue(argv, '--path');
  let theme, defaultDark, defaultLight;
  let selectedPm;
  let selectedTemplate;
  let selectedComponents = [];

  if (yes) {
    const frameworkArg = getFlagValue(argv, '--framework');
    framework = (frameworkArg && FRAMEWORKS.includes(frameworkArg.toLowerCase())) ? frameworkArg.toLowerCase() : (config && config.framework) || 'astro';
    initMode = 'new';
    const templateArg = getFlagValue(argv, '--template');
    const defaultTemplate = framework === 'vanilla' ? 'minimal' : 'full';
    selectedTemplate = (templateArg && (templateArg === 'full' || templateArg === 'minimal' || templateArg === 'manual')) ? templateArg : defaultTemplate;
    if (selectedTemplate === 'full' && (framework === 'astro' || framework === 'svelte')) {
      selectedComponents = framework === 'svelte' ? [...SVELTE_COMPONENTS] : [...ASTRO_COMPONENTS];
    } else if (selectedTemplate === 'minimal' && (framework === 'astro' || framework === 'svelte')) {
      const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : ASTRO_COMPONENTS;
      selectedComponents = RECOMMENDED_COMPONENTS.filter((c) => componentList.includes(c));
    }
    const projectDir = customProjectPath ? pathResolve(cwd, customProjectPath) : cwd;
    const resolved = resolvePackageManager(projectDir, cwd);
    const pmArg = getFlagValue(argv, '--package-manager');
    selectedPm = parsePackageManager(pmArg) || (config && config.packageManager) || resolved.agent || 'npm';
    theme = 'system';
    defaultDark = DARK_THEMES[0];
    defaultLight = LIGHT_THEMES[0];
  } else {
    console.log(CLI_BANNER);
    framework = await selectMenu(
      [
        { value: 'vanilla', label: 'Vanilla JS (HTML + CSS + same styles & components)', color: C.vanilla },
        { value: 'astro', label: 'Astro', color: C.astro },
        { value: 'svelte', label: 'Svelte', color: C.svelte },
      ],
      '? Framework — all get the same CSS and component styles'
    );

    initMode = await selectMenu(
      [
        { value: 'existing', label: 'Add to existing project (current directory)' },
        { value: 'new', label: 'Create new project (scaffold)' },
      ],
      '? Add to existing project or create a new one?'
    );

    if (initMode === 'existing') {
      await runAddToExisting(framework, { config });
      return;
    }

    const projectChoice = await selectMenu(
      [
        { value: 'cwd', label: 'Current directory' },
        { value: 'name', label: 'Enter project name (new folder)' },
        { value: 'path', label: 'Enter path (directory to create or use)' },
      ],
      '? Project location'
    );
    if (projectChoice === 'name') {
      name = await question('Project name (folder name): ');
    } else if (projectChoice === 'path') {
      customProjectPath = await question('Path (relative to current dir or absolute): ');
      customProjectPath = (customProjectPath || '').trim();
      if (!customProjectPath) {
        console.log('No path entered. Using current directory.');
        customProjectPath = null;
      }
    }

    selectedTemplate = await selectMenu(TEMPLATES[framework] || TEMPLATES.vanilla, '? Full, Minimal, or Manual?');

    if (selectedTemplate === 'full' && (framework === 'astro' || framework === 'svelte')) {
      selectedComponents = framework === 'svelte' ? [...SVELTE_COMPONENTS] : [...ASTRO_COMPONENTS];
    } else if (selectedTemplate === 'minimal' && (framework === 'astro' || framework === 'svelte')) {
      const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : ASTRO_COMPONENTS;
      selectedComponents = RECOMMENDED_COMPONENTS.filter((c) => componentList.includes(c));
    } else if (selectedTemplate === 'manual') {
      const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : ASTRO_COMPONENTS;
      const recommended = RECOMMENDED_COMPONENTS.filter((c) => componentList.includes(c));
      selectedComponents = await promptComponentChoice(componentList, framework, recommended);
    }

    const wantsThemeSwitcher = (framework === 'vanilla' && (selectedTemplate === 'full' || selectedTemplate === 'minimal')) || selectedComponents.includes('ThemeSwitcher');
    if (wantsThemeSwitcher) {
      const themeOut = await promptThemes();
      theme = themeOut.theme;
      defaultDark = themeOut.defaultDark;
      defaultLight = themeOut.defaultLight;
    } else {
      theme = 'system';
      defaultDark = DARK_THEMES[0];
      defaultLight = LIGHT_THEMES[0];
    }

    const projectDirForPm = customProjectPath ? pathResolve(cwd, customProjectPath) : (name ? join(cwd, name) : cwd);
    const pmArg = getFlagValue(argv, '--package-manager');
    selectedPm = parsePackageManager(pmArg) || await promptPackageManager(projectDirForPm);
  }

  const projectDir = customProjectPath ? pathResolve(cwd, customProjectPath) : (name ? join(cwd, name) : cwd);
  if (isDirNonEmpty(projectDir) && !yes) {
    const ok = await confirmNonEmptyDir(projectDir);
    if (!ok) {
      console.log('Aborted.');
      return;
    }
  }
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  const themeComment = '  <!-- Initial: ' + theme + '; dark: ' + defaultDark + '; light: ' + defaultLight + ' (all 14 themes in CSS) -->';
  const projectNamePkg = name
    ? name.replace(/\s+/g, '-').toLowerCase()
    : (framework === 'astro' ? 'my-astro-app' : framework === 'svelte' ? 'my-svelte-app' : 'my-app');
  const replacements = {
    '{{DATA_THEME}}': theme,
    '{{DEFAULT_DARK}}': defaultDark,
    '{{DEFAULT_LIGHT}}': defaultLight,
    '{{THEME_LIST_COMMENT}}': themeComment,
    '{{TITLE}}': name || 'App',
    '{{PROJECT_NAME}}': projectNamePkg,
  };

  const astroMinimalDir = getScaffoldAstroMinimalDir();
  const svelteMinimalDir = getScaffoldSvelteMinimalDir();
  const pathsForScaffold = getFrameworkCssPaths(framework);
  const useHandpickAstro = selectedTemplate === 'manual' && framework === 'astro' && existsSync(astroMinimalDir);
  const useHandpickSvelte = selectedTemplate === 'manual' && framework === 'svelte' && existsSync(svelteMinimalDir);
  const useAstroBase = (selectedTemplate === 'full' || selectedTemplate === 'minimal') && framework === 'astro' && existsSync(astroMinimalDir);
  const useSvelteBase = (selectedTemplate === 'full' || selectedTemplate === 'minimal') && framework === 'svelte' && existsSync(svelteMinimalDir);
  const useVanillaFull = selectedTemplate === 'full' && framework === 'vanilla' && existsSync(getScaffoldVanillaIndex());
  const useVanillaMinimal = selectedTemplate === 'minimal' && framework === 'vanilla';

  // Full and minimal get all required dependencies so everything works; manual gets deps when user picks (see prompt labels).
  let componentsToCopy = selectedComponents;
  if ((framework === 'astro' || framework === 'svelte') && selectedComponents.length > 0) {
    componentsToCopy = expandWithDeps(framework, selectedComponents);
    logAddedDeps(selectedComponents, componentsToCopy, framework);
  }

  // Astro layout: inject Navbar and Settings when those components are selected so the settings menu works.
  if ((framework === 'astro') && (useHandpickAstro || useAstroBase)) {
    const hasNavbar = componentsToCopy.includes('Navbar');
    const hasSettings = componentsToCopy.includes('Settings');
    const layoutImports = [];
    if (hasNavbar) layoutImports.push("import Navbar from '../components/rizzo/Navbar.astro';");
    if (hasSettings) layoutImports.push("import Settings from '../components/rizzo/Settings.astro';");
    replacements['{{RIZZO_LAYOUT_IMPORTS}}'] = layoutImports.length ? '\n' + layoutImports.join('\n') + '\n' : '\n';
    replacements['{{RIZZO_LAYOUT_BODY_TOP}}'] = hasNavbar ? '\n    <Navbar />' : '';
    replacements['{{RIZZO_LAYOUT_BODY_BOTTOM}}'] = hasSettings ? '\n    <Settings />' : '';
  } else {
    replacements['{{RIZZO_LAYOUT_IMPORTS}}'] = '\n';
    replacements['{{RIZZO_LAYOUT_BODY_TOP}}'] = '';
    replacements['{{RIZZO_LAYOUT_BODY_BOTTOM}}'] = '';
  }

  let cssTarget;
  let indexPath;

  const minimalHtml = `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">${themeComment}
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${name || 'App'}</title>
  <link rel="stylesheet" href="${framework === 'vanilla' ? 'css/rizzo.min.css' : '/css/rizzo.min.css'}" />
</head>
<body>
  <h1>Hello, Rizzo CSS</h1>
  <p>Edit this file and add components. Docs: <a href="https://rizzo-css.vercel.app">rizzo-css.vercel.app</a></p>
</body>
</html>
`;

  if (useHandpickAstro) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(astroMinimalDir, projectDir, replacements);
    copyRizzoCssAndFontsForAstro(projectDir, cssSource);
    cssTarget = join(projectDir, 'public', 'css', 'rizzo.min.css');
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    copyAstroGitignore(projectDir);
    if (componentsToCopy.length > 0) {
      copyRizzoIcons(projectDir, 'astro');
      copyAstroComponents(projectDir, componentsToCopy);
    }
  } else if (useAstroBase) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(astroMinimalDir, projectDir, replacements);
    copyRizzoCssAndFontsForAstro(projectDir, cssSource);
    cssTarget = join(projectDir, 'public', 'css', 'rizzo.min.css');
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    copyAstroGitignore(projectDir);
    if (componentsToCopy.length > 0) {
      copyRizzoIcons(projectDir, 'astro');
      copyAstroComponents(projectDir, componentsToCopy);
    }
  } else if (useHandpickSvelte) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(svelteMinimalDir, projectDir, replacements);
    copyRizzoCssAndFontsForSvelte(projectDir, cssSource);
    cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    copySvelteGitignore(projectDir);
    if (componentsToCopy.length > 0) {
      copyRizzoIcons(projectDir, 'svelte');
      copySvelteComponents(projectDir, componentsToCopy);
    }
  } else if (useSvelteBase) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(svelteMinimalDir, projectDir, replacements);
    copyRizzoCssAndFontsForSvelte(projectDir, cssSource);
    cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    copySvelteGitignore(projectDir);
    if (componentsToCopy.length > 0) {
      copyRizzoIcons(projectDir, 'svelte');
      copySvelteComponents(projectDir, componentsToCopy);
    }
  } else if (useVanillaFull) {
    const cssDir = join(projectDir, pathsForScaffold.targetDir);
    cssTarget = join(cssDir, 'rizzo.min.css');
    const linkHref = 'css/rizzo.min.css';
    mkdirSync(cssDir, { recursive: true });
    copyFileSync(cssSource, cssTarget);
    copyRizzoFonts(dirname(cssTarget));
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    const vanillaScaffoldPath = getScaffoldVanillaIndex();
    indexPath = join(projectDir, 'index.html');
    let indexHtml = readFileSync(vanillaScaffoldPath, 'utf8');
    indexHtml = indexHtml
      .replace(/\{\{DATA_THEME\}\}/g, theme)
      .replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark)
      .replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight)
      .replace(/\{\{THEME_LIST_COMMENT\}\}/g, themeComment)
      .replace(/\{\{TITLE\}\}/g, name || 'App')
      .replace(/\{\{LINK_HREF\}\}/g, linkHref);
    writeFileSync(indexPath, indexHtml, 'utf8');
    copyRizzoIcons(projectDir, 'vanilla');
    const vanillaReadme = join(getPackageRoot(), 'scaffold', 'vanilla', SCAFFOLD_README_FILENAME);
    if (existsSync(vanillaReadme)) {
      copyFileSync(vanillaReadme, join(projectDir, SCAFFOLD_README_FILENAME));
    }
    const vanillaJs = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
    if (existsSync(vanillaJs)) {
      mkdirSync(join(projectDir, 'js'), { recursive: true });
      let mainJs = readFileSync(vanillaJs, 'utf8');
      mainJs = mainJs.replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark).replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight);
      writeFileSync(join(projectDir, 'js', 'main.js'), mainJs, 'utf8');
    }
    const vanillaFullRepl = { ...replacements, '{{LINK_HREF}}': linkHref };
    copyVanillaComponents(projectDir, Object.keys(VANILLA_COMPONENT_SLUGS), vanillaFullRepl);
    copyPackageLicense(projectDir);
    copyVanillaGitignore(projectDir);
  } else if (useVanillaMinimal) {
    const cssDir = join(projectDir, pathsForScaffold.targetDir);
    cssTarget = join(cssDir, 'rizzo.min.css');
    mkdirSync(cssDir, { recursive: true });
    copyFileSync(cssSource, cssTarget);
    copyRizzoFonts(dirname(cssTarget));
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    mkdirSync(join(projectDir, 'js'), { recursive: true });
    const vanillaJs = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
    if (existsSync(vanillaJs)) {
      let mainJs = readFileSync(vanillaJs, 'utf8');
      mainJs = mainJs.replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark).replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight);
      writeFileSync(join(projectDir, 'js', 'main.js'), mainJs, 'utf8');
    }
    const vanillaRepl = { ...replacements, '{{LINK_HREF}}': 'css/rizzo.min.css' };
    copyVanillaComponents(projectDir, RECOMMENDED_COMPONENTS, vanillaRepl);
    copyRizzoIcons(projectDir, 'vanilla');
    const minimalIndexWithScript = minimalHtml.replace('</body>', '  <script src="js/main.js"></script>\n</body>');
    indexPath = join(projectDir, 'index.html');
    writeFileSync(indexPath, minimalIndexWithScript, 'utf8');
    writeFileSync(join(projectDir, SCAFFOLD_README_FILENAME), VANILLA_MINIMAL_README, 'utf8');
    copyPackageLicense(projectDir);
    copyVanillaGitignore(projectDir);
  } else {
    if (framework === 'svelte') {
      copyRizzoCssAndFontsForSvelte(projectDir, cssSource);
      cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    } else {
      const cssDir = join(projectDir, pathsForScaffold.targetDir);
      cssTarget = join(cssDir, 'rizzo.min.css');
      mkdirSync(cssDir, { recursive: true });
      copyFileSync(cssSource, cssTarget);
      copyRizzoFonts(dirname(cssTarget));
    }
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    if (framework === 'vanilla' && selectedTemplate === 'manual') {
      indexPath = join(projectDir, 'index.html');
      let indexContent = minimalHtml;
      if (selectedComponents.length > 0) {
        mkdirSync(join(projectDir, 'js'), { recursive: true });
        const vanillaJs = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
        if (existsSync(vanillaJs)) {
          let mainJs = readFileSync(vanillaJs, 'utf8');
          mainJs = mainJs.replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark).replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight);
          writeFileSync(join(projectDir, 'js', 'main.js'), mainJs, 'utf8');
        }
        const vanillaRepl = { ...replacements, '{{LINK_HREF}}': 'css/rizzo.min.css' };
        copyVanillaComponents(projectDir, selectedComponents, vanillaRepl);
        copyRizzoIcons(projectDir, 'vanilla');
        indexContent = minimalHtml.replace('</body>', '  <script src="js/main.js"></script>\n</body>');
      }
      writeFileSync(indexPath, indexContent, 'utf8');
      writeFileSync(join(projectDir, SCAFFOLD_README_FILENAME), VANILLA_MANUAL_README, 'utf8');
      copyVanillaGitignore(projectDir);
    } else if (framework === 'astro') {
      indexPath = join(projectDir, 'public', 'index.html');
      mkdirSync(join(projectDir, 'public'), { recursive: true });
      writeFileSync(indexPath, minimalHtml, 'utf8');
      writeFileSync(join(projectDir, SCAFFOLD_README_FILENAME), FALLBACK_MINIMAL_README, 'utf8');
    } else {
      indexPath = join(projectDir, 'static', 'index.html');
      mkdirSync(join(projectDir, 'static'), { recursive: true });
      writeFileSync(indexPath, minimalHtml, 'utf8');
      writeFileSync(join(projectDir, SCAFFOLD_README_FILENAME), FALLBACK_MINIMAL_README, 'utf8');
    }
    copyPackageLicense(projectDir);
  }

  console.log('\n✓ Project ready at ' + projectDir);
  console.log('  - ' + cssTarget);
  if (indexPath) console.log('  - ' + indexPath);
  if (framework === 'vanilla') {
    if (useVanillaFull) {
      console.log('  - Vanilla JS (full): theme switcher, js/main.js, icons, component showcase, ' + SCAFFOLD_README_FILENAME + '.');
    } else if (useVanillaMinimal) {
      console.log('  - Vanilla JS (minimal): index.html + CSS + js/main.js + all interactive components.');
    } else {
      console.log('  - Vanilla JS (manual): index.html + CSS only. Add JS from docs or copy from Full.');
    }
  }
  const pm = getPackageManagerCommands({ agent: selectedPm, command: selectedPm });
  const nextStep = pm.install + ' && ' + pm.run('dev');
  const runPrefix = projectDir !== cwd ? 'cd ' + pathRelative(cwd, projectDir) + ' && ' : '';
  const hasPackageJson = useHandpickAstro || useHandpickSvelte || useAstroBase || useSvelteBase;

  // Always write rizzo-css.json for new projects (targetDir, framework, packageManager).
  const pathsForConfig = getFrameworkCssPaths(framework);
  writeRizzoConfig(projectDir, { targetDir: pathsForConfig.targetDir, framework, packageManager: selectedPm, theme });
  console.log('  - Wrote ' + RIZZO_CONFIG_FILE);

  if (runInstallAfterScaffold && !noInstall && hasPackageJson) {
    console.log('\nRunning: ' + pm.install);
    const code = runInDir(projectDir, pm.install);
    if (code !== 0) {
      console.error('\nInstall failed (exit ' + code + '). Run manually: ' + runPrefix + pm.install);
    }
  } else if (!yes && !noInstall && hasPackageJson) {
    const shouldRun = await confirmRunInstall(pm);
    if (shouldRun) {
      console.log('\nRunning: ' + pm.install);
      const code = runInDir(projectDir, pm.install);
      if (code !== 0) {
        console.error('\nInstall failed (exit ' + code + '). Run manually: ' + runPrefix + pm.install);
      }
    }
  }

  if (useHandpickAstro || useHandpickSvelte) {
    const fw = useHandpickAstro ? 'Astro' : 'SvelteKit';
    console.log('  - ' + fw + ' (manual): base + ' + selectedComponents.length + ' component(s). Run: ' + runPrefix + nextStep);
  }
  if (useAstroBase) {
    const label = selectedTemplate === 'full' ? 'Full' : 'Minimal';
    console.log('  - Astro (' + label.toLowerCase() + '): app + ' + selectedComponents.length + ' component(s). Run: ' + runPrefix + nextStep);
  }
  if (useSvelteBase) {
    const label = selectedTemplate === 'full' ? 'Full' : 'Minimal';
    console.log('  - SvelteKit (' + label.toLowerCase() + '): app + ' + selectedComponents.length + ' component(s). Run: ' + runPrefix + nextStep);
  }
  if ((framework === 'astro' || framework === 'svelte') && !useAstroBase && !useSvelteBase && !useHandpickAstro && !useHandpickSvelte) {
    const fw = framework === 'svelte' ? 'Svelte' : 'Astro';
    const createExample = getCreateProjectExample(pm, framework);
    console.log('\n  - Minimal template (CSS + index). To get a full app: ' + createExample + ', then cd into the project and run ' + pm.dlx('rizzo-css add') + '.');
  }
  if (hasPackageJson) console.log('\nNext: ' + runPrefix + nextStep);
  else if (framework === 'vanilla') console.log('\nNext: open index.html or serve the folder.');
  console.log('\nDocs: https://rizzo-css.vercel.app\n');
}

function main() {
  const argv = process.argv.slice(2);
  const command = (argv[0] || 'help').toLowerCase().replace(/^--?/, '');

  if (command === 'help' || command === 'h' || !COMMANDS.includes(command)) {
    if (argv[1] === 'components') {
      printHelpComponents();
      return;
    }
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

  if (command === 'doctor') {
    cmdDoctor();
    return;
  }

  if (command === 'add') {
    cmdAdd(argv).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    return;
  }

  if (command === 'init') {
    cmdInit(argv).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    return;
  }
}

main();
