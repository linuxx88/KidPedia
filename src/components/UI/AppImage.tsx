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
  fallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='none'><rect width='100' height='100' rx='8' fill='%23f1f5f9'/><path d='M35 45a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 19 12-12 10 10 15-15 12 12v3H28v-8Z' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>", 
  loader,
  className,
  webpSrc,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setSrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState(src);

  // Synchronisation du src si la prop change (pendant le rendu pour éviter les rendus en cascade)
  if (src !== prevSrc) {
    setPrevSrc(src);
    setSrc(src);
    setIsLoading(true);
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    if (fallback && imgSrc !== fallback) {
      setSrc(fallback);
    }
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
