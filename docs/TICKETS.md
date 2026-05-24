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

---


## 🎫 Ticket #64 : Icône de compagnon erronée ou par défaut inchangeable dans le plateau de jeu Safari
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Incohérence Visuelle / UX)
**Localisation** : `src/components/Game/MissionSafari.tsx`
**Description** :
Dans Mission Safari, le composant utilise un helper `getCompanionIcon()` pour afficher l'icône de compagnon de l'enfant dans la boîte de message en direct. Cependant, ce helper vérifie des identifiants simplifiés en français (`'chien'`, `'dino'`, `'robot'`) alors que le store de progression `useProgressionStore` et `ACCESSORIES_DB` gèrent et enregistrent des identifiants au format `'dog-companion'`, `'dino-companion'`, `'robot-companion'`. Cette désynchronisation empêche la reconnaissance du compagnon actuellement équipé, et l'UI retombe systématiquement sur l'emoji lion par défaut (`🦁`), ruinant la cohérence visuelle.
**Critères d'Acceptation (DOD)** :
- [ ] Corriger le helper `getCompanionIcon()` dans `src/components/Game/MissionSafari.tsx` pour tester les véritables IDs du store : `'dog-companion'`, `'dino-companion'`, et `'robot-companion'`.
- [ ] Valider que le compagnon actif s'affiche correctement sous forme d'emoji dans la boîte de dialogue lorsque le plateau est chargé avec un compagnon équipé.
- [ ] S'assurer que le compilateur TypeScript ne lève aucune erreur sur les chaînes de comparaison.

---


## 🎫 Ticket #66 : Absence de synthèse vocale (TTS) et Baguette de Lecture dans le Refuge des Compagnons
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Accessibilité / Inclusion Jeune Âge)
**Localisation** : `src/pages/Refuge/RefugePage.tsx`
**Description** :
KidPedia inclut une magnifique assistance vocale pour les enfants non-lecteurs (4-6 ans) à l'aide d'un bouton de synthèse globale et d'une "Baguette de Lecture" 🪄 interactive au survol. Toutefois, la zone premium "Le Refuge des Compagnons" et sa Boutique en sont totalement dépourvues. Les longs textes descriptifs de blocage (ex. *"Continue à apprendre et obtiens 3 médailles..."*) ainsi que les descriptions amusantes des friandises restent inaccessibles à l'écoute, empêchant les plus petits de jouer en parfaite autonomie. Il convient d'y intégrer la synthèse vocale pour en faire un espace 100% inclusif.
**Critères d'Acceptation (DOD)** :
- [ ] Importer et utiliser les hooks d'assistance vocale (`useReaderVoice` et/ou `useTextToSpeech`) au sein de `src/pages/Refuge/RefugePage.tsx`.
- [ ] Ajouter des boutons haut-parleur (DiscreteSpeaker) ou la baguette magique pour lire à haute voix les explications d'adoption et les descriptions des objets en boutique (os, feuille, batterie) selon la langue active du profil.
- [ ] Maintenir l'accessibilité aux normes WCAG avec des contrastes visuels préservés sur les éléments de focus.

---

