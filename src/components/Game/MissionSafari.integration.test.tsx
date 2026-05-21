import { render, screen, fireEvent, act } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MissionSafari } from './MissionSafari'
import { useSafariStore } from '../../store/useSafariStore'
import { useQuizStore } from '../../store/useQuizStore'

// 1. Mocks des composants complexes

vi.mock('./SafariDecorations', () => ({
  EnvironmentDecor: () => <div data-testid="decor" />,
  ExplorersJournal: ({ inventory }: { inventory: string[] }) => (
    <div data-testid="journal">Photos: {inventory.length}</div>
  )
}))

vi.mock('./VictoryCelebration', () => ({
  VictoryCelebration: ({ onReset }: { onReset: () => void }) => (
    <div data-testid="victory-screen">
      <h1>VICTOIRE</h1>
      <button onClick={onReset}>Bouton Rejouer Final</button>
    </div>
  )
}))

vi.mock('../Layout/OrientationGuard', () => ({
  OrientationGuard: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

window.HTMLElement.prototype.scrollTo = vi.fn()

describe('MissionSafari Integration', () => {
  const onBack = vi.fn()

  const renderGame = () =>
    render(
      <MissionSafari onBack={onBack} />,
    )

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    useSafariStore.getState().reset()
    useQuizStore.getState().resetQuiz()
    // On stub Math.random globalement avec une valeur neutre
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  const advance = async (ms: number) => {
    await act(async () => {
      vi.advanceTimersByTime(ms)
    })
    await act(async () => {
      await Promise.resolve()
    })
  }

  const waitForText = async (text: string, maxAttempts = 60) => {
    for (let i = 0; i < maxAttempts; i++) {
      const elements = screen.queryAllByText((content) => 
        content.toLowerCase().includes(text.toLowerCase())
      )
      if (elements.length > 0) return
      await advance(200)
    }
    throw new Error(`Texte "${text}" non trouvé. Message actuel: ${document.body.textContent?.slice(0, 300)}`)
  }

  const rollDice = async (value: number) => {
    const mockRandom = vi.spyOn(Math, 'random')
    // On sature les appels potentiels de composants tiers avant le clic
    mockRandom.mockReturnValue((value - 1) / 6)
    
    await waitForText('Lancer')
    const rollBtn = screen.getByTestId('roll-dice-button')
    fireEvent.click(rollBtn)
    
    await advance(1300) // Animation dé
  }

  it('permet de faire une partie complète jusqu\'à la victoire', { timeout: 25000 }, async () => {
    renderGame()

    // --- TOUR 1 : Lapin (Case 1) ---
    await rollDice(1)
    await waitForText('Lapin')
    fireEvent.click(screen.getByLabelText(/Réponse B/i))
    await waitForText('1/3')

    // --- TOUR 2 : Panda (Case 5) ---
    await rollDice(4) 
    await waitForText('Panda')
    fireEvent.click(screen.getByLabelText(/Réponse B/i))
    await waitForText('2/3')

    // --- TOUR 3 : Girafe (Case 7) ---
    await rollDice(2)
    await waitForText('Girafe')
    fireEvent.click(screen.getByLabelText(/Réponse B/i))
    await waitForText('3/3')

    // --- TOUR FINAL : Victoire ---
    await rollDice(7) // Vers la fin
    await waitForText('VICTOIRE')
    
    // Test du reset
    fireEvent.click(screen.getByText('Bouton Rejouer Final'))
    await waitForText('Lancer')
  })

  it('gère correctement l\'enchaînement Girafe(7) + 3 -> Trampoline(10) -> Lion(13)', async () => {
    renderGame()
    
    // Direct à la case 7
    await rollDice(7) 
    await waitForText('Girafe')
    fireEvent.click(screen.getByLabelText(/Réponse B/i))

    // On est à la case 7. On fait +3.
    // Case 10 (Trampoline +3) -> Case 13 (Lion)
    await rollDice(3)
    await waitForText('Lion')
    // Utilisation d'une regex plus spécifique pour éviter les duplicatas dans le DOM
    expect(screen.getAllByText(/Lion/i).length).toBeGreaterThan(0)
  })

  it('casse la boucle entre Liane Magique(2) et Sable Mouvant(4)', async () => {
    renderGame()
    
    // Case 2 : Liane Magique (+2) -> Case 4
    // Si on ne casse pas la boucle, la Case 4 nous renverrait à la case 2 (-2).
    await rollDice(2)
    await waitForText('Sable Mouvant')
    
    // On vérifie que le message s'est arrêté sur Sable Mouvant
    expect(screen.getByText(/Sable Mouvant/i)).toBeDefined()
    await advance(2000)
    // On vérifie qu'on n'est plus en mouvement
    const rollBtn = screen.queryByTestId('roll-dice-button')
    expect(rollBtn).not.toBeNull()
  })
})
