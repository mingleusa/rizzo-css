// @ts-check
// Playwright config for accessibility tests. Run: pnpm test:a11y (builds then runs a11y tests)
import { defineConfig, devices } from '@playwright/test';

const PREVIEW_URL = 'http://localhost:4321';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 4, // parallel tests; faster locally and in CI
  timeout: isCI ? 60_000 : 30_000,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  use: {
    baseURL: PREVIEW_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: isCI ? 15_000 : 10_000,
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
    reuseExistingServer: !isCI,
    timeout: isCI ? 180_000 : 120_000,
    stdout: isCI ? 'pipe' : 'ignore',
    stderr: 'inherit',
  },
});
