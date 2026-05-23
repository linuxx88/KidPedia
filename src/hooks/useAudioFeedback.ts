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
  
  const playSound = useCallback((type: SoundType) => {
    // 0. Check Mute
    if (isMuted) {
      console.log(`%c 🔇 [AUDIO_MUTED]: ${type} ignoré.`, 'color: #999;');
      return;
    }

    // 1. Log de Debug (Essentiel pour ton X220)
    console.log(`%c 🔊 [AUDIO_PLAY]: ${type}`, 'background: #222; color: #bada55; padding: 2px 5px; border-radius: 4px;');

    // 2. Mapping des fichiers réels
    const soundFiles: Record<string, string> = {
      // Les fichiers génériques
      // click: '/src/assets/audio/click.m4a',
    };

    // Si le type est une URL/chemin (commence par / ou http), on l'utilise directement
    const soundPath = soundFiles[type] || (typeof type === 'string' && (type.startsWith('/') || type.startsWith('http') || type.includes('.m4a')) ? type : null);

    // 3. Système de "Guard" (Garde-fou)
    if (!soundPath) {
      console.log(`%c 🔇 [AUDIO_SKIP]: Pas d'asset pour "${type}". Feedback visuel uniquement.`, 'color: #999;');
      return;
    }

    // 4. Logique de lecture sécurisée avec recyclage d'instance
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
  }, [isMuted]);

  return { playSound };
};

