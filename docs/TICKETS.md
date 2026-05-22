# Système de Suivi des Bugs (Tickets)

Voici la liste des tickets ouverts concernant les bugs fonctionnels, les failles de sécurité, l'accessibilité ou les améliorations requises, basés sur l'audit complet du projet.

---

## 🎫 Ticket #01 : Désynchronisation du Quiz (Logique de validation)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Bug Fonctionnel)
**Localisation** : `TopicPage` / `useQuizStore.ts`
**Description** :
Lorsqu'un sujet (ex: Le Soleil) tire au sort une nouvelle question via la `QUIZ_BANKS`, l'interface affiche bien la nouvelle question et ses choix. Cependant, la logique de validation est désynchronisée : le composant de gestion globale (`useQuizStore`) vérifie probablement la réponse par rapport à l'ancienne question statique (`QUIZZES[topicId]`) au lieu de la nouvelle question générée. Cela provoque une incohérence entre ce qui est cliqué et ce qui est validé.

---

## 🎫 Ticket #02 : Contenu principal statique (Manque de variabilité)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Amélioration UX)
**Localisation** : `TopicPage` / `space.ts`
**Description** :
Actuellement, seule l'anecdote ("Le savais-tu ?") et le quiz sont générés dynamiquement. Le texte d'introduction principal (ex: *"Le Soleil est une étoile géante. Toutes les planètes tournent autour de lui..."*) reste toujours le même à chaque visite. Pour que l'expérience soit complètement renouvelée à chaque session, il faudrait potentiellement ajouter une liste `fullContents` avec 3 ou 4 variations du texte principal pour chaque astre.

---

## 🎫 Ticket #03 : Bouton "La Singularité" (Lien brisé ou mal redirigé)
**Statut** : 🟢 Résolu
**Sévérité** : Moyenne
**Localisation** : `src/data/origins/bigBang.ts` / Navigation
**Description** :
Un clic sur le bouton "La singularité" (situé dans la catégorie des Origines / L'Odyssée de l'Univers) ne mène actuellement vers aucune page contenant un quiz. Il semble y avoir un problème de routage ou de reconnaissance de ce `topicId` spécifique par le composant `TopicPage`. A été résolu en associant le sujet 'singularite' avec ses questions et quiz dédiés et en vérifiant l'intégrité via des tests automatisés.

---

## 🎫 Ticket #04 : Sécurité anti-spoiler (Pédagogie Quiz / Anecdotes)
**Statut** : 🔴 À faire
**Sévérité** : Faible (Qualité / Pédagogie)
**Localisation** : `TopicPage` / logique de sélection
**Description** :
Éviter que l'anecdote ("Le savais-tu ?") ne donne la réponse directe au quiz affiché juste en dessous. Par exemple, si le quiz est *"Combien de Terres peut-on mettre dans le Soleil ?"*, il faut s'assurer que l'anecdote choisie ne soit pas *"On pourrait mettre 1 million de Terres à l'intérieur du Soleil !"*. Il faut implémenter un filtre d'exclusion mutuelle pour ces cas de doublons sémantiques.

---

## 🎫 Ticket #05 : Absence d'effets sonores (Fichiers manquants ou commentés)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Richesse UX)
**Localisation** : `src/hooks/useAudioFeedback.ts`
**Description** :
Les effets sonores de base (clics, applaudissements de succès, erreurs, sonneries de médaille) sont actuellement muets dans l'application. Le hook `useAudioFeedback` a sa configuration d'assets commentée et produit des alertes de debug console indiquant *"Feedback visuel uniquement"*. Il faut réactiver et mapper une banque d'assets audio de qualité.

---

## 🎫 Ticket #06 : 89 Sujets "Orphelins" (Intégrité de la navigation)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Exploration)
**Localisation** : `src/data/dataIntegrity.test.ts` (Données / Cartographie)
**Description** :
D'après nos tests automatisés d'intégrité, **89 sujets** (comme Le Singe, Le Soleil, La Tortue, Le Tricératops, etc.) sont déclarés "orphelins". Ils existent dans la base de données mais ne sont liés à aucune île de la Carte interactive, aucun Cercle d'apprentissage, ni aucun nœud d'Histoire dans "Le Grand Voyage du Temps". L'enfant ne peut donc pas les découvrir de manière naturelle en naviguant. Il faut les mapper ou décider de leur mode d'accès.

