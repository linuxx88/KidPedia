import { type MedalType } from '../../utils/quizMessages';
import { type TopicId, type EarnedBadge } from '../../types/domain';

interface Sticker {
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
  readTopics?: string[];
}

export interface ProfileSlice {
  syncWithProfile: (profileId: string | null) => void;
  deleteProfileProgression: (profileId: string) => void;
  reset: () => void;
}

export interface XpBadgeSlice {
  getBadges: () => EarnedBadge[];
  getTotalXP: () => number;
  getCurrentRankId: () => string;
  getTickets: () => number;
  isCompleted: (topicId: TopicId) => boolean;
  isUnlocked: (topicId: TopicId) => boolean;
  addXP: (amount: number) => void;
  addBadge: (topicId: TopicId, medal: MedalType) => void;
  addTickets: (amount: number) => void;
  clearBadges: (profileId?: string) => void;
}

export interface AccessorySlice {
  getUnlockedAccessories: () => string[];
  getEquippedAccessoryId: () => string | null;
  getEquippedCompanionId: () => string | null;
  buyAccessory: (accessoryId: string, price: number) => boolean;
  equipAccessory: (accessoryId: string | null) => void;
  equipCompanion: (companionId: string | null) => void;
}

export interface CollectiblesSlice {
  getStickers: () => readonly Sticker[];
  getUnlockedPuzzlePieces: () => Record<string, number[]>;
  getUnlockedWallpapers: () => readonly string[];
  unlockSticker: (stickerId: string) => void;
  unlockPuzzlePiece: (category: string, pieceIndex: number) => void;
  awardPuzzlePiece: (category: string) => { readonly success: boolean; readonly pieceIndex: number; readonly isNew: boolean };
  markTopicAsRead?: (topicId: string) => void;
}

export interface ProgressionState extends ProfileSlice, XpBadgeSlice, AccessorySlice, CollectiblesSlice {
  // --- Global Progressions Map ---
  progressions: Record<string, ProfileProgression>;
  activeProfileId: string | null;
}
