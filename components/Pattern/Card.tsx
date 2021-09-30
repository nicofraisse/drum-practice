import Link from 'next/link'
import { X } from 'react-feather'

const PatternCard = ({ data, handleDelete }) => (
  <div
    key={data.id}
    className="border border-gray p-4 bg-gray-100 my-3 flex justify-between"
  >
    <div className="flex items-center">
      <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">{data.name}</div>
      <div className="mr-5 bg-green-200 py-1 px-5 rounded">{data.score}</div>
    </div>
    <div className="flex underline">
      <Link href={`/patterns/${data.id}`}>
        <div className="px-5">View</div>
      </Link>
      <X
        onClick={() => handleDelete(data.id)}
        className="cursor-pointer hover:opacity-60"
      />
    </div>
  </div>
)

export default PatternCard
