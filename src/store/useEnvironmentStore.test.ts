import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useEnvironmentStore } from './useEnvironmentStore';

describe('useEnvironmentStore', () => {
  beforeEach(() => {
    useEnvironmentStore.getState().reset();
  });

  it('devrait initialiser avec le printemps (spring)', () => {
    const { result } = renderHook(() => useEnvironmentStore());
    expect(result.current.currentSeason).toBe('spring');
  });

  it('devrait forcer le changement de saison via setSeason', () => {
    const { result } = renderHook(() => useEnvironmentStore());
    
    act(() => {
      result.current.setSeason('summer');
    });
    expect(result.current.currentSeason).toBe('summer');

    act(() => {
      result.current.setSeason('winter');
    });
    expect(result.current.currentSeason).toBe('winter');
  });

  it('devrait cycler sur la saison suivante via triggerNextSeason', () => {
    const { result } = renderHook(() => useEnvironmentStore());
    
    // spring -> summer
    act(() => {
      result.current.triggerNextSeason();
    });
    expect(result.current.currentSeason).toBe('summer');

    // summer -> autumn
    act(() => {
      result.current.triggerNextSeason();
    });
    expect(result.current.currentSeason).toBe('autumn');

    // autumn -> winter
    act(() => {
      result.current.triggerNextSeason();
    });
    expect(result.current.currentSeason).toBe('winter');

    // winter -> spring
    act(() => {
      result.current.triggerNextSeason();
    });
    expect(result.current.currentSeason).toBe('spring');
  });

  it('devrait cycler via cycleSeason', () => {
    const { result } = renderHook(() => useEnvironmentStore());
    
    act(() => {
      result.current.cycleSeason();
    });
    expect(result.current.currentSeason).toBe('summer');
  });

  it('devrait réinitialiser via reset', () => {
    const { result } = renderHook(() => useEnvironmentStore());
    
    act(() => {
      result.current.setSeason('winter');
      result.current.reset();
    });
    expect(result.current.currentSeason).toBe('spring');
  });
});
