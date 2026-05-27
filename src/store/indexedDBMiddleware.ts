import { type StateCreator, type StoreApi } from 'zustand';
import { saveProgress } from '../utils/storage';
import { indexedDBStorage } from '../utils/indexedDBStorage';
import { type ProgressionState } from './useProgressionStore';

interface StateStorageWithPromises {
  getItem(name: string): Promise<string | null>;
  setItem(name: string, value: string): Promise<void>;
  removeItem(name: string): Promise<void>;
}

const storage = indexedDBStorage as unknown as StateStorageWithPromises;

const isTestEnv = (): boolean => {
  const win = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : null;
  const glob = typeof globalThis !== 'undefined' ? (globalThis as unknown as Record<string, unknown>) : null;
  
  return !!(
    (win && (win.__vitest_environment__ || win.vi)) ||
    (glob && (glob.__vitest_environment__ || glob.vi))
  );
};

/**
 * Middleware Zustand personnalisé indexedDBMiddleware.
 * Synchronise automatiquement l'état avec IndexedDB (via Dexie) lors de chaque modification,
 * tout en maintenant une couche de compatibilité .persist pour le harnais de test existant.
 */
export const indexedDBMiddleware = (
  config: StateCreator<ProgressionState>
): StateCreator<ProgressionState> => {
  return (set, get, api) => {
    // Surcharges de type conformes à la signature Zustand set
    function customSet(
      partial: ProgressionState | Partial<ProgressionState> | ((state: ProgressionState) => ProgressionState | Partial<ProgressionState>),
      replace?: false
    ): void;
    function customSet(
      state: ProgressionState | ((state: ProgressionState) => ProgressionState),
      replace: true
    ): void;
    function customSet(
      partial: unknown,
      replace?: unknown
    ): void {
      // Appliquer la mise à jour d'état normale en redirigeant proprement les types
      const setFn = set as (p: unknown, r?: unknown) => void;
      setFn(partial, replace);
      const state = get();

      // Synchroniser la progression du profil actif avec la table Dexie via saveProgress
      const activeId = state.activeProfileId;
      if (activeId) {
        const prog = state.progressions[activeId];
        if (prog) {
          saveProgress({
            profileId: activeId,
            badges: prog.badges,
            totalXP: prog.totalXP,
            currentRankId: prog.currentRankId,
            unlockedAccessories: prog.unlockedAccessories,
            equippedAccessoryId: prog.equippedAccessoryId,
            equippedCompanionId: prog.equippedCompanionId,
            tickets: prog.tickets,
            dailyDiscoveries: prog.dailyDiscoveries || {},
            updatedAt: Date.now()
          }).catch((err: unknown) => {
            if (!isTestEnv()) {
              console.error('[indexedDBMiddleware] Échec saveProgress:', err);
            }
          });
        }
      }

      // Maintenir le stockage key-value complet pour la rétrocompatibilité (Zustand persist-like)
      const serializedWrapper = {
        state: {
          progressions: state.progressions,
          activeProfileId: state.activeProfileId
        },
        version: 0
      };

      storage.setItem('kp-progression-storage', JSON.stringify(serializedWrapper))
        .catch((err: unknown) => {
          if (!isTestEnv()) {
            console.error('[indexedDBMiddleware] Échec de la persistance rétrocompatible:', err);
          }
        });
    }

    // Initialisation du store
    const store = config(customSet, get, api);

    // Mock/Adaptateur de l'interface .persist de Zustand pour la suite de tests unitaires
    const storeApiWithPersist = api as StoreApi<ProgressionState> & { persist?: { rehydrate: () => Promise<void>; clearStorage: () => Promise<void> } };
    storeApiWithPersist.persist = {
      rehydrate: async () => {
        try {
          const raw = await storage.getItem('kp-progression-storage');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.state) {
              set(parsed.state);
            }
          }
        } catch (error: unknown) {
          if (!isTestEnv()) {
            console.error('[indexedDBMiddleware] Échec de réhydratation du store:', error);
          }
        }
      },
      clearStorage: async () => {
        try {
          await storage.removeItem('kp-progression-storage');
        } catch (error: unknown) {
          if (!isTestEnv()) {
            console.error('[indexedDBMiddleware] Échec du nettoyage de la persistance:', error);
          }
        }
      }
    };

    // Exécuter la réhydratation automatique au montage
    storeApiWithPersist.persist.rehydrate().catch((err: unknown) => {
      if (!isTestEnv()) {
        console.error('[indexedDBMiddleware] Échec réhydratation montage:', err);
      }
    });

    return store;
  };
};
export default indexedDBMiddleware;
