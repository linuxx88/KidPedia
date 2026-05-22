import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LifeCirclePage } from './LifeCirclePage';
import { useEnvironmentStore } from '../../store/useEnvironmentStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { createMockProfile } from '../../test/factories';

// Mock de react-router-dom pour capturer la navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LifeCirclePage (Tranche Verticale)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Réinitialiser les stores
    useEnvironmentStore.getState().reset();
    useProgressionStore.getState().reset();
    useProfileStore.getState().reset();
    useSettingsStore.getState().reset();

    // Créer un profil actif pour que les gains d'XP soient enregistrés
    const profile = createMockProfile({ id: 'player-1', name: 'Alice' });
    useProfileStore.setState({ 
      profiles: [profile],
      activeProfileId: 'player-1',
      activeProfile: profile
    });
    
    // Synchroniser la progression du profil actif
    useProgressionStore.getState().syncWithProfile('player-1');
  });

  it('devrait s\'initialiser avec le printemps (spring) et les instructions', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    // Vérifie le sélecteur de saisons avec le bouton actif
    const springBtn = screen.getByRole('button', { name: /changer de saison pour printemps/i });
    expect(springBtn).toBeInTheDocument();
    expect(springBtn.className).toContain('seasonBtnActive');

    // Vérifie la présence des instructions
    expect(screen.getByText(/fais défiler la page et clique sur/i)).toBeInTheDocument();

    // Vérifie la présence du bouton de retour vers l'accueil
    expect(screen.getByRole('button', { name: /accueil/i })).toBeInTheDocument();
  });

  it('devrait changer la saison de l\'environnement lors du clic sur les boutons', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    const summerBtn = screen.getByRole('button', { name: /changer de saison pour été/i });
    
    act(() => {
      fireEvent.click(summerBtn);
    });

    expect(useEnvironmentStore.getState().currentSeason).toBe('summer');
    expect(summerBtn.className).toContain('seasonBtnActive');
  });

  it('devrait ouvrir le modal avec les détails du sujet lors du clic sur un hotspot', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    // Récupérer le hotspot du tronc
    const trunkHotspot = screen.getByRole('button', { name: /le tronc de l'arbre sacré/i });
    expect(trunkHotspot).toBeInTheDocument();

    // Cliquer sur le tronc
    act(() => {
      fireEvent.click(trunkHotspot);
    });

    // Vérifier l'apparition du modal avec les informations pédagogiques
    expect(screen.getByRole('heading', { name: /le tronc de l'arbre sacré/i })).toBeInTheDocument();
    expect(screen.getByText(/le tronc est comme la colonne vertébrale de l'arbre/i)).toBeInTheDocument();
    expect(screen.getByText(/l'écorce protège le tronc des insectes/i)).toBeInTheDocument();
  });

  it('devrait attribuer de l\'XP et afficher un effet visuel lors du premier clic sur un hotspot', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    const trunkHotspot = screen.getByRole('button', { name: /le tronc de l'arbre sacré/i });
    
    // L'XP initiale devrait être de 0
    expect(useProgressionStore.getState().getTotalXP()).toBe(0);

    // Clic sur le tronc
    act(() => {
      fireEvent.click(trunkHotspot);
    });

    // Devrait avoir ajouté 5 XP
    expect(useProgressionStore.getState().getTotalXP()).toBe(5);

    // Devrait afficher l'effet visuel de gain d'XP
    expect(screen.getByText(/\+5 XP!/)).toBeInTheDocument();

    // Un deuxième clic ne devrait pas rajouter d'XP (protection anti-triche/anti-spam)
    act(() => {
      fireEvent.click(trunkHotspot);
    });
    expect(useProgressionStore.getState().getTotalXP()).toBe(5);
  });

  it('devrait naviguer vers le sujet encyclopédique lors du clic sur "Explorer"', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    const leafHotspot = screen.getByRole('button', { name: /la feuille magique/i });
    
    act(() => {
      fireEvent.click(leafHotspot);
    });

    const exploreBtn = screen.getByRole('button', { name: /explorer la feuille magique/i });
    expect(exploreBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(exploreBtn);
    });

    // Devrait naviguer vers la route du sujet 'saisons' associé à la feuille
    expect(mockNavigate).toHaveBeenCalledWith('/topic/saisons');
  });

  it('devrait fermer le modal lors du clic sur le bouton de fermeture', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    const animalHotspot = screen.getByRole('button', { name: /le lapin agile/i });
    
    act(() => {
      fireEvent.click(animalHotspot);
    });

    const modalTitle = screen.getByRole('heading', { name: /le lapin agile/i });
    expect(modalTitle).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /fermer/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(modalTitle).not.toBeInTheDocument();
  });

  it('devrait supporter l\'accessibilité clavier (KeyDown Enter/Space) sur les hotspots', () => {
    render(
      <MemoryRouter>
        <LifeCirclePage />
      </MemoryRouter>
    );

    const insectHotspot = screen.getByRole('button', { name: /l'abeille butineuse/i });
    
    // Simuler le focus et l'appui sur Enter
    act(() => {
      fireEvent.keyDown(insectHotspot, { key: 'Enter' });
    });

    expect(screen.getByRole('heading', { name: /l'abeille butineuse/i })).toBeInTheDocument();
  });
});