---

## 🎫 Ticket #07 : Resampling / Reshuffle intempestif lors du changement de langue
**Statut** : 🔴 À faire
**Sévérité** : Faible (Cohérence UX)
**Localisation** : `TopicPage/index.tsx`
**Description** :
La sélection de l'index de l'anecdote et du quiz se fait dans un `useEffect` qui dépend de `language`. Si un enfant change la langue de l'application (Français ⇄ Anglais) pendant qu'il est sur la page du Soleil, le système ne se contente pas de traduire le texte : il ré-exécute le tirage au sort aléatoire. L'enfant se retrouve donc avec une *autre* question et une *autre* anecdote au lieu de voir la traduction de ce qu'il lisait. Il faut mémoriser les indices choisis et ne changer que la langue.

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

## 🎫 Ticket #15 : Sauts visuels et positionnement erratique lors du zoom sur mobile
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Ergonomie / UX tactile)
**Localisation** : `src/hooks/useMapZoom.ts` et `src/components/Game/TreasureMap.tsx`
**Description** :
La fonction `handleZoomAt` calcule l'origine du zoom en pourcentage par rapport au conteneur cible. Lors d'un double-clic ou d'un double-tap sur mobile, ce calcul provoque parfois un décalage brutal et désagréable de la caméra, car les coordonnées absolues ne prennent pas en compte le scroll actuel du conteneur parent (`scrollLeft`, `scrollTop`). Le zoom devrait recentrer élégamment la vue sur les coordonnées du tap de l'enfant sans sauts brusques.

---

## 🎫 Ticket #16 : Événement de fermeture de quiz punitif dans le Mission Safari
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (UX / Logique de jeu)
**Localisation** : `src/components/Game/MissionSafari.tsx`
**Description** :
Dans le Mission Safari, si l'enfant ferme la modale/overlay du quiz en cliquant sur la croix ou en dehors de la modale (`onClose={() => handleQuizAnswer(false)}`), le jeu préserve cela comme un échec immédiat au quiz (`QUIZ_FAILURE`). L'animal s'enfuit, et le joueur perd son tour de jeu. Ce comportement est trop punitif pour les enfants. Fermer la modale devrait simplement suspendre l'état du quiz ou nécessiter une confirmation ("Voulez-vous vraiment quitter ce défi ?") pour éviter les clics accidentels destructeurs.

---

## 🎫 Ticket #17 : Risque de blocage asynchrone des lancers de dés (Safari et Carte)
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Robustesse asynchrone)
**Localisation** : `src/store/useSafariStore.ts`, `src/components/Game/MissionSafari.tsx`
**Description** :
Un mécanisme d'annulation par transaction ID (`currentRollId`) a été implémenté dans le store de jeu Safari. Chaque nouvel appel à `rollDice` ou à `reset` incrémente cet ID. Après chaque transition ou temporisation asynchrone (`await setTimeout`), l'ID de la tâche en cours est confronté à l'ID global du store, arrêtant instantanément la tâche si une désynchronisation (comme un reset ou un nouveau lancer) est détectée. De plus, un `useEffect` de nettoyage au démontage dans `MissionSafari.tsx` déclenche automatiquement `reset()` pour interrompre toutes les tâches asynchrones en cours lorsque l'utilisateur quitte le plateau de jeu.


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

## 🎫 Ticket #24 : Synthèse Vocale (TTS - Text-To-Speech) manquante pour les enfants non-lecteurs
**Statut** : 🔴 À faire
**Sévérité** : Élevée (Accessibilité / Inclusion)
**Localisation** : `src/components/Learning/TopicDetail/index.tsx`
**Description** :
Kidpedia s'adresse aussi aux jeunes enfants (4-6 ans) qui ne savent pas encore parfaitement lire. Sans synthèse vocale, l'application leur est inaccessible en autonomie pour les textes longs (anecdotes, descriptions de fiches). Il convient d'ajouter un bouton "Haut-parleur" discret permettant de lire les textes via l'API Web Speech Synthesis native du navigateur, configurée selon la langue active du profil (`fr` ou `en`).

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

