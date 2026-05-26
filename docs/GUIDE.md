# 📚 KidPedia - Guide de l'Explorateur & Référence Technique

> **Note de suivi :** Pour consulter l'historique complet des versions, merci de vous référer au fichier : [HISTORY.md](./HISTORY.md).

## 🌟 Vision du Projet
**KidPedia** est une encyclopédie numérique de nouvelle génération, conçue comme une passerelle entre le support traditionnel (le livre) et les possibilités infinies de l'interactivité moderne. Sa mission est d'aider l'enfant à décoder et comprendre le monde qui l'entoure à travers un système d'apprentissage immersif et gratifiant.

### Les Piliers du Concept :
1.  **L'Objet-Livre Interactif :** KidPedia conserve la structure rassurante et organisée d'un livre (chapitres, thématiques, narration), mais la transforme en une expérience vivante où l'utilisateur devient acteur de sa propre découverte par le jeu et la manipulation.
2.  **L'Éveil par l'Exploration :** Plutôt que de simplement délivrer de l'information, le projet mise sur l'immersion (Cartes, Scènes Nature, Lignes du temps) pour susciter la curiosité naturelle et faciliter la rétention des connaissances.
3.  **La Valorisation de l'Acquis :** L'intelligence du système suit la progression de l'explorateur pour célébrer chaque étape franchie (XP, Médailles, Rangs), renforçant ainsi la confiance en soi et le plaisir d'apprendre.
4.  **Une Conception Universelle :** L'architecture technique et sémantique est pensée pour être accessible à tous les profils (A11y) et compréhensible par tous les agents (IA, développeurs, utilisateurs), garantissant la pérennité et la clarté de la connaissance transmise.
5. **L'Infusion du Sens (Le Visible et le Non-Visible) :** KidPedia ne se contente pas de cataloguer les faits scientifiques ou historiques (le visible). Chaque secret explore le sens profond et la sagesse ancienne (le non-visible) en une formulation ultra-courte (deux phrases maximum), adaptée au temps d'attention moderne des enfants de 4 à 8 ans. Cette approche sème des "graines de réflexion" (Growth Mindset) et agit comme un renforcement bienveillant de l'autorité et de l'éducation des parents, sans jamais imposer de dogme ni de leçon de morale.
6. **L'Harmonie avec le Monde (Comprendre pour Agir) :** KidPedia montre à l'enfant qu'il fait partie intégrant d'un grand tout vivant. En découvrant les mécanismes simples de la nature et de l'histoire (le visible), l'enfant réalise l'impact et la valeur de ses propres gestes (le non-visible). Le projet utilise la curiosité naturelle du jeu pour éveiller un respect profond et spontané pour la vie, la nature et les autres.

---

## 🏗️ Architecture du Système (Smart Store / Dumb UI)

L'architecture a atteint un niveau de maturité industrielle. Le démantèlement des monolithes, la migration vers une réactivité pure et le durcissement total des types garantissent une base de code stable et inclusive.

### 📂 Structure des Stores (Zustand & Persist)
L'intelligence est répartie dans des magasins spécialisés et autonomes, synchronisés de manière déclarative :

1.  **`useProfileStore`** : Gère l'identité et pilote explicitement la mise à jour des magasins dépendants (`Settings`, `Progression`) au sein de ses actions.
2.  **`useProgressionStore` (Noyau Pur)** : Moteur générique d'XP et de badges, totalement agnostique du contexte de jeu.
3.  **`useEnvironmentStore` (World State)** : Gère les saisons et l'état global du monde.
4.  **`useSettingsStore`** : Gère les préférences (Thème, Langue) et les effets de bord DOM (Focus, Thème).
5.  **`useSafariStore`** : Gère le plateau du Safari.
6.  **`usePlayerStore` (Sélecteur UI)** : Hook réactif agrégeant les données pour la vue (Lecture seule).
7.  **`useCompanionStore` (Gamification / Refuge)** : Gère le refuge des compagnons, l'inventaire de friandises et le niveau d'affection/bonheur de chaque familier par profil.

