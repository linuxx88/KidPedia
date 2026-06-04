import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { syncProfiles, syncProgression, trackDeletedProfileId } from './syncService';
import { type Profile } from '../store/useProfileStore';
import * as storage from './storage';

vi.mock('./storage', () => ({
  getAllProgress: vi.fn(),
  saveProgress: vi.fn(),
  deleteProgress: vi.fn(),
}));

describe('syncService', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { onLine: true });
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('syncProfiles', () => {
    it('should return local profiles directly if offline', async () => {
      vi.stubGlobal('navigator', { onLine: false });
      const local: Profile[] = [{ id: '1', name: 'Kid1', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 100 }];
      const result = await syncProfiles(local);
      expect(result.syncedProfiles).toEqual(local);
      expect(result.hasChanges).toBe(false);
    });

    it('should sync and upload local changes if local is newer', async () => {
      const local: Profile[] = [{ id: '1', name: 'Kid1-updated', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 200 }];
      const server: Profile[] = [{ id: '1', name: 'Kid1', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 100 }];

      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(server),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });

      vi.stubGlobal('fetch', fetchMock);

      const result = await syncProfiles(local);
      expect(result.syncedProfiles[0].name).toBe('Kid1-updated');
      expect(result.hasChanges).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('should sync and accept server changes if server is newer', async () => {
      const local: Profile[] = [{ id: '1', name: 'Kid1', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 100 }];
      const server: Profile[] = [{ id: '1', name: 'Kid1-server', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 200 }];

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(server),
      });

      vi.stubGlobal('fetch', fetchMock);

      const result = await syncProfiles(local);
      expect(result.syncedProfiles[0].name).toBe('Kid1-server');
      expect(result.hasChanges).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(1); // No upload needed
    });

    it('should not sync deleted profiles', async () => {
      trackDeletedProfileId('deleted-id');
      const local: Profile[] = [];
      const server: Profile[] = [{ id: 'deleted-id', name: 'Deleted Kid', avatar: 'dog', gender: 'boy', theme: 'light', language: 'fr', updatedAt: 200 }];

      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(server),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });

      vi.stubGlobal('fetch', fetchMock);

      const result = await syncProfiles(local);
      expect(result.syncedProfiles).toEqual([]);
      expect(result.hasChanges).toBe(true);
    });
  });

  describe('syncProgression', () => {
    it('should return without changes if offline', async () => {
      vi.stubGlobal('navigator', { onLine: false });
      const result = await syncProgression();
      expect(result.hasChanges).toBe(false);
    });

    it('should sync progression when online', async () => {
      const localProg = {
        profileId: '1',
        badges: [],
        totalXP: 500,
        currentRankId: 'explorer',
        unlockedAccessories: [],
        equippedAccessoryId: null,
        equippedCompanionId: null,
        tickets: 10,
        dailyDiscoveries: {},
        updatedAt: 200,
      };

      const serverProg = {
        profileId: '1',
        badges: [],
        totalXP: 100,
        currentRankId: 'apprentice',
        unlockedAccessories: [],
        equippedAccessoryId: null,
        equippedCompanionId: null,
        tickets: 2,
        dailyDiscoveries: {},
        updatedAt: 100,
      };

      vi.mocked(storage.getAllProgress).mockResolvedValue([localProg]);
      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ '1': serverProg }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });

      vi.stubGlobal('fetch', fetchMock);

      const result = await syncProgression();
      expect(result.hasChanges).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
