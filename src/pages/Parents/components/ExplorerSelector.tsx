import React from 'react';
import { AvatarDisplay } from '../../../components/UI/AvatarDisplay';
import styles from './ExplorerSelector.module.css';

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

interface ExplorerSelectorProps {
  profiles: Profile[];
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string) => void;
  language: 'fr' | 'en';
}

export const ExplorerSelector: React.FC<ExplorerSelectorProps> = ({
  profiles,
  selectedProfileId,
  setSelectedProfileId,
  language,
}) => {
  if (profiles.length === 0) return null;

  return (
    <div className={styles.profileSelectorCard}>
      <span className={styles.selectorLabel}>
        {language === 'fr' ? 'Sélectionner un explorateur :' : 'Select an explorer:'}
      </span>
      <div className={styles.profileSelectorList}>
        {profiles.map(p => (
          <button
            key={p.id}
            className={`${styles.profileSelectorBtn} ${selectedProfileId === p.id ? styles.profileSelectorBtnActive : ''}`}
            onClick={() => setSelectedProfileId(p.id)}
          >
            <AvatarDisplay avatar={p.avatar} name={p.name} size="small" />
            <span className={styles.selectorBtnName}>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
