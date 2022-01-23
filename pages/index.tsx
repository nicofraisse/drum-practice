import Commands from 'components/Commands'
import ExerciseCreate from 'components/Exercise/Create'
import History from 'components/History'
import PatternShow from 'components/Pattern/Show'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

  return (
    <div className="w-full">
      <PatternPractice id={query.pattern} />
    </div>
  )
}
