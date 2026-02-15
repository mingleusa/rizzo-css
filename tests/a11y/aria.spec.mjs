/**
 * ARIA and role checks for screen reader–related markup.
 * Run: pnpm test:a11y
 * These assertions verify the markup that screen readers rely on (roles, labels, expanded state).
 * They do not run a real screen reader; for that, use manual testing per ACCESSIBILITY_TESTING.md.
 */
import { test, expect } from '@playwright/test';

async function lockTheme(page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'github-dark-classic');
  });
}

test.describe('ARIA and roles (modal)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/modal');
    await lockTheme(page);
  });

  test('modal has role="dialog", aria-modal="true", and aria-labelledby', async ({ page }) => {
    await page.getByRole('button', { name: /open small modal/i }).first().click();
    await page.waitForTimeout(200);
    const dialog = page.locator('.modal[role="dialog"]').first();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby');
  });
});

test.describe('ARIA and roles (dropdown)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/dropdown');
    await lockTheme(page);
  });

  test('dropdown trigger has aria-haspopup and aria-expanded', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^actions$/i }).first();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    await trigger.click();
    await page.waitForTimeout(150);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('dropdown menu has role="menu", items have role="menuitem"', async ({ page }) => {
    await page.getByRole('button', { name: /^actions$/i }).first().click();
    await page.waitForTimeout(150);
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();
    const item = menu.locator('[role="menuitem"]').first();
    await expect(item).toBeVisible();
  });
});

test.describe('ARIA and roles (tabs)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/tabs');
    await lockTheme(page);
  });

  test('tab list and tabs have correct roles and aria-selected', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]').first();
    await expect(tablist).toBeVisible();
    const tabs = page.locator('[role="tab"]');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.first()).toHaveAttribute('aria-controls');
  });
});

test.describe('ARIA and roles (accordion)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/accordion');
    await lockTheme(page);
  });

  test('accordion headers have aria-expanded and aria-controls', async ({ page }) => {
    const trigger = page.locator('[aria-expanded]').first();
    await expect(trigger).toHaveAttribute('aria-controls');
    const expanded = await trigger.getAttribute('aria-expanded');
    expect(expanded === 'true' || expanded === 'false').toBe(true);
  });
});

test.describe('ARIA and roles (theme switcher)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/theme-switcher');
    await lockTheme(page);
  });

  test('theme switcher has accessible trigger and options', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Select theme' }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(200);
    const menu = page.locator('.theme-switcher__menu--open').first();
    await expect(menu).toBeVisible({ timeout: 3000 });
    const option = menu.locator('[role="menuitemradio"]').first();
    await expect(option).toBeVisible();
  });
});
