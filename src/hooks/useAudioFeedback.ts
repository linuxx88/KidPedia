import { useCallback } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

/**
 * Types de sons disponibles dans l'application
 */
export type SoundType = 'click' | 'success' | 'medal' | 'pop' | 'error' | string;

// Singleton global de l'élément audio pour éviter le gaspillage de ressources et les doublons
let globalAudioInstance: HTMLAudioElement | null = null;

// Initialisation sécurisée hors-SSR / environnement de test
const getGlobalAudio = (): HTMLAudioElement | null => {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return null;
  }
  if (!globalAudioInstance) {
    globalAudioInstance = new Audio();
  }
  return globalAudioInstance;
};

// Abonnement réactif global aux mutations du store pour couper le son en cours instantanément
if (typeof window !== 'undefined' && typeof useSettingsStore.subscribe === 'function') {
  useSettingsStore.subscribe((state) => {
    if (state?.isMuted && globalAudioInstance) {
      globalAudioInstance.pause();
      globalAudioInstance.currentTime = 0;
    }
  });
}

/**
 * useAudioFeedback - Hook centralisé pour gérer les effets sonores
 * Adapté pour le développement "muet" (X220) avec des logs de debug.
 */
export const useAudioFeedback = () => {
  const isMuted = useSettingsStore(state => state.isMuted);
  const isSfxMuted = useSettingsStore(state => state.isSfxMuted);
  
  const playSound = useCallback((type: SoundType) => {
    // 0. Check Mute
    if (isMuted || isSfxMuted) {
      console.log(`%c 🔇 [AUDIO_MUTED]: ${type} ignoré.`, 'color: #999;');
      return;
    }

    // 1. Synthesized sounds logic using native Web Audio API
    const synthesizedTypes = ['click', 'success', 'medal', 'pop', 'error'];
    if (typeof type === 'string' && synthesizedTypes.includes(type)) {
      console.log(`%c 🔊 [AUDIO_SYNTH]: ${type}`, 'background: #222; color: #38bdf8; padding: 2px 5px; border-radius: 4px;');
      try {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          
          if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
          } else if (type === 'pop') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
          } else if (type === 'error') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
          } else if (type === 'success') {
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
          } else if (type === 'medal') {
            const now = ctx.currentTime;
            const notes = [523.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00]; // C5, G5, C6, E6, G6, C7
            notes.forEach((freq, idx) => {
              const delay = idx * 0.06;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now + delay);
              gain.gain.setValueAtTime(0, now + delay);
              gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.02);
              gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);
              osc.start(now + delay);
              osc.stop(now + delay + 0.35);
            });
          }
        }
      } catch (e) {
        console.warn('[AUDIO_SYNTH_FAILED]: Web Audio synthesis failed.', e);
      }
      return;
    }

    // 2. Log de Debug (Essentiel pour ton X220)
    console.log(`%c 🔊 [AUDIO_PLAY]: ${type}`, 'background: #222; color: #bada55; padding: 2px 5px; border-radius: 4px;');

    // 3. Mapping des fichiers réels
    const soundFiles: Record<string, string> = {
      // Les fichiers génériques
      // click: '/src/assets/audio/click.m4a',
    };

    // Si le type est une URL/chemin (commence par / ou http), on l'utilise directement
    const soundPath = soundFiles[type] || (typeof type === 'string' && (type.startsWith('/') || type.startsWith('http') || type.includes('.m4a')) ? type : null);

    // 4. Système de "Guard" (Garde-fou)
    if (!soundPath) {
      console.log(`%c 🔇 [AUDIO_SKIP]: Pas d'asset pour "${type}". Feedback visuel uniquement.`, 'color: #999;');
      return;
    }

    // 5. Logique de lecture sécurisée avec recyclage d'instance
    try {
      const audio = getGlobalAudio();
      if (!audio) return;

      // Interrompt proprement tout son en cours
      audio.pause();
      audio.currentTime = 0;
      audio.src = soundPath;
      audio.volume = 0.5;
      
      // On ne lance le play() que si on n'est pas dans un environnement de test strict
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name === 'AbortError') {
            console.log(`[AUDIO_ABORTED]: La lecture de ${type} a été annulée par un autre son.`);
          } else {
            console.warn(`[AUDIO_BLOCKED]: La lecture de ${type} a été bloquée par le navigateur ou le fichier est manquant.`, error);
          }
        });
      }
    } catch (e) {
      console.error(`[AUDIO_ERROR]: Impossible de lire le son ${type}`, e);
    }
  }, [isMuted, isSfxMuted]);

  return { playSound };
};

