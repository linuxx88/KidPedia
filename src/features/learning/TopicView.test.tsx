import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TopicView } from './TopicView'
import { fr } from '../../locales/fr'
import { createMockQuiz } from '../../test/factories'
import { useStoryteller } from '../../hooks/useStoryteller'
import { useAudioFeedback } from '../../hooks/useAudioFeedback'
import { setupSpeechMock } from '../../test/mockUtils'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

vi.mock('../../hooks/useAudioFeedback', () => ({
  useAudioFeedback: vi.fn(),
}))

describe('TopicView', () => {
  const mockOnBack = vi.fn()
  const mockOnAnswer = vi.fn()
  const mockSpeak = vi.fn()
  const mockStopStory = vi.fn()
  const mockToggleMagicWand = vi.fn()
  const mockPlaySound = vi.fn()

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
    vi.mocked(useAudioFeedback).mockReturnValue({
      playSound: mockPlaySound,
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

  it('affiche les micro-sections encyclopédiques lorsqu\'elles sont fournies', () => {
    const sampleSections = [
      {
        icon: '🌍',
        title: { fr: 'Où vit-il ?', en: 'Where does it live?' },
        content: { fr: 'Dans la savane.', en: 'In the savannah.' },
      },
      {
        icon: '🥩',
        title: { fr: 'Que mange-t-il ?', en: 'What does it eat?' },
        content: { fr: 'De la viande.', en: 'Meat.' },
      },
    ]

    render(<TopicView {...defaultProps} sections={sampleSections} />)

    expect(screen.getByTestId('topic-sections-grid')).toBeInTheDocument()
    expect(screen.getByText('Où vit-il ?')).toBeInTheDocument()
    expect(screen.getByText('Dans la savane.')).toBeInTheDocument()
    expect(screen.getByText('Que mange-t-il ?')).toBeInTheDocument()
    expect(screen.getByText('De la viande.')).toBeInTheDocument()
  })

  it('ne rend pas de grille de sections quand sections est absent ou vide', () => {
    render(<TopicView {...defaultProps} sections={undefined} />)
    expect(screen.queryByTestId('topic-sections-grid')).not.toBeInTheDocument()
  })

  it('affiche le bouton d\'écoute du son réel lorsque audioFile est fourni', () => {
    render(<TopicView {...defaultProps} audioFile="/assets/audio/Lion.m4a" />)

    const audioBtn = screen.getByTestId('topic-real-audio-button')
    expect(audioBtn).toBeInTheDocument()
    expect(audioBtn).toHaveTextContent(/son réel de l'animal/i)
  })

  it('déclenche playSound et coupe la narration lors du clic sur le son réel', () => {
    render(<TopicView {...defaultProps} audioFile="/assets/audio/Lion.m4a" />)

    const audioBtn = screen.getByTestId('topic-real-audio-button')
    fireEvent.click(audioBtn)

    expect(mockStopStory).toHaveBeenCalled()
    expect(mockPlaySound).toHaveBeenCalledWith('/assets/audio/Lion.m4a')
  })

  it('n\'affiche pas de bouton audio quand audioFile est absent', () => {
    render(<TopicView {...defaultProps} audioFile={undefined} />)

    expect(screen.queryByTestId('topic-real-audio-button')).not.toBeInTheDocument()
  })

  it('affiche les sujets connexes quand relatedTopics est fourni', () => {
    const sampleRelated = [
      { id: 'elephant', title: 'Éléphant', icon: '🐘' },
      { id: 'tigre', title: 'Tigre', icon: '🐯' },
    ]

    render(<TopicView {...defaultProps} relatedTopics={sampleRelated} />)

    expect(screen.getByTestId('related-topics-section')).toBeInTheDocument()
    expect(screen.getByText(/À découvrir aussi/i)).toBeInTheDocument()
    expect(screen.getByTestId('related-topic-elephant')).toHaveTextContent('Éléphant')
    expect(screen.getByTestId('related-topic-tigre')).toHaveTextContent('Tigre')
  })

  it('appelle onSelectRelatedTopic et coupe la narration lors du clic sur un sujet connexe', () => {
    const mockSelectRelated = vi.fn()
    const sampleRelated = [
      { id: 'elephant', title: 'Éléphant', icon: '🐘' },
    ]

    render(
      <TopicView
        {...defaultProps}
        relatedTopics={sampleRelated}
        onSelectRelatedTopic={mockSelectRelated}
      />
    )

    fireEvent.click(screen.getByTestId('related-topic-elephant'))

    expect(mockStopStory).toHaveBeenCalled()
    expect(mockSelectRelated).toHaveBeenCalledWith('elephant')
  })

  it('ne rend pas la section des sujets connexes quand relatedTopics est absent ou vide', () => {
    render(<TopicView {...defaultProps} relatedTopics={undefined} />)
    expect(screen.queryByTestId('related-topics-section')).not.toBeInTheDocument()

    render(<TopicView {...defaultProps} relatedTopics={[]} />)
    expect(screen.queryByTestId('related-topics-section')).not.toBeInTheDocument()
  })
})
