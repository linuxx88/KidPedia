import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StorytellerButton } from './StorytellerButton'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useStoryteller } from '../../hooks/useStoryteller'
import { setupSpeechMock } from '../../test/mockUtils'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('StorytellerButton', () => {
  const mockToggleMagicWand = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    useSettingsStore.setState({ language: 'fr' })
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: false,
      isSpeaking: false,
      speak: vi.fn(),
      stopStory: vi.fn(),
      toggleMagicWand: mockToggleMagicWand,
    })
  })

  it('devrait rendre l etat de repos (Idle/Supported) correctement', () => {
    render(<StorytellerButton />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button.getAttribute('aria-label')).toBe("Activer la baguette magique (Hibou)")
    expect(screen.getByText('🦉')).toBeInTheDocument()

    // Pas de vagues ou sparkles
    expect(screen.queryByTestId('pulse-wave-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sparkles')).not.toBeInTheDocument()
  })

  it('devrait appeler toggleMagicWand lors du clic sur le bouton actif', () => {
    render(<StorytellerButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockToggleMagicWand).toHaveBeenCalledTimes(1)
  })

  it('devrait rendre l etat de parole (Speaking) correctement avec les animations', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: true,
      speak: vi.fn(),
      stopStory: vi.fn(),
      toggleMagicWand: mockToggleMagicWand,
    })

    render(<StorytellerButton />)

    const button = screen.getByRole('button')
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.getAttribute('aria-label')).toBe("Désactiver la baguette magique (Hibou)")
    
    expect(screen.getByTestId('pulse-wave-1')).toBeInTheDocument()
    expect(screen.getByTestId('pulse-wave-2')).toBeInTheDocument()
    expect(screen.getByTestId('sparkles')).toBeInTheDocument()
  })
})
