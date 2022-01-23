import React from 'react'
import PatternEdit from 'components/Pattern/Edit'
import { useRouter } from 'next/router'

const edit = () => {
  const { query } = useRouter()
  return (
    <div className="p-10 mx-auto max-w-[680px] bg-blue-400 bg-opacity-10 rounded-lg m-10 shadow-xl">
      <PatternEdit patternId={query.id} />
    </div>
  )
}

export default edit
