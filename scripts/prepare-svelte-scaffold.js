/**
 * Prepares the Svelte scaffold with component showcase (layout + /components, /components/[slug] using SvelteDocPage).
 * Copies svelte components and docs into the scaffold, fixes imports, adds routes.
 * Run from repo root: node scripts/prepare-svelte-scaffold.js
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '..');
const scaffoldSvelte = join(rootDir, 'packages', 'rizzo-css', 'scaffold', 'svelte-app');
const srcDir = join(rootDir, 'src');
const svelteSrc = join(srcDir, 'components', 'svelte');
const docsSrc = join(svelteSrc, 'docs');

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

function rewriteSvelteImports(content, fromDocsPages = false) {
  if (fromDocsPages) {
    content = content.replace(/from '\.\.\/\.\.\//g, "from '$lib/rizzo/");
    content = content.replace(/from '\.\.\/CodeBlock\.svelte'/g, "from '$lib/rizzo-docs/CodeBlock.svelte'");
    content = content.replace(/href: '\/docs\/svelte\/components\//g, "href: '/components/");
  } else {
    content = content.replace(/from '\.\.\/icons\//g, "from '$lib/rizzo/icons/");
    content = content.replace(/from '\.\.\/devicons\//g, "from '$lib/rizzo/icons/devicons/");
  }
  return content;
}

function copyDocsWithRewrites(srcPath, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  let content = readFileSync(srcPath, 'utf8');
  const fromPages = srcPath.includes('/docs/pages/');
  content = rewriteSvelteImports(content, fromPages);
  writeFileSync(destPath, content);
}

function copyDirRecursiveWithRewrites(src, dest, baseSrc = src) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = join(src, e.name);
    const destPath = join(dest, e.name);
    if (e.isDirectory()) {
      copyDirRecursiveWithRewrites(srcPath, destPath, baseSrc);
    } else if (e.name.endsWith('.svelte')) {
      copyDocsWithRewrites(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  if (!existsSync(svelteSrc) || !existsSync(docsSrc)) {
    console.warn('prepare-svelte-scaffold: src/components/svelte or docs not found, skipping');
    return;
  }

  const libDir = join(scaffoldSvelte, 'src', 'lib');
  const rizzoDir = join(libDir, 'rizzo');
  const rizzoDocsDir = join(libDir, 'rizzo-docs');

  copyDirRecursive(svelteSrc, rizzoDir, ['docs']);
  copyDirRecursiveWithRewrites(docsSrc, rizzoDocsDir);

  const routesDir = join(scaffoldSvelte, 'src', 'routes');
  mkdirSync(join(routesDir, 'components'), { recursive: true });
  mkdirSync(join(routesDir, 'components', '[slug]'), { recursive: true });

  const componentsIndexPage = `<script lang="ts">
  import SvelteDocPage from '$lib/rizzo-docs/SvelteDocPage.svelte';
</script>
<SvelteDocPage slug="components" />
`;

  const componentsSlugPage = `<script lang="ts">
  import SvelteDocPage from '$lib/rizzo-docs/SvelteDocPage.svelte';
  import { page } from '$app/stores';

  const slug = $derived($page.params.slug ? 'components/' + $page.params.slug : 'components');
</script>
<SvelteDocPage slug={slug} />
`;

  writeFileSync(join(routesDir, 'components', '+page.svelte'), componentsIndexPage);
  writeFileSync(join(routesDir, 'components', '[slug]', '+page.svelte'), componentsSlugPage);

  const homePath = join(routesDir, '+page.svelte');
  let homeContent = readFileSync(homePath, 'utf8');
  if (!homeContent.includes('href="/components"')) {
    homeContent = homeContent.replace(
      '<a href="https://rizzo-css.vercel.app/docs/getting-started" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Get started</a>\n    <a href="https://rizzo-css.vercel.app/docs/components" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Components</a>',
      '<a href="/components" class="btn btn-primary">Component showcase</a>\n    <a href="https://rizzo-css.vercel.app/docs/getting-started" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Get started (docs)</a>'
    );
    writeFileSync(homePath, homeContent);
  }

  console.log('prepare-svelte-scaffold: added lib/rizzo, lib/rizzo-docs, routes /components and /components/[slug].');
}

main();
