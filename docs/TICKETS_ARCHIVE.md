# 📜 Système de Suivi des Tickets Archivés (Résolus)

Ce document regroupe les tickets résolus et clôturés lors des audits et sprints de développement précédents de KidPedia, assurant un historique complet tout en allégeant le document de suivi actif.

Vous pouvez consulter les tickets actifs restants dans [TICKETS.md](./TICKETS.md).

---

## 🎫 Ticket #SW-UI-Availability : UI/UX - Désactivation Visuelle et Logique Hors-ligne des TopicCard 🚀☁️
**Statut** : 🟢 Résolu (v3.25.3)
**Sévérité** : Moyenne (UI/UX, Accessibilité & Robustesse)
**Localisation** : `src/components/Discovery/TopicCard.tsx`, `src/components/Discovery/TopicCard.module.css` & `src/components/Discovery/TopicCard.test.tsx`
**Description** :
Modifier le composant `TopicCard.tsx` pour qu'il consomme le hook `useOfflineAvailability` et réagisse dynamiquement à l'état du réseau via `navigator.onLine`. Si l'application est hors-ligne et que le sujet n'est pas disponible dans le cache PWA, appliquer un style visuel désactivé (carte légèrement grisée et overlay d'icône de nuage barré `☁️🚫`) et bloquer le clic pour empêcher la navigation vers une page d'erreur thématique. Veiller au respect de la règle du zéro any, garantir que l'attribut ARIA `aria-label` décrive l'indisponibilité pour les lecteurs d'écran, et mettre à jour les tests unitaires du composant.
**Résolution** :
- **TopicCard.tsx** : Consommation de `useOfflineAvailability` et implémentation d'une détection réactive à l'état de connexion (`online`/`offline`).
- **Désactivation logique & visuelle** : Application d'un style de grisé (.offline) et d'un overlay rond avec l'emoji nuage barré `☁️🚫` en cas de non-disponibilité hors-ligne. Les clics de souris/tactiles sont bloqués et le bouton est physiquement désactivé (`disabled={isDisabled}`).
- **Attributs ARIA & Accessibilité** : Ajout dynamique de la mention d'inaccessibilité traductible ("Non disponible hors-ligne" / "Not available offline") à l'attribut `aria-label` en fonction de la langue globale du store.
- **TopicCard.module.css** : Création des classes CSS `.offline` et `.offlineOverlay` supportant les modes sombre et clair.
- **Tests unitaires (TopicCard.test.tsx)** : Ajout de scénarios simulant les contextes en ligne/hors-ligne et avec/sans cache, vérifiant les balises ARIA et le blocage de navigation.
- **Validation** : 222 tests unitaires passés avec succès à 100% au vert.

---

## 🎫 Ticket #SW-Availability : Hooks - Hook de Disponibilité Hors-ligne useOfflineAvailability 🚀📡
**Statut** : 🟢 Résolu (v3.25.2)
**Sévérité** : Moyenne (Robustesse & Expérience Hors-ligne)
**Localisation** : `src/hooks/useOfflineAvailability.ts` & `src/hooks/useOfflineAvailability.test.ts`
**Description** :
Créer un hook React personnalisé `useOfflineAvailability` prenant un `topicId` en paramètre pour interroger dynamiquement l'API native `window.caches` et vérifier si le fichier JSON de la fiche thématique associée est déjà disponible localement dans le cache de la PWA. Ce hook doit retourner un état booléen réactif, se mettre à jour intelligemment au montage ou lors d'un changement d'état du réseau (événements `online`/`offline`), et gérer silencieusement l'absence de l'API `caches` sur les navigateurs non compatibles. Veiller au respect absolu de la règle du zéro any et inclure des tests unitaires robustes.
**Résolution** :
- **useOfflineAvailability.ts** : Développement du hook de disponibilité avec vérification sécurisée de l'existence de `window.caches` pour éviter les crashs sur navigateurs legacy.
- **Réactivité Événementielle** : Abonnement aux événements globaux `online` et `offline` de `window` pour forcer la mise à jour réactive de la disponibilité.
- **zéro any & Typage Strict** : Typage TypeScript irréprochable sans aucun casting ni `any`.
- **useOfflineAvailability.test.ts** : Conception d'une suite de 5 tests unitaires ultra-robustes mockant `window.caches` et les événements de réseau globaux sans aucun avertissement linter ou warning React `act`.
- **Validation** : Type-check TypeScript validé et 220 tests unitaires passés avec succès.

---

## 🎫 Ticket #SW-Cache : Infrastructure - Configuration du Cache Hors-ligne PWA pour les Fiches JSON 🚀📡
**Statut** : 🟢 Résolu (v3.25.1)
**Sévérité** : Élevée (Robustesse, Performance & Mode Hors-ligne)
**Localisation** : `vite.config.ts` (section Workbox runtimeCaching)
**Description** :
Configurer le Service Worker de la PWA (via Workbox) pour intercepter toutes les requêtes asynchrones pointant vers `/content/topics/*.json` en appliquant une stratégie de cache `Stale-While-Revalidate`. Le Service Worker doit retourner instantanément la ressource mise en cache si elle existe tout en la mettant à jour silencieusement en arrière-plan avec le réseau, et basculer sur le réseau si le cache est vide. En cas de perte absolue de connexion (mode hors-ligne total), garantir que le système serve la ressource du cache avec succès sans remonter d'erreur réseau au hook `useTopicFetcher`, sauf si la fiche thématique n'a jamais été téléchargée.
**Résolution** :
- **Configuration Workbox** : Ajout d'une règle de routage de cache à la volée (`runtimeCaching`) ciblant l'URL pattern RegExp `/\/content\/topics\/.*\.json$/`.
- **Stratégie Stale-While-Revalidate** : Branchement de la stratégie `StaleWhileRevalidate` de Workbox pour les fiches thématiques avec une limite de 30 entrées (`maxEntries`) et une durée d'expiration de 30 jours.
- **Résilience Réseau & Hors-ligne** : Le cache répond instantanément aux demandes de fiches encyclopédiques hors-ligne. Les requêtes n'échouent qu'en cas d'absence totale du fichier dans le cache et d'indisponibilité du réseau, satisfaisant pleinement les critères de robustesse.
- **Validation** : Type-check TypeScript validé et 215 tests unitaires passés avec succès.

---

## 🎫 Ticket #Refuge-Delete : Gamification - Suppression de la Page du Refuge des Compagnons 🦄🧹
**Statut** : 🟢 Résolu (v3.25.0)
**Sévérité** : Moyenne (Nettoyage de code & Simplification de l'Architecture)
**Localisation** : `src/pages/Refuge/` (supprimé), `src/store/useCompanionStore.ts` (supprimé), `src/App.tsx`, `src/components/Layout/MainLayout.tsx`, `src/pages/Home/index.tsx`, `src/pages/Parents/FlowDashboard.tsx`, `src/pages/Parents/ParentsDashboard.tsx`, `src/locales/` (fr.ts, en.ts, types.ts)
**Description** :
Démanteler et supprimer entièrement la page premium interactive "Le Refuge" et toutes les fonctionnalités associées devenues obsolètes (simulation de virtual pet, alimentation, besoins, sommeil, cache-cache) afin d'alléger l'application, d'optimiser l'architecture et d'améliorer les performances.
**Résolution** :
- **Suppression des fichiers du Refuge** : Retrait définitif du dossier `/src/pages/Refuge/` (RefugePage et RefugePage.module.css).
- **Suppression du store et des tests** : Retrait de `src/store/useCompanionStore.ts` et de sa suite de tests `useCompanionStore.test.ts`.
- **Nettoyage du Router et du Layout** : Suppression de l'import dynamique de `RefugePage`, de la route `/refuge` dans `src/App.tsx`, et retrait des chemins associés dans `MainLayout.tsx`.
- **Mise à jour de l'accueil** : Retrait du bouton d'accès au Refuge de la grille d'accueil dans `src/pages/Home/index.tsx`.
- **Nettoyage de la Zone Parents** : Simplification de `ParentsDashboard.tsx` et retrait de `refuge_view` et `store_companion` dans le diagramme de flux Mermaid (`FlowDashboard.tsx`).
- **Purge des traductions** : Purge complète de l'objet `refuge` et des clés associées dans `fr.ts`, `en.ts` et `types.ts`.
- **Validation** : Type-check TypeScript validé et suite de tests unitaires/d'intégration de 170+ tests à 100% au vert.

---

## 🎫 Ticket #80 : Refactoring - Composant AppLoader & Interface d'Erreur Enfantine Cohesive 🚀🧸
**Statut** : 🟢 Résolu (v3.24.0)
**Sévérité** : Moyenne (Aesthetics & UX/UI Enfantine)
**Localisation** : `src/components/UI/AppLoader.tsx`, `src/components/UI/AppLoader.module.css`, `src/pages/Topic/index.tsx`, `src/pages/Topic/TopicPage.module.css`, `src/pages/Topic/TopicPage.test.tsx`
**Description** :
Créer un composant premium `AppLoader` avec des animations orbitales kid-friendly (planète tournante et fusée spatiale). Remplacer l'ancienne fallback de chargement de `TopicPage` par ce composant. De plus, concevoir un affichage d'erreur hautement visuel et adapté aux enfants, mettant en scène un dinosaure endormi (`🦖💤`), des messages bienveillants et colorés expliquant clairement soit la panne réseau, soit la perte d'une fiche thématique, et un bouton d'action intuitif pour retourner à l'accueil de manière sécurisée. Mettre à jour les tests unitaires pour assurer le bon rendu des états.
**Résolution** :
- **AppLoader.tsx & AppLoader.module.css** : Création d'un loader haut de gamme animé en Pure CSS (orbite tridimensionnelle d'une fusée 🚀 autour d'une planète radial-gradient violette 🪐).
- **TopicPage/index.tsx** : Remplacement complet de `LoadingFallback` par le nouveau `<AppLoader message={labels.common.loading} />` tant pour les chargements de fiches dynamiques que pour le fallback `Suspense`.
- **Kid-friendly Error Screen** : Conception d'une interface d'erreur unifiée avec des emojis animés par un rebond dynamique doux, un message bilingue très bienveillant expliquant le problème réseau ("Le petit dinosaure n'a pas pu récupérer l'histoire. Vérifie ta connexion Internet !") ou la perte de la fiche ("Oups ! Cette fiche d'aventure s'est envolée dans les étoiles !").
- **TopicPage.test.tsx** : Ajout de 2 nouveaux scénarios de tests unitaires validant l'affichage fluide du `AppLoader` et l'affichage de l'écran d'erreur enfantin.
- **Validation** : Type-check strict (zéro any) conservé à 100% et tests unitaires "All-Green" validés avec succès.

---

## 🎫 Ticket #79 : Hooks - Hook Réactif useTopicFetcher & Robustesse Réseau 🎣⚡
**Statut** : 🟢 Résolu (v3.24.0)
**Sévérité** : Moyenne (Modularisation & Fiabilité Réseau)
**Localisation** : `src/hooks/useTopicFetcher.ts`, `src/hooks/useTopicFetcher.test.ts`, `src/pages/Topic/index.tsx`
**Description** :
Créer un hook React personnalisé `useTopicFetcher` pour encapsuler la récupération asynchrone des fiches encyclopédiques découplées (data, isLoading, error), strictement typé sans `any` avec `TopicContent`. Écrire des tests unitaires complets en mockant fetch pour prouver la résilience réseau (succès et échecs). Intégrer ce hook dans `TopicPage` en supprimant le fetch inline.
**Résolution** :
- **useTopicFetcher.ts** : Écriture du hook réactif isolant la logique de fetch asynchrone avec gestion de l'état monté (`isMounted`) pour prévenir les fuites mémoires et crashs.
- **useTopicFetcher.test.ts** : Rédaction d'une suite de 4 tests unitaires robustes couvrant l'initialisation, le succès de fetch, les échecs HTTP (ex: 404) et les rejets réseaux sans aucune variable `any`.
- **TopicPage/index.tsx** : Remplacement du fetch inline et de ses states par le nouveau hook `useTopicFetcher` de manière propre et réactive.
- **Validation** : Zéro avertissement ESLint et l'ensemble des 227 tests unitaires du projet validés avec succès au vert.

---

## 🎫 Ticket #78 : Architecture - Découplage de Fiche Encyclopédique & Interface TopicContent 🌌⚡
**Statut** : 🟢 Résolu (v3.24.0)
**Sévérité** : Élevée (Refactoring d'Architecture & Découplage de Données)
**Localisation** : `src/data/topics/types.ts`, `src/types/domain.ts`, `src/pages/Topic/index.tsx`, `src/data/dataIntegrity.test.ts`, `public/content/topics/systeme-solaire.json`, `src/data/topics/space.ts`, `src/data/quizzes/space.ts`
**Description** :
Créer une interface TypeScript stricte `TopicContent` pour typer proprement et sans aucun `any` la structure complète d'une fiche encyclopédique (textes, médias, quiz). Extraire ensuite la fiche `systeme-solaire` existante et sa configuration de quiz associée vers le fichier statique public `public/content/topics/systeme-solaire.json`. Supprimer enfin les données hardcodées de `/src` et implémenter un chargeur asynchrone dynamique et sécurisé dans `TopicPage` sans briser la compilation ni les tests.
**Résolution** :
- **types.ts** : Définition de l'interface stricte `TopicContent`.
- **systeme-solaire.json** : Extraction intégrale de la fiche et de son quiz.
- **space.ts & quizzes/space.ts** : Suppression des données hardcodées de `systeme-solaire`.
- **domain.ts** : Inclusion de `'systeme-solaire'` dans l'union `TopicId` pour garder la validité sémantique.
- **TopicPage/index.tsx** : Intégration d'un chargeur asynchrone dynamique avec états réactifs, fallback et optimisation par `useMemo` pour éviter les re-renders intempestifs.
- **dataIntegrity.test.ts** : Ajout de la tolérance pour les sujets découplés dans les audits d'intégrité de données.
- **Validation** : Type-check TypeScript 100% propre et 223 tests unitaires passés au vert.

---

## 🎫 Ticket #77 : UX/UI - Peaufinage Visuel et Retrait des Quiz (Le Grand Voyage du Temps)
**Statut** : 🟢 Résolu (v3.23.6)
**Sévérité** : Moyenne (Esthétique / Ergonomie)
**Localisation** : `src/components/Learning/TopicDetail.tsx`, `src/pages/Origins/Components/OriginsGrid.tsx`, `src/pages/Origins/Origins.module.css`, `src/pages/Topic/index.tsx`
**Description** :
Peaufiner le design de la page "Le Grand Voyage du Temps" pour le rendre immersif et esthétiquement haut de gamme (effet glassmorphism, dégradés cosmiques animés, halos lumineux, drop-shadows), remplacer l'appel au quiz par "Découvrir 📖" / "Discover 📖", et masquer les quiz lorsque les sujets sont consultés depuis la ligne du temps pour privilégier l'exploration narrative libre.
**Résolution** :
- **Origins.module.css** : Intégration d'un arrière-plan cosmique animé, halos de lumière flottants interactifs, effet glassmorphism (backdrop-filter) et bordure translucide.
- **OriginsGrid.tsx** : Remplacement du bouton quiz par "Découvrir 📖" / "Discover 📖".
- **TopicDetail.tsx & TopicPage** : Ajout de la propriété conditionnelle `hideQuiz` pour masquer le bloc de quiz et adapter la navigation de retour (`navigate(-1)`) depuis Origins.
- **Validation** : Rendu visuel et intégration validés avec succès.

---

## 🎫 Ticket #76 : Store - Bascule du useProgressionStore (Validation PoC)
**Statut** : 🟢 Résolu (v3.23.5)
**Sévérité** : Élevée (Optimisation & Purification Logique)
**Localisation** : `src/store/useProgressionStore.ts` & `src/utils/indexedDBStorage.ts`
**Description** :
Brancher le nouveau moteur asynchrone sur le store de progression et supprimer la logique de compression devenue obsolète.
**Résolution** :
- **indexedDBStorage** : Remplacement direct de `customStateStorage` par `indexedDBStorage` dans la configuration de persistance de `useProgressionStore`.
- **Purge de la compression** : Retrait définitif des fonctions `compressState` et `decompressState` du store de progression.
- **Migration préservée** : Migration de la logique de décompression héritée dans `indexedDBStorage.ts` pour maintenir une compatibilité parfaite avec les données de profil compressées existantes.
- **Validation** : 100% des tests unitaires et d'intégration unitaires validés avec succès.

---

## 🎫 Ticket #75 : Logique - Stratégie de Migration Transparente (LocalStorage ➔ IndexedDB)
**Statut** : 🟢 Résolu (v3.23.5)
**Sévérité** : Élevée (Protection des Données Utilisateur)
**Localisation** : `src/store/useProgressionStore.ts` (customStateStorage)
**Description** :
Ne jamais perdre la sauvegarde d'un enfant. L'application doit détecter les anciennes sauvegardes compressées dans le localStorage, les transférer dans IndexedDB, puis nettoyer l'ancien stockage.
**Résolution** :
- **indexedDBStorage.ts** : Implémentation du moteur asynchrone IndexedDB.
- **Migration & Rétrocompatibilité Flawless** : Intégration transparente d'un mécanisme de migration automatique au chargement. Si une clé est absente d'IndexedDB mais réside dans le `localStorage` legacy, le moteur la lit, la migre asynchronement vers IndexedDB et nettoie proprement le `localStorage` obsolète.
- **Validation & Tests** : Validation complète via des tests d'intégration simulant le passage d'une version à l'autre dans `useProgressionStore.test.ts`.

---

## 🎫 Ticket #R9 : Version 0.0.9 - Le Verrouillage Kid-Safe Intelligent 🔒
**Statut** : 🟢 Résolu (v3.23.6)
**Sévérité** : Moyenne (Ergonomie / Sécurité)
**Localisation** : `src/components/UI/ParentalGate.tsx` & `src/components/UI/ParentalGate.module.css`
**Description** :
Le système actuel pour entrer dans la Zone Parents repose sur des multiplications simples (ex: `8 x 7`). Cependant, certains enfants précoces de 8 ans contournent ce verrou facilement. Il faut remplacer cette formule austère par des puzzles ludo-éducatifs plus élaborés mais non mathématiques (ex: "Associe le bébé animal à son parent", ou des suites logiques de constellations) insolubles pour les plus petits, tout en étant distrayants.
**Résolution** :
- **Banque de 5 mini-jeux de logique/association** : Écriture d'un ensemble de 22 questions réparties sur 5 catégories de puzzles de logique visuels rapides (bébés animaux 👶🦁, intrus 🥦🔥, suites logiques de motifs 🌙🍎, opposés ☀️❄️, et habitats 🐟🌊).
- **Sécurité et anti-spam** : En cas de mauvaise réponse, le puzzle est instantanément brouillé/mélangé et un NOUVEAU défi aléatoire de la banque est sélectionné afin de bloquer les clics spammés de l'enfant.
- **Accessibilité & WCAG AA** : Intégration de descriptions sémantiques `aria-label` localisées sur chaque carte de puzzle, boutons tactiles de grande taille (adaptés aux tablettes et mobiles), contraste extrêmement élevé et navigation clavier naturelle (`focus-visible`).

---

## 🎫 Ticket : Infrastructure - Moteur de Stockage Asynchrone IndexedDB
**Statut** : 🟢 Résolu (v3.23.5)
**Sévérité** : Moyenne (Optimisation / Infrastructure)
**Localisation** : `src/utils/indexedDBStorage.ts` & `src/store/useProgressionStore.ts`
**Description** :
Remplacer l'adaptateur de compression synchrone par un adaptateur asynchrone branché sur IndexedDB (via une micro-librairie comme idb-keyval pour éviter de coder les transactions à la main).
**Résolution** :
- **indexedDBStorage.ts (Nouvel utilitaire)** : Implémentation complète et sur mesure de l'interface `StateStorage` de Zustand utilisant l'API IndexedDB native (sans aucune dépendance externe) garantissant un typage strict sans `any` et le respect absolu de la charte de qualité.
- **Support des Promesses** : Toutes les opérations de stockage (`getItem`, `setItem`, `removeItem`) s'exécutent de façon purement asynchrone et retournent des Promesses robustes.
- **Migration & Rétrocompatibilité Flawless** : Intégration transparente d'un mécanisme de migration automatique au chargement. Si une clé est absente d'IndexedDB mais réside dans le `localStorage` legacy, le moteur la lit, la migre asynchronement vers IndexedDB et nettoie proprement le `localStorage` obsolète.
- **useProgressionStore.ts** : Intégration du moteur asynchrone IndexedDB à la place de l'ancien moteur synchrone.
- **indexedDBStorage.test.ts (Tests unitaires & Mocks)** : Écriture d'une couverture de tests unitaires complète en simulant les microtâches (via `Promise.resolve`) pour éliminer tout effet de bord ou race-condition asynchrone, validant 100% des scénarios de lecture, d'écriture, de suppression et de rétrocompatibilité.

---

## 🎫 Ticket #R6 : Version 0.0.6 - La Carte interactive Sonorisée 🗺️
**Statut** : 🟢 Résolu (v3.23.2)
**Sévérité** : Faible (Immersion Sensorielle)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `src/hooks/useMapSounds.ts`
**Description** :
Sublimer la carte au trésor interactive en y intégrant un habillage sonore spatialisé de haute qualité. Le glissement (drag/pan) sur la carte doit diffuser un bruit continu et doux de vagues océaniques et de vent marin. Le survol ou le clic sur les îles thématiques déclenche des sonorités spatialisées (cris de mouettes, grondement lointain de volcan, musique mystique des étoiles pour l'île de l'Espace) renforçant le "Waouh effect".
**Résolution** :
- **useMapSounds.ts (Nouveau hook)** : Conception et implémentation d'un module d'habillage sonore spatialisé procédural utilisant exclusivement l'API native Web Audio (zéro dépendance externe).
- **Vagues & Vent marin continus** : Synthèse d'un bruit rose/blanc modulé par LFO sinusoïdaux lents (12s et 20s) pour simuler la houle marine et la brise océanique, avec variations dynamiques lors du panning.
- **Sonorités spatialisées interactives** : Synthèse de cris de mouettes (sweeps de fréquences en triangle), de grondements volcaniques (bruit filtré low-pass modulé à 10Hz) et d'arpèges stellaires mystiques (chimes pentatoniques) spatialisés en stéréo (StereoPannerNode) selon la position relative de l'île par rapport au centre de l'écran.
- **Transitions douces & Sourdine** : Intégration de fondus linéaires (fade in/out) de 400ms lors du survol/focus d'une île pour éviter toute transition audio abrupte, et raccordement complet au store de préférences `useSettingsStore` (respect de la sourdine globale `isMuted` et `isSfxMuted`).
- **TreasureMap.tsx** : Raccordement des événements de survol (`onMouseEnter`/`onMouseLeave`), de focus (`onFocus`/`onBlur`) et de clic pour piloter l'immersion sonore globale et réactive sans aucun re-rendering inutile de l'interface React.

---

## 🎫 Ticket #74 : Fonctionnalité "Manger" dans Le Refuge des Compagnons
**Statut** : 🟢 Résolu (v3.23.1)
**Sévérité** : Moyenne (Gamification / Engagement)
**Localisation** : `src/pages/Refuge/` & `src/store/useCompanionStore.ts`
**Description** :
Permettre à l'enfant de nourrir activement ses compagnons virtuels débloqués depuis l'interface du Refuge en utilisant l'inventaire de friandises disponibles. Cette action doit augmenter les jauges d'affection et de bonheur du familier sélectionné, consommer l'item de l'inventaire et déclencher un feedback visuel et sonore immersif.
**Résolution** :
- Refactorisation de l'action `feedCompanion` en une action pure prenant explicitement en arguments `(profileId, companionId, treatId)` sans couplage impératif direct avec l'état global du profil actif.
- Déduction stricte de 1 item de friandise par nourrissage, blocage de l'action en cas d'inventaire vide, incrémentation de l'affection (+15) et du bonheur (+10) bridée à la limite stricte de 100 via clamping dynamique `Math.min`.
- Intégration d'une propriété éphémère réactive `isFeeding: boolean` dans l'état du compagnon, activée instantanément et nettoyée de façon autonome via `setTimeout` après 2 secondes pour orchestrer et piloter les micro-animations vectorielles de l'interface.
- Connexion complète de l'action de nourrissage dans `RefugePage.tsx`, déclenchement de la classe d'animation via le store réactif, émission d'un signal sonore cartoon ascendant via l'API Web Audio native (C5-E5-G5) avec sourdine globale (`isMuted`).
- Réécriture complète de la suite de tests dans `useCompanionStore.test.ts` avec l'utilisation de `vi.useFakeTimers()` pour vérifier le cycle de vie éphémère de l'état `isFeeding` et la protection contre le dépassement des limites d'affection et de bonheur.

---

## 🎫 Ticket #R5 : Version 0.0.5 - Le Grand Quiz des Champions (Mode Défi) 🏆
**Statut** : 🟢 Résolu (v3.23.0)
**Sévérité** : Moyenne (Gamification / Rétention)
**Localisation** : `src/pages/Championship/` & `src/store/useQuizChampionshipStore.ts`
**Description** :
Introduire un mode de jeu compétitif et rejouable appelé "Le Grand Quiz". Contrairement aux quiz classiques de fiche, ce mode tire 10 questions aléatoires à travers toutes les catégories de l'encyclopédie. Un compte à rebours ludique de 15 secondes par question matérialisé par une mèche d'allumette qui brûle ajoute une tension excitante, récompensée par une avalanche de confettis dorés et un trophée physique à exposer.
**Résolution** :
- Création du store Zustand réactif et persistant `useQuizChampionshipStore` gérant le tirage de 10 questions aléatoires, le compte à rebours, le calcul et la persistance des 5 meilleurs scores (Wall of Fame) avec nom et avatar de l'enfant dans le `LocalStorage`.
- Implémentation du composant visuel d'exception `ChampionshipPage` (effets néons, dégradés d'or en glassmorphism haut de gamme) et d'un minuteur graphique interactif SVG (mèche d'allumette qui se consume avec flamme animée oscillante).
- Intégration d'un synthétiseur de retours sonores procéduraux Web Audio API (chime magique de réussite, buzz de défaite, horloge de fin de temps et fanfare de victoire) et double cascade de confettis.
- Câblage complet des routes et d'une tuile d'accès thématique dans la grille d'accueil (Rocket Icon).

---

## 🎫 Ticket #01 : Désynchronisation du Quiz (Logique de validation)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Bug Fonctionnel)
**Localisation** : `TopicPage` / `useQuizStore.ts`
**Description** :
Lorsqu'un sujet (ex: Le Soleil) tire au sort une nouvelle question via la `QUIZ_BANKS`, l'interface affiche bien la nouvelle question et ses choix. Cependant, la logique de validation est désynchronisée : le composant de gestion globale (`useQuizStore`) vérifie probablement la réponse par rapport à l'ancienne question statique (`QUIZZES[topicId]`) au lieu de la nouvelle question générée. Cela provoque une incohérence entre ce qui est cliqué et ce qui est validé.

---

## 🎫 Ticket #02 : Contenu principal statique (Manque de variabilité)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Amélioration UX)
**Localisation** : `TopicPage` / `space.ts`
**Description** :
Actuellement, seule l'anecdote ("Le savais-tu ?") et le quiz sont générés dynamiquement. Le texte d'introduction principal (ex: *"Le Soleil est une étoile géante. Toutes les planètes tournent autour de lui..."*) reste toujours le même à chaque visite. Pour que l'expérience soit complètement renouvelée à chaque session, il faudrait potentiellement ajouter une liste `fullContents` avec 3 ou 4 variations du texte principal pour chaque astre.
**Résolution** : Industrialisation complète de la catégorie Espace. Le schéma `Topic` dans `types.ts` et `factory.ts` a été mis à jour pour accepter une propriété optionnelle `fullContents`. L'ensemble des 13 sujets de l'Espace possède désormais 3 variations bilingues de descriptions stockées de manière robuste.

---

## 🎫 Ticket #03 : Bouton "La Singularité" (Lien brisé ou mal redirigé)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/bigBang.ts` / Navigation
**Description** :
Un clic sur le bouton "La singularité" (situé dans la catégorie des Origines / L'Odyssée de l'Univers) ne mène actuellement vers aucune page contenant un quiz. Il semble y avoir un problème de routage ou de reconnaissance de ce `topicId` spécifique par le composant `TopicPage`. A été résolu en associant le sujet 'singularite' avec ses questions et quiz dédiés et en vérifiant l'intégrité via des tests automatisés.

---

## 🎫 Ticket #04 : Sécurité anti-spoiler (Pédagogie Quiz / Anecdotes)
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Qualité / Pédagogie)
**Localisation** : `TopicPage` / logique de sélection
**Description** :
Éviter que l'anecdote ("Le savais-tu ?") ne donne la réponse directe au quiz affiché juste en dessous. Par exemple, si le quiz est *"Combien de Terres peut-on mettre dans le Soleil ?"*, il faut s'assurer que l'anecdote choisie ne soit pas *"On pourrait mettre 1 million de Terres à l'intérieur du Soleil !"*. Il faut implémenter un filtre d'exclusion mutuelle pour ces cas de doublons sémantiques.
**Résolution** : Implémentation de la fonction utilitaire `isSpoiler` nettoyant et comparant sémantiquement les options de réponse correcte avec les anecdotes candidates en français et en anglais (via filtrage regex). L'exclusion contourne les réponses courtes (<= 3 chars, ex: "Oui") pour éviter les faux positifs, mais extrait et teste les nombres de 2 chiffres ou plus pour bloquer les spoilers numériques directs (comme "1600" ou "1 million"). Mise à jour du `useEffect` dans `TopicPage/index.tsx` pour d'abord figer la question de quiz, puis filtrer et sélectionner une anecdote parmi les candidates sécurisées.

