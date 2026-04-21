import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Root directory for tests
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail build on test failures in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests — 2 times in CI, 0 locally
  retries: process.env.CI ? 2 : 0,

  // Parallel workers — 4 in CI, 2 locally
  workers: process.env.CI ? 4 : 2,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list'],
  ],

  // Global test settings
  use: {
    // Base URL — update to your app URL
    baseURL: process.env.BASE_URL || 'https://your-insurance-app.com',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Capture video on failure
    video: 'retain-on-failure',

    // Capture trace on first retry
    trace: 'on-first-retry',

    // Browser viewport
    viewport: { width: 1280, height: 720 },

    // Navigation timeout
    navigationTimeout: 30000,

    // Action timeout
    actionTimeout: 15000,
  },

  // Multi-browser configuration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
