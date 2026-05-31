import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { indexedDBMiddleware } from './indexedDBMiddleware';
import { ACCESSORIES_DB } from '../data/accessories';
import { encyclopedia } from '../data/topics';
import { useNotificationStore } from './useNotificationStore';
import { useSettingsStore } from './useSettingsStore';
import { launchCelebration } from '../utils/celebrations';
import { type TopicId } from '../types/domain';

// Extracted modules imports
import { type Sticker, type ProgressionState } from './progression/types';
import {
  xpValues,
  medalTier,
  ticketValues,
  PERFECT_BONUS_XP,
  DEFAULT_PROGRESSION
} from './progression/constants';
import {
  getLocalDateString,
  getCutoffDateString,
  calculateRankId
} from './progression/helpers';
import { checkAccessoryUnlocks } from './progression/accessoryUnlocks';
import { migrateLegacyProfile } from './progression/migration';

// Re-export type for external compatibility
export type { Sticker, ProgressionState };

export const useProgressionStore = create<ProgressionState>()(
  indexedDBMiddleware(
    (set, get) => ({
      // --- Initial State ---
      progressions: {},
      activeProfileId: null,

      // --- Getters ---
      getBadges: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.badges : []) || [];
      },
      getTotalXP: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.totalXP : 0) || 0;
      },
      getCurrentRankId: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.currentRankId : 'apprentice') || 'apprentice';
      },
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
      getTickets: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.tickets : 0) || 0;
      },
      isCompleted: (topicId) => {
        const { progressions, activeProfileId } = get();
        if (!activeProfileId) return false;
        const badges = progressions[activeProfileId]?.badges || [];
        return badges.some((b) => b.id === topicId);
      },
      isUnlocked: (topicId) => {
        const { isCompleted } = get();
        const topic = encyclopedia.find((t) => t.id === topicId);
        if (!topic) return false;

        const categoryTopics = encyclopedia.filter((t) => t.categoryKey === topic.categoryKey);
        const index = categoryTopics.findIndex((t) => t.id === topicId);
        if (index <= 0) return true; // Le premier sujet est toujours débloqué

        const prevTopic = categoryTopics[index - 1];
        return isCompleted(prevTopic.id);
      },
      getStickers: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.stickers : []) || [];
      },
      getUnlockedPuzzlePieces: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.unlockedPuzzlePieces : {}) || {};
      },
      getUnlockedWallpapers: () => {
        const { progressions, activeProfileId } = get();
        return (activeProfileId ? progressions[activeProfileId]?.unlockedWallpapers : []) || [];
      },

      // --- Actions ---
      addXP: (amount) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        let addedAccessories: string[] = [];

        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const nextXP = current.totalXP + amount;
          const nextProg = {
            ...current,
            totalXP: nextXP,
            currentRankId: calculateRankId(nextXP)
          };
          
          const oldUnlocked = current.unlockedAccessories || [];
          const newUnlocked = checkAccessoryUnlocks(nextProg) || [];
          nextProg.unlockedAccessories = newUnlocked;

          if (newUnlocked.length > oldUnlocked.length) {
            addedAccessories = newUnlocked.filter(id => !oldUnlocked.includes(id));
            addedAccessories.forEach(id => {
              const acc = ACCESSORIES_DB.find(a => a.id === id);
              if (acc) {
                if (acc.slot === 'companion') {
                  nextProg.equippedCompanionId = id;
                } else {
                  nextProg.equippedAccessoryId = id;
                }
              }
            });
          }

          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: nextProg
            }
          };
        });

        // EFFETS DE BORD : Déclenchés APRÈS le set
        if (addedAccessories.length > 0) {
          const { labels, language } = useSettingsStore.getState();
          launchCelebration();
          
          addedAccessories.forEach(id => {
            const acc = ACCESSORIES_DB.find(a => a.id === id);
            if (acc) {
              useNotificationStore.getState().addNotification({
                type: 'xp',
                title: labels.badges.unlockedTitle,
                message: labels.badges.unlockedMessage(acc.name[language]),
                icon: acc.icon
              });
            }
          });
        }
      },

      addBadge: (topicId, medal) => {
        const { activeProfileId, progressions } = get();
        if (!activeProfileId) return;

        const current = progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
        const existing = current.badges.find((b) => b.id === topicId);

        let newBadges = [...current.badges];
        const isFirstTime = !existing;
        const isUpgrade = existing && medalTier[medal] > medalTier[existing.medal];

        // 1. Calcul des découvertes quotidiennes et de la purge
        const today = getLocalDateString();
        const cutoff = getCutoffDateString();

        const currentDiscoveries = current.dailyDiscoveries || {};
        const nextDiscoveries: Record<string, TopicId[]> = {};

        // Purge silencieuse des clés vieilles de plus de 7 jours
        Object.keys(currentDiscoveries).forEach((dateKey) => {
          if (dateKey >= cutoff) {
            nextDiscoveries[dateKey] = [...currentDiscoveries[dateKey]];
          }
        });

        // Ajout du topicId sous la date du jour sans doublon
        const todaysTopics = nextDiscoveries[today] || [];
        if (!todaysTopics.includes(topicId)) {
          nextDiscoveries[today] = [...todaysTopics, topicId];
        }

        // Si ce n'est ni une première fois ni une amélioration, on met seulement à jour dailyDiscoveries
        if (!isFirstTime && !isUpgrade) {
          set((state) => {
            const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
            return {
              progressions: {
                ...state.progressions,
                [activeProfileId]: {
                  ...currentProg,
                  dailyDiscoveries: nextDiscoveries
                }
              }
            };
          });
          return;
        }

        if (isFirstTime) {
          newBadges.push({ id: topicId, medal });
        } else if (isUpgrade) {
          newBadges = current.badges.map((b) => (b.id === topicId ? { id: b.id, medal } : b));
        }

        let ticketsToAdd = 0;
        if (isFirstTime) {
          ticketsToAdd = ticketValues[medal];
        } else if (isUpgrade) {
          ticketsToAdd = ticketValues[medal] - ticketValues[existing.medal];
        }

        const nextXP = newBadges.reduce((acc, badge) => {
          const baseXP = xpValues[badge.medal] || 0;
          const bonus = badge.medal === 'gold' ? PERFECT_BONUS_XP : 0;
          return acc + baseXP + bonus;
        }, 0);
        const nextRankId = calculateRankId(nextXP);

        let addedAccessories: string[] = [];

        set((state) => {
          const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const nextProg = {
            ...currentProg,
            badges: newBadges,
            totalXP: nextXP,
            currentRankId: nextRankId,
            tickets: (currentProg.tickets || 0) + ticketsToAdd,
            dailyDiscoveries: nextDiscoveries
          };

          const oldUnlocked = currentProg.unlockedAccessories || [];
          const newUnlocked = checkAccessoryUnlocks(nextProg) || [];
          nextProg.unlockedAccessories = newUnlocked;

          if (newUnlocked.length > oldUnlocked.length) {
            addedAccessories = newUnlocked.filter(id => !oldUnlocked.includes(id));
            addedAccessories.forEach(id => {
              const acc = ACCESSORIES_DB.find(a => a.id === id);
              if (acc) {
                if (acc.slot === 'companion') {
                  nextProg.equippedCompanionId = id;
                } else {
                  nextProg.equippedAccessoryId = id;
                }
              }
            });
          }

          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: nextProg
            }
          };
        });

        // EFFETS DE BORD : Déclenchés APRÈS le set
        if (addedAccessories.length > 0) {
          const { labels, language } = useSettingsStore.getState();
          launchCelebration();
          
          addedAccessories.forEach(id => {
            const acc = ACCESSORIES_DB.find(a => a.id === id);
            if (acc) {
              useNotificationStore.getState().addNotification({
                type: 'badge',
                title: labels.badges.unlockedTitle,
                message: labels.badges.unlockedMessage(acc.name[language]),
                icon: acc.icon
              });
            }
          });
        }
      },

      addTickets: (amount) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const nextProg = {
            ...current,
            tickets: (current.tickets || 0) + amount
          };
          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: nextProg
            }
          };
        });
      },

      buyAccessory: (accessoryId, price) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return false;

        let success = false;

        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const currentTickets = current.tickets || 0;
          if (currentTickets < price) {
            return state;
          }

          success = true;
          const oldUnlocked = current.unlockedAccessories || [];
          const newUnlocked = oldUnlocked.includes(accessoryId)
            ? oldUnlocked
            : [...oldUnlocked, accessoryId];

          const nextProg = {
            ...current,
            tickets: currentTickets - price,
            unlockedAccessories: newUnlocked
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
      },

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

      clearBadges: (profileId?: string) => {
        const targetId = profileId || get().activeProfileId;
        if (!targetId) return;
        set((state) => ({
          progressions: {
            ...state.progressions,
            [targetId]: { ...DEFAULT_PROGRESSION }
          }
        }));
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
      },

      unlockSticker: (stickerId) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;
        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const stickersList = current.stickers || [];
          if (stickersList.some(s => s.id === stickerId)) {
            return state;
          }
          const nextStickers = [...stickersList, { id: stickerId, unlockedAt: new Date().toISOString() }];
          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: {
                ...current,
                stickers: nextStickers
              }
            }
          };
        });
      },

      unlockPuzzlePiece: (category, pieceIndex) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;
        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const unlockedPuzzlePieces = current.unlockedPuzzlePieces || {};
          const currentPieces = unlockedPuzzlePieces[category] || [];
          if (currentPieces.includes(pieceIndex)) {
            return state;
          }
          const nextPieces = [...currentPieces, pieceIndex].sort((a, b) => a - b);
          const nextPuzzle = {
            ...unlockedPuzzlePieces,
            [category]: nextPieces
          };

          const unlockedWallpapers = current.unlockedWallpapers || [];
          const nextWallpapers = [...unlockedWallpapers];
          const currentStickers = current.stickers || [];
          const nextStickers = [...currentStickers];

          if (nextPieces.length === 4) {
            const wallpaperId = `${category}-wallpaper`;
            if (!nextWallpapers.includes(wallpaperId)) {
              nextWallpapers.push(wallpaperId);
            }
            if (!nextStickers.some((s) => s.id === wallpaperId)) {
              nextStickers.push({ id: wallpaperId, unlockedAt: new Date().toISOString() });
            }
          }

          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: {
                ...current,
                unlockedPuzzlePieces: nextPuzzle,
                unlockedWallpapers: nextWallpapers,
                stickers: nextStickers
              }
            }
          };
        });
      },

      awardPuzzlePiece: (category) => {
        const { activeProfileId } = get();
        if (!activeProfileId) {
          return { success: false, pieceIndex: -1, isNew: false };
        }

        let result = { success: false, pieceIndex: -1, isNew: false };

        set((state) => {
          const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
          const unlockedPuzzlePieces = current.unlockedPuzzlePieces || {};
          const currentPieces = unlockedPuzzlePieces[category] || [];

          if (currentPieces.length >= 4) {
            result = { success: false, pieceIndex: -1, isNew: false };
            return state;
          }

          const nextIndex = [0, 1, 2, 3].find(idx => !currentPieces.includes(idx));
          if (nextIndex === undefined) {
            result = { success: false, pieceIndex: -1, isNew: false };
            return state;
          }

          const nextPieces = [...currentPieces, nextIndex].sort((a, b) => a - b);
          const nextPuzzle = {
            ...unlockedPuzzlePieces,
            [category]: nextPieces
          };

          const unlockedWallpapers = current.unlockedWallpapers || [];
          const nextWallpapers = [...unlockedWallpapers];
          const currentStickers = current.stickers || [];
          const nextStickers = [...currentStickers];

          if (nextPieces.length === 4) {
            const wallpaperId = `${category}-wallpaper`;
            if (!nextWallpapers.includes(wallpaperId)) {
              nextWallpapers.push(wallpaperId);
            }
            if (!nextStickers.some((s) => s.id === wallpaperId)) {
              nextStickers.push({ id: wallpaperId, unlockedAt: new Date().toISOString() });
            }
          }

          result = { success: true, pieceIndex: nextIndex, isNew: true };

          return {
            progressions: {
              ...state.progressions,
              [activeProfileId]: {
                ...current,
                unlockedPuzzlePieces: nextPuzzle,
                unlockedWallpapers: nextWallpapers,
                stickers: nextStickers
              }
            }
          };
        });

        return result;
      }
    })
  )
) as UseBoundStore<StoreApi<ProgressionState>> & {
  persist: {
    rehydrate: () => Promise<void>;
    clearStorage: () => Promise<void>;
  };
};
