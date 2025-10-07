import { useRef, useState } from "react";
import { useProjects } from "../contexts/projects-context"

export default function ProjectsPage() {
  const { projects, addProject, removeProject } = useProjects()
  const [projectName, setProjectName] = useState<string>('')

  const createProjectDialogRef = useRef<HTMLDialogElement | null>(null)

  function createProject() {
    addProject({ name: projectName })
    createProjectDialogRef.current?.close()
  }

  function deleteProject(project: string, index: number) {
    removeProject(project);
    (document.getElementById(`delete-project-dialog-${index}`) as HTMLDialogElement).showModal()
  }

  return (
    <>
      <div className="px-8 navbar bg-base-100 flex justify-between">
        <h2 className="text-2xl tracking-tight font-medium leading-none">
          Projetos
        </h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => createProjectDialogRef.current?.showModal()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo projeto
        </button>
        <dialog id="create-project-dialog" className="modal" ref={createProjectDialogRef}>
          <div className="modal-box flex flex-col">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
            <h3 className="font-bold text-lg">Criar projeto</h3>
            <p>Insira o nome do projeto</p>

            <form onSubmit={createProject} className="flex flex-col">
              <fieldset className="fieldset mt-4 w-full">
                <label className="label upper">Nome</label>
                <input
                  type="text"
                  className="input w-full"
                  name="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </fieldset>
              <button type="submit" className="btn btn-primary mt-2">
                Criar projeto
              </button>
            </form>
          </div>
        </dialog>
      </div>
      <div className="bg-base-100 mt-8">
        <table className="table">
          <thead>
            <tr>
              <th className="w-[50px]">
                <label>
                  <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
              </th>
              <th className="w-1/3">Name</th>
              <th className="w-full">Horas</th>
              <th className="w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index.toString()}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </td>
                <td>{project.name}</td>
                <td>2:00:00</td>
                <td>
                  <div className="dropdown dropdown-end cursor-default">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-square btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-[240px] rounded-box mt-1 drop-shadow-lg">
                      <li>
                        <a>
                          Renomear projeto
                        </a>
                      </li>
                      <li>
                        <div>
                          <a onClick={() => {console.log(document.getElementById(`delete-project-dialog-${index}`));(document.getElementById(`delete-project-dialog-${index}`) as HTMLDialogElement).showModal()}}>
                            Excluir projeto
                          </a>
                          <dialog id={`delete-project-dialog-${index}`} className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </form>

                              <h3 className="font-bold text-lg">Deseja excluir o projeto {project.name}?</h3>
                              <p>Essa ação pode ser irreversível</p>

                              <div className="flex self-end gap-4">
                                <button type="button" className="btn btn-ghost" onClick={() => (document.getElementById(`delete-project-dialog-${index}`) as HTMLDialogElement).close()}>
                                  Cancelar
                                </button>
                                <button type="submit" className="btn btn-error" onClick={() => deleteProject(project.name, index)}>
                                  Excluir projeto
                                </button>
                              </div>
                            </div>
                          </dialog>2
                        </div>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
