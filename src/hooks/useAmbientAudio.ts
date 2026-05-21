import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

interface UseAmbientAudioProps {
  audioSrc: string;
  volume?: number;
  loop?: boolean;
}

/**
 * Hook pour gérer un son d'ambiance de manière performante et sécurisée.
 * Gère le cycle de vie complet de l'élément Audio.
 * 
 * @param audioSrc - Le chemin vers le fichier audio.
 * @param volume - Le volume de lecture (0 à 1).
 * @param loop - Si le son doit boucler.
 */
export const useAmbientAudio = ({ audioSrc, volume = 0.2, loop = true }: UseAmbientAudioProps) => {
  const isMuted = useSettingsStore(state => state.isMuted);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crée l'instance Audio uniquement côté client
    if (!audioSrc) return;

    // Initialisation de l'objet Audio si nécessaire
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    }
    const audio = audioRef.current;

    audio.src = audioSrc;
    audio.volume = isMuted ? 0 : volume;
    audio.loop = loop;
    
    if (!isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`[Ambient Audio] La lecture automatique a été bloquée : ${error.message}`);
        });
      }
    } else {
      audio.pause();
    }

    // Fonction de nettoyage exécutée lors du démontage du composant
    return () => {
      if (audio) {
        audio.pause();
        audio.src = ''; // Libère la ressource
        audioRef.current = null;
        console.log("[Ambient Audio] Son d'ambiance arrêté et nettoyé.");
      }
    };
  }, [audioSrc, volume, loop, isMuted]); // Le hook se ré-exécute si isMuted change
};
