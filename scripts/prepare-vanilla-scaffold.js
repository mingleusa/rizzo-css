/**
 * Prepares the Vanilla scaffold with a component showcase (components/index.html + per-component pages).
 * Run from repo root: node scripts/prepare-vanilla-scaffold.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '..');
const scaffoldVanilla = join(rootDir, 'packages', 'rizzo-css', 'scaffold', 'vanilla');
const DOCS_BASE = 'https://rizzo-css.vercel.app';

/** Alphabetical; matches site vanilla component pages and VANILLA_COMPONENT_SLUGS. */
const COMPONENT_SLUGS = [
  'accordion', 'alert', 'avatar', 'badge', 'breadcrumb', 'button', 'cards',
  'copy-to-clipboard', 'docs-sidebar', 'divider', 'dropdown', 'footer', 'font-switcher',
  'forms', 'icons', 'modal', 'navbar', 'pagination', 'progress-bar', 'search',
  'settings', 'sound-effects', 'spinner', 'table', 'tabs', 'theme-switcher', 'toast', 'tooltip',
];

const COMPONENT_TITLES = {
  'copy-to-clipboard': 'Copy to Clipboard',
  'docs-sidebar': 'Docs Sidebar',
  'font-switcher': 'Font Switcher',
  'progress-bar': 'Progress Bar',
  'sound-effects': 'Sound Effects',
  'theme-switcher': 'Theme Switcher',
};

