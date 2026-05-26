# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

### VERSION 3.25.0 - Suppression de la Page du Refuge des Compagnons 🦄🧹 (26 Mai 2026)
--------------------------------------------------
- **[Gamification/Architecture/Clean-up] Démantèlement et suppression de la page premium interactive Le Refuge :**
    - **RefugePage / RefugePage.module.css (Suppression)** : Retrait définitif des fichiers visuels et styles du Refuge des Compagnons dans `/src/pages/Refuge/`.
    - **useCompanionStore / Tests (Suppression)** : Retrait de `src/store/useCompanionStore.ts` et `src/store/useCompanionStore.test.ts` qui gérait la simulation de virtual pet (alimentation, besoins, sommeil, cache-cache) devenue obsolète.
    - **Router & Layout** : Suppression de la lazy loading import de `RefugePage` et de la route `/refuge` dans `src/App.tsx`, et nettoyage des routes immersives dans `src/components/Layout/MainLayout.tsx`.
    - **Discovery Grid** : Retrait du bouton premium "Le Refuge" de la grille d'accueil dans `src/pages/Home/index.tsx`.
    - **Parent Dashboard & Flow** : Nettoyage sémantique du visualisateur de flux Mermaid (`FlowDashboard.tsx`) pour retirer `refuge_view` et `store_companion`, et simplification de la description des tickets dans `ParentsDashboard.tsx`.
    - **Animations & Translations** : Suppression des styles d'animations premium interactives dans `TransformedEmoji.module.css` et purge complète de l'objet de traduction `refuge` et des clés `refugeTitle`/`refugeDesc` dans `fr.ts`, `en.ts` et `types.ts`.
    - **Vérification** : Validation totale à 100% de la suite de tests unitaires et d'intégration et vérification de la compilation TypeScript.

