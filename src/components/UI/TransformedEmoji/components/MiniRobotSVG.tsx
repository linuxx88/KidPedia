import React from 'react';
import styles from '../TransformedEmoji.module.css';

interface MiniRobotSVGProps {
  sizeClass?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export const MiniRobotSVG: React.FC<MiniRobotSVGProps> = ({
  sizeClass,
  customStyle,
  className
}) => {
  const containerClasses = [
    styles.robotContainer,
    sizeClass ? styles[sizeClass] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={customStyle}
      data-testid="transformed-robot"
    >
      <svg
        className={styles.robotSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradé métallique du corps */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3182CE" />
            <stop offset="100%" stopColor="#1A365D" />
          </linearGradient>

          {/* Dégradé de l'écran du visage */}
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D3748" />
            <stop offset="100%" stopColor="#1A202C" />
          </linearGradient>

          {/* Dégradé or pour les finitions d'antennes et oreilles */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC94B" />
            <stop offset="100%" stopColor="#D69E2E" />
          </linearGradient>

          {/* Dégradé de la flamme de propulsion */}
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </linearGradient>

          {/* Dégradé d'aura sous le réacteur */}
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Lueur de sustentation sous le robot */}
        <ellipse
          cx="50"
          cy="88"
          rx="18"
          ry="4"
          className={styles.thrustGlow}
          fill="url(#glowGradient)"
        />

        {/* Flamme de propulsion oscillante */}
        <path
          d="M44 68 C40 85 60 85 56 68 Z"
          className={styles.thrustFlame}
          fill="url(#flameGradient)"
        />

        {/* Groupe flottant (Tête, Antennes, Yeux, Coeur) */}
        <g className={styles.bodyGroup}>
          {/* Tige de l'antenne */}
          <line
            x1="50"
            y1="22"
            x2="50"
            y2="10"
            stroke="#A0AEC0"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Boule de l'antenne pulsée */}
          <circle
            cx="50"
            cy="7"
            r="4.5"
            className={styles.antennaBall}
            fill="url(#goldGradient)"
          />

          {/* Oreilles / Boulons latéraux */}
          <rect
            x="20"
            y="32"
            width="6"
            height="12"
            rx="2.5"
            fill="url(#goldGradient)"
          />
          <rect
            x="74"
            y="32"
            width="6"
            height="12"
            rx="2.5"
            fill="url(#goldGradient)"
          />

          {/* Tête / Casque principal */}
          <rect
            x="24"
            y="18"
            width="52"
            height="42"
            rx="14"
            fill="url(#bodyGradient)"
            stroke="#2B6CB0"
            strokeWidth="2"
          />

          {/* Écran LED du visage */}
          <rect
            x="30"
            y="24"
            width="40"
            height="24"
            rx="7"
            fill="url(#screenGradient)"
            stroke="#4A5568"
            strokeWidth="1"
          />

          {/* Yeux LED scintillants et clignotants */}
          <ellipse
            cx="41"
            cy="36"
            rx="4.5"
            ry="4.5"
            className={styles.ledEyes}
            fill="#00E5FF"
            style={{ transformOrigin: '41px 36px' }}
          />
          <ellipse
            cx="59"
            cy="36"
            rx="4.5"
            ry="4.5"
            className={styles.ledEyes}
            fill="#00E5FF"
            style={{ transformOrigin: '59px 36px' }}
          />

          {/* Grille de bouche de pixel (petite touche mignonne) */}
          <path
            d="M44 43 H56"
            stroke="#4FD1C5"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Torse / Base de cou */}
          <path
            d="M36 60 L64 60 C61 68 39 68 36 60"
            fill="url(#bodyGradient)"
            stroke="#1A365D"
            strokeWidth="1"
          />

          {/* Coeur d'énergie pulsé sur le torse */}
          <circle
            cx="50"
            cy="63.5"
            r="2.5"
            className={styles.heartLight}
            fill="#3182CE"
          />
        </g>
      </svg>
    </div>
  );
};

// Default export matching standard lazy-loading practices
export default MiniRobotSVG;
