import { useMutation, useQuery } from '@apollo/client'
import classNames from 'classnames'
import Field from 'components/Field'
import Form from 'components/Form'
import {
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  GET_EXERCISES,
  RENAME_EXERCISE
} from 'lib/gql/exercise.gql'
import { useSidebar } from 'lib/SidebarContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Check,
  ChevronRight,
  ChevronsLeft,
  Plus,
  Trash,
  X
} from 'react-feather'

const ExerciseBar = () => {
  const { data } = useQuery(GET_EXERCISES)
  const {
    selectedExercise,
    setSelectedExercise,
    setSelectedPattern,
    selectedPattern,
    editMode,
    exerciseBarCollapsed,
    setExerciseBarCollapsed
  } = useSidebar()
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
    renameExercise({
      variables: { id: values.id.toString(), name: values.name }
    }).catch((e) => {
      console.error(e.networkError?.result?.errors || e.message)
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

  const handleClick = (e) => {
    if (exerciseBarCollapsed) {
      e.stopPropagation()
      setExerciseBarCollapsed(false)
    }
  }

  const isSameExercise = (ex, pat) => {
    if (
      data?.exercises?.find((e) => e.id == ex).patterns.find((p) => p.id == pat)
    ) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (
      data &&
      selectedExercise &&
      selectedPattern &&
      isSameExercise(selectedExercise, selectedPattern)
    ) {
      const newSelected = data?.exercises?.find((e) => e.id == selectedExercise)
        ?.patterns?.[0]?.id

      setSelectedPattern(newSelected)
      if (newSelected) {
        push(`/patterns/${newSelected}`)
      }
    }
  }, [data, selectedExercise, selectedPattern])

  return (
    <div
      className={classNames(
        'bg-white bg-opacity-20 border-r border-gray-500 relative transition-width duration-300',
        {
          'w-60': !exerciseBarCollapsed,
          'w-0 cursor-pointer': exerciseBarCollapsed
        }
      )}
      onClick={handleClick}
    >
      {data?.exercises.map((exercise) => (
        <div
          className={classNames(
            'text-sm font-bold p-3 cursor-pointer select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center transition duration-300',
            {
              'bg-white bg-opacity-20 text-white':
                selectedExercise === exercise.id,
              'text-gray-400': selectedExercise !== exercise.id,
              'opacity-0': exerciseBarCollapsed
            }
          )}
          key={exercise.id}
          onClick={() => {
            if (selectedExercise !== exercise.id) {
              setSelectedExercise(exercise.id)
              setSelectedPattern(exercise.patterns?.[0]?.id)
            }
          }}
        >
          {exercise.name ? (
            <>
              <div>{exercise.name}</div>
              <div className="flex items-center">
                {editMode && (
                  <Trash
                    onClick={(e) => handleDelete(e, exercise.id)}
                    className="text-red-300 hover:opacity-50 mr-1"
                  />
                )}

                <ChevronRight size={20} />
              </div>
            </>
          ) : (
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
                    className="flex items-center mb-0"
                  />
                  <div className="flex">
                    <button type="submit">
                      <Check />
                    </button>
                    <X onClick={(e) => handleDelete(e, exercise.id)} />
                  </div>
                </>
              )}
            </Form>
          )}
        </div>
      ))}

      {/* {editMode && ( */}
      <Plus
        className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
        onClick={handleCreateExercise}
      />
      {/* )} */}

      <ChevronsLeft
        className={classNames(
          'absolute bottom-3 right-[-280px] opacity-40 hover:opacity-80 transition duration-150 cursor-pointer z-50',
          { 'rotate-180': exerciseBarCollapsed }
        )}
        onClick={() => setExerciseBarCollapsed(!exerciseBarCollapsed)}
      />
    </div>
  )
}

export default ExerciseBar
