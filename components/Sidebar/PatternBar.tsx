import { useMutation, useQuery } from '@apollo/client'
import classNames from 'classnames'
import ConditionalWrapper from 'components/ConditionalWrapper'
import Field from 'components/Field'
import Form from 'components/Form'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import { CREATE_PATTERN, DELETE_PATTERN } from 'lib/gql/pattern.gql'
import { useSidebar } from 'lib/SidebarContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Check, Plus, Trash, X } from 'react-feather'
import { ReactSortable } from 'react-sortablejs'
import { toast } from 'react-toastify'

const PatternBar = () => {
  const { setSelectedPattern, selectedExercise, selectedPattern, editMode } =
    useSidebar()
  const [isCreating, setIsCreating] = useState(false)
  const { push } = useRouter()
  const { data } = useQuery(GET_EXERCISE, {
    variables: { id: selectedExercise?.toString() },
    skip: !selectedExercise
  })

  const [state, setState] = useState([])
  useEffect(() => {}, [state])

  useEffect(() => {
    if (data?.exercise?.patterns) {
      setState(data.exercise.patterns)
    }
  }, [data])

  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries: () => [
      {
        query: GET_EXERCISE,
        variables: { id: selectedExercise?.toString() },
        skip: !selectedExercise
      }
    ]
  })

  const handlePrepareCreate = async () => {
    setIsCreating(true)
    setSelectedPattern(null)
  }

  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: () => [
      {
        query: GET_EXERCISE,
        variables: { id: selectedExercise?.toString() }
      }
    ]
  })

  const handleCreate = (values) => {
    createPattern({
      variables: {
        name: values.name,
        exerciseId: selectedExercise
      }
    })
      .then(({ data }) => {
        setSelectedPattern(data?.createPattern?.id)
        setIsCreating(false)
        push(`/patterns/${data?.createPattern?.id}/edit`)
      })
      .catch((e) => console.error(e.networkError?.result?.errors || e.message))
  }

  const handleDelete = (e, pattern) => {
    e.stopPropagation()

    if (
      window.confirm(
        `Are you sure you want to delete this pattern? This action is irreversable.`
      )
    ) {
      deletePattern({ variables: { patternId: pattern.id } })
        .then(() => {
          toast.success('deleted!')
          const ps = data?.exercise?.patterns
          if (ps.length >= 2) {
            const lastPatternId = ps[ps.length - 2].id
            setSelectedPattern(lastPatternId)
          }
        })
        .catch((e) =>
          console.error(e.networkError?.result?.errors || e.message)
        )
    }
  }

  return (
    <div className="bg-white bg-opacity-10 w-60 relative">
      <ReactSortable list={state} setList={setState}>
        {state.map((pattern) => (
          <ConditionalWrapper
            condition={!isCreating}
            wrapper={(children) => (
              <Link
                href={
                  editMode
                    ? `/patterns/${pattern.id}/edit`
                    : `/patterns/${pattern.id}`
                }
              >
                {children}
              </Link>
            )}
            key={pattern.id}
          >
            <div
              className={classNames(
                'cursor-pointer py-5 px-3 select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center',
                {
                  'bg-white bg-opacity-20 text-white':
                    selectedPattern == pattern.id,
                  'text-gray-400': selectedPattern != pattern.id
                }
              )}
            >
              <div
                className={classNames('truncate', {
                  'w-5/6': editMode,
                  'w-full': !editMode,
                  'opacity-30': !pattern.score
                })}
              >
                {pattern.name} {!pattern.score && '(pending)'}
              </div>
              {editMode && (
                <Trash
                  onClick={(e) => handleDelete(e, pattern)}
                  className="text-red-300 hover:opacity-50 mr-1"
                />
              )}
            </div>
          </ConditionalWrapper>
        ))}
      </ReactSortable>

      {isCreating && (
        <div
          className={classNames(
            'cursor-pointer py-5 px-3 select-none hover:bg-white truncate hover:bg-opacity-20 flex items-center',
            'bg-white bg-opacity-20 text-white',
            'text-gray-400'
          )}
        >
          <Form
            className="flex items-center"
            initialValues={{ name: '' }}
            onSubmit={handleCreate}
          >
            {() => (
              <>
                <Field
                  name="name"
                  hideLabel
                  dark={true}
                  className="flex items-center mb-0"
                />

                <button type="submit">
                  <Check className="text-green-300 hover:shadow-lg" />
                </button>
                <X
                  onClick={() => setIsCreating(false)}
                  className="text-red-300 hover:shadow-lg"
                />
              </>
            )}
          </Form>
        </div>
      )}

      {/* {editMode && ( */}
      <Plus
        className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
        onClick={handlePrepareCreate}
      />
      {/* )} */}
    </div>
  )
}

export default PatternBar
