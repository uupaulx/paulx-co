import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E Test Configuration
 * For PaulX Portfolio Website
 *
 * Uses production URL by default, local dev server for CI
 */
const isCI = !!process.env.CI;
const baseURL = process.env.TEST_URL || "https://paulx-co.vercel.app";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
  // Uncomment to use local dev server
  // webServer: isCI ? {
  //   command: "npm run dev",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: false,
  //   timeout: 120 * 1000,
  // } : undefined,
});
