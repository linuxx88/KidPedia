# Système de Suivi des Bugs (Tickets Actifs)

Voici la liste des tickets ouverts concernant les bugs fonctionnels, les failles de sécurité, l'accessibilité ou les améliorations requises, basés sur l'audit complet du projet.

Vous pouvez consulter l'historique de tous les tickets déjà résolus et clôturés ici : [TICKETS_ARCHIVE.md](./TICKETS_ARCHIVE.md).

---

## 🎫 Ticket #05 : Absence d'effets sonores (Fichiers manquants ou commentés)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Richesse UX)
**Localisation** : `src/hooks/useAudioFeedback.ts`
**Description** :
Les effets sonores de base (clics, applaudissements de succès, erreurs, sonneries de médaille) sont actuellement muets dans l'application. Le hook `useAudioFeedback` a sa configuration d'assets commentée et produit des alertes de debug console indiquant *"Feedback visuel uniquement"*. Il faut réactiver et mapper une banque d'assets audio de qualité.

---

## 🎫 Ticket #15 : Sauts visuels et positionnement erratique lors du zoom sur mobile
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Ergonomie / UX tactile)
**Localisation** : `src/hooks/useMapZoom.ts` et `src/components/Game/TreasureMap.tsx`
**Description** :
La fonction `handleZoomAt` calcule l'origine du zoom en pourcentage par rapport au conteneur cible. Lors d'un double-clic ou d'un double-tap sur mobile, ce calcul provoque parfois un décalage brutal et désagréable de la caméra, car les coordonnées absolues ne prennent pas en compte le scroll actuel du conteneur parent (`scrollLeft`, `scrollTop`). Le zoom devrait recentrer élégamment la vue sur les coordonnées du tap de l'enfant sans sauts brusques.

---

## 🎫 Ticket #18 : Système de scoring d'XP linéaire et dévaluant pour le mode parfait
**Statut** : 🔴 À faire
**Sévérité** : Faible (Gamification / Pédagogie)
**Localisation** : `src/store/useProgressionStore.ts`
**Description** :
Les médailles d'or, d'argent et de bronze rapportent respectivement 1000, 500 et 250 XP. C'est un bon début, mais réussir un quiz du premier coup (médaille d'or) ne donne aucun bonus spécial de fierté ou d'encouragement visuel/audio distinct par rapport à un succès laborieux après 3 essais. Il faudrait créer un effet visuel "Parfait !" (Perfect) et attribuer un bonus d'XP ou un multiplicateur de score pour motiver l'enfant à réviser la fiche avant de se lancer.

---

## 🎫 Ticket #19 : Mutual-Exclusion défaillante entre FunFacts (Anecdotes) et Quiz
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Pédagogie / Richesse de contenu)
**Localisation** : `src/pages/Topic/index.tsx`
**Description** :
Même s'il existe une logique d'exclusion mutuelle basique (Ticket #04), le code actuel tire au sort séparément l'anecdote de manière aléatoire (`Math.random()`) et la question du quiz dans la banque de questions. Il arrive encore trop souvent que l'anecdote "Le savais-tu ?" et la question du quiz traitent exactement du même fait dans la même vue (ex: l'anecdote mentionne la température du noyau solaire et le quiz demande "Quelle est la température au cœur du Soleil ?"). Il faut mettre en œuvre un algorithme d'exclusion sémantique plus strict.

---

## 🎫 Ticket #20 : Absence de variété dans les descriptions introductives des sujets
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Pédagogie / Ré-engagement)
**Localisation** : `src/data/topics/` (ex: `space.ts`, `nature.ts`, etc.)
**Description** :
Les fiches des sujets (comme Le Soleil, La Terre, etc.) contiennent un champ unique `fullContent` pour présenter le concept. Dès la deuxième visite, l'enfant relit exactement le même texte textuellement. Pour dynamiser l'apprentissage, il faudrait structurer la base de données de sujets pour accepter un tableau de variations textuelles (`fullContents` ou `paragraphs`) adaptées à différents niveaux d'âge (ex: simplifiée pour les 4-6 ans, détaillée pour les 7-10 ans).

---

