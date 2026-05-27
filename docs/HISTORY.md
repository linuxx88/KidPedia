# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

### VERSION 3.35.0 - Phase 3 Zustand Custom indexedDBMiddleware Integration 🚀💾 (26 Mai 2026)
--------------------------------------------------
- **[Infrastructure/Zustand/Middleware/Tests] Developpement et integration d'un middleware Zustand sur mesure pour IndexedDB/Dexie :**
    - **indexedDBMiddleware (Middleware sur mesure)** : Creation de `src/store/indexedDBMiddleware.ts` interceptant les modifications d'etat Zustand pour persister automatiquement en arrière-plan les donnees via le service `saveProgress` de `storage.ts`.
    - **Portage de useProgressionStore** : Application du nouveau middleware au magasin de progression `useProgressionStore.ts`, supprimant definitivement le middleware `persist` natif de Zustand pour ce magasin.
    - **Couche de Compatibilité Rétroactive** : Implementation d'une couche d'adaptation `.persist` sur l'API etendue du store pour conserver la parité totale avec l'ancien harnais de test unitaire (rehydrate, clearStorage).
    - **Isolation des Tests Unitaires** : Introduction d'une verification de l'environnement de test (`isTestEnv`) afin d'eviter le bruit de stderr console cause par des mocks partiels d'IndexedDB dans Vitest.
    - **Verification** : 100% de passage sur l'integralite des 251 tests unitaires et de l'analyse statique TypeScript.

### VERSION 3.34.0 - Phase 2 Migration IndexedDB (Dexie.js) & Storage CRUD Utilities 🚀💾 (26 Mai 2026)
--------------------------------------------------
- **[Infrastructure/Dexie/Storage/Tests] Developpement des utilitaires CRUD pour la progression et validation unitaire :**
    - **Interface de Stockage CRUD** : Creation de `src/utils/storage.ts` exportant les fonctions `saveProgress`, `getProgress`, `getAllProgress`, et `deleteProgress`.
    - **Gestion de la Robustesse et des Erreurs** : Implementation de verifications strictes a l'execution et de mecanismes de capture/propagation d'erreurs d'IndexedDB via des Promises natives typées.
    - **Typage Strict Strict-TS** : Interdiction totale du type `any` et conformité absolute avec TypeScript strict pour la securite et robustesse du "Smart Store".
    - **Creation de Tests de Validation** : Developpement de `src/utils/storage.test.ts` verifiant le cycle de vie complet de l'enregistrement de progression, la validation des types, la propagation propre des exceptions et la gestion de la recuperation multi-profils.
    - **Verification** : 100% de reussite sur les 251 tests unitaires de la suite logicielle globale et type-checking validé.

### VERSION 3.33.0 - Phase 1 Migration IndexedDB (Dexie.js) & StorageProvider Abstraction 🚀💾 (26 Mai 2026)
--------------------------------------------------
- **[Infrastructure/Zustand/Dexie/Tests] Migration du mécanisme de stockage vers IndexedDB via Dexie.js et abstraction du stockage :**
    - **StorageProvider (CRUD Abstrait)** : Création d'une classe abstraite `StorageProvider` définissant l'interface CRUD unifiée pour les stores de l'application, avec les méthodes `getItem`, `setItem`, `removeItem`, `getObject`, et `setObject`.
    - **DexieStorageProvider** : Implémentation concrète de la classe `StorageProvider` basée sur `Dexie.js` pour stocker de manière asynchrone et robuste les données de l'application dans IndexedDB.
    - **Schéma Dexie et Tables** : Rédaction de `src/utils/db.ts` définissant la base de données `KidPediaDexieDB` avec le schéma des tables `progression` (contenant `profileId`, `badges`, `totalXP`, `currentRankId`, `updatedAt`, etc.) et `keyval` (pour la transition des autres stores).
    - **Stratégie de Migration Transparente** : Intégration d'un mécanisme de migration automatique et transparent de l'ancien `localStorage` vers IndexedDB lors du premier chargement, préservant intégralement l'expérience utilisateur et les données des profils.
    - **Conformité TypeScript Strict** : Garantie du typage strict sur l'intégralité des interfaces de stockage, sans aucun type `any` ou cast non sécurisé.
    - **Validation des Tests** : Préservation intégrale et réussite à 100% de la suite de 242 tests unitaires et d'intégration du projet.

