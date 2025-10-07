import React, { createContext, useContext, useEffect, useState } from "react"
import type { Project } from "../types/project"

interface ProjectsContextType {
  projects: Project[]
  addProject: (project: Project) => void
  removeProject: (name: string) => void
}

export const ProjectsContext = createContext({} as ProjectsContextType)

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  function addProject(project: Project) {
    localStorage.setItem('projects', JSON.stringify([ ...projects, project]))
    setProjects([ ...projects, project])
  }

  function removeProject(name: string) {
    const newProjects = projects.filter((project) => name !== project.name)
    localStorage.setItem('projects', JSON.stringify(newProjects))
    setProjects(newProjects)
  }

  useEffect(() => {
    const data = localStorage.getItem('projects')
    const storedProjects: Project[] = data ? JSON.parse(data) : []
    setProjects(storedProjects)
  }, [])

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectsContext)
}
