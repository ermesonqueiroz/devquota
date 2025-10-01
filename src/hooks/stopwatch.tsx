import { useState, useRef, useEffect } from 'react'

interface StopwatchControls {
  time: number
  isRunning: boolean
  start: () => void
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

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime)
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, time])

  const start = (): void => {
    startedAtRef.current = Date.now()
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

  return {
    time,
    isRunning,
    start,
    stop,
  }
}