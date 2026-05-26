import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTopicFetcher } from './useTopicFetcher';
import { type TopicContent } from '../data/topics/types';

const mockTopicContent: TopicContent = {
  id: 'systeme-solaire',
  title: { fr: 'Système Solaire', en: 'Solar System' },
  category: { fr: 'Espace 🚀', en: 'Space 🚀' },
  categoryKey: 'espace',
  icon: '☀️',
  shortDesc: {
    fr: "Notre Soleil et sa famille de planètes.",
    en: "Our Sun and its family of planets."
  },
  fullContent: {
    fr: "Il y a 4,6 milliards d'années, un grand nuage de poussière s'est effondré pour former notre Soleil au centre, et huit planètes.",
    en: "4.6 billion years ago, a large cloud of dust collapsed to form our Sun at the center, and eight planets."
  },
  funFact: {
    fr: "Toutes les planètes tournent dans le même sens.",
    en: "All planets orbit in the same direction."
  }
};

describe('useTopicFetcher', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('devrait retourner des états initiaux corrects si aucun topicId est fourni', () => {
    const { result } = renderHook(() => useTopicFetcher(undefined));
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('devrait fetch avec succès et retourner les données de la fiche', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTopicContent),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useTopicFetcher('systeme-solaire'));

    expect(fetchMock).toHaveBeenCalledWith('/content/topics/systeme-solaire.json');

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockTopicContent);
    expect(result.current.error).toBeNull();
  });

  it('devrait gérer les erreurs de requête réseau proprement', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useTopicFetcher('topic-inexistant'));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain('Failed to fetch topic content');
  });

  it('devrait gérer les rejets réseau proprement', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useTopicFetcher('systeme-solaire'));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network error');
  });
});
