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
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('topic-card-lion').getByTestId('medal-badge')
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('topic-card-lion').getByTestId('medal-badge')

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
        - button "Mon Dico Magique 📖 Clique sur le hibou pour m'écouter ! 🦉" [ref=e127] [cursor=pointer]:
          - img [ref=e129]
          - generic [ref=e131]:
            - heading "Mon Dico Magique 📖" [level=3] [ref=e132]
            - paragraph [ref=e133]: Clique sur le hibou pour m'écouter ! 🦉
      - generic [ref=e134]:
        - generic [ref=e135]:
          - button "Le Lion. Le roi de la savane.. Médaille obtenue" [ref=e137] [cursor=pointer]:
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
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique." [ref=e139] [cursor=pointer]:
            - generic:
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [ref=e141] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
          - button "Le Singe. Un animal très agile qui adore grimper partout.. Verrouillé" [ref=e143] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Singe" [level=3]
              - paragraph: Un animal très agile qui adore grimper partout.
            - generic:
              - generic: 🐒
          - button "Le Lapin. Un petit animal tout doux avec de longues oreilles.. Verrouillé" [ref=e145] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Lapin" [level=3]
              - paragraph: Un petit animal tout doux avec de longues oreilles.
            - generic:
              - generic: 🐰
          - button "La Tortue. Un animal tranquille qui porte sa maison sur son dos.. Verrouillé" [ref=e147] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Tortue" [level=3]
              - paragraph: Un animal tranquille qui porte sa maison sur son dos.
            - generic:
              - generic: 🐢
          - button "Le Kangourou. Le champion du saut qui a une poche magique.. Verrouillé" [ref=e149] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Kangourou" [level=3]
              - paragraph: Le champion du saut qui a une poche magique.
            - generic:
              - generic: 🦘
          - button "Le Dauphin. Un animal très intelligent qui vit dans l'eau.. Verrouillé" [ref=e151] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Dauphin" [level=3]
              - paragraph: Un animal très intelligent qui vit dans l'eau.
            - generic:
              - generic: 🐬
          - button "La Girafe. Le plus grand animal du monde avec un cou immense.. Verrouillé" [ref=e153] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Girafe" [level=3]
              - paragraph: Le plus grand animal du monde avec un cou immense.
            - generic:
              - generic: 🦒
          - button "Le Panda. Un gros ours noir et blanc qui adore le bambou.. Verrouillé" [ref=e155] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Panda" [level=3]
              - paragraph: Un gros ours noir et blanc qui adore le bambou.
            - generic:
              - generic: 🐼
          - button "Le Manchot. Un oiseau qui ne vole pas mais nage super bien.. Verrouillé" [ref=e157] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Manchot" [level=3]
              - paragraph: Un oiseau qui ne vole pas mais nage super bien.
            - generic:
              - generic: 🐧
          - button "Le Loup. L'ancêtre sauvage du chien qui hurle à la lune.. Verrouillé" [ref=e159] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Loup" [level=3]
              - paragraph: L'ancêtre sauvage du chien qui hurle à la lune.
            - generic:
              - generic: 🐺
          - button "Méduses et Éponges. Des animaux tout mous et sans squelette !. Verrouillé" [ref=e161] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Méduses et Éponges" [level=3]
              - paragraph: Des animaux tout mous et sans squelette !
            - generic:
              - generic: 🪼
          - button "Les Trilobites. Les rois du fond des mers préhistoriques !. Verrouillé" [ref=e163] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Trilobites" [level=3]
              - paragraph: Les rois du fond des mers préhistoriques !
            - generic:
              - generic: 🐚
          - button "Vers marins. De petits explorateurs du sable sous-marin !. Verrouillé" [ref=e165] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vers marins" [level=3]
              - paragraph: De petits explorateurs du sable sous-marin !
            - generic:
              - generic: 🪱
          - button "Coquillages primitifs. Les premières maisons solides des petits animaux !. Verrouillé" [ref=e167] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Coquillages primitifs" [level=3]
              - paragraph: Les premières maisons solides des petits animaux !
            - generic:
              - generic: 🐚
          - button "Anomalocaris. Le tout premier super-chasseur de l'océan !. Verrouillé" [ref=e169] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Anomalocaris" [level=3]
              - paragraph: Le tout premier super-chasseur de l'océan !
            - generic:
              - generic: 🦂
          - button "Poissons sans mâchoires. Les tout premiers poissons de la Terre !. Verrouillé" [ref=e171] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Poissons sans mâchoires" [level=3]
              - paragraph: Les tout premiers poissons de la Terre !
            - generic:
              - generic: 🐟
          - button "Poissons à écailles. Les rois de l'agilité et de la vitesse sous l'eau !. Verrouillé" [ref=e173] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Poissons à écailles" [level=3]
              - paragraph: Les rois de l'agilité et de la vitesse sous l'eau !
            - generic:
              - generic: 🐠
          - button "Sortie des eaux. Les premiers poissons qui apprennent à ramper sur terre !. Verrouillé" [ref=e175] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Sortie des eaux" [level=3]
              - paragraph: Les premiers poissons qui apprennent à ramper sur terre !
            - generic:
              - generic: 🐟🦵
          - button "Insectes géants. Des libellules de la taille d'un aigle !. Verrouillé" [ref=e177] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Insectes géants" [level=3]
              - paragraph: Des libellules de la taille d'un aigle !
            - generic:
              - generic: 🐜
          - button "Peau de Reptile. Une armure d'écailles pour vivre au grand soleil !. Verrouillé" [ref=e179] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Peau de Reptile" [level=3]
              - paragraph: Une armure d'écailles pour vivre au grand soleil !
            - generic:
              - generic: 🦎
          - button "L'œuf solide. Une petite piscine privée pour le bébé !. Verrouillé" [ref=e181] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'œuf solide" [level=3]
              - paragraph: Une petite piscine privée pour le bébé !
            - generic:
              - generic: 🥚
        - button "Voir moins" [ref=e183] [cursor=pointer]
      - generic [ref=e184]:
        - generic [ref=e185]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e187] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [ref=e189] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [ref=e191] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e193] [cursor=pointer]
      - generic [ref=e194]:
        - generic [ref=e195]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e197] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [ref=e199] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [ref=e201] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e203] [cursor=pointer]
      - generic [ref=e204]:
        - generic [ref=e205]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e207] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [ref=e209] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [ref=e211] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e213] [cursor=pointer]
      - generic [ref=e214]:
        - generic [ref=e215]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e217] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [ref=e219] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [ref=e221] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e223] [cursor=pointer]
      - generic [ref=e224]:
        - generic [ref=e225]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e227] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [ref=e229] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [ref=e231] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e233] [cursor=pointer]
      - generic [ref=e234]:
        - generic [ref=e235]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e237] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [ref=e239] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [ref=e241] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e243] [cursor=pointer]
      - generic [ref=e244]:
        - generic [ref=e245]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e247] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [ref=e249] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [ref=e251] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e253] [cursor=pointer]
      - generic [ref=e254]:
        - generic [ref=e255]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e257] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [ref=e259] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [ref=e261] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e263] [cursor=pointer]
      - generic [ref=e264]:
        - generic [ref=e265]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e267] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [ref=e269] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [ref=e271] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e273] [cursor=pointer]
    - generic [ref=e274]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
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
  17 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
  18 | 
  19 |     // 2. Action : Rechargement de la page
  20 |     await page.reload();
  21 | 
  22 |     // 3. Vérification : Les données doivent être toujours là
  23 |     await expect(page.getByAltText('Explorateur Persistant')).toBeVisible();
  24 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
> 25 |     await expect(page.getByTestId('topic-card-lion').getByTestId('medal-badge')).toBeVisible();
     |                                                                                  ^ Error: expect(locator).toBeVisible() failed
  26 |   });
  27 | });
  28 | 
```