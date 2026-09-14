import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProgressionStore } from '../useProgressionStore';

describe('favoritesSlice in useProgressionStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    act(() => {
      useProgressionStore.getState().reset();
    });
  });

  it('devrait retourner une liste vide de favoris par défaut', () => {
    const { result } = renderHook(() => useProgressionStore());
    act(() => {
      result.current.syncWithProfile('child-1');
    });

    expect(result.current.getFavorites()).toEqual([]);
    expect(result.current.isFavorite('lion')).toBe(false);
  });

  it('devrait ajouter un favori et renvoyer true lors du premier toggle', () => {
    const { result } = renderHook(() => useProgressionStore());
    act(() => {
      result.current.syncWithProfile('child-1');
    });

    let added: boolean | undefined;
    act(() => {
      added = result.current.toggleFavorite('lion');
    });

    expect(added).toBe(true);
    expect(result.current.isFavorite('lion')).toBe(true);
    expect(result.current.getFavorites()).toEqual(['lion']);
  });

  it('devrait retirer un favori et renvoyer false lors du second toggle', () => {
    const { result } = renderHook(() => useProgressionStore());
    act(() => {
      result.current.syncWithProfile('child-1');
    });

    act(() => {
      result.current.toggleFavorite('lion');
    });
    expect(result.current.isFavorite('lion')).toBe(true);

    let removed: boolean | undefined;
    act(() => {
      removed = result.current.toggleFavorite('lion');
    });

    expect(removed).toBe(false);
    expect(result.current.isFavorite('lion')).toBe(false);
    expect(result.current.getFavorites()).toEqual([]);
  });

  it('devrait cloisonner strictement les favoris par profil', () => {
    const { result } = renderHook(() => useProgressionStore());

    // Profil Alice
    act(() => {
      result.current.syncWithProfile('alice');
      result.current.toggleFavorite('lion');
      result.current.toggleFavorite('mars');
    });

    expect(result.current.getFavorites()).toEqual(['lion', 'mars']);

    // Profil Bob
    act(() => {
      result.current.syncWithProfile('bob');
    });

    expect(result.current.getFavorites()).toEqual([]);
    expect(result.current.isFavorite('lion')).toBe(false);

    act(() => {
      result.current.toggleFavorite('dauphin');
    });

    expect(result.current.getFavorites()).toEqual(['dauphin']);

    // Retour Alice
    act(() => {
      result.current.syncWithProfile('alice');
    });

    expect(result.current.getFavorites()).toEqual(['lion', 'mars']);
    expect(result.current.isFavorite('dauphin')).toBe(false);
  });
});
