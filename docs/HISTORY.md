# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

### VERSION 3.38.0 - Refactoring Audio Storyteller & Intégration Visuelle Immersive Origines (29 Mai 2026)
--------------------------------------------------
- **[Logic/Audio/UX] Refactoring du Système Audio Storyteller (Bouton Unique & Mobile-First) :**
    - **Uniformisation Audio** : Retrait complet des haut-parleurs individuels (`DiscreteSpeaker`) et des boutons audio redondants au sein de `src/components/Learning/` et `src/pages/Topic/`.
    - **Bouton Unique Storyteller** : Intégration du composant premium `StorytellerButton` (le Hibou interactif) comme unique déclencheur de la narration text-to-speech via le hook partagé `useStoryteller`.
    - **Contrôle d'Exclusivité Flux** : Appel systématique à `stopStory()` avant toute nouvelle lecture de paragraphe pour éliminer tout risque de superposition ou chevauchement sonore indésirable.
    - **Sécurisation Interactions & Ergonomie Mobile** : Ajout de `e.stopPropagation()` sur les clics de lecture pour bloquer les triggers collatéraux d'options de réponse dans les quiz. Dimensionnement rigoureux des zones tactiles avec une cible minimale de 44px pour un confort d'usage optimal sur tablettes et smartphones.

- **[UI/UX/Performance] Fond d'Écran Immersif & Optimisation PWA de la Frise Chronologique :**
    - **OriginsLayout.tsx** : Intégration du fond d'écran immersif fixe `fabian-schneider.webp` sur le conteneur principal de la frise chronologique de la section "Origines du Temps".
    - **Optimisation et Caching PWA** : Redimensionnement intelligent et compression de l'image de 3.6 MB en un format `.webp` optimisé de 532 KB (`1920x2880`), résolvant définitivement les restrictions de cache Workbox limitées à 2 MiB pour assurer un fonctionnement hors-ligne parfait.
    - **Performances Web** : Rendu dynamique via une balise `<img>` dotée de `loading="lazy"` et `fetchPriority="low"` pour soulager le thread principal lors du chargement initial de l'application.
    - **Style Immersif & Confort de Lecture** : Application du style fixed cover via CSS (`object-fit: cover`, `object-position: center`, `position: fixed`, `inset: 0`) et introduction d'un masque de dégradé linéaire de lisibilité (`mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4))`) pour sublimer la frise chronologique blanche sans aucune altération de contraste.

### VERSION 3.37.0 - Phase 4 Migration Active des Données (localStorage vers IndexedDB) (26 Mai 2026)
--------------------------------------------------
- **[Logic/Data/Migration] Script d'initialisation de migration asynchrone transparente (Ticket Infrastructure) :**
    - **migration.ts** : Création d'un script de migration robuste `migrateLocalStorageToDB` qui s'exécute une seule fois au chargement de l'application (contrôlé par la clé `'kp-dexie-migrated'`).
    - **Normalisation Rétrocompatible :** Intégration de la fonction `normalizeLegacyState` capable de décompresser les anciens formats de progression compressés (v1.x) pour les convertir de manière résiliente vers le format standard v3.x.
    - **Migration Active Non Destructive :** Importation et appel de `saveProgress()` de `./storage` pour écrire chaque profil trouvé dans la table de progression Dexie, et migration des magasins transverses Zustand (`kp-settings-storage`, `kp-profiles-index`, `kp-active-profile-id`) dans `db.keyval` (Dexie). Les clés de `localStorage` sont conservées temporairement pendant au moins deux versions mineures pour la sécurité des utilisateurs inactifs.
    - **main.tsx** : Intégration asynchrone du script de migration avant le rendu React final (`createRoot().render`), garantissant l'intégrité de la réhydratation de la base de données.
    - **Tests & Validation :** 100% de passage au vert sur les tests unitaires de migration de données et sur les tests E2E sous Chromium, Firefox et Webkit.

### VERSION 3.36.0 - Validation de la Suite de Tests End-to-End (E2E) Playwright (26 Mai 2026)
--------------------------------------------------
- **[QA/CI/E2E] Validation de la stabilité de la suite de tests E2E avec Playwright (Ticket E2E) :**
    - **Exécution réussie de la suite complète :** Passage au vert des 60 tests E2E sur l'ensemble de la matrice de navigateurs majeurs (Chromium, Firefox et Webkit/Safari) avec un taux de réussite de 100% (60/60).
    - **Optimisation de la stabilité E2E :** Limitation du nombre de workers (`--workers=2`) et extension intelligente des timeouts (`--timeout=60000`) sur l'environnement de test pour prévenir la famine de ressources CPU/IO sur les conteneurs virtuels et éradiquer les faux positifs ou échecs de timeout sous Webkit et Firefox.
    - **Validation de la compatibilité IndexedDB/Dexie :** Confirmation du bon fonctionnement du nouveau middleware de persistance `indexedDBMiddleware` sous un cycle de vie réel d'un navigateur : création de profils, enregistrement asynchrone des scores XP/médailles, transitions et isolations strictes des données multi-explorateurs.

### VERSION 3.35.0 - Phase 3 Migration IndexedDB & Middleware Zustand (26 Mai 2026)
--------------------------------------------------
- **[Logic/Zustand/IndexedDB] Middleware de synchronisation automatique asynchrone (Ticket Infrastructure) :**
    - **indexedDBMiddleware.ts** : Développement d'un middleware Zustand sur mesure interceptant les mutations du store de progression (`useProgressionStore`) et les persistant automatiquement en tâche de fond dans Dexie.js (`saveProgress`).
    - **Harnais de test unitaire Vitest :** Intégration d'un mock/adaptateur de l'interface de réhydratation de persistance de Zustand (`store.persist`) pour conserver une compatibilité absolue à 100% avec les 240+ tests unitaires existants sans introduire de régression de build.


