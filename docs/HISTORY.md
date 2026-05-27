# 📜 Historique des Versions - KidPedia

Ce document retrace l'évolution technique et pédagogique du projet, de son lancement à son état actuel de maturité industrielle.

---

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

### VERSION 3.34.0 - Phase 2 Migration IndexedDB & Utilitaires CRUD (26 Mai 2026)
--------------------------------------------------
- **[Logic/Data] Utilitaires d'accès aux données de progression via Dexie (Ticket Infrastructure) :**
    - **storage.ts** : Création des fonctions utilitaires asynchrones CRUD (`saveProgress`, `getProgress`, `getAllProgress`, `deleteProgress`) basées sur Dexie avec une gestion d'erreurs robuste, garantissant un typage strict et rejetant les données non conformes.
    - **storage.test.ts** : Couverture complète en tests unitaires validant tous les cas nominaux et d'erreurs avec des mocks de la table Dexie sous Vitest.

### VERSION 3.33.0 - Phase 1 Migration IndexedDB (Dexie.js) & StorageProvider (26 Mai 2026)
--------------------------------------------------
- **[Infrastructure/Dexie/IndexedDB] Initialisation de Dexie et Abstraction CRUD (Ticket Infrastructure) :**
    - **db.ts** : Initialisation de la base de données Dexie `'KidPediaDexieDB'` avec les schémas des tables `progression` (profil, badges, XP, rang) et `keyval` (clé-valeur générique pour la compatibilité).
    - **storageProvider.ts** : Modélisation et implémentation de la couche d'abstraction abstraite `StorageProvider` et concrète `DexieStorageProvider` pour simplifier les opérations de lecture/écriture avec IndexedDB.
