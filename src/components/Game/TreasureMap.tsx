import React, { useState, useRef, useMemo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { PageHeader } from '../Layout/PageHeader';
import { AppButton } from '../UI/AppButton';
import { AppOverlay } from '../UI/AppOverlay';
import { MAP_SVG_CONFIG } from '../../constants/geometry';
import { useMapZoom } from '../../hooks/useMapZoom';
import { useVisualEffects } from '../../hooks/useVisualEffects';
import { getMedalIcon, type MedalType } from '../../utils/quizMessages';
import { type MapMarker } from '../../data/mapData';
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
  labels: Labels;
  zoom: number;
}

/**
 * MapPoint - Marqueur individuel sur la carte.
 * Mémoïsé pour éviter les re-renders si les props ne changent pas.
 */
const MapPoint = React.memo<MapPointProps>(({ x, y, icon, title, topicId, medal, onClick, labels, zoom }) => {
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
  
  const { zoom, zoomIn, zoomOut, resetZoom } = useMapZoom();
  const { effects: ripples, addEffect: addRipple } = useVisualEffects(MAP_SVG_CONFIG.RIPPLE_DURATION);
  
  const [selectedPoint, setSelectedPoint] = useState<MapMarker | null>(null);
  
  // --- ÉTAT DU DRAG (PANNING) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // --- COMPENSATION DU ZOOM ET DEFILEMENT ---
  const zoomTargetRef = useRef<{ rx: number; ry: number }>({ rx: 0.5, ry: 0.5 });

  // --- DOUBLE-TAP POUR SUPPORT TABLETTE/MOBILE ---
  const lastTouchTimeRef = useRef<number>(0);
  const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const captureViewportCenterAsZoomTarget = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.firstElementChild as HTMLElement;
    if (!child) return;
    const rect = child.getBoundingClientRect();
    const wMap = rect.width;
    const hMap = rect.height;
    
    if (wMap === 0 || hMap === 0) return;
    
    const viewportWidth = container.clientWidth;
    const viewportHeight = container.clientHeight;
    
    const rx = (container.scrollLeft + viewportWidth / 2) / wMap;
    const ry = (container.scrollTop + viewportHeight / 2) / hMap;
    
    zoomTargetRef.current = {
      rx: Math.max(0, Math.min(1, rx)),
      ry: Math.max(0, Math.min(1, ry))
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.firstElementChild as HTMLElement;
    if (!child) return;
    
    const rect = child.getBoundingClientRect();
    const wMap = rect.width;
    const hMap = rect.height;
    
    if (wMap === 0 || hMap === 0) return;
    
    const viewportWidth = container.clientWidth;
    const viewportHeight = container.clientHeight;
    
    const { rx, ry } = zoomTargetRef.current;
    
    const targetScrollLeft = rx * wMap - viewportWidth / 2;
    const targetScrollTop = ry * hMap - viewportHeight / 2;
    
    container.scrollLeft = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - viewportWidth));
    container.scrollTop = Math.max(0, Math.min(targetScrollTop, container.scrollHeight - viewportHeight));
  }, [zoom]);

  // --- RACCOURCIS CLAVIER ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPoint || e.target instanceof HTMLInputElement) return;
      if (e.key === '+' || e.key === '=') {
        captureViewportCenterAsZoomTarget();
        zoomIn();
      }
      if (e.key === '-' || e.key === '_') {
        captureViewportCenterAsZoomTarget();
        zoomOut();
      }
      if (e.key === '0') {
        zoomTargetRef.current = { rx: 0.5, ry: 0.5 };
        resetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom, selectedPoint, captureViewportCenterAsZoomTarget]);

  // --- GESTION DU DRAG (MOUSE) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.pageX,
      y: e.pageY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const dx = e.pageX - dragStart.x;
    const dy = e.pageY - dragStart.y;

    // Seuil pour différencier un clic d'un drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasMoved(true);
    }

    containerRef.current.scrollLeft = dragStart.scrollLeft - dx;
    containerRef.current.scrollTop = dragStart.scrollTop - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- GESTION DU DRAG ET DOUBLE-TAP (TOUCH) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: touch.pageX,
      y: touch.pageY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop
    });

    // Détection personnalisée du double-tap
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTouchTimeRef.current;
    
    if (timeDiff < 300) {
      const dx = Math.abs(touch.clientX - lastTouchPosRef.current.x);
      const dy = Math.abs(touch.clientY - lastTouchPosRef.current.y);
      if (dx < 20 && dy < 20) {
        const mapContainer = containerRef.current.firstElementChild as HTMLElement;
        if (mapContainer) {
          const rect = mapContainer.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          
          if (rect.width > 0 && rect.height > 0) {
            zoomTargetRef.current = {
              rx: x / rect.width,
              ry: y / rect.height
            };
          }
          
          zoomIn();
          addRipple(x, y);
          
          // Désactiver le drag pour ce toucher afin d'éviter les tressautements
          setIsDragging(false);
        }
      }
    }

    lastTouchTimeRef.current = currentTime;
    lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const dx = touch.pageX - dragStart.x;
    const dy = touch.pageY - dragStart.y;

    // Seuil pour différencier un clic d'un drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasMoved(true);
    }

    containerRef.current.scrollLeft = dragStart.scrollLeft - dx;
    containerRef.current.scrollTop = dragStart.scrollTop - dy;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePointClick = useCallback((point: MapMarker) => {
    // Si on a bougé pendant le clic, on ignore l'action (c'était un drag)
    if (!hasMoved) {
      setSelectedPoint(point);
    }
  }, [hasMoved]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Le double clic ne doit pas interférer avec le drag
    if (hasMoved) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (rect.width > 0 && rect.height > 0) {
      zoomTargetRef.current = {
        rx: x / rect.width,
        ry: y / rect.height
      };
    }
    
    zoomIn();
    addRipple(x, y);
  };

  /**
   * Calcul mémoïsé des marqueurs visibles.
   * Triés spatialement (Y puis X) pour une navigation au clavier logique.
   */
  const visibleMarkers = useMemo(() => {
    return [...markers]
      .filter(point => point.minZoom <= zoom)
      .sort((a, b) => (a.y - b.y) || (a.x - b.x))
      .map(point => {
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
            labels={labels}
            zoom={zoom}
          />
        );
      });
  }, [markers, zoom, badges, language, handlePointClick, labels]);

  const canvasStyle: React.CSSProperties = { 
    transform: `scale(${zoom})`, 
    transformOrigin: '0 0' 
  };

  return (
    <div className={styles.mapPage} role="main" aria-label={labels.discovery.mapTitle}>
      <PageHeader 
        title={labels.discovery.mapTitle}
        icon="🗺️"
        onBack={onBack}
        rightElement={
          <div className={styles.zoomSidebar} role="group" aria-label="Contrôles du zoom">
            <button 
              className={styles.zoomBtn} 
              onClick={() => {
                captureViewportCenterAsZoomTarget();
                zoomOut();
              }} 
              disabled={zoom === 1} 
              title={`${labels.discovery.zoomOut} (-)`} 
              aria-label={labels.discovery.zoomOut}
            >-</button>
            <span className={styles.zoomLevelBadge} data-testid="zoom-level" aria-live="polite">x{zoom}</span>
            <button 
              className={styles.zoomBtn} 
              onClick={() => {
                captureViewportCenterAsZoomTarget();
                zoomIn();
              }} 
              disabled={zoom === MAP_SVG_CONFIG.MAX_ZOOM} 
              title={`${labels.discovery.zoomIn} (+)`} 
              aria-label={labels.discovery.zoomIn}
            >+</button>
            <button 
              className={styles.zoomBtn} 
              onClick={() => {
                zoomTargetRef.current = { rx: 0.5, ry: 0.5 };
                resetZoom();
              }} 
              title={labels.discovery.globalView} 
              aria-label={labels.discovery.globalView}
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
              draggable="false" // Empêcher le drag natif de l'image qui casse notre logique
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
        onClose={() => setSelectedPoint(null)}
        closeLabel={labels.common.close}
        title={selectedPoint?.title[language]}
        data-testid="discovery-popup"
      >
        {selectedPoint && (
          <div className={styles.popupContent}>
            <span className={styles.popupIcon} aria-hidden="true">{selectedPoint.icon}</span>
            <p className={styles.popupText}>{labels.discovery.discoveryMessage}</p>
            <AppButton 
              onClick={() => navigate(`/topic/${selectedPoint.topicId}`)}
              className={styles.explorerBtnMap}
            >
              {labels.discovery.explore(selectedPoint.title[language])}
            </AppButton>
          </div>
        )}
      </AppOverlay>
    </div>
  );
};

export default TreasureMap;
