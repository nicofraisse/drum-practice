import Button from 'components/Button'
import { useTempo } from 'lib/TempoContext'
import React, { useEffect, useState } from 'react'

const PracticeControls = ({ time, preparing }) => {
  return (
    <div className="flex items-center flex-col">
      <div className="font-mono rounded w-full pt-2 pb-1 text-center bg-black text-green-200">
        <span className="text-4xl">{time}</span>
        <div className="inline-block text-left">
          <div className="text-xs ml-1">seconds</div>
          <div className="text-xs ml-1">remaining</div>
        </div>
      </div>
    </div>
  )
}

export default PracticeControls
