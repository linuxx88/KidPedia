import React from 'react';
import BackButton from '../UI/BackButton';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  icon?: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent';
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  icon, 
  onBack, 
  rightElement,
  className = "",
  variant = 'default'
}) => {
  return (
    <header className={`${styles.header} ${variant === 'transparent' ? styles.transparent : ''} ${className}`}>
      <div className={styles.navSection}>
        <BackButton onClick={onBack} className={styles.headerBackButton} />
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
