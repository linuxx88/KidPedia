import React from 'react';
import styles from './SafariBoard.module.css';
import decorStyles from './SafariDecorations.module.css';
import { safariMap } from '../../data/gameData';
import type { SafariCell } from '../../data/gameData';
import { encyclopedia } from '../../data/topics';
import { AvatarDisplay } from '../UI/AvatarDisplay';

// Helper pour trouver l'icône du sujet lié
const getSubjectIcon = (subjectId?: string) => {
  if (!subjectId) return null;
  const topic = encyclopedia.find(t => t.id === subjectId);
  return topic?.icon || '❓';
};

interface HexCellProps {
  id: number
  type: string
  icon: string
  effect?: number
  isPlayerHere: boolean
  gender: 'boy' | 'girl'
  playerAvatar?: string
  playerName?: string
  accessoryId?: string | null
  companionId?: string | null
}

const HexCell: React.FC<HexCellProps> = ({ 
  id, 
  type, 
  icon, 
  effect, 
  isPlayerHere, 
  gender,
  playerAvatar,
  playerName,
  accessoryId,
  companionId
}) => {
  return (
    <div className={styles.hexWrapper} data-hex-id={id}>
      <div className={`${styles.hexContent} ${styles[type]}`}>
        <span className={styles.idBadge}>{id}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
        
      {effect !== undefined && effect !== 0 && (
        <span className={`${styles.effectBadge} ${effect > 0 ? styles.effectPlus : styles.effectMinus}`}>
          {effect > 0 ? `+${effect}` : effect}
        </span>
      )}

      {isPlayerHere && (
        <div className={`${styles.playerPawn} ${styles.pawnJump}`}>
          {playerAvatar ? (
            <AvatarDisplay 
              avatar={playerAvatar} 
              name={playerName} 
              accessoryId={accessoryId}
              companionId={companionId}
              size="small" 
            />
          ) : (
            <span className={styles.pawnIcon}>{gender === 'girl' ? '👧' : '👦'}</span>
          )}
          <div className={`${styles.pawnShadow} ${styles.shadowPulse}`}></div>
        </div>
      )}
    </div>
  );
};

export const SafariBoard: React.FC<{ 
  playerPosition: number; 
  gender: 'boy' | 'girl';
  playerAvatar?: string;
  playerName?: string;
  accessoryId?: string | null;
  companionId?: string | null;
}> = ({ 
  playerPosition, 
  gender, 
  playerAvatar, 
  playerName, 
  accessoryId,
  companionId
}) => {
  const [cellsPerRow, setCellsPerRow] = React.useState(4);
  const [pathData, setPathData] = React.useState<string>("");
  const boardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      
      if (isPortrait) {
        setCellsPerRow(2);
      } else if (width < 1024) {
        setCellsPerRow(3);
      } else {
        setCellsPerRow(4);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  React.useEffect(() => {
    const calculatePath = () => {
      if (!boardRef.current) return;
      
      const rows = boardRef.current.querySelectorAll('.row');
      if (rows.length === 0) return;

      const pointsMap: Record<number, { x: number, y: number }> = {};

      rows.forEach((row) => {
        const hexes = row.querySelectorAll('[data-hex-id]');
        hexes.forEach((hex) => {
          const rect = hex.getBoundingClientRect();
          const boardRect = boardRef.current!.getBoundingClientRect();
          const idAttr = hex.getAttribute('data-hex-id');
          if (idAttr !== null) {
            const id = parseInt(idAttr, 10);
            pointsMap[id] = {
              x: rect.left - boardRect.left + rect.width / 2,
              y: rect.top - boardRect.top + rect.height / 2
            };
          }
        });
      });
      
      const sortedPoints: { x: number, y: number }[] = [];
      const totalCells = safariMap.length;
      for (let i = 0; i < totalCells; i++) {
        if (pointsMap[i] !== undefined) {
          sortedPoints.push(pointsMap[i]);
        }
      }
      
      const d = sortedPoints.reduce((acc, p, i) => 
        i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
      
      setPathData(d);
    };

    // Use ResizeObserver for more reliable layout tracking
    const observer = new ResizeObserver(calculatePath);
    if (boardRef.current) observer.observe(boardRef.current);
    
    // Initial call
    calculatePath();

    return () => observer.disconnect();
  }, [cellsPerRow]);

  const rows: SafariCell[][] = [];
  for (let i = 0; i < safariMap.length; i += cellsPerRow) {
    const row = safariMap.slice(i, i + cellsPerRow);
    const rowIndex = Math.floor(i / cellsPerRow);
    if (rowIndex % 2 !== 0) {
      row.reverse();
    }
    rows.push(row);
  }

  return (
    <div className={styles.boardContainer} ref={boardRef}>
      <svg className={decorStyles.pathSVG}>
        <path 
          d={pathData} 
          className={`${decorStyles.pathLine} ${styles.drawPath}`}
        />
      </svg>
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`${styles.row} ${rowIndex % 2 !== 0 ? styles.rowEven : ''}`}
        >
          {row.map((cell) => {
            const icon = cell.type === 'start' ? '🏁' : 
                         cell.type === 'end' ? '🏆' : 
                         cell.icon || getSubjectIcon(cell.subjectId) || '📍';
            return (
              <HexCell 
                key={cell.id} 
                id={cell.id}
                type={cell.type}
                icon={icon}
                effect={cell.effect}
                isPlayerHere={cell.id === playerPosition}
                gender={gender}
                playerAvatar={playerAvatar}
                playerName={playerName}
                accessoryId={accessoryId}
                companionId={companionId}
              />
            )
          })}
        </div>
      ))}
    </div>
  );
};
