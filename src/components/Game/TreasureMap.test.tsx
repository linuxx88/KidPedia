import { render, screen, fireEvent, act } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TreasureMap } from './TreasureMap'
import styles from './TreasureMap.module.css'
import { fr } from '../../locales/fr'
import { en } from '../../locales/en'
import { useSettingsStore } from '../../store/useSettingsStore'
import { usePlayerStore, type PlayerStateData } from '../../store/usePlayerStore'
import { type Labels } from '../../locales/types'

// On mock scrollTo car JSDOM ne le supporte pas
window.HTMLElement.prototype.scrollTo = vi.fn()

// Mock des hooks de store
vi.mock('../../store/useSettingsStore', () => ({
  useSettingsStore: vi.fn(),
}))

vi.mock('../../store/usePlayerStore', () => ({
  usePlayerStore: vi.fn(),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('TreasureMap', () => {
  const onBack = vi.fn()
  
  const mockMarkers = [
    {
      id: 'm1',
      topicId: 'grand-canyon',
      title: { fr: 'Le Grand Canyon', en: 'The Grand Canyon' },
      icon: '🏜️',
      x: 20,
      y: 30,
      minZoom: 1,
    },
    {
      id: 'm2',
      topicId: 'panda',
      title: { fr: 'Le Panda', en: 'The Panda' },
      icon: '🐼',
      x: 80,
      y: 40,
      minZoom: 2,
    }
  ]

  const defaultSettings = {
    language: 'fr' as const,
    labels: fr as unknown as Labels,
    isDarkMode: false,
    gender: 'boy' as const,
    toggleTheme: vi.fn(),
    toggleGender: vi.fn(),
    setLanguage: vi.fn(),
    syncWithProfile: vi.fn(),
    reset: vi.fn()
  }

  const defaultPlayer: PlayerStateData = {
    badges: [],
    xp: 0,
    playerName: 'Explorateur',
    avatar: '🦁'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSettingsStore).mockReturnValue(defaultSettings)
    vi.mocked(usePlayerStore).mockReturnValue(defaultPlayer)
  })

  it('affiche la carte et les points initiaux (minZoom: 1)', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    expect(screen.getByText('Le Grand Canyon')).toBeDefined()
    expect(screen.queryByText('Le Panda')).toBeNull()
  })

  it('augmente le zoom quand on clique sur le bouton +', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    // On cherche par aria-label pour éviter l'ambiguïté du texte du bouton
    const zoomInBtn = screen.getByLabelText('Zoomer')
    fireEvent.click(zoomInBtn)

    expect(screen.getByText('Le Panda')).toBeDefined()
    expect(screen.getByText('x2')).toBeDefined()
  })

  it('affiche les médailles sur les points déjà découverts', () => {
    vi.mocked(usePlayerStore).mockReturnValue({
      ...defaultPlayer,
      badges: [{ id: 'grand-canyon', medal: 'gold' as const }],
    })

    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    const point = screen.getByTestId('map-point-grand-canyon')
    expect(point.className).toContain(styles.discovered)
    expect(screen.getByText('🥇')).toBeDefined()
  })

  it('change de langue correctement', () => {
    vi.mocked(useSettingsStore).mockReturnValue({
      ...defaultSettings,
      language: 'en' as const,
      labels: en as unknown as Labels,
    })

    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    expect(screen.getByText('The Grand Canyon')).toBeDefined()
    expect(screen.getByLabelText('Zoom in')).toBeDefined()
  })

  it('ouvre la popup au clic sur un point et permet de naviguer', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    const marker = screen.getByTestId('map-point-grand-canyon')
    fireEvent.click(marker)

    // L'AppOverlay n'utilise pas role="dialog" par défaut, on cherche par le titre h2 de la modale
    const modalTitle = screen.getByText('Le Grand Canyon', { selector: 'h2' })
    expect(modalTitle).toBeDefined()
    
    const exploreBtn = screen.getByText(fr.discovery.explore('Le Grand Canyon'))
    fireEvent.click(exploreBtn)

    expect(mockNavigate).toHaveBeenCalledWith('/topic/grand-canyon')
  })

  it('ferme la popup avec la croix', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    fireEvent.click(screen.getByTestId('map-point-grand-canyon'))
    const modalTitle = screen.getByText('Le Grand Canyon', { selector: 'h2' })
    expect(modalTitle).toBeDefined()

    const closeBtn = screen.getByLabelText('Fermer')
    fireEvent.click(closeBtn)
    
    expect(screen.queryByText('Le Grand Canyon', { selector: 'h2' })).toBeNull()
  })

  it('réinitialise le zoom avec le bouton maison', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    fireEvent.click(screen.getByLabelText('Zoomer')) // x2
    expect(screen.getByText('x2')).toBeDefined()

    fireEvent.click(screen.getByLabelText('Vue globale'))
    expect(screen.getByText('x1')).toBeDefined()
    expect(screen.queryByText('Le Panda')).toBeNull()
  })

  it('déclenche le zoom par double-clic avec effet ripple', () => {
    vi.useFakeTimers()
    const { container } = render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapImg = screen.getByTestId('treasure-map-image')

    fireEvent.doubleClick(mapImg)

    expect(screen.getByText('x2')).toBeDefined()

    const ripple = container.querySelector('.' + styles.clickRipple)
    expect(ripple).toBeDefined()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(container.querySelector('.' + styles.clickRipple)).toBeNull()
    vi.useRealTimers()
  })

  it('déclenche le zoom par double-tap tactile avec effet ripple', () => {
    let mockTime = 1000
    vi.spyOn(Date, 'now').mockImplementation(() => mockTime)
    vi.useFakeTimers()
    const { container } = render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapWrapper = screen.getByLabelText('Contenu de la carte')

    // Mock getBoundingClientRect sur le mapContainerRelative (qui est le premier enfant de mapWrapper)
    const mapContainer = mapWrapper.firstElementChild as HTMLElement
    vi.spyOn(mapContainer, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 500,
      left: 0,
      top: 0,
      right: 1000,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => {}
    })

    // Premier tap
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 100, pageY: 200, clientX: 100, clientY: 200 }]
    })
    fireEvent.touchEnd(mapWrapper)

    // Avancer de 100ms
    mockTime += 100

    // Deuxième tap
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 102, pageY: 202, clientX: 102, clientY: 202 }]
    })
    fireEvent.touchEnd(mapWrapper)

    // Vérifier que le zoom a augmenté à x2
    expect(screen.getByText('x2')).toBeDefined()

    // Vérifier l'effet ripple
    const ripple = container.querySelector('.' + styles.clickRipple)
    expect(ripple).toBeDefined()

    // Faire passer le temps du ripple (500ms)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(container.querySelector('.' + styles.clickRipple)).toBeNull()
    vi.useRealTimers()
  })

  it('ne zoome pas si le second tap est trop tardif (> 300ms)', () => {
    let mockTime = 1000
    vi.spyOn(Date, 'now').mockImplementation(() => mockTime)
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapWrapper = screen.getByLabelText('Contenu de la carte')

    // Premier tap
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 100, pageY: 200, clientX: 100, clientY: 200 }]
    })
    fireEvent.touchEnd(mapWrapper)

    // Avancer de 400ms (> 300ms)
    mockTime += 400

    // Deuxième tap
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 100, pageY: 200, clientX: 100, clientY: 200 }]
    })
    fireEvent.touchEnd(mapWrapper)

    expect(screen.queryByText('x2')).toBeNull()
  })

  it('ne zoome pas si le second tap est trop éloigné (> 20px)', () => {
    let mockTime = 1000
    vi.spyOn(Date, 'now').mockImplementation(() => mockTime)
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapWrapper = screen.getByLabelText('Contenu de la carte')

    // Premier tap
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 100, pageY: 200, clientX: 100, clientY: 200 }]
    })
    fireEvent.touchEnd(mapWrapper)

    // Avancer de 100ms (< 300ms)
    mockTime += 100

    // Deuxième tap à plus de 20px de distance
    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 150, pageY: 250, clientX: 150, clientY: 250 }]
    })
    fireEvent.touchEnd(mapWrapper)

    expect(screen.queryByText('x2')).toBeNull()
  })

  it('supporte le drag-to-pan par glissement de la souris', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapWrapper = screen.getByLabelText('Contenu de la carte')

    const scrollObj = { scrollLeft: 0, scrollTop: 0 }
    Object.defineProperty(mapWrapper, 'scrollLeft', {
      get: () => scrollObj.scrollLeft,
      set: (val) => { scrollObj.scrollLeft = val },
      configurable: true,
    })
    Object.defineProperty(mapWrapper, 'scrollTop', {
      get: () => scrollObj.scrollTop,
      set: (val) => { scrollObj.scrollTop = val },
      configurable: true,
    })

    fireEvent.mouseDown(mapWrapper, { clientX: 100, clientY: 100, pageX: 100, pageY: 100 })
    fireEvent.mouseMove(mapWrapper, { clientX: 50, clientY: 60, pageX: 50, pageY: 60 })

    expect(mapWrapper.scrollLeft).toBe(50)
    expect(mapWrapper.scrollTop).toBe(40)

    fireEvent.mouseUp(mapWrapper)
  })

  it('supporte le drag-to-pan tactile sur tablettes', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    const mapWrapper = screen.getByLabelText('Contenu de la carte')

    const scrollObj = { scrollLeft: 0, scrollTop: 0 }
    Object.defineProperty(mapWrapper, 'scrollLeft', {
      get: () => scrollObj.scrollLeft,
      set: (val) => { scrollObj.scrollLeft = val },
      configurable: true,
    })
    Object.defineProperty(mapWrapper, 'scrollTop', {
      get: () => scrollObj.scrollTop,
      set: (val) => { scrollObj.scrollTop = val },
      configurable: true,
    })

    fireEvent.touchStart(mapWrapper, {
      touches: [{ pageX: 200, pageY: 200 }]
    })
    fireEvent.touchMove(mapWrapper, {
      touches: [{ pageX: 120, pageY: 150 }]
    })

    expect(mapWrapper.scrollLeft).toBe(80)
    expect(mapWrapper.scrollTop).toBe(50)

    fireEvent.touchEnd(mapWrapper)
  })

  it('applique un facteur d\'échelle inverse sur les marqueurs selon le niveau de zoom', () => {
    render(<TreasureMap onBack={onBack} markers={mockMarkers} />)
    
    // Au zoom initial (x1)
    const marker1 = screen.getByTestId('map-point-grand-canyon')
    expect(marker1.style.transform).toContain('scale(1)')

    // Augmenter le zoom à x2
    fireEvent.click(screen.getByLabelText('Zoomer'))
    
    // Le zoom est x2, donc l'échelle du marqueur doit être 1/2 = 0.5
    expect(marker1.style.transform).toContain('scale(0.5)')
  })
})
