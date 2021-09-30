import { useQuery } from '@apollo/client'
import Card from 'components/Card'
import Container from 'components/Container'
import Score from 'components/Pattern/Score'
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
        <Score pattern={data.pattern} />
      </Card>
      <div className="flex">
        <Card className="mr-4">
          <Tempo />
        </Card>
        <Card className="flex-grow"></Card>
      </div>
      <Card>
        <SelfEvaluation patternId={id} />
      </Card>
    </Container>
  )
}

export default Pattern