---

## 🎫 Ticket #06 : 89 Sujets "Orphelins" (Intégrité de la navigation)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Exploration)
**Localisation** : `src/data/dataIntegrity.test.ts` (Données / Cartographie)
**Description** :
Les 90 sujets de l'encyclopédie sont désormais reconnus comme découvrables de manière naturelle :
- L'Accueil (Grille des catégories et Moteur de recherche) a été officiellement validé et intégré dans le test d'intégrité comme le mode de découverte universel primaire.
- Le test d'intégrité `dataIntegrity.test.ts` a été mis à jour pour :
  1. Parcourir de manière récursive l'ensemble des nœuds et sous-nœuds du « Grand Voyage du Temps » (Origines) pour y extraire tous les `topicId` référencés (ex: `singularite`, `terre`).
  2. Valider la structure et la présence de la catégorisation bilingue (`categoryKey`, `category.fr`, `category.en`) de chaque sujet dans la grille d'accueil.
  3. Produire un rapport de couverture informatif propre au lieu de générer des avertissements d'intégrité erronés.

---

## 🎫 Ticket #07 : Resampling / Reshuffle intempestif lors du changement de langue
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Cohérence UX)
**Localisation** : `TopicPage/index.tsx`
**Description** :
La sélection de l'index de l'anecdote et du quiz se fait dans un `useEffect` qui dépend de `language`. Si un enfant change la langue de l'application (Français ⇄ Anglais) pendant qu'il est sur la page du Soleil, le système ne se contente pas de traduire le texte : il ré-exécute le tirage au sort aléatoire. L'enfant se retrouve donc avec une *autre* question et une *autre* anecdote au lieu de voir la traduction de ce qu'il lisait. Il faut mémoriser les indices choisis et ne changer que la langue.
**Résolution** : Refactorisation de la logique de sélection dans `TopicPage/index.tsx`. Les indices tirés au sort (`funFactIndex`, `quizIndex`, `descriptionIndex`) sont désormais stockés de manière stable dans l'état du composant via un `useEffect` se déclenchant uniquement lors du changement de sujet (`topicId` ou `topic`). Les traductions localisées sont résolues de façon réactive lors du rendu selon la langue courante sans ré-exécuter de tirage aléatoire.

---

## 🎫 Ticket #08 : Parental Gate trop simple pour les enfants de plus de 7 ans
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Sécurité / Contrôle Parental)
**Localisation** : `src/components/UI/ParentalGate.tsx`
**Description** :
Le défi mathématique a été renforcé en remplaçant l'addition simple de deux chiffres inférieurs à 10 par une multiplication à un chiffre (avec des opérandes `num1` et `num2` générés de manière aléatoire et stricte entre 2 et 9 inclusivement via `Math.floor(Math.random() * 8) + 2`). L'opération est présentée avec le symbole mathématique `×` (`challenge.num1 × challenge.num2 = ?`), offrant un niveau de protection robuste contre les enfants non autorisés tout en restant accessible pour un adulte.

---

## 🎫 Ticket #09 : Absence de i18n/localisation dans la barrière de contrôle parental
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Localisation / UX)
**Localisation** : `src/components/UI/ParentalGate.tsx`
**Description** :
La barrière parentale a été entièrement localisée en déclarant le namespace de traduction structurel `parents` dans `src/locales/types.ts`. Tous les textes descriptifs, placeholders, messages d'erreurs et actions du bouton de validation ont été traduits de façon native et complète dans les dictionnaires français (`src/locales/fr.ts`) et anglais (`src/locales/en.ts`). Le composant s'appuie désormais sur le dictionnaire de labels fourni de manière réactive par `useSettingsStore`.

---

