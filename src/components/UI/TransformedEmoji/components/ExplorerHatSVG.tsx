import React from 'react';
import styles from '../TransformedEmoji.module.css';

interface ExplorerHatSVGProps {
  sizeClass?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export const ExplorerHatSVG: React.FC<ExplorerHatSVGProps> = ({
  sizeClass,
  customStyle,
  className
}) => {
  const containerClasses = [
    styles.hatContainer,
    sizeClass ? styles[sizeClass] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={customStyle}
      data-testid="transformed-hat"
    >
      <svg
        className={styles.hatSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradé Khaki / Sable pour la calotte et le bord */}
          <linearGradient id="hatKhakiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5E6CA" />
            <stop offset="60%" stopColor="#D9B48F" />
            <stop offset="100%" stopColor="#B58D63" />
          </linearGradient>

          {/* Dégradé de la lisière (bordure extérieure) */}
          <linearGradient id="brimEdgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A47C53" />
            <stop offset="50%" stopColor="#C69E75" />
            <stop offset="100%" stopColor="#A47C53" />
          </linearGradient>

          {/* Dégradé de la ceinture en cuir marron */}
          <linearGradient id="leatherBandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5C2E0B" />
            <stop offset="50%" stopColor="#8A4A1C" />
            <stop offset="100%" stopColor="#5C2E0B" />
          </linearGradient>

          {/* Dégradé or pour la boucle métallique */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F5B041" />
            <stop offset="100%" stopColor="#D35400" />
          </linearGradient>

          {/* Dégradé vert pour la feuille tropicale d'aventurier */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A2D149" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>

          {/* Ombre sous le chapeau */}
          <radialGradient id="hatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Ombre douce au sol / base */}
        <ellipse cx="50" cy="85" rx="35" ry="6" fill="url(#hatShadow)" />

        {/* Groupe principal chapeau */}
        <g className={styles.bodyGroup}>
          
          {/* 2. Feuille tropicale de baroudeur glissée dans la lanière */}
          <g
            className={styles.hatLeaf}
            style={{ transformOrigin: '32px 55px' }}
          >
            {/* Tige de la feuille */}
            <path
              d="M32 55 C28 45 28 35 34 25"
              stroke="#1B5E20"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Limbe de la feuille */}
            <path
              d="M34 25 C25 32 23 45 32 55 C37 45 41 32 34 25"
              fill="url(#leafGradient)"
              stroke="#1B5E20"
              strokeWidth="0.5"
            />
            {/* Nervure centrale */}
            <path
              d="M32 55 Q31 43 34 25"
              stroke="#81C784"
              strokeWidth="1"
              opacity="0.6"
              fill="none"
            />
          </g>

          {/* 3. La Calotte du Chapeau (le dôme supérieur) */}
          <path
            d="M30 60 C26 40 33 22 50 22 C67 22 74 40 70 60 Z"
            fill="url(#hatKhakiGradient)"
            stroke="#8E6A45"
            strokeWidth="1.5"
          />

          {/* Event de ventilation latérale gauche (oeillets métalliques) */}
          <circle cx="38" cy="45" r="2.5" fill="#5D4037" opacity="0.8" />
          <circle cx="38" cy="45" r="1.5" fill="#D7CCC8" />

          {/* Event de ventilation latérale droit */}
          <circle cx="62" cy="45" r="2.5" fill="#5D4037" opacity="0.8" />
          <circle cx="62" cy="45" r="1.5" fill="#D7CCC8" />

          {/* 4. Ceinture / Lanière en cuir marron entourant la calotte */}
          <path
            d="M29.5 54 C35 59 65 59 70.5 54 C71 58 70 61 69.5 61.5 C64 66 36 66 30.5 61.5 C30 61 29 58 29.5 54 Z"
            fill="url(#leatherBandGradient)"
            stroke="#3E2723"
            strokeWidth="0.75"
          />

          {/* 5. Boucle en or sur la lanière */}
          <rect
            x="46"
            y="56"
            width="8"
            height="9"
            rx="1.5"
            fill="url(#goldGradient)"
            stroke="#7F4F00"
            strokeWidth="1"
            className={styles.hatBuckle}
          />
          {/* Ardillon de la boucle */}
          <line x1="50" y1="56" x2="50" y2="65" stroke="#3E2723" strokeWidth="1.5" />
          {/* Trou de passage de la boucle */}
          <rect x="49" y="58" width="2" height="5" fill="#3E2723" rx="0.5" />

          {/* 6. Le Large Bord du Chapeau (Brim) */}
          {/* Bord arrière (pour effet 3D) */}
          <path
            d="M12 66 C12 60 88 60 88 66 C88 78 12 78 12 66 Z"
            fill="url(#brimEdgeGradient)"
            stroke="#8E6A45"
            strokeWidth="1"
          />
          {/* Bord avant principal */}
          <path
            d="M10 66 C10 58 90 58 90 66 C90 76 10 76 10 66 Z"
            fill="url(#hatKhakiGradient)"
            stroke="#8E6A45"
            strokeWidth="1.5"
          />

          {/* Coutures décoratives sur le bord extérieur */}
          <path
            d="M15 66 C15 62 85 62 85 66 C85 72 15 72 15 66"
            stroke="#B58D63"
            strokeWidth="0.75"
            strokeDasharray="2, 2"
            fill="none"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

export default ExplorerHatSVG;
