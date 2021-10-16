import React from 'react'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Card from 'components/Card'
import { Edit, PlusCircle } from 'react-feather'
import Container from 'components/Container'
import ScoreBoxes from 'components/Score/ScoreBoxes'

const PatternEditCard = ({ pattern }) => {
  return (
    <div className="bg-gray-400 text-white max-w-sm p-4 rounded-lg shadow-xl mr-3 mb-5">
      <div className="font-bold text-lg mb-3">{pattern.name}</div>
      <ScoreBoxes score={pattern.score} />
      <div>{pattern.description}</div>
    </div>
  )
}

const edit = () => {
  const { query } = useRouter()
  const id = query.id
  const { data, loading, error } = useQuery(GET_EXERCISE, {
    variables: { id },
    skip: !id
  })
  if (loading || !data) return 'loading'

  return (
    <Container width="max-w-5xl">
      <Card className="mt-5 max-w-md mx-auto relative">
        <div className="font-bold text-2xl">{data.exercise.name}</div>
        <div className="pt-4">{data.exercise.description}</div>
        <Edit className="cursor-pointer opacity-30 hover:opacity-70 absolute top-4 right-4 transition dutation-150" />
      </Card>
      <div className="flex flex-wrap">
        {data.exercise.patterns.map((pattern) => (
          <PatternEditCard pattern={pattern} />
        ))}
        <div className="flex flex-col items-center justify-center bg-gray-300 rounded-lg shadow-xl w-40 mb-5 text-gray-600 select-none hover:opacity-80 transition duration-150 cursor-pointer hover:shadow-2xl">
          <PlusCircle size={32} />
          <div className="font-bold mt-1">Add variation</div>
        </div>
      </div>
    </Container>
  )
}

export default edit
