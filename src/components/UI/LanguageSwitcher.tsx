import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProfileStore } from '../../store/useProfileStore';
import type { SupportedLanguage } from '../../locales';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const language = useSettingsStore((state) => state.language);
  const setStoreLanguage = useSettingsStore((state) => state.setLanguage);
  const activeProfile = useProfileStore(state => state.activeProfile);
  const updateProfile = useProfileStore(state => state.updateProfile);

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (code: SupportedLanguage) => {
    setStoreLanguage(code, (newLang) => {
      if (activeProfile) {
        updateProfile(activeProfile.id, { language: newLang });
      }
    });
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.langButton} ${language === lang.code ? styles.active : ''}`}
          onClick={() => handleLanguageChange(lang.code)}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.label}>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};
