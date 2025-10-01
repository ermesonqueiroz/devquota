import { useState } from 'react'
import { useProjects } from './contexts/projects-context'
import { useStopwatch } from './hooks/stopwatch'
import { useTimeEntries } from './contexts/time-entries-context'
import { formatRelativeDate, formatTime } from './lib/date'
import { TimeButton } from "./components/time-button"
import { PageLayout } from "./components/page-layout"
import "cally"
import type { TimeEntry } from "./types/time-entry"

export default function App() {
  const { projects } = useProjects()
  const { addTimeEntry, groupedTimeEntries } = useTimeEntries()
  const timer = useStopwatch()

  const [selectedProject, setSelectedProject] = useState<null | string>(null)
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)

  function getNow() {
    const date = new Date()
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  }
 
  function saveTimeEntry(timeEntry: TimeEntry) {
    addTimeEntry(timeEntry)
    
    setStartDate(null)
    setEndDate(null)
    setDescription('')
  }

  function handleStopTimer() {
    const { startedAt, endedAt } = timer.stop()
    saveTimeEntry({
      description,
      project: selectedProject,
      startedAt,
      endedAt,
    })
  }

  function handlePlayTimer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!description) return

    if (!!startDate && !!endDate) {
      return saveTimeEntry({
        description,
        project: selectedProject,
        startedAt: startDate,
        endedAt: endDate,
      })
    }

    timer.start(startDate ?? Date.now())
  }

  return (
    <PageLayout.Root>
      <PageLayout.Sidebar />
      <div className="relative max-w-screen drawer-content">
        <form className="flex navbar z-1 bg-base-100 drop-shadow-sm w-full items-center" onSubmit={handlePlayTimer}>
          <input
            type="text"
            placeholder="Em que você está trabalhando?"
            className="input input-ghost text-base w-full px-6 h-full focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={timer.isRunning}
          />
          <div className="px-4 flex gap-4 items-center">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                {!selectedProject ? (
                  <button className="btn btn-circle btn-ghost" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                    </svg>
                  </button>
                ) : (
                  <span className="badge badge-neutral cursor-pointer"><span className="status status-primary"></span>{selectedProject}</span>
                )}
              </div>
              <ul
                tabIndex={0}
                data-badge-button={!!selectedProject}
                className="dropdown-content menu bg-base-100 w-56 rounded-box mt-4 p-2 shadow-sm data-[badge-button=true]:mt-[23px]"
              >
                {projects.map((project) => (
                  <li key={project.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project.name)}
                      className={selectedProject === project.name ? 'menu-active' : undefined}
                    >
                      {project.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <TimeButton
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={(value) => setStartDate(value)}
              onChangeEndDate={(value) => setEndDate(value)}
            >
              <span>
                {
                  timer.isRunning
                    ? formatTime(timer.time)
                    : formatTime((endDate ?? getNow()) - (startDate ?? getNow()))
                }
              </span>
            </TimeButton>
            {!timer.isRunning ? !!startDate && !!endDate ? (
              <button className="btn btn-circle btn-primary" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            ) : (
              <button className="btn btn-circle btn-primary" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button className="btn btn-circle btn-error" type="button" onClick={handleStopTimer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </form>
        <div className="pt-6 pb-16">
          {groupedTimeEntries.length >= 1 ? (
            <div className="flex flex-col gap-4">
              {groupedTimeEntries.map(({ date, entries, total }) => (
                <ul className="list bg-base-100" key={date}>
                  <li className="p-4 pb-2 flex justify-between items-center">
                    <div className="text-xs opacity-60 tracking-wide">{formatRelativeDate(new Date(date))}</div>
                    <div>{formatTime(total)}</div>
                  </li>
                  {entries.map((timeEntry) => (
                    <li className="list-row flex justify-between" key={timeEntry.description}>
                      <div>
                        <div className="text-base">{timeEntry.description}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{timeEntry?.project}</div>
                      </div>
                      <div>
                        {formatTime(timeEntry.endedAt - timeEntry.startedAt)}
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <img src="/empty-state.svg" width={200} className="opacity-80" />
              <h1 className="opacity-60 tracking-wide">Você ainda não registrou nenhuma tarefa</h1>
            </div>
          )}
        </div>
      </div>
    </PageLayout.Root>
  )
}
