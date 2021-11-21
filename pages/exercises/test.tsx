import ExerciseList from 'components/Exercise/List'
import { useQuery } from '@apollo/client'
import Button from 'components/Button'
import Container from 'components/Container'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'
import React from 'react'

const index = () => {
  const { loading, error, data } = useQuery(GET_EXERCISES)
  if (error) return error.message
  if (loading) return 'loading'
  return (
    <div>
      <ExerciseList exercises={data.exercises} />
    </div>
  )
}

export default index
