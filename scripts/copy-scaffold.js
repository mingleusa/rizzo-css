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
  'CopyToClipboard', 'Divider', 'Dropdown', 'Footer', 'FontSwitcher', 'FormGroup', 'Input', 'Modal', 'Navbar', 'Pagination',
  'ProgressBar', 'Radio', 'Search', 'Select', 'Settings', 'SoundEffects', 'Spinner', 'Table', 'Tabs', 'Textarea', 'ThemeIcon', 'ThemeSwitcher', 'Toast', 'Tooltip',
];

/** Minimal Astro scaffold content for components that depend on docs config in src. Same BEM structure, no docs deps. */
const ASTRO_SCAFFOLD_MINIMAL = {
  Navbar: `---
import Cat from './icons/Cat.astro';
import Gear from './icons/Gear.astro';
import Search from './Search.astro';
interface Props { siteName?: string; logo?: string; }
const { siteName = 'Site', logo } = Astro.props;
---
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">
        {logo ? (
          <img src={logo} alt="" class="navbar__logo" />
        ) : (
          <Cat width={32} height={32} class="navbar__logo" aria-hidden="true" />
        )}
        {siteName}
      </a>
    </div>
    <div class="navbar__actions-desktop">
      <Search id="search-navbar" />
      <button type="button" class="navbar__settings-btn" aria-label="Open settings" onclick="window.openSettings && window.openSettings()">
        <Gear class="navbar__settings-icon" width={20} height={20} />
        <span class="navbar__settings-label">Settings</span>
      </button>
    </div>
    <button type="button" class="navbar__toggle" id="navbar-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navbar-menu">
      <span class="sr-only">Menu</span>
      <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <div class="navbar__menu" id="navbar-menu" role="menu" aria-hidden="true">
      <a href="/" class="navbar__link">Home</a>
    </div>
  </div>
</nav>

<script>
  (function initNavbarMobile() {
    function init() {
      var navbar = document.querySelector('.navbar');
      if (!navbar) return;
      var toggle = document.getElementById('navbar-toggle');
      var menu = navbar.querySelector('.navbar__menu');
      if (!toggle || !menu) return;
      var outsideClickHandler = null;
      function setMenuOpen(open) {
        menu.classList.toggle('navbar__menu--open', open);
        navbar.classList.toggle('navbar--menu-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menu.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (outsideClickHandler) {
          document.removeEventListener('click', outsideClickHandler);
          outsideClickHandler = null;
        }
        if (open) {
          outsideClickHandler = function (e) {
            if (e.target && !navbar.contains(e.target)) setMenuOpen(false);
          };
          setTimeout(function () { document.addEventListener('click', outsideClickHandler); }, 0);
        }
      }
      toggle.addEventListener('click', function () {
        setMenuOpen(!menu.classList.contains('navbar__menu--open'));
      });
      menu.querySelectorAll('.navbar__link').forEach(function (link) {
        link.addEventListener('click', function () { setMenuOpen(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('navbar__menu--open')) setMenuOpen(false);
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
</script>
`,
  Search: `---
import SearchIcon from './icons/Search.astro';
import Close from './icons/Close.astro';
import Cmd from './icons/Cmd.astro';
interface Props { id?: string; }
const { id = 'search-main' } = Astro.props;
---
<div class="search" data-search>
  <div class="search__trigger-wrapper">
    <button type="button" class="search__trigger" aria-label="Open search" aria-expanded="false" aria-controls="{id}-panel" data-search-trigger>
      <SearchIcon width={20} height={20} class="search__icon" />
      <span class="search__trigger-text">Search</span>
      <kbd class="search__kbd" aria-hidden="true">
        <span class="search__kbd-modifier"><Cmd width={14} height={14} /></span>
        <kbd>K</kbd>
      </kbd>
    </button>
  </div>
  <div class="search__overlay" id="{id}-panel" aria-hidden="true" role="dialog" aria-modal="true" data-search-overlay>
    <div class="search__panel" role="dialog" aria-modal="true" aria-labelledby="{id}-title" aria-hidden="true" tabindex="-1">
      <h2 id="{id}-title" class="sr-only">Search</h2>
      <div class="search__header">
        <div class="search__input-wrapper">
          <SearchIcon width={20} height={20} class="search__input-icon" aria-hidden="true" />
          <input type="search" class="search__input" placeholder="Search…" aria-label="Search" />
        </div>
        <button type="button" class="search__close-btn" aria-label="Close search" data-search-close>
          <Close width={20} height={20} aria-hidden="true" />
        </button>
      </div>
      <div class="search__results" role="listbox" aria-label="Search results">
        <div class="search__empty">
          <p class="search__empty-text">Start typing to search…</p>
        </div>
        <div class="search__results-list" role="group" aria-label="Sample results">
          <a href="#" class="search__result-item" tabindex="-1" data-search-result-item><div class="search__result-category">Docs</div><div class="search__result-title">Getting started</div></a>
          <a href="#" class="search__result-item" tabindex="-1" data-search-result-item><div class="search__result-category">Docs</div><div class="search__result-title">Components</div></a>
          <a href="#" class="search__result-item" tabindex="-1" data-search-result-item><div class="search__result-category">Docs</div><div class="search__result-title">Theming</div></a>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  (function initSearch() {
    var focusableSel = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    function getFocusable(container) {
      return Array.prototype.slice.call(container.querySelectorAll(focusableSel));
    }
    function init() {
      document.querySelectorAll('[data-search]').forEach(function (search) {
        if (search.__searchInited) return;
        search.__searchInited = true;
        var trigger = search.querySelector('.search__trigger');
        var overlay = search.querySelector('[data-search-overlay]');
        var panel = search.querySelector('.search__panel');
        var input = search.querySelector('.search__input');
        var closeBtn = search.querySelector('[data-search-close]');
        var resultItems = search.querySelectorAll('.search__result-item, [data-search-result-item]');
        if (!trigger || !overlay || !panel || !input) return;
        var previousActive = null;
        var focusTrapHandler = null;
        function openSearch() {
          previousActive = document.activeElement;
          overlay.setAttribute('aria-hidden', 'false');
          panel.setAttribute('aria-hidden', 'false');
          panel.setAttribute('data-open', 'true');
          trigger.setAttribute('aria-expanded', 'true');
          for (var i = 0; i < resultItems.length; i++) resultItems[i].setAttribute('tabindex', '0');
          input.focus();
          focusTrapHandler = function (e) {
            if (panel.getAttribute('data-open') !== 'true') return;
            if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
            if (e.key === 'Tab') {
              var els = getFocusable(panel);
              if (els.length === 0) return;
              var first = els[0], last = els[els.length - 1], active = document.activeElement;
              if (e.shiftKey) {
                if (active === first || !panel.contains(active)) { e.preventDefault(); last.focus(); }
              } else {
                if (active === last || !panel.contains(active)) { e.preventDefault(); first.focus(); }
              }
            }
          };
          document.addEventListener('keydown', focusTrapHandler);
        }
        function closeSearch() {
          document.removeEventListener('keydown', focusTrapHandler);
          focusTrapHandler = null;
          panel.removeAttribute('data-open');
          panel.setAttribute('aria-hidden', 'true');
          overlay.setAttribute('aria-hidden', 'true');
          trigger.setAttribute('aria-expanded', 'false');
          for (var i = 0; i < resultItems.length; i++) resultItems[i].setAttribute('tabindex', '-1');
          if (previousActive && previousActive.focus) previousActive.focus();
          previousActive = null;
        }
        trigger.addEventListener('click', function () {
          if (panel.getAttribute('data-open') === 'true') closeSearch();
          else openSearch();
        });
        if (closeBtn) closeBtn.addEventListener('click', closeSearch);
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) closeSearch();
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
        });
        search.__searchOpen = openSearch;
        search.__searchClose = closeSearch;
      });
      if (!window.__rizzoSearchCmdK) {
        window.__rizzoSearchCmdK = true;
        document.addEventListener('keydown', function (e) {
          var isMod = e.ctrlKey || e.metaKey;
          var isK = e.key === 'k' || e.key === 'K';
          if (!isMod || !isK) return;
          var searchEl = document.querySelector('[data-search]');
          if (!searchEl || !searchEl.__searchOpen) return;
          var panelEl = searchEl.querySelector('.search__panel');
          if (!panelEl) return;
          var target = e.target;
          var inOtherInput = target && !searchEl.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable === true || (target.closest && target.closest('input, textarea, [contenteditable="true"]')));
          var isOpen = panelEl.getAttribute('data-open') === 'true';
          if (isOpen || !inOtherInput) {
            e.preventDefault();
            e.stopPropagation();
            if (isOpen) searchEl.__searchClose(); else searchEl.__searchOpen();
          }
        }, true);
      }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
</script>
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
  const scaffoldConfigDir = join(scaffoldDir, 'config');
  if (existsSync(join(configDir, 'fonts.ts'))) {
    mkdirSync(scaffoldConfigDir, { recursive: true });
    copyFileSync(join(configDir, 'fonts.ts'), join(scaffoldConfigDir, 'fonts.ts'));
  }
  // ThemeSwitcher.astro imports from '../utils/theme' — add scaffold/utils/theme.ts so package build resolves
  const utilsDir = join(scaffoldDir, 'utils');
  const themeSrc = join(rootDir, 'src', 'utils', 'theme.ts');
  if (existsSync(themeSrc)) {
    mkdirSync(utilsDir, { recursive: true });
    let themeContent = readFileSync(themeSrc, 'utf8');
    themeContent = themeContent.replace(/from '\.\.\/config\/themes'|from "\.\.\/config\/themes"/g, "from '../astro/themes'");
    writeFileSync(join(utilsDir, 'theme.ts'), themeContent);
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
