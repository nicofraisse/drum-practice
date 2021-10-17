import React from 'react'
import { useTempo } from 'lib/TempoContext'
import Button from 'components/Button'
import { useState, useEffect } from 'react'

const PracticeControls = ({ time }) => {
  const [countDown, setCountDown] = useState(60)

  return (
    <div className="flex items-center flex-col">
      <div className="font-mono rounded w-full pt-2 pb-1 text-4xl text-center bg-black text-green-200">
        <span>{time}</span>
        <div className="inline-block text-left">
          <div className="text-xs ml-1">seconds</div>
          <div className="text-xs ml-1">remaining</div>
        </div>
      </div>
      {/* <Button>Start practice</Button> */}
    </div>
  )
}

export default PracticeControls
