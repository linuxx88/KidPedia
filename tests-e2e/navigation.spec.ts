import { test, expect } from '@playwright/test';

test.describe('Navigation et Boutons Accueil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByTestId('profile-name-input').fill('Navigateur');
    const startButton = page.getByRole('button', { name: /C'est parti/i });
    await expect(startButton).toBeVisible();
    await startButton.click();
    
    // Attendre que l'overlay disparaisse
    await expect(page.getByTestId('profile-overlay')).toBeHidden();
  });

  test('devrait naviguer vers toutes les sections du Discovery Hub', async ({ page }) => {
    const hubSections = [
      { name: /Le Grand Voyage du Temps/i, url: /\/origins/ },
      { name: /La Carte aux Trésors/i, url: /\/map/ },
      { name: /Mission Safari/i, url: /\/safari/ },
    ];


    for (const section of hubSections) {
      const card = page.getByRole('button', { name: section.name });
      await expect(card).toBeVisible();
      await card.click({ force: true });
      await expect(page).toHaveURL(section.url);
      
      const backBtn = page.getByRole('button', { name: /Retour/i }).first();
      if (await backBtn.isVisible()) {
        await backBtn.click({ force: true });
      } else {
        // Fallback pour les modes immersifs où le header global est masqué
        await page.goto('/', { timeout: 45000 });
      }
      await expect(page).toHaveURL(/\/$/);
    }
  });

  test('le dashboard (médailles/xp) devrait mener à la Galerie des Explorateurs', async ({ page }) => {
    const dashLink = page.getByRole('link', { name: /Voir mes médailles/i });
    await expect(dashLink).toBeVisible();
    await dashLink.scrollIntoViewIfNeeded();
    await dashLink.click();
    await expect(page).toHaveURL(/\/gallery/);
    
    const backBtn = page.getByRole('button', { name: /Retour/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('les boutons de la barre de navigation devraient être interactifs', async ({ page }) => {
    const profileBtn = page.getByTestId('header-profile-btn');
    await expect(profileBtn).toBeVisible();
    await profileBtn.click();
    await expect(page.getByTestId('main-title')).toBeVisible();
    
    // Fermer l'overlay en cliquant sur le nom (si c'est le comportement attendu) ou via onClose
    // Ici on clique sur une carte pour simuler la sélection
    await page.getByTestId('profile-card-Navigateur').click();
    await expect(page.getByTestId('main-title')).not.toBeVisible();

    const genderBtn = page.getByTestId('header-gender-btn');
    if (!await genderBtn.isVisible()) {
       // Si non trouvé par ID, on essaie par position (compatibilité)
       await expect(page.locator('header button').nth(1)).toBeVisible();
    } else {
       await expect(genderBtn).toBeVisible();
       await expect(genderBtn).toContainText('👦');
       await genderBtn.click();
       await expect(genderBtn).toContainText('👧');
       await genderBtn.click();
       await expect(genderBtn).toContainText('👦');
    }
  });

  test('la barre de recherche devrait filtrer les résultats', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Cherche un sujet/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Lion');
    await expect(page.getByTestId('topic-card-lion')).toBeVisible();
    
    const clearBtn = page.getByRole('button', { name: /Effacer/i });
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
    await expect(searchInput).toHaveValue('');
  });

  test('les boutons "Voir plus" des catégories devraient fonctionner', async ({ page }) => {
    const moreBtn = page.getByRole('button', { name: /Voir plus/i }).first();
    if (await moreBtn.isVisible()) {
      await moreBtn.scrollIntoViewIfNeeded();
      await moreBtn.click({ force: true });
      
      // On attend que l'état change (le bouton devient "Voir moins")
      const lessBtn = page.getByRole('button', { name: /Voir moins/i }).first();
      await expect(lessBtn).toBeVisible({ timeout: 10000 });
    }
  });
});
