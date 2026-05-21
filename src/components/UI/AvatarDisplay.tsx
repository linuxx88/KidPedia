import React from 'react';
import { ACCESSORIES_DB } from '../../data/accessories';
import { TransformedEmoji } from './TransformedEmoji';
import styles from './AvatarDisplay.module.css';

interface AvatarDisplayProps {
  avatar: string;
  name?: string;
  accessoryId?: string | null;
  companionId?: string | null;
  size?: 'small' | 'medium' | 'large' | 'huge';
  className?: string;
  animate?: boolean;
}

/**
 * Composant AvatarDisplay
 * Gère le rendu de l'avatar avec superposition d'accessoires.
 */
export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ 
  avatar, 
  name = 'Explorateur',
  accessoryId, 
  companionId,
  size = 'medium',
  className = '',
  animate = false
}) => {
  const accessory = accessoryId ? ACCESSORIES_DB.find(a => a.id === accessoryId) : null;
  const companion = companionId ? ACCESSORIES_DB.find(a => a.id === companionId) : null;
  
  const containerClasses = [
    styles.avatarContainer,
    styles[size],
    animate ? styles.animate : '',
    className
  ].join(' ');

  return (
    <div 
      className={containerClasses} 
      aria-label={name} 
      data-testid="avatar-display"
    >
      {/* Couche 1 : L'avatar de base */}
      <div className={styles.baseLayer}>
        {avatar.length > 2 ? (
          <picture>
            <source srcSet={avatar} type="image/webp" />
            <img 
              src={avatar.replace('.webp', '.png')} 
              alt={name} 
              className={styles.avatarImg} 
            />
          </picture>
        ) : (
          <span className={styles.avatarEmoji} aria-hidden="true">{avatar}</span>
        )}
      </div>

      {/* Couche 2 : L'accessoire superposé */}
      {accessory && (
        <div 
          className={styles.accessoryLayer} 
          data-category={accessory.category}
          title={accessory.name.fr}
        >
          <span className={styles.accessoryIcon}>
            <TransformedEmoji emoji={accessory.icon} size={size} />
          </span>
        </div>
      )}

      {/* Couche 3 : Le compagnon thématique */}
      {companion && (
        <div 
          className={styles.companionLayer}
          data-category={companion.category}
          title={companion.name.fr}
        >
          <span className={styles.companionIcon}>
            <TransformedEmoji emoji={companion.icon} size={size} />
          </span>
        </div>
      )}
    </div>
  );
};
