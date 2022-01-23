import classNames from 'classnames'
import { GET_EXERCISE } from 'lib/gql/exercise.gql'
import {
  CREATE_PATTERN,
  RENAME_PATTERN,
  DELETE_PATTERN
} from 'lib/gql/pattern.gql'

import { useQuery, useMutation } from '@apollo/client'
import { useSidebar } from 'lib/SidebarContext'
import { Plus, Check, Trash, X } from 'react-feather'
import { GET_EXERCISES } from 'lib/gql/exercise.gql'
import { useRouter } from 'next/router'
import Form from 'components/Form'
import Field from 'components/Field'
import Link from 'next/link'

const PatternBar = () => {
  const { setSelectedPattern, selectedExercise, selectedPattern, editMode } =
    useSidebar()
  const { push, query } = useRouter()
  const { data, loading } = useQuery(GET_EXERCISE, {
    variables: { id: selectedExercise?.toString() },
    skip: !selectedExercise
  })

  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries: () => [
      {
        query: GET_EXERCISE,
        variables: { id: selectedExercise?.toString() },
        skip: !selectedExercise
      }
    ]
  })

  const handleCreatePattern = async (values) => {
    const { data } = await createPattern({
      variables: {
        name: '',
        score: '',
        exerciseId: selectedExercise
      }
    })
    setSelectedPattern(data.createPattern.id)
  }

  const [renamePattern] = useMutation(RENAME_PATTERN, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: () => [
      {
        query: GET_EXERCISE,
        variables: { id: selectedExercise.toString() },
        skip: !selectedExercise
      }
    ]
  })

  const handleRename = (values) => {
    renamePattern({
      variables: { id: values.id.toString(), name: values.name }
    })
      .then(() => push(`/patterns/${values.id}/edit`))
      .catch((e) => {
        console.log(e.networkError?.result?.errors || e.message)
      })
  }

  const handleDelete = (e, pattern) => {
    e.stopPropagation()
    if (!pattern.name)
      deletePattern({ variables: { patternId: pattern.id } }).then(() => {
        push('/')
      })
    else if (
      window.confirm(
        `Are you sure you want to delete this pattern? This action is irreversable.`
      )
    ) {
      deletePattern({ variables: { patternId: pattern.id } }).then(() => {
        push('/')
      })
    }
  }

  return (
    <div className="bg-white bg-opacity-10 w-60 relative">
      {data?.exercise?.patterns?.map((pattern) => (
        <Link href={`/patterns/${pattern.id}`}>
          <div
            className={classNames(
              'cursor-pointer py-5 px-3 select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center',
              {
                'bg-white bg-opacity-20 text-white p-5': query.id == pattern.id,
                'text-gray-400': query.id != pattern.id
              }
            )}
          >
            {pattern.name ? (
              <>
                <div className="truncate">{pattern.name}</div>
                {editMode && (
                  <Trash
                    onClick={(e) => handleDelete(e, pattern)}
                    className="text-red-300 hover:opacity-50 mr-1 w-16"
                  />
                )}
              </>
            ) : (
              <div className="flex items-center">
                <Form
                  className="flex items-center"
                  id="ok"
                  initialValues={{ name: '' }}
                  onSubmit={(values) =>
                    handleRename({ ...values, id: pattern.id })
                  }
                >
                  {({ submitForm }) => (
                    <>
                      <Field
                        name="name"
                        hideLabel
                        dark={true}
                        className="flex items-center"
                      />

                      <button type="submit" onClick={submitForm}>
                        <Check className="text-green-300" />
                      </button>
                      <X
                        onClick={(e) => handleDelete(e, pattern)}
                        className="text-red-300"
                      />
                    </>
                  )}
                </Form>
              </div>
            )}
          </div>
        </Link>
      ))}
      {editMode && (
        <Plus
          className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
          onClick={handleCreatePattern}
        />
      )}
    </div>
  )
}

export default PatternBar
