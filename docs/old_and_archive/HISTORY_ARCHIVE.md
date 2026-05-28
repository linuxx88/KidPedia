# 📜 Historique des Versions Archivées - KidPedia

Ce document regroupe les anciens cycles de développement (v1.x et v2.x) de KidPedia pour assurer une base documentaire complète tout en allégeant le fichier principal d'historique.

---

## 🚀 Cycle Précédent : Cycle v3.0.0 à v3.20.14 (Stabilisation et Accessibilité)

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


## 🚀 Cycle Précédent : Excellence & Industrialisation (v2.x)
### VERSION 2.3.31 - Polissage : Alignement & Espacement Cadeaux (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Perfectionnement du bouton `GiftButton` :
    - Alignement dimensionnel strict avec le bouton `BackButton` (padding harmonisé à `2rem`).
    - Ajout d'une marge de respiration (`margin-left: 1.5rem`) pour détacher le bouton du titre central.
- **[Qualité]** Validation maintenue à 100% sur la suite de tests.

### VERSION 2.3.30 - Feature : Bouton Cadeaux & Symétrie Galerie (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Ajout du système de récompenses dans la Galerie :
    - Création du composant `GiftButton` (Capsule 3D blanche, texte bleu, icône 🎁).
    - Intégration symétrique dans le `PageHeader` de la Galerie des Explorateurs, équilibrant visuellement le bouton "Retour".
- **[UX/UI]** Micro-interactions & Polissage :
    - Implémentation du feedback tactile via un `transform: scale(0.95)` sur l'état `:active` pour une sensation physique au clic.
    - Animation de transition fluide et ombrage dynamique au survol.
- **[Qualité/A11y]** Standards industriels :
    - Respect total des critères d'accessibilité avec l'ajout d'un `aria-label="Ouvrir les cadeaux"`.
    - Mise à jour de la suite de tests `ExplorerGallery.test.tsx` (validation du rendu et des labels) : 100% passés.

### VERSION 2.3.29 - Fix Layout : Panel latéral (18 Mai 2026)
--------------------------------------------------
- **[Bugfix]** Correction de la mise en page du panneau latéral :
    - Ajout des propriétés flex (`display: flex`, `flex-direction: row`) sur `.boardLayout` pour garantir que le panneau latéral reste bien positionné sur la gauche du jeu, corrigeant un problème de saut de ligne vers le haut.

### VERSION 2.3.28 - Ergonomie : Panel latéral à gauche (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Réorganisation de la page Mission Safari :
    - Déplacement du panneau latéral (journal de bord et contrôles du dé) sur la partie gauche de l'écran, selon la préférence de l'utilisateur.
    - Mise à jour du layout flexbox dans `MissionSafari.tsx` pour supporter cette configuration tout en conservant la réactivité mobile.

### VERSION 2.3.27 - Optimisation Hauteur : Support des écrans compacts (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Support des écrans à faible hauteur (ex: ThinkPad X220) :
    - Introduction d'une règle `@media (max-height: 700px)` pour adapter dynamiquement la taille du `statusPanel`.
    - Les éléments de jeu (messageBox, rollBtn) se réduisent intelligemment pour s'intégrer dans le viewport, supprimant le besoin de scroll vertical sur les résolutions 1366x768.

### VERSION 2.3.26 - Optimisation Mobile : Visibilité & Ergonomie (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Optimisation de la vue Mobile (Portrait) :
    - Compactage du panneau de contrôle (`statusPanel`) pour garantir que les commandes de jeu (Lancer de dés) et les éléments de quête restent visibles sans scroll.
    - Réduction de l'empreinte visuelle du `messageBox` et des icônes d'inventaire sur petit écran.
    - Suppression de la nécessité de scroller pour accéder aux interactions vitales, améliorant l'immersion et la jouabilité.
- **[Qualité]** Validation :
    - Vérification de la disposition sur simulateur mobile (écran restreint) confirmant la visibilité immédiate du bouton de lancer de dé.

