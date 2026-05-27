import { describe, it, expect, vi, beforeEach } from 'vitest';
import { migrateLocalStorageToDB, normalizeLegacyState } from './migration';
import { db } from './db';
import { saveProgress } from './storage';

vi.mock('./db', () => {
  const mockTable = {
    put: vi.fn(),
    delete: vi.fn()
  };
  return {
    db: {
      keyval: mockTable,
      progression: mockTable
    }
  };
});

vi.mock('./storage', () => ({
  saveProgress: vi.fn().mockResolvedValue(undefined)
}));

describe('migrateLocalStorageToDB & normalizeLegacyState', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('normalizeLegacyState', () => {
    it('devrait retourner null si les données ne sont pas du JSON valide', () => {
      const result = normalizeLegacyState('invalide');
      expect(result).toBeNull();
    });

    it('devrait retourner le format inchangé s\'il est déjà décompressé', () => {
      const standardRaw = JSON.stringify({
        state: {
          progressions: {
            'p1': { totalXP: 120 }
          },
          activeProfileId: 'p1'
        },
        version: 0
      });
      const result = normalizeLegacyState(standardRaw);
      expect(result).not.toBeNull();
      expect(result!.state!.progressions!['p1'].totalXP).toBe(120);
    });

    it('devrait décompresser et normaliser le format hérité', () => {
      const legacyRaw = JSON.stringify({
        state: {
          p: {
            'profile-1': {
              b: [{ i: 'lion', m: 'gold' }],
              x: 1500,
              r: 'apprentice',
              u: ['hat'],
              ea: 'hat',
              ec: 'dog',
              t: 3,
              d: { '2026-05-26': ['lion'] }
            }
          },
          a: 'profile-1'
        },
        version: 0
      });

      const result = normalizeLegacyState(legacyRaw);
      expect(result).not.toBeNull();
      expect(result!.state!.progressions).toBeDefined();
      const prog = result!.state!.progressions!['profile-1'];
      expect(prog.totalXP).toBe(1500);
      expect(prog.badges).toEqual([{ id: 'lion', medal: 'gold' }]);
      expect(prog.currentRankId).toBe('apprentice');
      expect(prog.unlockedAccessories).toEqual(['hat']);
      expect(prog.equippedAccessoryId).toBe('hat');
      expect(prog.equippedCompanionId).toBe('dog');
      expect(prog.tickets).toBe(3);
      expect(prog.dailyDiscoveries).toEqual({ '2026-05-26': ['lion'] });
      expect(result!.state!.activeProfileId).toBe('profile-1');
    });
  });

  describe('migrateLocalStorageToDB', () => {
    it('devrait court-circuiter si le flag de migration est déjà positionné', async () => {
      localStorage.setItem('kp-dexie-migrated', 'true');
      const putSpy = vi.spyOn(db.keyval, 'put');

      await migrateLocalStorageToDB();

      expect(putSpy).not.toHaveBeenCalled();
      expect(saveProgress).not.toHaveBeenCalled();
    });

    it('devrait migrer correctement les progressions et métadonnées transverses', async () => {
      const legacyRaw = JSON.stringify({
        state: {
          p: {
            'p-alice': {
              b: [{ i: 'lion', m: 'gold' }],
              x: 1000,
              r: 'apprentice'
            }
          },
          a: 'p-alice'
        },
        version: 0
      });

      localStorage.setItem('kp-progression-storage', legacyRaw);
      localStorage.setItem('kp-profiles-index', '["alice"]');
      localStorage.setItem('kp-active-profile-id', 'p-alice');
      localStorage.setItem('kp-settings-storage', '{"volume":10}');

      const keyvalPutSpy = vi.spyOn(db.keyval, 'put');

      await migrateLocalStorageToDB();

      // Vérifier que saveProgress a été appelé pour Alice
      expect(saveProgress).toHaveBeenCalledWith(
        expect.objectContaining({
          profileId: 'p-alice',
          totalXP: 1000,
          currentRankId: 'apprentice'
        })
      );

      // Vérifier les écritures transverses dans db.keyval
      expect(keyvalPutSpy).toHaveBeenCalledWith({
        key: 'kp-profiles-index',
        value: '["alice"]'
      });
      expect(keyvalPutSpy).toHaveBeenCalledWith({
        key: 'kp-active-profile-id',
        value: 'p-alice'
      });
      expect(keyvalPutSpy).toHaveBeenCalledWith({
        key: 'kp-settings-storage',
        value: '{"volume":10}'
      });

      // Vérifier le flag de migration finale
      expect(localStorage.getItem('kp-dexie-migrated')).toBe('true');
    });
  });
});
