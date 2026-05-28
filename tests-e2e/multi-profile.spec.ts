import { test, expect } from '@playwright/test';

test.describe('Gestion Multi-Profils', () => {
  test('devrait isoler les données entre deux profils différents', async ({ page }) => {
    // Augmenter le timeout pour ce long test multi-étape sur WebKit
    test.setTimeout(60000);

    // 1. Création du profil d'Alice
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Alice');
    await page.getByText('👧 Fille').click();
    await page.getByRole('button', { name: /C'est parti/i }).click();
    await expect(page.getByTestId('profile-overlay')).toBeHidden();

    // 2. Alice gagne une médaille (Lion)
    await page.getByTestId('topic-card-lion').click();
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    await expect(page.getByTestId('quiz-option-1')).toBeVisible();
    await page.getByTestId('quiz-option-1').click();
    await page.getByRole('button', { name: /fini/i }).click();
    await expect(page.getByTestId('medal-count')).toHaveText('1');

    // 3. Création du profil de Bob
    await page.waitForTimeout(1000); // Attendre la fin de la transition de retour au hub
    await expect(page.getByTestId('header-profile-btn')).toBeVisible();
    await page.waitForTimeout(500); // Laisser React attacher les écouteurs
    await page.getByTestId('header-profile-btn').click({ force: true });
    
    await expect(page.getByText(/Ajouter un explorateur/i)).toBeVisible();
    await page.waitForTimeout(500); // Attendre la transition de la modale
    await page.getByText(/Ajouter un explorateur/i).click({ force: true });
    
    await page.getByTestId('profile-name-input').fill('Bob');
    await page.getByText('👦 Garçon').click({ force: true });
    await page.getByRole('button', { name: /C'est parti/i }).click({ force: true });
    await expect(page.getByTestId('profile-overlay')).toBeHidden();

    // 4. Vérifier que Bob a 0 médaille
    await expect(page.getByTestId('medal-count')).toHaveText('0');
    await expect(page.getByAltText('Bob')).toBeVisible();

    // 5. Repasser sur Alice
    await page.waitForTimeout(500); // Attendre la fin de la disparition de l'overlay de profil
    await expect(page.getByTestId('header-profile-btn')).toBeVisible();
    await page.waitForTimeout(500); // Laisser React attacher les écouteurs
    await page.getByTestId('header-profile-btn').click({ force: true });
    await expect(page.getByTestId('main-title')).toBeVisible();
    
    await page.waitForTimeout(500); // Attendre la transition de la modale de profil
    await page.getByTestId('profile-card-Alice').click({ force: true });
    await expect(page.getByTestId('profile-overlay')).toBeHidden();

    // 6. Vérifier qu'Alice a retrouvé sa médaille
    await expect(page.getByAltText('Alice')).toBeVisible();
    await expect(page.getByTestId('medal-count')).toHaveText('1');
  });
});
