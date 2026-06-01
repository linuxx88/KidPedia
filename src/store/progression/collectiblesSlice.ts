import { type StateCreator } from 'zustand';
import { type ProgressionState, type CollectiblesSlice } from './types';
import { checkBehavioralBadgeEffects } from './badgeEffects';
import { DEFAULT_PROGRESSION } from './constants';

export const createCollectiblesSlice: StateCreator<
  ProgressionState,
  [],
  [],
  CollectiblesSlice
> = (set, get) => ({
  getStickers: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.stickers : []) || [];
  },
  getUnlockedPuzzlePieces: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.unlockedPuzzlePieces : {}) || {};
  },
  getUnlockedWallpapers: () => {
    const { progressions, activeProfileId } = get();
    return (activeProfileId ? progressions[activeProfileId]?.unlockedWallpapers : []) || [];
  },

  unlockSticker: (stickerId) => {
    const { activeProfileId } = get();
    if (!activeProfileId) return;
    set((state) => {
      const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const stickersList = current.stickers || [];
      if (stickersList.some(s => s.id === stickerId)) {
        return state;
      }
      const nextStickers = [...stickersList, { id: stickerId, unlockedAt: new Date().toISOString() }];
      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            stickers: nextStickers
          }
        }
      };
    });
  },

  unlockPuzzlePiece: (category, pieceIndex) => {
    const { activeProfileId } = get();
    if (!activeProfileId) return;
    set((state) => {
      const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const unlockedPuzzlePieces = current.unlockedPuzzlePieces || {};
      const currentPieces = unlockedPuzzlePieces[category] || [];
      if (currentPieces.includes(pieceIndex)) {
        return state;
      }
      const nextPieces = [...currentPieces, pieceIndex].sort((a, b) => a - b);
      const nextPuzzle = {
        ...unlockedPuzzlePieces,
        [category]: nextPieces
      };

      const unlockedWallpapers = current.unlockedWallpapers || [];
      const nextWallpapers = [...unlockedWallpapers];
      const currentStickers = current.stickers || [];
      const nextStickers = [...currentStickers];

      if (nextPieces.length === 4) {
        const wallpaperId = `${category}-wallpaper`;
        if (!nextWallpapers.includes(wallpaperId)) {
          nextWallpapers.push(wallpaperId);
        }
        if (!nextStickers.some((s) => s.id === wallpaperId)) {
          nextStickers.push({ id: wallpaperId, unlockedAt: new Date().toISOString() });
        }
      }

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            unlockedPuzzlePieces: nextPuzzle,
            unlockedWallpapers: nextWallpapers,
            stickers: nextStickers
          }
        }
      };
    });
  },

  awardPuzzlePiece: (category) => {
    const { activeProfileId } = get();
    if (!activeProfileId) {
      return { success: false, pieceIndex: -1, isNew: false };
    }

    let result = { success: false, pieceIndex: -1, isNew: false };

    set((state) => {
      const current = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      const unlockedPuzzlePieces = current.unlockedPuzzlePieces || {};
      const currentPieces = unlockedPuzzlePieces[category] || [];

      if (currentPieces.length >= 4) {
        result = { success: false, pieceIndex: -1, isNew: false };
        return state;
      }

      const nextIndex = [0, 1, 2, 3].find(idx => !currentPieces.includes(idx));
      if (nextIndex === undefined) {
        result = { success: false, pieceIndex: -1, isNew: false };
        return state;
      }

      const nextPieces = [...currentPieces, nextIndex].sort((a, b) => a - b);
      const nextPuzzle = {
        ...unlockedPuzzlePieces,
        [category]: nextPieces
      };

      const unlockedWallpapers = current.unlockedWallpapers || [];
      const nextWallpapers = [...unlockedWallpapers];
      const currentStickers = current.stickers || [];
      const nextStickers = [...currentStickers];

      if (nextPieces.length === 4) {
        const wallpaperId = `${category}-wallpaper`;
        if (!nextWallpapers.push(wallpaperId)) {
          // just pushing is enough
        }
        // let's do this cleaner:
        if (!nextWallpapers.includes(wallpaperId)) {
          nextWallpapers.push(wallpaperId);
        }
        if (!nextStickers.some((s) => s.id === wallpaperId)) {
          nextStickers.push({ id: wallpaperId, unlockedAt: new Date().toISOString() });
        }
      }

      result = { success: true, pieceIndex: nextIndex, isNew: true };

      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...current,
            unlockedPuzzlePieces: nextPuzzle,
            unlockedWallpapers: nextWallpapers,
            stickers: nextStickers
          }
        }
      };
    });

    return result;
  },

  markTopicAsRead: (topicId) => {
    const { activeProfileId, progressions } = get();
    if (!activeProfileId) return;

    const current = progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
    const currentRead = current.readTopics || [];
    if (currentRead.includes(topicId)) return;

    const nextRead = [...currentRead, topicId];
    const finalBadges = [...(current.badges || [])];
    if (nextRead.length >= 10 && !finalBadges.some(b => b.id === 'library-rat')) {
      finalBadges.push({ id: 'library-rat', medal: 'gold' });
    }

    set((state) => {
      const currentProg = state.progressions[activeProfileId] || { ...DEFAULT_PROGRESSION };
      return {
        progressions: {
          ...state.progressions,
          [activeProfileId]: {
            ...currentProg,
            readTopics: nextRead,
            badges: finalBadges
          }
        }
      };
    });

    checkBehavioralBadgeEffects(current.badges, finalBadges);
  }
});
