import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProjectsProvider } from './contexts/projects-context.tsx'
import { TimeEntriesProvider } from './contexts/time-entries-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsProvider>
      <TimeEntriesProvider>
        <App />
      </TimeEntriesProvider>
    </ProjectsProvider>
  </StrictMode>,
)
