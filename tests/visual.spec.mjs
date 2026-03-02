/**
 * Visual regression tests: screenshot key routes for layout/theme consistency.
 * Run: pnpm test:visual (builds site, starts preview, runs visual project)
 * First run creates baselines in tests/visual-baselines/; subsequent runs compare.
 * Update baselines: pnpm exec playwright test --project=visual --update-snapshots
 */
import { test, expect } from '@playwright/test';

const VIEWPORT = { width: 1280, height: 720 };

test.describe('Visual: key routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    // Reduce motion for deterministic screenshots
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('homepage.png', { fullPage: false });
  });

  test('docs getting-started', async ({ page }) => {
    await page.goto('/docs/getting-started', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('docs-getting-started.png', { fullPage: false });
  });

  test('docs components overview', async ({ page }) => {
    await page.goto('/docs/components', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('docs-components.png', { fullPage: false });
  });

  test('component page (button)', async ({ page }) => {
    await page.goto('/docs/components/button', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('component-button.png', { fullPage: false });
  });

  test('blocks landing-hero', async ({ page }) => {
    await page.goto('/blocks/landing-hero', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('blocks-landing-hero.png', { fullPage: false });
  });

  test('themes index', async ({ page }) => {
    await page.goto('/themes', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('themes-index.png', { fullPage: false });
  });
});
