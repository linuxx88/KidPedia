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

// Mock de virtual:pwa-register/react pour éviter les crashes lors des tests
vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: vi.fn(() => ({
    offlineReady: [false, vi.fn()],
    needRefresh: [false, vi.fn()],
    updateServiceWorker: vi.fn(),
  })),
}))

interface MockRequest {
  result?: unknown;
  onsuccess?: () => void;
  onerror?: () => void;
  onupgradeneeded?: () => void;
}

// Mock global de IndexedDB pour les tests unitaires et d'intégration
let mockDbStore: Record<string, string> = {};

const mockObjectStore = {
  get: (key: string) => {
    const request: MockRequest = {};
    Promise.resolve().then(() => {
      request.result = mockDbStore[key] || null;
      if (request.onsuccess) request.onsuccess();
    });
    return request as unknown as IDBRequest;
  },
  put: (value: string, key: string) => {
    const request: MockRequest = {};
    Promise.resolve().then(() => {
      mockDbStore[key] = value;
      if (request.onsuccess) request.onsuccess();
    });
    return request as unknown as IDBRequest;
  },
  delete: (key: string) => {
    const request: MockRequest = {};
    Promise.resolve().then(() => {
      delete mockDbStore[key];
      if (request.onsuccess) request.onsuccess();
    });
    return request as unknown as IDBRequest;
  }
};

const mockTransaction = {
  objectStore: () => mockObjectStore
};

const mockDatabase = {
  objectStoreNames: {
    contains: () => true
  },
  transaction: () => mockTransaction
};

const mockIndexedDB = {
  open: () => {
    const request: MockRequest = {};
    Promise.resolve().then(() => {
      request.result = mockDatabase;
      if (request.onupgradeneeded) request.onupgradeneeded();
      if (request.onsuccess) request.onsuccess();
    });
    return request as unknown as IDBOpenDBRequest;
  }
};

vi.stubGlobal('indexedDB', mockIndexedDB);

// Synchroniser localStorage.clear() avec le vidage du store IndexedDB simulé
const originalClear = localStorage.clear;
localStorage.clear = function() {
  mockDbStore = {};
  if (originalClear) {
    originalClear.call(localStorage);
  }
};


