import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useSafariStore } from './useSafariStore'
import { SAFARI_GEOMETRY } from '../constants/geometry'

describe('useSafariStore (Game Engine)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useSafariStore.getState().reset()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('devrait initialiser avec l\'état RESET après un reset()', () => {
    const { result } = renderHook(() => useSafariStore())
    expect(result.current.status).toBe('IDLE')
    expect(result.current.eventCode).toBe('RESET')
  })

  it('devrait gérer un cycle de lancer de dé et mouvement', async () => {
    const { result } = renderHook(() => useSafariStore())
    
    vi.spyOn(Math, 'random').mockReturnValue(0) // Roll 1

    act(() => {
      result.current.rollDice()
    })

    // 1. Animation dé (1200ms)
    // À la fin de cette avance, le code après le await 1200ms s'exécute :
    // status devient MOVING, current devient 1, playerPosition devient 1.
    await act(async () => { vi.advanceTimersByTime(1200) })
    
    expect(result.current.status).toBe('MOVING')
    expect(result.current.playerPosition).toBe(1)

    // 2. Fin du mouvement (Délai d'un pas 800ms)
    await act(async () => { vi.advanceTimersByTime(SAFARI_GEOMETRY.STEP_DURATION) })
    
    await act(async () => { await Promise.resolve() })

    expect(result.current.playerPosition).toBe(1)
    expect(result.current.status).toBe('EVENT')
    expect(result.current.eventCode).toBe('ANIMAL_ENCOUNTER')
  })

  it('devrait gérer les bonus (BOOST)', async () => {
    const { result } = renderHook(() => useSafariStore())
    
    // On simule un 2 au dé
    vi.spyOn(Math, 'random').mockReturnValue(0.2) // (0.2*6)+1 = 2.2 -> 2

    act(() => {
      result.current.rollDice()
    })

    // 1. Animation dé (1200ms) -> Arrivée Case 1
    await act(async () => { vi.advanceTimersByTime(1200) })
    expect(result.current.playerPosition).toBe(1)
    
    // 2. Pas 1 (800ms) -> Arrivée Case 2
    await act(async () => { vi.advanceTimersByTime(SAFARI_GEOMETRY.STEP_DURATION) })
    expect(result.current.playerPosition).toBe(2)

    // 3. Pas 2 (800ms) -> Fin du mouvement initial
    await act(async () => { vi.advanceTimersByTime(SAFARI_GEOMETRY.STEP_DURATION) })
    
    // Laisser la résolution de la case se faire
    await act(async () => { await Promise.resolve() })
    expect(result.current.eventCode).toBe('BOOST')

    // 4. Délai Boost (1000ms) -> Début mouvement bonus (+2 pas)
    // À la fin de ce délai, pos devient 3 (car effect +2, direction +1)
    await act(async () => { vi.advanceTimersByTime(1000) })
    expect(result.current.playerPosition).toBe(3)
    
    // 5. Pas bonus 1 (800ms) -> Arrivée Case 4
    await act(async () => { vi.advanceTimersByTime(SAFARI_GEOMETRY.STEP_DURATION) })
    expect(result.current.playerPosition).toBe(4)

    // 6. Pas bonus 2 (800ms) -> Fin mouvement bonus
    await act(async () => { vi.advanceTimersByTime(SAFARI_GEOMETRY.STEP_DURATION) })

    await act(async () => { await Promise.resolve() })

    expect(result.current.playerPosition).toBe(4)
    expect(result.current.status).toBe('IDLE')
  })
})
