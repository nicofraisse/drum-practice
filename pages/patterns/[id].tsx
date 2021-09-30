import { useQuery } from '@apollo/client'
import Card from 'components/Card'
import Container from 'components/Container'
import SelfEvaluation from 'components/Rating'
import Tempo from 'components/Tempo'
import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'

const Pattern = () => {
  const id = useRouter().query.id

  const { data, loading } = useQuery(GET_PATTERN, {
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
