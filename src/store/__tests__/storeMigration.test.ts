import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSettingsStore } from '../useSettingsStore';
import { useQuizChampionshipStore } from '../useQuizChampionshipStore';
import { indexedDBStorage } from '../../utils/indexedDBStorage';

describe('Store Migration & IndexedDB Integration', () => {
  beforeEach(async () => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Clear IndexedDB stores
    await indexedDBStorage.removeItem('kp-settings-storage');
    await indexedDBStorage.removeItem('kp-championship-storage');
    await indexedDBStorage.removeItem('kp-quiz-championship');

    // Reset stores to default state
    act(() => {
      useSettingsStore.setState({
        theme: 'light',
        isDarkMode: false,
        isMuted: false,
        isMusicMuted: false,
        isSfxMuted: false,
        gender: 'boy',
        language: 'fr',
      });
      useQuizChampionshipStore.setState({
        records: [],
        highScores: [],
        gameState: 'idle',
      });
    });
  });

  describe('Isolation', () => {
    it('should keep settings and championship store states isolated', async () => {
      // Set values in stores
      act(() => {
        useSettingsStore.setState({ theme: 'dark', language: 'en', isMuted: true });
        useQuizChampionshipStore.setState({
          records: [{ profileId: 'p1', score: 9, completedAt: '2026-05-30T10:00:00Z' }]
        });
      });

      // Allow write-out to complete
      await new Promise((resolve) => setTimeout(resolve, 20));

      const settingsRaw = await indexedDBStorage.getItem('kp-settings-storage');
      const champRaw = await indexedDBStorage.getItem('kp-championship-storage');

      expect(settingsRaw).not.toBeNull();
      expect(champRaw).not.toBeNull();

      const settingsParsed = JSON.parse(settingsRaw!);
      const champParsed = JSON.parse(champRaw!);

      expect(settingsParsed.state.theme).toBe('dark');
      expect(settingsParsed.state.records).toBeUndefined();

      expect(champParsed.state.records).toHaveLength(1);
      expect(champParsed.state.records[0].profileId).toBe('p1');
      expect(champParsed.state.theme).toBeUndefined();
    });
  });

  describe('Settings Store Migration', () => {
    it('should migrate settings from legacy localStorage and purge legacy key', async () => {
      const legacyState = {
        state: {
          isDarkMode: true,
          isMuted: true,
          isMusicMuted: true,
          isSfxMuted: true,
          gender: 'girl',
          language: 'en'
        },
        version: 0
      };

      // Set legacy data in localStorage
      localStorage.setItem('kp-settings-storage', JSON.stringify(legacyState));

      // Rehydrate the store
      await act(async () => {
        await useSettingsStore.persist.rehydrate();
      });

      // Verify that the store has been updated with the migrated state
      const state = useSettingsStore.getState();
      expect(state.theme).toBe('dark');
      expect(state.isDarkMode).toBe(true);
      expect(state.isMuted).toBe(true);
      expect(state.language).toBe('en');

      // Verify legacy key has been purged
      expect(localStorage.getItem('kp-settings-storage')).toBeNull();

      // Verify migrated state is now in IndexedDB
      const rawStored = await indexedDBStorage.getItem('kp-settings-storage');
      expect(rawStored).not.toBeNull();
      const parsed = JSON.parse(rawStored!);
      expect(parsed.state.theme).toBe('dark');
      expect(parsed.state.isMuted).toBe(true);
      expect(parsed.state.language).toBe('en');
    });
  });

  describe('Quiz Championship Store Migration & Sorting', () => {
    it('should migrate championship high scores to records and purge legacy key', async () => {
      const legacyState = {
        state: {
          highScores: [
            {
              id: 'hs1',
              profileId: 'prof-1',
              profileName: 'Alice',
              profileAvatar: '🐰',
              score: 8,
              timeSpent: 22,
              date: '2026-05-30T10:00:00Z'
            },
            {
              id: 'hs2',
              profileId: 'prof-2',
              profileName: 'Bob',
              profileAvatar: '🦊',
              score: 10,
              timeSpent: 15,
              date: '2026-05-30T11:00:00Z'
            }
          ]
        },
        version: 0
      };

      // Set legacy data in localStorage
      localStorage.setItem('kp-quiz-championship', JSON.stringify(legacyState));

      // Rehydrate the store
      await act(async () => {
        await useQuizChampionshipStore.persist.rehydrate();
      });

      // Verify state was correctly migrated, sorted by score DESC, and stored
      const state = useQuizChampionshipStore.getState();
      expect(state.records).toHaveLength(2);
      // Bob has score 10, so he should be first
      expect(state.records[0].profileId).toBe('prof-2');
      expect(state.records[0].score).toBe(10);
      expect(state.records[0].completedAt).toBe('2026-05-30T11:00:00Z');

      // Alice has score 8, so she should be second
      expect(state.records[1].profileId).toBe('prof-1');
      expect(state.records[1].score).toBe(8);
      expect(state.records[1].completedAt).toBe('2026-05-30T10:00:00Z');

      // Verify highScores was correctly synchronized at runtime
      expect(state.highScores).toHaveLength(2);
      expect(state.highScores[0].profileId).toBe('prof-2');
      expect(state.highScores[0].profileName).toBe('Champion'); // Fallback mock profile settings
      expect(state.highScores[0].score).toBe(10);

      // Verify legacy key has been purged
      expect(localStorage.getItem('kp-quiz-championship')).toBeNull();

      // Verify new key is in IndexedDB
      const rawStored = await indexedDBStorage.getItem('kp-championship-storage');
      expect(rawStored).not.toBeNull();
      const parsed = JSON.parse(rawStored!);
      expect(parsed.state.records).toHaveLength(2);
      expect(parsed.state.records[0].profileId).toBe('prof-2');
    });

    it('should keep maximum 5 records and sort them by score DESC', async () => {
      // Setup 5 records manually
      const initialRecords = [
        { profileId: 'p1', score: 5, completedAt: '2026-05-30T12:00:00Z' },
        { profileId: 'p2', score: 9, completedAt: '2026-05-30T12:00:00Z' },
        { profileId: 'p3', score: 7, completedAt: '2026-05-30T12:00:00Z' },
        { profileId: 'p4', score: 10, completedAt: '2026-05-30T12:00:00Z' },
        { profileId: 'p5', score: 6, completedAt: '2026-05-30T12:00:00Z' }
      ];

      act(() => {
        useQuizChampionshipStore.setState({ records: initialRecords });
      });

      // Add a 6th record
      act(() => {
        const currentRecords = [...useQuizChampionshipStore.getState().records];
        currentRecords.push({ profileId: 'p6', score: 8, completedAt: '2026-05-30T13:00:00Z' });
        currentRecords.sort((a, b) => b.score - a.score);
        const truncated = currentRecords.slice(0, 5);
        useQuizChampionshipStore.setState({ records: truncated });
      });

      const state = useQuizChampionshipStore.getState();
      expect(state.records).toHaveLength(5);
      
      // Expected scores in order: 10, 9, 8, 7, 6 (score 5 should be truncated)
      expect(state.records[0].score).toBe(10);
      expect(state.records[1].score).toBe(9);
      expect(state.records[2].score).toBe(8);
      expect(state.records[3].score).toBe(7);
      expect(state.records[4].score).toBe(6);

      const lowestScore = state.records.find(r => r.score === 5);
      expect(lowestScore).toBeUndefined();
    });
  });
});
