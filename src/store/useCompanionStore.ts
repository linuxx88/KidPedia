import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useProgressionStore } from './useProgressionStore';
import { launchCelebration } from '../utils/celebrations';

export interface Poop {
  id: string;
  x: number;
  y: number;
}

export interface CompanionState {
  affection: number; // 0 to 100
  happiness: number; // 0 to 100
  lastFed: number | null; // Timestamp
  isFeeding: boolean;
  // Virtual Pet extensions
  energy: number; // 0 to 100
  isSleeping: boolean;
  poops: Poop[];
  isHiding: boolean;
  hidingSpot: number; // 0, 1, or 2
  hideSeekState: 'idle' | 'hiding' | 'success' | 'fail';
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
  feedCompanion: (profileId: string, companionId: string, treatId: 'sugarBone' | 'goldenLeaf' | 'batteryCell') => boolean;
  petCompanion: (companionId: string) => void;
  deleteProfileCompanionData: (profileId: string) => void;
  
  // Virtual Pet Actions
  setSleeping: (companionId: string, isSleeping: boolean) => void;
  incrementEnergy: (companionId: string, amount: number) => void;
  spawnPoop: (companionId: string) => void;
  cleanPoop: (companionId: string, poopId: string) => void;
  startHideSeek: (companionId: string) => void;
  guessHideSeek: (profileId: string, companionId: string, spotIndex: number) => boolean;
  exitHideSeek: (companionId: string) => void;
  
  reset: () => void;
}

const DEFAULT_COMPANION_STATE: CompanionState = {
  affection: 0,
  happiness: 50,
  lastFed: null,
  isFeeding: false,
  energy: 80,
  isSleeping: false,
  poops: [],
  isHiding: false,
  hidingSpot: 0,
  hideSeekState: 'idle',
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
        
        // Ensure defaults are populated for backward compatibility
        const companion = data.companions[companionId];
        return {
          ...DEFAULT_COMPANION_STATE,
          ...companion,
          poops: companion.poops || [],
        };
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

      feedCompanion: (profileId, companionId, treatId) => {
        if (!profileId) return false;

        const currentData = get().profileData[profileId];
        if (!currentData || (currentData.inventory[treatId] || 0) <= 0) return false;

        let reachedMaxAffection = false;

        set((state) => {
          const data = state.profileData[profileId];
          if (!data) return state;
          const companion = data.companions[companionId] || { ...DEFAULT_COMPANION_STATE };

          const oldAffection = companion.affection;
          const nextAffection = Math.min(100, oldAffection + 15);
          
          if (oldAffection < 100 && nextAffection === 100) {
            reachedMaxAffection = true;
          }

          const nextCompanionState = {
            ...DEFAULT_COMPANION_STATE,
            ...companion,
            affection: nextAffection,
            happiness: Math.min(100, companion.happiness + 10),
            lastFed: Date.now(),
            isFeeding: true,
            energy: Math.min(100, (companion.energy !== undefined ? companion.energy : 80) + 10), // Feeding grants energy
          };

          const nextInventory = {
            ...data.inventory,
            [treatId]: Math.max(0, (data.inventory[treatId] || 1) - 1),
          };

          return {
            profileData: {
              ...state.profileData,
              [profileId]: {
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

        setTimeout(() => {
          set((state) => {
            const data = state.profileData[profileId];
            if (!data || !data.companions[companionId]) return {};
            const companion = data.companions[companionId];
            const nextCompanionState = {
              ...companion,
              isFeeding: false,
            };
            return {
              profileData: {
                ...state.profileData,
                [profileId]: {
                  ...data,
                  companions: {
                    ...data.companions,
                    [companionId]: nextCompanionState,
                  },
                },
              },
            };
          });
        }, 2000);

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
            ...DEFAULT_COMPANION_STATE,
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

      setSleeping: (companionId, isSleeping) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    isSleeping,
                  },
                },
              },
            },
          };
        });
      },

      incrementEnergy: (companionId, amount) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          const currentEnergy = companion.energy !== undefined ? companion.energy : 80;
          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    energy: Math.max(0, Math.min(100, currentEnergy + amount)),
                  },
                },
              },
            },
          };
        });
      },

      spawnPoop: (companionId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          
          const newPoop = {
            id: `poop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            x: 20 + Math.random() * 60, // 20% to 80%
            y: 60 + Math.random() * 20, // 60% to 80%
          };

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    poops: [...(companion.poops || []), newPoop],
                    happiness: Math.max(0, companion.happiness - 10), // Poop reduces happiness immediately!
                  },
                },
              },
            },
          };
        });
      },

      cleanPoop: (companionId, poopId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          
          const nextPoops = (companion.poops || []).filter(p => p.id !== poopId);

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    poops: nextPoops,
                    happiness: Math.min(100, companion.happiness + 15),
                  },
                },
              },
            },
          };
        });
      },

      startHideSeek: (companionId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };
          const currentEnergy = companion.energy !== undefined ? companion.energy : 80;

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    energy: Math.max(0, currentEnergy - 15),
                    isHiding: true,
                    hidingSpot: Math.floor(Math.random() * 3), // 0, 1, or 2
                    hideSeekState: 'hiding',
                  },
                },
              },
            },
          };
        });
      },

      guessHideSeek: (profileId, companionId, spotIndex) => {
        if (!profileId) return false;

        let success = false;
        let reachedMaxAffection = false;

        set((state) => {
          const currentData = state.profileData[profileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };

          if (spotIndex === companion.hidingSpot) {
            success = true;
            const oldAffection = companion.affection;
            const nextAffection = Math.min(100, oldAffection + 15);
            if (oldAffection < 100 && nextAffection === 100) {
              reachedMaxAffection = true;
            }

            // Reward 2 tickets
            useProgressionStore.getState().addTickets(2);

            return {
              profileData: {
                ...state.profileData,
                [profileId]: {
                  ...currentData,
                  companions: {
                    ...currentData.companions,
                    [companionId]: {
                      ...DEFAULT_COMPANION_STATE,
                      ...companion,
                      affection: nextAffection,
                      happiness: Math.min(100, companion.happiness + 10),
                      hideSeekState: 'success',
                    },
                  },
                },
              },
            };
          } else {
            return {
              profileData: {
                ...state.profileData,
                [profileId]: {
                  ...currentData,
                  companions: {
                    ...currentData.companions,
                    [companionId]: {
                      ...DEFAULT_COMPANION_STATE,
                      ...companion,
                      hideSeekState: 'fail',
                    },
                  },
                },
              },
            };
          }
        });

        if (reachedMaxAffection) {
          launchCelebration();
        }

        return success;
      },

      exitHideSeek: (companionId) => {
        const activeProfileId = useProgressionStore.getState().activeProfileId;
        if (!activeProfileId) return;

        set((state) => {
          const currentData = state.profileData[activeProfileId] || {
            companions: {},
            inventory: { sugarBone: 0, goldenLeaf: 0, batteryCell: 0 },
          };
          const companion = currentData.companions[companionId] || { ...DEFAULT_COMPANION_STATE };

          return {
            profileData: {
              ...state.profileData,
              [activeProfileId]: {
                ...currentData,
                companions: {
                  ...currentData.companions,
                  [companionId]: {
                    ...DEFAULT_COMPANION_STATE,
                    ...companion,
                    isHiding: false,
                    hideSeekState: 'idle',
                  },
                },
              },
            },
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
