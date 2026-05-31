# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation et Boutons Accueil >> le dashboard (médailles/xp) devrait mener à la Galerie des Explorateurs
- Location: tests-e2e/navigation.spec.ts:42:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Retour/i })
    - locator resolved to <button type="button" class="_backButton_38nl6_1 ">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

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
          - generic [ref=e37]: 📔
          - heading "Galerie des Explorateurs" [level=1] [ref=e38]
        - button "Ouvrir les cadeaux" [ref=e40] [cursor=pointer]:
          - generic [ref=e41]:
            - img [ref=e42]: 🎁
            - generic [ref=e43]: Cadeaux
      - paragraph [ref=e45]: Ta collection de stickers magiques !
      - generic [ref=e46]:
        - button "Sticker mystère. Réponds au quiz de Le Lion pour le découvrir !" [ref=e48]:
          - generic [ref=e49]: 🦁
          - generic [ref=e50]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Éléphant pour le découvrir !" [ref=e52]:
          - generic [ref=e53]: 🐘
          - generic [ref=e54]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Tigre pour le découvrir !" [ref=e56]:
          - generic [ref=e57]: 🐯
          - generic [ref=e58]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Singe pour le découvrir !" [ref=e60]:
          - generic [ref=e61]: 🐒
          - generic [ref=e62]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Lapin pour le découvrir !" [ref=e64]:
          - generic [ref=e65]: 🐰
          - generic [ref=e66]: "?"
        - button "Sticker mystère. Réponds au quiz de La Tortue pour le découvrir !" [ref=e68]:
          - generic [ref=e69]: 🐢
          - generic [ref=e70]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Kangourou pour le découvrir !" [ref=e72]:
          - generic [ref=e73]: 🦘
          - generic [ref=e74]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Dauphin pour le découvrir !" [ref=e76]:
          - generic [ref=e77]: 🐬
          - generic [ref=e78]: "?"
        - button "Sticker mystère. Réponds au quiz de La Girafe pour le découvrir !" [ref=e80]:
          - generic [ref=e81]: 🦒
          - generic [ref=e82]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Panda pour le découvrir !" [ref=e84]:
          - generic [ref=e85]: 🐼
          - generic [ref=e86]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Manchot pour le découvrir !" [ref=e88]:
          - generic [ref=e89]: 🐧
          - generic [ref=e90]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Loup pour le découvrir !" [ref=e92]:
          - generic [ref=e93]: 🐺
          - generic [ref=e94]: "?"
        - button "Sticker mystère. Réponds au quiz de Méduses et Éponges pour le découvrir !" [ref=e96]:
          - generic [ref=e97]: 🪼
          - generic [ref=e98]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Trilobites pour le découvrir !" [ref=e100]:
          - generic [ref=e101]: 🐚
          - generic [ref=e102]: "?"
        - button "Sticker mystère. Réponds au quiz de Vers marins pour le découvrir !" [ref=e104]:
          - generic [ref=e105]: 🪱
          - generic [ref=e106]: "?"
        - button "Sticker mystère. Réponds au quiz de Coquillages primitifs pour le découvrir !" [ref=e108]:
          - generic [ref=e109]: 🐚
          - generic [ref=e110]: "?"
        - button "Sticker mystère. Réponds au quiz de Anomalocaris pour le découvrir !" [ref=e112]:
          - generic [ref=e113]: 🦂
          - generic [ref=e114]: "?"
        - button "Sticker mystère. Réponds au quiz de Poissons sans mâchoires pour le découvrir !" [ref=e116]:
          - generic [ref=e117]: 🐟
          - generic [ref=e118]: "?"
        - button "Sticker mystère. Réponds au quiz de Poissons à écailles pour le découvrir !" [ref=e120]:
          - generic [ref=e121]: 🐠
          - generic [ref=e122]: "?"
        - button "Sticker mystère. Réponds au quiz de Sortie des eaux pour le découvrir !" [ref=e124]:
          - generic [ref=e125]: 🐟🦵
          - generic [ref=e126]: "?"
        - button "Sticker mystère. Réponds au quiz de Insectes géants pour le découvrir !" [ref=e128]:
          - generic [ref=e129]: 🐜
          - generic [ref=e130]: "?"
        - button "Sticker mystère. Réponds au quiz de Peau de Reptile pour le découvrir !" [ref=e132]:
          - generic [ref=e133]: 🦎
          - generic [ref=e134]: "?"
        - button "Sticker mystère. Réponds au quiz de L'œuf solide pour le découvrir !" [ref=e136]:
          - generic [ref=e137]: 🥚
          - generic [ref=e138]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Soleil pour le découvrir !" [ref=e140]:
          - generic [ref=e141]: ☀️
          - generic [ref=e142]: "?"
        - button "Sticker mystère. Réponds au quiz de Mercure pour le découvrir !" [ref=e144]:
          - generic [ref=e145]: 🌑
          - generic [ref=e146]: "?"
        - button "Sticker mystère. Réponds au quiz de Vénus pour le découvrir !" [ref=e148]:
          - generic [ref=e149]: ☁️
          - generic [ref=e150]: "?"
        - button "Sticker mystère. Réponds au quiz de La Terre pour le découvrir !" [ref=e152]:
          - generic [ref=e153]: 🌍
          - generic [ref=e154]: "?"
        - button "Sticker mystère. Réponds au quiz de Mars pour le découvrir !" [ref=e156]:
          - generic [ref=e157]: 🔴
          - generic [ref=e158]: "?"
        - button "Sticker mystère. Réponds au quiz de Jupiter pour le découvrir !" [ref=e160]:
          - generic [ref=e161]: 🌀
          - generic [ref=e162]: "?"
        - button "Sticker mystère. Réponds au quiz de Saturne pour le découvrir !" [ref=e164]:
          - generic [ref=e165]: 🪐
          - generic [ref=e166]: "?"
        - button "Sticker mystère. Réponds au quiz de Uranus pour le découvrir !" [ref=e168]:
          - generic [ref=e169]: 💎
          - generic [ref=e170]: "?"
        - button "Sticker mystère. Réponds au quiz de Neptune pour le découvrir !" [ref=e172]:
          - generic [ref=e173]: 🌊
          - generic [ref=e174]: "?"
        - button "Sticker mystère. Réponds au quiz de Pluton pour le découvrir !" [ref=e176]:
          - generic [ref=e177]: ❄️
          - generic [ref=e178]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Astronautes pour le découvrir !" [ref=e180]:
          - generic [ref=e181]: 👨‍🚀
          - generic [ref=e182]: "?"
        - button "Sticker mystère. Réponds au quiz de La Lune pour le découvrir !" [ref=e184]:
          - generic [ref=e185]: 🌙
          - generic [ref=e186]: "?"
        - button "Sticker mystère. Réponds au quiz de La Singularité pour le découvrir !" [ref=e188]:
          - generic [ref=e189]: 💥
          - generic [ref=e190]: "?"
        - button "Sticker mystère. Réponds au quiz de Soupe de Particules pour le découvrir !" [ref=e192]:
          - generic [ref=e193]: 🥣
          - generic [ref=e194]: "?"
        - button "Sticker mystère. Réponds au quiz de Naissance des Atomes pour le découvrir !" [ref=e196]:
          - generic [ref=e197]: ⚛️
          - generic [ref=e198]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Expansion pour le découvrir !" [ref=e200]:
          - generic [ref=e201]: ✨
          - generic [ref=e202]: "?"
        - button "Sticker mystère. Réponds au quiz de Premières Étoiles pour le découvrir !" [ref=e204]:
          - generic [ref=e205]: ⭐
          - generic [ref=e206]: "?"
        - button "Sticker mystère. Réponds au quiz de Premières Galaxies pour le découvrir !" [ref=e208]:
          - generic [ref=e209]: 🌀
          - generic [ref=e210]: "?"
        - button "Sticker mystère. Réponds au quiz de La Voie Lactée pour le découvrir !" [ref=e212]:
          - generic [ref=e213]: 🌌
          - generic [ref=e214]: "?"
        - button "Sticker mystère. Réponds au quiz de Le T-Rex pour le découvrir !" [ref=e216]:
          - generic [ref=e217]: REX
          - generic [ref=e218]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Tricératops pour le découvrir !" [ref=e220]:
          - generic [ref=e221]: 🦕
          - generic [ref=e222]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Stégosaure pour le découvrir !" [ref=e224]:
          - generic [ref=e225]: 🛡️
          - generic [ref=e226]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Vélociraptor pour le découvrir !" [ref=e228]:
          - generic [ref=e229]: 🦎
          - generic [ref=e230]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Ptérodactyle pour le découvrir !" [ref=e232]:
          - generic [ref=e233]: 🦇
          - generic [ref=e234]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Brachiosaure pour le découvrir !" [ref=e236]:
          - generic [ref=e237]: 🦒
          - generic [ref=e238]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Ankylosaure pour le découvrir !" [ref=e240]:
          - generic [ref=e241]: 🔨
          - generic [ref=e242]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Diplodocus pour le découvrir !" [ref=e244]:
          - generic [ref=e245]: 🦕
          - generic [ref=e246]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Spinosaure pour le découvrir !" [ref=e248]:
          - generic [ref=e249]: 🐊
          - generic [ref=e250]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Parasaurolophus pour le découvrir !" [ref=e252]:
          - generic [ref=e253]: 🎺
          - generic [ref=e254]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Iguanodon pour le découvrir !" [ref=e256]:
          - generic [ref=e257]: 👍
          - generic [ref=e258]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Mosasaure pour le découvrir !" [ref=e260]:
          - generic [ref=e261]: 🦈
          - generic [ref=e262]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Cerveau pour le découvrir !" [ref=e264]:
          - generic [ref=e265]: 🧠
          - generic [ref=e266]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Cœur pour le découvrir !" [ref=e268]:
          - generic [ref=e269]: ❤️
          - generic [ref=e270]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Sang pour le découvrir !" [ref=e272]:
          - generic [ref=e273]: 🩸
          - generic [ref=e274]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Os pour le découvrir !" [ref=e276]:
          - generic [ref=e277]: 🦴
          - generic [ref=e278]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Poumons pour le découvrir !" [ref=e280]:
          - generic [ref=e281]: 🫁
          - generic [ref=e282]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Estomac pour le découvrir !" [ref=e284]:
          - generic [ref=e285]: 🍱
          - generic [ref=e286]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Muscles pour le découvrir !" [ref=e288]:
          - generic [ref=e289]: 💪
          - generic [ref=e290]: "?"
        - button "Sticker mystère. Réponds au quiz de La Peau pour le découvrir !" [ref=e292]:
          - generic [ref=e293]: 🧤
          - generic [ref=e294]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Dents pour le découvrir !" [ref=e296]:
          - generic [ref=e297]: 🦷
          - generic [ref=e298]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Yeux pour le découvrir !" [ref=e300]:
          - generic [ref=e301]: 👀
          - generic [ref=e302]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Oreilles pour le découvrir !" [ref=e304]:
          - generic [ref=e305]: 👂
          - generic [ref=e306]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Nez pour le découvrir !" [ref=e308]:
          - generic [ref=e309]: 👃
          - generic [ref=e310]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Arbres pour le découvrir !" [ref=e312]:
          - generic [ref=e313]: 🌳
          - generic [ref=e314]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Volcan pour le découvrir !" [ref=e316]:
          - generic [ref=e317]: 🌋
          - generic [ref=e318]: "?"
        - button "Sticker mystère. Réponds au quiz de La Pluie pour le découvrir !" [ref=e320]:
          - generic [ref=e321]: 🌧️
          - generic [ref=e322]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Arc-en-ciel pour le découvrir !" [ref=e324]:
          - generic [ref=e325]: 🌈
          - generic [ref=e326]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Abeilles pour le découvrir !" [ref=e328]:
          - generic [ref=e329]: 🐝
          - generic [ref=e330]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Cycle de l'Eau pour le découvrir !" [ref=e332]:
          - generic [ref=e333]: 💧
          - generic [ref=e334]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Saisons pour le découvrir !" [ref=e336]:
          - generic [ref=e337]: 🍂
          - generic [ref=e338]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Orage pour le découvrir !" [ref=e340]:
          - generic [ref=e341]: ⚡
          - generic [ref=e342]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Vent pour le découvrir !" [ref=e344]:
          - generic [ref=e345]: 🌬️
          - generic [ref=e346]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Champignons pour le découvrir !" [ref=e348]:
          - generic [ref=e349]: 🍄
          - generic [ref=e350]: "?"
        - button "Sticker mystère. Réponds au quiz de La Banquise pour le découvrir !" [ref=e352]:
          - generic [ref=e353]: ❄️
          - generic [ref=e354]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Grottes pour le découvrir !" [ref=e356]:
          - generic [ref=e357]: 🦇
          - generic [ref=e358]: "?"
        - button "Sticker mystère. Réponds au quiz de Les premières cellules pour le découvrir !" [ref=e360]:
          - generic [ref=e361]: 🔬
          - generic [ref=e362]: "?"
        - button "Sticker mystère. Réponds au quiz de L'air pur pour le découvrir !" [ref=e364]:
          - generic [ref=e365]: 🌬️
          - generic [ref=e366]: "?"
        - button "Sticker mystère. Réponds au quiz de Premières forêts pour le découvrir !" [ref=e368]:
          - generic [ref=e369]: 🌳
          - generic [ref=e370]: "?"
        - button "Sticker mystère. Réponds au quiz de Le climat change pour le découvrir !" [ref=e372]:
          - generic [ref=e373]: ☀️
          - generic [ref=e374]: "?"
        - button "Sticker mystère. Réponds au quiz de Apparition des fleurs pour le découvrir !" [ref=e376]:
          - generic [ref=e377]: 🌸
          - generic [ref=e378]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Pyramides pour le découvrir !" [ref=e380]:
          - generic [ref=e381]: 🧱
          - generic [ref=e382]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Chevaliers pour le découvrir !" [ref=e384]:
          - generic [ref=e385]: 🛡️
          - generic [ref=e386]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Vikings pour le découvrir !" [ref=e388]:
          - generic [ref=e389]: 🛶
          - generic [ref=e390]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Châteaux Forts pour le découvrir !" [ref=e392]:
          - generic [ref=e393]: 🏰
          - generic [ref=e394]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Romains pour le découvrir !" [ref=e396]:
          - generic [ref=e397]: 🏛️
          - generic [ref=e398]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Samouraïs pour le découvrir !" [ref=e400]:
          - generic [ref=e401]: ⚔️
          - generic [ref=e402]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Pirates pour le découvrir !" [ref=e404]:
          - generic [ref=e405]: 🏴‍☠️
          - generic [ref=e406]: "?"
        - button "Sticker mystère. Réponds au quiz de La Préhistoire pour le découvrir !" [ref=e408]:
          - generic [ref=e409]: 🦴
          - generic [ref=e410]: "?"
        - button "Sticker mystère. Réponds au quiz de La Grèce Antique pour le découvrir !" [ref=e412]:
          - generic [ref=e413]: 🏛️
          - generic [ref=e414]: "?"
        - button "Sticker mystère. Réponds au quiz de Léonard de Vinci pour le découvrir !" [ref=e416]:
          - generic [ref=e417]: 🎨
          - generic [ref=e418]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Mayas pour le découvrir !" [ref=e420]:
          - generic [ref=e421]: 🗿
          - generic [ref=e422]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Premier Pas sur la Lune pour le découvrir !" [ref=e424]:
          - generic [ref=e425]: 🚀
          - generic [ref=e426]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Berceau de l'Afrique pour le découvrir !" [ref=e428]:
          - generic [ref=e429]: 🏜️
          - generic [ref=e430]: "?"
        - button "Sticker mystère. Réponds au quiz de Debout sur deux pieds pour le découvrir !" [ref=e432]:
          - generic [ref=e433]: 🚶
          - generic [ref=e434]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Artisan des Pierres pour le découvrir !" [ref=e436]:
          - generic [ref=e437]: 🛠️
          - generic [ref=e438]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Dompteur de Feu pour le découvrir !" [ref=e440]:
          - generic [ref=e441]: 🔥
          - generic [ref=e442]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Grand Voyage pour le découvrir !" [ref=e444]:
          - generic [ref=e445]: 🌍
          - generic [ref=e446]: "?"
        - button "Sticker mystère. Réponds au quiz de Cousins Néandertal pour le découvrir !" [ref=e448]:
          - generic [ref=e449]: ❄️
          - generic [ref=e450]: "?"
        - button "Sticker mystère. Réponds au quiz de Artistes des Cavernes pour le découvrir !" [ref=e452]:
          - generic [ref=e453]: 🎨
          - generic [ref=e454]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Premiers Villages pour le découvrir !" [ref=e456]:
          - generic [ref=e457]: 🛖
          - generic [ref=e458]: "?"
        - button "Sticker mystère. Réponds au quiz de On s'installe ! pour le découvrir !" [ref=e460]:
          - generic [ref=e461]: 🛖
          - generic [ref=e462]: "?"
        - button "Sticker mystère. Réponds au quiz de Murs de Terre pour le découvrir !" [ref=e464]:
          - generic [ref=e465]: 🧱
          - generic [ref=e466]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Secret des Graines pour le découvrir !" [ref=e468]:
          - generic [ref=e469]: 🌾
          - generic [ref=e470]: "?"
        - button "Sticker mystère. Réponds au quiz de Nouveaux Amis pour le découvrir !" [ref=e472]:
          - generic [ref=e473]: 🐐
          - generic [ref=e474]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Pots Magiques pour le découvrir !" [ref=e476]:
          - generic [ref=e477]: 🏺
          - generic [ref=e478]: "?"
        - button "Sticker mystère. Réponds au quiz de Main dans la Main pour le découvrir !" [ref=e480]:
          - generic [ref=e481]: 🤝
          - generic [ref=e482]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Fil et l'Aiguille pour le découvrir !" [ref=e484]:
          - generic [ref=e485]: 🧶
          - generic [ref=e486]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Pierres Géantes pour le découvrir !" [ref=e488]:
          - generic [ref=e489]: 🗿
          - generic [ref=e490]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Écriture Sacrée pour le découvrir !" [ref=e492]:
          - generic [ref=e493]: 📜
          - generic [ref=e494]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Empire des Incas pour le découvrir !" [ref=e496]:
          - generic [ref=e497]: ☀️
          - generic [ref=e498]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Grandes Cathédrales pour le découvrir !" [ref=e500]:
          - generic [ref=e501]: ⛪
          - generic [ref=e502]: "?"
        - button "Sticker mystère. Réponds au quiz de Moines et Calligraphie pour le découvrir !" [ref=e504]:
          - generic [ref=e505]: ✒️
          - generic [ref=e506]: "?"
        - button "Sticker mystère. Réponds au quiz de Moulins et Champs pour le découvrir !" [ref=e508]:
          - generic [ref=e509]: 🚜
          - generic [ref=e510]: "?"
        - button "Sticker mystère. Réponds au quiz de Foires et Marchés pour le découvrir !" [ref=e512]:
          - generic [ref=e513]: 💰
          - generic [ref=e514]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Invention du Papier pour le découvrir !" [ref=e516]:
          - generic [ref=e517]: 📄
          - generic [ref=e518]: "?"
        - button "Sticker mystère. Réponds au quiz de La Tour Eiffel pour le découvrir !" [ref=e520]:
          - generic [ref=e521]: 🗼
          - generic [ref=e522]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Amazonie pour le découvrir !" [ref=e524]:
          - generic [ref=e525]: 🌴
          - generic [ref=e526]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Mont Everest pour le découvrir !" [ref=e528]:
          - generic [ref=e529]: 🏔️
          - generic [ref=e530]: "?"
        - button "Sticker mystère. Réponds au quiz de La Grande Muraille pour le découvrir !" [ref=e532]:
          - generic [ref=e533]: 🧱
          - generic [ref=e534]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Antarctique pour le découvrir !" [ref=e536]:
          - generic [ref=e537]: ❄️
          - generic [ref=e538]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Grand Canyon pour le découvrir !" [ref=e540]:
          - generic [ref=e541]: 🏜️
          - generic [ref=e542]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Nil pour le découvrir !" [ref=e544]:
          - generic [ref=e545]: 🌊
          - generic [ref=e546]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Océan Pacifique pour le découvrir !" [ref=e548]:
          - generic [ref=e549]: 🐳
          - generic [ref=e550]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Désert du Sahara pour le découvrir !" [ref=e552]:
          - generic [ref=e553]: 🏜️
          - generic [ref=e554]: "?"
        - button "Sticker mystère. Réponds au quiz de La Grande Barrière de Corail pour le découvrir !" [ref=e556]:
          - generic [ref=e557]: 🪸
          - generic [ref=e558]: "?"
        - button "Sticker mystère. Réponds au quiz de Venise pour le découvrir !" [ref=e560]:
          - generic [ref=e561]: 🛶
          - generic [ref=e562]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Pyramides pour le découvrir !" [ref=e564]:
          - generic [ref=e565]: 📐
          - generic [ref=e566]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Ampoule pour le découvrir !" [ref=e568]:
          - generic [ref=e569]: 💡
          - generic [ref=e570]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Imprimerie pour le découvrir !" [ref=e572]:
          - generic [ref=e573]: 📚
          - generic [ref=e574]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Avion pour le découvrir !" [ref=e576]:
          - generic [ref=e577]: ✈️
          - generic [ref=e578]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Téléphone pour le découvrir !" [ref=e580]:
          - generic [ref=e581]: ☎️
          - generic [ref=e582]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Internet pour le découvrir !" [ref=e584]:
          - generic [ref=e585]: 🌐
          - generic [ref=e586]: "?"
        - button "Sticker mystère. Réponds au quiz de La Roue pour le découvrir !" [ref=e588]:
          - generic [ref=e589]: 🎡
          - generic [ref=e590]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Vélo pour le découvrir !" [ref=e592]:
          - generic [ref=e593]: 🚲
          - generic [ref=e594]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Appareil Photo pour le découvrir !" [ref=e596]:
          - generic [ref=e597]: 📸
          - generic [ref=e598]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Télescope pour le découvrir !" [ref=e600]:
          - generic [ref=e601]: 🔭
          - generic [ref=e602]: "?"
        - button "Sticker mystère. Réponds au quiz de La Boussole pour le découvrir !" [ref=e604]:
          - generic [ref=e605]: 🧭
          - generic [ref=e606]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Microscope pour le découvrir !" [ref=e608]:
          - generic [ref=e609]: 🔬
          - generic [ref=e610]: "?"
        - button "Sticker mystère. Réponds au quiz de La Radio pour le découvrir !" [ref=e612]:
          - generic [ref=e613]: 📻
          - generic [ref=e614]: "?"
        - button "Sticker mystère. Réponds au quiz de La Peinture pour le découvrir !" [ref=e616]:
          - generic [ref=e617]: 🖌️
          - generic [ref=e618]: "?"
        - button "Sticker mystère. Réponds au quiz de La Musique pour le découvrir !" [ref=e620]:
          - generic [ref=e621]: 🎵
          - generic [ref=e622]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Cinéma pour le découvrir !" [ref=e624]:
          - generic [ref=e625]: 🎬
          - generic [ref=e626]: "?"
        - button "Sticker mystère. Réponds au quiz de La Danse pour le découvrir !" [ref=e628]:
          - generic [ref=e629]: 💃
          - generic [ref=e630]: "?"
        - button "Sticker mystère. Réponds au quiz de La Sculpture pour le découvrir !" [ref=e632]:
          - generic [ref=e633]: 🗿
          - generic [ref=e634]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Théâtre pour le découvrir !" [ref=e636]:
          - generic [ref=e637]: 🎭
          - generic [ref=e638]: "?"
        - button "Sticker mystère. Réponds au quiz de L'Architecture pour le découvrir !" [ref=e640]:
          - generic [ref=e641]: 🏰
          - generic [ref=e642]: "?"
        - button "Sticker mystère. Réponds au quiz de La Photographie pour le découvrir !" [ref=e644]:
          - generic [ref=e645]: 📸
          - generic [ref=e646]: "?"
        - button "Sticker mystère. Réponds au quiz de Les Livres pour le découvrir !" [ref=e648]:
          - generic [ref=e649]: 📚
          - generic [ref=e650]: "?"
        - button "Sticker mystère. Réponds au quiz de La Bande Dessinée pour le découvrir !" [ref=e652]:
          - generic [ref=e653]: 📖
          - generic [ref=e654]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Cirque pour le découvrir !" [ref=e656]:
          - generic [ref=e657]: 🎪
          - generic [ref=e658]: "?"
        - button "Sticker mystère. Réponds au quiz de Le Jeu Vidéo pour le découvrir !" [ref=e660]:
          - generic [ref=e661]: 🎮
          - generic [ref=e662]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi le ciel est bleu ? pour le découvrir !" [ref=e664]:
          - generic [ref=e665]: 🌤️
          - generic [ref=e666]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi la mer est salée ? pour le découvrir !" [ref=e668]:
          - generic [ref=e669]: 🌊
          - generic [ref=e670]: "?"
        - button "Sticker mystère. Réponds au quiz de Comment se forme l'arc-en-ciel ? pour le découvrir !" [ref=e672]:
          - generic [ref=e673]: 🌈
          - generic [ref=e674]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi les chats ronronnent ? pour le découvrir !" [ref=e676]:
          - generic [ref=e677]: 🐱
          - generic [ref=e678]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi a-t-on des fourmis ? pour le découvrir !" [ref=e680]:
          - generic [ref=e681]: 🐜
          - generic [ref=e682]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi le fromage a des trous ? pour le découvrir !" [ref=e684]:
          - generic [ref=e685]: 🧀
          - generic [ref=e686]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi pleure-t-on avec les oignons ? pour le découvrir !" [ref=e688]:
          - generic [ref=e689]: 🧅
          - generic [ref=e690]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi la neige est blanche ? pour le découvrir !" [ref=e692]:
          - generic [ref=e693]: ❄️
          - generic [ref=e694]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi les feuilles tombent ? pour le découvrir !" [ref=e696]:
          - generic [ref=e697]: 🍂
          - generic [ref=e698]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi le zèbre a des rayures ? pour le découvrir !" [ref=e700]:
          - generic [ref=e701]: 🦓
          - generic [ref=e702]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi fait-on des rêves ? pour le découvrir !" [ref=e704]:
          - generic [ref=e705]: 😴
          - generic [ref=e706]: "?"
        - button "Sticker mystère. Réponds au quiz de Pourquoi fait-on caca ? pour le découvrir !" [ref=e708]:
          - generic [ref=e709]: 💩
          - generic [ref=e710]: "?"
    - generic [ref=e711]:
      - generic [ref=e712]: L'application est prête à être utilisée hors-ligne ! 🚀
      - button "Fermer" [ref=e714] [cursor=pointer]
    - generic [ref=e715]: KidPedia © 2026 • Reviens vite pour d'autres médailles !
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
> 51  |     await backBtn.click();
      |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  73  |        await genderBtn.click();
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