# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: multi-profile.spec.ts >> Gestion Multi-Profils >> devrait isoler les données entre deux profils différents
- Location: tests-e2e/multi-profile.spec.ts:4:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 60000ms exceeded.
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
          - generic "Alice" [ref=e20]:
            - img "Alice" [ref=e23]
            - generic "Chapeau de Brousse" [ref=e24]:
              - generic [ref=e26]: 🤠
        - button "Passer en mode garçon" [ref=e27] [cursor=pointer]: 👧
        - button "🌌 Espace" [ref=e28] [cursor=pointer]: 🌙
        - button "Arrêter" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: 🔊
  - main [ref=e31]:
    - generic:
      - generic [ref=e32] [cursor=pointer]:
        - generic [ref=e33]: 🥇
        - generic [ref=e34]:
          - generic [ref=e35]: Nouvelle Médaille ! 🎖️
          - generic [ref=e36]: "Le Lion : OR"
        - button "✕" [ref=e37]
      - generic [ref=e38] [cursor=pointer]:
        - generic [ref=e39]: 🧭
        - generic [ref=e40]:
          - generic [ref=e41]: Nouveau Rang ! 🌟
          - generic [ref=e42]: Félicitations ! Tu es maintenant Exploratrice !
        - button "✕" [ref=e43]
      - generic [ref=e44] [cursor=pointer]:
        - generic [ref=e45]: 🤠
        - generic [ref=e46]:
          - generic [ref=e47]: Nouvel objet ! 🎁
          - generic [ref=e48]: "Bravo ! Tu as débloqué : Chapeau de Brousse"
        - button "✕" [ref=e49]
    - generic [ref=e51]:
      - navigation "Navigation par thèmes" [ref=e52]:
        - list [ref=e53]:
          - listitem [ref=e54]:
            - button "Aller à la section Animaux" [ref=e55] [cursor=pointer]:
              - generic [ref=e56]: 🦁
              - generic: Animaux
          - listitem [ref=e57]:
            - button "Aller à la section Espace" [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: 🚀
              - generic: Espace
          - listitem [ref=e60]:
            - button "Aller à la section Dinosaures REX" [ref=e61] [cursor=pointer]:
              - generic [ref=e62]: 🦖
              - generic: Dinosaures REX
          - listitem [ref=e63]:
            - button "Aller à la section Corps Humain" [ref=e64] [cursor=pointer]:
              - generic [ref=e65]: 🧠
              - generic: Corps Humain
          - listitem [ref=e66]:
            - button "Aller à la section Nature" [ref=e67] [cursor=pointer]:
              - generic [ref=e68]: 🌿
              - generic: Nature
          - listitem [ref=e69]:
            - button "Aller à la section Histoire" [ref=e70] [cursor=pointer]:
              - generic [ref=e71]: 🏺
              - generic: Histoire
          - listitem [ref=e72]:
            - button "Aller à la section Géographie" [ref=e73] [cursor=pointer]:
              - generic [ref=e74]: 🌍
              - generic: Géographie
          - listitem [ref=e75]:
            - button "Aller à la section Inventions" [ref=e76] [cursor=pointer]:
              - generic [ref=e77]: 💡
              - generic: Inventions
          - listitem [ref=e78]:
            - button "Aller à la section Arts & Culture" [ref=e79] [cursor=pointer]:
              - generic [ref=e80]: 🎨
              - generic: Arts & Culture
          - listitem [ref=e81]:
            - button "Aller à la section Pourquoi ?" [ref=e82] [cursor=pointer]:
              - generic [ref=e83]: ❓
              - generic: Pourquoi ?
      - generic [ref=e91]:
        - heading "Bonsoir !" [level=1] [ref=e92]
        - paragraph [ref=e93]: Il fait beau... c'est une belle journée pour apprendre et s'amuser ! ✨
      - 'link "Voir mes médailles. Progression : 1 pour cent. Total XP : 1500" [ref=e95] [cursor=pointer]':
        - /url: /gallery
        - generic [ref=e96]:
          - generic [ref=e97]: 🏆
          - generic [ref=e98]: "1"
          - generic [ref=e99]: Médailles
        - generic [ref=e101]:
          - generic [ref=e102]: 🎫
          - generic [ref=e103]: "3"
          - generic [ref=e104]: Tickets QC
        - generic [ref=e106]:
          - generic [ref=e107]: ⚡
          - generic [ref=e108]: 1.5k
          - generic [ref=e109]: XP
        - generic [ref=e112]: 1%
      - generic [ref=e116]:
        - button "Le Grand Voyage du Temps D'où viennent les maths et l'univers ?" [ref=e117] [cursor=pointer]:
          - img [ref=e119]
          - generic [ref=e121]:
            - heading "Le Grand Voyage du Temps" [level=3] [ref=e122]
            - paragraph [ref=e123]: D'où viennent les maths et l'univers ?
        - button "La Carte aux Trésors Explore les animaux et monuments du monde !" [ref=e124] [cursor=pointer]:
          - img [ref=e126]
          - generic [ref=e128]:
            - heading "La Carte aux Trésors" [level=3] [ref=e129]
            - paragraph [ref=e130]: Explore les animaux et monuments du monde !
        - button "Mission Safari Survis à la savane et gagne le trésor !" [ref=e131] [cursor=pointer]:
          - img [ref=e133]
          - generic [ref=e135]:
            - heading "Mission Safari" [level=3] [ref=e136]
            - paragraph [ref=e137]: Survis à la savane et gagne le trésor !
        - button "Le Grand Quiz des Champions Minuteur de folie, confettis et trophée doré ! 🏆" [ref=e138] [cursor=pointer]:
          - img [ref=e140]
          - generic [ref=e142]:
            - heading "Le Grand Quiz des Champions" [level=3] [ref=e143]
            - paragraph [ref=e144]: Minuteur de folie, confettis et trophée doré ! 🏆
        - button "Mon Dico Magique 📖 Clique sur le hibou pour m'écouter ! 🦉" [ref=e145] [cursor=pointer]:
          - img [ref=e147]
          - generic [ref=e149]:
            - heading "Mon Dico Magique 📖" [level=3] [ref=e150]
            - paragraph [ref=e151]: Clique sur le hibou pour m'écouter ! 🦉
      - generic [ref=e152]:
        - generic [ref=e153]:
          - button "Le Lion. Le roi de la savane.. Médaille obtenue" [ref=e155] [cursor=pointer]:
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
          - button "L'Éléphant. Le plus gros animal terrestre avec une trompe magique." [ref=e157] [cursor=pointer]:
            - generic:
              - heading "L'Éléphant" [level=3]
              - paragraph: Le plus gros animal terrestre avec une trompe magique.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🐘
          - button "Le Tigre. Le plus grand de tous les félins avec de belles rayures.. Verrouillé" [ref=e159] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tigre" [level=3]
              - paragraph: Le plus grand de tous les félins avec de belles rayures.
            - generic:
              - generic: 🐯
          - button "Le Singe. Un animal très agile qui adore grimper partout.. Verrouillé" [ref=e161] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Singe" [level=3]
              - paragraph: Un animal très agile qui adore grimper partout.
            - generic:
              - generic: 🐒
          - button "Le Lapin. Un petit animal tout doux avec de longues oreilles.. Verrouillé" [ref=e163] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Lapin" [level=3]
              - paragraph: Un petit animal tout doux avec de longues oreilles.
            - generic:
              - generic: 🐰
          - button "La Tortue. Un animal tranquille qui porte sa maison sur son dos.. Verrouillé" [ref=e165] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Tortue" [level=3]
              - paragraph: Un animal tranquille qui porte sa maison sur son dos.
            - generic:
              - generic: 🐢
          - button "Le Kangourou. Le champion du saut qui a une poche magique.. Verrouillé" [ref=e167] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Kangourou" [level=3]
              - paragraph: Le champion du saut qui a une poche magique.
            - generic:
              - generic: 🦘
          - button "Le Dauphin. Un animal très intelligent qui vit dans l'eau.. Verrouillé" [ref=e169] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Dauphin" [level=3]
              - paragraph: Un animal très intelligent qui vit dans l'eau.
            - generic:
              - generic: 🐬
          - button "La Girafe. Le plus grand animal du monde avec un cou immense.. Verrouillé" [ref=e171] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Girafe" [level=3]
              - paragraph: Le plus grand animal du monde avec un cou immense.
            - generic:
              - generic: 🦒
          - button "Le Panda. Un gros ours noir et blanc qui adore le bambou.. Verrouillé" [ref=e173] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Panda" [level=3]
              - paragraph: Un gros ours noir et blanc qui adore le bambou.
            - generic:
              - generic: 🐼
          - button "Le Manchot. Un oiseau qui ne vole pas mais nage super bien.. Verrouillé" [ref=e175] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Manchot" [level=3]
              - paragraph: Un oiseau qui ne vole pas mais nage super bien.
            - generic:
              - generic: 🐧
          - button "Le Loup. L'ancêtre sauvage du chien qui hurle à la lune.. Verrouillé" [ref=e177] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Loup" [level=3]
              - paragraph: L'ancêtre sauvage du chien qui hurle à la lune.
            - generic:
              - generic: 🐺
          - button "Méduses et Éponges. Des animaux tout mous et sans squelette !. Verrouillé" [ref=e179] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Méduses et Éponges" [level=3]
              - paragraph: Des animaux tout mous et sans squelette !
            - generic:
              - generic: 🪼
          - button "Les Trilobites. Les rois du fond des mers préhistoriques !. Verrouillé" [ref=e181] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Trilobites" [level=3]
              - paragraph: Les rois du fond des mers préhistoriques !
            - generic:
              - generic: 🐚
          - button "Vers marins. De petits explorateurs du sable sous-marin !. Verrouillé" [ref=e183] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vers marins" [level=3]
              - paragraph: De petits explorateurs du sable sous-marin !
            - generic:
              - generic: 🪱
          - button "Coquillages primitifs. Les premières maisons solides des petits animaux !. Verrouillé" [ref=e185] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Coquillages primitifs" [level=3]
              - paragraph: Les premières maisons solides des petits animaux !
            - generic:
              - generic: 🐚
          - button "Anomalocaris. Le tout premier super-chasseur de l'océan !. Verrouillé" [ref=e187] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Anomalocaris" [level=3]
              - paragraph: Le tout premier super-chasseur de l'océan !
            - generic:
              - generic: 🦂
          - button "Poissons sans mâchoires. Les tout premiers poissons de la Terre !. Verrouillé" [ref=e189] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Poissons sans mâchoires" [level=3]
              - paragraph: Les tout premiers poissons de la Terre !
            - generic:
              - generic: 🐟
          - button "Poissons à écailles. Les rois de l'agilité et de la vitesse sous l'eau !. Verrouillé" [ref=e191] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Poissons à écailles" [level=3]
              - paragraph: Les rois de l'agilité et de la vitesse sous l'eau !
            - generic:
              - generic: 🐠
          - button "Sortie des eaux. Les premiers poissons qui apprennent à ramper sur terre !. Verrouillé" [ref=e193] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Sortie des eaux" [level=3]
              - paragraph: Les premiers poissons qui apprennent à ramper sur terre !
            - generic:
              - generic: 🐟🦵
          - button "Insectes géants. Des libellules de la taille d'un aigle !. Verrouillé" [ref=e195] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Insectes géants" [level=3]
              - paragraph: Des libellules de la taille d'un aigle !
            - generic:
              - generic: 🐜
          - button "Peau de Reptile. Une armure d'écailles pour vivre au grand soleil !. Verrouillé" [ref=e197] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Peau de Reptile" [level=3]
              - paragraph: Une armure d'écailles pour vivre au grand soleil !
            - generic:
              - generic: 🦎
          - button "L'œuf solide. Une petite piscine privée pour le bébé !. Verrouillé" [ref=e199] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'œuf solide" [level=3]
              - paragraph: Une petite piscine privée pour le bébé !
            - generic:
              - generic: 🥚
        - button "Voir moins" [ref=e201] [cursor=pointer]
      - generic [ref=e202]:
        - generic [ref=e203]:
          - button "Le Soleil. L'étoile au centre de notre système." [ref=e205] [cursor=pointer]:
            - generic:
              - generic: Espace
              - heading "Le Soleil" [level=3]
              - paragraph: L'étoile au centre de notre système.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: ☀️
          - button "Mercure. La petite planète proche du Soleil.. Verrouillé" [ref=e207] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercure" [level=3]
              - paragraph: La petite planète proche du Soleil.
            - generic:
              - generic: 🌑
          - button "Vénus. La planète la plus chaude de toutes.. Verrouillé" [ref=e209] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Vénus" [level=3]
              - paragraph: La planète la plus chaude de toutes.
            - generic:
              - generic: ☁️
        - button "Voir plus ➔" [ref=e211] [cursor=pointer]
      - generic [ref=e212]:
        - generic [ref=e213]:
          - button "Le T-Rex. Le plus célèbre des dinosaures." [ref=e215] [cursor=pointer]:
            - generic:
              - generic: Dinosaures REX
              - heading "Le T-Rex" [level=3]
              - paragraph: Le plus célèbre des dinosaures.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: REX
          - button "Le Tricératops. Le dinosaure à trois cornes.. Verrouillé" [ref=e217] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Tricératops" [level=3]
              - paragraph: Le dinosaure à trois cornes.
            - generic:
              - generic: 🦕
          - button "Le Stégosaure. Le dinosaure avec des plaques sur le dos.. Verrouillé" [ref=e219] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Stégosaure" [level=3]
              - paragraph: Le dinosaure avec des plaques sur le dos.
            - generic:
              - generic: 🛡️
        - button "Voir plus ➔" [ref=e221] [cursor=pointer]
      - generic [ref=e222]:
        - generic [ref=e223]:
          - button "Le Cerveau. L'ordinateur super puissant de ton corps." [ref=e225] [cursor=pointer]:
            - generic:
              - generic: Corps Humain
              - heading "Le Cerveau" [level=3]
              - paragraph: L'ordinateur super puissant de ton corps.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧠
          - button "Le Cœur. La pompe qui fait voyager ton sang.. Verrouillé" [ref=e227] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cœur" [level=3]
              - paragraph: La pompe qui fait voyager ton sang.
            - generic:
              - generic: ❤️
          - button "Le Sang. Le train qui transporte tout dans ton corps.. Verrouillé" [ref=e229] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Sang" [level=3]
              - paragraph: Le train qui transporte tout dans ton corps.
            - generic:
              - generic: 🩸
        - button "Voir plus ➔" [ref=e231] [cursor=pointer]
      - generic [ref=e232]:
        - generic [ref=e233]:
          - button "Les Arbres. Les poumons de la Terre." [ref=e235] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Les Arbres" [level=3]
              - paragraph: Les poumons de la Terre.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌳
          - button "Le Volcan. Une montagne qui crache du feu.. Verrouillé" [ref=e237] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Volcan" [level=3]
              - paragraph: Une montagne qui crache du feu.
            - generic:
              - generic: 🌋
          - button "La Pluie. De l'eau qui tombe des nuages.. Verrouillé" [ref=e239] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Pluie" [level=3]
              - paragraph: De l'eau qui tombe des nuages.
            - generic:
              - generic: 🌧️
        - button "Voir plus ➔" [ref=e241] [cursor=pointer]
      - generic [ref=e242]:
        - generic [ref=e243]:
          - button "Les Pyramides. D'immenses tombeaux pour les pharaons d'Égypte." [ref=e245] [cursor=pointer]:
            - generic:
              - generic: Histoire
              - heading "Les Pyramides" [level=3]
              - paragraph: D'immenses tombeaux pour les pharaons d'Égypte.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🧱
          - button "Les Chevaliers. De courageux guerriers du Moyen Âge avec des armures.. Verrouillé" [ref=e247] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Chevaliers" [level=3]
              - paragraph: De courageux guerriers du Moyen Âge avec des armures.
            - generic:
              - generic: 🛡️
          - button "Les Vikings. De grands navigateurs venus du Nord.. Verrouillé" [ref=e249] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Les Vikings" [level=3]
              - paragraph: De grands navigateurs venus du Nord.
            - generic:
              - generic: 🛶
        - button "Voir plus ➔" [ref=e251] [cursor=pointer]
      - generic [ref=e252]:
        - generic [ref=e253]:
          - button "La Tour Eiffel. Une immense tour de fer située à Paris." [ref=e255] [cursor=pointer]:
            - generic:
              - generic: Géographie
              - heading "La Tour Eiffel" [level=3]
              - paragraph: Une immense tour de fer située à Paris.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🗼
          - button "L'Amazonie. La plus grande forêt tropicale du monde.. Verrouillé" [ref=e257] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Amazonie" [level=3]
              - paragraph: La plus grande forêt tropicale du monde.
            - generic:
              - generic: 🌴
          - button "Le Mont Everest. Le toit du monde, la plus haute montagne.. Verrouillé" [ref=e259] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Mont Everest" [level=3]
              - paragraph: Le toit du monde, la plus haute montagne.
            - generic:
              - generic: 🏔️
        - button "Voir plus ➔" [ref=e261] [cursor=pointer]
      - generic [ref=e262]:
        - generic [ref=e263]:
          - button "L'Ampoule. Une petite boule de verre qui nous donne de la lumière." [ref=e265] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "L'Ampoule" [level=3]
              - paragraph: Une petite boule de verre qui nous donne de la lumière.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 💡
          - button "L'Imprimerie. Une machine pour copier les livres rapidement.. Verrouillé" [ref=e267] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Imprimerie" [level=3]
              - paragraph: Une machine pour copier les livres rapidement.
            - generic:
              - generic: 📚
          - button "L'Avion. Une machine incroyable qui peut voler comme un oiseau.. Verrouillé" [ref=e269] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "L'Avion" [level=3]
              - paragraph: Une machine incroyable qui peut voler comme un oiseau.
            - generic:
              - generic: ✈️
        - button "Voir plus ➔" [ref=e271] [cursor=pointer]
      - generic [ref=e272]:
        - generic [ref=e273]:
          - button "La Peinture. Créer des images magnifiques avec de la couleur." [ref=e275] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "La Peinture" [level=3]
              - paragraph: Créer des images magnifiques avec de la couleur.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🖌️
          - button "La Musique. Organiser des sons pour créer de belles chansons.. Verrouillé" [ref=e277] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "La Musique" [level=3]
              - paragraph: Organiser des sons pour créer de belles chansons.
            - generic:
              - generic: 🎵
          - button "Le Cinéma. Raconter des histoires avec des images qui bougent.. Verrouillé" [ref=e279] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Le Cinéma" [level=3]
              - paragraph: Raconter des histoires avec des images qui bougent.
            - generic:
              - generic: 🎬
        - button "Voir plus ➔" [ref=e281] [cursor=pointer]
      - generic [ref=e282]:
        - generic [ref=e283]:
          - button "Pourquoi le ciel est bleu ?. Le secret de la couleur du ciel." [ref=e285] [cursor=pointer]:
            - generic:
              - generic: Pourquoi ?
              - heading "Pourquoi le ciel est bleu ?" [level=3]
              - paragraph: Le secret de la couleur du ciel.
              - generic:
                - generic: Explorer →
            - generic:
              - generic: 🌤️
          - button "Pourquoi la mer est salée ?. Le secret du goût de l'eau des océans.. Verrouillé" [ref=e287] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Pourquoi la mer est salée ?" [level=3]
              - paragraph: Le secret du goût de l'eau des océans.
            - generic:
              - generic: 🌊
          - button "Comment se forme l'arc-en-ciel ?. Un pont de couleurs dans le ciel.. Verrouillé" [ref=e289] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Comment se forme l'arc-en-ciel ?" [level=3]
              - paragraph: Un pont de couleurs dans le ciel.
            - generic:
              - generic: 🌈
        - button "Voir plus ➔" [ref=e291] [cursor=pointer]
    - generic [ref=e292]:
      - generic [ref=e293]: L'application est prête à être utilisée hors-ligne ! 🚀
      - button "Fermer" [ref=e295] [cursor=pointer]
    - generic [ref=e296]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Gestion Multi-Profils', () => {
  4  |   test('devrait isoler les données entre deux profils différents', async ({ page }) => {
  5  |     // Augmenter le timeout pour ce long test multi-étape sur WebKit
  6  |     test.setTimeout(60000);
  7  | 
  8  |     // 1. Création du profil d'Alice
  9  |     await page.goto('/');
  10 |     await page.evaluate(() => localStorage.clear());
  11 |     await page.reload();
  12 |     
  13 |     await page.getByTestId('profile-name-input').fill('Alice');
  14 |     await page.getByText('👧 Fille').click();
  15 |     await page.getByRole('button', { name: /C'est parti/i }).click();
  16 |     await expect(page.getByTestId('profile-overlay')).toBeHidden();
  17 | 
  18 |     // 2. Alice gagne une médaille (Lion)
  19 |     await page.getByTestId('topic-card-lion').click();
  20 |     await expect(page.getByTestId('quiz-question')).toBeVisible();
  21 |     await expect(page.getByTestId('quiz-option-1')).toBeVisible();
  22 |     await page.getByTestId('quiz-option-1').click();
  23 |     await page.getByRole('button', { name: /fini/i }).click({ force: true });
  24 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
  25 | 
  26 |     // 3. Création du profil de Bob
  27 |     await page.waitForTimeout(1000); // Attendre la fin de la transition de retour au hub
  28 |     await expect(page.getByTestId('header-profile-btn')).toBeVisible();
> 29 |     await page.waitForTimeout(500); // Laisser React attacher les écouteurs
     |                ^ Error: page.waitForTimeout: Test timeout of 60000ms exceeded.
  30 |     await page.getByTestId('header-profile-btn').click({ force: true });
  31 |     
  32 |     await expect(page.getByTestId('add-profile-btn')).toBeVisible();
  33 |     await page.getByTestId('add-profile-btn').click();
  34 |     
  35 |     await page.getByTestId('profile-name-input').fill('Bob');
  36 |     await page.getByText('👦 Garçon').click({ force: true });
  37 |     await page.getByRole('button', { name: /C'est parti/i }).click({ force: true });
  38 |     await expect(page.getByTestId('profile-overlay')).toBeHidden();
  39 | 
  40 |     // 4. Vérifier que Bob a 0 médaille
  41 |     await expect(page.getByTestId('medal-count')).toHaveText('0');
  42 |     await expect(page.getByAltText('Bob')).toBeVisible();
  43 | 
  44 |     // 5. Repasser sur Alice
  45 |     await page.waitForTimeout(500); // Attendre la fin de la disparition de l'overlay de profil
  46 |     await expect(page.getByTestId('header-profile-btn')).toBeVisible();
  47 |     await page.waitForTimeout(500); // Laisser React attacher les écouteurs
  48 |     await page.getByTestId('header-profile-btn').click({ force: true });
  49 |     await expect(page.getByTestId('main-title')).toBeVisible();
  50 |     
  51 |     await page.getByTestId('profile-card-Alice').click();
  52 |     await expect(page.getByTestId('profile-overlay')).toBeHidden();
  53 | 
  54 |     // 6. Vérifier qu'Alice a retrouvé sa médaille
  55 |     await expect(page.getByAltText('Alice')).toBeVisible();
  56 |     await expect(page.getByTestId('medal-count')).toHaveText('1');
  57 |   });
  58 | });
  59 | 
```