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
import Link from 'next/link'
import ConditionalWrapper from 'components/ConditionalWrapper'
import ExerciseBar from './ExerciseBar'
import PatternBar from './PatternBar'

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_EXERCISES)

  return (
    <div className="h-screen-minus-navbar text-gray-300 flex">
      <ExerciseBar data={data} />
      <PatternBar />
    </div>
  )
}

export default Sidebar
