import { useMutation, useQuery } from '@apollo/client'
import Button from 'components/Button'
import Card from 'components/Card'
import Container from 'components/Container'
import { Form } from 'components/Form'
import PatternFields from 'components/Pattern/Fields'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { CREATE_PATTERN, DELETE_PATTERN } from 'lib/gql/pattern.gql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Edit, PlusCircle, Trash } from 'react-feather'
import { toast } from 'react-toastify'

const PatternEditCard = ({ pattern, handleDeletePattern }) => {
  return (
    <div className="bg-gray-400 text-white max-w-md p-4 rounded-lg shadow-xl mr-3 mb-5">
      <div className="flex justify-between">
        <div className="font-bold text-lg mb-3">{pattern.name}</div>
        <Trash
          className="opacity-60 hover:opacity-100 cursor-pointer transition duration-150"
          onClick={handleDeletePattern}
        />
      </div>
      <ScoreBoxes score={pattern.score} />
      <div className="bg-white bg-opacity-30 p-3 rounded mt-4 shadow-inner">
        {pattern.description}
      </div>
      <div className="flex">
        <div className="rounded-full px-3 bg-white text-gray-500 bg-opacity-90 mt-3 mr-3 text-sm">
          Start tempo: <b className="text-lg">{pattern.startTempo}</b>
        </div>
        <div className="rounded-full px-3 bg-white text-gray-500 bg-opacity-90 mt-3 mr-3 text-sm">
          Goal tempo: <b className="text-lg">{pattern.goalTempo}</b>
        </div>
      </div>
    </div>
  )
}

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
    <>
      {showVariationForm && (
        <div className="relative">
          <div
            className="absolute w-screen h-screen bg-black z-30 bg-opacity-60"
            onClick={() => setShowVariationForm(false)}
          ></div>
          <div className="absolute w-screen h-screen border-red-500 items-center justify-center">
            <Card className="mt-20 max-w-2xl mx-auto z-50 relative">
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
                    <PatternFields />
                    <Button>Add variation</Button>
                  </>
                )}
              </Form>
            </Card>
          </div>
        </div>
      )}

      <Container width="max-w-5xl">
        <Card className="mt-5 max-w-md mx-auto relative">
          <div className="font-bold text-2xl">{data.exercise.name}</div>
          <div className="pt-4">{data.exercise.description}</div>
          <Edit className="cursor-pointer opacity-30 hover:opacity-70 absolute top-4 right-4 transition dutation-150" />
        </Card>
        <div className="flex flex-col items-center">
          {data.exercise.patterns.map((pattern) => (
            <PatternEditCard
              pattern={pattern}
              handleDeletePattern={() => handleDeletePattern(pattern.id)}
              key={pattern.id}
            />
          ))}
          <div
            onClick={() => setShowVariationForm(true)}
            className="flex flex-col items-center justify-center bg-gray-300 rounded-lg shadow-xl w-40 mb-5 text-gray-600 select-none hover:opacity-80 transition duration-150 cursor-pointer hover:shadow-2xl"
          >
            <PlusCircle size={32} />
            <div className="font-bold mt-1">Add variation</div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Edit
