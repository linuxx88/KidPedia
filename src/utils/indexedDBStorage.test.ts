import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { indexedDBStorage } from './indexedDBStorage';

interface MockRequest {
  result?: unknown;
  onsuccess?: () => void;
  onerror?: () => void;
  onupgradeneeded?: () => void;
}

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

describe('indexedDBStorage', () => {
  beforeEach(() => {
    mockDbStore = {};
    vi.stubGlobal('indexedDB', mockIndexedDB);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('devrait stocker, récupérer et supprimer des valeurs correctement dans IndexedDB', async () => {
    // 1. Initial State (null)
    const initialVal = await indexedDBStorage.getItem('test-key');
    expect(initialVal).toBeNull();

    // 2. Set Item
    await indexedDBStorage.setItem('test-key', 'hello-world');
    expect(mockDbStore['test-key']).toBe('hello-world');

    // 3. Get Item
    const retrievedVal = await indexedDBStorage.getItem('test-key');
    expect(retrievedVal).toBe('hello-world');

    // 4. Remove Item
    await indexedDBStorage.removeItem('test-key');
    expect(mockDbStore['test-key']).toBeUndefined();

    // 5. Get Item after removal
    const valAfterRemove = await indexedDBStorage.getItem('test-key');
    expect(valAfterRemove).toBeNull();
  });
});
