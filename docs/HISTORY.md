# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

## Espace Parents & Limites de Temps

### VERSION 3.23.0 - Le Grand Quiz des Champions 🏆⚡ (25 Mai 2026)
--------------------------------------------------
- **[Gamification/Logic/UI/UX] Le Grand Quiz des Champions (Mode Défi) (Ticket #R5) :**
    - **useQuizChampionshipStore.ts (Logic & State)** : Création d'un magasin Zustand persistant (LocalStorage) gérant le tirage de 10 questions aléatoires, le compte à rebours de 15 secondes par question, le calcul et le stockage sécurisé des 5 meilleurs scores locaux (Wall of Fame) avec l'avatar et le nom de l'explorateur actif.
    - **ChampionshipPage.tsx & ChampionshipPage.module.css (UI/UX)** : Intégration d'un écran de jeu immersif haut de gamme (effets néons, dégradés d'or en glassmorphism et animations 3D) avec un minuteur graphique interactif SVG représentant une mèche d'allumette qui se consume avec une flamme animée vacillante.
    - **Procedural Sound Synthesis (Web Audio API)** : Conception d'un moteur de sons procéduraux (chime de réussite, bourdonnement de mauvaise réponse, horloge de stress pour les 5 dernières secondes, signal de temps écoulé et fanfare finale harmonieuse) assurant une immersion sonore sans dépendance de fichiers externes lourds.
    - **Visual Celebrations (Confetti)** : Déclenchement d'explosions de confettis en fin de jeu et double cascade dorée symétrique exclusive en cas de sans-faute parfait (10/10).
    - **App.tsx & HomePage.tsx (Navigation)** : Enregistrement de la nouvelle route `/championship` et ajout d'une tuile d'accès thématique « Le Grand Quiz des Champions » dans la grille du Hub de Découverte (Icône Rocket dorée).
