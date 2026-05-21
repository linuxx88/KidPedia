import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppIcon from './AppIcon';
import { useSettingsStore } from '../../store/useSettingsStore';
import styles from './BackButton.module.css';

interface BackButtonProps {
  /** Optional destination path. If not provided, goes back in history. */
  to?: string;
  /** Optional custom click handler. */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the label or just the icon */
  showLabel?: boolean;
  /** Custom children to override default label */
  children?: React.ReactNode;
}

/**
 * Sovereign BackButton component.
 * Centralizes navigation logic, translation, and styling for all "Back" actions.
 */
const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  onClick, 
  className = '',
  showLabel = true,
  children
}) => {
  const navigate = useNavigate();
  const { labels } = useSettingsStore();

  const handlePress = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      className={`${styles.backButton} ${className}`}
      onClick={handlePress}
      type="button"
    >
      <AppIcon name="arrow-left" size="small" />
      {children || (showLabel ? labels.common.back : null)}
    </button>
  );
};

export default BackButton;
