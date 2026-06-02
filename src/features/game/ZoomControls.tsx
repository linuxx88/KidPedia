import React from 'react';
import styles from './ZoomControls.module.css';

interface ZoomControlsProps {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  captureViewportCenterAsZoomTarget: () => void;
  playClickSound: () => void;
  maxZoom: number;
  labels: {
    zoomIn: string;
    zoomOut: string;
    globalView: string;
  };
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  zoomIn,
  zoomOut,
  resetZoom,
  captureViewportCenterAsZoomTarget,
  playClickSound,
  maxZoom,
  labels,
}) => {
  return (
    <div className={styles.zoomSidebar} role="group" aria-label="Contrôles du zoom">
      <button 
        className={styles.zoomBtn} 
        onClick={() => {
          playClickSound();
          captureViewportCenterAsZoomTarget();
          zoomOut();
        }} 
        disabled={zoom === 1} 
        title={`${labels.zoomOut} (-)`} 
        aria-label={labels.zoomOut}
        data-testid="zoom-out-btn"
      >-</button>
      <span className={styles.zoomLevelBadge} data-testid="zoom-level" aria-live="polite">x{zoom}</span>
      <button 
        className={styles.zoomBtn} 
        onClick={() => {
          playClickSound();
          captureViewportCenterAsZoomTarget();
          zoomIn();
        }} 
        disabled={zoom === maxZoom} 
        title={`${labels.zoomIn} (+)`} 
        aria-label={labels.zoomIn}
        data-testid="zoom-in-btn"
      >+</button>
      <button 
        className={styles.zoomBtn} 
        onClick={() => {
          playClickSound();
          resetZoom();
        }} 
        title={labels.globalView} 
        aria-label={labels.globalView}
        data-testid="zoom-reset-btn"
      >🏠</button>
    </div>
  );
};
