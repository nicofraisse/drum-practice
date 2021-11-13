import { useQuery } from '@apollo/client'
import Container from 'components/Container'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import PracticeCard from 'components/Pattern/Card'

const Practice = () => {
  const id = useRouter().query.id
  const [selected, setSelected] = useState(null)

  const { data, loading } = useQuery(GET_EXERCISE, {
    variables: { id },
    skip: !id
  })
  useEffect(() => {
    if (data?.exercise.patterns[0]) {
      setSelected(data.exercise.patterns[0].id)
    }
  }, data)
  if (!data || loading) return 'Loading'
  return (
    <Container width="max-w-2xl">
      <div className="text-white bg-gray-600 p-4 rounded-xl shadow-xl">
        <div className="px-3 py-2 rounded-lg">
          <div className="text-3xl font-bold mb-1">1. {data.exercise.name}</div>
          <div className="text-lg text-gray-100">
            {data.exercise.description}
          </div>
        </div>
        {data.exercise.patterns.map((p) => (
          <PracticeCard
            pattern={p}
            key={p.id}
            isSelected={p.id === selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </Container>
  )
}

export default Practice
