# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation et Boutons Accueil >> les boutons de la barre de navigation devraient être interactifs
- Location: tests-e2e/navigation.spec.ts:55:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('header-gender-btn')
    - locator resolved to <button class="_headerBtn_7ay4o_119" title="Passer en mode fille" data-testid="header-gender-btn" aria-label="Passer en mode fille">👦</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - navigation [ref=e5]:
      - button "KidPedia" [ref=e6] [cursor=pointer]:
        - generic [ref=e7]: KidPedia
        - img [ref=e8]
      - generic [ref=e12]:
        - img [ref=e14]
        - textbox "Cherche un sujet..." [ref=e16]
      - generic [ref=e17]:
        - button "Zone Parents" [ref=e18] [cursor=pointer]: 🔐
        - button "Qui va explorer aujourd'hui ?" [ref=e19] [cursor=pointer]:
          - generic "Navigateur" [ref=e20]:
            - img "Navigateur" [ref=e23]
        - button "Passer en mode fille" [ref=e24] [cursor=pointer]: 👦
        - button "🌌 Espace" [ref=e25] [cursor=pointer]: 🌙
        - button "Arrêter" [ref=e26] [cursor=pointer]:
          - generic [ref=e27]: 🔊
  - main [ref=e28]:
    - generic [ref=e30]:
      - navigation "Navigation par thèmes" [ref=e31]:
        - list [ref=e32]:
          - listitem [ref=e33]:
            - button "Aller à la section Animaux" [ref=e34] [cursor=pointer]:
              - generic [ref=e35]: 🦁
              - generic: Animaux
          - listitem [ref=e36]:
            - button "Aller à la section Espace" [ref=e37] [cursor=pointer]:
              - generic [ref=e38]: 🚀
              - generic: Espace
          - listitem [ref=e39]:
            - button "Aller à la section Dinosaures REX" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: 🦖
              - generic: Dinosaures REX
          - listitem [ref=e42]:
            - button "Aller à la section Corps Humain" [ref=e43] [cursor=pointer]:
              - generic [ref=e44]: 🧠
              - generic: Corps Humain
          - listitem [ref=e45]:
            - button "Aller à la section Nature" [ref=e46] [cursor=pointer]:
              - generic [ref=e47]: 🌿
              - generic: Nature
          - listitem [ref=e48]:
            - button "Aller à la section Histoire" [ref=e49] [cursor=pointer]:
              - generic [ref=e50]: 🏺
              - generic: Histoire
          - listitem [ref=e51]:
            - button "Aller à la section Géographie" [ref=e52] [cursor=pointer]:
              - generic [ref=e53]: 🌍
              - generic: Géographie
          - listitem [ref=e54]:
            - button "Aller à la section Inventions" [ref=e55] [cursor=pointer]:
              - generic [ref=e56]: 💡
              - generic: Inventions
          - listitem [ref=e57]:
            - button "Aller à la section Arts & Culture" [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: 🎨
              - generic: Arts & Culture
          - listitem [ref=e60]:
            - button "Aller à la section Pourquoi ?" [ref=e61] [cursor=pointer]:
              - generic [ref=e62]: ❓
              - generic: Pourquoi ?
      - generic [ref=e70]:
        - heading "Bonjour !" [level=1] [ref=e71]
        - paragraph [ref=e72]: Il fait beau... c'est une belle journée pour apprendre et s'amuser ! ✨
      - 'link "Voir mes médailles. Progression : 0 pour cent. Total XP : 0" [ref=e74] [cursor=pointer]':
        - /url: /gallery
        - generic [ref=e75]:
          - generic [ref=e76]: 🏆
          - generic [ref=e77]: "0"
          - generic [ref=e78]: Médailles
        - generic [ref=e80]:
          - generic [ref=e81]: 🎫
          - generic [ref=e82]: "0"
          - generic [ref=e83]: Tickets QC
        - generic [ref=e85]:
          - generic [ref=e86]: ⚡
          - generic [ref=e87]: "0"
          - generic [ref=e88]: XP
        - generic [ref=e91]: 0%
      - generic [ref=e94]:
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e95] [cursor=pointer]:
          - img [ref=e97]
          - generic [ref=e99]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e100]
            - paragraph [ref=e101]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e102] [cursor=pointer]:
          - img [ref=e104]
          - generic [ref=e106]:
            - heading "La Carte aux Trésors" [level=3] [ref=e107]
            - paragraph [ref=e108]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e109] [cursor=pointer]:
          - img [ref=e111]
          - generic [ref=e113]:
            - heading "Mission Safari" [level=3] [ref=e114]
            - paragraph [ref=e115]: Survis à la savane et gagne le trésor !
        - button "Le Grand Quiz des Champions Minuteur de folie, confettis et trophée doré ! 🏆" [ref=e116] [cursor=pointer]:
          - img [ref=e118]
          - generic [ref=e120]:
            - heading "Le Grand Quiz des Champions" [level=3] [ref=e121]
            - paragraph [ref=e122]: Minuteur de folie, confettis et trophée doré ! 🏆
      - generic [ref=e123]:
        - generic [ref=e124]:
          - button "Le Lion. Le roi de la savane." [ref=e126] [cursor=pointer]:
            - generic:
              - generic: Animaux
              - heading "Le Lion" [level=3]
              - paragraph: Le roi de la savane.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🦁
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique.. Verrouillé" [ref=e128] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [ref=e130] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
        - button "Voir plus ➔" [ref=e132] [cursor=pointer]
      - generic [ref=e133]:
        - generic [ref=e134]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e136] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [ref=e138] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [ref=e140] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e142] [cursor=pointer]
      - generic [ref=e143]:
        - generic [ref=e144]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e146] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [ref=e148] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [ref=e150] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e152] [cursor=pointer]
      - generic [ref=e153]:
        - generic [ref=e154]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e156] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [ref=e158] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [ref=e160] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e162] [cursor=pointer]
      - generic [ref=e163]:
        - generic [ref=e164]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e166] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [ref=e168] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [ref=e170] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e172] [cursor=pointer]
      - generic [ref=e173]:
        - generic [ref=e174]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e176] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [ref=e178] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [ref=e180] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e182] [cursor=pointer]
      - generic [ref=e183]:
        - generic [ref=e184]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e186] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [ref=e188] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [ref=e190] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e192] [cursor=pointer]
      - generic [ref=e193]:
        - generic [ref=e194]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e196] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [ref=e198] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [ref=e200] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e202] [cursor=pointer]
      - generic [ref=e203]:
        - generic [ref=e204]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e206] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [ref=e208] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [ref=e210] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e212] [cursor=pointer]
      - generic [ref=e213]:
        - generic [ref=e214]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e216] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [ref=e218] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [ref=e220] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e222] [cursor=pointer]
    - generic [ref=e223]:
      - generic [ref=e224]: L'application est prête à être utilisée hors-ligne ! 🚀
      - button "Fermer" [ref=e226] [cursor=pointer]
    - generic [ref=e227]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Navigation et Boutons Accueil', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |     await page.evaluate(() => localStorage.clear());
  7   |     await page.reload();
  8   |     await page.getByTestId('profile-name-input').fill('Navigateur');
  9   |     const startButton = page.getByRole('button', { name: /C'est parti/i });
  10  |     await expect(startButton).toBeVisible();
  11  |     await startButton.click();
  12  |     
  13  |     // Attendre que l'overlay disparaisse
  14  |     await expect(page.getByTestId('profile-overlay')).toBeHidden();
  15  |   });
  16  | 
  17  |   test('devrait naviguer vers toutes les sections du Discovery Hub', async ({ page }) => {
  18  |     const hubSections = [
  19  |       { name: /Le Grand Voyage du Temps/i, url: /\/origins/ },
  20  |       { name: /La Carte aux Trésors/i, url: /\/map/ },
  21  |       { name: /Mission Safari/i, url: /\/safari/ },
  22  |     ];
  23  | 
  24  | 
  25  |     for (const section of hubSections) {
  26  |       const card = page.getByRole('button', { name: section.name });
  27  |       await expect(card).toBeVisible();
  28  |       await card.click({ force: true });
  29  |       await expect(page).toHaveURL(section.url);
  30  |       
  31  |       const backBtn = page.getByRole('button', { name: /Retour/i }).first();
  32  |       if (await backBtn.isVisible()) {
  33  |         await backBtn.click({ force: true });
  34  |       } else {
  35  |         // Fallback pour les modes immersifs où le header global est masqué
  36  |         await page.goto('/', { timeout: 45000 });
  37  |       }
  38  |       await expect(page).toHaveURL(/\/$/);
  39  |     }
  40  |   });
  41  | 
  42  |   test('le dashboard (médailles/xp) devrait mener à la Galerie des Explorateurs', async ({ page }) => {
  43  |     const dashLink = page.getByRole('link', { name: /Voir mes médailles/i });
  44  |     await expect(dashLink).toBeVisible();
  45  |     await dashLink.scrollIntoViewIfNeeded();
  46  |     await dashLink.click();
  47  |     await expect(page).toHaveURL(/\/gallery/);
  48  |     
  49  |     const backBtn = page.getByRole('button', { name: /Retour/i });
  50  |     await expect(backBtn).toBeVisible();
  51  |     await backBtn.click({ force: true });
  52  |     await expect(page).toHaveURL(/\/$/);
  53  |   });
  54  | 
  55  |   test('les boutons de la barre de navigation devraient être interactifs', async ({ page }) => {
  56  |     const profileBtn = page.getByTestId('header-profile-btn');
  57  |     await expect(profileBtn).toBeVisible();
  58  |     await profileBtn.click();
  59  |     await expect(page.getByTestId('main-title')).toBeVisible();
  60  |     
  61  |     // Fermer l'overlay en cliquant sur le nom (si c'est le comportement attendu) ou via onClose
  62  |     // Ici on clique sur une carte pour simuler la sélection
  63  |     await page.getByTestId('profile-card-Navigateur').click();
  64  |     await expect(page.getByTestId('main-title')).not.toBeVisible();
  65  | 
  66  |     const genderBtn = page.getByTestId('header-gender-btn');
  67  |     if (!await genderBtn.isVisible()) {
  68  |        // Si non trouvé par ID, on essaie par position (compatibilité)
  69  |        await expect(page.locator('header button').nth(1)).toBeVisible();
  70  |     } else {
  71  |        await expect(genderBtn).toBeVisible();
  72  |        await expect(genderBtn).toContainText('👦');
> 73  |        await genderBtn.click();
      |                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  74  |        await expect(genderBtn).toContainText('👧');
  75  |        await genderBtn.click();
  76  |        await expect(genderBtn).toContainText('👦');
  77  |     }
  78  |   });
  79  | 
  80  |   test('la barre de recherche devrait filtrer les résultats', async ({ page }) => {
  81  |     const searchInput = page.getByPlaceholder(/Cherche un sujet/i);
  82  |     await expect(searchInput).toBeVisible();
  83  |     await searchInput.fill('Lion');
  84  |     await expect(page.getByTestId('topic-card-lion')).toBeVisible();
  85  |     
  86  |     const clearBtn = page.getByRole('button', { name: /Effacer/i });
  87  |     await expect(clearBtn).toBeVisible();
  88  |     await clearBtn.click();
  89  |     await expect(searchInput).toHaveValue('');
  90  |   });
  91  | 
  92  |   test('les boutons "Voir plus" des catégories devraient fonctionner', async ({ page }) => {
  93  |     const moreBtn = page.getByRole('button', { name: /Voir plus/i }).first();
  94  |     if (await moreBtn.isVisible()) {
  95  |       await moreBtn.scrollIntoViewIfNeeded();
  96  |       await moreBtn.click({ force: true });
  97  |       
  98  |       // On attend que l'état change (le bouton devient "Voir moins")
  99  |       const lessBtn = page.getByRole('button', { name: /Voir moins/i }).first();
  100 |       await expect(lessBtn).toBeVisible({ timeout: 10000 });
  101 |     }
  102 |   });
  103 | });
  104 | 
```