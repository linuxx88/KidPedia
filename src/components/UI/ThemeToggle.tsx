import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useSettingsStore();

  return (
    <button 
      className={styles.toggleBtn}
      onClick={() => toggleTheme()}
      aria-label="Toggle theme"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};
