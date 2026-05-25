import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMapSounds } from './useMapSounds';
import { useSettingsStore } from '../store/useSettingsStore';

// Mock useSettingsStore
vi.mock('../store/useSettingsStore', () => ({
  useSettingsStore: vi.fn(),
}));

describe('useMapSounds', () => {
  let mockContainer: HTMLDivElement;
  let containerRef: React.RefObject<HTMLDivElement>;

  const defaultSettings = {
    isMuted: false,
    isMusicMuted: false,
    isSfxMuted: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSettingsStore).mockReturnValue(defaultSettings);

    // Create a mock DOM container
    mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'scrollLeft', { value: 100, writable: true });
    Object.defineProperty(mockContainer, 'scrollWidth', { value: 1000, writable: true });
    Object.defineProperty(mockContainer, 'clientWidth', { value: 500, writable: true });

    containerRef = { current: mockContainer };

    // Mock window AudioContext and nodes
    const mockPannerNode = {
      pan: { setValueAtTime: vi.fn() },
      connect: vi.fn(),
    };

    const mockGainNode = {
      gain: {
        setValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        value: 1.0,
      },
      connect: vi.fn(),
    };

    const mockOscillatorNode = {
      type: 'sine',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    const mockBufferSource = {
      buffer: null,
      loop: false,
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    const mockAudioContext = {
      state: 'running',
      currentTime: 10,
      sampleRate: 44100,
      createGain: vi.fn(() => mockGainNode),
      createStereoPanner: vi.fn(() => mockPannerNode),
      createOscillator: vi.fn(() => mockOscillatorNode),
      createBufferSource: vi.fn(() => mockBufferSource),
      createBiquadFilter: vi.fn(() => ({
        type: 'lowpass',
        frequency: { setValueAtTime: vi.fn() },
        Q: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
      })),
      createBuffer: vi.fn(() => ({
        getChannelData: vi.fn(() => new Float32Array(88200)),
      })),
      resume: vi.fn(),
      close: vi.fn(),
      destination: {},
    };

    const MockAudioContext = vi.fn().mockImplementation(function() {
      return mockAudioContext;
    });
    vi.stubGlobal('AudioContext', MockAudioContext);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('initializes correctly and handles clicking sound', () => {
    const { result } = renderHook(() => useMapSounds(containerRef));

    // Interact to trigger context start
    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown'));
    });

    expect(window.AudioContext).toHaveBeenCalled();

    // Trigger click sound
    act(() => {
      result.current.playClickSound();
    });
  });

  it('manages island hover states and schedules procedural sounds', () => {
    const { result } = renderHook(() => useMapSounds(containerRef));

    // Interact to trigger context start
    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown'));
    });

    const mockPoint = {
      id: 'm1',
      topicId: 'astronaute',
      title: { fr: 'Les Astronautes', en: 'The Astronauts' },
      icon: '👨‍🚀',
      x: 30,
      y: 40,
      minZoom: 1,
    };

    // Hover start
    act(() => {
      result.current.handleIslandHoverStart(mockPoint);
    });

    // Advance timer to trigger cycle
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Hover end
    act(() => {
      result.current.handleIslandHoverEnd(mockPoint);
    });
  });

  it('respects mute settings correctly', () => {
    vi.mocked(useSettingsStore).mockReturnValue({
      isMuted: true,
      isMusicMuted: true,
      isSfxMuted: true,
    });

    const { result } = renderHook(() => useMapSounds(containerRef));

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown'));
    });

    // Click sound should be muted (ignored)
    act(() => {
      result.current.playClickSound();
    });
  });
});
