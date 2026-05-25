import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

interface UseAmbientAudioProps {
  audioSrc: string;
  volume?: number;
  loop?: boolean;
}

/**
 * Hook pour gérer un son d'ambiance de manière performante et sécurisée.
 * Réalise un fondu enchaîné linéaire (Fade In / Fade Out) sur 800ms pour éviter toute coupure sèche.
 */
export const useAmbientAudio = ({ audioSrc, volume = 0.2, loop = true }: UseAmbientAudioProps) => {
  const isMuted = useSettingsStore(state => state.isMuted);
  const isMusicMuted = useSettingsStore(state => state.isMusicMuted);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Combine both mute states
  const shouldMute = isMuted || isMusicMuted;

  useEffect(() => {
    if (!audioSrc) return;

    // Initialisation de l'objet Audio si nécessaire
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    }
    const audio = audioRef.current;
    
    // Si la source a changé, mettre à jour immédiatement
    if (audio.src !== audioSrc && !audioSrc.startsWith(window.location.origin)) {
      audio.src = audioSrc;
    }
    audio.loop = loop;

    const fadeDuration = 800; // 800ms fade transition
    const intervalTime = 30; // 30ms step size
    const steps = fadeDuration / intervalTime;
    const targetVolume = volume;

    // Clear any active fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (!shouldMute) {
      // Fade In
      if (audio.paused) {
        audio.volume = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn(`[Ambient Audio] Autoplay blocked or interrupted: ${error.message}`);
          });
        }
      }

      const startVol = audio.volume;
      const volStep = (targetVolume - startVol) / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const nextVol = Math.min(targetVolume, Math.max(0, startVol + volStep * currentStep));
        audio.volume = nextVol;

        if (currentStep >= steps || Math.abs(audio.volume - targetVolume) < 0.01) {
          audio.volume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
      }, intervalTime);

    } else {
      // Fade Out
      if (!audio.paused) {
        const startVol = audio.volume;
        const volStep = startVol / steps;
        let currentStep = 0;

        fadeIntervalRef.current = setInterval(() => {
          currentStep++;
          const nextVol = Math.max(0, startVol - volStep * currentStep);
          audio.volume = nextVol;

          if (currentStep >= steps || audio.volume <= 0.01) {
            audio.volume = 0;
            audio.pause();
            clearInterval(fadeIntervalRef.current);
          }
        }, intervalTime);
      } else {
        audio.volume = 0;
      }
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [audioSrc, volume, loop, shouldMute]);

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.pause();
        audio.src = ''; // Release resource
        audioRef.current = null;
        console.log("[Ambient Audio] Ambient audio stopped and resources released.");
      }
    };
  }, []);
};
