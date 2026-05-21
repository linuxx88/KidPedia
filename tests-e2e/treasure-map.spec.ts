import { test, expect } from '@playwright/test';

test.describe('La Carte aux Trésors', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Initialisation : Création d'un profil
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.getByTestId('profile-name-input').fill('Explorateur E2E');
    await page.getByRole('button', { name: /parti/i }).click();

    // 2. Accéder à la Carte aux Trésors
    const mapLink = page.getByText('La Carte aux Trésors');
    await expect(mapLink).toBeVisible();
    await mapLink.click();
    await expect(page).toHaveURL(/\/map/);
  });

  test('devrait permettre de zoomer et dézoomer', async ({ page }) => {
    const zoomLevel = page.getByTestId('zoom-level');
    await expect(zoomLevel).toHaveText('x1');

    // Utilisation de aria-label pour éviter les conflits de titre avec raccourcis
    const zoomInBtn = page.getByLabel('Zoomer', { exact: true });
    await zoomInBtn.click();
    await expect(zoomLevel).toHaveText('x2');

    const zoomOutBtn = page.getByLabel('Dézoomer', { exact: true });
    await zoomOutBtn.click();
    await expect(zoomLevel).toHaveText('x1');
  });

  test('devrait afficher des nouveaux points lors du zoom', async ({ page }) => {
    await expect(page.getByText('Le Grand Canyon')).toBeVisible();
    await expect(page.getByText('Le Panda')).not.toBeVisible();

    await page.getByLabel('Zoomer', { exact: true }).click();
    await expect(page.getByText('Le Panda')).toBeVisible();
  });

  test('devrait ouvrir une popup et naviguer vers un sujet', async ({ page }) => {
    const grandCanyon = page.getByText('Le Grand Canyon');
    await grandCanyon.click();

    // Vérifier la popup via testid (maintenant transmis par AppOverlay)
    const popup = page.getByTestId('discovery-popup');
    await expect(popup).toBeVisible();
    
    // Le titre est dans un h2 à l'intérieur
    await expect(popup.locator('h2')).toContainText('Grand Canyon');

    // Cliquer sur le bouton d'exploration
    const exploreBtn = popup.getByRole('button', { name: /Explorer/i });
    await exploreBtn.click();

    await expect(page).toHaveURL(/\/topic\/grand-canyon/);
    await expect(page.getByRole('heading', { level: 2 }).first()).toContainText('Grand Canyon');
  });

  test('devrait zoomer par double-clic sur la carte', async ({ page }) => {
    const mapImage = page.getByTestId('treasure-map-image');
    const zoomLevel = page.getByTestId('zoom-level');
    
    await expect(zoomLevel).toHaveText('x1');
    
    // On utilise force: true car le conteneur peut intercepter l'événement
    await mapImage.dblclick({ force: true });
    
    await expect(zoomLevel).toHaveText('x2');
  });

  test('devrait réinitialiser le zoom avec le bouton maison', async ({ page }) => {
    await page.getByLabel('Zoomer', { exact: true }).click();
    await page.getByLabel('Zoomer', { exact: true }).click();
    await expect(page.getByTestId('zoom-level')).toHaveText('x3');

    await page.getByLabel('Vue globale', { exact: true }).click();
    await expect(page.getByTestId('zoom-level')).toHaveText('x1');
  });
});