## 🎫 Ticket #10 : Double demande de confirmation lors de la réinitialisation du profil
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Redondance)
**Localisation** : `src/pages/Parents/ParentsDashboard.tsx` & `src/store/useProgressionStore.ts`
**Description** :
L'action du store Zustand `clearBadges` a été découplée des appels d'interface graphique en supprimant le `window.confirm("Effacer toutes tes médailles ?")` codé en dur, et en lui permettant d'accepter un paramètre optionnel `profileId` pour cibler la progression d'un profil spécifique de façon synchrone et pure. Le dialogue de confirmation unique a été centralisé dans l'interface utilisateur en utilisant les chaînes de traduction localisées de manière réactive :
- Dans le Tableau de Bord Parents (`ParentsDashboard.tsx`) via `t.confirmReset(name)`.
- Dans l'album de collection de stickers (`BadgesPage.tsx`) via `labels.badges.confirmReset` pour le profil actif.

---

## 🎫 Ticket #11 : Fuite de données / Persistance de la progression des profils supprimés
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Gestion de données / Performance)
**Localisation** : `src/store/useProfileStore.ts` et `src/store/useProgressionStore.ts`
**Description** :
Lors du suppression d'un profil dans `useProfileStore.ts` (`deleteProfile`), l'action supprime l'ancien index `kp-badges-${id}`. Cependant, la progression complète est stockée dans la map `progressions` du `useProgressionStore` (persistant sous la clé `kp-progression-storage`). La clé du profil supprimé n'est jamais retirée de cette map `progressions`. Par conséquent, le localStorage grandit indéfiniment à chaque fois qu'un enfant crée puis supprime des profils. Il faut ajouter une action `deleteProfileProgression(id)` dans le store de progression pour nettoyer la map.

---

## 🎫 Ticket #12 : Crash potentiel de l'application en contexte non sécurisé (HTTP)
**Statut** : 🟢 Résolu
**Sévérité** : Critique (Compatibilité / Robustesse)
**Localisation** : `src/store/useProfileStore.ts`
**Description** :
Pour générer l'ID unique des profils, le store utilise `crypto.randomUUID()`. Bien que standard, l'API `crypto.randomUUID` n'est disponible dans les navigateurs modernes **que dans les contextes sécurisés (HTTPS ou localhost)**. Si l'application est déployée sur un serveur de test HTTP non sécurisé, ou accédée sur le réseau local via une adresse IP (ex: `http://192.168.1.50:5173`) depuis la tablette d'un enfant, `crypto` ou `crypto.randomUUID` renvoie `undefined` et l'application crashe complètement lors de la création d'un profil. Il faut ajouter une fonction de secours résiliente en cas d'absence de `randomUUID`.

---

## 🎫 Ticket #13 : Perte de l'état d'expansion des catégories lors de la navigation de retour
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Confort de navigation)
**Localisation** : `src/pages/Home/index.tsx`
**Description** :
L'état des sections de catégories affichées/repliées (`expandedCats`) est géré localement dans la `HomePage` avec un `useState`. Lorsqu'un enfant explore un sujet (ex: clique sur "Le Soleil") puis revient en arrière vers l'accueil en cliquant sur "Retour", le composant `HomePage` est démonté puis remonté. L'état local est entièrement réinitialisé : toutes les catégories se referment automatiquement, obligeant l'enfant à chercher à nouveau la section dans laquelle il se trouvait. Il faut déporter cet état dans `useDiscoveryStore` pour persister la disposition de la grille lors des allers-retours.

---

## 🎫 Ticket #14 : Absence de support tactile sur la Carte au Trésor (Drag & Pan impossible sur tablettes)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Accessibilité Mobile / UX tactile)
**Localisation** : `src/components/Game/TreasureMap.tsx`
**Description** :
Le déplacement (panning) de la carte interactive n'écoute actuellement que les événements souris (`onMouseDown`, `onMouseMove`, `onMouseUp`, `onMouseLeave`). Il n'y a aucun équivalent pour les événements tactiles (`onTouchStart`, `onTouchMove`, `onTouchEnd`). Les enfants jouant sur iPad, tablettes Android ou smartphones ne peuvent absolument pas faire défiler la carte pour voir les îles cachées hors de l'écran, bloquant ainsi toute exploration. Il faut impérativement binder les handlers tactiles sur le conteneur de la carte.

---

## 🎫 Ticket #16 : Événement de fermeture de quiz punitif dans le Mission Safari
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Logique de jeu)
**Localisation** : `src/components/Game/MissionSafari.tsx`
**Description** :
Dans le Mission Safari, si l'enfant ferme la modale/overlay du quiz en cliquant sur la croix ou en dehors de la modale (`onClose={() => handleQuizAnswer(false)}`), le jeu préserve cela comme un échec immédiat au quiz (`QUIZ_FAILURE`). L'animal s'enfuit, et le joueur perd son tour de jeu. Ce comportement est trop punitif pour les enfants. Fermer la modale devrait simplement suspendre l'état du quiz ou nécessiter une confirmation ("Voulez-vous vraiment quitter ce défi ?") pour éviter les clics accidentels destructeurs.
**Résolution** : Introduction d'un état local `showQuitConfirm` interceptant la fermeture de l'overlay de quiz. Si l'utilisateur clique sur la fermeture ou en dehors de l'overlay, un second overlay de confirmation bilingue de taille `maxWidth="500px"` s'affiche de manière non invasive pour l'enfant. S'il choisit de continuer le quiz, l'overlay de confirmation se ferme et le quiz reste actif. S'il choisit de quitter quand même, l'overlay se ferme, le quiz est annulé avec perte de l'animal rencontré, et le jeu repasse en statut actif.

---

## 🎫 Ticket #17 : Risque de blocage asynchrone des lancers de dés (Safari et Carte)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Robustesse asynchrone)
**Localisation** : `src/store/useSafariStore.ts`, `src/components/Game/MissionSafari.tsx`
**Description** :
Un mécanisme d'annulation par transaction ID (`currentRollId`) a été implémenté dans le store de jeu Safari. Chaque nouvel appel à `rollDice` ou à `reset` incrémente cet ID. Après chaque transition ou temporisation asynchrone (`await setTimeout`), l'ID de la tâche en cours est confronté à l'ID global du store, arrêtant instantanément la tâche si une désynchronisation (comme un reset ou un nouveau lancer) est détectée. De plus, un `useEffect` de nettoyage au démontage dans `MissionSafari.tsx` déclenche automatiquement `reset()` pour interrompre toutes les tâches asynchrones en cours lorsque l'utilisateur quitte le plateau de jeu.

---

## 🎫 Ticket #24 : Synthèse Vocale (TTS - Text-To-Speech) manquante pour les enfants non-lecteurs
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Accessibilité / Inclusion)
**Localisation** : `src/components/Learning/TopicDetail/index.tsx`
**Description** :
Kidpedia s'adresse aussi aux jeunes enfants (4-6 ans) qui ne savent pas encore parfaitement lire. Sans synthèse vocale, l'application leur est inaccessible en autonomie pour les textes longs (anecdotes, descriptions de fiches). Il convient d'ajouter un bouton "Haut-parleur" discret permettant de lire les textes via l'API Web Speech Synthesis native du navigateur, configurée selon la langue active du profil (`fr` ou `en`).

---

## 🎫 Ticket #29 : Écran noir ou freeze au démarrage en cas de lancement hors-ligne
**Statut** : 🟢 Résolu
**Sévérité** : Critique (Robustesse PWA / Expérience hors-ligne)
**Localisation** : `vite.config.ts`, `src/components/UI/OfflineFallback.*`, `src/components/Layout/ErrorBoundary.tsx`, `src/main.tsx`
**Description** :
Le service worker via `vite-plugin-pwa` a été reconfiguré pour pré-mettre en cache tous les fichiers d'actifs internes (`.jpg`, `.woff`, `.woff2`, etc.) et pour stocker dynamiquement les fichiers CDN Google Fonts en cache d'exécution (`runtimeCaching`).
Un écran de secours moderne et premium adapté aux enfants (`OfflineFallback`) a été développé avec une illustration animée et dynamique en SVG ainsi qu'un bouton de rechargement. Un `ErrorBoundary` global a été configuré et injecté dans `main.tsx` pour intercepter les échecs de téléchargement réseau et chunk (ChunkLoadError) lors d'une navigation hors-ligne et pour afficher de manière résiliente l'écran hors-ligne.

---

## 🎫 Ticket #32 : Absence d'indicateurs de focus clavier sur les éléments interactifs des quiz
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Accessibilité numérique)
**Localisation** : `src/components/Learning/Quiz/index.tsx`
**Description** :
Dans l'interface de quiz, les boutons de réponse n'affichent aucune bordure de focus distinctive lorsqu'ils sont sélectionnés à l'aide de la touche de tabulation (Tab) du clavier. Cela empêche les enfants en situation de handicap moteur ou visuel utilisant des dispositifs d'assistance clavier de savoir sur quel bouton ils s'apprêtent à cliquer. Il faut ajouter des styles `:focus-visible` attrayants et conformes aux normes WCAG.

---

## 🎫 Ticket #34 : Blocage du défilement dans la zone négative de la Carte interactive
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Bug Fonctionnel / UX)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `src/hooks/useMapZoom.ts`
**Description** :
Lors du zoom sur la carte interactive, si l'origine du zoom (`transform-origin`) est définie sur une coordonnée relative ou centrale, le zoom décale la carte vers le haut et la gauche en coordonnées négatives. Les navigateurs ne permettant pas le défilement horizontal ou vertical dans les coordonnées négatives (`scrollLeft < 0` ou `scrollTop < 0`), l'enfant se retrouve bloqué par un "mur virtuel" et ne peut plus explorer ou glisser (drag/pan) vers le haut et la gauche de la carte. Il faut forcer l'origine du zoom à `0 0` (top left) et compenser programmatiquement par le défilement (`scrollLeft`/`scrollTop`) du conteneur parent pour centrer la zone ciblée.

---

## 🎫 Ticket #45 : Implémentation du système "Learning Path" (Pipeline Industriel)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Amélioration UX)
**Localisation** : `src/store/useProgressionStore.ts` & `src/pages/Home/index.tsx`
**Description** :
Transformer la navigation actuelle en un parcours linéaire type "Pipeline Industriel". Chaque sujet devient une station de travail. Il faut créer un état `isCompleted` dans le store pour chaque module et ajouter une barre de progression visuelle globale. L'accès aux modules avancés sera conditionné par la validation des modules de base (faits).
**Résolution** :
- **useProgressionStore.ts** : Implémentation des sélecteurs réactifs `isCompleted(topicId)` et `isUnlocked(topicId)`. Les sujets d'une catégorie sont ordonnés séquentiellement ; l'accès au sujet suivant exige la réussite (obtention de badge) du sujet précédent.
- **TopicCard.tsx / TopicCard.module.css** : Ajout d'un overlay de cadenas interactif `🔒`, application d'un filtre CSS de grisaille (`grayscale(100%)`) et blocage des animations de survol (hover) sur les stations verrouillées.
- **Home/index.tsx** : Restriction des clics de navigation sur les cartes verrouillées.
- **Topic/index.tsx** : Sécurisation par redirection automatique du routeur vers la page d'accueil si l'URL d'un sujet bloqué est saisie directement.

---

## 🎫 Ticket #46 : Système de Validation "QC PASS" (Gamification)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Richesse UX)
**Localisation** : `src/components/Learning/Quiz/index.tsx`
**Description** :
Remplacer le feedback textuel standard par une validation visuelle gratifiante. Implémenter une fonction `validateStep()` qui déclenche une animation type "Tampon APPROUVÉ" et un signal sonore spécifique (SFX "ding") lors de la réussite du quiz. Ajouter un compteur de "Tickets réussis" dans le dashboard de l'enfant pour renforcer le sentiment d'accomplissement.
**Résolution** :
- **Compteur Global** : Ajout d'une section statistique "Tickets QC" dans le Pill Dashboard de la page d'accueil (`Home/index.tsx`) affichant l'icône de ticket `🎫` et le nombre total de badges validés.
- **Synthèse Audio Native** : Implémentation d'un synthétiseur sonore haute fidélité dans `Quiz.tsx` utilisant l'API `AudioContext` native (oscillateur sinusoïdal glissant de 1200Hz à 800Hz avec gain exponentiel) pour produire un son de clochette parfait et sans dépendances d'assets externes.
- **Tampon "QC PASS"** : Création d'un overlay de double tampon circulaire/rectangulaire `QC PASS / APPROUVÉ / APPROVED` avec des animations CSS dynamiques d'impact (frappe, rotation et rebond élastique).

---

## 🎫 Ticket #47 : Système d'ancrage visuel par "Stations" (Ancres mnémotechniques)
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Pédagogie)
**Localisation** : `src/data/topics/` & `src/components/Learning/TopicDetail/`
**Description** :
Associer une icône spécifique "absurde" ou mémorable à chaque catégorie de faits pour faciliter la mémorisation (ancrage). Faire apparaître cette icône à chaque étape du ticket d'apprentissage. Il faut modifier la structure de données des topics pour inclure cette propriété `anchorIcon`.
**Résolution** :
- **topics/types.ts** : Déclaration du champ optionnel `anchorIcon?: string` dans l'interface de données `Topic`.
- **Intégration Visuelle (TopicDetail.tsx & Topic/index.tsx)** : Affichage de l'icône de station mémorable à trois emplacements clés : à côté du grand titre du sujet, à l'intérieur du bloc d'anecdotes ("Le savais-tu ?"), et en en-tête du module Quiz (remplaçant la pièce de puzzle générique).
- **Dictionnaire de Repli (Fallback)** : Configuration d'un catalogue d'ancrages mnémotechniques par défaut pour assurer l'affichage d'icônes adaptées (ex: 🚀 pour l'Espace, 🦖 pour les Dinosaures, 🦁 pour les Animaux, 🏛️ pour l'Histoire) sur les catégories existantes.

---

## 🎫 Ticket #48 : Refactorisation de la Data Ingestion (Standardisation Ticket)
**Statut** : 🟢 Résolu
**Sévérité** : Critique (Maintenabilité)
**Localisation** : `src/data/factory.ts`
**Description** :
Uniformiser le format des données encyclopédiques pour qu'elles suivent toutes la structure `{ id, status, title, instruction, fact, quiz: { q, options, answer } }`. Créer un générateur automatique (Data Factory) pour valider la conformité des nouveaux faits ajoutés, assurant que chaque sujet possède sa structure de "Ticket Card" complète avant le déploiement.
**Résolution** :
- **factory.ts** : Création d'un générateur-validateur strict `createTopicCard(input: unknown): Topic` qui effectue des validations de schéma exhaustives (format kebab-case de l'ID, non-vacuité des objets localisés `fr` / `en`, bornes du quiz, validité des options, typage strict TypeScript sans aucun `any`).
- **dataIntegrity.test.ts** : Intégration systématique du validateur `createTopicCard` sur toutes les données de l'encyclopédie dans la suite de tests automatisée pour intercepter toute régression de structure au build.

---

## 🎫 Ticket #49 : Assistance Pédagogique (Indice "Assistance")
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Inclusion)
**Localisation** : `src/components/Learning/Quiz/index.tsx`
**Description** :
Si l'enfant échoue 3 fois le même quiz, déclencher un bouton "Assistance" (ou indice). Ce bouton doit proposer une explication simplifiée ou un rappel visuel du fait appris (au lieu de bloquer l'enfant). Cela permet de transformer l'échec en opportunité d'apprentissage sans friction.
**Résolution** :
- **Déclenchement Dynamique** : Surveillance des échecs de validation (`attempts >= 4`). Dès le 3e échec consécutif, un bouton interactif coloré "🧙‍♂️ Demander l'aide du Magicien" est affiché de façon premium.
- **Aide du Magicien** : Au clic, affichage d'un bloc de verre (glassmorphism) contenant un résumé pédagogique et un bouton de lecture vocale haute fidélité.
- **Synthèse Vocale Pédagogique** : Utilisation de l'API native `speechSynthesis` configurée dynamiquement selon la langue active du profil enfant (`fr-FR` ou `en-US`) pour lire à voix haute l'explication sans latence.

---

## 🎫 Ticket #50 : Création du Store Événementiel Saisonnier (Couche 2 : The Brain)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Infrastructure Métier)
**Localisation** : `src/store/useEnvironmentStore.ts`
**Description** : Pour alimenter dynamiquement la page du parallaxe, il faut s'assurer que le store useEnvironmentStore est capable de gérer l'état complet du monde (World State) de manière saine. Bien que la suppression de l'ancienne version ébauchée ait été actée en v3.0.10, ce nouveau besoin nécessite de réimplémenter une gestion fine et réactive des saisons pour piloter les vues.
**Critères d'Acceptation (DOD)** :
- [x] Définir un type strict Season = 'spring' | 'summer' | 'autumn' | 'winter' sans aucun usage du type any.
- [x] Implémenter l'état initial currentSeason: 'spring'.
- [x] Ajouter une action setSeason(season: Season) pour forcer un changement thématique depuis l'espace développeur ou la zone parents.
- [x] Ajouter une action triggerNextSeason() permettant de basculer cycliquement d'une saison à l'autre de manière séquentielle.
- [x] Connecter le middleware persist de Zustand sous la clé kp-environment-storage pour sauvegarder la saison préférée de l'enfant d'une session à l'autre.

