import { test, expect } from '@playwright/test';

test.describe('Cycle des Saisons', () => {
  test('devrait permettre de changer de saison et persister le choix', async ({ page }) => {
    // 1. Initialisation
    await page.goto('/');
    
    // Nettoyer le localStorage pour partir sur une base propre
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // 1.5 Créer un profil pour dissiper l'overlay initial
    await page.getByTestId('profile-name-input').fill('SeasonExplorer');
    const boyOption = page.getByText('👦 Garçon');
    await expect(boyOption).toBeVisible();
    await boyOption.click();
    
    const startButton = page.getByRole('button', { name: /parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();
    
    // Attendre que la modale disparaisse
    await expect(page.getByTestId('profile-name-input')).toBeHidden();

    // 1.7 Naviguer vers l'expérience NatureExplorer
    await page.getByRole('button', { name: /Cercle de la Vie/i }).click();
    await expect(page).toHaveURL(/\/nature/);

    const appContainer = page.getByTestId('nature-explorer-container');
    const seasonBtn = page.getByTestId('scene-season-switcher');

    // 2. Vérifier l'état initial (Spring)
    await expect(appContainer).toHaveClass(/season-spring/);
    await expect(seasonBtn).toContainText(/Printemps/i);

    // 3. Passer à l'été (Summer)
    await expect(seasonBtn).toBeVisible();
    await seasonBtn.click();
    await expect(appContainer).toHaveClass(/season-summer/);
    await expect(seasonBtn).toContainText(/Été/i);

    // 4. Passer à l'automne (Autumn)
    await seasonBtn.click();
    await expect(appContainer).toHaveClass(/season-autumn/);
    await expect(seasonBtn).toContainText(/Automne/i);

    // 5. Passer à l'hiver (Winter)
    await seasonBtn.click();
    await expect(appContainer).toHaveClass(/season-winter/);
    await expect(seasonBtn).toContainText(/Hiver/i);

    // 6. Revenir au printemps (Cycle complet)
    await seasonBtn.click();
    await expect(appContainer).toHaveClass(/season-spring/);
    await expect(seasonBtn).toContainText(/Printemps/i);

    // 7. Tester la persistance (Passer à l'été et recharger)
    await seasonBtn.click();
    await expect(appContainer).toHaveClass(/season-summer/);
    
    await page.reload();
    await expect(appContainer).toHaveClass(/season-summer/);
    await expect(seasonBtn).toContainText(/Été/i);
  });
});
