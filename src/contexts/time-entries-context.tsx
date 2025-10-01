import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { TimeEntry } from "../types/time-entry"
import { format } from "date-fns"

interface GroupedTimeEntry {
  date: string
  entries: TimeEntry[]
  total: number
}

interface TimeEntriesContextType {
  timeEntries: TimeEntry[]
  groupedTimeEntries: GroupedTimeEntry[]
  addTimeEntry(timeEntry: TimeEntry): void
}

export const TimeEntriesContext = createContext({} as TimeEntriesContextType)

export function TimeEntriesProvider({ children }: { children: React.ReactNode }) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  const groupedTimeEntries = useMemo(() => {
    const grouped = new Map<string, { entries: TimeEntry[], total: number }>()

    timeEntries.forEach((entry) => {
      const dateKey = format(entry.startedAt, 'MM-dd-yyyy')
      const duration = entry.endedAt > entry.startedAt ? entry.endedAt - entry.startedAt : 0

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, { entries: [], total: 0 })
      }

      const existingGroup = grouped.get(dateKey)!
      existingGroup.entries.push(entry)
      existingGroup.total += duration
    })

    return Array
      .from(grouped, ([date, data]) => ({ date, ...data}))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [timeEntries])

  useEffect(() => {
    const data = localStorage.getItem('time_entries')
    const storedTimeEntries: TimeEntry[] = data ? JSON.parse(data) : []
    setTimeEntries(storedTimeEntries)
  }, [])

  function addTimeEntry(timeEntry: TimeEntry) {
    localStorage.setItem('time_entries', JSON.stringify([...timeEntries, timeEntry]))
    setTimeEntries([...timeEntries, timeEntry])
  }

  return (
    <TimeEntriesContext.Provider value={{ timeEntries, addTimeEntry, groupedTimeEntries }}>
      {children}
    </TimeEntriesContext.Provider>
  )
}

export function useTimeEntries() {
  return useContext(TimeEntriesContext)
}
