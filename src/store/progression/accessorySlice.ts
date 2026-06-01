import { type StateCreator } from 'zustand';
import { type ProgressionState, type AccessorySlice } from './types';
import { ACCESSORIES_DB } from '../../data/accessories';
import { checkBehavioralBadgeEffects } from './badgeEffects';
import { DEFAULT_PROGRESSION } from './constants';

export const createAccessorySlice: StateCreator<
  ProgressionState,
  [],
  [],
  AccessorySlice
> = (set, get) => ({
  getUnlockedAccessories: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.unlockedAccessories : []) || [];
  },
  getEquippedAccessoryId: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.equippedAccessoryId : null) || null;
  },
  getEquippedCompanionId: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.equippedCompanionId : null) || null;
  },

  buyAccessory: (accessoryId, price) => {
    const { activeProfileId, progressions } = get();
    if (!activeProfileId) return false;

    const current = progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
    let success = false;
    const finalBadges = [...(current.badges || [])];

    set((state) => {
      const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const currentTickets = currentProg.tickets || 0;
      if (currentTickets < price) {
        return state;
      }

      success = true;
      const oldUnlocked = currentProg.unlockedAccessories || [];
      const newUnlocked = oldUnlocked.includes(accessoryId)
        ? oldUnlocked
        : [...oldUnlocked, accessoryId];

      const hasCompanion = newUnlocked.some(id => {
        const item = ACCESSORIES_DB.find(a => a.id === id);
        return item?.slot === 'companion';
      });
      if (hasCompanion && !finalBadges.some(b => b.id === 'animal-friend')) {
        finalBadges.push({ id: 'animal-friend', medal: 'gold' });
      }

      const nextProg = {
        ...currentProg,
        tickets: currentTickets - price,
        unlockedAccessories: newUnlocked,
        badges: finalBadges
      };

      const acc = ACCESSORIES_DB.find(a => a.id === accessoryId);
      if (acc) {
        if (acc.slot === 'companion') {
          nextProg.equippedCompanionId = accessoryId;
        } else {
          nextProg.equippedAccessoryId = accessoryId;
        }
      }

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: nextProg
        }
      };
    });

    if (success) {
      checkBehavioralBadgeEffects(current.badges, finalBadges);
    }

    return success;
  },

  equipAccessory: (accessoryId) => {
    const { activeProfileId } = get();
    if (!activeProfileId) return;

    set((state) => {
      const current = state.progressions[activeProfileId];
      if (!current) return state;

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            equippedAccessoryId: accessoryId
          }
        }
      };
    });
  },

  equipCompanion: (companionId) => {
    const { activeProfileId } = get();
    if (!activeProfileId) return;

    set((state) => {
      const current = state.progressions[activeProfileId];
      if (!current) return state;

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            equippedCompanionId: companionId
          }
        }
      };
    });
  }
});
