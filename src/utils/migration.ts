import { db } from './db';
import { saveProgress } from './storage';
import { type DbProfileProgression } from './db';
import { type EarnedBadge, type TopicId } from '../types/domain';

const STORAGE_FLAG = 'kp-dexie-migrated';

interface LegacyBadge {
  i: string;
  m: string;
}

interface LegacyProfileProgression {
  b?: LegacyBadge[];
  x?: number;
  r?: string;
  u?: string[];
  ea?: string | null;
  ec?: string | null;
  t?: number;
  d?: Record<string, TopicId[]>;
}

interface StandardProfileProgression {
  badges?: EarnedBadge[];
  totalXP?: number;
  currentRankId?: string;
  unlockedAccessories?: string[];
  equippedAccessoryId?: string | null;
  equippedCompanionId?: string | null;
  tickets?: number;
  dailyDiscoveries?: Record<string, TopicId[]>;
}

interface LegacyWrapperState {
  p?: Record<string, LegacyProfileProgression>;
  a?: string | null;
}

interface StandardWrapperState {
  progressions?: Record<string, StandardProfileProgression>;
  activeProfileId?: string | null;
}

interface Wrapper {
  state?: LegacyWrapperState & StandardWrapperState;
  version?: number;
}

/**
 * Décompresse et normalise le state de progression depuis le format compressé hérité (v1.x)
 * vers le format décompressé standard complet (v2.x/v3.x).
 */
export function normalizeLegacyState(raw: string): Wrapper | null {
  try {
    const persisted = JSON.parse(raw) as Wrapper;
    if (!persisted || !persisted.state) return null;

    const { state } = persisted;

    // Si le format est déjà décompressé / régulier, le retourner directement
    if (state.progressions || (state.activeProfileId !== undefined && !state.p)) {
      return persisted;
    }

    const p = state.p;
    const a = state.a;
    const decompressedProgressions: Record<string, StandardProfileProgression> = {};

    if (p) {
      Object.keys(p).forEach((profileId) => {
        const cp = p[profileId];
        if (cp) {
          decompressedProgressions[profileId] = {
            badges: cp.b?.map((cb) => ({ id: cb.i as TopicId, medal: cb.m as 'gold' | 'silver' | 'bronze' })) || [],
            totalXP: cp.x || 0,
            currentRankId: cp.r || 'apprentice',
            unlockedAccessories: cp.u || [],
            equippedAccessoryId: cp.ea || null,
            equippedCompanionId: cp.ec || null,
            tickets: cp.t || 0,
            dailyDiscoveries: cp.d || {}
          };
        }
      });
    }

    return {
      state: {
        progressions: decompressedProgressions,
        activeProfileId: a || null
      },
      version: persisted.version || 0
    };
  } catch (e) {
    console.warn('[Migration] Échec de la normalisation du format hérité :', e);
    return null;
  }
}

/**
 * Script de migration global asynchrone pour copier en toute sécurité toutes les données de localStorage
 * vers IndexedDB (Dexie) au premier lancement.
 */
export async function migrateLocalStorageToDB(): Promise<void> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  // Court-circuiter si la migration a déjà été validée par le passé
  if (localStorage.getItem(STORAGE_FLAG) === 'true') {
    return;
  }

  try {
    console.log('[Migration] Lancement de la migration localStorage vers Dexie (IndexedDB)...');

    // 1. Migrer la table progression
    const progressionRaw = localStorage.getItem('kp-progression-storage');
    if (progressionRaw) {
      const parsedWrapper = normalizeLegacyState(progressionRaw);
      if (parsedWrapper && parsedWrapper.state && parsedWrapper.state.progressions) {
        const progressions = parsedWrapper.state.progressions;
        for (const profileId of Object.keys(progressions)) {
          const prog = progressions[profileId];
          if (prog) {
            const dbProg: DbProfileProgression = {
              profileId,
              badges: prog.badges || [],
              totalXP: prog.totalXP || 0,
              currentRankId: prog.currentRankId || 'apprentice',
              unlockedAccessories: prog.unlockedAccessories || [],
              equippedAccessoryId: prog.equippedAccessoryId || null,
              equippedCompanionId: prog.equippedCompanionId || null,
              tickets: prog.tickets || 0,
              dailyDiscoveries: prog.dailyDiscoveries || {},
              updatedAt: Date.now()
            };
            await saveProgress(dbProg);
          }
        }
        console.log('[Migration] Les progressions de profils ont été migrées vers Dexie.');
      }
    }

    // 2. Migrer les autres clés transverses dans le magasin clé-valeur de Dexie
    const keysToMigrate = [
      'kp-profiles-index',
      'kp-active-profile-id',
      'kp-settings-storage',
      'kp-progression-storage'
    ];

    for (const key of keysToMigrate) {
      const value = localStorage.getItem(key);
      if (value) {
        await db.keyval.put({ key, value });
      }
    }
    console.log('[Migration] Les métadonnées et configurations Zustand ont été migrées vers db.keyval.');

    // 3. Marquer la migration comme terminée
    localStorage.setItem(STORAGE_FLAG, 'true');
    console.log('[Migration] Migration de données localStorage vers IndexedDB accomplie avec succès !');
  } catch (error) {
    console.error('[Migration] Échec de la migration globale :', error);
    // On ne lève pas l'erreur pour ne pas empêcher l'application de démarrer sur une base vide en dernier recours
  }
}
