import Container from 'components/Container'
import ExerciseCreate from 'components/Exercise/Create'

const NewExercise = () => {
  return (
    <Container>
      <div className="text-2xl font-bold mb-4">New Exercise</div>
      <ExerciseCreate redirect="/" />
    </Container>
  )
}

export default NewExercise
