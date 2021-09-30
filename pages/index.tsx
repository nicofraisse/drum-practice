import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/ui/Button'
import Field from 'components/ui/Field'
import { Form } from 'components/ui/Form'
import gql from 'graphql-tag'
import Link from 'next/link'
import { X } from 'react-feather'
import Container from 'components/Container'
import { GET_PATTERNS } from 'lib/gql/patternQueries.gql'
import { CREATE_PATTERN, DELETE_PATTERN } from 'lib/gql/patternMutations.gql'

const Pattern = ({ data, handleDelete }) => (
  <div
    key={data.id}
    className="border border-gray p-4 bg-gray-100 my-3 flex justify-between"
  >
    <div className="flex items-center">
      <div className="mr-5 bg-yellow-200 py-1 px-5 rounded">{data.name}</div>
      <div className="mr-5 bg-green-200 py-1 px-5 rounded">{data.score}</div>
    </div>
    <div className="flex underline">
      <Link href={`/patterns/${data.id}`}>
        <div className="px-5">View</div>
      </Link>
      <X
        onClick={() => handleDelete(data.id)}
        className="cursor-pointer hover:opacity-60"
      />
    </div>
  </div>
)

export default function Home() {
  const { loading, error, data } = useQuery(GET_PATTERNS)

  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries: () => [{ query: GET_PATTERNS }]
  })

  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: () => [{ query: GET_PATTERNS }]
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
    <Container>
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
    </Container>
  )
}