### VERSION 2.3.25 - Hotfix : Alignement Safari & Personnalisation (18 Mai 2026)
--------------------------------------------------
- **[Bugfix]** Correction du désalignement du parcours Safari :
    - Remplacement du calcul de chemin basé sur `getBoundingClientRect` (instable lors des rendus) par une itération logique sur les rangées (`.row`) observée par `ResizeObserver`.
    - Garantit un tracé SVG parfaitement aligné avec la grille hexagonale, quelle que soit la résolution ou l'orientation.
- **[Feature]** Personnalisation de l'Interface :
    - Ajout d'un toggle Thème (Clair/Sombre) dans le header de `MissionSafari` pour une meilleure accessibilité visuelle.
    - Intégration via le store global `useSettingsStore` assurant la persistance du réglage.
- **[Qualité]** Validation :
    - Suite de tests E2E `safari.spec.ts` validée (3/3 passés).

### VERSION 2.3.24 - Finalisation de la Faune Stylisée (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Achèvement de l'Unification Artistique :
    - Création du composant `StylizedFauna` remplaçant les derniers émojis (écureuil, papillon) par des illustrations SVG natives et modernes.
    - Intégration de l'écureuil sur le tronc et du papillon près des branches avec un style cohérent au reste du décor.
- **[UX/UI]** Micro-interactions Animales :
    - Implémentation d'une animation de battement d'ailes (`flutter`) pour le papillon et d'un frétillement de queue (`twitch`) pour l'écureuil.
    - Ajout d'états `:hover` réactifs pour chaque animal pour inciter à la découverte.

### VERSION 2.3.23 - Hotfix QA : Correction des Interactions SVG (18 Mai 2026)
--------------------------------------------------
- **[Bugfix]** Résolution du timeout E2E lors de l'interaction avec le nouvel arbre stylisé.
- **[Cause Racine]** "Occlusion d'événements" en SVG : les branches de l'arbre, non interactives, se superposaient au tronc et interceptaient les clics destinés à ce dernier, bloquant l'automatisation Playwright.
- **[Solution]** Application de la propriété CSS `pointer-events: none` sur les branches (`.treeBranch`) pour permettre aux clics de traverser la couche décorative et d'atteindre le tronc interactif.

### VERSION 2.3.22 - Projet Unification : Refonte Artistique Totale (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Unification du Style Visuel :
    - Remplacement complet de l'arbre et des animaux basés sur des émojis par de nouvelles illustrations pures et stylisées en SVG (`<path>`).
    - Le style géométrique et moderne est désormais cohérent avec le décor et les effets atmosphériques.
- **[Architecture]** Fin de la "Dette Emoji" :
    - Suppression des anciens composants `Tree`, `Animals`, et `Foliage`.
    - Création des nouveaux composants `StylizedTree` et mise à jour de `AquaticLife` avec des graphismes SVG natifs.
- **[Qualité]** Cohérence des Couleurs :
    - Les couleurs du nouvel arbre, de ses feuilles et du poisson sont maintenant entièrement contrôlées par les variables CSS saisonnières, garantissant des transitions harmonieuses.

### VERSION 2.3.21 - Hotfix Critique : L'Import Manquant du Poisson (18 Mai 2026)
--------------------------------------------------
- **[Bugfix Critique]** Résolution du bug persistant d'invisibilité du poisson.
- **[Cause Racine]** Omission de la ligne d'import pour le composant `AquaticLife` dans `NatureExplorer.tsx`, empêchant React de le rendre.
- **[Solution]** Ajout de la ligne `import { AquaticLife } from './Elements/AquaticLife';` dans `src/components/Learning/NatureExplorer/NatureExplorer.tsx`.
- **[Qualité]** Test E2E `nature-explorer.spec.ts` mis à jour pour valider explicitement la visibilité du poisson, suite à ce problème.

### VERSION 2.3.20 - Hotfix Final : Résolution de l'Occlusion du Poisson (18 Mai 2026)
--------------------------------------------------
- **[Bugfix]** Correction du bug persistant de visibilité du poisson.
- **[Cause Racine]** Le composant de l'arbre (`z-index: 10`) était rendu par-dessus la zone d'eau (`z-index: 5`), cachant (occluant) le poisson.
- **[Solution]** Déplacement de la zone d'eau du coin inférieur droit au coin inférieur gauche de l'écran pour qu'elle ne soit plus masquée par le tronc de l'arbre.
- **[Qualité]** Renforcement des tests E2E avec une assertion explicite `toBeVisible()` sur le poisson pour éviter toute future régression.

