import { createContext, useContext, useState } from 'react'

const TempoContext = createContext({})

const TempoProvider = ({ children }) => {
  const [tempo, setTempo] = useState(120)
  const increaseTempo = () => {
    if (tempo >= 40 && tempo < 240) {
      if (tempo >= 120) {
        setTempo(tempo + 8)
      } else {
        setTempo(tempo + 4)
      }
    }
  }
  const decreaseTempo = () => {
    if (tempo > 40 && tempo <= 240) {
      if (tempo > 120) {
        setTempo(tempo - 8)
      } else {
        setTempo(tempo - 4)
      }
    }
  }
  return (
    <TempoContext.Provider value={{ tempo, increaseTempo, decreaseTempo }}>
      {children}
    </TempoContext.Provider>
  )
}

export const useTempo = () => {
  return useContext(TempoContext)
}

export default TempoProvider
