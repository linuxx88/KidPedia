import React from 'react';
import styles from '../TransformedEmoji.module.css';

interface MiniPuppySVGProps {
  sizeClass?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export const MiniPuppySVG: React.FC<MiniPuppySVGProps> = ({
  sizeClass,
  customStyle,
  className
}) => {
  const containerClasses = [
    styles.puppyContainer,
    sizeClass ? styles[sizeClass] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={customStyle}
      data-testid="transformed-puppy"
    >
      <svg
        className={styles.puppySvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradé doré du pelage de la tête/corps */}
          <linearGradient id="dogHeadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCEBB6" />
            <stop offset="100%" stopColor="#E3A857" />
          </linearGradient>

          {/* Dégradé du corps */}
          <linearGradient id="dogBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCEBB6" />
            <stop offset="100%" stopColor="#D8963E" />
          </linearGradient>

          {/* Dégradé brun des oreilles et de la queue */}
          <linearGradient id="dogEarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C07C3B" />
            <stop offset="100%" stopColor="#8F4F1D" />
          </linearGradient>

          {/* Dégradé or pour la médaille du collier */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC94B" />
            <stop offset="100%" stopColor="#D69E2E" />
          </linearGradient>
        </defs>

        {/* Groupe flottant pour la lévitation douce du chiot */}
        <g className={styles.bodyGroup}>
          {/* Queue frétillante (située à l'arrière) */}
          <path
            d="M34 68 C22 62 14 68 12 60 C18 56 26 62 34 68"
            fill="url(#dogEarGradient)"
            className={styles.dogTail}
            style={{ transformOrigin: '32px 68px' }}
          />

          {/* Corps principal */}
          <ellipse
            cx="50"
            cy="65"
            rx="19"
            ry="15"
            fill="url(#dogBodyGradient)"
          />

          {/* Pattes avant */}
          <ellipse
            cx="41"
            cy="77"
            rx="5.5"
            ry="7"
            fill="#EDC9AF"
            stroke="#C07C3B"
            strokeWidth="1"
          />
          <ellipse
            cx="59"
            cy="77"
            rx="5.5"
            ry="7"
            fill="#EDC9AF"
            stroke="#C07C3B"
            strokeWidth="1"
          />

          {/* Collier rouge */}
          <path
            d="M34 54 Q50 61 66 54"
            stroke="#E53E3E"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Médaille dorée sur le collier */}
          <circle
            cx="50"
            cy="59.5"
            r="3.5"
            fill="url(#goldGradient)"
          />

          {/* Oreille gauche tombante */}
          <path
            d="M29 27 C19 29 17 48 27 46 Z"
            fill="url(#dogEarGradient)"
          />

          {/* Oreille droite tombante */}
          <path
            d="M71 27 C81 29 83 48 73 46 Z"
            fill="url(#dogEarGradient)"
          />

          {/* Tête principale */}
          <circle
            cx="50"
            cy="39"
            r="21"
            fill="url(#dogHeadGradient)"
            stroke="#C07C3B"
            strokeWidth="1.5"
          />

          {/* Yeux brillants qui clignent */}
          <ellipse
            cx="42"
            cy="36"
            rx="3"
            ry="3.5"
            className={styles.ledEyes}
            fill="#1A202C"
            style={{ transformOrigin: '42px 36px' }}
          />
          <ellipse
            cx="58"
            cy="36"
            rx="3"
            ry="3.5"
            className={styles.ledEyes}
            fill="#1A202C"
            style={{ transformOrigin: '58px 36px' }}
          />

          {/* Reflets blancs mignons dans les yeux */}
          <circle cx="43.2" cy="34.8" r="1" fill="#FFFFFF" />
          <circle cx="59.2" cy="34.8" r="1" fill="#FFFFFF" />

          {/* Museau blanc/crème */}
          <ellipse
            cx="50"
            cy="45"
            rx="7"
            ry="5.5"
            fill="#FFF"
            opacity="0.9"
          />

          {/* Truffe noire mignonne */}
          <polygon
            points="47.5,42.5 52.5,42.5 50,45.5"
            fill="#1A202C"
          />

          {/* Petit sourire mignon */}
          <path
            d="M46.5 47 Q50 50.5 53.5 47"
            stroke="#1A202C"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Langue rose haletante frétillante */}
          <path
            d="M48 48.5 Q50 56.5 52 48.5 Z"
            className={styles.dogTongue}
            fill="#FF8A8A"
            style={{ transformOrigin: '50px 48.5px' }}
          />
        </g>
      </svg>
    </div>
  );
};

// Default export matching standard lazy-loading practices
export default MiniPuppySVG;
