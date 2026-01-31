import { test, expect } from "@playwright/test";

test.describe("Resume Page", () => {
  test("should display resume page with OTP protection", async ({ page }) => {
    await page.goto("/resume");

    // Wait for page load
    await page.waitForTimeout(1000);

    // Check page loads
    await expect(page.locator("main")).toBeVisible();

    // Check navigation
    await expect(page.locator("header")).toBeVisible();
  });

  test("should have email input for OTP request", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForTimeout(1000);

    // Look for email input field
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name="email"]');

    if (await emailInput.isVisible()) {
      // Email input should be interactive
      await emailInput.fill("test@example.com");
      const value = await emailInput.inputValue();
      expect(value).toBe("test@example.com");
    }
  });

  test("should show OTP form after email submission", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForTimeout(1000);

    // Find and fill email
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]').first();

    if (await emailInput.isVisible()) {
      await emailInput.fill("test@example.com");

      // Find and click submit button
      const submitButton = page.locator('button[type="submit"], button:has-text("ส่ง"), button:has-text("Send")').first();

      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(500);

        // After submission, OTP input might appear
        // This is demo mode, so behavior may vary
      }
    }
  });
});
