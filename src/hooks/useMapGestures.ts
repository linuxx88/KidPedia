import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { type MapMarker } from '../data/mapData';

interface UseMapGesturesProps {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  addRipple: (x: number, y: number) => void;
  selectedPoint: MapMarker | null;
}

export const useMapGestures = ({
  zoom,
  zoomIn,
  zoomOut,
  resetZoom,
  addRipple,
  selectedPoint,
}: UseMapGesturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // --- COMPENSATION DU ZOOM ET DEFILEMENT ---
  const zoomTargetRef = useRef<{ rx: number; ry: number }>({ rx: 0.5, ry: 0.5 });

  // --- DOUBLE-TAP POUR SUPPORT TABLETTE/MOBILE ---
  const lastTouchTimeRef = useRef<number | null>(null);
  const lastTouchPosRef = useRef<{ x: number; y: number } | null>(null);

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
    
    // Utiliser requestAnimationFrame pour s'assurer que le navigateur a fini d'ajuster
    // les limites de scroll (scrollWidth/scrollHeight) avant d'appliquer la position.
    const rafId = requestAnimationFrame(() => {
      const scrollX = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - viewportWidth));
      const scrollY = Math.max(0, Math.min(targetScrollTop, container.scrollHeight - viewportHeight));
      
      if (typeof container.scrollTo === 'function') {
        container.scrollTo({
          left: scrollX,
          top: scrollY,
          behavior: 'smooth'
        });
      } else {
        container.scrollLeft = scrollX;
        container.scrollTop = scrollY;
      }
    });

    return () => cancelAnimationFrame(rafId);
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
    
    if (lastTouchTimeRef.current !== null && lastTouchPosRef.current !== null) {
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
            
            // Réinitialisation du timer et de la position après un double-tap réussi
            lastTouchTimeRef.current = null;
            lastTouchPosRef.current = null;
            return;
          }
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

  return {
    containerRef,
    isDragging,
    hasMoved,
    zoomTargetRef,
    captureViewportCenterAsZoomTarget,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
  };
};
