# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: persistence.spec.ts >> Persistance des données >> devrait conserver les médailles et le profil actif après un rechargement
- Location: tests-e2e/persistence.spec.ts:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('medal-count')
Expected: "1"
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('medal-count')

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
          - generic "Explorateur Persistant" [ref=e20]:
            - img "Explorateur Persistant" [ref=e23]
            - generic "Chapeau de Brousse" [ref=e24]:
              - generic [ref=e26]: 🤠
        - button "Passer en mode fille" [ref=e27] [cursor=pointer]: 👦
        - button "🌌 Espace" [ref=e28] [cursor=pointer]: 🌙
        - button "Arrêter" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: 🔊
  - main [ref=e31]:
    - generic [ref=e33]:
      - navigation "Navigation par thèmes" [ref=e34]:
        - list [ref=e35]:
          - listitem [ref=e36]:
            - button "Aller à la section Animaux" [ref=e37] [cursor=pointer]:
              - generic [ref=e38]: 🦁
              - generic: Animaux
          - listitem [ref=e39]:
            - button "Aller à la section Espace" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: 🚀
              - generic: Espace
          - listitem [ref=e42]:
            - button "Aller à la section Dinosaures REX" [ref=e43] [cursor=pointer]:
              - generic [ref=e44]: 🦖
              - generic: Dinosaures REX
          - listitem [ref=e45]:
            - button "Aller à la section Corps Humain" [ref=e46] [cursor=pointer]:
              - generic [ref=e47]: 🧠
              - generic: Corps Humain
          - listitem [ref=e48]:
            - button "Aller à la section Nature" [ref=e49] [cursor=pointer]:
              - generic [ref=e50]: 🌿
              - generic: Nature
          - listitem [ref=e51]:
            - button "Aller à la section Histoire" [ref=e52] [cursor=pointer]:
              - generic [ref=e53]: 🏺
              - generic: Histoire
          - listitem [ref=e54]:
            - button "Aller à la section Géographie" [ref=e55] [cursor=pointer]:
              - generic [ref=e56]: 🌍
              - generic: Géographie
          - listitem [ref=e57]:
            - button "Aller à la section Inventions" [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: 💡
              - generic: Inventions
          - listitem [ref=e60]:
            - button "Aller à la section Arts & Culture" [ref=e61] [cursor=pointer]:
              - generic [ref=e62]: 🎨
              - generic: Arts & Culture
          - listitem [ref=e63]:
            - button "Aller à la section Pourquoi ?" [ref=e64] [cursor=pointer]:
              - generic [ref=e65]: ❓
              - generic: Pourquoi ?
      - generic [ref=e73]:
        - heading "Bonsoir !" [level=1] [ref=e74]
        - paragraph [ref=e75]: Il fait beau... c'est une belle journée pour apprendre et s'amuser ! ✨
      - 'link "Voir mes médailles. Progression : 1 pour cent. Total XP : 1500" [ref=e77] [cursor=pointer]':
        - /url: /gallery
        - generic [ref=e78]:
          - generic [ref=e79]: 🏆
          - generic [ref=e80]: "1"
          - generic [ref=e81]: Médailles
        - generic [ref=e83]:
          - generic [ref=e84]: 🎫
          - generic [ref=e85]: "3"
          - generic [ref=e86]: Tickets QC
        - generic [ref=e88]:
          - generic [ref=e89]: ⚡
          - generic [ref=e90]: 1.5k
          - generic [ref=e91]: XP
        - generic [ref=e94]: 1%
      - generic [ref=e98]:
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e99] [cursor=pointer]:
          - img [ref=e101]
          - generic [ref=e103]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e104]
            - paragraph [ref=e105]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e106] [cursor=pointer]:
          - img [ref=e108]
          - generic [ref=e110]:
            - heading "La Carte aux Trésors" [level=3] [ref=e111]
            - paragraph [ref=e112]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e113] [cursor=pointer]:
          - img [ref=e115]
          - generic [ref=e117]:
            - heading "Mission Safari" [level=3] [ref=e118]
            - paragraph [ref=e119]: Survis à la savane et gagne le trésor !
        - button "Le Grand Quiz des Champions Minuteur de folie, confettis et trophée doré ! 🏆" [ref=e120] [cursor=pointer]:
          - img [ref=e122]
          - generic [ref=e124]:
            - heading "Le Grand Quiz des Champions" [level=3] [ref=e125]
            - paragraph [ref=e126]: Minuteur de folie, confettis et trophée doré ! 🏆
      - generic [ref=e127]:
        - generic [ref=e128]:
          - button "Le Lion. Le roi de la savane.. Médaille obtenue" [ref=e130] [cursor=pointer]:
            - generic:
              - generic: Animaux
              - generic:
                - generic: 🥇
              - heading "Le Lion" [level=3]
              - paragraph: Le roi de la savane.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🦁
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique." [ref=e132] [cursor=pointer]:
            - generic:
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [ref=e134] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
        - button "Voir plus ➔" [ref=e136] [cursor=pointer]
      - generic [ref=e137]:
        - generic [ref=e138]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e140] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [ref=e142] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [ref=e144] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e146] [cursor=pointer]
      - generic [ref=e147]:
        - generic [ref=e148]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e150] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [ref=e152] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [ref=e154] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e156] [cursor=pointer]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e160] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [ref=e162] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [ref=e164] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e166] [cursor=pointer]
      - generic [ref=e167]:
        - generic [ref=e168]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e170] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [ref=e172] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [ref=e174] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e176] [cursor=pointer]
      - generic [ref=e177]:
        - generic [ref=e178]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e180] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [ref=e182] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [ref=e184] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e186] [cursor=pointer]
      - generic [ref=e187]:
        - generic [ref=e188]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e190] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [ref=e192] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [ref=e194] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e196] [cursor=pointer]
      - generic [ref=e197]:
        - generic [ref=e198]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e200] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [ref=e202] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [ref=e204] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e206] [cursor=pointer]
      - generic [ref=e207]:
        - generic [ref=e208]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e210] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [ref=e212] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [ref=e214] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e216] [cursor=pointer]
      - generic [ref=e217]:
        - generic [ref=e218]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e220] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [ref=e222] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [ref=e224] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e226] [cursor=pointer]
    - generic [ref=e227]:
      - generic [ref=e228]: L'application est prête à être utilisée hors-ligne ! 🚀
      - button "Fermer" [ref=e230] [cursor=pointer]
    - generic [ref=e231]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Persistance des données', () => {
  4  |   test('devrait conserver les médailles et le profil actif après un rechargement', async ({ page }) => {
  5  |     // 1. Initialisation : Création d'un profil et gain d'une médaille
  6  |     await page.goto('/');
  7  |     
  8  |     await page.getByTestId('profile-name-input').fill('Explorateur Persistant');
  9  |     await page.getByRole('button', { name: /parti/i }).click();
  10 | 
  11 |     // On gagne une médaille sur le Lion pour avoir un état à sauvegarder
  12 |     await page.getByTestId('topic-card-lion').click();
  13 |     await page.getByTestId('quiz-option-1').click();
  14 |     await page.getByRole('button', { name: /fini/i }).click();
  15 | 
  16 |     // Vérifier qu'on a bien 1 médaille avant le reload
> 17 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
     |                                                   ^ Error: expect(locator).toHaveText(expected) failed
  18 | 
  19 |     // 2. Action : Rechargement de la page
  20 |     await page.reload();
  21 | 
  22 |     // 3. Vérification : Les données doivent être toujours là
  23 |     await expect(page.getByAltText('Explorateur Persistant')).toBeVisible();
  24 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
  25 |     await expect(page.getByTestId('topic-card-lion').getByTestId('medal-badge')).toBeVisible();
  26 |   });
  27 | });
  28 | 
```