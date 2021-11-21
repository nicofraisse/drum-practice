import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import classNames from 'classnames'
import { useSidebar } from 'lib/SidebarContext'
import { ChevronRight, Plus, Check, Trash, X } from 'react-feather'
import { RENAME_EXERCISE } from 'lib/gql/exercise.gql'
import {
  GET_EXERCISES,
  CREATE_EXERCISE,
  DELETE_EXERCISE
} from 'lib/gql/exercise.gql'
import Form from 'components/Form'
import Field from 'components/Field'
import { useRouter } from 'next/router'

const ExerciseBar = () => {
  const { data } = useQuery(GET_EXERCISES)
  const { selectedExercise, setSelectedExercise } = useSidebar()
  const { push } = useRouter()

  const [deleteExercise] = useMutation(DELETE_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const [renameExercise] = useMutation(RENAME_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const handleCreateExercise = async () => {
    const { data } = await createExercise({
      variables: { name: '', description: '' }
    })
    setSelectedExercise(data.createExercise.id)
  }

  const handleRename = (values) => {
    console.log({ values })
    renameExercise({
      variables: { id: values.id.toString(), name: values.name }
    }).catch((e) => {
      console.log(e.networkError?.result?.errors || e.message)
    })
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    if (
      window.confirm(
        `Are you sure you want to delete this exercise? This action is irreversable.`
      )
    ) {
      deleteExercise({ variables: { exerciseId: id } }).then(() => {
        push('/')
        setSelectedExercise(null)
      })
    }
  }
  return (
    <div className="bg-white bg-opacity-20 border-r border-gray-500 w-60 relative">
      {data?.exercises.map((exercise) => (
        <div
          className={classNames(
            'text-sm font-bold p-3 cursor-pointer select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center',
            {
              'bg-white bg-opacity-20 text-white':
                selectedExercise === exercise.id,
              'text-gray-400': selectedExercise !== exercise.id
            }
          )}
          onClick={() => setSelectedExercise(exercise.id)}
        >
          {exercise.name ? (
            <>
              <div>{exercise.name}</div>
              <div className="flex items-center">
                <Trash
                  onClick={(e) => handleDelete(e, exercise.id)}
                  className="text-red-300 hover:opacity-50 mr-1"
                />

                <ChevronRight size={20} />
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <Form
                className="flex items-center"
                initialValues={{ name: '' }}
                onSubmit={(values) =>
                  handleRename({ ...values, id: exercise.id })
                }
              >
                {() => (
                  <>
                    <Field
                      name="name"
                      hideLabel
                      dark={true}
                      className="flex items-center"
                    />
                    <button type="submit">
                      <Check />
                    </button>
                    <X onClick={(e) => handleDelete(e, exercise.id)} />
                  </>
                )}
              </Form>
            </div>
          )}
        </div>
      ))}
      <Plus
        className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
        onClick={handleCreateExercise}
      />
    </div>
  )
}

export default ExerciseBar
