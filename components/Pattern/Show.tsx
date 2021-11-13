import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import ScoreBoxes from 'components/Score/ScoreBoxes'

const Show = () => {
  const { query } = useRouter()

  const { data, loading } = useQuery(GET_PATTERN, {
    variables: { id: query.pattern },
    skip: !query.pattern
  })

  if (!query.pattern) {
    return <div className="h-full">Please select a pattern</div>
  }

  if (loading || !data) return <div className="h-full">Loading</div>

  return (
    <div className="h-full p-8">
      <div className="p-5 rounded-lg bg-gray-800 bg-opacity-100">
        <h2 className="text-3xl font-black mb-3">{data?.pattern?.name}</h2>
        <div className="w-full bg-gray-500 h-[1px] mb-1"></div>
        <div className="flex justify-between">
          <div>🛳 Cruise tempo: 80 bpm</div>
          <div>✨ Gooal cruise tempo: 140 bpm</div>
          <div>🥵 Maxium succeded: 170 bpm</div>
        </div>
      </div>
      <div className="p-10 flex justify-center">
        <ScoreBoxes score={data.pattern.score} />
      </div>
      <div className="text-gray-500 text-sm text-center">
        Instructions/description: {data?.pattern?.description}
      </div>
      <div className="text-gray-500 text-sm text-center">
        Personal notes: //@todo: a box where you can just write some text
        whenever
      </div>
    </div>
  )
}

export default Show
