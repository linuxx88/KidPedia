import { test, expect } from '@playwright/test';

test.describe('Diagnostic CategoryScrollSpy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByTestId('profile-name-input').fill('Testeur Scroll');
    const startButton = page.getByRole('button', { name: /parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();
  });

  test('devrait être cliquable et déclencher un défilement', async ({ page }) => {
    // 1. S'assurer que les boutons du ScrollSpy sont visibles
    const scrollSpy = page.locator('nav[aria-label="Navigation par thèmes"]');
    await expect(scrollSpy).toBeVisible();

    // 2. Tenter de cliquer sur le bouton d'une catégorie loin en bas (ex: Dinosaures)
    const dinoBtn = page.locator('nav[aria-label="Navigation par thèmes"] button[data-category="dinosaures"]');
    await expect(dinoBtn).toBeVisible();

    console.log('Tentative de clic sur le bouton Dinosaures (ScrollSpy)...');
    
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Action : Clic simple
    await dinoBtn.click();

    // 3. Vérifier si le scroll a bougé
    // On attend que la section cible soit visible dans le viewport
    const targetSection = page.locator('#category-dinosaures');
    await expect(targetSection).toBeInViewport();
    
    // On laisse un délai de confort pour la stabilisation de l'Observer
    // 3s pour Firefox qui est parfois un peu lent sur les calculs de scroll
    await page.waitForTimeout(3000);
    
    const finalScrollY = await page.evaluate(() => window.scrollY);
    console.log(`Scroll initial: ${initialScrollY}, Scroll final: ${finalScrollY}`);
    
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
    
    // 4. Vérifier que le bouton devient actif (via data-attribute pour plus de robustesse)
    await expect(dinoBtn).toHaveAttribute('data-active', 'true', { timeout: 10000 });
  });
});
