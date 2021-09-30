import React from 'react'

const Score = ({ pattern }) => {
  return (
    <div className="flex flex-wrap">
      {[...pattern.score].map((x) => (
        <div
          key={Math.random()}
          className="w-8 h-8 mr-2 rounded bg-red-100 flex items-center justify-center"
        >
          {x}
        </div>
      ))}
    </div>
  )
}

export default Score