## 🎫 Ticket #67 : Troncature du titre "Magasin de Friandises" sur mobile (S24 Ultra)
**Statut** : 🔴 À faire
**Sévérité** : Faible (Ergonomie visuelle)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.boutiqueTitle`) & `src/pages/Refuge/RefugePage.tsx`
**Description** :
Sur le viewport vertical étroit du Samsung Galaxy S24 Ultra (et autres smartphones en mode portrait), le titre de la boutique de friandises affiche "Magasin de Friand" au lieu de "Magasin de Friandises" car il est tronqué horizontalement par manque de place ou à cause d'un overflow caché. Il convient d'adapter la taille de police avec une fonction responsive `clamp` ou d'autoriser le retour à la ligne automatique pour que le texte s'affiche en entier.
**Critères d'Acceptation (DOD)** :
- [ ] Corriger le style CSS de `.boutiqueTitle` dans `RefugePage.module.css` pour empêcher la troncature du titre.
- [ ] Utiliser des polices fluides (`clamp`) ou un flex-wrap approprié pour assurer un affichage complet du titre "Magasin de Friandises" sur les écrans mobiles d'une largeur supérieure ou égale à 320px.
- [ ] Valider le rendu responsive sans aucun débordement horizontal du texte.

---

## 🎫 Ticket #68 : Troncature du bouton d'action "Nourrir" dans le Refuge
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Incohérence Visuelle / Accessibilité)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.actionBtn` / `.actionPanel`) & `src/pages/Refuge/RefugePage.tsx`
**Description** :
Dans le panneau d'action interactif sous le compagnon, le bouton destiné à alimenter l'animal affiche un texte tronqué "😋 No..." au lieu de "😋 Nourrir (🦴)". Cette coupure empêche le jeune enfant de comprendre l'action associée au bouton. Le conteneur `.actionPanel` flexbox contraint trop la largeur des boutons individuels sur des résolutions étroites comme celle du S24 Ultra.
**Critères d'Acceptation (DOD)** :
- [ ] Ajuster le dimensionnement de `.actionBtn` ou `.actionPanel` pour s'assurer que le texte entier "Nourrir" et l'emoji de la friandise s'affichent correctement.
- [ ] Permettre la réduction automatique de la taille de police sur mobile ou réemployer une orientation en colonne (`flex-direction: column`) sur les viewports étroits (< 480px) pour éviter toute troncature.
- [ ] Tester sur mobile portrait pour confirmer la lisibilité totale de l'action.

---


## 🎫 Ticket #70 : Double en-tête (Header) inutile et encombrant dans le Refuge des Compagnons sur mobile
**Statut** : 🔴 À faire
**Sévérité** : Moyenne (Ergonomie UI / Encombrement Mobile)
**Localisation** : `src/components/Layout/MainLayout.tsx` & `src/pages/Refuge/RefugePage.tsx`
**Description** :
La page du Refuge affiche simultanément l'en-tête global de l'application (barre `MainLayout` avec logo KidPedia, verrou parental, choix de profil, réglages de genre/thème, sourdine) et son propre en-tête interne (`⬅️ Retour`, `Le Refuge des Compagnons 🦄`, `🎫 0`). Ce double header encombre inutilement l'espace vertical disponible, ce qui est particulièrement pénalisant sur les téléphones en mode portrait comme le S24 Ultra. Il convient d'ajouter le chemin `/refuge` aux routes immersives dans `MainLayout.tsx` pour masquer le header global et le footer global, laissant le Refuge s'exprimer en plein écran.
**Critères d'Acceptation (DOD)** :
- [ ] Ajouter la route `/refuge` dans le filtre `isImmersive` au sein de `src/components/Layout/MainLayout.tsx` pour masquer automatiquement l'en-tête global et le pied de page global.
- [ ] Veiller à ce que l'en-tête interne de `RefugePage.tsx` gère proprement toutes les interactions nécessaires (retour à l'accueil via le bouton Retour, affichage du solde de tickets 🎫).
- [ ] Vérifier que la navigation vers d'autres pages réactive correctement l'en-tête global standard.

---

## 🎫 Ticket #71 : Absence d'indicateur de défilement horizontal pour le sélecteur de compagnons sur mobile
**Statut** : 🔴 À faire
**Sévérité** : Faible (Accessibilité / UX mobile)
**Localisation** : `src/pages/Refuge/RefugePage.module.css` (classe `.selectorBar`)
**Description** :
Sur un écran mobile portrait étroit comme le S24 Ultra, la barre de sélection des compagnons (`.selectorBar`) n'affiche que deux cartes ("Petit Chien" et "Bébé Dino"). Le troisième compagnon ("Mini Robot") est repoussé hors-écran vers la droite. Bien que la zone soit défilable horizontalement, aucun indicateur visuel (dégradé transparent sur le bord droit, flèche ou barre de défilement discrète) ne signale à l'enfant qu'il peut glisser son doigt pour faire apparaître d'autres animaux, limitant ainsi la découvrabilité du contenu.
**Critères d'Acceptation (DOD)** :
- [ ] Implémenter un indicateur visuel sur `.selectorBar` dans `RefugePage.module.css` (par exemple, un masque de dégradé transparent `mask-image` linéaire à droite, ou une ombre de débordement).
- [ ] S'assurer que l'indicateur s'estompe ou disparaît lorsque l'utilisateur a fait défiler la liste jusqu'au bout.
- [ ] Valider l'ergonomie sur mobile pour garantir que l'enfant comprend intuitivement la présence de choix supplémentaires.