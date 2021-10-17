import { useQuery } from '@apollo/client'
import Button from 'components/Button'
import Container from 'components/Container'
import ExerciseList from 'components/Exercise/List'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'
import { PlusSquare } from 'react-feather'
export default function Home() {
  const { loading, error, data } = useQuery(GET_EXERCISES)

  if (error) return error.message
  if (loading) return 'loading'

  return (
    <Container width="max-w-4xl">
      <div className="mb-5 flex justify-between">
        <Button icon={PlusSquare} href="/exercises/new">
          New Exercise
        </Button>
      </div>

      <ExerciseList exercises={data.exercises} />
    </Container>
  )
}
