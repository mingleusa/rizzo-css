#!/usr/bin/env node

const { copyFileSync, mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync, statSync } = require('fs');
const { join, dirname } = require('path');
const { spawnSync } = require('child_process');
const readline = require('readline');

const RIZZO_CONFIG_FILE = 'rizzo-css.json';

const COMMANDS = ['init', 'add', 'theme', 'help'];
const FRAMEWORKS = ['vanilla', 'astro', 'svelte'];

/** Template options for "create new" when user chooses "Use a template". When they choose "No template" they get minimal base + hand-pick components. */
const TEMPLATES = {
  vanilla: [
    { value: 'full', label: 'Full — index.html + theme switcher, js/main.js, icons, README' },
    { value: 'minimal', label: 'Minimal — index.html + CSS link only' },
  ],
  astro: [
    { value: 'minimal', label: 'Minimal — Astro with config, one page, README, LICENSE, .env.example' },
  ],
  svelte: [
    { value: 'minimal', label: 'Minimal — SvelteKit with config, one page, README, LICENSE, .env.example' },
  ],
};

const VANILLA_MINIMAL_README = `# Vanilla + Rizzo CSS (minimal)

Minimal HTML + Rizzo CSS. Scaffolded with \`npx rizzo-css init --framework vanilla --template minimal\`.

- Open \`index.html\` in a browser or serve the folder with any static server.
- Edit \`index.html\` and add your content. CSS: \`css/rizzo.min.css\`.
- Set a theme: \`<html data-theme="github-dark-classic">\` (see \`npx rizzo-css theme\` for all themes).

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
];
const ASTRO_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
  'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
  'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
  'Modal', 'Toast', 'Table', 'ThemeSwitcher',
];

// Recommended subset for "Recommended set" option (keeps CLI simple; power users can pick)
const RECOMMENDED_COMPONENTS = [
  'Button', 'Badge', 'Card', 'Modal', 'Tabs', 'ThemeSwitcher', 'FormGroup', 'Alert', 'Toast', 'Dropdown',
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

/** Copy the package LICENSE into the project dir. Call after every scaffold so every install includes a license. */
function copyPackageLicense(projectDir) {
  const licensePath = join(getPackageRoot(), 'LICENSE');
  if (existsSync(licensePath)) {
    copyFileSync(licensePath, join(projectDir, 'LICENSE'));
  }
}

/** Read rizzo-css.json from cwd. Returns { targetDir?, framework?, packageManager? } or null. */
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
    return Object.keys(out).length ? out : null;
  } catch (_) { return null; }
}

/** Write rizzo-css.json to cwd. config: { targetDir?, framework?, packageManager? }. */
function writeRizzoConfig(cwd, config) {
  if (!cwd || !existsSync(cwd)) return;
  const configPath = join(cwd, RIZZO_CONFIG_FILE);
  const obj = {};
  if (config.targetDir != null) obj.targetDir = config.targetDir;
  if (config.framework != null) obj.framework = config.framework;
  if (config.packageManager != null) obj.packageManager = config.packageManager;
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

/** Prompt user to select package manager (npm, pnpm, yarn, bun). Puts detected first with "(detected)" label. Returns agent string. */
async function promptPackageManager(projectDir) {
  const detected = resolvePackageManager(projectDir, process.cwd());
  const agents = ['npm', 'pnpm', 'yarn', 'bun'];
  const options = agents.map((a) => ({
    value: a,
    label: a === detected.agent ? a + ' (detected)' : a,
  }));
  return selectMenu(options, '? Package manager (for install and run commands)');
}

/** Prompt user to select template for the chosen framework. Returns template value (full or minimal for Vanilla; minimal for Astro/Svelte). */
async function promptTemplate(framework) {
  const options = TEMPLATES[framework] || TEMPLATES.vanilla;
  return selectMenu(options, '? Template');
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
rizzo-css CLI — Add Rizzo CSS to your project (Vanilla, Astro, Svelte)

Usage (use your package manager):
  npx rizzo-css <command> [options]
  pnpm dlx rizzo-css <command> [options]
  yarn dlx rizzo-css <command> [options]
  bunx rizzo-css <command> [options]

Commands:
  init    New project = template (or no template → hand-pick components). Existing = drop in CSS + hand-pick. First: framework, then existing vs new.
  add     Same as init → existing: drop in CSS + hand-pick components (framework detected or from rizzo-css.json)
  theme   List all available themes (use in init or set data-theme on <html>)
  help    Show this help

Options (init):
  --yes             Non-interactive: scaffold new in cwd with defaults (framework: astro, template: minimal)
  --framework <fw>  vanilla | astro | svelte (with --yes; otherwise first prompt)
  --template <t>    full | minimal (Vanilla); minimal only (Astro/Svelte); with --yes defaults to full or minimal
  --install         After scaffolding, run package manager install (new project)
  --no-install      Do not run install
  --write-config    Write rizzo-css.json (targetDir, framework, packageManager) in the project

Options (add):
  --path <dir>      Target directory for rizzo.min.css (overrides config and framework default)
  --framework <fw>   vanilla | astro | svelte (overrides config and detection)
  --install-package  After copying CSS, run package manager add rizzo-css
  --no-install      Do not run install or add (overrides --install-package)

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
  npx rizzo-css init --yes --framework astro --install --write-config
  npx rizzo-css init --yes --framework vanilla
  npx rizzo-css init --yes --framework svelte --template minimal
  npx rizzo-css add
  npx rizzo-css add --install-package
  npx rizzo-css add --path public/css --framework svelte
  npx rizzo-css theme

Docs: https://rizzo-css.vercel.app
`);
}

