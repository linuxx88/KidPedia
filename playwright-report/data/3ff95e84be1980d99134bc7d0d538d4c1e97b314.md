# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: temp_hover.spec.ts >> simulate hover and check flash
- Location: tests-e2e/temp_hover.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Technical Space"), button:has-text("Espace Technique")')

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
          - generic "StarBoy" [ref=e20]:
            - img "StarBoy" [ref=e23]
        - button "Passer en mode fille" [ref=e24] [cursor=pointer]: 👦
        - button "🌌 Espace" [ref=e25] [cursor=pointer]: 🌙
        - button "Arrêter" [ref=e26] [cursor=pointer]:
          - generic [ref=e27]: 🔊
  - main [ref=e28]:
    - generic [ref=e30]:
      - button "Fermer la barrière de sécurité" [ref=e31] [cursor=pointer]: ✕
      - heading "🔒 Zone Parents" [level=2] [ref=e32]
      - generic "Étape 1 sur 3" [ref=e33]
      - paragraph [ref=e37]: Trouve le parent de ce mignon lionceau !
      - generic "Lionceau" [ref=e39]:
        - generic [ref=e40]: 🦁
        - generic [ref=e41]: Lionceau
      - generic [ref=e42]:
        - button "Ours" [ref=e43] [cursor=pointer]:
          - generic [ref=e44]: 🐻
          - generic [ref=e45]: Ours
        - button "Lion" [ref=e46] [cursor=pointer]:
          - generic [ref=e47]: 🦁
          - generic [ref=e48]: Lion
        - button "Loup" [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: 🐺
          - generic [ref=e51]: Loup
    - generic [ref=e53]:
      - navigation "Navigation par thèmes" [ref=e54]:
        - list [ref=e55]:
          - listitem [ref=e56]:
            - button "Aller à la section Animaux" [ref=e57] [cursor=pointer]:
              - generic [ref=e58]: 🦁
              - generic: Animaux
          - listitem [ref=e59]:
            - button "Aller à la section Espace" [ref=e60] [cursor=pointer]:
              - generic [ref=e61]: 🚀
              - generic: Espace
          - listitem [ref=e62]:
            - button "Aller à la section Dinosaures REX" [ref=e63] [cursor=pointer]:
              - generic [ref=e64]: 🦖
              - generic: Dinosaures REX
          - listitem [ref=e65]:
            - button "Aller à la section Corps Humain" [ref=e66] [cursor=pointer]:
              - generic [ref=e67]: 🧠
              - generic: Corps Humain
          - listitem [ref=e68]:
            - button "Aller à la section Nature" [ref=e69] [cursor=pointer]:
              - generic [ref=e70]: 🌿
              - generic: Nature
          - listitem [ref=e71]:
            - button "Aller à la section Histoire" [ref=e72] [cursor=pointer]:
              - generic [ref=e73]: 🏺
              - generic: Histoire
          - listitem [ref=e74]:
            - button "Aller à la section Géographie" [ref=e75] [cursor=pointer]:
              - generic [ref=e76]: 🌍
              - generic: Géographie
          - listitem [ref=e77]:
            - button "Aller à la section Inventions" [ref=e78] [cursor=pointer]:
              - generic [ref=e79]: 💡
              - generic: Inventions
          - listitem [ref=e80]:
            - button "Aller à la section Arts & Culture" [ref=e81] [cursor=pointer]:
              - generic [ref=e82]: 🎨
              - generic: Arts & Culture
          - listitem [ref=e83]:
            - button "Aller à la section Pourquoi ?" [ref=e84] [cursor=pointer]:
              - generic [ref=e85]: ❓
              - generic: Pourquoi ?
      - generic [ref=e93]:
        - heading "Bonsoir !" [level=1] [ref=e94]
        - paragraph [ref=e95]: Il fait beau... c'est une belle journée pour apprendre et s'amuser ! ✨
      - 'link "Voir mes médailles. Progression : 0 pour cent. Total XP : 0" [ref=e97] [cursor=pointer]':
        - /url: /gallery
        - generic [ref=e98]:
          - generic [ref=e99]: 🏆
          - generic [ref=e100]: "0"
          - generic [ref=e101]: Médailles
        - generic [ref=e103]:
          - generic [ref=e104]: 🎫
          - generic [ref=e105]: "0"
          - generic [ref=e106]: Tickets QC
        - generic [ref=e108]:
          - generic [ref=e109]: ⚡
          - generic [ref=e110]: "0"
          - generic [ref=e111]: XP
        - generic [ref=e114]: 0%
      - generic [ref=e117]:
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e118] [cursor=pointer]:
          - img [ref=e120]
          - generic [ref=e122]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e123]
            - paragraph [ref=e124]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e125] [cursor=pointer]:
          - img [ref=e127]
          - generic [ref=e129]:
            - heading "La Carte aux Trésors" [level=3] [ref=e130]
            - paragraph [ref=e131]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e132] [cursor=pointer]:
          - img [ref=e134]
          - generic [ref=e136]:
            - heading "Mission Safari" [level=3] [ref=e137]
            - paragraph [ref=e138]: Survis à la savane et gagne le trésor !
        - button "Le Grand Quiz des Champions Minuteur de folie, confettis et trophée doré ! 🏆" [ref=e139] [cursor=pointer]:
          - img [ref=e141]
          - generic [ref=e143]:
            - heading "Le Grand Quiz des Champions" [level=3] [ref=e144]
            - paragraph [ref=e145]: Minuteur de folie, confettis et trophée doré ! 🏆
        - button "Mon Dico Magique 📖 Clique sur le hibou pour m'écouter ! 🦉" [ref=e146] [cursor=pointer]:
          - img [ref=e148]
          - generic [ref=e150]:
            - heading "Mon Dico Magique 📖" [level=3] [ref=e151]
            - paragraph [ref=e152]: Clique sur le hibou pour m'écouter ! 🦉
      - generic [ref=e153]:
        - generic [ref=e154]:
          - button "Le Lion. Le roi de la savane." [ref=e156] [cursor=pointer]:
            - generic:
              - generic: Animaux
              - heading "Le Lion" [level=3]
              - paragraph: Le roi de la savane.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🦁
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique.. Verrouillé" [ref=e158] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [ref=e160] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
        - button "Voir plus ➔" [ref=e162] [cursor=pointer]
      - generic [ref=e163]:
        - generic [ref=e164]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e166] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [ref=e168] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [ref=e170] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e172] [cursor=pointer]
      - generic [ref=e173]:
        - generic [ref=e174]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e176] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [ref=e178] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [ref=e180] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e182] [cursor=pointer]
      - generic [ref=e183]:
        - generic [ref=e184]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e186] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [ref=e188] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [ref=e190] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e192] [cursor=pointer]
      - generic [ref=e193]:
        - generic [ref=e194]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e196] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [ref=e198] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [ref=e200] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e202] [cursor=pointer]
      - generic [ref=e203]:
        - generic [ref=e204]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e206] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [ref=e208] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [ref=e210] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e212] [cursor=pointer]
      - generic [ref=e213]:
        - generic [ref=e214]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e216] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [ref=e218] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [ref=e220] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e222] [cursor=pointer]
      - generic [ref=e223]:
        - generic [ref=e224]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e226] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [ref=e228] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [ref=e230] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e232] [cursor=pointer]
      - generic [ref=e233]:
        - generic [ref=e234]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e236] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [ref=e238] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [ref=e240] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e242] [cursor=pointer]
      - generic [ref=e243]:
        - generic [ref=e244]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e246] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [ref=e248] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [ref=e250] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e252] [cursor=pointer]
    - generic [ref=e253]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('simulate hover and check flash', async ({ page }) => {
  4  |   page.on('console', msg => {
  5  |     console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
  6  |   });
  7  | 
  8  |   page.on('pageerror', err => {
  9  |     console.log(`BROWSER EXCEPTION: ${err.message}`);
  10 |   });
  11 | 
  12 |   await page.goto('http://localhost:5174/');
  13 | 
  14 |   // Create profile
  15 |   await page.getByTestId('profile-name-input').fill('StarBoy');
  16 |   await page.getByText('👦 Garçon').click();
  17 |   await page.getByRole('button', { name: /parti/i }).click();
  18 |   await page.waitForTimeout(1000);
  19 | 
  20 |   // Go to flow
  21 |   await page.getByTestId('header-parents-btn').click();
  22 |   // Solve gate
  23 |   const correctEmojis = new Set(['🐕', '🐔', '🦁', '🐈', '🍎', '🥦', '🥑', '🥒', '⛵', '🦅', '🔥', '🌙', '🔴', '❄️', '⬇️', '🌊', '🌵', '🌳']);
  24 |   for (let step = 0; step < 3; step++) {
  25 |     await page.waitForTimeout(1000);
  26 |     const buttons = page.locator('button[class*="puzzleCard"]');
  27 |     const count = await buttons.count();
  28 |     for (let i = 0; i < count; i++) {
  29 |       const btn = buttons.nth(i);
  30 |       const text = await btn.innerText();
  31 |       const emoji = text.split('\n')[0]?.trim();
  32 |       if (emoji && correctEmojis.has(emoji)) {
  33 |         await btn.click();
  34 |         break;
  35 |       }
  36 |     }
  37 |   }
  38 | 
  39 |   // Nav to tech
> 40 |   await page.locator('button:has-text("Technical Space"), button:has-text("Espace Technique")').click();
     |                                                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  41 |   // Click flow
  42 |   await page.locator('div[class*="developerCard"] button').first().click();
  43 |   await page.waitForURL('**/parents/flow');
  44 | 
  45 |   // Go to Code tab
  46 |   await page.locator('button:has-text("Dépendances du Code"), button:has-text("Dépendances du code")').click();
  47 |   await page.waitForTimeout(4000);
  48 | 
  49 |   // Hover over the first node
  50 |   const nodes = page.locator('.react-flow__node');
  51 |   const count = await nodes.count();
  52 |   console.log(`DOM NODE COUNT: ${count}`);
  53 | 
  54 |   if (count > 0) {
  55 |     const firstNode = nodes.first();
  56 |     const text = await firstNode.innerText();
  57 |     console.log(`Hovering over: ${text.replace(/\n/g, ' ')}`);
  58 |     await firstNode.hover();
  59 |     await page.waitForTimeout(2000);
  60 |     console.log("Hover complete, checking for errors...");
  61 |   }
  62 | });
  63 | 
```