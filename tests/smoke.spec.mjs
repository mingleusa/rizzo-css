/**
 * Smoke tests: key routes return 200 and main content is present.
 * Run: pnpm test:smoke (builds site, starts preview, runs smoke tests)
 * Or against deployed site: BASE_URL=https://rizzo-css.vercel.app pnpm test:smoke
 * Uses baseURL from Playwright config (default http://localhost:4321).
 */
import { test, expect } from '@playwright/test';

test.describe('Smoke: key routes', () => {
  test('homepage loads', async ({ page }) => {
    const res = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('docs getting-started loads', async ({ page }) => {
    const res = await page.goto('/docs/getting-started', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('docs components overview loads', async ({ page }) => {
    const res = await page.goto('/docs/components', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('blocks index loads', async ({ page }) => {
    const res = await page.goto('/blocks', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('blocks landing-hero loads', async ({ page }) => {
    const res = await page.goto('/blocks/landing-hero', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Landing hero' })).toBeVisible();
  });

  test('component page (button) loads', async ({ page }) => {
    const res = await page.goto('/docs/components/button', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('themes index loads', async ({ page }) => {
    const res = await page.goto('/themes', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
});
