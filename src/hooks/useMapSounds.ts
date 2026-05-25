import { useEffect, useRef, useCallback } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { type MapMarker } from '../data/mapData';

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
  const activeSourcesRef = useRef<AudioScheduledSourceNode[]>([]);

  // Refs for tracking position without re-rendering
  const activeIslandRef = useRef<MapMarker | null>(null);

  // Helper to create white noise
  const createNoiseBuffer = (ctx: AudioContext): AudioBuffer => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

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
      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(shouldMuteAmbient ? 0 : 0.35, ctx.currentTime);
      ambientGainRef.current = ambientGain;

      const ambientPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      ambientPannerRef.current = ambientPanner;

      // Wave noise setup
      const waveSource = ctx.createBufferSource();
      waveSource.buffer = createNoiseBuffer(ctx);
      waveSource.loop = true;
      waveSourceRef.current = waveSource;

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = 'lowpass';
      waveFilter.frequency.setValueAtTime(250, ctx.currentTime);
      waveFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      const waveLfo = ctx.createOscillator();
      waveLfo.type = 'sine';
      waveLfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Slow swell (12s)
      waveLfoRef.current = waveLfo;

      const waveLfoGain = ctx.createGain();
      waveLfoGain.gain.setValueAtTime(100, ctx.currentTime);

      waveLfo.connect(waveLfoGain);
      waveLfoGain.connect(waveFilter.frequency);

      const waveVolumeGain = ctx.createGain();
      waveVolumeGain.gain.setValueAtTime(0.012, ctx.currentTime);

      const waveLfoVolGain = ctx.createGain();
      waveLfoVolGain.gain.setValueAtTime(0.008, ctx.currentTime);
      waveLfo.connect(waveLfoVolGain);
      waveLfoVolGain.connect(waveVolumeGain.gain);

      waveSource.connect(waveFilter);
      waveFilter.connect(waveVolumeGain);

      // Wind noise setup
      const windSource = ctx.createBufferSource();
      windSource.buffer = createNoiseBuffer(ctx);
      windSource.loop = true;
      windSourceRef.current = windSource;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(550, ctx.currentTime);
      windFilter.Q.setValueAtTime(2.5, ctx.currentTime);

      const windLfo = ctx.createOscillator();
      windLfo.type = 'sine';
      windLfo.frequency.setValueAtTime(0.05, ctx.currentTime); // Slow wind whistle (20s)
      windLfoRef.current = windLfo;

      const windLfoGain = ctx.createGain();
      windLfoGain.gain.setValueAtTime(150, ctx.currentTime);

      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);

      const windVolumeGain = ctx.createGain();
      windVolumeGain.gain.setValueAtTime(0.004, ctx.currentTime);

      windSource.connect(windFilter);
      windFilter.connect(windVolumeGain);

      // Connect Ambient
      if (ambientPanner) {
        waveVolumeGain.connect(ambientPanner);
        windVolumeGain.connect(ambientPanner);
        ambientPanner.connect(ambientGain);
      } else {
        waveVolumeGain.connect(ambientGain);
        windVolumeGain.connect(ambientGain);
      }
      ambientGain.connect(ctx.destination);

      waveSource.start();
      windSource.start();
      waveLfo.start();
      windLfo.start();

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
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
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
  const triggerIslandSoundCycle = useCallback((type: 'space' | 'volcano' | 'seagull') => {
    const ctx = audioCtxRef.current;
    const islandGain = islandGainRef.current;
    if (!ctx || !islandGain || shouldMuteSfx) return;

    if (type === 'space') {
      // Cosmic twinkle chimes
      const now = ctx.currentTime;
      const notes = [1046.50, 1318.51, 1567.98, 1975.53, 2093.00, 2637.02]; // Pentatonic space scale
      const freq = notes[Math.floor(Math.random() * notes.length)];
      
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      osc.connect(noteGain);
      noteGain.connect(islandGain);
      
      osc.start(now);
      osc.stop(now + 1.2);

    } else if (type === 'seagull') {
      // Short high pitch sweeps
      const now = ctx.currentTime;
      const count = 1 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < count; i++) {
        const delay = i * 0.3 + Math.random() * 0.05;
        const tStart = now + delay;
        
        const osc = ctx.createOscillator();
        const birdGain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, tStart);
        osc.frequency.exponentialRampToValueAtTime(1150, tStart + 0.05);
        osc.frequency.exponentialRampToValueAtTime(600, tStart + 0.2);
        
        birdGain.gain.setValueAtTime(0, tStart);
        birdGain.gain.linearRampToValueAtTime(0.06, tStart + 0.03);
        birdGain.gain.exponentialRampToValueAtTime(0.001, tStart + 0.2);
        
        osc.connect(birdGain);
        birdGain.connect(islandGain);
        
        osc.start(tStart);
        osc.stop(tStart + 0.2);
      }
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

    if (activeIslandRef.current && !point) {
      // Fade Out over 400ms
      islandGain.gain.cancelScheduledValues(ctx.currentTime);
      islandGain.gain.setValueAtTime(islandGain.gain.value, ctx.currentTime);
      islandGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      
      // Stop continuous rumbles shortly after fade
      setTimeout(() => {
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
        // Continuous rumbling loop
        const rumbleSource = ctx.createBufferSource();
        rumbleSource.buffer = createNoiseBuffer(ctx);
        rumbleSource.loop = true;
        
        const rumbleFilter = ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(50, ctx.currentTime);
        
        const lowOsc = ctx.createOscillator();
        lowOsc.type = 'sine';
        lowOsc.frequency.setValueAtTime(40, ctx.currentTime);
        
        const lowOscGain = ctx.createGain();
        lowOscGain.gain.setValueAtTime(0.06, ctx.currentTime);
        
        const crackleLfo = ctx.createOscillator();
        crackleLfo.frequency.setValueAtTime(10, ctx.currentTime); // 10Hz wobble
        
        const crackleLfoGain = ctx.createGain();
        crackleLfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
        
        crackleLfo.connect(crackleLfoGain);
        
        const rumbleVolumeNode = ctx.createGain();
        rumbleVolumeNode.gain.setValueAtTime(0.25, ctx.currentTime);
        crackleLfoGain.connect(rumbleVolumeNode.gain);
        
        rumbleSource.connect(rumbleFilter);
        rumbleFilter.connect(rumbleVolumeNode);
        
        lowOsc.connect(lowOscGain);
        
        rumbleVolumeNode.connect(islandGain);
        lowOscGain.connect(islandGain);
        
        rumbleSource.start();
        lowOsc.start();
        crackleLfo.start();
        
        activeSourcesRef.current.push(rumbleSource, lowOsc, crackleLfo);
      } else {
        // Trigger immediately once
        triggerIslandSoundCycle(type);
        
        // Interval scheduler for repeating chimes or bird calls
        const intervalTime = type === 'space' ? 1000 : 2600;
        islandSchedulerRef.current = setInterval(() => {
          triggerIslandSoundCycle(type);
        }, intervalTime);
      }
    }
  }, [shouldMuteSfx, triggerIslandSoundCycle, updateSpatialPanning]);

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
