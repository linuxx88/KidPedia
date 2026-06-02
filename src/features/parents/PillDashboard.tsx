import React from 'react';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { encyclopedia } from '../../data/topics';
import styles from './PillDashboard.module.css';

export const PillDashboard: React.FC = () => {
  const { labels } = useSettingsStore();
  const { xp, badges } = usePlayerStore();
  const tickets = useProgressionStore((state) => state.getTickets());

  const progressPercent = Math.round((badges.length / encyclopedia.length) * 100);
  const formattedXP = xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp;

  return (
    <div className={styles.dashboardWrapper}>
      <Link
        to="/gallery"
        className={styles.pillDashboard}
        aria-label={`Voir mes médailles. Progression : ${progressPercent} pour cent. Total XP : ${xp}`}
      >
        <div className={styles.dashItem}>
          <span className={styles.dashIcon}>🏆</span>
          <span className={styles.dashNumber} data-testid="medal-count">
            {badges.length}
          </span>
          <span className={styles.dashLabel}>{labels.home.medals}</span>
        </div>

        <div className={styles.dashSeparator}></div>

        <div className={styles.dashItem}>
          <span className={styles.dashIcon}>🎫</span>
          <span className={styles.dashNumber} data-testid="ticket-count">
            {tickets}
          </span>
          <span className={styles.dashLabel}>{labels.home.tickets}</span>
        </div>

        <div className={styles.dashSeparator}></div>

        <div className={styles.dashItem}>
          <span className={`${styles.dashIcon} text-amber-400`}>⚡</span>
          <span className={styles.dashNumber} data-testid="xp-count">
            {formattedXP}
          </span>
          <span className={styles.dashLabel}>XP</span>
        </div>

        <div className={styles.dashSeparator}></div>

        <div className={styles.progressContainer}>
          <span className={styles.dashNumber}>{progressPercent}%</span>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
};
