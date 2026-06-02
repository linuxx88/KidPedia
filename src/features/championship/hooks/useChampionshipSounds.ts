import { useCallback } from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';

export const useChampionshipSounds = () => {
  const { isMuted, isSfxMuted } = useSettingsStore();

  const playSound = useCallback((type: 'correct' | 'incorrect' | 'tick' | 'victory' | 'timeout') => {
    if (isMuted || isSfxMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'correct') {
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          
          gain.gain.setValueAtTime(0, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.3);
        });
      } 
      else if (type === 'incorrect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
      else if (type === 'tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
      else if (type === 'timeout') {
        const now = ctx.currentTime;
        [0, 0.1].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now + delay);
          
          gain.gain.setValueAtTime(0.1, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
      }
      else if (type === 'victory') {
        const now = ctx.currentTime;
        const chords = [
          [261.63, 329.63, 392.00], // C4, E4, G4
          [329.63, 392.00, 523.25], // E4, G4, C5
          [392.00, 523.25, 659.25], // G4, C5, E5
          [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
        ];
        
        chords.forEach((chord, step) => {
          chord.forEach((f) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + step * 0.15);
            
            gain.gain.setValueAtTime(0, now + step * 0.15);
            gain.gain.linearRampToValueAtTime(0.08, now + step * 0.15 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.15 + 0.5);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + step * 0.15);
            osc.stop(now + step * 0.15 + 0.65);
          });
        });
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }, [isMuted, isSfxMuted]);

  return { playSound };
};
