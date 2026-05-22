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
      success = result.current.feedCompanion('dog-companion', 'sugarBone');
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
      success = result.current.feedCompanion('dog-companion', 'sugarBone');
    });

    expect(success).toBe(false);
    const dogState = result.current.getCompanionState('dog-companion');
    expect(dogState.affection).toBe(0);
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
});
