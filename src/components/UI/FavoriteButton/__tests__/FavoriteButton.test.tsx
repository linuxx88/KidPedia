import { screen, fireEvent } from '@testing-library/react';
import { render, resetAllStores } from '../../../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavoriteButton } from '../FavoriteButton';
import { useProgressionStore } from '../../../../store/useProgressionStore';
import { useNotificationStore } from '../../../../store/useNotificationStore';

const mockPlaySound = vi.fn();
vi.mock('../../../../hooks/useAudioFeedback', () => ({
  useAudioFeedback: () => ({
    playSound: mockPlaySound,
  }),
}));

describe('FavoriteButton Component', () => {
  const profileId = 'child-test-id';

  beforeEach(() => {
    resetAllStores();
    mockPlaySound.mockClear();
    useNotificationStore.setState({ notifications: [] });
    useProgressionStore.getState().syncWithProfile(profileId);
  });

  it('affiche une icône blanche/vide lorsque la fiche n\'est pas en favori', () => {
    render(<FavoriteButton topicId="lion" topicTitle="Le Lion" />);
    
    const btn = screen.getByTestId('favorite-button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn.textContent).toContain('🤍');
  });

  it('bascule en favori au clic avec son pop et notification toast', () => {
    render(<FavoriteButton topicId="lion" topicTitle="Le Lion" />);
    
    const btn = screen.getByTestId('favorite-button');
    fireEvent.click(btn);

    // État dans le store
    expect(useProgressionStore.getState().isFavorite('lion')).toBe(true);

    // Retour sonore & notification
    expect(mockPlaySound).toHaveBeenCalledWith('pop');
    const notifications = useNotificationStore.getState().notifications;
    expect(notifications.length).toBe(1);
    expect(notifications[0].title).toBe('Le Lion');
    expect(notifications[0].type).toBe('favorite');

    // Mise à jour de l'UI
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn.textContent).toContain('⭐');
  });

  it('retire le favori au second clic avec son click', () => {
    useProgressionStore.getState().toggleFavorite('lion');

    render(<FavoriteButton topicId="lion" topicTitle="Le Lion" />);
    const btn = screen.getByTestId('favorite-button');
    expect(btn).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(btn);

    expect(useProgressionStore.getState().isFavorite('lion')).toBe(false);
    expect(mockPlaySound).toHaveBeenCalledWith('click');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });
});
