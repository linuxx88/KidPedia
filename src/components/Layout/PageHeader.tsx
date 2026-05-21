import React from 'react';
import BackButton from '../UI/BackButton';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  icon?: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  icon, 
  onBack, 
  rightElement,
  className = ""
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.navSection}>
        <BackButton onClick={onBack} />
      </div>
      
      <div className={styles.titleSection}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.rightSection}>
        {rightElement}
      </div>
    </header>
  );
};
