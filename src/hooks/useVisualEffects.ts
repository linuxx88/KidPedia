import { useState, useCallback, useRef, useEffect } from 'react';

export interface VisualEffect {
  id: number;
  x: number;
  y: number;
}

/**
 * useVisualEffects - Hook pour gérer les effets visuels temporaires (ex: ondes de choc).
 * Assure un nettoyage propre des effets après leur durée d'animation.
 */
export const useVisualEffects = (duration: number) => {
  const [effects, setEffects] = useState<VisualEffect[]>([]);
  const timersRef = useRef<Map<number, number | ReturnType<typeof setTimeout>>>(new Map());

  // Nettoyage des timers lors du démontage pour éviter les fuites de mémoire
  useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach(timer => clearTimeout(timer));
      currentTimers.clear();
    };
  }, []);

  const addEffect = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random(); // ID unique
    
    setEffects(prev => [...prev, { id, x, y }]);

    const timer = setTimeout(() => {
      setEffects(prev => prev.filter(e => e.id !== id));
      timersRef.current.delete(id);
    }, duration);

    timersRef.current.set(id, timer);
  }, [duration]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    setEffects([]);
  }, []);

  return {
    effects,
    addEffect,
    clearAll
  };
};
