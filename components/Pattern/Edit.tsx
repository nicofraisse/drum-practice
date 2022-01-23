import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/Button'
import Field from 'components/Field'
import Form from 'components/Form'
import ScoreBuilder from 'components/Score/Build'
import { GET_PATTERN, UPDATE_PATTERN } from 'lib/gql/pattern.gql'
import { useSidebar } from 'lib/SidebarContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Edit = ({ patternId }) => {
  const { setEditMode } = useSidebar()
  const { push } = useRouter()
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
        ...values,
        id: patternId,
        score: JSON.stringify(values.score)
      }
    })
      .then((data) => {
        toast.success('Success!')
        push(`/patterns/${patternId}`)
        setEditMode(false)
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
            <Field name="name" />
            <Field name="score" hidden />
            <div className="mb-1">Pattern</div>
            <ScoreBuilder
              initialValues={
                data.pattern.score ? JSON.parse(data.pattern.score) : null
              }
              onChange={(value) => setFieldValue('score', value)}
            />

            <div className="flex w-full mt-4">
              <Field type="number" name="startTempo" className="w-1/2" />
              <Field type="number" name="goalTempo" className="w-1/2 ml-3" />
            </div>

            <Field name="description" type="textarea" />

            <div className="flex">
              <Button className="mt-2" type="submit">
                Save
              </Button>
            </div>
            <div onClick={() => console.log(values)}>Log values in console</div>
          </>
        )
      }}
    </Form>
  )
}

export default Edit
