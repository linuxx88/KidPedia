# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation et Boutons Accueil >> le dashboard (médailles/xp) devrait mener à la Galerie des Explorateurs
- Location: tests-e2e\navigation.spec.ts:44:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/gallery/
Received string:  "http://localhost:5173/badges"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "http://localhost:5173/badges"

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
      - generic [ref=e31]:
        - button "Retour" [ref=e33] [cursor=pointer]:
          - img [ref=e34]
          - text: Retour
        - generic [ref=e36]:
          - generic [ref=e37]: 🏆
          - heading "Ma Collection de Médailles 🏆" [level=1] [ref=e38]
        - button "Ouvrir les cadeaux" [ref=e40] [cursor=pointer]:
          - generic [ref=e41]:
            - img [ref=e42]: 🎁
            - generic [ref=e43]: Cadeaux
      - generic [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]: 🥇
            - text: "0"
          - generic [ref=e48]:
            - generic [ref=e49]: 🥈
            - text: "0"
          - generic [ref=e50]:
            - generic [ref=e51]: 🥉
            - text: "0"
        - generic [ref=e52]:
          - generic [ref=e53]:
            - generic [ref=e54]: 🌱
            - generic [ref=e55]:
              - paragraph [ref=e56]: "Rang : Apprenti"
              - paragraph [ref=e57]: Tes premiers pas dans le savoir !
          - generic [ref=e59]: 0 XP
          - paragraph [ref=e61]: Toutes ces silhouettes cachent des secrets... À toi de les découvrir !
          - button "🚀 Commencer l'aventure" [ref=e63] [cursor=pointer]:
            - generic [ref=e64]: 🚀
            - text: Commencer l'aventure
      - generic [ref=e65]:
        - button "Le Lion. Secret pas encore découvert." [ref=e66]:
          - generic [ref=e68]: 🦁
          - paragraph [ref=e69]: Le Lion
        - button "L'Éléphant. Secret pas encore découvert." [ref=e70]:
          - generic [ref=e72]: 🐘
          - paragraph [ref=e73]: L'Éléphant
        - button "Le Tigre. Secret pas encore découvert." [ref=e74]:
          - generic [ref=e76]: 🐯
          - paragraph [ref=e77]: Le Tigre
        - button "Le Singe. Secret pas encore découvert." [ref=e78]:
          - generic [ref=e80]: 🐒
          - paragraph [ref=e81]: Le Singe
        - button "Le Lapin. Secret pas encore découvert." [ref=e82]:
          - generic [ref=e84]: 🐰
          - paragraph [ref=e85]: Le Lapin
        - button "La Tortue. Secret pas encore découvert." [ref=e86]:
          - generic [ref=e88]: 🐢
          - paragraph [ref=e89]: La Tortue
        - button "Le Kangourou. Secret pas encore découvert." [ref=e90]:
          - generic [ref=e92]: 🦘
          - paragraph [ref=e93]: Le Kangourou
        - button "Le Dauphin. Secret pas encore découvert." [ref=e94]:
          - generic [ref=e96]: 🐬
          - paragraph [ref=e97]: Le Dauphin
        - button "La Girafe. Secret pas encore découvert." [ref=e98]:
          - generic [ref=e100]: 🦒
          - paragraph [ref=e101]: La Girafe
        - button "Le Panda. Secret pas encore découvert." [ref=e102]:
          - generic [ref=e104]: 🐼
          - paragraph [ref=e105]: Le Panda
        - button "Le Manchot. Secret pas encore découvert." [ref=e106]:
          - generic [ref=e108]: 🐧
          - paragraph [ref=e109]: Le Manchot
        - button "Le Loup. Secret pas encore découvert." [ref=e110]:
          - generic [ref=e112]: 🐺
          - paragraph [ref=e113]: Le Loup
        - button "Le Soleil. Secret pas encore découvert." [ref=e114]:
          - generic [ref=e116]: ☀️
          - paragraph [ref=e117]: Le Soleil
        - button "Mercure. Secret pas encore découvert." [ref=e118]:
          - generic [ref=e120]: 🌑
          - paragraph [ref=e121]: Mercure
        - button "Vénus. Secret pas encore découvert." [ref=e122]:
          - generic [ref=e124]: ☁️
          - paragraph [ref=e125]: Vénus
        - button "La Terre. Secret pas encore découvert." [ref=e126]:
          - generic [ref=e128]: 🌍
          - paragraph [ref=e129]: La Terre
        - button "Mars. Secret pas encore découvert." [ref=e130]:
          - generic [ref=e132]: 🔴
          - paragraph [ref=e133]: Mars
        - button "Jupiter. Secret pas encore découvert." [ref=e134]:
          - generic [ref=e136]: 🌀
          - paragraph [ref=e137]: Jupiter
        - button "Saturne. Secret pas encore découvert." [ref=e138]:
          - generic [ref=e140]: 🪐
          - paragraph [ref=e141]: Saturne
        - button "Uranus. Secret pas encore découvert." [ref=e142]:
          - generic [ref=e144]: 💎
          - paragraph [ref=e145]: Uranus
        - button "Neptune. Secret pas encore découvert." [ref=e146]:
          - generic [ref=e148]: 🌊
          - paragraph [ref=e149]: Neptune
        - button "Pluton. Secret pas encore découvert." [ref=e150]:
          - generic [ref=e152]: ❄️
          - paragraph [ref=e153]: Pluton
        - button "Les Astronautes. Secret pas encore découvert." [ref=e154]:
          - generic [ref=e156]: 👨‍🚀
          - paragraph [ref=e157]: Les Astronautes
        - button "La Lune. Secret pas encore découvert." [ref=e158]:
          - generic [ref=e160]: 🌙
          - paragraph [ref=e161]: La Lune
        - button "La Singularité. Secret pas encore découvert." [ref=e162]:
          - generic [ref=e164]: 💥
          - paragraph [ref=e165]: La Singularité
        - button "Le T-Rex. Secret pas encore découvert." [ref=e166]:
          - generic [ref=e168]: REX
          - paragraph [ref=e169]: Le T-Rex
        - button "Le Tricératops. Secret pas encore découvert." [ref=e170]:
          - generic [ref=e172]: 🦕
          - paragraph [ref=e173]: Le Tricératops
        - button "Le Stégosaure. Secret pas encore découvert." [ref=e174]:
          - generic [ref=e176]: 🛡️
          - paragraph [ref=e177]: Le Stégosaure
        - button "Le Vélociraptor. Secret pas encore découvert." [ref=e178]:
          - generic [ref=e180]: 🦎
          - paragraph [ref=e181]: Le Vélociraptor
        - button "Le Ptérodactyle. Secret pas encore découvert." [ref=e182]:
          - generic [ref=e184]: 🦇
          - paragraph [ref=e185]: Le Ptérodactyle
        - button "Le Brachiosaure. Secret pas encore découvert." [ref=e186]:
          - generic [ref=e188]: 🦒
          - paragraph [ref=e189]: Le Brachiosaure
        - button "L'Ankylosaure. Secret pas encore découvert." [ref=e190]:
          - generic [ref=e192]: 🔨
          - paragraph [ref=e193]: L'Ankylosaure
        - button "Le Diplodocus. Secret pas encore découvert." [ref=e194]:
          - generic [ref=e196]: 🦕
          - paragraph [ref=e197]: Le Diplodocus
        - button "Le Spinosaure. Secret pas encore découvert." [ref=e198]:
          - generic [ref=e200]: 🐊
          - paragraph [ref=e201]: Le Spinosaure
        - button "Le Parasaurolophus. Secret pas encore découvert." [ref=e202]:
          - generic [ref=e204]: 🎺
          - paragraph [ref=e205]: Le Parasaurolophus
        - button "L'Iguanodon. Secret pas encore découvert." [ref=e206]:
          - generic [ref=e208]: 👍
          - paragraph [ref=e209]: L'Iguanodon
        - button "Le Mosasaure. Secret pas encore découvert." [ref=e210]:
          - generic [ref=e212]: 🦈
          - paragraph [ref=e213]: Le Mosasaure
        - button "Le Cerveau. Secret pas encore découvert." [ref=e214]:
          - generic [ref=e216]: 🧠
          - paragraph [ref=e217]: Le Cerveau
        - button "Le Cœur. Secret pas encore découvert." [ref=e218]:
          - generic [ref=e220]: ❤️
          - paragraph [ref=e221]: Le Cœur
        - button "Le Sang. Secret pas encore découvert." [ref=e222]:
          - generic [ref=e224]: 🩸
          - paragraph [ref=e225]: Le Sang
        - button "Les Os. Secret pas encore découvert." [ref=e226]:
          - generic [ref=e228]: 🦴
          - paragraph [ref=e229]: Les Os
        - button "Les Poumons. Secret pas encore découvert." [ref=e230]:
          - generic [ref=e232]: 🫁
          - paragraph [ref=e233]: Les Poumons
        - button "L'Estomac. Secret pas encore découvert." [ref=e234]:
          - generic [ref=e236]: 🍱
          - paragraph [ref=e237]: L'Estomac
        - button "Les Muscles. Secret pas encore découvert." [ref=e238]:
          - generic [ref=e240]: 💪
          - paragraph [ref=e241]: Les Muscles
        - button "La Peau. Secret pas encore découvert." [ref=e242]:
          - generic [ref=e244]: 🧤
          - paragraph [ref=e245]: La Peau
        - button "Les Dents. Secret pas encore découvert." [ref=e246]:
          - generic [ref=e248]: 🦷
          - paragraph [ref=e249]: Les Dents
        - button "Les Yeux. Secret pas encore découvert." [ref=e250]:
          - generic [ref=e252]: 👀
          - paragraph [ref=e253]: Les Yeux
        - button "Les Oreilles. Secret pas encore découvert." [ref=e254]:
          - generic [ref=e256]: 👂
          - paragraph [ref=e257]: Les Oreilles
        - button "Le Nez. Secret pas encore découvert." [ref=e258]:
          - generic [ref=e260]: 👃
          - paragraph [ref=e261]: Le Nez
        - button "Les Arbres. Secret pas encore découvert." [ref=e262]:
          - generic [ref=e264]: 🌳
          - paragraph [ref=e265]: Les Arbres
        - button "Le Volcan. Secret pas encore découvert." [ref=e266]:
          - generic [ref=e268]: 🌋
          - paragraph [ref=e269]: Le Volcan
        - button "La Pluie. Secret pas encore découvert." [ref=e270]:
          - generic [ref=e272]: 🌧️
          - paragraph [ref=e273]: La Pluie
        - button "L'Arc-en-ciel. Secret pas encore découvert." [ref=e274]:
          - generic [ref=e276]: 🌈
          - paragraph [ref=e277]: L'Arc-en-ciel
        - button "Les Abeilles. Secret pas encore découvert." [ref=e278]:
          - generic [ref=e280]: 🐝
          - paragraph [ref=e281]: Les Abeilles
        - button "Le Cycle de l'Eau. Secret pas encore découvert." [ref=e282]:
          - generic [ref=e284]: 💧
          - paragraph [ref=e285]: Le Cycle de l'Eau
        - button "Les Saisons. Secret pas encore découvert." [ref=e286]:
          - generic [ref=e288]: 🍂
          - paragraph [ref=e289]: Les Saisons
        - button "L'Orage. Secret pas encore découvert." [ref=e290]:
          - generic [ref=e292]: ⚡
          - paragraph [ref=e293]: L'Orage
        - button "Le Vent. Secret pas encore découvert." [ref=e294]:
          - generic [ref=e296]: 🌬️
          - paragraph [ref=e297]: Le Vent
        - button "Les Champignons. Secret pas encore découvert." [ref=e298]:
          - generic [ref=e300]: 🍄
          - paragraph [ref=e301]: Les Champignons
        - button "La Banquise. Secret pas encore découvert." [ref=e302]:
          - generic [ref=e304]: ❄️
          - paragraph [ref=e305]: La Banquise
        - button "Les Grottes. Secret pas encore découvert." [ref=e306]:
          - generic [ref=e308]: 🦇
          - paragraph [ref=e309]: Les Grottes
        - button "Les Pyramides. Secret pas encore découvert." [ref=e310]:
          - generic [ref=e312]: 🧱
          - paragraph [ref=e313]: Les Pyramides
        - button "Les Chevaliers. Secret pas encore découvert." [ref=e314]:
          - generic [ref=e316]: 🛡️
          - paragraph [ref=e317]: Les Chevaliers
        - button "Les Vikings. Secret pas encore découvert." [ref=e318]:
          - generic [ref=e320]: 🛶
          - paragraph [ref=e321]: Les Vikings
        - button "Les Châteaux Forts. Secret pas encore découvert." [ref=e322]:
          - generic [ref=e324]: 🏰
          - paragraph [ref=e325]: Les Châteaux Forts
        - button "Les Romains. Secret pas encore découvert." [ref=e326]:
          - generic [ref=e328]: 🏛️
          - paragraph [ref=e329]: Les Romains
        - button "Les Samouraïs. Secret pas encore découvert." [ref=e330]:
          - generic [ref=e332]: ⚔️
          - paragraph [ref=e333]: Les Samouraïs
        - button "Les Pirates. Secret pas encore découvert." [ref=e334]:
          - generic [ref=e336]: 🏴‍☠️
          - paragraph [ref=e337]: Les Pirates
        - button "La Préhistoire. Secret pas encore découvert." [ref=e338]:
          - generic [ref=e340]: 🦴
          - paragraph [ref=e341]: La Préhistoire
        - button "La Grèce Antique. Secret pas encore découvert." [ref=e342]:
          - generic [ref=e344]: 🏛️
          - paragraph [ref=e345]: La Grèce Antique
        - button "Léonard de Vinci. Secret pas encore découvert." [ref=e346]:
          - generic [ref=e348]: 🎨
          - paragraph [ref=e349]: Léonard de Vinci
        - button "Les Mayas. Secret pas encore découvert." [ref=e350]:
          - generic [ref=e352]: 🗿
          - paragraph [ref=e353]: Les Mayas
        - button "Le Premier Pas sur la Lune. Secret pas encore découvert." [ref=e354]:
          - generic [ref=e356]: 🚀
          - paragraph [ref=e357]: Le Premier Pas sur la Lune
        - button "La Tour Eiffel. Secret pas encore découvert." [ref=e358]:
          - generic [ref=e360]: 🗼
          - paragraph [ref=e361]: La Tour Eiffel
        - button "L'Amazonie. Secret pas encore découvert." [ref=e362]:
          - generic [ref=e364]: 🌴
          - paragraph [ref=e365]: L'Amazonie
        - button "Le Mont Everest. Secret pas encore découvert." [ref=e366]:
          - generic [ref=e368]: 🏔️
          - paragraph [ref=e369]: Le Mont Everest
        - button "La Grande Muraille. Secret pas encore découvert." [ref=e370]:
          - generic [ref=e372]: 🧱
          - paragraph [ref=e373]: La Grande Muraille
        - button "L'Antarctique. Secret pas encore découvert." [ref=e374]:
          - generic [ref=e376]: ❄️
          - paragraph [ref=e377]: L'Antarctique
        - button "Le Grand Canyon. Secret pas encore découvert." [ref=e378]:
          - generic [ref=e380]: 🏜️
          - paragraph [ref=e381]: Le Grand Canyon
        - button "Le Nil. Secret pas encore découvert." [ref=e382]:
          - generic [ref=e384]: 🌊
          - paragraph [ref=e385]: Le Nil
        - button "L'Océan Pacifique. Secret pas encore découvert." [ref=e386]:
          - generic [ref=e388]: 🐳
          - paragraph [ref=e389]: L'Océan Pacifique
        - button "Le Désert du Sahara. Secret pas encore découvert." [ref=e390]:
          - generic [ref=e392]: 🏜️
          - paragraph [ref=e393]: Le Désert du Sahara
        - button "La Grande Barrière de Corail. Secret pas encore découvert." [ref=e394]:
          - generic [ref=e396]: 🪸
          - paragraph [ref=e397]: La Grande Barrière de Corail
        - button "Venise. Secret pas encore découvert." [ref=e398]:
          - generic [ref=e400]: 🛶
          - paragraph [ref=e401]: Venise
        - button "Les Pyramides. Secret pas encore découvert." [ref=e402]:
          - generic [ref=e404]: 📐
          - paragraph [ref=e405]: Les Pyramides
        - button "L'Ampoule. Secret pas encore découvert." [ref=e406]:
          - generic [ref=e408]: 💡
          - paragraph [ref=e409]: L'Ampoule
        - button "L'Imprimerie. Secret pas encore découvert." [ref=e410]:
          - generic [ref=e412]: 📚
          - paragraph [ref=e413]: L'Imprimerie
        - button "L'Avion. Secret pas encore découvert." [ref=e414]:
          - generic [ref=e416]: ✈️
          - paragraph [ref=e417]: L'Avion
        - button "Le Téléphone. Secret pas encore découvert." [ref=e418]:
          - generic [ref=e420]: ☎️
          - paragraph [ref=e421]: Le Téléphone
        - button "L'Internet. Secret pas encore découvert." [ref=e422]:
          - generic [ref=e424]: 🌐
          - paragraph [ref=e425]: L'Internet
        - button "La Roue. Secret pas encore découvert." [ref=e426]:
          - generic [ref=e428]: 🎡
          - paragraph [ref=e429]: La Roue
        - button "Le Vélo. Secret pas encore découvert." [ref=e430]:
          - generic [ref=e432]: 🚲
          - paragraph [ref=e433]: Le Vélo
        - button "L'Appareil Photo. Secret pas encore découvert." [ref=e434]:
          - generic [ref=e436]: 📸
          - paragraph [ref=e437]: L'Appareil Photo
        - button "Le Télescope. Secret pas encore découvert." [ref=e438]:
          - generic [ref=e440]: 🔭
          - paragraph [ref=e441]: Le Télescope
        - button "La Boussole. Secret pas encore découvert." [ref=e442]:
          - generic [ref=e444]: 🧭
          - paragraph [ref=e445]: La Boussole
        - button "Le Microscope. Secret pas encore découvert." [ref=e446]:
          - generic [ref=e448]: 🔬
          - paragraph [ref=e449]: Le Microscope
        - button "La Radio. Secret pas encore découvert." [ref=e450]:
          - generic [ref=e452]: 📻
          - paragraph [ref=e453]: La Radio
        - button "La Peinture. Secret pas encore découvert." [ref=e454]:
          - generic [ref=e456]: 🖌️
          - paragraph [ref=e457]: La Peinture
        - button "La Musique. Secret pas encore découvert." [ref=e458]:
          - generic [ref=e460]: 🎵
          - paragraph [ref=e461]: La Musique
        - button "Le Cinéma. Secret pas encore découvert." [ref=e462]:
          - generic [ref=e464]: 🎬
          - paragraph [ref=e465]: Le Cinéma
        - button "La Danse. Secret pas encore découvert." [ref=e466]:
          - generic [ref=e468]: 💃
          - paragraph [ref=e469]: La Danse
        - button "La Sculpture. Secret pas encore découvert." [ref=e470]:
          - generic [ref=e472]: 🗿
          - paragraph [ref=e473]: La Sculpture
        - button "Le Théâtre. Secret pas encore découvert." [ref=e474]:
          - generic [ref=e476]: 🎭
          - paragraph [ref=e477]: Le Théâtre
        - button "L'Architecture. Secret pas encore découvert." [ref=e478]:
          - generic [ref=e480]: 🏰
          - paragraph [ref=e481]: L'Architecture
        - button "La Photographie. Secret pas encore découvert." [ref=e482]:
          - generic [ref=e484]: 📸
          - paragraph [ref=e485]: La Photographie
        - button "Les Livres. Secret pas encore découvert." [ref=e486]:
          - generic [ref=e488]: 📚
          - paragraph [ref=e489]: Les Livres
        - button "La Bande Dessinée. Secret pas encore découvert." [ref=e490]:
          - generic [ref=e492]: 📖
          - paragraph [ref=e493]: La Bande Dessinée
        - button "Le Cirque. Secret pas encore découvert." [ref=e494]:
          - generic [ref=e496]: 🎪
          - paragraph [ref=e497]: Le Cirque
        - button "Le Jeu Vidéo. Secret pas encore découvert." [ref=e498]:
          - generic [ref=e500]: 🎮
          - paragraph [ref=e501]: Le Jeu Vidéo
        - button "Pourquoi le ciel est bleu ?. Secret pas encore découvert." [ref=e502]:
          - generic [ref=e504]: 🌤️
          - paragraph [ref=e505]: Pourquoi le ciel est bleu ?
        - button "Pourquoi la mer est salée ?. Secret pas encore découvert." [ref=e506]:
          - generic [ref=e508]: 🌊
          - paragraph [ref=e509]: Pourquoi la mer est salée ?
        - button "Comment se forme l'arc-en-ciel ?. Secret pas encore découvert." [ref=e510]:
          - generic [ref=e512]: 🌈
          - paragraph [ref=e513]: Comment se forme l'arc-en-ciel ?
        - button "Pourquoi les chats ronronnent ?. Secret pas encore découvert." [ref=e514]:
          - generic [ref=e516]: 🐱
          - paragraph [ref=e517]: Pourquoi les chats ronronnent ?
        - button "Pourquoi a-t-on des fourmis ?. Secret pas encore découvert." [ref=e518]:
          - generic [ref=e520]: 🐜
          - paragraph [ref=e521]: Pourquoi a-t-on des fourmis ?
        - button "Pourquoi le fromage a des trous ?. Secret pas encore découvert." [ref=e522]:
          - generic [ref=e524]: 🧀
          - paragraph [ref=e525]: Pourquoi le fromage a des trous ?
        - button "Pourquoi pleure-t-on avec les oignons ?. Secret pas encore découvert." [ref=e526]:
          - generic [ref=e528]: 🧅
          - paragraph [ref=e529]: Pourquoi pleure-t-on avec les oignons ?
        - button "Pourquoi la neige est blanche ?. Secret pas encore découvert." [ref=e530]:
          - generic [ref=e532]: ❄️
          - paragraph [ref=e533]: Pourquoi la neige est blanche ?
        - button "Pourquoi les feuilles tombent ?. Secret pas encore découvert." [ref=e534]:
          - generic [ref=e536]: 🍂
          - paragraph [ref=e537]: Pourquoi les feuilles tombent ?
        - button "Pourquoi le zèbre a des rayures ?. Secret pas encore découvert." [ref=e538]:
          - generic [ref=e540]: 🦓
          - paragraph [ref=e541]: Pourquoi le zèbre a des rayures ?
        - button "Pourquoi fait-on des rêves ?. Secret pas encore découvert." [ref=e542]:
          - generic [ref=e544]: 😴
          - paragraph [ref=e545]: Pourquoi fait-on des rêves ?
        - button "Pourquoi fait-on caca ?. Secret pas encore découvert." [ref=e546]:
          - generic [ref=e548]: 💩
          - paragraph [ref=e549]: Pourquoi fait-on caca ?
    - generic [ref=e550]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
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
  20  |       { name: /Le Cercle de la Vie/i, url: /\/nature/ },
  21  |       { name: /La Carte aux Trésors/i, url: /\/map/ },
  22  |       { name: /Mission Safari/i, url: /\/safari/ },
  23  |     ];
  24  | 
  25  | 
  26  |     for (const section of hubSections) {
  27  |       const card = page.getByRole('button', { name: section.name });
  28  |       await expect(card).toBeVisible();
  29  |       await card.scrollIntoViewIfNeeded();
  30  |       await card.click();
  31  |       await expect(page).toHaveURL(section.url);
  32  |       
  33  |       const backBtn = page.getByRole('button', { name: /Retour/i }).first();
  34  |       if (await backBtn.isVisible()) {
  35  |         await backBtn.click();
  36  |       } else {
  37  |         // Fallback pour les modes immersifs où le header global est masqué
  38  |         await page.goto('/', { timeout: 45000 });
  39  |       }
  40  |       await expect(page).toHaveURL(/\/$/);
  41  |     }
  42  |   });
  43  | 
  44  |   test('le dashboard (médailles/xp) devrait mener à la Galerie des Explorateurs', async ({ page }) => {
  45  |     const dashLink = page.getByRole('link', { name: /Voir mes médailles/i });
  46  |     await expect(dashLink).toBeVisible();
  47  |     await dashLink.scrollIntoViewIfNeeded();
  48  |     await dashLink.click();
> 49  |     await expect(page).toHaveURL(/\/gallery/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  50  |     
  51  |     const backBtn = page.getByRole('button', { name: /Retour/i });
  52  |     await expect(backBtn).toBeVisible();
  53  |     await backBtn.click();
  54  |     await expect(page).toHaveURL(/\/$/);
  55  |   });
  56  | 
  57  |   test('les boutons de la barre de navigation devraient être interactifs', async ({ page }) => {
  58  |     const profileBtn = page.getByTestId('header-profile-btn');
  59  |     await expect(profileBtn).toBeVisible();
  60  |     await profileBtn.click();
  61  |     await expect(page.getByTestId('main-title')).toBeVisible();
  62  |     
  63  |     // Fermer l'overlay en cliquant sur le nom (si c'est le comportement attendu) ou via onClose
  64  |     // Ici on clique sur une carte pour simuler la sélection
  65  |     await page.getByTestId('profile-card-Navigateur').click();
  66  |     await expect(page.getByTestId('main-title')).not.toBeVisible();
  67  | 
  68  |     const genderBtn = page.getByTestId('header-gender-btn');
  69  |     if (!await genderBtn.isVisible()) {
  70  |        // Si non trouvé par ID, on essaie par position (compatibilité)
  71  |        await expect(page.locator('header button').nth(1)).toBeVisible();
  72  |     } else {
  73  |        await expect(genderBtn).toBeVisible();
  74  |        await expect(genderBtn).toContainText('👦');
  75  |        await genderBtn.click();
  76  |        await expect(genderBtn).toContainText('👧');
  77  |        await genderBtn.click();
  78  |        await expect(genderBtn).toContainText('👦');
  79  |     }
  80  |   });
  81  | 
  82  |   test('la barre de recherche devrait filtrer les résultats', async ({ page }) => {
  83  |     const searchInput = page.getByPlaceholder(/Cherche un sujet/i);
  84  |     await expect(searchInput).toBeVisible();
  85  |     await searchInput.fill('Lion');
  86  |     await expect(page.getByTestId('topic-card-lion')).toBeVisible();
  87  |     
  88  |     const clearBtn = page.getByRole('button', { name: /Effacer/i });
  89  |     await expect(clearBtn).toBeVisible();
  90  |     await clearBtn.click();
  91  |     await expect(searchInput).toHaveValue('');
  92  |   });
  93  | 
  94  |   test('les boutons "Voir plus" des catégories devraient fonctionner', async ({ page }) => {
  95  |     const moreBtn = page.getByRole('button', { name: /Voir plus/i }).first();
  96  |     if (await moreBtn.isVisible()) {
  97  |       await moreBtn.scrollIntoViewIfNeeded();
  98  |       await moreBtn.click({ force: true });
  99  |       
  100 |       // On attend que l'état change (le bouton devient "Voir moins")
  101 |       const lessBtn = page.getByRole('button', { name: /Voir moins/i }).first();
  102 |       await expect(lessBtn).toBeVisible({ timeout: 10000 });
  103 |     }
  104 |   });
  105 | });
  106 | 
```