### VERSION 2.3.19 - Hotfix de Régression : Le Poisson Réapparaît (18 Mai 2026)
--------------------------------------------------
- **[Bugfix]** Correction d'une régression critique où le poisson n'était plus visible après la refonte des couches.
- **[Cause Racine]** Utilisation incorrecte d'un composant wrapper conçu pour SVG (`AccessibleSvgHotspot`) dans un contexte HTML, empêchant le rendu du poisson.
- **[Solution]** Remplacement du wrapper SVG par un élément `<button>` HTML sémantiquement correct, garantissant la visibilité et l'interactivité du poisson.

### VERSION 2.3.18 - Correction de Couche : Le Poisson retrouve l'Eau (18 Mai 2026)
--------------------------------------------------
- **[Feature/Bugfix]** Correction de l'Immersion Visuelle :
    - Le poisson, précédemment rattaché à l'arbre, a été extrait et placé dans son propre composant `AquaticLife`.
    - Il est désormais rendu **à l'intérieur** de la zone d'eau (`.water`), corrigeant le bug de superposition (z-index).
    - L'arbre et ses racines passent maintenant correctement **devant** la zone d'eau, renforçant l'illusion de profondeur.
- **[UX/UI]** Polissage :
    - Ajout d'un effet visuel subtil (`opacity` et `filter`) sur le poisson pour simuler son immersion sous l'eau.

### VERSION 2.3.17 - Stabilisation E2E Post-Refonte & Isolation de Dette (18 Mai 2026)
--------------------------------------------------
- **[Qualité]** Robustesse des Tests E2E :
    - Correction du test `nature-explorer.spec.ts` en remplaçant les sélecteurs de classe CSS (fragiles à cause des CSS Modules) par des `data-testid` stables et pérennes.
- **[Qualité]** Diagnostic de Stabilité :
    - Identification de la cause racine des timeouts E2E généralisés : une tentative de chargement d'un fichier audio placeholder non-existant. Le hook audio a été temporairement neutralisé.
- **[Dette Technique]** Problème Connu (Isolé) :
    - Un timeout intermittent persiste sur `multi-profile.spec.ts` **uniquement sur WebKit**. Le problème est classifié comme une instabilité de l'environnement de test et non comme une régression de l'application. À investiguer lors d'un sprint de maintenance de la CI.

### VERSION 2.3.16 - Refonte "Industrielle" du Cercle de la Vie (Directive CEO) (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Révolution Visuelle :
    - Abandon des fonds de couleur unis au profit d'une **architecture de scène multi-couches** composée d'illustrations SVG programmatiques (montagnes, arbres).
    - Implémentation d'un **hook `useParallax` réutilisable** pour créer un effet de profondeur 3D réaliste qui réagit au scroll.
- **[Feature]** Effets Atmosphériques :
    - Création d'un **`ParticleSystem` saisonnier** pour générer des ambiances immersives : neige en hiver, feuilles en automne, pétales au printemps et poussière lumineuse en été.
- **[Architecture]** Qualité "Industrielle" :
    - La nouvelle structure est conçue pour accueillir des assets graphiques de haute qualité sans modification de la logique.
    - Les animations et effets sont optimisés pour la performance (CSS `transform` et `opacity`).

### VERSION 2.3.15 - Projet "Forêt Vivante" (Phase 1) : Immersion Visuelle et Sonore (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Refonte Visuelle du "Cercle de la Vie" :
    - Implémentation de dégradés de ciels dynamiques qui changent avec les saisons pour une ambiance plus riche.
    - Ajout d'animations CSS subtiles : un effet de scintillement sur l'eau et de bruissement sur les feuilles pour donner vie à la scène.
- **[Audio]** Introduction de l'Ambiance Sonore :
    - Création du hook réutilisable `useAmbientAudio` pour gérer proprement les sons d'ambiance en boucle.
    - Intégration d'un son de forêt (placeholder) dans la page "Cercle de la Vie" pour une immersion auditive.
