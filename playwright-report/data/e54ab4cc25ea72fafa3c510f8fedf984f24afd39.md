# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: i18n.spec.ts >> Internationalisation (i18n) >> devrait permettre de changer la langue du profil
- Location: tests-e2e/i18n.spec.ts:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Let\'s go! 🚀', exact: true })
    - locator resolved to <button type="submit" class="_btn_uipv8_1 _primary_uipv8_21 ">Let's go! 🚀</button>
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
        - textbox "Search for a topic..." [ref=e16]
      - generic [ref=e17]:
        - button "Zone Parents" [ref=e18] [cursor=pointer]: 🔐
        - button "Who is exploring today?" [ref=e19] [cursor=pointer]:
          - generic "Explorateur" [ref=e20]:
            - generic [ref=e22]: 🦁
        - button "Switch to girl mode" [ref=e23] [cursor=pointer]: 👦
        - button "🌌 Space" [ref=e24] [cursor=pointer]: 🌙
        - button "Stop" [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: 🔊
  - main [ref=e27]:
    - generic [ref=e29]:
      - heading "New Explorer" [level=2] [ref=e30]
      - generic [ref=e31]:
        - generic [ref=e32]: Your little name...
        - textbox "Your little name..." [active] [ref=e33]: Léo
      - generic [ref=e34]:
        - generic [ref=e35]: "Your style:"
        - generic [ref=e36]:
          - button "👦 👦 Boy" [ref=e37] [cursor=pointer]:
            - generic [ref=e38]: 👦
            - generic [ref=e39]: 👦 Boy
          - button "👧 👧 Girl" [ref=e40] [cursor=pointer]:
            - generic [ref=e41]: 👧
            - generic [ref=e42]: 👧 Girl
      - generic [ref=e43]:
        - generic [ref=e44]: "Choose your hero:"
        - generic [ref=e45]:
          - generic "Explorateur" [ref=e47] [cursor=pointer]:
            - img "Explorateur" [ref=e50]
          - generic "Explorateur" [ref=e52] [cursor=pointer]:
            - img "Explorateur" [ref=e55]
          - generic "Explorateur" [ref=e57] [cursor=pointer]:
            - img "Explorateur" [ref=e60]
      - generic [ref=e61]:
        - generic [ref=e62]: Langue / Language
        - generic [ref=e63]:
          - button "🇫🇷 Français" [ref=e64] [cursor=pointer]:
            - generic [ref=e65]: 🇫🇷
            - generic [ref=e66]: Français
          - button "🇬🇧 English" [pressed] [ref=e67] [cursor=pointer]:
            - generic [ref=e68]: 🇬🇧
            - generic [ref=e69]: English
      - button "Let's go! 🚀" [ref=e71] [cursor=pointer]
    - generic [ref=e73]:
      - navigation "Navigation par thèmes" [ref=e74]:
        - list [ref=e75]:
          - listitem [ref=e76]:
            - button "Aller à la section Animals" [ref=e77] [cursor=pointer]:
              - generic [ref=e78]: 🦁
              - generic: Animals
          - listitem [ref=e79]:
            - button "Aller à la section Space" [ref=e80] [cursor=pointer]:
              - generic [ref=e81]: 🚀
              - generic: Space
          - listitem [ref=e82]:
            - button "Aller à la section Dinos REX" [ref=e83] [cursor=pointer]:
              - generic [ref=e84]: 🦖
              - generic: Dinos REX
          - listitem [ref=e85]:
            - button "Aller à la section Human Body" [ref=e86] [cursor=pointer]:
              - generic [ref=e87]: 🧠
              - generic: Human Body
          - listitem [ref=e88]:
            - button "Aller à la section Nature" [ref=e89] [cursor=pointer]:
              - generic [ref=e90]: 🌿
              - generic: Nature
          - listitem [ref=e91]:
            - button "Aller à la section History" [ref=e92] [cursor=pointer]:
              - generic [ref=e93]: 🏺
              - generic: History
          - listitem [ref=e94]:
            - button "Aller à la section Geography" [ref=e95] [cursor=pointer]:
              - generic [ref=e96]: 🌍
              - generic: Geography
          - listitem [ref=e97]:
            - button "Aller à la section Inventions" [ref=e98] [cursor=pointer]:
              - generic [ref=e99]: 💡
              - generic: Inventions
          - listitem [ref=e100]:
            - button "Aller à la section Arts & Culture" [ref=e101] [cursor=pointer]:
              - generic [ref=e102]: 🎨
              - generic: Arts & Culture
          - listitem [ref=e103]:
            - button "Aller à la section Why?" [ref=e104] [cursor=pointer]:
              - generic [ref=e105]: ❓
              - generic: Why?
      - generic [ref=e113]:
        - heading "Hello Bonsoir!" [level=1] [ref=e114]
        - paragraph [ref=e115]: It's a beautiful day... a perfect day to learn and have fun! ✨
      - 'link "Voir mes médailles. Progression : 0 pour cent. Total XP : 0" [ref=e117] [cursor=pointer]':
        - /url: /gallery
        - generic [ref=e118]:
          - generic [ref=e119]: 🏆
          - generic [ref=e120]: "0"
          - generic [ref=e121]: Medals
        - generic [ref=e123]:
          - generic [ref=e124]: 🎫
          - generic [ref=e125]: "0"
          - generic [ref=e126]: QC Tickets
        - generic [ref=e128]:
          - generic [ref=e129]: ⚡
          - generic [ref=e130]: "0"
          - generic [ref=e131]: XP
        - generic [ref=e134]: 0%
      - generic [ref=e137]:
        - button "The Great Time Journey Where do math and the universe come from?" [ref=e138] [cursor=pointer]:
          - img [ref=e140]
          - generic [ref=e142]:
            - heading "The Great Time Journey" [level=3] [ref=e143]
            - paragraph [ref=e144]: Where do math and the universe come from?
        - button "The Treasure Map Explore animals and monuments around the world!" [ref=e145] [cursor=pointer]:
          - img [ref=e147]
          - generic [ref=e149]:
            - heading "The Treasure Map" [level=3] [ref=e150]
            - paragraph [ref=e151]: Explore animals and monuments around the world!
        - button "Mission Safari Survive the savannah and win the treasure!" [ref=e152] [cursor=pointer]:
          - img [ref=e154]
          - generic [ref=e156]:
            - heading "Mission Safari" [level=3] [ref=e157]
            - paragraph [ref=e158]: Survive the savannah and win the treasure!
        - button "The Champions Grand Quiz Crazy timer, confetti and golden trophy! 🏆" [ref=e159] [cursor=pointer]:
          - img [ref=e161]
          - generic [ref=e163]:
            - heading "The Champions Grand Quiz" [level=3] [ref=e164]
            - paragraph [ref=e165]: Crazy timer, confetti and golden trophy! 🏆
        - button "My Magic Dico 📖 Click the owl to hear me! 🦉" [ref=e166] [cursor=pointer]:
          - img [ref=e168]
          - generic [ref=e170]:
            - heading "My Magic Dico 📖" [level=3] [ref=e171]
            - paragraph [ref=e172]: Click the owl to hear me! 🦉
      - generic [ref=e173]:
        - generic [ref=e174]:
          - button "The Lion. The king of the savannah." [ref=e176] [cursor=pointer]:
            - generic:
              - generic: Animals
              - heading "The Lion" [level=3]
              - paragraph: The king of the savannah.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🦁
          - button "The Elephant. The largest land animal with a magic trunk.. Verrouillé" [ref=e178] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Elephant" [level=3]
              - paragraph: The largest land animal with a magic trunk.
            - generic:
              - generic: 🐘
          - button "The Tiger. The largest of all felines with beautiful stripes.. Verrouillé" [ref=e180] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Tiger" [level=3]
              - paragraph: The largest of all felines with beautiful stripes.
            - generic:
              - generic: 🐯
        - button "See more ➔" [ref=e182] [cursor=pointer]
      - generic [ref=e183]:
        - generic [ref=e184]:
          - button "The Sun. The star at the center of our system." [ref=e186] [cursor=pointer]:
            - generic:
              - generic: Space
              - heading "The Sun" [level=3]
              - paragraph: The star at the center of our system.
              - generic:
                - generic: Explore →
            - generic:
              - generic: ☀️
          - button "Mercury. The small planet near the Sun.. Verrouillé" [ref=e188] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mercury" [level=3]
              - paragraph: The small planet near the Sun.
            - generic:
              - generic: 🌑
          - button "Venus. The hottest planet of all.. Verrouillé" [ref=e190] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Venus" [level=3]
              - paragraph: The hottest planet of all.
            - generic:
              - generic: ☁️
        - button "See more ➔" [ref=e192] [cursor=pointer]
      - generic [ref=e193]:
        - generic [ref=e194]:
          - button "The T-Rex. The most famous dinosaur." [ref=e196] [cursor=pointer]:
            - generic:
              - generic: Dinos REX
              - heading "The T-Rex" [level=3]
              - paragraph: The most famous dinosaur.
              - generic:
                - generic: Explore →
            - generic:
              - generic: REX
          - button "The Triceratops. The three-horned dinosaur.. Verrouillé" [ref=e198] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Triceratops" [level=3]
              - paragraph: The three-horned dinosaur.
            - generic:
              - generic: 🦕
          - button "The Stegosaurus. The dinosaur with plates on its back.. Verrouillé" [ref=e200] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Stegosaurus" [level=3]
              - paragraph: The dinosaur with plates on its back.
            - generic:
              - generic: 🛡️
        - button "See more ➔" [ref=e202] [cursor=pointer]
      - generic [ref=e203]:
        - generic [ref=e204]:
          - button "The Brain. The super-powerful computer of your body." [ref=e206] [cursor=pointer]:
            - generic:
              - generic: Human Body
              - heading "The Brain" [level=3]
              - paragraph: The super-powerful computer of your body.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🧠
          - button "The Heart. The pump that makes your blood travel.. Verrouillé" [ref=e208] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Heart" [level=3]
              - paragraph: The pump that makes your blood travel.
            - generic:
              - generic: ❤️
          - button "The Blood. The train that carries everything in your body.. Verrouillé" [ref=e210] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Blood" [level=3]
              - paragraph: The train that carries everything in your body.
            - generic:
              - generic: 🩸
        - button "See more ➔" [ref=e212] [cursor=pointer]
      - generic [ref=e213]:
        - generic [ref=e214]:
          - button "Trees. The lungs of the Earth." [ref=e216] [cursor=pointer]:
            - generic:
              - generic: Nature
              - heading "Trees" [level=3]
              - paragraph: The lungs of the Earth.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🌳
          - button "The Volcano. A mountain that spits fire.. Verrouillé" [ref=e218] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Volcano" [level=3]
              - paragraph: A mountain that spits fire.
            - generic:
              - generic: 🌋
          - button "Rain. Water falling from the clouds.. Verrouillé" [ref=e220] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Rain" [level=3]
              - paragraph: Water falling from the clouds.
            - generic:
              - generic: 🌧️
        - button "See more ➔" [ref=e222] [cursor=pointer]
      - generic [ref=e223]:
        - generic [ref=e224]:
          - button "The Pyramids. Immense tombs for the pharaohs of Egypt." [ref=e226] [cursor=pointer]:
            - generic:
              - generic: History
              - heading "The Pyramids" [level=3]
              - paragraph: Immense tombs for the pharaohs of Egypt.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🧱
          - button "Knights. Brave Middle Ages warriors with armor.. Verrouillé" [ref=e228] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Knights" [level=3]
              - paragraph: Brave Middle Ages warriors with armor.
            - generic:
              - generic: 🛡️
          - button "The Vikings. Great navigators from the North.. Verrouillé" [ref=e230] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Vikings" [level=3]
              - paragraph: Great navigators from the North.
            - generic:
              - generic: 🛶
        - button "See more ➔" [ref=e232] [cursor=pointer]
      - generic [ref=e233]:
        - generic [ref=e234]:
          - button "The Eiffel Tower. A huge iron tower located in Paris." [ref=e236] [cursor=pointer]:
            - generic:
              - generic: Geography
              - heading "The Eiffel Tower" [level=3]
              - paragraph: A huge iron tower located in Paris.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🗼
          - button "The Amazon. The largest tropical rainforest in the world.. Verrouillé" [ref=e238] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Amazon" [level=3]
              - paragraph: The largest tropical rainforest in the world.
            - generic:
              - generic: 🌴
          - button "Mount Everest. The roof of the world, the highest mountain.. Verrouillé" [ref=e240] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Mount Everest" [level=3]
              - paragraph: The roof of the world, the highest mountain.
            - generic:
              - generic: 🏔️
        - button "See more ➔" [ref=e242] [cursor=pointer]
      - generic [ref=e243]:
        - generic [ref=e244]:
          - button "The Light Bulb. A small glass ball that gives us light." [ref=e246] [cursor=pointer]:
            - generic:
              - generic: Inventions
              - heading "The Light Bulb" [level=3]
              - paragraph: A small glass ball that gives us light.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 💡
          - button "The Printing Press. A machine for copying books quickly.. Verrouillé" [ref=e248] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Printing Press" [level=3]
              - paragraph: A machine for copying books quickly.
            - generic:
              - generic: 📚
          - button "The Airplane. An incredible machine that can fly like a bird.. Verrouillé" [ref=e250] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "The Airplane" [level=3]
              - paragraph: An incredible machine that can fly like a bird.
            - generic:
              - generic: ✈️
        - button "See more ➔" [ref=e252] [cursor=pointer]
      - generic [ref=e253]:
        - generic [ref=e254]:
          - button "Painting. Creating beautiful images with color." [ref=e256] [cursor=pointer]:
            - generic:
              - generic: Arts & Culture
              - heading "Painting" [level=3]
              - paragraph: Creating beautiful images with color.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🖌️
          - button "Music. Organizing sounds to create beautiful songs.. Verrouillé" [ref=e258] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Music" [level=3]
              - paragraph: Organizing sounds to create beautiful songs.
            - generic:
              - generic: 🎵
          - button "Cinema. Telling stories with moving images.. Verrouillé" [ref=e260] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Cinema" [level=3]
              - paragraph: Telling stories with moving images.
            - generic:
              - generic: 🎬
        - button "See more ➔" [ref=e262] [cursor=pointer]
      - generic [ref=e263]:
        - generic [ref=e264]:
          - button "Why is the sky blue?. The secret of the sky's color." [ref=e266] [cursor=pointer]:
            - generic:
              - generic: Why?
              - heading "Why is the sky blue?" [level=3]
              - paragraph: The secret of the sky's color.
              - generic:
                - generic: Explore →
            - generic:
              - generic: 🌤️
          - button "Why is the sea salty?. The secret of the ocean water's taste.. Verrouillé" [ref=e268] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "Why is the sea salty?" [level=3]
              - paragraph: The secret of the ocean water's taste.
            - generic:
              - generic: 🌊
          - button "How is a rainbow formed?. A bridge of colors in the sky.. Verrouillé" [ref=e270] [cursor=pointer]:
            - generic:
              - generic: 🔒
              - heading "How is a rainbow formed?" [level=3]
              - paragraph: A bridge of colors in the sky.
            - generic:
              - generic: 🌈
        - button "See more ➔" [ref=e272] [cursor=pointer]
    - generic [ref=e273]:
      - generic [ref=e274]: The app is ready to work offline! 🚀
      - button "Close" [ref=e276] [cursor=pointer]
    - generic [ref=e277]: KidPedia © 2026 • Come back soon for more medals!
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Internationalisation (i18n)', () => {
  4  |   test('devrait permettre de changer la langue du profil', async ({ page }) => {
  5  |     // 1. Nettoyage et Navigation
  6  |     await page.goto('/');
  7  | 
  8  |     const bodyText = await page.innerText('body');
  9  |     console.log('Contenu du body au démarrage:', bodyText.substring(0, 200));
  10 | 
  11 |     // 2. S'assurer qu'on est sur l'écran de création
  12 |     const title = page.getByTestId('main-title');
  13 |     await title.waitFor({ state: 'visible', timeout: 15000 });
  14 |     await expect(title).toContainText('Explorateur');
  15 | 
  16 |     // 3. Changer la langue en Anglais
  17 |     await page.getByRole('button').filter({ hasText: 'English' }).click();
  18 | 
  19 |     // 4. Vérifier que le titre change en anglais
  20 |     await expect(title).toContainText('Explorer');
  21 | 
  22 |     // 5. Créer le profil en anglais
  23 |     await page.getByTestId('profile-name-input').fill('Léo');
> 24 |     await page.getByRole('button', { name: "Let's go! 🚀", exact: true }).click();
     |                                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  25 | 
  26 |     // 6. Vérifier l'accueil en anglais
  27 |     await expect(page.getByText('The Great Time Journey')).toBeVisible();
  28 |     await expect(page.getByText('Medals', { exact: true })).toBeVisible();
  29 |   });
  30 | });
  31 | 
```