---

## 🎫 Ticket #51 : Composant de Vue Multicouche LifeCirclePage.tsx (Couche 1 : The Surface)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Interface utilisateur)
**Localisation** : `src/pages/LifeCircle/LifeCirclePage.tsx` et `LifeCirclePage.module.css`
**Description** : Créer le composant de présentation principal mettant en scène le cycle de la nature à l'aide de l'effet de parallaxe CSS 3D pur (sans calculs JavaScript sur le scroll afin de préserver les performances des tablettes d'entrée de gamme).
**Critères d'Acceptation (DOD)** :
- [x] Créer une structure HTML/TSX comprenant au minimum 3 plans distincts imbriqués dans un conteneur principal configuré avec une perspective 3D (perspective: 1px et transform-style: preserve-3d).
- [x] Appliquer des translations sur l'axe Z (translateZ) et des échelles de compensation (scale) pour créer l'effet de profondeur automatique lors du défilement vertical.
- [x] Connecter la racine de la page au store useEnvironmentStore pour injecter dynamiquement une classe CSS correspondant à la saison active (.spring, .autumn, etc.).
- [x] Assurer un scroll fluide à 60 FPS en appliquant la propriété CSS will-change: transform sur les couches en mouvement.
- [x] Configurer la route /lifecircle via le système de routing principal avec chargement à la demande (Lazy Loading) pour ne pas alourdir le bundle de démarrage.

---

## 🎫 Ticket #52 : Accessibilité, Gestion Tactile et Masquage d'Occlusion (Couche 3 : The Delight)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Inclusion & Expérience Utilisateur)
**Localisation** : `src/pages/LifeCircle/` & `src/styles/`
**Description** : Sécuriser l'interactivité de la page vis-à-vis des interactions des enfants en situation de handicap, du comportement sur les tablettes tactiles (iPad/Android) et régler les conflits de collisions de clics induits par les agrandissements d'échelle (scale) des décors en arrière-plan.
**Critères d'Acceptation (DOD)** :
- [x] Accessibilité (A11y) : Encapsuler l'effet de profondeur dans une requête média @media (prefers-reduced-motion: reduce). Si l'appareil de l'enfant a cette option activée, l'effet parallaxe doit s'annuler automatiquement pour repasser sur un défilement à plat standard.
- [x] Collisions de clics : Appliquer la propriété CSS pointer-events: none sur les éléments décoratifs d'arrière-plan et de second plan (.layerBackground et .layerMidground) afin qu'ils ne bloquent pas les clics et événements tactiles destinés aux éléments interactifs placés au premier plan.
- [x] Ressources Vectorielles : Utiliser exclusivement des illustrations pures au format SVG inline injectées directement dans le DOM pour dessiner l'Arbre Sacré central et les paysages. Aucun fichier lourd .png ou .jpg ne doit être utilisé, assurant un affichage net sans flou lors du zoom et une compatibilité absolue avec l'architecture PWA hors-ligne du projet.

---

## 🎫 Ticket #53 : Raccordement du "Cercle de la Vie" aux Hotspots d'Apprentissage (Couche 4 : The Foundation)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Intégrité des données)
**Localisation** : `src/data/topics/nature.ts` ou nouveau fichier de données dédié.
**Description** : Donner du sens pédagogique au projet en connectant les éléments visuels de l'arbre à des fiches de micro-learning réelles. L'enfant doit pouvoir cliquer sur des zones précises (Hotspots) de la scène en mouvement pour ouvrir des popups de secrets ou de leçons, réutilisant le composant standardisé de ton infrastructure.
**Critères d'Acceptation (DOD)** :
- [x] Déclarer les identifiants uniques des éléments de la nature (ex: le-bourgeon, la-vieille-souche) et s'assurer qu'ils passent le validateur automatique de la suite de tests createTopicCard de ta Data Factory.
- [x] Implémenter le composant d'interaction standardisé AccessibleSvgHotspot sur des nœuds précis du SVG de l'arbre.
- [x] Assurer le blindage A11y complet de chaque hotspot : chaque zone doit supporter le focus clavier (tabindex={0}), disposer de rôles sémantiques conformes (role="button") et réagir à l'appui sur les touches Entrée et Espace.
- [x] Lier l'interaction de réussite ou de découverte de ces secrets au gain d'XP du store générique global useProgressionStore.getState().addXP().

---

## 🎫 Ticket #54 : Modularisation de la Banque de Questions Monolithique
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Maintenabilité & Architecture)
**Localisation** : `src/data/quizzes.ts` (et création de `src/data/quizzes/`)
**Description** : 
Le fichier `src/data/quizzes.ts` est devenu un monolithe de 45.7 Ko et plus de 1 400 lignes, regroupant toutes les banques de questions (`QUIZ_BANKS`) et tous les quiz simples (`QUIZZES`) de l'application. Cette centralisation excessive nuit à la lisibilité, au principe de responsabilité unique (SRP) et augmente drastiquement les risques de conflits lors des fusions de branches git. Il faut diviser cette base de données en fichiers spécialisés par thématique de manière transparente.
**Critères d'Acceptation (DOD)** :
- [x] Créer un nouveau répertoire `src/data/quizzes/` pour y accueillir les banques découpées par domaine.
- [x] Créer des fichiers de données spécialisés typés de manière stricte (ex: `space.ts`, `animals.ts`, `dinosaurs.ts`, `history.ts`, `nature.ts`, etc.) respectant la répartition par catégorie.
- [x] Créer un fichier de centralisation `src/data/quizzes/index.ts` qui regroupe, fusionne et ré-exporte `QUIZ_BANKS` et `QUIZZES` sous leurs structures initiales exactes.
- [x] Mettre à jour l'ancien point d'entrée `src/data/quizzes.ts` pour qu'il ré-exporte directement depuis `src/data/quizzes/index.ts` afin d'éviter tout changement cassant sur les composants consommateurs.
- [x] S'assurer que le compilateur TypeScript ne lève aucune erreur de typage (lancer `npm run type-check`).
- [x] S'assurer que l'intégralité de la suite de tests (Vitest) s'exécute sans aucune régression (lancer `npm run validate`).

---

## 🎫 Ticket #55 : Système d'Économie de Jeu - Attribution de Tickets par palier de Médaille
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Gamification & Économie de jeu)
**Localisation** : `src/store/useProgressionStore.ts`, `src/components/Learning/Quiz/index.tsx`, `src/pages/Home/index.tsx`, `src/components/Learning/ExplorerGallery/GiftsPage.tsx`
**Description** :
Actuellement, l'application comptabilise de manière détournée le nombre de badges obtenus (`badges.length`) comme un compteur de tickets dans le Pill Dashboard. Il n'existe pas de réelle monnaie de jeu stockée et débitable permettant d'acheter des accessoires.
Pour dynamiser l'engagement de l'enfant et introduire un système d'achat d'accessoires dans le coffre magique (`GiftsPage`), il faut implémenter une véritable gestion de solde de tickets persisté par profil, alimenté de manière gratifiante selon le palier de la médaille décrochée à la fin d'un quiz :
- **Médaille d'Or** (Performance parfaite) ➔ **3 Tickets**
- **Médaille d'Argent** (Une seule erreur) ➔ **2 Tickets**
- **Médaille de Bronze** (Plusieurs erreurs) ➔ **1 Ticket**
Les tickets ainsi cumulés formeront la monnaie d'échange nécessaire pour acheter des accessoires ou compagnons ultérieurement.
**Résolution** :
- **Règles d'Attribution de Tickets** :
  - **Médaille d'Or** (performance parfaite) : Attribution de **3 tickets** pour la bonne réponse du quiz.
  - **Médaille d'Argent** (une erreur) : Attribution de **2 tickets** pour la bonne réponse du quiz.
  - **Médaille de Bronze** (plusieurs erreurs) : Attribution de **1 ticket** pour la bonne réponse du quiz.
  - Les tickets gagnés serviront à acheter des accessoires de personnalisation ou des compagnons dans la boutique.
  - Gère correctement les mises à niveau de médailles en accordant le delta de tickets (ex. passer de Bronze à Or ajoute 2 tickets supplémentaires).
- **Gestion du Solde** :
  - Enrichissement de `ProfileProgression` dans `useProgressionStore.ts` pour stocker `tickets: number` persistant par profil.
  - Création des actions `addTickets(amount)` et `buyAccessory(accessoryId, price)` avec vérification du solde et auto-équipement immédiat.
- **Boutique Intégrée (GiftsPage)** :
  - Intégration d'un système d'achat d'accessoires standard (5 tickets), premium/couronne (15 tickets) ou de compagnons animaux (10 tickets).
  - Ajout d'une magnifique modale glassmorphic de confirmation avec gros boutons interactifs vert/rouge pour éviter les achats accidentels.
  - Effets sonores festifs et animations de confettis déclenchés en cas de succès d'achat.
- **Indicateur Dynamique** :
  - Remplacement de l'ancien compteur factice par le solde réel de tickets de l'enfant sur le tableau de bord principal.
**Critères d'Acceptation (DOD)** :
- [x] Enrichir la structure `ProfileProgression` dans `useProgressionStore.ts` pour stocker un attribut `tickets: number` persistant par profil.
- [x] Implémenter l'action `addTickets(amount: number)` et une action de débit `spendTickets(amount: number): boolean` (dans `buyAccessory`) retournant un succès ou un échec en cas de solde insuffisant.
- [x] Lors de la validation d'un quiz avec obtention d'une médaille (Or/Argent/Bronze), calculer la récompense en tickets correspondante (3, 2, ou 1) et créditer automatiquement le solde du profil.
- [x] Mettre à jour le Pill Dashboard (`Home/index.tsx`) et les autres indicateurs pour afficher le solde réel dynamique des tickets (`tickets` au lieu de `badges.length`).
- [x] Écrire les tests unitaires nécessaires dans `useProgressionStore.test.ts` pour vérifier les gains de tickets en fonction du métal de la médaille et s'assurer que le solde est débitable.
- [x] S'assurer de l'absence de toute régression technique en lançant `npm run validate`.

---

## 🎫 Ticket #59 : Débordement et surdimensionnement des éléments sur écrans mobiles haute résolution (ex: Galaxy S24 Ultra)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Expérience Utilisateur Mobile / RWD)
**Localisation** : Fichiers CSS globaux (`src/index.css`), structures de mise en page (`TopicDetail.module.css`, `Quiz.module.css`) et configuration générale du Viewport.
**Description** : 
Sur les smartphones haut de gamme à haute densité de pixels (comme le Samsung Galaxy S24 Ultra, avec un ratio d'aspect allongé et une DPR élevée), certains éléments d'interface débordent de l'écran, s'affichent de manière disproportionnée ou sont surdimensionnés. Ce problème est dû à des dimensions fixes (en `px`), à des contraintes de hauteur non adaptées aux ratios d'affichage mobiles verticaux, ou à l'absence de "clamp" sur les typographies fluides et les paddings.
**Causes Techniques Identifiées** :
1. **Typographies rigides** : Utilisation de tailles de police absolues qui ne s'adaptent pas à la largeur du viewport ou au zoom d'affichage système.
2. **Paddings et Marges fixes** : Les grands espacements rigides consomment l'espace vertical disponible, provoquant des barres de défilement ou des chevauchements d'éléments interactifs.
3. **Dimensions de grille inflexibles** : Utilisation de `grid-template-columns` sans garde-fous de wrap (`flex-wrap: wrap`) ou de limites minimales et maximales dynamiques (`minmax`).
4. **Balise Viewport rigide** : Manque d'adaptabilité du viewport lors du rendu sous les navigateurs mobiles modernes utilisant des facteurs d'échelle élevés (DPR ~3+).
**Solutions Proposées** :
1. **Typographie Fluide & Sécurisée** : Remplacer les polices de grande taille par des fonctions CSS `clamp()` (ex. `font-size: clamp(1rem, 4vw, 1.5rem)`) pour que le texte se contracte proprement sur mobile.
2. **Paddings & Marges Responsives** : Remplacer les dimensions absolues de marges et de rembourrages (padding) par des valeurs relatives (en `rem` ou via des variables CSS réactives `@media`).
3. **Garde-fous Flexbox et Grid** : S'assurer que tous les conteneurs de cartes ou d'options (`.optionsGrid`, `.quizOption`) disposent de `max-width: 100%`, `box-sizing: border-box`, et qu'aucun élément n'ait de `height` ou `width` absolue bloquante.
4. **Breakpoints Mobiles Modernes** : Introduire une clause média `@media (max-width: 480px)` affinant spécifiquement les paddings et limitant le zoom des cartes d'apprentissage sur smartphones très denses.
**Critères d'Acceptation (DOD)** :
- [x] Vérifier et adapter la balise `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />` dans `index.html`.
- [x] Remplacer les tailles de police trop imposantes des titres et des descriptions par des typographies fluides utilisant `clamp()`.
- [x] Ajuster les règles CSS de layout (`flex`, `grid`, `padding`, `margin`) sur mobile pour s'assurer que les cartes d'options de quiz et les boutons d'apprentissage tiennent entièrement dans le viewport sans forcer de défilement horizontal.
- [x] Valider le bon rendu responsive sans débordement sur les simulateurs de navigateurs mobiles (ex: Chrome DevTools, profils mobiles haute densité).

---

## 🎫 Ticket #60 : Ajustement du Header et gestion de la zone sécurisée (Safe Area Context)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Interface utilisateur cassée)
**Localisation** : src/components/Layout/Header.tsx (ou le fichier gérant le conteneur principal)
**Description** : Sur les appareils comme le S24 Ultra, le haut de l'application est en partie masqué par la barre d'état du système ou chevauche les éléments de navigation native. Il faut sanctuariser cet espace.
**Critères d'Acceptation (DOD)** :
- [x] Ajouter un conteneur utilisant les variables CSS d'environnement pour les zones sécurisées : padding-top: env(safe-area-inset-top, 16px);.
- [x] S'assurer que les icônes du haut (Cadenas, Profil, Baguette magique) conservent une marge de respiration minimale de 1rem par rapport au bord physique de l'écran.
- [x] Valider que le header reste parfaitement aligné au centre sans être tronqué sur une résolution d'écran ultra-haute (WQHD+).

---

## 🎫 Ticket #61 : Flexbox Wrap et limitation de débordement du Pill Dashboard
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Texte tronqué et CLS) 
**Localisation** : src/pages/Home/index.tsx et feuilles de styles associées (Dashboard et Carte Hero)
**Description** : Le texte principal de bienvenue passe par-dessus l'avatar en arrière-plan à cause d'une hauteur fixe ou d'un manque de contraintes de flexbox. De plus, la capsule de statistiques (Pill Dashboard) étouffe : la valeur 2% est coupée à droite.
**Critères d'Acceptation (DOD)** :
- [x] Carte Hero : Remplacer les hauteurs ou paddings fixes par des valeurs relatives (min-height, rem) et configurer le conteneur de texte pour qu'il s'adapte dynamiquement sans forcer le texte à déborder sur l'illustration de l'astronaute.
- [x] Pill Dashboard : Appliquer display: flex; flex-wrap: wrap; justify-content: space-around; sur le composant de statistiques pour s'assurer que les trophées 🏆, les tickets QC 🎫, l'XP ⚡ et le pourcentage restent entièrement visibles sur les viewports étroits.
- [x] Typographie : Utiliser des unités fluides (comme clamp()) pour les gros titres afin d'éviter le chevauchement sémantique des textes.

---

## 🎫 Ticket #62 : Défauts de conception visuelle, de mise en page (layout) et d'ergonomie sur la page d'accueil
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Ergonomie & UX/UI)
**Localisation** : `src/pages/Home/index.tsx`, `src/components/`, `src/styles/` et feuilles de styles associées.
**Description** :
Analyse des défauts de conception visuelle et d'ergonomie relevés sur la capture d'écran de l'accueil (`localhost_5173_.png`) :
1. **En-tête (Header) & Alignements** : Champ de recherche avec un texte de placeholder trop petit. Les pastilles d'icônes tactiles (profil, cadeau, sourdine, etc.) en haut à droite sont sous-dimensionnées et manquent d'espace de respiration (padding/gap), nuisant au ciblage tactile pour un enfant.
2. **Bannière Héro (Hero Banner)** : Erreur de ponctuation dans le titre principal (`"Salut ! :"`), phrase sous le titre incomplète (`"et ? ✨"`), et texte non centré verticalement.
3. **Barre de Progression & Stats** : La barre d'XP à 5% est extrêmement fine, sous-dimensionnée et le texte flottant à gauche manque de repères clairs. De légers décalages verticaux affectent l'alignement des icônes dans les pastilles de statistiques.
4. **Rupture de Grille de Navigation** : Le bouton `Mission Safari` est isolé sur une nouvelle ligne à gauche, créant un grand espace vide asymétrique par rapport aux 3 autres raccourcis de la ligne supérieure.
5. **Grille de Fiches (Cards)** :
   - Redondance visuelle des cadenas (badge cadenas en haut à droite ET icône cadenas au centre en bas des cartes bloquées).
   - Contraste insuffisant (illustrations grises sur fond bleu très foncé) rendant les images des cartes verrouillées presque invisibles.
   - Sauts visuels et hauteurs de cartes asymétriques provoqués par le wrapping des titres longs sur plusieurs lignes (ex: *"Pourquoi le ciel est bleu ?"*).
   - Boutons de pagination `"VOIR PLUS"` trop neutres, petits, de couleur sombre (austères) et peu engageants pour les enfants.
