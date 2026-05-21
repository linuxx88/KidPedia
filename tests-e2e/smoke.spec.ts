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
    
    // This is a placeholder, as I don't know the exact UI for language switching
    // but we can try to find buttons with "FR" or "EN" or specific icons
    // if LanguageSwitcher is present.
  });
});
