import { useQuery } from '@apollo/client'
import Card from 'components/Card'
import Tempo from 'components/Tempo'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import React from 'react'

const patternsQuery = gql`
  query PatternQuery($id: String!) {
    pattern(id: $id) {
      id
      name
      description
      score
    }
  }
`

const Pattern = () => {
  const id = useRouter().query.id

  const { data, loading } = useQuery(patternsQuery, {
    variables: { id }
  })

  if (loading) return null

  return (
    <div className="p-4">
      <Card>
        <h1 className="font-bold text-lg">{data.pattern.name}</h1>
        <p className="text-gray-600 mb-2">{data.pattern.description}</p>
        <div className="flex flex-wrap">
          {[...data.pattern.score].map((x) => (
            <div
              key={Math.random()}
              className="w-8 h-8 mr-2 rounded bg-red-100 flex items-center justify-center"
            >
              {x}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <Tempo />
      </Card>
    </div>
  )
}

export default Pattern
