import { Suspense } from 'react'
import { AppLoader } from './components/UI/AppLoader'
import { MainLayout } from './components/Layout/MainLayout'
import { useSettingsStore } from './store/useSettingsStore'

import { ProfileSelection } from './features/profile'
import { ToastContainer } from './components/UI/Toast/ToastContainer'
import { ProgressionListener } from './components/Layout/ProgressionListener'
import { ParentalGate } from './features/parents'

import { PWAPrompt } from './components/UI/PWAPrompt'
import ScrollToTop from './components/UI/ScrollToTop'
import { StorytellerProvider } from './hooks/useStoryteller'
import { useAppInit } from './hooks/useAppInit'
import { AppRoutes } from './routes/AppRoutes'
import styles from './App.module.css'

// Un petit composant de chargement simple et rapide
const LoadingFallback = () => {
  const labels = useSettingsStore(state => state.labels)
  return (
    <div className={styles.loadingContainer}>
      {labels.common.loading}
    </div>
  )
}

export function App() {
  const {
    hydrated,
    labels,
    isDarkMode,
    gender,
    language,
    activeProfileId,
    isFirstVisit,
    profiles,
    addProfile,
    selectProfile,
    deleteProfile,
    search,
    setSearch,
    resetSearch,
    topicsData,
    showParentalGate,
    setShowParentalGate,
    openParentsZone,
    handleParentalSuccess,
    handleToggleTheme,
    handleToggleGender,
    handleGoHome,
    isParentalUnlocked,
    setIsParentalUnlocked,
  } = useAppInit()

  if (!hydrated) {
    return <AppLoader />
  }

  return (
    <StorytellerProvider>
      <MainLayout
        isDarkMode={isDarkMode}
        toggleTheme={handleToggleTheme}
        gender={gender}
        toggleGender={handleToggleGender}
        search={search}
        setSearch={setSearch}
        onClearSearch={resetSearch}
        onOpenParents={openParentsZone}
      >
        <ScrollToTop />
        <ToastContainer />
        <ProgressionListener />

        {showParentalGate && (
          <ParentalGate 
            onSuccess={handleParentalSuccess}
            onCancel={() => setShowParentalGate(false)}
          />
        )}

        {(isFirstVisit || !activeProfileId) && (
          <ProfileSelection 
            profiles={profiles}
            isFirstVisit={isFirstVisit}
            labels={labels}
            language={language}
            onAddProfile={addProfile}
            onSelectProfile={selectProfile}
            onDeleteProfile={deleteProfile}
          />
        )}

        <Suspense fallback={<LoadingFallback />}>
          <AppRoutes 
            topicsData={topicsData} 
            labels={labels} 
            handleGoHome={handleGoHome}
            isParentalUnlocked={isParentalUnlocked}
            setIsParentalUnlocked={setIsParentalUnlocked}
          />
        </Suspense>
        <PWAPrompt />
      </MainLayout>
    </StorytellerProvider>
  )
}
