import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TopicView } from './TopicView'
import { fr } from '../../locales/fr'
import { createMockQuiz } from '../../test/factories'
import { useStoryteller } from '../../hooks/useStoryteller'
import { setupSpeechMock } from '../../test/mockUtils'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('TopicView', () => {
  const mockOnBack = vi.fn()
  const mockOnAnswer = vi.fn()
  const mockSpeak = vi.fn()
  const mockStopStory = vi.fn()
  const mockToggleMagicWand = vi.fn()

  const defaultProps = {
    title: 'Titre de Test',
    description: 'Ceci est le contenu complet du sujet de test.',
    funFact: 'Un fait amusant !',
    icon: '🌿',
    quiz: createMockQuiz(),
    onBack: mockOnBack,
    onAnswer: mockOnAnswer,
    quizResult: null,
    gender: 'boy' as const,
    retryMsg: null,
    activeHint: null,
    language: 'fr' as const,
    labels: fr,
    attempts: 1
  }

  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: false,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: mockToggleMagicWand,
    })
  })

  it('affiche les informations du sujet correctement', () => {
    render(<TopicView {...defaultProps} />)

    expect(screen.getByText('Titre de Test')).toBeInTheDocument()
    expect(screen.getByText('🌿')).toBeInTheDocument()
    expect(screen.getByText('Ceci est le contenu complet du sujet de test.')).toBeInTheDocument()
  })

  it('appelle onBack quand on clique sur Retour', () => {
    render(<TopicView {...defaultProps} />)

    fireEvent.click(screen.getByText(new RegExp(fr.common.back)))
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('ne montre pas de bouton baguette magique flottant séparé ou de boutons individuels', () => {
    render(<TopicView {...defaultProps} />)

    expect(screen.queryByLabelText("Activer la baguette magique de lecture")).not.toBeInTheDocument()
    expect(screen.queryByText('🪄')).not.toBeInTheDocument()
    
    // There should only be one StorytellerButton Owl button in the header navActions
    const buttons = screen.getAllByRole('button')
    const owlButtons = buttons.filter(btn => {
      const label = btn.getAttribute('aria-label')?.toLowerCase() || ''
      return label.includes('baguette magique') || label.includes('magic wand')
    })
    expect(owlButtons).toHaveLength(1)
  })

  it('déclenche speak sur le titre en mode MagicWand', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: mockToggleMagicWand,
    })

    render(<TopicView {...defaultProps} />)

    const interactiveTitle = screen.getByText('Titre de Test')
    fireEvent.click(interactiveTitle)
    expect(mockSpeak).toHaveBeenCalledWith('Titre de Test')
  })

  it('déclenche speak sur la description en mode MagicWand', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: mockToggleMagicWand,
    })

    render(<TopicView {...defaultProps} />)

    const interactiveDesc = screen.getByText('Ceci est le contenu complet du sujet de test.')
    fireEvent.click(interactiveDesc)
    expect(mockSpeak).toHaveBeenCalledWith('Ceci est le contenu complet du sujet de test.')
  })

  it('déclenche speak sur l anecdote en mode MagicWand', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: mockToggleMagicWand,
    })

    render(<TopicView {...defaultProps} />)

    const interactiveFact = screen.getByText('Un fait amusant !')
    fireEvent.click(interactiveFact)
    expect(mockSpeak).toHaveBeenCalledWith('Le savais-tu ?. Un fait amusant !')
  })
})
