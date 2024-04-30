import { defineConfig, devices } from '@playwright/test';
import { CurrentsConfig, currentsReporter } from "@currents/playwright";

const currentsConfig: CurrentsConfig = {
  // ciBuildId: "Currents-build-id-" + new Date().toISOString(), // 📖 https://currents.dev/readme/guides/ci-build-id
  recordKey: "at8wVLNeQZgqyPI3", // 📖 https://currents.dev/readme/guides/record-key
  projectId: "g1Iwpe", // get one at https://app.currents.dev
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'],['blob'],['github'],['list'], currentsReporter(currentsConfig)],
  use: {
    trace: 'on-first-retry',
    video:'retain-on-failure',
    screenshot:'on'
  },
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
