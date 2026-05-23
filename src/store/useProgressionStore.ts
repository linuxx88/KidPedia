import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
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
  tickets: 0
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
      tickets: 0
    };
  } catch (e) {
    console.error("Migration error", e);
    return { ...DEFAULT_PROGRESSION };
  }
};

interface CompressedProfileProgression {
  b: { i: string; m: MedalType }[];
  x: number;
  r: string;
  u: string[];
  ea: string | null;
  ec: string | null;
  t: number;
}

interface PersistedStateWrapper {
  state: {
    progressions?: Record<string, ProfileProgression>;
    activeProfileId?: string | null;
    p?: Record<string, CompressedProfileProgression>;
    a?: string | null;
  };
  version?: number;
}

/**
 * Compresse l'état du store de progression pour optimiser l'espace localStorage et le parsing
 */
const compressState = (persisted: PersistedStateWrapper | null): PersistedStateWrapper | null => {
  if (!persisted || !persisted.state) return persisted;

  const { progressions, activeProfileId } = persisted.state;
  
  const compressedProgressions: Record<string, CompressedProfileProgression> = {};
  if (progressions) {
    Object.keys(progressions).forEach((profileId) => {
      const p = progressions[profileId];
      if (p) {
        compressedProgressions[profileId] = {
          b: p.badges?.map((b: EarnedBadge) => ({ i: b.id, m: b.medal })) || [],
          x: p.totalXP || 0,
          r: p.currentRankId || 'apprentice',
          u: p.unlockedAccessories || [],
          ea: p.equippedAccessoryId,
          ec: p.equippedCompanionId,
          t: p.tickets || 0
        };
      }
    });
  }

  return {
    state: {
      p: compressedProgressions,
      a: activeProfileId
    },
    version: persisted.version
  };
};

/**
 * Décompresse l'état pour restaurer le format complet en mémoire, avec compatibilité héritée
 */
const decompressState = (persisted: PersistedStateWrapper | null): PersistedStateWrapper | null => {
  if (!persisted || !persisted.state) return persisted;

  const { state } = persisted;

  // Si c'est déjà au format décompressé / hérité, retourner tel quel
  if (state.progressions || (state.activeProfileId !== undefined && !state.p)) {
    return persisted;
  }

  const { p, a } = state;
  const decompressedProgressions: Record<string, ProfileProgression> = {};
  
  if (p) {
    Object.keys(p).forEach((profileId) => {
      const cp = p[profileId];
      if (cp) {
        decompressedProgressions[profileId] = {
          badges: cp.b?.map((cb: { i: string; m: MedalType }) => ({ id: cb.i as TopicId, medal: cb.m })) || [],
          totalXP: cp.x || 0,
          currentRankId: cp.r || 'apprentice',
          unlockedAccessories: cp.u || [],
          equippedAccessoryId: cp.ea || null,
          equippedCompanionId: cp.ec || null,
          tickets: cp.t || 0
        };
      }
    });
  }

  return {
    state: {
      progressions: decompressedProgressions,
      activeProfileId: a || null
    },
    version: persisted.version
  };
};

/**
 * Moteur de stockage synchrone customisé effectuant la compression dictionnaire à la volée
 */
const customStateStorage: StateStorage = {
  getItem: (name: string): string | null => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const decompressed = decompressState(parsed);
      return JSON.stringify(decompressed);
    } catch (e) {
      console.warn("[Progression Storage] Failed to decompress state, returning raw:", e);
      return raw;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      const parsed = JSON.parse(value);
      const compressed = compressState(parsed);
      localStorage.setItem(name, JSON.stringify(compressed));
    } catch (e) {
      console.error("[Progression Storage] Failed to compress state, writing raw:", e);
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};

export const useProgressionStore = create<ProgressionState>()(
  persist(
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
        
        if (isFirstTime) {
          newBadges.push({ id: topicId, medal });
        } else if (isUpgrade) {
          newBadges = current.badges.map((b) => (b.id === topicId ? { id: b.id, medal } : b));
        } else {
          return; 
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
            tickets: (currentProg.tickets || 0) + ticketsToAdd
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
    }),
    {
      name: 'kp-progression-storage',
      storage: createJSONStorage(() => customStateStorage)
    }
  )
);
