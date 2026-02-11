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

const COMPONENT_SLUGS = [
  'navbar', 'settings', 'theme-switcher', 'button', 'badge', 'accordion', 'breadcrumb', 'pagination',
  'progress-bar', 'spinner', 'avatar', 'divider', 'table', 'icons', 'copy-to-clipboard', 'forms',
  'cards', 'modal', 'alert', 'toast', 'search', 'tooltip', 'dropdown', 'tabs',
];

const COMPONENT_TITLES = {
  'copy-to-clipboard': 'Copy to Clipboard',
  'progress-bar': 'Progress Bar',
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

  // Update root index: add "Component showcase" link (local) and keep one "Get started" to docs site.
  const rootMainContent = `<span class="badge badge--primary badge--sm mb-4">Vanilla JS + Rizzo CSS</span>
    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; line-height: 1.1; margin: 0 0 var(--spacing-4) 0; color: var(--text);">Build something great</h1>
    <p style="font-size: var(--font-size-xl); color: var(--text-dim); max-width: 42ch; margin: 0 0 var(--spacing-8) 0; line-height: var(--line-height-relaxed);">Same design system as Astro and Svelte — 14 themes, 24 components, full keyboard and screen reader support.</p>
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <a href="components/index.html" class="btn btn-primary">Component showcase</a>
      <a href="${DOCS_BASE}/docs/getting-started" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Get started (docs)</a>
      <button type="button" class="btn btn-outline" onclick="window.showToast && window.showToast('Hello from Rizzo!', { variant: 'success' });">Show toast</button>
    </div>
    <div class="flex flex-wrap justify-center gap-3 mb-16">
      <span class="badge badge--info">14 themes</span>
      <span class="badge badge--info">24 components</span>
      <span class="badge badge--info">WCAG AA</span>
    </div>
    <footer style="margin-top: auto; padding-top: var(--spacing-8); color: var(--text-dim); font-size: var(--font-size-sm);">
      <a href="${DOCS_BASE}" style="color: var(--accent);">Rizzo CSS</a> — design system for the web. <a href="${DOCS_BASE}/docs" target="_blank" rel="noopener noreferrer">Full docs</a>.
    </footer>`;
  writeFileSync(indexPath, beforeMain + '\n  <main id="main-content" class="flex flex-col items-center justify-center text-center min-h-screen" style="padding: var(--spacing-12) var(--spacing-4); min-height: calc(100vh - 4rem);">\n    ' + rootMainContent + '\n  </main>\n' + afterMain);

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
