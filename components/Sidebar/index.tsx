import { useQuery } from '@apollo/client'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'

import ExerciseBar from './ExerciseBar'
import PatternBar from './PatternBar'

const Sidebar = () => {
  const { data } = useQuery(GET_EXERCISES)

  return (
    <div className="h-screen-minus-navbar text-gray-300 flex">
      <ExerciseBar data={data} />
      <PatternBar />
    </div>
  )
}

export default Sidebar
