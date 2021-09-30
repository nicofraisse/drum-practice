import { useMutation } from '@apollo/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Field from 'components/Field'
import { Form } from 'components/Form'
import { CREATE_PATTERN } from 'lib/gql/pattern.gql'
import React from 'react'
import { toast } from 'react-toastify'

const PatternCreate = ({ refetchQueries }) => {
  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries
  })

  const handleSubmit = (values) => {
    createPattern({ variables: values })
      .then((data) => toast.success('success', data))
      .catch((e) => {
        toast.error('error', e.message)
        console.error('error', e.message)
      })
  }

  return (
    <Card>
      <Form
        initialValues={{ score: '', name: '', description: '' }}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <Field type="text" name="name" />
            <Field type="textarea" name="description" />
            <Field type="text" name="score" />
            <Button>Submit</Button>
          </>
        )}
      </Form>
    </Card>
  )
}

export default PatternCreate
