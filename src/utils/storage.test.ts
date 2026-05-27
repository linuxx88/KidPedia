import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveProgress, getProgress, getAllProgress, deleteProgress } from './storage';
import { db } from './db';

vi.mock('./db', () => {
  const mockTable = {
    put: vi.fn(),
    get: vi.fn(),
    toArray: vi.fn(),
    delete: vi.fn()
  };
  return {
    db: {
      progression: mockTable
    }
  };
});

describe('storage.ts CRUD operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveProgress', () => {
    it('devrait enregistrer avec succes des donnees de progression valides', async () => {
      const mockData = {
        profileId: 'child-123',
        badges: [],
        totalXP: 1250,
        currentRankId: 'explorer',
        unlockedAccessories: ['hat_01'],
        equippedAccessoryId: 'hat_01',
        equippedCompanionId: null,
        tickets: 5,
        dailyDiscoveries: {},
        updatedAt: 0
      };

      vi.mocked(db.progression.put).mockResolvedValue('child-123');

      await expect(saveProgress(mockData)).resolves.not.toThrow();
      expect(db.progression.put).toHaveBeenCalledTimes(1);
      expect(db.progression.put).toHaveBeenCalledWith(
        expect.objectContaining({
          profileId: 'child-123',
          totalXP: 1250,
          currentRankId: 'explorer'
        })
      );
    });

    it('devrait rejeter avec une erreur si les donnees sont invalides ou manquantes', async () => {
      // @ts-expect-error - Test de robustesse à l'exécution
      await expect(saveProgress(null)).rejects.toThrow();
      // @ts-expect-error - Test de robustesse à l'exécution
      await expect(saveProgress({ totalXP: 500 })).rejects.toThrow();
    });

    it('devrait propager les erreurs lancees par la base de donnees', async () => {
      const mockData = {
        profileId: 'child-123',
        badges: [],
        totalXP: 100,
        currentRankId: 'apprentice',
        unlockedAccessories: [],
        equippedAccessoryId: null,
        equippedCompanionId: null,
        tickets: 0,
        dailyDiscoveries: {},
        updatedAt: 0
      };

      vi.mocked(db.progression.put).mockRejectedValue(new Error('IndexedDB Write Error'));

      await expect(saveProgress(mockData)).rejects.toThrow('IndexedDB Write Error');
    });
  });

  describe('getProgress', () => {
    it('devrait recuperer les donnees du profil si elles existent', async () => {
      const mockSaved = {
        profileId: 'child-123',
        badges: [],
        totalXP: 150,
        currentRankId: 'apprentice',
        unlockedAccessories: [],
        equippedAccessoryId: null,
        equippedCompanionId: null,
        tickets: 0,
        dailyDiscoveries: {},
        updatedAt: 123456789
      };

      vi.mocked(db.progression.get).mockResolvedValue(mockSaved);

      const result = await getProgress('child-123');
      expect(result).toEqual(mockSaved);
      expect(db.progression.get).toHaveBeenCalledWith('child-123');
    });

    it('devrait renvoyer null si le profil n\'existe pas en base', async () => {
      vi.mocked(db.progression.get).mockResolvedValue(undefined);

      const result = await getProgress('non-existent');
      expect(result).toBeNull();
    });

    it('devrait rejeter si l\'identifiant du profil est vide', async () => {
      await expect(getProgress('')).rejects.toThrow();
    });
  });

  describe('getAllProgress', () => {
    it('devrait recuperer l\'ensemble des progressions', async () => {
      const mockList = [
        {
          profileId: 'child-1',
          badges: [],
          totalXP: 100,
          currentRankId: 'apprentice',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
          dailyDiscoveries: {},
          updatedAt: 111
        },
        {
          profileId: 'child-2',
          badges: [],
          totalXP: 200,
          currentRankId: 'apprentice',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
          dailyDiscoveries: {},
          updatedAt: 222
        }
      ];

      vi.mocked(db.progression.toArray).mockResolvedValue(mockList);

      const result = await getAllProgress();
      expect(result).toEqual(mockList);
      expect(db.progression.toArray).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteProgress', () => {
    it('devrait appeler la suppression avec succes', async () => {
      vi.mocked(db.progression.delete).mockResolvedValue(undefined);

      await expect(deleteProgress('child-123')).resolves.not.toThrow();
      expect(db.progression.delete).toHaveBeenCalledWith('child-123');
    });

    it('devrait rejeter si l\'identifiant est manquant', async () => {
      await expect(deleteProgress('')).rejects.toThrow();
    });
  });
});
