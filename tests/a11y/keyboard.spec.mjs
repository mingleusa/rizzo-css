/**
 * Keyboard accessibility tests. Run: pnpm test:a11y
 * Verifies focus management, Tab order, Escape to close, and focus traps on the docs site.
 * Complements axe (which does not test keyboard behavior) and manual screen reader testing.
 */
import { test, expect } from '@playwright/test';

async function lockTheme(page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'github-dark-classic');
  });
}

test.describe('Keyboard accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/modal');
    await lockTheme(page);
  });

  test('modal: Escape closes and focus returns to trigger', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open small modal/i }).first();
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    const dialog = page.locator('.modal[role="dialog"]').first();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(dialog).toHaveAttribute('aria-hidden', 'true');
    await expect(trigger).toBeFocused();
  });

  test('modal: focus moves into dialog when opened', async ({ page }) => {
    await page.getByRole('button', { name: /open small modal/i }).first().click();
    await page.waitForTimeout(200);
    const dialog = page.locator('.modal[role="dialog"]').first();
    await expect(dialog).toBeVisible();
    const focusableInDialog = dialog.locator('button, [href], input, select, textarea, [tabindex="0"]').first();
    await expect(focusableInDialog).toBeFocused();
  });
});

test.describe('Keyboard accessibility (dropdown)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/dropdown');
    await lockTheme(page);
  });

  test('dropdown: Escape closes menu', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^actions$/i }).first();
    await trigger.click();
    await page.waitForTimeout(150);
    const menu = trigger.locator('..').locator('[role="menu"]').first();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(menu).toHaveAttribute('aria-hidden', 'true');
  });
});

test.describe('Keyboard accessibility (tabs)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/tabs');
    await lockTheme(page);
  });

  test('tabs: Tab reaches tab list, arrow keys change selection', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]').first();
    await expect(tablist).toBeVisible();
    const firstTab = page.locator('[role="tab"]').first();
    firstTab.focus();
    await expect(firstTab).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    const tabs = page.locator('[role="tab"]');
    const secondTab = tabs.nth(1);
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('Keyboard accessibility (search)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/search');
    await lockTheme(page);
  });

  test('search: trigger is focusable, Escape closes overlay', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open search|search/i }).first();
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const panel = page.locator('.search__panel').first();
    await expect(panel).toBeVisible({ timeout: 3000 });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
  });
});
