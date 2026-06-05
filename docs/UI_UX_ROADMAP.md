# 🎨 KidPedia - Roadmap UI/UX (La "Carrosserie")

Ce document liste les améliorations visuelles et sonores pour augmenter l'engagement des enfants de 4 à 8 ans. L'architecture de base étant solide, l'objectif ici est d'ajouter le "Waouh effect" sans sacrifier les performances.

## 🎬 1. Animations & Micro-interactions
*L'objectif : Donner de la vie à l'interface et récompenser physiquement chaque action.*


## 🔊 2. Habillage Sonore
*L'objectif : Remplacer le web muet par une expérience immersive.*


- [ ] **Musique d'ambiance (Optionnel)** :
  - *Où :* `MainLayout` ou store dédié.
  - *Quoi :* Boucle musicale très légère, adaptable selon le thème (Espace, Safari, etc.), avec une option claire pour la couper (Mute).

## 🎨 3. Assets Graphiques & Polish
*L'objectif : Finitions visuelles et optimisation de l'affichage.*


- [ ] **Optimisation des Images (WebP)** :
  - *Où :* Composants utilisant des images (`ProfileSelection.tsx`, etc.).
  - *Quoi :* Utiliser systématiquement la balise `<picture>` pour servir les formats `.webp` allégés en priorité, avec les `.png` en fallback.
- [ ] **Backgrounds animés** :
  - *Où :* `src/styles/vars.css`, `MainLayout.module.css`.
  - *Quoi :* Animer très lentement la position des dégradés de fond pour simuler un mouvement perpétuel apaisant.


## 🚀 4. Évolutions Futures & Retour d'Expérience Enfants (Backlog PM)
*L'objectif : Anticiper et résoudre les plaintes des jeunes joueurs pour maximiser la rétention et l'utilisabilité.*

- [ ] **Remplacement des Émojis par des Compagnons Animés** :
  - *Où :* `AvatarDisplay.tsx`, `accessories.ts`, `TransformedEmoji/`
  - *Quoi :* Remplacer les émojis génériques par des illustrations vectorielles (SVG) premium animées avec des micro-interactions et optimisées pour le web.
  - *Statut :* **Réalisé & Modularisé (v3.2.0)**.
    - Architecture modulaire d'entreprise avec chargement à la demande (*lazy-loading* via `React.lazy` et `React.Suspense`) pour éviter d'alourdir le bundle initial.
    - **Mini Robot (`🤖`)** : Lévitation douce, yeux clignotants, antenne vibrante et cœur d'énergie pulsé.
    - **Petit Chien (`🐶`)** : Queue frétillante rapide et langue rose haletante ultra-mignonne.
    - **Bébé Dino (`🦕`)** : Balancement fluide et synchrone de son long cou (`swayNeck`), clignement des yeux et queue ondulante en forme de feuille (`wagDinoTail`).
    - **Chapeau de Brousse (`🤠`)** : Magnifique chapeau d'aventurier/safari khaki en dégradé 3D avec lanière de cuir marron à boucle dorée scintillante (`buckleGlint`) et petite feuille tropicale verte agitée doucement par la brise (`swayLeaf`).
- [/] **Cartographie & Visualisateur de Flux Interactif** :
  - *Où :* `/parents/flow`, `src/pages/Parents/FlowDashboard.tsx`
  - *Quoi :* Intégration de Mermaid.js pour générer un diagramme de flux interactif en 4 couches (Views, Stores, UI, Data). Options premium de copie de code et téléchargement SVG vectoriel haute définition intégrées.
  - *Statut :* **Réalisé (v3.3.0)**.
- [ ] **Innovation du Système de Récompense (Vision à long terme)** :
  - *Où :* `GiftsPage.tsx` / Nouvelle Galerie 3D
  - *Quoi :* Évoluer au-delà des émojis en introduisant des cadeaux exclusifs en 3D réactive, des autocollants interactifs texturés, et des récompenses jouables (ex. : mini-jeux intégrés par cadeau).
- [ ] **Régulation et Ergonomie Audio Intelligente** :
  - *Où :* Hook `useAudioFeedback` / store audio futur.
  - *Quoi :* Varier subtilement les arrangements musicaux et réduire progressivement le volume de fond après 5 minutes de jeu continu pour éviter la fatigue auditive des parents (fatigue des boucles répétitives).
- [ ] **Verrouillage de Profil Kid-Safe** :
  - *Où :* `ProfileSelection.tsx`
  - *Quoi :* Empêcher les frères et sœurs de s'infiltrer accidentellement sur le mauvais compte sur tablette partagée grâce à un code de verrouillage visuel hyper simple (ex : sélectionner 3 animaux fétiches dans l'ordre).
- [ ] **Extension de la Progression de Fin de Jeu (End-Game Content)** :
  - *Où :* Stores de progression et de quiz.
  - *Quoi :* Ajouter des évènements saisonniers et des quêtes hebdomadaires dynamiques pour repousser la limite de progression une fois le seuil de 5000 XP et toutes les médailles d'or obtenus.

- [/] **Générateur Dynamique de Quizz (Banque de Questions/Réponses et Choix Multiples)** :
  - *Où :* `TopicPage/index.tsx` / `quizzes.ts`
  - *Quoi :* Créer une banque enrichie de 3 à 4 questions différentes pour chaque sujet encyclopédique de l'application. Lors de l'accès au sujet par l'enfant, le système sélectionnera aléatoirement et mélangera les questions et réponses pour générer un défi unique et non répétitif à chaque session.
  - *Statut :* **PoC Réalisé sur l'Espace (v3.4.0)**. Logique de randomisation avec fallback implémentée. Reste à industrialiser sur les autres catégories.
- [/] **Banque de Faits Aléatoires « Le savais-tu ? »** :
  - *Où :* `TopicPage/index.tsx` / `space.ts` (etc.)
  - *Quoi :* Remplacer l'anecdote fixe « Le savais-tu ? » de chaque fiche thématique par un réservoir de 3 à 4 faits insolites et amusants différents. À chaque visite d'un enfant sur un sujet d'apprentissage, l'application affichera dynamiquement une nouvelle anecdote surprise.
  - *Statut :* **PoC Réalisé sur l'Espace (v3.4.0)**. Logique de randomisation via `useMemo` implémentée. Reste à industrialiser sur les autres catégories.
- [ ] **Variabilité Dynamique des Effets Sonores (Banque de Sons)** :
  - *Où :* Hook `useAudioFeedback.ts` / `assets/audio/`
  - *Quoi :* Éviter la monotonie auditive en introduisant une banque d'effets sonores multiples pour chaque action clé de l'interface (ex. : 3 à 4 variations de "Bloop" légers pour les clics ordinaires, 3 variations de fanfare ou d'applaudissements pour les victoires de quiz). Le hook audio sélectionnera aléatoirement un fichier au sein du groupe correspondant à l'évènement pour offrir un paysage sonore vivant et moins récurrent.
- [/] **Peaufiner le look de la page 'Le Grand Voyage du Temps'** :
  - *Où :* Composants de la page "Le Grand Voyage du Temps"
  - *Quoi :* Améliorer le design visuel pour le rendre plus immersif et esthétiquement attrayant.
- [/] **Enlever les quizz dans 'Le Grand Voyage du Temps'** :
  - *Où :* Composants de la page "Le Grand Voyage du Temps"
  - *Quoi :* Retirer la mécanique de quiz sur cette page pour privilégier l'exploration libre.

