import Card from 'components/Card'
import Link from 'next/link'
import { Trash } from 'react-feather'

const PatternCard = ({ pattern, handleDelete }) => (
  <Card
    key={pattern.id}
    className="border border-gray p-4 my-3 flex justify-between shadow-none"
  >
    <div className="flex items-center">
      <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">{pattern.name}</div>
      <div className="mr-5 bg-green-200 py-1 px-5 rounded">{pattern.score}</div>
    </div>
    <div className="flex underline">
      <Link href={`/patterns/${pattern.id}`}>
        <div className="px-5">Practice</div>
      </Link>
      {handleDelete && (
        <Trash
          onClick={() => handleDelete(pattern.id)}
          className="cursor-pointer hover:opacity-60"
        />
      )}
    </div>
  </Card>
)

export default PatternCard
