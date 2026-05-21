import React, { useState } from 'react';
import { type Profile } from '../../store/useProfileStore';
import { type Labels, type SupportedLanguage } from '../../locales/types';
import { heroAssets } from '../../assets/hero';
import { AppButton } from '../UI/AppButton';
import { LanguageSwitcher } from '../UI/LanguageSwitcher';
import { AvatarDisplay } from '../UI/AvatarDisplay';
import styles from './ProfileSelection.module.css';

interface ProfileSelectionProps {
  profiles: Profile[];
  isFirstVisit: boolean;
  labels: Labels;
  language: SupportedLanguage;
  onAddProfile: (name: string, avatar: string, gender: 'boy' | 'girl', lang: SupportedLanguage) => void;
  onSelectProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
  onClose?: () => void;
}

/**
 * Composant ProfileSelection (Dumb)
 * Gère l'affichage de la création et de la sélection de profil.
 * La logique de persistance est déléguée au parent (Store).
 */
export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ 
  profiles,
  isFirstVisit,
  labels,
  language,
  onAddProfile,
  onSelectProfile,
  onDeleteProfile,
  onClose
}) => {
  const [isCreating, setIsCreating] = useState(isFirstVisit);
  
  // Form state (UI local)
  const [name, setName] = useState('');
  const [selectedGender, setSelectedGender] = useState<'boy' | 'girl'>('boy');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = selectedGender === 'boy' ? heroAssets.boy : heroAssets.girl;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // On passe la version WebP comme avatar principal, 
    // AvatarDisplay s'occupera de la résolution du fallback.
    onAddProfile(name, avatars[selectedAvatar].webp, selectedGender, language);
    setIsCreating(false);
    if (onClose) onClose();
  };

  const handleSelect = (id: string) => {
    onSelectProfile(id);
    if (onClose) onClose();
  };

  return (
    <div className={styles.overlay} data-testid="profile-overlay">
      {isCreating ? (
        <form 
          className={`${styles.form} ${styles.fadeIn}`} 
          onSubmit={handleCreate}
        >
          <h2 className={styles.title} data-testid="main-title">{labels.profiles.createTitle}</h2>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>{labels.profiles.namePlaceholder}</label>
            <input 
              className={styles.input}
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder={labels.profiles.namePlaceholder}
              data-testid="profile-name-input"
              required
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{labels.profiles.chooseGender}</label>
            <div className={styles.genderPicker}>
              {(['boy', 'girl'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`${styles.genderOption} ${selectedGender === g ? styles.genderOptionActive : ''}`}
                  onClick={() => {
                    setSelectedGender(g);
                    setSelectedAvatar(0);
                  }}
                >
                  <span className={styles.genderIcon}>
                    {g === 'boy' ? '👦' : '👧'}
                  </span>
                  <span className={styles.genderLabel}>
                    {g === 'boy' ? labels.nav.modeBoy : labels.nav.modeGirl}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{labels.profiles.chooseAvatar}</label>
            <div className={styles.avatarPicker}>
              {avatars.map((av, idx) => (
                <div
                  key={idx}
                  className={`${styles.avatarOption} ${selectedAvatar === idx ? styles.avatarOptionActive : ''}`}
                  onClick={() => setSelectedAvatar(idx)}
                >
                  <AvatarDisplay avatar={av.webp} size="small" />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Langue / Language</label>
            <LanguageSwitcher />
          </div>

          <div className={styles.actions}>
            {!isFirstVisit && (
              <AppButton 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreating(false)}
                className={styles.backBtn}
              >
                {labels.profiles.backToSelection}
              </AppButton>
            )}
            <AppButton type="submit" variant="primary">
              {labels.profiles.createBtn}
            </AppButton>
          </div>
        </form>
      ) : (
        <div className={`${styles.selectionContainer} ${styles.fadeIn}`}>
          <h2 className={styles.title} data-testid="main-title">
            {labels.profiles.title}
          </h2>

          <LanguageSwitcher className={styles.selectionSwitcher} />
          
          <div className={styles.profileGrid}>
            {profiles.map((profile, idx) => (
              <div 
                key={profile.id} 
                className={`${styles.profileCard} ${styles.staggerItem}`}
                style={{ '--index': idx } as React.CSSProperties}
                onClick={() => handleSelect(profile.id)}
                data-testid={`profile-card-${profile.name}`}
              >
                <button 
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(labels.profiles.deleteConfirm)) {
                      onDeleteProfile(profile.id);
                    }
                  }}
                  title={labels.profiles.deleteBtn}
                >
                  🗑️
                </button>
                <div className={styles.avatarWrapper}>
                  <AvatarDisplay 
                    avatar={profile.avatar} 
                    name={profile.name} 
                    size="medium" 
                  />
                </div>
                <span className={styles.profileName}>{profile.name}</span>
              </div>
            ))}
            
            <div 
              className={`${styles.addBtn} ${styles.staggerItem}`}
              style={{ '--index': profiles.length } as React.CSSProperties}
              onClick={() => setIsCreating(true)}
            >
              <div className={styles.addIconWrapper}>
                <span className={styles.addIcon}>➕</span>
              </div>
              <span className={styles.addText}>{labels.profiles.addProfile}</span>
            </div>
          </div>
          
          {!isFirstVisit && onClose && (
            <div className={styles.fadeIn} style={{ marginTop: '3rem', animationDelay: '0.4s' }}>
              <AppButton variant="outline" onClick={onClose}>
                {labels.common.close}
              </AppButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
