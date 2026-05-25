# Système de Suivi des Bugs (Tickets Actifs)

Voici la liste des tickets ouverts concernant les bugs fonctionnels, les failles de sécurité, l'accessibilité ou les améliorations requises, basés sur l'audit complet du projet.

Vous pouvez consulter l'historique de tous les tickets déjà résolus et clôturés ici : [TICKETS_ARCHIVE.md](./TICKETS_ARCHIVE.md).

---

# 🗺️ FEUILLE DE ROUTE (ROADMAP) : Versions v0.0.3 à v0.0.9 (Contenu Premium PM)

Ce volet réunit les spécifications stratégiques conçues par le Product Manager pour les futures itérations du MVP (versions 0.0.3 à 0.0.9), visant à consolider l'immersion ludique, l'ergonomie physique et l'apprentissage inclusif des 4-8 ans.

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