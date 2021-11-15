import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/Button'
import { Form } from 'components/Form'
import Field from 'components/Field'
import PatternFields from 'components/Pattern/Fields'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { CREATE_PATTERN, DELETE_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Edit as EditIcon, PlusCircle, Trash } from 'react-feather'
import { toast } from 'react-toastify'

const Edit = () => {
  const { query } = useRouter()
  const [showVariationForm, setShowVariationForm] = useState(false)
  const id = query.id
  const { data, loading } = useQuery(GET_EXERCISE, {
    variables: { id },
    skip: !id
  })
  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: () => [
      { query: GET_EXERCISE, variables: { id }, skip: !id }
    ]
  })
  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries: () => [
      { query: GET_EXERCISE, variables: { id }, skip: !id }
    ]
  })

  const handleSubmit = (values) => {
    const variables = {
      ...values,
      exerciseId: Number(id)
    }

    createPattern({ variables })
      .then(() => {
        toast.success('Created!')
        setShowVariationForm(false)
      })
      .catch((e) => toast.error(e.networkError?.result.errors || e.message))
  }

  const handleDeletePattern = (patternId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this pattern? All corresponding records will be deleted.'
      )
    ) {
      deletePattern({ variables: { patternId: Number(patternId) } })
        .then((data) => {
          toast.success('success', data)
        })
        .catch((e) => {
          toast.error('error', e.message)
          console.error(e.networkError?.result.errors || e.message)
        })
    }
  }

  if (loading || !data) return 'loading'

  return (
    <Form
      initialValues={{
        name: '',
        description: ''
      }}
      onSubmit={handleSubmit}
      className="w-full"
    >
      {() => (
        <>
          <Field name="name" />
          <Field name="description" />
          <Button>Save</Button>
          <Button>Add variation</Button>
        </>
      )}
    </Form>
  )
}

export default Edit
