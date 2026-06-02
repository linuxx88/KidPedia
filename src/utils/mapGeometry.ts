import React from 'react';
import { type MapMarker } from '../data/mapData';

/**
 * Filtre les marqueurs de carte visibles en fonction du niveau de zoom actuel.
 */
export const filterMarkersByZoom = (markers: MapMarker[], zoom: number): MapMarker[] => {
  return markers.filter(point => point.minZoom <= zoom);
};

/**
 * Trie les marqueurs spatialement (de haut en bas, puis de gauche à droite)
 * pour offrir un ordre de navigation au clavier logique.
 */
export const sortMarkersSpatially = (markers: MapMarker[]): MapMarker[] => {
  return [...markers].sort((a, b) => (a.y - b.y) || (a.x - b.x));
};

/**
 * Calcule les styles CSS de transformation pour l'application du zoom sur le canevas.
 */
export const getCanvasTransformStyle = (zoom: number): React.CSSProperties => {
  return {
    transform: `scale(${zoom})`,
    transformOrigin: '0 0',
  };
};
export type { MapMarker };
