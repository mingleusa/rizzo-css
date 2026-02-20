// @ts-check
// Playwright config for accessibility tests. Run: pnpm test:a11y (builds then runs a11y tests)
import { defineConfig, devices } from '@playwright/test';

const PREVIEW_URL = 'http://localhost:4321';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  use: {
    baseURL: PREVIEW_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'a11y',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
    {
      name: 'a11y-firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
    {
      name: 'a11y-webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
    {
      name: 'a11y-edge',
      use: { ...devices['Desktop Chrome'], channel: 'msedge' },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
    {
      name: 'a11y-mobile-chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
    {
      name: 'a11y-mobile-safari',
      use: { ...devices['iPhone 12'] },
      testMatch: /a11y\/.*\.spec\.m?js/,
    },
  ],
  webServer: {
    command: 'pnpm preview',
    url: PREVIEW_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
