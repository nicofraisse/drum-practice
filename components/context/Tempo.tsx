import { createContext, useContext, useState, useEffect } from 'react'
import {
  increaseTempo as increase,
  decreaseTempo as decrease
} from 'lib/metronome'
const TempoContext = createContext({})

const TempoProvider = ({ children }) => {
  const [tempo, setTempo] = useState(120)
  const [isRunning, setIsRunning] = useState(false)
  const increaseTempo = () => increase(tempo, setTempo)
  const decreaseTempo = () => decrease(tempo, setTempo)

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  let intervalId
  useEffect(() => {
    if (isRunning) {
      console.log('IT IS START')
      clearInterval(intervalId)
      intervalId = setInterval(() => console.log('started'), 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  return (
    <TempoContext.Provider
      value={{ tempo, increaseTempo, decreaseTempo, startStop }}
    >
      {children}
    </TempoContext.Provider>
  )
}

export const useTempo = () => {
  return useContext(TempoContext)
}

export default TempoProvider
