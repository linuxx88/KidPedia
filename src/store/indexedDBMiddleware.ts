import { type StateCreator, type StoreApi } from 'zustand';
import { saveProgress } from '../utils/storage';
import { indexedDBStorage } from '../utils/indexedDBStorage';
import { type ProgressionState } from './useProgressionStore';

interface StateStorageWithPromises {
  getItem(name: string): Promise<string | null>;
  setItem(name: string, value: string): Promise<void>;
  removeItem(name: string): Promise<void>;
}

export function isTestEnv(): boolean {
  const win = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : null;
  const glob = typeof globalThis !== 'undefined' ? (globalThis as unknown as Record<string, unknown>) : null;
  
  return !!(
    (win && (win.__vitest_environment__ || win.vi)) ||
    (glob && (glob.__vitest_environment__ || glob.vi))
  );
}

export interface IndexedDBMiddlewareOptions<T extends object> {
  name: string;
  partialize?: (state: T) => Partial<T> | unknown;
  onRehydrate?: (state: T) => void;
  migrate?: (persistedState: unknown, version: number) => unknown;
  version?: number;
}

export function indexedDBMiddleware<T extends object>(
  config: StateCreator<T>
): StateCreator<T>;

export function indexedDBMiddleware<T extends object>(
  options: IndexedDBMiddlewareOptions<T>
): (config: StateCreator<T>) => StateCreator<T>;