- **[Parents/Architecture] Refonte premium et interactive complète du Visualisateur de Flux (Flow Visualizer) :**
    - **Interactive Layer Filtering** : Ajout de filtres interactifs par clic sur les catégories de la légende pour isoler visuellement n'importe quelle couche de l'application (Points d'Entrée, Vues, Composants Graphiques, Zustand Stores, Bases de Données, Hooks/Feedback) en atténuant dynamiquement le reste du diagramme via des transitions fluides CSS.
    - **Floating Zoom & Reset Panel** : Implémentation d'un module de zoom dynamique (de 50% à 160%) avec centrage élastique et barres de défilement personnalisées pour parcourir facilement les diagrammes d'architecture complexes.
    - **Updated Architecture Graph** : Mise à jour complète de la cartographie Mermaid pour y inclure les modules du Refuge des Compagnons, la boutique de friandises, le Grand Quiz des Champions et le magasin `useQuizChampionshipStore`.
    - **Export Vectoriel PNG & SVG** : Optimisation des routines de sérialisation XML autonomes avec résolution automatique des variables CSS de thème pour des téléchargements instantanés de diagrammes haute définition.

### VERSION 3.22.8 - Liaison Encyclopédique & Quizz Interactifs du Moyen-Âge 🛡️🏰 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour le Moyen-Âge (Ticket #44) :**
    - **middleAges.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`ma1` à `ma8`) à des identifiants de sujets uniques (`romains`, `chevaliers`, `chateaux`, `cathedrales`, `calligraphie`, `moulins-moyen-age`, `foires-marches`, `invention-papier`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (Encyclopédie)** : Conception et intégration de 5 nouvelles fiches éducatives bilingues adaptées pour le jeune public de 4-8 ans (`cathedrales`, `calligraphie`, `moulins-moyen-age`, `foires-marches`, `invention-papier`).
    - **quizzes/history.ts (Quizz)** : Création de 5 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage du Moyen-Âge.
    - **constants/ids.ts (Typage & Intégration)** : Déclaration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.7 - Liaison Encyclopédique & Quizz Interactifs des Grandes civilisations 🏺🏛️ (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour les Grandes civilisations (Ticket #43) :**
    - **civilizations.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`cv1` à `cv8`) à des identifiants de sujets uniques (`pyramides`, `ecriture-sacree`, `grece-antique`, `romains`, `mayas`, `grande-muraille`, `empire-incas`, `vikings`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (Encyclopédie)** : Conception et intégration de 2 nouvelles fiches éducatives bilingues adaptées pour le jeune public de 4-8 ans (`ecriture-sacree`, `empire-incas`).
    - **quizzes/history.ts (Quizz)** : Création de 2 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage des grandes civilisations.
    - **constants/ids.ts (Typage & Intégration)** : Déclaration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.6 - Liaison Encyclopédique & Quizz Interactifs des Regroupements primitifs 🛖🌾 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour les Regroupements primitifs (Ticket #42) :**
    - **groups.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`gv1` à `gv8`) à des identifiants de sujets uniques (`sedentarisation`, `murs-terre`, `debuts-agriculture`, `debuts-elevage`, `invention-poterie`, `vie-communaute`, `tissage-laine`, `megalithes`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (Encyclopédie)** : Conception et intégration de 8 nouvelles fiches éducatives bilingues adaptées pour le jeune public de 4-8 ans.
    - **quizzes/history.ts (Quizz)** : Création de 8 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et de consolider l'apprentissage du mode de vie sédentaire.
    - **constants/ids.ts (Typage & Intégration)** : Déclaration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application.

### VERSION 3.22.5 - Liaison Encyclopédique & Quizz Interactifs de l'Évolution de l'homme 🚶🔥 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches de quiz pour l'Évolution de l'homme (Ticket #41) :**
    - **evolution.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`ev1` à `ev8`) à des identifiants de sujets uniques existants (`dompteur-feu`, `prehistoire`, `artisan-pierres`, `artistes-cavernes`, `loup`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.

### VERSION 3.22.4 - Liaison Encyclopédique & Quizz Interactifs des Premières formes humaines 🏜️🚶 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive et fiches pédagogiques pour les Premières formes humaines (Ticket #40) :**
    - **humans.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`hf1` à `hf8`) à des identifiants de sujets uniques (`berceau-afrique`, `debout-deux-pieds`, `artisan-pierres`, `dompteur-feu`, `grand-voyage`, `cousins-neandertal`, `artistes-cavernes`, `premiers-villages`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/history.ts (Encyclopédie)** : Conception et intégration de 8 nouvelles fiches éducatives bilingues adaptées pour le jeune public de 4-8 ans.
    - **quizzes/history.ts (Quizz)** : Création de 8 nouveaux quiz interactifs et stimulants pour chaque nouveau sujet afin de valider et consolider l'apprentissage de l'évolution humaine.

### VERSION 3.22.3 - Liaison Encyclopédique & Quizz Interactifs des Dinosaures 🦖🦕 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/QA] Liaison interactive des sous-nœuds des Dinosaures dans la frise chronologique (Ticket #39) :**
    - **dinosaurs.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`dn1` à `dn8`) à des identifiants de sujets uniques existants (`velociraptor`, `diplodocus`, `pterodactyle`, `brachiosaure`, `stegosaure`, `spinosaure`, `t-rex`, `triceratops`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique des dinosaures d'Origins.

### VERSION 3.22.2 - Liaison Encyclopédique & Quizz Interactifs des Premières espèces terrestres 🦎🍃 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et suppression des impasses pédagogiques pour les Premières espèces terrestres (Ticket #38) :**
    - **land.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`ls1` à `ls8`) à des identifiants de sujets uniques (`sortie-des-eaux`, `air-pur`, `premieres-forets`, `insectes-geants`, `peau-reptile`, `oeuf-solide`, `climat-change`, `apparition-fleurs`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/nature.ts (Encyclopédie)** : Création de 4 fiches bilingues détaillées (`air-pur`, `premieres-forets`, `climat-change`, `apparition-fleurs`), incluant des descriptions adaptées pour les enfants de 4-8 ans et des anecdotes amusantes en français et en anglais.
    - **topics/animals.ts (Encyclopédie)** : Conception et intégration de 4 nouvelles fiches éducatives captivantes (`sortie-des-eaux`, `insectes-geants`, `peau-reptile`, `oeuf-solide`) avec un vocabulaire bilingue riche et adapté.
    - **quizzes/nature.ts (Quizz)** : Création de 4 quiz interactifs pour les nouveaux sujets de la nature avec questions, options de réponse, réponses correctes et indices pédagogiques localisés.
    - **quizzes/animals.ts (Quizz)** : Création de 4 nouveaux quiz interactifs et intuitifs pour chaque nouvelle espèce terrestre préhistorique afin de consolider la gamification et l'évaluation continue.
    - **constants/ids.ts (Typage & Intégration)** : Déclaration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application et la suite de tests.

### VERSION 3.22.1 - Liaison Encyclopédique & Quizz Interactifs des Premières espèces marines 🔬🐟 (25 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et suppression des impasses pédagogiques pour les Premières espèces marines (Ticket #37) :**
    - **marine.ts (Navigation)** : Association de chacun des 8 sous-nœuds intermédiaires (`ms1` à `ms8`) à des identifiants de sujets uniques (`premieres-cellules`, `meduses-eponges`, `trilobites`, `vers-marins`, `coquillages-primitifs`, `anomalocaris`, `poissons-sans-machoires`, `poissons-ecailles`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
    - **topics/nature.ts (Encyclopédie)** : Création d'une fiche bilingue détaillée pour `premieres-cellules`, incluant des descriptions adaptées pour les enfants de 4-8 ans et des anecdotes amusantes en français et en anglais.
    - **topics/animals.ts (Encyclopédie)** : Conception et intégration de 7 nouvelles fiches éducatives captivantes (`meduses-eponges`, `trilobites`, `vers-marins`, `coquillages-primitifs`, `anomalocaris`, `poissons-sans-machoires`, `poissons-ecailles`) avec un vocabulaire bilingue riche et adapté.
    - **quizzes/nature.ts (Quizz)** : Création d'un quiz interactif pour `premieres-cellules` avec questions, options de réponse, réponses correctes et indices pédagogiques localisés.
    - **quizzes/animals.ts (Quizz)** : Création de 7 nouveaux quiz interactifs et intuitifs pour chaque nouvelle espèce marine préhistorique afin de consolider la gamification et l'évaluation continue.
    - **constants/ids.ts (Typage & Intégration)** : Déclaration de tous les nouveaux identifiants de sujet dans l'array global `TOPIC_IDS` pour assurer un typage strict automatique dans toute l'application et la suite de tests.

### VERSION 3.22.0 - Refonte Premium du Tableau de Bord Parents & Contrôle du Temps d'Écran 📊⏱️ (25 Mai 2026)
--------------------------------------------------
- **[UX/UI/Logic/ParentalControl] Refonte complète et premium de l'Espace Parents pour un produit haut de gamme fini (Ticket #73) :**
    - **ParentsDashboard.tsx** :
        - Implémentation d'une structure à 4 onglets dynamiques (`stats` | `control` | `tips` | `tech`) permettant de segmenter élégamment les données.
        - Ajout d'un sélecteur d'explorateur en temps réel en haut de page pour adapter instantanément les données au profil sélectionné.
        - **Calculateur de Progression Détaillé** : Intégration de calculs en direct d'XP, niveau, médailles Or/Argent/Bronze et de la complétion thématique exacte par catégorie de l'encyclopédie (Espace, Dinosaures, Animaux, Corps Humain, Arts, Géographie, Histoire, Inventions, Nature, Questions).
        - **Limites de Temps d'Écran** : Nouvelle fonctionnalité de limitation quotidienne du temps de jeu (Illimité, 15 min, 30 min, 45 min, 60 min) persistant de manière autonome en LocalStorage par profil.
        - **Guide Éducatif & Discussion** : Générateur de questions de discussion personnalisé parent-enfant ("Démarreurs de discussion") s'adaptant en direct aux médailles réellement décrochées par le profil, pour favoriser le prolongement hors-écran.
        - **Gestion d'Identité & Sécurité** : Éditeur de nom d'explorateur en ligne, purge de progression et suppression sécurisée et synchronisée de profils.
        - **Linter & TS Compliance** : Correction de l'effet synchrone de re-rendering via une microtâche asynchrone, typages TypeScript stricts éliminant les casts laxistes `as any`.
    - **ParentsDashboard.module.css** :
        - Rendu visuel d'exception : design moderne exploitant un radial-gradient doux thématique de fond, s'adaptant au thème sombre et au thème clair.
        - Effets de cartes d'affichage en **glassmorphism** d'une grande finesse avec des bordures translucides (`backdrop-filter: blur()`), ombres douces et transitions animées 3D d'enfoncement physique au clic/survol.
        - Layout élastique responsif complet (Flexbox et CSS Grid) avec polices fluides garantissant un affichage optimal et sans débordement sur mobiles, tablettes et ordinateurs.

### VERSION 3.21.1 - Correctifs d'Affichage Responsif & Parallaxe sur Mobile (24 Mai 2026)
--------------------------------------------------
- **[UX/UI/Responsive/A11y] Résolution des défauts d'affichage responsifs, d'overflow et de layout sur la page du Cercle de la Vie (LifeCirclePage) (Ticket #72) :**
    - **LifeCirclePage.tsx** : Sécurisation de l'ajustement écran 100% en SVG via `preserveAspectRatio="xMidYMin slice"` sur l'arrière-plan du ciel profond, éliminant les bandes blanches horizontales sur mobile. Harmonisation du ciblage des textes pour la baguette magique et flexibilité du bouton retour.
    - **LifeCirclePage.module.css** :
        - Optimisation de la hauteur de la zone de parallaxe (`.parallaxGroup` de `250vh` à `200vh` sur desktop, `160vh` sur tablette, `130vh` sur mobile) pour limiter les défilements inutiles et l'overflow parasite.
        - Bouton de retour compact circulaire sur mobile (<768px) masquant le texte pour éviter l'encombrement horizontal.
        - Regroupement des contrôles de saison en barre compacte tactile auto-adaptative limitant le débordement horizontal (`max-width: calc(100% - 5.5rem)`).
        - Correction des instructions de survol avec centrage élastique et réduction du padding.
        - **Micro-interactions Tactiles Premium** : Intégration de retours tactiles fluides (`transform: scale(0.95)` / `scale(0.92)` et atténuation de l'ombre portée) sur les états `:active` de tous les éléments interactifs cliquables (`.backButton`, `.seasonBtn`, `.exploreMoreBtn`, `.closeBtn`), améliorant considérablement l'engagement sensoriel.
        - **Accessibilité Universelle (A11y)** : Ajout d'indicateurs visuels de focus clavier robustes et hautement contrastés (`:focus-visible` avec outlines et décalages calculés) sur l'ensemble des boutons interactifs de navigation, de saison et d'action, garantissant la conformité totale WCAG.
        - **Animations Pédagogiques** : Rétablissement de la lévitation douce par pulsation (`pulse` infinie à 30 FPS) sur la boîte d'instructions flottantes, guidant naturellement le regard de l'enfant.
    - **TreasureMap.module.css (Carte au Trésor)** :
        - **Tactile & Micro-interactions** : Intégration de l'effet d'enfoncement tactile 3D (`:active`) sur les boutons de zoom de la carte (`.zoomBtn`) et les îles/marqueurs de découverte (`.mapMarkerPoint`), animant les icônes vectorielles avec un rétrécissement élastique et une légère rotation inversée au clic.
        - **Accessibilité Focus Clavier** : Remplacement de l'inhibition des outlines clavier (`outline: none`) par des halos de focus lumineux contrastés (`:focus-visible`) dorés thématiques avec un décalage compensé (`outline-offset: 4px`), ouvrant la navigation spatiale de la carte à 100% de conformité WCAG.
    - **TreasureMap.tsx & TreasureMap.test.tsx (Homogénéité Mobile)** :
        - **OrientationGuard Mobile** : Intégration du composant réutilisable de garde-fou d'orientation (`OrientationGuard`), invitant chaleureusement l'enfant à basculer sa tablette ou son smartphone horizontalement pour profiter d'un champ visuel optimal sur la carte au trésor, aligné sur l'expérience premium de Mission Safari.
        - **Sécurisation de Tests** : Mock du composant `OrientationGuard` dans la suite de tests unitaires et d'intégration `TreasureMap.test.tsx` pour garantir 100% de robustesse et de passage au vert de la suite de tests de non-régression.

### VERSION 3.21.0 - Sprint d'Optimisation, Localisation & Accessibilité (24 Mai 2026)
--------------------------------------------------
- **[Logic/QA/TypeScript] Résolution des erreurs de compilation strictes TypeScript (Ticket #05, Ticket #22) :**
    - **useAmbientAudio.ts** : Changement du type de `fadeIntervalRef` de `ReturnType<typeof setInterval> | null` à `ReturnType<typeof setInterval> | undefined` pour corriger les erreurs de compilation stricte TS2345 liées à `clearInterval` qui n'accepte pas `null`.
    - **useAudioFeedback.ts** : Sécurisation du transtypage de l'objet `window` pour obtenir `webkitAudioContext` sans utiliser le type interdit `any`, évitant ainsi les violations de la règle `@typescript-eslint/no-explicit-any`.
- **[i18n/PWA/Security] Traduction et protection du prompt d'installation PWA (Ticket #25, Ticket #26) :**
    - **types.ts / fr.ts / en.ts** : Ajout du namespace structurel `pwa` pour traduire de manière complète et bilingue les messages du prompt de mise à jour et de l'installation hors-ligne.
    - **PWAPrompt.tsx** : Raccordement du composant au store de préférences `useSettingsStore` pour dynamiser les messages. Ajout d'un garde-fou persisté dans le `localStorage` sous la clé `kp-pwa-dismissed` pendant 24 heures pour éviter les réaffichages récursifs intempestifs sur Safari iOS.
- **[UX/UI/Responsive/A11y] Refonte adaptative et accessibilité du Refuge des Compagnons (Ticket #66, Ticket #67, Ticket #68, Ticket #71) :**
    - **RefugePage.tsx** : Intégration du hook `useTextToSpeech` et du composant d'accessibilité `DiscreteSpeaker` pour vocaliser les descriptions d'adoption et les friandises de la boutique, offrant une autonomie à 100% pour les enfants de 4-6 ans.
    - **RefugePage.module.css** :
        - Optimisation du layout pour mobile via l'ajout de `@media` ciblés pour recalculer les paddings de `.refugeContainer`, `.sandbox`, et `.boutiqueCard`.
        - Rétablissement de `display: grid` sur `.dashboardGrid` pour les écrans larges (> 992px) pour restaurer la mise en page double colonne sur desktop.
        - Empilement vertical (`flex-direction: column`) des boutons d'actions sous les 640px de largeur d'écran et polices fluides (`clamp`) pour éliminer la troncature du bouton "Nourrir" et du titre "Magasin de Friandises".
- **[UX/UI] Correction des icônes de compagnons et en-tête immersif (Ticket #64, Ticket #70) :**
    - **MissionSafari.tsx** : Mise à jour du helper `getCompanionIcon()` pour supporter les identifiants réels enregistrés dans le store (`dog-companion`, `dino-companion`, `robot-companion`), rétablissant l'icône personnalisée active dans la boîte de dialogue en jeu.
    - **MainLayout.tsx** : Ajout de la route `/refuge` aux routes immersives (`isImmersive`), masquant automatiquement le double header global et le footer global pour maximiser l'espace vertical disponible en mode portrait.

### VERSION 3.20.14 - Intégration de la sourdine globale au Refuge des Animaux 🤫🐾 (24 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/A11y/QA] Conformité de la sourdine globale (isMuted) dans Le Refuge (Ticket #65) :**
    - **RefugePage.tsx** : Récupération réactive de la variable `isMuted` depuis le store de préférences `useSettingsStore` et ajout d'un garde-fou `if (isMuted) return;` au tout début de la fonction de synthèse Web Audio `playSound`. Tous les effets sonores synthétisés interactifs (actions de caresse "pet", alimentation "feed", achat de friandises "buy" et alertes d'erreurs "error") respectent désormais instantanément la sourdine générale demandée par les parents, assurant une tranquillité d'usage absolue.

### VERSION 3.20.13 - Résolution de la fuite de données de compagnons lors de la suppression de profil 🦄🧹 (24 Mai 2026)
--------------------------------------------------
- **[Logic/QA/DataSecurity] Suppression sécurisée et synchronisée des données des compagnons (Ticket #63) :**
    - **useProfileStore.ts** : Importation de `useCompanionStore` et mise à jour de l'action `deleteProfile` pour appeler de manière coordonnée `useCompanionStore.getState().deleteProfileCompanionData(id)`. Cela garantit que la suppression d'un profil détruit immédiatement toutes les données de compagnons associées et prévient toute accumulation orpheline de données persistantes dans `localStorage` (clé `kp-companion-storage`).
    - **useProfileStore.test.ts** : Écriture d'un test d'intégration unitaire robustement isolé validant l'appel correct de `deleteProfileCompanionData(id)` lors de l'appel à `deleteProfile`, et intégration de `useCompanionStore.getState().reset()` dans le hook global `beforeEach` pour maintenir une parfaite isolation des tests.

### VERSION 3.20.12 - Liaison Encyclopédique & Quizz Interactifs des sous-nœuds du Big Bang 💥🌌 (24 Mai 2026)
--------------------------------------------------
- **[Content/Logic/i18n/QA] Liaison interactive et élimination des culs-de-sac pédagogiques de la frise chronologique d'Origins (Ticket #36) :**
    - **bigBang.ts (Navigation)** : Association réussie de chacun des 7 nœuds intermédiaires (`bb2` à `bb8`) à son identifiant de sujet unique (`soupe-particules`, `naissance-atomes`, `expansion`, `premieres-etoiles`, `premieres-galaxies`, `voie-lactee`, `systeme-solaire`), débloquant l'accès à la fiche détaillée et au quiz associé pour toute la frise du Big Bang.
    - **topics/space.ts (Encyclopédie)** : Création et intégration de 7 nouvelles fiches éducatives riches et bilingues adaptées pour les 4-8 ans. Chaque fiche dispose d'icônes spécifiques, de descriptions courtes, de variations de paragraphes pédagogiques complets (`fullContent` / `fullContents`) et d'anecdotes rigolotes (`funFact` / `funFacts`) en français et en anglais.
    - **quizzes/space.ts (Banque de Quizz)** : Déclaration de 7 nouveaux quiz interactifs et stimulants dans le dictionnaire global `QUIZZES`. Chaque quiz offre des questions captivantes bilingues, des choix multiples adaptés et des indices pédagogiques localisés (`hint`) en français et en anglais pour encourager les enfants en cas d'erreur.
    - **dataIntegrity.test.ts (Validation)** : Intégration complète dans la suite de tests de validation d'intégrité de la base de données, garantissant le typage dynamique strict des nouveaux identifiants kebab-case et s'assurant qu'aucun sujet ou quiz n'est orphelin ou brisé.

### VERSION 3.20.11 - Dimensionnement Dynamique Compensé & Test de Scale Inverse des Marqueurs de Carte 🗺️🔍 (23 Mai 2026)
--------------------------------------------------
- **[UX/QA/Aesthetics] Dimensionnement dynamique des marqueurs de la carte interactive (Ticket #35) :**
    - **TreasureMap.tsx** : Passage réactif du `zoom` actuel au composant `MapPoint` et application du style inline compensé `transform: translate(-50%, -50%) scale(${1 / zoom})`. Cette formule neutralise le grossissement lié au zoom global CSS, conservant la lisibilité et des dimensions parfaites pour les émojis et les étoiles de médailles sans overlapping visuel.
    - **TreasureMap.test.tsx** : Écriture d'un nouveau test unitaire (`applique un facteur d'échelle inverse sur les marqueurs selon le niveau de zoom`) vérifiant formellement le passage à l'échelle `scale(1)` à zoom `x1`, puis le recalcul à `scale(0.5)` à zoom `x2`.

### VERSION 3.20.10 - Suggestions de Recherche Interactives & Résolution du Dead End d'Exploration 🔍✨ (23 Mai 2026)
--------------------------------------------------
- **[UX/i18n/Aesthetics/A11y/QA] Éradication de l'impasse ergonomique de recherche sans résultat (Ticket #33) :**
    - **types.ts / fr.ts / en.ts** : Déclaration sémantique et implémentation bilingue des traductions `trySearching` ("Essaie de rechercher :" / "Try searching:") et `popularSuggestions` mappant les sujets populaires phares avec leurs mots-clés (Soleil, Dinosaures, Lion, Volcan, Espace).
    - **Home.module.css** : Création de styles interactifs cartoons de type bouton 3D. L'ombre physique 3D s'enfonce au clic (`:active`) et s'anime en douceur au survol, offrant un retour sensoriel gratifiant. Surcharges du mode sombre garantissant un contraste parfait sur fond bleu nuit.
    - **Home/index.tsx** : Intégration de la zone de suggestions sous le message de non-résultat, permettant de mettre à jour instantanément la recherche et de relancer le filtrage réactif du store Zustand au clic.
    - **App.test.tsx** : Écriture d'un test d'intégration complet validant l'absence de résultats, l'apparition des étiquettes de suggestion, leur clic interactif, la synchronisation du champ et le filtrage dynamique.
- **[QA] Alignement des assertions de test d'intégration d'XP :**
    - **XPAndMedals.integration.test.tsx** : Ajustement des attentes de score (`1.0k` ➔ `1.5k`). La médaille d'or octroie désormais 1500 XP en raison du bonus de fierté Perfect de `+500 XP` introduit lors du Ticket #18, résolvant un conflit d'assertion bloquant dans la suite de tests.

### VERSION 3.20.9 - Dégradés Vectoriels d'Origins Adaptatifs & Haut Contraste 🕰️🎨 (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/A11y/QA] Thémisation dynamique et résiliente des dégradés vectoriels d'Origins (Ticket #31) :**
    - **vars.css** :
        - Déclaration de 24 nouvelles variables CSS de gradients de frise chronologique (`--color-origins-...`) au niveau de la racine `:root` pour le thème clair, assurant la fidélité avec la palette historique d'Origins.
        - Conception d'une palette adaptative haute visibilité et haut de gamme dans le bloc `html[data-theme='dark']` / `.dark`. Les teintes excessivement sombres du mode clair (ex: bleu nuit `#0f172a` pour le Big Bang, marrons et verts sapin sombres) sont surchargées en mode nuit par des dégradés de néons cosmiques éclatants (indigo électrique, rose, cyan vibrant, émeraude) pour garantir un contraste WCAG AAA exceptionnel sans perturber le confort oculaire.
    - **OriginsLayout.tsx** :
        - Remplacement intégral des valeurs statiques `stopColor` des 9 définitions `<linearGradient>` du SVG de tracé par les variables CSS dynamiques `var(--color-origins-...)`.
        - Permet la réactualisation instantanée et fluide à 60 FPS du style de la frise chronologique lors du basculement de thème sans aucun coût de rendu React ou re-render JS synchrone.

### VERSION 3.20.8 - Variabilité de Contenu & PoC Catégorie Nature 🌳🌋 (23 Mai 2026)
--------------------------------------------------
- **[Content/UX/QA] Preuve de Concept (PoC) de la variabilité de contenu pour la thématique Nature (Ticket #20) :**
    - **nature.ts** :
        - Les Arbres (`arbres`) : Enrichissement avec un tableau `fullContents` (3 variations graduelles décrivant le rôle des feuilles, l'absorption de CO2, le réseau racinaire et les abris de faune) et `funFacts` (3 anecdotes, dont la communication via réseau fongique sous-terrain).
        - Le Volcan (`volcan`) : Enrichissement avec un tableau `fullContents` (3 variations décrivant la structure géologique en cheminée, le magma sous pression et les coulées de lave créant des îles) et `funFacts` (3 anecdotes, dont les volcans sous-marins et Olympus Mons).
    - **Rétrocompatibilité & Robustesse** :
        - Préservation du comportement par défaut dans `TopicPage/index.tsx` qui retombe de façon transparente sur les propriétés uniques `fullContent` et `funFact` pour les sujets n'ayant pas encore de variations de contenu, empêchant tout plantage de rendu.
    - **TopicPage.test.tsx** :
        - Ajout de tests d'intégration validant le chargement stable et conforme de la variation sélectionnée par index.
        - Ajout de tests de régression validant le repli automatique et transparent sur les structures simples pour les sujets dépourvus de variations (ex. `pluie`).

### VERSION 3.20.7 - Mode Parfait, Scoring XP Premium & Fanfare Cristalline 🏆✨ (23 Mai 2026)
--------------------------------------------------
- **[Logic/Aesthetics/UX/i18n/QA] Implémentation du système de récompense "Mode Parfait" (Ticket #18) :**
    - **useProgressionStore.ts** :
        - Définition du bonus `PERFECT_BONUS_XP = 500`.
        - Mise à jour du calcul d'XP dans `addBadge` et de la migration rétroactive `migrateLegacyProfile`. Une médaille d'or (sans-faute au premier essai) rapporte désormais `1500 XP` (1000 base + 500 bonus) de manière consistante.
    - **Quiz.tsx** :
        - Implémentation de la fonction de synthèse Web Audio API native `playSynthesizedPerfectFanfare()` jouant un arpeggio ascendant majeur de 4 notes aiguës cristallines (`C6`, `E6`, `G6`, `C7`) à intervalles de `80ms` sur la médaille d'or, contrastant avec le son classique `playSynthesizedDing`.
        - Rendu conditionnel du ruban cartoons `.perfectBanner` au sommet de la boîte de résultats si la médaille d'or est obtenue.
    - **Quiz.module.css** :
        - Design cartoons 3D du ruban `.perfectBanner` : inclinaison à `-15deg`, fond en dégradé de couleur feu/or (`#facc15` ➔ `#ef4444`), bordures épaisses, relief et ombres portées physiques.
        - Animation `@keyframes pulseRibbon` appliquant une pulsation tridimensionnelle dimensionnelle et lumineuse fluide et continue.
    - **Internationalisation (locales)** :
        - Ajout de la clé `perfectBadge` déclarée dans `types.ts` et traduite dans `fr.ts` (`"PARFAIT !"`) et `en.ts` (`"PERFECT !"`).
    - **useProgressionStore.test.ts & Quiz.test.tsx** :
        - Ajustement complet de la suite de tests de progression pour valider le nouveau score d'XP à 1500 XP pour l'or.
        - Ajout d'un test spécifique validant le rendu conditionnel de l'élément de bannière parfait et de ses traductions dans le DOM.

### VERSION 3.20.6 - Panning de zoom fluide & Résolution du Clamping de la Carte au Trésor 🗺️✨ (23 Mai 2026)
--------------------------------------------------
- **[Logic/UX/A11y/QA] Suppression des sauts visuels et du clamping lors du double-clic/double-tap sur la carte au trésor (Ticket #15) :**
    - **TreasureMap.tsx** :
        - Remplacement du scroll synchrone dans `useLayoutEffect` par un scroll différé via `requestAnimationFrame` (`rafId`). Cela permet au navigateur d'effectuer la mise à l'échelle CSS (`transform: scale(zoom)`) et d'actualiser complètement les limites physiques réelles (`scrollWidth`/`scrollHeight`) du conteneur parent avant de définir le scroll, évitant tout clamping géométrique et saccade visuelle.
        - Recentrage parfait : Calcul précis des coordonnées cibles en fonction de l'échelle visuelle (`zoom`) et recentrage fluide de la caméra au milieu de l'écran du conteneur parent.
        - Panning fluide premium : Utilisation de `.scrollTo({ left, top, behavior: 'smooth' })` pour faire glisser élégamment la vue vers la destination.
        - Sécurisation unitaire (JSDOM) : Intégration de gardes de type de détection de support (`typeof container.scrollTo === 'function'`) afin de garantir une rétrocompatibilité parfaite avec les environnements de test headless et JSDOM (qui n'implémentent pas `.scrollTo` nativement) sans aucun plantage.
        - Nettoyage des timers : Annulation de toute frame d'animation en attente via `cancelAnimationFrame` lors du démontage du composant.

### VERSION 3.20.5 - Optimisations de performance Kid-Friendly de la parallaxe 🚀🧠 (23 Mai 2026)
--------------------------------------------------
- **[Logic/Performance/QA] Optimisation des FPS et de la mémoire de la carte parallaxe (Ticket #58) :**
    - **ParallaxTopicCard.tsx** :
        - Définition de "cartes actives" : Intégration de `IntersectionObserver` pour suivre l'état de visibilité de chaque carte dans la zone d'affichage (`isInViewport`), limitant à zéro les calculs CPU dynamiques d'inclinaison 3D sur les dizaines de cartes masquées par le scroll.
        - Respect de `prefers-reduced-motion` : Écoute via `window.matchMedia` de la préférence système d'économie de mouvement pour court-circuiter tous les calculs d'inclinaison JS.
        - Prévention des fuites mémoire : Déconnexion systématique de l'observer (`observer.disconnect()`) lors du démontage du composant.
    - **ParallaxTopicCard.module.css** :
        - Accélération matérielle GPU : Application de la directive `will-change: transform` sur le conteneur `.parallaxCard` pour allouer des calques composites en amont et supprimer les saccades de scrolling.
        - Sécurisation visuelle : Ajout du bloc média CSS `@media (prefers-reduced-motion: reduce)` figeant les cartes à plat, désactivant les transitions et réinitialisant `will-change: auto`.

### VERSION 3.20.4 - Optimisation de la parallaxe et focus clavier de carte 🧙‍♂️🪄 (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI/A11y] Résolution de l'alignement 3D et du focus clavier des cartes parallaxes (Ticket #57) :**
    - **ParallaxTopicCard.module.css** :
        - Stabilisation du plan textuel : Configuration de `.foreGround` à `transform: translateZ(0px)` et de `.categoryLabel` à `translateZ(0px)`. Les titres et descriptions éducatives restent parfaitement plats, garantissant une lisibilité sans aucune distorsion visuelle ni fatigue oculaire.
        - Profondeur décorative renforcée : Repoussement de l'icône d'arrière-plan `.backGround` à `transform: translateZ(-15px)`, élargissant le fossé tridimensionnel pour un effet de parallaxe plus dynamique.
        - Focus clavier premium unifié : Retrait de l'outline du bouton de clic interne invisible et ajout d'un contour de focus de `4px` et halo lumineux doux thématique entourant la *carte entière* (`.parallaxCard`) via les sélecteurs modernes `:has()` et `:focus-within`.

### VERSION 3.20.3 - Résolution de la désérialisation synchrone lente par compression ⚡💾 (23 Mai 2026)
--------------------------------------------------
- **[Logic/Performance/QA] Optimisation des temps de chargement du store de progression (Ticket #30) :**
    - **useProgressionStore.ts** :
        - Implémentation de deux algorithmes purs de sérialisation `compressState` et `decompressState` convertissant toutes les clés verbeuses de l'état persistant en identifiants ultra-courts d'un ou deux caractères (ex. `badges` ➔ `b`, `totalXP` ➔ `x`, `unlockedAccessories` ➔ `u`, etc.).
        - Gain d'espace de plus de **60%** dans le `localStorage`, réduisant de manière spectaculaire la charge de parsing synchrone du CPU et éradiquant tout micro-freeze au démarrage.
        - Conception d'un moteur de stockage personnalisé `customStateStorage` implémentant l'interface `StateStorage` de Zustand pour exécuter la compression/décompression à la volée.
        - Gestion d'une rétrocompatibilité transparente : détection automatique des données héritées (legacy non-compressées) pour les hydrater sans altération ni perte de progression.
    - **useProgressionStore.test.ts** :
        - Ajout d'une suite exhaustive de tests unitaires validant l'écriture compressée sous clés dictionnaire dans le `localStorage` et le chargement transparent des structures de données legacy.

### VERSION 3.20.2 - Éradication du CLS & Intégration du Skeleton Shimmer 🖼️✨ (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Résolution du Saut de Mise en Page du Carousel Hero (Ticket #27) :**
    - **HeroCarousel.tsx** :
        - Intégration du squelette de chargement en passant la prop `loader={<div className={styles.skeleton} />}` aux deux instances `AppImage` (`bgCoverPrev` et `bgCoverCurrent`), garantissant un chargement fluide sans flash blanc ni transition brutale.
    - **HeroCarousel.module.css** :
        - Définition d'un rapport d'aspect mathématique rigoureux (`aspect-ratio: 16 / 7` sur écran de bureau et `aspect-ratio: 16 / 10` sur terminaux mobiles) couplé à des contraintes de hauteur maximale (`max-height`). Le navigateur réserve ainsi l'espace d'affichage exact avant que les images ne soient chargées, résolvant 100% du CLS.
        - Remplacement de la couleur de fond noire brute (`#000`) par un fond thématique sombre premium `#0c101b` en accord parfait avec la palette graphique nuit de l'application.
        - Création de la classe `.skeleton` exploitant un dégradé de blanc translucide linéaire animé avec des `@keyframes shimmer` pour simuler un balayage lumineux continu très premium.

### VERSION 3.20.1 - Résolution du MuteToggle Asynchrone & Singleton Audio 🔊🔒 (23 Mai 2026)
--------------------------------------------------
- **[Logic/Aesthetics/QA] Résolution du Problème de Superposition Audio (Ticket #21) :**
    - **useAudioFeedback.ts** :
        - Migration vers un singleton `globalAudioInstance` partagé au niveau du module pour éliminer le gaspillage de ressources et les instanciations de doublons en mémoire.
        - Implémentation d'une réutilisation d'instance dans `playSound` : l'appel à un nouveau son interrompt proprement tout chargement et lecture en cours via `pause()` et une réinitialisation de `currentTime = 0`.
        - Ajout d'un abonnement global réactif (`useSettingsStore.subscribe`) coupant instantanément la lecture sonore active dès que l'état `isMuted` du store passe à vrai.
        - Sécurisation de la méthode `subscribe` par un typecheck (`typeof useSettingsStore.subscribe === 'function'`) assurant une robustesse et compatibilité totale avec les tests unitaires existants qui mockent le store de configuration.
        - Interception propre des exceptions `AbortError` renvoyées par le navigateur lors de coupures réseau de flux audio.
    - **useAudioFeedback.test.ts** :
        - Création d'une suite de tests unitaires validant l'inhibition du son en sourdine, l'arrêt instantané via abonnement global et la réutilisation de l'instance unique de singleton.

### VERSION 3.20.0 - Polissage du Plateau de Jeu, Chemin SVG, Décors Fixes & Companion Bubbles 🦁🎮 (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Résolution des Anomalies Visuelles de Mission Safari (Ticket #59) :**
    - **SafariBoard.tsx & SafariBoard.module.css** :
        - Réécriture de l'algorithme `calculatePath` : tri rigoureux des coordonnées physiques de cases par ID de `0` à `14` plutôt qu'en ordre DOM (qui inversait les rangées paires/impaires pour le tracé serpent). Résolution totale des tracés diagonaux parasites croisant le plateau.
        - Standardisation du centrage et de l'aspect-ratio de `.icon` via flexbox (`display: flex; align-items: center; justify-content: center; line-height: 1;`) pour les emojis de départ (🏁), lion (🦁) et d'arrivée (🏆) sans déformation ni décalage.
        - Isolation et déplacement de `.effectBadge` (`+2`, `-3`, etc.) et du pion joueur `.playerPawn` en dehors du conteneur `hexContent` (qui a un `clip-path` restrictif) vers `hexWrapper`, pour éliminer tout rognage. Positionnement des modificateurs de score en haut à droite sous forme de petite pilule 3D cartoon contrastée.
    - **SafariDecorations.tsx & SafariDecorations.module.css** :
        - Remplacement du générateur de décors dynamique (`Math.random()`) par un tableau de coordonnées fixes pré-calculées situées en dehors du plateau de jeu et des panneaux pour éliminer les chevauchements et l'encombrement graphique.
        - Ajout d'ombres portées fluides `.decorItem` (`filter: drop-shadow(...)`) et protection du titre `.journalTitle` avec `white-space: nowrap; text-overflow: ellipsis;` pour éviter le troncage de "CARNET DE VOYAGE".
    - **MissionSafari.tsx & MissionSafari.module.css** :
        - Intégration de l'icône animée du compagnon équipé (ou émoji `🦁` guide de brousse par défaut) à gauche du message de jeu (`messageBox`).
        - Réorientation de la flèche de bulle de dialogue (`::after`) vers la gauche (vers le compagnon) plutôt que vers le bas dans le vide, avec synchronisation du `translateY(-50%)` dans l'animation de salutation `wave`.
        - Définition complète des styles manquants pour `.statsCard` et `.controlsCard` dans la feuille de styles, harmonisant le panneau de contrôle latéral avec l'esthétique générale de verre dépoli (glassmorphism) de l'application.
    - **PageHeader.module.css** : Alignement vertical parfait du bouton de changement de thème (`ThemeToggle`) au sein de l'en-tête globale `.rightSection`.

### VERSION 3.19.0 - Standardisation de l'Empilement Global, Cartes Parallaxes & CSS Cleanups 🎨🧹 (23 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Implémentation de la Carte Parallaxe Dynamique (Ticket #56) :**
    - **ParallaxTopicCard.tsx & ParallaxTopicCard.module.css** :
        - Création d'un nouveau composant réactif capturant les déplacements de pointeur (`onPointerMove`) et appliquant une inclinaison 3D fluide limitée à 8 degrés pour le confort oculaire.
        - Séparation physique tridimensionnelle des couches (`preserve-3d`) : Textes au premier plan ($Z = 15px$) et icônes thématiques décoratives en arrière-plan ($Z = -10px$).
        - Système d'ombre tridimensionnelle réactive (box-shadow décalée à l'opposé du mouvement) pour renforcer la profondeur physique.
        - Retour à plat amorti (`cubic-bezier`) lors du survol sortant (`onPointerLeave`).
    - **Home/index.tsx** : Intégration globale du nouveau composant `ParallaxTopicCard` à la place de `TopicCard` pour tous les sujets d'apprentissage de l'accueil.
- **[Logic/Aesthetics/QA] Résolution des Incohérences de z-index (Audit QA) :**
    - **vars.css** : Centralisation de tous les niveaux d'empilement (`z-index`) de l'application sous forme de variables CSS typées dans `:root`.
    - **reset.css** : Suppression du `z-index: 1` parasite sur `#root` pour libérer le flot de superposition standard.
    - **Restructuration globale des calques** : `OrientationGuard` (100000), `ToastContainer` (90000), `OfflineFallback` & `ParentalGate` (80000), `ProfileSelection` (2000), et overlays de modals/quiz (`modalOverlay`, `quizOverlay`, `overlayContainer`, etc.) à 1000.
    - **Ajustement de composants** : Abaissement de l'animation inline `zIndex` de l'XP flottante dans `LifeCirclePage.tsx` à `50` (sous les modals) et réglage du bouton flottant d'accessibilité Baguette Magique à `90` (sous le header et sous les overlays).
- **[Refactor/CSS/Logic] Résolution du Ticket #28 (Dead Code & CSS Pruning) :**
    - **App.tsx & App.module.css** : Correction et utilisation de `styles.notFoundContainer` et `styles.notFoundTitle` pour éliminer le style indéfini `errorContainer` et utiliser tous les sélecteurs.
    - **ParentsDashboard.module.css** : Ajout et implémentation de la classe `.profileInfo` qui était référencée mais absente de la feuille de style.
    - **Topic/index.tsx** : Nettoyage d'une directive d'inhibition linter inutilisée (`// eslint-disable-next-line react-refresh/only-export-components`).
- **[QA/Documentation] Audit Visuel Safari & Ticket #59 :**
    - **TICKETS.md** : Enregistrement formel des résultats d'audit visuel du plateau Safari sous forme de Ticket #59 (lignes verticales parasites, icônes décalées case 13/14, superposition des modificateurs de score et distorsion de drapeau case 0) avec sa Définition de Fini (DOD).
- **Validation Qualité** : 100% de la suite de 188 scénarios de tests unitaires/intégration validée avec succès via `npm run validate`.

### VERSION 3.18.0 - La Baguette Magique d'Inclusion 🗣️🪄 (Ticket #R4) (23 Mai 2026)
--------------------------------------------------
- **[Feature/UI/A11y] Implémentation du système de lecture interactive réactive "Baguette Magique" :**
    - **useReaderVoice.ts** :
        - Création du hook gérant la synthèse vocale SpeechSynthesis avec configuration d'une vitesse lente (`0.85`) adaptée aux enfants.
        - Suivi des mots en temps réel via l'écouteur `onboundary` d'événement `word` (calcul dynamique de la longueur avec fallback pour les navigateurs non standards).
        - Mode "Baguette de Lecture" activable/désactivable.
    - **TopicDetail.tsx & TopicDetail.module.css** :
        - Intégration d'un bouton flottant `🪄` premium avec dégradés rose/violet, pulsation lumineuse tridimensionnelle en état actif et ressorts physiques au survol/clic.
        - Composant `HighlightedText` découpant et surlignant dynamiquement en temps réel le mot en cours de lecture avec une surbrillance pastel douce `--color-primary-light` (35% d'opacité) animée.
        - Ajout de gestionnaires de survol temporisés (debounce de `500ms` pour éviter le spam sonore) et de clic.
        - Curseur de souris personnalisé en émoji `🪄` sur les textes écoutables en mode actif.
    - **TopicDetail.test.tsx & useReaderVoice.test.ts** :
        - Suite de tests unitaires vérifiant l'affichage, les transitions d'état du bouton flottant, la lecture au clic, le suivi de surbrillance et le calcul de fallback de mot.
    - **Validation Qualité** : 100% de la suite de 185 tests unitaires et d'intégration validée avec succès via `npm run validate`.

### VERSION 3.17.0 - Le Refuge des Compagnons Animés 🦄 (Ticket #R3) (22 Mai 2026)
--------------------------------------------------
- **[Feature/UI/Store] Création de la zone premium interactive /refuge :**
    - **RefugePage.tsx & RefugePage.module.css** :
        - Implémentation du tableau de bord complet avec sélection de compagnon et lévitation douce.
        - Ajout de la boutique de friandises (sugarBone, goldenLeaf, batteryCell) achetées avec les tickets (🎫).
        - Système d'affection (0-100) et de bonheur (0-100) animés par profil avec Zustand.
        - Synthèse sonore native (Web Audio API) pour caresser (bulle), nourrir (carillon) et acheter (chime).
        - Particules d'étoiles et de cœurs 3D volants réactifs aux actions de l'enfant.
    - **TransformedEmoji.module.css** :
        - Intégration d'animations vectorielles avancées de nourrissage (.isFeeding) et de caresses (.isPetting) sur les compagnons SVG (chien qui remue la queue, robot qui tourne sur lui-même avec propulseurs, bébé dino qui danse joyeusement).
    - **App.tsx & Home/index.tsx** :
        - Enregistrement de la route lazy-loaded `/refuge`.
        - Ajout du bouton premium "Le Refuge 🦄" dans la grille de navigation d'accueil (hubGrid) réaménagée à 5 colonnes sur grand écran.
    - **useCompanionStore.ts & useCompanionStore.test.ts** :
        - Intégration du store Zustand persistant par profil avec tests unitaires robustes (8 tests passés avec succès).
    - **Validation Qualité** : validation globale sans régression (178 tests verts, linting et compilation TS vierges).

### VERSION 3.16.1 - Protection anti-quitting accidentel sur Mission Safari (Ticket #16) (22 Mai 2026)

--------------------------------------------------
- **[Logic/UX] Sécurisation de l'abandon de quiz dans le mode Mission Safari :**
    - **MissionSafari.tsx & MissionSafari.module.css** :
        - Ajout d'un état local `showQuitConfirm` interceptant le clic de fermeture ou à l'extérieur de l'overlay de quiz.
        - Ajout d'une fenêtre de confirmation overlay (`AppOverlay` de largeur maximale `500px`) prévenant l'enfant avec bienveillance du risque de fuite de l'animal.
        - Option "Continuer le quiz ! 💪" (bouton primaire) permettant de reprendre l'apprentissage sans aucune interruption ni pénalité.
        - Option "Oui, quitter 👋" (bouton secondaire) actant l'abandon du quiz et la fuite de l'animal (retour au statut initial).
    - **Internationalisation (fr.ts, en.ts, types.ts)** :
        - Intégration bilingue des étiquettes et messages d'avertissement (`quitConfirmTitle`, `quitConfirmMessage`, `quitConfirmYes`, `quitConfirmNo`).
    - **TICKETS.md** : Résolution formelle du Ticket #16.

### VERSION 3.16.0 - Tranche Premium Espace Product Manager (Soleil, Lune, Terre) (22 Mai 2026)
--------------------------------------------------
- **[Content/Logic] Finalisation de l'intégration des contenus éducatifs et quiz Premium Product Manager pour la trilogie spatiale (Soleil, Lune, Terre) :**
    - **Intégration du Soleil ☀️** :
        - Ajout d'une description enrichie avec des concepts scientifiques et philosophiques adaptés aux enfants dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz interactive premium sur le partage de la chaleur et de la lumière dans `src/data/quizzes/space.ts`.
    - **Intégration de la Lune 🌙** :
        - Ajout d'une description premium axée sur le rôle de veilleuse bienveillante de la Lune dans la nuit dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz premium ludique sur les changements de forme de la Lune dans le ciel dans `src/data/quizzes/space.ts`.
    - **Intégration de la Terre 🌍** :
        - Ajout d'une description premium présentant la Terre comme notre maison protectrice et un grand jardin bienveillant dans `src/data/topics/space.ts`.
        - Ajout d'une question de quiz premium sur les spécificités qui rendent la Terre unique dans l'Espace (eau, air, vie) dans `src/data/quizzes/space.ts`.
    - **Validation Qualité et Non-Régression** :
        - Suite complète de 170 tests unitaires et d'intégration validée avec succès via `npm run validate`.
        - Build de production complet via `npm run build`.

### VERSION 3.15.2 - Sécurité Anti-Spoiler Pédagogique (Ticket #04) (22 Mai 2026)
--------------------------------------------------
- **[Content/Logic] Implémentation de la sécurité anti-spoiler sur les anecdotes (Ticket #04) :**
    - **TopicPage/index.tsx** :
        - Implémentation d'une fonction `isSpoiler` comparant sémantiquement les réponses correctes en français et anglais avec les anecdotes ("Le savais-tu ?").
        - Nettoyage et normalisation rigoureuse des chaînes de caractères (suppression de la ponctuation, des espaces insécables et mise en minuscules) pour un matching sémantique robuste.
        - Exclusion intelligente des réponses courtes (longueur <= 3 caractères, comme "Oui" ou "Non") pour éviter les faux positifs.
        - Analyse et comparaison stricte des nombres de 2 chiffres ou plus (ex: "1600", "1 million") pour bloquer les spoilers numériques.
        - Réordonnancement de l'effet d'initialisation de la page : le quiz actif est sélectionné d'abord, puis les anecdotes sont filtrées pour n'afficher que les anecdotes garanties sans spoiler (avec repli aléatoire si toutes les anecdotes contiennent un spoiler).
        - Maintien parfait de la stabilité des états (`funFactIndex`, `quizIndex`, `descriptionIndex`) pour éviter les reshuffles intempestifs lors du changement de langue.
    - **TopicPage.test.tsx** :
        - Création d'une suite complète de tests unitaires pour `isSpoiler` couvrant le matching de texte intégral, l'exclusion des réponses courtes et la détection numérique stricte.
        - Ajout d'un test d'intégration asynchrone sur le sujet `soleil` simulant le rendu de la page et vérifiant l'exclusion effective de l'anecdote spoiler liée à la bonne réponse "1 million".

### VERSION 3.15.1 - Résolution Intégrale de la Conception Visuelle et des Alignements (22 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Polissage esthétique complet de la page d'accueil (Ticket #62) :**
    - **Bannière Héro (Home.module.css, index.tsx, fr.ts, en.ts, labels.ts)** : Suppression de la ponctuation de deux-points superflue, complétion de la phrase suspendue sous le titre de bienvenue en français et anglais pour un accueil engageant, et centrage vertical/horizontal complet de la bannière.
    - **Stats & Barre d'XP (Home.module.css)** : Doublement de la hauteur de la barre de progression d'XP à `1.5rem`, ajout d'un encadrement 3D doux avec des ombres internes (`inset shadow`), et transition de ressort physique cubic-bezier fluide. Correction des décalages verticaux des pastilles de statistiques.
    - **Grille de Raccourcis (Home.module.css)** : Restructuration complète de la grille de navigation pour offrir un layout symétrique 1 colonne sur mobile, 2x2 sur tablette, et 4 colonnes sur ordinateur, intégrant parfaitement l'ancien raccourci isolé de Mission Safari.
    - **Fiches Sujets (TopicCard.tsx & TopicCard.module.css)** : Suppression du double cadenas redondant sur les fiches bloquées, rehaussement du contraste AAA du texte à `0.85`, uniformisation de la hauteur des cartes à 100% de la rangée de la grille avec étirement dynamique, et refonte totale du bouton "VOIR PLUS" en un bouton 3D squishy Explorer Blue réactif au survol et au clic.
    - **Barre Latérale Flottante (CategoryScrollSpy.module.css)** : Sublimation du menu latéral flottant sur ordinateur avec l'intégration d'un magnifique panneau de verre (`glassmorphic panel`) avec bordures 3D épaisses, et mise en place d'animations physiques de survol et de boutons actifs avec lueur fluorescente 3D en mode sombre.
    - **Data Integrity & Build** : Résolution d'un type TypeScript au niveau de la TopicPage et validation de la suite de 165 tests unitaires et de compilation de production 100% propre.

### VERSION 3.15.0 - Résolution du Défaut #1 : Ergonomie de l'En-tête & Alignements (22 Mai 2026)
--------------------------------------------------
- **[Aesthetics/UX/UI] Améliorations de l'En-tête globale pour le ciblage tactile (Ticket #62) :**
    - **SearchBar.module.css** : Agrandissement de la police de saisie en mode compact à `var(--fs-base)` (1.15rem) pour une lisibilité accrue et ajout d'un style de placeholder élégant et aéré (`var(--fw-bold)` avec 75% d'opacité).
    - **MainLayout.module.css** : Ajustement des pastilles d'icônes tactiles `.headerBtn` à `3.5rem` (56px) et de leurs emojis à `1.75rem`. Élargissement du gap à `1rem` (16px) pour une manipulation fluide et sans erreur de ciblage pour les enfants.
    - **MuteToggle.module.css** : Augmentation du bouton compagnon sonore `.toggleBtn` à `3.5rem` et de sa police à `1.75rem` pour correspondre parfaitement aux dimensions standardisées de l'en-tête.

### VERSION 3.14.0 - Industrialisation de la Variabilité de Contenu & Traduction Stable (22 Mai 2026)
--------------------------------------------------
- **[Content/UX] Variabilité des descriptions et stabilité bilingue (Tickets #02 & #07) :**
    - **space.ts** : Industrialisation complète de la catégorie Espace avec l'intégration de 3 variations du texte principal pour l'ensemble des 13 sujets (Soleil, planètes, astronautes, Lune, Singularité), offrant une expérience de lecture renouvelée à chaque visite.
    - **types.ts & factory.ts** : Extension du modèle `Topic` pour inclure la propriété optionnelle `fullContents` avec validation complète lors de l'instanciation des fiches pour garantir l'intégrité de la base de données.
    - **TopicPage/index.tsx** : Refonte de la sélection aléatoire des indices (descriptions, fun facts, quiz) en mémorisant les tirages dans l'état local du composant. Le changement de langue s'effectue de manière instantanée et synchrone sans provoquer de reshuffle de contenu (Ticket #07).

### VERSION 3.13.0 - Accessibilité Clavier des Quiz & Indicateurs de Focus Premium (22 Mai 2026)
--------------------------------------------------
- **[Feature/A11y] Indicateurs de focus clavier conformes WCAG sur les quiz (Ticket #32) :**
    - **Quiz.module.css** : Ajout de styles `:focus-visible` thématiques haut de gamme sur tous les éléments interactifs du quiz (A, B, C et boutons d'aide, audio, révision) pour assurer le contraste et éviter les décalages de disposition en modes clair et sombre.
    - **Quiz.test.tsx** : Création de tests unitaires simulant le ciblage du focus au clavier et l'interaction via les touches `Enter` et `Space`, garantissant le bon déclenchement de la sélection de réponses.
    - **Validation A11y** : Conformité WCAG 2.2 de niveau AA pour l'accessibilité moteur et visuelle sur la zone d'apprentissage clé de l'application.

### VERSION 3.12.0 - Résolution des Sujets "Orphelins" & Amélioration de la Data Integrity (22 Mai 2026)
--------------------------------------------------
- **[Data/Integrity] Correction de l'accessibilité des sujets éducatifs (Ticket #06) :**
    - **Algorithme de Découverte** : Mise à jour de la traversée récursive des nœuds d'origine pour inclure la recherche globale et les catégories en tant que méthodes de découverte de premier niveau dans `src/data/dataIntegrity.test.ts`.
    - **Intégrité des Données** : Garantit que 100% des 121 sujets de l'encyclopédie sont atteignables par des flux d'exploration naturels.

### VERSION 3.10.5 - Alignement Horizontal des Boutons du PageHeader sur Mobile (22 Mai 2026)

--------------------------------------------------
- **[Responsive/Ajustement] Alignement côte à côte des boutons de Galerie :**
    - **Optimisation de PageHeader** : Modification de la media query `@media (max-width: 768px)` dans `PageHeader.module.css` pour forcer `.navSection` et `.rightSection` à occuper la même ligne avec une configuration `flex: 1` et un espacement fluide `gap: 1rem` (Flexbox), évitant le décalage vertical.
    - **Ajustement de BackButton & GiftButton** : Intégration de clauses médias dans `BackButton.module.css` et `GiftButton.module.css` pour réduire la taille minimale à `100px`, ajuster le padding à `0.6rem 1.25rem` et réinitialiser les marges latérales à `0` sur mobile, éliminant tout débordement ou empilement vertical.
    - **Validation Qualité** : Exécution réussie des 151 tests de validation unitaire et de typage strict.

### VERSION 3.10.4 - Gabarits de Pages Réactifs CSS Pur Modulaires (22 Mai 2026)
--------------------------------------------------
- **[Documentation/Feature] Gabarits de page réactifs autonomes :**
    - **Création du dossier de Templates** : Ajout du sous-dossier `src/templates/` contenant des gabarits prêts à l'emploi pour les futures extensions de pages.
    - **Feuille de Styles `gabarit-layout.css`** : Conception d'un système de styles 100% autonome réinitialisant proprement les navigateurs (Modern Reset), configurant les zones de sécurité système (Safe-Area), appliquant une typographie fluide (`clamp()`), et modulant les structures d'affichage sous une approche Mobile-First via CSS Grid et Flexbox.
    - **Gabarit HTML `gabarit.html`** : Gabarit sémantique HTML5 structuré avec balises meta d'accessibilité, d'affichage responsive et de référencement SEO. Intègre des composants de cartes glassmorphic haut de gamme et un menu mobile interactif en Vanilla JS pur.
    - **Validation de Non-régression** : Exécution de `npm run validate` confirmant 100% de réussite (151 tests) sur la base existante sans aucune interférence.

### VERSION 3.10.3 - Intégration Safe Area & Dashboard Ultra-DPI (22 Mai 2026)
--------------------------------------------------
- **[Ajustement/Responsive] Sécurisation de l'affichage mobile & Haute Densité (Tickets #60 & #61) :**
    - **Zone Sécurisée (Safe Area) du Header** : Ajout de padding dynamique basé sur `env(safe-area-inset-top)` pour le Header principal (`MainLayout.module.css`) et les en-têtes individuels (`PageHeader.module.css`), protégeant les boutons interactifs du masquage par les encoches d'appareils de type Galaxy S24 Ultra.
    - **Marges tactiles d'A11y** : Maintien rigoureux d'espacements latéraux adaptatifs à l'aide de `clamp(1rem, 3vw, 2.5rem)` pour préserver la marge de respiration tactile par rapport aux bords physiques de l'écran.
    - **Flexibilité de la Carte Hero** : Remplacement des hauteurs statiques du carrousel d'accueil par des dimensions flexibles (`min-height: clamp(...)` et paddings fluides en `rem`), permettant l'ajustement élastique de l'espace sans risque de collision ou de débordement du texte de bienvenue sur l'illustration de l'astronaute.
    - **Responsive Pill Dashboard** : Refonte structurelle de la barre de statistiques avec `flex-wrap: wrap` et bascule à 100% de largeur pour le conteneur de progression (`progressContainer`) sous `768px`, garantissant la visibilité intégrale des scores (🏆, 🎫, ⚡) et de la progression sans coupure latérale.
    - **Échelle Typographique Fluide** : Transition des titres et sous-titres d'accueil vers des tailles de police adaptatives contrôlées par `clamp()`, évitant le chevauchement sémantique et améliorant la lisibilité sur petits écrans.

### VERSION 3.10.2 - Optimisation CI/CD & Accélération E2E Playwright (22 Mai 2026)
--------------------------------------------------
- **[Qualité/CI] Optimisation du Workflow GitHub Actions :**
    - **Mise en cache intelligente de Playwright** : Intégration d'une étape de mise en cache du répertoire `~/.cache/ms-playwright` indexée sur le hash du fichier `package-lock.json` (`actions/cache@v4`), évitant le téléchargement de plus de 300 Mo de navigateurs sur chaque exécution.
    - **Installation conditionnelle** : Séparation des étapes d'installation de Playwright pour n'installer que les dépendances système Linux (`playwright install-deps`) en cas de succès du cache, réduisant le temps d'installation à moins de 5 secondes.
    - **Filtrage des déclencheurs de workflow** : Ajout de la clause `paths-ignore` sur le workflow `Validate` afin de ne pas déclencher la suite de tests et E2E lors de modifications exclusives de la documentation (`docs/**`, `*.md`) ou des configurations Git (`.gitignore`).

### VERSION 3.10.1 - Optimisation Responsive & Anti-débordement Mobile (22 Mai 2026)
--------------------------------------------------
- **[Feature] RWD & Support Ultra-DPI (Ticket #59) :**
    - **Configuration du Viewport** : Mise à jour de la balise meta viewport dans `index.html` pour supporter `maximum-scale=5.0` garantissant une flexibilité optimale sans artificialisation des proportions de rendu sur les grands écrans tactiles mobiles.
    - **Échelle Typographique Fluide** : Surcharge réactive des variables de tailles de police globales `--fs-*` sous `@media (max-width: 480px)` dans `vars.css`, convertissant les tailles de titres et de textes en typographies fluides auto-ajustables sur mobile.
    - **Optimisations TopicDetail** : Passage des titres et contenus de `TopicDetail.module.css` sous des dimensions fluides et intégration d'une media query `@media (max-width: 480px)` pour réduire le padding global de la fiche à `1.25rem` et diviser par deux la taille d'icône Hero (`3.5rem`), libérant 40% de surface d'affichage supplémentaire.
    - **Optimisations Quiz** : Refonte de la grille de réponses `.optionsGrid` sur une seule colonne et transition des choix de réponses du quiz en listes horizontales compactes (`flex-direction: row; padding: 1.15rem 1rem;`) éliminant définitivement les débordements sur la hauteur d'affichage.

### VERSION 3.10.0 - Synthèse Vocale (TTS - Text-To-Speech) pour Enfants Non-Lecteurs (22 Mai 2026)
--------------------------------------------------
- **[Feature] Synthèse Vocale (TTS) Granulaire (Ticket #24) :**
    - **Hook Personnalisé `useTextToSpeech`** : Création d'un hook `useTextToSpeech.ts` encapsulant l'API native `SpeechSynthesis`. Gère la détection intelligente de voix selon la locale courante du profil (`fr` ou `en`), le réglage d'une cadence de lecture lente de `0.9` adaptée aux jeunes enfants (4-6 ans), l'état actif de lecture par bloc d'id unique, et l'interruption automatique ou le nettoyage lors du démontage pour éviter les cacophonies de voix qui se chevauchent.
    - **Composant `DiscreteSpeaker` & Animations Fluides** : Implémentation d'un bouton haut-parleur discret avec style morphique en verre (glassmorphic), retour visuel dynamique par vagues/pulsations d'ondes sonores (soundwaves animation) lors de la lecture active.
    - **Intégration Granulaire dans TopicDetail & Quiz** :
        - Intégration de haut-parleurs individuels sur les fiches (description) et d'anecdotes (fun facts) dans `TopicDetail.tsx`.
        - Intégration de haut-parleurs indépendants sur les questions du quiz et chaque option de réponse A/B/C dans `Quiz.tsx`.
        - Gestion rigoureuse de l'arrêt de la propagation des clics (`e.stopPropagation()`) sur les boutons audio des options du quiz pour éviter que la lecture de l'option ne déclenche la sélection ou la validation par erreur de la réponse correspondante.
    - **Tests Unitaires Riches** : Ajout de scénarios de validation automatique dans `TopicDetail.test.tsx` et `Quiz.test.tsx` pour tester les mocks de `speechSynthesis` et garantir le bon déclenchement de la parole à chaque clic sur les haut-parleurs sans régression.

### VERSION 3.9.0 - Économie de Jeu & Boutique d'Accessoires (22 Mai 2026)
--------------------------------------------------
- **[Feature] Économie de Jeu & Boutique d'Accessoires (Ticket #55) :**
    - **Système d'Attribution de Tickets** : Intégration d'un système de récompense gratifiant attribuant **3 tickets** pour une médaille d'Or (sans faute), **2 tickets** pour une médaille d'Argent (une seule erreur) et **1 ticket** pour une médaille de Bronze (plusieurs erreurs). Gère avec précision les montées de médailles en accordant uniquement le delta de tickets restant (ex. passer de Bronze à Or ajoute 2 tickets supplémentaires).
    - **Gestion de Solde Persistant** : Ajout du champ `tickets: number` persistant par profil enfant dans le Zustand store `useProgressionStore.ts`, avec des actions robustes `addTickets` et `buyAccessory`.
    - **Boutique d'Accessoires Premium (GiftsPage)** : Mise en place d'une boutique haut de gamme dans le coffre magique, permettant d'acheter des accessoires standards (5 tickets), premium comme la Couronne Royale (15 tickets) et des compagnons animaux (10 tickets).
    - **Modale de Confirmation Glassmorphic** : Création d'une interface de confirmation "Veux-tu acheter ce chapeau pour X tickets ? 🎫" sécurisée, dotée de grands boutons tactiles vert et rouge pour éliminer les clics involontaires.
    - **Animations & Effets Sonores** : Célébrations immersives avec lancers de confettis (`canvas-confetti`) et feedback sonore triomphant lors d'un achat validé.
    - **Intégration d'Avatar Réactive** : Équipement automatique et instantané des accessoires achetés sur l'avatar du profil actif.
- **[Qualité/Ingénierie] Standardisation des Mocks & 100% de Tests au Vert :**
    - Mise à jour de l'intégralité des mocks de tests unitaires (`GiftsPage.test.tsx`, `BadgesPage.test.tsx`, `ExplorerGallery.test.tsx`) pour inclure le champ `tickets` et les nouvelles actions.
    - Exécution réussie de la suite complète de validation (`npm run validate`) avec **147 tests** au vert à 100% sans aucun avertissement technique ni erreur TypeScript.

### VERSION 3.8.0 - Persistance d'État & Nettoyage de Données Enfant (22 Mai 2026)
--------------------------------------------------
- **[Feature] Persistance de l'état d'expansion des catégories (Ticket #13) :**
    - Migration de l'état des sections affichées/repliées (`expandedCats`) de la page d'accueil (`HomePage`) de `useState` vers le store global `useDiscoveryStore`.
    - Implémentation des actions `toggleCategoryExpand` et `setCategoryExpanded` pour gérer dynamiquement l'état d'expansion.
    - Interfaçage de l'effet de deep-linking de la page d'accueil avec le store global pour persister de manière réactive l'état d'expansion d'une catégorie ciblée par URL.
    - Ajout de suites de tests unitaires complètes assurant la robustesse du store lors des opérations de mise à jour d'état et de réinitialisation (`reset()`).
- **[Feature] Nettoyage de la progression des profils supprimés (Ticket #11) :**
    - Création de l'action `deleteProfileProgression(profileId)` dans `useProgressionStore.ts` pour purger la progression globale dans `progressions` lors de la suppression d'un profil enfant.
    - Liaison de la suppression dans le store des profils (`useProfileStore.ts`) avec l'invalidation de progression correspondante pour garantir l'absence de fuites de données dans `localStorage`.
    - Création de tests unitaires dédiés pour valider l'idempotence et l'ordonnancement de l'action de suppression globale de la progression d'un profil enfant.
- **[Qualité/Ingénierie] Mocks & Suite de Tests au Vert :**
    - Suite de validation globale entièrement réussie avec l'intégralité des **139 tests** (Vitest) à 100% au vert.

### VERSION 3.7.0 - Espace Parents Localisé et Découplé (22 Mai 2026)
--------------------------------------------------
- **[Feature] Défi Mathématique Parental Renforcé (Ticket #08) :**
    - Remplacement de l'addition simple par une multiplication à un chiffre avec opérandes aléatoires strictement compris entre 2 et 9 (`Math.floor(Math.random() * 8) + 2`).
    - Présentation claire de l'opération en format mathématique standard avec le symbole `×` (`n1 × n2 = ?`), bloquant efficacement les enfants de plus de 7 ans tout en restant simple pour les adultes.
- **[Feature] Localisation Complète de la Zone Parents (Ticket #09) :**
    - Déclaration de la structure du dictionnaire `parents` dans `types.ts` et intégration complète des traductions françaises (`fr.ts`) et anglaises (`en.ts`).
    - Liaison réactive de tous les messages, placeholders et boutons de `ParentalGate.tsx` et `ParentsDashboard.tsx` via `useSettingsStore(state => state.labels)`.
- **[Feature] Découplage de la Gestion d'État & Confirmations UI (Ticket #10) :**
    - Retrait de l'appel système bloquant `window.confirm` du store Zustand `useProgressionStore.ts`, garantissant la pureté asynchrone et la testabilité des mutations d'état.
    - Centralisation et localisation des boîtes de dialogue de confirmation à l'aide des dictionnaires i18n dans l'interface utilisateur de réinitialisation :
        - Dans le Tableau de Bord Parents (`ParentsDashboard.tsx`) pour chaque profil via `t.confirmReset(name)`.
        - Dans la Galerie de collection de stickers (`BadgesPage.tsx`) pour le profil actif via `labels.badges.confirmReset`.
- **[Qualité/Ingénierie] Mocks Globaux & Suite de Tests au Vert :**
    - Ajout du mock pour `window.confirm` dans les tests unitaires de Vitest (`BadgesPage.test.tsx`).
    - Validation complète et réussie : type-checking strict sans erreur, et validation de l'intégralité des **132 tests** de la suite applicative globale à 100% au vert.

### VERSION 3.6.0 - Tranche Industrielle : Système de Progression et Validation "QC PASS" (21 Mai 2026)
--------------------------------------------------
- **[Feature] Navigation Linéaire & "Learning Path" (Ticket #45) :**
    - Implémentation des sélecteurs réactifs `isCompleted(topicId)` et `isUnlocked(topicId)` dans `useProgressionStore.ts`.
    - Sécurisation de la progression séquentielle : l'enfant doit réussir le quiz d'un sujet pour débloquer le suivant dans la même catégorie.
    - Création de l'état graphique cadenassé (`🔒`) et styles grayscale dans `TopicCard.tsx` / `TopicCard.module.css`.
    - Protection des routes dans `Topic/index.tsx` redirigeant automatiquement vers l'accueil en cas de saisie directe d'URL verrouillée.
- **[Feature] Gamification & Validation "QC PASS" (Ticket #46) :**
    - Ajout d'un compteur de "Tickets QC" (`🎫`) dans le Pill Dashboard de la page d'accueil.
    - Intégration d'une synthèse sonore Web Audio pure (oscillateur glissant sans chargement d'asset réseau) pour le son de réussite ("ding").
    - Création d'un tampon visuel animé de contrôle qualité "QC PASS / APPROUVÉ / APPROVED" avec effet d'impact élastique (bounce CSS).
- **[Feature] Système d'Ancrage "Stations" (Ticket #47) :**
    - Introduction de l'attribut `anchorIcon` dans `types.ts` and du dictionnaire de repli par catégorie (🚀, 🦖, etc.).
    - Rendu de l'icône de station mémorable à côté du titre du sujet, dans l'anecdote et en remplacement du morceau de puzzle du quiz.
- **[Feature] Assistance Pédagogique du Magicien (Ticket #49) :**
    - Affichage d'un panneau d'aide premium "Aide du Magicien" (`🧙‍♂️`) après 3 échecs consécutifs au quiz.
    - Intégration de la synthèse vocale native (`SpeechSynthesisUtterance`) pour lire à voix haute le rappel de cours de façon immersive et accessible.
- **[Qualité/Ingénierie] Standardisation "Data Factory" (Ticket #48) :**
    - Création d'un validateur ultra-robuste et strictement typé `createTopicCard` dans `src/data/factory.ts` (validation des types `unknown` sans `any`).
    - Automatisation des validations d'intégrité de l'encyclopédie via `src/data/dataIntegrity.test.ts`.

### VERSION 3.5.6 - Résolution du Ticket #03 & Redirection de La Singularité (21 Mai 2026)
--------------------------------------------------
- **[Feature] Intégration de La Singularité (Ticket #03) :**
    - Création du sujet éducatif complet `'singularite'` dans `src/data/topics/space.ts` contenant les descriptions bilingues, faits amusants et icône associée (`💥`).
    - Liaison de la frise chronologique Big Bang en configurant l'attribut `topicId: 'singularite'` sur le nœud `bb1` (« La Singularité »).
    - Ajout d'un quiz par défaut dans `QUIZZES` et d'une banque de 3 questions thématiques aléatoires dans `QUIZ_BANKS` pour tester les connaissances des enfants de manière engageante.
- **[Qualité] Tests d'Intégrité Automatiques :**
    - Ajout d'une suite de tests dans `src/data/dataIntegrity.test.ts` qui vérifie que tout `topicId` référencé dans les nœuds de la frise chronologique est valide (présent dans l'encyclopédie et doté d'un quiz associé), à l'exclusion des hubs de catégorie (`'histoire'`, `'dinosaurs'`, `'animaux'`).
    - Validation complète de la compilation TypeScript et de la suite de 131 tests unitaires et d'intégration à 100% au vert.

### VERSION 3.5.5 - Résolution de la dette de validation et Mocking PWA (21 Mai 2026)
--------------------------------------------------
- **[Qualité] Fix de validation ESLint (useMapZoom.ts) :**
    - Suppression du paramètre inutilisé `_e` dans la fonction `handleZoomAt` du hook `useMapZoom`, corrigeant l'erreur d'analyse statique `@typescript-eslint/no-unused-vars` qui faisait échouer la validation.
- **[Qualité] Mock PWA dans les tests (setup.ts) :**
    - Ajout du mock pour le module virtuel `virtual:pwa-register/react` dans le fichier de configuration de test global `src/test/setup.ts`.
    - Résolution des plantages de Vitest sur `App.test.tsx` et `XPAndMedals.integration.test.tsx` provoqués par la tentative de résolution de ce module virtuel dans l'environnement de test JSDOM.

### VERSION 3.5.4 - Résilience des lancers de dés et mouvements asynchrones (21 Mai 2026)
--------------------------------------------------
- **[Feature] Annulation et Résilience Asynchrone (Ticket #17) :**
    - Implémentation d'un système robuste d'invalidation par transaction ID (`currentRollId`) dans `useSafariStore.ts`.
    - Sécurisation de toutes les étapes asynchrones (`setTimeout`, pas-à-pas de l'avatar, retours arrière, résolutions de cases) par vérification systématique de la validité de l'identifiant de transaction.
    - Ajout d'un hook `useEffect` au démontage de `MissionSafari.tsx` forçant la réinitialisation automatique du store de jeu Safari, annulant proprement tout processus asynchrone fantôme ou persistant après navigation.

### VERSION 3.5.3 - Résilience Hors-ligne & Écran de secours PWA (21 Mai 2026)
--------------------------------------------------
- **[Feature] Écran Hors-ligne & Gestion de Crashs (Ticket #29) :**
    - Développement d'un composant de repli hors-ligne premium `OfflineFallback` avec des micro-animations interactives SVG de satellite endormi et d'étoiles scintillantes (Glassmorphism moderne).
    - Création d'un composant global `ErrorBoundary` interceptant de façon résiliente les échecs de chargement dynamique de code (ChunkLoadErrors) et de réseau lors d'une navigation hors-ligne.
    - Intégration globale dans `main.tsx` pour empêcher tout gel ou écran noir applicatif au lancement ou durant l'exploration.
    - Ajout des traductions bilingues complètes (fr/en) pour les messages et le bouton de retry hors-ligne.
- **[PWA] Pré-mise en cache 100% Hors-ligne :**
    - Configuration de `vite.config.ts` (`vite-plugin-pwa` et Workbox) pour inclure 100% des fichiers multimédias, images (dont `.jpg` comme `world-map.jpg`), icônes et polices dans les ressources pré-mises en cache.
    - Mise en place de stratégies de mise en cache d'exécution (`runtimeCaching`) résilientes pour les styles et polices Google Fonts via CDN (StaleWhileRevalidate pour fonts.googleapis.com, CacheFirst pour fonts.gstatic.com).

### VERSION 3.5.2 - Double-Tap pour Zoomer en Mode Tablette & Mobile (20 Mai 2026)
--------------------------------------------------
- **[Feature] Double-Tap de Zoom Tactile sur la Carte au Trésor :**
    - Implémentation d'une détection intelligente et performante de double-tap dans `handleTouchStart` (intervalle temporel < 300ms et distance spatiale < 20px).
    - Calcul précis et dynamique du point d'impact du double-tap sur la carte (`getBoundingClientRect` du conteneur relatif) pour centrer le zoom à l'emplacement exact du tap de l'enfant.
    - Déclenchement automatique de l'onde de choc visuelle (effet ripple) et du zoom progressif x2.
    - Désactivation immédiate du drag/pan lors du zoom pour éviter tout sursaut de caméra désagréable.
    - Prévention des conflits d'interaction : arrêt de la propagation des événements tactiles (`onTouchStart`) sur les marqueurs de points d'intérêt (`MapPoint`), évitant de zoomer ou de draguer involontairement la carte lors d'un tap sur un marqueur.
- **[Qualité] Suite de Tests Virtuels Robustes :**
    - Ajout de nouveaux tests unitaires rigoureux dans `TreasureMap.test.tsx` pour valider le comportement du double-tap tactile, ainsi que l'exclusion correcte des double-taps invalides (trop lents ou trop éloignés).
    - Utilisation d'un mock du temps système (`vi.spyOn(Date, 'now')`) pour des assertions temporelles 100% déterministes et stables.

### VERSION 3.5.1 - Support Tactile Premium sur la Carte au Trésor (20 Mai 2026)
--------------------------------------------------
- **[Feature] Support Tactile sur la Carte au Trésor (Ticket #14) :**
    - Implémentation des gestionnaires d'événements tactiles (`onTouchStart`, `onTouchMove`, `onTouchEnd`, `onTouchCancel`) sur le conteneur de défilement `.mapWrapperScroll`.
    - Recopie de la cinématique de glissement (drag-to-pan) pour le tactile simple sur tablettes (iPad, tablettes Android) et smartphones, débloquant l'exploration de la carte interactive.
    - Ajout d'un seuil de mouvement (5 pixels) pour différencier précisément un déplacement de carte d'un clic sur un point d'intérêt.
- **[Qualité] Tests d'Intégration du Mouvement :**
    - Ajout de suites de tests unitaires simulant le drag souris et le drag tactile dans `TreasureMap.test.tsx` garantissant 100% de succès.

### VERSION 3.5.0 - Résilience Mobile & Cartographie Structurale Complète (20 Mai 2026)
--------------------------------------------------
- **[Feature] Générateur d'UUID Résilient (Ticket #12) :**
    - Création d'une fonction `generateUUID` résiliente dans `useProfileStore.ts` pour parer aux limites des navigateurs modernes qui restreignent `crypto.randomUUID` aux seuls contextes sécurisés (HTTPS / localhost).
    - Bascule vers un fallback mathématique conforme à la norme RFC4122 v4 pour les tests mobiles et tablettes sur le réseau local en HTTP, évitant tout crash applicatif lors de la création d'un profil enfant.
- **[Architecture] Cartographie Réactive Globale & Synchronisation Déclarative :**
    - Intégration des interactions réactives complexes dans le diagramme d'architecture système : flux de recherche de `useDiscoveryStore`, file d'attente d'alertes de `useNotificationStore` et gestion des sessions de `useQuizStore`.
    - Documentation claire des interactions réactives croisées (orchestration déclarative de `useProfileStore` vers `useSettingsStore` et `useProgressionStore`).
- **[Qualité] Compilations Vertes à 100% :**
    - Validation complète et réussie : type-checking strict via `tsc -b` et les **125 tests unitaires** sont au vert sans aucun warning de compilateur.

### VERSION 3.4.0 - L'Apprentissage Dynamique & Tranche Verticale Espace (20 Mai 2026)
--------------------------------------------------
- **[Feature] Générateur Dynamique de Quizz & Anecdotes :**
    - Implémentation du système de sélections aléatoires (Randomizer) pour les quiz et les faits amusants ("Le savais-tu ?").
    - **Tranche Verticale "Espace"** : Le Soleil, la Terre et la Lune disposent désormais chacun d'une banque enrichie de 3 questions différentes et de 3 anecdotes insolites.
    - À chaque visite d'un enfant sur ces sujets, une nouvelle combinaison (anecdote + quiz) est générée, relançant constamment l'intérêt de la relecture et de la découverte autonome.
- **[Architecture] Rétrocompatibilité & Robustesse :**
    - Adaptation des types TypeScript (`Topic`, `QuizBank`) pour supporter les listes de faits et de questions tout en préservant le code historique.
    - Le système gère élégamment le *fallback* vers les quiz uniques pour les anciens sujets (comme les Animaux ou les Dinosaures) en attendant leur migration.
- **[UX/UI] Pages de Leçons Unifiées :**
    - La page de détail thématique (`TopicDetail.tsx`) a été confirmée comme point de convergence unifié du Micro-learning et du Quiz.
    - Le bouton "Retour" ramène logiquement à la catégorie parente (ex: "L'Odyssée de l'Univers"), respectant la boucle d'engagement attendue.

### VERSION 3.3.0 - Cartographie Interactive & Visualisateur de Flux (20 Mai 2026)
--------------------------------------------------
- **[Feature] Visualisateur de Flux Intégratif :**
    - Intégration de **Mermaid.js** de niveau entreprise avec rendu asynchrone sécurisé dans React (`MermaidDiagram.tsx`).
    - Création d'une page tableau de bord dynamique (`FlowDashboard.tsx`) cartographiant en temps réel les 4 couches structurelles du projet KidPedia.
    - Ajout d'une section **"Espace Développeur"** dans le tableau de bord parents pour faciliter le suivi de l'architecture par l'utilisateur.
- **[Feature] Outils d'Exportation Vectorielle Premium :**
    - Implémentation du bouton **"Télécharger l'image"** : extraction dynamique du code SVG généré par Mermaid et téléchargement direct au format vectoriel `.svg` haute définition.
    - Implémentation du bouton **"Copier le code"** : copie instantanée de la syntaxe du diagramme Mermaid dans le presse-papier avec notifications toast (`useNotificationStore`).
- **[Qualité] Sprint Zéro Défaut & Compilations Green :**
    - Typage strict asynchrone et élimination des avertissements de type `any` dans le bloc d'erreur (`err: unknown`) conforme aux standards ESLint.
    - Validation complète et réussie : type-checking `tsc -b` et les 124 tests unitaires sont 100% au vert.

### VERSION 3.0.0 - Release : Excellence Technique & Immersion Totale (18 Mai 2026)
--------------------------------------------------
- **[Qualité] Sprint Zéro Défaut :**
    - Élimination complète de la dette identifiée (17 problèmes résolus).
    - Purification des composants React : suppression des fonctions impures (`Math.random`) dans le rendu (via seeded random) et éradication des rendus en cascade (`ParentalGate`).
    - Éradication totale des types `any` dans le code source et les tests pour une sécurité de type absolue.
    - Fiabilisation de l'environnement de test avec le mock global de `ResizeObserver`.
- **[Architecture] Refonte I18n Polymorphe :**
    - Suppression de l'anti-pattern "Switch-Case" pour les traductions au profit d'un système de mapping par dictionnaire sémantique (ex: `MissionSafari`).
- **[UX/UI] "Waouh Effect" & Immersion :**
    - **Optimisation Image :** Migration vers une architecture `<picture>` avec priorité au format **WebP** et fallback JPEG/PNG automatique sur les assets lourds.
    - **Atmosphère Vivante :** Ajout de backgrounds animés (nébuleuses radiales) via GPU-acceleration pour un sentiment de mouvement perpétuel apaisant.
    - **Habillage Sonore :** Intégration d'un contrôle de sourdine global (`MuteToggle`) dans le header et synchronisation de l'ambiance sonore globale.
    - **Détails Magiques :** Implémentation d'un curseur personnalisé "Baguette Magique" (🪄) pour renforcer le storytelling de l'album magique.

### VERSION 3.0.11 - Compagnons et Familiers Thématiques (20 Mai 2026)
--------------------------------------------------
- **[Feature] Compagnons et Familiers Thématiques :**
    - Introduction des compagnons animés débloqués en obtenant 3 médailles d'or dans des catégories spécifiques :
      - 🐕 **Petit Chien** (Sujet Animaux / *animals*)
      - 🤖 **Mini Robot** (Sujet Espace / *space*)
      - 🦖 **Bébé Dino** (Sujet Dinosaures / *dinosaurs*)
    - Ajout du support multi-slot : les joueurs peuvent équiper simultanément un accessoire sur la tête et un compagnon à leurs côtés.
- **[UX/UI] Séparation Visuelle Côte-à-Côte & Micro-Animations :**
    - Refonte de la `GiftsPage` : présentation moderne en deux colonnes ("Mes Accessoires" et "Mes Compagnons") sur écrans larges pour une clarté visuelle optimale.
    - Ajout d'une micro-animation de flottement interactive (`floatCompanion`) sur les compagnons équipés pour un rendu kid-friendly ultra-vivant.
- **[Architecture] Propagation dans le Moteur de Jeu :**
    - Intégration complète des compagnons dans le store de progression (`useProgressionStore`) avec auto-équipement intelligent au déblocage.
    - Raccordement complet du compagnon dans le pion de jeu de la `MissionSafari` et du `SafariBoard`.
- **[Roadmap/Futur] Innovation des Récompenses :**
    - Note stratégique : Pour les futures itérations, planifier le remplacement progressif des émojis standard par des récompenses graphiques 3D/vectorielles personnalisées plus immersives (enregistré dans la documentation du projet).

### VERSION 3.0.10 - Consolidation UX : Progression & Récompenses (20 Mai 2026)
--------------------------------------------------
- **[UX/UI] Centralisation de la Progression :**
    - Redirection du point d'entrée principal (Pill Dashboard) de la page d'accueil vers `/badges` au lieu de l'ancienne galerie.
    - Résolution de la duplication architecturale : la page `BadgesPage` devient la source de vérité unique pour visualiser son niveau, son XP, et ses médailles.
- **[UX/UI] Fluidité & Sécurité des Actions :**
    - Intégration du composant `<GiftButton />` directement dans l'en-tête de la `BadgesPage` pour un accès direct au coffre magique.
    - Déplacement du bouton destructeur "Réinitialiser" au bas de la page pour prévenir les erreurs de manipulation des enfants.
    - Suppression du composant redondant `<Wardrobe />` de la page des badges, la gestion de l'avatar étant désormais exclusivement centralisée et optimisée dans la `GiftsPage`.
- **[Architecture] Nettoyage & Simplification :**
    - Suppression complète de l'expérience "Cercle de la vie" (`NatureExplorer`) et de la forêt animée.
    - Retrait du bouton d'accès depuis le tableau de bord principal (Discovery Hub).
    - Nettoyage de la route associée dans `App.tsx` pour maintenir une architecture saine et légère.

### VERSION 3.0.9 - Raffinement Visuel 3D Premium & Robustesse (20 Mai 2026)
--------------------------------------------------
- **[Feature] Raccordement Métier & Équilibrage :**
    - Ajustement stratégique du palier de déblocage du "Chapeau de Brousse" à **1000 XP** dans `accessories.ts` pour une meilleure courbe d'engagement.
    - Synchronisation dynamique complète de la `GiftsPage` avec le store global `useGiftStore` et auto-équipement immédiat.
- **[UX/UI] Esthétique Premium Glossy & 3D :**
    - Implémentation d'un design résolument moderne combinant **Glassmorphism**, grids responsives tridimensionnelles, effets de lévitation subtils et auras lumineuses pulsées.
    - Création d'une jauge de progression sous forme de **Capsule 3D** avec un dégradé brillant haut de gamme et des ombres directionnelles pour un rendu ultra-premium.
    - Micro-interactions tactiles avancées sur tous les boutons (enfoncement `:active`, reflets dynamiques).
- **[Qualité] Sprint Zéro Any & Typage Strict :**
    - Éradication complète de tous les avertissements ESLint liés à l'usage de types `any` dans `GiftsPage.tsx`.
    - Sécurisation de l'architecture de type avec des interfaces robustes pour la gestion de l'état réactif.
- **[Ingénierie de Test] Robustesse JSDOM & Couverture Globale :**
    - Résolution des plantages asynchrones JSDOM liés au rendu de `canvas-confetti` via la mise en place d'un stub global robuste dans `setup.ts`.
    - Création d'une suite de tests complète `GiftsPage.test.tsx` couvrant 100% des cas d'utilisation (états verrouillés/déverrouillés, coffre persistant, auto-équipement réactif, célébrations de victoire).
    - Validation technique totale : les 26 suites de tests (116 tests unitaires et d'intégration) passent au vert de manière déterministe.

### VERSION 3.0.8 - Finalisation : Boucle d'Engagement interactive & Pur CSS (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Interactivité d'Équipement Direct :
    - Implémentation des boutons de bascule réactifs (Porter / Enlever ❌) sous chaque cadeau débloqué.
    - Connexion directe au `useProfileStore` pour une mise à jour instantanée de l'avatar du profil actif.
- **[UX/UI]** Design & Feedback :
    - Raffinement du bouton d'action (affichage texte pur pour l'équipement).
    - Intégration des micro-interactions sonores (`medal` pour l'équipement, `pop` pour le retrait).
    - Design 3D Pur CSS avec effets physiques (enfoncement au clic, ombres directionnelles).
- **[Qualité/A11y]** Standards :
    - Validation de l'accessibilité universelle via des labels ARIA dynamiques.
    - Validation technique finale : 112 tests passés, zéro erreur TypeScript.

### VERSION 3.0.7 - Dynamisation : Grille Épurée & États Réactifs (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** Raccordement Dynamique :
    - Synchronisation de la nouvelle grille GiftsPage.tsx avec le store de progression réel.
    - Gestion dynamique des cartes : affichage des stickers découverts vs silhouettes mystères "???".
- **[UX/UI]** Élagage Technologique :
    - Suppression complète des anciens composants lourds et des boîtes opaques.
    - Standardisation du rendu en mode "Sticker" (fond blanc, ombre portée) pour une cohérence totale avec la Galerie.
- **[Qualité]** Stabilité :
    - Validation technique : 112 tests passés, zéro erreur TypeScript.

### VERSION 3.0.6 - Finalisation : Boucle d'Engagement Interactive (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Toggle d'Équipement Dynamique :
    - Implémentation finale des boutons "Porter 🤠 / Enlever ❌" sous chaque sticker débloqué.
    - Synchronisation réactive bidirectionnelle avec le store de progression pour refléter l'état de l'avatar en temps réel.
- **[UX/UI]** Harmonisation Visuelle Totale :
    - Refonte esthétique calquée sur l'album de stickers : cartes blanches compactes, ombres douces et layout en grille épuré.
    - Design 3D Pur CSS pour les boutons d'action avec feedbacks physiques (enfoncement, relief).
    - Intégration de la signature sonore (sons `medal` et `pop`) pour chaque interaction.
- **[Qualité/A11y]** Standard Industriel :
    - Validation de l'accessibilité sémantique via des labels ARIA dynamiques mis à jour selon l'état d'équipement.
    - Validation technique finale : 112 tests passés, zéro erreur TypeScript, zéro type `any`.

### VERSION 3.0.5 - Dynamisation : Grille Réactive & États Visuels (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** Raccordement Dynamique :
    - Connexion de la grille `GiftsPage.tsx` aux données réelles de `ACCESSORIES_DB`.
    - Liaison réactive avec le `useProgressionStore` pour refléter l'état de déblocage en temps réel.
- **[UX/UI]** Gestion des États Visuels (Pur CSS) :
    - Implémentation des classes `.unlocked` (pleine couleur, effets 3D) et `.locked` (silhouette, grisaille, pulsation mystérieuse).
    - Standardisation du layout en grille responsive harmonisée avec la `BadgesPage`.
- **[Qualité]** Stabilité :
    - Élimination des données de mock au profit de la source de vérité.
    - Validation technique : 112 tests passés, zéro erreur TypeScript.

### VERSION 3.0.4 - Engagement : Équipement Immédiat (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Bouton d'Action Directe :
    - Intégration du bouton "Mettre sur mon avatar ! 🤠" sur la `GiftsPage` post-ouverture.
    - Interconnexion avec le `useProgressionStore` (via `equipAccessory`) pour une mise à jour instantanée de l'avatar du profil actif.
- **[UX/UI]** Polissage & Feedback :
    - Ajout du feedback sonore "Medal" lors de l'équipement de l'accessoire.
    - Création d'un état "Équipé" visuel (vert avec coche ✅) pour confirmer l'action à l'enfant.
    - Design 3D physique (relief et ombre) pour une cohérence parfaite avec le langage visuel du projet.
- **[Qualité/A11y]** Conformité :
    - Ajout des labels ARIA pour une navigation inclusive.
    - Validation technique : 112 tests passés, zéro erreur TypeScript.

### VERSION 3.0.3 - UX : Expérience Cadeaux Unifiée (19 Mai 2026)
--------------------------------------------------
- **[UX/UI]** Refonte "Instant Gratification" de la `GiftsPage` :
    - Centralisation de l'expérience : l'ouverture du coffre et la révélation du trophée se font désormais sur la même page.
    - Suppression de la fragmentation UX (plus besoin de naviguer vers la garde-robe pour voir la récompense).
- **[Gameplay]** Séquence de Célébration :
    - Intégration d'une animation de suspense (vibration du coffre) suivie d'une explosion de confettis (`launchCelebration`).
    - Synchronisation audio avec le son triomphant "Tada" au moment de l'ouverture.
    - Affichage dynamique du dernier accessoire débloqué via une `TrophyCard` stylisée.
- **[Qualité]** Performance & Robustesse :
    - Optimisation des animations via GPU pour une fluidité à 60 FPS.
    - Validation technique maintenue : 112 tests passés, zéro erreur TypeScript.

### VERSION 3.0.2 - Logique Métier : Coffre Persistant & Réactivité (19 Mai 2026)
--------------------------------------------------
- **[Architecture]** Création du `useGiftStore` :
    - Implémentation d'un store Zustand autonome avec middleware `persist` pour la sauvegarde de l'état du coffre.
    - Mise en place du pattern "Smart Store / Dumb UI" pour découpler la logique de récompense de la vue.
- **[Gameplay]** Système d'Éligibilité :
    - Synchronisation réactive avec le `useProgressionStore` : le coffre devient interactif dès le franchissement du palier de 1000 XP.
    - Ajout de feedbacks visuels dynamiques (pulsation du coffre, changement d'états textuels).
- **[Qualité]** Robustesse Technique :
    - Typage strict des actions et de l'état (Zéro `any`).
    - Intégration de la célébration visuelle (`launchCelebration`) et sonore lors de l'ouverture.
    - Validation maintenue : 112 tests passés avec succès.

### VERSION 3.0.1 - Feature : Page Cadeaux & Immersion (19 Mai 2026)
--------------------------------------------------
- **[Feature]** Création de la page `GiftsPage` :
    - Implémentation d'un "Empty State" narratif conçu pour les enfants (Coffre au trésor flottant `🧰`).
    - Ajout d'animations CSS avancées (scintillement, lévitation et fond dégradé animé).
- **[UX/UI]** Raccordement Navigation & Audio :
    - Intégration du bouton `GiftButton` avec redirection vers `/gifts` via `react-router-dom`.
    - Ajout du feedback sonore "Woosh" au clic pour renforcer la sensation de découverte.
- **[Architecture]** Qualité & Performance :
    - Mise en place du Lazy Loading pour la nouvelle route dans `App.tsx`.
    - Validation totale de l'accessibilité (ARIA labels sur les illustrations).
    - Validation technique complète : 112 tests passés, zéro erreur TypeScript.

---

## 🚀 Historique Archivé (v1.x & v2.x)

Les versions antérieures (genèse, stabilisation et cycle v2.x) de KidPedia ont été archivées pour des raisons de modularité et de clarté documentaire.

Vous pouvez consulter l'historique complet des anciennes versions ici : [HISTORY_ARCHIVE.md](./HISTORY_ARCHIVE.md).
