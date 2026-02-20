// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:5004', // points to your frontend server
    headless: true,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // Only reuse the server started manually in CI
  webServer: process.env.CI
  ? {
      command: 'npm run dev',
      url: 'http://localhost:5004',
      timeout: 120_000,
      reuseExistingServer: false,
    }
  : {
      command: 'npm run dev',
      url: 'http://localhost:5004',
      reuseExistingServer: true,
    },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Fail the build on CI if test.only is left in source */
  forbidOnly: !!process.env.CI,

  /* Reporter */
  reporter: [['list'], ['html']],
});