export function indexedDBMiddleware<T extends object>(
  configOrOptions: StateCreator<T> | IndexedDBMiddlewareOptions<T>
): StateCreator<T> | ((config: StateCreator<T>) => StateCreator<T>) {
  const storage = indexedDBStorage as unknown as StateStorageWithPromises;

  if (typeof configOrOptions === 'function') {
    // Legacy Progression Mode
    const config = configOrOptions as unknown as StateCreator<ProgressionState>;
    return ((
      set: StoreApi<ProgressionState>['setState'],
      get: StoreApi<ProgressionState>['getState'],
      api: StoreApi<ProgressionState>
    ) => {
      let hasHydratedState = false;

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
        const setFn = set as (p: unknown, r?: unknown) => void;
        setFn(partial, replace);
        const state = get();

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

      const store = config(
        customSet,
        get,
        api
      );

      const storeApiWithPersist = api as StoreApi<ProgressionState> & {
        persist?: {
          rehydrate: () => Promise<void>;
          clearStorage: () => Promise<void>;
          hasHydrated: () => boolean;
        };
      };
      storeApiWithPersist.persist = {
        hasHydrated: () => hasHydratedState,
        rehydrate: async () => {
          try {
            const raw = await storage.getItem('kp-progression-storage');
            if (raw) {
              const parsed = JSON.parse(raw) as { state?: ProgressionState };
              if (parsed && parsed.state) {
                set(parsed.state);
              }
            }
          } catch (error: unknown) {
            if (!isTestEnv()) {
              console.error('[indexedDBMiddleware] Échec de réhydratation du store:', error);
            }
          } finally {
            hasHydratedState = true;
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

      storeApiWithPersist.persist.rehydrate().catch((err: unknown) => {
        if (!isTestEnv()) {
          console.error('[indexedDBMiddleware] Échec réhydratation montage:', err);
        }
      });

      return store;
    }) as unknown as StateCreator<T>;
  } else {
    // Options Mode (New generic mode)
    const options = configOrOptions as IndexedDBMiddlewareOptions<T>;
    const { name, partialize, onRehydrate, migrate, version = 0 } = options;

    return (config: StateCreator<T>) => {
      return (
        set: StoreApi<T>['setState'],
        get: StoreApi<T>['getState'],
        api: StoreApi<T>
      ) => {
        let hasHydratedState = false;

        // Override api.setState to intercept all updates (actions & direct setState calls)
        const originalSetState = api.setState;
        api.setState = (partial, replace) => {
          (originalSetState as (p: unknown, r?: unknown) => void)(partial, replace);
          
          const state = get();
          const persistedState = partialize ? partialize(state) : state;

          const serializedWrapper = {
            state: persistedState,
            version
          };

          storage.setItem(name, JSON.stringify(serializedWrapper))
            .catch((err: unknown) => {
              if (!isTestEnv()) {
                networkErrorLog(name, err);
              }
            });
        };

        const store = config(
          api.setState,
          get,
          api
        );

        const storeApiWithPersist = api as StoreApi<T> & {
          persist?: {
            rehydrate: () => Promise<void>;
            clearStorage: () => Promise<void>;
            hasHydrated: () => boolean;
          };
        };
        storeApiWithPersist.persist = {
          hasHydrated: () => hasHydratedState,
          rehydrate: async () => {
            try {
              // Intercept legacy localStorage migration BEFORE calling storage.getItem(name)
              if (name === 'kp-settings-storage') {
                const legacyRaw = localStorage.getItem('kp-settings-storage');
                if (legacyRaw) {
                  try {
                    const parsed = JSON.parse(legacyRaw) as { state?: { theme?: string; isDarkMode?: boolean; isMuted?: boolean; language?: string } };
                    if (parsed && parsed.state) {
                      const legacyState = parsed.state;
                      const theme = legacyState.theme || (legacyState.isDarkMode ? 'dark' : 'light');
                      const isMuted = legacyState.isMuted !== undefined ? legacyState.isMuted : false;
                      const language = legacyState.language || 'fr';
                      
                      const migratedState = {
                        isMuted,
                        theme,
                        language
                      };
                      
                      const wrapper = { state: migratedState, version: 0 };
                      await storage.setItem(name, JSON.stringify(wrapper));
                    }
                  } catch (e) {
                    if (!isTestEnv()) console.warn('Failed to migrate settings from legacy localStorage:', e);
                  }
                  localStorage.removeItem('kp-settings-storage');
                }
              } else if (name === 'kp-championship-storage') {
                const legacyRaw = localStorage.getItem('kp-quiz-championship');
                if (legacyRaw) {
                  try {
                    const parsed = JSON.parse(legacyRaw) as { state?: { highScores?: { profileId: string; score: number; date?: string }[] } };
                    if (parsed && parsed.state) {
                      const legacyState = parsed.state;
                      const highScores = legacyState.highScores || [];
                      const records = highScores.map((score) => ({
                        profileId: score.profileId,
                        score: score.score,
                        completedAt: score.date || new Date().toISOString()
                      }));
                      
                      records.sort((a, b) => b.score - a.score);
                      const truncatedRecords = records.slice(0, 5);
                      
                      const wrapper = { state: { records: truncatedRecords }, version: 0 };
                      await storage.setItem(name, JSON.stringify(wrapper));
                    }
                  } catch (e) {
                    if (!isTestEnv()) console.warn('Failed to migrate championship from legacy localStorage:', e);
                  }
                  localStorage.removeItem('kp-quiz-championship');
                }
              }

              // Load from IndexedDB now that migration is complete
              const raw = await storage.getItem(name);
              if (raw) {
                const parsed = JSON.parse(raw) as { state?: T; version?: number };
                if (parsed && parsed.state) {
                  let state = parsed.state;
                  if (migrate && parsed.version !== undefined) {
                    state = migrate(state, parsed.version) as T;
                  }
                  if (state) {
                    if (onRehydrate) {
                      onRehydrate(state);
                    }
                    set(state);
                  }
                }
              }
            } catch (error: unknown) {
              if (!isTestEnv()) {
                console.error(`[indexedDBMiddleware] Échec de réhydratation du store ${name}:`, error);
              }
            } finally {
              hasHydratedState = true;
            }
          },
          clearStorage: async () => {
            try {
              await storage.removeItem(name);
            } catch (error: unknown) {
              if (!isTestEnv()) {
                console.error(`[indexedDBMiddleware] Échec du nettoyage de la persistance de ${name}:`, error);
              }
            }
          }
        };

        storeApiWithPersist.persist.rehydrate().catch((err: unknown) => {
          if (!isTestEnv()) {
            console.error(`[indexedDBMiddleware] Échec réhydratation montage de ${name}:`, err);
          }
        });

        return store;
      };
    };
  }
}

function networkErrorLog(name: string, err: unknown) {
  console.error(`[indexedDBMiddleware] Échec de persistance pour ${name}:`, err);
}

export default indexedDBMiddleware;
