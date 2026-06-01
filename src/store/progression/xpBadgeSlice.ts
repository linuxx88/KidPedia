import { type StateCreator } from 'zustand';
import { type ProgressionState, type XpBadgeSlice } from './types';
import { type TopicId } from '../../types/domain';
import { encyclopedia } from '../../data/topics';
import { ACCESSORIES_DB } from '../../data/accessories';
import { useNotificationStore } from '../useNotificationStore';
import { useSettingsStore } from '../useSettingsStore';
import { launchCelebration } from '../../utils/celebrations';
import { checkBehavioralBadgeEffects } from './badgeEffects';
import {
  xpValues,
  medalTier,
  ticketValues,
  PERFECT_BONUS_XP,
  DEFAULT_PROGRESSION
} from './constants';
import {
  getLocalDateString,
  getCutoffDateString,
  calculateRankId
} from './helpers';
import { checkAccessoryUnlocks } from './accessoryUnlocks';

export const createXpBadgeSlice: StateCreator<
  ProgressionState,
  [],
  [],
  XpBadgeSlice
> = (set, get) => ({
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

    const today = getLocalDateString();
    const cutoff = getCutoffDateString();

    const currentDiscoveries = current.dailyDiscoveries || {};
    const nextDiscoveries: Record<string, TopicId[]> = {};

    Object.keys(currentDiscoveries).forEach((dateKey) => {
      if (dateKey >= cutoff) {
        nextDiscoveries[dateKey] = [...currentDiscoveries[dateKey]];
      }
    });

    const todaysTopics = nextDiscoveries[today] || [];
    if (!todaysTopics.includes(topicId)) {
      nextDiscoveries[today] = [...todaysTopics, topicId];
    }

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

    const nextXP = newBadges
      .filter(badge => encyclopedia.some(t => t.id === badge.id))
      .reduce((acc, badge) => {
        const baseXP = xpValues[badge.medal] || 0;
        const bonus = badge.medal === 'gold' ? PERFECT_BONUS_XP : 0;
        return acc + baseXP + bonus;
      }, 0);
    const nextRankId = calculateRankId(nextXP);

    let addedAccessories: string[] = [];

    const isPersistentUpgrade = isUpgrade && medal === 'gold' && existing && (existing.medal === 'bronze' || existing.medal === 'silver');

    const finalTickets = (current.tickets || 0) + ticketsToAdd;
    const finalBadges = [...newBadges];
    if (finalTickets >= 50 && !finalBadges.some(b => b.id === 'super-squirrel')) {
      finalBadges.push({ id: 'super-squirrel', medal: 'gold' });
    }
    if (isPersistentUpgrade && !finalBadges.some(b => b.id === 'perseverant')) {
      finalBadges.push({ id: 'perseverant', medal: 'gold' });
    }

    set((state) => {
      const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const nextProg = {
        ...currentProg,
        badges: finalBadges,
        totalXP: nextXP,
        currentRankId: nextRankId,
        tickets: finalTickets,
        dailyDiscoveries: nextDiscoveries
      };

      const oldUnlocked = currentProg.unlockedAccessories || [];
      const newUnlocked = checkAccessoryUnlocks(nextProg) || [];
      nextProg.unlockedAccessories = newUnlocked;

      const hasCompanion = newUnlocked.some(id => {
        const item = ACCESSORIES_DB.find(a => a.id === id);
        return item?.slot === 'companion';
      });
      if (hasCompanion && !finalBadges.some(b => b.id === 'animal-friend')) {
        finalBadges.push({ id: 'animal-friend', medal: 'gold' });
        nextProg.badges = finalBadges;
      }

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

    checkBehavioralBadgeEffects(current.badges, finalBadges);

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
    const { activeProfileId, progressions } = get();
    if (!activeProfileId) return;

    const current = progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
    const finalTickets = (current.tickets || 0) + amount;
    const finalBadges = [...(current.badges || [])];
    
    if (finalTickets >= 50 && !finalBadges.some(b => b.id === 'super-squirrel')) {
      finalBadges.push({ id: 'super-squirrel', medal: 'gold' });
    }

    set((state) => {
      const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...currentProg,
            tickets: finalTickets,
            badges: finalBadges
          }
        }
      };
    });

    checkBehavioralBadgeEffects(current.badges, finalBadges);
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
  }
});
