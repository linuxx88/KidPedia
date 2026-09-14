import { screen, fireEvent } from '@testing-library/react';
import { render, resetAllStores } from '../../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavoritesPage } from '../FavoritesPage';
import { useProgressionStore } from '../../../store/useProgressionStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../../hooks/useAudioFeedback', () => ({
  useAudioFeedback: () => ({
    playSound: vi.fn(),
  }),
}));

describe('FavoritesPage Component', () => {
  const profileId = 'child-profile-1';

  beforeEach(() => {
    resetAllStores();
    mockNavigate.mockClear();
    useProgressionStore.getState().syncWithProfile(profileId);
  });

  it('affiche l\'état vide lorsqu\'il n\'y a aucun favori', () => {
    render(<FavoritesPage />);

    expect(screen.getByTestId('favorites-empty-state')).toBeInTheDocument();
    expect(screen.getByText("Tu n'as pas encore de favoris !")).toBeInTheDocument();

    const exploreBtn = screen.getByRole('button', { name: /Explorer l'encyclopédie/i });
    fireEvent.click(exploreBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('affiche la liste des cartes favorites et le compteur', () => {
    useProgressionStore.getState().toggleFavorite('lion');
    useProgressionStore.getState().toggleFavorite('soleil');

    render(<FavoritesPage />);

    expect(screen.queryByTestId('favorites-empty-state')).not.toBeInTheDocument();
    expect(screen.getByText('2 fiches favorites')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-card-lion')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-card-soleil')).toBeInTheDocument();
  });

  it('navigue vers la fiche détaillée lors du clic sur la carte', () => {
    useProgressionStore.getState().toggleFavorite('lion');

    render(<FavoritesPage />);

    const card = screen.getByTestId('favorite-card-lion');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/topic/lion');
  });

  it('filtre les fiches par catégorie', () => {
    useProgressionStore.getState().toggleFavorite('lion'); // animaux
    useProgressionStore.getState().toggleFavorite('soleil'); // espace

    render(<FavoritesPage />);

    // Filtres visibles
    const filterAll = screen.getByRole('tab', { name: /Tous/i });
    const filterAnimaux = screen.getByRole('tab', { name: /animaux/i });
    const filterEspace = screen.getByRole('tab', { name: /espace/i });

    expect(filterAll).toBeInTheDocument();
    expect(filterAnimaux).toBeInTheDocument();
    expect(filterEspace).toBeInTheDocument();

    // Clic sur 'animaux'
    fireEvent.click(filterAnimaux);
    expect(screen.getByTestId('favorite-card-lion')).toBeInTheDocument();
    expect(screen.queryByTestId('favorite-card-soleil')).not.toBeInTheDocument();

    // Clic sur 'espace'
    fireEvent.click(filterEspace);
    expect(screen.queryByTestId('favorite-card-lion')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorite-card-soleil')).toBeInTheDocument();

    // Clic sur 'Tous'
    fireEvent.click(filterAll);
    expect(screen.getByTestId('favorite-card-lion')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-card-soleil')).toBeInTheDocument();
  });

  it('permet de retirer une fiche directement depuis la carte', () => {
    useProgressionStore.getState().toggleFavorite('lion');

    render(<FavoritesPage />);

    expect(screen.getByTestId('favorite-card-lion')).toBeInTheDocument();

    const favButton = screen.getByTestId('favorite-button');
    fireEvent.click(favButton);

    // Une fois retiré, la page bascule vers l'état vide
    expect(useProgressionStore.getState().isFavorite('lion')).toBe(false);
    expect(screen.getByTestId('favorites-empty-state')).toBeInTheDocument();
  });
});
