import classNames from 'classnames'
import PracticeControls from 'components/Pattern/PracticeControls'
import TempoAcheivement from 'components/Pattern/TempoAcheivement'
import ScoreBoxes from 'components/Score/ScoreBoxes'
import { useTempo } from 'lib/TempoContext'
import React, { useEffect, useState } from 'react'
import { MinusCircle, Pause, Play, PlusCircle } from 'react-feather'

const Card = ({ pattern, isSelected, setSelected }) => {
  const {
    startPractice,
    stopPractice,
    isPracticing,
    startMetronome,
    done,
    preparing,
    setPreparing,
    timer
  } = useTempo()
  const handleStart = () => {
    startMetronome()
    setPreparing(true)
    setTimeout(() => {
      startPractice()
      setPreparing(false)
    }, 3000)
  }
  const [countdown, setCountdown] = useState(0)
  return (
    <>
      {done && <div className="bg-white text-black">Hey</div>}
      <div
        key={pattern.id}
        className={classNames(
          'shadow- bg-gray-500 p-4 rounded-lg mt-6 cursor-pointer hover:opacity-90 transition duration-150 select-none',
          {
            'shadow-lg ring-4 ring-green-200 ring-offset-red-100': isSelected,
            'opacity-50 pointer-events-none':
              !isSelected && (isPracticing || preparing)
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
                <div className="flex justify-end">
                  <div
                    onClick={isPracticing ? stopPractice : handleStart}
                    className="border-2 border-green-300 bg-green-400 bg-opacity-0 text-green-200 px-4 py-1 rounded-lg text-lg font-bold hover:bg-opacity-10 transition duration-150 hover:shadow-xl"
                  >
                    {preparing
                      ? 'Get ready...'
                      : isPracticing
                      ? 'Stop'
                      : 'Start'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="py-4">
          <ScoreBoxes score={pattern.score} />
        </div>

        {!isPracticing && (
          <TempoAcheivement
            min={pattern.startTempo}
            max={pattern.goalTempo}
            current={pattern.bestTempo}
          />
        )}

        {isSelected && isPracticing && (
          <PracticeControls time={timer} preparing={preparing} />
        )}
      </div>
    </>
  )
}

export default Card
