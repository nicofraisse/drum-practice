import { useMutation } from '@apollo/client'
import Button from 'components/Button'
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
          <Field type="textarea" placeholder="Enter here" name="description" />
          <Field type="text" placeholder="Enter here" name="score" />
          <Button>Submit</Button>
        </>
      )}
    </Form>
  )
}

export default PatternCreate
