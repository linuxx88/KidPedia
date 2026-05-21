import { test, expect } from '@playwright/test';

test.describe('Internationalisation (i18n)', () => {
  test('devrait permettre de changer la langue du profil', async ({ page }) => {
    // 1. Nettoyage et Navigation
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const bodyText = await page.innerText('body');
    console.log('Contenu du body au démarrage:', bodyText.substring(0, 200));

    // 2. S'assurer qu'on est sur l'écran de création
    const title = page.getByTestId('main-title');
    await title.waitFor({ state: 'visible', timeout: 15000 });
    await expect(title).toContainText('Explorateur');

    // 3. Changer la langue en Anglais
    await page.getByRole('button').filter({ hasText: 'English' }).click();

    // 4. Vérifier que le titre change en anglais
    await expect(title).toContainText('Explorer');

    // 5. Créer le profil en anglais
    await page.getByTestId('profile-name-input').fill('Léo');
    await page.getByRole('button', { name: "Let's go! 🚀", exact: true }).click();

    // 6. Vérifier l'accueil en anglais
    await expect(page.getByText('The Great Time Journey')).toBeVisible();
    await expect(page.getByText('Medals', { exact: true })).toBeVisible();
  });
});
