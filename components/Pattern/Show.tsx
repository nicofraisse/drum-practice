import { useMutation, useQuery } from '@apollo/client'

import ScoreShow from 'components/Score/Show'
import { GET_PATTERN, UPDATE_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import RecordList from 'components/Record/List'
import TempoAcheivement from 'components/Pattern/TempoAcheivement'

const Show = ({ patternId }) => {
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

  if (!patternId) {
    return <div className="h-full"></div>
  }

  if (loading || !data) return <div className="h-full">Loading</div>
  if (!data.pattern) return <div className="h-full">Blank</div>

  if (!data.pattern.score) {
    push(`/patterns/${query.id}/edit`)
  }

  return (
    <>
      <div className="p-8 h-3/4 overflow-y-scroll">
        <div className="p-5 rounded-lg bg-opacity-100">
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
          <TempoAcheivement min={60} max={130} current={110} />
        </div>
        <div className="flex">
          <div className="my-10 mx-auto">
            <ScoreShow score={data.pattern.score} />
          </div>
        </div>
      </div>
      <div className="h-1/4">
        <RecordList patternId={data.pattern.id} />
      </div>
    </>
  )
}

export default Show
