import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
  const [adminMode, setAdminMode] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [selectedPattern, setSelectedPattern] = useState(null)
  const router = useRouter()

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