## 🎫 Ticket #29 : Écran noir ou freeze au démarrage en cas de lancement hors-ligne
**Statut** : 🟢 Résolu
**Sévérité** : Critique (Robustesse PWA / Expérience hors-ligne)
**Localisation** : `vite.config.ts`, `src/components/UI/OfflineFallback.*`, `src/components/Layout/ErrorBoundary.tsx`, `src/main.tsx`
**Description** :
Le service worker via `vite-plugin-pwa` a été reconfiguré pour pré-mettre en cache tous les fichiers d'actifs internes (`.jpg`, `.woff`, `.woff2`, etc.) et pour stocker dynamiquement les fichiers CDN Google Fonts en cache d'exécution (`runtimeCaching`).
Un écran de secours moderne et premium adapté aux enfants (`OfflineFallback`) a été développé avec une illustration animée et dynamique en SVG ainsi qu'un bouton de rechargement. Un `ErrorBoundary` global a été configuré et injecté dans `main.tsx` pour intercepter les échecs de téléchargement réseau et chunk (ChunkLoadError) lors d'une navigation hors-ligne et pour afficher de manière résiliente l'écran hors-ligne.


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

## 🎫 Ticket #32 : Absence d'indicateurs de focus clavier sur les éléments interactifs des quiz
**Statut** : 🔴 À faire
**Sévérité** : Élevée (Accessibilité numérique)
**Localisation** : `src/components/Learning/Quiz/index.tsx`
**Description** :
Dans l'interface de quiz, les boutons de réponse n'affichent aucune bordure de focus distinctive lorsqu'ils sont sélectionnés à l'aide de la touche de tabulation (Tab) du clavier. Cela empêche les enfants en situation de handicap moteur ou visuel utilisant des dispositifs d'assistance clavier de savoir sur quel bouton ils s'apprêtent à cliquer. Il faut ajouter des styles `:focus-visible` attrayants et conformes aux normes WCAG.

---

## 🎫 Ticket #33 : Zone de recherche vide sans chemin de repli (No-Results Dead End)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (UX / Ergonomie)
**Localisation** : `src/pages/Home/index.tsx`
**Description** :
Si un enfant tape une recherche farfelue qui ne correspond à aucun sujet, l'écran affiche une illustration avec "Aucun résultat". Cependant, aucun bouton d'aide ou suggestion de recherche populaire n'est proposé pour relancer l'expérience. L'enfant se retrouve face à un mur. Il faudrait ajouter une section "Essayez de rechercher..." avec des étiquettes cliquables de sujets phares (ex: "Le Soleil", "Les Dinosaures", "Les Lions") pour encourager la reprise de l'exploration sans friction.

---

## 🎫 Ticket #34 : Blocage du défilement dans la zone négative de la Carte interactive
**Statut** : 🟢 Résolu
**Sévérité** : Élevée (Bug Fonctionnel / UX)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `src/hooks/useMapZoom.ts`
**Description** :
Lors du zoom sur la carte interactive, si l'origine du zoom (`transform-origin`) est définie sur une coordonnée relative ou centrale, le zoom décale la carte vers le haut et la gauche en coordonnées négatives. Les navigateurs ne permettant pas le défilement horizontal ou vertical dans les coordonnées négatives (`scrollLeft < 0` ou `scrollTop < 0`), l'enfant se retrouve bloqué par un "mur virtuel" et ne peut plus explorer ou glisser (drag/pan) vers le haut et la gauche de la carte. Il faut forcer l'origine du zoom à `0 0` (top left) et compenser programmatiquement par le défilement (`scrollLeft`/`scrollTop`) du conteneur parent pour centrer la zone ciblée.

---

