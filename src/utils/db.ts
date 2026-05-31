import Dexie, { type Table } from 'dexie';
import { type EarnedBadge, type TopicId } from '../types/domain';

export interface DbSticker {
  readonly id: string;
  readonly unlockedAt: string;
}

export interface DbProfileProgression {
  profileId: string;
  badges: EarnedBadge[];
  totalXP: number;
  currentRankId: string;
  unlockedAccessories: string[];
  equippedAccessoryId: string | null;
  equippedCompanionId: string | null;
  tickets: number;
  dailyDiscoveries: Record<string, TopicId[]>;
  stickers?: readonly DbSticker[];
  unlockedPuzzlePieces?: Record<string, number[]>;
  unlockedWallpapers?: readonly string[];
  updatedAt: number;
}

export interface KeyValEntry {
  key: string;
  value: string;
}

export class KidPediaDexieDB extends Dexie {
  progression!: Table<DbProfileProgression, string>;
  keyval!: Table<KeyValEntry, string>;

  constructor() {
    super('KidPediaDexieDB');
    this.version(1).stores({
      progression: 'profileId, totalXP, currentRankId, updatedAt',
      keyval: 'key'
    });
  }
}

export const db = new KidPediaDexieDB();
