# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: persistence.spec.ts >> Persistance des données >> devrait conserver les médailles et le profil actif après un rechargement
- Location: tests-e2e/persistence.spec.ts:4:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('medal-count')
Expected: "1"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('medal-count')
    9 × locator resolved to <span data-testid="medal-count" class="_dashNumber_3jdlf_125">0</span>
      - unexpected value "0"

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
        - heading "Bonsoir !" [level=1] [ref=e71]
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
        - button "Le Cercle de la Vie Découvre comment la nature est connectée !" [ref=e95] [cursor=pointer]:
          - img [ref=e97]
          - generic [ref=e99]:
            - heading "Le Cercle de la Vie" [level=3] [ref=e100]
            - paragraph [ref=e101]: Découvre comment la nature est connectée !
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e102] [cursor=pointer]:
          - img [ref=e104]
          - generic [ref=e106]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e107]
            - paragraph [ref=e108]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e109] [cursor=pointer]:
          - img [ref=e111]
          - generic [ref=e113]:
            - heading "La Carte aux Trésors" [level=3] [ref=e114]
            - paragraph [ref=e115]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e116] [cursor=pointer]:
          - img [ref=e118]
          - generic [ref=e120]:
            - heading "Mission Safari" [level=3] [ref=e121]
            - paragraph [ref=e122]: Survis à la savane et gagne le trésor !
        - button "Le Grand Quiz des Champions Minuteur de folie, confettis et trophée doré ! 🏆" [ref=e123] [cursor=pointer]:
          - img [ref=e125]
          - generic [ref=e127]:
            - heading "Le Grand Quiz des Champions" [level=3] [ref=e128]
            - paragraph [ref=e129]: Minuteur de folie, confettis et trophée doré ! 🏆
      - generic [ref=e130]:
        - generic [ref=e131]:
          - button "Le Lion. Le roi de la savane." [ref=e133] [cursor=pointer]:
            - generic:
              - generic: Animaux
              - heading "Le Lion" [level=3]
              - paragraph: Le roi de la savane.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🦁
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique.. Verrouillé" [disabled] [ref=e135] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [disabled] [ref=e137] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
        - button "Voir plus ➔" [ref=e139] [cursor=pointer]
      - generic [ref=e140]:
        - generic [ref=e141]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e143] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [disabled] [ref=e145] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [disabled] [ref=e147] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e149] [cursor=pointer]
      - generic [ref=e150]:
        - generic [ref=e151]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e153] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [disabled] [ref=e155] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [disabled] [ref=e157] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e159] [cursor=pointer]
      - generic [ref=e160]:
        - generic [ref=e161]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e163] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [disabled] [ref=e165] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [disabled] [ref=e167] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e169] [cursor=pointer]
      - generic [ref=e170]:
        - generic [ref=e171]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e173] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [disabled] [ref=e175] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [disabled] [ref=e177] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e179] [cursor=pointer]
      - generic [ref=e180]:
        - generic [ref=e181]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e183] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [disabled] [ref=e185] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [disabled] [ref=e187] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e189] [cursor=pointer]
      - generic [ref=e190]:
        - generic [ref=e191]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e193] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [disabled] [ref=e195] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [disabled] [ref=e197] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e199] [cursor=pointer]
      - generic [ref=e200]:
        - generic [ref=e201]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e203] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [disabled] [ref=e205] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [disabled] [ref=e207] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e209] [cursor=pointer]
      - generic [ref=e210]:
        - generic [ref=e211]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e213] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [disabled] [ref=e215] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [disabled] [ref=e217] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e219] [cursor=pointer]
      - generic [ref=e220]:
        - generic [ref=e221]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e223] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [disabled] [ref=e225] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [disabled] [ref=e227] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e229] [cursor=pointer]
    - generic [ref=e230]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Persistance des données', () => {
  4  |   test('devrait conserver les médailles et le profil actif après un rechargement', async ({ page }) => {
  5  |     // 1. Initialisation : Création d'un profil et gain d'une médaille
  6  |     await page.goto('/');
  7  |     await page.evaluate(() => localStorage.clear());
  8  |     await page.reload();
  9  |     
  10 |     await page.getByTestId('profile-name-input').fill('Explorateur Persistant');
  11 |     await page.getByRole('button', { name: /parti/i }).click();
  12 | 
  13 |     // On gagne une médaille sur le Lion pour avoir un état à sauvegarder
  14 |     await page.getByTestId('topic-card-lion').click();
  15 |     await page.getByTestId('quiz-option-1').click();
  16 |     await page.getByRole('button', { name: /fini/i }).click();
  17 | 
  18 |     // Vérifier qu'on a bien 1 médaille avant le reload
  19 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
  20 | 
  21 |     // 2. Action : Rechargement de la page
  22 |     await page.reload();
  23 | 
  24 |     // 3. Vérification : Les données doivent être toujours là
  25 |     await expect(page.getByAltText('Explorateur Persistant')).toBeVisible();
> 26 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
     |                                                   ^ Error: expect(locator).toHaveText(expected) failed
  27 |     await expect(page.getByTestId('topic-card-lion').getByTestId('medal-badge')).toBeVisible();
  28 |   });
  29 | });
  30 | 
```