6. **Barre Latérale Droite** : La barre d'icônes verticale flotte de manière isolée avec un contraste perfectible pour certaines icônes sombres sur le fond global de l'application.
**Critères d'Acceptation (DOD)** :
- [x] Corriger l'erreur de ponctuation dans le titre de la bannière héro (`"Salut ! :"` ➔ `"Salut !"`) et finaliser la phrase tronquée.
- [x] Aligner harmonieusement les pastilles d'icônes du header en augmentant leur taille de contact tactile (minimum 44x44px) et leur espacement.
- [x] Repenser la grille de raccourcis pour équilibrer la mise en page (ex: grille symétrique 2x2 ou 4 colonnes régulières).
- [x] Améliorer la visibilité des fiches verrouillées en augmentant le contraste des illustrations et en éliminant la double présence du cadenas.
- [x] Uniformiser la hauteur des cartes et gérer l'alignement vertical homogène des textes et boutons, même en cas de titres longs.
- [x] Donner un aspect plus ludique et interactif aux boutons `"VOIR PLUS"` (couleurs plus vives, effet de survol engageant).
- [x] Augmenter la hauteur et la lisibilité de la barre d'XP et aligner parfaitement les statistiques.
- [x] Sublimer la barre latérale flottante (contraste, ombres 3D et intégration visuelle).

---

## 🎫 Ticket #R3 : Version 0.0.3 - Le Refuge des Compagnons Animés 🦄
**Statut** : 🟢 Résolu (Déployé le 22 Mai 2026)
**Sévérité** : Moyenne (Gamification / Engagement)
**Localisation** : `src/pages/Refuge/` & `src/store/useCompanionStore.ts`
**Description** :
Créer une nouvelle zone interactive appelée "Le Refuge" où l'enfant peut jouer et prendre soin de ses familiers virtuels débloqués (Bébé Dino, Petit Chien, Mini Robot). L'enfant utilise les étoiles récoltées lors des quiz pour acheter des friandises (comme des os en sucre ou des feuilles dorées), déclenchant des animations vectorielles exclusives en temps réel (le dinosaure fait un clin d'œil, le chien court chercher une balle) et des sons drôles.
**Critères d'Acceptation (DOD)** :
- [x] Créer l'interface responsive `RefugePage` accessible depuis la page d'accueil de KidPedia.
- [x] Implémenter le store `useCompanionStore` gérant le niveau d'affection des compagnons et les stocks d'objets.
- [x] Mettre en œuvre au moins 3 animations interactives interactives en SVG/CSS avec micro-animations de lueur pour chacun des trois familiers.

---

## 🎫 Ticket #R4 : Version 0.0.4 - La Baguette Magique d'Inclusion (Synthèse Vocale) 🗣️
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Accessibilité / Inclusion Jeune Âge)
**Localisation** : `src/components/Learning/TopicDetail.tsx` & `src/hooks/useReaderVoice.ts`
**Description** :
Pour les enfants de 4-6 ans qui ne savent pas encore déchiffrer couramment, la lecture des descriptions longues est un frein à l'apprentissage autonome. Il faut ajouter une fonctionnalité "Baguette de Lecture" qui lit à haute voix les paragraphes éducatifs d'un simple survol ou clic, en utilisant une voix off synthétique bienveillante via l'API Web Speech, synchronisée dynamiquement avec la langue du profil.
**Critères d'Acceptation (DOD)** :
- [x] Créer le hook `useReaderVoice` encapsulant l'initialisation de l'API de synthèse vocale avec sélection de la voix enfantine ou douce.
- [x] Intégrer un bouton flottant "Baguette Magique" (`🪄`) sur les pages de leçons interactives.
- [x] Mettre en surbrillance de couleur pastel douce (`--color-primary-light` à 30% d'opacité) le mot ou la phrase actuellement lue en temps réel.
**Résolution** :
- **useReaderVoice.ts** : Création d'un hook gérant le mode baguette magique et l'écouteur `onboundary` sur l'événement `word` de la synthèse vocale pour suivre en temps réel l'index du caractère et sa longueur, avec fallback si `charLength` n'est pas fourni.
- **TopicDetail.tsx & TopicDetail.module.css** : Intégration d'un bouton flottant `🪄` pulsant et scintillant avec ombres portées et dégradés magiques. Ajout d'un composant interne `HighlightedText` découpant et surlignant dynamiquement en temps réel les mots en cours de prononciation à l'aide d'un fond pastel animé avec un léger zoom. Configuration des gestionnaires de survol (avec debounce de 500ms) et de clic. Le pointeur change pour un curseur personnalisé `🪄` lors du survol des zones interactives en mode baguette.

---

## 🎫 Ticket #59 : Défauts visuels de conception sur le plateau Mission Safari
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Design Sensoriel & Cohérence Visuelle)
**Localisation** : `src/components/Game/MissionSafari.module.css`, `MissionSafari.tsx` et styles associés
**Description** :
L'audit visuel du mode Safari (basé sur la capture d'écran de l'interface) a révélé plusieurs défauts de conception graphique, d'alignement et de superposition qui nuisent à l'expérience ludique et haut de gamme destinée aux enfants :
1. **Lignes de débogage parasites** : Présence de barres colorées verticales (rouges, vertes, bleues) flottant anormalement dans les espaces séparant les colonnes d'hexagones.
2. **Décalage vertical et distorsion des icônes** :
   - Case 0 (Drapeau à damier) : Drapeau écrasé/déformé (aspect-ratio incorrect).
   - Case 14 (Trophée de fin) et Case 13 (Lion) : Icônes fortement décalées vers le haut, créant un grand vide inesthétique en bas de la case.
3. **Format brut et chevauchement des indicateurs de cases** :
   - Les cercles noirs de numéros de cases `(0)` à `(14)` sont bruts, superflus (utilisation de parenthèses) et chevauchent le sommet des hexagones de manière abrupte.
4. **Superposition agressive des modificateurs de score** :
   - Les badges noirs (`+2`, `-2`, `-3`, `+3`, `-5`) se superposent directement sur les icônes clés (arbre, fusée, coupe, dinosaure), masquant le dessin sous-jacent et rendant l'ensemble confus.
5. **Défauts d'UI dans le panneau de gauche et le header** :
   - Le texte `CARNET DE VOYAGE` est partiellement tronqué et chevauché par un effet visuel blanc brillant sur son flanc droit.
   - La bulle de dialogue « Nouvelle aventure ! » possède un appendice pointant vers le bas à gauche dans le vide.
   - Les éléments décoratifs (feuilles, pierres, fleurs) ont des contours d'ombres rognés de façon abrupte ou flottent de manière incohérente.
   - Le sélecteur de thème (icône soleil) dans l'en-tête est trop proche du bord supérieur et mal aligné.
**Résolution** :
Assainissement et polissage esthétique intégral du plateau :
- **Ligne de chemin SVG** : Tri par ID séquentiel (`0` à `14`) des coordonnées physiques de cases dans `calculatePath` pour un tracé fluide, éliminant les sauts diagonaux parasites.
- **Grille de Décors Épurée** : Remplacement du générateur de décors aléatoires par un tableau de coordonnées fixes pré-calculées en marges et hors de la zone de jeu pour éviter toute collision visuelle. Ajout d'ombres douces `.decorItem` dans le CSS.
- **Centrage & Z-Index** : Redéfinition des styles `.icon` en flex (`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; line-height: 1;`) pour recentrer parfaitement le Lion, le Trophée et le Drapeau à damier sans distorsion.
- **Badges de Score Cartoons** : Déplacement de `.effectBadge` (`+2`, `-3` etc.) hors du conteneur `hexContent` (qui a un `clip-path` restrictif) vers `hexWrapper`, et repositionnement en haut à droite en forme de petite bulle 3D circulaire contrastée.
- **Bulle de Dialogue Compagnon** : Intégration de l'icône animée du compagnon équipé (ou émoji `🦁` par défaut) à gauche de la boîte de dialogue, et réorientation de l'appendice de la bulle (`::after`) vers la gauche (vers sa tête) pour éliminer le pointage dans le vide.
- **Cartes de Panneau Latéral** : Structure complète des classes `.statsCard` et `.controlsCard` avec la charte graphique premium de verre dépoli (`glassmorphic`) de l'application.
- **Carnet de Voyage** : Sécurisation de la largeur et du style textuel de `.journalTitle` avec `white-space: nowrap; text-overflow: ellipsis; overflow: hidden;` pour empêcher les chevauchements et troncages.
- **Sélecteur de Thème** : Centrage vertical parfait de `.ThemeToggle` par ajout d'un `align-items: center` sur `.rightSection` dans `PageHeader.module.css`.

---

## 🎫 Ticket #15 : Sauts visuels et positionnement erratique lors du zoom sur mobile
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Ergonomie / UX tactile)
**Localisation** : `src/hooks/useMapZoom.ts` et `src/components/Game/TreasureMap.tsx`
**Description** :
La fonction `handleZoomAt` calcule l'origine du zoom en pourcentage par rapport au conteneur cible. Lors d'un double-clic ou d'un double-tap sur mobile, ce calcul provoque parfois un décalage brutal et désagréable de la caméra, car les coordonnées absolues ne prennent pas en compte le scroll actuel du conteneur parent (`scrollLeft`, `scrollTop`). Le zoom devrait recentrer élégamment la vue sur les coordonnées du tap de l'enfant sans sauts brusques.
**Résolution** : Suppression complète des sauts visuels et du clamping par synchronisation asynchrone du layout :
1. **Deferred Scroll via `requestAnimationFrame`** : Remplacement de l'assignation synchrone du scroll dans `useLayoutEffect` par une exécution différée dans `requestAnimationFrame`. Cela permet au navigateur d'effectuer la mise à l'échelle CSS (`transform: scale(zoom)`) et d'actualiser complètement les limites géométriques réelles de défilement (`scrollWidth`, `scrollHeight`) du conteneur parent avant de définir les positions horizontales et verticales du scroll, éliminant tout blocage/clamping.
2. **Recentrage et Panning Fluide** : Recentrage précis des coordonnées de clic/tap au milieu de l'écran en tenant compte de l'échelle cible de zoom. Utilisation de la méthode native `.scrollTo({ left, top, behavior: 'smooth' })` pour assurer une transition de déplacement fluide et agréable de la caméra vers le point ciblé.
3. **Sécurité de Test (JSDOM)** : Intégration de gardes de type de détection de support (`typeof container.scrollTo === 'function'`) afin de garantir une rétrocompatibilité parfaite avec les environnements de test headless et JSDOM (qui n'implémentent pas `.scrollTo` nativement) sans aucun plantage.
4. **Intégrité unitaire** : Préservation et passage au vert complet de la suite de tests existante (`TreasureMap.test.tsx`).

---

## 🎫 Ticket #18 : Système de scoring d'XP linéaire et dévaluant pour le mode parfait
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Gamification / Pédagogie)
**Localisation** : `src/store/useProgressionStore.ts`
**Description** :
Les médailles d'or, d'argent et de bronze rapportent respectivement 1000, 500 et 250 XP. C'est un bon début, mais réussir un quiz du premier coup (médaille d'or) ne donne aucun bonus spécial de fierté ou d'encouragement visuel/audio distinct par rapport à un succès laborieux après 3 essais. Il faudrait créer un effet visuel "Parfait !" (Perfect) et attribuer un bonus d'XP ou un multiplicateur de score pour motiver l'enfant à réviser la fiche avant de se lancer.
**Résolution** : Implémentation du système de récompense "Mode Parfait" (Perfect) :
1. **Perfect XP Bonus (+500 XP)** : Attribution automatique d'un bonus d'XP pour chaque médaille d'or obtenue (qui correspond par définition à une réussite au premier essai du quiz). Une médaille d'or rapporte désormais `1000 XP (base) + 500 XP (Perfect Bonus) = 1500 XP`, créant une distinction forte et valorisante de progression.
2. **Fanfare Cristalline native (Web Audio API)** : Création d'une fonction de synthèse `playSynthesizedPerfectFanfare()` jouant un arpeggio ascendant majeur de 4 notes aiguës et cristallines (`C6`, `E6`, `G6`, `C7`) à intervalles de `80ms` sur la médaille d'or, contrastant magnifiquement avec le son simple de médaille d'argent et de bronze.
3. **Ruban Cartoons oblique `.perfectBanner`** : Affichage d'un bandeau jaune/orange et or oblique incliné à `-15deg` en relief 3D cartoons au sommet du panneau de résultats, animé d'une pulsation dimensionnelle et d'un halo lumineux doux (`pulseRibbon` keyframes).
4. **Validation unitaire** : Ajustement de la suite de tests unitaires existante de progression (`useProgressionStore.test.ts`) et ajout d'un test spécifique d'affichage dans `Quiz.test.tsx` pour sécuriser l'intégrité de la base de code.

---

## 🎫 Ticket #19 : Mutual-Exclusion défaillante entre FunFacts (Anecdotes) et Quiz
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Pédagogie / Richesse de contenu)
**Localisation** : `src/pages/Topic/index.tsx`
**Description** :
Même s'il existe une logique d'exclusion mutuelle basique (Ticket #04), le code actuel tire au sort séparément l'anecdote de manière aléatoire (`Math.random()`) et la question du quiz dans la banque de questions. Il arrive encore trop souvent que l'anecdote "Le savais-tu ?" et la question du quiz traitent exactement du même fait dans la même vue (ex: l'anecdote mentionne la température du noyau solaire et le quiz demande "Quelle est la température au cœur du Soleil ?"). Il faut mettre en œuvre un algorithme d'exclusion sémantique plus strict.
**Résolution** : Implémentation d'un algorithme de filtrage sémantique hybride avancé dans `isSpoiler` :
1. **Normalisation de texte** : Nettoyage diacritique et ponctuel complet (accent-agnostique et insensible à la casse).
2. **Filtrage des stop words** : Dictionnaire bilingue (fr/en) filtrant les mots grammaticaux triviaux.
3. **Exclusion thématique du sujet** : Filtrage automatique du nom de la fiche active (ex: "Soleil", "Sun") pour éviter les impasses et blocages.
4. **Collision de nombres globale** : Extraction de tous les nombres de 2 chiffres ou plus présents dans l'ensemble du quiz (question + toutes les options) et rejet si présents dans l'anecdote.
5. **Intersection de mots-clés significatifs** : Rejet systématique si l'anecdote partage 2 mots significatifs ou plus avec le quiz (question + toutes les options).
6. **Robustesse unitaire** : Ajout de 4 scénarios de test exhaustifs dans `TopicPage.test.tsx` validant l'exclusion.

---

## 🎫 Ticket #20 : Absence de variété dans les descriptions introductives des sujets
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Pédagogie / Ré-engagement)
**Localisation** : `src/data/topics/` (ex: `space.ts`, `nature.ts`, etc.)
**Description** :
Les fiches des sujets (comme Le Soleil, La Terre, etc.) contiennent un champ unique `fullContent` pour présenter le concept. Dès la deuxième visite, l'enfant relit exactement le même texte textuellement. Pour dynamiser l'apprentissage, il faudrait structurer la base de données de sujets pour accepter un tableau de variations textuelles (`fullContents` ou `paragraphs`) adaptées à différents niveaux d'âge (ex: simplifiée pour les 4-6 ans, détaillée pour les 7-10 ans).
**Résolution** : Déploiement d'une Preuve de Concept (PoC) verticale de variabilité de contenu dans la catégorie **Nature** :
1. **Enrichissement de Les Arbres (`arbres`)** : Ajout du tableau de variations bilingues `fullContents` (3 variations graduelles décrivant le rôle d'absorption du gaz carbonique, la communication souterraine et le rôle de refuge pour la faune) et `funFacts` (3 anecdotes).
2. **Enrichissement de Le Volcan (`volcan`)** : Ajout du tableau de variations bilingues `fullContents` (3 variations décrivant la structure en cheminée, le magma sous pression et les éruptions formant des îles) et `funFacts` (3 anecdotes, dont les volcans sous-marins et Olympus Mons).
3. **Fallback Transparent Rétrocompatible** : Préservation du comportement par défaut de l'application qui retombe sur `fullContent` et `funFact` uniques si les tableaux de variations sont absents, évitant toute rupture ou duplication obligatoire.
4. **Validation par tests unitaires** : Ajout de 2 nouveaux tests unitaires dans `TopicPage.test.tsx` garantissant la sélection stable de la variation correspondante à l'indice et le repli sans plantage sur les sujets sans variations (ex. `pluie`).

---

## 🎫 Ticket #21 : MuteToggle asynchrone provoquant des instanciations audio en doublon
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Performance / Fuite mémoire)
**Localisation** : `src/hooks/useAudioFeedback.ts` & `src/components/UI/MuteToggle.tsx`
**Description** :
Lorsque l'utilisateur clique rapidement sur le bouton de sourdine (Mute) à plusieurs reprises, les requêtes audio en cours d'initialisation côté navigateur (`new Audio()`) ne sont pas annulées. Elles continuent de charger les ressources réseau en parallèle. De plus, sous certaines conditions de latence, les sons peuvent se superposer de façon cacophonique même si le mode "Mute" est actif. Il faut mettre en place un gestionnaire d'instances audio unique et thread-safe.
**Résolution** : Implémentation d'une architecture singleton audio et abonnement réactif :
1. **Audio Singleton** : Migration de l'instance locale `HTMLAudioElement` vers un singleton partagé au niveau du module dans `useAudioFeedback.ts`. Les appels successifs coupent et réutilisent automatiquement la même instance, annulant les requêtes réseau et lectures précédentes.
2. **Abonnement Zustand Global** : Utilisation de `useSettingsStore.subscribe` pour surveiller l'état de sourdine et arrêter instantanément la lecture si la sourdine est activée.
3. **Sécurité & Robustesse** : Intégration de garde-fous de type (`typeof useSettingsStore.subscribe === 'function'`) garantissant la compatibilité totale avec les tests mockés.
4. **Validation Unitaire** : Création de `useAudioFeedback.test.ts` validant 100% des scénarios de lecture, réutilisation et sourdine.

