import { test, expect } from '@playwright/test';

test.describe('NatureExplorer - Refonte Industrielle', () => {
  test('devrait afficher la nouvelle scène multi-couches et permettre des interactions', async ({ page }) => {
    // 1. Initialisation
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    // Créer un profil
    const overlay = page.getByTestId('profile-overlay');
    await page.getByTestId('profile-name-input').fill('NatureTester');
    await page.getByText('👦 Garçon').click();
    await page.getByRole('button', { name: /C'est parti/i }).click();
    await expect(overlay).toBeHidden();

    // Naviguer vers Nature
    await page.getByRole('button', { name: /Cercle de la Vie/i }).click();
    await expect(page).toHaveURL(/\/nature/);

    // 2. Vérifier la présence des nouvelles couches de la scène
    const explorerContainer = page.getByTestId('nature-explorer-container');
    await expect(explorerContainer).toBeVisible();

    // On vérifie que les couches de décor sont bien présentes.
    await expect(page.getByTestId('sky-layer')).toBeVisible();
    await expect(page.getByTestId('hills-layer')).toBeVisible();
    await expect(page.getByTestId('trees-layer')).toBeVisible();
    await expect(page.getByTestId('particle-system')).toBeAttached();

    // 3. Vérifier les éléments principaux
    const tree = page.getByTestId('nature-tree');
    await expect(tree).toBeVisible();
    const water = page.getByTestId('nature-zone-water');
    await expect(water).toBeVisible();

    // 4. Tester le changement de saison
    await page.click('[data-testid="season-cycle-button"]');
    await expect(explorerContainer).toHaveClass(/season-summer/);

    // 5. VÉRIFIER LE POISSON
    await expect(page.getByRole('button', { name: /Explorer le poisson/i })).toBeVisible();

    // 6. Vérifier les autres interactions
    const roots = page.getByRole('button', { name: /racines/i });
    await expect(roots).toBeVisible();

    const trunk = page.getByRole('button', { name: /Explorer le tronc/i });
    await expect(trunk).toBeVisible();
    await trunk.click();
    
    await expect(page).toHaveURL(/\/topic\/arbres/);
  });
});
