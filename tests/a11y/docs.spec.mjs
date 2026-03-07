/**
 * Accessibility tests using axe-core (WCAG 2 Level AA).
 * Run: pnpm test:a11y
 * Requires: pnpm build (run automatically by test:a11y script).
 * Lock theme to avoid contrast variance from system preference (CI often uses light).
 *
 * Coverage: entire main site — homepage, all docs (getting-started, foundations, components overview),
 * every component page (Astro, Vanilla, Svelte, React, Vue), and all theme preview pages.
 * Rules: WCAG 2.0/2.1 Level A & AA. Only critical/serious violations fail the build.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Lock theme so contrast and results are deterministic. */
async function lockTheme(page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'github-dark-classic');
  });
  // Allow computed styles to update after theme change (avoids color-contrast false negatives)
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function runA11yOnPage(page, path) {
  await page.goto(path, { waitUntil: process.env.CI ? 'load' : 'domcontentloaded' });
  await lockTheme(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const criticalOrSerious = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );
  return criticalOrSerious;
}

// —— Route lists (keep in sync with src/pages and docs nav) ——

const FOUNDATION_ROUTES = [
  '/',
  '/docs/overview',
  '/docs/showcase',
  '/docs/getting-started',
  '/docs/components',
  '/docs/design-system',
  '/docs/theming',
  '/docs/accessibility',
  '/docs/best-practices',
  '/docs/colors',
];

const COMPONENT_SLUGS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'back-to-top', 'badge', 'breadcrumb',
  'button', 'button-group', 'cards', 'calendar', 'carousel', 'chart', 'collapsible', 'command', 'context-menu', 'copy-to-clipboard', 'dashboard', 'direction',
  'docs-sidebar', 'divider', 'dropdown', 'empty', 'footer', 'font-switcher', 'forms', 'hover-card',
  'icons', 'input-group', 'input-otp', 'kbd', 'label', 'menubar', 'modal', 'navbar', 'pagination', 'popover', 'progress-bar',
  'range-calendar', 'resizable', 'scroll-area', 'search', 'separator', 'settings', 'sheet', 'skeleton', 'slider', 'sound-effects',
  'spinner', 'switch', 'table', 'tabs', 'theme-switcher', 'toast', 'toggle', 'toggle-group', 'tooltip',
];

/** Block pages (pre-built layouts). See src/pages/blocks/ and Navbar Blocks item. */
const BLOCK_ROUTES = [
  '/blocks',
  '/blocks/landing-hero',
  '/blocks/pricing',
  '/blocks/dashboard-01',
  '/blocks/docs-layout',
  '/blocks/login',
  '/blocks/signup',
];

const THEME_SLUGS = [
  'github-dark-classic', 'shades-of-purple', 'sandstorm-classic', 'rocky-blood-orange',
  'minimal-dark-neon-yellow', 'hack-the-box', 'pink-cat-boo',
  'github-light', 'red-velvet-cupcake', 'orangy-one-light', 'sunflower',
  'green-breeze-light', 'cute-pink', 'semi-light-purple',
];

const DOCS_A11Y_ROUTES = [
  ...FOUNDATION_ROUTES,
  ...COMPONENT_SLUGS.map((s) => `/docs/components/${s}`),
  ...BLOCK_ROUTES,
  '/docs/vanilla',
  '/docs/vanilla/components',
  ...COMPONENT_SLUGS.map((s) => `/docs/vanilla/components/${s}`),
  '/docs/svelte',
  '/docs/svelte/components',
  ...COMPONENT_SLUGS.map((s) => `/docs/svelte/components/${s}`),
  '/docs/react',
  '/docs/react/components',
  ...COMPONENT_SLUGS.map((s) => `/docs/react/components/${s}`),
  '/docs/vue',
  '/docs/vue/components',
  ...COMPONENT_SLUGS.map((s) => `/docs/vue/components/${s}`),
  ...THEME_SLUGS.map((s) => `/docs/themes/${s}`),
];

/** Fast subset for local quick feedback (A11Y_FAST=1). Foundation + blocks + one route per framework + sample components + themes sample. */
const FAST_A11Y_ROUTES = [
  ...FOUNDATION_ROUTES,
  ...BLOCK_ROUTES,
  '/docs/vanilla',
  '/docs/vanilla/components',
  '/docs/svelte',
  '/docs/svelte/components',
  '/docs/react',
  '/docs/react/components',
  '/docs/vue',
  '/docs/vue/components',
  '/docs/components/button',
  '/docs/vanilla/components/button',
  '/docs/svelte/components/button',
  '/docs/react/components/button',
  '/docs/vue/components/button',
  '/docs/themes/github-dark-classic',
  '/docs/themes/github-light',
];

const ROUTES_TO_RUN = process.env.A11Y_FAST ? FAST_A11Y_ROUTES : DOCS_A11Y_ROUTES;

test.describe('Docs site accessibility (axe)', () => {
  test.setTimeout(process.env.CI ? 55_000 : 60_000); // axe.analyze(); slightly lower in CI to fail faster
  for (const route of ROUTES_TO_RUN) {
    const name = route || 'homepage';
    test(`${name} has no critical or serious axe violations`, async ({ page }, testInfo) => {
      // Skip on WebKit: axe is very slow and often hits the 90s timeout in CI (browser closed).
      // Full axe coverage runs on Chromium and Firefox; WebKit still runs keyboard + ARIA specs.
      test.skip(testInfo.project.name === 'a11y-webkit', 'Skip axe on WebKit (slow in CI)');
      const criticalOrSerious = await runA11yOnPage(page, route || '/');
      expect(criticalOrSerious, formatViolations(criticalOrSerious)).toEqual([]);
    });
  }
});

function formatViolations(violations) {
  if (violations.length === 0) return '';
  return violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes.length} node(s). ${v.helpUrl}`
    )
    .join('\n');
}
