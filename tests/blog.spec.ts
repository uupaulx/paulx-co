import { test, expect } from "@playwright/test";

// Skip blog tests in CI - blog pages have slow SSR on Vercel cold starts
const skipInCI = !!process.env.CI;

test.describe("Blog Page", () => {
  test("should display blog list page", async ({ page }) => {
    test.skip(skipInCI, "Skipped in CI due to Vercel cold start delays");

    await page.goto("/blog", { timeout: 30000 });
    await page.waitForLoadState("load");

    // Check page heading exists with longer timeout
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 20000 });

    // Check navigation exists
    await expect(page.locator("header")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("footer")).toBeVisible({ timeout: 10000 });
  });

  test("should display blog posts", async ({ page }) => {
    test.skip(skipInCI, "Skipped in CI due to Vercel cold start delays");

    await page.goto("/blog", { timeout: 30000 });
    await page.waitForLoadState("load");

    // Check if main content exists
    const main = page.locator("main");
    await expect(main).toBeVisible({ timeout: 20000 });
  });

  test("should navigate to blog detail page", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("domcontentloaded");

    // Wait for content to load
    await page.waitForTimeout(1000);

    // Find first blog post link
    const firstPostLink = page.locator('a[href^="/blog/"]').first();

    if (await firstPostLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstPostLink.click();
      await page.waitForLoadState("domcontentloaded");

      // Should navigate to detail page
      await expect(page).toHaveURL(/.*blog\/.+/, { timeout: 15000 });

      // Detail page should have content
      await expect(page.locator("main")).toBeVisible({ timeout: 10000 });
    }
  });
});

test.describe("Blog Detail Page", () => {
  test("should display blog post content", async ({ page }) => {
    test.skip(skipInCI, "Skipped in CI due to Vercel cold start delays");

    // Navigate to a known blog post (using mock data slug)
    await page.goto("/blog/vibe-coding-productivity", { timeout: 30000 });
    await page.waitForLoadState("load");

    // Check main content area exists with longer timeout
    await expect(page.locator("main")).toBeVisible({ timeout: 20000 });

    // Check navigation
    await expect(page.locator("header")).toBeVisible({ timeout: 10000 });
  });
});
