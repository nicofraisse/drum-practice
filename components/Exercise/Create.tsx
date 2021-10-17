import { useMutation } from '@apollo/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Field from 'components/Field'
import { Form } from 'components/Form'
import PatternFields from 'components/Pattern/Fields'
import { CREATE_EXERCISE } from 'lib/gql/exercise.gql'
import { CREATE_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

const PatternCreate = ({ refetchQueries, redirect }) => {
  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries
  })
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    refetchQueries
  })
  const { push } = useRouter()

  const handleSubmit = async (values) => {
    try {
      const { data } = await createExercise({
        variables: { name: values.name, description: values.description }
      })
      await createPattern({
        variables: {
          name: values.name,
          score: values.score,
          exerciseId: data.createExercise.id
        }
      })
      toast.success('Created!')
      if (redirect) {
        push(redirect)
      }
    } catch (e) {
      toast.error('Could not create exercise')
    }
  }

  return (
    <Card>
      <Form
        initialValues={{
          score: '',
          name: '',
          description: '',
          startTempo: '',
          goalTempo: ''
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <Field type="text" name="name" />
            <Field type="textarea" name="description" />
            <PatternFields isMain />
            <Button>Create exercise</Button>
          </>
        )}
      </Form>
    </Card>
  )
}

export default PatternCreate