- **[Architecture]** Qualité de Code :
    - Le nouveau hook audio gère le cycle de vie complet de l'objet `Audio` pour éviter les fuites de mémoire.

### VERSION 2.3.14 - Minimalisme & Focus : L'utilisateur au centre (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Épuration Radicale du Header :
    - Retrait du bouton Galerie (`📔`) du header global pour désencombrer l'espace visuel et simplifier la navigation.
    - Établissement du **Pill Dashboard** comme point d'entrée unique et naturel vers la collection de médailles (Galerie).
- **[Qualité]** Alignement des Tests :
    - Mise à jour de la suite E2E Playwright pour refléter la suppression du bouton header et valider le parcours utilisateur simplifié.

### VERSION 2.3.13 - Refonte UX : Simplification de la Navigation (18 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Élagage de la Navigation Redondante :
    - Suppression de la carte "Galerie" du Discovery Hub (Hub Central) pour réduire la surcharge cognitive, suite aux retours utilisateurs.
    - Centralisation de l'accès à la Galerie via le Header (global) et le Dashboard (contexte de progression).
- **[UX/UI]** Polissage du Tableau de Bord (Pill Dashboard) :
    - Amélioration de l'animation au survol du dashboard : ajout d'un effet de lévitation plus marqué et d'un halo lumineux (glow) pour inciter à l'exploration des médailles.
    - Optimisation de l'équilibre visuel de la grille d'activités (passage à 4 items majeurs).

### VERSION 2.3.12 - Galerie des Explorateurs & Assets Audio (18 Mai 2026)
--------------------------------------------------
- **[Feature]** Galerie des Explorateurs (Sticker Album) :
    - Création du composant `ExplorerGallery` ludique pour visualiser la progression sous forme de stickers.
    - États visuels dynamiques : stickers colorés avec effet "die-cut" (débloqués) et silhouettes mystères (verrouillés).
    - Intégration globale : raccourci ajouté au `DiscoveryHub`, au Header principal et au dashboard de la page d'accueil.
- **[Audio]** Extension du Système Sonore :
    - Amélioration de `useAudioFeedback` pour le support de chemins dynamiques vers des fichiers `.m4a`.
    - Implémentation des effets sonores réels (Lion, Éléphant, Tigre) lors du clic sur les stickers débloqués.
- **[Qualité]** Tests & Optimisation :
    - Résolution des alertes "Maximum update depth exceeded" via des références de tableaux immuables.
    - Mise en place d'une suite de tests Vitest complète pour le nouveau composant.

