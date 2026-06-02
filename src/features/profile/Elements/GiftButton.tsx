import React from 'react';
import styles from './GiftButton.module.css';

interface GiftButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * GiftButton - A 3D capsule button with a gift icon and blue text.
 * Cloned from the style of the BackButton for visual consistency.
 */
export const GiftButton: React.FC<GiftButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      className={`${styles.giftButton} ${className}`}
      onClick={onClick}
      aria-label="Ouvrir les cadeaux"
      data-testid="gallery-gift-btn"
      type="button"
    >
      <div className={styles.container}>
        <span className={styles.icon} role="img" aria-hidden="true">🎁</span>
        <span className={styles.label}>Cadeaux</span>
      </div>
    </button>
  );
};
