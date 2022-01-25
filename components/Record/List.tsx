import { useMutation, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { DELETE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { isEmpty, reverse } from 'lodash'
import { Star, X } from 'react-feather'
import { toast } from 'react-toastify'

const index = ({ patternId }) => {
  const { data } = useQuery(GET_PATTERN_RECORDS, {
    variables: { patternId: patternId.toString() },
    skip: !patternId
  })

  const [deleteRecord] = useMutation(DELETE_RECORD, {
    refetchQueries: () => [
      {
        query: GET_PATTERN_RECORDS,
        variables: { patternId: patternId.toString() }
      }
    ]
  })

  const handleDelete = (recordId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this record? This action is irreversable.'
      )
    ) {
      deleteRecord({ variables: { recordId } })
        .then(() => toast.success('Deleted!'))
        .catch((e) => toast.error(e.message))
    }
  }

  if (!data || isEmpty(data.records))
    return (
      <div className="bg-white pt-5 bg-opacity-5 h-full text-center text-gray-300">
        No records yet!
      </div>
    )

  return (
    <div className="bg-white pt-5 bg-opacity-5 h-full">
      <div className="overflow-y-scroll py-5 scrollbar-hide h-full w-full">
        <table className="border border-gray-700 rounded-lg table-layout mx-auto">
          <tr>
            <th className="text-left">Tempo</th>
            <th className="text-left">Rating</th>
            <th className="text-left">Date</th>
          </tr>

          {reverse([...data.records])?.map((r) => (
            <tr key={r.id} className="p-2 even:bg-white even:bg-opacity-5">
              <td>{r.tempo} bpm</td>
              <td className="flex">
                {r.rating === 0 ? (
                  <div className="text-red-400">failed</div>
                ) : (
                  [...Array(r.rating)].map((x) => (
                    <Star
                      size={20}
                      className="text-yellow-500"
                      fill="yellow"
                      key={x}
                    />
                  ))
                )}
              </td>

              <td>{format(new Date(r.createdAt), 'MMMM d y, h:mm aa')}</td>

              <td className="pl-10">
                <X onClick={() => handleDelete(r.id)} />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default index
