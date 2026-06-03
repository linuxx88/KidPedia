import Dexie, { type Table } from 'dexie';
import { type EarnedBadge, type TopicId } from '../types/domain';
import { type Topic } from '../data/topics';

interface DbSticker {
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

interface KeyValEntry {
  key: string;
  value: string;
}

class KidPediaDexieDB extends Dexie {
  progression!: Table<DbProfileProgression, string>;
  keyval!: Table<KeyValEntry, string>;
  topics!: Table<Topic, string>;

  constructor() {
    super('KidPediaDexieDB');
    this.version(1).stores({
      progression: 'profileId, totalXP, currentRankId, updatedAt',
      keyval: 'key'
    });
    this.version(2).stores({
      progression: 'profileId, totalXP, currentRankId, updatedAt',
      keyval: 'key',
      topics: 'id, categoryKey'
    });
  }
}

export const db = new KidPediaDexieDB();
