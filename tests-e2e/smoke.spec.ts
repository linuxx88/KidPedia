import { test, expect } from '@playwright/test';

test.describe('KidPedia Smoke Tests', () => {
  test('should load the home page and show the main title', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Check if the page title or a key element is present
    // Based on App.test.tsx, "Le Lion" should be there
    await expect(page.getByText('Le Lion')).toBeVisible({ timeout: 10000 });
  });

  test('should allow language switching', async ({ page }) => {
    await page.goto('/');
    const title = page.getByTestId('main-title');
    await title.waitFor({ state: 'visible', timeout: 15000 });

    // Switch to English
    await page.getByRole('button').filter({ hasText: 'English' }).click();
    await expect(title).toContainText('Explorer');
  });
});
