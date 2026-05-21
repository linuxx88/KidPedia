import React, { useState } from 'react';
import styles from './AppImage.module.css';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  loader?: React.ReactNode;
  webpSrc?: string;
}

/**
 * Composant Image avec gestion du chargement et du fallback.
 * Optimisé pour les assets lourds de l'encyclopédie via <picture> et WebP.
 */
export const AppImage: React.FC<AppImageProps> = ({ 
  src, 
  alt, 
  fallback = '/assets/images/placeholder.webp', 
  loader,
  className,
  webpSrc,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setSrc] = useState(src);

  // Synchronisation du src si la prop change
  if (src !== imgSrc && !isLoading && src) {
     setSrc(src);
     setIsLoading(true);
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    if (fallback) setSrc(fallback);
  };

  const imageElement = (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      className={`${styles.image} ${isLoading ? styles.hidden : styles.visible}`}
    />
  );

  return (
    <div className={`${styles.imageWrapper} ${className || ''}`}>
      {isLoading && (
        <div className={styles.loader}>
          {loader || <div className={styles.spinner} />}
        </div>
      )}
      {webpSrc ? (
        <picture className={`${styles.image} ${isLoading ? styles.hidden : styles.visible}`}>
          <source srcSet={webpSrc} type="image/webp" />
          {imageElement}
        </picture>
      ) : (
        imageElement
      )}
    </div>
  );
};
