import { useQuery, useMutation } from '@apollo/client'
import Card from 'components/Card'
import Tempo from 'components/Tempo'
import SelfEvaluation from 'components/Rating'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import Container from 'components/Container'

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
    variables: { id },
    skip: !id
  })

  if (loading || !data) return 'Loading'

  return (
    <Container>
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
      <Card>
        <SelfEvaluation patternId={id} />
      </Card>
    </Container>
  )
}

export default Pattern
