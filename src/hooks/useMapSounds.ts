import { useEffect, useRef, useCallback } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { type MapMarker } from '../data/mapData';
import {
  playClickSynth,
  setupAmbientSynth,
  setupVolcanoSynth,
  triggerIslandSynthCycle,
} from '../utils/mapAudioSynth';

// Helper to determine the sound type based on the topicId
const getIslandSoundType = (topicId: string): 'space' | 'volcano' | 'seagull' => {
  if (topicId === 'astronaute') {
    return 'space';
  }
  if (
    topicId === 'desert-sahara' ||
    topicId === 'grand-canyon' ||
    topicId === 'pyramides-egypte'
  ) {
    return 'volcano';
  }
  return 'seagull';
};

export const useMapSounds = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const isMuted = useSettingsStore(state => state.isMuted);
  const isMusicMuted = useSettingsStore(state => state.isMusicMuted);
  const isSfxMuted = useSettingsStore(state => state.isSfxMuted);

  const shouldMuteAmbient = isMuted || isMusicMuted;
  const shouldMuteSfx = isMuted || isSfxMuted;

  // Web Audio Context & Ambient nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientPannerRef = useRef<StereoPannerNode | null>(null);
  const waveSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const waveLfoRef = useRef<OscillatorNode | null>(null);
  const windLfoRef = useRef<OscillatorNode | null>(null);

  // Island node state
  const islandGainRef = useRef<GainNode | null>(null);
  const islandPannerRef = useRef<StereoPannerNode | null>(null);
  const islandSchedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeSourcesRef = useRef<AudioScheduledSourceNode[]>([]);

  // Refs for tracking position without re-rendering
  const activeIslandRef = useRef<MapMarker | null>(null);

  // Start the Audio Context
  const startAudio = useCallback(() => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Setup Ambient Loop (Waves & Wind)
      const ambient = setupAmbientSynth(ctx, shouldMuteAmbient);
      ambientGainRef.current = ambient.ambientGain;
      ambientPannerRef.current = ambient.ambientPanner;
      waveSourceRef.current = ambient.waveSource;
      windSourceRef.current = ambient.windSource;
      waveLfoRef.current = ambient.waveLfo;
      windLfoRef.current = ambient.windLfo;

      // 2. Setup Island Sound System
      const islandGain = ctx.createGain();
      islandGain.gain.setValueAtTime(0, ctx.currentTime);
      islandGainRef.current = islandGain;

      const islandPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      islandPannerRef.current = islandPanner;

      if (islandPanner) {
        islandGain.connect(islandPanner);
        islandPanner.connect(ctx.destination);
      } else {
        islandGain.connect(ctx.destination);
      }

    } catch (error) {
      console.warn('[Web Audio Map] Failed to initialize Audio Context', error);
    }
  }, [shouldMuteAmbient]);

  // Click Feedback Sound
  const playClickSound = useCallback(() => {
    if (shouldMuteSfx || !audioCtxRef.current) return;
    playClickSynth(audioCtxRef.current);
  }, [shouldMuteSfx]);

  // Compute Spatial Panning
  const updateSpatialPanning = useCallback(() => {
    const container = containerRef.current;
    const ctx = audioCtxRef.current;
    if (!container || !ctx) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollWidth === 0) return;

    // 1. Calculate General ambient pan (shifts slightly based on camera pan)
    if (ambientPannerRef.current) {
      const cameraRelativeX = (scrollLeft + clientWidth / 2) / scrollWidth;
      const cameraPan = (cameraRelativeX - 0.5) * 0.35; // keep it subtle
      ambientPannerRef.current.pan.setValueAtTime(cameraPan, ctx.currentTime);
    }

    // 2. Calculate Active Island spatial pan
    const activeIsland = activeIslandRef.current;
    if (activeIsland && islandPannerRef.current) {
      const markerAbsoluteX = (activeIsland.x / 100) * scrollWidth;
      const viewportCenterX = scrollLeft + clientWidth / 2;
      const diffX = markerAbsoluteX - viewportCenterX;
      
      // Map pixel difference to -1.0 -> 1.0 based on half screen width
      const maxPanDistance = clientWidth / 2 || 400;
      const calculatedPan = Math.max(-1, Math.min(1, diffX / maxPanDistance));
      islandPannerRef.current.pan.setValueAtTime(calculatedPan, ctx.currentTime);
    }
  }, [containerRef]);

  // Stop active sources (primarily volcano loops)
  const stopActiveSources = () => {
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch {
        // Ignored
      }
    });
    activeSourcesRef.current = [];
  };

  // Triggers island-specific procedural sounds
  const triggerIslandSound = useCallback((type: 'space' | 'volcano' | 'seagull') => {
    const ctx = audioCtxRef.current;
    const islandGain = islandGainRef.current;
    if (!ctx || !islandGain || shouldMuteSfx) return;

    if (type !== 'volcano') {
      triggerIslandSynthCycle(ctx, islandGain, type);
    }
  }, [shouldMuteSfx]);

  // Set active island and fade in/out
  const setActiveIsland = useCallback((point: MapMarker | null) => {
    const ctx = audioCtxRef.current;
    const islandGain = islandGainRef.current;
    if (!ctx || !islandGain) return;

    // 1. Clear current scheduler & active sources
    if (islandSchedulerRef.current) {
      clearInterval(islandSchedulerRef.current);
      islandSchedulerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (activeIslandRef.current && !point) {
      // Fade Out over 400ms
      islandGain.gain.cancelScheduledValues(ctx.currentTime);
      islandGain.gain.setValueAtTime(islandGain.gain.value, ctx.currentTime);
      islandGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      
      // Stop continuous rumbles shortly after fade
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        if (!activeIslandRef.current) {
          stopActiveSources();
        }
      }, 450);
    }

    activeIslandRef.current = point;

    if (point) {
      updateSpatialPanning();

      // Fade In over 400ms
      islandGain.gain.cancelScheduledValues(ctx.currentTime);
      islandGain.gain.setValueAtTime(islandGain.gain.value, ctx.currentTime);
      islandGain.gain.linearRampToValueAtTime(shouldMuteSfx ? 0 : 0.75, ctx.currentTime + 0.4);

      const type = getIslandSoundType(point.topicId);

      // Start sound generation
      stopActiveSources();
      
      if (type === 'volcano') {
        activeSourcesRef.current = setupVolcanoSynth(ctx, islandGain);
      } else {
        // Trigger immediately once
        triggerIslandSound(type);
        
        // Interval scheduler for repeating chimes or bird calls
        const intervalTime = type === 'space' ? 1000 : 2600;
        islandSchedulerRef.current = setInterval(() => {
          triggerIslandSound(type);
        }, intervalTime);
      }
    }
  }, [shouldMuteSfx, triggerIslandSound, updateSpatialPanning]);

  // Audio Context Resumer on user interaction
  useEffect(() => {
    const handleGesture = () => {
      startAudio();
    };

    window.addEventListener('mousedown', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });

    return () => {
      window.removeEventListener('mousedown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, [startAudio]);

  // Track map panning (scroll events)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateSpatialPanning();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, updateSpatialPanning]);

  // Sync mute states dynamically
  useEffect(() => {
    if (ambientGainRef.current) {
      ambientGainRef.current.gain.setValueAtTime(shouldMuteAmbient ? 0 : 0.35, audioCtxRef.current?.currentTime || 0);
    }
    if (islandGainRef.current) {
      islandGainRef.current.gain.setValueAtTime(shouldMuteSfx ? 0 : 0.75, audioCtxRef.current?.currentTime || 0);
    }
  }, [shouldMuteAmbient, shouldMuteSfx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (islandSchedulerRef.current) {
        clearInterval(islandSchedulerRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopActiveSources();

      if (waveSourceRef.current) {
        try { waveSourceRef.current.stop(); } catch { /* ignored */ }
      }
      if (windSourceRef.current) {
        try { windSourceRef.current.stop(); } catch { /* ignored */ }
      }
      if (waveLfoRef.current) {
        try { waveLfoRef.current.stop(); } catch { /* ignored */ }
      }
      if (windLfoRef.current) {
        try { windLfoRef.current.stop(); } catch { /* ignored */ }
      }

      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  const handleIslandHoverStart = useCallback((point: MapMarker) => {
    setActiveIsland(point);
  }, [setActiveIsland]);

  const handleIslandHoverEnd = useCallback((point: MapMarker) => {
    if (activeIslandRef.current?.id === point.id) {
      setActiveIsland(null);
    }
  }, [setActiveIsland]);

  return {
    playClickSound,
    handleIslandHoverStart,
    handleIslandHoverEnd
  };
};
