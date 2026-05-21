import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock de IntersectionObserver pour Framer Motion
class IntersectionObserverMock {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  observe = vi.fn()
  unobserve = vi.fn()
  unobserveAll = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Mock de ResizeObserver
class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

// Mock de matchMedia si nécessaire
vi.stubGlobal(
  'matchMedia',
  vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
)

// Mock de canvas-confetti pour éviter les crashes asynchrones en environnement JSDOM
vi.mock('canvas-confetti', () => ({
  default: Object.assign(vi.fn(), {
    reset: vi.fn(),
  }),
}))

