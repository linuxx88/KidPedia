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
L'audit du projet révèle la présence de classes CSS inutilisées et de variables CSS déclarées mais jamais lues. Ces éléments encombrent les fichiers sources et augmentent inutilement la taille du bundle CSS final de production. Un nettoyage rigoureux des classes CSS orphelines et l'activation de règles d'analyse statique strictes sont recommandés.
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
2. **Rétrocompatibilité Transparente** : Détection intelligente des formats de stockage legacy non compressés au démarrage, garantissant une migration fluide sans aucune perte de progression pour l'utilisateur.
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
2. **Surcharges de Contraste Mode Sombre** : Définition de valeurs de substitution dans le bloc `html[data-theme='dark']` pour toutes les variables, remplaçant les teintes trop sombres (comme le bleu nuit `#0f172a` et les bruns) par des dégradés néon/vibrants (indigo électrique, cyan, rose, vert émeraude), évitant la disparition visuelle du tracé et rehaussant l'harmonie.
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

### 📑 Rapport d'Analyse QA : Incohérences de `z-index`

#### 1. Conflits d'empilement au sommet de l'application (`z-index: 9999`)
Plusieurs overlays et composants globaux critiques partagent exactement le même niveau d'affichage, rendant leur ordre de superposition indéterministe (dépendant uniquement de l'ordre d'insertion dans le DOM) :
*   [OrientationGuard.module.css:4](file:///J:/KIDPEDIA/KidPedia/src/components/Layout/OrientationGuard.module.css#L4) : `.overlay { z-index: 9999; }`
*   [OfflineFallback.module.css:13](file:///J:/KIDPEDIA/KidPedia/src/components/UI/OfflineFallback.module.css#L13) : `.container { z-index: 9999; }`
*   [ParentalGate.module.css:9](file:///J:/KIDPEDIA/KidPedia/src/components/UI/ParentalGate.module.css#L9) : `.overlay { z-index: 9999; }`
*   [ToastContainer.module.css:5](file:///J:/KIDPEDIA/KidPedia/src/components/UI/Toast/ToastContainer.module.css#L5) : `.container { z-index: 9999; }`
*   **Impact :** Un toast de notification peut s'afficher *derrière* la barrière parentale ou l'écran hors-ligne. De plus, l'écran de garde d'orientation (bloquant) peut être masqué par d'autres overlays.
*   **Solution recommandée :** Hiérarchiser les priorités : `OrientationGuard` (ex: `100000`), `ToastContainer` (ex: `90000`), puis `OfflineFallback` / `ParentalGate` (ex: `80000`).

---

#### 2. Collisions avec le Header global (`z-index: 100`)
Des overlays censés bloquer l'écran partagent le même `z-index` que le header global collant (`z-index: 100`), ce qui génère un chevauchement visuel incorrect :
*   [LifeCirclePage.module.css:390](file:///J:/KIDPEDIA/KidPedia/src/pages/LifeCircle/LifeCirclePage.module.css#L390) : `.modalOverlay { z-index: 100; }` (Modal pédagogique)
*   [MissionSafari.module.css:199](file:///J:/KIDPEDIA/KidPedia/src/components/Game/MissionSafari.module.css#L199) : `.quizOverlay { z-index: 100; }` (Overlay du Quiz actif)
*   [PageHeader.module.css:15](file:///J:/KIDPEDIA/KidPedia/src/components/Layout/PageHeader.module.css#L15) & [MainLayout.module.css:27](file:///J:/KIDPEDIA/KidPedia/src/components/Layout/MainLayout.module.css#L27) : `.header` / `.appHeader { z-index: 100; }`
*   **Impact :** Le header global de l'application ou d'autres éléments collants peuvent s'afficher *au-dessus* ou *au travers* du modal pédagogique ou de l'overlay de quiz.
*   **Solution recommandée :** Augmenter le z-index de ces overlays bloquants pour qu'ils soient cohérents avec le reste de l'application (ex: `z-index: 1000`).

---

#### 3. Conflits d'overlays standards et d'éléments flottants (`z-index: 1000`)
Plusieurs overlays et boutons d'actions partagent le niveau `1000`, créant des risques de superposition indésirables :
*   [AppOverlay.module.css:4](file:///J:/KIDPEDIA/KidPedia/src/components/UI/AppOverlay.module.css#L4) : `.overlayContainer { z-index: 1000; }`
*   [GiftsPage.module.css:760](file:///J:/KIDPEDIA/KidPedia/src/components/Learning/ExplorerGallery/GiftsPage.module.css#L760) : `.modalOverlay { z-index: 1000; }`
*   [PWAPrompt.module.css:9](file:///J:/KIDPEDIA/KidPedia/src/components/UI/PWAPrompt.module.css#L9) : `.prompt { z-index: 1000; }`
*   [TopicDetail.module.css:481](file:///J:/KIDPEDIA/KidPedia/src/components/Learning/TopicDetail.module.css#L481) : `.baguetteFloatingBtn { z-index: 1000; }`
*   **Impact :** Le bouton d'action flottant (`.baguetteFloatingBtn`) peut apparaître au-dessus des modals de confirmation ou du prompt PWA, perturbant l'interface utilisateur.
*   **Solution recommandée :** Réduire le z-index du bouton flottant (ex: `z-index: 900`) pour s'assurer qu'il soit toujours couvert par les overlays.

---

#### 4. Anomalie de z-index inline (`zIndex: 999`)
*   [LifeCirclePage.tsx:225](file:///J:/KIDPEDIA/KidPedia/src/pages/LifeCircle/LifeCirclePage.tsx#L225) : `zIndex: 999` (Animation d'XP flottante `+XP`)
*   **Impact :** L'animation de gain d'XP s'affiche au-dessus du modal de la page (`z-index: 100`), mais passera en dessous si des overlays standards de l'application (`z-index: 1000`) sont affichés.
*   **Solution recommandée :** Aligner la gestion des animations d'XP flottantes avec les autres composants d'effets visuels et l'abaisser sous le niveau des modals.

---

#### 5. Contexte d'empilement global inutile sur `#root`
*   [reset.css:66](file:///J:/KIDPEDIA/KidPedia/src/styles/reset.css#L66) : `#root { position: relative; z-index: 1; }`
*   **Impact :** Crée un contexte d'empilement racine pour toute l'application. Bien que bénin si tout est dans React, cela enferme tous les overlays `fixed` (ex: `z-index: 9999`) sous le niveau d'autres éléments qui seraient injectés directement dans le `<body>` par des scripts tiers ou extensions de navigateur.
*   **Solution recommandée :** Supprimer le `z-index: 1` sur `#root`.