import { useMutation, useQuery } from '@apollo/client'
import classNames from 'classnames'
import ConditionalWrapper from 'components/ConditionalWrapper'
import Field from 'components/Field'
import Form from 'components/Form'
import {
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  GET_EXERCISE,
  GET_EXERCISES,
  RENAME_EXERCISE
} from 'lib/gql/exercise.gql'
import {
  CREATE_PATTERN,
  DELETE_PATTERN,
  RENAME_PATTERN
} from 'lib/gql/pattern.gql'
import { useSidebar } from 'lib/SidebarContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Check, ChevronRight, MinusCircle, Play, Plus, X } from 'react-feather'

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_EXERCISES)

  return (
    <div className="h-screen-minus-navbar text-gray-300 flex">
      <ExerciseSidebar data={data} />
      <PatternSidebar />
    </div>
  )
}

const MenuItem = ({ item, type, small }) => {
  const { selectedExercise, setSelectedExercise, setSelectedPattern } =
    useSidebar()
  const { push, query } = useRouter()

  const selection = type === 'pattern' ? query.id : selectedExercise

  const [deleteExercise] = useMutation(DELETE_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const [renameExercise] = useMutation(RENAME_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
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

  const handleDelete = (e) => {
    e.stopPropagation()
    if (
      window.confirm(
        `Are you sure you want to delete this ${type}? This action is irreversable.`
      )
    ) {
      if (type === 'pattern') {
        deletePattern({ variables: { patternId: item.id } }).then(() => {
          push('/')
        })
      } else {
        deleteExercise({ variables: { exerciseId: item.id } }).then(() => {
          push('/')
        })
      }
    }
  }

  const handleRename = (values) => {
    if (type === 'pattern') {
      renamePattern({
        variables: { id: item.id.toString(), name: values.name }
      })
        .then((d) => push('/patterns/' + item.id + '/build'))
        .catch((e) => {
          console.log(e.networkError?.result?.errors || e.message)
        })
    } else {
      renameExercise({
        variables: { id: item.id.toString(), name: values.name }
      }).catch((e) => {
        console.log(e.networkError?.result?.errors || e.message)
      })
    }
  }

  return (
    <ConditionalWrapper
      condition={type === 'pattern'}
      wrapper={(children) => (
        <Link href={`/patterns/${selection}`}>{children}</Link>
      )}
    >
      <div
        className={classNames(
          'cursor-pointer select-none hover:bg-white truncate hover:bg-opacity-20 flex justify-between items-center',
          {
            'bg-white bg-opacity-20 text-white': selection === item.id,
            'text-gray-400': selection !== item.id,
            'p-5': !small,
            'text-sm font-bold p-3': small
          }
        )}
        // onClick={() => setSelection(item.id)}
      >
        {item.name ? (
          <>
            <div>{item.name}</div>
            <X onClick={handleDelete} />
            {small && <ChevronRight size={20} />}
          </>
        ) : (
          <div className="flex items-center">
            <Form
              className="flex items-center"
              initialValues={{ name: '' }}
              onSubmit={handleRename}
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
                    <Check onClick={handleRename} />
                  </button>
                  <X onClick={handleDelete} />
                </>
              )}
            </Form>
          </div>
        )}
      </div>
    </ConditionalWrapper>
  )
}

const ExerciseSidebar = ({ data }) => {
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const { push } = useRouter()

  const { setSelectedExercise, selectedExercise } = useSidebar()
  const handleCreateExercise = async () => {
    const { data } = await createExercise({
      variables: { name: '', description: '' }
    })
    setSelectedExercise(data.createExercise.id)
  }

  return (
    <div className="bg-white bg-opacity-20 border-r border-gray-500 w-60 relative">
      {data?.exercises.map((e) => (
        <MenuItem item={e} type="exercise" key={e.id} small />
      ))}
      <Plus
        className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
        onClick={handleCreateExercise}
      />
    </div>
  )
}

const PatternSidebar = () => {
  const { setSelectedPattern, selectedExercise } = useSidebar()
  const { push } = useRouter()
  const { data, loading } = useQuery(GET_EXERCISE, {
    variables: { id: selectedExercise?.toString() },
    skip: !selectedExercise
  })

  const [createPattern] = useMutation(CREATE_PATTERN, {
    refetchQueries: () => [
      {
        query: GET_EXERCISE,
        variables: { id: selectedExercise.toString() },
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

  if (!selectedExercise) return null

  return (
    <div className="bg-white bg-opacity-10 w-60 relative">
      {data?.exercise?.patterns?.map((p) => (
        <MenuItem item={p} type="pattern" key={p.id} />
      ))}
      <Plus
        className="absolute bottom-3 right-3 opacity-40 hover:opacity-80 transition duration-150 cursor-pointer"
        onClick={handleCreatePattern}
      />
    </div>
  )
}
export default Sidebar