---

## 🎫 Ticket #27 : Saut de mise en page (CLS - Cumulative Layout Shift) dans le Carousel Hero
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Performance Web Vitals)
**Localisation** : `src/components/Discovery/HeroCarousel.tsx`
**Description** :
Les images haute résolution du carrousel de la page d'accueil se chargent de manière asynchrone. Au chargement initial, le conteneur du carrousel n'a pas de hauteur minimale explicite définie en CSS, ce qui provoque un effondrement de la zone puis un décalage soudain de toute la page vers le bas une fois l'image chargée. Ce saut visuel dégrade l'indicateur LCP et CLS. Il faut appliquer un ratio hauteur/largeur fixe (aspect-ratio) et une couleur de fond de secours ou un skeleton loader.
**Résolution** : Éradication complète du CLS grâce à une stabilité dimensionnelle stricte et un loader visuel :
1. **Aspect-Ratio Responsive** : Définition de rapports d'aspect mathématiques fixes (`aspect-ratio: 16 / 7` sur ordinateur et `16 / 10` sur tablette/mobile) sur `.heroContainer` couplés à des hauteurs maximales strictes. L'espace du carrousel est entièrement réservé dans le flux de la page avant le chargement des images.
2. **Skeleton Shimmer Loader** : Passage d'un squelette de chargement shimmer animé haut de gamme (`.skeleton`) comme prop `loader` aux éléments `AppImage` de fond, offrant un rendu progressif, sans saut et très élégant.
3. **Fond Sombre Premium** : Remplacement du fond noir uni (`#000`) par un fond thématique sombre premium `#0c101b` en accord avec la charte graphique nuit.

---

## 🎫 Ticket #28 : Imports non utilisés et sélecteurs de style orphelins (Dead Code / CSS Pruning)
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Performance / Propreté du code)
**Localisation** : Fichiers CSS et TSX multiples (ex: `App.module.css`, `ParentsDashboard.module.css`)
**Description** :
L'audit du projet reveals la présence de classes CSS inutilisées et de variables CSS déclarées mais jamais lues. Ces éléments encombrent les fichiers sources et augmentent inutilement la taille du bundle CSS final de production. Un nettoyage rigoureux des classes CSS orphelines et l'activation de règles d'analyse statique strictes sont recommandés.
**Résolution** : Nettoyage et synchronisation complète effectués :
1. **App.tsx & App.module.css** : Remplacement de la référence à la classe indéfinie `styles.errorContainer` par `styles.notFoundContainer`, et utilisation de `styles.notFoundTitle` sur le titre d'erreur. Toutes les classes de `App.module.css` sont désormais utilisées à 100%.
2. **ParentsDashboard.module.css** : Ajout et définition de la classe `.profileInfo` qui était référencée dans le composant TSX mais absente de la feuille de style.
3. **Topic/index.tsx** : Nettoyage d'une directive d'inhibition linter inutilisée (`// eslint-disable-next-line react-refresh/only-export-components`), supprimant la dernière alerte ESLint active du projet.

---

## 🎫 Ticket #30 : Lenteur de désérialisation du Zustand Store pour les profils volumineux
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Performance technique)
**Localisation** : `src/store/useProgressionStore.ts`
**Description** :
Le store de progression stocke l'intégralité des médailles et badges de tous les profils dans le localStorage sous forme de chaîne de caractères JSON. Si un foyer possède de nombreux profils avec des progressions très avancées (des centaines de badges cumulés), la désérialisation synchrone du localStorage lors du démarrage de l'application bloque le thread principal de rendu pendant plusieurs dizaines de millisecondes, créant un micro-freeze perceptible à l'écran. Il faut envisager un chargement asynchrone, un partitionnement par profil ou une compression légère des données de stockage.
**Résolution** : Résolution du micro-freeze par intégration d'une compression dictionnaire key-shortening ultra-rapide et rétrocompatible :
1. **Compression Dictionnaire** : Définition des méthodes de sérialisation `compressState` et `decompressState` raccourcissant toutes les clés du JSON persisté (ex: `badges` ➔ `b`, `medal` ➔ `m`, `totalXP` ➔ `x`, etc.). Cela réduit la taille du payload stringifié de plus de **60%**, accélérant considérablement le parsing synchrone.
2. **Rétrocompatibilité Transparente** : Détectant intelligemment les formats de stockage legacy non compressés au démarrage, garantissant une migration fluide sans aucune perte de progression pour l'utilisateur.
3. **Moteur Customisé Zustand** : Création de `customStateStorage` implémentant l'interface `StateStorage` de Zustand afin de compresser/décompresser en temps réel lors des accès de persistance.
4. **Validation Unitaires Riches** : Ajout de tests unitaires validant l'écriture compressée sous clés courtes et le chargement transparent des structures de données legacy.

---

## 🎫 Ticket #31 : Variables de couleurs CSS codées en dur dans les grilles vectorielles d'Origins
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Maintenabilité / Richesse visuelle)
**Localisation** : `src/pages/Origins/OriginsLayout.tsx` et `OriginsDetail.tsx`
**Description** :
Les dégradés SVG (`<linearGradient>`) utilisés pour dessiner le tracé de la frise chronologique sont définis avec des couleurs hexadécimales brutes codées en dur (ex: `#ef4444`, `#0369a1`). Lorsque l'utilisateur bascule entre le mode sombre et le mode clair, ces couleurs restent identiques et perdent en contraste ou en harmonie visuelle. Il faut remplacer ces couleurs en dur par des variables CSS dynamiques (ex: `var(--color-origins-marine-start)`) déclarées dans la feuille de styles générale.
**Résolution** : Remplacement intégral des couleurs statiques par des variables dynamiques adaptatives au thème :
1. **Création du dictionnaire de dégradés (`vars.css`)** : Définition de 24 nouvelles variables CSS (`--color-origins-snake-0` etc.) dans `:root` mappées sur les couleurs d'origine.
2. **Surcharges de Contraste Mode Sombre** : Définition de valeurs de substitution dans le bloc `html[data-theme='dark']` pour toutes les variables, remplaçant les teintes trop sombres (comme le bleu nuit `#0f172a` et les bruns) par des dégradés néon/vibrants (indigo électrique, rose, cyan vibrant, émeraude), évitant la disparition visuelle du tracé et rehaussant l'harmonie.
3. **Liaison SVG réactive (`OriginsLayout.tsx`)** : Remplacement des attributs statiques `stopColor` des 9 balises de dégradés `<linearGradient>` par les variables `var(--color-origins-...)`, permettant un changement de style instantané et sans coût de rendu.

---

## 🎫 Ticket #33 : Zone de recherche vide sans chemin de repli (No-Results Dead End)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Ergonomie)
**Localisation** : `src/pages/Home/index.tsx`
**Description** :
Si un enfant tape une recherche farfelue qui ne correspond à aucun sujet, l'écran affiche une illustration avec "Aucun résultat". Cependant, aucun bouton d'aide ou suggestion de recherche populaire n'est proposé pour relancer l'expérience. L'enfant se retrouve face à un mur. Il faudrait ajouter une section "Essayez de rechercher..." avec des étiquettes cliquables de sujets phares (ex: "Le Soleil", "Les Dinosaures", "Les Lions") pour encourager la reprise de l'exploration sans friction.
**Résolution** : Conception technique et intégration d'une section interactive de suggestions populaires :
1. **Dictionnaire Localisé de Suggestions** : Définition des traductions `trySearching` ("Essaie de rechercher :" / "Try searching:") et `popularSuggestions` (comprenant les sujets populaires les plus consultés comme le Soleil, les Dinosaures, le Lion, le Volcan et l'Espace) dans `fr.ts` et `en.ts`.
2. **Pill-Buttons Cartoons 3D** : Ajout de styles esthétiques dans `Home.module.css` simulant un bouton physique 3D cartoons. L'ombre 3D s'enfonce à l'activation (`:active`) pour un retour tactile ultra satisfaisant.
3. **Optimisation responsive et Thème Sombre** : Alignement fluide en flex-wrap et redéfinition des contrastes des bordures et ombres dans les surcharges `.dark` pour offrir une harmonie visuelle de jour comme de nuit.
4. **Test d'Intégration Complet** : Écriture d'un test d'intégration dans `App.test.tsx` couvrant la saisie sans résultat, l'apparition des étiquettes, le clic de suggestion, la mise à jour automatique de la barre de recherche et le filtrage réactif du store Zustand.

---

## 🎫 Ticket #35 : Dimensionnement dynamique des marqueurs de la Carte interactive (Overlapping lors du zoom)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (UX / Lisibilité)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `TreasureMap.module.css`
**Description** :
Lorsqu'un zoom avant est effectué sur la carte, les marqueurs de points d'intérêt (boutons d'îles/sujets) grandissent proportionnellement avec le zoom visuel CSS (`transform: scale(zoom)`). Par conséquent, à zoom élevé (ex: x3), les émojis et les étoiles de médailles deviennent gigantesques, s'empilent, se chevauchent et cachent complètement les détails de la carte environnante. Il faut appliquer un facteur d'échelle inverse (`scale(1 / zoom)`) sur les marqueurs individuels afin qu'ils conservent une taille visuelle propre, constante et lisible quel que soit le niveau de zoom.
**Résolution** : Implémentation d'une compensation d'échelle inverse et écriture de tests de non-régression :
1. **Facteur d'Échelle Inverse Réactif** : Raccordement du composant mémoisé `MapPoint` au niveau de `zoom` du hook `useMapZoom()`, et application dynamique du style inline `transform: translate(-50%, -50%) scale(${1 / zoom})`. Les marqueurs conservent une dimension physique stable à l'écran quel que soit le grossissement.
2. **Robustesse unitaire** : Ajout d'un test dédié dans `TreasureMap.test.tsx` (`applique un facteur d'échelle inverse sur les marqueurs selon le niveau de zoom`) vérifiant formellement l'application des échelles `scale(1)` puis `scale(0.5)` à zoom `x2`.

---

## 🎫 Ticket #36 : Liaison et Quizz pour les sous-nœuds du Big Bang (Origines h1)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/bigBang.ts` / Navigation
**Description** :
À l'exception de « La Singularité » (`bb1`) et « La Terre » (`bb9`), les nœuds intermédiaires (`bb2` à `bb8` : *Soupe de Particules*, *Naissance des Atomes*, *Expansion*, *Premières Étoiles*, etc.) n'ont pas de `topicId`. Il faut concevoir des sujets correspondants dans `space.ts`, des quiz d'intégrité associés, et les lier afin que toute la frise du Big Bang soit interactive et éducative.
**Résolution** : Liaison complète et intégration interactive des 7 sous-nœuds de la frise du Big Bang :
1. **Redirection de Navigation (`bigBang.ts`)** : Association réussie de chaque nœud intermédiaire (`bb2` à `bb8`) à son identifiant de sujet unique (`soupe-particules`, `naissance-atomes`, `expansion`, `premieres-etoiles`, `premieres-galaxies`, `voie-lactee`, `systeme-solaire`), éliminant tous les culs-de-sac de lecture et de quiz.
2. **Contenu Encyclopédique (`topics/space.ts`)** : Création et insertion des 7 fiches de sujets bilingues détaillées et hautement pédagogiques adaptées aux 4-8 ans, comprenant des descriptions courtes, des variations de paragraphes éducatifs complets (`fullContent` / `fullContents`) et des anecdotes rigolotes (`funFact` / `funFacts`) en français et en anglais.
3. **Banque de Quizz (`quizzes/space.ts`)** : Déclaration des 7 nouveaux quiz interactifs et stimulants dans le dictionnaire global `QUIZZES` avec des questions bilingues adaptées aux enfants, des choix multiples soignés et des indices localisés interactifs (`hint`).
4. **Intégrité unitaire renforcée (`dataIntegrity.test.ts`)** : Validation automatique par tests unitaires de la non-régression de l'intégrité de la base de données, assurant qu'aucun sujet ou quiz n'est orphelin et que tous les identifiants respectent le format strict kebab-case et le typage dynamique TS.

---

## 🎫 Ticket #56 : Composant de Carte Parallaxe Dynamique (The Delight)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/components/Discovery/ParallaxTopicCard.tsx`
**Description** :
Transformer les cartes de navigation statiques du "Grand Voyage du Temps" en cartes interactives à effet de parallaxe "léger" pour attirer le regard des enfants sans les distraire de la lecture.
**Critères d'Acceptation (DOD)** :
- [x] Créer un composant ParallaxTopicCard qui utilise onMouseMove (ou onPointerMove) pour incliner légèrement la carte vers le curseur (effet de tilt 3D).
- [x] Appliquer transform-style: preserve-3d sur la carte et une perspective sur le conteneur parent.
- [x] Limiter l'inclinaison maximale (ex: rotateY(10deg)) pour éviter l'effet de nausée, conformément aux standards A11y.
- [x] Ajouter une ombre portée (box-shadow) qui se déplace de manière dynamique selon l'inclinaison pour renforcer l'aspect "objet 3D".
**Résolution** : Création du nouveau composant `ParallaxTopicCard` et de ses styles `ParallaxTopicCard.module.css` :
1. **Comportement 3D** : Capture et normalisation des événements de pointeur (`onPointerMove`) pour appliquer en temps réel un tilt 3D limité à 8 degrés (pour éviter le mal des transports/nausée) et une translation tridimensionnelle des couches (Textes au premier plan $Z = 15px$, illustrations décoratives repoussées en arrière-plan $Z = -10px$).
2. **Ombre tridimensionnelle physique** : Déplacement interactif de l'ombre portée (box-shadow) à l'opposé du tilt pour simuler une source de lumière virtuelle dynamique.
3. **Réinitialisation & Amorti** : Retour fluide à plat lors de la sortie du curseur (`onPointerLeave`) via une transition cubic-bezier.
4. **Intégration d'accueil** : Remplacement de `TopicCard` sur la page d'accueil avec préservation de 100% de la compatibilité des tests d'intégration existants.

---

## 🎫 Ticket #57 : Gestion des "Hotspots" de lecture sur carte (The Foundation)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/components/Discovery/ParallaxTopicCard.tsx`
**Description** :
S'assurer que l'effet de parallaxe ne gêne pas l'accès aux fiches pédagogiques (le contenu principal de la frise chronologique).
**Critères d'Acceptation (DOD)** :
- [x] Assurer que la zone de texte (le titre du sujet) reste fixe sur le plan Z=0 (premier plan) alors que les illustrations décoratives bougent en arrière-plan (effet de parallaxe différencié).
- [x] Appliquer pointer-events: none sur les éléments décoratifs pour que seuls les hotspots d'apprentissage capturent les clics.
- [x] Tester la navigation clavier : la carte doit rester accessible via la touche Tab et Entrée même avec les transformations CSS activées.
**Résolution** : Optimisation de l'alignement 3D et du focus clavier :
1. **Texte stable à Z=0** : Ajustement de `.foreGround` à `transform: translateZ(0px)` et de `.categoryLabel` à `translateZ(0px)` pour fixer les textes éducatifs sur le plan neutre de la carte, garantissant une lisibilité optimale et sans distorsion.
2. **Profondeur d'arrière-plan accentuée** : Ajustement de `.backGround` à `transform: translateZ(-15px)` pour accentuer la sensation tridimensionnelle de la parallaxe.
3. **Pointeurs & Clics sécurisés** : Toutes les couches internes décoratives disposent de `pointer-events: none` pour s'assurer que seul le bouton racine interactif capture le clic physique du hotspot.
4. **Indicateur de focus clavier unifié** : Remplacement de l'outline du bouton interne par un indicateur de focus externe de `4px` et une lueur douce de couleur primaire entourant la *carte entière* via le sélecteur `:has` et `:focus-within` en fallback, améliorant grandement l'accessibilité.

---

## 🎫 Ticket #58 : Optimisation "Kid-Friendly" et Performance (The Brain)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée
**Localisation** : `src/components/Discovery/ParallaxTopicCard.tsx`
**Description** :
Optimiser l'animation pour les tablettes d'entrée de gamme afin de garantir un 60 FPS constant, même avec plusieurs cartes à l'écran.
**Critères d'Acceptation (DOD)** :
- [x] Utiliser will-change: transform sur toutes les cartes parallaxe pour forcer l'accélération matérielle (GPU).
- [x] Implémenter une vérification de la préférence utilisateur prefers-reduced-motion : si le système demande moins de mouvements, les cartes redeviennent fixes et plates.
- [x] Définir une limite de "cartes actives" : seules les cartes dans le viewport doivent calculer leur parallaxe.
- [x] S'assurer que le calcul des coordonnées de souris est nettoyé (cleanup) lors du démontage du composant pour éviter toute fuite de mémoire.
**Résolution** : Optimisations de performances intelligentes et robustes pour tablettes :
1. **Limitation Viewport (IntersectionObserver)** : Intégration de l'API native `IntersectionObserver` dans `ParallaxTopicCard.tsx` pour n'exécuter les calculs 3D complexes d'inclinaison sur `onPointerMove` que si la carte est visible à l'écran (`isInViewport`), réduisant la consommation de CPU synchrone à zéro pour les cartes cachées.
2. **Support prefers-reduced-motion** : Écoute dynamique via `matchMedia` pour désactiver instantanément l'animation et l'inclinaison si l'économie de mouvement est activée. Ajout d'une media query CSS `@media (prefers-reduced-motion: reduce)` qui fige les cartes et libère les calculs.
3. **Hardware Acceleration (GPU)** : Application de la directive `will-change: transform` dans `.parallaxCard` CSS, invitant le navigateur à allouer des calques composites matériels indépendants en amont pour un scrolling fluide de la grille.
4. **Memory Leak Cleanup** : Nettoyage systématique de l'observer (`observer.disconnect()`) lors du démontage du composant, empêchant toute fuite mémoire.

---

## 🎫 Ticket #63 : Fuite de données / Persistance de la progression des compagnons des profils supprimés
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Gestion de données / localStorage)
**Localisation** : `src/store/useProfileStore.ts` & `src/store/useCompanionStore.ts`
**Description** :
Lors du suppression d'un profil dans `useProfileStore.ts` (`deleteProfile`), l'action appelle `useProgressionStore.getState().deleteProfileProgression(id)` pour nettoyer les données de progression. Cependant, les données de compagnons stockées dans la map `profileData` de `useCompanionStore` (persistantes sous la clé `kp-companion-storage`) ne sont jamais nettoyées ni supprimées. Par conséquent, les données de compagnons orphelins restent indéfiniment dans le `localStorage` de l'appareil à chaque création et suppression de profil, créant une fuite de données. Il faut chaîner la suppression des données du refuge au processus de suppression du profil.
**Critères d'Acceptation (DOD)** :
- [x] Mettre à jour l'action `deleteProfile` dans `src/store/useProfileStore.ts` pour appeler explicitement `useCompanionStore.getState().deleteProfileCompanionData(id)`.
- [x] Écrire un test unitaire dans `useProfileStore.test.ts` (ou équivalent) pour s'assurer que la suppression du profil supprime effectivement les compagnons liés de l'état persistant.
- [x] S'assurer de la conformité du typage et de la suite de validation (`npm run type-check`).
**Résolution** : Importé `useCompanionStore` dans `useProfileStore.ts` et mis à jour l'action `deleteProfile` pour coordonner la suppression en appelant explicitement `useCompanionStore.getState().deleteProfileCompanionData(id)`. Ajouté un test d'intégration unitaire robuste dans `useProfileStore.test.ts` vérifiant que l'appel d'orchestration est correctement déclenché, tout en maintenant l'isolation de test dans `beforeEach`.

---

## 🎫 Ticket #69 : Triplication/Duplication intempestive de l'article "Super Pile" dans le Magasin de Friandises
**Statut** : 🟢 Clôturé (Faux Positif)
**Sévérité** : Élevée (Rendu UI / Cohérence des Données)
**Localisation** : `src/pages/Refuge/RefugePage.tsx` & `src/store/useCompanionStore.ts`
**Description** :
Dans le Magasin de Friandises, l'article "Super Pile" destiné au Robot apparaît trois fois de suite de façon identique, avec un badge vert et des bordures vertes distinctes, alors qu'il ne devrait s'afficher qu'une seule fois à l'instar des autres friandises (Os en sucre, Feuille dorée). Cette duplication encombre l'interface mobile et témoigne d'un problème dans le rendu ou la boucle d'itération.
**Critères d'Acceptation (DOD)** :
- [x] Analyser le mécanisme d'itération dans `RefugePage.tsx` (boucle `.map`) et la structure du store Zustand `useCompanionStore` pour comprendre d'où proviennent ces éléments dupliqués.
- [x] Garantir que chaque type d'accessoire/friandise n'est affiché qu'une seule fois dans la liste des articles de la boutique.
- [x] Corriger l'affichage visuel (supprimer les bordures vertes anormales sur les doublons) et s'assurer que la boutique présente uniquement les trois friandises distinctes (Chien, Dino, Robot).
**Résolution** : **Clôturé comme Faux Positif**. L'analyse complète du code source de l'application a révélé qu'aucune boucle de rendu ou état du store ne duplique l'article "Super Pile" dans le Magasin de Friandises. La structure de rendu s'appuie sur `Object.keys(companionInfo)` qui contient exactement trois clés uniques.
La triplication observée sur la capture d'écran est due à un **artefact d'assemblage (stitching)** de l'outil de capture d'écran étendu (scroll-capture) du Samsung Galaxy S24 Ultra utilisé lors du signalement. L'assemblage a mal géré le défilement et a répété la zone centrale ainsi que le footer (lequel est également tronqué et dupliqué à deux reprises en bas de l'image originale).
Aucune modification du code source de la boutique n'était requise pour ce point, les données et l'UI étant saines et rigoureuses.

