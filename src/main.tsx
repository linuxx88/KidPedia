import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { App } from './App.tsx'
import { ErrorBoundary } from './components/Layout/ErrorBoundary.tsx'

import { migrateLocalStorageToDB } from './utils/migration'
import { useProfileStore } from './store/useProfileStore'

async function init() {
  try {
    await migrateLocalStorageToDB()
    await useProfileStore.getState().sync()
  } catch (error) {
    console.error('[Migration/Sync] Failed to initialize:', error)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      useProfileStore.getState().sync().catch(console.error)
    })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </StrictMode>,
  )
}

init()

