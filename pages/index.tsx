import { useQuery } from '@apollo/client'
import Container from 'components/Container'
import PatternCreate from 'components/Pattern/Create'
import PatternList from 'components/Pattern/List'
import { GET_PATTERNS } from 'lib/gql/pattern.gql'

export default function Home() {
  const { loading, error, data } = useQuery(GET_PATTERNS)

  if (error) return error.message
  if (loading) return 'loading'

  return (
    <Container>
      <PatternList data={data} refetchQueries={[GET_PATTERNS]} />
      <PatternCreate refetchQueries={[GET_PATTERNS]} />
    </Container>
  )
}
