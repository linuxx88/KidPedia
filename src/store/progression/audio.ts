import { useSettingsStore } from '../useSettingsStore';

export const playBehavioralBadgeSuccessSound = () => {
  const { isMuted, isSfxMuted } = useSettingsStore.getState();
  if (isMuted || isSfxMuted) return;

  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 1000);
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const delay = idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.25);
        osc.start(now + delay);
        osc.stop(now + delay + 0.25);
      });
    }
  } catch (e) {
    console.warn('[AUDIO_SYNTH_FAILED]: Web Audio synthesis failed.', e);
  }
};
