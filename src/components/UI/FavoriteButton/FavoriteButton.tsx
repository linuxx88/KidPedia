import React from 'react';
import { useProgressionStore } from '../../../store/useProgressionStore';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useAudioFeedback } from '../../../hooks/useAudioFeedback';
import { useNotificationStore } from '../../../store/useNotificationStore';
import styles from './FavoriteButton.module.css';

export interface FavoriteButtonProps {
  topicId: string;
  topicTitle: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showLabel?: boolean;
  onToggle?: (isFav: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  topicId,
  topicTitle,
  size = 'medium',
  className = '',
  showLabel = false,
  onToggle,
}) => {
  const isFavorite = useProgressionStore((state) => {
    const activeId = state.activeProfileId;
    const favs = activeId ? state.progressions[activeId]?.favorites : undefined;
    return favs ? favs.includes(topicId) : false;
  });
  const toggleFavorite = useProgressionStore((state) => state.toggleFavorite);
  const labels = useSettingsStore((state) => state.labels);
  const { playSound } = useAudioFeedback();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const willBeFavorite = toggleFavorite(topicId);

    if (willBeFavorite) {
      playSound('pop');
      addNotification({
        type: 'favorite',
        title: topicTitle,
        message: labels.favorites.addedToast,
        icon: '⭐',
        duration: 3000,
      });
    } else {
      playSound('click');
      addNotification({
        type: 'favorite',
        title: topicTitle,
        message: labels.favorites.removedToast,
        icon: '🤍',
        duration: 2500,
      });
    }

    onToggle?.(willBeFavorite);
  };

  const ariaLabel = isFavorite
    ? `${labels.favorites.removeAria} : ${topicTitle}`
    : `${labels.favorites.addAria} : ${topicTitle}`;

  return (
    <button
      type="button"
      className={`${styles.favoriteButton} ${styles[size]} ${isFavorite ? styles.active : ''} ${className}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isFavorite}
      title={ariaLabel}
      data-testid="favorite-button"
    >
      <span className={styles.icon} role="img" aria-hidden="true">
        {isFavorite ? '⭐' : '🤍'}
      </span>
      {showLabel && (
        <span className={styles.label}>
          {isFavorite ? labels.favorites.title : labels.favorites.addAria}
        </span>
      )}
    </button>
  );
};
