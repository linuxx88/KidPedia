import { test, expect } from '@playwright/test';

test.describe('Mission Safari', () => {
  test('devrait permettre de jouer un tour de Safari', async ({ page }) => {
    // 1. Initialisation : Création d'un profil et accès au Safari
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Aventurier');
    const startButton = page.getByRole('button', { name: /parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // 2. Accéder à Mission Safari via le Hub
    const safariLink = page.getByText('Mission Safari');
    await expect(safariLink).toBeVisible();
    await safariLink.click();

    // 3. Vérifier le message de bienvenue
    const message = page.getByTestId('safari-message');
    await expect(message).toContainText(/(Bienvenue|Nouvelle aventure)/);

    // 4. Lancer le dé
    const rollButton = page.getByTestId('roll-dice-button');
    await expect(rollButton).toBeVisible();
    
    const initialMessage = await message.innerText();
    await rollButton.click();

    // 5. Vérifier que le jeu a réagi
    await expect(async () => {
      const currentMessage = await message.innerText();
      expect(currentMessage).not.toBe(initialMessage);
    }).toPass({ timeout: 10000 });

    // 6. Vérifier la navigation retour
    const backButton = page.getByRole('button', { name: /Retour/i });
    await expect(backButton).toBeVisible();
    await backButton.click();
    await expect(page.getByAltText(/Aventurier/i)).toBeVisible();
  });
});
