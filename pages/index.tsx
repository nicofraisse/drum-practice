import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/ui/Button'
import { Form } from 'components/ui/Form'
import Field from 'components/ui/Field'
import gql from 'graphql-tag'
import { X } from 'react-feather'

const patternsQuery = gql`
  query PatternsQuery {
    patterns {
      id
      name
      score
    }
  }
`
const createPatternMutation = gql`
  mutation createPatternMutation(
    $name: String!
    $score: String!
    $description: String
  ) {
    createPattern(name: $name, score: $score, description: $description) {
      id
    }
  }
`
const deletePatternMutation = gql`
  mutation deletePatternMutation($patternId: Int!) {
    deletePattern(patternId: $patternId) {
      id
    }
  }
`

const Pattern = ({ data, handleDelete }) => (
  <div
    key={data.id}
    className="border border-gray p-4 bg-gray-100 my-3 flex justify-between"
  >
    <div className="flex">
      <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">{data.name}</div>
      <div className="mr-5 bg-green-200 py-1 px-5 rounded">{data.score}</div>
    </div>
    <X
      onClick={() => handleDelete(data.id)}
      className="cursor-pointer hover:opacity-60"
    />
  </div>
)

export default function Home() {
  const { loading, error, data } = useQuery(patternsQuery)

  const [createPattern] = useMutation(createPatternMutation, {
    refetchQueries: () => [{ query: patternsQuery }]
  })

  const [deletePattern] = useMutation(deletePatternMutation, {
    refetchQueries: () => [{ query: patternsQuery }]
  })

  if (error) return error.message
  if (loading) return 'loading'

  const handleSubmit = (values) => {
    createPattern({ variables: values })
      .then((data) => console.log('success', data))
      .catch((e) => console.log('error', e.message))
  }

  const handleDeletePattern = (patternId) => {
    deletePattern({ variables: { patternId } })
      .then((data) => console.log('success', data))
      .catch((e) => console.log('error', e.message))
  }

  return (
    <div className="p-5">
      {data?.patterns.map((p: any) => (
        <Pattern key={p.id} data={p} handleDelete={handleDeletePattern} />
      ))}

      <Form
        initialValues={{ score: '', name: '' }}
        onSubmit={handleSubmit}
        className="border shadow-lg p-5"
      >
        {() => (
          <>
            <Field
              type="text"
              placeholder="Enter here"
              name="name"
              className={3}
            />
            <Field
              type="textarea"
              placeholder="Enter here"
              name="description"
            />
            <Field type="text" placeholder="Enter here" name="score" />
            <Button>Submit</Button>
          </>
        )}
      </Form>
    </div>
  )
}
