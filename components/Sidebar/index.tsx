import { useRef, useEffect } from 'react'
import classNames from 'classnames'
import { GET_EXERCISE, RENAME_EXERCISE } from 'lib/gql/exercise.gql'
import {
  CREATE_PATTERN,
  RENAME_PATTERN,
  DELETE_PATTERN
} from 'lib/gql/pattern.gql'

import { useQuery, useMutation } from '@apollo/client'
import { useSidebar } from 'lib/SidebarContext'
import { Play, ChevronRight, Plus, MinusCircle, Check, X } from 'react-feather'
import {
  GET_EXERCISES,
  CREATE_EXERCISE,
  DELETE_EXERCISE
} from 'lib/gql/exercise.gql'
import { useRouter } from 'next/router'
import Form from 'components/Form'
import Field from 'components/Field'

const Sidebar = ({ openExerciseMaker, openPatternMaker }) => {
  const { loading, error, data } = useQuery(GET_EXERCISES)

  return (
    <div className="h-screen-minus-navbar text-gray-300 flex">
      <ExerciseSidebar data={data} openExerciseMaker={openExerciseMaker} />
      <PatternSidebar openPatternMaker={openPatternMaker} />
    </div>
  )
}

const MenuItem = ({ item, type, small }) => {
  const {
    selectedExercise,
    setSelectedExercise,
    selectedPattern,
    setSelectedPattern
  } = useSidebar()
  const setSelection =
    type === 'pattern' ? setSelectedPattern : setSelectedExercise

  const selection = type === 'pattern' ? selectedPattern : selectedExercise

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

  const handleDelete = () => {
    if (type === 'pattern') {
      deletePattern({ variables: { patternId: item.id } })
    } else {
      deleteExercise({ variables: { exerciseId: item.id } })
    }
  }

  const handleRename = (values) => {
    console.log(values.name)
    if (type === 'pattern') {
      renamePattern({
        variables: { id: item.id.toString(), name: values.name }
      })
        .then((d) => console.log({ d }))
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
      onClick={() => setSelection(item.id)}
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
  )
}

const ExerciseSidebar = ({ data }) => {
  const [createExercise] = useMutation(CREATE_EXERCISE, {
    refetchQueries: () => [{ query: GET_EXERCISES }]
  })
  const { push } = useRouter()

  const { setSelectedExercise } = useSidebar()
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