## 🎫 Ticket #35 : Dimensionnement dynamique des marqueurs de la Carte interactive (Overlapping lors du zoom)
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (UX / Lisibilité)
**Localisation** : `src/components/Game/TreasureMap.tsx` & `TreasureMap.module.css`
**Description** :
Lorsqu'un zoom avant est effectué sur la carte, les marqueurs de points d'intérêt (boutons d'îles/sujets) grandissent proportionnellement avec le zoom visuel CSS (`transform: scale(zoom)`). Par conséquent, à zoom élevé (ex: x3), les émojis et les étoiles de médailles deviennent gigantesques, s'empilent, se chevauchent et cachent complètement les détails de la carte environnante. Il faut appliquer un facteur d'échelle inverse (`scale(1 / zoom)`) sur les marqueurs individuels afin qu'ils conservent une taille visuelle propre, constante et lisible quel que soit le niveau de zoom.

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

## 🎫 Ticket #50 : Création du Store Événementiel Saisonnier (Couche 2 : The Brain)
Statut : 🔴 À faire

Sévérité : Élevée (Infrastructure Métier)

Localisation : src/store/useEnvironmentStore.ts


Description : Pour alimenter dynamiquement la page du parallaxe, il faut s'assurer que le store useEnvironmentStore est capable de gérer l'état complet du monde (World State) de manière saine. Bien que la suppression de l'ancienne version ébauchée ait été actée en v3.0.10, ce nouveau besoin nécessite de réimplémenter une gestion fine et réactive des saisons pour piloter les vues.

Critères d'Acceptation (DOD) :

[ ] Définir un type strict Season = 'spring' | 'summer' | 'autumn' | 'winter' sans aucun usage du type any.

[ ] Implémenter l'état initial currentSeason: 'spring'.

[ ] Ajouter une action setSeason(season: Season) pour forcer un changement thématique depuis l'espace développeur ou la zone parents.

[ ] Ajouter une action triggerNextSeason() permettant de basculer cycliquement d'une saison à l'autre de manière séquentielle.

[ ] Connecter le middleware persist de Zustand sous la clé kp-environment-storage pour sauvegarder la saison préférée de l'enfant d'une session à l'autre.

## 🎫 Ticket #51 : Composant de Vue Multicouche LifeCirclePage.tsx (Couche 1 : The Surface)
Statut : 🔴 À faire

Sévérité : Moyenne (Interface utilisateur)

Localisation : src/pages/LifeCircle/LifeCirclePage.tsx et LifeCirclePage.module.css


Description : Créer le composant de présentation principal mettant en scène le cycle de la nature à l'aide de l'effet de parallaxe CSS 3D pur (sans calculs JavaScript sur le scroll afin de préserver les performances des tablettes d'entrée de gamme).

Critères d'Acceptation (DOD) :

[ ] Créer une structure HTML/TSX comprenant au minimum 3 plans distincts imbriqués dans un conteneur principal configuré avec une perspective 3D (perspective: 1px et transform-style: preserve-3d).

[ ] Appliquer des translations sur l'axe Z (translateZ) et des échelles de compensation (scale) pour créer l'effet de profondeur automatique lors du défilement vertical.

[ ] Connecter la racine de la page au store useEnvironmentStore pour injecter dynamiquement une classe CSS correspondant à la saison active (.spring, .autumn, etc.).

[ ] Assurer un scroll fluide à 60 FPS en appliquant la propriété CSS will-change: transform sur les couches en mouvement.

[ ] Configurer la route /lifecircle via le système de routing principal avec chargement à la demande (Lazy Loading) pour ne pas alourdir le bundle de démarrage.

## 🎫 Ticket #52 : Accessibilité, Gestion Tactile et Masquage d'Occlusion (Couche 3 : The Delight)
Statut : 🔴 À faire

Sévérité : Élevée (Inclusion & Expérience Utilisateur)

Localisation : src/pages/LifeCircle/ & src/styles/


Description : Sécuriser l'interactivité de la page vis-à-vis des interactions des enfants en situation de handicap, du comportement sur les tablettes tactiles (iPad/Android) et régler les conflits de collisions de clics induits par les agrandissements d'échelle (scale) des décors en arrière-plan.

Critères d'Acceptation (DOD) :

[ ] Accessibilité (A11y) : Encapsuler l'effet de profondeur dans une requête média @media (prefers-reduced-motion: reduce). Si l'appareil de l'enfant a cette option activée, l'effet parallaxe doit s'annuler automatiquement pour repasser sur un défilement à plat standard.

[ ] Collisions de clics : Appliquer la propriété CSS pointer-events: none sur les éléments décoratifs d'arrière-plan et de second plan (.layerBackground et .layerMidground) afin qu'ils ne bloquent pas les clics et événements tactiles destinés aux éléments interactifs placés au premier plan.

[ ] Ressources Vectorielles : Utiliser exclusivement des illustrations pures au format SVG inline injectées directement dans le DOM pour dessiner l'Arbre Sacré central et les paysages. Aucun fichier lourd .png ou .jpg ne doit être utilisé, assurant un affichage net sans flou lors du zoom et une compatibilité absolue avec l'architecture PWA hors-ligne du projet.

## 🎫 Ticket #53 : Raccordement du "Cercle de la Vie" aux Hotspots d'Apprentissage (Couche 4 : The Foundation)
Statut : 🔴 À faire

Sévérité : Moyenne (Intégrité des données)

Localisation : src/data/topics/nature.ts ou nouveau fichier de données dédié.

Description : Donner du sens pédagogique au projet en connectant les éléments visuels de l'arbre à des fiches de micro-learning réelles. L'enfant doit pouvoir cliquer sur des zones précises (Hotspots) de la scène en mouvement pour ouvrir des popups de secrets ou de leçons, réutilisant le composant standardisé de ton infrastructure.

Critères d'Acceptation (DOD) :

[ ] Déclarer les identifiants uniques des éléments de la nature (ex: le-bourgeon, la-vieille-souche) et s'assurer qu'ils passent le validateur automatique de la suite de tests createTopicCard de ta Data Factory.

[ ] Implémenter le composant d'interaction standardisé AccessibleSvgHotspot sur des nœuds précis du SVG de l'arbre.

[ ] Assurer le blindage A11y complet de chaque hotspot : chaque zone doit supporter le focus clavier (tabindex={0}), disposer de rôles sémantiques conformes (role="button") et réagir à l'appui sur les touches Entrée et Espace.

[ ] Lier l'interaction de réussite ou de découverte de ces secrets au gain d'XP du store générique global useProgressionStore.getState().addXP().

---

## 🎫 Ticket #54 : Modularisation de la Banque de Questions Monolithique
Statut : 🔴 À faire

Sévérité : Élevée (Maintenabilité & Architecture)

Localisation : `src/data/quizzes.ts` (et création de `src/data/quizzes/`)

Description : 
Le fichier `src/data/quizzes.ts` est devenu un monolithe de 45.7 Ko et plus de 1 400 lignes, regroupant toutes les banques de questions (`QUIZ_BANKS`) et tous les quiz simples (`QUIZZES`) de l'application. Cette centralisation excessive nuit à la lisibilité, au principe de responsabilité unique (SRP) et augmente drastiquement les risques de conflits lors des fusions de branches git. Il faut diviser cette base de données en fichiers spécialisés par thématique de manière transparente.

Critères d'Acceptation (DOD) :

[ ] Créer un nouveau répertoire `src/data/quizzes/` pour y accueillir les banques découpées par domaine.

[ ] Créer des fichiers de données spécialisés typés de manière stricte (ex: `space.ts`, `animals.ts`, `dinosaurs.ts`, `history.ts`, `nature.ts`, etc.) respectant la répartition par catégorie.

[ ] Créer un fichier de centralisation `src/data/quizzes/index.ts` qui regroupe, fusionne et ré-exporte `QUIZ_BANKS` et `QUIZZES` sous leurs structures initiales exactes.

[ ] Mettre à jour l'ancien point d'entrée `src/data/quizzes.ts` pour qu'il ré-exporte directement depuis `src/data/quizzes/index.ts` afin d'éviter tout changement cassant sur les composants consommateurs.

[ ] S'assurer que le compilateur TypeScript ne lève aucune erreur de typage (lancer `npm run type-check`).

[ ] S'assurer que l'intégralité de la suite de tests (Vitest) s'exécute sans aucune régression (lancer `npm run validate`).