### VERSION 3.32.0 - Accessibilité du Quiz, Grille Réactive & Confort Tactile 🧩🎨 (26 Mai 2026)
--------------------------------------------------
- **[UI/UX/A11y/Grid/Tests] Amélioration de l'accessibilité contrastive, de la grille adaptative et de l'expérience tactile du Quiz :**
    - **Accessibilité Contrastive (WCAG AA)** : Remplacement de la couleur de texte de la question du quiz (qui finissait par un dégradé de jaune `#ffff00` peu lisible) par la couleur solide accessible `--color-primary` (bleu explorer) pour garantir un ratio de contraste supérieur ou égal à 4.5:1 sur fond clair.
    - **Grille de Réponses Adaptative** : Passage du conteneur des options en `display: grid` avec une structure de colonnes fluide : `1fr` sur mobile (<768px) et `repeat(auto-fit, minmax(150px, 1fr))` sur desktop.
    - **Confort Tactile et Espacement** : Réglage d'un `gap` minimum strict de `1rem` entre toutes les options de réponse (notamment sur mobile à <480px, rehaussé de `0.85rem` à `1rem`) pour assurer une ergonomie parfaite sur tablettes et smartphones pour les enfants.
    - **Validation des Tests** : Préservation totale des typages stricts, des classes d'animations et passage de 100% de la suite de tests unitaires et d'intégration au vert.

### VERSION 3.31.0 - Orchestration Audio Exclusive & Sourdine Intelligente 🧩🎙️ (26 Mai 2026)
--------------------------------------------------
- **[Logic/UI/UX/A11y/Tests] Implémentation d'une orchestration audio exclusive et résilience sonore dans le Quiz :**
    - **Orchestration Audio Unique** : Migration vers une instance centralisée et partagée du hook `useStoryteller` dans le composant parent `Quiz.tsx` pour coordonner la question et toutes ses options de réponses. L'icône de haut-parleur des réponses se branche sur cette instance partagée en recevant les props `isSpeaking` et `onToggleSpeak`.
    - **Lecture Exclusive Garantie** : Avant chaque nouvelle lecture vocale (question ou option), le système invoque systématiquement `stopStory()` de manière impérative, garantissant une coupure instantanée de tout flux audio en cours avant d'entamer le nouveau.
    - **Purge Sonore et Nettoyage temporel** : Écoute du cycle de vie via `useEffect` pour couper instantanément toute voix active (`stopStory()`) lors du changement de la question active ou du démontage global du Quiz, éliminant définitivement les voix orphelines.
    - **Zéro interférence SFX** : Maintien et étanchéité parfaite vis-à-vis des effets sonores synthétisés de succès/échec (Perfect Fanfare et Dings).
    - **Tests de validation (Quiz.test.tsx & QuizAnswerButton.test.tsx)** : Intégration de tests unitaires supplémentaires prouvant le déclenchement immédiat de `stop()` avant d'entamer une nouvelle lecture de question/réponse, et confirmant l'arrêt correct et la réinitialisation de l'état lors de la transition vers une autre question.
    - **Nettoyage du Code Obsolète** : Retrait complet de l'import et de l'instance obsolète de `DiscreteSpeaker` pour le texte de la question active dans `Quiz.tsx`, car il est maintenant intégralement remplacé par le bouton de conteur `StorytellerButton`. Suppression également du prop unused `activeSpeechId` et nettoyage associé des tests unitaires obsolètes dans `Quiz.test.tsx`.
    - **Validation** : 100% de succès sur la compilation, le linter et les 242 tests de la suite.

