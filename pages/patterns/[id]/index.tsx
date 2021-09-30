import { useMutation, useQuery } from '@apollo/client'
import Card from 'components/Card'
import Container from 'components/Container'
import PatternCard from 'components/Pattern/Card'
import RecordList from 'components/Record/List'
import {
  DELETE_PATTERN,
  GET_PATTERN,
  GET_PATTERNS,
  UPDATE_PATTERN_BEST_TEMPO
} from 'lib/gql/pattern.gql'
import { useTempo } from 'lib/TempoContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Pattern = () => {
  const id = useRouter().query.id
  const { push } = useRouter()
  const { tempo } = useTempo()

  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id },
    skip: !id
  })

  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: GET_PATTERNS
  })

  const handleDeletePattern = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this pattern? All corresponding records will be deleted.'
      )
    ) {
      deletePattern({ variables: { patternId: id } })
        .then((data) => {
          toast.success('success', data)
          push('/')
        })
        .catch((e) => {
          toast.error('error', e.message)
          console.error('e', e.message)
        })
    }
  }
  if (loading || !data) return 'Loading'

  return (
    <Container>
      <PatternCard
        pattern={data.pattern}
        page="show"
        handleDelete={handleDeletePattern}
      />
      <div className="flex">
        <Card className="flex-grow flex items-center justify-center">
          <div className="h-80 bg-gray-300 w-full p-4">Progress Chart</div>
        </Card>
      </div>
      <Card>
        <RecordList patternId={id} />
      </Card>
    </Container>
  )
}

export default Pattern
