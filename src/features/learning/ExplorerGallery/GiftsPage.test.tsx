import { screen, fireEvent } from '@testing-library/react';
import { render, resetAllStores } from '../../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GiftsPage } from './GiftsPage';
import { useProgressionStore } from '../../../store/useProgressionStore';
import { useGiftStore } from '../../../store/useGiftStore';
import { useProfileStore } from '../../../store/useProfileStore';

// Mocking canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mocking useAudioFeedback to avoid actual audio play calls in tests
vi.mock('../../../hooks/useAudioFeedback', () => ({
  useAudioFeedback: () => ({
    playSound: vi.fn(),
  }),
}));

describe('GiftsPage', () => {
  const profileId = 'test-profile';

  beforeEach(() => {
    resetAllStores();
    useGiftStore.getState().reset();
    
    // Set up standard profile state
    useProfileStore.setState({
      activeProfileId: profileId,
      activeProfile: {
        id: profileId,
        name: 'Tom',
        avatar: '🦁',
        gender: 'boy',
        theme: 'light',
        language: 'fr',
      },
    });
  });

  it('renders correctly for a user with less than 1000 XP (locked chest)', () => {
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [],
          totalXP: 450,
          currentRankId: 'apprentice',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
        },
      },
    });

    render(<GiftsPage />);

    // Page header title
    expect(screen.getByText(/Nouvel objet/i)).toBeDefined();

    // Motivational progress message
    expect(screen.getByText(/Plus que 550 🌟 pour ouvrir ton coffre/i)).toBeDefined();

    // Chest is locked
    expect(screen.getByText('Le Coffre des Secrets')).toBeDefined();
    
    // Grid treasures
    expect(screen.getByText('👑 Mes Trésors')).toBeDefined();
    
    // Unlocked should show '???' for locked ones, e.g. space helmet, crown, dino mask
    const spaceHelmetConditions = screen.getAllByText(/Obtiens 3 médailles d'Or dans l'Espace/i);
    expect(spaceHelmetConditions.length).toBe(2);
  });

  it('renders correctly for an eligible user with >= 1000 XP who has not opened the chest', () => {
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [],
          totalXP: 1000,
          currentRankId: 'explorer',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
        },
      },
    });

    render(<GiftsPage />);

    // Should indicate the chest is ready to open
    expect(screen.getByText(/Un cadeau magique t'attend/i)).toBeDefined();
    expect(screen.getByText(/Clique sur le coffre pour l'ouvrir/i)).toBeDefined();
  });

  it('opens the chest, triggers confetti, auto-equips, and displays the unlocked accessory', () => {
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [],
          totalXP: 1000,
          currentRankId: 'explorer',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
        },
      },
    });

    render(<GiftsPage />);

    const chestBtn = screen.getByRole('button', { name: /Ouvrir le coffre magique/i });
    fireEvent.click(chestBtn);

    // After clicking, chest is opened
    expect(useGiftStore.getState().isChestOpened).toBe(true);

    // Accessory should be equipped in progress store
    expect(useProgressionStore.getState().getEquippedAccessoryId()).toBe('explorer-hat');

    // Should display unlocked chapeau de brousse
    expect(screen.getByText(/Chapeau de Brousse débloqué/i)).toBeDefined();
    expect(screen.getByText(/Retirer de mon avatar/i)).toBeDefined();
  });

  it('allows equipping and unequipping accessories from the treasures grid', () => {
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [],
          totalXP: 1200,
          currentRankId: 'explorer',
          unlockedAccessories: ['explorer-hat'],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 0,
        },
      },
    });

    // Make chest opened in store
    useGiftStore.setState({
      isChestOpened: true,
      isEligibleToOpen: true,
    });

    render(<GiftsPage />);

    // Wear button should be visible in grid
    const wearBtn = screen.getByRole('button', { name: /Porter Chapeau de Brousse/i });
    expect(wearBtn).toBeDefined();

    // Click wear
    fireEvent.click(wearBtn);
    expect(useProgressionStore.getState().getEquippedAccessoryId()).toBe('explorer-hat');

    // Click remove
    const removeBtn = screen.getByRole('button', { name: /Enlever Chapeau de Brousse/i });
    fireEvent.click(removeBtn);
    expect(useProgressionStore.getState().getEquippedAccessoryId()).toBeNull();
  });

  it('allows purchasing a locked accessory and equipping it', () => {
    useProgressionStore.setState({
      activeProfileId: profileId,
      progressions: {
        [profileId]: {
          badges: [],
          totalXP: 500,
          currentRankId: 'apprentice',
          unlockedAccessories: [],
          equippedAccessoryId: null,
          equippedCompanionId: null,
          tickets: 10,
        },
      },
    });

    render(<GiftsPage />);

    // Tickets balance displayed
    expect(screen.getByTestId('gifts-ticket-count').textContent).toBe('10');

    // Click "Acheter" button for space helmet (Casque Stellaire, price 5)
    const buyBtn = screen.getAllByRole('button', { name: /Acheter/i })[0];
    expect(buyBtn).toBeDefined();
    fireEvent.click(buyBtn);

    // Modal is opened
    expect(screen.getByText(/Veux-tu acheter/i)).toBeDefined();

    // Confirm purchase
    const confirmBtn = screen.getByRole('button', { name: /Oui, s'il te plaît/i });
    fireEvent.click(confirmBtn);

    // Tickets balance decremented and accessory equipped
    expect(useProgressionStore.getState().getTickets()).toBe(5);
    expect(useProgressionStore.getState().getUnlockedAccessories()).toContain('space-helmet');
    expect(useProgressionStore.getState().getEquippedAccessoryId()).toBe('space-helmet');
  });
});