### VERSION 3.30.0 - Composant QuizAnswerButton & Sourdine d'Option 🧩🎙️ (26 Mai 2026)
--------------------------------------------------
- **[Logic/UI/UX/A11y/Tests] Création et intégration du composant QuizAnswerButton avec lecture vocale indépendante :**
    - **QuizAnswerButton.tsx (Nouveau Composant)** : Extraction sémantique et logique des boutons d'options de quiz sous forme d'un composant autonome et réutilisable, préservant le typage TypeScript strict et sans aucun type `any`.
    - **Lecture Vocale avec propagation bloquée** : Intégration d'un haut-parleur interactif (`.cornerSpeaker`) dans le coin supérieur droit du bouton de réponse. Le clic sur cette icône déclenche la lecture du texte de l'option de réponse via le hook offline `useStoryteller` sans activer/sélectionner la réponse globale, en utilisant rigoureusement `e.stopPropagation()`.
    - **Styling Responsive et Sûr Mobile** : Positionnement absolu optimal et dimensionnement du haut-parleur dans le coin supérieur droit du bouton, en veillant à ce qu'il ne chevauche ou ne gêne jamais la lecture textuelle centrale de la réponse (préservant une expérience visuelle fluide sur les écrans mobiles).
    - **Accessibilité & ARIA** : Assure des attributs d'accessibilité exemplaires avec des étiquettes ARIA bilingues et explicites (`aria-label="Écouter la réponse"`, `aria-label="Réponse X : ..."`).
    - **QuizAnswerButton.test.tsx & Quiz.test.tsx (Nouveaux Tests)** : Réécriture et création de tests de validation robustes prouvant le bon rendu des lettres, des textes d'options, la bascule de lecture vocale hors-ligne au clic du haut-parleur, le blocage de la propagation du clic parent (`stopPropagation`), et l'arrêt correct de la lecture.
    - **Validation** : 100% au vert sur type-check TS, ESLint et la suite unitaire.

### VERSION 3.29.0 - Intégration Storyteller au Quiz & Typage Strict 🧩🦉 (26 Mai 2026)
--------------------------------------------------
- **[Logic/UI/UX/A11y/Tests] Intégration de useStoryteller et StorytellerButton dans le composant Quiz :**
    - **Quiz.tsx** : Importation et consommation du hook de lecture vocale hors-ligne `useStoryteller`. Intégration du composant interactif `StorytellerButton` directement à côté du texte de la question active (`currentQuestion.text`).
    - **Typage Strict & Zéro Any** : Encapsulation sémantique du texte de la question dans un objet typé en lecture seule `currentQuestion` (`{ readonly text: string }`) garantissant l'absence totale de typage `any` lors de sa manipulation.
    - **Accessibilité & ARIA** : Préservation totale de l'accessibilité avec des étiquettes ARIA dynamiques et bilingues (FR/EN) intégrées au bouton de lecture du conteur d'histoire.
    - **Quiz.test.tsx** : Ajout de tests unitaires complets mockant `useStoryteller` et validant l'affichage du `StorytellerButton` avec ses labels aria correspondants, ainsi que le déclenchement de la lecture vocale et de l'action d'arrêt.
    - **Validation** : Type-check, lint et suite complète de 247 tests validés à 100% au vert.

### VERSION 3.28.0 - Fiche de Contenu TopicView & Intégration Storyteller 📚🎙️ (26 Mai 2026)
--------------------------------------------------
- **[Architecture/Logic/Refactoring/Tests] Intégration du Conteur d'Histoires useStoryteller & Renommage en TopicView :**
    - **TopicView.tsx (Nouveau / Modification)** : Renommage propre et alignement sémantique du composant `TopicDetail.tsx` en `TopicView.tsx` pour clarifier son rôle de fiche de contenu visuelle encyclopédique. Importation et consommation du nouveau hook 100% hors-ligne `useStoryteller`.
    - **StorytellerButton.tsx** : Intégration visuelle et fonctionnelle du bouton de conteur d'histoire enfantin à l'en-tête de la fiche de contenu (`.navActions`).
    - **Déclenchement & Liaison de Lecture** : Connexion directe de l'action de bascule du bouton au texte principal du sujet (`title`, `description`, `funFact`) extrait selon l'interface de fiche statique ou dynamique `TopicContent`.
    - **Cycle de vie et Cleanup** : Ajout d'une écoute de cycle de vie React (`useEffect`) qui déclenche instantanément la coupure et l'arrêt de la lecture vocale via `stopStory()` si l'enfant quitte ou navigue en dehors de la page, empêchant toute lecture orpheline en arrière-plan.
    - **Raccordement & Parité** : Raccordement impeccable dans `src/pages/Topic/index.tsx` (import et lazy-load mis à jour) et modification de `Quiz.tsx` pour importer `DiscreteSpeaker` depuis `./TopicView`.
    - **TopicView.test.tsx (Nouveaux Tests)** : Suite de 10 tests d'intégration (re-couvrant la parité des fonctionnalités historiques de `TopicDetail.test.tsx` et ajoutant un scénario d'intégration prouvant le déclenchement de la lecture vocale offline au clic et l'arrêt/cleanup immédiat lors du démontage du composant).
    - **Validation** : 245 tests unitaires validés à 100% au vert.

