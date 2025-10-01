import React, { useEffect } from "react"
import { format, parse } from "date-fns"
import { useState } from "react"

interface TimeButtonProps {
  children: React.ReactNode
  onUpdate?: (startDate: Date | null, endDate: Date | null) => void
}

export function TimeButton({ children, onUpdate }: TimeButtonProps) {
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  function handleUpdateDate(e: Event) {
    const dateString = (e.target as HTMLInputElement).value
    setDate(dateString)
  }

  useEffect(() => {
    if (!date || !startTime || !endTime || !onUpdate) return

    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const finalStartDate = parse(date, 'yyyy-MM-dd', new Date())
    finalStartDate.setHours(startHour, startMinute, 0, 0)

    const finalEndDate = parse(date, 'yyyy-MM-dd', new Date())
    finalEndDate.setHours(endHour, endMinute, 0, 0)

    onUpdate(finalStartDate, finalEndDate)
  }, [date, startTime, endTime])
  
  return (
    <div className="dropdown dropdown-end cursor-default">
      <div tabIndex={0} role="button" className="btn btn-ghost w-[90px] p-0 mr-2">
        {children}
      </div>
      <div tabIndex={0} className="dropdown-content bg-base-100 w-[300px] rounded-box mt-4 shadow-sm">
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
              onChange={(e) => setStartTime(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset py-2 px-3">
            <label className="label upper">Fim</label>
            <input
              type="time"
              className="input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}