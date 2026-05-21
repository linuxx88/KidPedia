import React from 'react';
import styles from '../TransformedEmoji.module.css';

interface BabyDinoSVGProps {
  sizeClass?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export const BabyDinoSVG: React.FC<BabyDinoSVGProps> = ({
  sizeClass,
  customStyle,
  className
}) => {
  const containerClasses = [
    styles.puppyContainer, // Utilise les mêmes transitions fluides de conteneur
    styles.dinoContainer,
    sizeClass ? styles[sizeClass] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={customStyle}
      data-testid="transformed-dino"
    >
      <svg
        className={styles.puppySvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradé turquoise du corps du dinosaure */}
          <linearGradient id="dinoBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FD1C5" />
            <stop offset="100%" stopColor="#234E52" />
          </linearGradient>

          {/* Dégradé or pour les pointes dorsales et la queue */}
          <linearGradient id="dinoSpikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DB" />
            <stop offset="50%" stopColor="#F6E05E" />
            <stop offset="100%" stopColor="#ECC94B" />
          </linearGradient>
        </defs>

        {/* Groupe principal flottant (lévitation globale douce) */}
        <g className={styles.bodyGroup}>
          {/* Queue ondulante en feuille */}
          <g className={styles.dinoTail} style={{ transformOrigin: '55px 65px' }}>
            <path
              d="M54 68 C68 68 78 54 81 44 C75 46 66 59 54 60 Z"
              fill="url(#dinoBodyGradient)"
            />
            <path
              d="M81 44 C86 37 90 41 85 48 C80 49 79 45 81 44 Z"
              fill="url(#dinoSpikeGradient)"
            />
          </g>

          {/* Jambes arrière */}
          <ellipse
            cx="32"
            cy="76"
            rx="5.5"
            ry="7.5"
            fill="#234E52"
          />
          <ellipse
            cx="58"
            cy="76"
            rx="5.5"
            ry="7.5"
            fill="#234E52"
          />

          {/* Corps principal */}
          <ellipse
            cx="44"
            cy="65"
            rx="20"
            ry="14"
            fill="url(#dinoBodyGradient)"
            stroke="#234E52"
            strokeWidth="1"
          />

          {/* Pointes dorsales (Plaques de stegosaure) */}
          <path
            d="M26 55 Q29 48 32 54 Q35 48 38 53 Q41 48 44 53 Q47 48 50 54"
            stroke="url(#dinoSpikeGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Jambes avant */}
          <ellipse
            cx="39"
            cy="77"
            rx="5"
            ry="7"
            fill="#4FD1C5"
            stroke="#234E52"
            strokeWidth="1"
          />
          <ellipse
            cx="50"
            cy="77"
            rx="5"
            ry="7"
            fill="#4FD1C5"
            stroke="#234E52"
            strokeWidth="1"
          />

          {/* Groupe Tête & Long Cou (Balancement synchronisé) */}
          <g className={styles.dinoNeck} style={{ transformOrigin: '32px 58px' }}>
            {/* Long Cou */}
            <path
              d="M28 58 C28 42 41 42 41 28"
              stroke="url(#dinoBodyGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />

            {/* Tête mignonne de dino */}
            <ellipse
              cx="45"
              cy="23"
              rx="12"
              ry="9.5"
              fill="url(#dinoBodyGradient)"
              stroke="#234E52"
              strokeWidth="1"
            />

            {/* Petite pointe sur le front */}
            <path
              d="M53 16 L56 12 L56 19 Z"
              fill="url(#dinoSpikeGradient)"
            />

            {/* Joues roses mignonnes */}
            <circle
              cx="39"
              cy="25"
              r="2.2"
              fill="#FF8A8A"
              opacity="0.7"
            />

            {/* Yeux ronds clignotants */}
            <ellipse
              cx="46.5"
              cy="20"
              rx="2.5"
              ry="3"
              className={styles.ledEyes}
              fill="#1A202C"
              style={{ transformOrigin: '46.5px 20px' }}
            />

            {/* Reflet brillant dans l'oeil */}
            <circle
              cx="47.5"
              cy="18.8"
              r="0.8"
              fill="#FFFFFF"
            />

            {/* Petit sourire mignon */}
            <path
              d="M45.5 25.5 Q48.5 27.5 50.5 24.5"
              stroke="#1A202C"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// Default export matching standard lazy-loading practices
export default BabyDinoSVG;
