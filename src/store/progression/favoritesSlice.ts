import { type StateCreator } from 'zustand';
import { type ProgressionState, type FavoritesSlice } from './types';
import { DEFAULT_PROGRESSION } from './constants';

export const createFavoritesSlice: StateCreator<
  ProgressionState,
  [],
  [],
  FavoritesSlice
> = (set, get) => ({
  getFavorites: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.favorites : []) || [];
  },

  isFavorite: (topicId: string) => {
    const { progressions, activeProfileId } = get();
    if (!activeProfileId) return false;
    const currentFavorites = progressions[activeProfileId]?.favorites || [];
    return currentFavorites.includes(topicId);
  },

  toggleFavorite: (topicId: string) => {
    const { activeProfileId } = get();
    if (!activeProfileId) return false;

    let isAdded = false;

    set((state) => {
      const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const currentFavorites = current.favorites || [];
      const alreadyFavorite = currentFavorites.includes(topicId);

      let nextFavorites: readonly string[];
      if (alreadyFavorite) {
        nextFavorites = currentFavorites.filter((id) => id !== topicId);
        isAdded = false;
      } else {
        nextFavorites = [...currentFavorites, topicId];
        isAdded = true;
      }

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            favorites: nextFavorites,
          },
        },
      };
    });

    return isAdded;
  },
});
