import { useQuery } from '@apollo/client'
import Container from 'components/Container'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'
import ExerciseList from 'components/Exercise/List'
import Button from 'components/Button'
import { PlusSquare } from 'react-feather'
export default function Home() {
  const { loading, error, data } = useQuery(GET_EXERCISES)

  if (error) return error.message
  if (loading) return 'loading'

  return (
    <Container width="max-w-4xl">
      <div className="bg-gray-500 mb-2 p-3 flex justify-between">
        <Button>Expand all</Button>
        <Button icon={PlusSquare} href="/exercises/new">
          New Exercise
        </Button>
      </div>

      <ExerciseList exercises={data.exercises} />
    </Container>
  )
}