## 🎫 Ticket #21 : MuteToggle asynchrone provoquant des instanciations audio en doublon
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Performance / Fuite mémoire)
**Localisation** : `src/hooks/useAudioFeedback.ts` & `src/components/UI/MuteToggle.tsx`
**Description** :
Lorsque l'utilisateur clique rapidement sur le bouton de sourdine (Mute) à plusieurs reprises, les requêtes audio en cours d'initialisation côté navigateur (`new Audio()`) ne sont pas annulées. Elles continuent de charger les ressources réseau en parallèle. De plus, sous certaines conditions de latence, les sons peuvent se superposer de façon cacophonique même si le mode "Mute" est actif. Il faut mettre en place un gestionnaire d'instances audio unique et thread-safe.

---

## 🎫 Ticket #22 : Transition de volume abrupte (Coupure sèche de la musique d'ambiance)
**Statut** : 🔴 À faire
**Sévérité** : Faible (Design Sensoriel / UX)
**Localisation** : `src/hooks/useAmbientAudio.ts`
**Description** :
Le changement de page ou l'activation du mode sourdine coupe instantanément le son d'ambiance de l'application de façon très sèche et désagréable. Pour offrir une expérience premium digne d'un grand jeu vidéo éducatif, le hook `useAmbientAudio` devrait réaliser un fondu enchaîné linéaire (Fade In / Fade Out) sur 500ms à 1 seconde à l'aide d'un timer régulier ou de l'API Web Audio (gainNode).

---

## 🎫 Ticket #23 : Absence de contrôles indépendants pour les effets sonores (SFX) et la musique
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Accessibilité Sensorielle)
**Localisation** : `src/store/useSettingsStore.ts` & `src/pages/Parents/ParentsDashboard.tsx`
**Description** :
Actuellement, l'application ne propose qu'un bouton marche/arrêt global (`isMuted`). Certains enfants ou parents aimeraient pouvoir désactiver uniquement la musique d'ambiance répétitive tout en conservant les effets sonores de validation de quiz (SFX), ou inversement. Il est nécessaire de scinder l'état de sourdine en deux variables distinctes (`isMusicMuted` et `isSfxMuted`) et de proposer ces réglages fins dans la zone parents.

---

## 🎫 Ticket #25 : Traduction manquante des labels du module PWA
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Localisation)
**Localisation** : `src/components/UI/PWAPrompt.tsx`
**Description** :
À l'instar de la barrière parentale, les textes de notification d'installation de la Progressive Web App (PWA) sont entièrement écrits en dur en français ("L'application est prête à être utilisée hors-ligne !", "Une nouvelle version est disponible !", "Mettre à jour"). Ces messages doivent être localisés et intégrés dans les fichiers de traduction globaux `en.ts` et `fr.ts`.

---

## 🎫 Ticket #26 : Boucle de réaffichage intempestive du prompt d'installation PWA sur Safari iOS
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Robustesse Mobile)
**Localisation** : `src/components/UI/PWAPrompt.tsx`
**Description** :
Sur iOS Safari, les critères de déclenchement du prompt de mise à jour ou d'installation PWA diffèrent de Chrome. En l'absence de garde-fous stockés dans le sessionStorage ou localStorage, la bannière d'installation PWA réapparaît de manière récursive à chaque changement de route ou rafraîchissement de page, même si l'utilisateur l'a explicitement fermée. Il faut mémoriser le refus de l'utilisateur pour une durée déterminée.

---

## 🎫 Ticket #27 : Saut de mise en page (CLS - Cumulative Layout Shift) dans le Carousel Hero
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Performance Web Vitals)
**Localisation** : `src/components/Discovery/HeroCarousel.tsx`
**Description** :
Les images haute résolution du carrousel de la page d'accueil se chargent de manière asynchrone. Au chargement initial, le conteneur du carrousel n'a pas de hauteur minimale explicite définie en CSS, ce qui provoque un effondrement de la zone puis un décalage soudain de toute la page vers le bas une fois l'image chargée. Ce saut visuel dégrade l'indicateur LCP et CLS. Il faut appliquer un ratio hauteur/largeur fixe (aspect-ratio) et une couleur de fond de secours ou un skeleton loader.

---

