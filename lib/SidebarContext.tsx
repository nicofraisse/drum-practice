import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [selectedPattern, setSelectedPattern] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (selectedPattern) {
      router.push(router.pathname + '?pattern=' + selectedPattern)
    }
  }, [selectedPattern])

  return (
    <SidebarContext.Provider
      value={{
        selectedExercise,
        selectedPattern,
        setSelectedExercise,
        setSelectedPattern
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  return useContext(SidebarContext)
}

export default SidebarProvider
