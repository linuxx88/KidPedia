import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressionStore } from '../useProgressionStore';

describe('Gamification Store Engine', () => {
  beforeEach(() => {
    act(() => {
      useProgressionStore.getState().reset();
    });
  });

  it('should support unlocking stickers and prevent duplicates', () => {
    const { result } = renderHook(() => useProgressionStore());

    // Sync a profile
    act(() => {
      result.current.syncWithProfile('test-profile-id');
    });

    expect(result.current.getStickers()).toEqual([]);

    // Unlock a sticker
    act(() => {
      result.current.unlockSticker('awesome-sticker-1');
    });

    const stickers = result.current.getStickers();
    expect(stickers).toHaveLength(1);
    expect(stickers[0].id).toBe('awesome-sticker-1');
    expect(stickers[0].unlockedAt).toBeDefined();

    // Try to unlock the duplicate sticker
    act(() => {
      result.current.unlockSticker('awesome-sticker-1');
    });

    expect(result.current.getStickers()).toHaveLength(1);
  });

  it('should unlock specific puzzle pieces and prevent duplicate index append', () => {
    const { result } = renderHook(() => useProgressionStore());

    act(() => {
      result.current.syncWithProfile('test-profile-id');
    });

    expect(result.current.getUnlockedPuzzlePieces()).toEqual({});

    // Unlock piece index 1 in category 'animaux'
    act(() => {
      result.current.unlockPuzzlePiece('animaux', 1);
    });

    let pieces = result.current.getUnlockedPuzzlePieces();
    expect(pieces.animaux).toEqual([1]);

    // Try to unlock duplicate piece index 1 in category 'animaux'
    act(() => {
      result.current.unlockPuzzlePiece('animaux', 1);
    });

    pieces = result.current.getUnlockedPuzzlePieces();
    expect(pieces.animaux).toEqual([1]);

    // Unlock piece index 0 in category 'animaux'
    act(() => {
      result.current.unlockPuzzlePiece('animaux', 0);
    });

    pieces = result.current.getUnlockedPuzzlePieces();
    expect(pieces.animaux).toEqual([0, 1]); // Sorted
  });

  it('should dynamically award a contextual puzzle piece and prevent duplicate piece discovery', () => {
    const { result } = renderHook(() => useProgressionStore());

    act(() => {
      result.current.syncWithProfile('test-profile-id');
    });

    // First award
    let awardResult1;
    act(() => {
      awardResult1 = result.current.awardPuzzlePiece('espace');
    });

    expect(awardResult1).toEqual({ success: true, pieceIndex: 0, isNew: true });
    expect(result.current.getUnlockedPuzzlePieces().espace).toEqual([0]);

    // Second award
    let awardResult2;
    act(() => {
      awardResult2 = result.current.awardPuzzlePiece('espace');
    });

    expect(awardResult2).toEqual({ success: true, pieceIndex: 1, isNew: true });
    expect(result.current.getUnlockedPuzzlePieces().espace).toEqual([0, 1]);
  });

  it('should unlock the high-value Animated Wallpaper reward in the Explorer Gallery when puzzle is complete', () => {
    const { result } = renderHook(() => useProgressionStore());

    act(() => {
      result.current.syncWithProfile('test-profile-id');
    });

    // Unlock 3 pieces
    act(() => {
      result.current.unlockPuzzlePiece('dinosaures', 0);
      result.current.unlockPuzzlePiece('dinosaures', 1);
      result.current.unlockPuzzlePiece('dinosaures', 2);
    });

    expect(result.current.getUnlockedPuzzlePieces().dinosaures).toEqual([0, 1, 2]);
    expect(result.current.getUnlockedWallpapers()).toEqual([]);

    // Unlock 4th piece (completes the puzzle)
    act(() => {
      result.current.unlockPuzzlePiece('dinosaures', 3);
    });

    expect(result.current.getUnlockedPuzzlePieces().dinosaures).toEqual([0, 1, 2, 3]);
    expect(result.current.getUnlockedWallpapers()).toEqual(['dinosaures-wallpaper']);

    // Check if the wallpaper is also unlocked in stickers as a collectible
    const stickers = result.current.getStickers();
    expect(stickers.some(s => s.id === 'dinosaures-wallpaper')).toBe(true);
  });

  it('should trigger wallpaper unlock when completing puzzle via awardPuzzlePiece', () => {
    const { result } = renderHook(() => useProgressionStore());

    act(() => {
      result.current.syncWithProfile('test-profile-id');
    });

    // Award 4 pieces sequentially
    act(() => {
      result.current.awardPuzzlePiece('nature');
      result.current.awardPuzzlePiece('nature');
      result.current.awardPuzzlePiece('nature');
      result.current.awardPuzzlePiece('nature');
    });

    expect(result.current.getUnlockedPuzzlePieces().nature).toEqual([0, 1, 2, 3]);
    expect(result.current.getUnlockedWallpapers()).toEqual(['nature-wallpaper']);
    
    // Awarding a 5th time should return success false
    let awardResult5;
    act(() => {
      awardResult5 = result.current.awardPuzzlePiece('nature');
    });
    expect(awardResult5).toEqual({ success: false, pieceIndex: -1, isNew: false });
  });
});
