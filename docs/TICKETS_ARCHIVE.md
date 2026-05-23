# 📜 Système de Suivi des Tickets Archivés (Résolus)

Ce document regroupe les tickets résolus et clôturés lors des audits et sprints de développement précédents de KidPedia, assurant un historique complet tout en allégeant le document de suivi actif.

Vous pouvez consulter les tickets actifs restants dans [TICKETS.md](./TICKETS.md).

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
