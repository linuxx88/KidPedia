# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: season.spec.ts >> Cycle des Saisons >> devrait permettre de changer de saison et persister le choix
- Location: tests-e2e\season.spec.ts:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Cercle de la Vie/i })

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
          - generic "SeasonExplorer" [ref=e20]:
            - img "SeasonExplorer" [ref=e23]
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
        - heading "Bonsoir ! :" [level=1] [ref=e71]
        - paragraph [ref=e72]: Il fait beau... c'est une belle journée et ? ✨
      - 'link "Voir mes médailles. Progression : 0 pour cent. Total XP : 0" [ref=e74] [cursor=pointer]':
        - /url: /badges
        - generic [ref=e75]:
          - generic [ref=e76]: 🏆
          - generic [ref=e77]: "0"
          - generic [ref=e78]: Médailles
        - generic [ref=e80]:
          - generic [ref=e81]: ⚡
          - generic [ref=e82]: "0"
          - generic [ref=e83]: XP
        - generic [ref=e86]: 0%
      - generic [ref=e89]:
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e90] [cursor=pointer]:
          - img [ref=e92]
          - generic [ref=e94]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e95]
            - paragraph [ref=e96]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e97] [cursor=pointer]:
          - img [ref=e99]
          - generic [ref=e101]:
            - heading "La Carte aux Trésors" [level=3] [ref=e102]
            - paragraph [ref=e103]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e104] [cursor=pointer]:
          - img [ref=e106]
          - generic [ref=e108]:
            - heading "Mission Safari" [level=3] [ref=e109]
            - paragraph [ref=e110]: Survis à la savane et gagne le trésor !
      - generic [ref=e111]:
        - generic [ref=e112]:
          - button "Le Lion. Le roi de la savane." [ref=e113] [cursor=pointer]:
            - generic [ref=e114]: Animaux
            - generic [ref=e116]: 🦁
            - heading "Le Lion" [level=3] [ref=e117]
            - paragraph [ref=e118]: Le roi de la savane.
            - generic [ref=e119]: Explorer →
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique." [ref=e120] [cursor=pointer]:
            - generic [ref=e122]: 🐘
            - heading "L'Éléphant" [level=3] [ref=e123]
            - paragraph [ref=e124]: Le plus gros animal terrestre avec une trompe magique.
            - generic [ref=e125]: Explorer →
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures." [ref=e126] [cursor=pointer]:
            - generic [ref=e128]: 🐯
            - heading "Le Tigre" [level=3] [ref=e129]
            - paragraph [ref=e130]: Le plus grand de tous les félins avec de belles rayures.
            - generic [ref=e131]: Explorer →
        - button "Voir plus ➔" [ref=e133] [cursor=pointer]
      - generic [ref=e134]:
        - generic [ref=e135]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e136] [cursor=pointer]:
            - generic [ref=e137]: Espace
            - generic [ref=e139]: ☀️
            - heading "Le Soleil" [level=3] [ref=e140]
            - paragraph [ref=e141]: L'étoile au centre de notre système.
            - generic [ref=e142]: Explorer →
          - button "Mercure. La petite planète proche du Soleil." [ref=e143] [cursor=pointer]:
            - generic [ref=e145]: 🌑
            - heading "Mercure" [level=3] [ref=e146]
            - paragraph [ref=e147]: La petite planète proche du Soleil.
            - generic [ref=e148]: Explorer →
          - button "Vénus. La planète la plus chaude de toutes." [ref=e149] [cursor=pointer]:
            - generic [ref=e151]: ☁️
            - heading "Vénus" [level=3] [ref=e152]
            - paragraph [ref=e153]: La planète la plus chaude de toutes.
            - generic [ref=e154]: Explorer →
        - button "Voir plus ➔" [ref=e156] [cursor=pointer]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e159] [cursor=pointer]:
            - generic [ref=e160]: Dinosaures REX
            - generic [ref=e162]: REX
            - heading "Le T-Rex" [level=3] [ref=e163]
            - paragraph [ref=e164]: Le plus célèbre des dinosaures.
            - generic [ref=e165]: Explorer →
          - button "Le Tricératops. Le dinosaure à trois cornes." [ref=e166] [cursor=pointer]:
            - generic [ref=e168]: 🦕
            - heading "Le Tricératops" [level=3] [ref=e169]
            - paragraph [ref=e170]: Le dinosaure à trois cornes.
            - generic [ref=e171]: Explorer →
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos." [ref=e172] [cursor=pointer]:
            - generic [ref=e174]: 🛡️
            - heading "Le Stégosaure" [level=3] [ref=e175]
            - paragraph [ref=e176]: Le dinosaure avec des plaques sur le dos.
            - generic [ref=e177]: Explorer →
        - button "Voir plus ➔" [ref=e179] [cursor=pointer]
      - generic [ref=e180]:
        - generic [ref=e181]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e182] [cursor=pointer]:
            - generic [ref=e183]: Corps Humain
            - generic [ref=e185]: 🧠
            - heading "Le Cerveau" [level=3] [ref=e186]
            - paragraph [ref=e187]: L'ordinateur super puissant de ton corps.
            - generic [ref=e188]: Explorer →
          - button "Le Cœur. La pompe qui fait voyager ton sang." [ref=e189] [cursor=pointer]:
            - generic [ref=e191]: ❤️
            - heading "Le Cœur" [level=3] [ref=e192]
            - paragraph [ref=e193]: La pompe qui fait voyager ton sang.
            - generic [ref=e194]: Explorer →
          - button "Le Sang. Le train qui transporte tout dans ton corps." [ref=e195] [cursor=pointer]:
            - generic [ref=e197]: 🩸
            - heading "Le Sang" [level=3] [ref=e198]
            - paragraph [ref=e199]: Le train qui transporte tout dans ton corps.
            - generic [ref=e200]: Explorer →
        - button "Voir plus ➔" [ref=e202] [cursor=pointer]
      - generic [ref=e203]:
        - generic [ref=e204]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e205] [cursor=pointer]:
            - generic [ref=e206]: Nature
            - generic [ref=e208]: 🌳
            - heading "Les Arbres" [level=3] [ref=e209]
            - paragraph [ref=e210]: Les poumons de la Terre.
            - generic [ref=e211]: Explorer →
          - button "Le Volcan. Une montagne qui crache du feu." [ref=e212] [cursor=pointer]:
            - generic [ref=e214]: 🌋
            - heading "Le Volcan" [level=3] [ref=e215]
            - paragraph [ref=e216]: Une montagne qui crache du feu.
            - generic [ref=e217]: Explorer →
          - button "La Pluie. De l'eau qui tombe des nuages." [ref=e218] [cursor=pointer]:
            - generic [ref=e220]: 🌧️
            - heading "La Pluie" [level=3] [ref=e221]
            - paragraph [ref=e222]: De l'eau qui tombe des nuages.
            - generic [ref=e223]: Explorer →
        - button "Voir plus ➔" [ref=e225] [cursor=pointer]
      - generic [ref=e226]:
        - generic [ref=e227]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e228] [cursor=pointer]:
            - generic [ref=e229]: Histoire
            - generic [ref=e231]: 🧱
            - heading "Les Pyramides" [level=3] [ref=e232]
            - paragraph [ref=e233]: D'immenses tombeaux pour les pharaons d'Égypte.
            - generic [ref=e234]: Explorer →
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures." [ref=e235] [cursor=pointer]:
            - generic [ref=e237]: 🛡️
            - heading "Les Chevaliers" [level=3] [ref=e238]
            - paragraph [ref=e239]: De courageux guerriers du Moyen Âge avec des armures.
            - generic [ref=e240]: Explorer →
          - button "Les Vikings. De grands navigateurs venus du Nord." [ref=e241] [cursor=pointer]:
            - generic [ref=e243]: 🛶
            - heading "Les Vikings" [level=3] [ref=e244]
            - paragraph [ref=e245]: De grands navigateurs venus du Nord.
            - generic [ref=e246]: Explorer →
        - button "Voir plus ➔" [ref=e248] [cursor=pointer]
      - generic [ref=e249]:
        - generic [ref=e250]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e251] [cursor=pointer]:
            - generic [ref=e252]: Géographie
            - generic [ref=e254]: 🗼
            - heading "La Tour Eiffel" [level=3] [ref=e255]
            - paragraph [ref=e256]: Une immense tour de fer située à Paris.
            - generic [ref=e257]: Explorer →
          - button "L'Amazonie. La plus grande forêt tropicale du monde." [ref=e258] [cursor=pointer]:
            - generic [ref=e260]: 🌴
            - heading "L'Amazonie" [level=3] [ref=e261]
            - paragraph [ref=e262]: La plus grande forêt tropicale du monde.
            - generic [ref=e263]: Explorer →
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne." [ref=e264] [cursor=pointer]:
            - generic [ref=e266]: 🏔️
            - heading "Le Mont Everest" [level=3] [ref=e267]
            - paragraph [ref=e268]: Le toit du monde, la plus haute montagne.
            - generic [ref=e269]: Explorer →
        - button "Voir plus ➔" [ref=e271] [cursor=pointer]
      - generic [ref=e272]:
        - generic [ref=e273]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e274] [cursor=pointer]:
            - generic [ref=e275]: Inventions
            - generic [ref=e277]: 💡
            - heading "L'Ampoule" [level=3] [ref=e278]
            - paragraph [ref=e279]: Une petite boule de verre qui nous donne de la lumière.
            - generic [ref=e280]: Explorer →
          - button "L'Imprimerie. Une machine pour copier les livres rapidement." [ref=e281] [cursor=pointer]:
            - generic [ref=e283]: 📚
            - heading "L'Imprimerie" [level=3] [ref=e284]
            - paragraph [ref=e285]: Une machine pour copier les livres rapidement.
            - generic [ref=e286]: Explorer →
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau." [ref=e287] [cursor=pointer]:
            - generic [ref=e289]: ✈️
            - heading "L'Avion" [level=3] [ref=e290]
            - paragraph [ref=e291]: Une machine incroyable qui peut voler comme un oiseau.
            - generic [ref=e292]: Explorer →
        - button "Voir plus ➔" [ref=e294] [cursor=pointer]
      - generic [ref=e295]:
        - generic [ref=e296]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e297] [cursor=pointer]:
            - generic [ref=e298]: Arts & Culture
            - generic [ref=e300]: 🖌️
            - heading "La Peinture" [level=3] [ref=e301]
            - paragraph [ref=e302]: Créer des images magnifiques avec de la couleur.
            - generic [ref=e303]: Explorer →
          - button "La Musique. Organiser des sons pour créer de belles chansons." [ref=e304] [cursor=pointer]:
            - generic [ref=e306]: 🎵
            - heading "La Musique" [level=3] [ref=e307]
            - paragraph [ref=e308]: Organiser des sons pour créer de belles chansons.
            - generic [ref=e309]: Explorer →
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent." [ref=e310] [cursor=pointer]:
            - generic [ref=e312]: 🎬
            - heading "Le Cinéma" [level=3] [ref=e313]
            - paragraph [ref=e314]: Raconter des histoires avec des images qui bougent.
            - generic [ref=e315]: Explorer →
        - button "Voir plus ➔" [ref=e317] [cursor=pointer]
      - generic [ref=e318]:
        - generic [ref=e319]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e320] [cursor=pointer]:
            - generic [ref=e321]: Pourquoi ?
            - generic [ref=e323]: 🌤️
            - heading "Pourquoi le ciel est bleu ?" [level=3] [ref=e324]
            - paragraph [ref=e325]: Le secret de la couleur du ciel.
            - generic [ref=e326]: Explorer →
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans." [ref=e327] [cursor=pointer]:
            - generic [ref=e329]: 🌊
            - heading "Pourquoi la mer est salée ?" [level=3] [ref=e330]
            - paragraph [ref=e331]: Le secret du goût de l'eau des océans.
            - generic [ref=e332]: Explorer →
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel." [ref=e333] [cursor=pointer]:
            - generic [ref=e335]: 🌈
            - heading "Comment se forme l'arc-en-ciel ?" [level=3] [ref=e336]
            - paragraph [ref=e337]: Un pont de couleurs dans le ciel.
            - generic [ref=e338]: Explorer →
        - button "Voir plus ➔" [ref=e340] [cursor=pointer]
    - generic [ref=e341]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cycle des Saisons', () => {
  4  |   test('devrait permettre de changer de saison et persister le choix', async ({ page }) => {
  5  |     // 1. Initialisation
  6  |     await page.goto('/');
  7  |     
  8  |     // Nettoyer le localStorage pour partir sur une base propre
  9  |     await page.evaluate(() => localStorage.clear());
  10 |     await page.reload();
  11 | 
  12 |     // 1.5 Créer un profil pour dissiper l'overlay initial
  13 |     await page.getByTestId('profile-name-input').fill('SeasonExplorer');
  14 |     const boyOption = page.getByText('👦 Garçon');
  15 |     await expect(boyOption).toBeVisible();
  16 |     await boyOption.click();
  17 |     
  18 |     const startButton = page.getByRole('button', { name: /parti/i });
  19 |     await expect(startButton).toBeVisible();
  20 |     await startButton.click();
  21 |     
  22 |     // Attendre que la modale disparaisse
  23 |     await expect(page.getByTestId('profile-name-input')).toBeHidden();
  24 | 
  25 |     // 1.7 Naviguer vers l'expérience NatureExplorer
> 26 |     await page.getByRole('button', { name: /Cercle de la Vie/i }).click();
     |                                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  27 |     await expect(page).toHaveURL(/\/nature/);
  28 | 
  29 |     const appContainer = page.getByTestId('nature-explorer-container');
  30 |     const seasonBtn = page.getByTestId('scene-season-switcher');
  31 | 
  32 |     // 2. Vérifier l'état initial (Spring)
  33 |     await expect(appContainer).toHaveClass(/season-spring/);
  34 |     await expect(seasonBtn).toContainText(/Printemps/i);
  35 | 
  36 |     // 3. Passer à l'été (Summer)
  37 |     await expect(seasonBtn).toBeVisible();
  38 |     await seasonBtn.click();
  39 |     await expect(appContainer).toHaveClass(/season-summer/);
  40 |     await expect(seasonBtn).toContainText(/Été/i);
  41 | 
  42 |     // 4. Passer à l'automne (Autumn)
  43 |     await seasonBtn.click();
  44 |     await expect(appContainer).toHaveClass(/season-autumn/);
  45 |     await expect(seasonBtn).toContainText(/Automne/i);
  46 | 
  47 |     // 5. Passer à l'hiver (Winter)
  48 |     await seasonBtn.click();
  49 |     await expect(appContainer).toHaveClass(/season-winter/);
  50 |     await expect(seasonBtn).toContainText(/Hiver/i);
  51 | 
  52 |     // 6. Revenir au printemps (Cycle complet)
  53 |     await seasonBtn.click();
  54 |     await expect(appContainer).toHaveClass(/season-spring/);
  55 |     await expect(seasonBtn).toContainText(/Printemps/i);
  56 | 
  57 |     // 7. Tester la persistance (Passer à l'été et recharger)
  58 |     await seasonBtn.click();
  59 |     await expect(appContainer).toHaveClass(/season-summer/);
  60 |     
  61 |     await page.reload();
  62 |     await expect(appContainer).toHaveClass(/season-summer/);
  63 |     await expect(seasonBtn).toContainText(/Été/i);
  64 |   });
  65 | });
  66 | 
```