### 🕹️ Logique Métier Isolée (Hooks)
Chaque expérience interactive possède son propre "moteur" logique, isolé de la vue et du stockage :
- **`useMapZoom.ts`** : Moteur de navigation spatiale intelligente (Zoom centré, Drag-to-Pan).
- **`useNatureGame.ts`** : Orchestre les règles de la scène Nature.
- **`useVisualEffects.ts`** : Gestionnaire robuste d'animations éphémères (Nettoyage automatique des timers).
- **`useReaderVoice.ts`** : Hook d'accessibilité (Baguette Magique) pour les jeunes non-lecteurs (4-6 ans), intégrant la synthèse vocale avec suivi en temps réel de l'index des mots.

### ♿ Accessibilité (A11y), Synthèse Vocale & SVG
*   **Baguette de Lecture Assistée :** Intégration dans `TopicDetail.tsx` du système "Baguette Magique" (`useReaderVoice`) qui permet de lire les paragraphes éducatifs au clic ou au survol (debounce `500ms`), avec surbrillance dynamique mot par mot.
*   **Standardisation SVG :** Standardisation via le composant **`AccessibleSvgHotspot`** :
    - Navigation clavier native (tabindex, Enter/Space).
    - Sémantique ARIA (roles, labels) sur tous les éléments graphiques complexes.

---

## 🛠️ Principes de Développement (Règles d'Or)

1. **Smart Store / Dumb UI :** Le store gère la donnée brute, le composant ou le hook métier gère l'intention de jeu, l'UI gère le texte.
2. **Réactivité Garantie :** Pointer toujours vers la donnée brute dans les sélecteurs pour forcer le re-render.
3. **Zéro "Any" Intégral / Typage Strict :** 
    - Inférence dynamique du type `TopicId` depuis les données réelles.
    - Éradication des casts dans les tests via les **Data Factories** (`src/test/factories.ts`).
    - TypeScript strict absolu. Aucun `any`.
4. **Indépendance I18n :** Les stores émettent des `eventCode` sémantiques. Le formatage textuel est délégué à l'UI.
5. **Méthodologie "Tranche Verticale" (Proof of Concept) :** Comme une équipe professionnelle agile, on ne développe jamais de fonctionnalités lourdes en lot horizontal massif (ex: modifier toutes les bases de données d'un coup). On crée d'abord une preuve de concept (PoC) en traitant **un seul sujet de bout en bout** (Modification Data -> Mise à jour UI -> Tests validés). Une fois l'architecture approuvée sur cet élément isolé, on l'industrialise et on l'applique au reste du contenu.
6. **Output Minimaliste :** Ne générer que le code nécessaire. Zéro texte superflu. Zéro salutation.
7. **Architecture Stricte :** Respecter scrupuleusement la structure `/src/components` et `/src/hooks`.
8. **Performance :** Prioriser le code performant. Éviter les re-renders inutiles en React.
9. **Dépendances Contrôlées :** Ne jamais ajouter de bibliothèque externe sans approbation. Utiliser uniquement le code standard.
10. **Contexte Senior & Stabilité :** Posture d'ingénieur logiciel senior travaillant sur un projet éducatif pour enfants. Les buts principaux sont la stabilité, la lisibilité et la performance.
11. **Mode d'Exécution & Clarté :** En cas de doute, poser une question courte avant de coder. Ne pas tenter d'interpréter des spécifications floues.

---

## 🧪 Qualité & Validation
- **Validation complète :** `npm run validate`.
- **État Actuel (v3.20.11) :** 100% validé.
- **Vitest :** 170 tests unitaires et d'intégration (incluant les tests de sécurité anti-spoiler, les tests structurels Data Factory, tests d'intégrité Mermaid et zoom tactile).
  - **Playwright :** 16 scénarios E2E (Navigation, Zoom, Multi-profils).

---

## 🚧 Dette Technique & À Faire (v3.21.0)

