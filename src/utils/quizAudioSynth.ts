import { useSettingsStore } from '../store/useSettingsStore';

// Web Audio API context helper
const getAudioContext = (): AudioContext | null => {
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
};

// Check if audio should be muted
const isAudioMuted = (): boolean => {
  const isMuted = useSettingsStore.getState().isMuted;
  const isSfxMuted = useSettingsStore.getState().isSfxMuted;
  return isMuted || isSfxMuted;
};

// Synthesized ding sound using native Web Audio API
export const playSynthesizedDing = (stopStory: () => void) => {
  if (isAudioMuted()) return;

  stopStory();

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    // Crystal clear "ding" bell sound
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02); // Rapid attack
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); // Smooth decay

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);

    // Clean up AudioContext to prevent memory/context leaks
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch (e: unknown) {
    console.warn('Web Audio API synthesizer failed to play ding sound', e);
  }
};

// Synthesized perfect fanfare sound using native Web Audio API
export const playSynthesizedPerfectFanfare = (stopStory: () => void) => {
  if (isAudioMuted()) return;

  stopStory();

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Ascending major chord notes: C6, E6, G6, C7
    const notes = [1046.50, 1318.51, 1567.98, 2093.00];
    notes.forEach((freq, idx) => {
      const timeOffset = idx * 0.08; // Fast sparkling arpeggio
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

      gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + timeOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.4);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + 0.4);
    });

    // Clean up AudioContext to prevent memory/context leaks
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1200);
  } catch (e: unknown) {
    console.warn('Web Audio API perfect arpeggio failed to play', e);
  }
};

// Synthesized puzzle piece discovery chime using native Web Audio API
export const playSynthesizedPuzzleChime = () => {
  if (isAudioMuted()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // A magical rising sparkling sound: E5 -> G5 -> C6 -> E6
    const freqs = [329.63, 392.00, 523.25, 659.25];
    freqs.forEach((freq, idx) => {
      const timeOffset = idx * 0.12; // fast arpeggio
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle'; // warmer, puzzle-like sound
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

      gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + timeOffset + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.5);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + 0.5);
    });

    // Zero sound leaks: close context when arpeggio ends
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch (e: unknown) {
    console.warn('Web Audio API puzzle chime failed to play', e);
  }
};
