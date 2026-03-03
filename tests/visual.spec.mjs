/**
 * Visual regression tests: screenshot key routes for layout/theme consistency.
 * Run: pnpm test:visual (builds site, starts preview, runs visual project)
 * Update baselines: pnpm test:visual:update (then commit snapshot files).
 *
 * Screenshot options use maxDiffPixelRatio so small font/subpixel differences
 * between CI (Linux) and local (e.g. macOS/Windows) do not fail the build.
 */
import { test, expect } from '@playwright/test';

const VIEWPORT = { width: 1280, height: 720 };

/** Allow up to 2% pixel difference for cross-environment font/subpixel variance (CI vs local). */
const SCREENSHOT_OPTS = { fullPage: false, maxDiffPixelRatio: 0.02 };

test.describe('Visual: key routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // Lock theme so screenshots are consistent across runs and CI
    await page.addInitScript(() => {
      document.documentElement.setAttribute('data-theme', 'github-dark-classic');
    });
  });

  test('homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('homepage.png', SCREENSHOT_OPTS);
  });

  test('docs getting-started', async ({ page }) => {
    await page.goto('/docs/getting-started', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('docs-getting-started.png', SCREENSHOT_OPTS);
  });

  test('docs components overview', async ({ page }) => {
    await page.goto('/docs/components', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('docs-components.png', SCREENSHOT_OPTS);
  });

  test('component page (button)', async ({ page }) => {
    await page.goto('/docs/components/button', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('component-button.png', SCREENSHOT_OPTS);
  });

  test('blocks landing-hero', async ({ page }) => {
    await page.goto('/blocks/landing-hero', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('blocks-landing-hero.png', SCREENSHOT_OPTS);
  });

  test('themes index', async ({ page }) => {
    await page.goto('/themes', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('themes-index.png', SCREENSHOT_OPTS);
  });
});