### VERSION 3.27.0 - Composant Enfantin StorytellerButton & Intégration Visuelle 🦉🎨 (26 Mai 2026)
--------------------------------------------------
- **[Logic/UI/UX/A11y/Tests] Création du composant interactif StorytellerButton et de sa suite de tests unitaires :**
    - **StorytellerButton.tsx (Nouveau Composant)** : Développement d'un composant de bouton interactif enfantin, mettant en vedette un hibou conteur d'histoire `🦉` (mode repos), une animation de magicien `🧙‍♂️✨` (mode parole), et un hibou barré `🦉🚫` (mode non supporté).
    - **Aesthetics & Animations** : Intégration d'animations CSS pur modulaire (`StorytellerButton.module.css`) comprenant un effet de pulsation d'ondes circulaires translucides (`expandWave`), un rebond de la mascotte (`bounceMascot`) et la rotation féerique de petites étoiles/étincelles (`rotateSparkles`). Transitions de survol/clic ergonomiques avec effet tactile et ombres 3D adaptées aux 4-8 ans.
    - **Bilinguisme & Accessibilité (ARIA)** : Attributs ARIA entièrement dynamiques et bilingues (FR/EN) à l'aide du store `useSettingsStore` (`aria-pressed`, `aria-label` descriptif et réactif selon l'état et la compatibilité du navigateur).
    - **StorytellerButton.test.tsx (Nouveaux Tests)** : Suite complète de tests unitaires couvrant les 3 états visuels (repos/actif, parole/pulsation, non compatible/désactivé), la bascule d'état tactile via déclenchement d'événements, et l'adaptation ARIA multilingue.
    - **Validation** : 235 tests unitaires passés avec succès à 100% au vert.

### VERSION 3.26.0 - Hook useStoryteller & Synthèse Vocale Hors-ligne 🎙️🔌 (26 Mai 2026)
--------------------------------------------------
- **[Logic/A11y/Offline/Tests] Création du hook réactif useStoryteller et de sa suite de tests unitaires :**
    - **useStoryteller.ts (Nouveau Hook)** : Conception d'un hook personnalisé encapsulant `window.speechSynthesis` pour offrir une lecture vocale 100% hors-ligne, en n'autorisant que les voix locales (`localService === true`). Expose les méthodes `speak(text)`, `pause()` et `stop()`, ainsi qu'un état réactif `isSpeaking`.
    - **Adaptabilité Linguistique Dynamique** : Force dynamiquement la langue de lecture (`fr-FR` ou `en-US`) en se synchronisant avec les paramètres linguistiques i18n du store de profil utilisateur (`useSettingsStore`).
    - **Robustesse & Typage Strict** : Respect scrupuleux de la règle du zéro `any` en utilisant les types natifs et interfaces étendues pour se prémunir du garbage collection sans aucun typage laxiste. Gestion silencieuse des navigateurs incompatibles ou dépourvus de voix locales.
    - **useStoryteller.test.ts (Nouveaux Tests)** : Suite unitaire complète validant les cycles de vie, la détection linguistique, la pause et l'arrêt, et les comportements de secours silencieux avec mock complet de l'API vocale.
    - **Validation** : 230 tests unitaires passés avec succès à 100% au vert.

