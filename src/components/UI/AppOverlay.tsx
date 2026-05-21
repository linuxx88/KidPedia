import React, { useEffect } from 'react';
import styles from './AppOverlay.module.css';

interface AppOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

/**
 * AppOverlay - Composant de modale standardisé.
 * Gère le focus, le verrouillage du scroll et l'accessibilité.
 */
export const AppOverlay: React.FC<AppOverlayProps> = ({ 
  isOpen, 
  onClose, 
  closeLabel,
  title, 
  children, 
  footer,
  maxWidth = "700px",
  ...props
}) => {
  // Verrouiller le scroll du corps quand l'overlay est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlayContainer} {...props}>
      {/* Backdrop avec flou */}
      <div 
        className={`${styles.backdrop} ${styles.fadeIn}`}
        onClick={onClose}
      />
      
      {/* Contenu de la Modale */}
      <div 
        className={`${styles.modalSheet} ${styles.slideIn}`}
        style={{ maxWidth }}
      >
        {/* Header de la modale */}
        <header className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label={closeLabel}
          >
            ✕
          </button>
        </header>

        {/* Corps de la modale */}
        <div className={styles.modalBody}>
          {children}
        </div>

        {/* Footer optionnel */}
        {footer && (
          <footer className={styles.modalFooter}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};
