import React, { createContext, useContext, useState } from "react"
import type { Project } from "../types/project"

interface ProjectsContextType {
  projects: Project[]
}

export const ProjectsContext = createContext({} as ProjectsContextType)

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects] = useState<Project[]>([
    { name: 'Canvas' },
    { name: 'Momentum' },
    { name: 'Axiom' },
    { name: 'Prism' },
    { name: 'Lighthouse' },
    { name: 'Pivot' },
    { name: 'Anchor' },
    { name: 'Signal' },
    { name: 'DevTrack' }
  ])

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectsContext)
}
