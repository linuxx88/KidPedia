import { render, screen, fireEvent } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BadgesPage } from './BadgesPage'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProgressionStore } from '../../store/useProgressionStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useEnvironmentStore } from '../../store/useEnvironmentStore'
import { LABELS } from '../../utils/labels'
import { type Labels } from '../../locales/types'
import { type PlayerStateData } from '../../store/usePlayerStore'

// Mock hooks
vi.mock('../../store/useSettingsStore', () => ({
  useSettingsStore: vi.fn(),
}))

vi.mock('../../store/useProgressionStore', () => ({
  useProgressionStore: vi.fn(),
}))

vi.mock('../../store/usePlayerStore', () => ({
  usePlayerStore: vi.fn(),
}))

vi.mock('../../store/useEnvironmentStore', () => ({
  useEnvironmentStore: vi.fn(),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock encyclopedia to have controlled data
vi.mock('../../data/topics', () => ({
  encyclopedia: [
    { id: 'topic1', title: { fr: 'Topic 1 FR', en: 'Topic 1 EN' }, icon: '🍎', categoryKey: 'nature' },
    { id: 'topic2', title: { fr: 'Topic 2 FR', en: 'Topic 2 EN' }, icon: '🚗', categoryKey: 'tech' },
  ],
}))

describe('BadgesPage', () => {
  const mockOnBack = vi.fn()
  const mockClearBadges = vi.fn()

  const defaultSettings = {
    gender: 'boy' as const,
    language: 'fr' as const,
    labels: LABELS as unknown as Labels,
    toggleTheme: vi.fn(),
    toggleGender: vi.fn(),
    setLanguage: vi.fn(),
    syncWithProfile: vi.fn(),
    reset: vi.fn(),
  }

  const environmentState = {
    currentSeason: 'spring' as const,
    cycleSeason: vi.fn(),
    reset: vi.fn()
  }

  const progressionState = {
    clearBadges: mockClearBadges,
    currentRankId: 'apprentice',
    progressions: {},
    activeProfileId: '1',
    getBadges: vi.fn(),
    getTotalXP: vi.fn(),
    getCurrentRankId: vi.fn(),
    getUnlockedAccessories: vi.fn().mockReturnValue([]),
    getEquippedAccessoryId: vi.fn().mockReturnValue(null),
    getEquippedCompanionId: vi.fn().mockReturnValue(null),
    getTickets: vi.fn().mockReturnValue(0),
    isCompleted: vi.fn().mockReturnValue(false),
    isUnlocked: vi.fn().mockReturnValue(true),
    getStickers: vi.fn().mockReturnValue([]),
    getUnlockedPuzzlePieces: vi.fn().mockReturnValue({}),
    getUnlockedWallpapers: vi.fn().mockReturnValue([]),
    addXP: vi.fn(),
    addBadge: vi.fn(),
    addTickets: vi.fn(),
    buyAccessory: vi.fn().mockReturnValue(true),
    syncWithProfile: vi.fn(),
    equipAccessory: vi.fn(),
    equipCompanion: vi.fn(),
    deleteProfileProgression: vi.fn(),
    reset: vi.fn(),
    unlockSticker: vi.fn(),
    unlockPuzzlePiece: vi.fn(),
    awardPuzzlePiece: vi.fn().mockReturnValue({ success: true, pieceIndex: 0, isNew: true })
  }

  let playerState: PlayerStateData = {
    badges: [],
    xp: 0,
    playerName: 'Alice',
    avatar: '👧'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    playerState = {
      badges: [],
      xp: 0,
      playerName: 'Alice',
      avatar: '👧'
    }
    // Default mock implementation
    vi.mocked(useSettingsStore).mockReturnValue(defaultSettings)
    vi.mocked(useEnvironmentStore).mockReturnValue(environmentState)
    vi.mocked(useProgressionStore).mockImplementation((selector) => {
      return typeof selector === 'function' ? selector(progressionState) : progressionState;
    })
    vi.mocked(usePlayerStore).mockReturnValue(playerState)
  })

  it("affiche le message d'onboarding quand il n'y a pas de badges", () => {
    render(
      <BadgesPage onBack={mockOnBack} />
    )

    expect(screen.getByText(LABELS.badges.onboarding)).toBeInTheDocument()
  })

  it('affiche les médailles gagnées', () => {
    playerState.badges = [{ id: 'topic1', medal: 'gold' }]

    render(
      <BadgesPage onBack={mockOnBack} />
    )

    // Vérifie le résumé des médailles
    // 🥇 1 (gold), 🥈 0, 🥉 0
    expect(screen.getByText('1')).toBeInTheDocument()

    // Vérifie le texte de progression
    expect(screen.getByText(LABELS.badges.progress(1, 2))).toBeInTheDocument()

    // Vérifie l'affichage des sujets - default language is FR
    expect(screen.getByText('Topic 1 FR')).toBeInTheDocument()
    expect(screen.getByText('Topic 2 FR')).toBeInTheDocument() // Visible même si verrouillé
  })

  it('appelle onBack quand on clique sur le bouton retour', () => {
    render(
      <BadgesPage onBack={mockOnBack} />
    )

    const backButton = screen.getByText(new RegExp(LABELS.common.back))
    fireEvent.click(backButton)
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('appelle clearBadges quand on clique sur le bouton de réinitialisation', () => {
    playerState.badges = [{ id: 'topic1', medal: 'gold' }]
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(
      <BadgesPage onBack={mockOnBack} />
    )

    const resetBtn = screen.getByText(new RegExp(LABELS.badges.reset, 'i'))
    fireEvent.click(resetBtn)
    expect(mockClearBadges).toHaveBeenCalled()
    confirmSpy.mockRestore()
  })

  it('navigue vers le sujet quand on clique sur un badge gagné', () => {
    playerState.badges = [{ id: 'topic1', medal: 'gold' }]

    render(
      <BadgesPage onBack={mockOnBack} />
    )

    const badgeItem = screen.getByText('Topic 1 FR').closest('button')
    if (badgeItem) fireEvent.click(badgeItem)

    expect(mockNavigate).toHaveBeenCalledWith('/topic/topic1')
  })

  it('affiche le rang correct selon le genre', () => {
    // Test pour un garçon avec 1 badge
    playerState.badges = [{ id: 'topic1', medal: 'gold' }]
    vi.mocked(useSettingsStore).mockReturnValue(defaultSettings)

    const { rerender } = render(
      <BadgesPage onBack={mockOnBack} />
    )

    expect(screen.getByText(new RegExp(LABELS.badges.rank))).toBeInTheDocument()

    // Test pour une fille
    vi.mocked(useSettingsStore).mockReturnValue({ ...defaultSettings, gender: 'girl' })
    rerender(
      <BadgesPage onBack={mockOnBack} />
    )
    expect(screen.getByText(new RegExp(LABELS.badges.rank))).toBeInTheDocument()
  })
})
