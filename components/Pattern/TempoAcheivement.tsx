import React from 'react'

const TempoAcheivement = ({ min, max, current }) => {
  current = 90
  const widthPercent = current ? ((current - min) / (max - min)) * 100 : 0

  return (
    <div className="w-full h-5 bg-gray-400 rounded flex items-center">
      <div
        style={{ width: `${widthPercent}%` }}
        className="bg-green-300 h-full rounded flex justify-between text-green-800 text-sm font-bold"
      >
        <div className="relative">
          <span className="absolute w-20 top-0 px-1">{min} bpm</span>
        </div>
        {widthPercent > 20 && (
          <div className="relative">
            <div className="absolute w-16 top-0 right-0 px-1">
              {current} bpm
            </div>
          </div>
        )}
      </div>

      {widthPercent < 80 && (
        <div
          style={{ width: `${100 - widthPercent}%` }}
          className="flex justify-end text-sm font-bold text-gray-800"
        >
          {max} bpm
        </div>
      )}
    </div>
  )
}

export default TempoAcheivement
