import { GET_PATTERN, UPDATE_PATTERN } from 'lib/gql/pattern.gql'
import { useQuery, useMutation } from '@apollo/client'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import Form from 'components/Form'
import Field from 'components/Field'
import { useSidebar } from 'lib/SidebarContext'
import classNames from 'classnames'

const Show = ({ patternId }) => {
  const { exerciseBarCollapsed } = useSidebar()
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

  if (!data.pattern.score) {
    return (
      <div>
        <Form
          initialValues={{
            score: '',
            name: data.pattern.name || '',
            description: data.pattern.description || ''
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <>
              <Field name="name" />
              <Field name="description" />
              <Field type="number" name="startTempo" />
              <Field type="number" name="goalTempo" />
              <Field name="score" />
              <button>Submit</button>
            </>
          )}
        </Form>
      </div>
    )
  }

  return (
    <div className="h-full p-8">
      <div className="p-5 rounded-lg bg-gray-800 bg-opacity-100">
        <h2 className="text-3xl font-black mb-3">{data.pattern.name}</h2>
        <div className="text-gray-500 text-sm text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          veniam nihil repellat quae dolor maxime velit fugit, neque corporis
          nostrum harum iste provident voluptatem, soluta maiores omnis non aut
          facere! Quas pariatur magnam error mollitia officiis soluta provident
          eos inventore? Fugiat eius non maxime laudantium dolore beatae ipsam
          voluptas debitis!{' '}
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
