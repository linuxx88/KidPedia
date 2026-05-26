import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QuizAnswerButton } from './QuizAnswerButton'
import { useStoryteller } from '../../hooks/useStoryteller'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('QuizAnswerButton', () => {
  const mockSpeak = vi.fn()
  const mockStop = vi.fn()
  const mockOnClick = vi.fn()

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
      speak: mockSpeak,
      stop: mockStop,
      pause: vi.fn(),
      isSpeaking: false,
    })
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

  it('déclenche speak sans propager le clic quand on clique sur le haut-parleur', () => {
    render(<QuizAnswerButton {...defaultProps} />)

    const speakerBtn = screen.getByRole('button', { name: 'Écouter la réponse' })
    fireEvent.click(speakerBtn)

    // Check that speak is called with the answer text
    expect(mockSpeak).toHaveBeenCalledWith(defaultProps.text)

    // Check that the parent onClick is NOT called (due to stopPropagation)
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('arrête la lecture si elle est active lors du clic sur le haut-parleur', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      pause: vi.fn(),
      isSpeaking: true,
    })

    render(<QuizAnswerButton {...defaultProps} />)

    const speakerBtn = screen.getByRole('button', { name: 'Écouter la réponse' })
    fireEvent.click(speakerBtn)

    expect(mockStop).toHaveBeenCalled()
    expect(mockSpeak).not.toHaveBeenCalled()
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
