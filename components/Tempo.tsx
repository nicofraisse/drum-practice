import { useState } from 'react'
import { PlusCircle, MinusCircle } from 'react-feather'
import classNames from 'classnames'
import { useTempo } from 'lib/tempo'

const Decrease = () => {
  const { tempo, decreaseTempo } = useTempo()
  console.log('tempo', tempo)
  return (
    <button
      className={classNames({
        'text-gray-400': tempo === 40
      })}
      disabled={tempo === 40}
      onClick={decreaseTempo}
    >
      <MinusCircle />
    </button>
  )
}
const Increase = () => {
  const { tempo, increaseTempo } = useTempo()

  return (
    <button
      className={classNames({
        'text-gray-400': tempo === 240
      })}
      disabled={tempo === 240}
      onClick={increaseTempo}
    >
      <PlusCircle />
    </button>
  )
}

const Tempo = () => {
  const { tempo, increaseTempo, decreaseTempo } = useTempo()

  return (
    <div className="flex w-24 justify-between">
      <Decrease tempo={tempo} decreaseTempo={decreaseTempo} />
      <div>{tempo}</div>
      <Increase tempo={tempo} increaseTempo={increaseTempo} />
    </div>
  )
}

export default Tempo
