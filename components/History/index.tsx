import { useMutation, useQuery } from '@apollo/client'
import classNames from 'classnames'
import { format } from 'date-fns'
import { DELETE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { reverse } from 'lodash'
import { useRouter } from 'next/router'
import { Star, X } from 'react-feather'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'

const index = () => {
  const { query } = useRouter()
  const { data } = useQuery(GET_PATTERN_RECORDS, {
    variables: { patternId: query.pattern },
    skip: !query.pattern
  })

  const [deleteRecord] = useMutation(DELETE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId: query.pattern } }
    ]
  })

  const handleDelete = (recordId) => {
    deleteRecord({ variables: { recordId } })
      .then(() => toast.success('Deleted!'))
      .catch((e) => toast.error(e.message))
  }

  if (!data || isEmpty(data.records)) return null

  return (
    <div className="bg-white pt-10 bg-opacity-5 h-full">
      <div className="overflow-y-scroll h-full w-full">
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
