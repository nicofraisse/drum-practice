import { useMutation, useQuery } from '@apollo/client'
import classNames from 'classnames'
import { format } from 'date-fns'
import { DELETE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { reverse } from 'lodash'
import { useRouter } from 'next/router'
import { Star, X } from 'react-feather'
import { toast } from 'react-toastify'

const RecordList = ({ patternId }) => {
  const { query } = useRouter()
  const { data } = useQuery(GET_PATTERN_RECORDS, {
    variables: { patternId: query.id },
    skip: !query.id
  })

  const [deleteRecord] = useMutation(DELETE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId } }
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

  if (!data) return null

  return (
    <div>
      {reverse([...data.records])?.map((r) => (
        <div
          key={r.id}
          className={classNames(
            'p-2 border shadow flex items-center justify-between'
          )}
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
