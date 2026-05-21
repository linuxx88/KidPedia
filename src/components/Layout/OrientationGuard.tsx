import React, { useState, useEffect } from 'react';
import styles from './OrientationGuard.module.css';
import { useSettingsStore } from '../../store/useSettingsStore';

interface OrientationGuardProps {
  children: React.ReactNode;
}

export const OrientationGuard: React.FC<OrientationGuardProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const { gender, labels } = useSettingsStore();

  useEffect(() => {
    const checkOrientation = () => {
      // On considère "portrait" si la hauteur est > largeur ET que c'est un petit écran (mobile)
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait) return <>{children}</>;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.phoneIcon}>
          <div className={styles.phone}></div>
          <div className={styles.arrow}>🔄</div>
        </div>
        <h2 className={styles.text}>
          {labels.common.orientation.title[gender]}
        </h2>
        <p className={styles.subtext}>{labels.common.orientation.safariHint}</p>
        <span className={styles.character}>{gender === 'boy' ? '👦' : '👧'}</span>
      </div>
    </div>
  );
};
