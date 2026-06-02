import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../../store/useSettingsStore';
import AppIcon from '../../UI/AppIcon';
import styles from './DiscoveryHub.module.css';

export const DiscoveryHub: React.FC = () => {
  const navigate = useNavigate();
  const { labels } = useSettingsStore();

  const hubs = [
    {
      id: 'origins',
      icon: <AppIcon name="hourglass" size="large" />,
      title: labels.discovery.originsTitle,
      desc: labels.discovery.originsDesc,
      color: '#6366f1',
      path: '/origins',
    },
    {
      id: 'map',
      icon: <AppIcon name="compass" size="large" />,
      title: labels.discovery.mapTitle,
      desc: labels.discovery.mapDesc,
      color: '#f97316',
      path: '/map',
    },
    {
      id: 'safari',
      icon: <AppIcon name="paw" size="large" />,
      title: labels.discovery.safariTitle,
      desc: labels.discovery.safariDesc,
      color: '#f59e0b',
      path: '/safari',
    },
    {
      id: 'championship',
      icon: <AppIcon name="rocket" size="large" />,
      title: labels.discovery.championshipTitle,
      desc: labels.discovery.championshipDesc,
      color: '#fbbf24',
      path: '/championship',
    },
    {
      id: 'dictionary',
      icon: <AppIcon name="help" size="large" />,
      title: labels.dictionary.title,
      desc: labels.dictionary.listenTip,
      color: '#10b981',
      path: '/dictionary',
    },
  ];

  return (
    <section className={styles.discoveryHub}>
      <div className={styles.hubGrid}>
        {hubs.map((hub) => (
          <button
            key={hub.id}
            className={styles.hubCard}
            onClick={() => navigate(hub.path)}
            style={{ borderColor: hub.color } as React.CSSProperties}
          >
            <div
              className={styles.hubIconBox}
              style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
            >
              {hub.icon}
            </div>
            <div>
              <h3 className={styles.hubTitle}>{hub.title}</h3>
              <p className={styles.hubDesc}>{hub.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
