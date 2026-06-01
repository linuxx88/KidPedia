import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { indexedDBMiddleware } from './indexedDBMiddleware';
import { type Sticker, type ProgressionState } from './progression/types';
import { createProfileSlice } from './progression/profileSlice';
import { createXpBadgeSlice } from './progression/xpBadgeSlice';
import { createAccessorySlice } from './progression/accessorySlice';
import { createCollectiblesSlice } from './progression/collectiblesSlice';

// Re-export type for external compatibility
export type { Sticker, ProgressionState };

export const useProgressionStore = create<ProgressionState>()(
  indexedDBMiddleware(
    (set, get, store) => ({
      // --- Initial State ---
      progressions: {},
      activeProfileId: null,

      // --- Slices ---
      ...createProfileSlice(set, get, store),
      ...createXpBadgeSlice(set, get, store),
      ...createAccessorySlice(set, get, store),
      ...createCollectiblesSlice(set, get, store)
    })
  )
) as UseBoundStore<StoreApi<ProgressionState>> & {
  persist: {
    rehydrate: () => Promise<void>;
    clearStorage: () => Promise<void>;
  };
};
