import React from 'react';
import styles from './AppLoader.module.css';

interface AppLoaderProps {
  message?: string;
}

export const AppLoader: React.FC<AppLoaderProps> = ({ message }) => {
  return (
    <div className={styles.container} role="alert" aria-busy="true">
      <div className={styles.planetWrapper}>
        <div className={styles.planet}>
          <div className={styles.ring}></div>
        </div>
        <div className={styles.rocket}>🚀</div>
      </div>
      <p className={styles.message}>{message || 'Chargement de l\'aventure...'}</p>
    </div>
  );
};
