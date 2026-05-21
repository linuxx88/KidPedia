import React from 'react';
import { useNotificationStore, type AppNotification } from '../../../store/useNotificationStore';
import styles from './ToastContainer.module.css';

const ToastItem: React.FC<{ notification: AppNotification }> = ({ notification }) => {
  const remove = useNotificationStore(state => state.removeNotification);

  return (
    <div 
      className={`${styles.toast} ${styles[notification.type]}`}
      onClick={() => remove(notification.id)}
    >
      <div className={styles.icon}>{notification.icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{notification.title}</div>
        <div className={styles.message}>{notification.message}</div>
      </div>
      <button className={styles.close}>✕</button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const notifications = useNotificationStore(state => state.notifications);

  return (
    <div className={styles.container}>
      {notifications.map(n => (
        <ToastItem key={n.id} notification={n} />
      ))}
    </div>
  );
};
