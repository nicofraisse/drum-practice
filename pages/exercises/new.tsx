import ExerciseCreate from 'components/Exercise/Create'
import Container from 'components/Container'

const NewExercise = () => {
  return (
    <Container>
      <div className="text-2xl font-bold mb-4">New Exercise</div>
      <ExerciseCreate redirect="/" />
    </Container>
  )
}

export default NewExercise
