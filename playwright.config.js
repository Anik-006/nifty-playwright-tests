import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5004', // matches your server
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: {
    //command: 'npm run dev',       // your dev server start command
    url: 'http://localhost:5004', // wait until this URL is reachable
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,          // wait up to 2 min for server
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
