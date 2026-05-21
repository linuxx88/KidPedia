import { useState, useCallback } from 'react';
import { MAP_SVG_CONFIG } from '../constants/geometry';

export interface ZoomState {
  level: number;
  origin: string;
}

export interface MapZoomHook {
  zoom: number;
  origin: string;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  handleZoomAt: (e?: React.MouseEvent | React.TouchEvent) => void;
  isMin: boolean;
  isMax: boolean;
}

/**
 * useMapZoom - Hook isolé pour la gestion du zoom interactif.
 * Centralise l'état et les calculs de transformation pour les cartes.
 */
export const useMapZoom = (): MapZoomHook => {
  const [zoom, setZoom] = useState<ZoomState>({
    level: 1,
    origin: '0 0',
  });

  const zoomIn = useCallback(() => {
    setZoom(prev => ({
      ...prev,
      level: Math.min(prev.level + 1, MAP_SVG_CONFIG.MAX_ZOOM)
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => ({
      ...prev,
      level: Math.max(prev.level - 1, 1),
      origin: '0 0'
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom({
      level: 1,
      origin: '0 0'
    });
  }, []);

  /**
   * Calcule et définit l'origine du zoom basée sur un événement de clic.
   * Permet de zoomer vers le point cliqué par l'utilisateur.
   */
  const handleZoomAt = useCallback((_e?: React.MouseEvent | React.TouchEvent) => {
    setZoom(prev => ({
      ...prev,
      level: Math.min(prev.level + 1, MAP_SVG_CONFIG.MAX_ZOOM),
      origin: '0 0'
    }));
  }, []);

  return {
    zoom: zoom.level,
    origin: zoom.origin,
    zoomIn,
    zoomOut,
    resetZoom,
    handleZoomAt,
    isMin: zoom.level === 1,
    isMax: zoom.level === MAP_SVG_CONFIG.MAX_ZOOM,
  };
};