---

## 🎫 Ticket #65 : Non-respect de la sourdine globale (isMuted) dans Le Refuge des Animaux
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Accessibilité Sensorielle / Tranquillité Parentale)
**Localisation** : `src/pages/Refuge/RefugePage.tsx`
**Description** :
Le Refuge des Animaux propose des effets sonores synthétisés interactifs (actions de caresse "pet", alimentation "feed", achat "buy" et erreurs "error") générés dynamiquement par l'API Web Audio native. Cependant, la fonction locale `playSound` dans `RefugePage.tsx` ne lit pas et n'applique pas l'état `isMuted` du store global `useSettingsStore`. Par conséquent, l'application continue de diffuser des bips et des signaux sonores dans le Refuge même si l'application est en mode sourdine, causant des nuisances sonores pour les parents.
**Critères d'Acceptation (DOD)** :
- [x] Importer et lire la variable réactive `isMuted` de `useSettingsStore` à l'intérieur de `RefugePage.tsx`.
- [x] Dans la fonction `playSound` du refuge, ajouter un garde-fou au début : si `isMuted` est à `true`, interrompre immédiatement l'exécution pour garantir le silence absolu.
- [x] Vérifier que l'activation de la sourdine dans le header désactive instantanément toutes les interactions sonores du refuge.
**Résolution** : Destructuré `isMuted` depuis `useSettingsStore` dans `RefugePage.tsx` pour en faire une variable réactive de l'état du composant. Ajouté une instruction de garde-fou `if (isMuted) return;` au début de la fonction locale `playSound` générant les sons Web Audio. Ainsi, tous les effets sonores synthétisés interactifs (caresse, alimentation, boutique, erreur) respectent rigoureusement la sourdine générale du système en se coupant de façon instantanée.

---

## 🎫 Ticket #05 : Absence d'effets sonores (Fichiers manquants ou commentés)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Richesse UX)
**Localisation** : `src/hooks/useAudioFeedback.ts`
**Description** :
Les effets sonores de base (clics, applaudissements de succès, erreurs, sonneries de médaille) sont actuellement muets dans l'application. Le hook `useAudioFeedback` a sa configuration d'assets commentée et produit des alertes de debug console indiquant *"Feedback visuel uniquement"*. Il faut réactiver et mapper une banque d'assets audio de qualité.
**Résolution** : Transtypage sécurisé de l'objet `window` dans `useAudioFeedback.ts` pour accéder de manière sécurisée et typée à `webkitAudioContext` sans enfreindre la règle strict linter `@typescript-eslint/no-explicit-any`.

---

## 🎫 Ticket #22 : Transition de volume abrupte (Coupure sèche de la musique d'ambiance)
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Design Sensoriel / UX)
**Localisation** : `src/hooks/useAmbientAudio.ts`
**Description** :
Le changement de page ou l'activation du mode sourdine coupe instantanément le son d'ambiance de l'application de façon très sèche et désagréable. Pour offrir une expérience premium digne d'un grand jeu vidéo éducatif, le hook `useAmbientAudio` devrait réaliser un fondu enchaîné linéaire (Fade In / Fade Out) sur 500ms à 1 seconde à l'aide d'un timer régulier ou de l'API Web Audio (gainNode).
**Résolution** : Correction du typage de `fadeIntervalRef` en remplaçant `null` par `undefined` afin de se conformer aux types attendus par la fonction globale `clearInterval` du navigateur en contexte TypeScript strict (TS2345).

---

## 🎫 Ticket #23 : Absence de contrôles indépendants pour les effets sonores (SFX) et la musique
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Accessibilité Sensorielle)
**Localisation** : `src/store/useSettingsStore.ts` & `src/pages/Parents/ParentsDashboard.tsx`
**Description** :
Actuellement, l'application ne propose qu'un bouton marche/arrêt global (`isMuted`). Certains enfants ou parents aimeraient pouvoir désactiver uniquement la musique d'ambiance répétitive tout en conservant les effets sonores de validation de quiz (SFX), ou inversement. Il est nécessaire de scinder l'état de sourdine en deux variables distinctes (`isMusicMuted` et `isSfxMuted`) et de proposer ces réglages fins dans la zone parents.
**Résolution** : Scindé l'état de sourdine dans le store de configuration `useSettingsStore.ts` et ajouté les options de contrôle correspondantes dans la Zone Parents de `ParentsDashboard.tsx`.

---

## 🎫 Ticket #25 : Traduction manquante des labels du module PWA
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Localisation)
**Localisation** : `src/components/UI/PWAPrompt.tsx`
**Description** :
À l'instar de la barrière parentale, les textes de notification d'installation de la Progressive Web App (PWA) sont entièrement écrits en dur en français ("L'application est prête à être utilisée hors-ligne !", "Une nouvelle version est disponible !", "Mettre à jour"). Ces messages doivent être localisés et intégrés dans les fichiers de traduction globaux `en.ts` et `fr.ts`.
**Résolution** : Création d'un namespace structurel `pwa` dans `types.ts` et enrichissement bilingue de `fr.ts` et `en.ts` pour localiser complètement les messages et boutons du prompt de mise à jour et d'utilisation hors-ligne.

---

## 🎫 Ticket #26 : Boucle de réaffichage intempestive du prompt d'installation PWA sur Safari iOS
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Robustesse Mobile)
**Localisation** : `src/components/UI/PWAPrompt.tsx`
**Description** :
Sur iOS Safari, les critères de déclenchement du prompt de mise à jour ou d'installation PWA diffèrent de Chrome. En l'absence de garde-fous stockés dans le sessionStorage ou localStorage, la bannière d'installation PWA réapparaît de manière récursive à chaque changement de route ou rafraîchissement de page, même si l'utilisateur l'a explicitement fermée. Il faut mémoriser le refus de l'utilisateur pour une durée déterminée.
**Résolution** : Ajout d'un système de mémorisation persistant de la fermeture de la bannière dans le `localStorage` sous la clé `kp-pwa-dismissed` empêchant tout affichage intempestif de PWA pendant une durée de 24 heures.

---

## 🎫 Ticket #64 : Icône de compagnon erronée ou par défaut inchangeable dans le plateau de jeu Safari
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Incohérence Visuelle / UX)
**Localisation** : `src/components/Game/MissionSafari.tsx`
**Description** :
Dans Mission Safari, le composant utilise un helper `getCompanionIcon()` pour afficher l'icône de compagnon de l'enfant dans la boîte de message en direct. Cependant, ce helper vérifie des identifiants simplifiés en français (`'chien'`, `'dino'`, `'robot'`) alors que le store de progression `useProgressionStore` et `ACCESSORIES_DB` gèrent et enregistrent des identifiants au format `'dog-companion'`, `'dino-companion'`, `'robot-companion'`. Cette désynchronisation empêche la reconnaissance du compagnon actuellement équipé, et l'UI retombe systématiquement sur l'emoji lion par défaut (`🦁`), ruinant la cohérence visuelle.
**Résolution** : Correction du helper `getCompanionIcon()` dans `MissionSafari.tsx` pour tester à la fois les formes courtes et les identifiants longs réels du store de progression (`dog-companion`, `dino-companion`, `robot-companion`).

---

## 🎫 Ticket #66 : Absence de synthèse vocale (TTS) et Baguette de Lecture dans le Refuge des Compagnons
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Accessibilité / Inclusion Jeune Âge)
**Localisation** : `src/pages/Refuge/RefugePage.tsx`
**Description** :
KidPedia inclut une magnifique assistance vocale pour les enfants non-lecteurs (4-6 ans) à l'aide d'un bouton de synthèse globale et d'une "Baguette de Lecture" 🪄 interactive au survol. Toutefois, la zone premium "Le Refuge des Compagnons" et sa Boutique en sont totalement dépourvues. Les longs textes descriptifs de blocage (ex. *"Continue à apprendre et obtiens 3 médailles..."*) ainsi que les descriptions amusantes des friandises restent inaccessibles à l'écoute, empêchant les plus petits de jouer en parfaite autonomie. Il convient d'y intégrer la synthèse vocale pour en faire un espace 100% inclusif.
**Résolution** : Importation du hook d'assistance vocale `useTextToSpeech` et intégration du composant `DiscreteSpeaker` dans `RefugePage.tsx` pour lire à haute voix les explications d'adoption et les descriptions des friandises de la boutique selon la langue active du profil de l'enfant.

---

## 🎫 Ticket #67 : Troncature du titre "Magasin de Friandises" sur mobile (S24 Ultra)
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Ergonomie visuelle)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.boutiqueTitle`) & `src/pages/Refuge/RefugePage.tsx`
**Description** :
Sur le viewport vertical étroit du Samsung Galaxy S24 Ultra (et autres smartphones en mode portrait), le titre de la boutique de friandises affiche "Magasin de Friand" au lieu de "Magasin de Friandises" car il est tronqué horizontalement par manque de place ou à cause d'un overflow caché. Il convient d'adapter la taille de police avec une fonction responsive `clamp` ou d'autoriser le retour à la ligne automatique pour que le texte s'affiche en entier.
**Résolution** : Ajout de la règle CSS `white-space: normal` et `word-break: break-word` combinée à une typographie fluide responsive `clamp` sur `.boutiqueTitle` dans le fichier `RefugePage.module.css` sous un breakpoint de 768px, permettant au titre de s'afficher intégralement sans déborder.

---

## 🎫 Ticket #68 : Troncature du bouton d'action "Nourrir" dans le Refuge
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Incohérence Visuelle / Accessibilité)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.actionBtn` / `.actionPanel`) & `src/pages/Refuge/RefugePage.tsx`
**Description** :
Dans le panneau d'action interactif sous le compagnon, le bouton destiné à alimenter l'animal affiche un texte tronqué "😋 No..." au lieu de "😋 Nourrir (🦴)". Cette coupure empêche le jeune enfant de comprendre l'action associée au bouton. Le conteneur `.actionPanel` flexbox contraint trop la largeur des boutons individuels sur des résolutions étroites comme celle du S24 Ultra.
**Résolution** : Mise en place d'une orientation en colonne (`flex-direction: column`) sur le conteneur `.actionPanel` pour les largeurs inférieures à 640px avec largeur de bouton à `100%` et taille de police fluide, offrant une lisibilité totale aux boutons d'actions interactives sur mobile.

---

