import React, { useMemo } from "react"
import { format, parse } from "date-fns"
import { useState } from "react"

interface TimeButtonProps {
  children: React.ReactNode
  startDate: number | null
  endDate: number | null
  onChangeStartDate?: (startDate: number | null) => void
  onChangeEndDate?: (endDate: number | null) => void
}

export function TimeButton({ children, startDate, endDate, onChangeStartDate, onChangeEndDate }: TimeButtonProps) {
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))

  const startTime = useMemo(() => startDate ? format(startDate, 'HH:mm') : '', [startDate])
  const endTime = useMemo(() => endDate ? format(endDate, 'HH:mm') : '', [endDate])

  function handleUpdateDate(e: Event) {
    const dateString = (e.target as HTMLInputElement).value
    setDate(dateString)
  }

  function extractTime(timeString: string): number {
    const splittedTime = timeString.split(':').map(Number)
    const [hour, minute] = splittedTime
    const dateCopy = parse(date, 'yyyy-MM-dd', new Date())
    dateCopy.setHours(hour, minute, 0, 0)
    return dateCopy.getTime()
  }

  function handleUpdateStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!onChangeStartDate) return
    const time = extractTime(event.target.value)
    onChangeStartDate(time)
  }

  function handleUpdateEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!onChangeEndDate) return
    const time = extractTime(event.target.value)
    onChangeEndDate(time)
  }
  
  return (
    <div className="dropdown dropdown-end cursor-default">
      <div tabIndex={0} role="button" className="btn btn-ghost w-[90px] p-0 mr-2">
        {children}
      </div>
      <div tabIndex={0} className="dropdown-content bg-base-100 w-[300px] rounded-box mt-4 drop-shadow-lg">
        <calendar-date
          value={date}
          onchange={handleUpdateDate}
          className="cally bg-base-100 rounded-box mx-auto"
        >
          <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
          <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
          <calendar-month></calendar-month>
        </calendar-date>
        <div className="divider m-0"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-1 mb-2">
          <fieldset className="fieldset py-2 px-3">
            <label className="label upper">Início</label>
            <input
              type="time"
              className="input"
              value={startTime}
              onChange={handleUpdateStartDate}
            />
          </fieldset>
          <fieldset className="fieldset py-2 px-3">
            <label className="label upper">Fim</label>
            <input
              type="time"
              className="input"
              value={endTime}
              onChange={handleUpdateEndDate}
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}