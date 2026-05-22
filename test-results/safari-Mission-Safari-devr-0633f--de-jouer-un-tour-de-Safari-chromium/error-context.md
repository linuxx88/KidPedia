# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: safari.spec.ts >> Mission Safari >> devrait permettre de jouer un tour de Safari
- Location: tests-e2e\safari.spec.ts:4:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('safari-message')
Expected substring: "Bienvenue"
Received string:    "Nouvelle aventure ! Trouve 3 animaux !"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByTestId('safari-message')
    6 × locator resolved to <div class="_messageBox_1h4kp_95" data-testid="safari-message">…</div>
      - unexpected value "Nouvelle aventure ! Trouve 3 animaux !"

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e7]:
    - generic [ref=e8]:
      - button "Retour" [ref=e10] [cursor=pointer]:
        - img [ref=e11]
        - text: Retour
      - generic [ref=e13]:
        - generic [ref=e14]: 🦁
        - heading "Mission Safari" [level=1] [ref=e15]
      - button "Toggle theme" [ref=e17] [cursor=pointer]: 🌙
    - generic [ref=e18]:
      - generic:
        - generic: 🌿
        - generic: 🌳
        - generic: 🌸
        - generic: 🍃
        - generic: 🍃
        - generic: 🍃
        - generic: 🍃
        - generic: 🪨
        - generic: 🪨
        - generic: 🌿
        - generic: 🍃
        - generic: ☁️
        - generic: 🌳
        - generic: 🌸
        - generic: 🪨
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]:
            - heading "Ta progression" [level=3] [ref=e22]
            - paragraph [ref=e23]: 0/3 animaux trouvés
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e27] [cursor=pointer]:
                - generic [ref=e28]: "1"
                - generic [ref=e29]: "2"
                - generic [ref=e30]: "3"
                - generic [ref=e31]: "4"
                - generic [ref=e32]: "5"
                - generic [ref=e33]: "6"
              - button "Lancer le dé ! 🎲" [ref=e34] [cursor=pointer]
            - paragraph [ref=e36]: Nouvelle aventure ! Trouve 3 animaux !
          - generic [ref=e37]:
            - heading "CARNET DE VOYAGE" [level=3] [ref=e38]
            - paragraph [ref=e40]: Aucune photo pour l'instant...
        - generic [ref=e42]:
          - img
          - generic [ref=e43]:
            - generic [ref=e45] [cursor=pointer]:
              - generic [ref=e46]: "0"
              - generic [ref=e47]: 🏁
              - generic:
                - generic "Aventurier":
                  - generic:
                    - generic:
                      - img "Aventurier"
            - generic [ref=e49] [cursor=pointer]:
              - generic [ref=e50]: "1"
              - generic [ref=e51]: 🐰
            - generic [ref=e53] [cursor=pointer]:
              - generic [ref=e54]: "2"
              - generic [ref=e55]: 🌿
              - generic [ref=e56]: "+2"
            - generic [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: "3"
              - generic [ref=e60]: 📍
          - generic [ref=e61]:
            - generic [ref=e63] [cursor=pointer]:
              - generic [ref=e64]: "7"
              - generic [ref=e65]: 🦒
            - generic [ref=e67] [cursor=pointer]:
              - generic [ref=e68]: "6"
              - generic [ref=e69]: 📍
            - generic [ref=e71] [cursor=pointer]:
              - generic [ref=e72]: "5"
              - generic [ref=e73]: 🐼
            - generic [ref=e75] [cursor=pointer]:
              - generic [ref=e76]: "4"
              - generic [ref=e77]: ⏳
              - generic [ref=e78]: "-2"
          - generic [ref=e79]:
            - generic [ref=e81] [cursor=pointer]:
              - generic [ref=e82]: "8"
              - generic [ref=e83]: 🐍
              - generic [ref=e84]: "-3"
            - generic [ref=e86] [cursor=pointer]:
              - generic [ref=e87]: "9"
              - generic [ref=e88]: 🐬
            - generic [ref=e90] [cursor=pointer]:
              - generic [ref=e91]: "10"
              - generic [ref=e92]: 🚀
              - generic [ref=e93]: "+3"
            - generic [ref=e95] [cursor=pointer]:
              - generic [ref=e96]: "11"
              - generic [ref=e97]: 🐘
          - generic [ref=e98]:
            - generic [ref=e100] [cursor=pointer]:
              - generic [ref=e101]: "14"
              - generic [ref=e102]: 🏆
            - generic [ref=e104] [cursor=pointer]:
              - generic [ref=e105]: "13"
              - generic [ref=e106]: 🦁
            - generic [ref=e108] [cursor=pointer]:
              - generic [ref=e109]: "12"
              - generic [ref=e110]: 🦇
              - generic [ref=e111]: "-5"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Mission Safari', () => {
  4  |   test('devrait permettre de jouer un tour de Safari', async ({ page }) => {
  5  |     // 1. Initialisation : Création d'un profil et accès au Safari
  6  |     await page.goto('/');
  7  |     await page.evaluate(() => localStorage.clear());
  8  |     await page.reload();
  9  |     
  10 |     await page.getByTestId('profile-name-input').fill('Aventurier');
  11 |     const startButton = page.getByRole('button', { name: /parti/i });
  12 |     await expect(startButton).toBeVisible();
  13 |     await startButton.click();
  14 | 
  15 |     // 2. Accéder à Mission Safari via le Hub
  16 |     const safariLink = page.getByText('Mission Safari');
  17 |     await expect(safariLink).toBeVisible();
  18 |     await safariLink.click();
  19 | 
  20 |     // 3. Vérifier le message de bienvenue
  21 |     const message = page.getByTestId('safari-message');
> 22 |     await expect(message).toContainText('Bienvenue');
     |                           ^ Error: expect(locator).toContainText(expected) failed
  23 | 
  24 |     // 4. Lancer le dé
  25 |     const rollButton = page.getByTestId('roll-dice-button');
  26 |     await expect(rollButton).toBeVisible();
  27 |     
  28 |     const initialMessage = await message.innerText();
  29 |     await rollButton.click();
  30 | 
  31 |     // 5. Vérifier que le jeu a réagi
  32 |     await expect(async () => {
  33 |       const currentMessage = await message.innerText();
  34 |       expect(currentMessage).not.toBe(initialMessage);
  35 |     }).toPass({ timeout: 10000 });
  36 | 
  37 |     // 6. Vérifier la navigation retour
  38 |     const backButton = page.getByRole('button', { name: /Retour/i });
  39 |     await expect(backButton).toBeVisible();
  40 |     await backButton.click();
  41 |     await expect(page.getByAltText(/Aventurier/i)).toBeVisible();
  42 |   });
  43 | });
  44 | 
```