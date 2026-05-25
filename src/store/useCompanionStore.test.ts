import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCompanionStore } from './useCompanionStore';
import { useProgressionStore } from './useProgressionStore';

describe('useCompanionStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Reset stores
    act(() => {
      useCompanionStore.getState().reset();
      useProgressionStore.getState().reset();
    });
  });

  it('devrait initialiser avec un inventaire vide et des états de compagnons par défaut', () => {
    const { result } = renderHook(() => useCompanionStore());
    
    expect(result.current.getInventory()).toEqual({
      sugarBone: 0,
      goldenLeaf: 0,
      batteryCell: 0,
    });
    
    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.affection).toBe(0);
    expect(dogState.happiness).toBe(50);
    expect(dogState.lastFed).toBeNull();
  });

  it('devrait acheter une friandise si le profil a assez de tickets', () => {
    // 1. Initialiser le profil dans le progression store
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      // Ajouter des tickets
      useProgressionStore.getState().addTickets(5);
    });

    const { result: companionHook } = renderHook(() => useCompanionStore());
    const { result: progressionHook } = renderHook(() => useProgressionStore());

    expect(progressionHook.current.getTickets()).toBe(5);

    // 2. Acheter un os en sucre pour 1 ticket
    let success = false;
    act(() => {
      success = companionHook.current.buyTreat('sugarBone', 1);
    });

    expect(success).toBe(true);
    expect(companionHook.current.getInventory().sugarBone).toBe(1);
    expect(progressionHook.current.getTickets()).toBe(4);
  });

  it('devrait refuser l\'achat si le profil n\'a pas assez de tickets', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      // 0 ticket
    });

    const { result: companionHook } = renderHook(() => useCompanionStore());
    
    let success = true;
    act(() => {
      success = companionHook.current.buyTreat('sugarBone', 1);
    });

    expect(success).toBe(false);
    expect(companionHook.current.getInventory().sugarBone).toBe(0);
  });

  it('devrait caresser le compagnon et augmenter son bonheur', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
    });

    const { result } = renderHook(() => useCompanionStore());

    act(() => {
      result.current.petCompanion('dog-companion');
    });

    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.happiness).toBe(55); // 50 + 5
  });

  it('devrait nourrir le compagnon s\'il possède la friandise requise', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      useProgressionStore.getState().addTickets(2);
    });

    const { result } = renderHook(() => useCompanionStore());

    // Acheter
    act(() => {
      result.current.buyTreat('sugarBone', 1);
    });
    expect(result.current.getInventory().sugarBone).toBe(1);

    // Nourrir
    let success = false;
    act(() => {
      success = result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
    });

    expect(success).toBe(true);
    expect(result.current.getInventory().sugarBone).toBe(0);
    
    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.affection).toBe(15); // +15
    expect(dogState.happiness).toBe(60); // 50 (default) + 10 (feed)
    expect(dogState.lastFed).not.toBeNull();
  });

  it('devrait refuser de nourrir si le sac ne contient pas la friandise', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
    });

    const { result } = renderHook(() => useCompanionStore());

    let success = true;
    act(() => {
      success = result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
    });

    expect(success).toBe(false);
    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.affection).toBe(0);
  });

  it('devrait mettre isFeeding à true puis à false après 2 secondes', () => {
    vi.useFakeTimers();
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      useProgressionStore.getState().addTickets(2);
    });

    const { result } = renderHook(() => useCompanionStore());

    act(() => {
      result.current.buyTreat('sugarBone', 1);
    });

    act(() => {
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
    });

    expect(result.current.getCompanionState('dog-companion').isFeeding).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.getCompanionState('dog-companion').isFeeding).toBe(false);
    vi.useRealTimers();
  });

  it('devrait clamer l\'affection et le bonheur à 100 maximum', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      useProgressionStore.getState().addTickets(10);
    });

    const { result } = renderHook(() => useCompanionStore());

    act(() => {
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
      result.current.buyTreat('sugarBone', 1);
    });

    act(() => {
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
      result.current.feedCompanion('alice', 'dog-companion', 'sugarBone');
    });

    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.affection).toBe(100);
    expect(dogState.happiness).toBe(100);
  });

  it('devrait isoler l\'état et l\'inventaire par profil', () => {
    // Profil Alice
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
      useProgressionStore.getState().addTickets(2);
    });

    const { result } = renderHook(() => useCompanionStore());

    act(() => {
      result.current.buyTreat('sugarBone', 1);
      result.current.petCompanion('dog-companion');
    });

    expect(result.current.getInventory().sugarBone).toBe(1);
    expect(result.current.getCompanionState('dog-companion').happiness).toBe(55);

    // Changer pour le Profil Bob
    act(() => {
      useProgressionStore.getState().syncWithProfile('bob');
    });

    expect(result.current.getInventory().sugarBone).toBe(0);
    expect(result.current.getCompanionState('dog-companion').happiness).toBe(50); // Default

    // Retour sur Alice
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
    });

    expect(result.current.getInventory().sugarBone).toBe(1);
    expect(result.current.getCompanionState('dog-companion').happiness).toBe(55);
  });

  it('devrait effacer les données de compagnons lors de la suppression d\'un profil', () => {
    act(() => {
      useProgressionStore.getState().syncWithProfile('alice');
    });

    const { result } = renderHook(() => useCompanionStore());

    act(() => {
      result.current.petCompanion('dog-companion');
    });

    expect(result.current.getCompanionState('dog-companion').happiness).toBe(55);

    act(() => {
      result.current.deleteProfileCompanionData('alice');
    });

    // Devrait être réinitialisé car les données d'Alice ont été effacées
    expect(result.current.getCompanionState('dog-companion').happiness).toBe(50);
  });

  describe('Virtual Pet Care Simulations', () => {
    it('devrait gérer le sommeil et la régénération d\'énergie', () => {
      act(() => {
        useProgressionStore.getState().syncWithProfile('alice');
      });
      const { result } = renderHook(() => useCompanionStore());
      
      expect(result.current.getCompanionState('dog-companion').isSleeping).toBe(false);
      expect(result.current.getCompanionState('dog-companion').energy).toBe(80);

      act(() => {
        result.current.setSleeping('dog-companion', true);
      });

      expect(result.current.getCompanionState('dog-companion').isSleeping).toBe(true);

      act(() => {
        result.current.incrementEnergy('dog-companion', 10);
      });

      expect(result.current.getCompanionState('dog-companion').energy).toBe(90);
    });

    it('devrait gérer la génération et le nettoyage des poops', () => {
      act(() => {
        useProgressionStore.getState().syncWithProfile('alice');
      });
      const { result } = renderHook(() => useCompanionStore());

      expect(result.current.getCompanionState('dog-companion').poops).toEqual([]);

      act(() => {
        result.current.spawnPoop('dog-companion');
      });

      const companionState = result.current.getCompanionState('dog-companion');
      expect(companionState.poops.length).toBe(1);
      expect(companionState.poops[0].x).toBeGreaterThanOrEqual(20);
      expect(companionState.poops[0].y).toBeGreaterThanOrEqual(60);
      expect(companionState.happiness).toBe(40); // 50 - 10

      const poopId = companionState.poops[0].id;

      act(() => {
        result.current.cleanPoop('dog-companion', poopId);
      });

      const cleanedState = result.current.getCompanionState('dog-companion');
      expect(cleanedState.poops).toEqual([]);
      expect(cleanedState.happiness).toBe(55); // 40 + 15
    });

    it('devrait gérer le mini-jeu de cache-cache', () => {
      act(() => {
        useProgressionStore.getState().syncWithProfile('alice');
      });
      const { result } = renderHook(() => useCompanionStore());

      expect(result.current.getCompanionState('dog-companion').isHiding).toBe(false);

      act(() => {
        result.current.startHideSeek('dog-companion');
      });

      const hidingState = result.current.getCompanionState('dog-companion');
      expect(hidingState.isHiding).toBe(true);
      expect(hidingState.energy).toBe(65); // 80 - 15
      expect(hidingState.hideSeekState).toBe('hiding');

      const winSpot = hidingState.hidingSpot;
      const loseSpot = (winSpot + 1) % 3;

      // Guess wrong
      let success = false;
      act(() => {
        success = result.current.guessHideSeek('alice', 'dog-companion', loseSpot);
      });
      expect(success).toBe(false);
      expect(result.current.getCompanionState('dog-companion').hideSeekState).toBe('fail');

      // Guess correct
      act(() => {
        success = result.current.guessHideSeek('alice', 'dog-companion', winSpot);
      });
      expect(success).toBe(true);
      expect(result.current.getCompanionState('dog-companion').hideSeekState).toBe('success');
      expect(result.current.getCompanionState('dog-companion').affection).toBe(15);

      act(() => {
        result.current.exitHideSeek('dog-companion');
      });
      expect(result.current.getCompanionState('dog-companion').isHiding).toBe(false);
      expect(result.current.getCompanionState('dog-companion').hideSeekState).toBe('idle');
    });
  });
});
