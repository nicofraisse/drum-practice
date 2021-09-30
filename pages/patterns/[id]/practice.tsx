import { useMutation, useQuery } from '@apollo/client'
import Card from 'components/Card'
import Container from 'components/Container'
import Metronome from 'components/Metronome'
import PatternCard from 'components/Pattern/Card'
import CreateRecord from 'components/Record/Create'
import RecordList from 'components/Record/List'
import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import React from 'react'

const practice = () => {
  const id = useRouter().query.id

  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id },
    skip: !id
  })
  if (!data || loading) return 'Loading'
  return (
    <Container width="max-w-4xl" className="flex">
      <div className="w-2/3">
        <PatternCard pattern={data.pattern} page="practice" />
        <Card>
          <Metronome />
        </Card>
        <Card>
          <CreateRecord patternId={id} />
        </Card>
      </div>
      <div className="w-1/3 ml-5">
        <RecordList patternId={id} />
      </div>
    </Container>
  )
}

export default practice
