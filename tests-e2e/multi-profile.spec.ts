import { test, expect } from '@playwright/test';

test.describe('Gestion Multi-Profils', () => {
  test('devrait isoler les données entre deux profils différents', async ({ page }) => {
    // 1. Création du profil d'Alice
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Alice');
    await page.getByText('👧 Fille').click();
    await page.getByRole('button', { name: /C'est parti/i }).click();

    // 2. Alice gagne une médaille (Lion)
    await page.getByTestId('topic-card-lion').click();
    await page.getByTestId('quiz-option-1').click();
    await page.getByRole('button', { name: /fini/i }).click();
    await expect(page.getByTestId('medal-count')).toHaveText('1');

    // 3. Création du profil de Bob
    await page.getByTestId('header-profile-btn').click();
    await page.getByText(/Ajouter un explorateur/i).click();
    
    await page.getByTestId('profile-name-input').fill('Bob');
    await page.getByText('👦 Garçon').click();
    await page.getByRole('button', { name: /C'est parti/i }).click();

    // 4. Vérifier que Bob a 0 médaille
    await expect(page.getByTestId('medal-count')).toHaveText('0');
    await expect(page.getByAltText('Bob')).toBeVisible();

    // 5. Repasser sur Alice
    await page.getByTestId('header-profile-btn').click();
    await expect(page.getByTestId('main-title')).toBeVisible();
    await page.getByTestId('profile-card-Alice').click({ force: true });

    // 6. Vérifier qu'Alice a retrouvé sa médaille
    await expect(page.getByAltText('Alice')).toBeVisible();
    await expect(page.getByTestId('medal-count')).toHaveText('1');
  });
});
