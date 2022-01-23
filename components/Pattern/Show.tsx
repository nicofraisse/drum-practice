import { GET_PATTERN, UPDATE_PATTERN } from 'lib/gql/pattern.gql'
import { useQuery, useMutation } from '@apollo/client'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import Form from 'components/Form'
import Field from 'components/Field'
import { useSidebar } from 'lib/SidebarContext'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Edit from 'components/Pattern/Edit'

const Show = ({ patternId }) => {
  const { editMode } = useSidebar()
  const { query, push } = useRouter()
  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id: patternId },
    skip: !patternId
  })
  const [updatePattern] = useMutation(UPDATE_PATTERN, {
    refetchQueries: () => [
      { query: GET_PATTERN, variables: { id: patternId }, skip: !patternId }
    ]
  })

  const handleSubmit = (values) => {
    updatePattern({
      variables: {
        id: patternId,
        ...values
      }
    })
      .then((data) => console.log({ data }))
      .catch((e) => {
        console.log(e.networkError?.result?.errors || e.message)
      })
  }

  if (!patternId) {
    return <div className="h-full">Please select a pattern</div>
  }

  if (loading || !data) return <div className="h-full">Loading</div>
  if (!data.pattern) return <div className="h-full">Blank</div>

  if (editMode || !data.pattern.score) {
    push(`/patterns/${query.id}/edit`)
  }

  return (
    <div className="h-full p-8">
      <div className="p-5 rounded-lg bg-gray-800 bg-opacity-100">
        <h2 className="text-3xl font-black mb-3 break-all">
          {data.pattern.name}
        </h2>
        <div className="text-gray-500 text-sm text-left">
          {data.pattern.description}
        </div>
        <hr className="bg-opacity-0 border-gray-700 my-3" />
        <div className="flex justify-between">
          {data.pattern.bestTempo && (
            <div>🛳 Cruise tempo: {data.pattern.bestTempo} bpm</div>
          )}
          {data.pattern.goalTempo && (
            <div>✨ Goal cruise tempo: {data.pattern.goalTempo} bpm</div>
          )}
          {data.pattern.fastestTempo && (
            <div>🥵 Maxium succeded: {data.pattern.fastestTempo} bpm</div>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="my-10 mx-auto">
          <ScoreBoxes score={data.pattern.score} />
        </div>
      </div>

      {/* <div className="text-gray-500 text-sm text-center">
        Personal notes: //@todo: a box where you can just write some text
        whenever
      </div> */}
    </div>
  )
}

export default Show
