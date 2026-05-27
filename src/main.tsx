import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/Layout/ErrorBoundary.tsx'

import { migrateLocalStorageToDB } from './utils/migration'

async function init() {
  try {
    await migrateLocalStorageToDB()
  } catch (error) {
    console.error('[Migration] Failed to run migration:', error)
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

