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
  const [timer, setTimer] = useState(0)

  const increaseTempo = () => increase(tempo, setTempo)
  const decreaseTempo = () => decrease(tempo, setTempo)
  const [playSound] = useSound('/sounds/tick.mp3', { volume: 1 })

  const start = () => {
    setTimer(0)
    setIsRunning(true)
  }
  const stop = () => {
    setIsRunning(false)
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
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer(timer + 1)
      }, 1000)
    }
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer, isRunning])

  return (
    <TempoContext.Provider
      value={{
        tempo,
        increaseTempo,
        decreaseTempo,
        start,
        stop,
        isRunning,
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
