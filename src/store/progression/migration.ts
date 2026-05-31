import { type EarnedBadge } from '../../types/domain';
import { type ProfileProgression } from './types';
import { xpValues, PERFECT_BONUS_XP, DEFAULT_PROGRESSION } from './constants';
import { calculateRankId } from './helpers';

/**
 * Logique de migration pour les anciens formats de stockage (v1.x).
 * Isolé pour ne pas polluer le flux réactif principal.
 */
export const migrateLegacyProfile = (profileId: string): ProfileProgression => {
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
      dailyDiscoveries: {},
      stickers: [],
      unlockedPuzzlePieces: {},
      unlockedWallpapers: []
    };
  } catch (e) {
    console.error("Migration error", e);
    return { ...DEFAULT_PROGRESSION };
  }
};
