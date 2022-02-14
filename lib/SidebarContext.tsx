import { useQuery } from '@apollo/client'
import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

const SidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [exerciseBarCollapsed, setExerciseBarCollapsed] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { push, query } = useRouter()

  useEffect(() => {
    if (query.id) {
      if (editMode) {
        push(`/patterns/${query.id}/edit`)
      } else {
        push(`/patterns/${query.id}`)
      }
    } else if (selectedPattern) {
      if (editMode) {
        push(`/patterns/${selectedPattern}/edit`)
      } else {
        push(`/patterns/${selectedPattern}`)
      }
    }
  }, [editMode, selectedPattern])

  const { data: patternData } = useQuery(GET_PATTERN, {
    variables: { id: query.id },
    skip: !query.id
  })

  useEffect(() => {
    if (query) {
      setSelectedPattern(query.id)
    }
    if (patternData) {
      if (!selectedExercise) {
        setSelectedExercise(patternData?.pattern.exercise.id)
      }
    }
  }, [query, patternData])

  useEffect(() => {
    if (!query.id) {
      setSelectedExercise(null)
      setSelectedPattern(null)
    }
  }, [query])

  return (
    <SidebarContext.Provider
      value={{
        selectedExercise,
        selectedPattern,
        setSelectedExercise,
        setSelectedPattern,
        editMode,
        setEditMode,
        exerciseBarCollapsed,
        setExerciseBarCollapsed
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
