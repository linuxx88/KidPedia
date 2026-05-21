import { test, expect } from '@playwright/test';

test.describe('Thèmes et Styles', () => {
  test('devrait permettre de changer de thème et de style (genre)', async ({ page }) => {
    // 1. Initialisation
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('StarBoy');
    const boyOption = page.getByText('👦 Garçon');
    await expect(boyOption).toBeVisible();
    await boyOption.click();
    
    const startButton = page.getByRole('button', { name: /parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // 2. Tester le Mode Sombre
    const themeBtn = page.getByTestId('header-theme-btn');
    await expect(themeBtn).toBeVisible();
    await expect(themeBtn).toContainText('🌙');
    await themeBtn.click();
    await expect(themeBtn).toContainText('☀️');
    
    // 3. Tester le changement de genre
    const genderBtn = page.getByTestId('header-gender-btn');
    await expect(genderBtn).toBeVisible();
    await expect(genderBtn).toContainText('👦');
    await genderBtn.click();
    await expect(genderBtn).toContainText('👧');
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-gender', 'girl');
    
    await genderBtn.click();
    await expect(html).toHaveAttribute('data-gender', 'boy');
  });
});
