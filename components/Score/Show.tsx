import classNames from 'classnames'
import { INSTRUMENTS } from 'data/instruments'
import Image from 'next/image'
import React from 'react'

const Show = ({ score: scoreString }) => {
  if (!scoreString) return null

  const score = JSON.parse(scoreString)

  const usedInstruments = INSTRUMENTS.filter((i) => score[i.name])
  return (
    <div
      className="shadow shadow-white border-gray-600 rounded-lg"
      style={{ boxShadow: '0px 0px 24px rgba(255, 255, 255, 0.1)' }}
    >
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
      className={classNames('flex', { 'border-jhghb border-gray-90': !isLast })}
    >
      <div className="w-28 mr-2 flex items-center justify-center text-right w-full justify-end border-r-2 border-r-gray-500 bg-black bg-opacity-20">
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
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

const Note = ({ velocity, buzz, flam, instrument, presence, index, hand }) => {
  const velocityClass = (velocity) => {
    switch (velocity) {
      case 1:
        return 'opacity-60 w-1/2 h-1/2'
      case 2:
        return 'opacity-90 w-2/3 h-2/3'
      case 3:
        return 'opacity-100 border-yellow-400 border-4 w-3/4 h-3/4'
      default:
        return ''
    }
  }

  const Hand = ({ hand }) => {
    const l = hand === 'left'
    const r = hand === 'right'
    const handLetter = r ? 'R' : l ? 'L' : null
    return (
      <div
        className={classNames(
          'h-6 w-6 rounded-full flex items-center justify-center',
          {
            'bg-black bg-opacity-50': r,
            'bg-white bg-opacity-50 text-gray-800': l
          }
        )}
      >
        {handLetter}
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'w-20 h-20 flex items-center justify-center border-l border-l-gray-800 bg-black bg-opacity-20',
        {
          'border-l-gray-500 border-l-2': index % 4 == 0
        }
      )}
    >
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
            <Hand hand={hand} />
          </>
        )}
      </div>
    </div>
  )
}

export default Show
