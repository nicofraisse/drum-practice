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
