import { useQuery } from '@apollo/client'
import Button from 'components/Button'
import Container from 'components/Container'
import ExerciseList from 'components/Exercise/List'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'
import { PlusSquare } from 'react-feather'
import Sidebar from 'components/Sidebar'
import Commands from 'components/Commands'
import History from 'components/History'
import { useState } from 'react'
import { useSidebar } from 'lib/SidebarContext'
import PatternShow from 'components/Pattern/Show'

export default function Home() {
  const { loading, error, data } = useQuery(GET_EXERCISES)
  if (error) return error.message
  if (loading) return 'loading'

  return (
    <div className="flex text-gray-200">
      <Sidebar data={data} />
      <div className="w-full h-screen-minus-navbar">
        <div className="h-3/5">
          <PatternShow />
        </div>
        <div className="h-2/5">
          <History />
        </div>
      </div>
      <Commands />
    </div>
  )
}
