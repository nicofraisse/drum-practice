import ExerciseCard from './Card'

const ExerciseList = ({ exercises }) => {
  return exercises.map((e: any, index) => (
    <ExerciseCard key={e.id} number={index + 1} exercise={e} />
  ))
}

export default ExerciseList
