import React from 'react';
import styles from './AppIcon.module.css';

interface AppIconProps {
  /** The name of the icon in icons.svg (without the 'icon-' prefix) */
  name: string;
  /** Size of the icon */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Universal icon component using SVG sprites.
 * Ensures consistent sizing and theme-aware coloring.
 */
const AppIcon: React.FC<AppIconProps> = ({ 
  name, 
  size = 'medium', 
  className = '' 
}) => {
  return (
    <svg 
      className={`${styles.icon} ${styles[size]} ${className}`}
      aria-hidden="true"
      role="img"
    >
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default AppIcon;
