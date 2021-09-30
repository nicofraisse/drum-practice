import Button from 'components/Button'
import Card from 'components/Card'

const PatternCard = ({ pattern }) => (
  <Card
    key={pattern.id}
    className="border border-gray p-4 my-3 flex justify-between shadow-none"
  >
    <div className="flex items-center">
      <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">{pattern.name}</div>
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

export default PatternCard
