import React from 'react'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import classNames from 'classnames'
import TempoAcheivement from 'components/Pattern/TempoAcheivement'
import { useState, useEffect } from 'react'
import PracticeControls from 'components/Pattern/PracticeControls'
import { useTempo } from 'lib/TempoContext'
import { MinusCircle, Pause, Play, PlusCircle } from 'react-feather'

const Card = ({ pattern, isSelected, setSelected }) => {
  const {
    timer,
    startPractice,
    stopPractice,
    prepareTimer,
    isPracticing,
    done
  } = useTempo()
  return (
    <>
      {done && <div className="bg-white text-black">Hey</div>}
      <div
        key={pattern.id}
        className={classNames(
          'shadow- bg-gray-500 p-4 rounded-lg mt-6 cursor-pointer hover:opacity-90 transition duration-150 select-none',
          {
            'shadow-lg ring-4 ring-green-200 ring-offset-red-100': isSelected
          }
        )}
        onClick={() => setSelected(pattern.id)}
      >
        <div className="flex">
          <div className="w-3/4">
            <div className="text-2xl font-bold">{pattern.name}</div>
            <div className="text-gray-100">{pattern.description}</div>
          </div>

          <div className="flex-grow">
            {isSelected && (
              <>
                <PracticeControls time={timer} />
                <div className="flex justify-end">
                  <div
                    onClick={isPracticing ? stopPractice : startPractice}
                    className="border-2 border-green-300 bg-green-400 bg-opacity-0 text-green-200 px-4 py-1 rounded-lg text-lg font-bold hover:bg-opacity-10 transition duration-150 hover:shadow-xl"
                  >
                    {isPracticing ? 'Stop' : 'Start'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {prepareTimer}

        <div className="py-4">
          <ScoreBoxes score={pattern.score} />
        </div>
        <div className="flex justify-between mb-2">
          <TempoAcheivement
            min={pattern.startTempo}
            max={pattern.goalTempo}
            current={pattern.bestTempo}
          />
        </div>
      </div>
    </>
  )
}

export default Card
