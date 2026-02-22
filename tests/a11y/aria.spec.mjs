/**
 * ARIA and role checks for screen reader–related markup.
 * Run: pnpm test:a11y
 * These assertions verify the markup that screen readers rely on (roles, labels, expanded state).
 * They do not run a real screen reader; for that, use manual testing per docs/ACCESSIBILITY.md#manual-accessibility-testing.
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

test.describe('ARIA and roles (font switcher)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/font-switcher');
    await lockTheme(page);
  });

  test('font switcher has accessible trigger and menuitemradio options', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Select font pair' }).first();
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    await trigger.click();
    await page.waitForTimeout(200);
    const menu = page.locator('.font-switcher__menu--open').first();
    await expect(menu).toBeVisible({ timeout: 3000 });
    const option = menu.locator('[role="menuitemradio"]').first();
    await expect(option).toBeVisible();
  });
});

test.describe('ARIA and roles (footer)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/footer');
    await lockTheme(page);
  });

  test('footer has contentinfo landmark', async ({ page }) => {
    const contentinfo = page.getByRole('contentinfo').first();
    await expect(contentinfo).toBeVisible();
  });
});

test.describe('ARIA and roles (settings)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/settings');
    await lockTheme(page);
  });

  test('settings panel has role="dialog", aria-modal="true", and aria-labelledby', async ({ page }) => {
    await page.getByRole('button', { name: /open settings/i }).first().click();
    await page.waitForTimeout(300);
    const panel = page.locator('.settings__panel').first();
    await expect(panel).toHaveAttribute('role', 'dialog');
    await expect(panel).toHaveAttribute('aria-modal', 'true');
    await expect(panel).toHaveAttribute('aria-labelledby', 'settings-title');
  });
});

test.describe('ARIA and roles (search)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/search');
    await lockTheme(page);
  });

  test('search panel has role="dialog", aria-modal, and aria-labelledby', async ({ page }) => {
    const main = page.getByRole('main');
    const trigger = main.getByRole('button', { name: /open search|search/i }).first();
    await trigger.click();
    const panel = page.locator('.search__panel[role="dialog"][aria-hidden="false"]').first();
    await expect(panel).toBeVisible({ timeout: 5000 });
    await expect(panel).toHaveAttribute('aria-modal', 'true');
    await expect(panel).toHaveAttribute('aria-labelledby');
  });
});

test.describe('ARIA and roles (back to top)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/back-to-top');
    await lockTheme(page);
  });

  test('back to top button has accessible label', async ({ page }) => {
    // Back to Top only becomes visible after scrolling past threshold (default 400px)
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(150);
    const main = page.getByRole('main');
    const btn = main.getByRole('button', { name: /back to top/i }).first();
    await expect(btn).toBeVisible();
  });
});

test.describe('ARIA and roles (tooltip)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/tooltip');
    await lockTheme(page);
  });

  test('tooltip trigger has aria-describedby and tooltip has role="tooltip" with matching id', async ({ page }) => {
    const wrapper = page.locator('.tooltip-wrapper').first();
    await expect(wrapper).toHaveAttribute('aria-describedby');
    const describedBy = await wrapper.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const tooltip = page.locator(`#${describedBy}[role="tooltip"]`);
    await expect(tooltip).toHaveCount(1);
  });
});

test.describe('ARIA and roles (alert dialog)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/alert-dialog');
    await lockTheme(page);
  });

  test('alert dialog has role="alertdialog", aria-modal="true", and aria-labelledby when open', async ({ page }) => {
    await page.getByRole('button', { name: /open alert dialog/i }).first().click();
    await page.waitForTimeout(200);
    const dialog = page.locator('[role="alertdialog"]').first();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby');
  });
});

test.describe('ARIA and roles (sheet)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/sheet');
    await lockTheme(page);
  });

  test('sheet has role="dialog", aria-modal="true", and aria-labelledby when open', async ({ page }) => {
    await page.getByRole('button', { name: /open sheet/i }).first().click();
    await page.waitForTimeout(200);
    const dialog = page.locator('.sheet[role="dialog"]').first();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-labelledby');
  });
});
