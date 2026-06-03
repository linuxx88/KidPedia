import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppButton } from '../components/UI/AppButton'
import { mapData } from '../data/mapData'

// Import direct des pages majeures pour éviter les erreurs d'import de module dynamique sous WebKit E2E
import { TopicPage, GiftsPage } from '../features/learning'
import { TreasureMap, MissionSafari } from '../features/game'
import { ExplorerGallery, BadgesPage } from '../features/profile'
import { ParentsDashboard, FlowDashboard, ContentEditor } from '../features/parents'
import { OriginsLayout, OriginsList, OriginsDetail } from '../features/origins'
import { ChampionshipPage } from '../features/championship'
import { DictionaryPage } from '../features/dictionary'
import { HomePage } from '../features/home'

import { type Labels } from '../locales'
import { type Topic } from '../data/topics'

import styles from '../App.module.css'

interface AppRoutesProps {
  topicsData: {
    search: string;
    setSearch: (value: string) => void;
    groupedTopics: Record<string, { name: string; topics: Topic[] }>;
    handleTopicClick: (id: string) => void;
    handleGoHome: (callback?: () => void) => void;
    handleSurprise: () => void;
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
        path="/parents/editor"
        element={
          <div className={styles.routeWrapper}>
            <ContentEditor onBack={() => navigate('/parents')} />
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
