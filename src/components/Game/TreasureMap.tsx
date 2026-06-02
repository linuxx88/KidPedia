import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { type TopicId } from '../../types/domain';
import { PageHeader } from '../Layout/PageHeader';
import { AppOverlay } from '../UI/AppOverlay';
import { useStoryteller } from '../../hooks/useStoryteller';
import { MAP_SVG_CONFIG } from '../../constants/geometry';
import { useMapZoom } from '../../hooks/useMapZoom';
import { useVisualEffects } from '../../hooks/useVisualEffects';
import { useMapSounds } from '../../hooks/useMapSounds';
import { type MapMarker } from '../../data/mapData';
import { OrientationGuard } from '../Layout/OrientationGuard';
import { MapPoint } from './MapPoint';
import { MapOverlayContent } from './Overlays/MapOverlayContent';
import { useMapGestures } from '../../hooks/useMapGestures';
import { filterMarkersByZoom, sortMarkersSpatially, getCanvasTransformStyle } from '../../utils/mapGeometry';
import styles from './TreasureMap.module.css';


interface TreasureMapProps {
  onBack: () => void;
  markers: MapMarker[];
}

/**
 * TreasureMap - Moteur de carte interactif générique avec support du Drag-to-Pan.
 */
export const TreasureMap: React.FC<TreasureMapProps> = ({ onBack, markers }) => {
  const { labels, language } = useSettingsStore();
  const { badges } = usePlayerStore();
  const navigate = useNavigate();
  const isUnlocked = useProgressionStore((state) => state.isUnlocked);
  const { speak, stopStory } = useStoryteller();
  
  const { zoom, zoomIn, zoomOut, resetZoom } = useMapZoom();
  const { effects: ripples, addEffect: addRipple } = useVisualEffects(MAP_SVG_CONFIG.RIPPLE_DURATION);
  
  const [selectedPoint, setSelectedPoint] = useState<MapMarker | null>(null);
  
  // Rétablir le focus sur le bouton de l'île précédemment sélectionnée lors de la fermeture de la modale
  const prevSelectedPointRef = useRef<MapMarker | null>(null);

  useEffect(() => {
    if (selectedPoint) {
      prevSelectedPointRef.current = selectedPoint;
    } else if (prevSelectedPointRef.current) {
      const prevPoint = prevSelectedPointRef.current;
      prevSelectedPointRef.current = null;
      
      setTimeout(() => {
        const button = document.querySelector(`[data-testid="map-point-${prevPoint.topicId}"]`) as HTMLButtonElement | null;
        if (button) {
          button.focus();
        }
      }, 0);
    }
  }, [selectedPoint]);

  // --- GESTION DU DRAG, DEFILEMENT, RACCOURCIS CLAVIER ET DOUBLE-TAP ---
  const {
    containerRef,
    isDragging,
    hasMoved,
    captureViewportCenterAsZoomTarget,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
  } = useMapGestures({
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    addRipple,
    selectedPoint,
  });

  // --- HABILLAGE SONORE DE LA CARTE ---
  const {
    playClickSound,
    handleIslandHoverStart,
    handleIslandHoverEnd
  } = useMapSounds(containerRef);

  const handlePointClick = useCallback((point: MapMarker) => {
    // Si on a bougé pendant le clic, on ignore l'action (c'était un drag)
    if (!hasMoved) {
      playClickSound();
      setSelectedPoint(point);
    }
  }, [hasMoved, playClickSound]);

  /**
   * Calcul mémoïsé des marqueurs visibles.
   * Triés spatialement (Y puis X) pour une navigation au clavier logique.
   */
  const visibleMarkers = useMemo(() => {
    const filtered = filterMarkersByZoom(markers, zoom);
    const sorted = sortMarkersSpatially(filtered);
    return sorted.map(point => {
      const badge = badges.find(b => b.id === point.topicId);
      return (
        <MapPoint
          key={point.id}
          topicId={point.topicId}
          x={point.x}
          y={point.y}
          icon={point.icon}
          title={point.title[language]}
          medal={badge?.medal}
          onClick={() => handlePointClick(point)}
          onMouseEnter={() => handleIslandHoverStart(point)}
          onMouseLeave={() => handleIslandHoverEnd(point)}
          onFocus={() => handleIslandHoverStart(point)}
          onBlur={() => handleIslandHoverEnd(point)}
          labels={labels}
          zoom={zoom}
        />
      );
    });
  }, [markers, zoom, badges, language, handlePointClick, handleIslandHoverStart, handleIslandHoverEnd, labels]);

  const canvasStyle = getCanvasTransformStyle(zoom);


  return (
    <OrientationGuard>
      <div className={styles.mapPage} role="main" aria-label={labels.discovery.mapTitle}>
        <PageHeader 
          title={labels.discovery.mapTitle}
          icon="🗺️"
          onBack={() => {
            playClickSound();
            onBack();
          }}
          rightElement={
            <div className={styles.zoomSidebar} role="group" aria-label="Contrôles du zoom">
              <button 
                className={styles.zoomBtn} 
                onClick={() => {
                  playClickSound();
                  captureViewportCenterAsZoomTarget();
                  zoomOut();
                }} 
                disabled={zoom === 1} 
                title={`${labels.discovery.zoomOut} (-)`} 
                aria-label={labels.discovery.zoomOut}
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
                disabled={zoom === MAP_SVG_CONFIG.MAX_ZOOM} 
                title={`${labels.discovery.zoomIn} (+)`} 
                aria-label={labels.discovery.zoomIn}
                data-testid="zoom-in-btn"
              >+</button>
              <button 
                className={styles.zoomBtn} 
                onClick={() => {
                  playClickSound();
                  resetZoom();
                }} 
                title={labels.discovery.globalView} 
                aria-label={labels.discovery.globalView}
                data-testid="zoom-reset-btn"
              >🏠</button>
            </div>
          }
        />
        
        <div 
          className={`${styles.mapWrapperScroll} ${isDragging ? styles.isDragging : ''}`} 
          ref={containerRef}
          role="region"
          aria-label="Contenu de la carte"
          tabIndex={-1}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div 
            className={styles.mapContainerRelative} 
            style={canvasStyle}
            onDoubleClick={handleDoubleClick}
          >
            <picture>
              <source srcSet="/assets/images/world-map.webp" type="image/webp" />
              <source srcSet="/assets/images/world-map.jpg" type="image/jpeg" />
              <img
                src="/assets/images/world-map.jpg"
                alt="Carte du monde décorative"
                className={styles.worldMapImage}
                data-testid="treasure-map-image"
                draggable="false"
              />
            </picture>
            {ripples.map(ripple => (
              <div 
                key={ripple.id} 
                className={styles.clickRipple} 
                style={{ left: ripple.x, top: ripple.y }} 
                data-testid="click-ripple"
                aria-hidden="true"
              />
            ))}
            
            {visibleMarkers}
          </div>
        </div>

        <AppOverlay
          isOpen={!!selectedPoint}
          onClose={() => {
            stopStory();
            playClickSound();
            setSelectedPoint(null);
          }}
          closeLabel={labels.common.close}
          title={selectedPoint?.title[language]}
          data-testid="discovery-popup"
        >
          {selectedPoint && (
            <MapOverlayContent
              selectedPoint={selectedPoint}
              language={language}
              labels={labels}
              unlocked={isUnlocked(selectedPoint.topicId as TopicId)}
              playClickSound={playClickSound}
              stopStory={stopStory}
              speak={speak}
              navigate={navigate}
              onClose={() => setSelectedPoint(null)}
            />
          )}
        </AppOverlay>
      </div>
    </OrientationGuard>
  );
};
