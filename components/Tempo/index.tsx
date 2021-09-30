import classNames from 'classnames'
import { useTempo } from 'components/context/Tempo'
import { MinusCircle, PlusCircle } from 'react-feather'
import { Play, PlayCircle } from 'react-feather'

const TempoControl = ({ type, disabled }) => {
  const { increaseTempo, decreaseTempo, tempo, setTempo } = useTempo()
  const icon = type === 'increase' ? <PlusCircle /> : <MinusCircle />
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

const Tempo = () => {
  const { tempo, startStop } = useTempo()

  return (
    <div>
      <div className="flex w-24 justify-between">
        <TempoControl type="decrease" disabled={tempo <= 40} />
        <div>{tempo}</div>
        <TempoControl type="increase" disabled={tempo >= 240} />
      </div>
      <div
        className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
        onClick={startStop}
      >
        <Play color="white" className="-mr-1" fill="white" />
      </div>
    </div>
  )
}

export default Tempo
