import { test, expect } from '@playwright/test';

test.describe('La Carte aux Trésors', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Initialisation : Injecter un profil directement dans le localStorage avant le chargement de la page
    await page.addInitScript(() => {
      const profile = {
        id: 'e2e-profile-id',
        name: 'Explorateur E2E',
        avatar: '/avatars/boy-1.webp',
        gender: 'boy',
        theme: 'light',
        language: 'fr',
      };
      localStorage.setItem('kp-profiles-index', JSON.stringify([profile]));
      localStorage.setItem('kp-active-profile-id', 'e2e-profile-id');
    });

    // 2. Accéder directement à la Carte aux Trésors
    await page.goto('/map');
  });

  test('devrait permettre de zoomer et dézoomer', async ({ page }) => {
    const zoomLevel = page.getByTestId('zoom-level');
    await expect(zoomLevel).toHaveText('x1');

    const zoomInBtn = page.getByTestId('zoom-in-btn');
    await zoomInBtn.click();
    await expect(zoomLevel).toHaveText('x2');

    const zoomOutBtn = page.getByTestId('zoom-out-btn');
    await zoomOutBtn.click();
    await expect(zoomLevel).toHaveText('x1');
  });

  test('devrait afficher des nouveaux points lors du zoom', async ({ page }) => {
    await expect(page.getByTestId('map-point-tour-eiffel')).toBeVisible();
    await expect(page.getByTestId('map-point-desert-sahara')).not.toBeVisible();

    await page.getByTestId('zoom-in-btn').click();
    await expect(page.getByTestId('map-point-desert-sahara')).toBeVisible();
  });

  test('devrait ouvrir une popup et naviguer vers un sujet', async ({ page }) => {
    const tourEiffel = page.getByTestId('map-point-tour-eiffel');
    await tourEiffel.click();

    // Vérifier la popup via testid (maintenant transmis par AppOverlay)
    const popup = page.getByTestId('discovery-popup');
    await expect(popup).toBeVisible();
    
    // Le titre est dans un h2 à l'intérieur
    await expect(popup.locator('h2')).toContainText('Tour Eiffel');

    // Cliquer sur le bouton d'exploration
    const exploreBtn = popup.getByRole('button', { name: /Explorer/i });
    await exploreBtn.click();

    await expect(page).toHaveURL(/\/topic\/tour-eiffel/);
    await expect(page.getByRole('heading', { level: 2, name: /Tour Eiffel/i })).toBeVisible();
  });

  test('devrait zoomer par double-clic sur la carte', async ({ page }) => {
    const zoomLevel = page.getByTestId('zoom-level');
    
    await expect(zoomLevel).toHaveText('x1');
    
    // Double-clic sur l'élément picture (parent direct de l'image) pour zoomer sans contourner l'actionnabilité
    await page.locator('picture:has([data-testid="treasure-map-image"])').dblclick();
    
    await expect(zoomLevel).toHaveText('x2');
  });

  test('devrait réinitialiser le zoom avec le bouton maison', async ({ page }) => {
    await page.getByTestId('zoom-in-btn').click();
    await page.getByTestId('zoom-in-btn').click();
    await expect(page.getByTestId('zoom-level')).toHaveText('x3');

    await page.getByTestId('zoom-reset-btn').click();
    await expect(page.getByTestId('zoom-level')).toHaveText('x1');
  });
});
