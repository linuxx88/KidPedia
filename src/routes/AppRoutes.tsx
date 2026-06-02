import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppButton } from '../components/UI/AppButton'
import { mapData } from '../data/mapData'

// Import direct des pages majeures pour éviter les erreurs d'import de module dynamique sous WebKit E2E
import { TopicPage } from '../pages/Topic'
import { TreasureMap } from '../components/Game/TreasureMap'
import { MissionSafari } from '../components/Game/MissionSafari'
import { ExplorerGallery } from '../components/Profile/ExplorerGallery'
import { BadgesPage } from '../components/Profile/BadgesPage'
import { ParentsDashboard } from '../pages/Parents/ParentsDashboard'
import { OriginsLayout } from '../pages/Origins/OriginsLayout'
import { OriginsList } from '../pages/Origins/OriginsList'
import { OriginsDetail } from '../pages/Origins/OriginsDetail'
import { GiftsPage } from '../components/Learning/ExplorerGallery/GiftsPage'
import { FlowDashboard } from '../pages/Parents/FlowDashboard'
import { ChampionshipPage } from '../pages/Championship/ChampionshipPage'
import { DictionaryPage } from '../pages/Dictionary/DictionaryPage'
import { HomePage } from '../pages/Home'

import { type Labels } from '../locales'
import { type Topic } from '../data/topics'

import styles from '../App.module.css'

interface AppRoutesProps {
  topicsData: {
    search: string
    setSearch: (value: string) => void
    groupedTopics: Record<string, { name: string; topics: Topic[] }>
    handleTopicClick: (id: string) => void
    handleGoHome: (callback?: () => void) => void
    handleSurprise: () => void
  }
  labels: Labels
  handleGoHome: (callback?: () => void) => void
}

export function AppRoutes({ topicsData, labels, handleGoHome }: AppRoutesProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
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
        path="/championship"
        element={
          <div className={styles.routeWrapper}>
            <ChampionshipPage />
          </div>
        }
      />
      <Route
        path="/dictionary"
        element={
          <div className={styles.routeWrapper}>
            <DictionaryPage />
          </div>
        }
      />
      {/* Catch-all route */}
      <Route
        path="*"
        element={
          <div className={styles.notFoundContainer}>
            <h2 className={styles.notFoundTitle}>{labels.errors.pageNotFound}</h2>
            <AppButton onClick={() => navigate('/')}>
              {labels.common.goHome}
            </AppButton>
          </div>
        }
      />
    </Routes>
  )
}
