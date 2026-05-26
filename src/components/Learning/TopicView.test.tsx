import { screen, fireEvent, act } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TopicView } from './TopicView'
import { fr } from '../../locales/fr'
import { setupSpeechMock, setupAudioMock } from '../../test/mockUtils'
import { createMockQuiz } from '../../test/factories'
import { useStoryteller } from '../../hooks/useStoryteller'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('TopicView', () => {
  const mockOnBack = vi.fn()
  const mockOnAnswer = vi.fn()
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
    setupAudioMock()
    
    // Default implementation of useStoryteller
    vi.mocked(useStoryteller).mockReturnValue({
      speak: vi.fn(),
      stop: vi.fn(),
      pause: vi.fn(),
      isSpeaking: false,
    })
    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('affiche les informations du sujet correctement', () => {
    render(<TopicView {...defaultProps} />)

    expect(screen.getByText('Titre de Test')).toBeInTheDocument()
    expect(screen.getByText('🌿')).toBeInTheDocument()
    expect(screen.getByText('Ceci est le contenu complet du sujet de test.')).toBeInTheDocument()
  })

  it('affiche la médaille si un badge est présent', () => {
    render(
      <TopicView
        {...defaultProps}
        badgeIcon="🥇"
      />,
    )

    expect(screen.getByText('🥇')).toBeInTheDocument()
  })

  it('appelle onBack quand on clique sur Retour', () => {
    render(<TopicView {...defaultProps} />)

    fireEvent.click(screen.getByText(new RegExp(fr.common.back)))
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('utilise la synthèse vocale quand on clique sur Écouter', () => {
    render(<TopicView {...defaultProps} />)

    const speakBtn = screen.getByText(new RegExp(fr.common.listen))
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it('utilise le fichier audio quand il est présent dans le topic', () => {
    render(
      <TopicView
        {...defaultProps}
        audioFile="test.mp3"
      />,
    )

    const speakBtn = screen.getByText(new RegExp(fr.common.listenAudio))
    fireEvent.click(speakBtn)
    expect(window.Audio).toHaveBeenCalledWith('test.mp3')
  })

  it('utilise la synthèse vocale pour lire la description', () => {
    render(<TopicView {...defaultProps} />)

    const speakBtn = screen.getByLabelText('Écouter la description')
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it("utilise la synthèse vocale pour lire l'anecdote", () => {
    render(<TopicView {...defaultProps} />)

    const speakBtn = screen.getByLabelText("Écouter l'anecdote")
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it("affiche le bouton flottant de la Baguette Magique et bascule l'état au clic", () => {
    render(<TopicView {...defaultProps} />)

    const wandBtn = screen.getByLabelText("Activer la baguette magique de lecture")
    expect(wandBtn).toBeInTheDocument()

    // Clic pour activer
    fireEvent.click(wandBtn)
    expect(wandBtn).toHaveClass(/baguetteFloatingBtnActive/)

    // Clic pour désactiver
    fireEvent.click(wandBtn)
    expect(wandBtn).not.toHaveClass(/baguetteFloatingBtnActive/)
  })

  it("utilise la Baguette Magique pour lire un texte interactif au clic", () => {
    render(<TopicView {...defaultProps} />)

    const wandBtn = screen.getByLabelText("Activer la baguette magique de lecture")
    
    // Activer le mode baguette
    fireEvent.click(wandBtn)

    // La description est maintenant un texte interactif Baguette
    const interactiveText = screen.getByText('Ceci est le contenu complet du sujet de test.')
    act(() => {
      fireEvent.click(interactiveText)
      vi.advanceTimersByTime(250)
    })

    expect(window.speechSynthesis.speak).toHaveBeenCalled()
    const mockUtterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]
    expect(mockUtterance.text).toBe('Ceci est le contenu complet du sujet de test.')
  })

  it("devrait appeler speak lors du clic sur le StorytellerButton et stop lors du démontage du composant (Intégration Storyteller)", () => {
    const mockSpeak = vi.fn()
    const mockStop = vi.fn()

    vi.mocked(useStoryteller).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      pause: vi.fn(),
      isSpeaking: false,
    })

    const { unmount } = render(<TopicView {...defaultProps} />)

    // Trouver le bouton StorytellerButton principal de la fiche
    const buttons = screen.getAllByRole('button', { name: /lecture vocale/i })
    const button = buttons[0]
    expect(button).toBeInTheDocument()

    // Déclencher le clic
    fireEvent.click(button)
    expect(mockSpeak).toHaveBeenCalledWith(
      'Titre de Test. Ceci est le contenu complet du sujet de test.. Le savais-tu ? Un fait amusant !'
    )

    // Démontage
    unmount()
    expect(mockStop).toHaveBeenCalled()
  })
})
