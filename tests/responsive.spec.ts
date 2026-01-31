import { test, expect } from "@playwright/test";

test.describe("Responsive Design - Desktop", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("should show desktop navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Desktop nav should be visible
    const desktopNav = page.locator("header");
    await expect(desktopNav).toBeVisible({ timeout: 10000 });

    // Logo should be visible in header
    await expect(page.locator("header").getByRole("link", { name: "PaulX" })).toBeVisible({ timeout: 10000 });
  });

  test("should display hero section properly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Hero section should have proper layout
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Responsive Design - Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("should adapt layout for tablet", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Page should load properly
    await expect(page.locator("main")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("header")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Responsive Design - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should show mobile layout", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Page should be visible
    await expect(page.locator("main")).toBeVisible({ timeout: 10000 });

    // Mobile menu button should exist in header
    const mobileMenuBtn = page.locator("header button").last();
    await expect(mobileMenuBtn).toBeVisible({ timeout: 10000 });
  });

  test("should display blog page on mobile", async ({ page }) => {
    // Skip in CI due to blog SSR cold start issues
    test.skip(!!process.env.CI, "Skipped in CI due to Vercel cold start delays");

    await page.goto("/blog", { timeout: 30000 });
    await page.waitForLoadState("load");

    await expect(page.locator("main")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 20000 });
  });

  test("should display resume page on mobile", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("main")).toBeVisible({ timeout: 10000 });
  });
});