## 🎫 Ticket #28 : Imports non utilisés et sélecteurs de style orphelins (Dead Code / CSS Pruning)
**Statut** : 🔴 À faire
**Sévérité** : Faible (Performance / Propreté du code)
**Localisation** : Fichiers CSS et TSX multiples (ex: `App.module.css`, `ParentsDashboard.module.css`)
**Description** :
L'audit du projet révèle la présence de classes CSS inutilisées et de variables CSS déclarées mais jamais lues. Ces éléments encombrent les fichiers sources et augmentent inutilement la taille du bundle CSS final de production. Un nettoyage rigoureux des classes CSS orphelines et l'activation de règles d'analyse statique strictes sont recommandés.

---

## 🎫 Ticket #30 : Lenteur de désérialisation du Zustand Store pour les profils volumineux
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Performance technique)
**Localisation** : `src/store/useProgressionStore.ts`
**Description** :
Le store de progression stocke l'intégralité des médailles et badges de tous les profils dans le localStorage sous forme de chaîne de caractères JSON. Si un foyer possède de nombreux profils avec des progressions très avancées (des centaines de badges cumulés), la désérialisation synchrone du localStorage lors du démarrage de l'application bloque le thread principal de rendu pendant plusieurs dizaines de millisecondes, créant un micro-freeze perceptible à l'écran. Il faut envisager un chargement asynchrone, un partitionnement par profil ou une compression légère des données de stockage.

---

## 🎫 Ticket #31 : Variables de couleurs CSS codées en dur dans les grilles vectorielles d'Origins
**Statut** : 🔴 À faire
**Sévérité** : Faible (Maintenabilité / Richesse visuelle)
**Localisation** : `src/pages/Origins/OriginsLayout.tsx` et `OriginsDetail.tsx`
**Description** :
Les dégradés SVG (`<linearGradient>`) utilisés pour dessiner le tracé de la frise chronologique sont définis avec des couleurs hexadécimales brutes codées en dur (ex: `#ef4444`, `#0369a1`). Lorsque l'utilisateur bascule entre le mode sombre et le mode clair, ces couleurs restent identiques et perdent en contraste ou en harmonie visuelle. Il faut remplacer ces couleurs en dur par des variables CSS dynamiques (ex: `var(--color-origins-marine-start)`) déclarées dans la feuille de styles générale.

---

## 🎫 Ticket #33 : Zone de recherche vide sans chemin de repli (No-Results Dead End)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (UX / Ergonomie)
**Localisation** : `src/pages/Home/index.tsx`
**Description** :
Si un enfant tape une recherche farfelue qui ne correspond à aucun sujet, l'écran affiche une illustration avec "Aucun résultat". Cependant, aucun bouton d'aide ou suggestion de recherche populaire n'est proposé pour relancer l'expérience. L'enfant se retrouve face à un mur. Il faudrait ajouter une section "Essayez de rechercher..." avec des étiquettes cliquables de sujets phares (ex: "Le Soleil", "Les Dinosaures", "Les Lions") pour encourager la reprise de l'exploration sans friction.

---