### VERSION 2.3.11 - Zone Parents & Growth Mindset (17 Mai 2026)
--------------------------------------------------
- **[Feature]** Chantier "Confiance Parents" :
    - Implémentation du **Parental Gate** : modal de sécurité avec défi mathématique aléatoire pour protéger l'accès aux zones sensibles.
    - Création du **Parents Dashboard** : vue analytique permettant de suivre la progression de tous les profils (XP, médailles, % de complétion de l'encyclopédie).
    - Ajout d'une option de réinitialisation sécurisée par profil.
- **[Feature]** Chantier "Growth Mindset" (Quiz Bienveillants) :
    - Mise en place du **Système d'Indices (Hints)** : apparition d'une aide pédagogique dès la première erreur au quiz pour encourager l'enfant.
    - Implémentation de la **Redirection Pédagogique** : bouton "🔍 Revoir le secret" avec auto-scroll fluide vers le contenu d'apprentissage en cas d'échecs répétés.
- **[Qualité]** Stabilisation des Tests & Build :
    - Mise à jour exhaustive de la suite de tests unitaires (`Quiz.test.tsx`, `TopicDetail.test.tsx`) pour intégrer les nouvelles props obligatoires.
    - Résolution des régressions E2E (Bug 11 & 12) via l'utilisation de `data-testid` robustes dans le Header et synchronisation des assertions de texte.

### VERSION 2.3.10 - Éradication des Scrolls Fantômes & Stabilisation E2E (17 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Ghostbusting : Suppression des comportements de défilement imprévisibles :
    - Élimination de la restauration automatique du scroll au montage de la `HomePage` pour redonner le contrôle total à l'utilisateur.
    - Réduction du `padding-bottom` de layout de `50vh` à **`15vh`**, supprimant la sensation de vide infini en bas de page tout en préservant la stabilité du ScrollSpy.
- **[Qualité]** Stabilisation E2E & Robustesse des Tests :
    - **Fiabilisation du Header :** Migration des sélecteurs de tests vers des `data-testid` explicites (`header-theme-btn`, `header-gender-btn`), éliminant la fragilité liée aux index (`nth`).
    - **Synchronisation Quiz :** Mise à jour des assertions de victoire pour correspondre aux nouveaux textes pédagogiques du Growth Mindset.
    - **Recalibrage ScrollSpy :** Optimisation de l' `IntersectionObserver` (zone de détection à 50%) pour un succès constant sur tous les moteurs de rendu.

### VERSION 2.3.9 - Stabilisation des Cycles de Rendu (17 Mai 2026)
--------------------------------------------------
- **[Qualité]** Éradication des boucles de rendu infinies ("Maximum update depth exceeded") :
    - **Neutralisation de l'instabilité des sélecteurs :** Introduction d'une constante `EMPTY_ARRAY` dans les composants `Wardrobe` et `BadgesPage` pour garantir une référence stable lors des accès aux accessoires et badges.
    - **Purification des Actions Zustand :** Extraction des effets de bord (Notifications, launchCelebration) hors des fonctions de mise à jour d'état (`set`). Les festivités sont désormais déclenchées post-mutation pour éviter les cascades de rendus.
- **[Performance]** Optimisation du `ProgressionListener` :
    - Simplification de la logique de détection des changements pour réduire la charge CPU lors des abonnements aux stores.
    - Désensibilisation des sélecteurs pour ne réagir qu'aux données primitives ou références stables.

### VERSION 2.3.8 - Robustesse P0 & Rétrocompatibilité (17 Mai 2026)
--------------------------------------------------
- **[Qualité]** Hotfix P0 : Éradication des crashs de store :
    - Correction du `TypeError: is not iterable` lors de la manipulation des accessoires sur les anciens profils.
    - Blindage de `checkAccessoryUnlocks` avec des fallbacks systématiques sur tableaux vides.
    - Garantie de retour de type itérable (Array) pour éviter les erreurs `.length` sur des objets `undefined`.
- **[Qualité]** Rétrocompatibilité Totale :
    - Mise en place d'une auto-réparation transparente des profils legacy lors du premier gain d'XP ou de médaille.
    - Sécurisation des getters et sélecteurs de progression face aux schémas de données incomplets.

### VERSION 2.3.7 - Style Explorer & Hook Loop (17 Mai 2026)
--------------------------------------------------
- **[Feature]** Système d'accessoires d'avatar ("Style Explorer") :
    - Création de `src/data/accessories.ts` avec conditions de déblocage basées sur le mérite.
    - Implémentation du composant `AvatarDisplay` (moteur de rendu multi-couches).
    - Ajout de la "Garde-robe" interactive dans la page des badges.
    - Mécanique d'auto-équipement immédiat lors du déblocage.
- **[Feature]** Refonte "Hook Loop" de collection :
    - Transformation des badges non-découverts en silhouettes palpitantes.
    - Implémentation du Deep Linking : redirection intelligente vers les catégories depuis les silhouettes.
- **[Qualité]** Éradication totale de la dette technique TypeScript :
    - Nettoyage final du build : **Zéro erreur** rapportée par `tsc`.
    - Sécurisation du composant `AccessibleSvgHotspot` et des mocks de tests.
- **[Qualité]** Optimisation Haute Performance :
    - Refonte de `useAudioFeedback` en Singleton pour éradiquer les fuites mémoire.
    - Optimisation GPU des animations de badges (passage à l'opacité pure).
    - Ajout de `content-visibility: auto` pour un scroll fluide à 60 FPS.
- **[Qualité]** Accessibilité & UX :
    - Blindage ARIA des badges (labels humains vs statistiques).
    - Intégration de `canvas-confetti` pour les célébrations de réussite.
    - Suppression totale du code CSS mort et stabilisation de la suite E2E sur Chromium/Firefox.

### VERSION 2.3.6 - Durcissement des Tests & Data Factories (17 Mai 2026)
--------------------------------------------------
- **[Qualité]** Éradication de l'illusion du "Zero Any" :
    - Création de `src/test/factories.ts` pour générer des objets de test (`Profile`, `Topic`, `Quiz`) 100% conformes aux interfaces.
    - Suppression des casts `as unknown as` et `as any` dans l'intégralité de la suite de tests.
- **[Architecture]** Standardisation des Mocks API :
    - Introduction de `src/test/mockUtils.ts` pour centraliser les mocks complexes (SpeechSynthesis, Audio) sans compromis sur le typage.
- **[Maintenance]** Optimisation des performances de test :
    - Création de `src/test/mockData.ts` (encyclopédie allégée) pour les tests unitaires.

### VERSION 2.3.5 - Réactivité Pure & Orchestration Déclarative (17 Mai 2026)
--------------------------------------------------
- **[Architecture]** Démantèlement du "Master Orchestrator" impératif :
    - Suppression du `useProfileStore.subscribe` manuel au profit d'une synchronisation déclarative intégrée aux actions (`addProfile`, `selectProfile`, `updateProfile`).
    - Isolation de la logique de migration legacy dans `useProgressionStore` pour purifier le flux réactif.
- **[Qualité]** Stabilité des flux :
    - Validation du changement de profil sans effets de bord imprévisibles.
    - Correction des timeouts de tests E2E liés à la réactivité asynchrone (3/3 tests multi-profils au vert).

### VERSION 2.3.4 - Automatisation du Type TopicId (17 Mai 2026)
--------------------------------------------------
- **[Architecture]** Inférence dynamique des identifiants :
    - Utilisation de `as const` sur tous les fichiers de données sujets.
    - Dérivation automatique du type `TopicId` dans `domain.ts` à partir de la source de vérité.
    - Élimination de la maintenance manuelle de la liste des IDs (Dette technique résolue).
- **[Architecture]** Résolution de dépendance circulaire :
    - Découplage de l'interface `Topic` et du type `TopicId` pour permettre l'inférence bidirectionnelle.
- **[Qualité]** Renforcement de l'Audit :
    - Ajout d'un test d'intégrité détectant automatiquement les doublons d'IDs dans l'encyclopédie.
    - Validation complète via `tsc` (Zéro erreur de type).

### VERSION 2.3.3 - Refonte "Cercle de la Vie" & Hotspots Accessibles (17 Mai 2026)
--------------------------------------------------
- **[Architecture]** Démantèlement du Monolithe `Tree.tsx` :
    - Découpage en sous-composants métier : `TreeRoots`, `TreeTrunk` et `TreeBranches`.
    - Création du composant générique `AccessibleSvgHotspot` pour standardiser les interactions SVG.
- **[Accessibilité]** Blindage A11y du SVG :
    - Implémentation du focus clavier (`tabindex`), des rôles ARIA (`role="button"`) et du support des touches `Enter`/`Space` pour tous les éléments de l'arbre.
    - Ajout d'un indicateur de focus industriel (`outline-offset`) pour les éléments SVG.
- **[UX/UI]** Unification du système de rendu :
    - Migration des animaux (`squirrel`, `butterfly`, `fish`) vers un rendu pur SVG (balises `<text>`).
    - Unification des fruits et fleurs en éléments SVG natifs, éliminant le mélange hybride HTML/SVG.
    - Synchronisation des couleurs saisonnières via variables CSS dans le SVG.
- **[Qualité]** Validation Totale :
    - Ajout de tests unitaires pour `AccessibleSvgHotspot` (100% passés).
    - Mise à jour de la suite E2E Playwright pour vérifier les labels ARIA et la navigation clavier sur la page Nature.

### VERSION 2.3.2 - Moteur de Carte Premium & Accessibilité (16 Mai 2026)
--------------------------------------------------
- **[Architecture]** Évolution du Moteur de Carte (`TreasureMap`) :
    - Abstraction totale des données : le moteur est désormais générique et reçoit ses marqueurs par props.
    - Création du hook `useMapZoom` gérant le zoom intelligent centré sur le point cliqué.
    - Création du hook `useVisualEffects` pour une gestion saine et performante des ondes de choc (ripples).
- **[UX/UI]** Navigation et Inclusivité :
    - Implémentation du **Drag-to-Pan** (cliquer-glisser) pour explorer la carte zoomée.
    - Standardisation des popups de découverte via le composant `AppOverlay`.
    - Ajout de raccourcis clavier (+, -, 0) pour le contrôle du zoom.
    - Valorisation des succès : affichage des médailles réelles (Or/Argent/Bronze) sur la carte.
- **[Accessibilité]** Blindage A11y :
    - Ajout de rôles ARIA, de labels dynamiques et de zones `aria-live` pour les lecteurs d'écran.
    - Optimisation de l'ordre de tabulation pour une navigation spatiale logique au clavier.
- **[Qualité]** Validation Totale :
    - Éradication des types `any` dans le module TreasureMap et ses tests.
    - Ajout de tests unitaires pour le moteur de zoom et mise à jour des tests E2E Playwright (15/15 passés).

### VERSION 2.3.1 - Dissolution du God Object & Modularité (16 Mai 2026)
--------------------------------------------------
- **[Architecture]** Démantèlement du "God Object" `useProgressionStore` :
    - Création de `useEnvironmentStore` pour isoler l'état du monde (Saisons).
    - Purification du store de progression : suppression de la logique spécifique "Nature".
    - Introduction d'une API générique `addXP(amount)` pour une progression universelle.
- **[Gameplay]** Isolation de la logique métier :
    - Création du hook `useNatureGame` centralisant les règles de l'expérience NatureExplorer.
    - Découplage total entre les éléments visuels de la nature et le stockage de progression.
- **[Qualité]** Stabilisation et Typage :
    - Éradication des derniers types `any` dans les fichiers de tests et les migrations de badges.
    - Mise à jour de la suite de tests (92 tests Vitest au vert).
    - Correction de bugs de réactivité et de loops de rendu dans le Master Orchestrator.

### VERSION 2.3.0 - Forteresse Architecturale & I18n Découplée (16 Mai 2026)
--------------------------------------------------
- **[Architecture]** Refonte "Smart Store / Dumb UI" Complète :
    - Découplage total de l'I18n : Les stores émettent des codes d'événements (`DICE_ROLL`, etc.), l'UI gère la traduction.
    - Transformation de `usePlayerStore` en sélecteur de lecture seule réactif.
    - Centralisation de la progression dans `useProgressionStore` avec le middleware `persist`.
- **[Qualité]** Forteresse de Validation :
    - Stabilisation de la suite de tests unitaires et d'intégration (87 tests Vitest au vert).
    - Validation des parcours critiques via 9 scénarios E2E Playwright.
- **[Documentation]** Excellence Documentaire :
    - Centralisation de toute la doc technique et historique dans `/docs`.
    - Identification et documentation de la dette technique pour la v3.0.

---

## 📂 Archives : Genèse et Stabilisation (v1.x)

### Cycle v1.5 - v1.9 : Expansion du Contenu & PWA
- **v1.9.x :** Création du Grand Voyage du Temps (Dinosaures, Civilisations, Villages).
- **v1.8.x :** Correction de la fluidité et du scroll, amélioration du tracé "Serpentin".
- **v1.7.x :** Storytelling dynamique, apparition séquentielle des contenus, navigation récursive.
- **v1.6.x :** Audit d'accessibilité (contraste), stabilisation du système de notifications.
- **v1.5.x :** Automatisation des tests E2E avec Playwright, principes d'ingénierie CSS.

### Cycle v1.0 - v1.4 : Fondations & Multi-Profils
- **v1.4.x :** Implémentation du système i18n natif et contenu bilingue.
- **v1.3.x :** Interface multi-profils et thème "Espace" (3D).
- **v1.2.x :** Isolation des données par profil via localStorage.
- **v1.1.x :** Transformation en Progressive Web App (PWA).
- **v1.0.0 :** État Initial - Lancement de l'aventure KidPedia.