function titleCase(slug) {
  return COMPONENT_TITLES[slug] || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function main() {
  const indexPath = join(scaffoldVanilla, 'index.html');
  if (!existsSync(indexPath)) {
    console.warn('prepare-vanilla-scaffold: index.html not found, skipping');
    return;
  }
  const full = readFileSync(indexPath, 'utf8');

  // Split: head+header+settings (up to and including </div> of settings), then main (id="main-content" ... </main>), then script+body close.
  const mainStart = full.indexOf('<main id="main-content"');
  const mainEnd = full.indexOf('</main>', mainStart) + 7;
  if (mainStart === -1 || mainEnd < 7) {
    console.warn('prepare-vanilla-scaffold: could not find <main> in index.html, skipping');
    return;
  }
  const beforeMain = full.slice(0, mainStart);
  const afterMain = full.slice(mainEnd);

  // Landing: hero + features + documentation cards (full home page for package distributions).
  const rootMainContent = `
    <div class="home__container">
      <header class="home__hero">
        <h1 class="home__title">Rizzo CSS</h1>
        <p class="home__subtitle">A modern CSS design system with semantic theming, accessibility-first components, and one CLI for Vanilla, Astro, and Svelte. Start here then make it your own.</p>
        <div class="home__hero-ctas">
          <a href="${DOCS_BASE}/docs/getting-started" class="btn btn-primary home__hero-cta" target="_blank" rel="noopener noreferrer">Get Started</a>
          <a href="${DOCS_BASE}/docs/components" class="btn btn-outline home__hero-cta" target="_blank" rel="noopener noreferrer">View Components</a>
        </div>
      </header>
      <section class="home__features" aria-labelledby="home-features-heading">
        <h2 id="home-features-heading" class="home__section-title">Features</h2>
        <p class="home__features-intro">A complete design system that works across Vanilla, Astro, and Svelte — same CSS, same components, zero lock-in.</p>
        <div class="home__features-featured">
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">Themes</span>
            <h3>14 beautiful themes</h3>
            <p>7 dark and 7 light with OKLCH for perceptual uniformity. System preference, persistence, and a unique icon per theme.</p>
          </div>
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">A11y</span>
            <h3>Accessibility first</h3>
            <p>WCAG AA compliant with full keyboard navigation, ARIA, focus management, and screen reader support.</p>
          </div>
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">Components</span>
            <h3>31 ready components</h3>
            <p>Navbar, Settings, Theme Switcher, Font Switcher, Modal, Dropdown, Tabs, Forms, and more — all accessible and themeable.</p>
          </div>
        </div>
        <h3 class="home__features-supporting-label">And more</h3>
        <div class="home__grid home__grid--supporting">
          <div class="home__card home__card--supporting">
            <h3>Semantic variables</h3>
            <p>CSS variables that adapt to themes. No hardcoded colors; override once, update everywhere.</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>PostCSS powered</h3>
            <p>Imports, autoprefixing, and production minification. Fits into any build pipeline.</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>Typography & spacing</h3>
            <p>Scaling font sizes, weights, line heights, and a consistent spacing scale (0–24).</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>Responsive & utilities</h3>
            <p>Mobile-first breakpoints and utility classes for layout, display, and flexbox.</p>
          </div>
        </div>
      </section>
      <section class="home__add-command" aria-labelledby="home-add-command-heading">
        <h2 id="home-add-command-heading" class="home__section-title">Add a component</h2>
        <p class="home__features-intro" style="margin-bottom: var(--spacing-4);">Add any component from the CLI:</p>
        <div class="home__add-command-block">
          <pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
          <span class="tooltip-host" data-tooltip="Copy command">
            <button type="button" class="copy-to-clipboard copy-to-clipboard--icon-only home__add-command-copy" data-copy-value="npx rizzo-css add &lt;ComponentName&gt;" data-copy-format="command" data-copy-icon-only="true" data-copy-button-label="Copy" aria-label="Copy command">
              <span class="copy-to-clipboard__text">Copy</span>
              <span class="copy-to-clipboard__icon copy-to-clipboard__icon--copy" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg></span>
              <span class="copy-to-clipboard__icon copy-to-clipboard__icon--check" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
              <span class="copy-to-clipboard__feedback" aria-live="polite"></span>
            </button>
          </span>
        </div>
      </section>
      <section class="home__docs">
        <h2 class="home__section-title">Documentation</h2>
        <div class="home__docs-grid">
          <a href="${DOCS_BASE}/docs/getting-started" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Getting Started</h3>
            <p>Installation, project structure, and quick start guide</p>
          </a>
          <a href="${DOCS_BASE}/docs/components" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Components</h3>
            <p>Component library with usage examples and live demos</p>
          </a>
          <a href="${DOCS_BASE}/docs/theming" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Theming</h3>
            <p>Theme system, custom themes, and color format guide</p>
          </a>
          <a href="${DOCS_BASE}/docs/design-system" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Design System</h3>
            <p>Semantic variables, typography, and design principles</p>
          </a>
          <a href="${DOCS_BASE}/docs/accessibility" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Accessibility</h3>
            <p>Accessibility guidelines, utilities, and best practices</p>
          </a>
          <a href="${DOCS_BASE}/docs/colors" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Colors</h3>
            <p>Interactive color reference with multiple format options</p>
          </a>
        </div>
      </section>
    </div>`;
  writeFileSync(indexPath, beforeMain + '\n  <main id="main-content" class="home">' + rootMainContent + '\n  </main>\n' + afterMain);

  const componentsDir = join(scaffoldVanilla, 'components');
  mkdirSync(componentsDir, { recursive: true });

  const listItems = COMPONENT_SLUGS.map(
    (slug) => `      <li style="margin-bottom: var(--spacing-2);"><a href="${slug}.html" style="color: var(--accent);">${titleCase(slug)}</a></li>`
  ).join('\n');

  const componentsIndexMain = `<h1 style="font-size: var(--font-size-3xl); margin: 0 0 var(--spacing-6) 0; color: var(--text);">Component showcase</h1>
    <p style="color: var(--text-dim); margin-bottom: var(--spacing-6);">Each page links to the full docs on the main site.</p>
    <ul style="text-align: left; max-width: 24rem; margin: 0 auto; padding-left: var(--spacing-6);">
${listItems}
    </ul>
    <p style="margin-top: var(--spacing-8);"><a href="../index.html" class="btn btn-outline">← Home</a></p>`;

  const componentsIndexHtml = beforeMain.replace('href="{{LINK_HREF}}"', 'href="../{{LINK_HREF}}"') +
    '\n  <main id="main-content" class="flex flex-col items-center justify-center text-center min-h-screen" style="padding: var(--spacing-12) var(--spacing-4); min-height: calc(100vh - 4rem);">\n    ' +
    componentsIndexMain +
    '\n  </main>\n' +
    afterMain.replace('src="js/main.js"', 'src="../js/main.js"');

  writeFileSync(join(componentsDir, 'index.html'), componentsIndexHtml);

  for (const slug of COMPONENT_SLUGS) {
    const title = titleCase(slug);
    const docUrl = `${DOCS_BASE}/docs/components/${slug}`;
    const mainContent = `<h1 style="font-size: var(--font-size-3xl); margin: 0 0 var(--spacing-4) 0; color: var(--text);">${title}</h1>
    <p style="color: var(--text-dim); margin-bottom: var(--spacing-4);">Read the full docs for this component on the main site:</p>
    <p><a href="${docUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${docUrl}</a></p>
    <p style="margin-top: var(--spacing-8);"><a href="index.html" class="btn btn-outline">← Component list</a> <a href="../index.html" class="btn btn-outline">Home</a></p>`;
    const pageHtml = beforeMain.replace('href="{{LINK_HREF}}"', 'href="../{{LINK_HREF}}"') +
      '\n  <main id="main-content" class="flex flex-col items-center justify-center text-center min-h-screen" style="padding: var(--spacing-12) var(--spacing-4); min-height: calc(100vh - 4rem);">\n    ' +
      mainContent +
      '\n  </main>\n' +
      afterMain.replace('src="js/main.js"', 'src="../js/main.js"');
    writeFileSync(join(componentsDir, slug + '.html'), pageHtml);
  }

  console.log('prepare-vanilla-scaffold: added components/index.html and', COMPONENT_SLUGS.length, 'component pages.');
}

main();
