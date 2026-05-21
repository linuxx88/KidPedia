import { test, expect } from '@playwright/test';

test.describe('Gestion des Profils', () => {
  test('devrait permettre de créer un premier profil et d\'accéder à l\'accueil', async ({ page }) => {
    await page.goto('/');

    const nameInput = page.getByTestId('profile-name-input');
    await expect(nameInput).toBeVisible();

    const testName = 'Léo';
    await nameInput.fill(testName);

    const boyStyle = page.getByText('👦 Garçon');
    await boyStyle.click();

    const startButton = page.getByRole('button', { name: /C'est parti/ });
    await startButton.click();

    const profileAvatar = page.getByAltText(testName);
    await expect(profileAvatar).toBeVisible();
    await expect(page.getByText('👦')).toBeVisible();
  });
});
