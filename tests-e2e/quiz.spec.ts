import { test, expect } from '@playwright/test';

test.describe('Système de Quiz et Médailles', () => {
  test('devrait permettre de gagner une médaille d\'or après un quiz réussi', async ({ page }) => {
    // 1. Initialisation (Nouveau profil pour partir de 0 médaille)
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Champion');
    const startButton = page.getByRole('button', { name: /parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // S'assurer que l'overlay de sélection est bien parti avant de continuer
    await expect(page.getByTestId('profile-name-input')).toBeHidden();

    // 2. Vérifier qu'on a 0 médaille au départ
    const medalCount = page.getByTestId('medal-count');
    await expect(medalCount).toHaveText('0');

    // 3. Ouvrir le sujet "Le Lion"
    const lionCard = page.getByTestId('topic-card-lion');
    await expect(lionCard).toBeVisible();
    await lionCard.click();

    // 4. Vérifier que le quiz est visible
    const question = page.getByTestId('quiz-question');
    await expect(question).toBeVisible();


    // 5. Répondre au quiz (Le Lion)
    const correctOption = page.getByTestId('quiz-option-1');
    await expect(correctOption).toBeVisible();
    await correctOption.click();

    // 6. Vérifier la victoire (Médaille d'Or)
    await expect(page.getByText(/gagné une médaille d'OR/i)).toBeVisible();

    // 7. Retourner à l'accueil
    const finishButton = page.getByRole('button', { name: /fini/i });
    await expect(finishButton).toBeVisible();
    await finishButton.click();

    await expect(medalCount).toHaveText('1');
    await expect(lionCard.getByTestId('medal-badge')).toBeVisible();
  });
});
