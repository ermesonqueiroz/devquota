import { useState, useRef, useEffect } from 'react'

interface StopwatchControls {
  time: number
  isRunning: boolean
  start: (startedAt: number) => void
  stop: () => {
    startedAt: number
    endedAt: number
  }
}

export const useStopwatch = (): StopwatchControls => {
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  
  const startedAtRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  function updateTime() {
    setTime(Date.now() - startedAtRef.current!)
  }

  function start(startedAt: number): void {
    startedAtRef.current = startedAt
    updateTime()

    if (!isRunning) {
      setIsRunning(true)
    }
  }

  function stop() {
    setIsRunning(false)
    setTime(0)

    return {
      startedAt: startedAtRef.current!,
      endedAt: Date.now()
    }
  }

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = window.setInterval(updateTime, 100)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, time])

  return {
    time,
    isRunning,
    start,
    stop,
  }
}