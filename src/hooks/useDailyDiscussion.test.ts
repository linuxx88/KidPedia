import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDailyDiscussion } from './useDailyDiscussion';
import { useProgressionStore } from '../store/useProgressionStore';
import { FALLBACK_DISCUSSIONS } from '../data/discussionStarters';

describe('useDailyDiscussion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset store state before each test
    act(() => {
      useProgressionStore.getState().reset();
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('devrait retourner le fallback de secours si aucune découverte n\'a été faite aujourd\'hui', () => {
    // Définir la date à aujourd'hui
    const date = new Date(2026, 4, 25);
    vi.setSystemTime(date);

    act(() => {
      useProgressionStore.getState().syncWithProfile('test-user');
    });

    const { result } = renderHook(() => useDailyDiscussion());

    expect(result.current.hasDiscoveries).toBe(false);
    expect(result.current.discussions).toEqual(FALLBACK_DISCUSSIONS);
  });

  it('devrait retourner le fallback de secours si les découvertes d\'aujourd\'hui n\'ont pas de questions associées', () => {
    const date = new Date(2026, 4, 25);
    vi.setSystemTime(date);

    act(() => {
      useProgressionStore.getState().syncWithProfile('test-user');
    });

    // Ajouter un badge pour un sujet inexistant dans DISCUSSION_STARTERS
    act(() => {
      useProgressionStore.getState().addBadge('inconnu' as any, 'gold');
    });

    const { result } = renderHook(() => useDailyDiscussion());

    expect(result.current.hasDiscoveries).toBe(false);
    expect(result.current.discussions).toEqual(FALLBACK_DISCUSSIONS);
  });

  it('devrait retourner les questions adaptées si des découvertes ont été faites aujourd\'hui', () => {
    const date = new Date(2026, 4, 25);
    vi.setSystemTime(date);

    act(() => {
      useProgressionStore.getState().syncWithProfile('test-user');
    });

    // Ajouter des badges existants dans DISCUSSION_STARTERS
    act(() => {
      useProgressionStore.getState().addBadge('lion', 'gold');
      useProgressionStore.getState().addBadge('soleil', 'silver');
    });

    const { result } = renderHook(() => useDailyDiscussion());

    expect(result.current.hasDiscoveries).toBe(true);
    expect(result.current.discussions).toHaveLength(2);
    
    const ids = result.current.discussions.map(d => d.topicId);
    expect(ids).toContain('lion');
    expect(ids).toContain('soleil');

    const lionStarter = result.current.discussions.find(d => d.topicId === 'lion');
    expect(lionStarter?.question.fr).toBe("Si tu devais rugir comme un lion pour montrer ta force ou ta joie, quand le ferais-tu ?");
  });

  it('devrait retourner au maximum 3 questions uniques de découverte', () => {
    const date = new Date(2026, 4, 25);
    vi.setSystemTime(date);

    act(() => {
      useProgressionStore.getState().syncWithProfile('test-user');
    });

    act(() => {
      useProgressionStore.getState().addBadge('lion', 'gold');
      useProgressionStore.getState().addBadge('elephant', 'gold');
      useProgressionStore.getState().addBadge('soleil', 'gold');
      useProgressionStore.getState().addBadge('t-rex', 'gold');
    });

    const { result } = renderHook(() => useDailyDiscussion());

    expect(result.current.hasDiscoveries).toBe(true);
    expect(result.current.discussions.length).toBe(3);
    
    // Vérifier l'unicité
    const ids = result.current.discussions.map(d => d.topicId);
    const uniqueIds = Array.from(new Set(ids));
    expect(uniqueIds).toHaveLength(3);
  });
});
