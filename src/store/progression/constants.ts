import { type MedalType } from '../../utils/quizMessages';
import { type ProfileProgression } from './types';

export const xpValues: Record<string, number> = { gold: 1000, silver: 500, bronze: 250 };
export const medalTier: Record<MedalType, number> = { gold: 3, silver: 2, bronze: 1 };
export const ticketValues: Record<MedalType, number> = { gold: 3, silver: 2, bronze: 1 };
export const PERFECT_BONUS_XP = 500;

export const DEFAULT_PROGRESSION: ProfileProgression = {
  badges: [],
  totalXP: 0,
  currentRankId: 'apprentice',
  unlockedAccessories: [],
  equippedAccessoryId: null,
  equippedCompanionId: null,
  tickets: 0,
  dailyDiscoveries: {},
  stickers: [],
  unlockedPuzzlePieces: {},
  unlockedWallpapers: [],
  readTopics: []
};
