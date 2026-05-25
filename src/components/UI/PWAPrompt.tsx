import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useSettingsStore } from '../../store/useSettingsStore';
import styles from './PWAPrompt.module.css';

export const PWAPrompt: React.FC = () => {
  const { labels } = useSettingsStore();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  // State to check if prompt was recently dismissed within 24h (Safari iOS recursive display protection)
  const [isDismissed, setIsDismissed] = React.useState(() => {
    try {
      const dismissedAt = localStorage.getItem('kp-pwa-dismissed');
      if (dismissedAt) {
        const timeDiff = Date.now() - parseInt(dismissedAt, 10);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return timeDiff < twentyFourHours;
      }
    } catch (e) {
      console.warn('LocalStorage access blocked:', e);
    }
    return false;
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    try {
      localStorage.setItem('kp-pwa-dismissed', Date.now().toString());
      setIsDismissed(true);
    } catch (e) {
      console.warn('LocalStorage setItem failed:', e);
    }
  };

  if (isDismissed) return null;
  if (!offlineReady && !needRefresh) return null;

  return (
    <div className={styles.prompt}>
      <div className={styles.message}>
        {offlineReady ? (
          <span>{labels.pwa.ready}</span>
        ) : (
          <span>{labels.pwa.update}</span>
        )}
      </div>
      <div className={styles.buttons}>
        {needRefresh && (
          <button className={`${styles.button} ${styles.reload}`} onClick={() => updateServiceWorker(true)}>
            {labels.pwa.updateBtn}
          </button>
        )}
        <button className={`${styles.button} ${styles.close}`} onClick={close}>
          {labels.pwa.closeBtn}
        </button>
      </div>
    </div>
  );
};
