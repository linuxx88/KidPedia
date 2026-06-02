import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import { AppButton } from '../../components/UI/AppButton';
import styles from './ControlTab.module.css';

interface ControlTabProps {
  activeProfile: { id: string; name: string; avatar: string };
  language: 'fr' | 'en';
  onProfileDeleted: () => void;
}

export const ControlTab: React.FC<ControlTabProps> = ({ activeProfile, language, onProfileDeleted }) => {
  const labels = useSettingsStore(state => state.labels);
  const t = labels.parents;

  const isMusicMuted = useSettingsStore(state => state.isMusicMuted);
  const isSfxMuted = useSettingsStore(state => state.isSfxMuted);
  const toggleMusicMute = useSettingsStore(state => state.toggleMusicMute);
  const toggleSfxMute = useSettingsStore(state => state.toggleSfxMute);

  const [screentimeLimit, setScreentimeLimit] = useState<number>(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [isActionPending, setIsActionPending] = useState(false);

  const currentProfileId = activeProfile.id;

  useEffect(() => {
    const saved = localStorage.getItem(`kp-screentime-limit-${currentProfileId}`);
    const limit = saved ? parseInt(saved, 10) : 0;
    Promise.resolve().then(() => {
      setScreentimeLimit(limit);
    });
  }, [currentProfileId]);

  const handleScreentimeChange = (val: number) => {
    setScreentimeLimit(val);
    localStorage.setItem(`kp-screentime-limit-${currentProfileId}`, val.toString());
  };

  const handleStartEditName = () => {
    setEditNameValue(activeProfile.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editNameValue.trim()) {
      useProfileStore.getState().updateProfile(activeProfile.id, { name: editNameValue.trim() });
      setIsEditingName(false);
    }
  };

  return (
    <div className={styles.tabContent}>
      {/* Screen Time Limit Card */}
      <div className={styles.settingsCard}>
        <h3 className={styles.sectionTitle}>⏱️ {language === 'fr' ? 'Limite de Temps de Jeu' : 'Play Screen Time Limit'}</h3>
        <p className={styles.settingDesc}>
          {language === 'fr' 
            ? 'Définissez une limite quotidienne pour encourager une saine utilisation des écrans. KidPedia se verrouillera automatiquement une fois le temps écoulé.' 
            : 'Set a daily play time limit to encourage healthy screen usage. KidPedia will lock automatically once the time is up.'}
        </p>
        
        <div className={styles.screentimeOptions}>
          {[0, 15, 30, 45, 60].map(mins => (
            <button
              key={mins}
              className={`${styles.screentimeBtn} ${screentimeLimit === mins ? styles.screentimeBtnActive : ''}`}
              onClick={() => handleScreentimeChange(mins)}
            >
              {mins === 0 
                ? (language === 'fr' ? 'Illimité ♾️' : 'Unlimited ♾️') 
                : `${mins} min`}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Settings */}
      <div className={styles.settingsCard}>
        <h3 className={styles.sectionTitle}>🎛️ {t.audioSettingsTitle}</h3>
        <div className={styles.audioSettingsGrid}>
          <div className={styles.audioRow}>
            <div className={styles.audioLabel}>
              <span className={styles.audioTitle}>🎵 {language === 'fr' ? 'Musique d\'ambiance' : 'Background Music'}</span>
              <span className={styles.audioDesc}>{t.musicMute}</span>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={isMusicMuted} 
                onChange={toggleMusicMute}
                aria-label={t.musicMute}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.audioRow}>
            <div className={styles.audioLabel}>
              <span className={styles.audioTitle}>🔊 {language === 'fr' ? 'Effets Sonores (SFX)' : 'Sound Effects (SFX)'}</span>
              <span className={styles.audioDesc}>{t.sfxMute}</span>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={isSfxMuted} 
                onChange={toggleSfxMute}
                aria-label={t.sfxMute}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/* Manage Profile & Actions */}
      <div className={styles.settingsCard}>
        <h3 className={styles.sectionTitle}>👤 {language === 'fr' ? 'Gestion du Profil' : 'Profile Management'}</h3>
        
        <div className={styles.profileManageArea}>
          <div className={styles.profileIdentityRow}>
            <AvatarDisplay avatar={activeProfile.avatar} name={activeProfile.name} size="medium" />
            
            {isEditingName ? (
              <div className={styles.editNameInputWrapper}>
                <input
                  type="text"
                  value={editNameValue}
                  onChange={(e) => setEditNameValue(e.target.value)}
                  className={styles.editNameInput}
                  maxLength={15}
                  placeholder={language === 'fr' ? 'Nouveau nom...' : 'New name...'}
                  autoFocus
                />
                <div className={styles.editNameActions}>
                  <AppButton onClick={handleSaveName} className={styles.saveNameBtn}>
                    {language === 'fr' ? 'Enregistrer' : 'Save'}
                  </AppButton>
                  <AppButton variant="outline" onClick={() => setIsEditingName(false)}>
                    {language === 'fr' ? 'Annuler' : 'Cancel'}
                  </AppButton>
                </div>
              </div>
            ) : (
              <div className={styles.profileNameDisplayWrapper}>
                <h4 className={styles.profileNameDisplay}>{activeProfile.name}</h4>
                <AppButton variant="outline" onClick={handleStartEditName} className={styles.editNameBtn}>
                  ✏️ {language === 'fr' ? 'Renommer' : 'Rename'}
                </AppButton>
              </div>
            )}
          </div>

          <div className={styles.dangerActionsRow}>
            <AppButton 
              variant="outline" 
              className={styles.resetBtn}
              onClick={() => {
                if (isActionPending) return;
                setIsActionPending(true);
                try {
                  if (window.confirm(t.confirmReset(activeProfile.name))) {
                    useProgressionStore.getState().clearBadges(activeProfile.id);
                  }
                } finally {
                  setIsActionPending(false);
                }
              }}
              disabled={isActionPending}
            >
              🗑️ {language === 'fr' ? 'Réinitialiser la progression' : 'Reset progression'}
            </AppButton>
            
            <AppButton 
              variant="outline" 
              className={styles.deleteBtn}
              onClick={() => {
                if (isActionPending) return;
                setIsActionPending(true);
                try {
                  if (window.confirm(language === 'fr' ? `Voulez-vous vraiment supprimer le profil de ${activeProfile.name} ? Cette action effacera définitivement toutes ses données.` : `Do you really want to delete ${activeProfile.name}'s profile? This action will permanently erase all data.`)) {
                    useProfileStore.getState().deleteProfile(activeProfile.id);
                    onProfileDeleted();
                  }
                } finally {
                  setIsActionPending(false);
                }
              }}
              disabled={isActionPending}
            >
              🚨 {language === 'fr' ? 'Supprimer le profil' : 'Delete profile'}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};
