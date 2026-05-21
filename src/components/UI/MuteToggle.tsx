import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import styles from './MuteToggle.module.css';

/**
 * MuteToggle - Bouton pour activer/désactiver le son globalement.
 */
export const MuteToggle: React.FC = () => {
  const isMuted = useSettingsStore(state => state.isMuted);
  const toggleMute = useSettingsStore(state => state.toggleMute);
  const labels = useSettingsStore(state => state.labels);

  return (
    <button 
      className={`${styles.toggleBtn} ${isMuted ? styles.muted : ''}`}
      onClick={toggleMute}
      title={isMuted ? labels.common.listen : labels.common.stop}
      aria-label={isMuted ? labels.common.listen : labels.common.stop}
    >
      <span className={styles.icon}>{isMuted ? '🔇' : '🔊'}</span>
    </button>
  );
};
