import { useMutation, useQuery } from '@apollo/client'
import { useTempo } from 'components/context/Tempo'
import { format } from 'date-fns'
import {
  GET_PATTERN_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD
} from 'lib/gql/record.gql'
import { useRouter } from 'next/router'
import { Star, X } from 'react-feather'
import { toast } from 'react-toastify'

const ratings = [
  {
    mark: 0,
    title: 'Failed',
    description: 'You did not succeed in playing a full minute of the riff',
    color: 'red-200'
  },
  {
    mark: 1,
    title: 'Barly made it (major mistakes)',
    description: 'You managed to play the full minute with major mistakes',
    color: 'red-100'
  },
  {
    mark: 2,
    title: 'Decent perfomance (minor mistakes)',
    description: 'You managed to play the full minute with minor mistakes',
    color: 'yellow-200'
  },
  {
    mark: 3,
    title: 'Perfect',
    description:
      'You managed to play the full minute with no noticable mistakes',
    color: 'green-200'
  }
]

const Rating = ({ data, handleRate }) => {
  return (
    <div
      className={`hover:bg-${data.color} p-5 border-b select-none cursor-pointer`}
      onClick={() => handleRate(data.mark)}
    >
      <div className="flex items-center">
        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-xl">
          {data.mark}
        </div>
        <div className="pl-3">
          <h3 className="font-bold">{data.title}</h3>
          <p className="text-gray-400">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

const SelfEvaluation = ({ patternId }) => {
  const { query } = useRouter()
  const { data } = useQuery(GET_PATTERN_RECORDS, {
    variables: { patternId: query.id },
    skip: !query.id
  })
  const [createRecord] = useMutation(CREATE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId: query.id } }
    ]
  })
  const [deleteRecord] = useMutation(DELETE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId: query.id } }
    ]
  })

  const handleDelete = (recordId) => {
    deleteRecord({ variables: { recordId } })
      .then(() => toast.success('Deleted!'))
      .catch((e) => toast.error(e.message))
  }

  const { tempo } = useTempo()
  const handleRate = (mark: any) => {
    createRecord({
      variables: {
        patternId,
        tempo,
        rating: mark
      }
    })
      .then(() => {
        toast.success('Saved!')
      })
      .catch(() => {
        toast.error('Error saving record')
      })
  }
  return (
    <div>
      <h2>How would you rate your performance?</h2>
      {ratings.map((r) => (
        <Rating data={r} key={r.mark} handleRate={handleRate} />
      ))}
      {data?.records?.map((r) => (
        <div
          key={r.id}
          className="p-2 border bg-gray-100 shadow flex items-center justify-between"
        >
          <div className="flex items-center">
            {format(new Date(r.createdAt), 'd/MM/yyyy')}: {r.tempo}bpm
            <div className="flex ml-2">
              {[...Array(r.rating)].map((x) => (
                <Star
                  size={20}
                  className="text-yellow-500"
                  fill="yellow"
                  key={x}
                />
              ))}
            </div>
          </div>
          <div>
            <X onClick={() => handleDelete(r.id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelfEvaluation
