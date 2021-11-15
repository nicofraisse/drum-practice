import { useQuery } from '@apollo/client'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'

import Commands from 'components/Commands'
import History from 'components/History'
import { useState, useEffect } from 'react'
import PatternShow from 'components/Pattern/Show'
import ExerciseCreate from 'components/Exercise/Create'
import { useRouter } from 'next/router'

const PatternPractice = ({ id }) => (
  <>
    <div className="h-3/5">
      <PatternShow patternId={id} />
    </div>
    <div className="h-2/5">
      <History patternId={id} />
    </div>
  </>
)

export default function Home() {
  const { loading, error, data } = useQuery(GET_EXERCISES)
  const [mainContent, setMainContent] = useState('')
  const openPatternMaker = () => {}

  const { query, push } = useRouter()
  const openExerciseMaker = () => {
    push('/exercises/new')
    setMainContent(<ExerciseCreate />)
  }
  useEffect(() => {
    if (query.pattern) {
      setMainContent(<PatternPractice id={query.pattern} />)
    }
  }, [query])

  if (error) return error.message
  if (loading) return 'loading'

  return (
    <div className="w-full">
      <PatternPractice id={query.pattern} />
    </div>
  )
}