### VERSION 3.24.0 - Découplage de Fiche Encyclopédique & Interface TopicContent 🌌⚡ (25 Mai 2026)
--------------------------------------------------
- **[Architecture/Infrastructure/JSON] Découplage de données statiques & Interface TopicContent :**
    - **types.ts (TopicContent - Nouveau)** : Création de l'interface TypeScript stricte `TopicContent` dans `src/data/topics/types.ts` pour typer proprement et sans aucun `any` la structure complète d'une fiche encyclopédique (textes, catégories, anecdotes) et de son quiz associé.
    - **systeme-solaire.json (Nouveau)** : Extraction intégrale de la fiche encyclopédique et de la configuration du quiz de `systeme-solaire` de `/src` vers le nouveau fichier statique `public/content/topics/systeme-solaire.json` respectant rigoureusement le schéma `TopicContent`.
    - **Désensibilisation du dossier /src** : Suppression complète des données hardcodées de `systeme-solaire` dans `src/data/topics/space.ts` et `src/data/quizzes/space.ts`.
    - **TopicId & Raccordement type-safe** : Ajout explicite de `'systeme-solaire'` à l'union de types `TopicId` dans `src/types/domain.ts` pour préserver le raccordement et la validité sémantique sans briser les types dans le reste de l'application.
    - **useTopicFetcher.ts (Nouveau Hook & Tests - Ticket #79)** : Conception d'un hook React réactif de haut niveau `useTopicFetcher.ts` pour encapsuler proprement le cycle de vie du fetch asynchrone (data, isLoading, error), strictement typé sans `any`, et accompagné d'une couverture unitaire totale à 100% dans `useTopicFetcher.test.ts` (mockant fetch et vérifiant la résilience réseau face aux succès comme aux erreurs).
    - **AppLoader.tsx (Nouveau Composant - Ticket #80)** : Création d'un superbe composant de chargement enfantin `AppLoader` animé en CSS pur (fusée en orbite 🚀 autour d'une planète radial-gradient violette 🪐) pour masquer avec douceur et magie les temps de chargement des fiches d'aventures.
    - **TopicPage, Erreurs Enfantines & Intégration** : Simplification de `TopicPage` (`src/pages/Topic/index.tsx`) pour consommer le hook `useTopicFetcher` et brancher `<AppLoader />` comme loader de fiche et comme Suspense fallback. Remplacement de l'ancien panneau d'erreur austère par un écran d'erreur enfantin très chaleureux mettant en scène un dinosaure endormi (`🦖💤`), des explications bilingues bienveillantes, et un bouton d'action intuitif.
    - **TopicPage.test.tsx** : Mise à jour des tests d'intégration pour couvrir et valider les nouveaux états visuels de chargement et d'erreur réseau de `TopicPage`.
    - **dataIntegrity.test.ts (Tests unitaires)** : Mise à jour des tests d'intégrité de l'architecture pour accepter et valider le découplage de `systeme-solaire` et garantir 100% de réussite.

### VERSION 3.23.8 - Déclencheurs de Discussions Parent-Enfant & Hook useDailyDiscussion 💬👨‍👩‍👧 (25 Mai 2026)
--------------------------------------------------
- **[Logic/UX/Tests] Déclencheurs de Discussion Parent-Enfant & Moteur dailyDiscoveries :**
    - **discussionStarters.ts (Nouveau)** : Création d'un dictionnaire typé bilingue (FR/EN) associant des sujets de l'encyclopédie (ex: `lion`, `soleil`, `t-rex`) à des questions profondes pour stimuler les conversations parent-enfant. Intégration d'un ensemble de discussions de secours (`FALLBACK_DISCUSSIONS`) en l'absence de découvertes.
    - **useDailyDiscussion.ts (Nouveau Hook)** : Écriture d'un hook métier qui sélectionne aléatoirement jusqu'à 3 sujets uniques parmi les découvertes de la journée à partir du `useProgressionStore` et retourne les questions associées. Gestion intégrée de l'état de repli (fallback) si aucune découverte n'a été faite.
    - **useDailyDiscussion.test.ts (Tests Unitaires)** : Couverture unitaire totale garantissant le bon fonctionnement du fallback, de la sélection aléatoire sans doublon, et de la limitation à 3 sujets. Respect absolu du zéro any et du typage strict TypeScript.

### VERSION 3.23.7 - Suivi des Découvertes Quotidiennes & Purge Temporelle 📅🧹 (25 Mai 2026)
--------------------------------------------------
- **[Logic/Storage/Tests] Suivi et Persistance des Découvertes Quotidiennes (`dailyDiscoveries`) :**
    - **useProgressionStore.ts (Type & State)** : Ajout du champ `dailyDiscoveries` de type `Record<string, TopicId[]>` à la structure `ProfileProgression` et initialisation à `{}` dans les profils par défaut et migrés.
    - **addBadge (Enregistrement & Purge)** : Mise à jour de l'action de réussite de quiz pour enregistrer silencieusement le `topicId` sans doublon sous la date locale du jour (`YYYY-MM-DD`). Intégration d'une purge automatique des clés de découvertes de plus de 7 jours (lexicographiquement antérieures à la date limite).
    - **indexedDBStorage.ts** : Ajout de la rétrocompatibilité lors de la décompression d'anciens profils en initialisant `dailyDiscoveries` s'il est absent.
    - **useProgressionStore.test.ts (Tests Unitaires)** : Couverture totale de la fonctionnalité avec des tests validant l'initialisation, l'enregistrement sans doublon par date, et la purge de l'historique après 7 jours à l'aide de faux timers.

### VERSION 3.23.6 - Polissage Immersif & Exploration Libre sur Le Grand Voyage du Temps 🕰️✨ (25 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI/Logic] Peaufinage Visuel et Retrait des Quiz (Ticket #77) :**
    - **Origins.module.css (Look & Feel Immersif)** : Métamorphose de l'interface en un design haut de gamme ultra-immersif. Ajout d'un arrière-plan avec un dégradé cosmique profond animé en douceur et de deux grands halos de lumière flottants interactifs (`floatSlow`). Ajout d'un filtre de floutage de fond (`backdrop-filter`) et d'une bordure translucide sur le panneau de la ligne du temps pour un effet de verre poli ("glassmorphism") saisissant. Sublimation de la ligne temporelle vectorielle SVG avec un glow néon dynamique (`drop-shadow`) et de légères ombres portées intérieures/extérieures sur les bulles d'étapes. Refonte des cartes de détails pour en faire des feuillets de verre semi-transparents élégants s'animant délicatement au survol et à l'activation.
    - **OriginsGrid.tsx & Wording** : Remplacement du bouton d'action "Faire le quiz ! 🧩" destiné aux enfants par un appel à la découverte plus bienveillant "Découvrir 📖" (et "Discover 📖" en anglais) pour privilégier l'exploration libre et l'immersion narrative. Passage d'un état réactif `fromOrigins: true` lors de la transition vers le détail du sujet pour adapter dynamiquement l'interface d'apprentissage.
    - **TopicDetail.tsx & TopicPage (Logic & UI)** : Ajout d'une propriété conditionnelle optionnelle `hideQuiz`. Lorsque le sujet d'apprentissage est ouvert depuis Le Grand Voyage du Temps, le séparateur et le bloc de quiz sont élégamment masqués. La navigation de retour (`onBack`) s'adapte elle aussi intelligemment pour ramener l'enfant directement à l'étape exacte de la ligne temporelle dont il provient (`navigate(-1)`) plutôt que de forcer un retour brutal à l'accueil global.
- **[Logic/UX/UI/A11y] Le Verrouillage Kid-Safe Intelligent (Ticket #R9) :**
    - **SÃ©curitÃ© anti-spam** : En cas d'erreur, le systÃ¨me applique instantanÃ©ment un effet visuel de secousse (`shake`), brouille l'ordre d'affichage des cartes et sÃ©lectionne un TOUT NOUVEAU puzzle alÃ©atoire dans la banque pour interdire radicalement le forÃ§age par clics successifs.
    - **AccessibilitÃ© WCAG AA** : IntÃ©gration de descriptions vocales `aria-label` sÃ©mantiques et localisÃ©es sur chaque carte, boutons tactiles de trÃ¨s grande dimension pour un confort d'usage absolu sur tablette/mobile et contrastes ultra-elevÃ©s.
- **[Architecture/Infrastructure/Storage] Bascule Asynchrone du useProgressionStore (Ticket #76) :**
    - **Bascule IndexedDB** : Configuration et branchement directs du hook de persistance Zustand de `useProgressionStore` sur `indexedDBStorage`, Ã©liminant le calque intermÃ©diaire synchrone.
    - **Ã‰limination de la Dette de Compression** : Ã‰limination dÃ©finitive des fonctions de compression (`compressState` et `decompressState`) et de leurs types associÃ©s de `useProgressionStore.ts`, allÃ©geant de faÃ§on significative le code du store.
    - **CompatibilitÃ© descendante encapsulÃ©e** : Encapsulation totale de l'ancien format de dÃ©compression au sein de l'adaptateur IndexedDB (`indexedDBStorage.ts`) afin de garantir une migration 100% sans perte de donnÃ©es et transparente des profils compressÃ©s legacy stockÃ©s dans le `localStorage` des utilisateurs.
    - **Tests & Validation** : RÃ©Ã©criture complÃ¨te des suites de tests unitaires dans `useProgressionStore.test.ts` pour valider le stockage non-compressÃ© direct et le scÃ©nario de migration compressÃ© asynchrone transparente. All-Green validÃ©.¨s grande dimension pour un confort d'usage absolu sur tablette/mobile et contrastes ultra-Ã©levÃ©s.

### VERSION 3.23.5 - Moteur de Stockage Asynchrone IndexedDB ðŸ—„ï¸�âš¡ (25 Mai 2026)
--------------------------------------------------
- **[Architecture/Infrastructure/Storage] Moteur de Stockage Asynchrone branchÃ© sur IndexedDB :**
    - **indexedDBStorage.ts (Nouveau)** : Conception et Ã©criture d'un adaptateur de stockage asynchrone pour Zustand implÃ©mentant l'interface `StateStorage`. Utilise exclusivement les API IndexedDB natives sans aucune dÃ©pendance tierce pour garantir la stabilitÃ©, la performance et le respect du principe de zÃ©ro dÃ©pendance externe inutile.
    - **CompatibilitÃ© & Migration de DonnÃ©es HÃ©ritÃ©es** : Gestion automatique et transparente de la migration de donnÃ©es au chargement. Si une clÃ© est absente d'IndexedDB mais rÃ©side dans `localStorage` (avec ou sans compression synchrone), la donnÃ©e est lue, migrÃ©e de maniÃ¨re asynchrone vers IndexedDB, puis nettoyÃ©e du `localStorage` legacy.
    - **useProgressionStore.ts** : Migration complÃ¨te du store de progression pour utiliser le nouvel adaptateur de stockage asynchrone IndexedDB.
    - **QualitÃ© & Tests unitaires** : Ajout d'une suite de tests complÃ¨te dans `indexedDBStorage.test.ts` et adaptation de `useProgressionStore.test.ts` pour gÃ©rer le cycle de vie asynchrone de rÃ©hydratation. Mocking d'IndexedDB en utilisant des microtÃ¢ches (`Promise.resolve`) pour Ã©liminer tout risque d'effet de bord asynchrone, validant avec succÃ¨s 100% des tests de persistance, de compression et de rÃ©trocompatibilitÃ©.

### VERSION 3.23.4 - Correctifs de Layout, de Validation et de Scrollbar ðŸ› ï¸�ðŸ“± (25 Mai 2026)
--------------------------------------------------
- **[Architecture/QA] Correctif de type-check / compilation React :**
    - **LifeCirclePage.tsx** : Import explicite de `useRef` depuis React pour corriger une erreur de variable indÃ©finie empÃªchant la validation complÃ¨te.
- **[Aesthetics/UX/UI] Polissage Responsif & Correctifs CSS :**
    - **Home.module.css** : Ajustement de la hauteur maximale (`max-height: 70vh`) et activation du dÃ©filement vertical (`overflow-y: auto`) sur la grille d'accueil (`.hubGrid`). RÃ©solution d'une syntaxe incorrecte de sÃ©lecteur pseudo-Ã©lÃ©ment de barre de dÃ©filement webkit (`::-webkit-scrollbar`) et ajout de flex-direction column pour les cartes du hub.
    - **RefugePage.module.css** : Activation du retour Ã  la ligne (`flex-wrap: wrap`) pour le panneau d'actions (`.actionPanel`) au Refuge pour Ã©viter tout dÃ©bordement ou troncature visuelle sur mobile.

### VERSION 3.23.3 - Le Refuge des Compagnons : Cycle de sommeil, cache-cache et besoins ðŸ�¾ðŸ’¤ðŸ’© (25 Mai 2026)
--------------------------------------------------
- **[Gamification/Logic/UI/UX] Cycle de sommeil, cache-cache et besoins dans Le Refuge :**
    - **useCompanionStore.ts (Logic & State)** : Extension complÃ¨te du store persistant pour intÃ©grer les Ã©tats de simulation de vie (`energy`, `isSleeping`, `poops`, `isHiding`, `hidingSpot`, `hideSeekState`). ImplÃ©mentation des routines d'endormissement, d'incrÃ©mentation d'Ã©nergie, de gÃ©nÃ©ration de poops (30% de chance lors de l'alimentation), d'actions tactiles de nettoyage (ðŸ§¼) avec augmentation du bien-Ãªtre et de mini-jeu de cache-cache (deviner le buisson parmi 3).
    - **RefugePage.tsx & RefugePage.module.css (UI/UX)** : IntÃ©gration complÃ¨te de la simulation :
      - *Sommeil* : Bouton de dodo tamisant l'enclos dans un filtre nuit bleutÃ© et gÃ©nÃ©rant des particules d'Ã©mojis `ðŸ’¤` Ã©phÃ©mÃ¨res montantes.
      - *Besoins* : Rendu et positionnement dynamique des `ðŸ’©` cliquables dans le sandbox, avec nettoyage tactile, bulles de savon `ðŸ§¼` et restauration du bonheur.
      - *Cache-cache* : Remplacement du compagnon par 3 buissons magiques animÃ©s et frÃ©missants. En cas de succÃ¨s, le compagnon jaillit et l'explorateur gagne 2 tickets.
    - **Procedural Audio Synthesis** : Ajout d'ambiances et retours sonores procÃ©duraux Web Audio API (notes chimes de carillon pour le cache-cache correct, dÃ©faite, soap bubble pop pour le nettoyage et ronflements lÃ©gers de sommeil) respectant la sourdine parents (`isMuted`).
    - **useCompanionStore.test.ts (Tests unitaires)** : Ajout de 3 nouvelles suites de tests d'intÃ©gration simulant tout le cycle de sommeil (rÃ©gÃ©nÃ©ration passive), de nettoyage de poop et le bon dÃ©roulement du cache-cache.

### VERSION 3.23.2 - La Carte interactive SonorisÃ©e et SpatialisÃ©e ðŸ—ºï¸�ðŸ”Š (25 Mai 2026)
--------------------------------------------------
- **[Aesthetics/A11y/Logic/UI/UX] Carte interactive SonorisÃ©e et SpatialisÃ©e (Ticket #R6) :**
    - **useMapSounds.ts (Nouveau hook)** : Conception et implÃ©mentation d'un module d'habillage sonore spatialisÃ© procÃ©dural utilisant exclusivement l'API native Web Audio (zÃ©ro dÃ©pendance externe).
    - **Vagues & Vent marin continus** : SynthÃ¨se d'un bruit rose/blanc modulÃ© par LFO sinusoÃ¯daux lents (12s et 20s) pour simuler la houle marine et la brise ocÃ©anique, avec variations dynamiques lors du panning.
    - **SonoritÃ©s spatialisÃ©es interactives** : SynthÃ¨se de cris de mouettes (sweeps de frÃ©quences en triangle), de grondements volcaniques (bruit filtrÃ© low-pass modulÃ© Ã  10Hz) et d'arpÃ¨ges stellaires mystiques (chimes pentatoniques) spatialisÃ©s en stÃ©rÃ©o (StereoPannerNode) selon la position relative de l'Ã®le par rapport au centre de l'Ã©cran.
    - **Transitions douces & Sourdine** : IntÃ©gration de fondus linÃ©aires (fade in/out) de 400ms lors du survol/focus d'une Ã®le pour Ã©viter toute transition audio abrupte, et raccordement complet au store de prÃ©fÃ©rences `useSettingsStore` (respect de la sourdine globale `isMuted` et `isSfxMuted`).
    - **TreasureMap.tsx (UI/UX & A11y)** : Raccordement des Ã©vÃ©nements de survol (`onMouseEnter`/`onMouseLeave`), de focus (`onFocus`/`onBlur`) et de clic pour piloter l'immersion sonore globale et rÃ©active sans aucun re-rendering inutile de l'interface React, et raccordement sonore de tous les contrÃ´les (zoom in/out, bouton retour, popup d'exploration).
    - **useMapSounds.test.ts (Tests unitaires)** : Suite complÃ¨te de tests unitaires pour valider l'initialisation de l'AudioContext, le cycle de vie des sons procÃ©duraux sur le survol/selection et le respect des prÃ©fÃ©rences de sourdine parents.

### VERSION 3.23.1 - La Cabane et le Refuge : Nourrissage et affection des compagnons ðŸ¦´ðŸ�Ž (25 Mai 2026)
--------------------------------------------------
- **[Gamification/Logic/UI/UX] FonctionnalitÃ© "Manger" dans Le Refuge des Compagnons (Ticket #74) :**
    - **useCompanionStore.ts (Logic & State)** : Refactorisation de l'action `feedCompanion` en une action pure prenant explicitement en arguments `(profileId, companionId, treatId)` sans couplage impÃ©ratif direct avec l'Ã©tat global du profil actif.
    - **Consommation d'inventaire & Clamping** : DÃ©duction stricte de 1 item de friandise par nourrissage, blocage de l'action en cas d'inventaire vide, incrÃ©mentation de l'affection (+15) et du bonheur (+10) bridÃ©e Ã  la limite stricte de 100 via clamping dynamique `Math.min`.
    - **isFeeding (State Ã©phÃ©mÃ¨re)** : IntÃ©gration d'une propriÃ©tÃ© Ã©phÃ©mÃ¨re rÃ©active `isFeeding: boolean` dans l'Ã©tat du compagnon, activÃ©e instantanÃ©ment et nettoyÃ©e de faÃ§on autonome via `setTimeout` aprÃ¨s 2 secondes pour orchestrer et piloter les micro-animations vectorielles de l'interface.
    - **RefugePage.tsx (UI & UX)** : Connexion complÃ¨te de l'action de nourrissage, dÃ©clenchement de la classe d'animation via le store rÃ©actif, Ã©mission d'un signal sonore cartoon ascendant via l'API Web Audio native (C5-E5-G5) avec sourdine globale (`isMuted`).
    - **useCompanionStore.test.ts (Tests unitaires)** : RÃ©Ã©criture complÃ¨te de la suite de tests avec l'utilisation de `vi.useFakeTimers()` pour vÃ©rifier le cycle de vie Ã©phÃ©mÃ¨re de l'Ã©tat `isFeeding` et la protection contre le dÃ©passement des limites d'affection et de bonheur.

### VERSION 3.23.0 - Le Grand Quiz des Champions ðŸ�†âš¡ (25 Mai 2026)
--------------------------------------------------
- **[Gamification/Logic/UI/UX] Le Grand Quiz des Champions (Mode DÃ©fi) (Ticket #R5) :**
    - **useQuizChampionshipStore.ts (Logic & State)** : CrÃ©ation d'un magasin Zustand persistant (LocalStorage) gÃ©rant le tirage de 10 questions alÃ©atoires, le compte Ã  rebours de 15 secondes par question, le calcul et le stockage sÃ©curisÃ© des 5 meilleurs scores locaux (Wall of Fame) avec l'avatar et le nom de l'explorateur actif.
    - **ChampionshipPage.tsx & ChampionshipPage.module.css (UI/UX)** : IntÃ©gration d'un Ã©cran de jeu immersif haut de gamme (effets nÃ©ons, dÃ©gradÃ©s d'or en glassmorphism et animations 3D) avec un minuteur graphique interactif SVG reprÃ©sentant une mÃ¨che d'allumette qui se consume avec une flamme animÃ©e vacillante.
    - **Procedural Sound Synthesis (Web Audio API)** : Conception d'un moteur de sons procÃ©duraux (chime de rÃ©ussite, bourdonnement de mauvaise rÃ©ponse, horloge de stress pour les 5 derniÃ¨res secondes, signal de temps Ã©coulÃ© et fanfare finale harmonieuse) assurant une immersion sonore sans dÃ©pendance de fichiers externes lourds.
    - **Visual Celebrations (Confetti)** : DÃ©clenchement d'explosions de confettis en fin de jeu et double cascade dorÃ©e symÃ©trique exclusive en cas de sans-faute parfait (10/10).
    - **App.tsx & HomePage.tsx (Navigation)** : Enregistrement de la nouvelle route `/championship` et ajout d'une tuile d'accÃ¨s thÃ©matique Â« Le Grand Quiz des Champions Â» dans la grille du Hub de DÃ©couverte (IcÃ´ne Rocket dorÃ©e).
- **[Parents/Architecture] Refonte premium et interactive complÃ¨te du Visualisateur de Flux (Flow Visualizer) :**
    - **Interactive Layer Filtering** : Ajout de filtres interactifs par clic sur les catÃ©gories de la lÃ©gende pour isoler visuellement n'importe quelle couche de l'application (Points d'EntrÃ©e, Vues, Composants Graphiques, Zustand Stores, Bases de DonnÃ©es, Hooks/Feedback) en attÃ©nuant dynamiquement le reste du diagramme via des transitions fluides CSS.
    - **Floating Zoom & Reset Panel** : ImplÃ©mentation d'un module de zoom dynamique (de 50% Ã  160%) avec centrage Ã©lastique et barres de dÃ©filement personnalisÃ©es pour parcourir facilement les diagrammes d'architecture complexes.
    - **Updated Architecture Graph** : Mise Ã  jour complÃ¨te de la cartographie Mermaid pour y inclure les modules du Refuge des Compagnons, la boutique de friandises, le Grand Quiz des Champions et le magasin `useQuizChampionshipStore`.
    - **Export Vectoriel PNG & SVG** : Optimisation des routines de sÃ©rialisation XML autonomes avec rÃ©solution automatique des variables CSS de thÃ¨me pour des tÃ©lÃ©chargements instantanÃ©s de diagrammes haute dÃ©finition.

### VERSION 3.22.8 - Liaison EncyclopÃ©dique & Quizz Interactifs du Moyen-Ã‚ge ðŸ›¡ï¸�ðŸ�° (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour le Moyen-Ã‚ge (Ticket #44) :**
    - **middleAges.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`ma1` Ã  `ma8`) Ã  des identifiants de sujets uniques (`romains`, `chevaliers`, `chateaux`, `cathedrales`, `calligraphie`, `moulins-moyen-age`, `foires-marches`, `invention-papier`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 5 nouvelles fiches Ã©ducatives bilingues adaptÃ©es pour le jeune public de 4-8 ans (`cathedrales`, `calligraphie`, `moulins-moyen-age`, `foires-marches`, `invention-papier`).
    - **quizzes/history.ts (Quizz)** : CrÃ©ation de 5 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage du Moyen-Ã‚ge.
    - **constants/ids.ts (Typage & IntÃ©gration)** : DÃ©claration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.7 - Liaison EncyclopÃ©dique & Quizz Interactifs des Grandes civilisations ðŸ�ºðŸ�›ï¸� (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour les Grandes civilisations (Ticket #43) :**
    - **civilizations.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`cv1` Ã  `cv8`) Ã  des identifiants de sujets uniques (`pyramides`, `ecriture-sacree`, `grece-antique`, `romains`, `mayas`, `grande-muraille`, `empire-incas`, `vikings`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 2 nouvelles fiches Ã©ducatives bilingues adaptÃ©es pour le jeune public de 4-8 ans (`ecriture-sacree`, `empire-incas`).
    - **quizzes/history.ts (Quizz)** : CrÃ©ation de 2 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage des grandes civilisations.
    - **constants/ids.ts (Typage & IntÃ©gration)** : DÃ©claration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.6 - Liaison EncyclopÃ©dique & Quizz Interactifs des Regroupements primitifs ðŸ›–ðŸŒ¾ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour les Regroupements primitifs (Ticket #42) :**
    - **groups.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`gv1` Ã  `gv8`) Ã  des identifiants de sujets uniques (`sedentarisation`, `murs-terre`, `debuts-agriculture`, `debuts-elevage`, `invention-poterie`, `vie-communaute`, `tissage-laine`, `megalithes`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 8 nouvelles fiches Ã©ducatives bilingues adaptÃ©es pour le jeune public de 4-8 ans.
    - **quizzes/history.ts (Quizz)** : CrÃ©ation de 8 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage du mode de vie sÃ©dentaire.
    - **constants/ids.ts (Typage & IntÃ©gration)** : DÃ©claration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.5 - Liaison EncyclopÃ©dique & Quizz Interactifs de l'Ã‰volution de l'homme ðŸš¶ðŸ”¥ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour l'Ã‰volution de l'homme (Ticket #41) :**
    - **evolution.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`ev1` Ã  `ev8`) Ã  des identifiants de sujets uniques existants (`dompteur-feu`, `prehistoire`, `artisan-pierres`, `artistes-cavernes`, `loup`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.

### VERSION 3.22.4 - Liaison EncyclopÃ©dique & Quizz Interactifs des PremiÃ¨res formes humaines ðŸ�œï¸�ðŸš¶ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches pÃ©dagogiques pour les PremiÃ¨res formes humaines (Ticket #40) :**
    - **humans.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`hf1` Ã  `hf8`) Ã  des identifiants de sujets uniques (`berceau-afrique`, `debout-deux-pieds`, `artisan-pierres`, `dompteur-feu`, `grand-voyage`, `cousins-neandertal`, `artistes-cavernes`, `premiers-villages`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 8 nouvelles fiches Ã©ducatives bilingues adaptÃ©es pour le jeune public de 4-8 ans.
    - **quizzes/history.ts (Quizz)** : CrÃ©ation de 8 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et consolider l'apprentissage de l'Ã©volution humaine.

### VERSION 3.22.3 - Liaison EncyclopÃ©dique & Quizz Interactifs des Dinosaures ðŸ¦–ðŸ¦• (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive des sous-nÅ“uds des Dinosaures dans la frise chronologique (Ticket #39) :**
    - **dinosaurs.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`dn1` Ã  `dn8`) Ã  des identifiants de sujets uniques existants (`velociraptor`, `diplodocus`, `pterodactyle`, `brachiosaure`, `stegosaure`, `spinosaure`, `t-rex`, `triceratops`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique des dinosaures d'Origins.

### VERSION 3.22.2 - Liaison EncyclopÃ©dique & Quizz Interactifs des PremiÃ¨res espÃ¨ces terrestres ðŸ¦ŽðŸ�ƒ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et suppression des impasses pÃ©dagogiques pour les PremiÃ¨res espÃ¨ces terrestres (Ticket #38) :**
    - **land.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`ls1` Ã  `ls8`) Ã  des identifiants de sujets uniques (`sortie-des-eaux`, `air-pur`, `premieres-forets`, `insectes-geants`, `peau-reptile`, `oeuf-solide`, `climat-change`, `apparition-fleurs`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/nature.ts (EncyclopÃ©die)** : CrÃ©ation de 4 fiches bilingues dÃ©taillÃ©es (`air-pur`, `premieres-forets`, `climat-change`, `apparition-fleurs`), incluant des descriptions adaptÃ©es pour les enfants de 4-8 ans et des anecdotes amusantes en franÃ§ais et en anglais.
    - **topics/animals.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 4 nouvelles fiches Ã©ducatives captivantes (`sortie-des-eaux`, `insectes-geants`, `peau-reptile`, `oeuf-solide`) avec un vocabulaire bilingue riche et adaptÃ©.
    - **quizzes/nature.ts (Quizz)** : CrÃ©ation de 4 quiz interactifs pour les nouveaux sujets de la nature avec questions, options de rÃ©ponse, rÃ©ponses correctes et indices pÃ©dagogiques localisÃ©s.
    - **quizzes/animals.ts (Quizz)** : CrÃ©ation de 4 nouveaux quiz interactifs et intuitifs pour chaque nouvelle espÃ¨ce terrestre prÃ©historique afin de consolider la gamification et l'Ã©valuation continue.
    - **constants/ids.ts (Typage & IntÃ©gration)** : DÃ©claration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application et la suite de tests.

### VERSION 3.22.1 - Liaison EncyclopÃ©dique & Quizz Interactifs des PremiÃ¨res espÃ¨ces marines ðŸ”¬ðŸ�Ÿ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et suppression des impasses pÃ©dagogiques pour les PremiÃ¨res espÃ¨ces marines (Ticket #37) :**
    - **marine.ts (Navigation)** : Association de chacun des 8 sous-nÅ“uds intermÃ©diaires (`ms1` Ã  `ms8`) Ã  des identifiants de sujets uniques (`premieres-cellules`, `meduses-eponges`, `trilobites`, `vers-marins`, `coquillages-primitifs`, `anomalocaris`, `poissons-sans-machoires`, `poissons-ecailles`), ouvrant l'accÃ¨s interactif complet Ã  leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/nature.ts (EncyclopÃ©die)** : CrÃ©ation d'une fiche bilingue dÃ©taillÃ©e pour `premieres-cellules`, incluant des descriptions adaptÃ©es pour les enfants de 4-8 ans et des anecdotes amusantes en franÃ§ais et en anglais.
    - **topics/animals.ts (EncyclopÃ©die)** : Conception et intÃ©gration de 7 nouvelles fiches Ã©ducatives captivantes (`meduses-eponges`, `trilobites`, `vers-marins`, `coquillages-primitifs`, `anomalocaris`, `poissons-sans-machoires`, `poissons-ecailles`) avec un vocabulaire bilingue riche et adaptÃ©.
    - **quizzes/nature.ts (Quizz)** : CrÃ©ation d'un quiz interactif pour `premieres-cellules` avec questions, options de rÃ©ponse, rÃ©ponses correctes et indices pÃ©dagogiques localisÃ©s.
    - **quizzes/animals.ts (Quizz)** : CrÃ©ation de 7 nouveaux quiz interactifs et intuitifs pour chaque nouvelle espÃ¨ce marine prÃ©historique afin de consolider la gamification et l'Ã©valuation continue.
    - **constants/ids.ts (Typage & IntÃ©gration)** : DÃ©claration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application et la suite de tests.

### VERSION 3.22.0 - Refonte Premium du Tableau de Bord Parents & ContrÃ´le du Temps d'Ã‰cran ðŸ“Šâ�±ï¸� (25 Mai 2026)
--------------------------------------------------
- **[UX/UI/Logic/ParentalControl] Refonte complÃ¨te et premium de l'Espace Parents pour un produit haut de gamme fini (Ticket #73) :**
    - **ParentsDashboard.tsx** :
        - ImplÃ©mentation d'une structure Ã  4 onglets dynamiques (`stats` | `control` | `tips` | `tech`) permettant de segmenter Ã©lÃ©gamment les donnÃ©es.
        - Ajout d'un sÃ©lecteur d'explorateur en temps rÃ©el en haut de page pour adapter instantanÃ©ment les donnÃ©es au profil sÃ©lectionnÃ©.
        - **Calculateur de Progression DÃ©taillÃ©** : IntÃ©gration de calculs en direct d'XP, niveau, mÃ©dailles Or/Argent/Bronze et de la complÃ©tion thÃ©matique exacte par catÃ©gorie de l'encyclopÃ©die (Espace, Dinosaures, Animaux, Corps Humain, Arts, GÃ©ographie, Histoire, Inventions, Nature, Questions).
        - **Limites de Temps d'Ã‰cran** : Nouvelle fonctionnalitÃ© de limitation quotidienne du temps de jeu (IllimitÃ©, 15 min, 30 min, 45 min, 60 min) persistant de maniÃ¨re autonome en LocalStorage par profil.
        - **Guide Ã‰ducatif & Discussion** : GÃ©nÃ©rateur de questions de discussion personnalisÃ© parent-enfant ("DÃ©marreurs de discussion") s'adaptant en direct aux mÃ©dailles rÃ©ellement dÃ©crochÃ©es par le profil, pour favoriser le prolongement hors-Ã©cran.
        - **Gestion d'IdentitÃ© & SÃ©curitÃ©** : Ã‰diteur de nom d'explorateur en ligne, purge de progression et suppression sÃ©curisÃ©e et synchronisÃ©e de profils.
        - **Linter & TS Compliance** : Correction de l'effet synchrone de re-rendering via une microtÃ¢che asynchrone, typages TypeScript stricts Ã©liminant les casts laxistes `as any`.
    - **ParentsDashboard.module.css** :
        - Rendu visuel d'exception : design moderne exploitant un radial-gradient doux thÃ©matique de fond, s'adaptant au thÃ¨me sombre et au thÃ¨me clair.
        - Effets de cartes d'affichage en **glassmorphism** d'une grande finesse avec des bordures translucides (`backdrop-filter: blur()`), ombres douces et transitions animÃ©es 3D d'enfoncement physique au clic/survol.
        - Layout Ã©lastique responsif complet (Flexbox et CSS Grid) avec polices fluides garantissant un affichage optimal et sans dÃ©bordement sur mobiles, tablettes et ordinateurs.

### VERSION 3.21.1 - Correctifs d'Affichage Responsif & Parallaxe sur Mobile (24 Mai 2026)
--------------------------------------------------
- **[UX/UI/Responsive/A11y] RÃ©solution des dÃ©fauts d'affichage responsifs, d'overflow et de layout sur la page du Cercle de la Vie (LifeCirclePage) (Ticket #72) :**
    - **LifeCirclePage.tsx** : SÃ©curisation de l'ajustement Ã©cran 100% en SVG via `preserveAspectRatio="xMidYMin slice"` sur l'arriÃ¨re-plan du ciel profond, Ã©liminant les bandes blanches horizontales sur mobile. Harmonisation du ciblage des textes pour la baguette magique et flexibilitÃ© du bouton retour.
    - **LifeCirclePage.module.css** :
        - Optimisation de la hauteur de la zone de parallaxe (`.parallaxGroup` de `250vh` Ã  `200vh` sur desktop, `160vh` sur tablette, `130vh` sur mobile) pour limiter les dÃ©filements inutiles et l'overflow parasite.
        - Bouton de retour compact circulaire sur mobile (<768px) masquant le texte pour Ã©viter l'encombrement horizontal.
        - Regroupement des contrÃ´les de saison en barre compacte tactile auto-adaptative limitant le dÃ©bordement horizontal (`max-width: calc(100% - 5.5rem)`).
        - Correction des instructions de survol avec centrage Ã©lastique et rÃ©duction du padding.
        - **Micro-interactions Tactiles Premium** : IntÃ©gration de retours tactiles fluides (`transform: scale(0.95)` / `scale(0.92)` et attÃ©nuation de l'ombre portÃ©e) sur les Ã©tats `:active` de tous les Ã©lÃ©ments interactifs cliquables (`.backButton`, `.seasonBtn`, `.exploreMoreBtn`, `.closeBtn`), amÃ©liorant considÃ©rablement l'engagement sensoriel.
        - **AccessibilitÃ© Universelle (A11y)** : Ajout d'indicateurs visuels de focus clavier robustes et hautement contrastÃ©s (`:focus-visible` avec outlines et dÃ©calages calculÃ©s) sur l'ensemble des boutons interactifs de navigation, de saison et d'action, garantissant la conformitÃ© totale WCAG.
        - **Animations PÃ©dagogiques** : RÃ©tablissement de la lÃ©vitation douce par pulsation (`pulse` infinie Ã  30 FPS) sur la boÃ®te d'instructions flottantes, guidant naturellement le regard de l'enfant.
    - **TreasureMap.module.css (Carte au TrÃ©sor)** :
        - **Tactile & Micro-interactions** : IntÃ©gration de l'effet d'enfoncement tactile 3D (`:active`) sur les boutons de zoom de la carte (`.zoomBtn`) et les Ã®les/marqueurs de dÃ©couverte (`.mapMarkerPoint`), animant les icÃ´nes vectorielles avec un rÃ©trÃ©cissement Ã©lastique et une lÃ©gÃ¨re rotation inversÃ©e au clic.
        - **AccessibilitÃ© Focus Clavier** : Remplacement de l'inhibition des outlines clavier (`outline: none`) par des halos de focus lumineux contrastÃ©s (`:focus-visible`) dorÃ©s thÃ©matiques avec un dÃ©calage compensÃ© (`outline-offset: 4px`), ouvrant la navigation spatiale de la carte Ã  100% de conformitÃ© WCAG.
    - **TreasureMap.tsx & TreasureMap.test.tsx (HomogÃ©nÃ©itÃ© Mobile)** :
        - **OrientationGuard Mobile** : IntÃ©gration du composant rÃ©utilisable de garde-fou d'orientation (`OrientationGuard`), invitant chaleureusement l'enfant Ã  basculer sa tablette ou son smartphone horizontalement pour profiter d'un champ visuel optimal sur la carte au trÃ©sor, alignÃ© sur l'expÃ©rience premium de Mission Safari.
        - **SÃ©curisation de Tests** : Mock du composant `OrientationGuard` dans la suite de tests unitaires et d'intÃ©gration `TreasureMap.test.tsx` pour garantir 100% de robustesse et de passage au vert de la suite de tests de non-rÃ©gression.

### VERSION 3.21.0 - Sprint d'Optimisation, Localisation & AccessibilitÃ© (24 Mai 2026)
--------------------------------------------------
- **[Logic/QA/TypeScript] RÃ©solution des erreurs de compilation strictes TypeScript (Ticket #05, Ticket #22) :**
    - **useAmbientAudio.ts** : Changement du type de `fadeIntervalRef` de `ReturnType<typeof setInterval> | null` Ã  `ReturnType<typeof setInterval> | undefined` pour corriger les erreurs de compilation stricte TS2345 liÃ©es Ã  `clearInterval` qui n'accepte pas `null`.
    - **useAudioFeedback.ts** : SÃ©curisation du transtypage de l'objet `window` pour obtenir `webkitAudioContext` sans utiliser le type interdit `any`, Ã©vitant ainsi les violations de la rÃ¨gle `@typescript-eslint/no-explicit-any`.
- **[i18n/PWA/Security] Traduction et protection du prompt d'installation PWA (Ticket #25, Ticket #26) :**
    - **types.ts / fr.ts / en.ts** : Ajout du namespace structurel `pwa` pour traduire de maniÃ¨re complÃ¨te et bilingue les messages du prompt de mise Ã  jour et de l'installation hors-ligne.
    - **PWAPrompt.tsx** : Raccordement du composant au store de prÃ©fÃ©rences `useSettingsStore` pour dynamiser les messages. Ajout d'un garde-fou persistÃ© dans le `localStorage` sous la clÃ© `kp-pwa-dismissed` pendant 24 heures pour Ã©viter les rÃ©affichages rÃ©cursifs intempestifs sur Safari iOS.
- **[UX/UI/Responsive/A11y] Refonte adaptative et accessibilitÃ© du Refuge des Compagnons (Ticket #66, Ticket #67, Ticket #68, Ticket #71) :**
    - **RefugePage.tsx** : IntÃ©gration du hook `useTextToSpeech` et du composant d'accessibilitÃ© `DiscreteSpeaker` pour vocaliser les descriptions d'adoption et les friandises de la boutique, offrant une autonomie Ã  100% pour les enfants de 4-6 ans.
    - **RefugePage.module.css** :
        - Optimisation du layout pour mobile via l'ajout de `@media` ciblÃ©s pour recalculer les paddings de `.refugeContainer`, `.sandbox`, et `.boutiqueCard`.
        - RÃ©tablissement de `display: grid` sur `.dashboardGrid` pour les Ã©crans larges (> 992px) pour restaurer la mise en page double colonne sur desktop.
        - Empilement vertical (`flex-direction: column`) des boutons d'actions sous les 640px de largeur d'Ã©cran et polices fluides (`clamp`) pour Ã©liminer la troncature du bouton "Nourrir" et du titre "Magasin de Friandises".
- **[UX/UI] Correction des icÃ´nes de compagnons et en-tÃªte immersif (Ticket #64, Ticket #70) :**
    - **MissionSafari.tsx** : Mise Ã  jour du helper `getCompanionIcon()` pour supporter les identifiants rÃ©els enregistrÃ©s dans le store (`dog-companion`, `dino-companion`, `robot-companion`), rÃ©tablissant l'icÃ´ne personnalisÃ©e active dans la boÃ®te de dialogue en jeu.
    - **MainLayout.tsx** : Ajout de la route `/refuge` aux routes immersives (`isImmersive`), masquant automatiquement le double header global et le footer global pour maximiser l'espace vertical disponible en mode portrait.

### VERSION 3.20.14 - IntÃ©gration de la sourdine globale au Refuge des Animaux ðŸ¤«ðŸ�¾ (24 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/A11y/QA] ConformitÃ© de la sourdine globale (isMuted) dans Le Refuge (Ticket #65) :**
    - **RefugePage.tsx** : RÃ©cupÃ©ration rÃ©active de la variable `isMuted` depuis le store de prÃ©fÃ©rences `useSettingsStore` et ajout d'un garde-fou `if (isMuted) return;` au tout dÃ©but de la fonction de synthÃ¨se Web Audio `playSound`. Tous les effets sonores synthÃ©tisÃ©s interactifs (actions de caresse "pet", alimentation "feed", achat de friandises "buy" et alertes d'erreurs "error") respectent dÃ©sormais instantanÃ©ment la sourdine gÃ©nÃ©rale demandÃ©e par les parents, assurant une tranquillitÃ© d'usage absolue.

### VERSION 3.20.13 - RÃ©solution de la fuite de donnÃ©es de compagnons lors de la suppression de profil ðŸ¦„ðŸ§¹ (24 Mai 2026)
--------------------------------------------------
- **[Logic/QA/DataSecurity] Suppression sÃ©curisÃ©e et synchronisÃ©e des donnÃ©es des compagnons (Ticket #63) :**
    - **useProfileStore.ts** : Importation de `useCompanionStore` et mise Ã  jour de l'action `deleteProfile` pour appeler de maniÃ¨re coordonnÃ©e `useCompanionStore.getState().deleteProfileCompanionData(id)`. Cela garantit que la suppression d'un profil dÃ©truit immÃ©diatement toutes les donnÃ©es de compagnons associÃ©es et prÃ©vient toute accumulation orpheline de donnÃ©es persistantes dans `localStorage` (clÃ© `kp-companion-storage`).
    - **useProfileStore.test.ts** : Ã‰criture d'un test d'intÃ©gration unitaire robustement isolÃ© validant l'appel correct de `deleteProfileCompanionData(id)` lors de l'appel Ã  `deleteProfile`, et intÃ©gration de `useCompanionStore.getState().reset()` dans le hook global `beforeEach` pour maintenir une parfaite isolation des tests.

### VERSION 3.20.12 - Liaison EncyclopÃ©dique & Quizz Interactifs des sous-nÅ“uds du Big Bang ðŸ’¥ðŸŒŒ (24 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et Ã©limination des culs-de-sac pÃ©dagogiques de la frise chronologique d'Origins (Ticket #36) :**
    - **bigBang.ts (Navigation)** : Association rÃ©ussie de chacun des 7 nÅ“uds intermÃ©diaires (`bb2` Ã  `bb8`) Ã  son identifiant de sujet unique (`soupe-particules`, `naissance-atomes`, `expansion`, `premieres-etoiles`, `premieres-galaxies`, `voie-lactee`, `systeme-solaire`), dÃ©bloquant l'accÃ¨s Ã  la fiche dÃ©taillÃ©e et au quiz associÃ© pour toute la frise du Big Bang.
    - **topics/space.ts (EncyclopÃ©die)** : CrÃ©ation et intÃ©gration de 7 nouvelles fiches Ã©ducatives riches et bilingues adaptÃ©es pour les 4-8 ans. Chaque fiche dispose d'icÃ´nes spÃ©cifiques, de descriptions courtes, de variations de paragraphes pÃ©dagogiques complets (`fullContent` / `fullContents`) et d'anecdotes rigolotes (`funFact` / `funFacts`) en franÃ§ais et en anglais.
    - **quizzes/space.ts (Banque de Quizz)** : DÃ©claration de 7 nouveaux quiz interactifs et stimulants dans le dictionnaire global `QUIZZES`. Chaque quiz offre des questions captivantes bilingues, des choix multiples adaptÃ©s et des indices pÃ©dagogiques localisÃ©s (`hint`) en franÃ§ais et en anglais pour encourager les enfants en cas d'erreur.
    - **dataIntegrity.test.ts (Validation)** : IntÃ©gration complÃ¨te dans la suite de tests de validation d'intÃ©gritÃ© de la base de donnÃ©es, garantissant le typage dynamique strict des nouveaux identifiants kebab-case et s'assurant qu'aucun sujet ou quiz n'est orphelin ou brisÃ©.

### VERSION 3.20.11 - Dimensionnement Dynamique CompensÃ© & Test de Scale Inverse des Marqueurs de Carte ðŸ—ºï¸�ðŸ”� (23 Mai 2026)
--------------------------------------------------
- **[UX/QA/Aesthetics] Dimensionnement dynamique des marqueurs de la carte interactive (Ticket #35) :**
    - **TreasureMap.tsx** : Passage rÃ©actif du `zoom` actuel au composant `MapPoint` et application du style inline compensÃ© `transform: translate(-50%, -50%) scale(${1 / zoom})`. Cette formule neutralise le grossissement liÃ© au zoom global CSS, conservant la lisibilitÃ© et des dimensions parfaites pour les Ã©mojis et les Ã©toiles de mÃ©dailles sans overlapping visuel.
    - **TreasureMap.test.tsx** : Ã‰criture d'un nouveau test unitaire (`applique un facteur d'Ã©chelle inverse sur les marqueurs selon le niveau de zoom`) vÃ©rifiant formellement le passage Ã  l'Ã©chelle `scale(1)` Ã  zoom `x1`, puis le recalcul Ã  `scale(0.5)` Ã  zoom `x2`.

### VERSION 3.20.10 - Suggestions de Recherche Interactives & RÃ©solution du Dead End d'Exploration ðŸ”�âœ¨ (23 Mai 2026)
--------------------------------------------------
- **[UX/i18n/Aesthetics/A11y/QA] Ã‰radication de l'impasse ergonomique de recherche sans rÃ©sultat (Ticket #33) :**
    - **types.ts / fr.ts / en.ts** : DÃ©claration sÃ©mantique et implÃ©mentation bilingue des traductions `trySearching` ("Essaie de rechercher :" / "Try searching:") et `popularSuggestions` mappant les sujets populaires phares avec leurs mots-clÃ©s (Soleil, Dinosaures, Lion, Volcan, Espace).
    - **Home.module.css** : CrÃ©ation de styles interactifs cartoons de type bouton 3D. L'ombre physique 3D s'enfonce au clic (`:active`) et s'anime en douceur au survol, offrant un retour sensoriel gratifiant. Surcharges du mode sombre garantissant un contraste parfait sur fond bleu nuit.
    - **Home/index.tsx** : IntÃ©gration de la zone de suggestions sous le message de non-rÃ©sultat, permettant de mettre Ã  jour instantanÃ©ment la recherche et de relancer le filtrage rÃ©actif du store Zustand au clic.
    - **App.test.tsx** : Ã‰criture d'un test d'intÃ©gration complet validant l'absence de rÃ©sultats, l'apparition des Ã©tiquettes de suggestion, leur clic interactif, la synchronisation du champ et le filtrage dynamique.
- **[QA] Alignement des assertions de test d'intÃ©gration d'XP :**
    - **XPAndMedals.integration.test.tsx** : Ajustement des attentes de score (`1.0k` âž” `1.5k`). La mÃ©daille d'or octroie dÃ©sormais 1500 XP en raison du bonus de fiertÃ© Perfect de `+500 XP` introduit lors du Ticket #18, rÃ©solvant un conflit d'assertion bloquant dans la suite de tests.

### VERSION 3.20.9 - DÃ©gradÃ©s Vectoriels d'Origins Adaptatifs & Haut Contraste ðŸ•°ï¸�ðŸŽ¨ (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/A11y/QA] ThÃ©misation dynamique et rÃ©siliente des dÃ©gradÃ©s vectoriels d'Origins (Ticket #31) :**
    - **vars.css** :
        - DÃ©claration de 24 nouvelles variables CSS de gradients de frise chronologique (`--color-origins-...`) au niveau de la racine `:root` pour le thÃ¨me clair, assurant la fidÃ©litÃ© avec la palette historique d'Origins.
        - Conception d'une palette adaptative haute visibilitÃ© et haut de gamme dans le bloc `html[data-theme='dark']` / `.dark`. Les teintes excessivement sombres du mode clair (ex: bleu nuit `#0f172a` pour le Big Bang, marrons et verts sapin sombres) sont surchargÃ©es en mode nuit par des dÃ©gradÃ©s de nÃ©ons cosmiques Ã©clatants (indigo Ã©lectrique, rose, cyan vibrant, Ã©meraude) pour garantir un contraste WCAG AAA exceptionnel sans perturber le confort oculaire.
    - **OriginsLayout.tsx** :
        - Remplacement intÃ©gral des valeurs statiques `stopColor` des 9 dÃ©finitions `<linearGradient>` du SVG de tracÃ© par les variables CSS dynamiques `var(--color-origins-...)`.
        - Permet la rÃ©actualisation instantanÃ©e et fluide Ã  60 FPS du style de la frise chronologique lors du basculement de thÃ¨me sans aucun coÃ»t de rendu React ou re-render JS synchrone.

### VERSION 3.20.8 - VariabilitÃ© de Contenu & PoC CatÃ©gorie Nature ðŸŒ³ðŸŒ‹ (23 Mai 2026)
--------------------------------------------------
- **[Content/UX/QA] Preuve de Concept (PoC) de la variabilitÃ© de contenu pour la thÃ©matique Nature (Ticket #20) :**
    - **nature.ts** :
        - Les Arbres (`arbres`) : Enrichissement avec un tableau `fullContents` (3 variations graduelles dÃ©crivant le rÃ´le des feuilles, l'absorption de CO2, le rÃ©seau racinaire et les abris de faune) et `funFacts` (3 anecdotes, dont la communication via rÃ©seau fongique sous-terrain).
        - Le Volcan (`volcan`) : Enrichissement avec un tableau `fullContents` (3 variations dÃ©crivant la structure gÃ©ologique en cheminÃ©e, le magma sous pression et les coulÃ©es de lave crÃ©ant des Ã®les) et `funFacts` (3 anecdotes, dont les volcans sous-marins et Olympus Mons).
    - **RÃ©trocompatibilitÃ© & Robustesse** :
        - PrÃ©servation du comportement par dÃ©faut dans `TopicPage/index.tsx` qui retombe de faÃ§on transparente sur les propriÃ©tÃ©s uniques `fullContent` et `funFact` pour les sujets n'ayant pas encore de variations de contenu, empÃªchant tout plantage de rendu.
    - **TopicPage.test.tsx** :
        - Ajout de tests d'intÃ©gration validant le chargement stable et conforme de la variation sÃ©lectionnÃ©e par index.
        - Ajout de tests de rÃ©gression validant le repli automatique et transparent sur les structures simples pour les sujets dÃ©pourvus de variations (ex. `pluie`).

### VERSION 3.20.7 - Mode Parfait, Scoring XP Premium & Fanfare Cristalline ðŸ�†âœ¨ (23 Mai 2026)
--------------------------------------------------
- **[Logic/Aesthetics/UX/i18n/QA] ImplÃ©mentation du systÃ¨me de rÃ©compense "Mode Parfait" (Ticket #18) :**
    - **useProgressionStore.ts** :
        - DÃ©finition du bonus `PERFECT_BONUS_XP = 500`.
        - Mise Ã  jour du calcul d'XP dans `addBadge` et de la migration rÃ©troactive `migrateLegacyProfile`. Une mÃ©daille d'or (sans-faute au premier essai) rapporte dÃ©sormais `1500 XP` (1000 base + 500 bonus) de maniÃ¨re consistante.
    - **Quiz.tsx** :
        - ImplÃ©mentation de la fonction de synthÃ¨se Web Audio API native `playSynthesizedPerfectFanfare()` jouant un arpeggio ascendant majeur de 4 notes aiguÃ«s cristallines (`C6`, `E6`, `G6`, `C7`) Ã  intervalles de `80ms` sur la mÃ©daille d'or, contrastant avec le son classique `playSynthesizedDing`.
        - Rendu conditionnel du ruban cartoons `.perfectBanner` au sommet de la boÃ®te de rÃ©sultats si la mÃ©daille d'or est obtenue.
    - **Quiz.module.css** :
        - Design cartoons 3D du ruban `.perfectBanner` : inclinaison Ã  `-15deg`, fond en dÃ©gradÃ© de couleur feu/or (`#facc15` âž” `#ef4444`), bordures Ã©paisses, relief et ombres portÃ©es physiques.
        - Animation `@keyframes pulseRibbon` appliquant une pulsation tridimensionnelle dimensionnelle et lumineuse fluide et continue.
    - **Internationalisation (locales)** :
        - Ajout de la clÃ© `perfectBadge` dÃ©clarÃ©e dans `types.ts` et traduite dans `fr.ts` (`"PARFAIT !"`) et `en.ts` (`"PERFECT !"`).
    - **useProgressionStore.test.ts & Quiz.test.tsx** :
        - Ajustement complet de la suite de tests de progression pour valider le nouveau score d'XP Ã  1500 XP pour l'or.
        - Ajout d'un test spÃ©cifique validant le rendu conditionnel de l'Ã©lÃ©ment de banniÃ¨re parfait et de ses traductions dans le DOM.

### VERSION 3.20.6 - Panning de zoom fluide & RÃ©solution du Clamping de la Carte au TrÃ©sor ðŸ—ºï¸�âœ¨ (23 Mai 2026)
--------------------------------------------------
- **[Logic/UX/A11y/QA] Suppression des sauts visuels et du clamping lors du double-clic/double-tap sur la carte au trÃ©sor (Ticket #15) :**
    - **TreasureMap.tsx** :
        - Remplacement du scroll synchrone dans `useLayoutEffect` par un scroll diffÃ©rÃ© via `requestAnimationFrame` (`rafId`). Cela permet au navigateur d'effectuer la mise Ã  l'Ã©chelle CSS (`transform: scale(zoom)`) et d'actualiser complÃ¨tement les limites physiques rÃ©elles (`scrollWidth`/`scrollHeight`) du conteneur parent avant de dÃ©finir le scroll, Ã©vitant tout clamping gÃ©omÃ©trique et saccade visuelle.
        - Recentrage parfait : Calcul prÃ©cis des coordonnÃ©es cibles en fonction de l'Ã©chelle visuelle (`zoom`) et recentrage fluide de la camÃ©ra au milieu de l'Ã©cran du conteneur parent.
        - Panning fluide premium : Utilisation de `.scrollTo({ left, top, behavior: 'smooth' })` pour faire glisser Ã©lÃ©gamment la vue vers la destination.
        - SÃ©curisation unitaire (JSDOM) : IntÃ©gration de gardes de type de dÃ©tection de support (`typeof container.scrollTo === 'function'`) afin de garantir une rÃ©trocompatibilitÃ© parfaite avec les environnements de test headless et JSDOM (qui n'implÃ©mentent pas `.scrollTo` nativement) sans aucun plantage.
        - Nettoyage des timers : Annulation de toute frame d'animation en attente via `cancelAnimationFrame` lors du dÃ©montage du composant.

### VERSION 3.20.5 - Optimisations de performance Kid-Friendly de la parallaxe ðŸš€ðŸ§  (23 Mai 2026)
--------------------------------------------------
- **[Logic/Performance/QA] Optimisation des FPS et de la mÃ©moire de la carte parallaxe (Ticket #58) :**
    - **ParallaxTopicCard.tsx** :
        - DÃ©finition de "cartes actives" : IntÃ©gration de `IntersectionObserver` pour suivre l'Ã©tat de visibilitÃ© de chaque carte dans la zone d'affichage (`isInViewport`), limitant Ã  zÃ©ro les calculs CPU dynamiques d'inclinaison 3D sur les dizaines de cartes masquÃ©es par le scroll.
        - Respect de `prefers-reduced-motion` : Ã‰coute via `window.matchMedia` de la prÃ©fÃ©rence systÃ¨me d'Ã©conomie de mouvement pour court-circuiter tous les calculs d'inclinaison JS.
        - PrÃ©vention des fuites mÃ©moire : DÃ©connexion systÃ©matique de l'observer (`observer.disconnect()`) lors du dÃ©montage du composant.
    - **ParallaxTopicCard.module.css** :
        - AccÃ©lÃ©ration matÃ©rielle GPU : Application de la directive `will-change: transform` sur le conteneur `.parallaxCard` pour allouer des calques composites en amont et supprimer les saccades de scrolling.
        - SÃ©curisation visuelle : Ajout du bloc mÃ©dia CSS `@media (prefers-reduced-motion: reduce)` figeant les cartes Ã  plat, dÃ©sactivant les transitions et rÃ©initialisant `will-change: auto`.

### VERSION 3.20.4 - Optimisation de la parallaxe et focus clavier de carte ðŸ§™â€�â™‚ï¸�ðŸª„ (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI/A11y] RÃ©solution de l'alignement 3D et du focus clavier des cartes parallaxes (Ticket #57) :**
    - **ParallaxTopicCard.module.css** :
        - Stabilisation du plan textuel : Configuration de `.foreGround` Ã  `transform: translateZ(0px)` et de `.categoryLabel` Ã  `translateZ(0px)`. Les titres et descriptions Ã©ducatives restent parfaitement plats, garantissant une lisibilitÃ© sans aucune distorsion visuelle ni fatigue oculaire.
        - Profondeur dÃ©corative renforcÃ©e : Repoussement de l'icÃ´ne d'arriÃ¨re-plan `.backGround` Ã  `transform: translateZ(-15px)`, Ã©largissant le fossÃ© tridimensionnel pour un effet de parallaxe plus dynamique.
        - Focus clavier premium unifiÃ© : Retrait de l'outline du bouton de clic interne invisible et ajout d'un contour de focus de `4px` et halo lumineux doux thÃ©matique entourant la *carte entiÃ¨re* (`.parallaxCard`) via les sÃ©lecteurs modernes `:has()` et `:focus-within`.

### VERSION 3.20.3 - RÃ©solution de la dÃ©sÃ©rialisation synchrone lente par compression âš¡ðŸ’¾ (23 Mai 2026)
--------------------------------------------------
- **[Logic/Performance/QA] Optimisation des temps de chargement du store de progression (Ticket #30) :**
    - **useProgressionStore.ts** :
        - ImplÃ©mentation de deux algorithmes purs de sÃ©rialisation `compressState` et `decompressState` convertissant toutes les clÃ©s verbeuses de l'Ã©tat persistant en identifiants ultra-courts d'un ou deux caractÃ¨res (ex. `badges` âž” `b`, `totalXP` âž” `x`, `unlockedAccessories` âž” `u`, etc.).
        - Gain d'espace de plus de **60%** dans le `localStorage`, rÃ©duisant de maniÃ¨re spectaculaire la charge de parsing synchrone du CPU et Ã©radiquant tout micro-freeze au dÃ©marrage.
        - Conception d'un moteur de stockage personnalisÃ© `customStateStorage` implÃ©mentant l'interface `StateStorage` de Zustand pour exÃ©cuter la compression/dÃ©compression Ã  la volÃ©e.
        - Gestion d'une rÃ©trocompatibilitÃ© transparente : dÃ©tection automatique des donnÃ©es hÃ©ritÃ©es (legacy non-compressÃ©es) pour les hydrater sans altÃ©ration ni perte de progression.
    - **useProgressionStore.test.ts** :
        - Ajout d'une suite exhaustive de tests unitaires validant l'Ã©criture compressÃ©e sous clÃ©s dictionnaire dans le `localStorage` et le chargement transparent des structures de donnÃ©es legacy.

### VERSION 3.20.2 - Ã‰radication du CLS & IntÃ©gration du Skeleton Shimmer ðŸ–¼ï¸�âœ¨ (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] RÃ©solution du Saut de Mise en Page du Carousel Hero (Ticket #27) :**
    - **HeroCarousel.tsx** :
        - IntÃ©gration du squelette de chargement en passant la prop `loader={<div className={styles.skeleton} />}` aux deux instances `AppImage` (`bgCoverPrev` et `bgCoverCurrent`), garantissant un chargement fluide sans flash blanc ni transition brutale.
    - **HeroCarousel.module.css** :
        - DÃ©finition d'un rapport d'aspect mathÃ©matique rigoureux (`aspect-ratio: 16 / 7` sur Ã©cran de bureau et `aspect-ratio: 16 / 10` sur terminaux mobiles) couplÃ© Ã  des contraintes de hauteur maximale (`max-height`). Le navigateur rÃ©serve ainsi l'espace d'affichage exact avant que les images ne soient chargÃ©es, rÃ©solvant 100% du CLS.
        - Remplacement de la couleur de fond noire brute (`#000`) par un fond thÃ©matique sombre premium `#0c101b` en accord parfait avec la palette graphique nuit de l'application.
        - CrÃ©ation de la classe `.skeleton` exploitant un dÃ©gradÃ© de blanc translucide linÃ©aire animÃ© avec des `@keyframes shimmer` pour simuler un balayage lumineux continu trÃ¨s premium.

### VERSION 3.20.1 - RÃ©solution du MuteToggle Asynchrone & Singleton Audio ðŸ”ŠðŸ”’ (23 Mai 2026)
--------------------------------------------------
- **[Logic/Aesthetics/QA] RÃ©solution du ProblÃ¨me de Superposition Audio (Ticket #21) :**
    - **useAudioFeedback.ts** :
        - Migration vers un singleton `globalAudioInstance` partagÃ© au niveau du module pour Ã©liminer le gaspillage de ressources et les instanciations de doublons en mÃ©moire.
        - ImplÃ©mentation d'une rÃ©utilisation d'instance dans `playSound` : l'appel Ã  un nouveau son interrompt proprement tout chargement et lecture en cours via `pause()` et une rÃ©initialisation de `currentTime = 0`.
        - Ajout d'un abonnement global rÃ©actif (`useSettingsStore.subscribe`) coupant instantanÃ©ment la lecture sonore active dÃ¨s que l'Ã©tat `isMuted` du store passe Ã  vrai.
        - SÃ©curisation de la mÃ©thode `subscribe` par un typecheck (`typeof useSettingsStore.subscribe === 'function'`) assurant une robustesse et compatibilitÃ© totale avec les tests unitaires existants qui mockent le store de configuration.
        - Interception propre des exceptions `AbortError` renvoyÃ©es par le navigateur lors de coupures rÃ©seau de flux audio.
    - **useAudioFeedback.test.ts** :
        - CrÃ©ation d'une suite de tests unitaires validant l'inhibition du son en sourdine, l'arrÃªt instantanÃ© via abonnement global et la rÃ©utilisation de l'instance unique de singleton.

### VERSION 3.20.0 - Polissage du Plateau de Jeu, Chemin SVG, DÃ©cors Fixes & Companion Bubbles ðŸ¦�ðŸŽ® (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] RÃ©solution des Anomalies Visuelles de Mission Safari (Ticket #59) :**
    - **SafariBoard.tsx & SafariBoard.module.css** :
        - RÃ©Ã©criture de l'algorithme `calculatePath` : tri rigoureux des coordonnÃ©es physiques de cases par ID de `0` Ã  `14` plutÃ´t qu'en ordre DOM (qui inversait les rangÃ©es paires/impaires pour le tracÃ© serpent). RÃ©solution totale des tracÃ©s diagonaux parasites croisant le plateau.
        - Standardisation du centrage et de l'aspect-ratio de `.icon` via flexbox (`display: flex; align-items: center; justify-content: center; line-height: 1;`) pour les emojis de dÃ©part (ðŸ��), lion (ðŸ¦�) et d'arrivÃ©e (ðŸ�†) sans dÃ©formation ni dÃ©calage.
        - Isolation et dÃ©placement de `.effectBadge` (`+2`, `-3`, etc.) et du pion joueur `.playerPawn` en dehors du conteneur `hexContent` (qui a un `clip-path` restrictif) vers `hexWrapper`, pour Ã©liminer tout rognage. Positionnement des modificateurs de score en haut Ã  droite sous forme de petite pilule 3D cartoon contrastÃ©e.
    - **SafariDecorations.tsx & SafariDecorations.module.css** :
        - Remplacement du gÃ©nÃ©rateur de dÃ©cors dynamique (`Math.random()`) par un tableau de coordonnÃ©es fixes prÃ©-calculÃ©es situÃ©es en dehors du plateau de jeu et des panneaux pour Ã©liminer les chevauchements et l'encombrement graphique.
        - Ajout d'ombres portÃ©es fluides `.decorItem` (`filter: drop-shadow(...)`) et protection du titre `.journalTitle` avec `white-space: nowrap; text-overflow: ellipsis;` pour Ã©viter le troncage de "CARNET DE VOYAGE".
    - **MissionSafari.tsx & MissionSafari.module.css** :
        - IntÃ©gration de l'icÃ´ne animÃ©e du compagnon Ã©quipÃ© (ou Ã©moji `ðŸ¦�` guide de brousse par dÃ©faut) Ã  gauche du message de jeu (`messageBox`).
        - RÃ©orientation de la flÃ¨che de bulle de dialogue (`::after`) vers la gauche (vers le compagnon) plutÃ´t que vers le bas dans le vide, avec synchronisation du `translateY(-50%)` dans l'animation de salutation `wave`.
        - DÃ©finition complÃ¨te des styles manquants pour `.statsCard` et `.controlsCard` dans la feuille de styles, harmonisant le panneau de contrÃ´le latÃ©ral avec l'esthÃ©tique gÃ©nÃ©rale de verre dÃ©poli (glassmorphism) de l'application.
    - **PageHeader.module.css** : Alignement vertical parfait du bouton de changement de thÃ¨me (`ThemeToggle`) au sein de l'en-tÃªte globale `.rightSection`.

### VERSION 3.19.0 - Standardisation de l'Empilement Global, Cartes Parallaxes & CSS Cleanups ðŸŽ¨ðŸ§¹ (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] ImplÃ©mentation de la Carte Parallaxe Dynamique (Ticket #56) :**
    - **ParallaxTopicCard.tsx & ParallaxTopicCard.module.css** :
        - CrÃ©ation d'un nouveau composant rÃ©actif capturant les dÃ©placements de pointeur (`onPointerMove`) et appliquant une inclinaison 3D fluide limitÃ©e Ã  8 degrÃ©s pour le confort oculaire.
        - SÃ©paration physique tridimensionnelle des couches (`preserve-3d`) : Textes au premier plan ($Z = 15px$) et icÃ´nes thÃ©matiques dÃ©coratives en arriÃ¨re-plan ($Z = -10px$).
        - SystÃ¨me d'ombre tridimensionnelle rÃ©active (box-shadow dÃ©calÃ©e Ã  l'opposÃ© du mouvement) pour renforcer la profondeur physique.
        - Retour Ã  plat amorti (`cubic-bezier`) lors du survol sortant (`onPointerLeave`).
    - **Home/index.tsx** : IntÃ©gration globale du nouveau composant `ParallaxTopicCard` Ã  la place de `TopicCard` pour tous les sujets d'apprentissage de l'accueil.
- **[Logic/Aesthetics/QA] RÃ©solution des IncohÃ©rences de z-index (Audit QA) :**
    - **vars.css** : Centralisation de tous les niveaux d'empilement (`z-index`) de l'application sous forme de variables CSS typÃ©es dans `:root`.
    - **reset.css** : Suppression du `z-index: 1` parasite sur `#root` pour libÃ©rer le flot de superposition standard.
    - **Restructuration globale des calques** : `OrientationGuard` (100000), `ToastContainer` (90000), `OfflineFallback` & `ParentalGate` (80000), `ProfileSelection` (2000), et overlays de modals/quiz (`modalOverlay`, `quizOverlay`, `overlayContainer`, etc.) Ã  1000.
    - **Ajustement de composants** : Abaissement de l'animation inline `zIndex` de l'XP flottante dans `LifeCirclePage.tsx` Ã  `50` (sous les modals) et rÃ©glage du bouton flottant d'accessibilitÃ© Baguette Magique Ã  `90` (sous le header et sous les overlays).
- **[Refactor/CSS/Logic] RÃ©solution du Ticket #28 (Dead Code & CSS Pruning) :**
    - **App.tsx & App.module.css** : Correction et utilisation de `styles.notFoundContainer` et `styles.notFoundTitle` pour Ã©liminer le style indÃ©fini `errorContainer` et utiliser tous les sÃ©lecteurs.
    - **ParentsDashboard.module.css** : Ajout et implÃ©mentation de la classe `.profileInfo` qui Ã©tait rÃ©fÃ©rencÃ©e mais absente de la feuille de style.
    - **Topic/index.tsx** : Nettoyage d'une directive d'inhibition linter inutilisÃ©e (`// eslint-disable-next-line react-refresh/only-export-components`).
- **[QA/Documentation] Audit Visuel Safari & Ticket #59 :**
    - **TICKETS.md** : Enregistrement formel des rÃ©sultats d'audit visuel du plateau Safari sous forme de Ticket #59 (lignes verticales parasites, icÃ´nes dÃ©calÃ©es case 13/14, superposition des modificateurs de score et distorsion de drapeau case 0) avec sa DÃ©finition de Fini (DOD).
- **Validation QualitÃ©** : 100% de la suite de 188 scÃ©narios de tests unitaires/intÃ©gration validÃ©e avec succÃ¨s via `npm run validate`.

### VERSION 3.18.0 - La Baguette Magique d'Inclusion ðŸ—£ï¸�ðŸª„ (Ticket #R4) (23 Mai 2026)
--------------------------------------------------
- **[Feature/UI/A11y] ImplÃ©mentation du systÃ¨me de lecture interactive rÃ©active "Baguette Magique" :**
    - **useReaderVoice.ts** :
        - CrÃ©ation du hook gÃ©rant la synthÃ¨se vocale SpeechSynthesis avec configuration d'une vitesse lente (`0.85`) adaptÃ©e aux enfants.
        - Suivi des mots en temps rÃ©el via l'Ã©couteur `onboundary` d'Ã©vÃ©nement `word` (calcul dynamique de la longueur avec fallback pour les navigateurs non standards).
        - Mode "Baguette de Lecture" activable/dÃ©sactivable.
    - **TopicDetail.tsx & TopicDetail.module.css** :
        - IntÃ©gration d'un bouton flottant `ðŸª„` premium avec dÃ©gradÃ©s rose/violet, pulsation lumineuse tridimensionnelle en Ã©tat actif et ressorts physiques au survol/clic.
        - Composant `HighlightedText` dÃ©coupant et surlignant dynamiquement en temps rÃ©el le mot en cours de lecture avec une surbrillance pastel douce `--color-primary-light` (35% d'opacitÃ©) animÃ©e.
        - Ajout de gestionnaires de survol temporisÃ©s (debounce de `500ms` pour Ã©viter le spam sonore) et de clic.
        - Curseur de souris personnalisÃ© en Ã©moji `ðŸª„` sur les textes Ã©coutables en mode actif.
    - **TopicDetail.test.tsx & useReaderVoice.test.ts** :
        - Suite de tests unitaires vÃ©rifiant l'affichage, les transitions d'Ã©tat du bouton flottant, la lecture au clic, le suivi de surbrillance et le calcul de fallback de mot.
    - **Validation QualitÃ©** : 100% de la suite de 185 tests unitaires et d'intÃ©gration validÃ©e avec succÃ¨s via `npm run validate`.

### VERSION 3.17.0 - Le Refuge des Compagnons AnimÃ©s ðŸ¦„ (Ticket #R3) (22 Mai 2026)
--------------------------------------------------
- **[Feature/UI/Store] CrÃ©ation de la zone premium interactive /refuge :**
    - **RefugePage.tsx & RefugePage.module.css** :
        - ImplÃ©mentation du tableau de bord complet avec sÃ©lection de compagnon et lÃ©vitation douce.
        - Ajout de la boutique de friandises (sugarBone, goldenLeaf, batteryCell) achetÃ©es avec les tickets (ðŸŽ«).
        - SystÃ¨me d'affection (0-100) et de bonheur (0-100) animÃ©s par profil avec Zustand.
        - SynthÃ¨se sonore native (Web Audio API) pour caresser (bulle), nourrir (carillon) et acheter (chime).
        - Particules d'Ã©toiles et de cÅ“urs 3D volants rÃ©actifs aux actions de l'enfant.
    - **TransformedEmoji.module.css** :
        - IntÃ©gration d'animations vectorielles avancÃ©es de nourrissage (.isFeeding) et de caresses (.isPetting) sur les compagnons SVG (chien qui remue la queue, robot qui tourne sur lui-mÃªme avec propulseurs, bÃ©bÃ© dino qui danse joyeusement).
    - **App.tsx & Home/index.tsx** :
        - Enregistrement de la route lazy-loaded `/refuge`.
        - Ajout du bouton premium "Le Refuge ðŸ¦„" dans la grille de navigation d'accueil (hubGrid) rÃ©amÃ©nagÃ©e Ã  5 colonnes sur grand Ã©cran.
    - **useCompanionStore.ts & useCompanionStore.test.ts** :
        - IntÃ©gration du store Zustand persistant par profil avec tests unitaires robustes (8 tests passÃ©s avec succÃ¨s).
    - **Validation QualitÃ©** : validation globale sans rÃ©gression (178 tests verts, linting et compilation TS vierges).

### VERSION 3.16.1 - Protection anti-quitting accidentel sur Mission Safari (Ticket #16) (22 Mai 2026)

--------------------------------------------------
- **[Logic/UX] SÃ©curisation de l'abandon de quiz dans le mode Mission Safari :**
    - **MissionSafari.tsx & MissionSafari.module.css** :
        - Ajout d'un Ã©tat local `showQuitConfirm` interceptant le clic de fermeture ou Ã  l'extÃ©rieur de l'overlay de quiz.
        - Ajout d'une fenÃªtre de confirmation overlay (`AppOverlay` de largeur maximale `500px`) prÃ©venant l'enfant avec bienveillance du risque de fuite de l'animal.
        - Option "Continuer le quiz ! ðŸ’ª" (bouton primaire) permettant de reprendre l'apprentissage sans aucune interruption ni pÃ©nalitÃ©.
        - Option "Oui, quitter ðŸ‘‹" (bouton secondaire) actant l'abandon du quiz et la fuite de l'animal (retour au statut initial).
    - **Internationalisation (fr.ts, en.ts, types.ts)** :
        - IntÃ©gration bilingue des Ã©tiquettes et messages d'avertissement (`quitConfirmTitle`, `quitConfirmMessage`, `quitConfirmYes`, `quitConfirmNo`).
    - **TICKETS.md** : RÃ©solution formelle du Ticket #16.

### VERSION 3.16.0 - Tranche Premium Espace Product Manager (Soleil, Lune, Terre) (22 Mai 2026)
--------------------------------------------------
- **[Content/Logic] Finalisation de l'intÃ©gration des contenus Ã©ducatifs et quiz Premium Product Manager pour la trilogie spatiale (Soleil, Lune, Terre) :**
    - **IntÃ©gration du Soleil â˜€ï¸�** :
        - Ajout d'une description enrichie avec des concepts scientifiques et philosophiques adaptÃ©s aux enfants dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz interactive premium sur le partage de la chaleur et de la lumiÃ¨re dans `src/data/quizzes/space.ts`.
    - **IntÃ©gration de la Lune ðŸŒ™** :
        - Ajout d'une description premium axÃ©e sur le rÃ´le de veilleuse bienveillante de la Lune dans la nuit dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz premium ludique sur les changements de forme de la Lune dans le ciel dans `src/data/quizzes/space.ts`.
    - **IntÃ©gration de la Terre ðŸŒ�** :
        - Ajout d'une description premium prÃ©sentant la Terre comme notre maison protectrice et un grand jardin bienveillant dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz premium sur les spÃ©cificitÃ©s qui rendent la Terre unique dans l'Espace (eau, air, vie) dans `src/data/quizzes/space.ts`.
    - **Validation QualitÃ© et Non-RÃ©gression** :
        - Suite complÃ¨te de 170 tests unitaires et d'intÃ©gration validÃ©e avec succÃ¨s via `npm run validate`.
        - Build de production complet via `npm run build`.

### VERSION 3.15.2 - SÃ©curitÃ© Anti-Spoiler PÃ©dagogique (Ticket #04) (22 Mai 2026)
--------------------------------------------------
- **[Content/Logic] ImplÃ©mentation de la sÃ©curitÃ© anti-spoiler sur les anecdotes (Ticket #04) :**
    - **TopicPage/index.tsx** :
        - ImplÃ©mentation d'une fonction `isSpoiler` comparant sÃ©mantiquement les rÃ©ponses correctes en franÃ§ais et anglais avec les anecdotes ("Le savais-tu ?").
        - Nettoyage et normalisation rigoureuse des chaÃ®nes de caractÃ¨res (suppression de la ponctuation, des espaces insÃ©cables et mise en minuscules) pour un matching sÃ©mantique robuste.
        - Exclusion intelligente des rÃ©ponses courtes (longueur <= 3 caractÃ¨res, comme "Oui" ou "Non") pour Ã©viter les faux positifs.
        - Analyse et comparaison stricte des nombres de 2 chiffres ou plus (ex: "1600", "1 million") pour bloquer les spoilers numÃ©riques.
        - RÃ©ordonnancement de l'effet d'initialisation de la page : le quiz actif est sÃ©lectionnÃ© d'abord, puis les anecdotes sont filtrÃ©es pour n'afficher que les anecdotes garanties sans spoiler (avec repli alÃ©atoire si toutes les anecdotes contiennent un spoiler).
        - Maintien parfait de la stabilitÃ© des Ã©tats (`funFactIndex`, `quizIndex`, `descriptionIndex`) pour Ã©viter les reshuffles intempestifs lors du changement de langue.
    - **TopicPage.test.tsx** :
        - CrÃ©ation d'une suite complÃ¨te de tests unitaires pour `isSpoiler` couvrant le matching de texte intÃ©gral, l'exclusion des rÃ©ponses courtes et la dÃ©tection numÃ©rique stricte.
        - Ajout d'un test d'intÃ©gration asynchrone sur le sujet `soleil` simulant le rendu de la page et vÃ©rifiant l'exclusion effective de l'anecdote spoiler liÃ©e Ã  la bonne rÃ©ponse "1 million".

### VERSION 3.15.1 - RÃ©solution IntÃ©grale de la Conception Visuelle et des Alignements (22 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Polissage esthÃ©tique complet de la page d'accueil (Ticket #62) :**
    - **BanniÃ¨re HÃ©ro (Home.module.css, index.tsx, fr.ts, en.ts, labels.ts)** : Suppression de la ponctuation de deux-points superflue, complÃ©tion de la phrase suspendue sous le titre de bienvenue en franÃ§ais et anglais pour un accueil engageant, et centrage vertical/horizontal complet de la banniÃ¨re.
    - **Stats & Barre d'XP (Home.module.css)** : Doublement de la hauteur de la barre de progression d'XP Ã  `1.5rem`, ajout d'un encadrement 3D doux avec des ombres internes (`inset shadow`), et transition de ressort physique cubic-bezier fluide. Correction des dÃ©calages verticaux des pastilles de statistiques.
    - **Grille de Raccourcis (Home.module.css)** : Restructuration complÃ¨te de la grille de navigation pour offrir un layout symÃ©trique 1 colonne sur mobile, 2x2 sur tablette, et 4 colonnes sur ordinateur, intÃ©grant parfaitement l'ancien raccourci isolÃ© de Mission Safari.
    - **Fiches Sujets (TopicCard.tsx & TopicCard.module.css)** : Suppression du double cadenas redondant sur les fiches bloquÃ©es, rehaussement du contraste AAA du texte Ã  `0.85`, uniformisation de la hauteur des cartes Ã  100% de la rangÃ©e de la grille avec Ã©tirement dynamique, et refonte totale du bouton "VOIR PLUS" en un bouton 3D squishy Explorer Blue rÃ©actif au survol et au clic.
    - **Barre LatÃ©rale Flottante (CategoryScrollSpy.module.css)** : Sublimation du menu latÃ©ral flottant sur ordinateur avec l'intÃ©gration d'un magnifique panneau de verre (`glassmorphic panel`) avec bordures 3D Ã©paisses, et mise en place d'animations physiques de survol et de boutons actifs avec lueur fluorescente 3D en mode sombre.
    - **Data Integrity & Build** : RÃ©solution d'un type TypeScript au niveau de la TopicPage et validation de la suite de 165 tests unitaires et de compilation de production 100% propre.

### VERSION 3.15.0 - RÃ©solution du DÃ©faut #1 : Ergonomie de l'En-tÃªte & Alignements (22 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] AmÃ©liorations de l'En-tÃªte globale pour le ciblage tactile (Ticket #62) :**
    - **SearchBar.module.css** : Agrandissement de la police de saisie en mode compact Ã  `var(--fs-base)` (1.15rem) pour une lisibilitÃ© accrue et ajout d'un style de placeholder Ã©lÃ©gant et aÃ©rÃ© (`var(--fw-bold)` avec 75% d'opacitÃ©).
    - **MainLayout.module.css** : Ajustement des pastilles d'icÃ´nes tactiles `.headerBtn` Ã  `3.5rem` (56px) et de leurs emojis Ã  `1.75rem`. Ã‰largissement du gap Ã  `1rem` (16px) pour une manipulation fluide et sans erreur de ciblage pour les enfants.
    - **MuteToggle.module.css** : Augmentation du bouton compagnon sonore `.toggleBtn` Ã  `3.5rem` et de sa police Ã  `1.75rem` pour correspondre parfaitement aux dimensions standardisÃ©es de l'en-tÃªte.

### VERSION 3.14.0 - Industrialisation de la VariabilitÃ© de Contenu & Traduction Stable (22 Mai 2026)
--------------------------------------------------
- **[Content/UX] VariabilitÃ© des descriptions et stabilitÃ© bilingue (Tickets #02 & #07) :**
    - **space.ts** : Industrialisation complÃ¨te de la catÃ©gorie Espace avec l'intÃ©gration de 3 variations du texte principal pour l'ensemble des 13 sujets (Soleil, planÃ¨tes, astronautes, Lune, SingularitÃ©), offrant une expÃ©rience de lecture renouvelÃ©e Ã  chaque visite.
    - **types.ts & factory.ts** : Extension du modÃ¨le `Topic` pour inclure la propriÃ©tÃ© optionnelle `fullContents` avec validation complÃ¨te lors de l'instanciation des fiches pour garantir l'intÃ©gritÃ© de la base de donnÃ©es.
    - **TopicPage/index.tsx** : Refonte de la sÃ©lection alÃ©atoire des indices (descriptions, fun facts, quiz) en mÃ©morisant les tirages dans l'Ã©tat local du composant. Le changement de langue s'effectue de maniÃ¨re instantanÃ©e et synchrone sans provoquer de reshuffle de contenu (Ticket #07).

### VERSION 3.13.0 - AccessibilitÃ© Clavier des Quiz & Indicateurs de Focus Premium (22 Mai 2026)
--------------------------------------------------
- **[Feature/A11y] Indicateurs de focus clavier conformes WCAG sur les quiz (Ticket #32) :**
    - **Quiz.module.css** : Ajout de styles `:focus-visible` thÃ©matiques haut de gamme sur tous les Ã©lÃ©ments interactifs du quiz (A, B, C et boutons d'aide, audio, rÃ©vision) pour assurer le contraste et Ã©viter les dÃ©calages de disposition en modes clair et sombre.
    - **Quiz.test.tsx** : CrÃ©ation de tests unitaires simulant le ciblage du focus au clavier et l'interaction via les touches `Enter` et `Space`, garantissant le bon dÃ©clenchement de la sÃ©lection de rÃ©ponses.
    - **Validation A11y** : ConformitÃ© WCAG 2.2 de niveau AA pour l'accessibilitÃ© moteur et visuelle sur la zone d'apprentissage clÃ© de l'application.

### VERSION 3.12.0 - RÃ©solution des Sujets "Orphelins" & AmÃ©lioration de la Data Integrity (22 Mai 2026)
--------------------------------------------------
- **[Data/Integrity] Correction de l'accessibilitÃ© des sujets Ã©ducatifs (Ticket #06) :**
    - **Algorithme de DÃ©couverte** : Mise Ã  jour de la traversÃ©e rÃ©cursive des nÅ“uds d'origine pour inclure la recherche globale et les catÃ©gories en tant que mÃ©thodes de dÃ©couverte de premier niveau dans `src/data/dataIntegrity.test.ts`.
    - **IntÃ©gritÃ© des DonnÃ©es** : Garantit que 100% des 121 sujets de l'encyclopÃ©die sont atteignables par des flux d'exploration naturels.

### VERSION 3.10.5 - Alignement Horizontal des Boutons du PageHeader sur Mobile (22 Mai 2026)

--------------------------------------------------
- **[Responsive/Ajustement] Alignement cÃ´te Ã  cÃ´te des boutons de Galerie :**
    - **Optimisation de PageHeader** : Modification de la media query `@media (max-width: 768px)` dans `PageHeader.module.css` pour forcer `.navSection` et `.rightSection` Ã  occuper la mÃªme ligne avec une configuration `flex: 1` et un espacement fluide `gap: 1rem` (Flexbox), Ã©vitant le dÃ©calage vertical.
    - **Ajustement de BackButton & GiftButton** : IntÃ©gration de clauses mÃ©dias dans `BackButton.module.css` et `GiftButton.module.css` pour rÃ©duire la taille minimale Ã  `100px`, ajuster le padding Ã  `0.6rem 1.25rem` et rÃ©initialiser les marges latÃ©rales Ã  `0` sur mobile, Ã©liminant tout dÃ©bordement ou empilement vertical.
    - **Validation QualitÃ©** : ExÃ©cution rÃ©ussie des 151 tests de validation unitaire et de typage strict.

### VERSION 3.10.4 - Gabarits de Pages RÃ©actifs CSS Pur Modulaires (22 Mai 2026)
--------------------------------------------------
- **[Documentation/Feature] Gabarits de page rÃ©actifs autonomes :**
    - **CrÃ©ation du dossier de Templates** : Ajout du sous-dossier `src/templates/` contenant des gabarits prÃªts Ã  l'emploi pour les futures extensions de pages.
    - **Feuille de Styles `gabarit-layout.css`** : Conception d'un systÃ¨me de styles 100% autonome rÃ©initialisant proprement les navigateurs (Modern Reset), configurant les zones de sÃ©curitÃ© systÃ¨me (Safe-Area), appliquant une typographie fluide (`clamp()`), et modulant les structures d'affichage sous une approche Mobile-First via CSS Grid et Flexbox.
    - **Gabarit HTML `gabarit.html`** : Gabarit sÃ©mantique HTML5 structurÃ© avec balises meta d'accessibilitÃ©, d'affichage responsive et de rÃ©fÃ©rencement SEO. IntÃ¨gre des composants de cartes glassmorphic haut de gamme et un menu mobile interactif en Vanilla JS pur.
    - **Validation de Non-rÃ©gression** : ExÃ©cution de `npm run validate` confirmant 100% de rÃ©ussite (151 tests) sur la base existante sans aucune interfÃ©rence.

### VERSION 3.10.3 - IntÃ©gration Safe Area & Dashboard Ultra-DPI (22 Mai 2026)
--------------------------------------------------
- **[Ajustement/Responsive] SÃ©curisation de l'affichage mobile & Haute DensitÃ© (Tickets #60 & #61) :**
    - **Zone SÃ©curisÃ©e (Safe Area) du Header** : Ajout de padding dynamique basÃ© sur `env(safe-area-inset-top)` pour le Header principal (`MainLayout.module.css`) et les en-tÃªtes individuels (`PageHeader.module.css`), protÃ©geant les boutons interactifs du masquage par les encoches d'appareils de type Galaxy S24 Ultra.
    - **Marges tactiles d'A11y** : Maintien rigoureux d'espacements latÃ©raux adaptatifs Ã  l'aide de `clamp(1rem, 3vw, 2.5rem)` pour prÃ©server la marge de respiration tactile par rapport aux bords physiques de l'Ã©cran.
    - **FlexibilitÃ© de la Carte Hero** : Remplacement des hauteurs statiques du carrousel d'accueil par des dimensions flexibles (`min-height: clamp(...)` et paddings fluides en `rem`), permettant l'ajustement Ã©lastique de l'espace sans risque de collision ou de dÃ©bordement du texte de bienvenue sur l'illustration de l'astronaute.
    - **Responsive Pill Dashboard** : Refonte structurelle de la barre de statistiques avec `flex-wrap: wrap` et bascule Ã  100% de largeur pour le conteneur de progression (`progressContainer`) sous `768px`, garantissant la visibilitÃ© intÃ©grale des scores (ðŸ�†, ðŸŽ«, âš¡) et de la progression sans coupure latÃ©rale.
    - **Ã‰chelle Typographique Fluide** : Transition des titres et sous-titres d'accueil vers des tailles de police adaptatives contrÃ´lÃ©es par `clamp()`, Ã©vitant le chevauchement sÃ©mantique et amÃ©liorant la lisibilitÃ© sur petits Ã©crans.

### VERSION 3.10.2 - Optimisation CI/CD & AccÃ©lÃ©ration E2E Playwright (22 Mai 2026)
--------------------------------------------------
- **[QualitÃ©/CI] Optimisation du Workflow GitHub Actions :**
    - **Mise en cache intelligente de Playwright** : IntÃ©gration d'une Ã©tape de mise en cache du rÃ©pertoire `~/.cache/ms-playwright` indexÃ©e sur le hash du fichier `package-lock.json` (`actions/cache@v4`), Ã©vitant le tÃ©lÃ©chargement de plus de 300 Mo de navigateurs sur chaque exÃ©cution.
    - **Installation conditionnelle** : SÃ©paration des Ã©tapes d'installation de Playwright pour n'installer que les dÃ©pendances systÃ¨me Linux (`playwright install-deps`) en cas de succÃ¨s du cache, rÃ©duisant le temps d'installation Ã  moins de 5 secondes.
    - **Filtrage des dÃ©clencheurs de workflow** : Ajout de la clause `paths-ignore` sur le workflow `Validate` afin de ne pas dÃ©clencher la suite de tests et E2E lors de modifications exclusives de la documentation (`docs/**`, `*.md`) ou des configurations Git (`.gitignore`).

### VERSION 3.10.1 - Optimisation Responsive & Anti-dÃ©bordement Mobile (22 Mai 2026)
--------------------------------------------------
- **[Feature] RWD & Support Ultra-DPI (Ticket #59) :**
    - **Configuration du Viewport** : Mise Ã  jour de la balise meta viewport dans `index.html` pour supporter `maximum-scale=5.0` garantissant une flexibilitÃ© optimale sans artificialisation des proportions de rendu sur les grands Ã©crans tactiles mobiles.
    - **Ã‰chelle Typographique Fluide** : Surcharge rÃ©active des variables de tailles de police globales `--fs-*` sous `@media (max-width: 480px)` dans `vars.css`, convertissant les tailles de titres et de textes en typographies fluides auto-ajustables sur mobile.
    - **Optimisations TopicDetail** : Passage des titres et contenus de `TopicDetail.module.css` sous des dimensions fluides et intÃ©gration d'une media query `@media (max-width: 480px)` pour rÃ©duire le padding global de la fiche Ã  `1.25rem` et diviser par deux la taille d'icÃ´ne Hero (`3.5rem`), libÃ©rant 40% de surface d'affichage supplÃ©mentaire.
    - **Optimisations Quiz** : Refonte de la grille de rÃ©ponses `.optionsGrid` sur une seule colonne et transition des choix de rÃ©ponses du quiz en listes horizontales compactes (`flex-direction: row; padding: 1.15rem 1rem;`) Ã©liminant dÃ©finitivement les dÃ©bordements sur la hauteur d'affichage.

### VERSION 3.10.0 - SynthÃ¨se Vocale (TTS - Text-To-Speech) pour Enfants Non-Lecteurs (22 Mai 2026)
--------------------------------------------------
- **[Feature] SynthÃ¨se Vocale (TTS) Granulaire (Ticket #24) :**
    - **Hook PersonnalisÃ© `useTextToSpeech`** : CrÃ©ation d'un hook `useTextToSpeech.ts` encapsulant l'API native `SpeechSynthesis`. GÃ¨re la dÃ©tection intelligente de voix selon la locale courante du profil (`fr` ou `en`), le rÃ©glage d'une cadence de lecture lente de `0.9` adaptÃ©e aux jeunes enfants (4-6 ans), l'Ã©tat actif de lecture par bloc d'id unique, et l'interruption automatique ou le nettoyage lors du dÃ©montage pour Ã©viter les cacophonies de voix qui se chevauchent.
    - **Composant `DiscreteSpeaker` & Animations Fluides** : ImplÃ©mentation d'un bouton haut-parleur discret avec style morphique en verre (glassmorphic), retour visuel dynamique par vagues/pulsations d'ondes sonores (soundwaves animation) lors de la lecture active.
    - **IntÃ©gration Granulaire dans TopicDetail & Quiz** :
        - IntÃ©gration de haut-parleurs individuels sur les fiches (description) et d'anecdotes (fun facts) dans `TopicDetail.tsx`.
        - IntÃ©gration de haut-parleurs indÃ©pendants sur les questions du quiz et chaque option de rÃ©ponse A/B/C dans `Quiz.tsx`.
        - Gestion rigoureuse de l'arrÃªt de la propagation des clics (`e.stopPropagation()`) sur les boutons audio des options du quiz pour Ã©viter que la lecture de l'option ne dÃ©clenche la sÃ©lection ou la validation par erreur de la rÃ©ponse correspondante.
    - **Tests Unitaires Riches** : Ajout de scÃ©narios de validation automatique dans `TopicDetail.test.tsx` et `Quiz.test.tsx` pour tester les mocks de `speechSynthesis` et garantir le bon dÃ©clenchement de la parole Ã  chaque clic sur les haut-parleurs sans rÃ©gression.

### VERSION 3.9.0 - Ã‰conomie de Jeu & Boutique d'Accessoires (22 Mai 2026)
--------------------------------------------------
- **[Feature] Ã‰conomie de Jeu & Boutique d'Accessoires (Ticket #55) :**
    - **SystÃ¨me d'Attribution de Tickets** : IntÃ©gration d'un systÃ¨me de rÃ©compense gratifiant attribuant **3 tickets** pour une mÃ©daille d'Or (sans faute), **2 tickets** pour une mÃ©daille d'Argent (une seule erreur) et **1 ticket** pour une mÃ©daille de Bronze (plusieurs erreurs). GÃ¨re avec prÃ©cision les montÃ©es de mÃ©dailles en accordant uniquement le delta de tickets restant (ex. passer de Bronze Ã  Or ajoute 2 tickets supplÃ©mentaires).
    - **Gestion de Solde Persistant** : Ajout du champ `tickets: number` persistant par profil enfant dans le Zustand store `useProgressionStore.ts`, avec des actions robustes `addTickets` et `buyAccessory`.
    - **Boutique d'Accessoires Premium (GiftsPage)** : Mise en place d'une boutique haut de gamme dans le coffre magique, permettant d'acheter des accessoires standards (5 tickets), premium comme la Couronne Royale (15 tickets) et des compagnons animaux (10 tickets).
    - **Modale de Confirmation Glassmorphic** : CrÃ©ation d'une interface de confirmation "Veux-tu acheter ce chapeau pour X tickets ? ðŸŽ«" sÃ©curisÃ©e, dotÃ©e de grands boutons tactiles vert et rouge pour Ã©liminer les clics involontaires.
    - **Animations & Effets Sonores** : CÃ©lÃ©brations immersives avec lancers de confettis (`canvas-confetti`) et feedback sonore triomphant lors d'un achat validÃ©.
    - **IntÃ©gration d'Avatar RÃ©active** : Ã‰quipement automatique et instantanÃ© des accessoires achetÃ©s sur l'avatar du profil actif.
- **[QualitÃ©/IngÃ©nierie] Standardisation des Mocks & 100% de Tests au Vert :**
    - Mise Ã  jour de l'intÃ©gralitÃ© des mocks de tests unitaires (`GiftsPage.test.tsx`, `BadgesPage.test.tsx`, `ExplorerGallery.test.tsx`) pour inclure le champ `tickets` et les nouvelles actions.
    - ExÃ©cution rÃ©ussie de la suite complÃ¨te de validation (`npm run validate`) avec **147 tests** au vert Ã  100% sans aucun avertissement technique ni erreur TypeScript.

### VERSION 3.8.0 - Persistance d'Ã‰tat & Nettoyage de DonnÃ©es Enfant (22 Mai 2026)
--------------------------------------------------
- **[Feature] Persistance de l'Ã©tat d'expansion des catÃ©gories (Ticket #13) :**
    - Migration de l'Ã©tat des sections affichÃ©es/repliÃ©es (`expandedCats`) de la page d'accueil (`HomePage`) de `useState` vers le store global `useDiscoveryStore`.
    - ImplÃ©mentation des actions `toggleCategoryExpand` et `setCategoryExpanded` pour gÃ©rer dynamiquement l'Ã©tat d'expansion.
    - InterfaÃ§age de l'effet de deep-linking de la page d'accueil avec le store global pour persister de maniÃ¨re rÃ©active l'Ã©tat d'expansion d'une catÃ©gorie ciblÃ©e par URL.
    - Ajout de suites de tests unitaires complÃ¨tes assurant la robustesse du store lors des opÃ©rations de mise Ã  jour d'Ã©tat et de rÃ©initialisation (`reset()`).
- **[Feature] Nettoyage de la progression des profils supprimÃ©s (Ticket #11) :**
    - CrÃ©ation de l'action `deleteProfileProgression(profileId)` dans `useProgressionStore.ts` pour purger la progression globale dans `progressions` lors de la suppression d'un profil enfant.
    - Liaison de la suppression dans le store des profils (`useProfileStore.ts`) avec l'invalidation de progression correspondante pour garantir l'absence de fuites de donnÃ©es dans `localStorage`.
    - CrÃ©ation de tests unitaires dÃ©diÃ©s pour valider l'idempotence et l'ordonnancement de l'action de suppression globale de la progression d'un profil enfant.
- **[QualitÃ©/IngÃ©nierie] Mocks & Suite de Tests au Vert :**
    - Suite de validation globale entiÃ¨rement rÃ©ussie avec l'intÃ©gralitÃ© des **139 tests** (Vitest) Ã  100% au vert.

### VERSION 3.7.0 - Espace Parents LocalisÃ© et DÃ©couplÃ© (22 Mai 2026)
--------------------------------------------------
- **[Feature] DÃ©fi MathÃ©matique Parental RenforcÃ© (Ticket #08) :**
    - Remplacement de l'addition simple par une multiplication Ã  un chiffre avec opÃ©randes alÃ©atoires strictement compris entre 2 et 9 (`Math.floor(Math.random() * 8) + 2`).
    - PrÃ©sentation claire de l'opÃ©ration en format mathÃ©matique standard avec le symbole `Ã—` (`n1 Ã— n2 = ?`), bloquant efficacement les enfants de plus de 7 ans tout en restant simple pour les adultes.
- **[Feature] Localisation ComplÃ¨te de la Zone Parents (Ticket #09) :**
    - DÃ©claration de la structure du dictionnaire `parents` dans `types.ts` et intÃ©gration complÃ¨te des traductions franÃ§aises (`fr.ts`) et anglaises (`en.ts`).
    - Liaison rÃ©active de tous les messages, placeholders et boutons de `ParentalGate.tsx` et `ParentsDashboard.tsx` via `useSettingsStore(state => state.labels)`.
- **[Feature] DÃ©couplage de la Gestion d'Ã‰tat & Confirmations UI (Ticket #10) :**
    - Retrait de l'appel systÃ¨me bloquant `window.confirm` du store Zustand `useProgressionStore.ts`, garantissant la puretÃ© asynchrone et la testabilitÃ© des mutations d'Ã©tat.
    - Centralisation et localisation des boÃ®tes de dialogue de confirmation Ã  l'aide des dictionnaires i18n dans l'interface utilisateur de rÃ©initialisation :
        - Dans le Tableau de Bord Parents (`ParentsDashboard.tsx`) pour chaque profil via `t.confirmReset(name)`.
        - Dans la Galerie de collection de stickers (`BadgesPage.tsx`) pour le profil actif via `labels.badges.confirmReset`.
- **[QualitÃ©/IngÃ©nierie] Mocks Globaux & Suite de Tests au Vert :**
    - Ajout du mock pour `window.confirm` dans les tests unitaires de Vitest (`BadgesPage.test.tsx`).
    - Validation complÃ¨te et rÃ©ussie : type-checking strict sans erreur, et validation de l'intÃ©gralitÃ© des **132 tests** de la suite applicative globale Ã  100% au vert.

### VERSION 3.6.0 - Tranche Industrielle : SystÃ¨me de Progression et Validation "QC PASS" (21 Mai 2026)
--------------------------------------------------
- **[Feature] Navigation LinÃ©aire & "Learning Path" (Ticket #45) :**
    - ImplÃ©mentation des sÃ©lecteurs rÃ©actifs `isCompleted(topicId)` et `isUnlocked(topicId)` dans `useProgressionStore.ts`.
    - SÃ©curisation de la progression sÃ©quentielle : l'enfant doit rÃ©ussir le quiz d'un sujet pour dÃ©bloquer le suivant dans la mÃªme catÃ©gorie.
    - CrÃ©ation de l'Ã©tat graphique cadenassÃ© (`ðŸ”’`) et styles grayscale dans `TopicCard.tsx` / `TopicCard.module.css`.
    - Protection des routes dans `Topic/index.tsx` redirigeant automatiquement vers l'accueil en cas de saisie directe d'URL verrouillÃ©e.
- **[Feature] Gamification & Validation "QC PASS" (Ticket #46) :**
    - Ajout d'un compteur de "Tickets QC" (`ðŸŽ«`) dans le Pill Dashboard de la page d'accueil.
    - IntÃ©gration d'une synthÃ¨se sonore Web Audio pure (oscillateur glissant sans chargement d'asset rÃ©seau) pour le son de rÃ©ussite ("ding").
    - CrÃ©ation d'un tampon visuel animÃ© de contrÃ´le qualitÃ© "QC PASS / APPROUVÃ‰ / APPROVED" avec effet d'impact Ã©lastique (bounce CSS).
- **[Feature] SystÃ¨me d'Ancrage "Stations" (Ticket #47) :**
    - Introduction de l'attribut `anchorIcon` dans `types.ts` and du dictionnaire de repli par catÃ©gorie (ðŸš€, ðŸ¦–, etc.).
    - Rendu de l'icÃ´ne de station mÃ©morable Ã  cÃ´tÃ© du titre du sujet, dans l'anecdote et en remplacement du morceau de puzzle du quiz.
- **[Feature] Assistance PÃ©dagogique du Magicien (Ticket #49) :**
    - Affichage d'un panneau d'aide premium "Aide du Magicien" (`ðŸ§™â€�â™‚ï¸�`) aprÃ¨s 3 Ã©checs consÃ©cutifs au quiz.
    - IntÃ©gration de la synthÃ¨se vocale native (`SpeechSynthesisUtterance`) pour lire Ã  voix haute le rappel de cours de faÃ§on immersive et accessible.
- **[QualitÃ©/IngÃ©nierie] Standardisation "Data Factory" (Ticket #48) :**
    - CrÃ©ation d'un validateur ultra-robuste et strictement typÃ© `createTopicCard` dans `src/data/factory.ts` (validation des types `unknown` sans `any`).
    - Automatisation des validations d'intÃ©gritÃ© de l'encyclopÃ©die via `src/data/dataIntegrity.test.ts`.

### VERSION 3.5.6 - RÃ©solution du Ticket #03 & Redirection de La SingularitÃ© (21 Mai 2026)
--------------------------------------------------
- **[Feature] IntÃ©gration de La SingularitÃ© (Ticket #03) :**
    - CrÃ©ation du sujet Ã©ducatif complet `'singularite'` dans `src/data/topics/space.ts` contenant les descriptions bilingues, faits amusants et icÃ´ne associÃ©e (`ðŸ’¥`).
    - Liaison de la frise chronologique Big Bang en configurant l'attribut `topicId: 'singularite'` sur le nÅ“ud `bb1` (Â« La SingularitÃ© Â»).
    - Ajout d'un quiz par dÃ©faut dans `QUIZZES` et d'une banque de 3 questions thÃ©matiques alÃ©atoires dans `QUIZ_BANKS` pour tester les connaissances des enfants de maniÃ¨re engageante.
- **[QualitÃ©] Tests d'IntÃ©gritÃ© Automatiques :**
    - Ajout d'une suite de tests dans `src/data/dataIntegrity.test.ts` qui vÃ©rifie que tout `topicId` rÃ©fÃ©rencÃ© dans les nÅ“uds de la frise chronologique est valide (prÃ©sent dans l'encyclopÃ©die et dotÃ© d'un quiz associÃ©), Ã  l'exclusion des hubs de catÃ©gorie (`'histoire'`, `'dinosaurs'`, `'animaux'`).
    - Validation complÃ¨te de la compilation TypeScript et de la suite de 131 tests unitaires et d'intÃ©gration Ã  100% au vert.

### VERSION 3.5.5 - RÃ©solution de la dette de validation et Mocking PWA (21 Mai 2026)
--------------------------------------------------
- **[QualitÃ©] Fix de validation ESLint (useMapZoom.ts) :**
    - Suppression du paramÃ¨tre inutilisÃ© `_e` dans la fonction `handleZoomAt` du hook `useMapZoom`, corrigeant l'erreur d'analyse statique `@typescript-eslint/no-unused-vars` qui faisait Ã©chouer la validation.
- **[QualitÃ©] Mock PWA dans les tests (setup.ts) :**
    - Ajout du mock pour le module virtuel `virtual:pwa-register/react` dans le fichier de configuration de test global `src/test/setup.ts`.
    - RÃ©solution des plantages de Vitest sur `App.test.tsx` et `XPAndMedals.integration.test.tsx` provoquÃ©s par la tentative de rÃ©solution de ce module virtuel dans l'environnement de test JSDOM.

### VERSION 3.5.4 - RÃ©silience des lancers de dÃ©s et mouvements asynchrones (21 Mai 2026)
--------------------------------------------------
- **[Feature] Annulation et RÃ©silience Asynchrone (Ticket #17) :**
    - ImplÃ©mentation d'un systÃ¨me robuste d'invalidation par transaction ID (`currentRollId`) dans `useSafariStore.ts`.
    - SÃ©curisation de toutes les Ã©tapes asynchrones (`setTimeout`, pas-Ã -pas de l'avatar, retours arriÃ¨re, rÃ©solutions de cases) par vÃ©rification systÃ©matique de la validitÃ© de l'identifiant de transaction.
    - Ajout d'un hook `useEffect` au dÃ©montage de `MissionSafari.tsx` forÃ§ant la rÃ©initialisation automatique du store de jeu Safari, annulant proprement tout processus asynchrone fantÃ´me ou persistant aprÃ¨s navigation.

### VERSION 3.5.3 - RÃ©silience Hors-ligne & Ã‰cran de secours PWA (21 Mai 2026)
--------------------------------------------------
- **[Feature] Ã‰cran Hors-ligne & Gestion de Crashs (Ticket #29) :**
    - DÃ©veloppement d'un composant de repli hors-ligne premium `OfflineFallback` avec des micro-animations interactives SVG de satellite endormi et d'Ã©toiles scintillantes (Glassmorphism moderne).
    - CrÃ©ation d'un composant global `ErrorBoundary` interceptant de faÃ§on rÃ©siliente les Ã©checs de chargement dynamique de code (ChunkLoadErrors) et de rÃ©seau lors d'une navigation hors-ligne.
    - IntÃ©gration globale dans `main.tsx` pour empÃªcher tout gel ou Ã©cran noir applicatif au lancement ou durant l'exploration.
    - Ajout des traductions bilingues complÃ¨tes (fr/en) pour les messages et le bouton de retry hors-ligne.
- **[PWA] PrÃ©-mise en cache 100% Hors-ligne :**
    - Configuration de `vite.config.ts` (`vite-plugin-pwa` et Workbox) pour inclure 100% des fichiers multimÃ©dias, images (dont `.jpg` comme `world-map.jpg`), icÃ´nes et polices dans les ressources prÃ©-mises en cache.
    - Mise en place de stratÃ©gies de mise en cache d'exÃ©cution (`runtimeCaching`) rÃ©silientes pour les styles et polices Google Fonts via CDN (StaleWhileRevalidate pour fonts.googleapis.com, CacheFirst pour fonts.gstatic.com).

### VERSION 3.5.2 - Double-Tap pour Zoomer en Mode Tablette & Mobile (20 Mai 2026)
--------------------------------------------------
- **[Feature] Double-Tap de Zoom Tactile sur la Carte au TrÃ©sor :**
    - ImplÃ©mentation d'une dÃ©tection intelligente et performante de double-tap dans `handleTouchStart` (intervalle temporel < 300ms et distance spatiale < 20px).
    - Calcul prÃ©cis et dynamique du point d'impact du double-tap sur la carte (`getBoundingClientRect` du conteneur relatif) pour centrer le zoom Ã  l'emplacement exact du tap de l'enfant.
    - DÃ©clenchement automatique de l'onde de choc visuelle (effet ripple) et du zoom progressif x2.
    - DÃ©sactivation immÃ©diate du drag/pan lors du zoom pour Ã©viter tout sursaut de camÃ©ra dÃ©sagrÃ©able.
    - PrÃ©vention des conflits d'interaction : arrÃªt de la propagation des Ã©vÃ©nements tactiles (`onTouchStart`) sur les marqueurs de points d'intÃ©rÃªt (`MapPoint`), Ã©vitant de zoomer ou de draguer involontairement la carte lors d'un tap sur un marqueur.
- **[QualitÃ©] Suite de Tests Virtuels Robustes :**
    - Ajout de nouveaux tests unitaires rigoureux dans `TreasureMap.test.tsx` pour valider le comportement du double-tap tactile, ainsi que l'exclusion correcte des double-taps invalides (trop lents ou trop Ã©loignÃ©s).
    - Utilisation d'un mock du temps systÃ¨me (`vi.spyOn(Date, 'now')`) pour des assertions temporelles 100% dÃ©terministes et stables.

### VERSION 3.5.1 - Support Tactile Premium sur la Carte au TrÃ©sor (20 Mai 2026)
--------------------------------------------------
- **[Feature] Support Tactile sur la Carte au TrÃ©sor (Ticket #14) :**
    - ImplÃ©mentation des gestionnaires d'Ã©vÃ©nements tactiles (`onTouchStart`, `onTouchMove`, `onTouchEnd`, `onTouchCancel`) sur le conteneur de dÃ©filement `.mapWrapperScroll`.
    - Recopie de la cinÃ©matique de glissement (drag-to-pan) pour le tactile simple sur tablettes (iPad, tablettes Android) et smartphones, dÃ©bloquant l'exploration de la carte interactive.
    - Ajout d'un seuil de mouvement (5 pixels) pour diffÃ©rencier prÃ©cisÃ©ment un dÃ©placement de carte d'un clic sur un point d'intÃ©rÃªt.
- **[QualitÃ©] Tests d'IntÃ©gration du Mouvement :**
    - Ajout de suites de tests unitaires simulant le drag souris et le drag tactile dans `TreasureMap.test.tsx` garantissant 100% de succÃ¨s.

### VERSION 3.5.0 - RÃ©silience Mobile & Cartographie Structurale ComplÃ¨te (20 Mai 2026)
--------------------------------------------------
- **[Feature] GÃ©nÃ©rateur d'UUID RÃ©silient (Ticket #12) :**
    - CrÃ©ation d'une fonction `generateUUID` rÃ©siliente dans `useProfileStore.ts` pour parer aux limites des navigateurs modernes qui restreignent `crypto.randomUUID` aux seuls contextes sÃ©curisÃ©s (HTTPS / localhost).
    - Bascule vers un fallback mathÃ©matique conforme Ã  la norme RFC4122 v4 pour les tests mobiles et tablettes sur le rÃ©seau local en HTTP, Ã©vitant tout crash applicatif lors de la crÃ©ation d'un profil enfant.
- **[Architecture] Cartographie RÃ©active Globale & Synchronisation DÃ©clarative :**
    - IntÃ©gration des interactions rÃ©actives complexes dans le diagramme d'architecture systÃ¨me : flux de recherche de `useDiscoveryStore`, file d'attente d'alertes de `useNotificationStore` et gestion des sessions de `useQuizStore`.
    - Documentation claire des interactions rÃ©actives croisÃ©es (orchestration dÃ©clarative de `useProfileStore` vers `useSettingsStore` et `useProgressionStore`).
- **[QualitÃ©] Compilations Vertes Ã  100% :**
    - Validation complÃ¨te et rÃ©ussie : type-checking strict via `tsc -b` et les **125 tests unitaires** sont au vert sans aucun warning de compilateur.

### VERSION 3.4.0 - L'Apprentissage Dynamique & Tranche Verticale Espace (20 Mai 2026)
--------------------------------------------------
- **[Feature] GÃ©nÃ©rateur Dynamique de Quizz & Anecdotes :**
    - ImplÃ©mentation du systÃ¨me de sÃ©lections alÃ©atoires (Randomizer) pour les quiz et les faits amusants ("Le savais-tu ?").
    - **Tranche Verticale "Espace"** : Le Soleil, la Terre et la Lune disposent dÃ©sormais chacun d'une banque enrichie de 3 questions diffÃ©rentes et de 3 anecdotes insolites.
    - Ã€ chaque visite d'un enfant sur ces sujets, une nouvelle combinaison (anecdote + quiz) est gÃ©nÃ©rÃ©e, relanÃ§ant constamment l'intÃ©rÃªt de la relecture et de la dÃ©couverte autonome.
- **[Architecture] RÃ©trocompatibilitÃ© & Robustesse :**
    - Adaptation des types TypeScript (`Topic`, `QuizBank`) pour supporter les listes de faits et de questions tout en prÃ©servant le code historique.
    - Le systÃ¨me gÃ¨re Ã©lÃ©gamment le *fallback* vers les quiz uniques pour les anciens sujets (comme les Animaux ou les Dinosaures) en attendant leur migration.
- **[UX/UI] Pages de LeÃ§ons UnifiÃ©es :**
    - La page de dÃ©tail thÃ©matique (`TopicDetail.tsx`) a Ã©tÃ© confirmÃ©e comme point de convergence unifiÃ© du Micro-learning et du Quiz.
    - Le bouton "Retour" ramÃ¨ne logiquement Ã  la catÃ©gorie parente (ex: "L'OdyssÃ©e de l'Univers"), respectant la boucle d'engagement attendue.

### VERSION 3.3.0 - Cartographie Interactive & Visualisateur de Flux (20 Mai 2026)
--------------------------------------------------
- **[Feature] Visualisateur de Flux IntÃ©gratif :**
    - IntÃ©gration de **Mermaid.js** de niveau entreprise avec rendu asynchrone sÃ©curisÃ© dans React (`MermaidDiagram.tsx`).
    - CrÃ©ation d'une page tableau de bord dynamique (`FlowDashboard.tsx`) cartographiant en temps rÃ©el les 4 couches structurelles du projet KidPedia.
    - Ajout d'une section **"Espace DÃ©veloppeur"** dans le tableau de bord parents pour faciliter le suivi de l'architecture par l'utilisateur.
- **[Feature] Outils d'Exportation Vectorielle Premium :**
    - ImplÃ©mentation du bouton **"TÃ©lÃ©charger l'image"** : extraction dynamique du code SVG gÃ©nÃ©rÃ© par Mermaid et tÃ©lÃ©chargement direct au format vectoriel `.svg` haute dÃ©finition.
    - ImplÃ©mentation du bouton **"Copier le code"** : copie instantanÃ©e de la syntaxe du diagramme Mermaid dans le presse-papier avec notifications toast (`useNotificationStore`).
- **[QualitÃ©] Sprint ZÃ©ro DÃ©faut & Compilations Green :**
    - Typage strict asynchrone et Ã©limination des avertissements de type `any` dans le bloc d'erreur (`err: unknown`) conforme aux standards ESLint.
    - Validation complÃ¨te et rÃ©ussie : type-checking `tsc -b` et les 124 tests unitaires sont 100% au vert.

### VERSION 3.0.0 - Release : Excellence Technique & Immersion Totale (18 Mai 2026)
--------------------------------------------------
- **[QualitÃ©] Sprint ZÃ©ro DÃ©faut :**
    - Ã‰limination complÃ¨te de la dette identifiÃ©e (17 problÃ¨mes rÃ©solus).
    - Purification des composants React : suppression des fonctions impures (`Math.random`) dans le rendu (via seeded random) et Ã©radication des rendus en cascade (`ParentalGate`).
    - Ã‰radication totale des types `any` dans le code source et les tests pour une sÃ©curitÃ© de type absolue.
    - Fiabilisation de l'environnement de test avec le mock global de `ResizeObserver`.
- **[Architecture] Refonte I18n Polymorphe :**
    - Suppression de l'anti-pattern "Switch-Case" pour les traductions au profit d'un systÃ¨me de mapping par dictionnaire sÃ©mantique (ex: `MissionSafari`).
- **[UX/UI] "Waouh Effect" & Immersion :**
    - **Optimisation Image :** Migration vers une architecture `<picture>` avec prioritÃ© au format **WebP** et fallback JPEG/PNG automatique sur les assets lourds.
    - **AtmosphÃ¨re Vivante :** Ajout de backgrounds animÃ©s (nÃ©buleuses radiales) via GPU-acceleration pour un sentiment de mouvement perpÃ©tuel apaisant.
    - **Habillage Sonore :** IntÃ©gration d'un contrÃ´le de sourdine global (`MuteToggle`) dans le header et synchronisation de l'ambiance sonore globale.
    - **DÃ©tails Magiques :** ImplÃ©mentation d'un curseur personnalisÃ© "Baguette Magique" (ðŸª„) pour renforcer le storytelling de l'album magique.

### VERSION 3.0.11 - Compagnons et Familiers ThÃ©matiques (20 Mai 2026)
--------------------------------------------------
- **[Feature] Compagnons et Familiers ThÃ©matiques :**
    - Introduction des compagnons animÃ©s dÃ©bloquÃ©s en obtenant 3 mÃ©dailles d'or dans des catÃ©gories spÃ©cifiques :
      - ðŸ�• **Petit Chien** (Sujet Animaux / *animals*)
      - ðŸ¤– **Mini Robot** (Sujet Espace / *space*)
      - ðŸ¦– **BÃ©bÃ© Dino** (Sujet Dinosaures / *dinosaurs*)
    - Ajout du support multi-slot : les joueurs peuvent Ã©quiper simultanÃ©ment un accessoire sur la tÃªte et un compagnon Ã  leurs cÃ´tÃ©s.
- **[UX/UI] SÃ©paration Visuelle CÃ´te-Ã -CÃ´te & Micro-Animations :**
    - Refonte de la `GiftsPage` : prÃ©sentation moderne en deux colonnes ("Mes Accessoires" et "Mes Compagnons") sur Ã©crans larges pour une clartÃ© visuelle optimale.
    - Ajout d'une micro-animation de flottement interactive (`floatCompanion`) sur les compagnons Ã©quipÃ©s pour un rendu kid-friendly ultra-vivant.
- **[Architecture] Propagation dans le Moteur de Jeu :**
    - IntÃ©gration complÃ¨te des compagnons dans le store de progression (`useProgressionStore`) avec auto-Ã©quipement intelligent au dÃ©blocage.
    - Raccordement complet du compagnon dans le pion de jeu de la `MissionSafari` et du `SafariBoard`.
- **[Roadmap/Futur] Innovation des RÃ©compenses :**
    - Note stratÃ©gique : Pour les futures itÃ©rations, planifier le remplacement progressif des Ã©mojis standard par des rÃ©compenses graphiques 3D/vectorielles personnalisÃ©es plus immersives (enregistrÃ© dans la documentation du projet).

### VERSION 3.0.10 - Consolidation UX : Progression & RÃ©compenses (20 Mai 2026)
--------------------------------------------------
- **[UX/UI] Centralisation de la Progression :**
    - Redirection du point d'entrÃ©e principal (Pill Dashboard) de la page d'accueil vers `/badges` au lieu de l'ancienne galerie.
    - RÃ©solution de la duplication architecturale : la page `BadgesPage` devient la source de vÃ©ritÃ© unique pour visualiser son niveau, son XP, et ses mÃ©dailles.
- **[UX/UI] FluiditÃ© & SÃ©curitÃ© des Actions :**
    - IntÃ©gration du composant `<GiftButton />` directement dans l'en-tÃªte de la `BadgesPage` pour un accÃ¨s direct au coffre magique.
    - DÃ©placement du bouton destructeur "RÃ©initialiser" au bas de la page pour prÃ©venir les erreurs de manipulation des enfants.
    - Suppression du composant redondant `<Wardrobe />` de la page des badges, la gestion de l'avatar Ã©tant dÃ©sormais exclusivement centralisÃ©e et optimisÃ©e dans la `GiftsPage`.
- **[Architecture] Nettoyage & Simplification :**
    - Suppression complÃ¨te de l'expÃ©rience "Cercle de la vie" (`NatureExplorer`) et de la forÃªt animÃ©e.
    - Retrait du bouton d'accÃ¨s depuis le tableau de bord principal (Discovery Hub).
    - Nettoyage de la route associÃ©e dans `App.tsx` pour maintenir une architecture saine et lÃ©gÃ¨re.

### VERSION 3.0.9 - Raffinement Visuel 3D Premium & Robustesse (20 Mai 2026)
--------------------------------------------------
- **[Feature] Raccordement MÃ©tier & Ã‰quilibrage :**
    - Ajustement stratÃ©gique du palier de dÃ©blocage du "Chapeau de Brousse" Ã  **1000 XP** dans `accessories.ts` pour une meilleure courbe d'engagement.
    - Synchronisation dynamique complÃ¨te de la `GiftsPage` avec le store global `useGiftStore` et auto-Ã©quipement immÃ©diat.
- **[UX/UI] EsthÃ©tique Premium Glossy & 3D :**
    - ImplÃ©mentation d'un design rÃ©solument moderne combinant **Glassmorphism**, grids responsives tridimensionnelles, effets de lÃ©vitation subtils et auras lumineuses pulsÃ©es.
    - CrÃ©ation d'une jauge de progression sous forme de **Capsule 3D** avec un dÃ©gradÃ© brillant haut de gamme et des ombres directionnelles pour un rendu ultra-premium.
    - Micro-interactions tactiles avancÃ©es sur tous les boutons (enfoncement `:active`, reflets dynamiques).
- **[QualitÃ©] Sprint ZÃ©ro Any & Typage Strict :**
    - Ã‰radication complÃ¨te de tous les avertissements ESLint liÃ©s Ã  l'usage de types `any` dans `GiftsPage.tsx`.
    - SÃ©curisation de l'architecture de type avec des interfaces robustes pour la gestion de l'Ã©tat rÃ©actif.
- **[IngÃ©nierie de Test] Robustesse JSDOM & Couverture Globale :**
    - RÃ©solution des plantages asynchrones JSDOM liÃ©s au rendu de `canvas-confetti` via la mise en place d'un stub global robuste dans `setup.ts`.
    - CrÃ©ation d'une suite de tests complÃ¨te `GiftsPage.test.tsx` couvrant 100% des cas d'utilisation (Ã©tats verrouillÃ©s/dÃ©verrouillÃ©s, coffre persistant, auto-Ã©quipement rÃ©actif, cÃ©lÃ©brations de victoire).
    - Validation technique totale : les 26 suites de tests (116 tests unitaires et d'intÃ©gration) passent au vert de maniÃ¨re dÃ©terministe.

### VERSION 3.0.8 - Finalisation : Boucle d'Engagement interactive & Pur CSS (19 Mai 2026)
--------------------------------------------------
- **[Feature]** InteractivitÃ© d'Ã‰quipement Direct :
    - ImplÃ©mentation des boutons de bascule rÃ©actifs (Porter / Enlever â�Œ) sous chaque cadeau dÃ©bloquÃ©.
    - Connexion directe au `useProfileStore` pour une mise Ã  jour instantanÃ©e de l'avatar du profil actif.
- **[UX/UI]** Design & Feedback :
    - Raffinement du bouton d'action (affichage texte pur pour l'Ã©quipement).
    - IntÃ©gration des micro-interactions sonores (`medal` pour l'Ã©quipement, `pop` pour le retrait).
    - Design 3D Pur CSS avec effets physiques (enfoncement au clic, ombres directionnelles).
- **[QualitÃ©/A11y]** Standards :
    - Validation de l'accessibilitÃ© universelle via des labels ARIA dynamiques.
    - Validation technique finale : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

### VERSION 3.0.7 - Dynamisation : Grille Ã‰purÃ©e & Ã‰tats RÃ©actifs (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** Raccordement Dynamique :
    - Synchronisation de la nouvelle grille GiftsPage.tsx avec le store de progression rÃ©el.
    - Gestion dynamique des cartes : affichage des stickers dÃ©couverts vs silhouettes mystÃ¨res "???".
- **[UX/UI]** Ã‰lagage Technologique :
    - Suppression complÃ¨te des anciens composants lourds et des boÃ®tes opaques.
    - Standardisation du rendu en mode "Sticker" (fond blanc, ombre portÃ©e) pour une cohÃ©rence totale avec la Galerie.
- **[QualitÃ©]** StabilitÃ© :
    - Validation technique : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

### VERSION 3.0.6 - Finalisation : Boucle d'Engagement Interactive (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Toggle d'Ã‰quipement Dynamique :
    - ImplÃ©mentation finale des boutons "Porter ðŸ¤  / Enlever â�Œ" sous chaque sticker dÃ©bloquÃ©.
    - Synchronisation rÃ©active bidirectionnelle avec le store de progression pour reflÃ©ter l'Ã©tat de l'avatar en temps rÃ©el.
- **[UX/UI]** Harmonisation Visuelle Totale :
    - Refonte esthÃ©tique calquÃ©e sur l'album de stickers : cartes blanches compactes, ombres douces et layout en grille Ã©purÃ©.
    - Design 3D Pur CSS pour les boutons d'action avec feedbacks physiques (enfoncement, relief).
    - IntÃ©gration de la signature sonore (sons `medal` et `pop`) pour chaque interaction.
- **[QualitÃ©/A11y]** Standard Industriel :
    - Validation de l'accessibilitÃ© sÃ©mantique via des labels ARIA dynamiques mis Ã  jour selon l'Ã©tat d'Ã©quipement.
    - Validation technique finale : 112 tests passÃ©s, zÃ©ro erreur TypeScript, zÃ©ro type `any`.

### VERSION 3.0.5 - Dynamisation : Grille RÃ©active & Ã‰tats Visuels (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** Raccordement Dynamique :
    - Connexion de la grille `GiftsPage.tsx` aux donnÃ©es rÃ©elles de `ACCESSORIES_DB`.
    - Liaison rÃ©active avec le `useProgressionStore` pour reflÃ©ter l'Ã©tat de dÃ©blocage en temps rÃ©el.
- **[UX/UI]** Gestion des Ã‰tats Visuels (Pur CSS) :
    - ImplÃ©mentation des classes `.unlocked` (pleine couleur, effets 3D) et `.locked` (silhouette, grisaille, pulsation mystÃ©rieuse).
    - Standardisation du layout en grille responsive harmonisÃ©e avec la `BadgesPage`.
- **[QualitÃ©]** StabilitÃ© :
    - Ã‰limination des donnÃ©es de mock au profit de la source de vÃ©ritÃ©.
    - Validation technique : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

### VERSION 3.0.4 - Engagement : Ã‰quipement ImmÃ©diat (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Bouton d'Action Directe :
    - IntÃ©gration du bouton "Mettre sur mon avatar ! ðŸ¤ " sur la `GiftsPage` post-ouverture.
    - Interconnexion avec le `useProgressionStore` (via `equipAccessory`) pour une mise Ã  jour instantanÃ©e de l'avatar du profil actif.
- **[UX/UI]** Polissage & Feedback :
    - Ajout du feedback sonore "Medal" lors de l'Ã©quipement de l'accessoire.
    - CrÃ©ation d'un Ã©tat "Ã‰quipÃ©" visuel (vert avec coche âœ…) pour confirmer l'action Ã  l'enfant.
    - Design 3D physique (relief et ombre) pour une cohÃ©rence parfaite avec le langage visuel du projet.
- **[QualitÃ©/A11y]** ConformitÃ© :
    - Ajout des labels ARIA pour une navigation inclusive.
    - Validation technique : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

### VERSION 3.0.3 - UX : ExpÃ©rience Cadeaux UnifiÃ©e (19 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Refonte "Instant Gratification" de la `GiftsPage` :
    - Centralisation de l'expÃ©rience : l'ouverture du coffre et la rÃ©vÃ©lation du trophÃ©e se font dÃ©sormais sur la mÃªme page.
    - Suppression de la fragmentation UX (plus besoin de naviguer vers la garde-robe pour voir la rÃ©compense).
- **[Gameplay]** SÃ©quence de CÃ©lÃ©bration :
    - IntÃ©gration d'une animation de suspense (vibration du coffre) suivie d'une explosion de confettis (`launchCelebration`).
    - Synchronisation audio avec le son triomphant "Tada" au moment de l'ouverture.
    - Affichage dynamique du dernier accessoire dÃ©bloquÃ© via une `TrophyCard` stylisÃ©e.
- **[QualitÃ©]** Performance & Robustesse :
    - Optimisation des animations via GPU pour une fluiditÃ© Ã  60 FPS.
    - Validation technique maintenue : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

### VERSION 3.0.2 - Logique MÃ©tier : Coffre Persistant & RÃ©activitÃ© (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** CrÃ©ation du `useGiftStore` :
    - ImplÃ©mentation d'un store Zustand autonome avec middleware `persist` pour la sauvegarde de l'Ã©tat du coffre.
    - Mise en place du pattern "Smart Store / Dumb UI" pour dÃ©coupler la logique de rÃ©compense de la vue.
- **[Gameplay]** SystÃ¨me d'Ã‰ligibilitÃ© :
    - Synchronisation rÃ©active avec le `useProgressionStore` : le coffre devient interactif dÃ¨s le franchissement du palier de 1000 XP.
    - Ajout de feedbacks visuels dynamiques (pulsation du coffre, changement d'Ã©tats textuels).
- **[QualitÃ©]** Robustesse Technique :
    - Typage strict des actions et de l'Ã©tat (ZÃ©ro `any`).
    - IntÃ©gration de la cÃ©lÃ©bration visuelle (`launchCelebration`) et sonore lors de l'ouverture.
    - Validation maintenue : 112 tests passÃ©s avec succÃ¨s.

### VERSION 3.0.1 - Feature : Page Cadeaux & Immersion (19 Mai 2026)
--------------------------------------------------
- **[Feature]** CrÃ©ation de la page `GiftsPage` :
    - ImplÃ©mentation d'un "Empty State" narratif conÃ§u pour les enfants (Coffre au trÃ©sor flottant `ðŸ§°`).
    - Ajout d'animations CSS avancÃ©es (scintillement, lÃ©vitation et fond dÃ©gradÃ© animÃ©).
- **[UX/UI]** Raccordement Navigation & Audio :
    - IntÃ©gration du bouton `GiftButton` avec redirection vers `/gifts` via `react-router-dom`.
    - Ajout du feedback sonore "Woosh" au clic pour renforcer la sensation de dÃ©couverte.
- **[Architecture]** QualitÃ© & Performance :
    - Mise en place du Lazy Loading pour la nouvelle route dans `App.tsx`.
    - Validation totale de l'accessibilitÃ© (ARIA labels sur les illustrations).
    - Validation technique complÃ¨te : 112 tests passÃ©s, zÃ©ro erreur TypeScript.

---

## ðŸš€ Historique ArchivÃ© (v1.x & v2.x)

Les versions antÃ©rieures (genÃ¨se, stabilisation et cycle v2.x) de KidPedia ont Ã©tÃ© archivÃ©es pour des raisons de modularitÃ© et de clartÃ© documentaire.

Vous pouvez consulter l'historique complet des anciennes versions ici : [HISTORY_ARCHIVE.md](./HISTORY_ARCHIVE.md).
