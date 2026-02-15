/**
 * Accessibility tests using axe-core (WCAG 2 Level AA).
 * Run: pnpm test:a11y
 * Requires: pnpm build (run automatically by test:a11y script).
 * Lock theme to avoid contrast variance from system preference (CI often uses light).
 *
 * What these tests cover:
 * - Pages: All routes in DOCS_A11Y_ROUTES (homepage, getting-started, components, colors, design-system,
 *   accessibility, theming, and selected component pages: modal, theme-switcher, button, dropdown, tabs, accordion, search, settings, navbar).
 * - Rules: WCAG 2.0 Level A & AA (wcag2a, wcag2aa) and WCAG 2.1 Level A & AA (wcag21a, wcag21aa).
 *   Includes color-contrast, link-in-text-block, scrollable-region-focusable, aria-hidden-focus, labels, roles, etc.
 * - Impact: Only critical and serious violations fail the build; minor/moderate are reported but do not fail.
 * - Theme: Each page is loaded then theme is locked to github-dark-classic so contrast and results are deterministic.
 * - Not covered: Manual keyboard nav, screen reader testing, or other pages (add more test() blocks as needed).
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Lock theme to github-dark-classic so contrast and results are deterministic. */
async function lockTheme(page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'github-dark-classic');
  });
}

async function runA11yOnPage(page, path) {
  await page.goto(path);
  await lockTheme(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const criticalOrSerious = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );
  return criticalOrSerious;
}

/** All docs routes to run axe against. Expand as needed. */
const DOCS_A11Y_ROUTES = [
  '/',
  '/docs/getting-started',
  '/docs/components',
  '/docs/colors',
  '/docs/design-system',
  '/docs/accessibility',
  '/docs/theming',
  '/docs/components/modal',
  '/docs/components/theme-switcher',
  '/docs/components/button',
  '/docs/components/dropdown',
  '/docs/components/tabs',
  '/docs/components/accordion',
  '/docs/components/search',
  '/docs/components/settings',
  '/docs/components/navbar',
];

test.describe('Docs site accessibility (axe)', () => {
  for (const route of DOCS_A11Y_ROUTES) {
    const name = route || 'homepage';
    test(`${name || 'homepage'} has no critical or serious axe violations`, async ({ page }) => {
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
