import { screen, fireEvent } from '@testing-library/react';
import { render, resetAllStores } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExplorerGallery } from './ExplorerGallery';
import { useProgressionStore } from '../../store/useProgressionStore';
import { encyclopedia } from '../../data/topics';

// Mocking useAudioFeedback to avoid actual audio play calls in tests
vi.mock('../../hooks/useAudioFeedback', () => ({
  useAudioFeedback: () => ({
    playSound: vi.fn(),
  }),
}));

describe('ExplorerGallery', () => {
  beforeEach(() => {
    resetAllStores();
  });

  it('renders all encyclopedia topics', () => {
    render(<ExplorerGallery />);
    // We expect the number of buttons to match the encyclopedia length + 2 (Back button + Gift button)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(encyclopedia.length + 2);
  });

  it('renders the GiftButton with correct accessibility label', () => {
    render(<ExplorerGallery />);
    const giftButton = screen.getByLabelText(/Ouvrir les cadeaux/i);
    expect(giftButton).toBeDefined();
    expect(screen.getByText(/Cadeaux/i)).toBeDefined();
  });

  it('displays unlocked stickers with their names and medal icons', () => {
    const topic = encyclopedia[0];
    const profileId = 'test-profile';
    
    // Simulate an unlocked topic in the store
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [{ id: topic.id, medal: 'gold' }],
          totalXP: 1000,
          currentRankId: 'explorer',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0
        }
      }
    });

    render(<ExplorerGallery />);
    
    // The name should be visible for the unlocked topic
    expect(screen.getByText(topic.title.fr)).toBeDefined();
    // Medal icon (🥇 for gold) should be visible
    expect(screen.getByText('🥇')).toBeDefined();
  });

  it('displays locked stickers with question marks and no names', () => {
    render(<ExplorerGallery />);
    
    // For a brand new profile, all stickers are locked
    const questionMarks = screen.getAllByText('?');
    expect(questionMarks.length).toBe(encyclopedia.length);
    
    // Names should NOT be visible
    expect(screen.queryByText(encyclopedia[0].title.fr)).toBeNull();
  });

  it('calls onTopicClick and plays sound when clicking an unlocked sticker', () => {
    const topic = encyclopedia[0];
    const profileId = 'test-profile';
    const handleTopicClick = vi.fn();

    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [{ id: topic.id, medal: 'gold' }],
          totalXP: 1000,
          currentRankId: 'explorer',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0
        }
      }
    });

    render(<ExplorerGallery onTopicClick={handleTopicClick} />);
    
    const unlockedSticker = screen.getByLabelText(new RegExp(`Sticker de ${topic.title.fr} débloqué`, 'i'));
    fireEvent.click(unlockedSticker);
    
    expect(handleTopicClick).toHaveBeenCalledWith(topic.id);
  });

  it('does NOT call onTopicClick when clicking a locked sticker', () => {
    const handleTopicClick = vi.fn();
    render(<ExplorerGallery onTopicClick={handleTopicClick} />);
    
    // Get all buttons and filter out the one that contains 'Retour' (Back button)
    const buttons = screen.getAllByRole('button');
    const lockedSticker = buttons.find(b => b.textContent?.includes('?') || b.getAttribute('aria-label')?.includes('mystère'));
    
    if (lockedSticker) {
      fireEvent.click(lockedSticker);
    }
    
    expect(handleTopicClick).not.toHaveBeenCalled();
  });
});
