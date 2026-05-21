import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { AppButton } from './AppButton';
import styles from './OfflineFallback.module.css';

interface OfflineFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const OfflineFallback: React.FC<OfflineFallbackProps> = ({ title, message, onRetry }) => {
  const labels = useSettingsStore((state) => state.labels);
  const activeTitle = title || labels.errors.offlineTitle;
  const activeMessage = message || labels.errors.offlineText;

  const handleReload = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.illustrationWrapper}>
          {/* Sleeping Satellite SVG in Space */}
          <svg className={styles.satelliteSvg} viewBox="0 0 200 200" width="160" height="160">
            <defs>
              <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit rings */}
            <ellipse cx="100" cy="100" rx="75" ry="30" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="2" strokeDasharray="6 4" transform="rotate(-15 100 100)" />
            <ellipse cx="100" cy="100" rx="90" ry="20" fill="none" stroke="rgba(192, 132, 252, 0.1)" strokeWidth="1.5" transform="rotate(25 100 100)" />

            {/* Stars */}
            <circle cx="45" cy="50" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="160" cy="65" r="2" fill="#ffd700" opacity="0.7" className={styles.twinkleStar} />
            <circle cx="150" cy="140" r="1" fill="#fff" opacity="0.5" />
            <circle cx="30" cy="120" r="2.5" fill="#a7f3d0" opacity="0.6" className={styles.twinkleStarFast} />

            {/* ZZZ animations */}
            <g className={styles.zzzGroup}>
              <text x="135" y="60" className={styles.z1}>Z</text>
              <text x="145" y="48" className={styles.z2}>z</text>
              <text x="153" y="40" className={styles.z3}>z</text>
            </g>

            {/* Satellite dish / main body */}
            <g className={styles.satelliteBody}>
              {/* Antenna */}
              <line x1="100" y1="90" x2="100" y2="60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <circle cx="100" cy="55" r="7" fill="#fb7185" filter="url(#glow)" className={styles.antennaGlow} />

              {/* Solar panels */}
              {/* Left Panel */}
              <rect x="35" y="90" width="30" height="15" rx="3" fill="url(#panelGrad)" stroke="#1e293b" strokeWidth="2" />
              <line x1="65" y1="97.5" x2="80" y2="97.5" stroke="#94a3b8" strokeWidth="3" />
              {/* Right Panel */}
              <rect x="135" y="90" width="30" height="15" rx="3" fill="url(#panelGrad)" stroke="#1e293b" strokeWidth="2" />
              <line x1="120" y1="97.5" x2="135" y2="97.5" stroke="#94a3b8" strokeWidth="3" />

              {/* Central sphere */}
              <circle cx="100" cy="98" r="22" fill="url(#satGrad)" stroke="#1e293b" strokeWidth="3" />

              {/* Closed sleeping eyes */}
              <path d="M91 98 Q95 102 99 98" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M101 98 Q105 102 109 98" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

              {/* Cute sleeping smile */}
              <path d="M97 106 Q100 109 103 106" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <h1 className={styles.title}>{activeTitle}</h1>
        <p className={styles.message}>{activeMessage}</p>

        <div className={styles.buttonWrapper}>
          <AppButton 
            variant="glass" 
            onClick={handleReload}
            className={styles.retryBtn}
            icon={<span className={styles.icon}>🔄</span>}
          >
            {labels.errors.offlineRetry}
          </AppButton>
        </div>
      </div>
    </div>
  );
};
