import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QuizAnswerButton } from './QuizAnswerButton'

describe('QuizAnswerButton', () => {
  const mockOnClick = vi.fn()
  const mockOnToggleSpeak = vi.fn()

  const defaultProps = {
    text: 'La réponse A',
    index: 0,
    className: 'option-class',
    letter: 'A',
    onClick: mockOnClick,
    isSpeaking: false,
    onToggleSpeak: mockOnToggleSpeak,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche le bouton de réponse avec sa lettre, son texte et le haut-parleur', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('La réponse A')).toBeInTheDocument()

    const speakerBtn = screen.getByRole('button', { name: 'Écouter la réponse' })
    expect(speakerBtn).toBeInTheDocument()
  })

  it('déclenche onClick quand on clique sur le bouton principal', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    const mainBtn = screen.getByRole('button', { name: /Réponse A : La réponse A/i })
    fireEvent.click(mainBtn)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('déclenche onToggleSpeak sans propager le clic quand on clique sur le haut-parleur', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    const speakerBtn = screen.getByRole('button', { name: 'Écouter la réponse' })
    fireEvent.click(speakerBtn)

    // Check that onToggleSpeak is called
    expect(mockOnToggleSpeak).toHaveBeenCalled()

    // Check that the parent onClick is NOT called (due to stopPropagation)
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
