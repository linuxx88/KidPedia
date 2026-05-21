import React from 'react';
import styles from './SafariDecorations.module.css';
import { encyclopedia } from '../../data/topics';
import { LABELS } from '../../utils/labels';

export const EnvironmentDecor: React.FC = () => {
  const [staticDecor, setStaticDecor] = React.useState<{id: number, icon: string, top: string, left: string, delay: string}[]>([]);
  
  React.useEffect(() => {
    const decors = ['🌳', '🌿', '🪨', '🌵', '🌸', '🍃', '☁️'];
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      icon: decors[Math.floor(Math.random() * decors.length)],
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      delay: `${Math.random() * 5}s`
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
