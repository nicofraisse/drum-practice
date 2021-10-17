import {
  decreaseTempo as decrease,
  increaseTempo as increase
} from 'lib/metronome'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSound } from 'use-sound'

const TempoContext = createContext({})

const TempoProvider = ({ children }) => {
  const [tempo, setTempo] = useState(120)
  const [isRunning, setIsRunning] = useState(false)
  const [isPracticing, setIsPracticing] = useState(false)
  const [timer, setTimer] = useState(10)
  const [done, setDone] = useState(false)

  const increaseTempo = () => increase(tempo, setTempo)
  const decreaseTempo = () => decrease(tempo, setTempo)
  const [playSound] = useSound('/sounds/tick.mp3', { volume: 1 })

  const startMetronome = () => {
    setIsRunning(true)
  }

  const stopMetronome = () => {
    setIsRunning(false)
  }

  const startPractice = () => {
    setTimer(10)
    startMetronome()
    setIsPracticing(true)
    setDone(false)
  }
  const stopPractice = () => {
    setTimer(10)
    stopMetronome()
    setIsPracticing(false)
  }

  let tempoInterval
  let timerInterval

  useEffect(() => {
    if (isRunning) {
      playSound()
      tempoInterval = setInterval(() => {
        playSound()
      }, (60 / tempo) * 1000)
    }
    return () => {
      clearInterval(tempoInterval)
    }
  }, [isRunning, tempo])

  useEffect(() => {
    if (isPracticing) {
      timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1)
        }
        if (timer === 0) {
          stopPractice()
          stopMetronome()
          setDone(true)
        }
      }, 1000)
    }
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer, isPracticing])

  return (
    <TempoContext.Provider
      value={{
        tempo,
        increaseTempo,
        decreaseTempo,
        startMetronome,
        stopMetronome,
        startPractice,
        stopPractice,
        isRunning,
        isPracticing,
        done,
        timer
      }}
    >
      {children}
    </TempoContext.Provider>
  )
}

export const useTempo = () => {
  return useContext(TempoContext)
}

export default TempoProvider
