import { type StateCreator } from 'zustand';
import { type ProgressionState, type ProfileSlice } from './types';
import { migrateLegacyProfile } from './migration';

export const createProfileSlice: StateCreator<
  ProgressionState,
  [],
  [],
  ProfileSlice
> = (set, get) => ({
  syncWithProfile: (profileId) => {
    const current = get();
    
    if (profileId === current.activeProfileId && (!profileId || current.progressions[profileId])) {
      return;
    }

    set({ activeProfileId: profileId });
    
    if (profileId && !get().progressions[profileId]) {
      // Migration Legacy isolée
      const legacyProgression = migrateLegacyProfile(profileId);
      
      set((state) => ({
        progressions: {
          ...state.progressions,
          [profileId]: legacyProgression
        }
      }));
    }
  },

  deleteProfileProgression: (profileId: string) => {
    set((state) => {
      const nextProgressions = { ...state.progressions };
      delete nextProgressions[profileId];
      return {
        progressions: nextProgressions,
        activeProfileId: state.activeProfileId === profileId ? null : state.activeProfileId
      };
    });
  },

  reset: () => {
    set({
      progressions: {},
      activeProfileId: null,
    });
  }
});
