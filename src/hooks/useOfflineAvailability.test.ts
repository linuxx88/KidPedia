import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useOfflineAvailability } from './useOfflineAvailability';

describe('useOfflineAvailability', () => {
  beforeEach(() => {
    // Reset global stubs and event listeners before each test
    vi.stubGlobal('caches', undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('devrait retourner false si aucun topicId n\'est fourni', async () => {
    let resultValue: { current: boolean } | undefined;
    await act(async () => {
      const { result } = renderHook(() => useOfflineAvailability(undefined));
      resultValue = result;
    });
    expect(resultValue?.current).toBe(false);
  });

  it('devrait gérer silencieusement l\'absence de caches API et retourner false', async () => {
    let resultValue: { current: boolean } | undefined;
    await act(async () => {
      const { result } = renderHook(() => useOfflineAvailability('systeme-solaire'));
      resultValue = result;
    });
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(resultValue?.current).toBe(false);
  });

  it('devrait retourner true si le fichier est présent dans le cache', async () => {
    const mockCaches = {
      match: vi.fn().mockResolvedValue({ ok: true } as Response)
    };
    vi.stubGlobal('caches', mockCaches);

    let resultValue: { current: boolean } | undefined;
    await act(async () => {
      const { result } = renderHook(() => useOfflineAvailability('systeme-solaire'));
      resultValue = result;
    });

    expect(mockCaches.match).toHaveBeenCalledWith('/content/topics/systeme-solaire.json');

    await vi.waitFor(() => {
      expect(resultValue?.current).toBe(true);
    });
  });

  it('devrait retourner false si le fichier n\'est pas présent dans le cache', async () => {
    const mockCaches = {
      match: vi.fn().mockResolvedValue(undefined)
    };
    vi.stubGlobal('caches', mockCaches);

    let resultValue: { current: boolean } | undefined;
    await act(async () => {
      const { result } = renderHook(() => useOfflineAvailability('systeme-solaire'));
      resultValue = result;
    });

    expect(mockCaches.match).toHaveBeenCalledWith('/content/topics/systeme-solaire.json');

    await vi.waitFor(() => {
      expect(resultValue?.current).toBe(false);
    });
  });

  it('devrait se mettre à jour lorsque l\'état du réseau change (événements online/offline)', async () => {
    const matchMock = vi.fn().mockResolvedValue(undefined);
    const mockCaches = {
      match: matchMock
    };
    vi.stubGlobal('caches', mockCaches);

    let resultValue: { current: boolean } | undefined;
    await act(async () => {
      const { result } = renderHook(() => useOfflineAvailability('systeme-solaire'));
      resultValue = result;
    });

    await vi.waitFor(() => {
      expect(resultValue?.current).toBe(false);
    });

    // Change cache match mock to return response (simulating cache update on reconnect)
    matchMock.mockResolvedValue({ ok: true } as Response);

    // Fire online event on window
    await act(async () => {
      window.dispatchEvent(new Event('online'));
    });

    await vi.waitFor(() => {
      expect(resultValue?.current).toBe(true);
    });

    // Change cache match mock to return undefined
    matchMock.mockResolvedValue(undefined);

    // Fire offline event on window
    await act(async () => {
      window.dispatchEvent(new Event('offline'));
    });

    await vi.waitFor(() => {
      expect(resultValue?.current).toBe(false);
    });
  });
});