function cmdTheme() {
  process.stdout.write('\nDark themes (set data-theme on <html>):\n');
  DARK_THEMES.forEach((t) => process.stdout.write('  ' + t + '\n'));
  process.stdout.write('\nLight themes:\n');
  LIGHT_THEMES.forEach((t) => process.stdout.write('  ' + t + '\n'));
  process.stdout.write('\nExample: <html lang="en" data-theme="github-dark-classic">\n\n');
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

/** Ask what to include: CSS only, recommended set, all components, or pick. Returns array of component names. Only call when componentList.length > 0. */
async function promptComponentChoice(componentList, framework) {
  const recommended = RECOMMENDED_COMPONENTS.filter((c) => componentList.includes(c));
  const choice = await selectMenu(
    [
      { value: 'none', label: 'CSS only — no components' },
      { value: 'recommended', label: 'Recommended set (' + recommended.length + ' components: Button, Badge, Card, Modal, Tabs, ThemeSwitcher, FormGroup, Alert, Toast, Dropdown)' },
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
      ...componentList.map((c) => ({ value: c, label: c })),
    ],
    '? Components — Space to toggle, Enter to confirm'
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

/** Default CSS directory and link href for a framework (for add command). */
function getFrameworkCssPaths(framework) {
  if (framework === 'svelte') return { targetDir: 'static/css', linkHref: '/css/rizzo.min.css' };
  if (framework === 'astro') return { targetDir: 'public/css', linkHref: '/css/rizzo.min.css' };
  return { targetDir: 'css', linkHref: 'css/rizzo.min.css' };
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

  const cwd = process.cwd();
  const config = readRizzoConfig(cwd);
  const options = { config, targetDir: customPath || (config && config.targetDir) || undefined };
  await runAddToExisting(explicitFramework, options);
  if (installPackage && !noInstall) {
    const pm = (config && config.packageManager)
      ? getPackageManagerCommands({ agent: config.packageManager, command: config.packageManager })
      : resolvePackageManager(cwd);
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
  if (toCopy.includes('ThemeSwitcher')) {
    const themesSrc = join(scaffoldDir, 'themes.ts');
    const themeSrc = join(scaffoldDir, 'theme.ts');
    if (existsSync(themesSrc)) copyFileSync(themesSrc, join(targetDir, 'themes.ts'));
    if (existsSync(themeSrc)) copyFileSync(themeSrc, join(targetDir, 'theme.ts'));
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
  if (toCopy.includes('ThemeSwitcher')) {
    const themesSrc = join(scaffoldDir, 'themes.ts');
    if (existsSync(themesSrc)) {
      copyFileSync(themesSrc, join(targetDir, 'themes.ts'));
    }
  }
  if (count > 0) {
    console.log('\n  ✓ ' + count + ' Astro components + icons copied to ' + targetDir);
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

  const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : [];
  const selectedComponents = componentList.length > 0
    ? await promptComponentChoice(componentList, framework)
    : [];

  let theme, defaultDark, defaultLight;
  const wantsThemeSwitcher = selectedComponents.includes('ThemeSwitcher');
  if (wantsThemeSwitcher) {
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
  const targetDir = join(cwd, targetDirRaw);
  const cssTarget = join(targetDir, 'rizzo.min.css');
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(cssSource, cssTarget);

  copyRizzoIcons(cwd, framework);
  if (framework === 'svelte' && selectedComponents.length > 0) {
    copySvelteComponents(cwd, selectedComponents);
  } else if (framework === 'astro' && selectedComponents.length > 0) {
    copyAstroComponents(cwd, selectedComponents);
  }

  const linkHref = (options && options.targetDir) ? getLinkHrefForTargetDir(framework, options.targetDir) : paths.linkHref;
  const pm = (config && config.packageManager)
    ? getPackageManagerCommands({ agent: config.packageManager, command: config.packageManager })
    : resolvePackageManager(cwd);
  const cliExample = pm.dlx('rizzo-css theme');
  console.log('\n✓ Rizzo CSS added to your existing project');
  console.log('  - ' + cssTarget);
  console.log('\nYou must add the stylesheet link yourself — it is not added automatically.');
  if (framework === 'svelte') {
    console.log('\nIn your root layout (e.g. src/app.html), add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: ' + cliExample + ')');
    console.log('  For theme "system": default dark ' + defaultDark + ', default light ' + defaultLight);
    if (selectedComponents.length > 0) {
      console.log('  Components are in src/lib/rizzo — import from \'$lib/rizzo\'.');
    }
  } else if (framework === 'astro') {
    console.log('\nIn your layout (e.g. src/layouts/Layout.astro), add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: ' + cliExample + ')');
    console.log('  For theme "system": default dark ' + defaultDark + ', default light ' + defaultLight);
    if (selectedComponents.length > 0) {
      console.log('  Components are in src/components/rizzo — import from there.');
    }
  } else {
    console.log('\nIn your HTML or layout, add:');
    console.log('  <link rel="stylesheet" href="' + linkHref + '" />');
    console.log('\nSet a theme on <html>: data-theme="' + theme + '" (see: ' + cliExample + ')');
    console.log('  For theme "system": default dark ' + defaultDark + ', default light ' + defaultLight);
  }
  console.log('\nTo install the package (CLI + components): ' + pm.add('rizzo-css'));
  console.log('\nDocs: https://rizzo-css.vercel.app\n');
}

async function cmdInit(argv) {
  argv = argv || [];
  const yes = hasFlag(argv, '--yes');
  const runInstallAfterScaffold = hasFlag(argv, '--install');
  const noInstall = hasFlag(argv, '--no-install');
  const writeConfig = hasFlag(argv, '--write-config');
  const cwd = process.cwd();
  const config = readRizzoConfig(cwd);

  let framework;
  let initMode;
  let name = '';
  let theme, defaultDark, defaultLight;
  let selectedPm;
  let selectedTemplate;
  let selectedComponents = [];

  if (yes) {
    const frameworkArg = getFlagValue(argv, '--framework');
    framework = (frameworkArg && FRAMEWORKS.includes(frameworkArg.toLowerCase())) ? frameworkArg.toLowerCase() : (config && config.framework) || 'astro';
    initMode = 'new';
    const templateArg = getFlagValue(argv, '--template');
    const rawTemplate = (templateArg && (templateArg === 'full' || templateArg === 'minimal')) ? templateArg : (framework === 'vanilla' ? 'full' : 'minimal');
    selectedTemplate = rawTemplate;
    const projectDir = cwd;
    const resolved = resolvePackageManager(projectDir, cwd);
    selectedPm = (config && config.packageManager) || resolved.agent || 'npm';
    theme = 'system';
    defaultDark = DARK_THEMES[0];
    defaultLight = LIGHT_THEMES[0];
  } else {
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
      ],
      '? Project location'
    );
    name = projectChoice === 'name' ? await question('Project name (folder name): ') : '';

    const templateOrHandpick = await selectMenu(
      [
        { value: 'template', label: 'Use a template (Full or Minimal — ready-made scaffold)' },
        { value: 'handpick', label: 'No template — minimal base + hand-pick components' },
      ],
      '? Template or hand-pick components?'
    );

    if (templateOrHandpick === 'template') {
      selectedTemplate = await promptTemplate(framework);
      const templateHasThemeSwitcher = framework === 'vanilla' && selectedTemplate === 'full';
      if (templateHasThemeSwitcher) {
        const themeOut = await promptThemes();
        theme = themeOut.theme;
        defaultDark = themeOut.defaultDark;
        defaultLight = themeOut.defaultLight;
      } else {
        theme = 'system';
        defaultDark = DARK_THEMES[0];
        defaultLight = LIGHT_THEMES[0];
      }
    } else {
      selectedTemplate = 'handpick';
      const componentList = framework === 'svelte' ? SVELTE_COMPONENTS : framework === 'astro' ? ASTRO_COMPONENTS : [];
      selectedComponents = componentList.length > 0
        ? await promptComponentChoice(componentList, framework)
        : [];
      const wantsThemeSwitcher = selectedComponents.includes('ThemeSwitcher');
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
    }

    const projectDirForPm = name ? join(cwd, name) : cwd;
    selectedPm = await promptPackageManager(projectDirForPm);
  }

  const projectDir = name ? join(cwd, name) : cwd;
  const cssSource = getCssPath();

  if (!existsSync(cssSource)) {
    console.error('Error: Rizzo CSS build not found. Run from repo root: pnpm build:css');
    process.exit(1);
  }

  const themeComment = '\n  <!-- Initial: ' + theme + '; dark: ' + defaultDark + '; light: ' + defaultLight + ' (all 14 themes in CSS) -->';
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
  const useHandpickAstro = selectedTemplate === 'handpick' && framework === 'astro' && existsSync(astroMinimalDir);
  const useHandpickSvelte = selectedTemplate === 'handpick' && framework === 'svelte' && existsSync(svelteMinimalDir);
  const useAstroMinimal = framework === 'astro' && selectedTemplate === 'minimal' && existsSync(astroMinimalDir);
  const useSvelteMinimal = framework === 'svelte' && selectedTemplate === 'minimal' && existsSync(svelteMinimalDir);
  const useVanillaFull = framework === 'vanilla' && selectedTemplate === 'full' && existsSync(getScaffoldVanillaIndex());

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
    mkdirSync(join(projectDir, 'public', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'public', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    if (selectedComponents.length > 0) {
      copyRizzoIcons(projectDir, 'astro');
      copyAstroComponents(projectDir, selectedComponents);
    }
  } else if (useHandpickSvelte) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(svelteMinimalDir, projectDir, replacements);
    mkdirSync(join(projectDir, 'static', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
    if (selectedComponents.length > 0) {
      copyRizzoIcons(projectDir, 'svelte');
      copySvelteComponents(projectDir, selectedComponents);
    }
  } else if (useAstroMinimal) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(astroMinimalDir, projectDir, replacements);
    mkdirSync(join(projectDir, 'public', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'public', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
  } else if (useSvelteMinimal) {
    mkdirSync(projectDir, { recursive: true });
    copyDirRecursiveWithReplacements(svelteMinimalDir, projectDir, replacements);
    mkdirSync(join(projectDir, 'static', 'css'), { recursive: true });
    cssTarget = join(projectDir, 'static', 'css', 'rizzo.min.css');
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    copyPackageLicense(projectDir);
  } else if (useVanillaFull) {
    const cssDir = join(projectDir, pathsForScaffold.targetDir);
    cssTarget = join(cssDir, 'rizzo.min.css');
    const linkHref = 'css/rizzo.min.css';
    mkdirSync(cssDir, { recursive: true });
    copyFileSync(cssSource, cssTarget);
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
    const vanillaReadme = join(getPackageRoot(), 'scaffold', 'vanilla', 'README.md');
    if (existsSync(vanillaReadme)) {
      copyFileSync(vanillaReadme, join(projectDir, 'README.md'));
    }
    const vanillaJs = join(getPackageRoot(), 'scaffold', 'vanilla', 'js', 'main.js');
    if (existsSync(vanillaJs)) {
      mkdirSync(join(projectDir, 'js'), { recursive: true });
      let mainJs = readFileSync(vanillaJs, 'utf8');
      mainJs = mainJs.replace(/\{\{DEFAULT_DARK\}\}/g, defaultDark).replace(/\{\{DEFAULT_LIGHT\}\}/g, defaultLight);
      writeFileSync(join(projectDir, 'js', 'main.js'), mainJs, 'utf8');
    }
    copyPackageLicense(projectDir);
  } else {
    const cssDir = join(projectDir, pathsForScaffold.targetDir);
    cssTarget = join(cssDir, 'rizzo.min.css');
    mkdirSync(cssDir, { recursive: true });
    copyFileSync(cssSource, cssTarget);
    if (statSync(cssTarget).size < 5000) {
      console.warn('\nWarning: rizzo.min.css is very small. From repo root run: pnpm build:css');
    }
    if (framework === 'vanilla') {
      indexPath = join(projectDir, 'index.html');
      writeFileSync(indexPath, minimalHtml, 'utf8');
      writeFileSync(join(projectDir, 'README.md'), VANILLA_MINIMAL_README, 'utf8');
    } else if (framework === 'astro') {
      indexPath = join(projectDir, 'public', 'index.html');
      mkdirSync(join(projectDir, 'public'), { recursive: true });
      writeFileSync(indexPath, minimalHtml, 'utf8');
      writeFileSync(join(projectDir, 'README.md'), FALLBACK_MINIMAL_README, 'utf8');
    } else {
      indexPath = join(projectDir, 'static', 'index.html');
      mkdirSync(join(projectDir, 'static'), { recursive: true });
      writeFileSync(indexPath, minimalHtml, 'utf8');
      writeFileSync(join(projectDir, 'README.md'), FALLBACK_MINIMAL_README, 'utf8');
    }
    copyPackageLicense(projectDir);
  }

  console.log('\n✓ Project ready at ' + projectDir);
  console.log('  - ' + cssTarget);
  if (indexPath) console.log('  - ' + indexPath);
  if (framework === 'vanilla') {
    if (useVanillaFull) {
      console.log('  - Vanilla JS (full): theme switcher, js/main.js, icons, README.');
    } else {
      console.log('  - Vanilla JS (minimal): index.html + CSS link. Open index.html in a browser or add your own app.');
    }
  }
  const pm = getPackageManagerCommands({ agent: selectedPm, command: selectedPm });
  const nextStep = pm.install + ' && ' + pm.run('dev');
  const runPrefix = name ? 'cd ' + name + ' && ' : '';

  if (runInstallAfterScaffold && !noInstall && (useHandpickAstro || useHandpickSvelte || useAstroMinimal || useSvelteMinimal)) {
    console.log('\nRunning: ' + pm.install);
    const code = runInDir(projectDir, pm.install);
    if (code !== 0) {
      console.error('\nInstall failed (exit ' + code + '). Run manually: ' + runPrefix + pm.install);
    }
  }

  if (writeConfig) {
    const pathsForConfig = getFrameworkCssPaths(framework);
    writeRizzoConfig(projectDir, { targetDir: pathsForConfig.targetDir, framework, packageManager: selectedPm });
    console.log('\n  - Wrote ' + RIZZO_CONFIG_FILE);
  }

  if (useHandpickAstro || useHandpickSvelte) {
    const fw = useHandpickAstro ? 'Astro' : 'SvelteKit';
    console.log('  - Minimal ' + fw + ' base + ' + selectedComponents.length + ' hand-picked component(s). Run: ' + runPrefix + nextStep);
  }
  if (useAstroMinimal) {
    console.log('  - Minimal Astro project (config, README, LICENSE, .env.example). Run: ' + runPrefix + nextStep);
  }
  if (useSvelteMinimal) {
    console.log('  - Minimal SvelteKit project (config, README, LICENSE, .env.example). Run: ' + runPrefix + nextStep);
  }
  if (selectedTemplate === 'handpick' && framework === 'vanilla') {
    console.log('  - Vanilla minimal base (index.html + CSS, README, LICENSE). No component files for Vanilla; use BEM markup from docs.');
  }
  if ((framework === 'astro' || framework === 'svelte') && !useAstroMinimal && !useSvelteMinimal && !useHandpickAstro && !useHandpickSvelte) {
    const fw = framework === 'svelte' ? 'Svelte' : 'Astro';
    const createExample = getCreateProjectExample(pm, framework);
    console.log('\n  - Minimal template (CSS + index). To get a full app: ' + createExample + ', then cd into the project and run ' + pm.dlx('rizzo-css add') + '.');
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
