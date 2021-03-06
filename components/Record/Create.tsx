import { useMutation } from '@apollo/client'
import { ratings } from 'data/ratings'
import { GET_PATTERN } from 'lib/gql/pattern.gql'
import { CREATE_RECORD, GET_PATTERN_RECORDS } from 'lib/gql/record.gql'
import { useTempo } from 'lib/TempoContext'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

const Rating = ({ data, handleRate }) => {
  return (
    <div
      className={`hover:bg-${data.color} p-5 border-b select-none cursor-pointer`}
      onClick={() => handleRate(data.mark)}
    >
      <div className="flex items-center">
        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-xl text-gray-900">
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

const Index = ({ closeModal }) => {
  const { tempo } = useTempo()
  const { query } = useRouter()
  const patternId = query?.id

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
        closeModal()
      })
      .catch((e) => {
        toast.error('Error saving record')
        console.error(e.networkError?.result?.errors || e.message)
      })
  }
  return (
    <div>
      <h2>How would you rate your performancbbbbbbbbe?</h2>
      {ratings.map((r) => (
        <Rating data={r} key={r.mark} handleRate={handleCreate} />
      ))}
    </div>
  )
}

export default Index
