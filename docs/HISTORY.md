# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

## 🌟 Cycle Kidpedia v3.0 : L'Excellence Interactive


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
    - Introduction de l'attribut `anchorIcon` dans `types.ts` et du dictionnaire de repli par catégorie (🚀, 🦖, etc.).
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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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
...
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
- **[UX/UI]** Micro-animations Animales :
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
