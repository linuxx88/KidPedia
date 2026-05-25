import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { encyclopedia } from '../../data/topics';
import { PageHeader } from '../../components/Layout/PageHeader';
import { AppButton } from '../../components/UI/AppButton';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import styles from './ParentsDashboard.module.css';

/**
 * ParentsDashboard - Vue dédiée aux parents pour le suivi de la progression.
 */
export const ParentsDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const profiles = useProfileStore(state => state.profiles);
  const progressions = useProgressionStore(state => state.progressions);
  const labels = useSettingsStore(state => state.labels);
  const t = labels.parents;

  const isMusicMuted = useSettingsStore(state => state.isMusicMuted);
  const isSfxMuted = useSettingsStore(state => state.isSfxMuted);
  const toggleMusicMute = useSettingsStore(state => state.toggleMusicMute);
  const toggleSfxMute = useSettingsStore(state => state.toggleSfxMute);

  const totalTopics = encyclopedia.length;

  return (
    <div className={styles.container}>
      <PageHeader 
        title={t.dashboardTitle} 
        icon="📊" 
        onBack={onBack} 
      />

      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>👨‍👩‍👧‍👦{t.explorersSection}</h3>
          
          <div className={styles.profilesGrid}>
            {profiles.map(profile => {
              const prog = progressions[profile.id] || { totalXP: 0, badges: [] };
              const completion = Math.round((prog.badges.length / totalTopics) * 100);

              return (
                <div key={profile.id} className={styles.profileCard}>
                  <div className={styles.profileHeader}>
                    <AvatarDisplay avatar={profile.avatar} name={profile.name} size="medium" />
                    <div className={styles.profileInfo}>
                      <h4 className={styles.profileName}>{profile.name}</h4>
                      <p className={styles.profileStats}>
                        {prog.totalXP} XP • {prog.badges.length} {labels.home.medals.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className={styles.progressWrapper}>
                    <div className={styles.progressHeader}>
                      <span>{t.discoveryTitle}</span>
                      <span>{completion}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${completion}%` }} />
                    </div>
                  </div>

                  <div className={styles.profileActions}>
                    <AppButton 
                      variant="outline" 
                      className={styles.resetBtn}
                      onClick={() => {
                        if (window.confirm(t.confirmReset(profile.name))) {
                          useProgressionStore.getState().clearBadges(profile.id);
                        }
                      }}
                    >
                      {t.resetBtn}
                    </AppButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🎛️ Audio Settings Section */}
        <section className={styles.section} style={{ marginTop: '2rem' }}>
          <h3 className={styles.sectionTitle}>{t.audioSettingsTitle}</h3>
          
          <div className={styles.audioSettingsGrid}>
            <div className={styles.audioRow}>
              <div className={styles.audioLabel}>
                <span className={styles.audioTitle}>🎵 {labels.refuge.title.includes('Refuge') ? 'Musique d\'ambiance' : 'Background Music'}</span>
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
                <span className={styles.audioTitle}>🔊 {labels.refuge.title.includes('Refuge') ? 'Effets Sonores (SFX)' : 'Sound Effects (SFX)'}</span>
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
        </section>

        <section className={styles.section} style={{ marginTop: '2rem' }}>
          <h3 className={styles.sectionTitle}>🛠️{t.devSectionTitle}</h3>
          <p style={{ color: 'var(--color-app-text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
            {t.devSectionDesc}
          </p>
          <AppButton onClick={() => navigate('/parents/flow')}>
            🗺️{t.devSectionBtn}
          </AppButton>
        </section>

        <section className={styles.infoBox} style={{ marginTop: '2rem' }}>
          <h4>💡{t.whyTitle}</h4>
          <p>
            {t.whyText}
          </p>
        </section>
      </div>
    </div>
  );
};

