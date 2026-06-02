import React from 'react';
import { type Labels } from '../../../../locales/types';
import timerStyles from './ChampionshipTimer.module.css';

interface ChampionshipTimerProps {
  secondsRemaining: number;
  labels: Labels;
}

export const ChampionshipTimer: React.FC<ChampionshipTimerProps> = ({
  secondsRemaining,
  labels,
}) => {
  const isWarningTime = secondsRemaining <= 5;

  return (
    <div className={timerStyles.timerWrapper}>
      <span className={timerStyles.timerLabel}>{labels.championship.timeRemaining}</span>
      <svg viewBox="0 0 300 40" className={timerStyles.matchstickSvg} aria-hidden="true">
        {/* The wood stick */}
        <rect x="0" y="16" width="100" height="8" rx="2" fill="#d7ccc8" />
        {/* The unburned wick (black / grey line) */}
        <path d="M 100 20 L 280 20" stroke="#757575" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,3" />
        {/* The burning wick line (red/orange) based on remaining time */}
        <path 
          d={`M 100 20 L ${100 + (180 * (secondsRemaining / 15))} 20`} 
          stroke="#ff5722" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        {/* The flame at the junction */}
        {secondsRemaining > 0 && (
          <g transform={`translate(${100 + (180 * (secondsRemaining / 15))}, 20)`}>
            <circle r="12" fill="#ffeb3b" opacity="0.6" className={timerStyles.flameGlow} />
            <text x="-10" y="7" fontSize="20" className={timerStyles.flameEmoji}>🔥</text>
          </g>
        )}
      </svg>
      <span className={`${timerStyles.secondsCount} ${isWarningTime ? timerStyles.secondsWarning : ''}`}>
        {secondsRemaining === 0 ? labels.championship.timesUp : `${secondsRemaining}s`}
      </span>
    </div>
  );
};
