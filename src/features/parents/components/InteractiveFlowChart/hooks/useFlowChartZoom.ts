import { useState } from 'react';

export const useFlowChartZoom = (initialScale = 1.0) => {
  const [zoomScale, setZoomScale] = useState<number>(initialScale);

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.1, 1.6));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoomScale(initialScale);
  };

  return {
    zoomScale,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
  };
};
