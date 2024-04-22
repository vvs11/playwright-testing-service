import { test, expect } from '@playwright/test';

// This sample simulates a larger test suite
var tags=['@smoke', '@sanity', '@issue'];

const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || "100");
for (var i = 0; i < TEST_ITERATIONS; i++) {
  var tagid= i % 3;
  test('has title ' + i+ tags[tagid], async ({ page }) => {
    const skip= Math.random();
    if (skip > 0.9)
     {
       test.skip();
     }
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link ' + i+ tags[tagid], async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
    
    const randomResult = Math.random();
    expect(randomResult).toBeGreaterThan(0.2);
  });
}
