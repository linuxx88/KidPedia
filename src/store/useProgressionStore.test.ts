import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useProgressionStore } from './useProgressionStore'
import { indexedDBStorage } from '../utils/indexedDBStorage'

describe('useProgressionStore', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    // Reset store state
    act(() => {
      useProgressionStore.getState().reset()
    });
  })

  it('devrait initialiser avec une map vide et aucun profil actif', () => {
    const { result } = renderHook(() => useProgressionStore())
    expect(result.current.progressions).toEqual({})
    expect(result.current.activeProfileId).toBeNull()
    expect(result.current.getBadges()).toEqual([])
    expect(result.current.getTotalXP()).toBe(0)
  })

  it('devrait initialiser un profil lors de la synchronisation', () => {
    const { result } = renderHook(() => useProgressionStore())
    
    act(() => {
      result.current.syncWithProfile('alice')
    })

    expect(result.current.activeProfileId).toBe('alice')
    expect(result.current.getTotalXP()).toBe(0)
    expect(result.current.getBadges()).toEqual([])
  })

  it('devrait ajouter un badge et calculer l\'XP pour le profil actif', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => {
      result.current.syncWithProfile('alice')
    })

    act(() => {
      result.current.addBadge('lion', 'gold')
    })

    expect(result.current.getBadges()).toContainEqual({ id: 'lion', medal: 'gold' })
    expect(result.current.getTotalXP()).toBe(1500)
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait gérer l\'upgrade de médaille et l\'évolution du rang', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => {
      result.current.syncWithProfile('alice')
    })

    // Bronze (250 XP) -> Rang Apprentice
    act(() => {
      result.current.addBadge('lion', 'bronze')
    })
    expect(result.current.getTotalXP()).toBe(250)
    expect(result.current.getCurrentRankId()).toBe('apprentice')

    // Or (1500 XP) -> Rang Explorer
    act(() => {
      result.current.addBadge('lion', 'gold')
    })
    expect(result.current.getBadges()).toContainEqual({ id: 'lion', medal: 'gold' })
    expect(result.current.getTotalXP()).toBe(1500)
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait isoler la progression entre deux profils', () => {
    const { result } = renderHook(() => useProgressionStore())

    // Alice gagne de l'XP
    act(() => { result.current.syncWithProfile('alice') })
    act(() => { result.current.addBadge('lion', 'gold') })
    expect(result.current.getTotalXP()).toBe(1500)

    // On switch sur Bob (qui est vide)
    act(() => { result.current.syncWithProfile('bob') })
    expect(result.current.getTotalXP()).toBe(0)
    expect(result.current.getBadges()).toEqual([])

    // Retour sur Alice
    act(() => { result.current.syncWithProfile('alice') })
    expect(result.current.getTotalXP()).toBe(1500)
  })

  it('devrait gagner de l\'XP via l\'action générique addXP', () => {
    const { result } = renderHook(() => useProgressionStore())
    
    act(() => { result.current.syncWithProfile('alice') })
    
    act(() => {
      result.current.addXP(100)
    })

    expect(result.current.getTotalXP()).toBe(100)
    expect(result.current.getCurrentRankId()).toBe('apprentice')

    act(() => {
      result.current.addXP(1000) // Total 1100
    })
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait être idempotent lors de la synchronisation (ne pas re-rendre si identique)', () => {
    const { result } = renderHook(() => useProgressionStore())

    // 1. Première synchro
    act(() => {
      result.current.syncWithProfile('alice')
    })
    
    // On s'abonne pour surveiller les changements
    const listener = vi.fn()
    const unsub = useProgressionStore.subscribe(listener)

    // 2. Deuxième synchro avec le même ID
    act(() => {
      result.current.syncWithProfile('alice')
    })

    expect(listener).not.toHaveBeenCalled()
    unsub()
  })

  it('devrait supprimer la progression d\'un profil lors de l\'appel à deleteProfileProgression', () => {
    const { result } = renderHook(() => useProgressionStore())

    // 1. Initialise la progression de alice et bob
    act(() => { result.current.syncWithProfile('alice') })
    act(() => { result.current.addBadge('lion', 'gold') })
    
    act(() => { result.current.syncWithProfile('bob') })
    act(() => { result.current.addBadge('soleil', 'silver') })

    expect(result.current.progressions['alice']).toBeDefined()
    expect(result.current.progressions['bob']).toBeDefined()

    // 2. Supprime la progression de alice
    act(() => {
      result.current.deleteProfileProgression('alice')
    })

    expect(result.current.progressions['alice']).toBeUndefined()
    expect(result.current.progressions['bob']).toBeDefined()
  })

  it('devrait réinitialiser activeProfileId à null si le profil actif est supprimé via deleteProfileProgression', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => { result.current.syncWithProfile('alice') })
    expect(result.current.activeProfileId).toBe('alice')

    act(() => {
      result.current.deleteProfileProgression('alice')
    })

    expect(result.current.activeProfileId).toBeNull()
  })

  describe('Économie de Tickets & Boutique', () => {
    it('devrait initialiser le solde de tickets à 0', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })
      expect(result.current.getTickets()).toBe(0)
    })

    it('devrait attribuer 3 tickets pour une médaille d\'or', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      act(() => {
        result.current.addBadge('lion', 'gold')
      })

      expect(result.current.getTickets()).toBe(3)
    })

    it('devrait attribuer 2 tickets pour une médaille d\'argent et 1 pour du bronze', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      act(() => {
        result.current.addBadge('lion', 'silver')
      })
      expect(result.current.getTickets()).toBe(2)

      // Un autre sujet pour le bronze
      act(() => {
        result.current.addBadge('soleil', 'bronze')
      })
      expect(result.current.getTickets()).toBe(3) // 2 + 1
    })

    it('devrait attribuer le delta lors d\'une amélioration (upgrade) de médaille', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      // 1. Bronze gagné -> +1 ticket
      act(() => {
        result.current.addBadge('lion', 'bronze')
      })
      expect(result.current.getTickets()).toBe(1)

      // 2. Amélioration en Or -> +2 tickets (3 - 1 = 2)
      act(() => {
        result.current.addBadge('lion', 'gold')
      })
      expect(result.current.getTickets()).toBe(3) // 1 + 2 = 3
    })

    it('devrait ajouter manuellement des tickets avec addTickets', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      act(() => {
        result.current.addTickets(10)
      })
      expect(result.current.getTickets()).toBe(10)
    })

    it('devrait acheter un accessoire si le solde est suffisant et l\'équiper', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      // Créditer 15 tickets (prix de la couronne premium)
      act(() => {
        result.current.addTickets(15)
      })

      // Achat de la couronne (15 tickets, head slot)
      let buyResult = false;
      act(() => {
        buyResult = result.current.buyAccessory('crown', 15)
      })

      expect(buyResult).toBe(true)
      expect(result.current.getTickets()).toBe(0)
      expect(result.current.getUnlockedAccessories()).toContain('crown')
      expect(result.current.getEquippedAccessoryId()).toBe('crown')
    })

    it('devrait refuser l\'achat si le solde est insuffisant', () => {
      const { result } = renderHook(() => useProgressionStore())
      act(() => { result.current.syncWithProfile('alice') })

      // Créditer 4 tickets (moins que le prix standard de 5)
      act(() => {
        result.current.addTickets(4)
      })

      let buyResult = true;
      act(() => {
        buyResult = result.current.buyAccessory('space-helmet', 5)
      })

      expect(buyResult).toBe(false)
      expect(result.current.getTickets()).toBe(4) // Solde inchangé
      expect(result.current.getUnlockedAccessories()).not.toContain('space-helmet')
      expect(result.current.getEquippedAccessoryId()).toBeNull()
    })
  })

  describe('Compression & Rétrocompatibilité du Stockage', () => {
    it('devrait correctement enregistrer l\'état non-compressé directement dans IndexedDB', async () => {
      await act(async () => {
        await useProgressionStore.persist.clearStorage();
      });

      // Mettre à jour l'état du store
      await act(async () => {
        useProgressionStore.getState().syncWithProfile('alice');
        useProgressionStore.getState().addBadge('lion', 'gold');
        useProgressionStore.getState().addTickets(3);
        useProgressionStore.getState().equipAccessory('crown');
      });

      // Attendre la fin de l'écriture IndexedDB asynchrone
      await new Promise((resolve) => setTimeout(resolve, 20));

      // Lire la valeur brute dans IndexedDB
      const rawStored = await indexedDBStorage.getItem('kp-progression-storage');
      expect(rawStored).toBeDefined();
      expect(rawStored).not.toBeNull();
      
      const parsed = JSON.parse(rawStored!);
      // Vérifier le format non-compressé (clés longues normales: progressions, activeProfileId)
      expect(parsed.state.progressions).toBeDefined();
      expect(parsed.state.progressions.alice).toBeDefined();
      expect(parsed.state.progressions.alice.badges).toContainEqual({ id: 'lion', medal: 'gold' });
      expect(parsed.state.progressions.alice.totalXP).toBe(1500);
      expect(parsed.state.progressions.alice.tickets).toBe(6);
      expect(parsed.state.progressions.alice.equippedAccessoryId).toBe('crown');
      expect(parsed.state.activeProfileId).toBe('alice');
    });

    it('devrait décompresser de manière transparente les données legacy (non-compressées) depuis localStorage', async () => {
      const legacyState = {
        state: {
          progressions: {
            bob: {
              badges: [{ id: 'soleil', medal: 'silver' }],
              totalXP: 500,
              currentRankId: 'apprentice',
              unlockedAccessories: [],
              equippedAccessoryId: null,
              equippedCompanionId: null,
              tickets: 2
            }
          },
          activeProfileId: 'bob'
        },
        version: 0
      };

      // Nettoyer IndexedDB des résidus asynchrones de reset() du beforeEach pour éviter toute collision
      await indexedDBStorage.removeItem('kp-progression-storage');

      // Écrire directement du JSON non-compressé dans le localStorage
      localStorage.setItem('kp-progression-storage', JSON.stringify(legacyState));

      // Forcer la réhydratation du store
      await act(async () => {
        await useProgressionStore.persist.rehydrate();
      });

      // Vérifier que le store a correctement chargé les données de Bob
      expect(useProgressionStore.getState().activeProfileId).toBe('bob');
      expect(useProgressionStore.getState().getTotalXP()).toBe(500);
      expect(useProgressionStore.getState().getBadges()).toContainEqual({ id: 'soleil', medal: 'silver' });
      expect(useProgressionStore.getState().getTickets()).toBe(2);
    });

    it('devrait migrer et décompresser de manière transparente les données legacy compressées depuis localStorage', async () => {
      const compressedLegacyState = {
        state: {
          p: {
            bob: {
              b: [{ i: 'soleil', m: 'silver' }],
              x: 500,
              r: 'apprentice',
              u: [],
              ea: null,
              ec: null,
              t: 2
            }
          },
          a: 'bob'
        },
        version: 0
      };

      // Nettoyer IndexedDB
      await indexedDBStorage.removeItem('kp-progression-storage');

      // Écrire directement du JSON compressé dans le localStorage
      localStorage.setItem('kp-progression-storage', JSON.stringify(compressedLegacyState));

      // Forcer la réhydratation du store
      await act(async () => {
        await useProgressionStore.persist.rehydrate();
      });

      // Vérifier que le store a décompressé et chargé les données de Bob
      expect(useProgressionStore.getState().activeProfileId).toBe('bob');
      expect(useProgressionStore.getState().getTotalXP()).toBe(500);
      expect(useProgressionStore.getState().getBadges()).toContainEqual({ id: 'soleil', medal: 'silver' });
      expect(useProgressionStore.getState().getTickets()).toBe(2);

      // Vérifier que localStorage a été nettoyé
      expect(localStorage.getItem('kp-progression-storage')).toBeNull();
    });
  });

  describe('découvertes quotidiennes (dailyDiscoveries)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('devrait initialiser dailyDiscoveries à un objet vide', () => {
      const { result } = renderHook(() => useProgressionStore());
      act(() => {
        result.current.syncWithProfile('charlie');
      });
      const profile = result.current.progressions['charlie'];
      expect(profile.dailyDiscoveries).toEqual({});
    });

    it('devrait enregistrer le topicId sous la date locale du jour lors de la réussite d\'un quiz', () => {
      // Mock de la date locale à '2026-05-25'
      const date = new Date(2026, 4, 25); // 25 mai 2026
      vi.setSystemTime(date);

      const { result } = renderHook(() => useProgressionStore());
      act(() => {
        result.current.syncWithProfile('charlie');
      });

      act(() => {
        result.current.addBadge('lion', 'gold');
      });

      const profile = result.current.progressions['charlie'];
      expect(profile.dailyDiscoveries!['2026-05-25']).toContain('lion');
    });

    it('devrait enregistrer le topicId sans doublon sous la même date locale', () => {
      const date = new Date(2026, 4, 25);
      vi.setSystemTime(date);

      const { result } = renderHook(() => useProgressionStore());
      act(() => {
        result.current.syncWithProfile('charlie');
      });

      act(() => {
        result.current.addBadge('lion', 'gold');
      });
      act(() => {
        result.current.addBadge('lion', 'gold');
      });
      act(() => {
        result.current.addBadge('soleil', 'bronze');
      });

      const profile = result.current.progressions['charlie'];
      expect(profile.dailyDiscoveries!['2026-05-25']).toEqual(['lion', 'soleil']);
    });

    it('devrait purger silencieusement les clés vieilles de plus de 7 jours', () => {
      const { result } = renderHook(() => useProgressionStore());
      
      act(() => {
        result.current.syncWithProfile('charlie');
      });

      // 1. Définir une date ancienne de 10 jours
      const oldDate = new Date(2026, 4, 15);
      vi.setSystemTime(oldDate);
      act(() => {
        result.current.addBadge('lion', 'bronze');
      });

      // 2. Définir une date récente de 5 jours
      const recentDate = new Date(2026, 4, 20);
      vi.setSystemTime(recentDate);
      act(() => {
        result.current.addBadge('soleil', 'bronze');
      });

      // 3. Définir aujourd'hui (25 mai 2026)
      const today = new Date(2026, 4, 25);
      vi.setSystemTime(today);
      act(() => {
        result.current.addBadge('terre', 'bronze');
      });

      const profile = result.current.progressions['charlie'];
      // '2026-05-15' est vieille de 10 jours (> 7 jours), elle doit être purgée.
      // '2026-05-20' est vieille de 5 jours (<= 7 jours), elle doit être conservée.
      // '2026-05-25' est aujourd'hui, elle doit être conservée.
      expect(profile.dailyDiscoveries?.['2026-05-15']).toBeUndefined();
      expect(profile.dailyDiscoveries!['2026-05-20']).toEqual(['soleil']);
      expect(profile.dailyDiscoveries!['2026-05-25']).toEqual(['terre']);
    });
  });
});

