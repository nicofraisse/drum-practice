import React from 'react'

const ScoreBoxes = ({ score }) => {
  if (!score) return null
  return (
    <div className="flex font-bold font-mono text-2xl">
      {[...score].map((x) => (
        <div className="w-10 h-10 mr-1 border border-white bg-white bg-opacity-20 rounded flex items-center justify-center">
          {x}
        </div>
      ))}
    </div>
  )
}

export default ScoreBoxes
