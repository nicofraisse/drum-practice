import { useMutation, useQuery } from '@apollo/client'
import { GET_PATTERN } from 'lib/gql/pattern.gql'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import PatternShow from 'components/Pattern/Show'
import PatternEdit from 'components/Pattern/Edit'

const Pattern = () => {
  const { push, query } = useRouter()
  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id: query.id },
    skip: !query.id
  })
  if (loading) return 'loading'
  if (!data) return 'no data'
  if (!data.pattern.score) push(`/patterns/${query.id}/edit`)

  return <PatternShow patternId={query.id} />
}

export default Pattern
