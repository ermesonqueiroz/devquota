import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectsProvider } from './contexts/projects-context.tsx'
import { TimeEntriesProvider } from './contexts/time-entries-context.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import DashboardLayout from "./pages/DashboardLayout.tsx";
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/projects", Component: ProjectsPage }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsProvider>
      <TimeEntriesProvider>
        <RouterProvider router={router}/>
      </TimeEntriesProvider>
    </ProjectsProvider>
  </StrictMode>,
)
