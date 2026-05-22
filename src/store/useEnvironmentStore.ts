import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface EnvironmentState {
  // --- STATE ---
  currentSeason: Season;
  
  // --- ACTIONS ---
  setSeason: (season: Season) => void;
  triggerNextSeason: () => void;
  cycleSeason: () => void;
  reset: () => void;
}

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set, get) => ({
      // --- Initial State ---
      currentSeason: 'spring',

      // --- Actions ---
      setSeason: (season: Season) => {
        set({ currentSeason: season });
      },

      triggerNextSeason: () => {
        const { currentSeason } = get();
        const currentIndex = SEASONS.indexOf(currentSeason);
        const nextIndex = (currentIndex + 1) % SEASONS.length;
        set({ currentSeason: SEASONS[nextIndex] });
      },

      cycleSeason: () => {
        get().triggerNextSeason();
      },

      reset: () => {
        set({ currentSeason: 'spring' });
      }
    }),
    {
      name: 'kp-environment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
