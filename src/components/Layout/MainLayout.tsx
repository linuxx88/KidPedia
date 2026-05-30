import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StarBackground } from './StarBackground'
import { AnimatedBackground } from './AnimatedBackground'
import { SearchBar } from '../Discovery/SearchBar'
import { ProfileSelection } from '../Profile/ProfileSelection'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProfileStore } from '../../store/useProfileStore'
import { useEnvironmentStore } from '../../store/useEnvironmentStore'
import AppIcon from '../UI/AppIcon'
import { AppGradients } from '../UI/AppGradients'
import { AvatarDisplay } from '../UI/AvatarDisplay'
import { MuteToggle } from '../UI/MuteToggle'
import { useProgressionStore } from '../../store/useProgressionStore'

import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: React.ReactNode
  isDarkMode: boolean
  toggleTheme: () => void
  gender: 'boy' | 'girl'
  toggleGender: () => void
  search: string
  setSearch: (value: string) => void
  onClearSearch: () => void
  onOpenParents: () => void
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isDarkMode,
  toggleTheme,
  gender,
  toggleGender,
  search,
  setSearch,
  onClearSearch,
  onOpenParents,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const { playerName, avatar } = usePlayerStore()
  const equippedAccessoryId = useProgressionStore(state => state.getEquippedAccessoryId())
  const equippedCompanionId = useProgressionStore(state => state.getEquippedCompanionId())
  
  const labels = useSettingsStore(state => state.labels)
  const language = useSettingsStore(state => state.language)
  
  const currentSeason = useEnvironmentStore(state => state.currentSeason)
  
  const profiles = useProfileStore(state => state.profiles)
  const isFirstVisit = useProfileStore(state => state.isFirstVisit)
  const addProfile = useProfileStore(state => state.addProfile)
  const selectProfile = useProfileStore(state => state.selectProfile)
  const deleteProfile = useProfileStore(state => state.deleteProfile)

  const [showProfileSelection, setShowProfileSelection] = useState(false)

  // Déterminer si on est dans une expérience immersive (pas de header global)
  const isImmersive = ['/safari', '/nature', '/origins', '/map', '/topic', '/lifecircle'].some(path => 
    location.pathname.startsWith(path)
  )

  return (
    <div className={`${styles.appContainer} season-${currentSeason}`}>
      <AppGradients />
      <AnimatedBackground />
      <StarBackground />

      {showProfileSelection && (
        <ProfileSelection 
          profiles={profiles}
          isFirstVisit={isFirstVisit}
          labels={labels}
          language={language}
          onAddProfile={addProfile}
          onSelectProfile={selectProfile}
          onDeleteProfile={deleteProfile}
          onClose={() => setShowProfileSelection(false)} 
        />
      )}

      {!isImmersive && (
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
            {/* Logo Minimaliste */}
            <div
              className={styles.logoContainer}
              onClick={() => navigate('/')}
              data-testid="logo-link"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/')
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={labels.nav.logo}
            >
              <span className={styles.logoText}>{labels.nav.logo}</span>
              <AppIcon name="rocket" size="medium" className={styles.logoRocket} />
            </div>

            {/* Barre de recherche globale */}
            <div className={styles.headerSearchWrapper}>
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={onClearSearch}
                placeholder={labels.home.searchPlaceholder}
                clearLabel={labels.home.clearSearch}
                isCompact={true}
              />
            </div>

            {/* Actions Minimalistes */}
            <div className={styles.headerActions}>
              <button
                className={styles.headerBtn}
                onClick={onOpenParents}
                aria-label="Zone Parents"
                title="Zone Parents"
                data-testid="header-parents-btn"
              >
                🔐
              </button>

              <button
                className={styles.headerBtn}
                onClick={() => setShowProfileSelection(true)}
                aria-label={labels.profiles.title}
                title={labels.profiles.title}
                data-testid="header-profile-btn"
              >
                {playerName ? (
                  <AvatarDisplay 
                    avatar={avatar} 
                    name={playerName}
                    accessoryId={equippedAccessoryId} 
                    companionId={equippedCompanionId}
                    size="small" 
                  />
                ) : (
                  '👥'
                )}
              </button>

              <button
                className={styles.headerBtn}
                onClick={toggleGender}
                aria-label={gender === 'boy' ? labels.nav.switchToGirl : labels.nav.switchToBoy}
                title={gender === 'boy' ? labels.nav.switchToGirl : labels.nav.switchToBoy}
                data-testid="header-gender-btn"
              >
                {gender === 'boy' ? '👦' : '👧'}
              </button>

              <button
                className={styles.headerBtn}
                onClick={toggleTheme}
                aria-label={isDarkMode ? labels.nav.themeDay : labels.nav.themeSpace}
                title={isDarkMode ? labels.nav.themeDay : labels.nav.themeSpace}
                data-testid="header-theme-btn"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <MuteToggle />
            </div>
          </nav>
        </header>
      )}

      <main className={`${styles.mainContent} ${isImmersive ? styles.immersiveContent : ''}`}>
        {children}
        {!isImmersive && (
          <footer className={styles.footer}>
            {labels.footer.copyright}
          </footer>
        )}
      </main>
    </div>
  )
}
