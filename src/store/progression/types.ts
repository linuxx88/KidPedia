import { type MedalType } from '../../utils/quizMessages';
import { type TopicId, type EarnedBadge } from '../../types/domain';

export interface Sticker {
  readonly id: string;
  readonly unlockedAt: string;
}

export interface ProfileProgression {
  badges: EarnedBadge[];
  totalXP: number;
  currentRankId: string;
  unlockedAccessories: string[]; // IDs des accessoires possédés
  equippedAccessoryId: string | null; // ID de l'accessoire porté
  equippedCompanionId: string | null; // ID du compagnon actif
  tickets: number; // solde de tickets possédés
  dailyDiscoveries?: Record<string, TopicId[]>;
  stickers?: readonly Sticker[];
  unlockedPuzzlePieces?: Record<string, number[]>;
  unlockedWallpapers?: readonly string[];
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
  getStickers: () => readonly Sticker[];
  getUnlockedPuzzlePieces: () => Record<string, number[]>;
  getUnlockedWallpapers: () => readonly string[];

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
  unlockSticker: (stickerId: string) => void;
  unlockPuzzlePiece: (category: string, pieceIndex: number) => void;
  awardPuzzlePiece: (category: string) => { readonly success: boolean; readonly pieceIndex: number; readonly isNew: boolean };
}
