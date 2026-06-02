import React from 'react';
import styles from './SafariDecorations.module.css';
import { encyclopedia } from '../../data/topics';
import { LABELS } from '../../utils/labels';

export const EnvironmentDecor: React.FC = () => {
  const [staticDecor, setStaticDecor] = React.useState<{id: number, icon: string, top: string, left: string, delay: string}[]>([]);
  
  React.useEffect(() => {
    const decors = ['🌳', '🌿', '🪨', '🌵', '🌸', '🍃', '☁️'];
    // Liste fixe et épurée de coordonnées pour éviter les collisions avec la grille active et le panneau
    const fixedCoordinates = [
      { top: '3%', left: '32%' },
      { top: '5%', left: '88%' },
      { top: '15%', left: '94%' },
      { top: '45%', left: '95%' },
      { top: '78%', left: '92%' },
      { top: '88%', left: '33%' },
      { top: '92%', left: '62%' },
      { top: '85%', left: '80%' },
      { top: '28%', left: '26%' },
      { top: '58%', left: '28%' },
      { top: '88%', left: '25%' },
      { top: '12%', left: '45%' },
      { top: '2%', left: '72%' }
    ];
    
    const generated = fixedCoordinates.map((coord, i) => ({
      id: i,
      icon: decors[i % decors.length],
      top: coord.top,
      left: coord.left,
      delay: `${(i * 0.4) % 5}s`
    }));
    setStaticDecor(generated);
  }, []); 

  return (
    <div className={styles.environmentDecor}>
      {staticDecor.map((item) => (
        <span 
          key={item.id} 
          className={styles.decorItem}
          style={{ 
            top: item.top, 
            left: item.left,
            animationDelay: item.delay
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
};

export const ExplorersJournal: React.FC<{ inventory: string[] }> = ({ inventory }) => {
  return (
    <div className={styles.journalContainer}>
      <h3 className={styles.journalTitle}>{LABELS.safari.journalTitle}</h3>
      <div className={styles.inventoryList}>
        {inventory.length === 0 && <p className={styles.emptyJournal}>{LABELS.safari.emptyJournal}</p>}
        {inventory.map((id, index) => {
          const topic = encyclopedia.find(t => t.id === id);
          const rotation = (index % 2 === 0 ? 1 : -1) * 5;
          return (
            <div 
              key={id} 
              className={styles.photoFrame}
              style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
            >
              <div className={styles.photoIcon}>
                {topic?.icon || '🐾'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
