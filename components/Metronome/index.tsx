import classNames from 'classnames'
import { useTempo } from 'lib/TempoContext'
import { MinusCircle, Pause, Play, PlusCircle } from 'react-feather'

const TempoControl = ({ type, disabled }) => {
  const { increaseTempo, decreaseTempo } = useTempo()
  const icon =
    type === 'increase' ? (
      <PlusCircle size={32} className="text-gray-400" />
    ) : (
      <MinusCircle size={32} className="text-gray-400" />
    )
  const action = type === 'increase' ? increaseTempo : decreaseTempo

  return (
    <button
      className={classNames({
        'text-gray-400': disabled
      })}
      disabled={disabled}
      onClick={action}
    >
      {icon}
    </button>
  )
}

const Metronome = () => {
  const { tempo, startMetronome, stopMetronome, isRunning } = useTempo()
  const Icon = isRunning ? (
    <Pause color="white" fill="white" />
  ) : (
    <Play color="white" className="-mr-1" fill="white" />
  )

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center mb-3">
        <TempoControl type="decrease" disabled={tempo <= 40} />
        <div className="font-black text-2xl mx-3 text-white">{tempo}</div>
        <TempoControl type="increase" disabled={tempo >= 240} />
      </div>
      <div
        className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
        onClick={isRunning ? stopMetronome : startMetronome}
      >
        {Icon}
      </div>
    </div>
  )
}

export default Metronome
