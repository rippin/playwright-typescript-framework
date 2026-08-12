import { resolve } from 'node:path';

import { defineConfig, devices } from '@playwright/test';

import { environment } from './src/config/environment.js';

const isContinuousIntegration = Boolean(process.env.CI);
const authenticationState = resolve('playwright/.auth/saucedemo.json');
const uiTests = /ui\/.*\.spec\.ts/;
const accessibilityTests = /ui\/.*\.a11y\.spec\.ts/;
const visualTests = /ui\/.*\.visual\.spec\.ts/;
const specializedUiTests = [accessibilityTests, visualTests];

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  updateSnapshots: 'none',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: isContinuousIntegration,
  retries: isContinuousIntegration ? 1 : 0,
  failOnFlakyTests: isContinuousIntegration,
  ...(isContinuousIntegration ? { workers: 1 } : {}),
  reporter: isContinuousIntegration
    ? [
        ['line'],
        ['junit', { outputFile: 'test-results/junit/results.xml' }],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ]
    : [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}',
  use: {
    baseURL: environment.SAUCE_BASE_URL,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'en-US',
    timezoneId: 'UTC',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /setup\/.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testMatch: uiTests,
      testIgnore: specializedUiTests,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authenticationState,
      },
    },
    {
      name: 'firefox',
      testMatch: uiTests,
      testIgnore: specializedUiTests,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: authenticationState,
      },
    },
    {
      name: 'webkit',
      testMatch: uiTests,
      testIgnore: specializedUiTests,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: authenticationState,
      },
    },
    {
      name: 'mobile-chrome',
      testMatch: uiTests,
      testIgnore: specializedUiTests,
      grep: /@smoke/,
      dependencies: ['setup'],
      use: {
        ...devices['Pixel 7'],
        storageState: authenticationState,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: '**/*.spec.ts',
      use: {
        baseURL: environment.BOOKER_BASE_URL,
      },
    },
    {
      name: 'a11y',
      testMatch: accessibilityTests,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authenticationState,
      },
    },
    {
      name: 'visual',
      testMatch: visualTests,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authenticationState,
        colorScheme: 'light',
      },
    },
  ],
});