✅ **RÉSOLU : Alerte "God Object"** (Traité en v2.3.1)
✅ **RÉSOLU : Alerte "Abonnement Furtif"** (Traité en v2.3.0)
✅ **RÉSOLU : Alerte "Composant Couteau-Suisse"** (Traité en v2.3.2)
✅ **RÉSOLU : Limites de l'Orchestration Impérative** (Traité en v2.3.5)
✅ **RÉSOLU : Monolithes SVG** (Traité en v2.3.3)
✅ **RÉSOLU : Illusion du "Zero Any" dans les Tests** (Traité en v2.3.6)
✅ **RÉSOLU : Maintenance des Unions de Types** (Traité en v2.3.4)
✅ **RÉSOLU : Anti-pattern Switch-Case I18n** (Traité en v3.0.0)
✅ **RÉSOLU : Dette de Qualité (17 Problèmes de Validation)** (Traité en v3.0.0)
✅ **RÉSOLU : Boucle d'Engagement des Cadeaux** (Traité en v3.0.9)
✅ **RÉSOLU : Navigation Linéaire & "Learning Path" (Ticket #45)** (Traité en v3.6.0)
✅ **RÉSOLU : Validation Visuelle & Audio "QC PASS" (Ticket #46)** (Traité en v3.6.0)
✅ **RÉSOLU : Ancres Mnémotechniques par Stations (Ticket #47)** (Traité en v3.6.0)
✅ **RÉSOLU : Standardisation de la Ingestion / Data Factory (Ticket #48)** (Traité en v3.6.0)
✅ **RÉSOLU : Assistance Pédagogique du Magicien & TTS (Ticket #49)** (Traité en v3.6.0)
✅ **RÉSOLU : Défi Parental de Multiplication (Ticket #08)** (Traité en v3.7.0)
✅ **RÉSOLU : Localisation Complète Zone Parents (Ticket #09)** (Traité en v3.7.0)
✅ **RÉSOLU : Découplage `clearBadges` & Confirmation Unique UI (Ticket #10)** (Traité en v3.7.0)
✅ **RÉSOLU : Sujets "Orphelins" & Validation d'Accès (Ticket #06)** (Traité en v3.12.0)
✅ **RÉSOLU : Indicateurs de focus clavier sur les quiz (Ticket #32)** (Traité en v3.13.0)
✅ **RÉSOLU : Résolution Intégrale de la Conception Visuelle de l'Accueil (Ticket #62)** (Traité en v3.15.1)
✅ **RÉSOLU : Sécurité anti-spoiler sur les anecdotes (Ticket #04)** (Traité en v3.15.2)
✅ **RÉSOLU : Protection anti-quitting accidentel sur Mission Safari (Ticket #16)** (Traité en v3.16.1)
✅ **RÉSOLU : Le Refuge des Compagnons Animés (Ticket #R3)** (Traité en v3.17.0)
✅ **RÉSOLU : La Baguette Magique d'Inclusion (Ticket #R4)** (Traité en v3.18.0)
✅ **RÉSOLU : Conflits de z-index & Stacking Context (Rapport QA)** (Traité en v3.19.0)
✅ **RÉSOLU : Dead Code, sélecteurs CSS orphelins & linter (Ticket #28)** (Traité en v3.19.0)
✅ **RÉSOLU : Le Composant de Carte Parallaxe Dynamique (Ticket #56)** (Traité en v3.19.0)
✅ **RÉSOLU : Défauts visuels de conception sur le plateau Mission Safari (Ticket #59)** (Traité en v3.20.0)
✅ **RÉSOLU : MuteToggle asynchrone & Doublons Audio (Ticket #21)** (Traité en v3.20.1)
✅ **RÉSOLU : Saut de mise en page (CLS) du Carousel Hero (Ticket #27)** (Traité en v3.20.2)
✅ **RÉSOLU : Lenteur de désérialisation du Zustand Store (Ticket #30)** (Traité en v3.20.3)
✅ **RÉSOLU : Hotspots & Accessibilité Clavier de la Carte Parallaxe (Ticket #57)** (Traité en v3.20.4)
✅ **RÉSOLU : Optimisations de Performance de la Carte Parallaxe (Ticket #58)** (Traité en v3.20.5)
✅ **RÉSOLU : Sauts visuels et positionnement erratique lors du zoom sur mobile (Ticket #15)** (Traité en v3.20.6)
✅ **RÉSOLU : Système de scoring d'XP linéaire et dévaluant pour le mode parfait (Ticket #18)** (Traité en v3.20.7)
✅ **RÉSOLU : Absence de variété dans les descriptions introductives des sujets (Ticket #20)** (Traité en v3.20.8)
✅ **RÉSOLU : Variables de couleurs CSS codées en dur dans les grilles vectorielles d'Origins (Ticket #31)** (Traité en v3.20.9)
✅ **RÉSOLU : Zone de recherche vide sans chemin de repli (Ticket #33)** (Traité en v3.20.10)
✅ **RÉSOLU : Dimensionnement dynamique des marqueurs de la Carte interactive (Ticket #35)** (Traité en v3.20.11)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds du Big Bang (Ticket #36)** (Traité en v3.20.12)
✅ **RÉSOLU : Nettoyage des compagnons lors de la suppression d'un profil (Ticket #63)** (Traité en v3.20.13)
✅ **RÉSOLU : Non-respect de la sourdine globale dans Le Refuge des Animaux (Ticket #65)** (Traité en v3.20.14)
✅ **RÉSOLU : Absence d'effets sonores (Fichiers commentés) (Ticket #05)** (Traité en v3.21.0)
✅ **RÉSOLU : Transition de volume abrupte (Coupure sèche) (Ticket #22)** (Traité en v3.21.0)
✅ **RÉSOLU : Contrôles SFX & Musique indépendants (Ticket #23)** (Traité en v3.21.0)
✅ **RÉSOLU : Traduction et protection contre les boucles du prompt PWA (Ticket #25, Ticket #26)** (Traité en v3.21.0)
✅ **RÉSOLU : Icône de compagnon erronée sur Mission Safari (Ticket #64)** (Traité en v3.21.0)
✅ **RÉSOLU : Synthèse vocale TTS et Baguette de lecture au Refuge (Ticket #66)** (Traité en v3.21.0)
✅ **RÉSOLU : Troncatures visuelles sur mobile Galaxy S24 Ultra (Ticket #67, Ticket #68)** (Traité en v3.21.0)
✅ **RÉSOLU : En-tête immersif et indicateur de défilement au Refuge (Ticket #70, Ticket #71)** (Traité en v3.21.0)
✅ **RÉSOLU : Correctifs d'affichage responsifs, d'overflow et de layout sur Le Cercle de la Vie (Ticket #72)** (Traité en v3.21.1)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Premières espèces marines (Ticket #37)** (Traité en v3.22.1)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Premières espèces terrestres (Ticket #38)** (Traité en v3.22.2)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Dinosaures (Ticket #39)** (Traité en v3.22.3)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Premières formes humaines (Ticket #40)** (Traité en v3.22.4)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds de l'Évolution de l'homme (Ticket #41)** (Traité en v3.22.5)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Regroupements primitifs (Ticket #42)** (Traité en v3.22.6)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds des Grandes civilisations (Ticket #43)** (Traité en v3.22.7)
✅ **RÉSOLU : Liaison et Quizz pour les sous-nœuds du Moyen-Âge (Ticket #44)** (Traité en v3.22.8)
✅ **RÉSOLU : Fonctionnalité "Manger" dans Le Refuge des Compagnons (Ticket #74)** (Traité en v3.23.1)
✅ **RÉSOLU : La Carte interactive Sonorisée (Ticket #R6)** (Traité en v3.23.2)
✅ **RÉSOLU : Cycle de vie et interactions (Sommeil, besoins, cache-cache) au Refuge (Ticket #Refuge-Sim)** (Traité en v3.23.3)
✅ **RÉSOLU : Correctifs de Layout, de Validation et de Scrollbar (Ticket #67, #68, Refuge-Sim follow-up)** (Traité en v3.23.4)
✅ **RÉSOLU : Moteur de Stockage Asynchrone IndexedDB (Ticket Infrastructure)** (Traité en v3.23.5)
✅ **RÉSOLU : Polissage Immersif & Exploration Libre sur Le Grand Voyage du Temps (Ticket UX/UI)** (Traité en v3.23.6)
✅ **RÉSOLU : Le Verrouillage Kid-Safe Intelligent (Ticket #R9)** (Traité en v3.23.6)
✅ **RÉSOLU : Bascule asynchrone du useProgressionStore (Ticket #76)** (Traité en v3.23.6)
✅ **RÉSOLU : Découplage de Fiche Encyclopédique & Interface TopicContent (Ticket #78)** (Traité en v3.24.0)


---

**📝 Note :** Prochaine étape : Poursuite de la mise en conformité et amélioration de l'expérience éducative globale sur les autres tickets d'apprentissage de KidPedia.

---
*Dernière mise à jour : 25 mai 2026 (v3.24.0)*