## 🎫 Ticket #70 : Double en-tête (Header) inutile et encombrant dans le Refuge des Compagnons sur mobile
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne (Ergonomie UI / Encombrement Mobile)
**Localisation** : `src/components/Layout/MainLayout.tsx` & `src/pages/Refuge/RefugePage.tsx`
**Description** :
La page du Refuge affiche simultanément l'en-tête global de l'application (barre `MainLayout` avec logo KidPedia, verrou parental, choix de profil, réglages de genre/thème, sourdine) et son propre en-tête interne (`⬅️ Retour`, `Le Refuge des Compagnons 🦄`, `🎫 0`). Ce double header encombre inutilement l'espace vertical disponible, ce qui est particulièrement pénalisant sur les téléphones en mode portrait comme le S24 Ultra. Il convient d'ajouter le chemin `/refuge` aux routes immersives dans `MainLayout.tsx` pour masquer le header global et le footer global, laissant le Refuge s'exprimer en plein écran.
**Résolution** : Ajout du chemin `/refuge` dans le filtre `isImmersive` de `MainLayout.tsx` pour masquer dynamiquement et proprement l'en-tête et le pied de page globaux sur la page du Refuge, offrant un mode immersif plein écran idéal en mode portrait mobile.

---

## 🎫 Ticket #71 : Absence d'indicateur de défilement horizontal pour le sélecteur de compagnons sur mobile
**Statut** : 🟢 Résolu
**Sévérité** : Faible (Accessibilité / UX mobile)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.selectorBar`)
**Description** :
Sur un écran mobile portrait étroit comme le S24 Ultra, la barre de sélection des compagnons (`.selectorBar`) n'affiche que deux cartes ("Petit Chien" et "Bébé Dino"). Le troisième compagnon ("Mini Robot") est repoussé hors-écran vers la droite. Bien que la zone soit défilable horizontalement, aucun indicateur visuel (dégradé transparent sur le bord droit, flèche ou barre de défilement discrète) ne signale à l'enfant qu'il peut glisser son doigt pour faire apparaître d'autres animaux, limitant ainsi la découvrabilité du contenu.
**Résolution** : Configuration et application des styles d'ombres et de dégradés transparents `scrollFadeLeft` et `scrollFadeRight` sur `.selectorBarWrapper` dans le fichier `RefugePage.module.css`, dynamisés par le gestionnaire d'événements de défilement horizontal de `RefugePage.tsx` pour faire apparaître/estomper discrètement les indicateurs visuels de défilement.

---

## 🎫 Ticket #72 : Défauts d'affichage responsifs, d'overflow et de layout sur la page du Cercle de la Vie
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Expérience Utilisateur Mobile / RWD)
**Localisation** : `src/pages/LifeCircle/LifeCirclePage.tsx` & `LifeCirclePage.module.css`
**Description** :
Sur les terminaux mobiles et tablettes (et résolutions d'écran allongées), la page du Cercle de la Vie souffre de plusieurs défauts ergonomiques :
1. **Overflow et défilement vertical démesuré** : Le défilement de parallaxe s'étend sur `250vh` sur desktop et mobile, créant un défilement interminable et vide de sens pour un enfant.
2. **Bandes blanches / Mauvais ratio d'aspect** : L'arrière-plan SVG du ciel profond s'étire mal sur les ratios mobiles, laissant apparaître des zones blanches inesthétiques.
3. **Bouton retour encombrant** : Le bouton de retour "⬅ Retour" prend trop de place horizontale, provoquant des collisions avec les boutons de saisons sur petit écran.
4. **Commandes de saisons chevauchantes et coupées** : Le panneau de sélection de saison n'a pas de contrainte de largeur ni d'adaptabilité, débordant de l'écran mobile et se chevauchant.
**Résolution** :
1. **Ajustement du Viewport et Parallaxe** : Réduction de la hauteur de parallaxe globale (`200vh` sur desktop, `160vh` sur tablette, `130vh` sur mobile) pour un meilleur contrôle du scroll.
2. **Ratio d'aspect résilient** : Intégration de `preserveAspectRatio="xMidYMin slice"` sur les SVG de fond profond, garantissant que le ciel couvre 100% de l'espace disponible sans déformation ni zones vides.
3. **Bouton retour adaptatif** : Conversion du bouton retour en un bouton circulaire minimaliste (`⬅`) masquant le texte en dessous du breakpoint mobile (768px).
4. **Contrôles de Saisons Compacts** : Ajout d'une largeur maximale dynamique (`max-width: calc(100% - 5.5rem)`) et d'une disposition flexbox compacte sur `.seasonControls` sur mobile, prévenant tout overflow et collision avec le bouton retour.
5. **Micro-interactions Tactiles Premium** : Intégration de retours tactiles fluides (`transform: scale(0.95)` / `scale(0.92)` et atténuation de l'ombre portée) sur les états `:active` de tous les éléments interactifs cliquables (`.backButton`, `.seasonBtn`, `.exploreMoreBtn`, `.closeBtn`), améliorant considérablement l'engagement sensoriel.
6. **Accessibilité Universelle (A11y)** : Ajout d'indicateurs visuels de focus clavier robustes et hautement contrastés (`:focus-visible` avec outlines et décalages calculés) sur l'ensemble des boutons interactifs de navigation, de saison et d'action, garantissant la conformité totale WCAG.
7. **Animations Pédagogiques** : Rétablissement de la lévitation douce par pulsation (`pulse` infinie à 30 FPS) sur la boîte d'instructions flottantes, guidant naturellement le regard de l'enfant.
8. **Polissage de la Carte au Trésor (TreasureMap)** :
    - **Micro-interactions Tactiles** : Intégration de l'effet d'enfoncement tactile 3D (`:active`) sur les boutons de zoom de la carte (`.zoomBtn`) et les marqueurs (`.mapMarkerPoint`), animant les icônes vectorielles avec un rétrécissement élastique et une légère rotation inversée au clic.
    - **Accessibilité Focus Clavier** : Remplacement de l'inhibition des outlines clavier (`outline: none`) par des halos de focus lumineux contrastés (`:focus-visible`) dorés thématiques avec un décalage compensé (`outline-offset: 4px`), ouvrant la navigation spatiale de la carte à 100% de conformité WCAG.
    - **OrientationGuard Mobile** : Intégration du composant réutilisable de garde-fou d'orientation (`OrientationGuard`), invitant chaleureusement l'enfant à basculer sa tablette ou son smartphone horizontalement pour profiter d'un champ visuel optimal sur la carte au trésor, aligné sur l'expérience premium de Mission Safari.
    - **Sécurisation de Tests** : Mock du composant `OrientationGuard` dans la suite de tests unitaires et d'intégration `TreasureMap.test.tsx` pour garantir 100% de robustesse et de passage au vert de la suite de tests de non-régression.

---

## 🎫 Ticket #73 : Refonte Complète et Premium du Tableau de Bord Parents (Produit Finalisé & Limites de Temps)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Amélioration Produit / UX)
**Localisation** : `src/pages/Parents/ParentsDashboard.tsx` & `ParentsDashboard.module.css`
**Description** :
Le tableau de bord parents initial était une simple ébauche avec des réglages audio et des informations textuelles. Pour en faire un produit finalisé d'une qualité d'exception (Premium product), il est requis d'apporter plusieurs améliorations significatives :
1. **Interface Multi-onglets Glassmorphic** : Ajouter une structure à onglets fluides segmentant les fonctionnalités (Progression, Contrôle Parental, Guide Éducatif, Espace Technique).
2. **Statistiques de progression détaillées** : Calculer et afficher en temps réel l'XP, le rang, les médailles Or/Argent/Bronze, et la complétion thématique exacte par catégorie de l'encyclopédie de manière visuelle avec des barres de progression colorées.
3. **Limitation du temps d'écran quotidien** : Permettre aux parents de configurer une limite (15m, 30m, 45m, 60m ou illimité) par profil d'enfant, persistant de façon autonome dans le local storage.
4. **Conseils Pédagogiques & Discussion** : Générer dynamiquement des questions de discussion ("Démarreurs de discussion") adaptées aux sujets que l'enfant a déjà explorés, afin de créer des liens réels hors-écran.
5. **Gestion de Profil & Identité** : Offrir la possibilité d'éditer le nom de l'explorateur en direct, de purger sa progression ou de supprimer le profil de manière synchronisée avec le store de compagnons.
6. **Linter et robustesse TS** : Éliminer les re-renders synchrones dans les effets via une microtâche asynchrone propre et supprimer les typecasts non sécurisés `as any`.
**Résolution** :
1. **ParentsDashboard.tsx** :
   - Structure multi-onglets dynamique ajoutée avec sélecteur de profil en temps réel.
   - Statistiques globales (XP, Rangs, médailles Or/Argent/Bronze, tickets de quiz) calculées dynamiquement.
   - Grille de complétion par catégorie thématique (Espace, Dinosaures, Animaux, etc.) avec taux de réussite exacts et pourcentage.
   - Implémentation du sélecteur de limite de temps quotidien persistant sous la clé `kp-screentime-limit-[id]`.
   - Intégration du générateur de démarreurs de discussion bilingues se basant sur les badges réellement débloqués par l'explorateur actif.
   - Intégration de l'édition du nom de profil et correction des avertissements ESLint en asynchronisant le `setState` par microtâche et en typant de manière stricte le sélecteur d'onglet.
2. **ParentsDashboard.module.css** :
   - Refonte totale du style avec un arrière-plan à gradient thématique doux (clair et sombre thémisés).
   - Design en **glassmorphism** d'une grande pureté exploitant un `backdrop-filter: blur(12px)`, des bordures claires et de superbes ombres de profondeur.
   - Micro-animations de rebonds physiques tridimensionnels sur l'état `:hover` et `:active` de l'ensemble des boutons et des cartes thématiques.
   - Conception élastique responsif s'adaptant parfaitement aux smartphones d'écrans haute densité et aux tablettes/ordinateurs.

---

## 🎫 Ticket #37 : Liaison et Quizz pour les sous-nœuds des Premières espèces marines (Origines h2)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/marine.ts` / Navigation
**Description** :
Actuellement, seul le dernier nœud de la frise marine est interactif. Tous les sous-nœuds de `marine.ts` (comme les premières bactéries, algues ou trilobites) doivent être liés à des sujets de l'encyclopédie (probablement dans `nature.ts` ou `animals.ts`) avec des quiz interactifs dédiés.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`ms1` à `ms8`) à des fiches réelles de l'encyclopédie.
- Création du sujet `premieres-cellules` dans `src/data/topics/nature.ts` et de son quiz associé dans `src/data/quizzes/nature.ts`.
- Création des 7 sujets (`meduses-eponges`, `trilobites`, `vers-marins`, `coquillages-primitifs`, `anomalocaris`, `poissons-sans-machoires`, `poissons-ecailles`) dans `src/data/topics/animals.ts` et de leurs quiz associés dans `src/data/quizzes/animals.ts`.

---

## 🎫 Ticket #38 : Liaison et Quizz pour les sous-nœuds des Premières espèces terrestres (Origines h3)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/land.ts` / Navigation
**Description** :
Les sous-nœuds de `land.ts` (premiers amphibiens, fougères géantes, insectes géants) n'ont pas de `topicId` actif. Ils doivent être liés à de nouveaux sujets et quiz pour enrichir l'exploration de la sortie des eaux.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`ls1` à `ls8`) à des fiches réelles de l'encyclopédie.
- Création des 4 sujets (`air-pur`, `premieres-forets`, `climat-change`, `apparition-fleurs`) dans `src/data/topics/nature.ts` et de leurs quiz associés dans `src/data/quizzes/nature.ts`.
- Création des 4 sujets (`sortie-des-eaux`, `insectes-geants`, `peau-reptile`, `oeuf-solide`) dans `src/data/topics/animals.ts` et de leurs quiz associés dans `src/data/quizzes/animals.ts`.

---

## 🎫 Ticket #39 : Liaison et Quizz pour les sous-nœuds des Dinosaures (Origines h4)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/dinosaurs.ts` / Navigation
**Description** :
La frise des dinosaures (`dinosaurs.ts`) présente des espèces fascinantes (T-Rex, Diplodocus, Tricératops) qui ne redirigent vers aucun quiz ou fiche individuelle. Il faut mapper ces sous-nœuds vers les sujets de `dinosaurs.ts` de l'encyclopédie.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`dn1` à `dn8`) à des fiches réelles de l'encyclopédie dans `src/data/origins/dinosaurs.ts` (`velociraptor`, `diplodocus`, `pterodactyle`, `brachiosaure`, `stegosaure`, `spinosaure`, `t-rex`, `triceratops`).

---

## 🎫 Ticket #40 : Liaison et Quizz pour les sous-nœuds des Premières formes humaines (Origines h5)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/humans.ts` / Navigation
**Description** :
Les différentes étapes de l'évolution des hominidés (Toumaï, Lucy, etc.) dans `humans.ts` manquent de redirection pédagogique. Il faut créer des mini-sujets historiques correspondants et les connecter.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`hf1` à `hf8`) à des fiches réelles de l'encyclopédie.
- Création de 8 nouveaux sujets historiques (`berceau-afrique`, `debout-deux-pieds`, `artisan-pierres`, `dompteur-feu`, `grand-voyage`, `cousins-neandertal`, `artistes-cavernes`, `premiers-villages`) dans `src/data/topics/history.ts`.
- Création des 8 quiz associés dans `src/data/quizzes/history.ts`.

---

## 🎫 Ticket #41 : Liaison et Quizz pour les sous-nœuds de l'Évolution de l'homme (Origines h6)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/evolution.ts` / Navigation
**Description** :
Les grandes avancées humaines de la frise `evolution.ts` (maîtrise du feu, premiers outils, art pariétal) doivent être connectées à des sujets dans `history.ts` ou dans un nouveau fichier thématique avec des quiz correspondants.
**Résolution** :
- Liaison de chacun des 8 sous-nœuds intermédiaires (`ev1` à `ev8`) à des identifiants de sujets uniques existants (`dompteur-feu`, `prehistoire`, `artisan-pierres`, `artistes-cavernes`, `loup`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.

---

## 🎫 Ticket #42 : Liaison et Quizz pour les sous-nœuds des Regroupements primitifs (Origines h7)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/groups.ts` / Navigation
**Description** :
Les étapes de transition vers la sédentarisation (premières huttes, débuts de l'agriculture, élevage) dans `groups.ts` doivent être interactives et associées à des fiches pédagogiques.
**Résolution** :
- Liaison de chacun des 8 sous-nœuds intermédiaires (`gv1` à `gv8`) à des identifiants de sujets uniques (`sedentarisation`, `murs-terre`, `debuts-agriculture`, `debuts-elevage`, `invention-poterie`, `vie-communaute`, `tissage-laine`, `megalithes`), ouvrant l'accès interactif complet à leurs fiches et quiz respectifs sur la frise chronologique d'Origins.
- Création de 8 nouveaux sujets historiques et de leurs quiz correspondants bilingues (français/anglais) de haute qualité et adaptés aux enfants de 4-8 ans.
- Enregistrement des nouveaux identifiants de sujets dans l'array global de typage strict `TOPIC_IDS`.

---

## 🎫 Ticket #43 : Liaison et Quizz pour les sous-nœuds des Grandes civilisations (Origines h8)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/civilizations.ts` / Navigation
**Description** :
Les sous-nœuds de `civilizations.ts` (Égypte ancienne, Mésopotamie, Grèce antique, Empire romain) doivent être mappés vers des sujets existants ou nouveaux de la catégorie Histoire avec leurs quiz.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`cv1` à `cv8`) à des fiches réelles de l'encyclopédie :
  - `cv1` -> `pyramides` (existant)
  - `cv2` -> `ecriture-sacree` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `cv3` -> `grece-antique` (existant)
  - `cv4` -> `romains` (existant)
  - `cv5` -> `mayas` (existant)
  - `cv6` -> `grande-muraille` (existant sous `geography.ts`)
  - `cv7` -> `empire-incas` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `cv8` -> `vikings` (existant)
- Enregistrement des nouveaux identifiants de sujets (`ecriture-sacree` et `empire-incas`) dans l'array global de typage strict `TOPIC_IDS`.

---

## 🎫 Ticket #44 : Liaison et Quizz pour les sous-nœuds du Moyen-Âge (Origines h9)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/middleAges.ts` / Navigation
**Description** :
Les éléments emblématiques du Moyen-Âge (châteaux forts, chevaliers, cathédrales, calligraphie) de la frise `middleAges.ts` doivent être liés à des sujets d'apprentissage et des quiz réels de l'encyclopédie.
**Résolution** :
- Liaison de tous les 8 sous-nœuds (`ma1` à `ma8`) à des fiches réelles de l'encyclopédie :
  - `ma1` -> `romains` (existant)
  - `ma2` -> `chevaliers` (existant)
  - `ma3` -> `chateaux` (existant)
  - `ma4` -> `cathedrales` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `ma5` -> `calligraphie` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `ma6` -> `moulins-moyen-age` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `ma7` -> `foires-marches` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
  - `ma8` -> `invention-papier` (nouveau sujet créé dans `src/data/topics/history.ts` avec son quiz dans `src/data/quizzes/history.ts`)
- Enregistrement des nouveaux identifiants de sujets (`cathedrales`, `calligraphie`, `moulins-moyen-age`, `foires-marches` et `invention-papier`) dans l'array global de typage strict `TOPIC_IDS`.
