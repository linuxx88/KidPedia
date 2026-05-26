import type { StateStorage } from 'zustand/middleware';

const DB_NAME = 'kidpedia-db';
const STORE_NAME = 'keyval';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };
  });

  return dbPromise;
}

// Helper to decompress legacy compressed store state
function decompressLegacyState(raw: string): string {
  try {
    const persisted = JSON.parse(raw);
    if (!persisted || !persisted.state) return raw;

    const { state } = persisted;

    // If it's already decompressed/regular format, return it
    if (state.progressions || (state.activeProfileId !== undefined && !state.p)) {
      return raw;
    }

    const { p, a } = state;
    const decompressedProgressions: Record<string, unknown> = {};

    if (p) {
      Object.keys(p).forEach((profileId) => {
        const cp = p[profileId];
        if (cp) {
          decompressedProgressions[profileId] = {
            badges: cp.b?.map((cb: { i: string; m: string }) => ({ id: cb.i, medal: cb.m })) || [],
            totalXP: cp.x || 0,
            currentRankId: cp.r || 'apprentice',
            unlockedAccessories: cp.u || [],
            equippedAccessoryId: cp.ea || null,
            equippedCompanionId: cp.ec || null,
            tickets: cp.t || 0,
            dailyDiscoveries: cp.d || {}
          };
        }
      });
    }

    const decompressedWrapper = {
      state: {
        progressions: decompressedProgressions,
        activeProfileId: a || null
      },
      version: persisted.version
    };

    return JSON.stringify(decompressedWrapper);
  } catch (e) {
    console.warn('[IndexedDB Storage] Failed to decompress legacy state:', e);
    return raw;
  }
}

export const indexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await getDB();
      let val = await new Promise<string | null>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(name);

        request.onsuccess = () => {
          const result = request.result;
          resolve(result !== undefined ? result : null);
        };

        request.onerror = () => {
          reject(request.error || new Error(`Failed to get key: ${name}`));
        };
      });

      // Migration strategy: check if the key exists in localStorage if missing in IndexedDB
      if (!val) {
        try {
          const localRaw = localStorage.getItem(name);
          if (localRaw) {
            // Decompress if it's the progression store
            const processedVal = name === 'kp-progression-storage' ? decompressLegacyState(localRaw) : localRaw;
            
            // Save to IndexedDB
            await indexedDBStorage.setItem(name, processedVal);
            
            // Clean legacy localStorage
            localStorage.removeItem(name);
            val = processedVal;
          }
        } catch (e) {
          console.warn(`[IndexedDB Storage] Failed to migrate key ${name} from localStorage:`, e);
        }
      }

      return val;
    } catch (e) {
      console.warn('[IndexedDB Storage] getItem error:', e);
      return null;
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, name);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          reject(request.error || new Error(`Failed to set key: ${name}`));
        };
      });
    } catch (e) {
      console.error('[IndexedDB Storage] setItem error:', e);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(name);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          reject(request.error || new Error(`Failed to remove key: ${name}`));
        };
      });
    } catch (e) {
      console.error('[IndexedDB Storage] removeItem error:', e);
    }
  }
};
