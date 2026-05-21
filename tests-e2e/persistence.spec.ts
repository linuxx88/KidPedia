import { test, expect } from '@playwright/test';

test.describe('Persistance des données', () => {
  test('devrait conserver les médailles et le profil actif après un rechargement', async ({ page }) => {
    // 1. Initialisation : Création d'un profil et gain d'une médaille
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Explorateur Persistant');
    await page.getByRole('button', { name: /parti/i }).click();

    // On gagne une médaille sur le Lion pour avoir un état à sauvegarder
    await page.getByTestId('topic-card-lion').click();
    await page.getByTestId('quiz-option-1').click();
    await page.getByRole('button', { name: /fini/i }).click();

    // Vérifier qu'on a bien 1 médaille avant le reload
    await expect(page.getByTestId('medal-count')).toHaveText('1');

    // 2. Action : Rechargement de la page
    await page.reload();

    // 3. Vérification : Les données doivent être toujours là
    await expect(page.getByAltText('Explorateur Persistant')).toBeVisible();
    await expect(page.getByTestId('medal-count')).toHaveText('1');
    await expect(page.getByTestId('topic-card-lion').getByTestId('medal-badge')).toBeVisible();
  });
});
