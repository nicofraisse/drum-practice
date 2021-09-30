import { useMutation, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { DELETE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { useRouter } from 'next/router'
import { Star, X } from 'react-feather'
import { toast } from 'react-toastify'

const RecordList = ({ patternId }) => {
  const { query } = useRouter()
  const { data } = useQuery(GET_PATTERN_RECORDS, {
    variables: { patternId: query.id },
    skip: !query.id
  })
  console.log('pat id', patternId)

  const [deleteRecord] = useMutation(DELETE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId } }
    ]
  })

  const handleDelete = (recordId) => {
    deleteRecord({ variables: { recordId } })
      .then(() => toast.success('Deleted!'))
      .catch((e) => toast.error(e.message))
  }

  return (
    <div>
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

export default RecordList
