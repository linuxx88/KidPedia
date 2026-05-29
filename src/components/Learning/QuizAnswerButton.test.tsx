import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QuizAnswerButton } from './QuizAnswerButton'
import { useStoryteller } from '../../hooks/useStoryteller'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('QuizAnswerButton', () => {
  const mockOnClick = vi.fn()
  const mockSpeak = vi.fn()

  const defaultProps = {
    text: 'La réponse A',
    index: 0,
    className: 'option-class',
    letter: 'A',
    onClick: mockOnClick,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: false,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: vi.fn(),
      toggleMagicWand: vi.fn(),
    })
  })

  it('affiche le bouton de réponse avec sa lettre et son texte, et sans haut-parleur individuel', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('La réponse A')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /écoute/i })).not.toBeInTheDocument()
  })

  it('déclenche onClick quand on clique sur le bouton en mode normal', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    const mainBtn = screen.getByRole('button', { name: /Réponse A : La réponse A/i })
    fireEvent.click(mainBtn)

    expect(mockOnClick).toHaveBeenCalled()
    expect(mockSpeak).not.toHaveBeenCalled()
  })

  it('déclenche speak(text) sans déclencher onClick quand le mode MagicWand est actif', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: vi.fn(),
      toggleMagicWand: vi.fn(),
    })

    render(<QuizAnswerButton {...defaultProps} />)

    const mainBtn = screen.getByRole('button', { name: /Réponse A : La réponse A/i })
    fireEvent.click(mainBtn)

    expect(mockSpeak).toHaveBeenCalledWith('La réponse A')
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