## 🎫 Ticket #35 : Dimensionnement dynamique des marqueurs de la Carte interactive (Overlapping lors du zoom)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (UX / Lisibilité)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `TreasureMap.module.css`
**Description** :
Lorsqu'un zoom avant est effectué sur la carte, les marqueurs de points d'intérêt (boutons d'îles/sujets) grandissent proportionnellement avec le zoom visuel CSS (`transform: scale(zoom)`). Par conséquent, à zoom élevé (ex: x3), les émojis et les étoiles de médailles deviennent gigantesques, s'empilent, se chevauchent et cachent complètement les détails de la carte environnante. Il faut appliquer un facteur d'échelle inverse (`scale(1 / zoom)`) sur les marqueurs individels afin qu'ils conservent une taille visuelle propre, constante et lisible quel que soit le niveau de zoom.

---

## 🎫 Ticket #36 : Liaison et Quizz pour les sous-nœuds du Big Bang (Origines h1)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/bigBang.ts` / Navigation
**Description** :
À l'exception de « La Singularité » (`bb1`) et « La Terre » (`bb9`), les nœuds intermédiaires (`bb2` à `bb8` : *Soupe de Particules*, *Naissance des Atomes*, *Expansion*, *Premières Étoiles*, etc.) n'ont pas de `topicId`. Il faut concevoir des sujets correspondants dans `space.ts`, des quiz d'intégrité associés, et les lier afin que toute la frise du Big Bang soit interactive et éducative.

---

## 🎫 Ticket #37 : Liaison et Quizz pour les sous-nœuds des Premières espèces marines (Origines h2)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/marine.ts` / Navigation
**Description** :
Actuellement, seul le dernier nœud de la frise marine est interactif. Tous les sous-nœuds de `marine.ts` (comme les premières bactéries, algues ou trilobites) doivent être liés à des sujets de l'encyclopédie (probablement dans `nature.ts` ou `animals.ts`) avec des quiz interactifs dédiés.

---

## 🎫 Ticket #38 : Liaison et Quizz pour les sous-nœuds des Premières espèces terrestres (Origines h3)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/land.ts` / Navigation
**Description** :
Les sous-nœuds de `land.ts` (premiers amphibiens, fougères géantes, insectes géants) n'ont pas de `topicId` actif. Ils doivent être liés à de nouveaux sujets et quiz pour enrichir l'exploration de la sortie des eaux.

---

## 🎫 Ticket #39 : Liaison et Quizz pour les sous-nœuds des Dinosaures (Origines h4)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/dinosaurs.ts` / Navigation
**Description** :
La frise des dinosaures (`dinosaurs.ts`) présente des espèces fascinantes (T-Rex, Diplodocus, Tricératops) qui ne redirigent vers aucun quiz ou fiche individuelle. Il faut mapper ces sous-nœuds vers les sujets de `dinosaurs.ts` de l'encyclopédie.

---

## 🎫 Ticket #40 : Liaison et Quizz pour les sous-nœuds des Premières formes humaines (Origines h5)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/humans.ts` / Navigation
**Description** :
Les différentes étapes de l'évolution des hominidés (Toumaï, Lucy, etc.) dans `humans.ts` manquent de redirection pédagogique. Il faut créer des mini-sujets historiques correspondants et les connecter.

---

## 🎫 Ticket #41 : Liaison et Quizz pour les sous-nœuds de l'Évolution de l'homme (Origines h6)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/evolution.ts` / Navigation
**Description** :
Les grandes avancées humaines de la frise `evolution.ts` (maîtrise du feu, premiers outils, art pariétal) doivent être connectées à des sujets dans `history.ts` ou dans un nouveau fichier thématique avec des quiz correspondants.

---

## 🎫 Ticket #42 : Liaison et Quizz pour les sous-nœuds des Regroupements primitifs (Origines h7)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/groups.ts` / Navigation
**Description** :
Les étapes de transition vers la sédentarisation (premières huttes, débuts de l'agriculture, élevage) dans `groups.ts` doivent être interactives et associées à des fiches pédagogiques.

---

## 🎫 Ticket #43 : Liaison et Quizz pour les sous-nœuds des Grandes civilisations (Origines h8)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/civilizations.ts` / Navigation
**Description** :
Les sous-nœuds de `civilizations.ts` (Égypte ancienne, Mésopotamie, Grèce antique, Empire romain) doivent être mappés vers des sujets existants ou nouveaux de la catégorie Histoire avec leurs quiz.

---

## 🎫 Ticket #44 : Liaison et Quizz pour les sous-nœuds du Moyen-Âge (Origines h9)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/middleAges.ts` / Navigation
**Description** :
Les éléments emblématiques du Moyen-Âge (châteaux forts, chevaliers, cathédrales, calligraphie) de la frise `middleAges.ts` doivent être liés à des sujets d'apprentissage et des quiz réels de l'encyclopédie.

---

## 🎫 Ticket #56 : Composant de Carte Parallaxe Dynamique (The Delight)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/components/Discovery/ParallaxTopicCard.tsx`
**Description** :
Transformer les cartes de navigation statiques du "Grand Voyage du Temps" en cartes interactives à effet de parallaxe "léger" pour attirer le regard des enfants sans les distraire de la lecture.
**Critères d'Acceptation (DOD)** :
- [ ] Créer un composant ParallaxTopicCard qui utilise onMouseMove (ou onPointerMove) pour incliner légèrement la carte vers le curseur (effet de tilt 3D).
- [ ] Appliquer transform-style: preserve-3d sur la carte et une perspective sur le conteneur parent.
- [ ] Limiter l'inclinaison maximale (ex: rotateY(10deg)) pour éviter l'effet de nausée, conformément aux standards A11y.
- [ ] Ajouter une ombre portée (box-shadow) qui se déplace de manière dynamique selon l'inclinaison pour renforcer l'aspect "objet 3D".

---

## 🎫 Ticket #57 : Gestion des "Hotspots" de lecture sur carte (The Foundation)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne
**Localisation** : `src/components/Discovery/ParallaxTopicCard.tsx`
**Description** :
S'assurer que l'effet de parallaxe ne gêne pas l'accès aux fiches pédagogiques (le contenu principal de la frise chronologique).
**Critères d'Acceptation (DOD)** :
- [ ] Assurer que la zone de texte (le titre du sujet) reste fixe sur le plan Z=0 (premier plan) alors que les illustrations décoratives bougent en arrière-plan (effet de parallaxe différencié).
- [ ] Appliquer pointer-events: none sur les éléments décoratifs pour que seuls les hotspots d'apprentissage capturent les clics.
- [ ] Tester la navigation clavier : la carte doit rester accessible via la touche Tab et Entrée même avec les transformations CSS activées.

---

## 🎫 Ticket #58 : Optimisation "Kid-Friendly" et Performance (The Brain)
**Statut** : 🔴 À faire
**Sévérité** : Élevée
**Localisation** : `src/hooks/useParallaxAnimation.ts`
**Description** :
Optimiser l'animation pour les tablettes d'entrée de gamme afin de garantir un 60 FPS constant, même avec plusieurs cartes à l'écran.
**Critères d'Acceptation (DOD)** :
- [ ] Utiliser will-change: transform sur toutes les cartes parallaxe pour forcer l'accélération matérielle (GPU).
- [ ] Implémenter une vérification de la préférence utilisateur prefers-reduced-motion : si le système demande moins de mouvements, les cartes redeviennent fixes et plates.
- [ ] Définir une limite de "cartes actives" : seules les cartes dans le viewport doivent calculer leur parallaxe.
- [ ] S'assurer que le calcul des coordonnées de souris est nettoyé (cleanup) lors du démontage du composant pour éviter toute fuite de mémoire.

---

# 🗺️ FEUILLE DE ROUTE (ROADMAP) : Versions v0.0.3 à v0.0.9 (Contenu Premium PM)

Ce volet réunit les spécifications stratégiques conçues par le Product Manager pour les futures itérations du MVP (versions 0.0.3 à 0.0.9), visant à consolider l'immersion ludique, l'ergonomie physique et l'apprentissage inclusif des 4-8 ans.

---

## 🎫 Ticket #R5 : Version 0.0.5 - Le Grand Quiz des Champions (Mode Défi) 🏆
**Statut** : 🔴 À faire (Planifié pour v0.0.5)
**Sévérité** : Moyenne (Gamification / Rétention)
**Localisation** : `src/pages/Championship/` & `src/store/useQuizChampionshipStore.ts`
**Description** :
Introduire un mode de jeu compétitif et rejouable appelé "Le Grand Quiz". Contrairement aux quiz classiques de fiche, ce mode tire 10 questions aléatoires à travers toutes les catégories de l'encyclopédie. Un compte à rebours ludique de 15 secondes par question matérialisé par une mèche d'allumette qui brûle ajoute une tension excitante, récompensée par une avalanche de confettis dorés et un trophée physique à exposer.
**Critères d'Acceptation (DOD)** :
- [ ] Construire le composant `ChampionshipPage` avec un design premium (effet néon, dégradés d'or).
- [ ] Implémenter le minuteur graphique interactif (SVG de mèche d'allumette qui brûle progressivement).
- [ ] Sauvegarder les 5 meilleurs scores locaux dans le `LocalStorage` et afficher un tableau d'honneur personnalisé avec l'avatar de l'enfant.

---

## 🎫 Ticket #R6 : Version 0.0.6 - La Carte interactive Sonorisée 🗺️
**Statut** : 🔴 À faire (Planifié pour v0.0.6)
**Sévérité** : Faible (Immersion Sensorielle)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `src/hooks/useMapSounds.ts`
**Description** :
Sublimer la carte au trésor interactive en y intégrant un habillage sonore spatialisé de haute qualité. Le glissement (drag/pan) sur la carte doit diffuser un bruit continu et doux de vagues océaniques et de vent marin. Le survol ou le clic sur les îles thématiques déclenche des sonorités spatialisées (cris de mouettes, grondement lointain de volcan, musique mystique des étoiles pour l'île de l'Espace) renforçant le "Waouh effect".
**Critères d'Acceptation (DOD)** :
- [ ] Configurer un gestionnaire de contexte audio Web Audio API pour spatialiser les sons selon la position de défilement (panning) de la carte.
- [ ] Assurer un fondu enchaîné (fade in/out) de 400ms lors de la sélection des îles pour éviter toute transition audio abrupte.
- [ ] Lier cette ambiance au bouton général de sourdine (`MuteToggle`) de l'en-tête pour respecter la tranquillité des parents.

---

## 🎫 Ticket #R7 : Version 0.0.7 - La Cabane Personnalisable d'Explorateur 🎁
**Statut** : 🔴 À faire (Planifié pour v0.0.7)
**Sévérité** : Moyenne (Mécanique de Collectionneur)
**Localisation** : `src/pages/Cabin/` & `src/store/useCabinStore.ts`
**Description** :
Offrir à l'enfant un espace virtuel personnel appelé "Ma Cabane". Dans cet espace, l'enfant peut disposer ses médailles d'or physiques sur un grand mur de trophées en bois poli et placer ses compagnons virtuels à différents endroits de la pièce. Il peut également décorer sa cabane avec des accessoires thématiques achetés en récompense de ses progrès scolaires (ex: poster du système solaire, tapis peau de dinosaure).
**Critères d'Acceptation (DOD)** :
- [ ] Concevoir un décor de cabane chaleureux en verre dépoli et bois 3D avec grilles d'ancrage tactiles simples (drag-and-drop d'éléments).
- [ ] Implémenter le store de sauvegarde de la cabane persistant dans `useCabinStore`.
- [ ] Permettre à l'enfant de faire des photos (screenshots) de sa cabane pour les sauvegarder dans son Carnet de Voyage.

---

## 🎫 Ticket #R8 : Version 0.0.8 - Le Journal d'Exploration Collaboratif (Enfant-Parent) 📔
**Statut** : 🔴 À faire (Planifié pour v0.0.8)
**Sévérité** : Moyenne (Lien Social / Pédagogie active)
**Localisation** : `src/pages/Journal/` & `src/components/Journal/ParentBridge.tsx`
**Description** :
Créer une passerelle éducative interactive entre l'enfant et ses parents. Le "Journal d'Exploration" compile les accomplissements de l'enfant sous forme d'illustrations d'aventurier à compléter, et propose une section "Le savais-tu, papa et maman ?" contenant des questions insolites basées sur les leçons du jour (ex: *"Savais-tu que la Terre tourne à 1600 km/h sans qu'on s'en rende compte ?"*). Cela encourage l'échange verbal et familial à table.
**Critères d'Acceptation (DOD)** :
- [ ] Structurer le journal comme un véritable livre d'aventures avec des effets d'ouverture 3D et de pages qui tournent.
- [ ] Proposer 3 questions de discussion parent-enfant générées dynamiquement chaque jour selon les sujets explorés par l'enfant.
- [ ] Permettre aux parents d'attribuer des "Étoiles d'Encouragement" depuis leur zone sécurisée pour débloquer un cadeau spécial.

---

## 🎫 Ticket #R9 : Version 0.0.9 - Le Verrouillage Kid-Safe Intelligent 🔒
**Statut** : 🔴 À faire (Planifié pour v0.0.9)
**Sévérité** : Moyenne (Ergonomie / Sécurité)
**Localisation** : `src/components/Parents/ParentsGate.tsx`
**Description** :
Le système actuel pour entrer dans la Zone Parents repose sur des multiplications simples (ex: `8 x 7`). Cependant, certains enfants précoces de 8 ans contournent ce verrou facilement. Il faut remplacer cette formule austère par des puzzles ludo-éducatifs plus élaborés mais non mathématiques (ex: "Associe le bébé animal à son parent", ou des suites logiques de constellations) insolubles pour les plus petits, tout en étant distrayants.
**Critères d'Acceptation (DOD)** :
- [ ] Créer une banque de 5 mini-jeux de logique/association visuels rapides (durée < 10 secondes pour un adulte).
- [ ] Gérer l'échec de tentative en brouillant les cartes d'association pour éviter le forçage par clics aléatoires chez l'enfant.
- [ ] Conserver l'accessibilité WCAG AA avec des descriptions vocales et des contrastes élevés sur les cartes de puzzle.
