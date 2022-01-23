import React from 'react'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Slash } from 'react-feather'
import Color from 'color'
import { INSTRUMENTS } from 'data/instruments'

const ScoreBuilder = ({ onChange, initialValues }) => {
  const NB_NOTES = 8
  const ref = useRef()
  const width = ref?.current?.getBoundingClientRect().width
  const [output, setOutput] = useState({})
  const [instruments, setInstruments] = useState(['snare'])
  const [forceReset, setForceReset] = useState()

  const [options, setOptions] = useState({
    velocity: 2,
    flam: false,
    buzz: false,
    hand: undefined
  })

  // const output = {
  //   hihat: {1: {velocity: 349, buzz, false}}
  // }

  const updateScore = (index, instrument) => {
    setOutput({
      ...output,
      [instrument.name]: {
        ...output[instrument.name],
        [index - 1]: options.velocity ? options : null
      }
    })
  }

  useEffect(() => {
    onChange(output)
    // console.log('the output', output)
  }, [output])

  useEffect(() => {
    setOutput(initialValues || {})
  }, [])

  const clear = () => {
    if (window.confirm('Reset ?')) {
      setOutput({})
      setForceReset(Math.random())
    }
  }

  return (
    <div className="p-2 bg-white bg-opacity-30 rounded-lg">
      <div className="flex w-full mb-3">
        <div
          onClick={() => setOptions({ ...options, velocity: 1 })}
          className={classNames(
            'p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-2/5 bg-gray-900 border',
            {
              'bg-blue-500 border-blue-400 bg-opacity-30 text-white':
                options.velocity === 1,
              'text-gray-400 border-gray-900 hover:text-white':
                options.velocity !== 1
            }
          )}
        >
          Ghost note
        </div>
        <div
          onClick={() => setOptions({ ...options, velocity: 2 })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[160px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.velocity === 2,
              'text-gray-400 border-gray-900 hover:text-white':
                options.velocity !== 2
            }
          )}
        >
          Regular Stroke
        </div>
        <div
          onClick={() => setOptions({ ...options, velocity: 3 })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.velocity === 3,
              'text-gray-400 border-gray-900 hover:text-white':
                options.velocity !== 3
            }
          )}
        >
          Accent
        </div>
        <div
          onClick={() => setOptions({ ...options, velocity: 0 })}
          className={classNames(
            'p-2 flex w-[60px] transition duration-300 cursor-pointer justify-center w-2/5 bg-gray-900 border ml-3',
            {
              'bg-blue-500 border-blue-400 bg-opacity-30 text-white':
                !options.velocity,
              'text-gray-400 border-gray-900 hover:text-white':
                !!options.velocity
            }
          )}
        >
          <Slash />
        </div>
        <div
          onClick={clear}
          className={classNames(
            'p-2 flex w-[60px] transition duration-300 cursor-pointer justify-center w-2/5 bg-gray-900 ml-3 text-gray-400 hover:text-white'
          )}
        >
          Clear
        </div>
      </div>
      <div className="flex w-full">
        <div
          onClick={() => setOptions({ ...options, flam: !options.flam })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.flam,
              'text-gray-400 border-gray-900 hover:text-white': !options.flam
            }
          )}
        >
          Flam
        </div>
        <div
          onClick={() => setOptions({ ...options, buzz: !options.buzz })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.buzz,
              'text-gray-400 border-gray-900 hover:text-white': !options.buzz
            }
          )}
        >
          Buzz
        </div>
        <div
          onClick={() => setOptions({ ...options, hand: 'left' })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.hand === 'left',
              'text-gray-400 border-gray-900 hover:text-white':
                options.hand !== 'left'
            }
          )}
        >
          L
        </div>
        <div
          onClick={() => setOptions({ ...options, hand: 'right' })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.hand === 'right',
              'text-gray-400 border-gray-900 hover:text-white':
                options.hand !== 'right'
            }
          )}
        >
          R
        </div>
        <div
          onClick={() => setOptions({ ...options, hand: 'any' })}
          className={classNames(
            'bg-gray-900 p-2 flex w-[120px] transition duration-300 cursor-pointer justify-center w-3/5 border',
            {
              'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                options.hand === 'any',
              'text-gray-400 border-gray-900 hover:text-white':
                options.hand !== 'any'
            }
          )}
        >
          N/A
        </div>
      </div>
      <div className="mt-3">
        {INSTRUMENTS.map((instrument) => {
          return (
            <div className="flex ">
              <div className="w-[100px] flex items-center">
                {instrument.name}
              </div>
              <div className="flex flex-grow" ref={ref}>
                {[...Array(NB_NOTES)].map((_, index) => (
                  <Note
                    width={(600 - 100) / NB_NOTES}
                    number={index + 1}
                    key={index}
                    options={options}
                    updateScore={updateScore}
                    instrument={instrument}
                    forceReset={forceReset}
                    initialState={
                      output
                        ? {
                            buzz: output[instrument.name]?.[index]?.buzz,
                            hand: output[instrument.name]?.[index]?.hand,
                            flam: output[instrument.name]?.[index]?.flam,
                            velocity: output[instrument.name]?.[index]?.velocity
                          }
                        : null
                    }
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Note = ({
  width,
  number,
  options,
  updateScore,
  instrument,
  forceReset,
  initialState
}) => {
  const getColor = (velocity) => {
    if (velocity === 1) {
      return Color(instrument.color).fade(0.9)
    } else if (velocity === 2) {
      return Color(instrument.color).fade(0.5)
    } else if (velocity === 3) {
      return Color(instrument.color)
    }
    return '#1b273b'
  }

  const [color, setColor] = useState(getColor(initialState.velocity))
  const [flam, setFlam] = useState(initialState.flam)
  const [hand, setHand] = useState(initialState.hand)
  const [buzz, setBuzz] = useState(initialState.buzz)

  useEffect(() => {
    if (initialState) {
      setBuzz(initialState.buzz)
      setFlam(initialState.flam)
      setHand(initialState.hand)
      setColor(getColor(initialState.velocity))
    }
  }, [initialState])

  const resetNote = () => {
    setColor('#292d3e')
    setBuzz(false)
    setFlam(false)
    setHand('any')
  }
  useEffect(() => {
    if (forceReset) {
      resetNote()
    }
  }, [forceReset])

  const handleClick = () => {
    updateScore(number, instrument)
    if (options.velocity === 0) {
      resetNote()
    } else {
      setHand(options.hand)
      setFlam(options.flam)
      setBuzz(options.buzz)
      setColor(getColor(options.velocity))
    }
  }
  return (
    <div
      className={classNames(
        'h-[40px] mr-[1px] mb-[1px] relative flex items-center justify-center hover:bg-opacity-40 cursor-pointer select-none transiation duration-100',
        color
      )}
      style={{ width, backgroundColor: color }}
      onClick={handleClick}
    >
      {flam && 'F'}
      {buzz && 'B'}
      {hand === 'left' && 'L'}
      {hand === 'right' && 'R'}
    </div>
  )
}

export default ScoreBuilder
