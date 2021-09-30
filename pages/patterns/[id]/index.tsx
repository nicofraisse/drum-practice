import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Container from 'components/Container'
import Metronome from 'components/Metronome'
import Score from 'components/Pattern/Score'
import RecordList from 'components/Record/List'
import {
  DELETE_PATTERN,
  GET_PATTERN,
  GET_PATTERNS,
  UPDATE_PATTERN_BEST_TEMPO
} from 'lib/gql/pattern.gql'
import { useTempo } from 'lib/TempoContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Trash } from 'react-feather'
import { toast } from 'react-toastify'

const Pattern = () => {
  const id = useRouter().query.id
  const { push } = useRouter()
  const { tempo } = useTempo()

  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id },
    skip: !id
  })

  const [updatePatternBestTempo] = useMutation(UPDATE_PATTERN_BEST_TEMPO, {
    refetchQueries: () => [{ query: GET_PATTERN, variables: { id } }]
  })

  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: GET_PATTERNS
  })
  const handleUpdateBestTempo = () => {
    updatePatternBestTempo({ variables: { id, tempo } })
  }

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
      <Card className="relative">
        <Button
          className="absolute right-[16px]"
          href={`/patterns/${id}/practice`}
        >
          Practice Now
        </Button>
        <Button className="absolute right-[16px] top-[58px]">
          <Trash onClick={() => handleDeletePattern(id)} />
        </Button>

        <h1 className="font-bold text-lg">{data.pattern.name}</h1>
        <p className="text-gray-600 mb-2">{data.pattern.description}</p>
        <div className="mb-2">
          Best tempo: {data.pattern.bestTempo}{' '}
          <Button onClick={handleUpdateBestTempo}>Set current</Button>
        </div>
        <Score pattern={data.pattern} />
      </Card>
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
