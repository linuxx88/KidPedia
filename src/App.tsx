import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { AppButton } from './components/UI/AppButton'
import { MainLayout } from './components/Layout/MainLayout'
import { encyclopedia } from './data/topics'
import { mapData } from './data/mapData'
import { useSettingsStore } from './store/useSettingsStore'
import { useProfileStore } from './store/useProfileStore'
import { useDiscoveryStore } from './store/useDiscoveryStore'

import { ProfileSelection } from './components/Profile/ProfileSelection'
import { ToastContainer } from './components/UI/Toast/ToastContainer'
import { ProgressionListener } from './components/Layout/ProgressionListener'
import { ParentalGate } from './components/UI/ParentalGate'

// Import direct de la page d'accueil (pas de lazy load car route par défaut)
import { HomePage } from './pages/Home'

// Lazy Loading des pages et composants lourds
const TopicPage = lazy(() =>
  import('./pages/Topic').then((module) => ({ default: module.TopicPage })),
)
const LifeCirclePage = lazy(() =>
  import('./pages/LifeCircle/LifeCirclePage').then((module) => ({ default: module.LifeCirclePage })),
)
const BadgesPage = lazy(() =>
  import('./components/Profile/BadgesPage').then((module) => ({ default: module.BadgesPage })),
)
const ParentsDashboard = lazy(() =>
  import('./pages/Parents/ParentsDashboard').then((module) => ({ default: module.ParentsDashboard })),
)
const TreasureMap = lazy(() =>
  import('./components/Game/TreasureMap').then((module) => ({ default: module.TreasureMap })),
)
const OriginsLayout = lazy(() =>
  import('./pages/Origins/OriginsLayout').then((module) => ({ default: module.OriginsLayout })),
)
const OriginsList = lazy(() =>
  import('./pages/Origins/OriginsList').then((module) => ({ default: module.OriginsList })),
)
const OriginsDetail = lazy(() =>
  import('./pages/Origins/OriginsDetail').then((module) => ({ default: module.OriginsDetail })),
)
const MissionSafari = lazy(() =>
  import('./components/Game/MissionSafari').then((module) => ({ default: module.MissionSafari })),
);
const ExplorerGallery = lazy(() =>
  import('./components/Profile/ExplorerGallery').then((module) => ({ default: module.ExplorerGallery })),
);
const GiftsPage = lazy(() =>
  import('./components/Learning/ExplorerGallery/GiftsPage').then((module) => ({ default: module.GiftsPage })),
);
const FlowDashboard = lazy(() =>
  import('./pages/Parents/FlowDashboard').then((module) => ({ default: module.FlowDashboard })),
);

