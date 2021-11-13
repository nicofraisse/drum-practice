import React from 'react'
import classNames from 'classnames'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { useQuery } from '@apollo/client'
import { useSidebar } from 'lib/SidebarContext'
import { Play, ChevronRight } from 'react-feather'

const Sidebar = ({ data }) => {
  return (
    <div className="h-screen-minus-navbar text-gray-300 flex">
      <ExerciseSidebar data={data} />
      <PatternSidebar />
    </div>
  )
}

const MenuItem = ({ item, type, small }) => {
  const {
    selectedExercise,
    setSelectedExercise,
    selectedPattern,
    setSelectedPattern
  } = useSidebar()

  const setSelection =
    type === 'pattern' ? setSelectedPattern : setSelectedExercise

  const selection = type === 'pattern' ? selectedPattern : selectedExercise
  return (
    <div
      className={classNames(
        'cursor-pointer select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center',
        {
          'bg-white bg-opacity-20 text-white': selection === item.id,
          'text-gray-400': selection !== item.id,
          'p-5': !small,
          'text-sm font-bold p-3': small
        }
      )}
      onClick={() => setSelection(item.id)}
    >
      <div>{item.name}</div>
      {small && <ChevronRight size={20} />}
    </div>
  )
}

const ExerciseSidebar = ({ data }) => {
  return (
    <div className="bg-white bg-opacity-20 border-r border-gray-500 w-60">
      {data?.exercises.map((e) => (
        <MenuItem item={e} type="exercise" key={e.id} small />
      ))}
    </div>
  )
}
const PatternSidebar = () => {
  const { selectedExercise } = useSidebar()
  const { data, loading } = useQuery(GET_EXERCISE, {
    variables: { id: selectedExercise?.toString() },
    skip: !selectedExercise
  })
  if (!data || loading) return null

  return (
    <div className="bg-white bg-opacity-10 w-60">
      {data.exercise.patterns.map((p) => (
        <MenuItem item={p} type="pattern" key={p.id} />
      ))}
    </div>
  )
}
export default Sidebar
