/**
 * Prepares the Astro scaffold with layout chrome (Navbar, Settings) and component showcase.
 * Copies components, config, DocsLayout, and all component doc pages from the main site.
 * Run from repo root: node scripts/prepare-astro-scaffold.js
 *
 * Scaffold works in any browser; docs live on the main site (link from scaffold).
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '..');
const scaffoldAstro = join(rootDir, 'packages', 'rizzo-css', 'scaffold', 'astro-app');
const srcDir = join(rootDir, 'src');

const DOCS_BASE = 'https://rizzo-css.vercel.app';

/** Copy directory recursively; optional excludeDir names to skip (e.g. 'svelte'). */
function copyDirRecursive(src, dest, excludeDirs = []) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory() && excludeDirs.includes(e.name)) continue;
    const srcPath = join(src, e.name);
    const destPath = join(dest, e.name);
    if (e.isDirectory()) {
      copyDirRecursive(srcPath, destPath, excludeDirs);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/** Scaffold DocsLayout: same as main but no FrameworkSwitcher; add "Read the docs" link. */
function writeScaffoldDocsLayout() {
  const mainLayout = readFileSync(join(srcDir, 'layouts', 'DocsLayout.astro'), 'utf8');
  let scaffoldLayout = mainLayout
    .replace(/import FrameworkSwitcher from '\.\.\/components\/FrameworkSwitcher\.astro';\n\n/, '')
    .replace(/const currentPath = Astro\.url\.pathname;\n/, '')
    .replace(/\s*<FrameworkSwitcher currentPath={currentPath} \/>\n/, '')
    .replace(
      '{description && <p class="docs__description">{description}</p>}',
      `{description && <p class="docs__description">{description}</p>}
				<p class="docs__read-docs">
					<a href="${DOCS_BASE}/docs" target="_blank" rel="noopener noreferrer">Read the full docs</a> (getting started, theming, API) on the main site.
				</p>
			`
    );
  // Add style for docs__read-docs before closing </style>
  scaffoldLayout = scaffoldLayout.replace(
    '</style>',
    `	.docs__read-docs {
		margin-top: 1rem;
		font-size: var(--font-size-sm);
		color: var(--text-dim);
	}
</style>`
  );
  mkdirSync(join(scaffoldAstro, 'src', 'layouts'), { recursive: true });
  writeFileSync(join(scaffoldAstro, 'src', 'layouts', 'DocsLayout.astro'), scaffoldLayout);
}

/** Scaffold frameworks.ts: single framework (Astro), pathPrefix '', no switcher. All docs/themes links are internal. */
function writeScaffoldConfig() {
  mkdirSync(join(scaffoldAstro, 'src', 'config'), { recursive: true });
  copyFileSync(join(srcDir, 'config', 'themes.ts'), join(scaffoldAstro, 'src', 'config', 'themes.ts'));
  const frameworksContent = `/** Scaffold: single framework (Astro); no framework switcher. All links internal. */
export const FRAMEWORK_STORAGE_KEY = 'rizzo-docs-framework';

export interface Framework {
  id: string;
  label: string;
  pathPrefix: string;
}

export const FRAMEWORKS: Framework[] = [
  { id: 'astro', label: 'Astro', pathPrefix: '' },
];

export function getFrameworkFromPath(pathname: string): {
  framework: Framework;
  canonicalPath: string;
} {
  return {
    framework: FRAMEWORKS[0],
    canonicalPath: pathname,
  };
}

export function shouldShowFrameworkSwitcher(_pathname: string): boolean {
  return false;
}
`;
  writeFileSync(join(scaffoldAstro, 'src', 'config', 'frameworks.ts'), frameworksContent);
}

/** Ensure Navbar uses only internal links (docs + themes). Strip DOCS_BASE if previously patched. */
function patchScaffoldNavbar() {
  const navbarPath = join(scaffoldAstro, 'src', 'components', 'Navbar.astro');
  let content = readFileSync(navbarPath, 'utf8');
  // Remove DOCS_BASE usage so all links are local
  if (content.includes('DOCS_BASE')) {
    content = content.replace(
      "import { getFrameworkFromPath, DOCS_BASE } from '../config/frameworks.js';",
      "import { getFrameworkFromPath } from '../config/frameworks.js';"
    );
    content = content.replace(/\nconst docsBase = DOCS_BASE \?\? '';\n/, '\n');
  }
  for (const slug of ['getting-started', 'design-system', 'accessibility', 'colors']) {
    content = content.replace(new RegExp("href: docsBase \\+ '/docs/" + slug + "'", 'g'), "href: '/docs/" + slug + "'");
  }
  content = content.replace(/href: docsBase \+ '\/docs\/theming'/g, "href: '/docs/theming'");
  content = content.replace(/href: docsBase \+ `\/docs\/themes\/\$\{t\.value\}`/g, 'href: `/docs/themes/${t.value}`');
  writeFileSync(navbarPath, content);
}

/** Update scaffold Layout to include Navbar and Settings (same chrome as main site). */
function updateScaffoldLayout() {
  const layoutPath = join(scaffoldAstro, 'src', 'layouts', 'Layout.astro');
  let content = readFileSync(layoutPath, 'utf8');
  // Insert imports after first ---
  if (!content.includes('import Navbar')) {
    content = content.replace(
      '---\ninterface Props',
      `---
import Navbar from '../components/Navbar.astro';
import Settings from '../components/Settings.astro';
interface Props`
    );
  }
  // Insert body chrome: skip-link, Navbar, Settings, main, container, slot
  if (!content.includes('<Navbar')) {
    content = content.replace(
      '<body>\n    <slot />',
      `<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <Navbar />
    <Settings />
    <main id="main-content">
      <div class="layout__container">
        <slot />
      </div>
    </main>`
    );
  }
  writeFileSync(layoutPath, content);
}

/** Copy components (excluding svelte/) and config into scaffold. */
function copyComponentsAndConfig() {
  const srcComponents = join(srcDir, 'components');
  const destComponents = join(scaffoldAstro, 'src', 'components');
  copyDirRecursive(srcComponents, destComponents, ['svelte']);
  writeScaffoldConfig();
}

/** Write scaffold index with link to local /components and to docs site. */
function writeScaffoldIndex() {
  const content = `---
import Layout from '../layouts/Layout.astro';
const TITLE = '{{TITLE}}';
---
<Layout title={TITLE}>
  <div class="flex flex-col items-center justify-center text-center" style="padding: var(--spacing-12) var(--spacing-4); min-height: calc(100vh - 4rem);">
    <span class="badge badge--primary badge--sm mb-4">Astro + Rizzo CSS</span>
    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; line-height: 1.1; margin: 0 0 var(--spacing-4) 0; color: var(--text);">Build something great</h1>
    <p style="font-size: var(--font-size-xl); color: var(--text-dim); max-width: 42ch; margin: 0 0 var(--spacing-8) 0; line-height: var(--line-height-relaxed);">Same design system as Vanilla JS and Svelte — 14 themes, 24 components, full keyboard and screen reader support.</p>
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <a href="/components" class="btn btn-primary">Component showcase</a>
      <a href="${DOCS_BASE}/docs/getting-started" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Get started (docs)</a>
      <button type="button" class="btn btn-outline" onclick="window.showToast && window.showToast('Hello from Rizzo!', { variant: 'success' })">Show toast</button>
    </div>
    <div class="flex flex-wrap justify-center gap-3 mb-16">
      <span class="badge badge--info">14 themes</span>
      <span class="badge badge--info">24 components</span>
      <span class="badge badge--info">WCAG AA</span>
    </div>
    <footer style="margin-top: auto; padding-top: var(--spacing-8); color: var(--text-dim); font-size: var(--font-size-sm);">
      <a href="${DOCS_BASE}" style="color: var(--accent);">Rizzo CSS</a> — design system for the web. <a href="${DOCS_BASE}/docs" target="_blank" rel="noopener noreferrer">Full docs</a>.
    </footer>
  </div>
</Layout>
`;
  writeFileSync(join(scaffoldAstro, 'src', 'pages', 'index.astro'), content);
}

/** Stub docs pages: each uses DocsLayout and links to the full doc on the main site. */
function writeScaffoldDocsPages() {
  const docsPages = [
    { slug: 'getting-started', title: 'Getting Started', description: 'Install, add CSS, and set a theme.' },
    { slug: 'design-system', title: 'Design System', description: 'Design tokens, BEM, and structure.' },
    { slug: 'accessibility', title: 'Accessibility', description: 'Keyboard, ARIA, and screen reader support.' },
    { slug: 'colors', title: 'Colors', description: 'Semantic color variables and themes.' },
  ];
  const docsDir = join(scaffoldAstro, 'src', 'pages', 'docs');
  mkdirSync(docsDir, { recursive: true });
  // Index: /docs (pages/docs/index.astro -> ../../layouts)
  const indexContent = `---
import DocsLayout from '../../layouts/DocsLayout.astro';
---
<DocsLayout title="Documentation" description="Overview and links to the full docs on the main site.">
  <section>
    <p>Full documentation lives on the main site. Use the links below or the nav.</p>
    <ul>
      <li><a href="${DOCS_BASE}/docs/getting-started" target="_blank" rel="noopener noreferrer">Getting Started</a></li>
      <li><a href="${DOCS_BASE}/docs/design-system" target="_blank" rel="noopener noreferrer">Design System</a></li>
      <li><a href="${DOCS_BASE}/docs/accessibility" target="_blank" rel="noopener noreferrer">Accessibility</a></li>
      <li><a href="${DOCS_BASE}/docs/colors" target="_blank" rel="noopener noreferrer">Colors</a></li>
      <li><a href="${DOCS_BASE}/docs/theming" target="_blank" rel="noopener noreferrer">Theming</a></li>
    </ul>
  </section>
</DocsLayout>
`;
  writeFileSync(join(docsDir, 'index.astro'), indexContent);
  for (const doc of docsPages) {
    const url = `${DOCS_BASE}/docs/${doc.slug}`;
    const pageContent = `---
import DocsLayout from '../../layouts/DocsLayout.astro';
---
<DocsLayout title="${doc.title}" description="${doc.description}">
  <section>
    <p>Read the full doc on the main site:</p>
    <p><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>
  </section>
</DocsLayout>
`;
    writeFileSync(join(docsDir, doc.slug + '.astro'), pageContent);
  }
}

/** Theming + theme showcase pages (internal links). */
function writeScaffoldThemingPages() {
  const docsDir = join(scaffoldAstro, 'src', 'pages', 'docs');
  const themingUrl = `${DOCS_BASE}/docs/theming`;
  const themingContent = `---
import DocsLayout from '../../layouts/DocsLayout.astro';
---
<DocsLayout title="Theming" description="Theme overview and how to set data-theme.">
  <section>
    <p>Full theming docs and theme showcase on the main site:</p>
    <p><a href="${themingUrl}" target="_blank" rel="noopener noreferrer">${themingUrl}</a></p>
    <p>Use the nav to open individual theme pages below, or the Settings panel to switch themes.</p>
  </section>
</DocsLayout>
`;
  writeFileSync(join(docsDir, 'theming.astro'), themingContent);
  mkdirSync(join(docsDir, 'themes'), { recursive: true });
  const themePageContent = `---
import DocsLayout from '../../../layouts/DocsLayout.astro';

const { theme } = Astro.params;
const mainSiteUrl = '${DOCS_BASE}/docs/themes/' + theme;
const themeId = theme || 'unknown';
---
<DocsLayout title={\`Theme: \${themeId}\`} description="Theme preview and link to main site.">
  <section>
    <p>Full theme showcase on the main site:</p>
    <p><a href={mainSiteUrl} target="_blank" rel="noopener noreferrer">{mainSiteUrl}</a></p>
    <p>Set this theme with <code>data-theme="{themeId}"</code> on <code>&lt;html&gt;</code> or use the Settings panel.</p>
  </section>
</DocsLayout>
`;
  writeFileSync(join(docsDir, 'themes', '[theme].astro'), themePageContent);
}

/** Copy components.astro: /docs/components/ -> /components/, fix imports (pages/docs/ -> pages/ = one less ../), simplify framework paragraph. */
function copyComponentsIndex() {
  let content = readFileSync(join(srcDir, 'pages', 'docs', 'components.astro'), 'utf8');
  content = content.replace(/from '\.\.\/\.\.\/layouts\//g, "from '../layouts/").replace(/from '\.\.\/\.\.\/components\//g, "from '../components/");
  content = content.replace(/\/docs\/components\//g, '/components/');
  content = content.replace(
    /<p><strong>Documentation for every framework:<\/strong> Each component has an <strong>Astro<\/strong> page below \(live demos \+ usage\), a <strong>Svelte<\/strong> page at <a href="\/docs\/svelte\/components">\/docs\/svelte\/components<\/a>, and <strong>Vanilla<\/strong> at <a href="\/docs\/vanilla\/components">\/docs\/vanilla\/components<\/a> with copyable HTML and interactive examples\. Use the framework switcher to toggle\.<\/p>/,
    `<p>Full documentation (getting started, theming, API) is on the main site: <a href="${DOCS_BASE}/docs" target="_blank" rel="noopener noreferrer">${DOCS_BASE}/docs</a>.</p>`
  );
  mkdirSync(join(scaffoldAstro, 'src', 'pages'), { recursive: true });
  writeFileSync(join(scaffoldAstro, 'src', 'pages', 'components.astro'), content);
}

/** Copy one component doc page: fix imports and add "Read the docs" link. */
function copyComponentPage(filename) {
  const slug = filename.replace(/\.astro$/, '');
  const srcPath = join(srcDir, 'pages', 'docs', 'components', filename);
  const destPath = join(scaffoldAstro, 'src', 'pages', 'components', filename);
  if (!existsSync(srcPath)) return;
  let content = readFileSync(srcPath, 'utf8');
  // Fix imports: ../../../ -> ../../ (from pages/docs/components/ to pages/components/)
  content = content.replace(/from '\.\.\/\.\.\/\.\.\//g, "from '../../");
  // Fix usage example imports: ../components/ -> ../../components/
  content = content.replace(/from '\.\.\/components\//g, "from '../../components/");
  // Add "Read the docs" link after <DocsLayout ...>
  const docUrl = `${DOCS_BASE}/docs/components/${slug}`;
  const readDocsHtml = `\n\t<p class="docs__read-docs">Read the full docs for this component at <a href="${docUrl}" target="_blank" rel="noopener noreferrer">${docUrl}</a>.</p>\n\t`;
  content = content.replace(/(<DocsLayout[^>]*>)\n/, `$1\n\t${readDocsHtml}\n\t`);
  mkdirSync(join(scaffoldAstro, 'src', 'pages', 'components'), { recursive: true });
  writeFileSync(destPath, content);
}

function main() {
  console.log('Preparing Astro scaffold (chrome + component showcase)...');
  copyComponentsAndConfig();
  patchScaffoldNavbar();
  writeScaffoldDocsLayout();
  updateScaffoldLayout();
  writeScaffoldIndex();
  writeScaffoldDocsPages();
  writeScaffoldThemingPages();
  copyComponentsIndex();
  const componentFiles = readdirSync(join(srcDir, 'pages', 'docs', 'components')).filter((f) => f.endsWith('.astro'));
  for (const f of componentFiles) {
    copyComponentPage(f);
  }
  console.log('Done. Astro scaffold has Navbar, Settings, and', componentFiles.length, 'component pages.');
}

main();
