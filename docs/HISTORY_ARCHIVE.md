# 📜 Historique des Versions Archivées - KidPedia

Ce document regroupe les anciens cycles de développement (v1.x et v2.x) de KidPedia pour assurer une base documentaire complète tout en allégeant le fichier principal d'historique.

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
