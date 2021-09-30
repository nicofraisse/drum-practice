import { useMutation } from '@apollo/client'
import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { CREATE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { useTempo } from 'lib/TempoContext'
import React from 'react'
import { toast } from 'react-toastify'

const ratings = [
  {
    mark: 0,
    title: 'Failed',
    description: 'You did not succeed in playing a full minute of the riff',
    color: 'red-200',
    increment: -2
  },
  {
    mark: 1,
    title: 'Barely made it (major mistakes)',
    description: 'You managed to play the full minute with major mistakes',
    color: 'red-100',
    increment: -1
  },
  {
    mark: 2,
    title: 'Decent perfomance (Resistance point)',
    description: 'You managed to play the full minute with minor mistakes',
    color: 'yellow-200',
    increment: 0
  },
  {
    mark: 3,
    title: 'Perfect',
    description:
      'You managed to play the full minute with no noticable mistakes',
    color: 'green-200',
    increment: +1
  }
]

const Rating = ({ data, handleRate }) => {
  return (
    <div
      className={`hover:bg-${data.color} p-5 border-b select-none cursor-pointer`}
      onClick={() => handleRate(data.mark)}
    >
      <div className="flex items-center">
        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-xl">
          {data.mark}
        </div>
        <div className="pl-3">
          <h3 className="font-bold">{data.title}</h3>
          <p className="text-gray-400">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

const Create = ({ patternId }) => {
  const { tempo } = useTempo()

  const [createRecord] = useMutation(CREATE_RECORD, {
    refetchQueries: () => [
      { query: GET_PATTERN_RECORDS, variables: { patternId } },
      { query: GET_PATTERN, variables: { id: patternId } }
    ]
  })
  const handleCreate = (mark: any) => {
    createRecord({
      variables: {
        patternId,
        tempo,
        rating: mark
      }
    })
      .then(() => {
        toast.success('Saved!')
      })
      .catch((err) => {
        toast.error('Error saving record')
        console.log('err', err.message)
      })
  }
  return (
    <div>
      <h2>How would you rate your performance?</h2>
      {ratings.map((r) => (
        <Rating data={r} key={r.mark} handleRate={handleCreate} />
      ))}
    </div>
  )
}

export default Create
