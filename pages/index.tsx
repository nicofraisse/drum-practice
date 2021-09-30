import { useMutation, useQuery } from '@apollo/client'
import Container from 'components/Container'
import Button from 'components/Button'
import Field from 'components/Field'
import { Form } from 'components/Form'
import {
  GET_PATTERNS,
  CREATE_PATTERN,
  DELETE_PATTERN
} from 'lib/gql/pattern.gql'

import { toast } from 'react-toastify'
import PatternList from 'components/Pattern/List'

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
      .then((data) => toast.success('success', data))
      .catch((e) => toast.error('error', e.message))
  }

  const handleDeletePattern = (patternId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this pattern? All corresponding records will be deleted.'
      )
    ) {
      deletePattern({ variables: { patternId } })
        .then((data) => toast.success('success', data))
        .catch((e) => {
          toast.error('error', e.message)
          console.error('e', e.message)
        })
    }
  }

  return (
    <Container>
      <PatternList data={data} handleDelete={handleDeletePattern} />
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