import { PWAPrompt } from './components/UI/PWAPrompt'
import ScrollToTop from './components/UI/ScrollToTop'
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
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showParentalGate, setShowParentalGate] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  
  const labels = useSettingsStore(state => state.labels)
  const isDarkMode = useSettingsStore(state => state.isDarkMode)
  const toggleTheme = useSettingsStore(state => state.toggleTheme)
  const gender = useSettingsStore(state => state.gender)
  const language = useSettingsStore(state => state.language)
  const toggleGender = useSettingsStore(state => state.toggleGender)

  const activeProfileId = useProfileStore(state => state.activeProfileId)
  const isFirstVisit = useProfileStore(state => state.isFirstVisit)
  const updateProfile = useProfileStore(state => state.updateProfile)
  const profiles = useProfileStore(state => state.profiles)
  const addProfile = useProfileStore(state => state.addProfile)
  const selectProfile = useProfileStore(state => state.selectProfile)
  const deleteProfile = useProfileStore(state => state.deleteProfile)

  const search = useDiscoveryStore(state => state.search)
  const setSearch = useDiscoveryStore(state => state.setSearch)
  const resetSearch = useDiscoveryStore(state => state.resetSearch)
  const groupedTopics = useDiscoveryStore(state => state.groupedTopics)
  const updateDiscoveryGroups = useDiscoveryStore(state => state.updateGroups)

  const handleTopicClick = (id: string) => {
    navigate(`/topic/${id}`)
  }

  const handleGoHome = (callback?: () => void) => {
    navigate('/')
    if (callback) callback()
  }

  const handleSurprise = () => {
    const rand = encyclopedia[Math.floor(Math.random() * encyclopedia.length)]
    handleTopicClick(rand.id)
  }

  const topicsData = {
    search,
    setSearch,
    groupedTopics,
    handleTopicClick,
    handleGoHome,
    handleSurprise,
  }

  // Synchronisation des groupes de découverte lors du changement de langue
  useEffect(() => {
    updateDiscoveryGroups()
  }, [language, updateDiscoveryGroups])

  // Correction globale du scroll : remonte en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Appliquer le genre à la racine pour les styles CSS
  useEffect(() => {
    document.documentElement.setAttribute('data-gender', gender)
  }, [gender])

  const handleToggleTheme = () => {
    toggleTheme((newTheme) => {
      if (activeProfileId) updateProfile(activeProfileId, { theme: newTheme })
    })
  }

  const handleToggleGender = () => {
    toggleGender((newGender) => {
      if (activeProfileId) updateProfile(activeProfileId, { gender: newGender })
    })
  }

  const openParentsZone = () => {
    setPendingRoute('/parents')
    setShowParentalGate(true)
  }

  const handleParentalSuccess = () => {
    setShowParentalGate(false)
    if (pendingRoute) {
      navigate(pendingRoute)
      setPendingRoute(null)
    }
  }

  return (
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
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <div className={styles.routeWrapper}>
                <HomePage topicsData={topicsData} />
              </div>
            }
          />
          <Route
            path="/topic/:topicId"
            element={
              <div className={styles.routeWrapper}>
                <TopicPage handleGoHome={handleGoHome} />
              </div>
            }
          />
          <Route
            path="/badges"
            element={
              <div className={styles.routeWrapper}>
                <BadgesPage onBack={() => navigate('/')} />
              </div>
            }
          />
          <Route
            path="/gallery"
            element={
              <div className={styles.routeWrapper}>
                <ExplorerGallery onTopicClick={(id) => navigate(`/topic/${id}`)} />
              </div>
            }
          />
          <Route
            path="/gifts"
            element={
              <div className={styles.routeWrapper}>
                <GiftsPage />
              </div>
            }
          />
          <Route
            path="/parents"
            element={
              <div className={styles.routeWrapper}>
                <ParentsDashboard onBack={() => navigate('/')} />
              </div>
            }
          />
          <Route
            path="/parents/flow"
            element={
              <div className={styles.routeWrapper}>
                <FlowDashboard onBack={() => navigate('/parents')} />
              </div>
            }
          />
          <Route
            path="/map"
            element={
              <div className={styles.routeWrapper}>
                <TreasureMap onBack={() => navigate('/')} markers={mapData} />
              </div>
            }
          />
          <Route path="/origins" element={<OriginsLayout />}>
            <Route index element={<OriginsList />} />
            <Route path=":id" element={<OriginsDetail />} />
          </Route>
          <Route
            path="/safari"
            element={
              <div className={styles.routeWrapper}>
                <MissionSafari onBack={() => navigate('/')} />
              </div>
            }
          />
          <Route
            path="/lifecircle"
            element={
              <div className={styles.routeWrapper}>
                <LifeCirclePage />
              </div>
            }
          />
          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <div className={styles.errorContainer}>
                <h2>{labels.errors.pageNotFound}</h2>
                <AppButton onClick={() => navigate('/')}>
                  {labels.common.goHome}
                </AppButton>
              </div>
            }
          />
        </Routes>
      </Suspense>
      <PWAPrompt />
    </MainLayout>
  )
}

export default App