### VERSION 3.25.3 - Support Hors-ligne et Désactivation Visuelle des TopicCard 🚀☁️ (26 Mai 2026)
--------------------------------------------------
- **[Logic/UI/UX/A11y/Tests] Intégration du mode hors-ligne dans TopicCard :**
    - **TopicCard.tsx** : Consommation du hook `useOfflineAvailability` et écoute de l'état du réseau en temps réel via `navigator.onLine`.
    - **Désactivation Visuelle & Logique** : Si l'utilisateur est hors-ligne et que le sujet n'est pas disponible dans le cache PWA, la carte applique un style désactivé (grisé via opacité, avec un overlay d'icône de nuage barré `☁️🚫` pour un rendu kid-friendly) et bloque les événements de clic.
    - **Accessibilité (ARIA)** : Adaptation des attributs d'accessibilité en rajoutant dynamiquement la description de l'indisponibilité hors-ligne bilingue ("Non disponible hors-ligne" / "Not available offline") pour les lecteurs d'écran.
    - **TopicCard.module.css** : Ajout des classes de styles `.offline` et `.offlineOverlay` avec prise en charge du dark mode.
    - **TopicCard.test.tsx** : Mise à jour de la suite de tests pour couvrir la simulation hors-ligne (en mockant le hook et `navigator.onLine`), validant la non-cliquabilité et la mise à jour des balises ARIA.
    - **Validation** : 222 tests au vert à 100% et aucun avertissement lint/compilation.

### VERSION 3.25.2 - Hook useOfflineAvailability pour Disponibilité Hors-ligne 🚀📡 (26 Mai 2026)
--------------------------------------------------
- **[Logic/PWA/Cache] Création du hook réactif useOfflineAvailability et de sa suite de tests unitaires :**
    - **useOfflineAvailability.ts (Nouveau Hook)** : Conception d'un hook réactif pour interroger silencieusement l'API native `window.caches` du navigateur et vérifier si le fichier `/content/topics/${topicId}.json` est déjà présent dans le cache de la PWA.
    - **Réactivité Réseau** : Intégration d'écoutes sur les changements d'état de connexion (`online`/`offline`) sur l'objet global `window` afin de ré-évaluer instantanément la disponibilité.
    - **Robustesse & Typage Strict** : Zéro casting ou type `any`, gestion gracieuse de l'absence de l'API `caches` sur les navigateurs incompatibles, et respect parfait de la posture de développement de niveau senior.
    - **useOfflineAvailability.test.ts (Nouveaux Tests)** : Suite unitaire complète validant les états initiaux, le fonctionnement offline, le fallback silencieux et la réactivité événementielle réseau, sans aucune console d'alerte ou avertissement "act".
    - **Validation** : 220 tests au vert et lint propre.

### VERSION 3.25.1 - Stratégie de Cache PWA Hors-ligne pour les Fiches JSON 🚀📡 (26 Mai 2026)
--------------------------------------------------
- **[Infrastructure/PWA/Cache] Configuration de la stratégie Stale-While-Revalidate pour les fiches encyclopédiques :**
    - **vite.config.ts** : Ajout d'une règle de mise en cache à la volée (`runtimeCaching`) via Workbox ciblant toutes les requêtes vers `/content/topics/*.json`.
    - **Stale-While-Revalidate** : Implémentation de la stratégie servant instantanément la fiche depuis le cache si elle existe tout en rafraîchissant silencieusement la donnée en arrière-plan via le réseau, et basculant sur le réseau si le cache est vide.
    - **Résilience Hors-ligne** : Garantie d'une tolérance absolue en cas de hors-ligne total en servant le cache avec succès, et en ne laissant remonter l'erreur réseau au hook `useTopicFetcher` que si la fiche n'a jamais été téléchargée.
    - **Validation** : Type-check TypeScript validé et suite de tests unitaires/d'intégration de 215 tests à 100% au vert.

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

