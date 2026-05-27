import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { indexedDBMiddleware } from './indexedDBMiddleware';
import { type MedalType } from '../utils/quizMessages';
import { type TopicId, type EarnedBadge } from '../types/domain';
import { ACCESSORIES_DB } from '../data/accessories';
import { encyclopedia } from '../data/topics';
import { useNotificationStore } from './useNotificationStore';
import { useSettingsStore } from './useSettingsStore';
import { launchCelebration } from '../utils/celebrations';
import { RANKS } from '../data/rewards';

interface ProfileProgression {
  badges: EarnedBadge[];
  totalXP: number;
  currentRankId: string;
  unlockedAccessories: string[]; // IDs des accessoires possédés
  equippedAccessoryId: string | null; // ID de l'accessoire porté
  equippedCompanionId: string | null; // ID du compagnon actif
  tickets: number; // solde de tickets possédés
  dailyDiscoveries?: Record<string, TopicId[]>;
}

export interface ProgressionState {
  // --- Global Progressions Map ---
  progressions: Record<string, ProfileProgression>;
  activeProfileId: string | null;

  // --- Getters ---
  getBadges: () => EarnedBadge[];
  getTotalXP: () => number;
  getCurrentRankId: () => string;
  getUnlockedAccessories: () => string[];
  getEquippedAccessoryId: () => string | null;
  getEquippedCompanionId: () => string | null;
  getTickets: () => number;
  isCompleted: (topicId: TopicId) => boolean;
  isUnlocked: (topicId: TopicId) => boolean;

  // --- Actions ---
  addXP: (amount: number) => void;
  addBadge: (topicId: TopicId, medal: MedalType) => void;
  addTickets: (amount: number) => void;
  buyAccessory: (accessoryId: string, price: number) => boolean;
  clearBadges: (profileId?: string) => void;
  syncWithProfile: (profileId: string | null) => void;
  equipAccessory: (accessoryId: string | null) => void;
  equipCompanion: (companionId: string | null) => void;
  deleteProfileProgression: (profileId: string) => void;
  reset: () => void;
}

const xpValues: Record<string, number> = { gold: 1000, silver: 500, bronze: 250 };
const medalTier: Record<MedalType, number> = { gold: 3, silver: 2, bronze: 1 };
const ticketValues: Record<MedalType, number> = { gold: 3, silver: 2, bronze: 1 };
const PERFECT_BONUS_XP = 500;

/**
 * Formate une date en YYYY-MM-DD local
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getLocalDateString = (): string => formatDate(new Date());

const getCutoffDateString = (): string => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return formatDate(cutoff);
};

/**
 * Calcule le rang correspondant au total d'XP actuel.
 */
const calculateRankId = (xp: number): string => {
  const rank = [...RANKS].reverse().find(r => xp >= r.minXP);
  return rank ? rank.id : RANKS[0].id;
};

const DEFAULT_PROGRESSION: ProfileProgression = {
  badges: [],
  totalXP: 0,
  currentRankId: 'apprentice',
  unlockedAccessories: [],
  equippedAccessoryId: null,
  equippedCompanionId: null,
  tickets: 0,
  dailyDiscoveries: {}
};

/**
 * Logique de déblocage automatique d'accessoires basée sur la progression actuelle
 */
const checkAccessoryUnlocks = (prog: ProfileProgression): string[] => {
  const currentUnlocked = prog.unlockedAccessories || [];
  const newUnlocked = [...currentUnlocked];

  ACCESSORIES_DB.forEach(acc => {
    if (newUnlocked.includes(acc.id)) return;

    let conditionMet = false;
    const { type, value, medal, category } = acc.unlockCondition;

    if (type === 'xp') {
      conditionMet = prog.totalXP >= (value as number);
    } 
    else if (type === 'specific_topic') {
      const badge = prog.badges.find(b => b.id === value);
      conditionMet = !!(badge && (!medal || medalTier[badge.medal] >= medalTier[medal]));
    }
    else if (type === 'count' && category) {
      const count = prog.badges.filter(b => {
        const topic = encyclopedia.find(t => t.id === b.id);
        return topic?.categoryKey.toLowerCase() === category && (!medal || medalTier[b.medal] >= medalTier[medal]);
      }).length;
      conditionMet = count >= (value as number);
    }

    if (conditionMet) {
      newUnlocked.push(acc.id);
    }
  });

  return newUnlocked;
};

/**
 * Logique de migration pour les anciens formats de stockage (v1.x).
 * Isolé pour ne pas polluer le flux réactif principal.
 */
const migrateLegacyProfile = (profileId: string): ProfileProgression => {
  const legacyBadges = localStorage.getItem(`kp-badges-${profileId}`);
  if (!legacyBadges) return { ...DEFAULT_PROGRESSION };

  try {
    const parsed = JSON.parse(legacyBadges);
    const badgeList = parsed.map((b: string | EarnedBadge) =>
      typeof b === 'string' ? { id: b, medal: 'gold' } : b
    );
    const totalXP = badgeList.reduce((acc: number, badge: EarnedBadge) => {
      const baseXP = xpValues[badge.medal] || 0;
      const bonus = badge.medal === 'gold' ? PERFECT_BONUS_XP : 0;
      return acc + baseXP + bonus;
    }, 0);
    
    // Nettoyage après migration réussie
    localStorage.removeItem(`kp-badges-${profileId}`);

    return {
      badges: badgeList,
      totalXP,
      currentRankId: calculateRankId(totalXP),
      unlockedAccessories: [],
      equippedAccessoryId: null,
      equippedCompanionId: null,
      tickets: 0,
      dailyDiscoveries: {}
    };
  } catch (e) {
    console.error("Migration error", e);
    return { ...DEFAULT_PROGRESSION };
  }
};
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
      }
    })
  )
) as UseBoundStore<StoreApi<ProgressionState>> & {
  persist: {
    rehydrate: () => Promise<void>;
    clearStorage: () => Promise<void>;
  };
};
