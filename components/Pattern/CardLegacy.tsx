import { useMutation } from '@apollo/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Score from 'components/Pattern/Score'
import { GET_PATTERN, UPDATE_PATTERN_BEST_TEMPO } from 'lib/gql/pattern.gql'
import { useTempo } from 'lib/TempoContext'
import { Edit, Trash } from 'react-feather'

const PatternCard = ({ pattern, collapsed, page, handleDelete }) => {
  const { tempo } = useTempo()
  const [updatePatternBestTempo] = useMutation(UPDATE_PATTERN_BEST_TEMPO, {
    refetchQueries: () => [
      { query: GET_PATTERN, variables: { id: pattern.id.toString() } }
    ]
  })

  const handleUpdateBestTempo = () => {
    updatePatternBestTempo({ variables: { id: pattern.id.toString(), tempo } })
  }

  if (collapsed)
    return (
      <Card
        key={pattern.id}
        className="border border-gray p-4 my-3 flex justify-between shadow-none"
      >
        <div className="flex items-center">
          <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">
            {pattern.name}
          </div>
          <div className="mr-5 bg-green-200 py-1 px-5 rounded">
            {pattern.bestTempo}
          </div>
        </div>
        <div className="flex">
          <Button href={`/patterns/${pattern.id}`} className="mr-2">
            View
          </Button>
          <Button href={`/patterns/${pattern.id}/practice`}>Practice</Button>
        </div>
      </Card>
    )

  return (
    <Card className="relative">
      {page === 'show' && (
        <>
          <Button
            className="absolute right-[16px]"
            href={`/patterns/${pattern.id}/practice`}
          >
            Practice Now
          </Button>
          <Button className="absolute right-[16px] top-[58px]">
            <Trash onClick={handleDelete} />
          </Button>
          <Button className="absolute right-[76px] top-[58px]">
            <Edit />
          </Button>
        </>
      )}

      <h1 className="font-bold text-lg">{pattern.name}</h1>
      <p className="text-gray-600 mb-2">{pattern.description}</p>
      {page === 'practice' && (
        <div className="mb-2">
          Best tempo: {pattern.bestTempo}{' '}
          <Button onClick={handleUpdateBestTempo}>Set current</Button>
        </div>
      )}

      <Score pattern={pattern} />
    </Card>
  )
}

export default PatternCard
