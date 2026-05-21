import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import styles from './PWAPrompt.module.css';

export const PWAPrompt: React.FC = () => {
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

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className={styles.prompt}>
      <div className={styles.message}>
        {offlineReady ? (
          <span>L'application est prête à être utilisée hors-ligne ! 🚀</span>
        ) : (
          <span>Une nouvelle version est disponible ! ✨</span>
        )}
      </div>
      <div className={styles.buttons}>
        {needRefresh && (
          <button className={`${styles.button} ${styles.reload}`} onClick={() => updateServiceWorker(true)}>
            Mettre à jour
          </button>
        )}
        <button className={`${styles.button} ${styles.close}`} onClick={close}>
          Fermer
        </button>
      </div>
    </div>
  );
};
