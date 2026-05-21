import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GiftState {
  isChestOpened: boolean;
  isEligibleToOpen: boolean;
  
  // Actions
  checkEligibility: (currentXP: number) => void;
  openChest: () => void;
  reset: () => void;
}

/**
 * useGiftStore - Gère l'état de récompense spéciale (le coffre aux secrets).
 * Suit le principe de persistance pour garder le coffre ouvert une fois débloqué.
 */
export const useGiftStore = create<GiftState>()(
  persist(
    (set) => ({
      isChestOpened: false,
      isEligibleToOpen: false,

      /**
       * Vérifie si l'enfant a assez d'XP pour ouvrir le coffre.
       * Seuil fixé à 1000 XP (Rang Explorateur).
       */
      checkEligibility: (currentXP: number) => {
        const threshold = 1000;
        set({ isEligibleToOpen: currentXP >= threshold });
      },

      /**
       * Marque le coffre comme ouvert.
       */
      openChest: () => {
        set((state) => {
          if (state.isEligibleToOpen) {
            return { isChestOpened: true };
          }
          return state;
        });
      },

      /**
       * Réinitialisation (utile pour le debug ou changement de profil)
       */
      reset: () => {
        set({ isChestOpened: false, isEligibleToOpen: false });
      }
    }),
    {
      name: 'kp-gift-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
