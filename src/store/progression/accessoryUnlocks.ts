import { ACCESSORIES_DB } from '../../data/accessories';
import { encyclopedia } from '../../data/topics';
import { type ProfileProgression } from './types';
import { medalTier } from './constants';

/**
 * Logique de déblocage automatique d'accessoires basée sur la progression actuelle
 */
export const checkAccessoryUnlocks = (prog: ProfileProgression): string[] => {
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
