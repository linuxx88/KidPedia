import React from 'react';
import { type MedalType } from '../../utils/quizMessages';
import { getMedalIcon } from '../../utils/quizMessages';
import { type Labels } from '../../locales/types';
import styles from './TreasureMap.module.css';

interface MapPointProps {
  x: number;
  y: number;
  icon: string;
  title: string;
  topicId: string;
  medal?: MedalType;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  labels: Labels;
  zoom: number;
}

/**
 * MapPoint - Marqueur individuel sur la carte.
 * Mémoïsé pour éviter les re-renders si les props ne changent pas.
 */
export const MapPoint = React.memo<MapPointProps>(({
  x,
  y,
  icon,
  title,
  topicId,
  medal,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  labels,
  zoom
}) => {
  const pointStyle: React.CSSProperties = { 
    left: `${x}%`, 
    top: `${y}%`,
    transform: `translate(-50%, -50%) scale(${1 / zoom})`
  };

  // Label d'accessibilité riche pour les lecteurs d'écran
  const a11yLabel = medal 
    ? `${title} - ${labels.discovery.discoveredPoints} (${medal})`
    : `${title} - ${labels.discovery.toDiscover}`;

  return (
    <button
      className={`${styles.mapMarkerPoint} ${medal ? styles.discovered : ''}`}
      style={pointStyle}
      onClick={(e) => {
        e.stopPropagation(); // Éviter de déclencher le drag ou le double-clic du parent
        onClick();
      }}
      onTouchStart={(e) => {
        e.stopPropagation(); // Éviter de déclencher le drag ou le double-tap du parent
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      title={title}
      aria-label={a11yLabel}
      data-testid={`map-point-${topicId}`}
    >
      <span className={styles.markerIcon} aria-hidden="true">{icon}</span>
      {medal && (
        <span className={styles.markerStar} aria-hidden="true">
          {getMedalIcon(medal)}
        </span>
      )}
      <span className="sr-only">{title}</span>
    </button>
  );
});

MapPoint.displayName = 'MapPoint';
