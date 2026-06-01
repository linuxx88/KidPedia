import { useState, useCallback } from 'react';
import { MAP_SVG_CONFIG } from '../constants/geometry';

export interface MapZoomHook {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  isMin: boolean;
  isMax: boolean;
  setZoomLevel: (level: number) => void;
}

/**
 * useMapZoom - Hook isolé pour la gestion du zoom interactif.
 * Centralise l'état et les calculs de transformation pour les cartes.
 */
export const useMapZoom = (): MapZoomHook => {
  const [zoom, setZoom] = useState<number>(1);

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 1, MAP_SVG_CONFIG.MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 1, 1));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const setZoomLevel = useCallback((level: number) => {
    setZoom(Math.max(1, Math.min(level, MAP_SVG_CONFIG.MAX_ZOOM)));
  }, []);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    isMin: zoom === 1,
    isMax: zoom === MAP_SVG_CONFIG.MAX_ZOOM,
    setZoomLevel,
  };
};

