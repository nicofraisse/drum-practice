import React from 'react'
import { INSTRUMENTS } from 'data/instruments'
import classNames from 'classnames'
import Image from 'next/image'

const ScoreBoxes = ({ score: scoreString }) => {
  if (!scoreString) return null

  const score = JSON.parse(scoreString)
  console.log(score)
  console.log(INSTRUMENTS)
  const usedInstruments = INSTRUMENTS.filter((i) => score[i.name])
  return (
    <div className="border border-gray-600">
      {usedInstruments.map((instrument, index) => {
        if (score[instrument.name]) {
          return (
            <InstrumentRow
              pattern={score[instrument.name]}
              instrument={instrument}
              isLast={index === usedInstruments.length - 1}
            />
          )
        }
      })}
    </div>
  )
}

const InstrumentRow = ({ pattern, instrument, isLast }) => {
  const NB_NOTES = 8

  return (
    <div
      className={classNames('flex', { 'border-b border-gray-600': !isLast })}
    >
      <div className="w-28 flex items-center justify-center text-right w-full justify-end border-r border-r-gray-800 bg-gray-800">
        <Image
          src={`/icons/${instrument.icon}`}
          alt={instrument.name}
          width="60"
          height="60"
        />
      </div>
      <div className="flex">
        {[...Array(NB_NOTES)].map((_, index) => (
          <Note
            {...pattern[index]}
            instrument={instrument}
            presence={!!pattern[index]}
          />
        ))}
      </div>
    </div>
  )
}

const Note = ({ velocity, buzz, flam, instrument, presence }) => {
  const velocityClass = (velocity) => {
    switch (velocity) {
      case 1:
        return 'opacity-60 w-1/2 h-1/2'
      case 2:
        return 'opacity-90 w-3/4 h-3/4'
      case 3:
        return 'opacity-100 border-yellow-400 border-4 w-5/6 h-5/6'
      default:
        return ''
    }
  }
  const buzzClass = (buzz) => {}
  const flamClass = (flam) => {}

  return (
    <div className="w-20 h-20 flex items-center justify-center border-l border-l-gray-800">
      <div
        className={classNames(
          velocityClass(velocity),
          buzzClass(buzz),
          flamClass(flam),
          'flex items-center justify-center text-gray-300 rounded-full'
        )}
        style={{ backgroundColor: presence ? instrument.color : '' }}
      >
        {presence && (
          <>
            {flam && <div>F</div>}
            {buzz && <div>B</div>}
          </>
        )}
      </div>
    </div>
  )
}

export default ScoreBoxes
