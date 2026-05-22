import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useProgressionStore } from './useProgressionStore';
import { launchCelebration } from '../utils/celebrations';

export interface CompanionState {
  affection: number; // 0 to 100
  happiness: number; // 0 to 100
  lastFed: number | null; // Timestamp
}

export interface ProfileCompanionData {
  companions: Record<string, CompanionState>;
  inventory: {
    sugarBone: number;
    goldenLeaf: number;
    batteryCell: number;
  };
}

export interface CompanionStore {
  profileData: Record<string, ProfileCompanionData>;
  
  // Getters for active profile
  getCompanionState: (companionId: string) => CompanionState;
  getInventory: () => { sugarBone: number; goldenLeaf: number; batteryCell: number };
  
  // Actions
  buyTreat: (treatType: 'sugarBone' | 'goldenLeaf' | 'batteryCell', cost: number) => boolean;
  feedCompanion: (companionId: string, treatType: 'sugarBone' | 'goldenLeaf' | 'batteryCell') => boolean;
  petCompanion: (companionId: string) => void;
  deleteProfileCompanionData: (profileId: string) => void;
  reset: () => void;
}

const DEFAULT_COMPANION_STATE: CompanionState = {
  affection: 0,
  happiness: 50,
  lastFed: null,
};

const DEFAULT_PROFILE_DATA: ProfileCompanionData = {
  companions: {},
  inventory: {
    sugarBone: 0,
    goldenLeaf: 0,
    batteryCell: 0,
  },
};

export const useCompanionStore = create<CompanionStore>()(
  persist(
    (set, get) => ({
      profileData: {},

      getCompanionState: (companionId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return DEFAULT_COMPANION_STATE;
        
        const data = get().profileData[activeProfileId];
        if (!data || !data.companions[companionId]) {
          return DEFAULT_COMPANION_STATE;
        }
        return data.companions[companionId];
      },

      getInventory: () => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return DEFAULT_PROFILE_DATA.inventory;
        
        const data = get().profileData[activeProfileId];
        return data ? data.inventory : DEFAULT_PROFILE_DATA.inventory;
      },

      buyTreat: (treatType, cost) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return false;

        const progressionStore = useProgressionStore.getState();
        const tickets = progressionStore.getTickets();

        if (tickets < cost) return false;

        // Déduire le ticket dans le progression store
        progressionStore.addTickets(-cost);

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };

          const nextInventory = {
            ...currentData.inventory,
            [treatType]: (currentData.inventory[treatType] || 0) + 1,
          };

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                inventory: nextInventory,
              },
            },
          };
        });

        return true;
      },

      feedCompanion: (companionId, treatType) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return false;

        const currentData = get().profileData[activeProfileId];
        if (!currentData || (currentData.inventory[treatType] || 0) <= 0) return false;

        let reachedMaxAffection = false;

        set((state) => {
          const data = state.profileData[activeProfileId];
          const companion = data.companions[companionId] || { ...DEFAULT_COMPANION_STATE };

          const oldAffection = companion.affection;
          const nextAffection = Math.min(100, oldAffection + 15);
          
          if (oldAffection < 100 && nextAffection === 100) {
            reachedMaxAffection = true;
          }

          const nextCompanionState = {
            ...companion,
            affection: nextAffection,
            happiness: Math.min(100, companion.happiness + 10),
            lastFed: Date.now(),
          };

          const nextInventory = {
            ...data.inventory,
            [treatType]: Math.max(0, (data.inventory[treatType] || 1) - 1),
          };

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...data,
                companions: {
                  ...data.companions,
                  [companionId]: nextCompanionState,
                },
                inventory: nextInventory,
              },
            },
          };
        });

        if (reachedMaxAffection) {
          launchCelebration();
        }

        return true;
      },

      petCompanion: (companionId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };

          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          const nextCompanionState = {
            ...companion,
            happiness: Math.min(100, companion.happiness + 5),
          };

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: nextCompanionState,
                },
              },
            },
          };
        });
      },

      deleteProfileCompanionData: (profileId) => {
        set((state) => {
          const nextData = { ...state.profileData };
          delete nextData[profileId];
          return {
            profileData: nextData,
          };
        });
      },

      reset: () => {
        set({ profileData: {} });
      },
    }),
    {
      name: 'kp-companion-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
