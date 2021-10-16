import Button from 'components/Button'
import { Play, Edit, Edit2, Edit3 } from 'react-feather'

const ExerciseCard = ({ exercise, number }) => {
  return (
    <div className="bg-green-500 text-white mb-5 shadow rounded-xl">
      <div className="flex">
        <div className="p-5 flex-1">
          <div className="flex items-center">
            <div className="text-2xl cursor-default select-none font-bold text-green-600 rounded-full w-10 h-10 bg-white items-center justify-center flex">
              {number}
            </div>
            <div className="font-bold text-lg pl-4">{exercise.name}</div>
          </div>
          <div className="h-[2px] mt-3 mb-1 bg-green-800"></div>
          <div className="flex justify-between">
            <div className="text-sm">Avg tempo: 121 (+5%)</div>
            <div className="text-sm">Avg tempo: 121 (+5%)</div>
            <div className="text-sm">Avg tempo: 121 (+5%)</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-5">
          <Button
            className="flex mb-3 items-center"
            href={`/exercises/${exercise.id}/practice`}
          >
            <Play className="mr-1" size={16} />
            <div className="text-sm font-bold">Practice</div>
          </Button>
          <Button
            className="flex items-center"
            href={`/exercises/${exercise.id}/edit`}
          >
            <Edit2 className="mr-1" size={16} />
            <div className="text-sm font-bold">Edit</div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseCard
