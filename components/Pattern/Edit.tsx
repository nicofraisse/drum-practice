import { GET_PATTERN, UPDATE_PATTERN } from 'lib/gql/pattern.gql'
import { useQuery, useMutation } from '@apollo/client'
import Form from 'components/Form'
import Field from 'components/Field'
import Button from 'components/Button'
import ScoreBuilder from 'components/Score/Build'
import { toast } from 'react-toastify'

const Show = ({ patternId }) => {
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
    console.log(values.score)
    updatePattern({
      variables: {
        ...values,
        id: patternId,
        score: JSON.stringify(values.score)
      }
    })
      .then((data) => {
        toast.success('Success!')
        console.log({ data })
      })
      .catch((e) => {
        toast.error(e.networkError?.result?.errors[0].message || e.message)
      })
  }

  if (!patternId) {
    return <div className="h-full">Please select a pattern</div>
  }

  if (loading || !data) return <div className="h-full">Loading</div>
  if (!data.pattern) return <div className="h-full">Blank</div>

  return (
    <Form
      initialValues={{
        score: '',
        name: data.pattern.name || '',
        description: data.pattern.description || ''
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <>
            <Field name="score" hidden />

            <ScoreBuilder
              initialValues={
                data.pattern.score ? JSON.parse(data.pattern.score) : null
              }
              onChange={(value) => setFieldValue('score', value)}
            />
            <div className="flex w-full mt-5">
              <div className="mr-4 w-2/3">
                <Field name="name" />
                <Field name="description" type="textarea" />
              </div>
              <div className="w-1/3">
                <Field type="number" name="startTempo" />
                <Field type="number" name="goalTempo" />
              </div>
            </div>

            <div className="flex">
              <Button className="mt-4 mr-4" type="submit">
                Save pattern
              </Button>
            </div>
            <div onClick={() => console.log(values)}>see</div>
          </>
        )
      }}
    </Form>
  )
}

export default Show
