import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StorytellerButton } from './StorytellerButton'
import { useSettingsStore } from '../../store/useSettingsStore'

describe('StorytellerButton', () => {
  const defaultProps = {
    isSpeaking: false,
    isSupported: true,
    onToggle: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useSettingsStore.setState({ language: 'fr' })
  })

  it('devrait rendre l etat de repos (Idle/Supported) correctement', () => {
    render(<StorytellerButton {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button.getAttribute('aria-label')).toBe("Lancer la lecture vocale de l'histoire")
    expect(screen.getByText('🦉')).toBeInTheDocument()

    // Pas de vagues ou sparkles
    expect(screen.queryByTestId('pulse-wave-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sparkles')).not.toBeInTheDocument()
  })

  it('devrait appeler onToggle lors du clic sur le bouton actif', () => {
    const onToggleMock = vi.fn()
    render(<StorytellerButton {...defaultProps} onToggle={onToggleMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onToggleMock).toHaveBeenCalledTimes(1)
  })

  it('devrait rendre l etat de parole (Speaking) correctement avec les animations', () => {
    render(<StorytellerButton {...defaultProps} isSpeaking={true} />)

    const button = screen.getByRole('button')
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.getAttribute('aria-label')).toBe("Arrêter la lecture vocale de l'histoire")
    
    // Devrait afficher le magicien et sparkles
    expect(screen.getByText('🧙‍♂️✨')).toBeInTheDocument()
    expect(screen.getByTestId('pulse-wave-1')).toBeInTheDocument()
    expect(screen.getByTestId('pulse-wave-2')).toBeInTheDocument()
    expect(screen.getByTestId('sparkles')).toBeInTheDocument()
  })

  it('devrait rendre l etat non supporte (Unsupported/Disabled) correctement', () => {
    render(<StorytellerButton {...defaultProps} isSupported={false} />)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.getAttribute('aria-label')).toBe('Lecture vocale non supportée sur ce navigateur')
    expect(screen.getByText('🦉🚫')).toBeInTheDocument()
  })

  it('devrait adapter la langue d accessibilite ARIA en anglais si le store est configure en EN', () => {
    useSettingsStore.setState({ language: 'en' })

    // Cas repos
    const { rerender } = render(<StorytellerButton {...defaultProps} />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Start reading the story')

    // Cas parole
    rerender(<StorytellerButton {...defaultProps} isSpeaking={true} />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Stop reading the story')

    // Cas non supporte
    rerender(<StorytellerButton {...defaultProps} isSupported={false} />)
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Speech synthesis not supported on this browser')
  })
})
