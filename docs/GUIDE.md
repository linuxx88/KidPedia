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
6. **L'Harmonie avec le Monde (Comprendre pour Agir) :** KidPedia montre à l'enfant qu'il fait partie intégrante d'un grand tout vivant. En découvrant les mécanismes simples de la nature et de l'histoire (le visible), l'enfant réalise l'impact et la valeur de ses propres gestes (le non-visible). Le projet utilise la curiosité naturelle du jeu pour éveiller un respect profond et spontané pour la vie, la nature et les autres.

---

## 🏗️ Architecture du Système (Smart Store / Dumb UI)

L'architecture a atteint un niveau de maturité industrielle. Le démantèlement des monolithes, la migration vers une réactivité pure et le durcissement total des types garantissent une base de code stable et inclusive.

### 📂 Structure des Stores (Zustand & Persist)
L'intelligence est répartie dans des magasins spécialisés et autonomes, synchronisés de manière déclarative :

1.  **`useProfileStore`** : Gère l'identité et pilote explicitement la mise à jour des magasins dépendants (`Settings`, `Progression`) au sein de ses actions.
2.  **`useProgressionStore` (Noyau Pur)** : Moteur générique d'XP et de badges, totalement agnostique du contexte de jeu.
3.  **`useEnvironmentStore` (World State)** : Gère les saisons et l'état global du monde.
4.  **`useSettingsStore`** : Gère les préférences (Thème, Langue) et les effets de bord DOM (Focus, Thème).
5.  **`useSafariStore`** : Moteur de jeu de plateau utilisant des codes d'événements sémantiques.
6.  **`usePlayerStore` (Sélecteur UI)** : Hook réactif agrégeant les données pour la vue (Lecture seule).

### 🕹️ Logique Métier Isolée (Hooks)
Chaque expérience interactive possède son propre "moteur" logique, isolé de la vue et du stockage :
- **`useMapZoom.ts`** : Moteur de navigation spatiale intelligente (Zoom centré, Drag-to-Pan).
- **`useNatureGame.ts`** : Orchestre les règles de la scène Nature.
- **`useVisualEffects.ts`** : Gestionnaire robuste d'animations éphémères (Nettoyage automatique des timers).

### ♿ Accessibilité & SVG
Standardisation via le composant **`AccessibleSvgHotspot`** :
- Navigation clavier native (tabindex, Enter/Space).
- Sémantique ARIA (roles, labels) sur tous les éléments graphiques complexes.

---

## 🛠️ Principes de Développement (Règles d'Or)

1. **Smart Store / Dumb UI :** Le store gère la donnée brute, le composant ou le hook métier gère l'intention de jeu, l'UI gère le texte.
2. **Réactivité Garantie :** Pointer toujours vers la donnée brute dans les sélecteurs pour forcer le re-render.
3. **Zéro "Any" Intégral :** 
    - Inférence dynamique du type `TopicId` depuis les données réelles.
    - Éradication des casts dans les tests via les **Data Factories** (`src/test/factories.ts`).
4. **Indépendance I18n :** Les stores émettent des `eventCode` sémantiques. Le formatage textuel est délégué à l'UI.
5. **Méthodologie "Tranche Verticale" (Proof of Concept) :** Comme une équipe professionnelle agile, on ne développe jamais de fonctionnalités lourdes en lot horizontal massif (ex: modifier toutes les bases de données d'un coup). On crée d'abord une preuve de concept (PoC) en traitant **un seul sujet de bout en bout** (Modification Data -> Mise à jour UI -> Tests validés). Une fois l'architecture approuvée sur cet élément isolé, on l'industrialise et on l'applique au reste du contenu.

---

## 🧪 Qualité & Validation
- **Validation complète :** `npm run validate`.
- **État Actuel (v2.3.6) :** 100% validé.
  - **Vitest :** 103 tests unitaires et d'intégration.
  - **Playwright :** 16 scénarios E2E (Navigation, Zoom, Multi-profils).

---

## 🚧 Dette Technique & À Faire (v3.0)

✅ **RÉSOLU : Alerte "God Object"** (Traité en v2.3.1)
✅ **RÉSOLU : Alerte "Abonnement Furtif"** (Traité en v2.3.0)
✅ **RÉSOLU : Alerte "Composant Couteau-Suisse"** (Traité en v2.3.2)
✅ **RÉSOLU : Limites de l'Orchestration Impérative** (Traité en v2.3.5)
✅ **RÉSOLU : Monolithes SVG** (Traité en v2.3.3)
✅ **RÉSOLU : Illusion du "Zero Any" dans les Tests** (Traité en v2.3.6)
✅ **RÉSOLU : Maintenance des Unions de Types** (Traité en v2.3.4)

🚩 **Alerte : Anti-pattern Switch-Case I18n**
*   **Action :** Abstraire la traduction dans un système polymorphe.

🚩 **Alerte : Dette de Qualité (17 Problèmes de Validation)**
*   **Action :** Résoudre les 16 erreurs et 1 warning détectés par `npm run validate`.
    *   **Priorité 1 :** Éliminer les 9 occurrences de `any` (ExplorerGallery, AccessibleSvgHotspot, etc.).
    *   **Priorité 2 :** Purifier le composant `ParticleSystem` (supprimer `Math.random` du render).
    *   **Priorité 3 :** Nettoyer les variables inutilisées dans `SafariBoard.tsx`.
    *   **Priorité 4 :** Corriger les hooks dans `ParentalGate.tsx` (cascading renders) et `useParallax.ts`.

### 🚩 Alerte : Boucle d'Engagement des Cadeaux (Next Best Action)
- **Action :** Compléter l'expérience unifiée sur `GiftsPage.tsx` après l'ouverture du coffre pour éviter que l'enfant reste bloqué sur un écran statique.
    - **Priorité 1 :** Intégrer le bouton "Mettre sur mon avatar ! 🤠" relié au `useProfileStore` pour équiper l'accessoire en direct.
    - **Priorité 2 :** Implémenter la mini-grille "Mes Trésors" en bas de page pour afficher la vitrine de la collection.
    - **Priorité 3 :** Ajouter l'indicateur d'XP dynamique sous le coffre pour relancer l'enfant vers le Discovery Hub s'il n'a plus de cadeaux disponibles.

---

**📝 Note :** Prochaine étape : Résolution de la dette de qualité et abstraction du système de traduction.

---
*Dernière mise à jour : 17 mai 2026 (v2.3.6)*
